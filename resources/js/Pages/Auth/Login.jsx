import Alert from "@/Components/Twincode/Dashboard/Alert";
import Logo from "@/Components/Twincode/Logo";
import { Head, Link, useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";

function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });
    const [alert, setAlert] = useState(false);

    useEffect(() => {
        if (status) {
            setAlert(true);
            const debounce = setTimeout(() => {
                setAlert(false);
            }, 7000);

            return () => {
                clearTimeout(debounce);
            }
        }
    }, [status]);

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <>
            {status && (<Alert type="success" message={status} show={alert} />)}
            <Head title="Autenticação" />
            <div className="flex flex-col gap-4 min-h-scree h-screen min-w-scree w-scree items-center justify-center bg-neutral-100">
                <header className="py-6 text-neutral-500">
                    <Logo />
                </header>
                <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
                    <h1 className="text-2xl font-semibold text-center mb-4 text-neutral-500">
                        Acesse sua conta
                    </h1>
                    <form onSubmit={submit} className="flex flex-col gap-4 mb-4">
                        <div>
                            <label htmlFor="email" className="email">E-mail:</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={data.email}
                                autoComplete="username"
                                className="w-full p-2 border border-gray-300 rounded font-normal"
                                placeholder="Digite seu e-mail"
                                autoFocus
                                onChange={(e) => setData('email', e.target.value)}
                            />
                            {errors.email && <div className="text-red-500 text-sm">{errors.email}</div>}
                        </div>
                        <div className="">
                            <label htmlFor="password" className="password">Senha:</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={data.password}
                                className="w-full p-2 border border-gray-300 rounded font-normal"
                                placeholder="Digite sua senha"
                                onChange={(e) => setData('password', e.target.value)}
                                autoComplete="current-password"
                            />
                            {errors.password && <div className="text-red-500 text-sm">{errors.password}</div>}
                        </div>
                        <div className="flex items-center mb-4">
                            <input
                                type="checkbox"
                                id="remember"
                                name="remember"
                                className="mr-2 rounded-md size-5"
                                checked={data.remember}
                                onChange={(e) =>
                                    setData('remember', e.target.checked)
                                }
                            />
                            <label htmlFor="remember" className="text-sm text-gray-600">
                                Lembrar-me
                            </label>
                        </div>
                        <div className="flex items-center justify-between">
                            <button
                                type="submit"
                                className="btn btn-blue"
                                disabled={processing}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="size-5"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M9 8v-2a2 2 0 0 1 2 -2h7a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-7a2 2 0 0 1 -2 -2v-2" /><path d="M3 12h13l-3 -3" /><path d="M13 15l3 -3" /></svg>
                                <span>Entrar</span>
                            </button>
                            {canResetPassword && (
                                <Link
                                    href={route('password.request')}
                                    className="text-sm text-blue-500 hover:underline"
                                >
                                    Esqueci minha senha.
                                </Link>
                            )}
                        </div>
                    </form>
                </div>
                <footer className="text-sm">
                    &copy; {new Date().getFullYear()} Twincode. Todos os direitos reservados.
                </footer>
            </div>
        </>
    );
}

export default Login;
