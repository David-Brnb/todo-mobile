export interface UserDTO {
  id: string;
  fullName: string;
  email: string;
  firebaseUuid: string;
  role: "USER" | "ADMIN";
  active: boolean;
}

