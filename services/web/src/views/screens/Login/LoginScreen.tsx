import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { AuthService } from "@/shared/modules/auth";

const formSchema = z.object({
  email: z.string(),
  password: z.string(),
});

export const LoginScreen = () => {
  return (
    <div className="w-full h-screen lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="hidden bg-muted lg:block">
        <img
          src="/assets/img/neon.jpg"
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
      <div className="flex items-center justify-center py-12 border border-red-500">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-balance text-muted-foreground">
              Complete the form to login to your account
            </p>
          </div>

          <LoginForm />

          <div className="text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link to="/signup" className="underline">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export const LoginForm = () => {
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const {
    formState: { errors },
  } = form;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await AuthService.login({
        login: values.email,
        password: values.password,
      });

      navigate("/");
    } catch (e: any) {
      const error = e.response.data;
      console.log("[ERROR]", error);

      switch (error.error) {
        case "BAD_CREDENTIALS":
          form.setError(
            "root.serverError",
            {
              message: error.message,
            },
            {
              shouldFocus: true,
            }
          );
          break;
        default:
          throw e;
      }
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="example@mail.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel className="flex items-center">
                Password
                <Link
                  to="/forgot-password"
                  className="ml-auto inline-block text-sm underline"
                >
                  Forgot your password?
                </Link>
              </FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {errors?.root?.serverError?.type === 400 && (
          <p className="text-red-600 text-sm">
            {errors.root.serverError?.message}
          </p>
        )}

        <Button type="submit" className="w-full">
          Login
        </Button>

        <Button className="w-full gap-2 bg-slate-900 hover:bg-slate-600">
          <img
            src="/assets/icons/github.svg"
            alt="github icon"
            width="28"
            height="28"
          />
          Login with Github
        </Button>
      </form>
    </Form>
  );
};
