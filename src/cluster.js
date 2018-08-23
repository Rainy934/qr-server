const cluster = require("cluster");
const numCpus = require("os").cpus().length;
const { init } = require("./server.js");
const Console = require('../utils/console');

function run(port){
    if(cluster.isMaster){
        Console.notice(`Server is running on port ${port}`)
        for(let i = 0; i < numCpus; i++){
            cluster.fork();
        }
    } else {
        init(port)
    }
}

module.exports = {
    run
}