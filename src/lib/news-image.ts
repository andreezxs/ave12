import heroImg from "@/assets/hero-igreja.jpeg";
import interiorImg from "@/assets/interior-igreja.jpeg";
import comunidadeImg from "@/assets/comunidade.jpg";
import type { NewsPost } from "@/data/site";

const defaultCovers: Record<NewsPost["cover"], string> = {
  igreja: heroImg,
  interior: interiorImg,
  comunidade: comunidadeImg,
};

export function getNewsImage(post: Pick<NewsPost, "cover" | "coverUrl">): string {
  return post.coverUrl || defaultCovers[post.cover];
}
