import React, { useState, useEffect } from "react";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import cn from "../utils/cn";
import axios from "axios"; // Import Axios for making HTTP requests

import { Link, useNavigate } from "react-router-dom";

import toast, { Toaster } from "react-hot-toast";

export function SignupFormDemo() {
  const navigate = useNavigate();
  const API_URL = "http://localhost:4000";
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      formData.name = formData.firstName + " " + formData.lastName;
      console.log("Form Data: ", formData.name);
      // Make a POST request to the signup endpoint
      delete formData.firstName;
      delete formData.lastName;
      const response = await axios.post(API_URL + "/user/register", formData);
      console.log(response.data); // Log the response from the server

      // Set a 1 second timeout before navigating to the user page
      // This is just to show the toast notification
      


      toast.success('Successfully Created an Account!')
      setTimeout(() => {
        navigate("/user");
      }, 1000);
      
    } catch (error) {
      toast.error("Error: ",error.response.data)
      console.error(error.response.data); // Log any errors
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  useEffect(() => {
    // document.title = "Register";
  }, []);

  // display: flex;
  // align-content: center;
  // justify-content: center;
  // align-items: center;

  return (
    <div className="h-screen flex  items-center justify-center">
      <Toaster />
      <div className="max-w-md w-screen  mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input  bg-white dark:bg-black">
        <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
          Welcome to V-Anime
        </h2>
        <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
          Sign Up to V-Anime if you can because we don&apos;t have a login flow
          yet
        </p>

        <form className="my-8" onSubmit={handleSubmit}>
          {/* Form inputs */}
          {/* Handle change function */}
          {/* Handle submit function */}
          {/* Button and Gradient */}

          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
            <LabelInputContainer>
              <Label htmlFor="firstName">First name</Label>
              <Input
                id="firstName"
                placeholder="Tyler"
                type="text"
                value={formData.firstName}
                onChange={handleChange}
              />
            </LabelInputContainer>
            <LabelInputContainer>
              <Label htmlFor="lastName">Last name</Label>
              <Input
                id="lastName"
                placeholder="Durden"
                type="text"
                value={formData.lastName}
                onChange={handleChange}
              />
            </LabelInputContainer>
          </div>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              placeholder="projectmayhem@fc.com"
              type="email"
              value={formData.email}
              onChange={handleChange}
            />
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              placeholder="••••••••"
              type="password"
              value={formData.password}
              onChange={handleChange}
            />
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="password">Confirm Password</Label>
            <Input
              id="confirmPassword"
              placeholder="••••••••"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </LabelInputContainer>

          <button
            className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
            type="submit"
          >
            Sign up &rarr;
            <BottomGradient />
          </button>
        </form>
        <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
          Already have a account?{" "}
          <Link to={"/login"}>
            <span className="text-blue-400">Login Here</span>
          </Link>
        </p>
      </div>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({ children, className }) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
