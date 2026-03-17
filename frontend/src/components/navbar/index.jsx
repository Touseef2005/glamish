"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, Search, ShoppingBag } from "lucide-react"
import { LuLogIn } from "react-icons/lu";
import { useApiCache, useResponsive } from "@/hooks/index"

import { Button } from "@/components/shadcn-ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/shadcn-ui/sheet"
import { ButtonPrimaryWithIcon } from "@components/Buttons/index";
import { ApiService, localStorageHandler } from "@utils/index"
import { useProductStore } from "@store/useProductStore.js";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";

const SearchDialogBox = dynamic(() => import("@components/SearchDialogeBox"), { ssr: false })

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false)
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchDialogOpen, setIsSearchDialogOpen] = useState(false)

  const isMobile = useResponsive(968)
  const pathname = usePathname();

  const isUser = localStorageHandler.get("user")

  useEffect(() => {
    // Check if the user is logged in from localStorage
    // const user = localStorageHandler.get("user")
    const user = isUser
    if (user) {
      setIsUserLoggedIn(true)
    } else {
      setIsUserLoggedIn(false)
    }
  }, [isUser])

  useEffect(() => {
    if (!isMobile) setIsOpen(false)
  }, [isMobile])

  useEffect(() => {
    if (isSearchDialogOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isSearchDialogOpen]);



  const { cartItems } = useProductStore()

  const closeMenu = () => setIsOpen(false)


  if (searchQuery) {

  }
  const { data, loading, error } = useApiCache(
    `product/get-published?name=${searchQuery}`,
    () => ApiService('GET', `product/get-published?name=${searchQuery}`).then(res => res.data?.products || [])
  )


  const navbarItems = [
    {
      id: 1,
      title: "Home",
      link: "/"
    },
    {
      id: 4,
      title: "Products",
      link: "/products",
    },
    {
      id: 5,
      title: "Categories",
      link: "/categories",
    },
    {
      id: 2,
      title: "Contact",
      link: "/contact-us"
    },
    {
      id: 3,
      title: "About Us",
      link: "/about-us"
    },
  ]


  // ['Home', 'Products', 'Collections', 'Skincare', 'Makeup', 'About', 'Contact']

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
      <div className="max-w-[1200px] mx-auto flex h-16 items-center justify-between px-4 md:px-6">

        {/* Left Section - Mobile Menu & Logo */}
        <div className="flex items-center gap-4">
          {isMobile && (
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Menu">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64">
                <nav className="flex flex-col gap-4">
                  {navbarItems.map((item) => (
                    <Link key={item.id} href={item.link} onClick={closeMenu}
                      className="text-lg font-medium hover:text-peach-500 transition-colors">
                      {item.title}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          )}

          {/* Logo */}
          <Link href="/" className="!font-pacifico flex items-center gap-2 font-serif text-xl font-medium">
            <span className="text-peach-500">Glamish</span>
            <span className="hidden sm:inline">Beauty</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        {!isMobile && (
          <nav className="hidden md:flex items-center gap-6">
            {navbarItems.map((item) => (
              <Link key={item.id} href={item.link}
                className={`text-sm font-medium hover:text-peach-500 transition-colors ${pathname === item.link ? "text-peach-500 underline" : ""}`}>
                {item.title}
              </Link>
            ))}
          </nav>
        )}

        {/* Action Buttons */}
        <div className="flex items-center gap-0">
          <Button variant="ghost" size="icon" aria-label="Search" onClick={() => setIsSearchDialogOpen(true)}>
            <Search className="h-5 w-5" />
          </Button>
          <Link
            href="/cart"
            aria-label="Shopping bag"
            className="relative flex h-10 w-10 items-center justify-center rounded-md hover:bg-gray-100 transition"
          >
            <ShoppingBag className="h-5 w-5" />
            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-peach-500 text-[10px] text-white">
              {cartItems.length > 0 ? cartItems.length : 0}
            </span>
          </Link>
          {
            isUserLoggedIn ? (
              <ButtonPrimaryWithIcon
                href="/Profile"
                className=" !bg-transparent !text-black hover:!border-none"
                icon={<LuLogIn className="h-4 w-4" />}
              />
            ) : (
              <ButtonPrimaryWithIcon
                href="/Login"
                className=" !bg-transparent !text-black hover:!border-none"
                icon={<LuLogIn className="h-4 w-4" />}
              />
            )
          }

        </div>
      </div>

      <SearchDialogBox
        isOpen={isSearchDialogOpen}
        setIsOpen={setIsSearchDialogOpen}
        title="Search Products"
        placeholder="Search products..."
        filteredData={data}
        onSearchQueryChange={setSearchQuery}
        searchQuery={searchQuery}
        loading={loading}
      />

    </header>


  )
}