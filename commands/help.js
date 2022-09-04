function helpFn(dirPath){
    console.log(`
    List of All Command:
        node main.js tree "directoryPath"
        node main.js organize "directoryPath"
        node main.js help
        `);

}

module.exports = {
    helpKey:helpFn
}