import { ITodo } from "@/interfaces/todos";

export function Todo({ todo }: { todo: ITodo }) {
  return (
    <div className="p-3 bg-white rounded-md shadow-sm flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <input
          type="checkbox"
          checked={todo.completed}
          readOnly
          className="h-4 w-4 text-blue-600 rounded"
          aria-label={todo.completed ? "Completed" : "Not completed"}
        />
        <div>
          <div
            className={`text-sm ${
              todo.completed ? "line-through text-gray-400" : "text-gray-800"
            }`}
          >
            {todo.text}
          </div>
          <div className="text-xs text-gray-500">ID: {todo.id}</div>
        </div>
      </div>
      <div className="text-xs text-gray-500">User: {todo.userId}</div>
    </div>
  );
}
