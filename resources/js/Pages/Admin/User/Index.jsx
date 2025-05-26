import Breadcrumb from '@/Components/Twincode/Dashboard/Breadcrumb';
import Panel from '@/Components/Twincode/Dashboard/Panel';
import Pagination from '@/Components/Twincode/Pagination';
import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head, Link, router } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import DataTable from './partials/DataTable';
import Alert from '@/Components/Twincode/Dashboard/Alert';

function Index({ data, count, page, search }) {
    const [searchLocal, setSearchLocal] = useState(search);
    const [pageLocal, setPageLocal] = useState(page);

    useEffect(() => {
        const debounce = setTimeout(() => {
            setPageLocal(1);
            router.get(route('users.index'), { search: searchLocal, page: pageLocal }, {
                preserveState: true,
                preserveScroll: false
            });
        }, 500);
        return () => clearTimeout(debounce);
    }, [searchLocal]);

    return (
        <>
            <Head title="Usuários" />
            <Alert />
            <Breadcrumb items={[
                { label: 'Principal', href: route('dashboard') },
                { label: 'Usuários', href: route('users.index', {search: searchLocal, page: pageLocal}) }
            ]} />
            <div className="flex flex-col gap-4 h-full">
                <h1 className="text-2xl font-extrabold">Usuários</h1>
                <Panel>
                    <Link
                        href={route('users.create')}
                        className='flex gap-1 items-center bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition'
                        prefetch
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 5l0 14" /><path d="M5 12l14 0" /></svg>
                        <span>Novo</span>
                    </Link>
                    <input value={searchLocal} type="search" className="w-full rounded-md" placeholder='Digite sua pesquisa' onChange={(e) => setSearchLocal(e.target.value)} />
                </Panel>
                <Panel className='h-full flex flex-col gap-4'>
                    <DataTable data={data.data} />
                    <div className="flex justify-end">
                        <Pagination data={data} count={count}>
                            <Link href={route('dashboard')} className='btn btn-neutral' prefetch>
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
