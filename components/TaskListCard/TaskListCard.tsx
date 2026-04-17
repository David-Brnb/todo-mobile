import { TaskList } from "@/types/TaskList";
import React from "react";
import { Box } from "../ui/box";
import { Pressable } from "../ui/pressable";
import { Progress, ProgressFilledTrack } from "../ui/progress";
import { Text } from "../ui/text";

const TaskListCard: React.FC<{ item: TaskList }> = ({ item }) => {
  // variables, use state, hook que regrese funcion

  // funciones

  // use Effects

  // render
  return (
    <Pressable className="p-4 border border-gray-300 rounded-xl mb-3">
      {/* titulo */}
      <Text className="text-lg font-semibold">{item.title}</Text>

      {/* subtitulo */}
      <Text className="text-gray-500 text-sm mb-2">{item.subtitle}</Text>

      {/*progress*/}
      <Box className="mb-3">
        <Progress value={item.percentage} size="md">
          <ProgressFilledTrack />
        </Progress>
        <Text className="text-xs text-gray-500 mt-1">
          {item.percentage}% completed
        </Text>
      </Box>
    </Pressable>
  );
};

export default TaskListCard;
