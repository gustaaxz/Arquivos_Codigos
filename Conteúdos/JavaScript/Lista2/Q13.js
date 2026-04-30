const prompt = require('prompt-sync')();

function diferencaEmDias(data1, data2) {
    const d1 = new Date(data1);
    const d2 = new Date(data2);
    
    const diferencaEmMilissegundos = Math.abs(d2 - d1);
    const milissegundosPorDia = 1000 * 60 * 60 * 24;
    
    return Math.floor(diferencaEmMilissegundos / milissegundosPorDia);
}

const dataInicio = "2023-01-01";
const dataFim = "2023-01-15";
console.log(`A diferença é de ${diferencaEmDias(dataInicio, dataFim)} dias.`);
