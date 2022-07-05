declare class WalkDir {
    folderPath: string;
    constructor(folderPath: any);
    forEach(fn: any): void;
}
export declare function walkDir(folderPath: any): WalkDir;
export {};
