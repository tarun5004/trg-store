import { Heart } from "lucide-react";
import React, { useEffect } from "react";
import { Link } from "react-router";
import ProductCard from "@/components/common/ProductCard";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/Headings";
import { useProduct } from "@/providers/ProductProvider";

function Whishlist() {
    const { whishlist } = useProduct();

    useEffect(() => {
        document.title = "TRG Store - Wishlist";
    }, []);

    return (
        <div className="flex flex-col gap-8 lg:gap-10">
            <div className="rounded-[2.2rem] border border-border/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.97),rgba(246,239,234,0.95))] p-6 shadow-[0_22px_60px_-48px_rgba(63,29,22,0.45)] sm:p-8">
                <div className="space-y-3">
                    <Heading size="small" className="text-primary/70">
                        Saved for later
                    </Heading>
                    <Heading size="h3">Your wishlist edit</Heading>
                    <Heading size="p" className="leading-7">
                        Keep track of the products you&apos;ve shortlisted in the new TRG Store experience.
                    </Heading>
                    <Heading size="p">
                        <span className="font-bold text-foreground">
                            {whishlist.length}
                        </span>{" "}
                        {whishlist.length > 1 ? "items" : "item"} in your wishlist
                    </Heading>
                </div>
            </div>

            {whishlist.length === 0 ? (
                <div className="flex flex-col items-center justify-center gap-4 rounded-[2rem] border border-border/70 bg-white/90 px-6 py-24 text-center shadow-sm">
                    <Heart size={42} className="text-pink-400" />
                    <div className="flex flex-col gap-1 items-center">
                        <Heading size="h5" className="font-medium">
                            Your wishlist is empty
                        </Heading>
                        <Heading size="p">
                            Start saving the pieces you want to revisit later.
                        </Heading>
                    </div>
                    <Link to="/products">
                        <Button variant="default">Shop Now</Button>
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-x-6 gap-y-8 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                    {whishlist.map((product, idx) => (
                        <ProductCard key={idx} product={product} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default Whishlist;
