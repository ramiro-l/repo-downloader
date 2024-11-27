import { GITHUB_API_URL, GithubTree, GithubTreeItem } from "@/services/github/const";
import { adaptGithubItemForFile } from "@/services/github/adapter";
import { File } from "@/services/file";

export async function getGithubFiles<TMetaData>(
    owner: string,
    repo: string,
    initMetadata: TMetaData,
    branch?: string,
): Promise<{
    files: File<TMetaData>[];
    rootId: string;
}> {
    const tree = await getGithubTree(owner, repo, branch);

    return {
        files: await githubTreeToFiles(tree, initMetadata),
        rootId: tree.sha,
    };
}

export async function getGithubTree(
    owner: string,
    repo: string,
    branch?: string
): Promise<GithubTree> {
    const url = `${GITHUB_API_URL}/repos/${owner}/${repo}/git/trees/${branch}?recursive=1`;
    const response = await fetch(url);
    const data = await response.json();
    const tree = new GithubTree(data);
    if (tree.truncated) {
        throw new Error("GitHub API response is truncated, too many files in the repository");
    }
    tree.tree.sort(orderTreeItems);
    return tree;
}

export async function githubTreeToFiles<TMetaData>(
    tree: GithubTree,
    initMetadata: TMetaData
): Promise<File<TMetaData>[]> {
    const container: File<TMetaData>[] = [];

    for (const item of tree.tree) {
        const file = new File(adaptGithubItemForFile<TMetaData>(item), initMetadata);
        addFileToContainer(file, container);
    }

    return container;
}

const orderTreeItems = (a: GithubTreeItem, b: GithubTreeItem) => {
    if (a.type === "tree" && b.type === "blob") {
        return -1;
    }
    if (a.type === "blob" && b.type === "tree") {
        return 1;
    }
    return a.path.localeCompare(b.path);
}

const addFileToContainer = <TMetaData>(file: File<TMetaData>, container: File<TMetaData>[]) => {
    const addFileTo = <TMetaData>(path: string[], currentDirectory: File<TMetaData>[], file: File<TMetaData>) => {
        if (path.length === 0) throw new Error("Path is empty");

        let parentIndex = -1;
        const parent = currentDirectory.find((f, index) => {
            if (f.name === path[0]) {
                parentIndex = index;
                return true;
            }
            return false;
        });
        if (parent && parent.isDirectory() && parentIndex != -1) {
            file.pushPathIndex(parentIndex);
            if (path.length === 1) {
                file.pushPathIndex(parent.content.length);
                parent.content.push(file);
            } else {
                addFileTo(path.slice(1), parent.content, file);
            }
        } else {
            throw new Error(`Parent not found for ${file.path.join("/")}`);
        }
    }

    if (file.inRoot()) {
        file.pushPathIndex(container.length);
        container.push(file);
    } else {
        addFileTo(file.path, container, file);
    }
}
