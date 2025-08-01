import Editor, {
    Toolbar,
    BtnBold,
    BtnBulletList,
    BtnClearFormatting,
    BtnItalic,
    // BtnLink,
    BtnNumberedList,
    // BtnRedo,
    BtnStrikeThrough,
    // BtnStyles,
    BtnUnderline,
    BtnUndo,
    // HtmlButton,
    Separator,
} from 'react-simple-wysiwyg';

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
                <small>A pesquisa só poderá ser respondida com situação <strong>ativa</strong>.</small>
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
                    placeholder='Descrição ou resumo da pesquisa'
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
                    placeholder='Nome do autor da pesquisa'
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
                    placeholder='Instituição vinculada à pesquisa'
                    autoComplete='off'
                    required
                />
                {errors.institution && <p className='text-red-500 text-sm'>{errors.institution}</p>}
            </div>
            <div className="flex flex-col">
                <label htmlFor="acceptance_terms">Termos de Aceite para Participação na Pesquisa:</label>
                <Editor value={data.acceptance_terms} onChange={(e) => setData('acceptance_terms', e.target.value)}>
                    <Toolbar>
                        <BtnBold />
                        <BtnItalic />
                        <BtnUnderline />
                        <Separator />
                        {/* <BtnStrikeThrough /> */}
                        <BtnBulletList />
                        <BtnNumberedList />
                        <Separator />
                        <BtnClearFormatting />
                        {/* <BtnLink /> */}
                        {/* <HtmlButton /> */}
                        {/* <BtnStyles /> */}
                        {/* <BtnRedo /> */}
                        {/* <BtnUndo /> */}
                    </Toolbar>
                </Editor>

                <small>Utilize a barra de ferramentas para formatar o texto.</small>
                {errors.acceptance_terms && <p className='text-red-500 text-sm'>{errors.acceptance_terms}</p>}
            </div>
        </>
    );
}

export default Form;
