import styles from "./table.module.css";

export function OptionTable2({ options }: { options: [ URL, any] }) {
    return (
    <div
    className={
        "-mx-6 mt-6 mb-4 overflow-x-auto overscroll-x-contain px-6 pb-4 " +
        styles.container
    }
    >
        <table className="w-full border-collapse text-sm">
        <thead>
            <tr className="border-b py-4 text-left dark:border-neutral-700">
            <th className="py-2 font-semibold">Hook</th>
            <th className="py-2 px-6 font-semibold">Usage</th>
            </tr>
        </thead>
        <tbody className="align-baseline text-gray-900 dark:text-gray-100">
            {options.map(([option, description]) => (
            <tr
            key={option}
            className="border-b border-gray-100 dark:border-neutral-700/50"
            >
                <td className="whitespace-pre py-2 font-mono text-xs font-semibold leading-6 text-violet-600 dark:text-violet-500">
                {option} </td>
            <td className="py-2 pl-6">{description}</td>
            </tr>
        ))}
        </tbody>
    </table>
    </div>
);
}
