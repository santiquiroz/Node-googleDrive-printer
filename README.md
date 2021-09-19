# Node-googleDrive-printer
A basic node program that keeps looking for a file in a path to print.

## Program Behaviour
The Node program will be looking for files in a path that matches a given extension to print through a python program and later when the file has been printed the node program deletes it.

## Prerequisites
* Nodejs.
* Python.
* windows 7 x32-64 or newer.
install the win32print module with the following command:
```bash
pip install win32printing
```

## Installation
1) Install all dependeces with the following command:
```bash
npm install
```
2) Set the enviroment variables editing the .env:
* PRINTERPATH: the path where the program will keep looking for files to print.
* FILEEXTENSION: the extension of files that the program will print. 

## Optional Configuration
If you want to run this software as a windows service, we recomend you to use [NSSM](https://nssm.cc/download) and install the print.bat file as a service.

Are you wondering about the "google drive" on the project's name? ... well, we needed to print a ticket remotely via a non-API (REST API or something similar) so we decided to use [google drive filestream](https://support.google.com/a/answer/7491144?hl=es#zippy=%2Cwindows) and configure our program to search in a shared drive where another program generates the ticket file remotely, it takes an average of 7 seconds to synchronize but... at least it works !!! ¯\_(ツ)_/¯