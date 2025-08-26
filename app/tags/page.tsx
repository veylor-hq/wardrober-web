"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Tag {
  id: string;
  name: string;
}

export default function TagsPage() {
  const [tags, setTags] = useState<Tag[]>([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/tags/`)
      .then((res) => res.json())
      .then((data) => setTags(data.tags));
  }, []);

  async function handleUpdate(tag: Tag, newName: string) {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tags/${tag.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newName }),
    });
    setTags(tags.map((t) => (t.id === tag.id ? { ...t, name: newName } : t)));
  }

  async function handleDelete(tag: Tag) {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tags/${tag.id}`, {
      method: "DELETE",
    });
    setTags(tags.filter((t) => t.id !== tag.id));
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {tags.map((tag) => (
        <Card key={tag.id} className="shadow-md">
          <CardContent className="p-4 flex gap-2 items-center">
            <Input
              defaultValue={tag.name}
              onBlur={(e) => handleUpdate(tag, e.target.value)}
            />
            <Button
              variant="destructive"
              size="sm"
              onClick={() => handleDelete(tag)}
            >
              Delete
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
