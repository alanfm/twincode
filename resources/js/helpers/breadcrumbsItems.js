const breadcrumbsItems = (page, respondable, respondable_type, respondable_id, questionnaire) => {
    let items = [
        { label: 'Principal', href: route('dashboard') }
    ];

    if (respondable_type == 'research') {
        items.push(...researchBreadcrumbsItems(respondable));
        items.push({ label: 'Questionários', href: route('questionnaires.index', { respondable: respondable_type, id: respondable_id, search: '', page: 1 }) });

        switch (page) {
            case 'create':
                items.push({ label: 'Novo Questionário', href: '' });
                break;
            case 'edit':
                items.push({ label: questionnaire.description, href: route('questionnaires.edit', { questionnaire: questionnaire.id, respondable: respondable_type, id: respondable_id }) });
                items.push({ label: 'Editar', href: '' });
                break;
            case 'show':
                items.push({ label: questionnaire.description, href: route('questionnaires.show', { questionnaire: questionnaire.id, respondable: respondable_type, id: respondable_id }) });
                break;
        }
    } else if (respondable_type == 'comparison') {
        items.push(...researchBreadcrumbsItems(respondable.research));
        items.push(...comparisonBreadcrumbsItems(respondable));
        items.push({ label: 'Questionários', href: route('questionnaires.index', { respondable: respondable_type, id: respondable_id, search: '', page: 1 }) });

        switch (page) {
            case 'create':
                items.push({ label: 'Novo Questionário', href: '' });
                break;
            case 'edit':
                items.push({ label: questionnaire.description, href: route('questionnaires.edit', { questionnaire: questionnaire.id, respondable: respondable_type, id: respondable_id }) });
                items.push({ label: 'Editar', href: '' });
                break;
            case 'show':
                items.push({ label: questionnaire.description, href: route('questionnaires.show', { questionnaire: questionnaire.id, respondable: respondable_type, id: respondable_id }) });
                break;
        }
    }

    return items;
}

const researchBreadcrumbsItems = (research) => {
    return [
        { label: 'Pesquisas', href: route('research.index', { search: '', page: 1 }) },
        { label: research?.title, href: route('research.show', { research: research?.id, search: '', page: 1 }) },
    ];
}

const comparisonBreadcrumbsItems = (comparison) => {
    return [
        { label: 'Comparações', href: route('research.comparison.index', { research: comparison.id, search: '', page: '' }) },
        { label: comparison.description, href: route('research.comparison.show', { research: comparison.id, comparison: comparison.id }) },
    ];
}

const respondableTypeParse = (respondable_type) => {
    // transformar a string 'App\Models\Research' em 'research'
    const type = respondable_type.split('\\').pop().toLowerCase();
    return type;
}

export default breadcrumbsItems;

export { researchBreadcrumbsItems, comparisonBreadcrumbsItems, respondableTypeParse };
