import React from "react";
import { trustItems } from "@/constants/trust";
import { Heading } from "../ui/Headings";

function Trust({ isTitleHidden = false }) {
    return (
        <section className="rounded-[2.2rem] border border-border/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(247,240,235,0.92))] p-6 shadow-[0_25px_70px_-55px_rgba(63,29,22,0.4)] sm:p-8">
            <div className="space-y-3">
                <Heading size="small" className="text-primary/70">
                    Why shoppers stay
                </Heading>
                {!isTitleHidden && (
                    <Heading size="h3">
                        Premium presentation backed by the same dependable shopping flow.
                    </Heading>
                )}
            </div>

            <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
                {trustItems.map((trust, idx) => (
                    <div
                        key={idx}
                        className="rounded-[1.8rem] border border-border/70 bg-white/95 p-6 shadow-sm"
                    >
                        <div className="mb-5 flex size-14 items-center justify-center rounded-3xl bg-muted/70">
                            {trust.icon}
                        </div>
                        <div className="space-y-2">
                            <Heading size="h5">{trust.title}</Heading>
                            <Heading size="p">{trust.description}</Heading>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default Trust;
