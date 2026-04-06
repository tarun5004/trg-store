import { Heart, Star } from "lucide-react";
import React from "react";
import { Link } from "react-router";
import { cn } from "@/lib/utils";
import { useProduct } from "@/providers/ProductProvider";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Heading } from "../ui/Headings";
import { ImageComp } from "../ui/image";
import ProductButton from "./ProductButton";

function ProductCard({ product }) {
    const {
        id,
        title,
        images,
        price,
        discountPercentage,
        rating,
        description,
        availabilityStatus,
        category,
        reviews,
    } = product;

    const discountPrice = (price - (price * discountPercentage) / 100).toFixed(2);

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

    return (
        <div className="group flex h-full select-none flex-col rounded-[2rem] border border-border/70 bg-white/92 p-3 shadow-[0_25px_60px_-55px_rgba(63,29,22,0.7)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_38px_80px_-55px_rgba(63,29,22,0.45)]">
            <Link to={`/products/${id}`} className="flex flex-1 flex-col gap-4">
                <div className="relative overflow-hidden rounded-[1.6rem] bg-[linear-gradient(180deg,rgba(249,245,241,1),rgba(240,232,226,1))]">
                    <ImageComp
                        src={
                            images[0] ??
                            "https://images.unsplash.com/photo-1615397349754-cfa2066a298e"
                        }
                        alt={id}
                        className="aspect-[4/4.3] h-full w-full object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-x-0 top-0 flex items-start justify-between gap-2 p-4">
                        <Badge variant="outline" className="border-white/70 bg-white/85">
                            {category
                                .split(" ")
                                .map(
                                    (word) =>
                                        word.charAt(0).toUpperCase() + word.slice(1)
                                )
                                .join(" ")}
                        </Badge>
                        <Badge
                            variant={
                                availabilityStatus === "In Stock"
                                    ? "success"
                                    : availabilityStatus === "Out of Stock"
                                      ? "destructive"
                                      : "warning"
                            }
                            className="border-white/70 bg-white/90"
                        >
                            {availabilityStatus}
                        </Badge>
                    </div>
                    {availabilityStatus === "Low Stock" && (
                        <Badge
                            variant="warning"
                            className="absolute bottom-4 left-4 border-white/70 bg-white/95"
                        >
                            Few pieces left
                        </Badge>
                    )}
                </div>

                <div className="flex flex-1 flex-col gap-4 px-1 pb-1">
                    <div className="flex items-center justify-between gap-3">
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
                        <Heading size="p" className="text-sm">
                            {reviews.length} reviews
                        </Heading>
                    </div>

                    <div className="space-y-2">
                        <Heading className="line-clamp-1 font-semibold" size="h6">
                            {title}
                        </Heading>
                        <Heading className="line-clamp-2 leading-7" size="p">
                            {description}
                        </Heading>
                    </div>

                    <div className="flex flex-wrap items-end gap-3">
                        <Heading size="h5" className="font-semibold text-primary">
                            ${discountPrice}
                        </Heading>
                        <Heading
                            size="p"
                            className="text-sm line-through text-muted-foreground"
                        >
                            ${price}
                        </Heading>
                        <Badge variant="warning">-{discountPercentage}%</Badge>
                    </div>
                </div>
            </Link>

            <div className="mt-4 flex items-center gap-2 border-t border-border/60 pt-4">
                {availabilityStatus === "Out of Stock" ? (
                    <Badge
                        variant="destructive"
                        className="flex-1 rounded-full py-3 text-center"
                    >
                        Currently unavailable
                    </Badge>
                ) : (
                    <>
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
                                    increaseQuantity={() => increaseQuantity(product)}
                                    decreaseQuantity={() => decreaseQuantity(product)}
                                />
                                <Button variant="default" onClick={() => setOpen(true)}>
                                    Go to Cart
                                </Button>
                            </>
                        )}
                    </>
                )}
                <Button
                    onClick={() => toggleWhishlist(product)}
                    variant="whishlist"
                    className={cn(whishlistProduct && "border-pink-500")}
                    size="icon"
                >
                    <Heart
                        className={cn(
                            whishlistProduct && "fill-pink-400 stroke-pink-500",
                            "group-hover/btn fill-transparent stroke-current transition-colors duration-300 group-hover/btn:fill-pink-400 group-hover/btn:stroke-pink-500"
                        )}
                    />
                </Button>
            </div>
        </div>
    );
}

export default ProductCard;
