import Logo from '@/Components/Twincode/Logo';
import { Head, Link, useForm } from '@inertiajs/react';

export default function ResetPassword({ token, email }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        token: token,
        email: email,
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('password.store'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <>
            <Head title="Redefinir senha" />
            <div className="flex flex-col gap-4 min-h-scree h-screen min-w-scree w-scree items-center justify-center bg-neutral-100">
                <header className="py-6 text-neutral-500">
                    <Logo />
                </header>
                <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
                    <form onSubmit={submit} className="flex flex-col gap-4">
                        <div className="">
                            <p>Código:</p>
                            <p className='w-full p-2 border border-gray-300 rounded font-normal bg-neutral-100 select-none overflow-hidden'>{data.token}</p>
                            {errors.token && <div className="text-red-500 text-sm">{errors.token}</div>}
                        </div>
                        <div className="">
                            <label htmlFor="email">E-mail:</label>
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
                                autoComplete="new-password"
                                className="w-full p-2 border border-gray-300 rounded font-normal"
                                placeholder="Nova senha"
                                isFocused={true}
                                onChange={(e) => setData('password', e.target.value)}
                            />
                            {errors.password && <div className="text-red-500 text-sm">{errors.password}</div>}
                        </div>
                        <div className="">
                            <label htmlFor="password_confirmation" className="password_confirmation">Confirmação de senha:</label>
                            <input
                                type="password"
                                id="password_confirmation"
                                name="password_confirmation"
                                value={data.password_confirmation}
                                autoComplete="new-password"
                                className="w-full p-2 border border-gray-300 rounded font-normal"
                                placeholder="Confirmação da nova senha"
                                isFocused={true}
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                            />
                            {errors.password_confirmation && <div className="text-red-500 text-sm">{errors.password_confirmation}</div>}
                        </div>
                        <div className="flex items-center justify-between">
                            <Link href={route('login')} className='btn btn-neutral' prefetch>
                                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="size-5"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M9 11l-4 4l4 4m-4 -4h11a4 4 0 0 0 0 -8h-1" /></svg>
                                <span>Voltar</span>
                            </Link>

                            <button
                                type="submit"
                                className="btn btn-blue"
                                disabled={processing}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="size-5"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M10 14l11 -11" /><path d="M21 3l-6.5 18a.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a.55 .55 0 0 1 0 -1l18 -6.5" /></svg>
                                <span>Redefinir senha</span>
                            </button>
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


// return (
//     <GuestLayout>
//         <Head title="Reset Password" />

//         <form onSubmit={submit}>
//             <div>
//                 <InputLabel htmlFor="email" value="Email" />

//                 <TextInput
//                     id="email"
//                     type="email"
//                     name="email"
//                     value={data.email}
//                     className="mt-1 block w-full"
//                     autoComplete="username"
//                     onChange={(e) => setData('email', e.target.value)}
//                 />

//                 <InputError message={errors.email} className="mt-2" />
//             </div>

//             <div className="mt-4">
//                 <InputLabel htmlFor="password" value="Password" />

//                 <TextInput
//                     id="password"
//                     type="password"
//                     name="password"
//                     value={data.password}
//                     className="mt-1 block w-full"
//                     autoComplete="new-password"
//                     isFocused={true}
//                     onChange={(e) => setData('password', e.target.value)}
//                 />

//                 <InputError message={errors.password} className="mt-2" />
//             </div>

//             <div className="mt-4">
//                 <InputLabel
//                     htmlFor="password_confirmation"
//                     value="Confirm Password"
//                 />

//                 <TextInput
//                     type="password"
//                     id="password_confirmation"
//                     name="password_confirmation"
//                     value={data.password_confirmation}
//                     className="mt-1 block w-full"
//                     autoComplete="new-password"
//                     onChange={(e) =>
//                         setData('password_confirmation', e.target.value)
//                     }
//                 />

//                 <InputError
//                     message={errors.password_confirmation}
//                     className="mt-2"
//                 />
//             </div>

//             <div className="mt-4 flex items-center justify-end">
//                 <PrimaryButton className="ms-4" disabled={processing}>
//                     Reset Password
//                 </PrimaryButton>
//             </div>
//         </form>
//     </GuestLayout>
// );
