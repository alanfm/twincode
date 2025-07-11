import Logo from "@/Components/Twincode/Logo";
import { Head, Link, useForm } from "@inertiajs/react";
import QuestionnaireInitial from "./partials/QuestionnaireInitial";
import { useCallback, useEffect, useState } from "react";
import RootLayout from "@/Layouts/RootLayout";

function Participant({ research, formData }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: formData.name || '',
        email: formData.email || '',
        answers: formData.answers || [],
    });

    useEffect(() => {
        const answers = Array.isArray(data.answers) ? data.answers : [];

        const unansweredQuestions = research.questionnaires.reduce((acc, questionnaire) => {
            const questions = questionnaire.questions ?? [];

            questions.forEach(question => {
                const answered = answers.some(answer => answer.question_id === question.id);
                if (!answered) {
                    acc[question.id] = [];
                }
            });

            return acc;
        }, {});

        setData('answers', {
            ...unansweredQuestions,
            ...formData.answers
        });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('public.research.participant.store', { key: research.key }), {
            data,
            preserveState: true,
            preserveScroll: true,
            onError: () => window.scrollTo(0, 0),
        });
    }

    const handleChange = (e) => {
        const { name, value, type } = e.target;
        setData('answers', {
            ...data.answers,
            [name]: value,
        });
    };

    function handleCheckboxChange(e) {
        const { name, value, checked } = e.target;
        const currentValues = data.answers[name] || [];
        let updated;
        if (checked) {
            updated = currentValues.includes(value)
                ? currentValues
                : [...currentValues, value];
        } else {
            updated = currentValues.filter((item) => item !== value);
        }
        setData('answers', {
            ...data.answers,
            [name]: updated,
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
                            <li className="text-green-500">
                                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="size-5"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M9 12l2 2l4 -4" /><path d="M12 3c7.2 0 9 1.8 9 9s-1.8 9 -9 9s-9 -1.8 -9 -9s1.8 -9 9 -9z" /></svg>
                            </li>
                            <li className="font-semibold -mt-0.5">&mdash;</li>
                            <li className="text-blue-500">
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
                        <form action="">
                            <div className="bg-white shadow-md w-4xl mx-auto py-8 rounded-md flex flex-col gap-4 mb-4">
                                <div className="w-full mx-auto flex flex-col gap-4">
                                    <h1 className="text-lg font-medium text-center">Dados do Participante</h1>
                                </div>
                                <div className="w-full mx-auto flex flex-col gap-4 p-4">
                                    <div className="w-full flex flex-col">
                                        <label htmlFor="name" className="font-normal">1 - Nome:</label>
                                        <input
                                            type="text"
                                            name='name'
                                            id='name'
                                            value={data.name}
                                            className='rounded-md'
                                            onChange={(e) => setData('name', e.target.value)}
                                            placeholder='Nome do participante'
                                            autoComplete="off"
                                            required
                                        />
                                        {errors.name && <p className='text-red-500 text-sm'>{errors.name}</p>}
                                    </div>
                                    <div className="w-full flex flex-col">
                                        <label htmlFor="email" className="font-normal">2 - Email:</label>
                                        <input
                                            type="email"
                                            name='email'
                                            id='email'
                                            value={data.email}
                                            className='rounded-md'
                                            onChange={(e) => setData('email', e.target.value)}
                                            placeholder='Email do participante'
                                            autoComplete="off"
                                            required
                                        />
                                        {errors.email && <p className='text-red-500 text-sm'>{errors.email}</p>}
                                    </div>
                                    {research.questionnaires.map((questionnaire, i) => (
                                        <fieldset className="border border-gray-300 rounded-md p-4 flex flex-col gap-4" key={questionnaire.id}>
                                            <legend className="text-lg font-medium">{questionnaire.description}</legend>
                                            <QuestionnaireInitial
                                                key={questionnaire.id + "-" + i}
                                                questionnaire={questionnaire}
                                                handleCheckboxChange={handleCheckboxChange}
                                                handleChange={handleChange}
                                                data={data}
                                                errors={errors}
                                            />
                                        </fieldset>
                                    ))}
                                </div>
                            </div>
                        </form>
                    </div>
                </main>
                <footer className="flex justify-between gap-4 py-2 px-4 bg-neutral-200">
                    <Link href={route('public.research.index', { key: research.key })} className="btn btn-neutral" prefetch>Anterior</Link>
                    <span>&nbsp;</span>
                    {/* <button className="btn btn-green">Responder</button> */}
                    <button
                        onClick={handleSubmit}
                        className="btn btn-neutral"
                        disabled={(data.name === '' || data.name === null || data.name === undefined) || (data.email === '' || data.email === null || data.email === undefined)}
                    >
                        Próximo
                    </button>
                </footer>
            </div>
        </RootLayout>
    );
}

export default Participant;
