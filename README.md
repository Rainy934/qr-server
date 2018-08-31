## Get start
    $ npm install qr-server -g

## Usage

    Usage: qr <command> [options]

    Options:

        -V, --version    output the version number
        -h, --help       output usage information

    Commands:

        start [options]

## Exampe
    qr  start -p 3000

## Description
### Completed
- Support html, mp3, mp4, css, jpg format with MIMEType return, other formats are downloaded as binary file type.
- Support 404 prompt.
- Support folder defaults to look for html files to open.
- Support port number setting, if not, randomly select free port number.
- Support for running the command run path as the server root directory.
- Support simple request terminal log.
- Multi-process processing requests to improve performance.
- Browser cache policy implementation.
- Support gzip compression.

### Browser caching strategy 
- Html file -- negotiated cache, Last-Modify, ETag.
- Static resource file, forced cache, cache-control:max-age=86400.
- Frequently updated files such as reference file js can be updated by adding version number in Html (with change reload).

### Coming soon
- Range support, breakpoint resume
