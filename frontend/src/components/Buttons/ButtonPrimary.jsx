'use client'

import React from "react";
import { Button } from "@components/shadcn-ui/button";
import { useRouter } from "next/navigation";

export default function ButtonPrimary({
    title = "Button",
    onButtonClick,
    href,
    className,
    ...props
}) {

    const router = useRouter()

    if (href && href !== "#") {
        onButtonClick = () => router.push(href)
    }


    return (
        <Button
            {...props}
            variant="default"
            className={`bg-black text-white hover:bg-white hover:border hover:border-black hover:text-black ${className}`}
            onClick={onButtonClick ? onButtonClick : null}
        >
            {title}
        </Button>
    );
}
