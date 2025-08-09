import { Link, router } from "@inertiajs/react";
import { useMemo } from "react";
import BadgePosition from "./BadgePosition";

function DataTable({ data, respondable_type, respondable_id }) {
    const dataTable = useMemo(() => {
        return data.map((questionnaire, i) => {
            return (
                <tr
                    key={questionnaire.id}
                    className={(i % 2 ? 'bg-neutral-100' : '') + ' hover:bg-neutral-200 cursor-pointer'}
                    onClick={() => {router.get(route('questionnaires.show', { respondable: respondable_type, id: respondable_id, questionnaire: questionnaire.id }), {method: 'get'})}}
                    onMouseOver={() => router.prefetch(route('questionnaires.show', { respondable: respondable_type, id: respondable_id, questionnaire: questionnaire.id }), {method: 'get'},{cacheFor: '1m'})}
                    title="Ver detalhes"
                >
                    <td className='py-1 px-1 m-0'>{questionnaire.title}</td>
                    <td className='py-1 px-1 m-0'>{questionnaire.description}</td>
                    {respondable_type == 'research' && <td className='py-1 px-1 m-0'><BadgePosition position={questionnaire.position} /></td>}
                    <td className='py-1 pr-6 leading-none text-right align-middle'>
                        <Link href={route('questionnaires.show', { respondable: respondable_type, id: respondable_id, questionnaire: questionnaire.id })} className='inline-block text-blue-500 hover:text-blue-600 transition' title='Ver detalhes'>
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
                        <th className='text-left px-1 text-nowrap'>Título</th>
                        <th className='text-left px-1'>Descrição</th>
                        {respondable_type == 'research' && <th className='text-left px-1'>Posição</th>}
                        <th className='text-right px-1'>Detalhes</th>
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
