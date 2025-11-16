import { IProduct } from "@/interfaces/products";

export function Product({ product }: { product: IProduct }) {
  return (
    <div className="p-4 bg-white rounded-md shadow-sm flex items-center justify-between">
      <div>
        <h3 className="text-lg font-medium text-gray-900">{product.name}</h3>
        <p className="text-sm text-gray-500">ID: {product.id}</p>
      </div>

      <div className="text-right">
        <div className="text-sm text-gray-700">
          Price: ${product.price.toFixed(2)}
        </div>
        <div className="text-sm text-gray-500">
          In stock: {product.inventory}
        </div>
      </div>
    </div>
  );
}
