let fs = require("fs");
let path = require("path")

function treeFn(dirPath){
    //let destPath;
    if(dirPath==undefined){
        treeHelper(process.cwd(),"");
        //console.log("Please Enter correct path");
        return;
    }
    else{
        let doesexist=fs.existsSync(dirPath);
        if(doesexist){
            //2) create -> organized files directory
            treeHelper(dirPath,"");
            
        }
        else{
            console.log("Please Enter correct path");
            return;
        }
    }
}

function treeHelper(dirPath,indent){
    let isFile = fs.lstatSync(dirPath).isFile();
    if(isFile==true){
        let filename = path.basename(dirPath);
        console.log(indent + "├───"+filename);
    }
    else{
        let dirname = path.basename(dirPath);
        console.log(indent + "└───"+dirname);
        let childrens = fs.readdirSync(dirPath);
        for(let i=0;i<childrens.length;i++){
            let childPath = path.join(dirPath,childrens[i])
            treeHelper(childPath,indent+"\t");
        }
    }
}

module.exports = {
    treeKey:treeFn
}