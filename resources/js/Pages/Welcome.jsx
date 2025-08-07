import Modal from "@/Components/Modal";
import Carousel from "@/Components/Twincode/Carousel";
import PublicLayout from "@/Layouts/PublicLayout";
import { Head } from "@inertiajs/react";
import { useState } from "react";

export default function Welcome() {
    const [show, setShow] = useState(false);
    return (
        <PublicLayout title="Principal">
            <Head title="Principal" />
            <main className="flex flex-col gap-8 lg:flex-grow lg:flex-1">
                <section className="bg-gradient-to-r from-teal-500 to-teal-700 text-white py-20 px-6 rounded-2xl shadow-md lg:h-[34rem] flex items-center justify-center">
                    <div className="max-w-4xl mx-auto text-center">
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">TwinCode</h1>
                        <p className="text-xl md:text-2xl mb-8">
                            Ferramenta para comparação de códigos-fonte em pesquisas acadêmicas e análises técnicas.
                        </p>
                        <a
                            href="#sobre"
                            className="bg-white text-neutral-700 px-6 py-3 rounded-lg font-semibold hover:bg-neutral-100 transition"
                        >
                            Saiba Mais
                        </a>
                    </div>
                </section>
                <Carousel />
                <section className="py-16">
                    <div className="max-w-6xl mx-auto px-6">
                        <h2 className="text-3xl font-bold text-center mb-12">Funcionalidades Principais</h2>
                        <div className="grid md:grid-cols-3 gap-10 text-center">
                            <div className="bg-white p-8 rounded-lg shadow-md">
                                <div className="text-blue-600 text-4xl mb-4">🔍</div>
                                <h3 className="text-xl font-semibold mb-3">Comparação Lado a Lado</h3>
                                <p className="text-gray-600">
                                    Analise diferenças técnicas e estilísticas entre versões de códigos em múltiplas linguagens.
                                </p>
                            </div>
                            <div className="bg-white p-8 rounded-lg shadow-md">
                                <div className="text-blue-600 text-4xl mb-4">📊</div>
                                <h3 className="text-xl font-semibold mb-3">Dashboards Dinâmicos</h3>
                                <p className="text-gray-600">
                                    Monitore respostas dos entrevistados e visualize dados em tempo real.
                                </p>
                            </div>
                            <div className="bg-white p-8 rounded-lg shadow-md">
                                <div className="text-blue-600 text-4xl mb-4">📝</div>
                                <h3 className="text-xl font-semibold mb-3">Questionários Personalizados</h3>
                                <p className="text-gray-600">
                                    Crie perguntas adaptadas aos objetivos da sua pesquisa e colete insights relevantes.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="py-16 bg-white rounded-2xl shadow-md">
                    <div className="max-w-6xl mx-auto px-6">
                        <h2 className="text-3xl font-bold text-center mb-12">Para Quem é o TwinCode?</h2>
                        <ul className="space-y-6 text-lg text-gray-700 max-w-3xl mx-auto">
                            <li className="flex items-start">
                                <span className="text-blue-600 mr-3">•</span>
                                <span><strong>Pesquisadores:</strong> Apoio a estudos científicos em engenharia de software e educação computacional.</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-blue-600 mr-3">•</span>
                                <span><strong>Professores:</strong> Ferramenta para ensinar boas práticas de programação e análise crítica de código.</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-blue-600 mr-3">•</span>
                                <span><strong>Desenvolvedores:</strong> Compare abordagens técnicas e explore tendências do mercado.</span>
                            </li>
                        </ul>
                    </div>
                </section>

                <section className="py-16 bg-neutral-300 text-neutral-600 rounded-2xl shadow-md">
                    <div className="max-w-4xl mx-auto text-center px-6">
                        <h2 className="text-3xl font-bold mb-6">Pronto para Transformar Sua Pesquisa?</h2>
                        <p className="text-lg mb-8">
                            Cadastre-se para acessar bases de dados, participar de estudos ou integrar o projeto TwinCode.
                        </p>
                        <button className={`btn btn-blue cursor-pointer`} onClick={() => setShow(true)}>
                            Cadastrar-se na plataforma
                        </button>
                        <Modal show={show} onClose={() => setShow(false)} maxWidth={'lg'}>
                            <div className="flex flex-col gap-4 p-4">
                                <h1 className="text-xl font-bold">Aviso</h1>
                                <p className="text-justify">Use o login e senha que está no formulário de avaliação da ferramenta.</p>
                                <a href="https://forms.gle/SjaSbeva7vULQVtS8" target="_blank" className="text-center text-blue-600 hover:text-blue-700">https://forms.gle/SjaSbeva7vULQVtS8</a>
                                <div className="flex justify-end gap-4">
                                    <button className='btn btn-neutral cursor-pointer' onClick={() => setShow(false)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="size-5"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M18 6l-12 12" /><path d="M6 6l12 12" /></svg>
                                        <span>Fechar</span>
                                    </button>
                                </div>
                            </div>
                        </Modal>
                    </div>
                </section>
            </main>
        </PublicLayout>
    );
}
