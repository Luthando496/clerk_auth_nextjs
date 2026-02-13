"use client";
import { UserButton } from "@clerk/nextjs";
import { ChartColumnIncreasingIcon } from "lucide-react";
import { useRouter } from "next/navigation";

const UserDropdown = () => {
  const router = useRouter();
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
