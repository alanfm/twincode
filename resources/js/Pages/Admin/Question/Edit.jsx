import Breadcrumb from '@/Components/Twincode/Dashboard/Breadcrumb';
import Panel from '@/Components/Twincode/Dashboard/Panel';
import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import Form from './partials/Form';
import breadcrumbsItems from '@/helpers/breadcrumbsItems';
import Alert from '@/Components/Twincode/Dashboard/Alert';

function Edit({ question, questionnaire }) {
    const { data, setData, put, processing, errors } = useForm({
        statement: question.statement,
        type: question.type,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('questionnaires.questions.update', { question: question.id, questionnaire: questionnaire.id }), { data });
    }
    return (
        <DashboardLayout>
            <Head title="Editar Questão" />
            <Alert />
            <Breadcrumb items={[
                ...breadcrumbsItems('show', '', '', '', questionnaire),
                { label: 'Questões', href: route('questionnaires.questions.index', { questionnaire: questionnaire.id }) },
                { label: 'Editar', href: route('questionnaires.questions.edit', { question: question.id, questionnaire: questionnaire.id }) },
                { label: question.title, href: route('questionnaires.questions.edit', { question: question.id, questionnaire: questionnaire.id }) },
            ]} />
            <div className="flex flex-col gap-4 h-full">
                <h1 className="text-2xl font-extrabold">Editar Questão</h1>
                <form className='flex flex-col gap-4 h-full' onSubmit={handleSubmit}>
                    <Panel className={'flex flex-col gap-4'}>
                        <Form data={data} setData={setData} errors={errors} />
                    </Panel>
                    <Panel className={'flex justify-center gap-4'}>
                        <Link href={route('questionnaires.questions.show', { question: question.id, questionnaire: questionnaire.id })} className='btn btn-neutral' prefetch>
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
