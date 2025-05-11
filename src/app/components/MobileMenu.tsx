"use client";

import React, { useEffect, useState } from "react";
import getModules from "../../../logic/modules/getModules";
import { useRouter } from "next/navigation";

interface Module {
  name: string;
  slug: string;
}

export default function MobileMenu() {
  const router = useRouter();

  const [course, setCourse] = useState("uytEidnU3GVsyhNcpbmc");
  const [modules, setModules] = useState<Module[]>([]);

  const handleGetModules = async (course: string) => {
    try {
      const userId = sessionStorage.getItem("userId");

      if (typeof userId === "string") {
        const modules = await getModules(userId, course);

        for (let i = 0; i < modules.length; i++) {
          modules[i].slug = i.toString();
        }
        setModules(modules);
      }
    } catch (error) {
      console.error("Error getting modules:", error);
    }
  };

  useEffect(() => {
    handleGetModules(course);
  }, []);

  return (
    <div className="w-1/5 h-full flex flex-col items-center justify-start bg-white pt-8 min-w-sm">
      <ul className="w-full flex flex-col items-center justify-center">
        {modules.length > 0 &&
          modules.map((oneModule) => {
            return (
              <li
                className="text-black h-fit px-3 py-6 w-full flex flex-col items-center justify-between hover:bg-[var(--primary)] hover:text-white cursor-pointer"
                key={oneModule.name}
                onClick={() => {
                  router.push(`/modulo/${oneModule.slug}`);
                }}
              >
                <p className="w-fit text-xl text-center">{oneModule.name}</p>
              </li>
            );
          })}
      </ul>
    </div>
  );
}
