import axios from "axios";

export const getUser = async () => {
  try {
    const response = await axios({
      url: "https://65f19973034bdbecc763212a.mockapi.io/auth",
      method: "GET",
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteUser = async (userId) => {
  try {
    const response = await axios({
      url: `https://65f19973034bdbecc763212a.mockapi.io/auth/${userId}`,
      method: "DELETE",
    });
    return (
      response.data
    );
  } catch (error) {
    throw error;
  }
};

export const addUser = async (payload) => {
  try {
    const response = await axios({
      url: "https://65f19973034bdbecc763212a.mockapi.io/auth/",
      method: "POST",
      data: payload,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getUserDetailsById = async (userId) => {
  try {
    const response = await axios({
      url: `https://65f19973034bdbecc763212a.mockapi.io/auth/${userId}`,
      method: "GET",
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateUser = async (userId, payload) => {
  try {
    const response = await axios({
      url: `https://65f19973034bdbecc763212a.mockapi.io/auth/${userId}`,
      method: "PUT",
      data: payload,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
