import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import FormDynamic2 from "../../components/app/FormDynamic2";
import { studentSchema } from "../../utils/formSchema";
import { zodResolver } from "@hookform/resolvers/zod";
// import { createStudentData } from "../../api/studentApi"; // ฟังก์ชันใหม่สำหรับเพิ่มข้อมูล
import { toast } from "sonner";
import { useNavigate } from "react-router";
import { createStudentData } from "../../api/studentApi";

export function FormAddStudent({ className, ...props }) {
  const navigate = useNavigate();

  // 👉 ใช้ useForm สำหรับเพิ่มข้อมูลใหม่
  const form = useForm({
    resolver: zodResolver(studentSchema),
    mode: "onChange",
    defaultValues: {
      class_level: "",
      class_room: "",
      student_number: "",
      code_citizen: "",
      gender: "",
      prefix_name: "",
      first_name: "",
      last_name: "",
      birth_date: undefined,
      religion: "",
      ethnicity: "",
      nationality: "",
      guardian_first_name: "",
      guardian_last_name: "",
      guardian_relation: "",
      father_first_name: "",
      father_last_name: "",
      mother_first_name: "",
      mother_last_name: "",
      status: "",
      note: "",
    },
  });

  const fields = [
    {
      name: "class_level",
      label: "ระดับชั้น",
      type: "select",
      placeholder: "เลือกระดับชั้น",
      options: [
        { label: "อ.1", value: "อ.1" },
        { label: "อ.2", value: "อ.2" },
        { label: "อ.3", value: "อ.3" },
        { label: "ป.1", value: "ป.1" },
        { label: "ป.2", value: "ป.2" },
        { label: "ป.3", value: "ป.3" },
        { label: "ป.4", value: "ป.4" },
        { label: "ป.5", value: "ป.5" },
        { label: "ป.6", value: "ป.6" },
        { label: "ม.1", value: "ม.1" },
        { label: "ม.2", value: "ม.2" },
        { label: "ม.3", value: "ม.3" },
      ],
    },
    { name: "class_room", label: "ห้องเรียน", type: "text", placeholder: "ป้อนห้องเรียน" },
    { name: "student_number", label: "รหัสนักเรียน", type: "text", placeholder: "รหัสนักเรียน" },
    { name: "code_citizen", label: "เลขประจำตัวประชาชน", type: "text", placeholder: "ป้อนรหัสบัตรประชาชน 13 หลัก" },
    { name: "gender", label: "เพศ", type: "text", placeholder: "ช,ญ" },
    { name: "prefix_name", label: "คำนำหน้า", type: "text", placeholder: "คำนำหน้าชื่อ" },
    { name: "first_name", label: "ชื่อ", type: "text", placeholder: "ชื่อจริง" },
    { name: "last_name", label: "นามสกุล", type: "text", placeholder: "นามสกุล" },
    { name: "birth_date", label: "วันเกิด", type: "date", placeholder: "" },
    { name: "religion", label: "ศาสนา", type: "text", placeholder: "พุทธ" },
    { name: "ethnicity", label: "เชื้อชาติ", type: "text", placeholder: "ไทย" },
    { name: "nationality", label: "สัญชาติ", type: "text", placeholder: "ไทย" },
    { name: "guardian_first_name", label: "ชื่อผู้ปกครอง", type: "text", placeholder: "ชื่อผู้ปกครอง" },
    { name: "guardian_last_name", label: "นามสกุลผู้ปกครอง", type: "text", placeholder: "นามสกุล" },
    { name: "guardian_relation", label: "ความสัมพันธ์", type: "text", placeholder: "เช่น มารดา", colSpan: "col-span-2" },
    { name: "father_first_name", label: "ชื่อบิดา", type: "text", placeholder: "ชื่อบิดา" },
    { name: "father_last_name", label: "นามสกุลบิดา", type: "text", placeholder: "นามสกุล" },
    { name: "mother_first_name", label: "ชื่อมารดา", type: "text", placeholder: "ชื่อมารดา" },
    { name: "mother_last_name", label: "นามสกุลมารดา", type: "text", placeholder: "นามสกุล" },
    {
      name: "status",
      label: "สถานะนักเรียน",
      type: "select",
      placeholder: "เลือกสถานะ",
      options: [
        { label: "กำลังศึกษา", value: "กำลังศึกษา" },
        { label: "ย้ายโรงเรียน", value: "ย้ายโรงเรียน" },
      ],
    },
    { name: "note", label: "บันทึกเพิ่มเติม", type: "textarea", placeholder: "สถานะ" },
  ];

  const hdlAdd = async (dataStudent) => {
    try {
        // console.log(dataStudent)
      const res = await createStudentData(dataStudent);
      // console.log(res)
      toast.success("Success! 🎉", {
        description: "เพิ่มข้อมูลนักเรียนสำเร็จ",
      });
      navigate('/admin/manage'); // เปลี่ยนเส้นทางหลังจากเพิ่มข้อมูลสำเร็จ
    } catch (error) {
      // console.log(error);
      const errMsg = error.response.data?.message;
      toast.error(errMsg || "เกิดข้อผิดพลาดในการเพิ่มข้อมูล");
    }
  };

  return (
    <div className={`flex mt-3 justify-center p-4 ${className}`} {...props}>
      <div className="w-full max-w-6xl">
        <Card>
          <CardHeader>
            <CardTitle>เพิ่มข้อมูลนักเรียน</CardTitle>
            <CardDescription>กรอกข้อมูลใหม่เพื่อเพิ่มนักเรียน</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form className="space-y-4" onSubmit={form.handleSubmit(hdlAdd)}>
                <FormDynamic2 fields={fields} form={form} />
                <Button type="submit" className="w-full mt-3" variant="custombt">
                  บันทึก
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default FormAddStudent;
