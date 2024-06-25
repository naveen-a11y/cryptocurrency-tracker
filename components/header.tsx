import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Header() {
  return (
    <nav className="sticky top-0 z-50 flex justify-between bg-white items-center p-4 shadow-sm">
      <Link href="/">
        <Image
          src="/logo.svg"
          alt="logo"
          width={168}
          height={29}
          className="object-contain"
        />
      </Link>
      <Link href="/crypto-converter">Crypto Converter</Link>
    </nav>
  );
}
