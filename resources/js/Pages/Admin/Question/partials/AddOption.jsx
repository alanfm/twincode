import Modal from "@/Components/Modal";
import { useForm } from "@inertiajs/react";
import { useEffect, useRef, useState } from "react";

function AddOption({ question }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        description: '',
    });

    const [show, setShow] = useState(false);
    const inputRef = useRef(null);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('questions.options.store', { question: question.id }), {
            data,
            preserveState: true,
            preserveScroll: true,
            onSuccess: () => {
                reset();
                setShow(false);
            }
        });
    }

    return (
        <>
            <button className='btn btn-blue' onClick={() => setShow(true)}>
                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 5l0 14" /><path d="M5 12l14 0" /></svg>
                <span>Novo</span>
            </button>
            <Modal show={show} onClose={() => setShow(false)} maxWidth={'lg'}>
                <form className="flex flex-col gap-4 p-4" onSubmit={handleSubmit}>
                    <h1 className="text-xl font-bold">Cadastrar Item</h1>
                    <div className="w-full flex flex-col">
                        <label htmlFor="description">Descrição:</label>
                        <input
                            type="text"
                            name='description'
                            id='description'
                            className='rounded-md'
                            onChange={(e) => setData('description', e.target.value)}
                            placeholder='Texto do item'
                            ref={inputRef}
                            autoFocus
                        />
                        <small>Escreva o texto do item que será apresentado aos respondentes.</small>
                        {errors.description && <p className='text-red-500 text-sm'>{errors.description}</p>}
                    </div>
                    <div className="flex justify-end gap-4">
                        <button className='btn btn-neutral' onClick={() => setShow(false)} type="reset">
                            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="size-5"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M18 6l-12 12" /><path d="M6 6l12 12" /></svg>
                            <span>Cancelar</span>
                        </button>
                        <button className='btn btn-green' type="submit" disabled={processing}>
                            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="size-5"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M15 10l-4 4l6 6l4 -16l-18 7l4 2l2 6l3 -4" /></svg>
                            <span>Salvar</span>
                        </button>
                    </div>
                </form>
            </Modal>
        </>
    );
}

export default AddOption;
