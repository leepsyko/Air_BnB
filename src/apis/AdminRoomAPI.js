import axios from "axios";

export const getRooms = async () => {
  try {
    const response = await axios({
      url: "https://65e493523070132b3b24f4c4.mockapi.io/zzz/Room-manager",
      method: "GET",
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteRoom = async (roomId) => {
  try {
    const response = await axios({
      url: `https://65e493523070132b3b24f4c4.mockapi.io/zzz/Room-manager/${roomId}`,
      method: "DELETE",
    });
    return (
      response.data
    );
  } catch (error) {
    throw error;
  }
};

export const addRoom = async (payload) => {
  try {
    const response = await axios({
      url: "https://65e493523070132b3b24f4c4.mockapi.io/zzz/Room-manager/",
      method: "POST",
      data: payload,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getRoomDetailsById = async (roomId) => {
  try {
    const response = await axios({
      url: `https://65e493523070132b3b24f4c4.mockapi.io/zzz/Room-manager/${roomId}`,
      method: "GET",
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateRoom = async (roomId, payload) => {
  try {
    const response = await axios({
      url: `https://65e493523070132b3b24f4c4.mockapi.io/zzz/Room-manager/${roomId}`,
      method: "PUT",
      data: payload,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
