function BadgeTypeQuestion({ type }) {
    if (type == 'radio') {
        return (
            <span className="bg-lime-500 text-white px-2 py-1 rounded-md text-sm">
                Objetiva de Escolha Única
            </span>
        );
    } else if (type == 'checkbox') {
        return (
            <span className="bg-cyan-500 text-white px-2 py-1 rounded-md text-sm">
                Objetiva de Multipla escolha
            </span>
        );
    } else {
        return (
            <span className="bg-violet-500 text-white px-2 py-1 rounded-md text-sm">
                Subjetiva ou Dissertativa
            </span>
        );
    }
}

export default BadgeTypeQuestion;
