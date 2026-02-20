"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { shouldShowDonationModal, setDonationModalShown, setGoToDonationPage } from "@/lib/donations"
import { siteConfig } from "@/config/site"

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogDescription,
    DialogTrigger,
} from "@/components/ui/dialog"
import { PayPalIcon } from "@/components/paypal-icon"

function PayPalButton() {
    return (
        <Link
            href={siteConfig.donations.paypal_link}
            target="_blank"
            rel="noopener noreferrer"
        >
            <Button className="flex gap-3 w-full" onClick={setGoToDonationPage}>
                <PayPalIcon />
                Donate with PayPal
            </Button>
        </Link>
    )
}

export function DonationDialog() {
    const [open, setOpen] = useState(false)

    useEffect(() => {
        if (shouldShowDonationModal()) {
            const t = setTimeout(() => {
                setOpen(true)
                setDonationModalShown()
            }, 1250)
            return () => clearTimeout(t)
        }
    }, [])


    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button
                    variant="ghost"
                    className="dark:border-primary dark:border dark:hover:bg-primary/10 max-sm:px-3"
                >
                    ☕
                    <span className="ml-2 max-md:hidden">Donate</span>
                </Button>
            </DialogTrigger>

            <DialogContent className="max-w-sm dark:border-2 border-none border-primary">
                <div className="flex flex-col items-center gap-4 p-3">
                    <span className="animate-bounce text-4xl" aria-hidden>☕</span>

                    <DialogTitle className="text-xl font-bold text-center leading-snug max-w-xs">
                        This tool is free.<br />
                        <em
                            className="text-primary"
                        >Help us keep it that way.</em>
                    </DialogTitle>


                    <DialogDescription className=" text-sm text-secondary-foreground/45 text-center leading-relaxed max-w-xs">
                        No ads, no limits. Just a dev who invests their time. Your donation makes a difference.
                    </DialogDescription>

                    <PayPalButton />

                    <Button
                        variant="ghost"
                        size="sm"
                        className=" opacity-50 h-6 -mt-1"
                        onClick={() => setOpen(false)}
                    >
                        Not right now
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}