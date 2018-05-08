const colors = require('colors');

function notice(str){
    console.log('    ' + str.green);
}

function err(str){
    console.log('    ' + str.red);
}

function log(str){
    console.log('    ' + str);
}

module.exports = {
    notice: notice,
    err: err,
    log: log
}