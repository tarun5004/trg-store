import { ShoppingBag } from "lucide-react";
import React from "react";
import { Link } from "react-router";
import { FooterData } from "@/constants/footer";
import { Heading } from "../ui/Headings";
import { Separator } from "../ui/separator";

function Footer() {
    return (
        <footer className="mt-6 w-full overflow-hidden rounded-[2.2rem] border border-border/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.97),rgba(246,239,234,0.95))] p-6 shadow-[0_25px_70px_-55px_rgba(63,29,22,0.45)] sm:p-8">
            <div className="grid gap-8 xl:grid-cols-[1.2fr_0.8fr_0.8fr_0.8fr]">
                <div className="space-y-5">
                    <Link to="/" className="inline-flex items-center gap-3">
                        <span className="flex size-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-[0_18px_35px_-22px_rgba(86,39,29,0.95)]">
                            <ShoppingBag className="stroke-[2.4]" />
                        </span>
                        <div className="space-y-1">
                            <Heading size="small" className="text-primary/70">
                                Tarun Raj Gaur
                            </Heading>
                            <Heading size="h5">TRG Store</Heading>
                        </div>
                    </Link>
                    <Heading size="p" className="leading-7">
                        A premium retail refresh built for fashion, beauty, and lifestyle shopping with the same dependable flow underneath.
                    </Heading>
                    <div className="flex items-center gap-3">
                        {FooterData.socialMedia.map(({ icon: Icon, to, label }) => (
                            <Link
                                to={to}
                                key={label}
                                className="flex size-11 items-center justify-center rounded-full border border-border/70 bg-white/90 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:text-primary"
                            >
                                <Icon size={18} />
                            </Link>
                        ))}
                    </div>
                </div>

                {FooterData.menus.map((menu, idx) => (
                    <div className="flex flex-col gap-4" key={idx}>
                        <Heading size="small" className="text-primary/70">
                            {menu.title}
                        </Heading>
                        {menu.links.map((site, linkIdx) => (
                            <Link key={linkIdx} to={site.to} className="w-fit">
                                <Heading
                                    size="p"
                                    className="text-base transition-colors duration-200 hover:text-foreground"
                                >
                                    {site.label}
                                </Heading>
                            </Link>
                        ))}
                    </div>
                ))}
            </div>

            <Separator className="my-8" />

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <Heading size="p" className="text-sm">
                    &copy; {new Date().getFullYear()} TRG Store. Crafted for Tarun Raj Gaur.
                </Heading>
                <Heading size="p" className="text-sm">
                    Premium retail styling, same trusted shopping experience.
                </Heading>
            </div>
        </footer>
    );
}

export default Footer;
