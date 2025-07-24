import Modal from "@/Components/Modal";
import { router } from "@inertiajs/react";
import { useState } from "react";

function ConfirmDelete({ url, className = '' }) {
    const [show, setShow] = useState(false);

    const handleSubmit = () => {
        router.delete(url, {
            preserveState: true,
            preserveScroll: true,
            onSuccess: () => {
                router.flushAll();
                setShow(false);
            },
        });
    }

    return (
        <>
            <button className={`btn btn-red cursor-pointer ${className}`} onClick={() => setShow(true)}>
                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="size-5"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 7l16 0" /><path d="M10 11l0 6" /><path d="M14 11l0 6" /><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" /><path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" /></svg>
                <span>Apagar</span>
            </button>
            <Modal show={show} onClose={() => setShow(false)} maxWidth={'lg'}>
                <div className="flex flex-col gap-4 p-4">
                    <h1 className="text-xl font-bold">Apagar pesquisa</h1>
                    <p className="text-justify">Você tem certeza que deseja apagar este registro?</p>
                    <p className="text-justify">Esta ação não poderá ser desfeita.</p>
                    <div className="flex justify-end gap-4">
                        <button className='btn btn-neutral cursor-pointer' onClick={() => setShow(false)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="size-5"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M18 6l-12 12" /><path d="M6 6l12 12" /></svg>
                            <span>Cancelar</span>
                        </button>
                        <button className='btn btn-red cursor-pointer' onClick={handleSubmit}>
                            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="size-5"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M5 12l5 5l10 -10" /></svg>
                            <span>Apagar</span>
                        </button>
                    </div>
                </div>
            </Modal>
        </>
    );
}

export default ConfirmDelete;
