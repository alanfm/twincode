import Breadcrumb from '@/Components/Twincode/Dashboard/Breadcrumb';
import ConfirmDelete from '@/Components/Twincode/Dashboard/ConfirmDelete';
import Panel from '@/Components/Twincode/Dashboard/Panel';
import DashboardLayout from '@/Layouts/DashboardLayout';
import codeToHtml from '@/libs/codeHighLihter';
import { Head, Link } from '@inertiajs/react';
import { useEffect, useState } from 'react';

function Show({ research, comparison }) {
    const [showCode1, setShowCode1] = useState('');
    const [showCode2, setShowCode2] = useState('');

    useEffect(() => {
        async function loadHighlightedCode() {
            setShowCode1(await codeToHtml(comparison.snippet_code_1, comparison.language.toLowerCase()));
            setShowCode2(await codeToHtml(comparison.snippet_code_2, comparison.language.toLowerCase()));
        }
        loadHighlightedCode();
    }, []);

    return (
        <>
            <Head title="Detalhes" />
            <Breadcrumb items={[
                { label: 'Dashboard', href: route('dashboard') },
                { label: 'Pesquisas', href: route('research.index', { search: '', page: '' }) },
                { label: research.title, href: route('research.show', research.id) },
                { label: 'Comparações', href: route('research.comparison.index', { research: research.id, search: '', page: '' }) },
                { label: comparison.description, href: route('research.comparison.show', { research: research.id, comparison: comparison.id }) },
            ]} />
            <div className="flex flex-col gap-4 h-full">
                <h1 className="text-2xl font-extrabold">Datalhes da Comparação</h1>
                <Panel className={'h-full flex flex-col gap-4'}>
                    <div className="">
                        <p>Descrição:</p>
                        <p className='font-normal'>{comparison.description}</p>
                    </div>
                    <div className="">
                        <p>Linguagem:</p>
                        <p className='font-normal'>{comparison.language}</p>
                    </div>
                    <div className="flex gap-4 max-w-[calc(10/12*100)] overflow-hidden">
                        <div className="flex-1">
                            <p className='font-semibold text-center'>Código 1</p>
                            <div className='w-[47.6rem] h-[26rem] overflow-auto' dangerouslySetInnerHTML={{ __html: showCode1 }}></div>
                        </div>
                        <div className="flex-1">
                            <p className='font-semibold text-center'>Código 2</p>
                            <div className='w-[47.6rem] h-[26rem] overflow-auto' dangerouslySetInnerHTML={{ __html: showCode2 }}></div>
                        </div>
                    </div>
                    <div className="">
                        <p>Observações:</p>
                        <p className='font-normal'>{comparison.observation}</p>
                    </div>
                    <div className="flex gap-4">
                        <div className="">
                            <p>Criado em:</p>
                            <p className='font-normal'>{comparison.created_at}</p>
                        </div>
                        <div className="">
                            <p>Atualizado em:</p>
                            <p className='font-normal'>{comparison.created_at}</p>
                        </div>
                    </div>
                </Panel>
                <Panel className={'flex gap-4 justify-center items-center'}>
                    <Link href={route('research.comparison.index', { research: research.id, search: '', page: 1 })} className='btn btn-neutral'>
                        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="size-5"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M9 11l-4 4l4 4m-4 -4h11a4 4 0 0 0 0 -8h-1" /></svg>
                        <span>Voltar</span>
                    </Link>
                    <Link href={route('research.comparison.edit', { research: research.id, comparison: comparison.id })} className='btn btn-yellow' prefetch>
                        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="size-5"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" /><path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" /><path d="M16 5l3 3" /></svg>
                        <span>Editar</span>
                    </Link>
                    <ConfirmDelete url={route('research.comparison.destroy', { research: research.id, comparison: comparison.id })} />
                    <Link href={route('questionnaires.index', { respondable: 'comparison', id: comparison.id, search: '', page: 1 })} className='btn btn-blue' prefetch>
                        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="size-5"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M9.615 20h-2.615a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v8" /><path d="M14 19l2 2l4 -4" /><path d="M9 8h4" /><path d="M9 12h2" /></svg>
                        <span>Questionário</span>
                    </Link>
                </Panel>
            </div>
        </>
    );
}

Show.layout = (page) => <DashboardLayout children={page} />;

export default Show;
