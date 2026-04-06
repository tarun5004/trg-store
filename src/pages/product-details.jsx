import Autoplay from "embla-carousel-autoplay";
import { Heart, Star } from "lucide-react";
import React, { useEffect, useMemo } from "react";
import { Link, useLoaderData } from "react-router";
import ProductSection from "@/components/app/ProductSection";
import Trust from "@/components/app/Trust";
import ProductButton from "@/components/common/ProductButton";
import { Badge } from "@/components/ui/badge";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel";
import { Heading } from "@/components/ui/Headings";
import { ImageComp } from "@/components/ui/image";
import { Separator } from "@/components/ui/separator";
import { ProductDetailInfo } from "@/constants/product-detail";
import { cn } from "@/lib/utils";
import { useProduct } from "@/providers/ProductProvider";

function ProductDetails() {
    const { product, limitedProducts } = useLoaderData();

    const {
        title,
        price,
        discountPercentage,
        rating,
        description,
        availabilityStatus,
        category,
        reviews,
        tags,
        images,
        stock,
    } = product;

    useEffect(() => {
        document.title = `TRG Store - ${title}`;
    }, [title]);

    const {
        addToCart,
        findProductInWhishlist,
        findProductInCart,
        increaseQuantity,
        decreaseQuantity,
        toggleWhishlist,
        setOpen,
    } = useProduct();
    const whishlistProduct = findProductInWhishlist(product);
    const productCart = findProductInCart(product);

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

    const discountPrice = (price - (price * discountPercentage) / 100).toFixed(2);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);

    return (
        <div className="flex flex-col gap-10 lg:gap-14">
            <div className="rounded-[2.2rem] border border-border/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.97),rgba(246,239,234,0.95))] p-6 shadow-[0_22px_60px_-48px_rgba(63,29,22,0.45)] sm:p-8">
                <div className="flex flex-col gap-4">
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <Link
                                    to="/"
                                    className="text-muted-foreground transition-colors duration-300 hover:text-foreground"
                                >
                                    Home
                                </Link>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <Link
                                    to="/products"
                                    className="text-muted-foreground transition-colors duration-300 hover:text-foreground"
                                >
                                    Products
                                </Link>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbPage>{title}</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                    <div className="space-y-3">
                        <Heading size="small" className="text-primary/70">
                            Product spotlight
                        </Heading>
                        <Heading size="h3">{title}</Heading>
                        <Heading size="p" className="leading-7">
                            A cleaner detail page layout with the same pricing, cart, wishlist, and recommendation logic.
                        </Heading>
                    </div>
                </div>
            </div>

            <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
                <div className="space-y-4">
                    <div className="hidden flex-col gap-4 lg:flex">
                        {images.map((image, idx) => (
                            <div
                                key={idx}
                                className="overflow-hidden rounded-[2rem] border border-border/70 bg-white/92 p-4 shadow-sm"
                            >
                                <ImageComp
                                    src={image}
                                    alt={`Product Image ${idx + 1}`}
                                    className="w-full aspect-[4/4.2] object-contain rounded-[1.5rem] bg-[linear-gradient(180deg,rgba(249,245,241,1),rgba(240,232,226,1))] p-4"
                                />
                            </div>
                        ))}
                    </div>

                    <div className="lg:hidden">
                        <Carousel
                            plugins={[autoplayPlugin]}
                            opts={{
                                loop: true,
                                align: "start",
                            }}
                        >
                            <CarouselContent>
                                {images.map((image, idx) => (
                                    <CarouselItem key={idx} className="w-full">
                                        <div className="overflow-hidden rounded-[2rem] border border-border/70 bg-white/92 p-4 shadow-sm">
                                            <ImageComp
                                                src={image}
                                                alt={`Product Image ${idx + 1}`}
                                                className="w-full aspect-[4/4.2] rounded-[1.5rem] bg-[linear-gradient(180deg,rgba(249,245,241,1),rgba(240,232,226,1))] object-contain p-4"
                                            />
                                        </div>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                        </Carousel>
                    </div>
                </div>

                <div
                    className={cn(
                        "space-y-8",
                        (images.length === 1 || images.length > 2) &&
                            "lg:sticky lg:top-28 lg:self-start"
                    )}
                >
                    <div className="rounded-[2rem] border border-border/70 bg-white/92 p-6 shadow-sm sm:p-8">
                        <div className="space-y-6">
                            <div className="flex flex-wrap items-center gap-3">
                                <Badge variant="outline" className="h-11 px-5">
                                    {category
                                        .split(" ")
                                        .map(
                                            (word) =>
                                                word.charAt(0).toUpperCase() +
                                                word.slice(1)
                                        )
                                        .join(" ")}
                                </Badge>
                                <Badge
                                    variant={
                                        availabilityStatus === "In Stock"
                                            ? "success"
                                            : availabilityStatus ===
                                                "Out of Stock"
                                              ? "destructive"
                                              : "warning"
                                    }
                                    className="h-11 px-5"
                                >
                                    {availabilityStatus}
                                </Badge>
                            </div>

                            <div className="space-y-3">
                                <Heading size="h3">{title}</Heading>
                                <Heading size="p" className="leading-7">
                                    {description}
                                </Heading>
                            </div>

                            <div className="flex items-center gap-2">
                                <div className="flex items-center gap-1 rounded-full bg-muted/60 px-3 py-1.5">
                                    {Array.from({ length: 5 }).map((_, idx) => (
                                        <Star
                                            key={idx}
                                            className={cn(
                                                "size-4",
                                                rating > idx
                                                    ? "fill-yellow-500 stroke-yellow-500"
                                                    : "fill-muted stroke-muted-foreground/30"
                                            )}
                                        />
                                    ))}
                                </div>
                                <Heading size="p">
                                    {Math.floor(rating * 10) / 10} rating from {reviews.length} reviews
                                </Heading>
                            </div>

                            <div className="flex flex-wrap items-end gap-3">
                                <Heading size="h3" className="font-semibold text-primary">
                                    ${discountPrice}
                                </Heading>
                                <Heading
                                    size="h6"
                                    className="line-through text-muted-foreground"
                                >
                                    ${price}
                                </Heading>
                                <Badge variant="warning">-{discountPercentage}%</Badge>
                            </div>

                            <div className="flex flex-wrap items-center gap-3">
                                <Heading size="p">
                                    <span className="font-semibold text-foreground">
                                        {stock}
                                    </span>{" "}
                                    units available
                                </Heading>
                                {tags.map((tag, idx) => (
                                    <Badge
                                        key={idx}
                                        variant="secondary"
                                        className="h-10 px-4"
                                    >
                                        {tag
                                            .split(" ")
                                            .map(
                                                (word) =>
                                                    word.charAt(0).toUpperCase() +
                                                    word.slice(1)
                                            )
                                            .join(" ")}
                                    </Badge>
                                ))}
                            </div>

                            <div className="flex items-center gap-2">
                                {!productCart ? (
                                    <>
                                        <Button
                                            variant="outline"
                                            className="flex-1"
                                            onClick={() => addToCart(product)}
                                        >
                                            Add to Cart
                                        </Button>
                                        <Button variant="default" className="flex-1">
                                            Buy Now
                                        </Button>
                                    </>
                                ) : (
                                    <>
                                        <ProductButton
                                            productCart={productCart}
                                            increaseQuantity={() =>
                                                increaseQuantity(product)
                                            }
                                            decreaseQuantity={() =>
                                                decreaseQuantity(product)
                                            }
                                        />
                                        <Button
                                            variant="default"
                                            onClick={() => setOpen(true)}
                                        >
                                            Go to Cart
                                        </Button>
                                    </>
                                )}
                                <Button
                                    onClick={() => toggleWhishlist(product)}
                                    variant="whishlist"
                                    className={cn(
                                        whishlistProduct && "border-pink-500"
                                    )}
                                    size="icon"
                                >
                                    <Heart
                                        className={cn(
                                            whishlistProduct &&
                                                "fill-pink-400 stroke-pink-500",
                                            "fill-transparent stroke-current transition-colors duration-300 hover:fill-pink-400 hover:stroke-pink-500"
                                        )}
                                    />
                                </Button>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-[2rem] border border-border/70 bg-white/92 p-6 shadow-sm sm:p-8">
                        <Heading size="h5" className="font-semibold">
                            Additional Information
                        </Heading>

                        <div className="mt-5 grid grid-cols-1 gap-4">
                            {ProductDetailInfo(product).map((info, idx) => (
                                <div
                                    key={idx}
                                    className="flex items-center gap-4 rounded-[1.5rem] border border-border/70 bg-background/70 p-4"
                                >
                                    <span className="rounded-2xl bg-muted p-3">
                                        <info.icon />
                                    </span>
                                    <Heading
                                        size="p"
                                        className="w-full line-clamp-2 text-foreground"
                                    >
                                        {info.label} - <b>{info.value}</b>
                                    </Heading>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <Separator />

            <div className="flex flex-col gap-10">
                <Trust isTitleHidden />
                <div className="space-y-6">
                    <div className="space-y-3">
                        <Heading size="small" className="text-primary/70">
                            Customer feedback
                        </Heading>
                        <Heading size="h3">What shoppers are saying</Heading>
                    </div>
                    <Carousel
                        plugins={[autoplayPlugin]}
                        opts={{
                            loop: true,
                            align: "start",
                        }}
                    >
                        <CarouselContent>
                            {reviews.map((review, idx) => (
                                <CarouselItem
                                    className="basis-full md:basis-1/2 xl:basis-1/3"
                                    key={idx}
                                >
                                    <div className="flex h-full flex-col gap-4 rounded-[1.8rem] border border-border/70 bg-white/92 p-6 shadow-sm">
                                        <div className="flex items-center justify-between">
                                            <Heading size="p">
                                                {new Date(review.date).toLocaleDateString()}
                                            </Heading>
                                            <div className="flex items-center gap-1">
                                                {Array.from({ length: 5 }).map(
                                                    (_, starIdx) => (
                                                        <Star
                                                            key={starIdx}
                                                            className={cn(
                                                                "size-4",
                                                                review.rating >
                                                                    starIdx
                                                                    ? "fill-yellow-500 stroke-yellow-500"
                                                                    : "fill-muted stroke-muted-foreground/30"
                                                            )}
                                                        />
                                                    )
                                                )}
                                            </div>
                                        </div>
                                        <div className="space-y-1">
                                            <Heading size="h5" className="font-medium">
                                                {review.reviewerName}
                                            </Heading>
                                            <Heading size="p">
                                                {review.reviewerEmail}
                                            </Heading>
                                        </div>
                                        <Heading size="p" className="leading-7 text-foreground">
                                            {review.comment}
                                        </Heading>
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                    </Carousel>
                </div>
            </div>

            <Separator />

            <ProductSection
                products={limitedProducts}
                title="You Might Also Like"
            />
        </div>
    );
}

export default ProductDetails;
