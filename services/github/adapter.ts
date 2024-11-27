import { IFile } from "@/services/file";
import { GithubTreeItem } from "@/services/github/const";

export const adaptGithubItemForFile = <TMetaData>(item: GithubTreeItem): IFile<TMetaData> => {
    const pathParts = item.path.split("/");
    const isDirectory = item.type === "tree";
    const fileName = pathParts.pop();
    if (!fileName) throw new Error("Invalid path structure");

    return {
        id: item.sha,
        path: pathParts,
        name: fileName,
        size: item.size,
        type: isDirectory ? "dir" : "file",
        content: isDirectory ? [] : undefined
    }
}