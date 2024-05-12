import React from "react";
import MyNavbar from "../components/Navbar/Navbar_2";
import CustomFooter from "../components/footer";

function TermsAndConditions() {
  return (
    <div>
      <MyNavbar />

      <div className="containerrrr max-w-full p-[15px] m-8">
        <h1 className="text-[2em] leading-5 mt-2 mb-[1.5em] text-white">
          V-Anime Website Terms and Conditions of Use
        </h1>

        <div className="p-2 w-11/12">
        <h2 className="text-[1.2em] leading-5 mt-2 mb-[10px] text-white">
          1. Terms
        </h2>
        <p
          className="mb-[1em] text-[14px] leading-6 px-4"
          style={{ fontWeight: 300 }}
        >
          By accessing this Website, accessible from https://V-Anime.to, you are
          agreeing to be bound by these Website Terms and Conditions of Use and
          agree that you are responsible for the agreement with any applicable
          local laws. If you disagree with any of these terms, you are
          prohibited from accessing this site. The materials contained in this
          Website are protected by copyright and trade mark law.
        </p>

        <h2 className="text-[1.2em] leading-5 mt-2 mb-[10px] text-white">
          2. Use License
        </h2>
        <p
          className="mb-[1em] text-[14px] leading-6 px-4"
          style={{ fontWeight: 300 }}
        >
          Permission is granted to temporarily download one copy of the
          materials on V-Anime's Website for personal, non-commercial transitory
          viewing only. This is the grant of a license, not a transfer of title,
          and under this license you may not:
        </p>

        <ul  className="px-4 py-4 list-none">
          <li >modify or copy the materials;</li>
          <li className="mt-2">
            use the materials for any commercial purpose or for any public
            display;
          </li>
          <li className="mt-2">
            attempt to reverse engineer any software contained on V-Anime's
            Website;
          </li>
          <li className="mt-2">
            remove any copyright or other proprietary notations from the
            materials; or
          </li>
          <li className="mt-2">
            transferring the materials to another person or "mirror" the
            materials on any other server.
          </li>
        </ul>

        <p
          className="mb-[1em] text-[14px] leading-6 px-4"
          style={{ fontWeight: 300 }}
        >
          This will let V-Anime to terminate upon violations of any of these
          restrictions. Upon termination, your viewing right will also be
          terminated and you should destroy any downloaded materials in your
          possession whether it is printed or electronic format. These Terms of
          Service has been created with the help of the Terms Of Service
          Generator.
        </p>

        <h2 className="text-[1.2em] leading-5 mt-2 mb-[10px] text-white">
          3. Disclaimer
        </h2>
        <p
          className="mb-[1em] text-[14px] leading-6 px-4"
          style={{ fontWeight: 300 }}
        >
          All the materials on V-Anime's Website are provided "as is". V-Anime
          makes no warranties, may it be expressed or implied, therefore negates
          all other warranties. Furthermore, V-Anime does not make any
          representations concerning the accuracy or reliability of the use of
          the materials on its Website or otherwise relating to such materials
          or any sites linked to this Website.
        </p>

        <h2 className="text-[1.2em] leading-5 mt-2 mb-[10px] text-white">
          4. Limitations
        </h2>
        <p
          className="mb-[1em] text-[14px] leading-6 px-4"
          style={{ fontWeight: 300 }}
        >
          V-Anime or its suppliers will not be hold accountable for any damages
          that will arise with the use or inability to use the materials on
          V-Anime's Website, even if V-Anime or an authorize representative of
          this Website has been notified, orally or written, of the possibility
          of such damage. Some jurisdiction does not allow limitations on
          implied warranties or limitations of liability for incidental damages,
          these limitations may not apply to you.
        </p>

        <h2 className="text-[1.2em] leading-5 mt-2 mb-[10px] text-white">
          5. Revisions and Errata
        </h2>
        <p
          className="mb-[1em] text-[14px] leading-6 px-4"
          style={{ fontWeight: 300 }}
        >
          The materials appearing on V-Anime's Website may include technical,
          typographical, or photographic errors. V-Anime will not promise that
          any of the materials in this Website are accurate, complete, or
          current. V-Anime may change the materials contained on its Website at
          any time without notice. V-Anime does not make any commitment to
          update the materials.
        </p>
        <h2 className="text-[1.2em] leading-5 mt-2 mb-[10px] text-white">
          6. Links
        </h2>
        <p
          className="mb-[1em] text-[14px] leading-6 px-4"
          style={{ fontWeight: 300 }}
        >
          V-Anime has not reviewed all of the sites linked to its Website and is
          not responsible for the contents of any such linked site. The presence
          of any link does not imply endorsement by V-Anime of the site. The use
          of any linked website is at the user's own risk.
        </p>
        <h2 className="text-[1.2em] leading-5 mt-2 mb-[10px] text-white">
          7. Site Terms of Use Modifications
        </h2>
        <p
          className="mb-[1em] text-[14px] leading-6 px-4"
          style={{ fontWeight: 300 }}
        >
          V-Anime may revise these Terms of Use for its Website at any time
          without prior notice. By using this Website, you are agreeing to be
          bound by the current version of these Terms and Conditions of Use.
        </p>
        <h2 className="text-[1.2em] leading-5 mt-2 mb-[10px] text-white">
          8. Your Privacy
        </h2>
        <p
          className="mb-[1em] text-[14px] leading-6 px-4"
          style={{ fontWeight: 300 }}
        >
          Please read our Privacy Policy.
        </p>
        <h2 className="text-[1.2em] leading-5 mt-2 mb-[10px] text-white">
          9. Governing Law
        </h2>
        <p
          className="mb-[1em] text-[14px] leading-6 px-4"
          style={{ fontWeight: 300 }}
        >
          Any claim related to V-Anime's Website shall be governed by the laws
          of in without regards to its conflict of law provisions.
        </p>
      </div>
      </div>
      <CustomFooter />
    </div>
  );
}

export default TermsAndConditions;
