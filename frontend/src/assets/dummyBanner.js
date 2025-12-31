import iconYoutube from "../assets/icon-youtube.png";
import iconChatgpt from "../assets/icon-chatgpt.png";
import iconSeo from "../assets/icon-seo.png";
import iconPhotoshop from "../assets/icon-photoshop.png";

export const floatingIcons = [
    {
        src: iconYoutube,
        alt: "Youtube",
        pos: "top-24 left-4 md:left-8 lg:left-12 md:top-28 lg:top-32",
    },
    {
        src: iconChatgpt,
        alt: "ChatGPT",
        pos: "top-32 right-4 md:right-8 lg:right-12 md:top-36 lg:top-40",
    },
    {
        src: iconSeo,
        alt: "SEO",
        pos: "bottom-24 left-4 md:left-8 lg:left-12",
    },
    {
        src: iconPhotoshop,
        alt: "Photoshop",
        pos: "bottom-12 right-4 md:right-8 lg:right-12",
    },
];


export const features = [
    { text: "Easy to Use", color: "green" },
    { text: "Fast & Secure", color: "blue" },
    { text: "24/7 Support", color: "purple" },
    { text: "Free Updates", color: "yellow" },
];


export default { floatingIcons, features };