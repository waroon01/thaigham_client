import { useEffect, useState } from "react";
import useSchoolStore from "../../store/school-Store";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const ExportExcel = () => {
  const actionLoadStudent = useSchoolStore((state) => state.actionLoadStudent);
  const students = useSchoolStore((state) => state.students);

  const [availableKeys, setAvailableKeys] = useState([]);
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [searchLevel, setSearchLevel] = useState("");
  const [searchRoom, setSearchRoom] = useState("");

  useEffect(() => {
    actionLoadStudent();
  }, []);

  useEffect(() => {
    if (students.length > 0) {
      const keys = Object.keys(students[0]);
      setAvailableKeys(keys);

      // ตั้งค่าให้เช็คแค่ 4 คอลัมน์นี้ตอนแรก
      const defaultSelected = ["code_citizen", "prefix_name", "first_name", "last_name"];
      setSelectedKeys(defaultSelected);
    }
  }, [students]);

  const toggleKey = (key) => {
    setSelectedKeys((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  const filteredStudents = students.filter((student) => {
    const matchLevel = searchLevel
      ? student.class_level?.toLowerCase().includes(searchLevel.toLowerCase())
      : true;

    const matchRoom = searchRoom
      ? student.class_room?.toLowerCase().includes(searchRoom.toLowerCase())
      : true;

    return matchLevel && matchRoom;
  });

  const handleExport = () => {
    if (selectedKeys.length === 0) {
      alert("กรุณาเลือกอย่างน้อย 1 คอลัมน์");
      return;
    }

    const filteredData = filteredStudents.map((student) => {
      let obj = {};
      selectedKeys.forEach((key) => {
        obj[key] = student[key];
      });
      return obj;
    });

    const ws = XLSX.utils.json_to_sheet(filteredData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Students");

    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(data, "students.xlsx");
  };

  return (
    <div className="p-4">
      <h2 className="font-bold mb-2">เลือกคอลัมน์ที่ต้องการส่งออก</h2>
      <div className="grid grid-cols-4 gap-2 mb-4">
        {availableKeys.map((key) => (
          <label key={key} className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={selectedKeys.includes(key)}
              onChange={() => toggleKey(key)}
            />
            <span>{key}</span>
          </label>
        ))}
      </div>

      <div className="mb-4 grid grid-cols-2 gap-2">
        <input
          type="text"
          placeholder="ค้นหาตามระดับชั้น เช่น อ.2"
          value={searchLevel}
          onChange={(e) => setSearchLevel(e.target.value)}
          className="border px-3 py-2 rounded w-full"
        />
        <input
          type="text"
          placeholder="ค้นหาตามห้อง เช่น 1"
          value={searchRoom}
          onChange={(e) => setSearchRoom(e.target.value)}
          className="border px-3 py-2 rounded w-full"
        />
      </div>

      <div className="overflow-x-auto mb-4">
        <table className="table-auto border-collapse border border-gray-300 w-full text-sm">
          <thead>
            <tr>
              {selectedKeys.map((key) => (
                <th key={key} className="border px-2 py-1 bg-gray-100">
                  {key}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student, idx) => (
              <tr key={idx}>
                {selectedKeys.map((key) => (
                  <td key={key} className="border px-2 py-1">
                    {student[key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button
        onClick={handleExport}
        className="px-4 py-2 bg-green-600 text-white rounded"
      >
        ส่งออก Excel
      </button>
    </div>
  );
};

export default ExportExcel;
