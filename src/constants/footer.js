import { FaFacebook, FaGithub, FaInstagram, FaXTwitter } from "react-icons/fa6";

export const FooterData = {
    menus: [
        {
            title: "Explore",
            links: [
                {
                    label: "Home",
                    to: "/",
                },
                {
                    label: "Products",
                    to: "/products",
                },
                {
                    label: "About Us",
                    to: "/about",
                },
                {
                    label: "Contact",
                    to: "/contact",
                },
            ],
        },
        {
            title: "Customer Care",
            links: [
                {
                    label: "Wishlist",
                    to: "#",
                },
                {
                    label: "My Account",
                    to: "#",
                },
                {
                    label: "Order History",
                    to: "#",
                },
                {
                    label: "Returns & Exchanges",
                    to: "#",
                },
                {
                    label: "Shipping Information",
                    to: "#",
                },
                {
                    label: "Payment Methods",
                    to: "#",
                },
            ],
        },
        {
            title: "TRG Store HQ",
            links: [
                {
                    label: "hello@trgstore.com",
                    to: "mailto:hello@trgstore.com",
                },
                {
                    label: "+91 93890 43228",
                    to: "tel:+919389043228",
                },
                {
                    label: "Jaipur, Rajasthan",
                    to: "https://www.google.com/maps/place/Jaipur,+Rajasthan",
                },
            ],
        },
    ],
    socialMedia: [
        {
            icon: FaXTwitter,
            to: "#",
            label: "Twitter",
        },
        {
            icon: FaInstagram,
            to: "#",
            label: "Instagram",
        },
        {
            icon: FaFacebook,
            to: "#",
            label: "Facebook",
        },
        {
            icon: FaGithub,
            to: "#",
            label: "GitHub",
        },
    ],
};
