const mcpadc = require('mcp-spi-adc');
const mcpBroche = 1;
const nbTour = 5;
const listValAir = [];

//* Fonction moyenne.
function calculateAverage(values) {
  const sum = values.reduce((acc, val) => acc + val, 0);
  return values.length ? sum / values.length : 0;
}

//* Fonction de test.
const testMCP3008 = () => {
  return new Promise((resolve) => {
    let counter = 0;

    const readSensor = () => {
      const tempSensor = mcpadc.open(mcpBroche, { speedHz: 20000 }, (err) => {
        if (err) throw err;

        tempSensor.read((err, reading) => {
          if (err) throw err;
          listValAir.push(reading.value * 40);
          console.log('⭐ Mesure : ', listValAir);

          counter++;
          if (counter >= nbTour) {
            clearInterval(interval);
            resolve(calculateAverage(listValAir));
          }
        });
      });
    };

    const interval = setInterval(readSensor, 1000);

    setTimeout(() => {
      clearInterval(interval);
      resolve(calculateAverage(listValAir));
    }, (nbTour + 1) * 1000);
  });
};

testMCP3008().then((average) => {
  console.log('👉 Valeure moyenne calculée : ', average);
});


