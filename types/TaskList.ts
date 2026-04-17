export type TaskList = {
  id: string;
  title: string;
  subtitle: string;
  percentage: number;
  tags: string[];
  idColor?: string;
  idIcon?: string;
};

export const MOCK_TASK_LISTS: TaskList[] = [
  {
    id: "1",
    title: "Computer Science",
    subtitle: "Algorithms and data structures",
    percentage: 60,
    tags: ["school", "important"],
    idColor: "bg-blue-500",
    idIcon: "code",
  },
  {
    id: "2",
    title: "History",
    subtitle: "World War II notes",
    percentage: 30,
    tags: ["reading"],
    idColor: "bg-green-500",
    idIcon: "menu-book",
  },
  {
    id: "3",
    title: "Math",
    subtitle: "Calculus exercises",
    percentage: 90,
    tags: ["practice", "exam"],
    idColor: "bg-purple-500",
    idIcon: "functions",
  },
];
