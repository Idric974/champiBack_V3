const myRelay=()=>{
  const { exec } = require('child_process');

  exec('python3 /home/pi/Desktop/champiBack_V3/python/gpioOff.py', (error, stdout, stderr) => {
    
    if (error) {
        console.error(`Error executing script: ${error}`);
        res.status(500).send(`Error executing script: ${error}`);
        return;
    }
   
    if (stderr) {
        console.error(`Error output: ${stderr}`);
        res.status(500).send(`Error output: ${stderr}`);
        return;
    }
   
});

};

myRelay()