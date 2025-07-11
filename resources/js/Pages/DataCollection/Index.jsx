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
                            <div className="font-normal border-2 rounded-lg p-4 block" dangerouslySetInnerHTML={{ __html: research.acceptance_terms }}></div>
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
