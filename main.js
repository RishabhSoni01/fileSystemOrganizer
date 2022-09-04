let inputArr = process.argv.slice(2);
let fs = require("fs");
let path = require("path")
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
        treeFn(inputArr[1]);
        break;
    case "organize":
        organizeFn(inputArr[1]);
        break;
    case "help":
        helpFn();
        break;
    default:
        console.log("Please enter correct path");
        break;
}


function treeFn(dirPath){
    //let destPath;
    if(dirPath==undefined){
        console.log("Please Enter correct path");
        return;
    }
    else{
        let doesexist=fs.existsSync(dirPath);
        if(doesexist){
            //2) create -> organized files directory
            treeHelper(dirPath);
            
        }
        else{
            console.log("Please Enter correct path");
            return;
        }
    }
}

function organizeFn(dirPath){
    //console.log("organize implemented",dirPath);
    //1) input -> directory path given
    let destPath;
    if(dirPath==undefined){
        console.log("Please Enter correct path");
        return;
    }
    else{
        let doesexist=fs.existsSync(dirPath);
        if(doesexist){
            //2) create -> organized files directory
            desPath=path.join(dirPath,"organized_files");
            if(fs.existsSync(desPath)==false){
                fs.mkdirSync(desPath);
            }
            
        }
        else{
            console.log("Please Enter correct path");
            return;
        }
    }
    organizeHelper(dirPath,desPath);
}
function organizeHelper(src,dest){
    //3) identify -> categories of all the files present in that input directory -> 
    let smallNames = fs.readdirSync(src);
    //console.log(smallNames);
    for(let i=0;i<smallNames.length;i++){
        let smallAddress= path.join(src,smallNames[i]);
        let isFile = fs.lstatSync(smallAddress).isFile();
        if(isFile){
            //console.log(smallNames[i]);
            let category = getCategory(smallNames[i]);
            console.log(smallNames[i],"belongs to --> " , category);
            //4) copy/cut files to that organized directory
            sendfiles(smallAddress,dest,category);
        }
    }
}

function sendfiles(srcFilePath,dest,category){
    let categoryPath = path.join(dest,category);
    if(fs.existsSync(categoryPath)==false){
        fs.mkdirSync(categoryPath);
    }
    let filename = path.basename(srcFilePath);
    let destFilePath = path.join(categoryPath,filename);
    fs.copyFileSync(srcFilePath,destFilePath);
    fs.unlinkSync(srcFilePath);
    console.log(filename,"copied to -->",category);
}
function getCategory(name){
    let ext = path.extname(name);
    //console.log(ext);
    ext=ext.slice(1);
    for(let type in types){
        let typearray = types[type];
        for(let i=0;i<typearray.length;i++){
            if(ext==typearray[i]){
                return type;
            }
        }
    }
    return "others";
}

function helpFn(dirPath){
    console.log(`
    List of All Command:
        node main.js tree "directoryPath"
        node main.js organize "directoryPath"
        node main.js help
        `);

}