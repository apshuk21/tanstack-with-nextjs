"use server";

import { ITodo } from "@/interfaces/todos";

const BASE_URL = "http://localhost:4000";

export async function getAllTodos(): Promise<ITodo[]> {
  let todos = [];
  const response = await fetch(`${BASE_URL}/todos`, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Unable to fetch todos");
  }

  todos = await response.json();

  return todos;
}

export async function getTodoBySlug(slug: string): Promise<ITodo> {
  const response = await fetch(`${BASE_URL}/todos/${slug}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Unable to fetch todos by slug");
  }

  const todo = await response.json();

  return todo;
}
