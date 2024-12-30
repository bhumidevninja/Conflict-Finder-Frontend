import axiosInstance from "../axiosInstance";

export interface RegisterUser {
    password: string;
    email: string;
    first_name: string;
    last_name: string;
}

export const registerUserService = async (createUserDetail: RegisterUser): Promise<boolean> => {
  try {
    const response = await axiosInstance.post("user/register/", createUserDetail);
    return response.status === 201;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to create user");
  }
};