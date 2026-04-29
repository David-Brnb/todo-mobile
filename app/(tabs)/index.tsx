import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useEffect, useState } from "react";
import { FlatList, Pressable, RefreshControl, View } from "react-native";

import TaskListCard from "@/components/TaskListCard/TaskListCard";
import { Box } from "@/components/ui/box";
import { IconSymbol } from "@/components/ui/icon-symbol.ios";
import { Spinner } from "@/components/ui/spinner";
import { Text } from "@/components/ui/text";
import { MOCK_TASK_LISTS, TaskList } from "@/types/TaskList";
import type { TodoDTO } from "@/types/dtos";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import InputField from "@/components/InputField/InputFieldC";
import TaskItemCard from "@/components/TaskItemCard/TaskItemCard";
import { TaskItemExample } from "@/types/TaskItem";

export default function HomeScreen() {
  const [lists, setLists] = useState<TaskList[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [textInput, setTextInput] = useState("");
  const [todosFetchStatus, setTodosFetchStatus] = useState(
    "Todos not fetched yet"
  );

  const fetchTodosFromBackend = async () => {
    const todosUrl = process.env.EXPO_PUBLIC_TODOS_URL;
    if (!todosUrl) {
      setTodosFetchStatus("Missing EXPO_PUBLIC_TODOS_URL");
      return;
    }

    try {
      const token = await AsyncStorage.getItem("authToken");
      const res = await axios.get<TodoDTO[]>(todosUrl, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log("Backend todos response:", res.data);
      setTodosFetchStatus(`Fetched ${res.data.length} todos`);
    } catch (error) {
      console.log("Error fetching backend todos:", error);
      setTodosFetchStatus("Failed to fetch todos");
    }
  };

  const fetchTaskLists = async (): Promise<TaskList[]> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const shouldFail = Math.random() < 0.3;

        if (shouldFail) {
          reject(new Error("Failed to fetch lists"));
        } else {
          resolve(MOCK_TASK_LISTS);
        }
      }, 1000);
    });
  };

  const loadLists = async (fromRefresh: boolean = false) => {
    try {
      setError(null);
      if (fromRefresh) {
        setLoading(true);
      }
      const data = await fetchTaskLists();
      setLists(data);
      if (fromRefresh) {
        setLoading(false);
      }
    } catch (err) {
      setError("Something went wrong");
      setLists([]);
    }
  };

  useEffect(() => {
    const init = async () => {
      setLoading(true);
      await loadLists();
      await fetchTodosFromBackend();
      setLoading(false);
    };

    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await loadLists();
    setRefreshing(false);
  };

  return (
    <SafeAreaView className="flex-1">
      <Box className="flex-1 py-2 px-4">
        {/* Header de la pagina */}
        <View className="flex-row justify-between items-center py-2">
          <View className="flex-row items-start">
            <IconSymbol size={28} name="book.fill" color="#1d4ed8" />
            <Text
              className="text-2xl font-bold ml-3"
              style={{ color: "#1d4ed8" }}
            >
              EduTask
            </Text>
          </View>
          <View className="">
            <IconSymbol size={40} name="circle.fill" color="blue-100" />
          </View>
        </View>

        <Text className="text-5xl mb-2 pt-10 color-black font-semibold">
          Your Altier
        </Text>
        <Text className="text-2xl text-gray-700 mb-10">
          Focus on what matters today
        </Text>

        <Text className="text-lg text-gray-500 mb-5">Due todayyy</Text>

        <TaskItemCard item={TaskItemExample} />

        <InputField
          id="1"
          placeholder="Add a new task..."
          value={textInput}
          enabled={true}
          onChange={setTextInput}
        />

        <Link href="/storybook" asChild>
          <Text className="text-blue-500 underline mb-5">Go to Storybook</Text>
        </Link>

        {/* Loading */}
        {loading && (
          <Box className="mt-4">
            <Spinner size="large" color="grey" />
          </Box>
        )}

        {/* Error */}
        {!loading && error && (
          <>
            <Text className="text-red-500 mb-2">{error}</Text>
            <Pressable onPress={() => loadLists(true)}>
              <Text className="text-blue-500 underline">Retry</Text>
            </Pressable>
          </>
        )}

        {/* Empty */}
        {!loading && !error && lists.length === 0 && (
          <Text>No tasks available</Text>
        )}

        {/* List */}
        {!loading && !error && (
          <FlatList
            data={lists}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <TaskListCard item={item} />}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          />
        )}
      </Box>

      <View className="absolute bottom-4 left-4 right-4">
        <Text className="text-xs text-gray-500">{todosFetchStatus}</Text>
      </View>
    </SafeAreaView>
  );
}
