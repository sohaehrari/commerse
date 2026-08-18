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
        <Link className="nav-link" href="/login">login</Link>


        {/* USER SECTION */}
        {user ? (
          <div className="d-flex align-items-center gap-2">
            <img
              src={user.image}
              alt={user.name}
              width="35"
              height="35"
              style={{ borderRadius: "50%" }}
            />
            <span className="fw-bold">
              Welcome, {user.name}
            </span>
          </div>
        ) : (
          <span className="text-danger">Not logged in</span>
        )}
      </div>
    </nav>
  );
}