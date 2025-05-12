import Alert from "@/Components/Twincode/Dashboard/Alert";
import Sidebar from "@/Components/Twincode/Dashboard/Sidebar";
import RootLayout from "@/Layouts/RootLayout";
import { usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";

function DashboardLayout({ children }) {
    const { flash } = usePage().props;
    const [alert, setAlert] = useState({
        type: flash?.alert?.type,
        message: flash?.alert?.message,
        show: false,
    });

    useEffect(() => {
        if (flash.alert) {
            setAlert({
                type: flash.alert.type,
                message: flash.alert.message,
                show: true,
            });
        }
        setTimeout(() => {
            setAlert({
                ...{alert},
                show: false
            });
        }, 7000);
    }, []);

    return (
        <RootLayout>
            {alert.show && <Alert type={alert.type} message={alert.message} show={alert.show} />}
            <div className="flex justify-between max-h-screen h-screen max-w-screen w-screen overflow-hidden">
                <Sidebar />
                <div className="flex flex-col justify-between w-10/12 max-w-[calc(10/12*100)]">
                    <main className="flex flex-col gap-4 flex-grow overflow-x-auto p-4 w-full max-w-[calc(100vw-20rem)]">
                        {children}
                    </main>
                    <footer className="bg-neutral-200 p-2 text-center">
                        <p className="font-light text-sm">Copyright © {new Date().getFullYear()} - TwinCode - Analise comparativa de código</p>
                    </footer>
                </div>
            </div>
        </RootLayout>
    );
}

export default DashboardLayout;
