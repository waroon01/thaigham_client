// src/components/PDFGenerator.js

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { Printer } from 'lucide-react';
pdfMake.vfs = pdfFonts.vfs; // ✅ ใช้ vfs ตรงนี้ ไม่ใช่ pdfFonts.pdfMake.vfs


const PDFGenerator = ({filteredStudents}) => {
    // console.log("pdf ",filteredStudents)
    pdfMake.fonts = {
        THSarabunNew: {
          normal: 'https://guykorat.github.io/font/THSarabunNew.ttf',
          bold: 'https://guykorat.github.io/font/Sarabun-ExtraBold.ttf',
        },
        Charm: {
          normal: 'https://guykorat.github.io/font/Charm-Bold.ttf',
          bold: 'https://guykorat.github.io/font/Charm-Regular.ttf',
        },
        Prompt: {
          normal: 'https://guykorat.github.io/font/Prompt-Regular.ttf',
          bold: 'https://guykorat.github.io/font/Prompt-Bold.ttf',
        },
      };   

  // ฟังก์ชันสำหรับสร้างและดาวน์โหลด PDF
  const generatePDF = () => {
    const tableBody = [
        [
          { text: 'ลำดับ', bold: true, alignment: 'center' },
          { text: 'เลขประจำตัว', bold: true, alignment: 'center' },
          { text: 'เลขบัตรประชาชน', bold: true, alignment: 'center' },
          { text: 'ชื่อ - นามสกุล', bold: true },
          { text: 'ห้อง', bold: true, alignment: 'center' },
        ],
        ...filteredStudents.map((s, i) => [
          { text: i + 1, alignment: 'center' }, // ลำดับ
          { text: s.student_number || 'ไม่ระบุ', alignment: 'center' }, // เลขประจำตัว
          { text: s.code_citizen || 'ไม่ระบุ', alignment: 'center' }, // เลขบัตรประชาชน
          `${s.prefix_name || ''} ${s.first_name || ''} ${s.last_name || ''}`, // ชื่อ - นามสกุล
          { text: `${s.class_level || ''}/${s.class_room || ''}`, alignment: 'center' }, // ห้อง
        ]),
      ];
      
      
      const docDefinition = {
        content: [
          {
            table: {
              headerRows: 1,
              widths: ['auto', 'auto', 'auto', 'auto', 'auto'], // กำหนดความกว้างของแต่ละคอลัมน์ให้ตรงกับ tableBody
              body: tableBody,
            },
          },
        ],
        defaultStyle: {
          font: 'THSarabunNew',
        },
      };
      
  
      pdfMake.createPdf(docDefinition).open();
  };

  return (
    <>
        <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 cursor-pointer" onClick={generatePDF}>
          <Printer color="#e9c1ec" /> รายชื่อ
        </button>
    </>
  );
};

export default PDFGenerator;
