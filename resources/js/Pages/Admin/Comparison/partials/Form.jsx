import languages from "@/helpers/acceptedLanguages";

function Form({ data, setData, errors }) {
    return (
        <>
            <div className="flex gap-4">
                <div className="w-2/3 flex flex-col">
                    <label htmlFor="description">Descrição:</label>
                    <input
                        type="text"
                        name='description'
                        id='description'
                        value={data.description}
                        className='rounded-md'
                        onChange={(e) => setData('description', e.target.value)}
                        placeholder='Descrição da comparação de códigos'
                    />
                    {errors.description && <p className='text-red-500 text-sm'>{errors.description}</p>}
                </div>

                <div className="w-1/3 flex flex-col">
                    <label htmlFor="description">Linguagem:</label>
                    <select
                        name='language'
                        id='language'
                        value={data.language}
                        className='rounded-md'
                        onChange={(e) => setData('language', e.target.value)}
                    >
                        <option value="" disabled className="text-neutral-400">Selecione uma linguagem</option>
                        {languages.sort().map((lang) => (
                            <option key={lang} value={lang}>{lang.charAt(0).toUpperCase() + lang.slice(1).toLowerCase()}</option>
                        ))}
                    </select>
                    {errors.language && <p className='text-red-500 text-sm'>{errors.language}</p>}
                </div>
            </div>
            <div className="flex gap-4">
                <div className="flex-1 flex flex-col">
                    <label htmlFor="snippet_code_1">Código 1:</label>
                    <textarea
                        name='snippet_code_1'
                        id='snippet_code_1'
                        value={data.snippet_code_1}
                        className='rounded-md h-[calc(var(--spacing)*106)] font-mono'
                        onChange={(e) => setData('snippet_code_1', e.target.value)}
                        placeholder='Trecho de código 1'
                    />
                    {errors.snippet_code_1 && <p className='text-red-500 text-sm'>{errors.snippet_code_1}</p>}
                </div>
                <div className="flex-1 flex flex-col">
                    <label htmlFor="snippet_code_2">Código 2:</label>
                    <textarea
                        name='snippet_code_2'
                        id='snippet_code_2'
                        value={data.snippet_code_2}
                        className='rounded-md h-[calc(var(--spacing)*106)] font-mono'
                        onChange={(e) => setData('snippet_code_2', e.target.value)}
                        placeholder='Trecho de código 2'
                    />
                    {errors.snippet_code_2 && <p className='text-red-500 text-sm'>{errors.snippet_code_2}</p>}
                </div>
            </div>
            <div className="flex flex-col">
                <label htmlFor="observation">Observações:</label>
                <textarea
                    name='observation'
                    id='observation'
                    value={data.observation}
                    className='rounded-md'
                    onChange={(e) => setData('observation', e.target.value)}
                    placeholder='Observações sobre a comparação'
                />
                {errors.observation && <p className='text-red-500 text-sm'>{errors.observation}</p>}
            </div>
        </>
    );
}

export default Form;
