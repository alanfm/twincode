import React from 'react';
import RootLayout from './RootLayout';
import Logo from '@/Components/Twincode/Logo';
import { Link } from '@inertiajs/react';

function PublicLayout({ children }) {
    return (
        <RootLayout>
            <div className="flex flex-col justify-between max-h-full h-screen max-w-full w-screen overflow-hidden">
                <header className="flex justify-between bg-white shadow-md w-screen p-2">
                    <div className="flex-1"></div>
                    <Logo />
                    <div className="flex-1 flex justify-end">
                        <nav className="flex items-center gap-4 pr-4">
                            <Link href={route('admin.home')} className="text-neutral-700 hover:text-neutral-900 transition">Entrar</Link>
                        </nav>
                    </div>
                </header>
                <div className=" overflow-auto">
                    <main className="flex-grow overflow-auto p-4 lg:min-h-screen">
                        {children}
                    </main>
                    <footer className="bg-neutral-900 text-white py-10">
                        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-8">
                            <div>
                                <h3 className="text-xl font-bold mb-4">TwinCode</h3>
                                <p className="text-neutral-400">
                                    Ferramenta para comparação de códigos-fonte em pesquisas acadêmicas.
                                </p>
                            </div>
                            <nav>
                                <h3 className="text-xl font-bold mb-4">Links Rápidos</h3>
                                <ul className="space-y-2 text-neutral-400">
                                    <li><a href="#sobre" className="hover:underline transition">Sobre</a></li>
                                    <li><a href="#cadastro" className="hover:underline transition">Cadastro</a></li>
                                    <li><a href="#contato" className="hover:underline transition">Contato</a></li>
                                    <li><Link href={route('admin.home')} className="hover:underline transition">Painel Administrativo</Link></li>
                                </ul>
                            </nav>
                            <address className='not-italic text-neutral-400'>
                                <h3 className="text-xl text-white font-bold mb-4">Contato</h3>
                                <div className="flex gap-4 text-neutral-400" aria-label='Email' title='Email'>
                                    <div>
                                        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="size-6"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 12m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" /><path d="M16 12v1.5a2.5 2.5 0 0 0 5 0v-1.5a9 9 0 1 0 -5.5 8.28" /></svg>
                                    </div>
                                    <a href="mailto:contato@twincode.com.br" className="hover:underline transition">
                                        contato@twincode.com.br
                                    </a>
                                </div>
                                <div className="flex gap-4 text-neutral-400 mt-2" aria-label='Localização' title='Localização'>
                                    <div>
                                        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="size-6"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M9 11a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" /><path d="M17.657 16.657l-4.243 4.243a2 2 0 0 1 -2.827 0l-4.244 -4.243a8 8 0 1 1 11.314 0z" /></svg>
                                    </div>
                                    <div>
                                        Universidade Federal do Ceará - UFC<br />
                                        <em>Campus</em> Sobral<br />
                                        Programa de Pós-graduação em Engenharia Elétrica e Computação
                                    </div>
                                </div>
                                <div className="flex gap-4 text-neutral-400 mt-2" aria-label='Localização' title='Localização'>
                                    <div>
                                        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="size-6"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M9 11a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" /><path d="M17.657 16.657l-4.243 4.243a2 2 0 0 1 -2.827 0l-4.244 -4.243a8 8 0 1 1 11.314 0z" /></svg>
                                    </div>
                                    <div>
                                        Instituto Federal do Ceará - IFCE<br />
                                        <em>Campus</em> Sobral<br />
                                    </div>
                                </div>
                            </address>
                        </div>
                    </footer>
                </div>
            </div>
        </RootLayout>
    );
}

export default PublicLayout;
