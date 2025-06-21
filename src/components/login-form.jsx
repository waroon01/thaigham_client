import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { loginSchema } from "../utils/formSchema";
import { toast } from "sonner";
import { useNavigate } from "react-router"

import useSchoolStore from "../store/school-Store";

export function LoginForm({ className, ...props }) {
  const navigate = useNavigate()
  const actionLogin = useSchoolStore((state)=>state.actionLogin)
  const user = useSchoolStore((state)=>state.user)
  console.log("user จ้า", user)

  const form = useForm({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const hdlLogin = async(logindata) => {
    console.log(logindata)
    try{
      const res = await actionLogin(logindata)
      const role = res.data.user.role
      console.log(role)
      roleRedirect(role)
      toast.success("success! 🎉", {
        description: "welcome back login your successfull.",
      })
      
    }catch(error){
      console.log(error)
      const errMsg = error.response.data?.message
      toast.error(errMsg)
    }
  };

  const roleRedirect = (role)=>{
    if(role === 'admin'){
      navigate('/admin')
    }else{
      navigate('/user')
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account 
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(hdlLogin)}>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="m@example.com"
                        required
                        {...field}
                      />
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" required {...field} />
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full mt-3">
                Login
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
