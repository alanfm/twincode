function Form({ data, setData, errors, respondable_type }) {
    return (
        <>
            {respondable_type == 'research' && (
                <div className="flex flex-col">
                    <label htmlFor="position">Posição do questionário:</label>
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
                    <small>Indique se esse questioário ficará no início ou no final da pesquisa. As comparações de códigos ficarão entre os questionários inicial e final.</small>
                    {errors.position && <p className='text-red-500 text-sm'>{errors.position}</p>}
                </div>
            )}
            <div className="flex flex-col">
                <label htmlFor="title">Título:</label>
                <input
                    type='text'
                    name='title'
                    id='title'
                    value={data.title}
                    className='rounded-md'
                    onChange={(e) => setData('title', e.target.value)}
                    placeholder='Título do questionário'
                    required
                    autoComplete='off'
                />
                {errors.title && <p className='text-red-500 text-sm'>{errors.title}</p>}
            </div>
            <div className="flex flex-col">
                <label htmlFor="description">Descrição:</label>
                <textarea
                    type='text'
                    name='description'
                    id='description'
                    value={data.description}
                    className='rounded-md'
                    onChange={(e) => setData('description', e.target.value)}
                    placeholder='Descrição do questionário'
                    autoComplete='off'
                />
                <small>O texto da descrição ficará depois do título e antes dos campus de entrada do questionário.</small>
                {errors.description && <p className='text-red-500 text-sm'>{errors.description}</p>}
            </div>
        </>
    );
}

export default Form;
