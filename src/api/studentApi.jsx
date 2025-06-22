import axios from "axios";
const url_Base = import.meta.env.VITE_API_BASE_URL;
const url_Sheet = "https://script.google.com/macros/s/AKfycbwgHd3WPPjZir6uXEkyP29BeMFeKe-5eu6c_06e1iGwrqvJJGJzyhznX9-J8NPYssXH6w/exec"
import qs from 'qs'; // ใช้ช่วยแปลง object ให้อยู่ในรูปแบบ url encoded


export const updateStudentData = async (id, data, token) => {
    console.log(data)
  return await axios.patch(
    `${url_Base}/student/${id}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};


export const createStudentData = async (data) => {
  console.log(data);
  return await axios.post(
    `${url_Base}/create-student`,
    data
  );
};




export const createEventCalendar = async (data) => {
  console.log(data);
  const formData = qs.stringify(data); // แปลง object เป็น query string

  return await axios.post(
    `${url_Sheet}?type=eventcalendar`, // พารามิเตอร์เพิ่มเติมใน query string ก็ใส่ตรงนี้ได้
    formData,
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }
  );
};

export const getEventCalendar = async () => {

  return await axios.post(
    `${url_Sheet}?type=getevent`
  );
};

export async function deleteEventCalendar(eventId) {
  try {
    const res = await axios.post(`${url_Sheet}?type=deleteEvent`, null, {
      params: {
        id: eventId,
      },
    });

    if (!res.data.success) {
      throw new Error(res.data.message || "Delete failed");
    }

    return res.data;
  } catch (error) {
    console.error("Error deleting event:", error);
    throw error;
  }
}
