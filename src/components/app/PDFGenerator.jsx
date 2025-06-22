// src/components/PDFGenerator.js

import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { Printer } from "lucide-react";
pdfMake.vfs = pdfFonts.vfs; // ✅ ใช้ vfs ตรงนี้ ไม่ใช่ pdfFonts.pdfMake.vfs

const PDFGenerator = ({ filteredStudents }) => {
  // console.log("pdf ",filteredStudents)
  pdfMake.fonts = {
    THSarabunNew: {
      normal: "https://guykorat.github.io/font/THSarabunNew.ttf",
      bold: "https://guykorat.github.io/font/Sarabun-ExtraBold.ttf",
    },
    Charm: {
      normal: "https://guykorat.github.io/font/Charm-Bold.ttf",
      bold: "https://guykorat.github.io/font/Charm-Regular.ttf",
    },
    Prompt: {
      normal: "https://guykorat.github.io/font/Prompt-Regular.ttf",
      bold: "https://guykorat.github.io/font/Prompt-Bold.ttf",
    },
  };

  // ฟังก์ชันสำหรับสร้างและดาวน์โหลด PDF
  const generatePDF = () => {
    const imageLogo =
      "https://dl.dropbox.com/scl/fi/2w2xhnkx6ntvtb754isxz/EmbeddedImage.png?rlkey=e49pdzkmgn2bz0s2zlgfbq4a5&st=rrw9q56v&dl=0";
    const tableBody = [
      [
        {
          text: "ลำดับ",
          bold: true,
          alignment: "center",
          style: "tableHeader",
        },
        {
          text: "เลขประจำตัว",
          bold: true,
          alignment: "center",
          style: "tableHeader",
        },
        {
          text: "เลขบัตรประชาชน",
          bold: true,
          alignment: "center",
          style: "tableHeader",
        },
        { text: "ชื่อ - นามสกุล", bold: true, style: "tableHeader" },
        { text: "หมายเหตุ", bold: true, style: "tableHeader" },
      ],
      ...filteredStudents.map((s, i) => [
        { text: i + 1, alignment: "center" }, // ลำดับ
        { text: s.student_number || "ไม่ระบุ", alignment: "center" }, // เลขประจำตัว
        { text: s.code_citizen || "ไม่ระบุ", alignment: "center" }, // เลขบัตรประชาชน
        { text: `${s.prefix_name || ""} ${s.first_name || ""} ${s.last_name || ""}`, alignment: "left" },
        { text: ""}
        // {
        //   text: `${s.class_level || ""}/${s.class_room || ""}`,
        //   alignment: "center",
        // }, // ห้อง
      ]),
    ];

    const docDefinition = {
      pageMargins: [50, 30, 30, 30],
      images: {
        logo: imageLogo,
      },
      content: [
        {
          image: "logo",
          fit: [50, 50],
          alignment: "center",
          margin: [0, 15, 0, 0],
        },
        {
          text: "โรงเรียนชุมชนวัดไทยงาม",
          style: "header",
          alignment: "center",
        },
        {
          text: `ใบรายชื่อนักเรียน ระดับชั้น: ${filteredStudents[0].class_level} ห้อง: ${filteredStudents[0].class_room}`,
          style: "header",
          alignment: "center",
        },
        {
          table: {
            headerRows: 1,
            widths: ["auto", "auto", "auto", "*", "22%"], // กำหนดความกว้างของแต่ละคอลัมน์ให้ตรงกับ tableBody
            body: tableBody,
          },
        },
      ],
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
          margin: [0, 5, 0, 5] 
        },
        header: {
          bold: true,
          fontSize: 11,
          margin: [0, 0, 0, 6],
        },
      },
    };

    pdfMake.createPdf(docDefinition).open();
  };

  return (
    <>
      <button
        className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 cursor-pointer"
        onClick={generatePDF}
      >
        <Printer color="#e9c1ec" /> รายชื่อ
      </button>
    </>
  );
};

export default PDFGenerator;
