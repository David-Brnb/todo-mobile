import { useState } from "react";
import { View, Text, TextInput, Pressable, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function DeleteTodoScreen() {
  const [todoId, setTodoId] = useState("");

  const handleDelete = async () => {
    if (!todoId) {
      Alert.alert("Error", "Please enter a valid Todo ID");
      return;
    }

    try {
      const token = await AsyncStorage.getItem("authToken");
      const baseUrl = process.env.EXPO_PUBLIC_DELETE_TODO_URL || "http://localhost:8081/delete_todo";
      
      const res = await axios.post(`${baseUrl}/${todoId}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      if (res.status === 200) {
        Alert.alert("Success", "Todo deleted successfully!");
        setTodoId("");
      } else {
        Alert.alert("Error", "Could not delete the Todo.");
      }
    } catch (error: any) {
      console.log("Error deleting todo:", error);
      if (error.response && error.response.status === 404) {
         Alert.alert("Error", "Todo not found.");
      } else {
         Alert.alert("Error", "An error occurred while deleting the Todo.");
      }
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-background-0">
      <View className="flex-1 p-6 justify-center">
        <Text className="text-3xl font-bold text-typography-950 mb-2 text-center">Delete Todo</Text>
        <Text className="text-typography-500 mb-6 text-center">Enter the ID of the Todo you want to delete</Text>
        
        <View className="gap-2 mb-6">
          <Text className="font-semibold text-typography-700">Todo ID</Text>
          <TextInput
            value={todoId}
            onChangeText={setTodoId}
            placeholder="e.g. 12345-abcde"
            className="rounded-xl border border-outline-200 bg-background-0 px-4 py-3 text-typography-950"
          />
        </View>

        <Pressable
          accessibilityRole="button"
          onPress={handleDelete}
          className="items-center justify-center rounded-xl bg-red-600 py-3"
        >
          <Text className="font-bold text-white">Delete</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
