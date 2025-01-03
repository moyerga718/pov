"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  console.log("ERROR BOUNDARY ENTERED");
  console.log("ERROR OBJECT:", error);

  return (
    <div>
      <h1>ERROR CAUGHT</h1>
      <pre>{error.message}</pre>
      <button onClick={() => reset()}>Reset</button>
    </div>
  );
}
