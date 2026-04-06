import React, { useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Heading } from "@/components/ui/Headings";
import { Separator } from "@/components/ui/separator";
import { aboutStats, aboutValues } from "@/constants/about";

function About() {
    useEffect(() => {
        document.title = "TRG Store - About";
    }, []);

    return (
        <div className="flex flex-col gap-14 py-4 lg:gap-16 lg:py-6">
            <div className="rounded-[2.4rem] border border-border/70 bg-[linear-gradient(135deg,rgba(96,48,35,0.96),rgba(176,96,68,0.9))] p-8 text-white shadow-[0_30px_90px_-55px_rgba(63,29,22,0.75)] sm:p-10">
                <div className="space-y-4">
                    <Badge variant="secondary">About TRG Store</Badge>
                    <Heading size="h2" className="max-w-4xl text-white">
                        A sharper retail identity built around style, trust, and a more elevated shopping mood.
                    </Heading>
                    <Heading size="p" className="max-w-3xl text-white/75">
                        TRG Store reflects Tarun Raj Gaur&apos;s vision for a fashion-forward storefront that feels cleaner, more premium, and easier to explore.
                    </Heading>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {aboutStats.map((item, idx) => (
                    <div
                        key={idx}
                        className="rounded-[1.8rem] border border-border/70 bg-white/92 p-6 text-center shadow-sm"
                    >
                        <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-3xl bg-muted/70">
                            <item.icon className="text-primary" size={28} />
                        </div>
                        <Heading size="h4" className="font-bold">
                            {item.value}
                        </Heading>
                        <Heading size="p" className="mt-2">
                            {item.label}
                        </Heading>
                    </div>
                ))}
            </div>

            <Separator />

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
                <div className="space-y-5">
                    <Badge variant="info">Our Story</Badge>
                    <Heading size="h3">
                        TRG Store was shaped to feel more like a curated retail edit than a generic catalog.
                    </Heading>
                    <Heading size="p" className="leading-7">
                        The goal behind the rebrand is simple: keep the same dependable shopping foundation, but present it with better hierarchy, more breathing room, and a premium fashion-led visual language.
                    </Heading>
                    <Heading size="p" className="leading-7">
                        From the homepage down to product cards and account pages, the experience now feels more intentional and distinctive without disrupting how people browse, save, or shop.
                    </Heading>
                </div>
                <div className="rounded-[2rem] border border-border/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.97),rgba(246,239,234,0.95))] p-8 shadow-sm">
                    <Heading size="small" className="text-primary/70">
                        Store note
                    </Heading>
                    <Heading size="h4" className="mt-4">
                        TRG Store - Est. 2026
                    </Heading>
                    <Heading size="p" className="mt-3 leading-7">
                        Premium presentation, cleaner discovery, and the same steady shopping flow underneath.
                    </Heading>
                </div>
            </div>

            <Separator />

            <div className="flex flex-col gap-8">
                <div className="space-y-3 text-center">
                    <Badge variant="info">Core Values</Badge>
                    <Heading size="h3">What defines the new identity</Heading>
                </div>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    {aboutValues.map((item, idx) => (
                        <div
                            key={idx}
                            className="rounded-[1.8rem] border border-border/70 bg-white/92 p-6 shadow-sm"
                        >
                            <div
                                className={`mb-4 flex size-14 items-center justify-center rounded-2xl ${item.bg}`}
                            >
                                <item.icon className={item.color} size={28} />
                            </div>
                            <Heading size="h5" className="font-semibold">
                                {item.title}
                            </Heading>
                            <Heading size="p" className="mt-3 leading-7">
                                {item.description}
                            </Heading>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default About;
