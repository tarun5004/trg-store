import React, { useEffect } from "react";
import { Link, useLoaderData } from "react-router";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Heading } from "@/components/ui/Headings";
import CategoriesData from "@/constants/categories";

const categoryMeta = Object.fromEntries(
    CategoriesData.map((c) => [c.slug, { icon: c.icon, color: c.color }])
);

function Categories() {
    const { categories } = useLoaderData();

    useEffect(() => {
        document.title = "TRG Store - Categories";
    }, []);

    return (
        <div className="flex flex-col gap-8 pb-10 lg:gap-10">
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
                                <BreadcrumbPage>Categories</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                    <div className="space-y-3">
                        <Heading size="small" className="text-primary/70">
                            Category index
                        </Heading>
                        <Heading size="h3">Explore the catalog by category.</Heading>
                        <Heading size="p" className="leading-7">
                            Clean category cards give the storefront a more editorial retail feel without changing navigation behavior.
                        </Heading>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
                {categories.map((category) => {
                    const meta = categoryMeta[category.slug];
                    if (!meta) return null;
                    const Icon = meta.icon;

                    return (
                        <Link
                            key={category.slug}
                            to={`/products/category/${category.slug}`}
                            className="group flex min-h-56 flex-col justify-between rounded-[1.8rem] border border-border/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(248,243,239,0.96))] p-5 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg"
                        >
                            <span
                                className="flex size-16 items-center justify-center rounded-3xl transition-transform duration-300 group-hover:scale-105"
                                style={{ backgroundColor: `${meta.color}15` }}
                            >
                                <Icon size={30} color={meta.color} />
                            </span>
                            <div className="space-y-3">
                                <Heading
                                    size="h6"
                                    className="line-clamp-2 text-balance"
                                >
                                    {category.name}
                                </Heading>
                                <p className="text-sm font-semibold text-primary">
                                    Explore now
                                </p>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}

export default Categories;
