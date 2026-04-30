const prompt = require('prompt-sync')();

let total = 0;
for (let i = 1; i <= 100; i++) {
    total += i;
    console.log(total);
}
