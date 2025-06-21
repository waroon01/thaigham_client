import { useEffect } from "react";
import useSchoolStore from "../../store/school-Store";

const mockTeachers = [
  {
    id: "65001",
    fullName: "สมชาย ใจดี",
    room: "-",
    position: "ครูชำนาญการพิเศษ",
    role: "ผู้อำนวยการ",
    phone: "089-123-4567",
  },
  {
    id: "65002",
    fullName: "สมหญิง รักเรียน",
    room: "ป.1",
    position: "ครูชำนาญการพิเศษ",
    role: "ครูประจำชั้น",
    phone: "086-456-7890",
  },
  {
    id: "65003",
    fullName: "นภา ฟ้าใส",
    room: "ป.2",
    position: "ครูชำนาญการพิเศษ",
    role: "ครูผู้ช่วย",
    phone: "081-234-5678",
  },
  {
    id: "65004",
    fullName: "วิชัย เก่งกาจ",
    room: "ม.1",
    position: "ครูชำนาญการ",
    role: "หัวหน้าฝ่ายวิชาการ",
    phone: "083-987-6543",
  },
  {
    id: "65005",
    fullName: "ภูมิ ภูเขา",
    room: "-",
    position: "ครูอาวุโส",
    role: "รองผู้อำนวยการ",
    phone: "080-112-3344",
  },
];


const Dashboard = () => {
  const actionLoadStudent = useSchoolStore((state) => state.actionLoadStudent);
  const students = useSchoolStore((state) => state.students);
  const total = students.length;
  const maleCount = students.filter((s) => s.gender === "ช").length;
  const femaleCount = students.filter((s) => s.gender === "ญ").length;
  
  const malePercent = total > 0 ? ((maleCount / total) * 100).toFixed(1) : "0.0";
  const femalePercent = total > 0 ? ((femaleCount / total) * 100).toFixed(1) : "0.0";
  const teacherCount = 20;
  const studentPerTeacherRatio = total > 0 ? `1:${Math.round(total / teacherCount)}` : "1:0";


    useEffect(() => {
      actionLoadStudent();
    }, []);

  return (
    <div id="dashboard-content" className="content-section">
    {/* Dashboard Stats */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <div className="card bg-white rounded-lg shadow p-5 border-l-4 border-purple-500">
        <div className="flex justify-between">
          <div>
            <p className="text-sm text-gray-500 font-medium">
              นักเรียนทั้งหมด
            </p>
            <p className="text-2xl font-bold text-gray-800">{students.length} คน</p>
          </div>
          <div className="bg-purple-100 rounded-full p-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-purple-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </div>
        </div>
        {/* <div className="mt-2">
          <span className="text-green-500 text-sm font-medium">+2.5%</span>
          <span className="text-gray-500 text-sm"> จากเดือนที่แล้ว</span>
        </div> */}
      </div>
      <div className="card bg-white rounded-lg shadow p-5 border-l-4 border-blue-500">
        <div className="flex justify-between">
          <div>
            <p className="text-sm text-gray-500 font-medium">นักเรียนชาย</p>
            <p className="text-2xl font-bold text-gray-800">{maleCount} คน</p>
          </div>
          <div className="bg-blue-100 rounded-full p-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-blue-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
        </div>
        <div className="mt-2">
          <span className="text-green-500 text-sm font-medium">{malePercent}%</span>
          <span className="text-gray-500 text-sm"> ร้อยละของทั้งหมด</span>
        </div>
      </div>
      <div className="card bg-white rounded-lg shadow p-5 border-l-4 border-pink-500">
        <div className="flex justify-between">
          <div>
            <p className="text-sm text-gray-500 font-medium">
              นักเรียนหญิง
            </p>
            <p className="text-2xl font-bold text-gray-800">{femaleCount} คน</p>
          </div>
          <div className="bg-pink-100 rounded-full p-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-pink-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
        </div>
        <div className="mt-2">
          <span className="text-green-500 text-sm font-medium">{femalePercent}%</span>
          <span className="text-gray-500 text-sm"> ร้อยละของทั้งหมด</span>
        </div>
      </div>
      <div className="card bg-white rounded-lg shadow p-5 border-l-4 border-yellow-500">
        <div className="flex justify-between">
          <div>
            <p className="text-sm text-gray-500 font-medium">
              จำนวนข้าราชการครู
            </p>
            <p className="text-2xl font-bold text-gray-800">20</p>
          </div>
          <div className="bg-yellow-100 rounded-full p-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-600" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20 3H4c-1.1 0-2 .9-2 2v12h2v2h2v-2h12v2h2v-2h2V5c0-1.1-.9-2-2-2zm0 12H4V5h16v10z"/>
          </svg>

          </div>
        </div>
        <div className="mt-2">
          <span className="text-red-500 text-sm font-medium">{studentPerTeacherRatio}</span>
          <span className="text-green-500 text-sm"> อัตราส่วนครู : นักเรียน</span>
        </div>
      </div>
    </div>
    {/* Charts */}
    {/* <div className="grid grid-cols-2 lg:grid-cols-[70%,30%] gap-6 mb-6">
      <div className="bg-white rounded-lg shadow p-5">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          ปฏิทินกิจกรรม
        </h2>
        <div id="calendar" className="h-[600px]" />
      </div>
      <div className="bg-white rounded-lg shadow p-5">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          สัดส่วนนักเรียนระดับชั้น
        </h2>
        <div className="h-80">
          <canvas id="genderChart" />
        </div>
      </div>
    </div> */}
    {/* Recent Students */}
    <div className="bg-white rounded-lg shadow p-5 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">
          รายชื่อครูปัจจุบัน
        </h2>
        <a
          href="#students"
          className="text-purple-600 hover:text-purple-800 text-sm font-medium"
        >
          ดูทั้งหมด
        </a>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-gray-600">รหัสประจำตัวครู</th>
              <th className="text-gray-600">ชื่อ-นามสกุล</th>
              <th className="text-gray-600">ประจำชั้น</th>
              <th className="text-gray-600">วิทยฐานะ</th>
              <th className="text-gray-600">ตำแหน่ง</th>
              <th className="text-gray-600">เบอร์โทรศัพท์</th>
            </tr>
          </thead>
<tbody className="divide-y divide-gray-200">
  {mockTeachers.map((teacher, index) => (
    <tr key={index}>
      <td className="text-gray-800">{teacher.id}</td>
      <td className="text-gray-800">{teacher.fullName}</td>
      <td className="text-gray-800">{teacher.room}</td>
      <td className="text-gray-800">{teacher.position}</td>
      <td>
        <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
          {teacher.role}
        </span>
      </td>
      <td className="text-gray-800">{teacher.phone}</td>
    </tr>
  ))}
</tbody>

        </table>
      </div>
    </div>
  </div>
  )
}
export default Dashboard