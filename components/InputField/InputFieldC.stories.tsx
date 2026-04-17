import { Meta } from "@storybook/react";
import { useState } from "react";
import InputField from "./InputFieldC";

const meta: Meta<typeof InputField> = {
  title: "Example/InputField",
  component: InputField,
  tags: ["autodocs"],
};

export default meta;

const InteractiveWrapper = ({ enabled }: { enabled: boolean }) => {
  const [value, setValue] = useState("ji");

  return (
    <InputField
      id="interactive"
      placeholder="Add a new task..."
      value={value}
      onChange={setValue}
      enabled={enabled}
    />
  );
};

export const Enabled = () => <InteractiveWrapper enabled={true} />;

export const Disabled = () => <InteractiveWrapper enabled={false} />;
