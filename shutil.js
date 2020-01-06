const fs = require("fs");
const sPath = require("path");


function stat(path) {
    return new Promise(resolve => {
        fs.stat(path, (err, stats) => {
            err && resolve({err});
            resolve({stats});
        });
    });
}

function exists(path) {
    return new Promise(function (resolve) {
        fs.access(path, fs.constants.F_OK, (err) => {
            err && resolve({err, exist: false});
            resolve({exist: true});
        });
    })
}

function readFolder(dirPath) {
    return new Promise(resolve => {
        fs.readdir(dirPath, (err, files) => {
            err && resolve({err});
            resolve({files});
        });
    })
}

let info = {
    stat, exists, readFolder
};


function createFile(filePath, data) {
    data = data || "";
    return new Promise(function (resolve) {
        fs.writeFile(filePath, data, (err) => {
            err && resolve({err});
            resolve({success: true});
        });
    });
}

async function createNestedFile(filePath, data) {
    let dirname = sPath.dirname(filePath);
    let {err} = await createNestedFolder(dirname);
    if (err) {
        return {err};
    }
    let cf = await createFile(filePath, data);
    if (cf.err) {
        return {err: cf.err};
    }
    return {success: true};
}

function createFolder(dirPath) {
    return new Promise(resolve => {
        fs.mkdir(dirPath, err => {
            err && resolve({err});
            resolve({success: true});
        });
    })
}

async function createNestedFolder(dirPath) {
    let parentPath = sPath.dirname(dirPath);
    let {exist} = await exists(parentPath);
    if (!exist) {
        let {err} = await createNestedFolder(parentPath);
        if (err) {
            return {err};
        }
    }
    let {err} = await createFolder(dirPath);
    if (err) {
        return {err};
    }
    return {success: true};
}

let create = {
    createFile, createNestedFile,
    createFolder, createNestedFolder
};


function removeEmptyFolder(dirPath) {
    return new Promise(resolve => {
        fs.rmdir(dirPath, err => {
            err && resolve({err});
            resolve({success: true});
        });
    })
}

function removeFile(filePath) {
    return new Promise(resolve => {
        fs.unlink(filePath, err => {
            err && resolve({err});
            resolve({success: true});
        });
    });
}

async function removeFolder(dirPath) {
    let {err, files} = await readFolder(dirPath);
    if (err) {
        return {err};
    }
    for (let f in files) {
        if (files.hasOwnProperty(f)) {
            let nowPath = sPath.join(dirPath, files[f]);
            let {stats} = await stat(nowPath);
            if (stats) {
                if (stats.isFile()) {
                    let {err} = await removeFile(nowPath);
                    if (err) {
                        return {err};
                    }
                }
                if (stats.isDirectory()) {
                    let {err} = await removeFolder(nowPath);
                    if (err) {
                        return {err};
                    }
                }
            }
        }
    }
    return await removeEmptyFolder(dirPath);
}

let remove = {
    removeEmptyFolder, removeFile, removeFolder,
    rm: async function (path) {
        path = sPath.resolve(path);
        let {err, stats} = await stat(path);
        if (err) {
            return {err};
        }
        if (stats.isDirectory()) {
            return await removeFolder(path);
        } else if (stats.isFile()) {
            return await removeFile(path);
        } else {
            return {err: "Type Error"};
        }
    }
};


function move(oldDirPath, newDirPath) {
    return new Promise(resolve => {
        fs.rename(oldDirPath, newDirPath, err => {
            err && resolve({err});
            resolve({success: true});
        });
    });
}

function copyFile(oldFilePath, newFilePath) {
    return new Promise(function (resolve) {
        fs.copyFile(oldFilePath, newFilePath, fs.constants.COPYFILE_EXCL, (err) => {
            err && resolve({err});
            resolve({success: true});
        });
    });
}

async function copyFolder(oldDirPath, newDirPath) {
    oldDirPath = sPath.resolve(oldDirPath);
    newDirPath = sPath.resolve(newDirPath);
    if (newDirPath.includes(oldDirPath)) {
        return {err: "Containment relationship"}
    }
    let {err} = await exists(newDirPath);
    if (err) {
        let {err} = await createNestedFolder(newDirPath);
        if (err) {
            return {err};
        }
    } else {
        let {err, files} = await readFolder(oldDirPath);
        if (files) {
            for (let f in files) {
                if (files.hasOwnProperty(f)) {
                    let oldF = sPath.join(oldDirPath, files[f]);
                    let {stats} = await stat(oldF);
                    if (stats) {
                        if (stats.isFile()) {
                            let {err} = await copyFile(oldF, sPath.join(newDirPath, files[f]));
                            if (err) {
                                return {err};
                            }
                        }
                        if (stats.isDirectory()) {
                            let newD = sPath.join(newDirPath, files[f]);
                            let {err} = await createFolder(newD);
                            if (err) {
                                return {err};
                            }
                            let cf = await copyFolder(oldF, newD);
                            if (cf.err) {
                                return {err: cf.err};
                            }
                        }
                    }
                }
            }
        } else {
            return {err};
        }
    }
    return {success: true};
}

let copy = {
    move, copyFile, copyFolder,
    cp: async function (oldPath, newPath) {
        let {err, stats} = await stat(oldPath);
        if (err) {
            return {err};
        }
        let exitsPath = "";
        if (stats.isFile()) {
            exitsPath = sPath.dirname(newPath);
            let {exist} = await exists(exitsPath);
            if (!exist) {
                let {err} = await createNestedFolder(exitsPath);
                if (err) {
                    return {err};
                }
            }
            return await copyFile(oldPath, newPath);
        } else if (stats.isDirectory()) {
            return await copyFolder(oldPath, newPath);
        } else {
            return {err: "Type Error"};
        }
    }
};


module.exports = {
    info, create, remove, copy
};
