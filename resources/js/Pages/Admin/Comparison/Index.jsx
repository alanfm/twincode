import Breadcrumb from '@/Components/Twincode/Dashboard/Breadcrumb';
import Panel from '@/Components/Twincode/Dashboard/Panel';
import Pagination from '@/Components/Twincode/Pagination';
import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head, Link, router } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import DataTable from './partials/DataTable';

function Index({ data, count, page, search, research }) {
    const [searchLocal, setSearchLocal] = useState(search);
    const [pageLocal, setPageLocal] = useState(page);

    useEffect(() => {
        const debounce = setTimeout(() => {
            setPageLocal(1);
            router.get(route('research.comparison.index', research), { search: searchLocal, page: pageLocal }, {
                preserveState: true,
                preserveScroll: false
            });
        }, 500);
        return () => clearTimeout(debounce);
    }, [searchLocal]);

    return (
        <>
            <Head title="Pesquisas" />
            <Breadcrumb items={[
                { label: 'Principal', href: route('dashboard') },
                { label: 'Pesquisas', href: route('research.index', {search: searchLocal, page: pageLocal}) },
                { label: research.title, href: route('research.show', research.id) },
                { label: 'Comparações', href: route('research.comparison.index', {research: research.id, search: searchLocal, page: pageLocal}) }
            ]} />
            <div className="flex flex-col gap-4 h-full">
                <h1 className="text-2xl font-extrabold">Comparações</h1>
                <Panel>
                    <Link
                        href={route('research.comparison.create', research.id)}
                        className='flex gap-1 items-center bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition'
                        prefetch
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 5l0 14" /><path d="M5 12l14 0" /></svg>
                        <span>Nova</span>
                    </Link>
                    <input value={searchLocal} type="search" className="w-full rounded-md" placeholder='Digite sua pesquisa' onChange={(e) => setSearchLocal(e.target.value)} />
                </Panel>
                <Panel className='h-full flex flex-col gap-4'>
                    <DataTable data={data.data} research={research} />
                    <div className="flex justify-end">
                        <Pagination data={data} count={count}>
                            <Link href={route('research.show', { research: research.id})} className='btn btn-neutral' prefetch>
                                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="size-5"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M9 11l-4 4l4 4m-4 -4h11a4 4 0 0 0 0 -8h-1" /></svg>
                                <span>Voltar</span>
                            </Link>
                        </Pagination>
                    </div>
                </Panel>
            </div>
        </>
    );
}

Index.layout = (page) => <DashboardLayout children={page} />;

export default Index;
