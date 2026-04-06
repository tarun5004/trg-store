import React from "react";
import { AlertTriangle, Home, RefreshCcw } from "lucide-react";
import {
    isRouteErrorResponse,
    Link,
    useLocation,
    useNavigate,
    useRouteError,
} from "react-router";
import { Button } from "../ui/button";
import { Heading } from "../ui/Headings";

function RouteError() {
    const error = useRouteError();
    const navigate = useNavigate();
    const location = useLocation();

    const errorTitle = isRouteErrorResponse(error)
        ? `${error.status} ${error.statusText}`
        : "Something went wrong";

    const errorMessage = isRouteErrorResponse(error)
        ? error.data?.message || "We could not load this page right now."
        : error instanceof Error
          ? error.message
          : "We could not load this page right now.";

    return (
        <div className="flex min-h-[70vh] items-center justify-center py-10">
            <div className="w-full max-w-2xl rounded-[2.2rem] border border-border/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.97),rgba(246,239,234,0.95))] p-8 text-center shadow-[0_22px_60px_-48px_rgba(63,29,22,0.45)] sm:p-10">
                <div className="mx-auto mb-5 flex size-16 items-center justify-center rounded-full bg-destructive/10 text-destructive">
                    <AlertTriangle className="size-8" />
                </div>
                <Heading size="small" className="text-primary/70">
                    TRG Store
                </Heading>
                <Heading size="h3" className="mt-3">
                    {errorTitle}
                </Heading>
                <Heading size="p" className="mx-auto mt-4 max-w-xl leading-7">
                    {errorMessage}
                </Heading>
                <Heading size="p" className="mx-auto mt-2 max-w-xl">
                    Page: {location.pathname}
                </Heading>

                <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                    <Button onClick={() => navigate(0)}>
                        <RefreshCcw className="size-4" />
                        Try Again
                    </Button>
                    <Button asChild variant="outline">
                        <Link to="/">
                            <Home className="size-4" />
                            Go Home
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default RouteError;
