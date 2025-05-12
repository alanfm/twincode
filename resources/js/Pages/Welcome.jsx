import Carousel from "@/Components/Twincode/Carousel";
import PublicLayout from "@/Layouts/PublicLayout";
import { Head } from "@inertiajs/react";

export default function Welcome() {
    return (
        <PublicLayout title="Principal">
            <Head title="Principal" />
            <main className="flex flex-col gap-8">
                <section className="bg-gradient-to-r from-blue-400 to-sky-500 text-white py-20 px-6 rounded-2xl shadow-md">
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
                        <a
                            href="/cadastro"
                            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
                        >
                            Participar da Pesquisa
                        </a>
                    </div>
                </section>
            </main>
        </PublicLayout>
    );
}
