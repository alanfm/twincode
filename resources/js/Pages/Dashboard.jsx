import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard() {
    return (
        <DashboardLayout>
            <Head title="Dashboard" />
            <div className="flex flex-col gap-2">
                <h1 className="text-2xl font-extrabold">Dashboard</h1>
                <p className="text-neutral-600">Bem-vindo ao seu painel de controle!</p>
            </div>
        </DashboardLayout>
    );
}
