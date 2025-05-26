import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { USER_API_END_POINT } from "../utils/constant";
import axios from "axios";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";

const Signup = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
  });

  const [validationErrors, setValidationErrors] = useState({
    email: "",
    phoneNumber: "",
    password: "",
  });

  const changeEventHandler = (e) => {
    const { name, value } = e.target;

    setInput((prev) => ({ ...prev, [name]: value }));

    // Real-time validation
    if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      setValidationErrors((prev) => ({
        ...prev,
        email: emailRegex.test(value) ? "" : "Invalid email format",
      }));
    }

    if (name === "phoneNumber") {
      const phoneRegex = /^\d{10}$/;
      setValidationErrors((prev) => ({
        ...prev,
        phoneNumber: phoneRegex.test(value)
          ? ""
          : "Phone number must have 10 digits",
      }));
    }

    if (name === "password") {
      const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!%*?#&]{8,}$/;
      setValidationErrors((prev) => ({
        ...prev,
        password: passwordRegex.test(value)
          ? ""
          : "Password must be atleast 8 characters, including uppercase, lowercase, number, and a special character",
      }));
    }
  };

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };
  const { loading } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);

    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center max-w-7xl mx-auto">
        <form
          action=""
          onSubmit={submitHandler}
          className="w-1/2 border border-gray-200 rounded-md p-4 my-10"
        >
          <h1 className="flex font-bold text-xl mb-5 justify-center">
            Sign Up
          </h1>
          <div className="my-2">
            <Label className="mb-2">Full Name</Label>
            <Input
              type="text"
              placeholder="Sonali"
              value={input.fullname}
              name="fullname"
              onChange={changeEventHandler}
              className="border-gray-200"
            />
          </div>
          <div className="my-2">
            <Label className="mb-2">Email</Label>
            <Input
              type="email"
              placeholder="example@gmail.com"
              value={input.email}
              name="email"
              onChange={changeEventHandler}
              className="border-gray-200"
            />
            {validationErrors.email && (
              <p className="text-red-500 text-sm">{validationErrors.email}</p>
            )}
          </div>
          <div className="my-2">
            <Label className="mb-2">Phone Number</Label>
            <Input
              type="text"
              placeholder="XXXXXXXXXX"
              value={input.phoneNumber}
              name="phoneNumber"
              onChange={changeEventHandler}
              className="border-gray-200"
            />
            {validationErrors.phoneNumber && (
              <p className="text-red-500 text-sm">
                {validationErrors.phoneNumber}
              </p>
            )}
          </div>
          <div className="my-2">
            <Label className="mb-2">Password</Label>
            <Input
              type="password"
              placeholder="Password"
              value={input.password}
              name="password"
              onChange={changeEventHandler}
              className="border-gray-200"
            />
            {validationErrors.password && (
              <p className="text-red-500 text-sm">
                {validationErrors.password}
              </p>
            )}
          </div>
          <div className="flex items-center justify-between">
            <RadioGroup className="flex items-center gap-4 my-3">
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="student"
                  checked={input.role === "student"}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="r1">Student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="recruiter"
                  checked={input.role === "recruiter"}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="r2">Recruiter</Label>
              </div>
            </RadioGroup>
            <div className="flex items-center gap-2">
              <Label>Photo</Label>
              <Input
                accept="image/*"
                type="file"
                onChange={changeFileHandler}
                className="cursor-pointer border-gray-200"
              />
            </div>
          </div>
          {loading ? (
            <Button className="w-full my-4">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            </Button>
          ) : (
            <Button type="submit" className="w-full my-4 cursor-pointer">
              SignUp
            </Button>
          )}
          <span className="text-sm">
            Already have an account?{" "}
            <Link to={"/login"} className="text-blue-600">
              Login
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Signup;
