export type Project = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  body: string | null;
  cover_image_url: string | null;
  audience: string | null;
  status: "ongoing" | "completed";
  published: boolean;
  created_at: string;
};

export type Post = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  body: string | null;
  cover_image_url: string | null;
  category: string | null;
  published: boolean;
  published_at: string;
};

export type Partner = {
  id: string;
  name: string;
  logo_url: string | null;
  website: string | null;
  sort_order: number;
};

export type Program = {
  id: string;
  slug: string;
  title: string;
  icon: string;
  color: string;
  items: string[];
  sort_order: number;
};

export type FormResult = { ok: boolean; message: string; demo?: boolean };
