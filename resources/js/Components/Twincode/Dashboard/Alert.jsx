import { usePage } from '@inertiajs/react';
import React, { useEffect, useState } from 'react';

const variantStyles = {
    success: {
        bg: 'bg-green-100',
        text: 'text-green-800',
        border: 'border-green-300',
    },
    error: {
        bg: 'bg-red-100',
        text: 'text-red-800',
        border: 'border-red-300',
    },
    info: {
        bg: 'bg-blue-100',
        text: 'text-blue-800',
        border: 'border-blue-300',
    },
    warning: {
        bg: 'bg-yellow-100',
        text: 'text-yellow-800',
        border: 'border-yellow-300',
    },
};

function Alert() {
    const { flash } = usePage().props;
    const style = variantStyles[flash.alert?.type] || variantStyles.info;
    const [visible, setVisible] = useState(!!flash.alert || false);

    const closeAlert = () => {
        setVisible(false);
    };

    useEffect(() => {
        let debounce = setTimeout(() => {
            closeAlert();
        }, 5000);

        return () => {
            clearTimeout(debounce);
        }
    }, [visible]);

    if (!visible || !flash.alert?.message) return null;

    return (
        <div
            className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 flex justify-between gap-3 max-w-md w-full rounded-md border transition shadow-lg ${style.bg} ${style.text} ${style.border}`}
        >
            <div className="flex items-center text-xl py-4 pl-4">
                <svg xmlns="http://www.w3.org/2000/svg" className='size-8' width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M19.875 6.27c.7 .398 1.13 1.143 1.125 1.948v7.284c0 .809 -.443 1.555 -1.158 1.948l-6.75 4.27a2.269 2.269 0 0 1 -2.184 0l-6.75 -4.27a2.225 2.225 0 0 1 -1.158 -1.948v-7.285c0 -.809 .443 -1.554 1.158 -1.947l6.75 -3.98a2.33 2.33 0 0 1 2.25 0l6.75 3.98h-.033z" /><path d="M12 8v4" /><path d="M12 16h.01" /></svg>
            </div>
            <div className="flex-1 py-4 font-normal">
                {flash.alert?.message}
            </div>
            <div className='flex items-start'>
                <button className="cursor-pointer text-lg pr-2" onClick={closeAlert} aria-label="Fechar" title='Fechar'>
                    &times;
                </button>
            </div>
        </div>
    );
}

export default Alert;
