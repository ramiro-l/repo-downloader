import { siteConfig } from "@/config/site"
import ContainerTool from "@/components/tool/container-tool"

export default async function IndexPage() {
    return (
        <section className="container grid items-center gap-6  pt-6 md:pt-10 pb-8 xl:px-64 lg:px-32">
            <div className="flex max-w-[980px] flex-col items-start gap-2">
                <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
                    Fast download content
                    <br className="hidden sm:inline" /> for all public github
                    repositories.
                </h1>
                <p className=" text-lg text-muted-foreground">
                    Search for a repository, choose the files and folders, and
                    download them instantly. By{" "}
                    <a
                        href={siteConfig.links.me}
                        target="_blank"
                        className=" underline hover:text-accent-foreground text-nowrap"
                    >
                        ramiro-l
                    </a>
                    .
                </p>
            </div>

            <ContainerTool />
        </section>
    )
}
