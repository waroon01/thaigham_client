const FormStudent = () => {
  return (
    <div id="add-student-content" className="content-section">
    <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
      <h2 className="text-xl font-bold text-purple-700 mb-6">
        📘 เพิ่มข้อมูลนักเรียนใหม่
      </h2>
      <form id="add-student-form" className="space-y-6">
        {/* 🧑‍🎓 ข้อมูลนักเรียน */}
        <div className="p-6">
          <h3 className="text-md font-semibold text-gray-700 mb-2 border-b pb-1">
            🧑‍🎓 ข้อมูลนักเรียน
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-600 mb-1 block">
                รหัสนักเรียน
              </label>
              <input
                type="text"
                placeholder="เช่น 65001"
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600 mb-1 block">
                เลขประจำตัวประชาชน
              </label>
              <input
                type="text"
                placeholder="เช่น 1234567890123"
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600 mb-1 block">
                ชื่อ
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600 mb-1 block">
                นามสกุล
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600 mb-1 block">
                เพศ
              </label>
              <select className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition">
                <option value="">เลือกเพศ</option>
                <option value="male">ชาย</option>
                <option value="female">หญิง</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600 mb-1 block">
                วันเดือนปีเกิด
              </label>
              <input
                type="date"
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600 mb-1 block">
                ระดับชั้น
              </label>
              <select className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition">
                <option value="">เลือกระดับชั้น</option>
                <option value="m1/1">ม.1/1</option>
                <option value="m1/2">ม.1/2</option>
                <option value="m1/3">ม.1/3</option>
                <option value="m2/1">ม.2/1</option>
                <option value="m2/2">ม.2/2</option>
                <option value="m2/3">ม.2/3</option>
                <option value="m3/1">ม.3/1</option>
                <option value="m3/2">ม.3/2</option>
                <option value="m3/3">ม.3/3</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600 mb-1 block">
                เบอร์โทรศัพท์
              </label>
              <input
                type="tel"
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600 mb-1 block">
                อีเมล
              </label>
              <input
                type="email"
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
              />
            </div>
          </div>
        </div>
        {/* 👨‍👩‍👧 ข้อมูลผู้ปกครอง */}
        <div className="p-6">
          <h3 className="text-md font-semibold text-gray-700 mb-2 border-b pb-1">
            👨‍👩‍👧 ข้อมูลผู้ปกครอง
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-600 mb-1 block">
                ชื่อผู้ปกครอง
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600 mb-1 block">
                เบอร์โทรผู้ปกครอง
              </label>
              <input
                type="tel"
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
              />
            </div>
            <div className="md:col-span-2">
              <label className="text-sm font-medium text-gray-600 mb-1 block">
                ที่อยู่
              </label>
              <textarea
                rows={3}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                defaultValue={""}
              />
            </div>
          </div>
        </div>
        {/* 📄 ข้อมูลเพิ่มเติม */}
        <div className="p-6">
          <h3 className="text-md font-semibold text-gray-700 mb-2 border-b pb-1">
            📄 ข้อมูลเพิ่มเติม
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-600 mb-1 block">
                สถานะ
              </label>
              <select className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition">
                <option value="active">กำลังศึกษา</option>
                <option value="pending">รอเอกสาร</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600 mb-1 block">
                วันที่ลงทะเบียน
              </label>
              <input
                type="date"
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
              />
            </div>
          </div>
        </div>
        {/* ปุ่ม */}
        <div className="flex justify-end gap-2 pt-4 border-t mt-4">
          <button
            type="button"
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm px-4 py-2 rounded-lg font-medium"
          >
            ยกเลิก
          </button>
          <button
            type="submit"
            className="bg-purple-600 hover:bg-purple-700 text-white text-sm px-4 py-2 rounded-lg font-medium"
          >
            บันทึกข้อมูล
          </button>
        </div>
      </form>
    </div>
  </div>
  )
}
export default FormStudent