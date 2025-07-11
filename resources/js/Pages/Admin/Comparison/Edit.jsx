import Breadcrumb from '@/Components/Twincode/Dashboard/Breadcrumb';
import Panel from '@/Components/Twincode/Dashboard/Panel';
import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import Form from './partials/Form';

function Edit({ research, comparison }) {
    const { data, setData, put, processing, errors } = useForm({
        description: comparison.description,
        observation: comparison.observation,
        snippet_code_1: comparison.snippet_code_1,
        snippet_code_2: comparison.snippet_code_2,
        language: comparison.language,
    });

    console.log(comparison.language);

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('research.comparison.update', {research: research.id, comparison: comparison.id}), { data });
    }

    return (
        <DashboardLayout>
            <Head title="Editar Comparação" />
            <Breadcrumb items={[
                { label: 'Principal', href: route('dashboard') },
                { label: 'Pesquisas', href: route('research.index', {search: '', page: 1}) },
                { label: research.title, href: route('research.show', research.id) },
                { label: 'Comparações', href: route('research.comparison.index', {research: research.id, search: '', page: 1}) },
                { label: comparison.description, href: route('research.comparison.show', {research: research.id, comparison: comparison.id}) },
                { label: 'Editar', href: route('research.comparison.edit', {research: research.id, comparison: comparison.id}) },
            ]} />
            <div className="flex flex-col gap-4 h-full">
                <h1 className="text-2xl font-extrabold">Editar Comparação</h1>
                <form className='flex flex-col gap-4 h-full' onSubmit={handleSubmit}>
                    <Panel className={'flex flex-col gap-4'}>
                        <Form data={data} setData={setData} errors={errors} />
                    </Panel>
                    <Panel className={'flex justify-center gap-4'}>
                        <Link href={route('research.comparison.show', {research: research.id, comparison: comparison.id})} className='btn btn-neutral' prefetch>
                            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="size-5"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M9 11l-4 4l4 4m-4 -4h11a4 4 0 0 0 0 -8h-1" /></svg>
                            <span>Voltar</span>
                        </Link>
                        <button className='btn btn-blue cursor-pointer' type='submit' disabled={processing}>
                            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="size-5"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M15 10l-4 4l6 6l4 -16l-18 7l4 2l2 6l3 -4" /></svg>
                            <span>Enviar</span>
                        </button>
                    </Panel>
                </form>
            </div>
        </DashboardLayout>
    );
}

export default Edit;
