"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useAuthRedirect from "@/lib/useAuthRedirect";

export default function Home() {
  useAuthRedirect();

  const router = useRouter();

  useEffect(() => {
    sessionStorage.setItem("courseId", "uytEidnU3GVsyhNcpbmc");

    window.innerWidth < 768
      ? router.push("/mobile/menu")
      : router.push("/dashboard/average");
  }, [window.innerWidth]);

  return null;
}
