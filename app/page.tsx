import WordFadeIn from "@/components/ui/word-fade-in"
import ContainerTool from "@/components/tool/container-tool"

export default async function IndexPage() {
    return (
        <section className="container grid items-center gap-6  pt-6 md:pt-10 pb-8">
            <div className="flex max-w-[980px] flex-col items-start gap-2">
                <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
                    Fast download content
                    <br className="hidden sm:inline" /> for all public github
                    repositories.
                </h1>
                <p className="max-w-[700px] text-lg text-muted-foreground">
                    <WordFadeIn
                        words="Github Download Content is a tool to download content
                    from github repositories without git clone."
                    />
                </p>
            </div>

            <ContainerTool />
        </section>
    )
}
