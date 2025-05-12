function Form({ data, setData, errors, edit }) {
    return (
        <>
            <div className="flex flex-col">
                <label htmlFor="name">Nome:</label>
                <input
                    type='text'
                    name='name'
                    id='name'
                    value={data.name}
                    className='rounded-md'
                    onChange={(e) => setData('name', e.target.value)}
                    placeholder='Nome do usuário'
                />
                {errors.name && <p className='text-red-500 text-sm'>{errors.name}</p>}
            </div>
            <div className="flex flex-col">
                <label htmlFor="email">E-mail:</label>
                <input
                    type='email'
                    name='email'
                    id='email'
                    value={data.email}
                    className='rounded-md'
                    onChange={(e) => setData('email', e.target.value)}
                    placeholder='Descrição da pesquisa'
                    required
                />
                {errors.email && <p className='text-red-500 text-sm'>{errors.email}</p>}
            </div>
            <div className="flex flex-col">
                <label htmlFor="password">Senha:</label>
                <input
                    type='password'
                    name='password'
                    id='password'
                    value={data.password}
                    className='rounded-md'
                    onChange={(e) => setData('password', e.target.value)}
                    placeholder='Senha do usuário'
                    required={!edit}
                />
                {errors.password && <p className='text-red-500 text-sm'>{errors.password}</p>}
            </div>
            <div className="flex flex-col">
                <label htmlFor="password">Confirmação de Senha:</label>
                <input
                    type='password'
                    name='password_confirmation'
                    id='password_confirmation'
                    value={data.password_confirmation}
                    className='rounded-md'
                    onChange={(e) => setData('password_confirmation', e.target.value)}
                    placeholder='Confirme a senha do usuário'
                    required={!edit}
                />
                {errors.password && <p className='text-red-500 text-sm_confirmation'>{errors.password}</p>}
            </div>
        </>
    );
}

export default Form;
