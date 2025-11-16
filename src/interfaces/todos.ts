export interface ITodo {
  id: string;
  text: string;
  completed: boolean;
  userId: string;
}

export interface IToggleTodoDto {
  todoId: string;
  completed: boolean;
}
