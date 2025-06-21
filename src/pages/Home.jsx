import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router"; // นำเข้า useNavigate
import useSchoolStore from "../store/school-Store";

const Home = () => {
  const token = useSchoolStore((state) => state.token);
  const user = useSchoolStore((state) => state.user);
  const navigate = useNavigate(); // เรียกใช้งาน useNavigate

  const handleClick = () => {
    // ตรวจสอบว่า token และ user มีค่าหรือไม่
    if (token && user) {
      navigate("/user"); // ถ้ามี ให้ไปที่ /user
    } else {
      navigate("/login"); // ถ้าไม่มี ให้ไปที่ /login
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Button onClick={handleClick}>ตรวจสอบรายชื่อนักเรียน</Button>
    </div>
  );
};

export default Home;
