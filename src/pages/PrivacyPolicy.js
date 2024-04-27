import React from "react";
import MY_Navbar2 from "../components/Navbar/Navbar_2";
import Custom_Footer from "../components/footer";

function PrivacyPolicy() {
  return (
    <div>
      <MY_Navbar2 />

      <div className=" mx-auto p-4 max-w-full">
        <h1 className="text-2xl leading-5 mt-2 mb-4 text-white">
          V-Anime Anime Website Terms and Conditions of Use
        </h1>

        <div className="p-2">
          <h1 className="text-xl leading-5 mt-2 mb-2 text-white">
            Privacy Policy for V-Anime
          </h1>

          <p className="mb-4 text-base leading-6 px-4">
            At V-Anime, accessible from V-anime.vercel.app, one of our main
            priorities is the privacy of our visitors. This Privacy Policy
            document contains types of information that is collected and
            recorded by V-Anime and how we use it.
          </p>

          {/* Rest of the content with similar styling applied */}

        </div>
      </div>
      <Custom_Footer />
    </div>
  );
}

export default PrivacyPolicy;
