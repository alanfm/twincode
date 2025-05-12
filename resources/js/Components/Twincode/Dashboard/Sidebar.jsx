import Logo from "@/Components/Twincode/Logo";
import { Link, router } from "@inertiajs/react";

function Sidebar() {
    const handleLogout = (e) => {
        e.preventDefault();
        
        router.post(route('logout'));
        // Handle logout logic here
    };
    return (
        <aside className="flex flex-col gap-4 max-h-screen h-screen w-2/12 bg-white shadow-md p-4">
            <Logo />
            <div className="flex-grow">
                <nav className="text-neutral-600">
                    <ul className="flex flex-col gap-2">
                        <li><Link href={route('dashboard')} className="sidebar-link">
                            <svg xmlns="http://www.w3.org/2000/svg" className="size-5" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M5 12l-2 0l9 -9l9 9l-2 0" /><path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" /><path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6" /></svg>
                            <span>Principal</span>
                        </Link></li>
                        <li><Link href={route('dashboard')} className="sidebar-link">
                            <svg xmlns="http://www.w3.org/2000/svg" className="size-5" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 13m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /><path d="M13.45 11.55l2.05 -2.05" /><path d="M6.4 20a9 9 0 1 1 11.2 0z" /></svg>
                            <span>Dashboard</span>
                        </Link></li>
                        <li><Link href={route('research.index', { search: '', page: 1 })} className="sidebar-link">
                            <svg xmlns="http://www.w3.org/2000/svg" className="size-5" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h4.5m7.5 -10v-4a2 2 0 0 0 -2 -2h-2" /><path d="M9 5a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2" /><path d="M18 18m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" /><path d="M20.2 20.2l1.8 1.8" /></svg>
                            <span>Pesquisas</span>
                        </Link></li>
                        <li><Link href={route('users.index')} className="sidebar-link">
                            <svg xmlns="http://www.w3.org/2000/svg" className="size-5" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M9 7m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" /><path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /><path d="M21 21v-2a4 4 0 0 0 -3 -3.85" /></svg>
                            <span>Usuários</span>
                        </Link></li>
                    </ul>
                </nav>
            </div>
            <div className="flex flex-col gap-2">
                <Link href={route('logout')} className="sidebar-link" onClick={handleLogout}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="size-5" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" /><path d="M9 12h12l-3 -3" /><path d="M18 15l3 -3" /></svg>
                    <span>Sair</span>
                </Link>
            </div>
        </aside>
    );
}

export default Sidebar;
