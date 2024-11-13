"use client";

import { ComponentPropsWithoutRef } from "react";

export function Features(
    props: ComponentPropsWithoutRef<"section">
) {
    return (
        <section {...props} className={"py-20 md:py-24"}>
            <div className={"container"}>
                {/* Placeholder for rendering other components */}
                {props.children}
            </div>
        </section>
    );
}
