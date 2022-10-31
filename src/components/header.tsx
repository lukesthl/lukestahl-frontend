import { useTranslation } from "next-i18next";
import Link from "next/link";
import { translate } from "./translation";

const navItems = [
  {
    href: "/about",
    key: "navigation.about",
  },
];

export const Header = () => (
  <div>
    {navItems.map((item) => (
      <Link key={item.href} href={item.href}>
        {translate(item.key)}
      </Link>
    ))}
  </div>
);
