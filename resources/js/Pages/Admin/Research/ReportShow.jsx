import Breadcrumb from '@/Components/Twincode/Dashboard/Breadcrumb';
import Panel from '@/Components/Twincode/Dashboard/Panel';
import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head, Link } from '@inertiajs/react';

function ReportShow({ research, participant }) {
    const answers = participant.answers.map(answer => (
        <div className="" key={answer.id}>
            <p>{answer.question.statement}</p>
            <p className='font-normal'>{answer.answer}</p>
        </div>
    ));

    return (
        <>
            <Head title="Detalhes do Relatório" />
            <Breadcrumb items={[
                { label: 'Dashboard', href: route('dashboard') },
                { label: 'Pesquisas', href: route('research.index') },
                { label: research.title, href: route('research.show', research.id) },
                { label: 'Relatório', href: route('research.reports', research.id) },
                { label: 'Participante', href: route('research.reports.show', { research: research.id, participant: participant.id }) },
            ]} />
            <div className="flex flex-col gap-4 h-full">
                <h1 className="text-2xl font-extrabold">Detalhes do Relatório</h1>
                <Panel className={'h-full flex flex-col gap-4'}>
                    <div className="">
                        <p>Nome:</p>
                        <p className='font-normal'>{participant.name}</p>
                    </div>
                    <div className="">
                        <p>E-mail:</p>
                        <p className='font-normal'>{participant.email}</p>
                    </div>
                    {answers.length > 0 && answers}
                    <div className="">
                        <p>Criado em:</p>
                        <p className='font-normal'>{research.created_at}</p>
                    </div>
                    <div className="">
                        <p>Atualizado em:</p>
                        <p className='font-normal'>{research.created_at}</p>
                    </div>
                </Panel>
                <Panel className={'flex gap-4 justify-center items-center'}>
                    <Link href={route('research.reports', {research: research.id, search: '', page: 1})} className='btn btn-neutral' prefetch>
                        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="size-5"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M9 11l-4 4l4 4m-4 -4h11a4 4 0 0 0 0 -8h-1" /></svg>
                        <span>Voltar</span>
                    </Link>
                </Panel>
            </div>
        </>
    );
}

ReportShow.layout = (page) => <DashboardLayout children={page} />;

export default ReportShow;
