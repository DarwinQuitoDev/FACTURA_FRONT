import { axiosInstance } from "@/lib/axios";

export const apiGet = async <T>(url: string): Promise<T> => {
  const response = await axiosInstance.get<T>(url);
  return response.data;
};

export const apiPost = async <T, D = any>(url: string, data: D): Promise<T> => {
  const response = await axiosInstance.post<T>(url, data);
  return response.data;
};

export const apiPut = async <T, D = any>(url: string, data: D): Promise<T> => {
  const response = await axiosInstance.put<T>(url, data);
  return response.data;
};

export const apiDelete = async <T>(url: string): Promise<T> => {
  const response = await axiosInstance.delete<T>(url);
  return response.data;
};
