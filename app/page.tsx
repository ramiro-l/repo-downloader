import { RepositoryProvider } from "@/context/RepositoryContext"

import WordFadeIn from "@/components/ui/word-fade-in"
import CardContents from "@/components/card-contents"
import InputRepo from "@/components/input-repo"

export default async function IndexPage() {
    return (
        <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
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

            <div>
                <RepositoryProvider>
                    <InputRepo />
                    <CardContents />
                </RepositoryProvider>
            </div>
        </section>
    )
}
