const prompt = require('prompt-sync')();

function array(array1, array2){
    let array3 = [];
    for(let i = 0; i < array1.length; i++){
        array3.push(array1[i]);
    }
    for(let i = 0; i < array2.length; i++){
        array3.push(array2[i]);
    }
    return array3;
}

let array1 = [1,2,3];
let array2 = [4,5,6];

console.log(array(array1, array2));