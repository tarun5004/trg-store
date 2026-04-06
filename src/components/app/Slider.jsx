import Autoplay from "embla-carousel-autoplay";
import React, { useMemo, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel";
import { Heading } from "@/components/ui/Headings";
import { ImageComp } from "@/components/ui/image";
import { Banners } from "@/constants/banner";
import { cn } from "@/lib/utils";

function Slider() {
    const [current, setCurrent] = useState(0);

    const autoplayPlugin = useMemo(
        () =>
            Autoplay({
                delay: 3000,
                stopOnInteraction: false,
                stopOnFocusIn: false,
                stopOnMouseEnter: false,
            }),
        []
    );

    const handleSelect = (api) => {
        const index = api.selectedScrollSnap();
        setCurrent(index);
    };

    return (
        <section className="grid gap-5 lg:grid-cols-[1.25fr_0.75fr]">
            <div className="overflow-hidden rounded-[2.2rem] border border-border/70 bg-white/80 p-3 shadow-[0_25px_70px_-55px_rgba(63,29,22,0.6)]">
                <Carousel
                    plugins={[autoplayPlugin]}
                    opts={{
                        loop: true,
                        align: "center",
                    }}
                    setApi={(api) => {
                        if (api) {
                            api.on("select", () => handleSelect(api));
                        }
                    }}
                >
                    <CarouselContent>
                        {Banners.map((event, idx) => (
                            <CarouselItem key={idx}>
                                <div className="relative overflow-hidden rounded-[1.7rem]">
                                    <ImageComp
                                        src={event}
                                        alt={`Slide ${idx + 1}`}
                                        className="aspect-[1.1/1] w-full object-cover sm:aspect-[16/9] xl:aspect-[19/8]"
                                    />
                                    <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(33,20,15,0.8),rgba(33,20,15,0.15),rgba(33,20,15,0))]" />
                                    <div className="absolute inset-0 flex flex-col justify-end gap-3 p-5 text-white sm:max-w-md sm:p-8">
                                        <p className="text-sm font-medium uppercase tracking-[0.28em] text-white/70">
                                            TRG Store spotlight
                                        </p>
                                        <Heading size="h4" className="text-white">
                                            Fresh arrivals, statement picks, and a more premium way to browse.
                                        </Heading>
                                        <Heading size="p" className="text-white/75">
                                            Inspired by modern fashion retail, but tailored to this storefront&apos;s own identity.
                                        </Heading>
                                    </div>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>

                <div className="mt-5 flex items-center justify-center gap-2">
                    {Banners.map((_, idx) => (
                        <span
                            key={idx}
                            aria-label={`Go to slide ${idx + 1}`}
                            className={cn(
                                "h-2 rounded-full transition-all duration-300",
                                current === idx
                                    ? "w-10 bg-primary"
                                    : "w-2 bg-primary/20"
                            )}
                        />
                    ))}
                </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                <div className="rounded-[2rem] border border-border/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(244,236,231,0.96))] p-6 shadow-sm">
                    <Heading size="small" className="text-primary/70">
                        This week&apos;s edit
                    </Heading>
                    <Heading size="h5" className="mt-3">
                        Premium styling cues without changing the shopping flow.
                    </Heading>
                    <Heading size="p" className="mt-3 leading-7">
                        Better product framing, stronger spacing, and a cleaner retail rhythm bring the app closer to a modern fashion storefront.
                    </Heading>
                </div>
                <div className="rounded-[2rem] border border-border/70 bg-primary p-6 text-primary-foreground shadow-[0_30px_70px_-50px_rgba(86,39,29,1)]">
                    <Heading size="small" className="text-primary-foreground/70">
                        Ready to browse
                    </Heading>
                    <Heading size="h5" className="mt-3 text-primary-foreground">
                        Explore the latest product drop and category highlights.
                    </Heading>
                    <Button asChild variant="secondary" className="mt-5 w-fit">
                        <Link to="/products">
                            View products
                            <ArrowRight className="size-4" />
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}

export default Slider;
