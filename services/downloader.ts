import JSZip from "jszip";
import { File } from "@/services/file";

async function addFileToZip<TMetaData>(file: File<TMetaData>, zip: JSZip): Promise<void> {
    if (file.isDirectory()) throw new Error("Directories are not supported yet");
    if (file.isFile()) {
        const content = await fetch(file.downloadUrl).then(res => res.blob());
        zip.file(`${file.path.join("/")}/${file.name}`, content);
    }
}

async function createAndDownloadZip<TMetaData>(files: File<TMetaData>[], fileName: string): Promise<void> {
    const zip = new JSZip();

    for (const file of files) {
        await addFileToZip(file, zip);
    }

    const content = await zip.generateAsync({ type: "blob" });
    const downloadUrl = URL.createObjectURL(content);

    const a = document.createElement("a");
    a.href = downloadUrl;
    a.download = fileName.toLowerCase().replace(/ /g, "-");
    a.click();

    URL.revokeObjectURL(downloadUrl);
}

export { createAndDownloadZip };