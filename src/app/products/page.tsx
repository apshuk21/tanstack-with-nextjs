import { Products } from "@/components";

export default async function ProductsPage() {
  // We can directly call an API in the server component
  //   const products = await getAllProducts();
  //   console.log("##products", products);
  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-3xl w-full px-4 py-12">
        <h1 className="text-3xl font-bold text-gray-900">Products Page</h1>
        {/* <p className="mt-3 text-gray-600">
          A minimal products listing placeholder.
        </p> */}
        <Products />
      </div>
    </main>
  );
}
