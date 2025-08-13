import { useState } from "react";
import axios from "axios";

const TestForm = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      alert("กรุณาเลือกไฟล์ก่อนส่ง");
      return;
    }

    const formData = new FormData();
    formData.append("image", file); // 👈 ต้องใช้ชื่อ "image" ให้ตรงกับ req.files.image

    try {
      const res = await axios.post(
        "http://localhost:5000/api/upload", // เปลี่ยน URL ตาม backend ของคุณ
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("✅ Upload success:", res.data);
    } catch (err) {
      console.error("❌ Upload error:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input type="file" onChange={handleFileChange} />
      <button type="submit" className="bg-yellow-300 p-2 rounded">
        Upload
      </button>
    </form>
  );
};

export default TestForm;
