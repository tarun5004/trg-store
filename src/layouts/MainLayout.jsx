import React, { useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router";
import Footer from "@/components/common/footer";
import Navbar from "@/components/common/navbar";
import { useAuth } from "@/providers/AuthProvider";

function MainLayout() {
    const { loggedInUser } = useAuth();
    const location = useLocation();

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "instant" });
    }, [location.pathname]);

    if (!loggedInUser) {
        return (
            <Navigate to="/auth/sign-in" replace state={{ from: location }} />
        );
    }

    return (
        <div className="min-h-screen w-full">
            <div className="mx-auto flex min-h-screen w-[min(94%,1380px)] flex-col gap-8 py-4 lg:py-6">
                <Navbar />
                <div className="flex-1 w-full pb-8">
                    <Outlet />
                </div>
                <Footer />
            </div>
        </div>
    );
}

export default MainLayout;
