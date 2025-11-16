import { getProductBySlug } from "@/actions/products";

type ProductProps = {
  params: Promise<{ slug: string }>;
};

export default async function ProductPage({ params }: ProductProps) {
  const { slug } = await params;

  const product = await getProductBySlug(slug);
  console.log("##product", product);

  const display = product ?? {
    id: slug,
    name: `Product ${slug}`,
    price: 0,
    inventory: 0,
  };

  console.log("##display", display);

  return (
    <main className="min-h-screen bg-white flex items-center justify-center">
      <div className="max-w-2xl w-full px-4 py-12">
        <h1 className="text-2xl font-semibold text-gray-900">{display.name}</h1>

        <dl className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="bg-gray-50 p-4 rounded">
            <dt className="text-xs font-medium text-gray-500">ID</dt>
            <dd className="mt-1 text-sm text-gray-900 break-all">
              {display.id}
            </dd>
          </div>

          <div className="bg-gray-50 p-4 rounded">
            <dt className="text-xs font-medium text-gray-500">Price</dt>
            <dd className="mt-1 text-sm text-gray-900">
              ${display.price?.toFixed?.(2) ?? display.price}
            </dd>
          </div>

          <div className="bg-gray-50 p-4 rounded">
            <dt className="text-xs font-medium text-gray-500">Inventory</dt>
            <dd className="mt-1 text-sm text-gray-900">{display.inventory}</dd>
          </div>

          <div className="bg-gray-50 p-4 rounded">
            <dt className="text-xs font-medium text-gray-500">Source</dt>
            <dd className="mt-1 text-sm text-gray-900">
              {product ? "API" : "Placeholder"}
            </dd>
          </div>
        </dl>
      </div>
    </main>
  );
}
