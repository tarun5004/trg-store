import React from "react";
import { Button } from "../ui/button";
import { Heading } from "../ui/Headings";

function ProductButton({ productCart, increaseQuantity, decreaseQuantity }) {
    return (
        <div className="flex flex-1 items-center justify-between rounded-full border border-border/80 bg-white/95 px-2 py-2 shadow-sm">
            <Button onClick={decreaseQuantity} variant="ghost" className="h-10 px-4">
                -1
            </Button>
            <Heading size="h6" className="px-4 text-center font-semibold">
                {productCart.quantity}
            </Heading>
            <Button onClick={increaseQuantity} variant="ghost" className="h-10 px-4">
                +1
            </Button>
        </div>
    );
}

export default ProductButton;
