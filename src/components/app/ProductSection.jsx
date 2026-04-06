import Autoplay from "embla-carousel-autoplay";
import React, { useMemo } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router";
import ProductCard from "../common/ProductCard";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "../ui/carousel";
import { Heading } from "../ui/Headings";

const sectionDescriptions = {
    "Trending Right Now":
        "The most clicked and saved picks across the storefront.",
    "Fresh New Arrivals":
        "Recently added products presented with a cleaner, editorial layout.",
    "Best Sellers":
        "Reliable favourites that still deserve premium presentation.",
    "You Might Also Like":
        "Complementary recommendations with the same catalog logic underneath.",
};

function ProductSection({
    products = [],
    title,
    carouselBtns = false,
    autoplay = true,
}) {
    const autoplayPlugin = useMemo(
        () =>
            Autoplay({
                delay: 3000,
                stopOnInteraction: false,
                stopOnFocusIn: true,
                stopOnMouseEnter: true,
            }),
        []
    );

    return (
        <section className="space-y-7">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                <div className="space-y-3">
                    <Heading size="small" className="text-primary/70">
                        Curated product rail
                    </Heading>
                    <Heading size="h3">{title}</Heading>
                    <Heading size="p" className="leading-7">
                        {sectionDescriptions[title] ||
                            "A polished retail-style section built on the existing product feed."}
                    </Heading>
                </div>
                <Link
                    to="/products"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition-transform duration-300 hover:translate-x-1"
                >
                    Browse all products
                    <ArrowRight className="size-4" />
                </Link>
            </div>

            <Carousel
                plugins={autoplay ? [autoplayPlugin] : []}
                opts={{
                    loop: true,
                    align: "start",
                }}
            >
                <CarouselContent>
                    {products.map((product) => (
                        <CarouselItem
                            key={product.id}
                            className="basis-full pt-3 md:basis-1/2 xl:basis-1/3 2xl:basis-1/4"
                        >
                            <ProductCard product={product} />
                        </CarouselItem>
                    ))}
                </CarouselContent>
                {carouselBtns && (
                    <>
                        <CarouselPrevious />
                        <CarouselNext />
                    </>
                )}
            </Carousel>
        </section>
    );
}

export default ProductSection;
