import type { UserDTO } from "./UserDTO";

export interface CommentDTO {
  id: string;
  content: string;
  createdAt: string;
  todoId: string;
  author: UserDTO;
}

