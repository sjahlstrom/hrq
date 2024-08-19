"use client";

import { ThemeProvider } from "next-themes";
import React from 'react'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" enableSystem={false} defaultTheme="dark">
      {children}
    </ThemeProvider>
  );
}
//
// import { ThemeProvider } from 'next-themes';
// import React from 'react';
//
// interface ProvidersProps {
//   children?: React.ReactNode; // 'children' is now optional
// }
//
// export function Providers({ children }: ProvidersProps) {
//   return (
//       <ThemeProvider attribute="class" enableSystem={false} defaultTheme="dark">
//         {children || null} {/* Fallback to null if children is undefined */}
//       </ThemeProvider>
//   );
// }
