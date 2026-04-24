import { router } from "expo-router";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import { login } from "@/firebase/auth";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async () => {
    try {
      const token = await login(email, password);
      if (token) {
        await AsyncStorage.setItem("authToken", token);
        router.replace("/(tabs)");
      }
    } catch {
      // do nothing
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      className="flex-1 bg-background-0 px-6 justify-center"
    >
      <View className="gap-4">
        <View className="gap-1">
          <Text className="text-3xl font-bold text-typography-950">Hello</Text>
          <Text className="text-typography-500">Sign in to continue</Text>
        </View>

        <View className="gap-2">
          <Text className="font-semibold text-typography-700">Email</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="you@example.com"
            autoCapitalize="none"
            keyboardType="email-address"
            textContentType="username"
            autoComplete="email"
            className="rounded-xl border border-outline-200 bg-background-0 px-4 py-3 text-typography-950"
            returnKeyType="next"
          />
        </View>

        <View className="gap-2">
          <Text className="font-semibold text-typography-700">Password</Text>
          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="••••••••"
            secureTextEntry
            textContentType="password"
            autoComplete="password"
            className="rounded-xl border border-outline-200 bg-background-0 px-4 py-3 text-typography-950"
            returnKeyType="done"
            onSubmitEditing={onSubmit}
          />
        </View>

        <Pressable
          accessibilityRole="button"
          onPress={onSubmit}
          className="mt-2 items-center justify-center rounded-xl bg-primary-600 py-3"
        >
          <Text className="font-bold text-typography-0">Sign in</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}
