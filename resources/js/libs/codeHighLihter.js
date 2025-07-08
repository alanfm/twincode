import { createHighlighter } from 'shiki';

let highlighter = null;

// Pré-carrega o highlighter no momento da inicialização
createHighlighter({
    themes: ['github-light'],
    langs: ['javascript', 'css', 'html', 'java', 'php', 'python', 'ruby', 'csharp', 'typescript', 'go', 'rust', 'bash', 'json', 'xml', 'sql'],
}).then((hl) => {
    highlighter = hl;
}).catch((err) => {
    console.error('Erro ao inicializar o highlighter:', err);
});

export default function codeToHtml(code, lang, theme = 'github-light') {
    if (!highlighter) {
        // Retorna um fallback caso o highlighter ainda não tenha carregado
        return `<pre><code>${code}</code></pre>`;
    }
    return highlighter.codeToHtml(code, { lang: lang, theme: theme });
}
