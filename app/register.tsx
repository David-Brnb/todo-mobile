import axios from "axios";
import { Link, router } from "expo-router";
import { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";

export default function RegisterScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");

  const onSubmit = async () => {
    try {
      const registerUrl =
        process.env.EXPO_PUBLIC_REGISTER_URL || "http://localhost:8081/user";
      await axios.post(registerUrl, {
        email,
        password,
        fullName,
      });
      Alert.alert("Success", "Account created successfully! Please sign in.");
      router.replace("/login");
    } catch (error) {
      console.log("Error registering:", error);
      Alert.alert("Error", "Failed to create account.");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      className="flex-1 bg-background-0 px-6 justify-center"
    >
      <View className="gap-4">
        <View className="gap-1">
          <Text className="text-3xl font-bold text-typography-950">Create Account</Text>
          <Text className="text-typography-500">Sign up to get started</Text>
        </View>

        <View className="gap-2">
          <Text className="font-semibold text-typography-700">Full Name</Text>
          <TextInput
            value={fullName}
            onChangeText={setFullName}
            placeholder="John Doe"
            autoCapitalize="words"
            textContentType="name"
            autoComplete="name"
            className="rounded-xl border border-outline-200 bg-background-0 px-4 py-3 text-typography-950"
            returnKeyType="next"
          />
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
          <Text className="font-bold text-typography-0">Create account</Text>
        </Pressable>

        <View className="mt-4 flex-row justify-center">
          <Text className="text-typography-500">Already have an account? </Text>
          <Link href="/login" asChild>
            <Pressable>
              <Text className="font-bold text-primary-600">Sign in</Text>
            </Pressable>
          </Link>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
