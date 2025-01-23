"use client";

import Link from "next/link";
import { User } from "@/db/tables/User/Table";
import ReusablePopover from "@/components/dialogues/popover/ReusablePopover";
import { UserPopoverContent } from "./UserPopoverContent";

interface UserAvatarProps {
  currentUser: User | null;
}

export default function UserAvatar({ currentUser }: UserAvatarProps) {
  if (!currentUser) {
    return <Link href={{ pathname: "/login" }}>Login</Link>;
  }

  return (
    <ReusablePopover
      trigger={<p>{currentUser.username}</p>}
      content={<UserPopoverContent user={currentUser} />}
      placement="bottom"
    />
  );
}
