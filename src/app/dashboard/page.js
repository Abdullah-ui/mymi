"use client";

import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
    useEffect( () => {
        const id = localStorage.getItem("sessionId");
        id ? redirect("/dashboard/" + id) : redirect("/signup");
    }, [])
}
