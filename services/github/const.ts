const GITHUB_API_URL = "https://api.github.com";
const GITHUB_RAW_URL = "https://raw.githubusercontent.com";
const GITHUB_URL = "https://github.com";

interface IGithubTree {
    sha: string;
    url: string;
    tree: IGithubTreeItem[];
    truncated: boolean;
}

interface IGithubTreeItem {
    path: string;
    mode: GithubTreeItemMode;
    type: "blob" | "tree";
    sha: string;
    size?: number;
    url: string;
}

enum GithubTreeItemMode {
    BLOB = "100644",
    EXECUTABLE = "100755",
    SUBDIRECTORY = "040000",
    SUBMODULE = "160000",
    SYMLINK = "120000"
}

class GithubTree implements IGithubTree {
    sha: string;
    url: string;
    tree: GithubTreeItem[];
    truncated: boolean;

    constructor(tree: IGithubTree) {
        if (!isGithubTree(tree)) {
            throw new Error("Invalid data received from GitHub API");
        }
        this.sha = tree.sha;
        this.url = tree.url;
        this.tree = tree.tree.map((element) => new GithubTreeItem(element));
        this.truncated = tree.truncated;
    }
}

class GithubTreeItem implements IGithubTreeItem {
    path: string;
    mode: GithubTreeItemMode;
    type: "blob" | "tree";
    sha: string;
    size: number; // Only for blobs, folders have size 0
    url: string;

    constructor(item: IGithubTreeItem) {
        if (!isGithubTreeItem(item)) {
            throw new Error("Invalid data received from GitHub API");
        }
        this.path = item.path;
        this.mode = item.mode;
        this.type = item.type;
        this.sha = item.sha;
        this.size = item.size ? item.size : 0;
        this.url = item.url;
    }
}

const isGithubTree = (element: any): element is IGithubTree => {
    return (
        typeof element === "object" &&
        element !== null &&
        "sha" in element &&
        "url" in element &&
        "tree" in element &&
        Array.isArray(element.tree) &&
        "truncated" in element
    );
};

const isGithubTreeItem = (element: any): element is IGithubTreeItem => {
    return (
        typeof element === "object" &&
        element !== null &&
        "path" in element &&
        "mode" in element &&
        "type" in element &&
        "sha" in element &&
        (element.type === "blob" || element.type === "tree") &&
        (element.type == "blob" ? "size" in element : true) &&
        "url" in element
    );
};

export { GithubTree, GithubTreeItem, GithubTreeItemMode, GITHUB_API_URL, GITHUB_URL, GITHUB_RAW_URL };
