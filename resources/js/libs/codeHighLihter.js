import languages from '@/helpers/acceptedLanguages';
import { createHighlighter } from 'shiki';

let highlighterPromise = createHighlighter({
    themes: ['github-light'],
    langs: languages,
}).catch((err) => {
    console.error('Erro ao inicializar o highlighter:', err);
    return null; // para evitar quebra
});

export default async function codeToHtml(code, lang, theme = 'github-light') {
    const highlighter = await highlighterPromise;

    if (!highlighter) {
        // fallback se não carregou
        return `<pre><code>${code}</code></pre>`;
    }

    try {
        await highlighter.loadLanguage(lang);
        return highlighter.codeToHtml(code, { lang, theme });
    } catch (e) {
        console.error('Erro ao gerar destaque de código:', e);
        return `<pre><code>${code}</code></pre>`;
    }
}
