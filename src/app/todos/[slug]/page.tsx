import { getTodoBySlug } from "@/actions/todos";

type TodoProps = {
  params: Promise<{ slug: string }>;
};

export default async function TodoPage({ params }: TodoProps) {
  const { slug } = await params;

  const todo = await getTodoBySlug(slug);

  const display = todo ?? {
    id: slug,
    text: `Todo ${slug}`,
    completed: false,
    userId: "-",
  };

  return (
    <main className="min-h-screen bg-white flex items-center justify-center">
      <div className="max-w-2xl w-full px-4 py-12">
        <h1 className="text-2xl font-semibold text-gray-900">{display.text}</h1>

        <div className="mt-6 space-y-4">
          <div className="bg-gray-50 p-4 rounded">
            <dt className="text-xs font-medium text-gray-500">ID</dt>
            <dd className="mt-1 text-sm text-gray-900 break-all">
              {display.id}
            </dd>
          </div>

          <div className="bg-gray-50 p-4 rounded">
            <dt className="text-xs font-medium text-gray-500">Completed</dt>
            <dd className="mt-1 text-sm text-gray-900">
              {display.completed ? "Yes" : "No"}
            </dd>
          </div>

          <div className="bg-gray-50 p-4 rounded">
            <dt className="text-xs font-medium text-gray-500">User ID</dt>
            <dd className="mt-1 text-sm text-gray-900">{display.userId}</dd>
          </div>
        </div>
      </div>
    </main>
  );
}
