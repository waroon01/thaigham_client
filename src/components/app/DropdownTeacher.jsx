import { useState } from "react";

const DropdownTeacher = ({ onSelect }) => {
  const [query, setQuery] = useState("");
  const [selectedTeacher, setSelectedTeacher] = useState(null);
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

  const filteredTeachers = mockTeachers.filter((teacher) =>
    teacher.fullName.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="mt-2 mb-4">
      <label htmlFor="nameuser" className="text-sm">
        ชื่อผู้ฝากเอกสาร :
      </label>

      <div className="relative w-full mt-2">
        <input
          type="text"
          className="w-full border px-4 py-3 rounded-2xl"
          placeholder="พิมพ์ชื่อครู..."
          value={selectedTeacher?.fullName || query || ""}
          onChange={(e) => setQuery(e.target.value)}
          readOnly={!!selectedTeacher}
        />

        {query && (
          <ul className="absolute z-10 bg-white w-full border mt-1 rounded-xl max-h-60 overflow-y-auto shadow-lg">
            {filteredTeachers.length > 0 ? (
              filteredTeachers.map((teacher) => (
                <li
                  key={teacher.id}
                  className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
                  onClick={() => {
                    setSelectedTeacher(teacher); // ✅ ใช้ object
                    setQuery(""); // เคลียร์ dropdown
                    onSelect(teacher); // ส่งออก
                  }}
                >
                  {teacher.fullName}
                </li>
              ))
            ) : (
              <li className="px-4 py-2 text-gray-500">ไม่พบครูที่ค้นหา</li>
            )}
          </ul>
        )}

        {selectedTeacher && (
          <button
            type="button"
            onClick={() => {
              setSelectedTeacher(null);
              setQuery("");
            }}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-red-500"
          >
            x
          </button>
        )}
      </div>
    </div>
  );
};

export default DropdownTeacher;
