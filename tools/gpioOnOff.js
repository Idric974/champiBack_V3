const { exec } = require('child_process');

let on= "gpioOn.py";
let off= "gpioOff.py";


exec(`python3 /home/pi/Desktop/champiBack_V3/pyton/${on}`, (error, stdout, stderr) => {
    if (error) {
        console.error(`Error executing script: ${error}`);
        return;
    }
    if (stderr) {
        console.error(`Error output: ${stderr}`);
        return;
    }
    console.log(`Script output: ${stdout}`);
});

