// components/TaskItemCard.stories.tsx
import { Meta, StoryObj } from "@storybook/react-native";
import TaskItemCard from "./TaskItemCard";

const meta = {
  title: "Example/TaskItemCard",
  component: TaskItemCard,
  tags: ["autodocs"],
} satisfies Meta<typeof TaskItemCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Incomplete: Story = {
  args: {
    item: {
      id: "1",
      title: "Buy groceries",
      time: "2:30 PM",
      completed: false,
      idColor: "bg-blue-500",
    },
  },
};

export const Completed: Story = {
  args: {
    item: {
      id: "2",
      title: "Buy groceries",
      time: "2:30 PM",
      completed: true,
      idColor: "bg-blue-500",
    },
  },
};
