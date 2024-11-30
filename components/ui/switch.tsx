import * as React from "react"
import * as SwitchPrimitives from "@radix-ui/react-switch"

import { cn } from "@/lib/utils"

const sizes = {
    small: "h-4 w-8",
    medium: "h-6 w-11",
    large: "h-8 w-14",
}

const thumbSizes = {
    small: "size-3 data-[state=checked]:translate-x-4",
    medium: "size-5 data-[state=checked]:translate-x-5",
    large: "size-7 data-[state=checked]:translate-x-6",
}

interface SwitchProps
    extends React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root> {
    size?: "small" | "medium" | "large"
}

const Switch = React.forwardRef<
    React.ElementRef<typeof SwitchPrimitives.Root>,
    SwitchProps
>(({ className, size = "medium", ...props }, ref) => (
    <SwitchPrimitives.Root
        className={cn(
            "peer inline-flex shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
            sizes[size],
            className
        )}
        {...props}
        ref={ref}
    >
        <SwitchPrimitives.Thumb
            className={cn(
                "pointer-events-none block rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=unchecked]:translate-x-0",
                thumbSizes[size]
            )}
        />
    </SwitchPrimitives.Root>
))
Switch.displayName = SwitchPrimitives.Root.displayName

export { Switch }
