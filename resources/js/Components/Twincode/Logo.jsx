function Logo({ size }) {
    if (size == 'dashboard') {
        return (
            <div className="flex items-center justify-center gap-1 select-none">
                <div className="">
                    <svg xmlns="http://www.w3.org/2000/svg" className={'size-12'} width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M14.5 4h2.5a3 3 0 0 1 3 3v10a3 3 0 0 1 -3 3h-10a3 3 0 0 1 -3 -3v-5" /><path d="M6 5l-2 2l2 2" /><path d="M10 9l2 -2l-2 -2" /></svg>
                </div>
                <div className="flex flex-col">
                    <h1 className="text-3xl font-extrabold mt-0.5">TwinCode</h1>
                    <h2 className="font-light -mt-2 text-xs">Analise comparativa de código</h2>
                </div>
            </div>
        );
    }

    return (
        <div className="flex items-center justify-center gap-1 select-none">
            <div className="">
                <svg xmlns="http://www.w3.org/2000/svg" className={'size-14'} width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M14.5 4h2.5a3 3 0 0 1 3 3v10a3 3 0 0 1 -3 3h-10a3 3 0 0 1 -3 -3v-5" /><path d="M6 5l-2 2l2 2" /><path d="M10 9l2 -2l-2 -2" /></svg>
            </div>
            <div className="flex flex-col">
                <h1 className="text-4xl font-extrabold mt-0.5">TwinCode</h1>
                <h2 className="font-light -mt-2 text-xs">Analise comparativa de código</h2>
            </div>
        </div>
    )
}

export default Logo;
