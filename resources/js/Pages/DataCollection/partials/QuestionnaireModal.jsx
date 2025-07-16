import Modal from "@/Components/Modal";
import { useState } from "react";
import QuestionnaireComparison from "./QuestionnaireComparison";

function QuestionnaireModal({
    questionnaire,
    handleCheckboxChange,
    handleChange,
    data,
    errors,
    handleSubmit,
    processing
}) {
    const [show, setShow] = useState(false);

    return (
        <>
            <button className='btn btn-green' onClick={() => setShow(true)}>
                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="size-5"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M8 9h8" /><path d="M8 13h6" /><path d="M14.5 18.5l-2.5 2.5l-3 -3h-3a3 3 0 0 1 -3 -3v-8a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v4.5" /><path d="M19 22v.01" /><path d="M19 19a2.003 2.003 0 0 0 .914 -3.782a1.98 1.98 0 0 0 -2.414 .483" /></svg>
                <span>Perguntas</span>
            </button>
            <Modal show={show} onClose={() => setShow(false)} maxWidth={'2xl'}>
                <form className="flex flex-col gap-4 p-4 overflow-y-auto" onSubmit={handleSubmit}>
                    <h1 className="text-xl font-bold">Questionário sobre o Código</h1>
                    {questionnaire.map((q, i) => {
                        return (
                            <fieldset className="border border-gray-300 rounded-md p-4 flex flex-col gap-4" key={q.id}>
                                <legend className="text-lg font-medium">{q.title}</legend>
                                <p className="text-sm font-normal">{q.description}</p>
                                <QuestionnaireComparison
                                    key={q.id + "-" + i}
                                    questionnaire={q}
                                    handleCheckboxChange={handleCheckboxChange}
                                    handleChange={handleChange}
                                    data={data}
                                    errors={errors}
                                />
                            </fieldset>
                        );
                    })}
                    <div className="flex justify-end gap-4">
                        <button className='btn btn-neutral' onClick={() => setShow(false)} type="reset">
                            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="size-5"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M18 6l-12 12" /><path d="M6 6l12 12" /></svg>
                            <span>Cancelar</span>
                        </button>
                        <button className='btn btn-green' type="submit" disabled={processing} onClick={() => setShow(false)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="size-5"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M15 10l-4 4l6 6l4 -16l-18 7l4 2l2 6l3 -4" /></svg>
                            <span>Salvar</span>
                        </button>
                    </div>
                </form>
            </Modal>
        </>
    );
}

export default QuestionnaireModal;
