import { siteConfig } from "@/config/site"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PayPalIcon } from "@/components/paypal-icon"

export function DonationMessage({
    onClose,
}: {
    onClose?: () => void
}) {
    return (
        <div className="flex flex-col items-center gap-2 rounded-lg border border-primary/30 bg-primary/5 p-4 text-center relative">
            <span className="text-2xl animate-bounce" aria-hidden>☕</span>

            <p className="text-xs text-muted-foreground leading-relaxed">
                Enjoying it?{" "}
                <em className="not-italic font-semibold text-foreground">Help keep it free.</em>
            </p>

            <Link
                href={siteConfig.donations.paypal_link}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full"
            >
                <Button className="w-full gap-2 dark:border-primary/40 border-primary/30 bg-primary/5 dark:bg-primary/25 hover:bg-primary/10 dark:hover:bg-primary/50 text-primary hover:text-primary dark:text-white" variant="outline">
                    <PayPalIcon />
                    Donate
                </Button>
            </Link>

            <Button
                variant="ghost"
                size="sm"
                className=" opacity-50 h-5 mt-1 text-xs"
                onClick={() => onClose && onClose()}
            >
                Not right now
            </Button>
        </div>
    )
}