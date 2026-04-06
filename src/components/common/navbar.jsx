import {
    Box,
    Equal,
    Heart,
    Loader2,
    LogOut,
    MapPinCheckInside,
    ShoppingBag,
    Trash2,
    User2,
} from "lucide-react";
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { Sitemap } from "@/constants/site-map";
import { cn } from "@/lib/utils";
import { useAuth } from "@/providers/AuthProvider";
import { useProduct } from "@/providers/ProductProvider";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Heading } from "../ui/Headings";
import { ImageComp } from "../ui/image";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "../ui/sheet";
import ProductButton from "./ProductButton";

function Navbar() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const { loggedInUser, signOut } = useAuth();
    const location = useLocation();
    const {
        carts,
        whishlist,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        cartSummary,
        findProductInCart,
        open,
        setOpen,
        clearCart,
    } = useProduct();

    const { totalItems, totalPrice, totalDiscount, totalPriceAfterDiscount } =
        cartSummary;

    return (
        <nav className="sticky top-3 z-40 flex w-full items-center gap-3 rounded-[2rem] border border-border/70 bg-white/88 p-3 shadow-[0_22px_60px_-48px_rgba(63,29,22,0.8)] backdrop-blur-lg lg:gap-5 lg:p-4">
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="outline" size="icon" className="lg:hidden">
                        <Equal size={22} />
                    </Button>
                </SheetTrigger>
                <SheetContent showCloseButton className="border-l border-border/70 bg-background/95">
                    <SheetHeader>
                        <SheetTitle asChild>
                            <div className="flex items-center gap-3">
                                <span className="flex size-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
                                    <ShoppingBag className="stroke-[2.4]" />
                                </span>
                                <div className="space-y-1">
                                    <Heading size="small" className="text-primary/70">
                                        Tarun Raj Gaur
                                    </Heading>
                                    <Heading size="h5">TRG Store</Heading>
                                </div>
                            </div>
                        </SheetTitle>
                        <SheetDescription asChild>
                            <Heading size="p">
                                Browse the main sections of the premium retail refresh.
                            </Heading>
                        </SheetDescription>
                    </SheetHeader>

                    <div className="mt-8 flex flex-col gap-3">
                        {Sitemap.map((item, idx) => (
                            <SheetClose asChild key={idx}>
                                <Link
                                    to={item.path}
                                    className={cn(
                                        "rounded-[1.4rem] border border-transparent px-4 py-3 transition-all duration-300",
                                        location.pathname === item.path
                                            ? "border-border/70 bg-muted/80"
                                            : "hover:border-border/70 hover:bg-muted/50"
                                    )}
                                >
                                    <Heading size="h6" className="font-medium">
                                        {item.name}
                                    </Heading>
                                </Link>
                            </SheetClose>
                        ))}
                    </div>
                </SheetContent>
            </Sheet>

            <Link to="/" className="flex min-w-0 flex-1 items-center gap-3">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-[0_18px_35px_-22px_rgba(86,39,29,0.95)]">
                    <ShoppingBag className="stroke-[2.4]" />
                </span>
                <div className="min-w-0">
                    <Heading size="small" className="text-primary/70">
                        Tarun Raj Gaur
                    </Heading>
                    <Heading size="h6" className="truncate">
                        TRG Store
                    </Heading>
                </div>
            </Link>

            <div className="hidden flex-1 items-center justify-center lg:flex">
                <div className="flex items-center gap-2 rounded-full border border-border/70 bg-muted/40 px-2 py-2">
                    {Sitemap.map((item, idx) => (
                        <Link
                            key={idx}
                            to={item.path}
                            className={cn(
                                "rounded-full px-4 py-2 text-sm font-semibold transition-all duration-300",
                                location.pathname === item.path
                                    ? "bg-white text-foreground shadow-sm"
                                    : "text-muted-foreground hover:text-foreground"
                            )}
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>
            </div>

            <div className="flex items-center justify-end gap-2">
                <Button
                    onClick={() => navigate("/my/whishlist")}
                    size="icon"
                    variant="outline"
                    className="relative"
                >
                    <Heart />
                    <span className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-pink-400 text-[11px] font-semibold text-white">
                        {whishlist.length}
                    </span>
                </Button>

                <Sheet open={open} onOpenChange={setOpen}>
                    <SheetTrigger asChild>
                        <Button size="icon" variant="outline" className="relative">
                            <ShoppingBag />
                            <span className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-primary text-[11px] font-semibold text-primary-foreground">
                                {carts.length}
                            </span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent
                        showCloseButton
                        className="flex w-full flex-col gap-4 border-l border-border/70 bg-background/98 p-0 sm:max-w-lg"
                    >
                        <SheetHeader className="border-b border-border/70 px-6 py-6">
                            <SheetTitle asChild>
                                <div className="flex items-center gap-3">
                                    <span className="flex size-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
                                        <ShoppingBag className="stroke-[2.4]" />
                                    </span>
                                    <div className="space-y-1">
                                        <Heading size="small" className="text-primary/70">
                                            Shopping bag
                                        </Heading>
                                        <Heading size="h5">Your Cart</Heading>
                                    </div>
                                </div>
                            </SheetTitle>
                            <SheetDescription asChild>
                                {carts.length > 0 ? (
                                    <Heading size="p">
                                        You have {totalItems} {totalItems > 1 ? "items" : "item"} ready for checkout.
                                    </Heading>
                                ) : (
                                    <Heading size="p">
                                        Your bag is empty. Start adding products you want to shop.
                                    </Heading>
                                )}
                            </SheetDescription>
                        </SheetHeader>

                        <ScrollArea className="min-h-0 flex-1">
                            {carts.length === 0 ? (
                                <div className="flex h-full flex-col items-center justify-center gap-4 px-6 py-16 text-center">
                                    <ShoppingBag size={42} className="text-primary/55" />
                                    <div className="space-y-2">
                                        <Heading size="h5" className="font-medium">
                                            Your cart is empty
                                        </Heading>
                                        <Heading size="p">
                                            Explore the latest TRG Store picks and add what you love.
                                        </Heading>
                                    </div>
                                    <Button
                                        variant="default"
                                        onClick={() => {
                                            navigate("/products");
                                            setOpen(false);
                                        }}
                                    >
                                        Shop now
                                    </Button>
                                </div>
                            ) : (
                                <div className="flex flex-col gap-4 px-6 py-5">
                                    {carts.map((item, idx) => {
                                        const productCart = findProductInCart(item);
                                        const discountPrice = (
                                            item.price -
                                            (item.price * item.discountPercentage) / 100
                                        ).toFixed(2);

                                        return (
                                            <div
                                                key={idx}
                                                className="rounded-[1.7rem] border border-border/70 bg-white/95 p-4 shadow-sm"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <ImageComp
                                                        src={item.images[0]}
                                                        alt={item.id}
                                                        className="h-20 w-20 rounded-[1.3rem] bg-muted object-contain p-2"
                                                    />
                                                    <div className="min-w-0 flex-1 space-y-2">
                                                        <Heading
                                                            size="p"
                                                            className="line-clamp-1 font-medium text-foreground"
                                                        >
                                                            {item.title}
                                                        </Heading>
                                                        <div className="flex flex-wrap items-center gap-2">
                                                            <Heading
                                                                size="p"
                                                                className="font-semibold text-primary"
                                                            >
                                                                $
                                                                {(
                                                                    discountPrice *
                                                                    item.quantity
                                                                ).toFixed(2)}
                                                            </Heading>
                                                            <Heading
                                                                size="p"
                                                                className="line-through text-sm"
                                                            >
                                                                $
                                                                {(
                                                                    item.price *
                                                                    item.quantity
                                                                ).toFixed(2)}
                                                            </Heading>
                                                            <Badge variant="warning">
                                                                -{item.discountPercentage}%
                                                            </Badge>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="mt-4 flex items-center gap-2">
                                                    <ProductButton
                                                        productCart={productCart}
                                                        increaseQuantity={() =>
                                                            increaseQuantity(item)
                                                        }
                                                        decreaseQuantity={() =>
                                                            decreaseQuantity(item)
                                                        }
                                                    />
                                                    <Button
                                                        onClick={() =>
                                                            removeFromCart(productCart)
                                                        }
                                                        variant="destructive"
                                                        size="icon"
                                                    >
                                                        <Trash2 />
                                                    </Button>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </ScrollArea>

                        <Separator />

                        <SheetFooter className="gap-4 px-6 pb-6">
                            <div className="w-full rounded-[1.7rem] border border-border/70 bg-white/95 p-5 shadow-sm">
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <Heading size="p">
                                            Subtotal ({totalItems} {totalItems > 1 ? "items" : "item"})
                                        </Heading>
                                        <Heading size="p">${totalPrice}</Heading>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <Heading size="p">Discount</Heading>
                                        <Heading size="p" className="text-green-600">
                                            - ${totalDiscount}
                                        </Heading>
                                    </div>
                                    <Separator />
                                    <div className="flex items-center justify-between">
                                        <Heading size="h6" className="font-semibold">
                                            Total
                                        </Heading>
                                        <Heading size="h6" className="font-semibold text-primary">
                                            ${totalPriceAfterDiscount}
                                        </Heading>
                                    </div>
                                </div>
                            </div>
                            <Button
                                disabled={carts.length === 0}
                                onClick={() => {
                                    clearCart();
                                    setOpen(false);
                                }}
                                variant="default"
                                className="w-full"
                            >
                                Proceed to Checkout
                            </Button>
                        </SheetFooter>
                    </SheetContent>
                </Sheet>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button size="none" variant="none">
                            <span className="flex size-12 items-center justify-center rounded-full bg-primary text-base font-semibold text-primary-foreground shadow-[0_18px_35px_-22px_rgba(86,39,29,0.95)]">
                                {loggedInUser.fullName[0].toUpperCase()}
                            </span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                        <DropdownMenuLabel className="space-y-1">
                            <p className="text-sm font-semibold text-foreground">
                                {loggedInUser.fullName}
                            </p>
                            <p className="text-xs font-normal text-muted-foreground">
                                {loggedInUser.email}
                            </p>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem onClick={() => navigate("/my/profile")}>
                                <User2 /> Profile
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => navigate("/my/profile")}>
                                <Box /> Orders
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => navigate("/my/profile")}>
                                <MapPinCheckInside /> Addresses
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            onClick={() => {
                                setLoading(true);
                                setTimeout(() => {
                                    signOut();
                                    setLoading(false);
                                }, 1000);
                            }}
                        >
                            {loading ? (
                                <Loader2 className="animate-spin" />
                            ) : (
                                <>
                                    <LogOut /> Sign Out
                                </>
                            )}
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </nav>
    );
}

export default Navbar;
