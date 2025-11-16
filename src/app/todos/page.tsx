import { Todos } from "@/components";

export default function TodosPage() {
  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-3xl w-full px-4 py-12">
        <h1 className="text-3xl font-bold text-gray-900">Todos Page</h1>
        {/* <p className="mt-3 text-gray-600">A simple todos page placeholder.</p> */}
        <Todos />
      </div>
    </main>
  );
}
