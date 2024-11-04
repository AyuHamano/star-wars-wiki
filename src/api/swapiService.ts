import axiosInstance from "./axiosInstance.ts";

const getByUrl = async (url: string, params?: { search: string }) => {
  try {
    const { data } = await axiosInstance.get(url, { params });
    return data;
  } catch (error) {
    alert("Failed to fetch data " + error);
  }
};

export { getByUrl };
