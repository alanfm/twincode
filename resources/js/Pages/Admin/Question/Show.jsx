import Breadcrumb from '@/Components/Twincode/Dashboard/Breadcrumb';
import ConfirmDelete from '@/Components/Twincode/Dashboard/ConfirmDelete';
import Panel from '@/Components/Twincode/Dashboard/Panel';
import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head, Link } from '@inertiajs/react';
import BadgeTypeQuestion from './partials/BadgeTypeQuestion';
import breadcrumbsItems from '@/helpers/breadcrumbsItems';
import AddOption from './partials/AddOption';
import DeleteOption from './partials/DeleteOption';

function Show({ question, questionnaire }) {
    return (
        <>
            <Head title="Detalhes" />
            <Breadcrumb items={[
                ...breadcrumbsItems('show', '', '', '', questionnaire),
                { label: 'Questões', href: route('questionnaires.questions.index', { questionnaire: questionnaire.id }) },
                { label: question.statement, href: route('questionnaires.questions.show', { question: question.id, questionnaire: questionnaire.id }) },
            ]} />
            <div className="flex flex-col gap-4 h-full">
                <h1 className="text-2xl font-extrabold">Datalhes da Questão</h1>
                <div className="flex gap-4">
                    <Panel className={'h-full flex flex-col gap-4 flex-1'}>
                        <div className="">
                            <p>Enunciado:</p>
                            <p className='font-normal'>{question.statement}</p>
                        </div>
                        <div className="">
                            <p>Tipo:</p>
                            <p className='font-normal'><BadgeTypeQuestion type={question.type} /></p>
                        </div>
                        <div className="">
                            <p>Criado em:</p>
                            <p className='font-normal'>{question.created_at}</p>
                        </div>
                        <div className="">
                            <p>Atualizado em:</p>
                            <p className='font-normal'>{question.created_at}</p>
                        </div>
                    </Panel>
                    {question.type !== 'text' && (
                        <Panel className={'h-full flex flex-col gap-4 flex-1'}>
                            <div className="flex justify-between items-center">
                                <h2 className='text-xl font-extrabold'>Items da questão</h2>
                                <AddOption question={question} />
                            </div>
                            <table className='table-auto w-full'>
                                <thead className='border-b border-neutral-300'>
                                    <tr>
                                        <th className='text-left'>Descrição</th>
                                        <th className='text-center'>Ação</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {question.options.map((option, i) => (
                                        <tr
                                            key={option.id}
                                            className={(i % 2 ? 'bg-neutral-100 ' : '') + 'hover:bg-neutral-200'}
                                        >
                                            <td className='py-1 px-1 m-0'>{option.description}</td>
                                            <td className='py-1 pr-6 leading-none text-right align-middle'>
                                                <DeleteOption url={route('questions.options.destroy', { question: question.id, option: option.id })} />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </Panel>
                    )}
                </div>
                <Panel className={'flex gap-4 justify-center items-center'}>
                    <Link href={route('questionnaires.questions.index', { questionnaire: questionnaire.id, search: '', page: 1 })} className='btn btn-neutral' prefetch>
                        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="size-5"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M9 11l-4 4l4 4m-4 -4h11a4 4 0 0 0 0 -8h-1" /></svg>
                        <span>Voltar</span>
                    </Link>
                    <Link href={route('questionnaires.questions.edit', { question: question.id, questionnaire: questionnaire.id })} className='btn btn-yellow' prefetch>
                        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="size-5"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" /><path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" /><path d="M16 5l3 3" /></svg>
                        <span>Editar</span>
                    </Link>
                    <ConfirmDelete url={route('questionnaires.questions.destroy', { question: question.id, questionnaire: questionnaire.id })} />
                </Panel>
            </div>
        </>
    );
}

Show.layout = (page) => <DashboardLayout children={page} />;

export default Show;
