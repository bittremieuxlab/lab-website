export function sanitizeTitle(title: string): string {
  return (title ?? '')
    .replace(/\\emph\{/g, '')
    .replace(/<\/?i>/g, '')
    .replace(/[{}]/g, '');
}
