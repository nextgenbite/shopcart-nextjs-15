import { Facebook, Github, Linkedin, Youtube } from "lucide-react";
import { title } from "process";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { cn } from "@/lib/utils";

const socialLinks = [
  {
    title: "YouTube",
    href: "https://www.youtube.com",
    icon: <Youtube className="w-5 w-5" />,
  },
  {
    title: "Facebook",
    href: "https://www.facebook.com",
    icon: <Facebook className="w-5 w-5" />,
  },
  {
    title: "Github",
    href: "https://www.github.com",
    icon: <Github className="w-5 w-5" />,
  },
  {
    title: "LinkedIn",
    href: "https://www.linkedin.com",
    icon: <Linkedin className="w-5 w-5" />,
  },
];
interface SocialMediaBtnProps {
  className?: string;
  iconClassName?: string;
  tooltipClassName?: string;
}
const SocialMediaBtn = ({
  className,
  iconClassName,
  tooltipClassName,
}: SocialMediaBtnProps) => {
  return (
    <TooltipProvider>
      <div className={cn("flex items-center gap-3.5", className)}>
        {socialLinks?.map((item) => (
          <Tooltip key={item?.title}>
            <TooltipTrigger asChild>
              <a
                key={item?.title}
                target="_blank"
                rel="noopener noreferrer"
                href={item?.href}
                className={cn(
                  "p-2 border rounded-full hover:text-white hover:border-shop_light_green hoverEffect",
                  iconClassName
                )}
              >
                {item?.icon}
              </a>
            </TooltipTrigger>
            <TooltipContent
              className={cn(
                "bg-white text-darkColor font-semibold",
                tooltipClassName
              )}
            >
              {item?.title}
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  );
};
export default SocialMediaBtn;
