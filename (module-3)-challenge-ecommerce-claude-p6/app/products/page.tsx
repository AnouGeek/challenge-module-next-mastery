import { ProductCard } from "@/components/product-card"
import { getProducts } from "@/lib/products"
import Link from "next/link"

export default async function ProductsPage() {
  const products = await getProducts()
  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <header className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight">
          Shop All Products
        </h1>
      </header>
      <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => (
          <Link href={`/products/${product.id}`} key={product.id}>
            <ProductCard product={product} />
          </Link>
        ))}
      </section>
    </main>
  )
}