import * as fs from 'fs';
import * as path from 'path';
class WalkDir {
    folderPath;
    constructor(folderPath) {
        this.folderPath = path.resolve(folderPath);
    }
    forEach(fn) {
        let fileStack = fs.readdirSync(this.folderPath);
        while (fileStack.length !== 0) {
            const currentChildPath = fileStack.pop();
            const currentPath = path.join(this.folderPath, currentChildPath);
            if (fs.statSync(currentPath).isDirectory()) {
                fileStack = fileStack.concat(fs.readdirSync(currentPath).map((v) => path.join(currentChildPath, v)));
            }
            else {
                fn(currentPath, currentChildPath, path.basename(currentChildPath));
            }
        }
    }
}
export function walkDir(folderPath) {
    return new WalkDir(folderPath);
}
//# sourceMappingURL=walk.js.map