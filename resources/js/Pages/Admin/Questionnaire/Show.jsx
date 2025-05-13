import Breadcrumb from '@/Components/Twincode/Dashboard/Breadcrumb';
import ConfirmDelete from '@/Components/Twincode/Dashboard/ConfirmDelete';
import Panel from '@/Components/Twincode/Dashboard/Panel';
import breadcrumbsItems from '@/helpers/breadcrumbsItems';
import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head, Link } from '@inertiajs/react';

function Show({ questionnaire, respondable, respondable_type, respondable_id }) {
    return (
        <DashboardLayout>
            <Head title="Detalhes" />
            <Breadcrumb items={breadcrumbsItems('show', respondable, respondable_type, respondable_id, questionnaire)} />
            <div className="flex flex-col gap-4 h-full">
                <h1 className="text-2xl font-extrabold">Datalhes do Questionário</h1>
                <Panel className={'h-full flex flex-col gap-4'}>
                    <div className="">
                        <p>Descrição:</p>
                        <p className='font-normal'>{questionnaire.description}</p>
                    </div>
                    {respondable_type === 'research' && (
                        <div className="">
                            <p>Posição</p>
                            <p className='font-normal'>{questionnaire.position}</p>
                        </div>
                    )}
                    <div className="">
                        <p>Criado em:</p>
                        <p className='font-normal'>{questionnaire.created_at}</p>
                    </div>
                    <div className="">
                        <p>Atualizado em:</p>
                        <p className='font-normal'>{questionnaire.created_at}</p>
                    </div>
                </Panel>
                <Panel className={'flex gap-4 justify-center items-center'}>
                    <Link href={route('questionnaires.index', { respondable: respondable_type, id: respondable_id, search: '', page: 1})} className='btn btn-neutral' prefetch>
                        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="size-5"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M9 11l-4 4l4 4m-4 -4h11a4 4 0 0 0 0 -8h-1" /></svg>
                        <span>Voltar</span>
                    </Link>
                    <Link href={route('questionnaires.edit', { respondable: respondable_type, id: respondable_id, questionnaire: questionnaire.id })} className='btn btn-yellow' prefetch>
                        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="size-5"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" /><path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" /><path d="M16 5l3 3" /></svg>
                        <span>Editar</span>
                    </Link>
                    <ConfirmDelete url={route('questionnaires.destroy', { respondable: respondable_type, id: respondable_id, questionnaire: questionnaire.id })} />

                    <Link href={route('questionnaires.edit', { respondable: respondable_type, id: respondable_id, questionnaire: questionnaire.id })} className='btn btn-teal' prefetch>
                        <svg  xmlns="http://www.w3.org/2000/svg"  width={24}  height={24}  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth={2}  strokeLinecap="round"  strokeLinejoin="round"  className="size-5"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M8 9h8" /><path d="M8 13h6" /><path d="M14.5 18.5l-2.5 2.5l-3 -3h-3a3 3 0 0 1 -3 -3v-8a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v4.5" /><path d="M19 22v.01" /><path d="M19 19a2.003 2.003 0 0 0 .914 -3.782a1.98 1.98 0 0 0 -2.414 .483" /></svg>
                        <span>Questões</span>
                    </Link>
                </Panel>
            </div>
        </DashboardLayout>
    );
}

export default Show;
