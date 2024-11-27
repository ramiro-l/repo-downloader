import { File as FileItem } from "@/services/file"
import { filesize } from "filesize"

import { MetaData } from "@/hooks/git/RepositoryController"
import { File, Folder } from "@/components/ui/file-tree"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import DotsLoading from "@/components/tool/dots-loading"

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
                        {file.content.length > 0 ? (
                            <ElementsTree
                                container={file.content}
                                toggleSelectItem={toggleSelectItem}
                                selectFolder={selectFolder}
                            />
                        ) : (
                            <DotsLoading />
                        )}
                    </Folder>
                ) : (
                    <File
                        key={file.id}
                        value={file.id}
                        isSelect={file.metaData?.selected}
                        handleSelect={() => toggleSelectItem(file.pathIndex)}
                    >
                        <TooltipProvider delayDuration={800}>
                            <Tooltip>
                                <TooltipTrigger>{file.name}</TooltipTrigger>
                                <TooltipContent
                                    side="right"
                                    className={`h-4 flex justify-center items-center text-xs py-0 shadow-none ${
                                        file.metaData?.selected &&
                                        "bg-primary ml-2  border-primary text-white"
                                    }`}
                                >
                                    <p>
                                        {filesize(file.size, {
                                            fullform: file.size < 1000,
                                        })}
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
