import { siteConfig } from "@/config/site"
import ContainerTool from "@/components/tool/container-tool"

export default async function IndexPage() {
    return (
        <section className="container grid items-center gap-6  pb-8 pt-6 md:pt-10 lg:px-32 xl:px-64">
            <div className="flex max-w-[980px] flex-col items-start gap-2 max-lg:!max-w-full max-lg:items-center max-lg:text-center">
                <h2 className="text-balance text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
                    Fast download content
                    <br className="max-lg:hidden" /> for all public github
                    repositories.
                </h2>
                <h3 className=" text-balance text-lg text-muted-foreground  max-lg:max-w-[400px]">
                    Search for a repository, choose the files and folders, and
                    download them instantly. <br className="lg:hidden" />
                    <span className=" text-nowrap">
                        By{" "}
                        <a
                            href={siteConfig.links.me}
                            target="_blank"
                            className=" underline hover:text-accent-foreground"
                            rel="noreferrer"
                        >
                            ramiro-l
                        </a>
                        .
                    </span>
                </h3>
            </div>

            <ContainerTool />
        </section>
    )
}
