import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
import Logout from "@/components/Logout";
import { isAuthenticated } from "@/lib/actions/auth.action";
import { redirect } from "next/navigation";

const RootLayout = async ({ children }: { children: ReactNode }) => {
  const isAuthenticatedUser =  await isAuthenticated();
  if(!isAuthenticatedUser) redirect('/signin')

  return (
    <div className="root-layout">
      <nav className="flex items-center justify-between">
        <Link href="/" className="flex gap-2">
          <Image src={"./logo.svg"} width={50} height={50} alt="logo" />
          <h2 className="text-primary-100">PrepWise</h2>
        </Link>
        <Logout />
      </nav>
      {children}
    </div>
  );
};
export default RootLayout;
