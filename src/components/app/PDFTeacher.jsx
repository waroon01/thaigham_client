import { useState } from "react";
import { Printer } from "lucide-react";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.vfs;

const PDFTeacher = ({ filteredTeachers }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activityName, setActivityName] = useState("");

  pdfMake.fonts = {
    THSarabunNew: {
      normal: "https://guykorat.github.io/font/THSarabunNew.ttf",
      bold: "https://guykorat.github.io/font/Sarabun-ExtraBold.ttf",
    },
  };

  const renderPDF = () => {
    const imageLogo =
      "https://dl.dropbox.com/scl/fi/2w2xhnkx6ntvtb754isxz/EmbeddedImage.png?rlkey=e49pdzkmgn2bz0s2zlgfbq4a5&st=rrw9q56v&dl=0";

    const tableBody = [
      [
        { text: "#", bold: true, alignment: "center", style: "tableHeader" },
        { text: "ชื่อ - นามสกุล", bold: true, style: "tableHeader" },
        { text: "วิทยฐานะ", bold: true, style: "tableHeader" },
        { text: "ตำแหน่ง", bold: true, style: "tableHeader" },
        { text: "ลงชื่อ", bold: true, style: "tableHeader" },
      ],
      ...filteredTeachers.map((s, i) => [
        { text: i + 1, alignment: "center" },
        { text: `${s.fullName || ""}`, alignment: "left" },
        { text: s.position || "-", alignment: "center" },
        { text: s.role || "-", alignment: "center" },
        { text: "" },
      ]),
    ];

    const content = [
      {
        image: "logo",
        fit: [50, 50],
        alignment: "center",
        margin: [0, 15, 0, 0],
      },
      { text: "โรงเรียนชุมชนวัดไทยงาม", style: "header", alignment: "center" },
      { text: `ใบรายชื่อ`, style: "header", alignment: "center" },
    ];

    if (activityName.trim()) {
      content.push({
        text: `${activityName}`,
        alignment: "center",
        style: "header",
      });
    }

    content.push({
      table: {
        headerRows: 1,
        widths: ["auto", "27%", "auto", "auto", "25%"],
        body: tableBody,
      },
    });

    const docDefinition = {
      pageMargins: [25, 20, 30, 30],
      images: { logo: imageLogo },
      content,
      defaultStyle: {
        lineHeight: 1,
        font: "THSarabunNew",
        fontSize: 16,
      },
      styles: {
        tableHeader: {
          fontSize: 12,
          font: "THSarabunNew",
          alignment: "center",
          margin: [0, 5, 0, 5],
        },
        header: {
          bold: true,
          fontSize: 12,
          margin: [0, 0, 0, 6],
        },
      },
    };

    pdfMake.createPdf(docDefinition).open();
  };

  const handleGenerateClick = () => {
    setIsModalOpen(false);
    renderPDF();
  };

  return (
    <div>
      <button
        className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 cursor-pointer"
        onClick={() => setIsModalOpen(true)}
      >
        <Printer color="#e9c1ec" /> รายชื่อ
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-[90%] max-w-md shadow-lg">
            <h2 className="text-lg font-semibold mb-4 text-center">
              กรอกชื่อกิจกรรม (ถ้ามี)
            </h2>
            <input
              type="text"
              value={activityName}
              onChange={(e) => setActivityName(e.target.value)}
              placeholder="เช่น กิจกรรมวันครู"
              className="w-full p-2 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 text-gray-800"
              >
                ยกเลิก
              </button>
              <button
                onClick={handleGenerateClick}
                className="px-4 py-2 rounded bg-purple-600 hover:bg-purple-700 text-white"
              >
                สร้าง PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PDFTeacher;
