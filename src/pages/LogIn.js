import React, { useEffect, useState } from "react";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import cn from "../utils/cn";
import axios from "axios"; // Import Axios for making HTTP requests

import { Link, useNavigate } from "react-router-dom";
export function LoginFormDemo() {
  const API_URL = "http://localhost:4000";
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      formData.name = formData.firstName + " " + formData.lastName;
      // Make a POST request to the signup endpoint
      const response = await axios.post(API_URL + "/user/login", formData);
      console.log(response.data); // Log the response from the server
      localStorage.setItem("token", response.data.token);
      if (response.data.user) {
        navigate("/user");
      }
    } catch (error) {
      console.error(error.response.data); // Log any errors
    }
  };

  const UserPreviousLogin = async () => {
    try {
      // Make a POST request to the signup endpoint
      await axios
        .post(API_URL + "/user/is-token-valid",{}, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          console.clear();
          console.log("Data: ", res);
          if (res.data) {
            navigate("/user");
          }
        })
        .catch((error) => {
          console.error("errors: ", error);
          // if (error.response.status === 401) {
          //   localStorage.removeItem("token");
          // }
        });
    } catch (error) {
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
    if (localStorage.getItem("token")) {
      console.log("Token is: ", localStorage.getItem("token"));
      UserPreviousLogin();
    }

    console.log("Data");
  }, []);

  useEffect(() => {
    // document.title = "LogIn";
  }, []);
  return (
    <div className="h-screen flex  items-center justify-center">
      <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
        <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
          Welcome to V-Anime
        </h2>
        <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
          Login to V-Anime if you can because we don&apos;t have a login flow
          yet
        </p>

        <form className="my-8" onSubmit={handleSubmit}>
          {/* Form inputs */}
          {/* Handle change function */}
          {/* Handle submit function */}
          {/* Button and Gradient */}

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

          <button
            className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
            type="submit"
          >
            Log In &rarr;
            <BottomGradient />
          </button>
        </form>
        <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
          Don't have a account?{" "}
          <Link to={"/register"}>
            <span className="text-blue-400">Sign Up Here</span>
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
