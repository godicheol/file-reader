(function() {
    'use strict';

    var config = {};
    var exports = {};
    exports.promise = {};
    exports.stream = {};

    exports.typeOf = function(elem) {
        return {
            boolean: elem instanceof Boolean,
            string: elem instanceof String,
            number: elem instanceof Number,
            array: elem instanceof Array,
            object: elem instanceof Object,
            blob: elem instanceof Blob,
            file: elem instanceof File,
            node: elem instanceof Node,
            nodeList: elem instanceof NodeList,
        }
    }

    exports.toText = function(file, encoding, cb) {
        if (!file instanceof Blob) {
            return cb(new Error("Parameter must be a Blob"));
        }
        var reader = new FileReader();
        reader.onload = function(e) {
            return cb(null, e.target.result);
        };
        reader.onerror = function(e) {
            return cb(new Error("load error"));
        };
        reader.readAsText(file, encoding || "UTF-8");
    }

    exports.toBuffer = function(file, cb) {
        if (!file instanceof Blob) {
            return cb(new Error("Parameter must be a Blob"));
        }
        var reader = new FileReader();
        reader.onload = function(e) {
            return cb(null, e.target.result);
        };
        reader.onerror = function(e) {
            return cb(new Error("load error"));
        };
        reader.readAsArrayBuffer(file);
    }

    exports.toBlob = function(file, cb) {
        if (!file instanceof Blob) {
            return cb(new Error("Parameter must be a Blob"));
        }
        var reader = new FileReader();
        reader.onload = function(e) {
            var blob = new Blob([new Uint8Array(e.target.result)], {type: file.type });
            return cb(null, blob);
        };
        reader.onerror = function(e) {
            return cb(new Error("load error"));
        };
        reader.readAsArrayBuffer(file);
    }

    exports.toDataURL = function(file, cb) {
        if (!file instanceof Blob) {
            return cb(new Error("Parameter must be a Blob"));
        }
        var reader = new FileReader();
        reader.onload = function(e) {
            return cb(null, e.target.result);
        };
        reader.onerror = function(e) {
            return cb(new Error("load error"));
        };
        reader.readAsDataURL(file);
    }

    exports.toBinary = function(file, cb) {
        if (!file instanceof Blob) {
            return cb(new Error("Parameter must be a Blob"));
        }
        var reader = new FileReader();
        reader.onload = function(e) {
            return cb(null, e.target.result);
        };
        reader.onerror = function(e) {
            return cb(new Error("load error"));
        };
        reader.readAsBinaryString(file);
    }

    // 
    // promise
    // 

    exports.promise.toText = function(file, encoding) {
        return new Promise(function(resolve, reject) {
            if (!file instanceof Blob) {
                reject(new Error("Parameter must be a Blob"));
                return false;
            }
            var reader = new FileReader();
            reader.onload = function(e) {
                resolve(e.target.result);
                return false;
            };
            reader.onerror = function(e) {
                reject(new Error("load error"));
                return false;
            };
            reader.readAsText(file, encoding || "UTF-8");
        });
    }

    exports.promise.toBuffer = function(file) {
        return new Promise(function(resolve, reject) {
            if (!file instanceof Blob) {
                reject(new Error("Parameter must be a Blob"));
                return false;
            }
            var reader = new FileReader();
            reader.onload = function(e) {
                resolve(e.target.result);
                return false;
            };
            reader.onerror = function(e) {
                reject(new Error("load error"));
                return false;
            };
            reader.readAsArrayBuffer(file);
        });
    }

    exports.promise.toBlob = function(file) {
        return new Promise(function(resolve, reject) {
            if (!file instanceof Blob) {
                reject(new Error("Parameter must be a Blob"));
                return false;
            }
            var reader = new FileReader();
            reader.onload = function(e) {
                var blob = new Blob([new Uint8Array(e.target.result)], {type: file.type });
                resolve(blob);
                return false;
            };
            reader.onerror = function(e) {
                reject(new Error("load error"));
                return false;
            };
            reader.readAsArrayBuffer(file);
        });
    }

    exports.promise.toDataURL = function(file) {
        return new Promise(function(resolve, reject) {
            if (!file instanceof Blob) {
                reject(new Error("Parameter must be a Blob"));
                return false;
            }
            var reader = new FileReader();
            reader.onload = function(e) {
                resolve(e.target.result);
                return false;
            };
            reader.onerror = function(e) {
                reject(new Error("load error"));
                return false;
            };
            reader.readAsDataURL(file);
        });
    }

    exports.promise.toBinary = function(file) {
        return new Promise(function(resolve, reject) {
            if (!file instanceof Blob) {
                reject(new Error("Parameter must be a Blob"));
                return false;
            }
            var reader = new FileReader();
            reader.onload = function(e) {
                resolve(e.target.result);
                return false;
            };
            reader.onerror = function(e) {
                reject(new Error("load error"));
                return false;
            };
            reader.readAsBinaryString(file);
        });
    }

    // 
    // stream
    // 

    exports.stream.toText = function(file, cb) {
        var FILE_SIZE = file.size; // bytes
        var CHUNK_SIZE = 1024 * 64; // 64 bytes
        var OFFSET = 0; // bytes

        var readChunk = function() {
            var reader = new FileReader();
            var blob = file.slice(OFFSET, OFFSET + CHUNK_SIZE);
            reader.onload = function(e) {
                var isDone;
                var length = e.target.result.length || e.target.result.byteLength;

                OFFSET += length;
                isDone = OFFSET < FILE_SIZE;

                cb(null, e.target.result, isDone);

                if (isDone === false) {
                    readChunk();
                }
            }
            reader.onerror = function() {
                return cb(new Error("Load error"));
            }
            reader.readAsText(blob);
        }
        readChunk();
    }

    exports.stream.toBuffer = function(file, cb) {
        var FILE_SIZE = file.size; // bytes
        var CHUNK_SIZE = 1024 * 64; // 64 bytes
        var OFFSET = 0; // bytes

        var readChunk = function() {
            var reader = new FileReader();
            var blob = file.slice(OFFSET, OFFSET + CHUNK_SIZE);
            reader.onload = function(e) {
                var isDone;
                var length = e.target.result.length || e.target.result.byteLength;

                OFFSET += length;
                isDone = OFFSET < FILE_SIZE;

                cb(null, e.target.result, isDone);

                if (isDone === false) {
                    readChunk();
                }
            }
            reader.onerror = function() {
                return cb(new Error("Load error"));
            }
            reader.readAsArrayBuffer(blob);
        }
        readChunk();
    }

    exports.stream.toBinary = function(file, cb) {
        var FILE_SIZE = file.size; // bytes
        var CHUNK_SIZE = 1024 * 64; // 64 bytes
        var OFFSET = 0; // bytes

        var readChunk = function() {
            var reader = new FileReader();
            var blob = file.slice(OFFSET, OFFSET + CHUNK_SIZE);
            reader.onload = function(e) {
                var isDone;
                var length = e.target.result.length || e.target.result.byteLength;

                OFFSET += length;
                isDone = OFFSET < FILE_SIZE;

                cb(null, e.target.result, isDone);

                if (isDone === false) {
                    readChunk();
                }
            }
            reader.onerror = function() {
                return cb(new Error("Load error"));
            }
            reader.readAsBinaryString(blob);
        }
        readChunk();
    }

    if (typeof(window.fileReader) === "undefined") {
        window.fileReader = exports;
    }
})();