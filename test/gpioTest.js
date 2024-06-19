const Gpio = require('onoff').Gpio;

try {
  console.log('Tentative de création d\'une instance Gpio...');
  const led = new Gpio(17, 'out');  // Utiliser GPIO 17 comme sortie
  console.log('Instance Gpio créée avec succès');

  // Allumer la LED
  led.writeSync(1);
  console.log('LED allumée');

  // Éteindre la LED après 1 seconde
  setTimeout(() => {
    led.writeSync(0);
    console.log('LED éteinte');
    led.unexport();  // Libérer la ressource GPIO
  }, 1000);

} catch (err) {
  console.error('Erreur lors de la création de l\'instance Gpio ou du contrôle GPIO:', err);
}
