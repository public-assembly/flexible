import { Flex } from '@/components/base/Flex'
import { Stack } from '@/components/base/Stack'
import axios from 'axios'
import { ETHERSCAN_BASE_URL, ETHER_ACTOR_BASE_URL } from 'constants/etherscan'
import React, { Fragment } from 'react'
import useSWR from 'swr'
import { formatEther } from 'viem'
import { shortenAddress } from '../../../utils/shortenAddress'

interface DecodedTransactionProps {
  targets: string[]
  calldatas: string[]
  values: string[]
}
export const DecodedTransactions: React.FC<DecodedTransactionProps> = ({
  targets,
  calldatas,
  values,
}) => {
  //  format in shape defined by ether actor
  const formatSendEth = (value: string) => {
    const amount = formatEther(BigInt(value))
    return {
      functionName: 'Transfer',
      name: 'Transfer',
      args: {
        ['Transfer']: { name: `value`, value: `${amount} ETH` },
      },
    }
  }

  const decodeTransaction = async (
    target: string,
    calldata: string,
    value: string
  ) => {
    // if calldata is '0x'
    const isTransfer = calldata === '0x'

    if (isTransfer) {
      return formatSendEth(value)
    }

    try {
      const decoded = await axios.post(`${ETHER_ACTOR_BASE_URL}/decode`, {
        calldata: calldata,
        contract: target,
      })

      if (decoded?.data?.statusCode) return calldata

      return decoded.data
    } catch (err) {
      console.log('err', err)

      // if err return original calldata
      return calldata
    }
  }

  const { data: decodedTransactions } = useSWR(
    targets && calldatas && values
      ? ['proposal-transactions', targets, calldatas, values]
      : null,
    async (_, targets, calldatas, values) => {
      return await Promise.all(
        targets.map(async (target, i) => {
          const transaction = await decodeTransaction(
            target,
            calldatas[i],
            values[i]
          )

          return {
            target,
            transaction,
            isNotDecoded: transaction === calldatas[i],
          }
        })
      )
    },
    { revalidateOnFocus: false }
  )

  return (
    <Stack className="max-w-[600px] break-words">
      <ol className="list-item">
        {decodedTransactions?.map((decoded, i) => (
          <Fragment key={`${decoded.target}-${i}`}>
            {decoded.isNotDecoded ? (
              <li className="pb-4">{decoded.transaction}</li>
            ) : (
              <li className="pb-4">
                <Stack>
                  <Stack className="gap-1">
                    <div>
                      <a
                        href={`${ETHERSCAN_BASE_URL}/address/${decoded?.target}`}
                        target="_blank"
                        rel="noreferrer"
                        className="underline"
                      >
                        <p className="flex md:hidden">
                          {`${i + 1}.${
                            '\u0020' + shortenAddress(decoded?.target)
                          }`}
                        </p>
                        <p className="hidden md:flex">{`${i + 1}.${
                          '\u0020' + decoded?.target
                        }`}</p>
                      </a>
                    </div>
                    <Flex className="pl-2">
                      {`.${decoded?.transaction?.functionName}(`}
                      {!decoded?.transaction?.args &&
                        !decoded.transaction.decoded.length &&
                        `)`}
                    </Flex>
                    <Stack className="gap-4 pl-1">
                      {(decoded?.transaction?.args &&
                        Object?.values(decoded?.transaction?.args).map(
                          (arg: any) => (
                            // if verified contract and arguments object {name, value}
                            <Flex
                              key={arg?.name}
                              className="w-full flex-wrap overflow-hidden pl-4"
                            >
                              {/* <Body> */}
                              {arg?.name}: {arg?.value}
                              {/* </Body> */}
                            </Flex>
                          )
                        )) ||
                        // if unverified contract and arguments array [value]
                        (decoded?.transaction?.decoded &&
                          decoded?.transaction?.decoded?.map((arg: any) => (
                            <Flex key={arg}>{arg}</Flex>
                          )))}
                    </Stack>
                    {(!!decoded?.transaction?.args ||
                      !!decoded?.transaction.decoded.length) &&
                      `)`}
                  </Stack>
                </Stack>
              </li>
            )}
          </Fragment>
        ))}
      </ol>
    </Stack>
  )
}
