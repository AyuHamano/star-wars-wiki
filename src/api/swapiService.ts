import axiosInstance from "./axiosInstance.ts";

const getFilms = async (title?: string) => {
  const url = title ? "films/?search=" + title : "films";

  try {
    const response = await axiosInstance.get(url);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const getPeople = async () => {
  try {
    const response = await axiosInstance.get("people");
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export { getFilms, getPeople };
