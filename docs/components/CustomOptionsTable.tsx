import styles from "./table.module.css";

export function CustomOptionTable({ options }: { options: [string, string, any, any] }) {
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
                        <th className="py-2 font-semibold">Property</th>
                        <th className="py-2 font-semibold">Type</th>
                        <th className="py-2 pl-6 font-semibold">Required</th>
                        <th className="py-2 pl-6 font-semibold">Description</th>
                    </tr>
                </thead>
                <tbody className="align-baseline text-gray-900 dark:text-gray-100">
                    {options.map(([property, type, required, description]) => (
                        <tr
                            key={property}
                            className="border-b border-gray-100 dark:border-neutral-700/50"
                        >
                            <td className="whitespace-pre py-2 font-mono text-xs font-semibold leading-6 text-violet-600 dark:text-violet-500">
                                {property} </td>
                            <td className="whitespace-pre py-2 font-mono text-xs font-semibold leading-6 ">
                                {type} </td>
                            <td className="whitespace-pre py-2 pl-6 font-mono text-xs font-semibold leading-6 text-slate-500 dark:text-slate-400">
                                {required}
                            </td>
                            <td className="py-2 pl-6">{description}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

