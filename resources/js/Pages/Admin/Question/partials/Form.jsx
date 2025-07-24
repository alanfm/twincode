function Form({ data, setData, errors }) {
    return (
        <>
            <div className="flex flex-col">
                <label htmlFor="type">Tipo de resposta:</label>
                <select
                    name='type'
                    id='type'
                    value={data.type}
                    className='rounded-md'
                    onChange={(e) => setData('type', e.target.value)}
                >
                    <option value='radio'>Objetiva</option>
                    <option value='checkbox'>Multipla escolha</option>
                    <option value='text'>Subjetiva</option>
                </select>
                <small>Selecione o tipo de resposta que a pergunta irá aceitar.</small>
                {errors.type && <p className='text-red-500 text-sm'>{errors.type}</p>}
            </div>
            <div className="flex flex-col">
                <label htmlFor="statement">Enunciado:</label>
                <textarea
                    name='statement'
                    id='statement'
                    value={data.statement}
                    className='rounded-md'
                    onChange={(e) => setData('statement', e.target.value)}
                    placeholder='Enunciado da pergunta'
                    rows={3}
                />
                <small>Escreva o enunciado da pergunta que será apresentada aos respondentes.</small>
                {errors.statement && <p className='text-red-500 text-sm'>{errors.statement}</p>}
            </div>
        </>
    );
}

export default Form;
