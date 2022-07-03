/// <reference types="node" />
import { Stats } from 'fs';
import type { IInfoMessage } from '@/interface/iOption';
export declare function stat(path: string): Promise<IInfoMessage<Stats>>;
export declare function exists(path: string): Promise<IInfoMessage>;
export declare function readFolder(dirPath: string): Promise<IInfoMessage<string[]>>;
