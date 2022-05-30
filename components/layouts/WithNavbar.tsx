import Navbar from "@/components/Navbar";
import type { ReactElement } from "react";

function WithNavbar({ children }: { children: ReactElement }) {
  return (
    <>
      <Navbar />
      <div className="relative bg-white overflow-hidden">
        <main className="pt-5">{children}</main>
      </div>
    </>
  );
}

export default WithNavbar;
