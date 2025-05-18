function StatusBadge({ status }) {
    const statusClasses = {
        'active': 'bg-lime-500',
        'inactive': 'bg-yellow-500',
        'archived': 'bg-rose-500',
    };

    return (
        <span className={`inline-flex px-2 py-1 rounded-md text-xs text-white ${statusClasses[status]}`}>
            {status === 'active' && 'Ativo'}
            {status === 'inactive' && 'Inativo'}
            {status === 'archived' && 'Arquivado'}
        </span>
    );
}

export default StatusBadge;
