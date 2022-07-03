import type { IOptionMessage } from '@/interface/iOption';
export declare function createFile(filePath: string, data?: any): Promise<IOptionMessage>;
export declare function createNestedFile(filePath: string, data: any): Promise<IOptionMessage>;
export declare function createFolder(dirPath: string): Promise<IOptionMessage>;
export declare function createNestedFolder(dirPath: string): Promise<IOptionMessage>;
