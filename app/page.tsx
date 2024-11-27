import { siteConfig } from "@/config/site"
import ContainerTool from "@/components/tool/container-tool"

export default async function IndexPage() {
    return (
        <section className="container grid items-center gap-6  pt-6 md:pt-10 pb-8 xl:px-64 lg:px-32">
            <div className="flex max-w-[980px] flex-col items-start gap-2 max-lg:!max-w-full max-lg:text-center max-lg:items-center">
                <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl text-balance">
                    Fast download content
                    <br className="max-lg:hidden" /> for all public github
                    repositories.
                </h1>
                <p className=" text-lg text-muted-foreground max-lg:max-w-[400px]  text-balance">
                    Search for a repository, choose the files and folders, and
                    download them instantly. <br className="lg:hidden" />
                    <span className=" text-nowrap">
                        By{" "}
                        <a
                            href={siteConfig.links.me}
                            target="_blank"
                            className=" underline hover:text-accent-foreground"
                        >
                            ramiro-l
                        </a>
                        .
                    </span>
                </p>
            </div>

            <ContainerTool />
        </section>
    )
}
