"use client";

import { useEffect } from "react";
import { registerUrl } from "@/lib/constants";

/** Sends the visitor on to the portal signup without adding a history entry. */
export function RedirectToRegister() {
  useEffect(() => {
    window.location.replace(registerUrl);
  }, []);

  return null;
}
