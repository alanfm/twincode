import { Link, router } from "@inertiajs/react";
import { useMemo } from "react";

function DataTable({ data }) {
    const dataTable = useMemo(() => {
        return data.map((user, i) => {
            return (
                <tr
                    key={user.id}
                    className={(i % 2 ? 'bg-neutral-100' : '') + ' hover:bg-neutral-200 cursor-pointer'}
                    onClick={() => {router.get(route('users.show', user.id))}}
                    onMouseOver={() => router.prefetch(route('users.show', user.id), {method: 'get'},{cacheFor: '1m'})}
                    title="Ver detalhes"
                >
                    <td className='py-1 px-1 m-0 leading-5'>{user.name}</td>
                    <td className='py-1 px-1 m-0 leading-5'>{user.email}</td>
                    <td className='py-1 pr-6 leading-none text-right align-middle'>
                        <Link href={route('users.show', user.id)} className='inline-block text-blue-500 hover:text-blue-600 transition' title='Ver detalhes'>
                            <svg xmlns="http://www.w3.org/2000/svg" className="size-8" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <path d="M12 9h.01" />
                                <path d="M11 12h1v4h1" />
                                <path d="M12 3c7.2 0 9 1.8 9 9s-1.8 9 -9 9s-9 -1.8 -9 -9s1.8 -9 9 -9z" />
                            </svg>
                        </Link>
                    </td>
                </tr>
            );
        });
    }, [data]);

    return (
        <div className="flex-grow overflow-x-auto">
            <table className='table-auto w-full'>
                <thead className='border-b border-neutral-300'>
                    <tr>
                        <th className='text-left px-1'>Nome</th>
                        <th className='text-left px-1'>E-mail</th>
                        <th className='text-right px-1'>Detalhes</th>
                    </tr>
                </thead>
                <tbody>
                    {dataTable}
                </tbody>
            </table>
        </div>
    );
}

export default DataTable;
