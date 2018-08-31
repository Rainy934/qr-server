#!/usr/bin/env node

const { run } = require("../src/cluster.js");
const commander = require('commander')

commander
    .version(require('../package').version)
    .usage('<command> [options]')

commander
    .command('start')
    .option('-p', 'Defined port that server listening, default 3000')
    .action(function (port) {
        run(port)
    })


commander.parse(process.argv)