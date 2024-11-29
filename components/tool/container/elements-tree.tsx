import { File as FileItem } from "@/services/file"
import { filesize } from "filesize"
import { FileIcon, FileSymlink } from "lucide-react"

import { MetaData } from "@/hooks/git/RepositoryController"
import { File, Folder } from "@/components/ui/file-tree"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

export default function ElementsTree({
    container,
    toggleSelectItem,
    selectFolder,
}: Readonly<{
    container: FileItem<MetaData>[]
    toggleSelectItem: (pathIndex: number[]) => void
    selectFolder: (pathIndex: number[], selected: boolean) => void
}>) {
    return (
        <>
            {container.map((file) =>
                file.type === "dir" ? (
                    <Folder
                        key={file.id}
                        value={file.id}
                        element={file.name}
                        isSelect={file.metaData?.selected}
                        handelButtonSelectAll={() =>
                            selectFolder(file.pathIndex, true)
                        }
                        handleButtonDeslectAll={() =>
                            selectFolder(file.pathIndex, false)
                        }
                    >
                        {file.content.length > 0 && (
                            <ElementsTree
                                container={file.content}
                                toggleSelectItem={toggleSelectItem}
                                selectFolder={selectFolder}
                            />
                        )}
                    </Folder>
                ) : (
                    <File
                        key={file.id}
                        value={file.id}
                        isSelect={file.metaData?.selected}
                        handleSelect={() => toggleSelectItem(file.pathIndex)}
                        fileIcon={getFileIcon(file.type)}
                    >
                        <TooltipProvider delayDuration={800}>
                            <Tooltip>
                                <TooltipTrigger>{file.name}</TooltipTrigger>
                                <TooltipContent
                                    side="right"
                                    className={`flex h-4 items-center justify-center py-0 text-xs shadow-none ${
                                        file.metaData?.selected &&
                                        "ml-2 border-primary  bg-primary text-white"
                                    }`}
                                >
                                    <p>
                                        {filesize(file.size, {
                                            fullform: file.size < 1000,
                                        })}
                                        {file.isSymlink() && " -> " + "symlink"}
                                    </p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </File>
                )
            )}
        </>
    )
}

const getFileIcon = (type: "file" | "symlink") => {
    switch (type) {
        case "file":
            return <FileIcon className="size-4" />
        case "symlink":
            return <FileSymlink className="size-4" />
        default:
            return null
    }
}
