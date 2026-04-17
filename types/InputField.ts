export type InputFieldProps = {
  id: string;
  placeholder: string;
  value: string;
  enabled?: boolean;
  onChange: (value: string) => void;
};
