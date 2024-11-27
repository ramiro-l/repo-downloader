import { GITHUB_URL } from "./const"

export const getGithubUrlInfo = (url: string): { owner: string, repo: string, branch?: string } => {
    // URL con rama: github.com/<owner>/<repo>/tree/<branch>
    const matchBranch = /github\.com\/([^/]+)\/([^/]+)\/tree\/([^/]+)/.exec(url);
    if (matchBranch) {
        return { owner: matchBranch[1], repo: matchBranch[2], branch: matchBranch[3] };
    }

    // URL con git (terminando en .git): github.com/<owner>/<repo>.git
    const matchGit = /github\.com\/([^/]+)\/([^/]+)\.git$/.exec(url);
    if (matchGit) {
        return { owner: matchGit[1], repo: matchGit[2] };
    }

    // URL sin git o rama: github.com/<owner>/<repo>
    const matchOwnerRepo = /github\.com\/([^/]+)\/([^/]+)(?=$|\/)/.exec(url);
    if (matchOwnerRepo) {
        return { owner: matchOwnerRepo[1], repo: matchOwnerRepo[2] };
    }

    // URL SSH: git@github.com:<owner>/<repo>.git
    const matchSSH = /git@github\.com:([^/]+)\/([^/]+)\.git/.exec(url);
    if (matchSSH) {
        return { owner: matchSSH[1], repo: matchSSH[2] };
    }


    // Si no se encuentra un formato válido
    throw new Error(`
    Invalid URL format. Supported formats are:
    - HTTPS: github.com/<owner>/<repo>, github.com/<owner>/<repo>/tree/<branch> or github.com/<owner>/<repo>.git
    - SSH: git@github.com:<owner>/<repo>.git`
    );
}

export function isGithubUrl(url: string) {
    return url.startsWith(GITHUB_URL) || url.startsWith("git@github.com")
}

export function getGithubRepoWebUrl(owner: string, repo: string, branch?: string) {
    if (!branch) {
        return `${GITHUB_URL}/${owner}/${repo}`;
    } else {
        return `${GITHUB_URL}/${owner}/${repo}/tree/${branch}`;
    }
}

export function getGithubDownloadUrl(owner: string, repo: string, branch: string) {
    return `${GITHUB_URL}/${owner}/${repo}/zipball/${branch}/`;
}