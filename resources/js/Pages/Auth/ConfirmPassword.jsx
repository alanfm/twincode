import Logo from '@/Components/Twincode/Logo';
import RootLayout from '@/Layouts/RootLayout';
import { Head, useForm } from '@inertiajs/react';

export default function ConfirmPassword() {
    const { data, setData, post, processing, errors, reset } = useForm({
        password: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('password.confirm'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <RootLayout>
            <Head title="Confirm Password" />

            <div className="flex flex-col gap-4 min-h-scree h-screen min-w-scree w-scree items-center justify-center bg-neutral-100">
                <header className="py-6 text-neutral-500">
                    <Logo />
                </header>
                <div className="text-sm">
                    Esta é uma área segura do aplicativo. Confirme sua senha antes de continuar.
                </div>
                <div className="flex flex-col gap-4 bg-white shadow-md rounded-lg p-6 w-full max-w-md">
                    <form onSubmit={submit} className="flex flex-col gap-4">
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
                                autoFocus
                                required
                            />
                            {errors.password && <div className="text-red-500 text-sm">{errors.password}</div>}
                        </div>
                        <div className="">
                            <button className="btn btn-blue" disabled={processing}>
                                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="size-5"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M10 14l11 -11" /><path d="M21 3l-6.5 18a.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a.55 .55 0 0 1 0 -1l18 -6.5" /></svg>
                                <span>Confirmar</span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <footer className="text-sm">
                &copy; {new Date().getFullYear()} Twincode. Todos os direitos reservados.
            </footer>
        </RootLayout>
    );
}
