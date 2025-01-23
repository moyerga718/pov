"use server";

import { GetCurrentUser } from "../actions/GetCurrentUser";
import UserAvatar from "./userAvatar/UserAvatar";

export default async function NavBar() {
  const currentUser = await GetCurrentUser();

  return (
    <div className="flex border-b-2 p-2 w-100 justify-between">
      <h1>pov</h1>
      <input placeholder="search..."></input>
      {/* <UserAvatar /> */}
      <UserAvatar currentUser={currentUser} />
    </div>
  );
}
