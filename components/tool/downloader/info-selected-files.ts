export function infoSelectedFiles(
    cantFilesSelected: number,
    cantFoldersSelected: number
): string {
    if (cantFilesSelected === 0 && cantFoldersSelected === 0) {
        return "No files or folders selected"
    }
    if (cantFilesSelected > 0 && cantFoldersSelected === 0) {
        return `${formatFiles(
            cantFilesSelected
        )} selected and no folders selected`
    }
    if (cantFilesSelected === 0 && cantFoldersSelected > 0) {
        return `No files selected, and ${formatFolders(
            cantFoldersSelected
        )} selected`
    }

    return `${formatFiles(cantFilesSelected)} and ${formatFolders(
        cantFoldersSelected
    )} selected`
}

function formatFiles(count: number): string {
    if (count === 0) return "no files"
    return `${count} ${count === 1 ? "file" : "files"}`
}

function formatFolders(count: number): string {
    if (count === 0) return "no folders"
    return `${count} ${count === 1 ? "folder" : "folders"}`
}
