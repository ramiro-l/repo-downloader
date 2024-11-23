const GITHUB_API_URL = "https://api.github.com/repos";

interface GithubElement {
    name: string;
    path: string;
    sha: string;
    size: number;
    url: string;
    html_url: string;
    git_url: string;
    download_url: null | string;
    type: "file" | "dir";
    _links: Links;
}

interface Links {
    self: string;
    git: string;
    html: string;
}

const isGithubElement = (element: any): element is GithubElement => {
    return (
        typeof element === "object" &&
        element !== null &&
        "type" in element &&
        "name" in element &&
        "path" in element &&
        "sha" in element &&
        "url" in element &&
        "html_url" in element &&
        "git_url" in element &&
        "size" in element &&
        "download_url" in element &&
        "_links" in element
    );
}

export type { GithubElement, Links };
export { isGithubElement, GITHUB_API_URL };