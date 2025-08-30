"use client"

import DashboardComponent from "@/components/Dashboard";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Dashboard() {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleSignOut = () => {
    localStorage.removeItem("token");
    router.push("/");
  };

  const handleDeleteAccount = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      setIsDeleting(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/delete`, {
        method: "DELETE",
        headers: { Authorization: token }
      });

      if (res.ok) {
        localStorage.removeItem("token");
        router.push("/");
      } else {
        console.error("Failed to delete account");
      }
    } catch (err) {
      console.error("Error deleting account:", err);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <DashboardComponent
      onSignOut={handleSignOut}
      onDeleteAccount={handleDeleteAccount}
      isDeletingAccount={isDeleting}
    />
  );
}
