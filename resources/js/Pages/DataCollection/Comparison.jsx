import Logo from "@/Components/Twincode/Logo";
import codeToHtml from "@/libs/codeHighLihter";
import { Head, Link, useForm } from "@inertiajs/react";
import { useEffect, useRef, useState } from "react";
import QuestionnaireModal from "./partials/QuestionnaireModal";

function changeFontSize(multiplier) {
    const elements = document.querySelectorAll(".code");
    elements.forEach(element => {
        const currentSize = parseFloat(window.getComputedStyle(element).fontSize);
        const newSize = Math.min(Math.max(currentSize * multiplier, 8), 48);
        element.style.fontSize = `${newSize}px`;
    });
    console.log('Zoom click!')
}

function Participant({ research, comparison, formData, page }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        answers: formData.answers || [],
    });

    const [showCode1, setShowCode1] = useState('');
    const [showCode2, setShowCode2] = useState('');

    useEffect(() => {
        setShowCode1(codeToHtml(comparison.data[0].snippet_code_1, comparison.data[0].language.toLowerCase()));
        setShowCode2(codeToHtml(comparison.data[0].snippet_code_2, comparison.data[0].language.toLowerCase()));
    }, []);

    useEffect(() => {
        const answers = Array.isArray(data.answers) ? data.answers : [];

        const unansweredQuestions = comparison.data[0].questionnaires.reduce((acc, questionnaire) => {
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

    console.log('data', data);

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('public.research.comparison.store', { key: research.key }), { data, preserveState: true, preserveScroll: true });
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
        <>
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
                            <li className="text-green-500">
                                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="size-5"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M9 12l2 2l4 -4" /><path d="M12 3c7.2 0 9 1.8 9 9s-1.8 9 -9 9s-9 -1.8 -9 -9s1.8 -9 9 -9z" /></svg>
                            </li>
                            <li className="font-semibold -mt-0.5">&mdash;</li>
                            <li className="text-blue-500">
                                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="size-5"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 3c7.2 0 9 1.8 9 9s-1.8 9 -9 9s-9 -1.8 -9 -9s1.8 -9 9 -9z" /></svg>
                            </li>
                            <li className="font-semibold -mt-0.5">&mdash;</li>
                            <li className="">
                                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="size-5"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 3c7.2 0 9 1.8 9 9s-1.8 9 -9 9s-9 -1.8 -9 -9s1.8 -9 9 -9z" /></svg>
                            </li>
                        </ul>
                    </div>
                </header>
                <main className="flex-1 flex flex-col bg-white gap-4 overflow-hidden">
                    <h2 className="text-center font-medium text-lg">{page + ' - ' + comparison.data[0].description}</h2>
                    <div className="flex gap-4">
                        <h3 className="flex-1 text-center font-medium">Código 1</h3>
                        <div className="flex gap-2 items-center">
                            <button className="btn btn-neutral" onClick={() => changeFontSize(1.1)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="size-5"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" /><path d="M7 10l6 0" /><path d="M10 7l0 6" /><path d="M21 21l-6 -6" /></svg>
                            </button>
                            <button className="btn btn-neutral" onClick={() => changeFontSize(0.9)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="size-5"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" /><path d="M7 10l6 0" /><path d="M21 21l-6 -6" /></svg>
                            </button>
                        </div>
                        <h3 className="flex-1 text-center font-medium">Código 2</h3>
                    </div>
                    <div className="flex-1 flex bg-white gap-4 overflow-hidden">
                        <div
                            className="flex-1 overflow-auto max-h-full h-full code"
                            dangerouslySetInnerHTML={{ __html: showCode1 }}
                        ></div>
                        <div
                            className="flex-1 overflow-auto max-h-full h-full code"
                            dangerouslySetInnerHTML={{ __html: showCode2 }}
                        ></div>
                    </div>
                </main>
                <footer className="flex justify-between gap-4 py-2 px-4 bg-neutral-200 flex-shrink-0">
                    {!comparison.prev_page_url && (
                        <Link href={route('public.research.participant', { key: research.key })} className="btn btn-neutral">Anterior</Link>
                    )}

                    {comparison.current_page > 1 && (
                        <Link href={comparison.prev_page_url} className="btn btn-neutral">Anterior</Link>
                    )}

                    <QuestionnaireModal
                        questionnaire={comparison.data[0].questionnaires}
                        handleCheckboxChange={handleCheckboxChange}
                        handleChange={handleChange}
                        handleSubmit={handleSubmit}
                        data={data.answers}
                        errors={errors}
                        processing={processing}
                    />

                    {comparison.current_page == comparison.last_page && (
                        <Link href={route('public.research.conclusion', { key: research.key })} className="btn btn-neutral">Próximo</Link>
                    )}

                    {comparison.current_page < comparison.last_page && (
                        <Link href={comparison.next_page_url} className="btn btn-neutral">Próximo</Link>
                    )}
                </footer>
            </div>
        </>
    );
}

export default Participant;
