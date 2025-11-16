"use client";

import Link from "next/link";
import { useTodos } from "@/hooks/todos/useTodos";
import { Todo } from "@/components/todo/todo";
import { ITodo } from "@/interfaces/todos";

export function Todos() {
  const { data: todos, isLoading, error, isFetching } = useTodos();
  if (isLoading) {
    return <div>Loading todos...</div>;
  }

  if (isFetching) {
    return <div>Fetching Todos...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const items: ITodo[] = Array.isArray(todos) ? todos : todos ? [todos] : [];

  return (
    <div>
      {/* <h2 className="text-2xl font-semibold text-gray-900 mb-4">Todos</h2> */}
      <ul className="space-y-3">
        {items.length > 0 ? (
          items.map((t) => (
            <li key={t.id}>
              <Link
                href={`/todos/${t.slug}`}
                className="block hover:opacity-95"
              >
                <Todo todo={t} showCheckbox={false} />
              </Link>
            </li>
          ))
        ) : (
          <li className="text-gray-500">No todos found.</li>
        )}
      </ul>
    </div>
  );
}
