import Logo from "@/Components/Twincode/Logo";
import codeToHtml from "@/libs/codeHighLihter";
import { Head, Link, useForm } from "@inertiajs/react";
import { useCallback, useEffect, useState } from "react";
import QuestionnaireModal from "./partials/QuestionnaireModal";

function Participant({ research, comparison }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        answers: {},
    });

    const [answer, setAnswer] = useState({});
    const [showCode1, setShowCode1] = useState('');
    const [showCode2, setShowCode2] = useState('');

    useEffect(() => {
        setShowCode1(codeToHtml(comparison.data[0].snippet_code_1, comparison.data[0].language.toLowerCase()));
        setShowCode2(codeToHtml(comparison.data[0].snippet_code_2, comparison.data[0].language.toLowerCase()));
    }, []);

    const handleSubmit = (e) => {
        // e.preventDefault();
        // post(route('questions.options.store', { question: question.id }), { data, preserveState: true, preserveScroll: true, onSuccess: () => {
        //         reset();
        //         router.flushAll();
        //         setShow(false);
        //     }
        // });
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAnswer(prev => ({
            ...prev,
            [name]: value,
        }));
        setData('answers', answer);
    };

    const handleCheckboxChange = useCallback((e) => {
        const { name, value, checked } = e.target;
        setAnswer(prev => {
            const currentValues = prev[name] ?? [];
            let updated;

            if (checked) {
                updated = currentValues.includes(value)
                    ? currentValues
                    : [...currentValues, value];
            } else {
                updated = currentValues.filter((item) => item !== value);
            }

            return {
                ...prev,
                [name]: updated,
            };
        });
        setData('answers', answer);
    }, []);

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
                <main className="flex-1 flex bg-white gap-4 overflow-hidden">
                    <div className="flex-1 overflow-auto max-h-full h-full" dangerouslySetInnerHTML={{ __html: showCode1 }}></div>
                    <div className="flex-1 overflow-auto max-h-full h-full" dangerouslySetInnerHTML={{ __html: showCode2 }}></div>
                </main>
                <footer className="flex justify-between gap-4 py-2 px-4 bg-neutral-200 flex-shrink-0">
                    {!comparison.prev_page_url && (
                        <Link href={route('public.research.participant', { key: research.key })} className="btn btn-neutral" prefetch>Anterior</Link>
                    )}

                    {comparison.current_page > 1 && (
                        <Link href={comparison.prev_page_url} className="btn btn-neutral" prefetch>Anterior</Link>
                    )}
                    <QuestionnaireModal
                        questionnaire={comparison.data[0].questionnaires}
                        handleCheckboxChange={handleCheckboxChange}
                        handleChange={handleChange}
                        data={answer}
                        errors={errors}
                        processing={processing}
                    />
                    {comparison.current_page == comparison.last_page && (
                        <Link href={route('public.research.conclusion', { key: research.key })} className="btn btn-neutral" prefetch>Próximo</Link>
                    )}

                    {comparison.current_page < comparison.last_page && (
                        <Link href={comparison.next_page_url} className="btn btn-neutral" prefetch>Próximo</Link>
                    )}
                </footer>
            </div>
        </>
    );
}

export default Participant;
