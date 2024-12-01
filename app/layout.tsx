import "@/styles/globals.css"
import { Metadata, Viewport } from "next"

import { siteConfig } from "@/config/site"
import { fontSans } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import DotPattern from "@/components/ui/dot-pattern"
import { SiteHeader } from "@/components/site-header"
import { TailwindIndicator } from "@/components/tailwind-indicator"
import { ThemeProvider } from "@/components/theme-provider"
import ogImage from "@/app/og.png"

export const viewport: Viewport = {
    themeColor: "hsl(var(--background))",
    // themeColor: [
    //     { media: "(prefers-color-scheme: light)", color: "white" },
    //     { media: "(prefers-color-scheme: dark)", color: "black" },
    // ],
}

export const metadata: Metadata = {
    metadataBase: new URL(siteConfig.url),
    openGraph: {
        title: siteConfig.name,
        description: siteConfig.description,
        siteName: siteConfig.name,
        type: "website",
        locale: "en_US",
        url: siteConfig.url,
        images: [
            {
                url: ogImage.src,
                width: ogImage.width,
                height: ogImage.height,
            },
        ],
    },
    robots: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
        googleBot: "index, follow",
    },
    applicationName: siteConfig.name,
    appleWebApp: {
        title: siteConfig.name,
        statusBarStyle: "default",
        capable: true,
    },
    title: {
        default: siteConfig.name,
        template: `%s - ${siteConfig.name}`,
    },
    description: siteConfig.description,
    twitter: {
        card: "summary_large_image",
        title: siteConfig.name,
        description: siteConfig.description,
        creator: "@rami_lugo",
        images: [
            {
                url: ogImage.src,
                width: ogImage.width,
                height: ogImage.height,
            },
        ],
    },
    icons: {
        icon: "/favicon.ico",
        apple: "/apple-touch-icon.png",
    },
}

interface RootLayoutProps {
    readonly children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head />
            <body
                className={cn(
                    "min-h-screen bg-background font-sans antialiased",
                    fontSans.variable
                )}
            >
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                >
                    <div className="relative flex min-h-screen flex-col overflow-hidden">
                        <SiteHeader />
                        <div className="z-10 flex-1">{children}</div>
                        <DotPattern
                            width={20}
                            height={20}
                            cx={1.25}
                            cy={1.25}
                            cr={1.25}
                            className={cn(
                                "left-2 top-1.5 z-0 dark:opacity-50",
                                "[mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)] "
                            )}
                        />
                    </div>
                    <TailwindIndicator />
                </ThemeProvider>
            </body>
        </html>
    )
}
