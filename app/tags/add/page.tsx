"use client";

import { FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function AddTagPage() {
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    const payload = { name: formData.get("name") as string };

    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tags/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    form.reset();
    alert("Tag added!");
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-sm mx-auto">
      <Input name="name" placeholder="Tag name" required />
      <Button type="submit" className="w-full">
        Add Tag
      </Button>
    </form>
  );
}
