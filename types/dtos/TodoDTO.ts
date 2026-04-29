import type { CategoryDTO } from "./CategoryDTO";
import type { CommentDTO } from "./CommentDTO";

export interface TodoDTO {
  uuid: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: string;
  ownerId: string;
  categories: CategoryDTO[];
  comments: CommentDTO[];
}

