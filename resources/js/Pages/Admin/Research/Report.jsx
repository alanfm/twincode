import Breadcrumb from '@/Components/Twincode/Dashboard/Breadcrumb';
import Panel from '@/Components/Twincode/Dashboard/Panel';
import Pagination from '@/Components/Twincode/Pagination';
import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head, Link, router } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import DataTableReport from './partials/DataTableReport';

function Report({ data, count, page, search, research }) {
    const [searchLocal, setSearchLocal] = useState(search);
    const [pageLocal, setPageLocal] = useState(page);

    useEffect(() => {
        const debounce = setTimeout(() => {
            setPageLocal(1);
            router.get(route('research.reports', { research }), { search: searchLocal, page: pageLocal }, {
                preserveState: true,
                preserveScroll: false
            });
        }, 500);
        return () => clearTimeout(debounce);
    }, [searchLocal]);

    return (
        <>
            <Head title="Relatórios" />
            <Breadcrumb items={[
                { label: 'Dashboard', href: route('dashboard') },
                { label: 'Pesquisas', href: route('research.index') },
                { label: research.title, href: route('research.show', research.id) }
            ]} />
            <div className="flex flex-col gap-4 h-full">
                <h1 className="text-2xl font-extrabold">Relatórios</h1>
                <Panel>
                    {/* <Link
                        href={route('research.create')}
                        className='flex gap-1 items-center bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition'
                        prefetch
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 5l0 14" /><path d="M5 12l14 0" /></svg>
                        <span>Nova</span>
                    </Link> */}
                    <input value={searchLocal} type="search" className="w-full rounded-md" placeholder='Digite sua pesquisa' onChange={(e) => setSearchLocal(e.target.value)} />
                </Panel>
                <Panel className='h-full flex flex-col gap-4'>
                    <DataTableReport data={data.data} research={research} />
                    <div className="flex justify-end">
                        <Pagination data={data} count={count}>
                            <div className="flex gap-4">
                                <Link href={route('research.show', {research})} className='btn btn-neutral' prefetch>
                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="size-5"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M9 11l-4 4l4 4m-4 -4h11a4 4 0 0 0 0 -8h-1" /></svg>
                                    <span>Voltar</span>
                                </Link>
                                <a href={route('research.reports.download', { research })} className='btn btn-sky' target="_blank" rel="noopener noreferrer">
                                    <svg  xmlns="http://www.w3.org/2000/svg"  width={24}  height={24}  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth={2}  strokeLinecap="round"  strokeLinejoin="round"  className="size-5"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M8 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h5.697" /><path d="M18 12v-5a2 2 0 0 0 -2 -2h-2" /><path d="M8 3m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v0a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z" /><path d="M8 11h4" /><path d="M8 15h3" /><path d="M16.5 17.5m-2.5 0a2.5 2.5 0 1 0 5 0a2.5 2.5 0 1 0 -5 0" /><path d="M18.5 19.5l2.5 2.5" /></svg>
                                    <span>Baixar Relatórios</span>
                                </a>
                            </div>
                        </Pagination>
                    </div>
                </Panel>
            </div>
        </>
    );
}

Report.layout = (page) => <DashboardLayout children={page} />;

export default Report;
