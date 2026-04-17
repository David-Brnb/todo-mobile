import { IconSymbol } from "@/components/ui/icon-symbol";
import { TaskItem } from "@/types/TaskItem";
import React from "react";
import { View } from "react-native";
import { Pressable } from "../ui/pressable";
import { Text } from "../ui/text";

const TaskItemCard: React.FC<{ item: TaskItem }> = ({ item }) => {
  const colorName = item.idColor?.replace("bg-", "") || "gray-500";

  // Mapeo de colores
  const colorMap: Record<string, string> = {
    "blue-500": "#3b82f6",
    "green-500": "#22c55e",
    "red-500": "#ef4444",
  };

  const iconColor = colorMap[colorName] || "#6b7280";

  return (
    <Pressable
      className={`flex flex-row justify-between p-4 border border-gray-200 ${item.completed ? "bg-gray-100" : "bg-white"} rounded-2xl mb-3`}
    >
      <View className="flex flex-row items-center gap-3">
        <IconSymbol
          name="circle.fill"
          size={12}
          color={item.completed ? "#6b7280" : iconColor}
        />
        <Text
          className={`text-lg font-semibold ${item.completed ? "text-gray-500 line-through" : "text-black"}`}
        >
          {item.title}
        </Text>
      </View>

      <View>
        <Text
          className={`text-lg font-medium ${item.idColor?.replace("bg-", "text-")}`}
        >
          {item.time}
        </Text>
      </View>
    </Pressable>
  );
};

export default TaskItemCard;
