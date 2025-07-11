import Logo from "@/Components/Twincode/Logo";
import RootLayout from "@/Layouts/RootLayout";
import { Head, useForm } from "@inertiajs/react";

function Index({ research, formData }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        accept: formData.accept || false,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(data);
        post(route('public.research.accepted', {key: research.key}), {
            data,
            preserveState: true,
            preserveScroll: true,
        });
    }

    return (
        <RootLayout>
            <Head title={research.title} />
            <div className="max-h-screen h-screen max-w-screen w-screen flex flex-col">
                <header className="bg-neutral-200 py-1 flex justify-between items-center px-4 flex-shrink-0">
                    <div className="">
                        <Logo />
                    </div>
                    <h1 className="flex-1 text-xl font-semibold text-center">{research.title}</h1>
                    <div className="">
                        <ul className="flex">
                            <li className="text-blue-500">
                                {/* <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="size-5"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M9 12l2 2l4 -4" /><path d="M12 3c7.2 0 9 1.8 9 9s-1.8 9 -9 9s-9 -1.8 -9 -9s1.8 -9 9 -9z" /></svg> */}
                                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="size-5"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 3c7.2 0 9 1.8 9 9s-1.8 9 -9 9s-9 -1.8 -9 -9s1.8 -9 9 -9z" /></svg>
                            </li>
                            <li className="font-semibold -mt-0.5">&mdash;</li>
                            <li>
                                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="size-5"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 3c7.2 0 9 1.8 9 9s-1.8 9 -9 9s-9 -1.8 -9 -9s1.8 -9 9 -9z" /></svg>
                            </li>
                            <li className="font-semibold -mt-0.5">&mdash;</li>
                            <li>
                                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="size-5"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 3c7.2 0 9 1.8 9 9s-1.8 9 -9 9s-9 -1.8 -9 -9s1.8 -9 9 -9z" /></svg>
                            </li>
                            <li className="font-semibold -mt-0.5">&mdash;</li>
                            <li>
                                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="size-5"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 3c7.2 0 9 1.8 9 9s-1.8 9 -9 9s-9 -1.8 -9 -9s1.8 -9 9 -9z" /></svg>
                            </li>
                        </ul>
                    </div>
                </header>
                <main className="flex h-full overflow-y-auto">
                    <div className="p-4 flex flex-col gap-4 w-full">
                        <div className="bg-white shadow-lg py-8 rounded-md flex flex-col gap-4">
                            <div className="w-xl mx-auto flex flex-col gap-4">
                                <h1 className="text-4xl font-semibold text-center">Bem vindo a nossa pesquisa!</h1>
                                <h2 className="text-xl font-semibold text-center">Titulo: {research.title}</h2>
                                <p className="leading-7 text-center font-normal text-lg">Resumo: {research.description}</p>
                            </div>
                        </div>
                        <div className="w-6xl mx-auto flex flex-col gap-4">
                            <h1 className="text-2xl font-medium text-center mb-4">
                                Termos de Aceite para Participação na Pesquisa
                            </h1>
                            <p className="text-lg mb-4">
                                Bem-vindo(a)! Antes de prosseguir, solicitamos sua leitura e concordância com os seguintes termos de participação na nossa pesquisa:
                            </p>

                            <ul className="list-decimal list-inside flex flex-col gap-4">
                                <li className="">
                                    <strong>Objetivo da Pesquisa</strong><br />
                                    Esta pesquisa tem como objetivo compreender hábitos de uso de recursos online e avaliar a eficácia de novas ferramentas de aprendizado digital. Sua colaboração é fundamental para melhorar nossos serviços.
                                </li>
                                <li className="">
                                    <strong>Voluntariedade</strong><br />
                                    Sua participação é totalmente voluntária. Você pode interromper sua participação a qualquer momento, sem necessidade de justificar, e sem qualquer prejuízo.
                                </li>
                                <li className="">
                                    <strong>Procedimentos</strong><br />
                                    Ao concordar, você será direcionado(a) para um formulário online que inclui perguntas de múltipla escolha e questões abertas. Estimamos que levará cerca de 10 a 15 minutos para ser concluído.
                                </li>
                                <li className="">
                                    <strong>Confidencialidade e Privacidade</strong><br />
                                    Todas as informações fornecidas serão tratadas de forma estritamente confidencial. Os dados serão armazenados em servidor seguro e criptografados, sendo utilizados apenas para fins de análise estatística e desenvolvimento de relatórios. Nenhuma informação pessoal identificável será divulgada.
                                </li>
                                <li className="">
                                    <strong>Riscos e Benefícios</strong><br />
                                    Não há riscos conhecidos além dos usuais relacionados ao preenchimento de formulários online. Você não receberá compensação financeira, mas sua participação contribuirá para o avanço do conhecimento na área de tecnologia educacional.
                                </li>
                                <li className="">
                                    <strong>Contato</strong><br />
                                    Em caso de dúvidas ou solicitações de esclarecimento, entre em contato com a equipe de pesquisa pelo e-mail [pesquisa@exemplo.edu.br](mailto:pesquisa@exemplo.edu.br).
                                </li>
                            </ul>
                            <p>
                                Ao clicar em “Aceito” abaixo, você declara que leu, compreendeu e concorda livremente com todos os termos descritos acima, autorizando o uso de seus dados conforme aqui estabelecido.
                            </p>
                            <form action="" className="flex flex-col gap-4 mb-6">
                                <div className="flex items-center justify-center gap-2">
                                    <input
                                        type="checkbox"
                                        name="accept"
                                        id="accept"
                                        className="rounded-md size-5"
                                        onChange={(e) => setData('accept', e.target.checked)}
                                        checked={data.accept}
                                    />
                                    <label htmlFor="accept" className="font-normal">Aceito os termos de participação na pesquisa</label>
                                </div>
                                <div className="text-center">
                                    <button
                                        type="submit"
                                        className="btn btn-green"
                                        disabled={processing || !data.accept}
                                        onClick={handleSubmit}
                                    >
                                        Iniciar Pesquisa
                                    </button>
                                </div>

                            </form>
                        </div>
                    </div>
                </main>
                <footer className="flex justify-between gap-4 py-2 px-4 bg-neutral-200">
                    <span>&nbsp;</span>
                    <span>&nbsp;</span>
                    <span>&nbsp;</span>
                </footer>
            </div>
        </RootLayout>
    );
}

export default Index;
