import {IOptionMessage} from "../interface/iOption";

import * as fs from "fs";
import * as ph from "path";

import {stat, exists, readFolder} from "./info";
import {createNestedFolder, createFolder} from "./create";


/*
    复制文件或文件夹到另一个路径下，newDirPath必须包含新文件夹或文件名称
 */
export function move(oldDirPath: string, newDirPath: string): Promise<IOptionMessage> {
    return new Promise(resolve => {
        fs.rename(oldDirPath, newDirPath, err => {
            err && resolve({err, success: false});
            resolve({success: true});
        });
    });
}

/*
    复制文件到新路径，newFilePath必须包含新文件夹或文件名称
 */
export function copyFile(oldFilePath: string, newFilePath: string): Promise<IOptionMessage> {
    return new Promise(resolve => {
        fs.copyFile(oldFilePath, newFilePath, fs.constants.COPYFILE_EXCL, (err) => {
            err && resolve({err, success: false});
            resolve({success: true});
        });
    });
}

/*
    复制文件夹到新路径，newDirPath必须包含新文件夹或文件名称
 */
export async function copyFolder(oldDirPath: string, newDirPath: string): Promise<IOptionMessage> {
    oldDirPath = ph.resolve(oldDirPath);
    newDirPath = ph.resolve(newDirPath);
    if (newDirPath.includes(oldDirPath)) {
        return {err: new Error("Containment relationship"), success: false}
    }
    let {err} = await exists(newDirPath);
    if (err) {
        let {err} = await createNestedFolder(newDirPath);
        if (err) {
            return {err, success: false};
        }
    } else {
        let {err, info: files} = await readFolder(oldDirPath);
        if (files) {
            for (let f in files) {
                if (files.hasOwnProperty(f)) {
                    let oldF = ph.join(oldDirPath, files[f]);
                    let {info: stats} = await stat(oldF);
                    if (stats) {
                        if (stats.isFile()) {
                            let {err} = await copyFile(oldF, ph.join(newDirPath, files[f]));
                            if (err) {
                                return {err, success: false};
                            }
                        }
                        if (stats.isDirectory()) {
                            let newD = ph.join(newDirPath, files[f]);
                            let {err} = await createFolder(newD);
                            if (err) {
                                return {err, success: false};
                            }
                            let cf = await copyFolder(oldF, newD);
                            if (cf.err) {
                                return {err: cf.err, success: false};
                            }
                        }
                    }
                }
            }
        } else {
            return {err, success: false};
        }
    }
    return {success: true};
}

/*
    复制文件夹或文件夹到新路径，路径可以不存在会递归创建
 */
export async function cp(oldPath: string, newPath: string): Promise<IOptionMessage> {
    let {err, info: stats} = await stat(oldPath);
    if (err) {
        return {err, success: false};
    }
    let exitsPath = "";
    if (stats.isFile()) {
        exitsPath = ph.dirname(newPath);
        let {info: exist} = await exists(exitsPath);
        if (!exist) {
            let {err} = await createNestedFolder(exitsPath);
            if (err) {
                return {err, success: false};
            }
        }
        return await copyFile(oldPath, newPath);
    } else {
        return await copyFolder(oldPath, newPath);
    }
}
