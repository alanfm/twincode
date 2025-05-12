import Breadcrumb from '@/Components/Twincode/Dashboard/Breadcrumb';
import ConfirmDelete from '@/Components/Twincode/Dashboard/ConfirmDelete';
import Panel from '@/Components/Twincode/Dashboard/Panel';
import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head, Link } from '@inertiajs/react';

function Show({ user }) {
    return (
        <DashboardLayout>
            <Head title="Detalhes" />
            <Breadcrumb items={[
                { label: 'Dashboard', href: route('dashboard') },
                { label: 'Usuários', href: route('users.index') },
                { label: user.title, href: route('users.show', user.id) }
            ]} />
            <div className="flex flex-col gap-4 h-full">
                <h1 className="text-2xl font-extrabold">Datalhes da Usuário</h1>
                <Panel className={'h-full flex flex-col gap-4'}>
                    <div className="">
                        <p>Título:</p>
                        <p className='font-normal'>{user.name}</p>
                    </div>
                    <div className="">
                        <p>Descrição:</p>
                        <p className='font-normal'>{user.email}</p>
                    </div>
                    <div className="">
                        <p>Criado em:</p>
                        <p className='font-normal'>{user.created_at}</p>
                    </div>
                    <div className="">
                        <p>Atualizado em:</p>
                        <p className='font-normal'>{user.created_at}</p>
                    </div>
                </Panel>
                <Panel className={'flex gap-4 justify-center items-center'}>
                    <Link href={route('users.index', {search: '', page: 1})} className='btn btn-neutral' prefetch>
                        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="size-5"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M9 11l-4 4l4 4m-4 -4h11a4 4 0 0 0 0 -8h-1" /></svg>
                        <span>Voltar</span>
                    </Link>
                    <Link href={route('users.edit', { user: user.id })} className='btn btn-yellow' prefetch>
                        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="size-5"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" /><path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" /><path d="M16 5l3 3" /></svg>
                        <span>Editar</span>
                    </Link>
                    <ConfirmDelete url={route('users.destroy', { user: user.id })} />
                </Panel>
            </div>
        </DashboardLayout>
    );
}

export default Show;
