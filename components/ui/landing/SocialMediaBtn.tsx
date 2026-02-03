import { Facebook,  Github,  Linkedin, Youtube } from "lucide-react"
import { title } from "process"

const SocialMediaBtn = () => {
    const socialLinks = [
        {
            title: "YouTube",
            href: "https://www.youtube.com",
            icon: <Youtube className="w-5 w-5" />
        },
        {
            title: "Facebook",
            href: "https://www.facebook.com",
            icon: <Facebook className="w-5 w-5" />
        },
        {
            title: "Github",
            href: "https://www.github.com",
            icon: <Github className="w-5 w-5" />
        },
        {
            title: "LinkedIn",
            href: "https://www.linkedin.com",
            icon: <Linkedin className="w-5 w-5" />
        },
        ]


    return (
        <div className="flex items-center gap-3.5 text-zinc-400">
            {socialLinks.map((link) => (
                <a  
                key={link.title}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 border rounded-full hover:text-white hover:border-shop_dark_green hoverEffect"
                >
                    {link.icon}
                </a>
            ))}
        </div>
    );
}
export default SocialMediaBtn;