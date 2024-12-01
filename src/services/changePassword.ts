import axios from "axios";

export const changePassword = async (passwordInfo: {
  oldPassword: string;
  newPassword: string;
}): Promise<void> => {
  try {
    await axios.put("/auth/change-password", passwordInfo, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  } catch (error) {
    console.error("Error changing password:", error);
    throw error;
  }
};
