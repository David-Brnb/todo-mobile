export type TaskItem = {
  id: string;
  title: string;
  time: string;
  completed: boolean;
  idColor?: string;
};

export const TaskItemExample: TaskItem = {
  id: "1",
  title: "Buy groceries",
  time: "2:30 PM",
  completed: false,
  idColor: "bg-red-500",
};
