import { File, Folder } from "@/components/ui/file-tree"
import DotsLoading from "@/components/tool/dots-loading"

export default function ElementsTree({
    contents,
    toggleSelectElement,
    loadDirectory,
}: Readonly<{
    contents: any[]
    toggleSelectElement: (sha: string, value_selected: boolean) => void
    loadDirectory: (sha: string) => Promise<void>
}>) {
    return (
        <>
            {contents.map((content) =>
                content.type === "dir" ? (
                    <Folder
                        key={content.sha}
                        value={content.sha}
                        element={content.name}
                        isSelect={content.selected}
                        onClick={async () => {
                            if (content.dirContent.length > 0) return
                            await loadDirectory(content.sha)
                        }}
                        handelButtonSelectAll={() =>
                            toggleSelectElement(content.sha, true)
                        }
                        handleButtonDeslectAll={() =>
                            toggleSelectElement(content.sha, false)
                        }
                    >
                        {content.dirContent.length > 0 ? (
                            <ElementsTree
                                contents={content.dirContent}
                                toggleSelectElement={toggleSelectElement}
                                loadDirectory={loadDirectory}
                            />
                        ) : (
                            <DotsLoading />
                        )}
                    </Folder>
                ) : (
                    <File
                        key={content.sha}
                        value={content.path}
                        isSelect={content.selected}
                        handleSelect={() =>
                            toggleSelectElement(content.sha, !content.selected)
                        }
                    >
                        <p>{content.name}</p>
                    </File>
                )
            )}
        </>
    )
}
