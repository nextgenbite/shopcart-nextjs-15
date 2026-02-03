import { cn } from "@/lib/utils"
import Link from "next/link";

const Logo = ({className}: {className?: string}) => {
    return (
      <Link href='/'>
          <div className={cn("text-2xl text-shop_btn_dark_green tracking-wider font-black hover:text-shop_light_green font-sans group hoverEffect", className)}>Shopcar<span className=" text-shop_light_green group-hover:text-shop_btn_dark_green">t</span></div>
      </Link>
    )
}

export default Logo;