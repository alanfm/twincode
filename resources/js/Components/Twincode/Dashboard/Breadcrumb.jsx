import { Link } from '@inertiajs/react';
import React from 'react';

function Breadcrumb({ items }) {
    return (
        <nav aria-label="breadcrumb">
            <ol className="flex items-center gap-2 text-sm text-neutral-500 max-w-full overflow-hidden">
                {items.map((item, index) => (
                    <li
                        key={index}
                        className={`flex items-center${index === items.length - 1 ? ' text-blue-500' : ''} max-w-[30rem] overflow-hidden text-ellipsis`}
                        aria-current={index === items.length - 1 ? 'page' : undefined}
                    >
                        {index !== items.length - 1 ? (
                            <Link href={item.href} prefetch className='text-nowrap truncate'>{item.label}</Link>
                        ) : (
                            <span className='text-nowrap truncate'>{item.label}</span>
                        )}
                        {index !== items.length - 1 && <span className='px-1'>/</span>}
                    </li>
                ))}
            </ol>
        </nav>
    );
};

export default Breadcrumb;
