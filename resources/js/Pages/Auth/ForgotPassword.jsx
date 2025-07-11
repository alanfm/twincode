import Logo from "@/Components/Twincode/Logo";
import RootLayout from "@/Layouts/RootLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";

function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('password.email'));
    };

    return (
        <RootLayout>
            <Head title="Recuperar a senha" />
            <div className="flex flex-col gap-4 min-h-scree h-screen min-w-scree w-scree items-center justify-center bg-neutral-100">
                <header className="py-6 text-neutral-500">
                    <Logo />
                </header>
                <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
                    <div className="mb-4 text-gray-600 text-sm">
                        Esqueceu sua senha? Sem problemas. Basta nos informar seu endereço de e-mail
                        e enviaremos um link para redefinição de senha que permitirá que você escolha uma nova.
                    </div>
                    <form onSubmit={submit} className="flex flex-col gap-4">
                        <div className="">
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
                                <span>Enviar redefinição de senha</span>
                            </button>
                        </div>
                    </form>
                </div>
                <footer className="text-sm">
                    &copy; {new Date().getFullYear()} Twincode. Todos os direitos reservados.
                </footer>
            </div>
        </RootLayout>
    );
}

export default ForgotPassword;


// import InputError from '@/Components/InputError';
// import PrimaryButton from '@/Components/PrimaryButton';
// import TextInput from '@/Components/TextInput';
// import GuestLayout from '@/Layouts/GuestLayout';
// import { Head, useForm } from '@inertiajs/react';

// export default function ForgotPassword({ status }) {
//     const { data, setData, post, processing, errors } = useForm({
//         email: '',
//     });

//     const submit = (e) => {
//         e.preventDefault();

//         post(route('password.email'));
//     };

//     return (
//         <GuestLayout>
//             <Head title="Forgot Password" />

//             <div className="mb-4 text-sm text-gray-600">
//                 Esqueceu sua senha? Sem problemas. Basta nos informar seu endereço de e-mail
//                 e enviaremos um link para redefinição de senha que permitirá que você escolha uma nova.
//             </div>

//             {status && (
//                 <div className="mb-4 text-sm font-medium text-green-600">
//                     {status}
//                 </div>
//             )}

//             <form onSubmit={submit}>
//                 <TextInput
//                     id="email"
//                     type="email"
//                     name="email"
//                     value={data.email}
//                     className="mt-1 block w-full"
//                     isFocused={true}
//                     onChange={(e) => setData('email', e.target.value)}
//                 />

//                 <InputError message={errors.email} className="mt-2" />

//                 <div className="mt-4 flex items-center justify-end">
//                     <PrimaryButton className="ms-4" disabled={processing}>
//                         Email Password Reset Link
//                     </PrimaryButton>
//                 </div>
//             </form>
//         </GuestLayout>
//     );
// }
