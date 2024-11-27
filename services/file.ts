interface IFile<TMetaData> {
    id: string;
    name: string;
    size: number;
    path: string[];
    type: "file" | "dir";
    metaData?: TMetaData;
    pathIndex?: number[];
    content?: File<TMetaData>[];
}

class File<TMetaData> {
    id: string;
    name: string;
    size: number;
    path: string[]; // path not including the file name
    pathIndex: number[] = []; // use for search in File[]
    type: "file" | "dir";
    metaData: TMetaData;
    _content?: File<TMetaData>[];

    constructor(item: IFile<TMetaData>, initMetaData: TMetaData) {
        this.id = item.id;
        this.name = item.name;
        this.size = item.size;
        this.path = item.path;
        this.type = item.type;
        this._content = item.content;
        this.metaData = initMetaData;
    }

    public get content(): File<TMetaData>[] {
        if (!this.isDirectory()) throw new Error("File is not a directory")
        if (!this._content) throw new Error("Directory content is undefined")
        return this._content
    }

    pushPathIndex(newIndex: number) {
        if (this.pathIndex.length > this.path.length) throw new Error("Index exceeds path length")
        this.pathIndex.push(newIndex)
    }

    inRoot() {
        return this.path.length === 0
    }

    isDirectory() {
        return this.type === "dir"
    }

    isFile() {
        return this.type === "file"
    }

    isChildOf(file: File<TMetaData>) {
        if (!this.isDirectory()) throw new Error("File is not a directory")
        return this.content.some((child) => child.id === file.id)
    }
}

function searchFile<TMetaData>(pathIndex: number[], files: File<TMetaData>[]): {
    file: File<TMetaData>, parents?: File<TMetaData>[]
} {
    const parents: File<TMetaData>[] = [];
    let currentFiles = files;

    for (const index of pathIndex.slice(0, -1)) {
        if (index >= currentFiles.length) throw new Error("Index out of bounds")

        const file = currentFiles[index];
        currentFiles = file.content;
        parents.push(file);
    }

    const lastIndex = pathIndex[pathIndex.length - 1];
    if (lastIndex >= currentFiles.length) throw new Error("Index out of bounds");
    return {
        file: currentFiles[lastIndex],
        parents: parents
    };
}

function collectFilteredFiles<TMetaData>(
    condFn: (file: File<TMetaData>) => boolean,
    files: File<TMetaData>[]
): File<TMetaData>[] {
    const result: File<TMetaData>[] = [];
    for (const file of files) {
        if (condFn(file)) {
            result.push(file);
        }
        if (file.isDirectory()) {
            result.push(...collectFilteredFiles(condFn, file.content));
        }
    }
    return result;
}

export { File, type IFile, searchFile, collectFilteredFiles };