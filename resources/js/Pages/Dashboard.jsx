import Alert from '@/Components/Twincode/Dashboard/Alert';
import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';

export default function Dashboard() {

    const { flash } = usePage().props;
    const [alertVisible, setAlertVisible] = useState('');

    useEffect(() => {
        if (!!flash.alert) {
            setAlertVisible(<Alert />);

        }

        let debounce = setTimeout(() => {
            setAlertVisible('');
        }, 5000);

        return () => {
            clearTimeout(debounce);
        }
    }, [flash.alert]);
    return (
        <DashboardLayout>
            {alertVisible}
            <Head title="Dashboard" />
            <div className="flex flex-col gap-2">
                <h1 className="text-2xl font-extrabold">Dashboard</h1>
                <p className="text-neutral-600">Bem-vindo ao seu painel de controle!</p>
            </div>
        </DashboardLayout>
    );
}
