"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser=localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary px-3">
      <Link className="navbar-brand" href="/">
        E-Commerce
      </Link>

      <div className="ms-auto d-flex align-items-center gap-3">

        <Link className="nav-link" href="/">Home</Link>
        <Link className="nav-link" href="/products">Products</Link>
        <Link className="nav-link" href="/search">Search</Link>


        {/* USER SECTION */}
       </div>
    </nav>
  );
}