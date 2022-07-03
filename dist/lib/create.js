import * as fs from 'fs';
import * as ph from 'path';
import { exists } from './info';
/*
    创建一个文件，可以写入内容
 */
export function createFile(filePath, data = '') {
    return new Promise((resolve) => {
        fs.writeFile(filePath, data, (err) => {
            err && resolve({ err, success: false });
            resolve({ err, success: true });
        });
    });
}
/*
    创建一个文件，并且写入内容，文件路径可以是不存在的，会递归创建
 */
export async function createNestedFile(filePath, data) {
    const dirname = ph.dirname(filePath);
    const { err } = await createNestedFolder(dirname);
    if (err) {
        return { err, success: false };
    }
    const cf = await createFile(filePath, data);
    if (cf.err) {
        return { err: cf.err, success: false };
    }
    return { success: true };
}
/*
    创建一个文件夹
 */
export function createFolder(dirPath) {
    return new Promise((resolve) => {
        fs.mkdir(dirPath, (err) => {
            err && resolve({ err, success: false });
            resolve({ success: true });
        });
    });
}
/*
    递归创建一个文件夹
 */
export async function createNestedFolder(dirPath) {
    const parentPath = ph.dirname(dirPath);
    const { info } = await exists(parentPath);
    if (!info) {
        const { err } = await createNestedFolder(parentPath);
        if (err) {
            return { err, success: false };
        }
    }
    const { err } = await createFolder(dirPath);
    if (err) {
        return { err, success: false };
    }
    return { success: true };
}
//# sourceMappingURL=create.js.map