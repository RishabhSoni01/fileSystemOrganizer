#!/usr/bin/env node

let inputArr = process.argv.slice(2);
let fs = require("fs");
let path = require("path")

let helpObj = require('./commands/help');
let treeObj = require('./commands/tree');
let organizeObj = require('./commands/organizer');


//console.log(inputArr);
//node main.js tree "directoryPath"
//node main.js organize "directoryPath"
//node main.js help

let command = inputArr[0]
let types ={
    media: ["mp4", "mkv",'avi','ico','gif','jpg','mov','mp3','ogg','png','svg','tiff','wav','webm','webp','wmv'],
    archives: ['zip', '7z', 'rar', 'tar', 'gz', 'ar', 'iso', "xz"],
    documents: ['docx', 'doc', 'pdf', 'xlsx', 'xls', 'odt', 'ods', 'odp', 'odg', 'odf', 'txt', 'ps', 'tex','rtf','ppt'],
    app: ['exe', 'dmg', 'pkg', "deb"]
}


switch(command){
    case "tree":
        treeObj.treeKey(inputArr[1]);
        break;
    case "organize":
        organizeObj.organizerKey(inputArr[1]);
        break;
    case "help":
        helpObj.helpKey();
        break;
    default:
        console.log("Please enter correct path");
        break;
}