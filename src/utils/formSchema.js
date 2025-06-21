import { z } from "zod";

export const registerSchema = z.object({
  firstName: z
    .string()
    .min(1, { message: "firsName must be at least 1 characters" }),
  lastName: z
    .string()
    .min(1, { message: "last must be at least 1 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(4, { message: "Password must be at least 4 characters" }),
});

export const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(4, { message: "Password must be at least 4 characters" }),
});


export const studentSchema = z.object({
  class_level: z.string().nonempty("กรุณากรอกระดับชั้น"), // ตรวจสอบระดับชั้น
  class_room: z.string().nonempty("กรุณากรอกห้องเรียน"), // ตรวจสอบห้องเรียน
  student_number: z.string().nonempty("กรุณากรอกเลขที่นักเรียน"), // ตรวจสอบเลขที่นักเรียน
  code_citizen: z.string(), // ตรวจสอบเลขที่นักเรียน
  gender: z.string().nonempty("กรุณากรอกเพศ"), // ตรวจสอบเพศ
  prefix_name: z.string().nonempty("กรุณากรอกคำนำหน้า"), // ตรวจสอบคำนำหน้า
  first_name: z.string().nonempty("กรุณากรอกชื่อ"), // ตรวจสอบชื่อ
  last_name: z.string().nonempty("กรุณากรอกนามสกุล"), // ตรวจสอบนามสกุล
  birth_date: z.date(),
  religion: z.string(), // ตรวจสอบศาสนา
  ethnicity: z.string(), // ตรวจสอบเชื้อชาติ
  guardian_first_name: z.string(), // ตรวจสอบชื่อผู้ปกครอง
  guardian_last_name: z.string(), // ตรวจสอบนามสกุลผู้ปกครอง
  guardian_relation: z.string(), // ตรวจสอบความสัมพันธ์ผู้ปกครอง
  father_first_name: z.string(), // ตรวจสอบชื่อบิดา
  father_last_name: z.string(), // ตรวจสอบนามสกุลบิดา
  mother_first_name: z.string(), // ตรวจสอบชื่อมารดา
  mother_last_name: z.string(), // ตรวจสอบนามสกุลมารดา
  nationality: z.string(),
  status: z.string(),
  note: z.string(),
});

