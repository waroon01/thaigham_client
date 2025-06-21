import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationPrevious, PaginationNext, PaginationEllipsis } from "@/components/ui/pagination";
import { useEffect, useState } from "react";
import useSchoolStore from "../../store/school-Store";
import { useNavigate } from "react-router";

const Homeuser = () => {
  const actionLoadStudent = useSchoolStore((state)=>state.actionLoadStudent)
  const students = useSchoolStore((state)=>state.students)
  console.log(students)

  const navigate = useNavigate();

 
  const [currentPage, setCurrentPage] = useState(1);
  const [studentsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");



  useEffect(() => {
    actionLoadStudent();
  }, []);

  const filteredStudents = students?.filter((student) => {
    const fullName = `${student.prefix_name}${student.first_name} ${student.last_name}`;
    return fullName.toLowerCase().includes(searchQuery.toLowerCase());
  }) || [];

  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = filteredStudents.slice(indexOfFirstStudent, indexOfLastStudent);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);

  const renderPaginationItems = () => {
    let paginationItems = [];
    paginationItems.push(
      <PaginationItem key={1}>
        <PaginationLink
          href="#"
          className={`px-4 py-2 rounded-lg ${currentPage === 1 ? "bg-blue-600 text-white text-xs" : "bg-gray-100 text-gray-800 text-xs"}`}
          onClick={(e) => {
            e.preventDefault();
            paginate(1);
          }}
        >
          1
        </PaginationLink>
      </PaginationItem>
    );

    if (totalPages > 4 && currentPage > 3) {
      paginationItems.push(
        <PaginationItem key="ellipsis-1">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }

    const pageNumbers = [];
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      pageNumbers.push(i);
    }

    pageNumbers.forEach((page) => {
      paginationItems.push(
        <PaginationItem key={page}>
          <PaginationLink
            href="#"
            className={`px-4 py-2 rounded-lg ${currentPage === page ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-800"}`}
            onClick={(e) => {
              e.preventDefault();
              paginate(page);
            }}
          >
            {page}
          </PaginationLink>
        </PaginationItem>
      );
    });

    if (totalPages > 4 && currentPage < totalPages - 2) {
      paginationItems.push(
        <PaginationItem key="ellipsis-2">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }

    if (totalPages > 1) {
      paginationItems.push(
        <PaginationItem key={totalPages}>
          <PaginationLink
            href="#"
            className={`px-4 py-2 rounded-lg ${currentPage === totalPages ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-800"}`}
            onClick={(e) => {
              e.preventDefault();
              paginate(totalPages);
            }}
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return paginationItems;
  };
  
  const handleEdit = (student) => {
    navigate("/user/editstudent", { state: { student } }); // ส่ง object ไปแบบ props
  };


  return (
    <div className="flex justify-center mt-6">
      <div className="max-w-4xl w-full overflow-x-auto shadow-xl rounded-lg bg-white">
        {/* แถบค้นหา */}
        <div className="mb-6 px-4 py-2">
          <input
            type="text"
            placeholder="ค้นหาชื่อนักเรียน..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md w-full shadow-md focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <h4 className="mb-3 mx-4">รายชื่อนักเรียน</h4>

        <Table className="min-w-full bg-white border border-gray-300 shadow-sm">
          <TableHeader>
            <TableRow className="bg-gray-100 text-gray-700 text-xs">
              <TableHead className="w-[100px] text-left py-3 px-6">รหัสประจำตัว</TableHead>
              <TableHead className="text-left py-3 px-6">ชื่อ-สกุล</TableHead>
              <TableHead className="text-left py-3 px-6">ชั้น/ปี</TableHead>
              <TableHead className="text-right py-3 px-6">ห้อง</TableHead>
              <TableHead className="text-right py-3 px-6">แก้ไข</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody >
            {currentStudents.map((student, index) => (
              <TableRow key={index} className="hover:bg-gray-50 text-xs">
                <TableCell className="py-3 px-6 font-medium text-gray-800">{student.student_number}</TableCell>
                <TableCell className="py-3 px-6 text-gray-600">{`${student.prefix_name}${student.first_name}  ${student.last_name}`}</TableCell>
                <TableCell className="py-3 px-6 text-gray-600">{student.class_level}</TableCell>
                <TableCell className="text-right py-3 px-6 text-green-600 font-semibold">{student.class_room}</TableCell>
                <TableCell className="text-right py-3 px-6 text-green-600 font-semibold"><button onClick={() => handleEdit(student)}>แก้ไข</button></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="my-6 px-4 py-2">
          <Pagination className="mt-4 flex justify-center">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (currentPage > 1) paginate(currentPage - 1);
                  }}
                  className="px-4 py-2 text-blue-600 hover:bg-blue-200"
                />
              </PaginationItem>

              {renderPaginationItems()}

              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (currentPage < totalPages) paginate(currentPage + 1);
                  }}
                  className="px-4 py-2 text-blue-600 hover:bg-blue-200"
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  );
};

export default Homeuser;
