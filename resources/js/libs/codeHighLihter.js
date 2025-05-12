import { createHighlighter } from 'shiki';

const highlighter = await createHighlighter({
    themes: ['github-light'],
    langs: ['javascript', 'css', 'html', 'java', 'php', 'python', 'ruby', 'csharp', 'typescript', 'go', 'rust', 'bash', 'json', 'xml', 'sql'],
});

export default function codeToHtml(code, lang, theme = 'github-light') {
    return highlighter.codeToHtml(code, { lang: lang, theme: theme })
}
