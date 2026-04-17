import { InputFieldProps } from "@/types/InputField";
import React from "react";
import { Text, TextInput, View } from "react-native";
import { Pressable } from "../ui/pressable";

const InputField: React.FC<InputFieldProps> = ({
  id,
  placeholder,
  value,
  enabled = true,
  onChange,
}) => {
  return (
    <Pressable className="flex flex-row items-center gap-3 p-4 border border-gray-200 bg-white rounded-2xl mb-3">
      <View className="flex-1">
        {enabled ? (
          <TextInput
            placeholder={placeholder}
            value={value}
            onChangeText={onChange}
            className="text-lg font-semibold"
          />
        ) : (
          <Text className="text-lg font-semibold text-gray-500">
            {placeholder}
          </Text>
        )}
      </View>
    </Pressable>
  );
};

export default InputField;
