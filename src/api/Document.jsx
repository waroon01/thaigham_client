import axios from "axios";
const url_Base = import.meta.env.VITE_API_BASE_URL;

export const saveDocument = async(formData)=>{
  return await axios.post(
    `${url_Base}/doc`,
    formData
  );

}