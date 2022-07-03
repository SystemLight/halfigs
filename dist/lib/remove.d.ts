import type { IOptionMessage } from '@/interface/iOption';
export declare function removeEmptyFolder(dirPath: string): Promise<IOptionMessage>;
export declare function removeFile(filePath: string): Promise<IOptionMessage>;
export declare function removeFolder(dirPath: string): Promise<IOptionMessage>;
export declare function rm(path: string): Promise<IOptionMessage>;
