import type { IOptionMessage } from '@/interface/iOption';
export declare function move(oldDirPath: string, newDirPath: string): Promise<IOptionMessage>;
export declare function copyFile(oldFilePath: string, newFilePath: string): Promise<IOptionMessage>;
export declare function copyFolder(oldDirPath: string, newDirPath: string): Promise<IOptionMessage>;
export declare function cp(oldPath: string, newPath: string): Promise<IOptionMessage>;
