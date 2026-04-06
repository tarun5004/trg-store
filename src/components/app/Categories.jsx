import Autoplay from "embla-carousel-autoplay";
import React, { useMemo } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router";
import CategoriesData from "@/constants/categories";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import { Heading } from "../ui/Headings";

const categoryMeta = Object.fromEntries(
    CategoriesData.map((c) => [c.slug, { icon: c.icon, color: c.color }])
);

function Categories({ categories = [] }) {
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

    return (
        <section className="rounded-[2.2rem] border border-border/70 bg-white/85 p-6 shadow-[0_25px_70px_-55px_rgba(63,29,22,0.4)] sm:p-8">
            <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                <div className="space-y-3">
                    <Heading size="small" className="text-primary/70">
                        Category spotlight
                    </Heading>
                    <Heading size="h3">Shop the store by mood, need, or category.</Heading>
                    <Heading size="p" className="leading-7">
                        Cleaner category surfaces make discovery feel more intentional and fashion-led.
                    </Heading>
                </div>
                <Link
                    to="/categories"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition-transform duration-300 hover:translate-x-1"
                >
                    View all categories
                    <ArrowRight className="size-4" />
                </Link>
            </div>

            <Carousel
                plugins={[autoplayPlugin]}
                opts={{
                    loop: true,
                    align: "start",
                }}
            >
                <CarouselContent>
                    {categories.map((category) => {
                        const meta = categoryMeta[category.slug];
                        if (!meta) return null;
                        const Icon = meta.icon;

                        return (
                            <CarouselItem
                                key={category.slug}
                                className="basis-1/2 sm:basis-1/3 md:basis-1/4 xl:basis-1/5"
                            >
                                <Link
                                    to={`/products/category/${category.slug}`}
                                    className="group flex h-full min-h-52 flex-col justify-between rounded-[1.7rem] border border-border/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(248,243,239,0.96))] p-5 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg"
                                >
                                    <span
                                        className="flex size-16 items-center justify-center rounded-3xl transition-transform duration-300 group-hover:scale-105"
                                        style={{ backgroundColor: `${meta.color}12` }}
                                    >
                                        <Icon size={30} color={meta.color} />
                                    </span>
                                    <div className="space-y-3">
                                        <Heading size="h6" className="line-clamp-2">
                                            {category.name}
                                        </Heading>
                                        <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary">
                                            Explore
                                            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                                        </span>
                                    </div>
                                </Link>
                            </CarouselItem>
                        );
                    })}
                </CarouselContent>
            </Carousel>
        </section>
    );
}

export default Categories;
