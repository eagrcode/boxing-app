"use client";

import { useFormStatus } from "react-dom";

export default function DeleteButton() {
  const { pending } = useFormStatus();

  return (
    <button style={{ color: "var(--accent-color-red)" }}>
      {pending ? "Deleting..." : "Delete"}
    </button>
  );
}
