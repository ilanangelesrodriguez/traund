'use strict';

const fs = require('fs');

// Activamos la lectura estandar de datos desde la entrada (stdin)
process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

// Escuchamos los datos entrantes y los almacenamos en la variable inputString
process.stdin.on('data', function(inputStdin) {
    inputString += inputStdin;
});

// Cuando la entrada termine, procesamos los datos y llamamos a la funcion principal
process.stdin.on('end', function() {
    inputString = inputString.split('\n'); // Dividimos la entrada por lineas

    main(); // Llamamos a la funcion principal para procesar los datos
});

// Funcion para leer la siguiente linea de la entrada
function readLine() {
    return inputString[currentLine++];
}

// Funcion que cuenta las tripletas que forman una progresion geometrica con razon r
function countTriplets(arr, r) {
    let count = {};        // Objeto para contar la cantidad de veces que aparece cada numero en el arreglo
    let pairCount = {};    // Objeto para contar la cantidad de pares validos (a, b) donde b = a * r
    let tripletCount = 0;  // Contador de tripletas validas (a, b, c)

    // Iteramos sobre cada elemento en el arreglo
    for (let i = 0; i < arr.length; i++) {
        let current = arr[i]; // Numero actual

        // Si el numero actual puede formar el tercer numero de una tripleta, lo agregamos al contador de tripletas
        if (current % r === 0) {
            let pair = current / r; // Calculamos el valor del posible numero anterior de la tripleta (b = c / r)
            if (pairCount[pair]) {
                tripletCount += pairCount[pair]; // Sumamos la cantidad de pares que pueden formar tripletas
            }
        }

        // Si el numero actual puede formar un par (a, b), incrementamos el contador de pares
        if (current % r === 0) {
            let prev = current / r; // Calculamos el numero previo que podria formar un par (a, b)
            if (count[prev]) {
                pairCount[current] = (pairCount[current] || 0) + count[prev]; // Actualizamos el contador de pares
            }
        }

        // Incrementamos el contador del numero actual
        count[current] = (count[current] || 0) + 1;
    }

    return tripletCount; // Retornamos la cantidad de tripletas validas encontradas
}

// Funcion principal que lee la entrada, llama a countTriplets y escribe la salida
function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH); // Creamos un flujo de salida para escribir el resultado

    const nr = readLine().replace(/\s+$/g, '').split(' '); // Leemos la primera linea (n y r)

    const n = parseInt(nr[0], 10); // Numero de elementos en el arreglo
    const r = parseInt(nr[1], 10); // La razon de la progresion geometrica

    const arr = readLine().replace(/\s+$/g, '').split(' ').map(arrTemp => parseInt(arrTemp, 10)); // Leemos el arreglo de numeros

    const ans = countTriplets(arr, r); // Llamamos a la funcion countTriplets para obtener la cantidad de tripletas validas

    ws.write(ans + '\n'); // Escribimos el resultado en la salida estandar

    ws.end(); // Cerramos el flujo de salida
}
