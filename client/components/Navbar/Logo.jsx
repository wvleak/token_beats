import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/" className="flex gap-2 flex-center">
      <img
        src="/assets/logo-svg.svg"
        alt="logo"
        className="object-contain ml-10 max-w-[120px] h-auto"
      />
    </Link>
  );
};

export default Logo;
