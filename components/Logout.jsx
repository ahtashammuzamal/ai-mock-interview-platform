"use client";

import { signOut } from "firebase/auth";
import { Button } from "@/components/ui/button";
import { auth } from "@/firebase/client";
import { useRouter } from "next/navigation";

const Logout = () => {
  const router = useRouter();
  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/signup");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Button className="btn-primary" onClick={handleLogout}>
      Logout
    </Button>
  );
};
export default Logout;
