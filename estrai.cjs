const fs = require('fs');

const inputFile = 'output.txt';
const outputFile = 'output.txt';

const content = fs.readFileSync(inputFile, 'utf8');

// Regex per numeri romani da I a VI seguiti da ":"
// Inserisco un a capo prima di ogni occorrenza tranne la prima

const result = content.replace(/(?!^)(\b(VI|V|IV|III|II|I):)/g, '\n$1');

fs.writeFileSync(outputFile, result, 'utf8');

console.log('File salvato in', outputFile);