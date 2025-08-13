import { useEffect, useState } from "react";
import useSchoolStore from "../../store/school-Store";
import { useNavigate } from "react-router";
import PDFGenerator from "../../components/app/PDFGenerator";
import { updateStudentData } from "../../api/studentApi";
import { toast } from "sonner";

const ITEMS_PER_PAGE = 10;

const Manage = () => {
  const actionLoadStudent = useSchoolStore((state) => state.actionLoadStudent);
  const students = useSchoolStore((state) => state.students);
  console.log("students ", students);
  const token = useSchoolStore((state) => state.token);

  const navigate = useNavigate();

  const [searchText, setSearchText] = useState("");
  const [filterClass, setFilterClass] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [editStatusId, setEditStatusId] = useState(null); // เปลี่ยนชื่อเป็น editStatusCitizen ถ้าต้องการให้สื่อความ
  const [editedStatus, setEditedStatus] = useState({});

  useEffect(() => {
    actionLoadStudent();
  }, []);

  const filteredStudents = students.filter((s) => {
    const fullName = `${s.first_name || ""} ${s.last_name || ""}`
      .trim()
      .toLowerCase();
    const studentNumber = s.student_number?.toLowerCase() || "";
    const codeCitizen = s.code_citizen?.toLowerCase() || "";
    const query = searchText.toLowerCase();

    const matchesSearch =
      fullName.includes(query) ||
      studentNumber.includes(query) ||
      codeCitizen.includes(query);

    const matchesClass = filterClass === "" || s.class_level === filterClass;
    const matchesStatus = filterStatus === "" || s.status === filterStatus;

    return matchesSearch && matchesClass && matchesStatus;
  });

  const totalPages = Math.ceil(filteredStudents.length / ITEMS_PER_PAGE);
  const paginatedStudents = filteredStudents.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleViewStudent = (student) => {
    setSelectedStudent(student);
    setShowModal(true);
  };

  const handleStartEditStatus = (student_id, status) => {
    setEditStatusId(student_id);
    setEditedStatus((prev) => ({
      ...prev,
      [student_id]: status,
    }));
  };

  const handleSaveStatus = async (student) => {
    const student_id = student.student_id;
    const newStatus = editedStatus[student_id];
    console.log(token);

    try {
      const res = await updateStudentData(
        student_id,
        { status: newStatus },
        token
      );
      console.log(res);

      console.log("res  ", res);
      toast.success("success! 🎉", {
        description: "Edit student successfull.",
      });

      console.log("editedStatus", editedStatus);

      setEditStatusId(null);
      setEditedStatus((prev) => {
        const copy = { ...prev };
        delete copy[student_id];
        return copy;
      });

      actionLoadStudent(); // โหลดข้อมูลใหม่จาก backend
    } catch (error) {
      console.error("เกิดข้อผิดพลาด:", error);
      alert("ไม่สามารถอัปเดตสถานะได้");
    }
  };

  const handleEdit = (student) => {
    navigate("/admin/formedit", { state: { student } });
  };

  const addStudent = () => {
    navigate("/admin/formadd");
  };

  return (
    <div className="content-section">
      <div className="bg-white rounded-lg shadow p-5">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">
            รายชื่อนักเรียนทั้งหมด
          </h2>
          <div className="flex space-x-2">
            <div className="relative mr-4">
              <input
                type="text"
                placeholder="ค้นหานักเรียน"
                value={searchText}
                onChange={(e) => {
                  setSearchText(e.target.value);
                  setCurrentPage(1);
                }}
                className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400 absolute left-3 top-2.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>

            <select
              value={filterClass}
              onChange={(e) => setFilterClass(e.target.value)}
              className="px-3 py-2 border rounded-lg border-gray-300"
            >
              <option value="">ทุกระดับชั้น</option>
              {[
                "อ.1",
                "อ.2",
                "ป.1",
                "ป.2",
                "ป.3",
                "ป.4",
                "ป.5",
                "ป.6",
                "ม.1",
                "ม.2",
                "ม.3",
              ].map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border rounded-lg border-gray-300"
            >
              <option value="">ทุกสถานะ</option>
              <option value="กำลังศึกษา">กำลังศึกษา</option>
              <option value="pending">รอเอกสาร</option>
              <option value="graduated">จบการศึกษา</option>
              <option value="ย้ายโรงเรียน">ย้ายโรงเรียน</option>
            </select>

            <button
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center"
              onClick={addStudent}
            >
              <svg
                className="h-5 w-5 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              เพิ่มนักเรียน
            </button>
            <PDFGenerator filteredStudents={filteredStudents} />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-purple-50">
              <tr>
                <th className="px-4 py-2">รหัสนักเรียน</th>
                <th className="px-4 py-2">รหัสบัตรประชาชน</th>
                <th className="px-4 py-2">ชื่อนักเรียน</th>
                <th className="px-4 py-2">ระดับชั้น</th>
                <th className="px-4 py-2">เพศ</th>
                <th className="px-4 py-2">อายุ</th>
                <th className="px-4 py-2">สถานะ</th>
                <th className="px-4 py-2 flex justify-center">จัดการ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {paginatedStudents.map((s, i) => (
                <tr key={s.id || i}>
                  <td className="px-4 py-2">{s.student_number}</td>
                  <td className="px-4 py-2 text-center">
                    {s.code_citizen || "-"}
                  </td>
                  <td className="px-4 py-2 text-center">
                    {s.first_name} {s.last_name}
                  </td>
                  <td className="px-4 py-2 text-center">{s.class_level}</td>
                  <td className="px-4 py-2 text-center">{s.gender}</td>
                  <td className="px-4 py-2 text-center">{s.age_years}</td>
                  {/* สถานะ */}
                  <td className="px-4 py-2 text-center">
                    {editStatusId === s.student_id ? (
                      <select
                        value={editedStatus[s.student_id]}
                        onChange={(e) =>
                          setEditedStatus((prev) => ({
                            ...prev,
                            [s.student_id]: e.target.value,
                          }))
                        }
                        className="border rounded px-2 py-1"
                      >
                        <option value="กำลังศึกษา">กำลังศึกษา</option>
                        <option value="pending">รอเอกสาร</option>
                        <option value="graduated">จบการศึกษา</option>
                        <option value="ย้ายโรงเรียน">ย้ายโรงเรียน</option>
                      </select>
                    ) : (
                      s.status
                    )}
                  </td>
                  <td className="px-4 py-2 text-center">
                    <div className="flex space-x-2 justify-center">
                      {editStatusId === s.student_id ? (
                        <button
                          onClick={() => handleSaveStatus(s)}
                          className="text-green-600 hover:underline hover:cursor-pointer"
                        >
                          <div>
                            <svg
                              fill="#bd2e2e"
                              version="1.1"
                              id="Capa_1"
                              xmlns="http://www.w3.org/2000/svg"
                              xmlnsXlink="http://www.w3.org/1999/xlink"
                              viewBox="0 0 407.096 407.096"
                              xmlSpace="preserve"
                              className="w-6 h-6"
                            >
                              <g id="SVGRepo_iconCarrier">
                                <g>
                                  <g>
                                    <path d="M402.115,84.008L323.088,4.981C319.899,1.792,315.574,0,311.063,0H17.005C7.613,0,0,7.614,0,17.005v373.086 c0,9.392,7.613,17.005,17.005,17.005h373.086c9.392,0,17.005-7.613,17.005-17.005V96.032 C407.096,91.523,405.305,87.197,402.115,84.008z M300.664,163.567H67.129V38.862h233.535V163.567z" />
                                    <path d="M214.051,148.16h43.08c3.131,0,5.668-2.538,5.668-5.669V59.584c0-3.13-2.537-5.668-5.668-5.668h-43.08 c-3.131,0-5.668,2.538-5.668,5.668v82.907C208.383,145.622,210.92,148.16,214.051,148.16z" />
                                  </g>
                                </g>
                              </g>
                            </svg>
                          </div>
                        </button>
                      ) : (
                        <button
                          onClick={() =>
                            handleStartEditStatus(s.student_id, s.status)
                          }
                          className="text-yellow-600 hover:underline hover:cursor-pointer"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-green-600"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                            />
                          </svg>
                        </button>
                      )}

                      <button
                        onClick={() => handleViewStudent(s)}
                        className="p-1 rounded-full hover:bg-purple-100 hover:cursor-pointer"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-purple-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                      </button>
                      <button
                        className="p-1 rounded-full hover:bg-blue-100 hover:cursor-pointer"
                        onClick={() => handleEdit(s)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-blue-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                          />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {paginatedStudents.length === 0 && (
                <tr>
                  <td colSpan="8" className="text-center text-gray-500 py-4">
                    ไม่พบข้อมูล
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="mt-4 flex justify-between items-center">
          <div className="text-sm text-gray-600">
            หน้า {currentPage} จาก {totalPages}
          </div>
          <div className="flex space-x-1">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 border rounded disabled:opacity-30"
            >
              ก่อนหน้า
            </button>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="px-3 py-1 border rounded disabled:opacity-30"
            >
              ถัดไป
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && selectedStudent && (
        <div
          className="fixed inset-0 bg-black/50 flex justify-center items-center z-50"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-white rounded-lg shadow-lg p-6 max-w-2xl w-full relative"
            onClick={(e) => e.stopPropagation()} // ป้องกันปิดเมื่อคลิกในกล่อง
          >
            <h2 className="text-xl font-bold text-purple-700 mb-4">
              ข้อมูลนักเรียน
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              {/* ข้อมูลทั่วไป */}
              <div>
                <p>
                  <strong>ชื่อ:</strong> {selectedStudent.prefix_name}{" "}
                  {selectedStudent.first_name} {selectedStudent.last_name}
                </p>
                <p>
                  <strong>รหัสนักเรียน:</strong>{" "}
                  {selectedStudent.student_number}
                </p>
                <p>
                  <strong>เลขประจำตัวประชาชน:</strong>{" "}
                  {selectedStudent.code_citizen || "-"}
                </p>
                <p>
                  <strong>วันเกิด:</strong>{" "}
                  {new Date(selectedStudent.birth_date).toLocaleDateString()}
                </p>
                <p>
                  <strong>อายุ:</strong> {selectedStudent.age_years} ปี
                </p>
                <p>
                  <strong>เพศ:</strong>{" "}
                  {selectedStudent.gender === "ช"
                    ? "ชาย"
                    : selectedStudent.gender === "ญ"
                    ? "หญิง"
                    : "-"}
                </p>
              </div>

              {/* ข้อมูลชั้นเรียน */}
              <div>
                <p>
                  <strong>ระดับชั้น:</strong> {selectedStudent.class_level}
                </p>
                <p>
                  <strong>ห้อง:</strong> {selectedStudent.class_room}
                </p>
                <p>
                  <strong>สถานะ:</strong> {selectedStudent.status}
                </p>
                <p>
                  <strong>ศาสนา:</strong> {selectedStudent.religion}
                </p>
                <p>
                  <strong>สัญชาติ:</strong> {selectedStudent.nationality}
                </p>
                <p>
                  <strong>เชื้อชาติ:</strong> {selectedStudent.ethnicity}
                </p>
              </div>

              {/* ข้อมูลผู้ปกครอง */}
              <div className="col-span-1 md:col-span-2 border-t pt-4 mt-2">
                <h3 className="text-md font-semibold text-gray-700 mb-2">
                  ข้อมูลผู้ปกครอง
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <p>
                    <strong>บิดา:</strong> {selectedStudent.father_first_name}{" "}
                    {selectedStudent.father_last_name}
                  </p>
                  <p>
                    <strong>มารดา:</strong> {selectedStudent.mother_first_name}{" "}
                    {selectedStudent.mother_last_name}
                  </p>
                  <p>
                    <strong>ผู้ปกครอง:</strong>{" "}
                    {selectedStudent.guardian_first_name}{" "}
                    {selectedStudent.guardian_last_name}
                  </p>
                  <p>
                    <strong>ความสัมพันธ์:</strong>{" "}
                    {selectedStudent.guardian_relation}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
              >
                ปิด
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Manage;
