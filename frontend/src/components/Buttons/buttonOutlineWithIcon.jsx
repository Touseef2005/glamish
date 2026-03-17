"use client"

import React from "react";
import { Button } from "@/components/shadcn-ui/button";
import { useRouter } from "next/navigation";

export default function ButtonOutlinedWithIcon({
    title = "Button",
    href,
    onButtonClick,
    className,
    icon,
    alignIcon = "left",
    ...props
}) {

    const router = useRouter()

    if (href && href !== "#") {
        onButtonClick = () => router.push(href)
    }


    return (
        <Button
            {...props}
            variant="outline"
            onClick={onButtonClick ? onButtonClick : null}
            className={`${className} ${alignIcon === "left" ? "flex-row-reverse" : "flex-row"} border border-black text-black hover:bg-black hover:text-white flex items-center gap-2`}
        >
            {icon}
            <span>
                {title}
            </span>
        </Button>
    );
}