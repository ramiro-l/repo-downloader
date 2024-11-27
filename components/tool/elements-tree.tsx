import { File as FileItem } from "@/services/file"

import { MetaData } from "@/hooks/git/RepositoryController"
import { File, Folder } from "@/components/ui/file-tree"
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
                        <p>{file.name}</p>
                    </File>
                )
            )}
        </>
    )
}
