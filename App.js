//configuring enviroment variables
require('dotenv').config();

let { PythonShell } = require('python-shell');

const fs = require('fs').promises;
const fs2 = require('fs');
const path = require('path');


const printerpath = process.env.PRINTERPATH;
const fileextension = process.env.FILEEXTENSION;

const leerDirectorio = async () => {
  let archivos = [];
  let files = await fs.readdir(printerpath, (err, files) => {

    if (err) {
      console.error(err);
    }

  });
  files.forEach(file => {
    console.log(file);
    if (path.extname(file) == '.' + fileextension) {
      archivos.push(file);
    }

  });
  return archivos;
}

const eliminarArchivos = async (archivos) => {
  archivos.forEach(async (archivo) => {
    await fs.unlink(printerpath + "\\" + archivo, (err) => {
      if (err) {
        console.error(err);
      }
    })
  });
}

const imprimirArchivos = async (archivos) => {
  archivos.forEach(async (archivo) => {
    let info = fs2.readFileSync(printerpath + "\\" + archivo).toString();

    var options = {
      mode: 'text',
      pythonPath: 'python',
      pythonOptions: [],
      scriptPath: '',
      args: [info]
    };

    const { success, err = '', results } = await new Promise(
      (resolve, reject) => {
        PythonShell.run('print.py', options,
          function (err, results) {
            if (err) {
              reject({ success: false, err });
            }

            console.log('PythonShell results: %j', results);

            resolve({ success: true, results });
          }
        );
      }
    );

    console.log("python call ends");

    if (!success) {
      console.log("Test Error: " + err);
      return;
    }

    console.log("The result is: " + results);

    // My code here

    console.log("end runTest()");

  });
}


/* do { */
leerDirectorio().then(facturas => {
  imprimirArchivos(facturas).then(() => {
    eliminarArchivos(facturas).then(() => {
    })
  })
});


/* } while (true); */

