"use client";

import { useState, FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function AddItemPage() {
  const [file, setFile] = useState<File | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    if (file) formData.append("image", file);

    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/items/`, {
      method: "POST",
      body: formData,
    });

    form.reset();
    alert("Item added!");
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
      <Input name="name" placeholder="Item name" required />
      <Textarea name="description" placeholder="Description" />
      <Select name="type" defaultValue="pants">
        <SelectTrigger>
          <SelectValue placeholder="Choose type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="shirt">Shirt</SelectItem>
          <SelectItem value="pants">Pants</SelectItem>
          <SelectItem value="accessory">Accessory</SelectItem>
          <SelectItem value="activewear">Activewear</SelectItem>
          <SelectItem value="footwear">Footwear</SelectItem>
          <SelectItem value="jacket">Jacket</SelectItem>
        </SelectContent>
      </Select>
      <Input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />
      <Button type="submit" className="w-full">
        Add Item
      </Button>
    </form>
  );
}
