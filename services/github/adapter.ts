import { IFile } from "@/services/file"
import { GithubTreeItem } from "@/services/github/const"
import { getGithubRawUrl } from "@/services/github/parsers"

export const adaptGithubItemForFile = <TMetaData>(
    item: GithubTreeItem,
    owner: string,
    repo: string,
    branch: string
): IFile<TMetaData> => {
    const pathParts = item.path.split("/")
    const isDirectory = item.type === "tree"
    const fileName = pathParts.pop()
    let downloadUrl: string | undefined = undefined
    if (!isDirectory) {
        downloadUrl = getGithubRawUrl(owner, repo, branch, item.path)
    }
    if (!fileName) throw new Error("Invalid path structure")

    return {
        id: item.sha,
        path: pathParts,
        name: fileName,
        size: item.size,
        type: isDirectory ? "dir" : "file",
        content: isDirectory ? [] : undefined,
        downloadUrl: downloadUrl,
    }
}
