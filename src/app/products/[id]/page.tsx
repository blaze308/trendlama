import ProductInteraction from "@/components/ProductInteraction";
import ProductCard from "@/components/ProductCard";
import { getProduct, getProductsByCategory } from "@/lib/api";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Star, Truck, ShieldCheck, Package, Ruler } from "lucide-react";

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const product = await getProduct(id);
  if (!product) return { title: "Product not found" };
  return {
    title: `${product.title} | TrendLama`,
    description: product.description,
  };
};

const ProductPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const product = await getProduct(id);
  if (!product) notFound();

  const relatedProducts = await getProductsByCategory(product.category, 4);
  const filteredRelated = relatedProducts.filter((p) => p.id !== product.id).slice(0, 4);

  return (
    <div className="flex flex-col gap-12 mt-8 pb-20">
      {/* MAIN CONTENT: IMAGE + BASIC INFO */}
      <div className="flex flex-col gap-8 lg:flex-row lg:gap-16">
        {/* IMAGE GALLERY */}
        <div className="w-full lg:w-5/12 flex flex-col gap-3">
          <div className="relative aspect-square bg-gray-50 rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
            <Image
              src={product.thumbnail}
              alt={product.title}
              fill
              className="object-cover"
              priority
            />
          </div>
          {product.images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
              {product.images.map((img, i) => (
                <div
                  key={i}
                  className="relative w-20 h-20 flex-shrink-0 rounded-xl overflow-hidden bg-gray-50 border border-gray-100 cursor-pointer hover:border-gray-800 transition-colors shadow-sm"
                >
                  <Image
                    src={img}
                    alt={`${product.title} ${i + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* DETAILS */}
        <div className="w-full lg:w-7/12 flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <p className="text-xs font-bold text-amber-600 uppercase tracking-widest">
              {product.brand || product.category}
            </p>
            <h1 className="text-3xl font-bold text-gray-800 leading-tight">
              {product.title}
            </h1>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <div className="flex items-center">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.round(product.rating)
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-200 fill-gray-200"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm font-bold text-gray-800">
                  {product.rating.toFixed(1)}
                </span>
              </div>
              <div className="w-[1px] h-4 bg-gray-200" />
              <span className="text-xs text-gray-400 font-medium">
                {product.reviews?.length || 0} customer reviews
              </span>
              <div className="w-[1px] h-4 bg-gray-200" />
              <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${
                product.stock > 0 ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
              }`}>
                {product.availabilityStatus || (product.stock > 0 ? "In Stock" : "Out of Stock")}
              </span>
            </div>
          </div>

          <div className="flex items-baseline gap-3">
            <span className="text-4xl font-black text-gray-900">
              ${product.price.toFixed(2)}
            </span>
            {product.discountPercentage && product.discountPercentage > 1 && (
              <span className="text-sm font-bold text-red-500 line-through opacity-50">
                ${(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}
              </span>
            )}
          </div>

          <p className="text-gray-500 text-sm leading-relaxed max-w-xl">
            {product.description}
          </p>

          <div className="w-full h-[1px] bg-gray-100 my-2" />

          <ProductInteraction product={product} />

          {/* TRUST BADGES */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            <div className="flex items-start gap-3 p-4 rounded-xl border border-gray-100 bg-gray-50/50">
              <Truck className="w-5 h-5 text-gray-400 flex-shrink-0" />
              <div className="flex flex-col gap-0.5">
                <span className="text-xs font-bold text-gray-800">
                  {product.shippingInformation || "Free Delivery"}
                </span>
                <span className="text-[10px] text-gray-400">
                  Orders over $50 qualify for free express shipping.
                </span>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 rounded-xl border border-gray-100 bg-gray-50/50">
              <ShieldCheck className="w-5 h-5 text-gray-400 flex-shrink-0" />
              <div className="flex flex-col gap-0.5">
                <span className="text-xs font-bold text-gray-800">
                  {product.warrantyInformation || "1 Year Warranty"}
                </span>
                <span className="text-[10px] text-gray-400">
                  Standard manufacturer warranty applies to this item.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* TABS / EXTRA INFO */}
      <div className="flex flex-col gap-12 mt-8">
        {/* SPECIFICATIONS */}
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
            <Ruler className="w-5 h-5 text-gray-800" />
            <h2 className="text-xl font-bold text-gray-800">Specifications</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-6 gap-x-12">
            {[
              { label: "Weight", value: product.weight ? `${product.weight} kg` : "N/A" },
              {
                label: "Dimensions",
                value: product.dimensions
                  ? `${product.dimensions.width}x${product.dimensions.height}x${product.dimensions.depth} cm`
                  : "N/A",
              },
              { label: "Minimum Order", value: product.minimumOrderQuantity || "1 unit" },
              { label: "Availability", value: product.availabilityStatus || "In stock" },
              { label: "Return Policy", value: product.returnPolicy || "30 days return" },
              { label: "SKU", value: product.id.toString().padStart(6, "0") },
            ].map((spec) => (
              <div key={spec.label} className="flex justify-between items-center text-sm border-b border-gray-50 pb-2">
                <span className="text-gray-400 font-medium">{spec.label}</span>
                <span className="text-gray-800 font-bold">{spec.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* REVIEWS */}
        {product.reviews && product.reviews.length > 0 && (
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
              <Star className="w-5 h-5 text-gray-800" />
              <h2 className="text-xl font-bold text-gray-800">Customer Reviews</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {product.reviews.map((review, i) => (
                <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, j) => (
                        <Star
                          key={j}
                          className={`w-3 h-3 ${
                            j < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-200 fill-gray-200"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-[10px] text-gray-300 font-bold uppercase tracking-widest">
                      {new Date(review.date).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 italic">
                    &quot;{review.comment}&quot;
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-[10px] font-bold text-gray-400">
                      {review.reviewerName.charAt(0)}
                    </div>
                    <span className="text-xs font-bold text-gray-800">
                      {review.reviewerName}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* RELATED PRODUCTS */}
        {filteredRelated.length > 0 && (
          <div className="flex flex-col gap-8 pt-12">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div className="flex items-center gap-2">
                <Package className="w-5 h-5 text-gray-800" />
                <h2 className="text-xl font-bold text-gray-800">You Might Also Like</h2>
              </div>
              <Link href={`/products?category=${product.category}`} className="text-xs font-bold text-amber-600 uppercase tracking-widest hover:underline">
                View Category
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {filteredRelated.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductPage;
