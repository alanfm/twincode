import PrimaryButton from '@/Components/PrimaryButton';
import Alert from '@/Components/Twincode/Dashboard/Alert';
import Logo from '@/Components/Twincode/Logo';
import { Head, Link, useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';

export default function VerifyEmail({ status }) {
    const { post, processing } = useForm({});

    const [alert, setAlert] = useState(status ? true : false);

    useEffect(() => {
        setAlert(true);
        const debounce = setTimeout(() => {
            setAlert(false);
        }, 7000);

        return () => {
            clearTimeout(debounce);
        }
    }, [status]);

    const submit = (e) => {
        e.preventDefault();

        post(route('verification.send'));
    };

    return (
        <>
            <Head title="Verificação de e-mail" />

            {status === 'verification-link-sent' && (
                <Alert type="success" show={true} message={'Um novo link de verificação foi enviado para o endereço de e-mail que você forneceu durante o registro.'} />
            )}
            <div className="flex flex-col gap-4 min-h-scree h-screen min-w-scree w-scree items-center justify-center bg-neutral-100">
                <header className="py-6 text-neutral-500">
                    <Logo />
                </header>
                <div className="flex flex-col gap-4 bg-white shadow-md rounded-lg p-6 w-full max-w-md">
                    <div className="">
                        <div className="text-sm">
                            Obrigado por se inscrever! Antes de começar, você poderia verificar seu endereço de e-mail clicando no link que acabamos de enviar? Caso não tenha recebido o e-mail, teremos prazer em enviar outro.
                        </div>
                    </div>
                    <form onSubmit={submit}>
                        <div className="mt-4 flex items-center justify-between">
                            <button className='btn btn-blue' disabled={processing}>
                                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="size-5"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M10 14l11 -11" /><path d="M21 3l-6.5 18a.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a.55 .55 0 0 1 0 -1l18 -6.5" /></svg>
                                <span>Reenviar e-mail de verificação</span>
                            </button>

                            <Link
                                href={route('logout')}
                                method="post"
                                as="button"
                                className="btn btn-yellow"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="size-5" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" /><path d="M9 12h12l-3 -3" /><path d="M18 15l3 -3" /></svg>
                                <span>Sair</span>
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
            <footer className="text-sm">
                &copy; {new Date().getFullYear()} Twincode. Todos os direitos reservados.
            </footer>
        </>
    );
}
