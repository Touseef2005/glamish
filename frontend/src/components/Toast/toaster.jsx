// components/ui/toaster.js
"use client";

import React from "react";
import { Toast } from "@components/shadcn-ui/toast";
import { useToast } from "@hooks/use-toast";

export function Toaster() {
    const { toasts } = useToast();

    return (
        <div className="toaster">
            {toasts.map(function ({ id, title, description, action, ...props }) {
                return (
                    <Toast key={id} {...props}>
                        <div className="grid gap-1">
                            {title && <Toast.Title>{title}</Toast.Title>}
                            {description && (
                                <Toast.Description>{description}</Toast.Description>
                            )}
                        </div>
                        {action}
                    </Toast>
                );
            })}
        </div>
    );
}