import {
  createContext,
  ReactNode,
  useContext,
  useState,
  useEffect,
  memo,
} from "react"
import { BigNumber } from "ethers"
import { useContractRead } from "wagmi"
import { platformThemeRegistryAbi } from "../abi/platformThemeRegistryAbi"
import { useWeb3Storage } from "../hooks/useWeb3Storage"

type ThemeProviderProps = {
  children?: ReactNode
  platformIndex?: number
}

/**
 * Assign default values to the context provider
 */
const ThemeContext = createContext({
  themeCID: "",
  newMetadata: "",
  /**
   * Configurable properties
   */
  image: "",
  setImage: (image: string) => {},
  backgroundColor: "",
  setBackgroundColor: (backgroundColor: string) => {},
  primary: "",
  setPrimary: (primary: string) => {},
  secondary: "",
  setSecondary: (secondary: string) => {},
  tertiary: "",
  setTertiary: (tertiary: string) => {},
  highlight: "",
  setHighlight: (highlight: string) => {},
  headline: "",
  setHeadline: (headline: string) => {},
  body: "",
  setBody: (body: string) => {},
  caption: "",
  setCaption: (caption: string) => {},
  shadowColor: "",
  setShadowColor: (shadowColor: string) => {},
  shadowSpread: "",
  setShadowSpread: (shadowSpread: string) => {},
  objectRadius: "",
  setObjectRadius: (objectRadius: string) => {},
  buttonRadius: "",
  setButtonRadius: (buttonRadius: string) => {},
})

export const ThemeProvider = memo(function ThemeProvider({
  children,
  platformIndex,
}: ThemeProviderProps) {
  /**
   * Read the registry contract defined as an environment variable
   */
  const themeRegistry = process.env
    .NEXT_PUBLIC_REGISTRY_CONTRACT as `0x${string}`
  /**
   * Assign a state variable to the theme content object
   */
  const [themeCID, setThemeCID] = useState<string>("")
  /**
   * Set state variables for the parameters derived from the theme content object
   */
  const [image, setImage] = useState<string>("")
  const [backgroundColor, setBackgroundColor] = useState<string>("")
  const [primary, setPrimary] = useState<string>("")
  const [secondary, setSecondary] = useState<string>("")
  const [tertiary, setTertiary] = useState<string>("")
  const [highlight, setHighlight] = useState<string>("")
  const [headline, setHeadline] = useState<string>("")
  const [body, setBody] = useState<string>("")
  const [caption, setCaption] = useState<string>("")
  const [shadowColor, setShadowColor] = useState<string>("")
  const [shadowSpread, setShadowSpread] = useState<string>("")
  const [objectRadius, setObjectRadius] = useState<string>("")
  const [buttonRadius, setButtonRadius] = useState<string>("")

  console.log(primary)
  /**
   * Read the desired ipfs string from the registry contract
   */
  const contractRead = useContractRead({
    address: themeRegistry,
    abi: platformThemeRegistryAbi,
    functionName: "getPlatformTheme",
    args: [BigNumber.from(platformIndex)],
    onSuccess(data: any) {
      setThemeCID(data.substring("ipfs://".length))
    },
    onError(error: any) {
      console.log(error)
    },
  })
  /**
   * Unpack the metadata stored on ipfs
   */
  const { unpackedMetadata } = useWeb3Storage(themeCID)
  /**
   * Set the state variables to the values fetched from the theme content object
   */
  useEffect(() => {
    if (unpackedMetadata) {
      const parsedMetadata = JSON.parse(unpackedMetadata)
      setImage(parsedMetadata.theme.background?.image)
      setBackgroundColor(parsedMetadata.theme.background?.backgroundColor)
      setPrimary(parsedMetadata.theme.color?.primary)
      setSecondary(parsedMetadata.theme.color?.secondary)
      setTertiary(parsedMetadata.theme.color?.tertiary)
      setHighlight(parsedMetadata.theme.color?.highlight)
      setHeadline(parsedMetadata.theme.fonts?.headline)
      setBody(parsedMetadata.theme.fonts?.body)
      setCaption(parsedMetadata.theme.fonts?.caption)
      setShadowColor(parsedMetadata.theme.dropshadow?.shadowColor)
      setShadowSpread(parsedMetadata.theme.dropshadow?.shadowSpread)
      setObjectRadius(parsedMetadata.theme.cornerRadius?.objectRadius)
      setButtonRadius(parsedMetadata.theme.cornerRadius?.buttonRadius)
    }
  }, [unpackedMetadata])
  /**
   * Set the variables in the local stylesheet to their corresponding values
   */

  // prettier-ignore
  document.documentElement.style.setProperty("--color-background", backgroundColor);
  // prettier-ignore
  document.documentElement.style.setProperty("--color-primary", primary);
  // prettier-ignore
  document.documentElement.style.setProperty("--secondary", secondary);
  // prettier-ignore
  document.documentElement.style.setProperty("--tertiary", tertiary);
  // prettier-ignore
  document.documentElement.style.setProperty("--highlight", highlight);
  // prettier-ignore
  document.documentElement.style.setProperty("--headline", headline);
  // prettier-ignore
  document.documentElement.style.setProperty("--body", body);
  // prettier-ignore
  document.documentElement.style.setProperty("--caption", caption);
  // prettier-ignore
  document.documentElement.style.setProperty("--drop-shadow", shadowColor);
  // prettier-ignore
  document.documentElement.style.setProperty("--shadow-spread", shadowSpread);
  // prettier-ignore
  document.documentElement.style.setProperty("--border-radius-object", objectRadius);
  // prettier-ignore
  document.documentElement.style.setProperty("--border-radius-button", buttonRadius);

  const newMetadata = JSON.stringify(
    {
      theme: {
        background: { image, backgroundColor },
        colors: { primary, secondary, tertiary, highlight },
        fonts: { headline, body, caption },
        dropshadow: { shadowColor, shadowSpread },
        cornerRadius: { objectRadius, buttonRadius },
      },
    },
    null,
    3
  )

  // prettier-ignore
  const fontUrl = 'https://dweb.link/ipfs/bafybeih3dpotmeewpv543kzbwhxykm6pqtcw46i6lymcjhvblg6sv455se/' + headline + '.ttf';
  const rule = `@font-face {
    font-family: '${headline}';
    src: url('${fontUrl}') format('woff2');
    }`

  const style = document.createElement("style")
  style.appendChild(document.createTextNode(rule))
  document.head.appendChild(style)

  return (
    <ThemeContext.Provider
      value={{
        themeCID,
        newMetadata,
        /**
         * Configurable properties
         */
        image,
        setImage,
        backgroundColor,
        setBackgroundColor,
        primary,
        setPrimary,
        secondary,
        setSecondary,
        tertiary,
        setTertiary,
        highlight,
        setHighlight,
        headline,
        setHeadline,
        body,
        setBody,
        caption,
        setCaption,
        shadowColor,
        setShadowColor,
        shadowSpread,
        setShadowSpread,
        objectRadius,
        setObjectRadius,
        buttonRadius,
        setButtonRadius,
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
})

// Access the context value of the ThemeProvider
export const useThemeContext = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw Error("useThemeContext hook must be used within a ThemeProvider")
  }
  return context
}
