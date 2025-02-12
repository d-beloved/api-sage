"use client";

import { createContext } from "react";
import { ResponseContextType } from "./types";

export const ResponseContext = createContext<ResponseContextType | null>(null);
