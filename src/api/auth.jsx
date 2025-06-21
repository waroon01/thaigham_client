import axios from "axios";

const url_Base = import.meta.env.VITE_API_BASE_URL;
// https://apithaigham01.vercel.app/api/student
export const currentUser = async (token) => {
  return await axios.post(
    `${url_Base}/current-user`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};


export const currentAdmin = async(token) => {

  return await axios.post(
    `${url_Base}/current-admin`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
