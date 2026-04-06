import { PackageSearch } from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";
import { Link, useLoaderData, useParams } from "react-router";
import ProductCard from "@/components/common/ProductCard";
import ProductOptions from "@/components/common/ProductOptions";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/Headings";

function toTitleCase(str) {
    return str
        .replace(/-/g, " ")
        .split(" ")
        .map(
            (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        )
        .join(" ");
}

function Category() {
    const { allProducts } = useLoaderData();
    const { category } = useParams();

    const [search, setSearch] = useState("");

    useEffect(() => {
        document.title = `TRG Store - ${toTitleCase(category)}`;
    }, [category]);
    const [sortBy, setSortBy] = useState("default");
    const [stockFilters, setStockFilters] = useState([]);

    const toggleStock = (value) => {
        setStockFilters((prev) =>
            prev.includes(value)
                ? prev.filter((v) => v !== value)
                : [...prev, value]
        );
    };

    const clearFilters = () => {
        setSearch("");
        setSortBy("default");
        setStockFilters([]);
    };

    const hasFilters =
        search !== "" || sortBy !== "default" || stockFilters.length > 0;

    const displayedProducts = useMemo(() => {
        let result = [...allProducts];

        if (search.trim()) {
            const q = search.trim().toLowerCase();
            result = result.filter(
                (p) =>
                    p.title.toLowerCase().includes(q) ||
                    p.description.toLowerCase().includes(q)
            );
        }

        if (stockFilters.length > 0) {
            result = result.filter((p) =>
                stockFilters.includes(p.availabilityStatus)
            );
        }

        switch (sortBy) {
            case "price-asc":
                result.sort((a, b) => a.price - b.price);
                break;
            case "price-desc":
                result.sort((a, b) => b.price - a.price);
                break;
            case "rating-desc":
                result.sort((a, b) => b.rating - a.rating);
                break;
            case "reviews-desc":
                result.sort((a, b) => b.reviews.length - a.reviews.length);
                break;
            default:
                break;
        }

        return result;
    }, [allProducts, search, sortBy, stockFilters]);

    return (
        <div className="flex flex-col gap-8 lg:gap-10">
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
                                <Link
                                    to="/products/categories"
                                    className="text-muted-foreground transition-colors duration-300 hover:text-foreground"
                                >
                                    Categories
                                </Link>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbPage>{toTitleCase(category)}</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                    <div className="space-y-3">
                        <Heading size="small" className="text-primary/70">
                            Category view
                        </Heading>
                        <Heading size="h3">{toTitleCase(category)}</Heading>
                        <Heading size="p" className="leading-7">
                            A cleaner product grid with the same search, sort, and stock filtering logic underneath.
                        </Heading>
                    </div>
                </div>
            </div>

            <ProductOptions
                count={displayedProducts.length}
                search={search}
                setSearch={setSearch}
                sortBy={sortBy}
                setSortBy={setSortBy}
                stockFilters={stockFilters}
                toggleStock={toggleStock}
                hasFilters={hasFilters}
                clearFilters={clearFilters}
            />

            {displayedProducts.length === 0 ? (
                <div className="flex flex-col items-center justify-center gap-4 rounded-[2rem] border border-border/70 bg-white/90 px-6 py-20 text-center shadow-sm">
                    <PackageSearch className="size-16 text-muted-foreground" />
                    <div className="flex flex-col items-center gap-1">
                        <Heading size="h6" className="font-semibold">
                            No products found
                        </Heading>
                        <Heading size="p">
                            Try adjusting your search or filters.
                        </Heading>
                    </div>
                    <Button variant="outline" onClick={clearFilters}>
                        Clear Filters
                    </Button>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-x-6 gap-y-8 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                    {displayedProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default Category;
