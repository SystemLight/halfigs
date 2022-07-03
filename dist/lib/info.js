import * as fs from 'fs';
/*
    获取指定路径文件元信息
 */
export function stat(path) {
    return new Promise((resolve) => {
        fs.stat(path, (err, stats) => {
            resolve({ err, info: stats });
        });
    });
}
/*
    获取指定路径是否存在
 */
export function exists(path) {
    return new Promise((resolve) => {
        fs.access(path, fs.constants.F_OK, (err) => {
            err && resolve({ err, info: false });
            resolve({ err, info: true });
        });
    });
}
/*
    读取文件夹内容列表
 */
export function readFolder(dirPath) {
    return new Promise((resolve) => {
        fs.readdir(dirPath, (err, files) => {
            resolve({ err, info: files });
        });
    });
}
//# sourceMappingURL=info.js.map