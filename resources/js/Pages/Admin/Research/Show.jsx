import Breadcrumb from '@/Components/Twincode/Dashboard/Breadcrumb';
import ConfirmDelete from '@/Components/Twincode/Dashboard/ConfirmDelete';
import Panel from '@/Components/Twincode/Dashboard/Panel';
import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head, Link, usePage } from '@inertiajs/react';
import StatusBadge from './partials/StatusBadge';
import ToolTip from '@/Components/Twincode/Dashboard/Tooltip';
import { useState } from 'react';

function Show({ research }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <Head title="Detalhes" />
            <Breadcrumb items={[
                { label: 'Dashboard', href: route('dashboard') },
                { label: 'Pesquisas', href: route('research.index') },
                { label: research.title, href: route('research.show', research.id) }
            ]} />
            <div className="flex flex-col gap-4 h-full">
                <h1 className="text-2xl font-extrabold">Datalhes da Pesquisa</h1>
                <Panel className={'min flex flex-col gap-4'}>
                    <div className="">
                        <p>Situação:</p>
                        <p className='font-normal'><StatusBadge status={research.status} /></p>
                    </div>
                    <div className="">
                        <p>Título:</p>
                        <p className='font-normal'>{research.title}</p>
                    </div>
                    <div className="">
                        <p>Descrição:</p>
                        <p className='font-normal'>{research.description}</p>
                    </div>
                    <div className="">
                        <p>Autor:</p>
                        <p className='font-normal'>{research.author}</p>
                    </div>
                    <div className="">
                        <p>Instituição:</p>
                        <p className='font-normal'>{research.institution}</p>
                    </div>
                    <div className="">
                        <p>Código:</p>
                        <p className='font-normal'>{research.key}</p>
                        <p className='text-xs'>Código usado para preenchimento da pesquisa pelos participantes</p>
                    </div>
                    <div className="">
                        <p>Link de acesso público:</p>
                        <p className='font-normal flex gap-2 items-center'>
                            <span>{route('public.research.index', { key: research.key })}</span>
                            <ToolTip tooltip="Copiar link">
                                <button
                                    className='cursor-pointer'
                                    onClick={() => navigator.clipboard.writeText(route('public.research.index', { key: research.key }))}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="size-5"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M7 7m0 2.667a2.667 2.667 0 0 1 2.667 -2.667h8.666a2.667 2.667 0 0 1 2.667 2.667v8.666a2.667 2.667 0 0 1 -2.667 2.667h-8.666a2.667 2.667 0 0 1 -2.667 -2.667z" /><path d="M4.012 16.737a2.005 2.005 0 0 1 -1.012 -1.737v-10c0 -1.1 .9 -2 2 -2h10c.75 0 1.158 .385 1.5 1" /></svg>
                                </button>
                            </ToolTip>
                        </p>
                        <small>Compartilhe esse link com os respondentes para participarem da pesquisa.</small>
                    </div>

                    <div className="">
                        <p>Termos de Aceite para Participação na Pesquisa:</p>
                        <div className="">
                            <button
                                className="btn btn-neutral mb-4"
                                onClick={() => setIsOpen(!isOpen)}
                            >
                                <span className="font-normal">{isOpen? 'Recolher': 'Expandir'} Termos de Aceite</span>
                                <span className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="size-5"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M6 9l6 6l6 -6" /></svg>
                                </span>
                            </button>
                            <div className={`pb-4 ${isOpen ? 'block' : 'hidden'}`}>
                                <div className='font-normal border rounded-md p-4 block' dangerouslySetInnerHTML={{ __html: research.acceptance_terms }}></div>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-4 justify-between">
                        <div className="flex-1">
                            <p>Criado por:</p>
                            <p className='font-normal'>{research.user.name}</p>
                        </div>
                        <div className="flex-1">
                            <p>Criado em:</p>
                            <p className='font-normal'>{research.created_at}</p>
                        </div>
                        <div className="flex-1">
                            <p>Atualizado em:</p>
                            <p className='font-normal'>{research.created_at}</p>
                        </div>
                    </div>
                </Panel>
                <Panel className={'flex gap-4 justify-center items-center'}>
                    <Link href={route('research.index', { search: '', page: 1 })} className='btn btn-neutral' prefetch>
                        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="size-5"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M9 11l-4 4l4 4m-4 -4h11a4 4 0 0 0 0 -8h-1" /></svg>
                        <span>Voltar</span>
                    </Link>
                    <Link href={route('research.edit', { research: research.id })} className='btn btn-yellow' prefetch>
                        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="size-5"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" /><path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" /><path d="M16 5l3 3" /></svg>
                        <span>Editar</span>
                    </Link>
                    <ConfirmDelete url={route('research.destroy', { research: research.id })} />
                    <Link href={route('questionnaires.index', { respondable: 'research', id: research.id })} className='btn btn-blue' prefetch>
                        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="size-5"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M9.615 20h-2.615a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v8" /><path d="M14 19l2 2l4 -4" /><path d="M9 8h4" /><path d="M9 12h2" /></svg>
                        <span>Questionários de Pesquisa</span>
                    </Link>
                    <Link href={route('research.comparison.index', { research, search: '', page: 1 })} className='btn btn-green' prefetch>
                        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="size-5"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M7 8l-4 4l4 4" /><path d="M17 8l4 4l-4 4" /><path d="M14 4l-4 16" /></svg>
                        <span>Comparações de códigos</span>
                    </Link>
                    <a href={route('public.research.index', { key: research.key })} className='btn btn-lime' target="_blank" rel="noopener noreferrer">
                        <svg  xmlns="http://www.w3.org/2000/svg"  width={24}  height={24}  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth={2}  strokeLinecap="round"  strokeLinejoin="round"  className="size-5"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 3a3 3 0 0 0 -3 3v12a3 3 0 0 0 3 3" /><path d="M6 3a3 3 0 0 1 3 3v12a3 3 0 0 1 -3 3" /><path d="M13 7h7a1 1 0 0 1 1 1v8a1 1 0 0 1 -1 1h-7" /><path d="M5 7h-1a1 1 0 0 0 -1 1v8a1 1 0 0 0 1 1h1" /><path d="M17 12h.01" /><path d="M13 12h.01" /></svg>
                        <span>Link do Formulário</span>
                    </a>
                    <Link href={route('research.reports', { research })} className='btn btn-sky' prefetch>
                        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="size-5"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M8 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h5.697" /><path d="M18 12v-5a2 2 0 0 0 -2 -2h-2" /><path d="M8 3m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v0a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z" /><path d="M8 11h4" /><path d="M8 15h3" /><path d="M16.5 17.5m-2.5 0a2.5 2.5 0 1 0 5 0a2.5 2.5 0 1 0 -5 0" /><path d="M18.5 19.5l2.5 2.5" /></svg>
                        <span>Relatórios</span>
                    </Link>
                </Panel>
            </div>
        </>
    );
}

Show.layout = (page) => <DashboardLayout children={page} />;

export default Show;
