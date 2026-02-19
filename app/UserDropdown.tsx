"use client";
import { UserButton } from "@clerk/nextjs";
import { ChartColumnIncreasingIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"; // 1. Add these hooks

const UserDropdown = () => {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false); // 2. Track mount status

  useEffect(() => {
    setIsMounted(true); // 3. Set to true once the client is ready
  }, []);

  // 4. Return null (or a placeholder) until mounted
  if (!isMounted) {
    return <div className="h-8 w-8 animate-pulse rounded-full bg-muted" />; 
  }

  return (
    <UserButton
      showName
      appearance={{
        elements: {
          userButtonOuterIdentifier: {
            color: "white",
          },
        },
      }}
    >
      <UserButton.MenuItems>
        <UserButton.Action
          label="Dashboard"
          labelIcon={<ChartColumnIncreasingIcon size={16} />}
          onClick={() => router.push("/dashboard")}
        />
      </UserButton.MenuItems>
    </UserButton>
  );
};

export default UserDropdown;