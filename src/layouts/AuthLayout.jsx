import React from "react";
import { Navigate, Outlet } from "react-router";
import { useAuth } from "@/providers/AuthProvider";

function AuthLayout() {
    const { loggedInUser } = useAuth();

    if (loggedInUser) {
        return <Navigate to="/" replace />;
    }

    return (
        <div className="min-h-dvh bg-[linear-gradient(180deg,rgba(255,255,255,0.65),rgba(244,236,231,0.95))] px-4 py-6 sm:px-6 lg:px-8">
            <div className="mx-auto flex min-h-[calc(100dvh-3rem)] w-full max-w-6xl items-center justify-center">
                <div className="grid w-full overflow-hidden rounded-[2rem] border border-border/70 bg-white/90 shadow-[0_35px_90px_-55px_rgba(63,29,22,0.55)] backdrop-blur xl:grid-cols-[1.05fr_0.95fr]">
                    <div className="hidden flex-col justify-between bg-[linear-gradient(135deg,rgba(95,48,35,0.96),rgba(170,88,61,0.92))] p-10 text-white xl:flex">
                        <div className="space-y-4">
                            <p className="text-sm font-medium uppercase tracking-[0.32em] text-white/70">
                                TRG Store
                            </p>
                            <h1 className="max-w-md text-5xl font-semibold leading-tight">
                                Premium fashion, beauty, and lifestyle picks in one modern storefront.
                            </h1>
                            <p className="max-w-md text-base leading-7 text-white/75">
                                A cleaner shopping experience curated under Tarun Raj Gaur&apos;s new retail identity.
                            </p>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                            <div className="rounded-[1.5rem] border border-white/15 bg-white/10 p-4">
                                <p className="text-2xl font-semibold">250+</p>
                                <p className="mt-2 text-sm text-white/70">
                                    curated labels
                                </p>
                            </div>
                            <div className="rounded-[1.5rem] border border-white/15 bg-white/10 p-4">
                                <p className="text-2xl font-semibold">18k</p>
                                <p className="mt-2 text-sm text-white/70">
                                    returning shoppers
                                </p>
                            </div>
                            <div className="rounded-[1.5rem] border border-white/15 bg-white/10 p-4">
                                <p className="text-2xl font-semibold">24h</p>
                                <p className="mt-2 text-sm text-white/70">
                                    support response
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center justify-center p-6 sm:p-8 lg:p-10">
                        <div className="w-full max-w-md">
                            <Outlet />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AuthLayout;
