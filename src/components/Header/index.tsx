"use client";
import React, { type ReactElement, useEffect, useState } from "react";
import { useAppStore } from "@/lib/store";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HouseIcon, MenuHamburguerIcon } from "../../utils/icons";
import style from "./style";

export default function Header(): ReactElement {
  const [open, setOpen] = useState(false);
  const { fetchUser } = useAppStore();

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const pathname = usePathname().split("/")[2];

  if (pathname === "checkout") {
    return (
      <>
        <header className="border-b mb-10">
          <div className="container max-w-screen-xl mx-auto px-4">
            <nav className="flex-wrap lg:flex items-center pt-10 pb-5 xl:relative z-10">
              <div className="flex items-center justify-between mb-10 lg:mb-0">
                <Link href="/">
                  <HouseIcon className="w-8 h-8" />
                </Link>
              </div>
            </nav>
          </div>
        </header>
      </>
    );
  }

  return (
    <header className="border-b mb-10">
      <div className="container max-w-screen-xl mx-auto px-4">
        <nav className="flex-wrap lg:flex items-center pt-10 pb-5 xl:relative z-10">
          <div className="flex items-center justify-between mb-10 lg:mb-0">
            <Link href={"/"}>
              <HouseIcon className="w-8 h-8" />
            </Link>

            <button
              className={style.menuButton}
              onClick={() => {
                setOpen(!open);
              }}
            >
              <MenuHamburguerIcon className="w-6 h-6 text-gray-900" />
            </button>
          </div>

          <ul className={`${open ? "block" : "hidden"} ${style.ul}`}>
            <li className={style.li}>
              <Link href="/">Home</Link>
            </li>
            <li className={style.li}>
              <a href="#">Gift card</a>
            </li>

            <label className={style.searchLabel} htmlFor="search-bar">
              <input
                id="search-bar"
                placeholder="Search destinations"
                className="px-2 py-2 w-full text-sm flex-1 outline-none rounded-full"
              />
              <button className={style.searchButton}>
                <div className="relative">
                  <div className="flex items-center transition-all opacity-1 valid:">
                    <span className="text-sm font-semibold whitespace-nowrap truncate mx-auto">
                      Search
                    </span>
                  </div>
                </div>
              </button>
            </label>
          </ul>
          <div className="flex items-center justify-between mt-5 md:mt-0">
            <div className={style.rentContainer}>
              <a href="#">Rent your home</a>
            </div>
            <Link href={"/book/my-bookings"}>
              <button className={style.myBookingsButton}>My bookings</button>
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
