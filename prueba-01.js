'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', inputStdin => {
    inputString += inputStdin;
});

process.stdin.on('end', () => {
    inputString = inputString.trim().split('\n').map(str => str.trim());
    main();
});

/**
 * Lee la siguiente linea de la entrada.
 * @returns {string} La siguiente linea de la entrada.
 */
function readLine() {
    return inputString[currentLine++];
}

/**
 * Calcula el numero minimo de intercambios necesarios para ordenar un arreglo.
 * @param {number[]} arr - El arreglo de entrada.
 * @returns {number} El numero minimo de intercambios.
 */
function minimumSwaps(arr) {
    let swaps = 0;
    const n = arr.length;
    const visited = new Array(n).fill(false);

    // Crear un arreglo de objetos con valor e indice original
    const indexedArray = arr.map((value, index) => ({ value, index }))
        .sort((a, b) => a.value - b.value);

    // Iterar sobre el arreglo para identificar ciclos
    for (let i = 0; i < n; i++) {
        // Saltar elementos ya visitados o que ya estan en la posicion correcta
        if (visited[i] || indexedArray[i].index === i) {
            continue;
        }

        let cycleSize = 0;
        let j = i;

        // Recorrer el ciclo y contar su tamano
        while (!visited[j]) {
            visited[j] = true;
            j = indexedArray[j].index;
            cycleSize++;
        }

        // Agregar los intercambios necesarios para ordenar este ciclo
        if (cycleSize > 1) {
            swaps += cycleSize - 1;
        }
    }

    return swaps;
}

/**
 * Funcion principal que procesa la entrada y genera la salida.
 */
function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine(), 10); // Leer el tamano del arreglo
    const arr = readLine().split(' ').map(Number); // Leer y convertir el arreglo

    const result = minimumSwaps(arr);

    ws.write(result + '\n'); // Escribir el resultado en la salida
    ws.end();
}
