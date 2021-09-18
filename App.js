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
    if (path.extname(file) == '.' + fileextension) {
      archivos.push(file);
    }

  });
  return archivos;
}

const eliminarArchivos = async (archivos) => {
  archivos.forEach(async (archivo) => {
    fs2.unlinkSync(printerpath + "\\" + archivo);
  });
}

const imprimirArchivos = async (archivos) => {
  archivos.forEach(async (archivo) => {
    const info = fs2.readFileSync(printerpath + "\\" + archivo);

    const options = {
      mode: 'text',
      pythonPath: 'python',
      pythonOptions: [],
      scriptPath: '',
      args: [info.toString()]
    };

    const { success, err = '', results } = await new Promise(
      (resolve, reject) => {
        try {
          PythonShell.run('print.py', options,
            function (err, results) {
              if (err) {
                reject({ success: false, err });
              }

              console.log('PythonShell results: %j', results);

              resolve({ success: true, results });
            }
          );
        } catch (error) {
          console.error(error);
          reject({ success: false, err });
        }
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

const ejecutar = async () => {
  /* const facturas = await leerDirectorio();
  await imprimirArchivos(facturas);
  await eliminarArchivos(facturas);
  ejecutar(); */
  leerDirectorio().then(facturas => {
    imprimirArchivos(facturas).then(() => {
      eliminarArchivos(facturas).then(() => {
        setTimeout(ejecutar, 1000);
      })
    })
  });
}

ejecutar()

/* do {
  leerDirectorio().then(facturas => {
    imprimirArchivos(facturas).then(() => {
      eliminarArchivos(facturas).then(() => {
      })
    })
  });


} while (true); */

