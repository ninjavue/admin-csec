import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import "../../styles/auth.scss";
import { Link, useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isPass, setIsPass] = useState(false);
  const [toggle, setToggle] = useState(false);

  const images = ["/images/images1.jpg", "/images/images2.jpg"];

  const handleSubmit = () => {
    navigate("/dashboard");
  };

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme == "dark") {
      document.documentElement.classList.add("dark");
    }
  }, []);

  return (
    <div className="auth">
      <div className="flex rounded-md overflow-hidden h-[calc(100%-50px)] w-[calc(100%-300px)]">
        {/* Left Side */}
        <div className="hidden md:flex w-1/2 relative">
          <Swiper
            modules={[Autoplay]}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            loop={true}
            className="w-full h-full"
          >
            {images.map((src, index) => (
              <SwiperSlide key={index}>
                <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
                <img
                  src={src}
                  alt={`Slide ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Right Side */}
        <div className="w-full md:w-1/2 flex items-center justify-center bg-white text-gray-900 dark:bg-loginc dark:text-white p-8">
          <div className="w-full max-w-md">
            <h2 className="text-xl font-semibold text-start text-primary mb-2">
              Welcome Back!
            </h2>
            <p className="text-start text-gray-400 mb-6">
              Sign in to continue to Velzon.
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-gray-400 mb-2">Username</label>
                <input
                  type="text"
                  placeholder="Enter username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="border w-full p-2 dark:bg-gray-800 dark:text-white text-gray-900 rounded-md focus:outline-none dark:focus:ring-1 focus:ring-blue-500 dark:border-0"
                />
              </div>

              <div>
                <label className=" text-gray-400 flex justify-between mb-2">
                  Password
                  <Link to="/" className="text-gray-400 text-base">
                    Forgot password?
                  </Link>
                </label>
                <div className="relative">
                  <input
                    type={`${isPass?'text':'password'}`}
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-2 border dark:bg-gray-800 dark:text-white text-gray-900 rounded-md focus:outline-none dark:focus:ring-1 focus:ring-blue-500 dark:border-0"
                  />
                  <i onClick={() => setIsPass(!isPass)} className={`absolute right-3 top-2 text-gray-400 cursor-pointer ${isPass?'ri-eye-off-line':'ri-eye-line'}`}></i>
                </div>
              </div>

              <div className="flex items-center" onClick={() => setToggle(!toggle)}>
                <input type="checkbox" id="remember" className="hidden peer" />
                <span className={`w-5 h-5 rounded border-2 border-gray-500 flex items-center justify-center relative cursor-pointer ${toggle?'bg-blue-900 border-blue-900':''}`}>
                  <i className={`${toggle?'ri-check-line text-white text-lg':''}`}></i>
                </span>
                <label
                  className="ml-2 text-gray-400 cursor-pointer"
                >
                  Remember me
                </label>
              </div>
              <button className="w-full bg-teal-500 hover:bg-teal-600 text-white py-2 rounded-md" onClick={handleSubmit}>
                Sign In
              </button>
            </div>

            <div className="text-center mt-6">
              <p className="text-gray-400">Sign in with</p>
              <div className="flex justify-center space-x-4 mt-6">
                <button className="bg-blue-600 auth-with">
                  <i className="ri-facebook-fill text-white text-lg"></i>
                </button>
                <button className="bg-red-600 auth-with">
                  <i className="ri-google-fill text-white text-lg"></i>
                </button>
                <button className="bg-gray-700 auth-with">
                  <i className="ri-github-fill text-white text-lg"></i>
                </button>
                <button className="bg-blue-400 auth-with">
                  <i className="ri-twitter-fill text-white text-lg"></i>
                </button>
              </div>
            </div>

            <p className="text-center text-gray-400 mt-4">
              Don't have an account?{" "}
              <Link to="/" className="text-blue-400">
                Signup
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
