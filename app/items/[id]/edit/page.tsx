"use client";

import { useEffect, useState, FormEvent } from "react";
import { useParams, useRouter } from "next/navigation";
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

export default function EditItemPage() {
  const { id } = useParams();
  const router = useRouter();
  const [item, setItem] = useState<any>(null);
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/items/`)
      .then((res) => res.json())
      .then((items) => setItem(items.find((i: any) => i.id === id)));
  }, [id]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    if (file) formData.append("image", file);

    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/items/${id}`, {
      method: "PUT",
      body: formData,
    });

    router.push("/items");
  }

  async function handleDelete() {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/items/${id}`, {
      method: "DELETE",
    });
    router.push("/items");
  }

  if (!item) return <p>Loading...</p>;

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
      <Input name="name" defaultValue={item.name} required />
      <Textarea name="description" defaultValue={item.description} />
      <Select name="type" defaultValue={item.type}>
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
      <Input type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] || null)} />
      <div className="flex gap-4">
        <Button type="submit">Save</Button>
        <Button type="button" variant="destructive" onClick={handleDelete}>
          Delete
        </Button>
      </div>
    </form>
  );
}
