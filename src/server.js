#!/usr/bin/env node
const path = require('path');
const zlib = require('zlib');
const fs = require('fs');
const Http = require('http');
const Console = require('../utils/console');
const rootPath = process.cwd();

function now(){
    return (new Date()).toUTCString();
}

let server = Http.createServer(function(req, res){
    var resPath = rootPath + req.url;
    fs.stat(resPath, function(err, stats){
        if(err){
            Console.err(resPath);
            create404Response(res)
        } else {
            if(stats.isDirectory()){
                let indexRes = resPath + '/index.html';
                fs.stat(indexRes, function(err1, stats1){
                    if(err1){
                        Console.err(indexRes);
                        create404Response(res)
                    } else {
                        Console.notice(now() + ": " + indexRes);
                        createResponse(indexRes, req, res)
                    };
                })
            } else {
                Console.notice(now() + ": " + resPath);
                createResponse(resPath, req, res)
            }
        }
    })
})

function createResponse(path, req, res){
    let bn = path.split('.').pop();
    let contentType = '';
    if(bn == 'jpg'){
        contentType = 'image/jpeg';
        res.setHeader('Cache-Control', "max-age=86400");
    }
    if(bn == 'mp3'){
        contentType = 'audio/mp3';
        res.setHeader('Cache-Control', "max-age=86400");
    }
    if(bn == 'mp4'){
        contentType = 'video/mpeg4';
        res.setHeader('Cache-Control', "max-age=86400");
    }
    if(bn == 'html' || bn == 'htm'){
        //获取文件修改时间 Last-Modify 缓存实现
        var mtime = fs.statSync(path).mtime;
        var lastModifyTime = req.headers['if-modified-since'];
        if(lastModifyTime){
            if(mtime == lastModifyTime) {
                res.writeHead(304);
                res.end();
                return
            }
        } else {
            res.setHeader('Last-Modified', mtime);
        }
        contentType = 'text/html';
    }
    if(bn == 'css'){
        contentType = 'text/css';
        res.setHeader('Cache-Control', "max-age=86400");
    }
    if(bn == 'js'){
        contentType = 'text/javascript';
        res.setHeader('Cache-Control', "max-age=86400");
    }

    if(req.headers['accept-encoding'].match(/gzip/)){
        res.setHeader('Content-Encoding', "gzip")
    }
    res.setHeader('Content-Type', contentType || 'application/octet-stream');
    //开启gzip
    fs.createReadStream(path).pipe(zlib.createGzip()).pipe(res);
}

function create404Response(res){
    res.setHeader('Content-Type','text/html');
    fs.createReadStream(path.join(__dirname,'../') + 'template/404.html').pipe(res)
}

function init(port){
    server.listen(port)
}


module.exports = {
    init
}

