import express from 'express';
const app = express();
app.use(express.json()); // Para poder recibir JSON en las peticiones

// Ruta para la funcionalidad de prueba-01.js
app.post('/minimum-swaps', (req, res) => {
  const { arr } = req.body;
  const result = minimumSwaps(arr);
  res.json({ result });
});

// Ruta para la funcionalidad de prueba-02.js
app.post('/count-triplets', (req, res) => {
  const { arr, r } = req.body;
  const result = countTriplets(arr, r);
  res.json({ result });
});

const port = parseInt(process.env.PORT) || 3000;
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

// Función de prueba-01.js
function minimumSwaps(arr) {
  let swaps = 0;
  const n = arr.length;
  const visited = new Array(n).fill(false);

  const indexedArray = arr.map((value, index) => ({ value, index }))
    .sort((a, b) => a.value - b.value);

  for (let i = 0; i < n; i++) {
    if (visited[i] || indexedArray[i].index === i) {
      continue;
    }

    let cycleSize = 0;
    let j = i;

    while (!visited[j]) {
      visited[j] = true;
      j = indexedArray[j].index;
      cycleSize++;
    }

    if (cycleSize > 1) {
      swaps += cycleSize - 1;
    }
  }

  return swaps;
}

// Función de prueba-02.js
function countTriplets(arr, r) {
  let count = {};
  let pairCount = {};
  let tripletCount = 0;

  for (let i = 0; i < arr.length; i++) {
    let current = arr[i];

    if (current % r === 0) {
      let pair = current / r;
      if (pairCount[pair]) {
        tripletCount += pairCount[pair];
      }
    }

    if (current % r === 0) {
      let prev = current / r;
      if (count[prev]) {
        pairCount[current] = (pairCount[current] || 0) + count[prev];
      }
    }

    count[current] = (count[current] || 0) + 1;
  }

  return tripletCount;
}