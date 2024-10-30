import axiosInstance from "./axiosInstance.ts";

const getFilms = async () => {
    try {
        const response = await axiosInstance.get('films')
        return response.data
    } catch (error) {
        console.error(error)
    }
}

const getPeople = async () => {
    try {
        const response = await axiosInstance.get('people')
        return response.data
    } catch (error) {
        console.error(error)
    }
}

export {getFilms, getPeople}