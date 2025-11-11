import { fetchProductDetailMeta } from "@/lib/api";
import ProductDetailClient from "./ProductDetailClient";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const product = await fetchProductDetailMeta(params.id);

  if (!product) {
    return {
      title: "Product Not Found",
      description: "The product you are looking for does not exist.",
    };
  }

  return {
    title: product.title,
    description: product.shortDescription || product.description,
    keywords: product.keywords?.join(", "),
    openGraph: {
      title: product.title,
      description: product.shortDescription || product.description,
      images: [product.imageUrl],
      type: "website",
    },
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const product = await fetchProductDetailMeta(params.id);

  if (!product) {
    return <div>Product not found</div>;
  }

  return <ProductDetailClient productId={params.id} />;
}
