import { useEffect } from "react";
import useSchoolStore from "../../store/school-Store";
const mockTeachers = [
  {
    id: "65001",
    fullName: "นางสมคิด จันขุนทศ",
    room: "",
    position: "ผู้อำนวยการ ชำนาญการพิเศษ",
    role: "ผู้อำนวยการ",
    phone: "089-039-3653",
  },
  {
    id: "65002",
    fullName: "นายอธิชาติ ไทยธานี",
    room: "-",
    position: "ครูชำนาญการ",
    role: "รองผู้อำนวยการ",
    phone: "089-282-1050",
  },
  {
    id: "65003",
    fullName: "นางอรุณรัตน์ แพรสุรินทร์",
    room: "-",
    position: "ครูชำนาญการพิเศษ",
    role: "-",
    phone: "095-384-3549",
  },
  {
    id: "65004",
    fullName: "นางสาวรัตนา โครงกระโทก",
    room: "-",
    position: "ครูชำนาญการพิเศษ",
    role: "บริหารงานบัญชีการเงิน",
    phone: "089-580-7371",
  },
  {
    id: "65005",
    fullName: "นางสาวเยาวรัตน์ สาละผล",
    room: "-",
    position: "ครูชำนาญการพิเศษ",
    role: "-",
    phone: "089-082-6168",
  },
  {
    id: "65006",
    fullName: "นางสาวสุกัลยา ขำเถื่อน",
    room: "-",
    position: "ครูชำนาญการพิเศษ",
    role: "บริหารงานทั่วไป",
    phone: "098-832-1315",
  },
  {
    id: "65007",
    fullName: "นางลัดดาวัลย์ รัตนบุตรชัย",
    room: "-",
    position: "ครูชำนาญการพิเศษ",
    role: "บริหารงานบุคคล",
    phone: "084-011-6772",
  },
  {
    id: "65008",
    fullName: "นางจารุวรรณ ศรีคำ",
    room: "-",
    position: "ครูชำนาญการพิเศษ",
    role: "-",
    phone: "089-753-0020",
  },
  {
    id: "65009",
    fullName: "นางกรุณา นิลกระ",
    room: "-",
    position: "ครูชำนาญการพิเศษ",
    role: "บริหารงานวิชาการ",
    phone: "095-663-7991",
  },
  {
    id: "65010",
    fullName: "นายเสฏฐวุฒิ นิลกระ",
    room: "-",
    position: "ครูชำนาญการพิเศษ",
    role: "-",
    phone: "097-076-2715",
  },
  {
    id: "65011",
    fullName: "นางอาทิตยา มุขสมบัติ",
    room: "-",
    position: "ครูชำนาญการ",
    role: "-",
    phone: "086-192-6225",
  },
  {
    id: "65012",
    fullName: "นางสมสุข บุญต้อม",
    room: "-",
    position: "ครูชำนาญการ",
    role: "-",
    phone: "085-420-1549",
  },
  {
    id: "65013",
    fullName: "นางสาวเรณู ขุนจ่าเมือง",
    room: "-",
    position: "ครูชำนาญการ",
    role: "-",
    phone: "083-331-7299",
  },
  {
    id: "65014",
    fullName: "นางสาวอาทิตติยา ป้อมทอง",
    room: "-",
    position: "ครู",
    role: "-",
    phone: "061-153-5653",
  },
  {
    id: "65015",
    fullName: "นางสาวกมลทิพย์ หมื่นสา",
    room: "-",
    position: "ครู",
    role: "-",
    phone: "061-150-8416",
  },
  {
    id: "65016",
    fullName: "นายฐเดช รวบรวม",
    room: "-",
    position: "ครู",
    role: "-",
    phone: "061-684-6664",
  },
  {
    id: "65017",
    fullName: "นางสาวธราภร บำรัมย์",
    room: "-",
    position: "ครู",
    role: "-",
    phone: "098-708-5803",
  },
  {
    id: "65018",
    fullName: "นางสาวปราณี จันทร์มะลิ",
    room: "-",
    position: "ครู",
    role: "-",
    phone: "085-381-5977",
  },
  {
    id: "65019",
    fullName: "นางสาวมาริสา อายินดี",
    room: "-",
    position: "ครู",
    role: "-",
    phone: "089-087-8051",
  },
  {
    id: "65020",
    fullName: "นางสาวสุภาพร เสาวงษ์",
    room: "-",
    position: "ครูอัตราจ้าง",
    role: "-",
    phone: "083-158-1194",
  },
  {
    id: "65021",
    fullName: "นางสาวชลาลัย เสาวรัตน์",
    room: "-",
    position: "ครูอัตราจ้าง",
    role: "-",
    phone: "",
  },
  {
    id: "65022",
    fullName: "นายวรุณพร รัตนบุตรชัย",
    room: "-",
    position: "เจ้าหน้าที่ธุรการ",
    role: "-",
    phone: "",
  },
  {
    id: "65023",
    fullName: "นายอุดม น้อยเง้า",
    room: "-",
    position: "นักการภารโรง",
    role: "-",
    phone: "",
  },
];

const getPositionBadgeClass = (position) => {
  switch (position) {
    case "ครูชำนาญการพิเศษ":
      return "bg-purple-100 text-purple-800";
    case "ครูชำนาญการ":
      return "bg-blue-100 text-blue-800";
    case "ครู":
      return "bg-yellow-100 text-yellow-800";
    case "ครูผู้ช่วย":
      return "bg-pink-100 text-pink-800";
    case "ครูอัตราจ้าง":
      return "bg-green-100 text-green-800";
    case "ผู้อำนวยการ ชำนาญการพิเศษ":
      return "bg-orange-100 text-orange-800";
    default:
      return "bg-gray-100 text-gray-600";
  }
};

const DashboardUser = () => {
  const actionLoadStudent = useSchoolStore((state) => state.actionLoadStudent);
  const students = useSchoolStore((state) => state.students);
  const total = students.length;
  const maleCount = students.filter((s) => s.gender === "ช").length;
  const femaleCount = students.filter((s) => s.gender === "ญ").length;

  const malePercent =
    total > 0 ? ((maleCount / total) * 100).toFixed(1) : "0.0";
  const femalePercent =
    total > 0 ? ((femaleCount / total) * 100).toFixed(1) : "0.0";
  const teacherCount = 20;
  const studentPerTeacherRatio =
    total > 0 ? `1:${Math.round(total / teacherCount)}` : "1:0";

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
              <p className="text-2xl font-bold text-gray-800">
                {students.length} คน
              </p>
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
            <span className="text-green-500 text-sm font-medium">
              {malePercent}%
            </span>
            <span className="text-gray-500 text-sm"> ร้อยละของทั้งหมด</span>
          </div>
        </div>
        <div className="card bg-white rounded-lg shadow p-5 border-l-4 border-pink-500">
          <div className="flex justify-between">
            <div>
              <p className="text-sm text-gray-500 font-medium">นักเรียนหญิง</p>
              <p className="text-2xl font-bold text-gray-800">
                {femaleCount} คน
              </p>
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
            <span className="text-green-500 text-sm font-medium">
              {femalePercent}%
            </span>
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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-yellow-600"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M20 3H4c-1.1 0-2 .9-2 2v12h2v2h2v-2h12v2h2v-2h2V5c0-1.1-.9-2-2-2zm0 12H4V5h16v10z" />
              </svg>
            </div>
          </div>
          <div className="mt-2">
            <span className="text-red-500 text-sm font-medium">
              {studentPerTeacherRatio}
            </span>
            <span className="text-green-500 text-sm">
              {" "}
              อัตราส่วนครู : นักเรียน
            </span>
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
        <div className="overflow-x-auto shadow-md rounded-lg border border-gray-200">
          <table className="min-w-full bg-white text-sm">
            <thead className="bg-purple-100 text-purple-800 uppercase text-xs font-semibold tracking-wider">
              <tr>
                <th className="px-4 py-3 text-left">รหัสประจำตัวครู</th>
                <th className="px-4 py-3 text-left">ชื่อ-นามสกุล</th>
                <th className="px-4 py-3 text-left">ประจำชั้น</th>
                <th className="px-4 py-3 text-left">วิทยฐานะ</th>
                <th className="px-4 py-3 text-left">ตำแหน่ง</th>
                <th className="px-4 py-3 text-left">เบอร์โทรศัพท์</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {mockTeachers.map((teacher, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-50 transition duration-150"
                >
                  <td className="px-4 py-2 text-gray-700">{teacher.id}</td>
                  <td className="px-4 py-2 text-gray-800 font-medium">
                    {teacher.fullName}
                  </td>
                  <td className="px-4 py-2 text-gray-700">{teacher.room}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${getPositionBadgeClass(
                        teacher.position
                      )}`}
                    >
                      {teacher.position}
                    </span>
                  </td>

                  <td className="px-4 py-2 text-gray-700">{teacher.role}</td>
                  <td className="px-4 py-2 text-gray-700">
                    {teacher.phone || "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default DashboardUser;
