import React, { useEffect } from "react";
import { useLoaderData } from "react-router";
import Categories from "@/components/app/Categories";
import Hero from "@/components/app/Hero";
import ProductSection from "@/components/app/ProductSection";
import Slider from "@/components/app/Slider";
import Trust from "@/components/app/Trust";

function App() {
    const { categories, trending, newArrivals, bestSellers } = useLoaderData();

    useEffect(() => {
        document.title = "TRG Store - Home";
    }, []);

    return (
        <div className="flex flex-col gap-16 lg:gap-20">
            <div className="flex flex-col gap-8 lg:gap-10">
                <Hero />
                <Slider />
            </div>
            <Categories categories={categories} />
            <ProductSection products={trending} title="Trending Right Now" />
            <Trust />
            <Slider />
            <ProductSection products={newArrivals} title="Fresh New Arrivals" />
            <ProductSection products={bestSellers} title="Best Sellers" />
        </div>
    );
}

export default App;
