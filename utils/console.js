const colors = require('colors');

function notice(str){
    str = str.replace(/\\/g, '/');
    console.log('    ' + str.green);
}

function err(str){
    str = str.replace(/\\/g, '/');
    console.log('    ' + str.red);
}

function log(str){
    str = str.replace(/\\/g, '/');
    console.log('    ' + str);
}

module.exports = {
    notice: notice,
    err: err,
    log: log
}