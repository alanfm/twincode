function Form({ data, setData, errors, respondable_type }) {
    return (
        <>
            <div className="flex flex-col">
                <label htmlFor="description">Descrição:</label>
                <input
                    type='text'
                    name='description'
                    id='description'
                    value={data.description}
                    className='rounded-md'
                    onChange={(e) => setData('description', e.target.value)}
                    placeholder='Descrição do questionário'
                    autoComplete='off'
                />
                {errors.description && <p className='text-red-500 text-sm'>{errors.description}</p>}
            </div>
            {respondable_type == 'research' && (
                <div className="flex flex-col">
                    <label htmlFor="position">Posição:</label>
                    <select
                        name='position'
                        id='position'
                        value={data.position}
                        className='rounded-md'
                        onChange={(e) => setData('position', e.target.value)}
                        required
                    >
                        <option value='initial'>Inicial</option>
                        <option value='final'>Final</option>
                    </select>
                    {errors.position && <p className='text-red-500 text-sm'>{errors.position}</p>}
                </div>
            )}
        </>
    );
}

export default Form;
