import { ShieldCheck, Tag, Zap } from "lucide-react";

export const trustItems = [
    {
        icon: <Zap className="fill-yellow-500 text-yellow-500" size={32} />,
        title: "Express Dispatch",
        description: "Fast-moving picks shipped with priority",
    },
    {
        icon: <ShieldCheck className="text-green-500" size={32} />,
        title: "Secure Checkout",
        description: "Protected payments from cart to confirmation",
    },
    {
        icon: <Tag className="text-blue-500" size={32} />,
        title: "Fashion-First Value",
        description: "Sharp prices on premium everyday essentials",
    },
];
