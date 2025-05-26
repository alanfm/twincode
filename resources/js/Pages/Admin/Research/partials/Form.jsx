function Form({ data, setData, errors }) {
    console.log('data', data);
    return (
        <>
            <div className="flex flex-col">
                <label htmlFor="status">Situação:</label>
                <select
                    name='status'
                    id='status'
                    value={data.status}
                    className='rounded-md'
                    onChange={(e) => setData('status', e.target.value)}
                    required
                >
                    <option value='' disabled>Selecione</option>
                    <option value='active'>Ativo</option>
                    <option value='inactive'>Inativo</option>
                    <option value='archived'>Arquivado</option>
                </select>
                {errors.status && <p className='text-red-500 text-sm'>{errors.status}</p>}
            </div>
            <div className="flex flex-col">
                <label htmlFor="title">Título:</label>
                <input
                    type='text'
                    name='title'
                    id='title'
                    value={data.title}
                    className='rounded-md'
                    onChange={(e) => setData('title', e.target.value)}
                    placeholder='Título da pesquisa'
                    autoComplete='off'
                    required
                />
                {errors.title && <p className='text-red-500 text-sm'>{errors.title}</p>}
            </div>
            <div className="flex flex-col">
                <label htmlFor="description">Descrição:</label>
                <textarea
                    name='description'
                    id='description'
                    value={data.description}
                    className='rounded-md'
                    onChange={(e) => setData('description', e.target.value)}
                    placeholder='Descrição da pesquisa'
                    required
                />
                {errors.description && <p className='text-red-500 text-sm'>{errors.description}</p>}
            </div>
            <div className="flex flex-col">
                <label htmlFor="author">Autor:</label>
                <input
                    type='text'
                    name='author'
                    id='author'
                    value={data.author}
                    className='rounded-md'
                    onChange={(e) => setData('author', e.target.value)}
                    placeholder='Descrição da pesquisa'
                    autoComplete='off'
                    required
                />
                {errors.author && <p className='text-red-500 text-sm'>{errors.author}</p>}
            </div>
            <div className="flex flex-col">
                <label htmlFor="institution">Instituição:</label>
                <input
                    type='text'
                    name='institution'
                    id='institution'
                    value={data.institution}
                    className='rounded-md'
                    onChange={(e) => setData('institution', e.target.value)}
                    placeholder='Descrição da pesquisa'
                    autoComplete='off'
                    required
                />
                {errors.institution && <p className='text-red-500 text-sm'>{errors.institution}</p>}
            </div>
        </>
    );
}

export default Form;
