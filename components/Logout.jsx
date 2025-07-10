"use client";

import { Button } from "@/components/ui/button";
import { signOut } from "@/lib/actions/auth.action";

const Logout = () => {
  const handleLogout = async () => {
    try {
      await signOut()
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
