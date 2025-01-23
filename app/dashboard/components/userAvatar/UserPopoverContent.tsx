import { User } from "@/db/tables/User/Table";
import { Logout } from "../../actions/Logout";

interface UserPopoverContentProps {
  user: User;
}

export function UserPopoverContent({ user }: UserPopoverContentProps) {
  return (
    <div className="p-4">
      <p className="mb-2">{user.username}</p>
      <button
        onClick={() => Logout()}
        className="text-sm text-danger hover:text-danger-400"
      >
        Log Out
      </button>
    </div>
  );
}
