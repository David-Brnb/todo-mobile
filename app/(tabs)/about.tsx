import { Text } from "@/components/ui/text";
import React from "react";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

function about() {
  return (
    <SafeAreaView>
      <ScrollView>
        <Text>About Screen </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

export default about;
