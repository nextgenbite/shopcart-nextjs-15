import Link from "next/link";

const LoginBtn = () => {

    return (
        <div>
            <Link href="/login">
        <button className="text-sm font-semibold hover:text-dark-color hoverEffect cursor-pointer">Login</button>
            </Link>
        </div>
    )


}

export default LoginBtn;