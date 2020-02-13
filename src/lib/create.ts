import {IOptionMessage} from "../interface/iOption";

import * as fs from "fs";
import * as ph from "path";

import {exists} from "./info";


/*
    创建一个文件，可以写入内容
 */
export function createFile(filePath: string, data: any = ""): Promise<IOptionMessage> {
    return new Promise(resolve => {
        fs.writeFile(filePath, data, (err) => {
            err && resolve({err, success: false});
            resolve({err, success: true});
        });
    });
}

/*
    创建一个文件，并且写入内容，文件路径可以是不存在的，会递归创建
 */
export async function createNestedFile(filePath: string, data: any): Promise<IOptionMessage> {
    let dirname = ph.dirname(filePath);
    let {err} = await createNestedFolder(dirname);
    if (err) {
        return {err, success: false};
    }
    let cf = await createFile(filePath, data);
    if (cf.err) {
        return {err: cf.err, success: false};
    }
    return {success: true};
}

/*
    创建一个文件夹
 */
export function createFolder(dirPath: string): Promise<IOptionMessage> {
    return new Promise(resolve => {
        fs.mkdir(dirPath, err => {
            err && resolve({err, success: false});
            resolve({success: true});
        });
    })
}

/*
    递归创建一个文件夹
 */
export async function createNestedFolder(dirPath: string): Promise<IOptionMessage> {
    let parentPath = ph.dirname(dirPath);
    let {info} = await exists(parentPath);
    if (!info) {
        let {err} = await createNestedFolder(parentPath);
        if (err) {
            return {err, success: false};
        }
    }
    let {err} = await createFolder(dirPath);
    if (err) {
        return {err, success: false};
    }
    return {success: true};
}
