import { Link } from "@inertiajs/react";
import { Children } from "react";

function Pagination({ data, count, children }) {
    const prev = (link) => {
        if (!link) {
            return (
                <li>
                    <button disabled
                        className='flex gap-1 items-center bg-neutral-100 text-neutral-600 px-3 py-1.5 rounded-md'
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="size-5"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M15 6l-6 6l6 6" /></svg>
                        <span className='text-sm'>Anterior</span>
                    </button>
                </li>
            );
        }
        return (
            <li>
                <Link
                    href={link}
                    className='flex gap-1 items-center bg-neutral-500 text-white px-3 py-1.5 rounded-md hover:bg-neutral-600 transition'
                    prefetch
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="size-5"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M15 6l-6 6l6 6" /></svg>
                    <span className='text-sm'>Anterior</span>
                </Link>
            </li>
        );
    }

    const next = (link) => {
        if (!link) {
            return (
                <li>
                    <button disabled
                        className='flex gap-1 items-center bg-neutral-100 text-neutral-600 px-3 py-1.5 rounded-md'
                    >
                        <span className='text-sm'>Próxima</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="size-5"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M9 6l6 6l-6 6" /></svg>
                    </button>
                </li>
            );
        }

        return (
            <li>
                <Link
                    href={link}
                    className='flex gap-1 items-center bg-neutral-500 text-white px-3 py-1.5 rounded-md hover:bg-neutral-600 transition'
                    prefetch
                >
                    <span className='text-sm'>Próxima</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="size-5"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M9 6l6 6l-6 6" /></svg>
                </Link>
            </li>
        );
    }

    return (
        <nav className="w-full flex justify-between items-end">
            <div className="flex-1">
                {children}
            </div>
            <div className="flex flex-col">
                <ul className='flex gap-2'>
                    {prev(data.prev_page_url)}
                    {next(data.next_page_url)}
                </ul>
                <p className="flex items-end text-neutral-500 text-xs font-light">Total de registros<strong className="font-semibold">&nbsp;{count}&nbsp;</strong> - Página<strong className="font-semibold">&nbsp;{data.current_page}&nbsp;</strong>de<strong className="font-semibold">&nbsp;{data.last_page}</strong>.</p>
            </div>
        </nav>
    );
}

export default Pagination;
