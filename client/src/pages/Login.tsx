import { useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Link } from "react-router";
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client/react";
import { loginMutation } from "../api/querys";
import CustomAlert from "@/components/commanComponents/CustomAlert";

interface LoginUserDetails {
  username: string;
  password: string;
}
interface tokens {
  login: {
    accessToken: string;
    refreshToken: string;
  };
}
const Login = () => {
  const navigator = useNavigate();
  const [login] = useMutation<tokens>(loginMutation);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginUserDetails>();

  const onSubmit = async (data: LoginUserDetails) => {
    console.log(data);
    try {
      const response = await login({
        variables: {
          username: data.username,
          password: data.password,
        },
      });
      console.log(response);
      if (response.data) {
        const tokens = response.data;
        const accessToken = tokens.login.accessToken;
        const refreshToken = tokens.login.refreshToken;
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        navigator("/");
      }
    } catch (error) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-50 via-sky-50 to-indigo-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="w-full max-w-md p-8 space-y-6 bg-card rounded-lg border shadow-sm">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Welcome back</h1>
          <p className="text-muted-foreground">Enter your credentials to access your account</p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="space-y-2">
            <label htmlFor="username" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Username
            </label>
            <Input
              id="username"
              type="text"
              placeholder="Enter your username"
              autoComplete="username"
              {...register("username", { required: `User Name is required` })}
            />
            {errors.username && <p className="text-red-500 text-sm">{errors.username.message as string}</p>}
          </div>
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Password
            </label>
            <Input
              id="password"
              type="password"
              autoComplete="password"
              {...register("password", {
                required: `Password is required`,
                pattern: {
                  value: /^.{8,}$/,
                  message: "Password should contain at least 8 characters",
                },
              })}
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message as string}</p>}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <input
                id="remember"
                type="checkbox"
                name="remember"
                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                checked
                onChange={() => {}}
              />
              <label htmlFor="remember" className="text-sm text-muted-foreground">
                Remember me
              </label>
            </div>
            <Link to="/forgetpassword" className="text-sm text-primary hover:underline">
              Forgot password?
            </Link>
          </div>

          <Button type="submit" className="w-full">
            Sign in
          </Button>
        </form>

        <div className="text-center text-sm">
          <span className="text-muted-foreground">Don't have an account? </span>
          <Link to="/signup" className="text-primary hover:underline">
            Sign up
          </Link>
        </div>
      </div>
      <CustomAlert description="wrong Password" title="wrongpass" />
    </div>
  );
};

export default Login;
