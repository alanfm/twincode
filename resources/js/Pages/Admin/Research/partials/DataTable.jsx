import { Link, router } from "@inertiajs/react";
import { useMemo } from "react";
import StatusBadge from "./StatusBadge";

function DataTable({ data }) {
    const dataTable = useMemo(() => {
        return data.map((research, i) => {
            return (
                <tr
                    key={research.id}
                    className={(i % 2 ? 'bg-neutral-100' : '') + ' hover:bg-neutral-200 cursor-pointer'}
                    onClick={() => {router.get(route('research.show', research.id))}}
                    onMouseOver={() => router.prefetch(route('research.show', research.id), {method: 'get'},{cacheFor: '1m'})}
                    title="Ver detalhes"
                >
                    <td className='py-1 px-1 m-0 font-mono'>{research.key}</td>
                    <td className='py-1 px-1 m-0 leading-5'>{research.title}</td>
                    <td className='py-1 px-1 m-0 leading-5'><div className="line-clamp-2 whitespace-normal">{research.description}</div></td>
                    <td className='py-1 px-1 m-0 leading-5'><StatusBadge status={research.status} /></td>
                    <td className='py-1 pr-6 leading-none text-right align-middle'>
                        <Link href={route('research.show', research.id)} className='inline-block text-blue-500 hover:text-blue-600 transition' title='Ver detalhes'>
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
                        <th className='text-left px-1'>Código</th>
                        <th className='text-left px-1'>Título</th>
                        <th className='text-left px-1'>Descrição</th>
                        <th className='text-left px-1'>Situação</th>
                        <th className='w-1/12 text-right px-1'>Detalhes</th>
                    </tr>
                </thead>
                <tbody>
                    {dataTable.length > 0? dataTable: (<tr><td colSpan={4} className='py-1 px-1 m-0'>Nenhum dado encontrado.<br /><small>Para adicionar um novo registro clique no botão "Novo".</small></td></tr>)}
                </tbody>
            </table>
        </div>
    );
}

export default DataTable;
