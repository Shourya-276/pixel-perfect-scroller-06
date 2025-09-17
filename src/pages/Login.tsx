import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff, Apple } from "lucide-react";
import { useNavigate } from "react-router-dom";
import citySkyline from "@/assets/city-skyline.jpg";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Static form submission for now
    console.log("Login data:", formData, "Remember me:", rememberMe);
    // You can add success message or redirect here
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left side - Form */}
      <div className="w-full lg:w-1/2 bg-white flex items-center justify-center p-4 sm:p-8">
        <div className="w-full max-w-sm sm:max-w-md space-y-6 sm:space-y-8">
          {/* Logo */}
          <div className="text-center">
            <div className="flex items-center justify-center space-x-1 sm:space-x-2 mb-6 sm:mb-8">
              <div className="text-xl sm:text-2xl font-bold text-primary">MUMBAI</div>
              <div className="text-xl sm:text-2xl font-bold text-gray-600">HOMES</div>
            </div>
          </div>

          {/* Header */}
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">Welcome Back</h1>
            <p className="text-sm sm:text-base text-gray-600">Please add your details</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <div>
              <Label htmlFor="email" className="text-xs sm:text-sm font-medium text-gray-700">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className="mt-1 block w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                required
              />
            </div>

            <div>
              <Label htmlFor="password" className="text-xs sm:text-sm font-medium text-gray-700">
                Password
              </Label>
              <div className="relative mt-1">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => handleInputChange("password", e.target.value)}
                  className="block w-full px-3 py-2 sm:px-4 sm:py-3 pr-10 sm:pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-2 sm:pr-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-1 sm:space-x-2">
                <Checkbox
                  id="remember"
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(!!checked)}
                />
                <Label htmlFor="remember" className="text-xs sm:text-sm text-gray-700">
                  Remember Me
                </Label>
              </div>
              <button
                type="button"
                className="text-xs sm:text-sm text-gray-600 hover:text-primary"
              >
                Forgot Password?
              </button>
            </div>

            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-white py-2 sm:py-3 text-sm font-medium rounded-lg"
            >
              Submit
            </Button>
          </form>

          {/* Social Login */}
          <div className="mt-6 sm:mt-8">
            <div className="text-center text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">
              Or Sign in with
            </div>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
              <Button
                variant="outline"
                className="flex-1 py-2 sm:py-3 border-gray-300 hover:bg-gray-50 text-sm"
              >
                <Apple className="h-4 w-4 mr-1 sm:h-5 sm:w-5 sm:mr-2" />
                Apple
              </Button>
              <Button
                variant="outline"
                className="flex-1 py-2 sm:py-3 border-gray-300 hover:bg-gray-50 text-sm"
              >
                <svg className="h-4 w-4 mr-1 sm:h-5 sm:w-5 sm:mr-2" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Google
              </Button>
            </div>
          </div>

          {/* Terms */}
          <div className="text-center mt-6">
            <button className="text-xs sm:text-sm text-gray-600 hover:text-primary">
              Terms & Conditions
            </button>
          </div>

          {/* Back to Sign Up */}
          <div className="text-center mt-4">
            <span className="text-xs sm:text-sm text-gray-600">Don't have an account? </span>
            <button
              onClick={() => navigate("/signup")}
              className="text-xs sm:text-sm text-primary hover:underline font-medium"
            >
              Sign up
            </button>
          </div>
        </div>
      </div>

      {/* Right side - Background Image */}
      <div 
        className="hidden lg:block lg:w-1/2 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${citySkyline})` }}
      >
        <div className="w-full h-full bg-black bg-opacity-20"></div>
      </div>
    </div>
  );
};

export default Login;