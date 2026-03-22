import { readFileSync, writeFileSync } from 'fs';
const raw = readFileSync('hangman_banksource.txt', 'utf8');
const blocks = raw.split(/\n(?=\d+\.\s)/).map((s) => s.trim()).filter(Boolean);
const cats = [];
for (const block of blocks) {
    const lines = block.split('\n');
    const head = lines[0].replace(/^\d+\.\s*/, '').trim();
    const rest = lines.slice(1).join('\n').replace(/\n/g, ' ');
    let words = rest.split('،').map((w) => w.trim()).filter(Boolean);
    words = words.map((w) => w.replace(/\.$/, ''));
    cats.push({ name: head, words });
}
writeFileSync('hangman-data.js', 'export const hangmanCategories = ' + JSON.stringify(cats, null, 2) + ';\n', 'utf8');
console.log('Categories:', cats.length, 'Total words:', cats.reduce((a, c) => a + c.words.length, 0));
