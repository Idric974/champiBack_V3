const schedule = require('node-schedule');

//! 1) Gestion Air

const gestionAir = schedule.scheduleJob(' */5 * * * * ', () => {
    var childProcess = require('child_process');

    function runScript(scriptPath, callback) {
        // keep track of whether callback has been invoked to prevent multiple invocations
        var invoked = false;

        var process = childProcess.fork(scriptPath);

        // listen for errors as they may prevent the exit event from firing
        process.on('error', function (err) {
            if (invoked) return;
            invoked = true;
            callback(err);
        });

        // execute the callback once the process has finished running
        process.on('exit', function (code) {
            if (invoked) return;
            invoked = true;
            var err = code === 0 ? null : new Error('exit code ' + code);
            callback(err);
        });
    }

    // Now we can run a script and invoke a callback when complete, e.g.
    runScript('./gestion/gestionAir/gestionAir.js', function (err) {
        if (err) throw err;
        // console.log(
        //   jaune,
        //   '[ GESTION AIR CRON TAB  ] CALCULES Calcules sont  terminés'
        // );
    });
});

//! -------------------------------------------------

//? Consigne automatique AIR

const consigneAirAuto = schedule.scheduleJob(' 0 * * * * ', () => {
    var childProcess = require('child_process');

    function runScript(scriptPath, callback) {
        // keep track of whether callback has been invoked to prevent multiple invocations
        var invoked = false;

        var process = childProcess.fork(scriptPath);

        // listen for errors as they may prevent the exit event from firing
        process.on('error', function (err) {
            if (invoked) return;
            invoked = true;
            callback(err);
        });

        // execute the callback once the process has finished running
        process.on('exit', function (code) {
            if (invoked) return;
            invoked = true;
            var err = code === 0 ? null : new Error('exit code ' + code);
            callback(err);
        });
    }

    // Now we can run a script and invoke a callback when complete, e.g.
    runScript('./gestion/gestionAir/consigneAirAuto.js', function (err) {
        if (err) throw err;
        // console.log(
        //   jaune,
        //   '[ GESTION AIR CRON TAB  ] Gestion Consigne Automatique Air terminé'
        // );
    });
});

//? -------------------------------------------------

//! -------------------------------------------------