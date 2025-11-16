"use server";

import { ITodo } from "@/interfaces/todos";

const BASE_URL = "http://localhost:4000";

export async function getAllTodos(): Promise<ITodo> {
  const response = await fetch(`${BASE_URL}/todos`, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Unable to fetch todos");
  }

  const todos = await response.json();

  return todos;
}
