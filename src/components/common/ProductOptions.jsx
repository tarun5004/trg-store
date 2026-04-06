import { ArrowDownUp, Search, SlidersHorizontal, X } from "lucide-react";
import React from "react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Heading } from "@/components/ui/Headings";
import { SORT_OPTIONS, STOCK_OPTIONS } from "@/constants/product-options";
import { cn } from "@/lib/utils";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from "../ui/input-group";

function ProductOptions({
    count,
    search,
    setSearch,
    sortBy,
    setSortBy,
    stockFilters,
    toggleStock,
    hasFilters,
    clearFilters,
}) {
    return (
        <div className="rounded-[2rem] border border-border/70 bg-white/90 p-4 shadow-sm sm:p-5">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div className="space-y-2">
                    <Heading size="small" className="text-primary/70">
                        Catalog controls
                    </Heading>
                    <Heading size="h6" className="font-semibold">
                        {count} {count === 1 ? "Product" : "Products"} available
                    </Heading>
                </div>

                <div className="flex w-full flex-col gap-3 lg:w-auto lg:min-w-[58%] lg:flex-row">
                    <div className="flex w-full items-center gap-2">
                        <InputGroup className="h-13 rounded-full border-border/70 bg-background/80 shadow-sm">
                            <InputGroupAddon className="pl-5">
                                <Search />
                            </InputGroupAddon>
                            <InputGroupInput
                                className="min-w-0 text-base placeholder:text-muted-foreground/80 lg:min-w-md"
                                placeholder="Search products, styles, or descriptions"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </InputGroup>

                        {hasFilters && (
                            <Button variant="outline" size="icon" onClick={clearFilters}>
                                <X />
                            </Button>
                        )}
                    </div>

                    <div className="flex items-center gap-2">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" className="flex-1">
                                    <ArrowDownUp />
                                    Sort
                                    {sortBy !== "default" && (
                                        <span className="size-2 rounded-full bg-primary" />
                                    )}
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Sort By</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuRadioGroup
                                    value={sortBy}
                                    onValueChange={setSortBy}
                                >
                                    {SORT_OPTIONS.map((opt) => (
                                        <DropdownMenuRadioItem
                                            key={opt.value}
                                            value={opt.value}
                                            className={cn(
                                                opt.value === sortBy &&
                                                    "font-medium text-foreground"
                                            )}
                                        >
                                            {opt.label}
                                        </DropdownMenuRadioItem>
                                    ))}
                                </DropdownMenuRadioGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" className="flex-1">
                                    <SlidersHorizontal />
                                    Stock
                                    {stockFilters.length > 0 && (
                                        <span className="flex size-6 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                                            {stockFilters.length}
                                        </span>
                                    )}
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Availability</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                {STOCK_OPTIONS.map((opt) => (
                                    <DropdownMenuCheckboxItem
                                        key={opt.value}
                                        checked={stockFilters.includes(opt.value)}
                                        onCheckedChange={() => toggleStock(opt.value)}
                                        className={cn(
                                            stockFilters.includes(opt.value) &&
                                                "font-medium text-foreground"
                                        )}
                                    >
                                        {opt.label}
                                    </DropdownMenuCheckboxItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductOptions;
