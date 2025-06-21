import { useLocation, useNavigate } from "react-router";

// pages/About.jsx
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
import useSchoolStore from "../../store/school-Store";
import { updateStudentData } from "../../api/studentApi";
import { toast } from "sonner";

export function FormEditStudent({ className, ...props }) {
  const location = useLocation();
  const student = location.state?.student;  
  console.log(student)
  const token = useSchoolStore((state)=>state.token)
  const navigate = useNavigate()

  // console.log("token ",token)
  // 👉 เพิ่ม useForm ตรงนี้
  const form = useForm({
    resolver: zodResolver(studentSchema),
    mode: "onChange",    
    defaultValues: {
      class_level: student.class_level || "",
      class_room: student.class_room || "",
      student_number: student.student_number || "",
      code_citizen: student.code_citizen || "",
      gender: student.gender || "",
      prefix_name: student.prefix_name || "",
      first_name: student.first_name || "",
      last_name: student.last_name || "",
      birth_date: student.birth_date ? new Date(student.birth_date) : undefined, // ✅ FIXED!
      religion: student.religion || "",
      ethnicity: student.ethnicity || "",
      nationality: student.nationality || "",
      guardian_first_name: student.guardian_first_name || "",
      guardian_last_name: student.guardian_last_name || "",
      guardian_relation: student.guardian_relation || "",
      father_first_name: student.father_first_name || "",
      father_last_name: student.father_last_name || "",
      mother_first_name: student.mother_first_name || "",
      mother_last_name: student.mother_last_name || "",
      status: student.status || "",
      note: student.note || "",
      
    }
  });
  

  const fields = [
    // { name: "class_level", label: "ระดับชั้น", type: "text", placeholder: "อ.2", val: student.class_level },
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
      ],
    },
    { name: "class_room", label: "ห้องเรียน", type: "text", placeholder: "ป้อนห้องเรียน", val: student.class_room },
    { name: "student_number", label: "รหัสนักเรียน", type: "text", placeholder: "รหัสนักเรียน", val: student.student_number },
    { name: "code_citizen", label: "เลขประจำตัวประชาชน", type: "text", placeholder: "ป้อนรหัสบัตรประชาชน 13 หลัก", val: student.code_citizen },
    { name: "gender", label: "เพศ", type: "text", placeholder: "ช,ญ", val: student.gender },
    { name: "prefix_name", label: "คำนำหน้า", type: "text", placeholder: "คำนำหน้าชื่อ", val: student.prefix_name },
    { name: "first_name", label: "ชื่อ", type: "text", placeholder: "ชื่อจริง", val: student.first_name },
    { name: "last_name", label: "นามสกุล", type: "text", placeholder: "นามสกุล", val: student.last_name },
    { name: "birth_date", label: "วันเกิด", type: "date", placeholder: "", val: student.birth_date?.split("T")[0] },
    { name: "religion", label: "ศาสนา", type: "text", placeholder: "พุทธ", val: student.religion },
    { name: "ethnicity", label: "เชื้อชาติ", type: "text", placeholder: "ไทย", val: student.ethnicity },
    { name: "nationality", label: "สัญชาติ", type: "text", placeholder: "ไทย", val: student.ethnicity },
    { name: "guardian_first_name", label: "ชื่อผู้ปกครอง", type: "text", placeholder: "ชื่อผู้ปกครอง", val: student.guardian_first_name },
    { name: "guardian_last_name", label: "นามสกุลผู้ปกครอง", type: "text", placeholder: "นามสกุล", val: student.guardian_last_name },
    { name: "guardian_relation", label: "ความสัมพันธ์", type: "text", placeholder: "เช่น มารดา", val: student.guardian_relation, colSpan: "col-span-2"},
    { name: "father_first_name", label: "ชื่อบิดา", type: "text", placeholder: "ชื่อบิดา", val: student.father_first_name },
    { name: "father_last_name", label: "นามสกุลบิดา", type: "text", placeholder: "นามสกุล", val: student.father_last_name },
    { name: "mother_first_name", label: "ชื่อมารดา", type: "text", placeholder: "ชื่อมารดา", val: student.mother_first_name },
    { name: "mother_last_name", label: "นามสกุลมารดา", type: "text", placeholder: "นามสกุล", val: student.mother_last_name },
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
    { name: "note", label: "บันทึกเพิ่มเติม", type: "textarea", placeholder: "สถานะ", val: student.note },
  ];
  

    const hdlEdit = async(dataStudent) => {
      try{
        console.log(student.student_id)
        const res = await updateStudentData(student.student_id, dataStudent, token)
        console.log("res  ",res)
          toast.success("success! 🎉", {
            description: "Edit student successfull.",
          })
          navigate('/admin/manage')  
      }catch(error){
        console.log(error)
        const errMsg = error.response.data?.message
        toast.error(errMsg)     
      }
    };

  return (
    <div className={`flex mt-3 justify-center min-h-screen p-4 ${className}`} {...props}>
      <div className="w-full max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle>แก้ไขรายละเอียดของนักเรียน</CardTitle>
            <CardDescription>
              ป้อนข้อมูลต่างๆ เพื่อแก้ไขข้อมูลของนักเรียน
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form className="space-y-4" onSubmit={form.handleSubmit(hdlEdit)}>
                <FormDynamic2 fields={fields} form={form} />
                <Button type="submit" className="w-full mt-3">
                  บักทึก
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>

  );
}

export default FormEditStudent