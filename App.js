//configuring enviroment variables
require('dotenv').config();

const fs = require('fs').promises;
const printer = require('printer');
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
  archivos.forEach(archivo =>{
    let info = fs.readFileSync(printerpath + "\\" + archivo).toString();
    printer.printDirect({
      data: info,
      type: 'RAW',
      success: function (jobID) {
        console.log("ID: " + jobID);
      },
      error: function (err) {
        console.log('printer module error: '+err);
        throw err;
      }
    });
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

