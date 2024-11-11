"use client";
import Link from "next/link";
import { useState } from "react";

export default function Page() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    if (count > 2) {
      throw new Error("Too many clicks!");
    }
    setCount(count + 1);
  };
  return (
    <>
      <h1>YUHHHHHH.</h1>
      <button onClick={handleClick}>click me bitch</button>
      <Link href="/dashboard">TO THE DASHBOARD</Link>
    </>
  );
}
