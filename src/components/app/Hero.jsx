import React from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/Headings";
import { useAuth } from "@/providers/AuthProvider";

function Hero() {
    const { loggedInUser } = useAuth();

    return (
        <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="overflow-hidden rounded-[2.2rem] border border-border/70 bg-[linear-gradient(135deg,rgba(255,251,247,0.98),rgba(244,233,226,0.96))] p-7 shadow-[0_30px_90px_-60px_rgba(89,43,30,0.6)] sm:p-8 lg:p-10">
                <div className="flex flex-col gap-5">
                    <span className="inline-flex w-fit items-center gap-2 rounded-full bg-primary/8 px-4 py-2 text-sm font-medium text-primary">
                        <Sparkles className="size-4" />
                        Tarun Raj Gaur&apos;s curated edit
                    </span>
                    <div className="space-y-3">
                        <Heading size="small" className="text-primary/70">
                            Welcome back, {loggedInUser.fullName}
                        </Heading>
                        <Heading size="h2" className="max-w-2xl">
                            A fashion-first storefront designed to feel cleaner, sharper, and more premium.
                        </Heading>
                        <Heading size="p" className="max-w-2xl leading-7">
                            TRG Store brings together style, beauty, and everyday essentials with the polish of a modern retail edit and the same flow you already know.
                        </Heading>
                    </div>
                    <div className="flex flex-col gap-3 sm:flex-row">
                        <Button asChild>
                            <Link to="/products">
                                Shop the edit
                                <ArrowRight className="size-4" />
                            </Link>
                        </Button>
                        <Button asChild variant="outline">
                            <Link to="/categories">Browse categories</Link>
                        </Button>
                    </div>
                </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
                <div className="rounded-[1.8rem] border border-border/70 bg-white/90 p-6 shadow-sm">
                    <Heading size="small" className="text-primary/70">
                        New identity
                    </Heading>
                    <Heading size="h5" className="mt-3">
                        TRG Store
                    </Heading>
                    <Heading size="p" className="mt-2 leading-7">
                        A more refined visual direction built around fashion-focused presentation and stronger hierarchy.
                    </Heading>
                </div>
                <div className="rounded-[1.8rem] border border-border/70 bg-white/90 p-6 shadow-sm">
                    <Heading size="small" className="text-primary/70">
                        Why it feels new
                    </Heading>
                    <Heading size="p" className="mt-3 leading-7">
                        Spacious layouts, elevated surfaces, premium buttons, and cleaner product storytelling shift the brand without changing behavior.
                    </Heading>
                </div>
                <div className="rounded-[1.8rem] border border-border/70 bg-primary px-6 py-7 text-primary-foreground shadow-[0_30px_70px_-50px_rgba(86,39,29,1)]">
                    <Heading size="small" className="text-primary-foreground/70">
                        Today&apos;s note
                    </Heading>
                    <Heading size="h5" className="mt-3 text-primary-foreground">
                        Trend-led picks, polished checkout, same dependable flow.
                    </Heading>
                </div>
            </div>
        </section>
    );
}

export default Hero;
