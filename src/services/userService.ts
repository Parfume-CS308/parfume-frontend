import axios from "axios";

export const getUserInfo = async () => {
  try {
    const response = await axios.get("/auth/me", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data.user;
  } catch (error) {
    console.error("Error fetching user info:", error);
    throw error;
  }
};

export const updateUserInfo = async (updatedInfo: {
  password: string;
  firstName: string;
  lastName: string;
  age: number;
  gender: string;
}): Promise<void> => {
  try {
    await axios.put("/auth/update-profile", updatedInfo, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  } catch (error) {
    console.error("Error updating user info:", error);
    throw error;
  }
};
