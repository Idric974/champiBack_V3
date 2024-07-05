const Gpio = require('onoff').Gpio; // G�re les GPIO
const relay = new Gpio(17, 'out'); // Utilise le GPIO 17 comme sortie

// Allumer le relais
relay.writeSync(1);
console.log("Relais allum�");

// Attendre 2 secondes puis �teindre le relais
setTimeout(() => {
    relay.writeSync(0);
    console.log("Relais �teint");

    // Nettoyer les ressources GPIO
    relay.unexport();
}, 2000);
