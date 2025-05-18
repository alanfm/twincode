import Alert from "@/Components/Twincode/Dashboard/Alert";
import Sidebar from "@/Components/Twincode/Dashboard/Sidebar";
import RootLayout from "@/Layouts/RootLayout";
import { usePage } from "@inertiajs/react";

function DashboardLayout({ children }) {
    return (
        <RootLayout>
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
