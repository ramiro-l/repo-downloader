import { IFile } from "@/services/file"
import { GithubTreeItem, GithubTreeItemMode } from "@/services/github/const"
import { getGithubRawUrl } from "@/services/github/parsers"

export const adaptGithubItemForFile = <TMetaData>(
    item: GithubTreeItem,
    owner: string,
    repo: string,
    branch: string
): IFile<TMetaData> => {
    const pathParts = item.path.split("/")
    const type = parseType(item)
    const fileName = pathParts.pop()
    let downloadUrl: string | undefined = undefined
    if (type !== "dir") {
        downloadUrl = getGithubRawUrl(owner, repo, branch, item.path)
    }
    if (!fileName) throw new Error("Invalid path structure")

    return {
        id: item.sha,
        path: pathParts,
        name: fileName,
        size: item.size,
        type: type,
        content: type === "dir" ? [] : undefined,
        downloadUrl: downloadUrl,
        isSubmodule: item.mode === GithubTreeItemMode.SUBMODULE,
    }
}

const parseType = (item: GithubTreeItem): "file" | "dir" | "symlink" => {
    if (item.type === "tree") return "dir"
    if (item.mode === GithubTreeItemMode.SYMLINK) return "symlink"
    if (item.mode === GithubTreeItemMode.SUBMODULE) return "dir"
    return "file"
}
