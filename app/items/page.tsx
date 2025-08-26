"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Item {
  id: string;
  name: string;
  type: string;
  description?: string;
  tags: string[];
  image_url?: string | null;
}

export default function ItemsPage() {
  const [items, setItems] = useState<Item[]>([]);

  async function fetchItems() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/items/`);
    setItems(await res.json());
  }

  useEffect(() => {
    fetchItems();
  }, []);

  async function handleDelete(id: string) {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/items/${id}`, {
      method: "DELETE",
    });
    setItems((prev) => prev.filter((item) => item.id !== id));
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((item) => (
        <Card key={item.id} className="shadow-lg">
          <CardContent className="p-4 space-y-2">
            {item.image_url && (
              <Image
                src={`${process.env.NEXT_PUBLIC_API_URL}${item.image_url}`}
                alt={item.name}
                width={300}
                height={300}
                className="rounded-lg object-cover"
              />
            )}
            <h2 className="text-xl font-semibold">{item.name}</h2>
            <p className="text-sm text-muted-foreground">{item.type}</p>
            <p>{item.description}</p>

            <div className="flex gap-2 pt-2">
              <Link href={`/items/${item.id}/edit`}>
                <Button variant="outline" size="sm">Edit</Button>
              </Link>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => handleDelete(item.id)}
              >
                Delete
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
