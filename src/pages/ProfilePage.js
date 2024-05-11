import axios from "axios";
import "./ProfilePage.css";
import { useEffect, useState } from "react";
import { GrFormEdit } from "react-icons/gr";

const ProfilePage = () => {
  const token = localStorage.getItem("token");

  // User Data State
  const [userData, setUserData] = useState();

  // Check if current User Token is valid
  async function isTokenValid() {
    try {
      console.clear();
      console.log("Token", token);
      const res = await axios.post(
        "http://localhost:4000/user/is-token-valid",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(res.data);
      return await res.data;
    } catch (error) {
      console.error(error.response.data);
      // Redirect to login
      // window.location.href = "/login";
    }
  }

  async function fetchUserInfo(id) {
    console.log("ID", id);
    axios
      .get("http://localhost:4000/user/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setUserData(res.data.user);
      })
      .catch((error) => {
        console.error(error.response.data);
      });
  }

  useEffect(() => {
    // Check if token is valid

    if (!token) {
      // Redirect to login
      window.location.href = "/login";
      return null;
    }
    const respData = isTokenValid();
    respData
      .then((data) => {
        // console.log("Data", data);
        if (data.verified) {
          // console.log("Verified", data);
          fetchUserInfo(data.id);
        }
      })
      .catch((error) => {
        console.log("Error", error);
      });
  }, []);

  return (
    <div
      id="main-wrapper bg-black"
      className="layout-page layout-profile bg-black text-white"
      bis_skin_checked="1"
    >
      <div className="profile-header" bis_skin_checked="1">
        <div
          className="profile-header-cover"
          style={{
            backgroundImage:
              "url(https://cdn.noitatnemucod.net/avatar/100x100/one_piece/user-06.jpeg);",
          }}
          bis_skin_checked="1"
        ></div>
        <div className="" bis_skin_checked="1">
          <div className="ph-title" bis_skin_checked="1">
            Hi, {userData?.name}
          </div>
          <div className="ph-tabs" bis_skin_checked="1">
            <div className="bah-tabs" bis_skin_checked="1">
              <ul className="nav nav-tabs pre-tabs">
                <li className="nav-item">
                  <a className="nav-link active" href="/user/profile">
                    <i className="fas fa-user mr-2"></i>Profile
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link " href="/user/continue-watching">
                    <i className="fas fa-history mr-2"></i>Continue Watching
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link " href="/user/watch-list">
                    <i className="fas fa-heart mr-2"></i>Watch List
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link " href="/user/notification">
                    <i className="fas fa-bell mr-2"></i>Notification
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link " href="/user/settings">
                    <i className="fas fa-cog mr-2"></i>Settings
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link " href="/user/mal">
                    <i className="fas fa-file-import mr-2"></i>MAL
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="clearfix" bis_skin_checked="1"></div>
        </div>
      </div>
      <div className="profile-content" bis_skin_checked="1">
        <div className="" bis_skin_checked="1">
          <div
            className="profile-box profile-box-account makeup"
            bis_skin_checked="1"
          >
            <h2 className="h2-heading mb-4">
              <i className="fas fa-user mr-3"></i>Edit Profile
            </h2>
            <div className="block_area-content" bis_skin_checked="1">
              <div
                className="show-profile-avatar text-center mb-3 relative"
                bis_skin_checked="1"
              >
                <div
                  className="profile-avatar d-inline-block"
                  data-toggle="modal"
                  data-target="#modalavatars"
                  bis_skin_checked="1"
                >
                  <div
                    className="pa-edit flex justify-center items-center absolute bottom-0 right-[7px] bg-white rounded-full shadow-md cursor-pointer hover:scale-110 hover:-rotate-45 transition-all delay-100"
                    bis_skin_checked="1"
                  >
                    <GrFormEdit className="w-5/6 h-5/6 " />
                  </div>
                  <img
                    id="preview-avatar"
                    src="https://cdn.noitatnemucod.net/avatar/100x100/one_piece/user-06.jpeg"
                  />
                </div>
              </div>
              <form className="preform" method="post" id="profile-form">
                <input type="hidden" name="avatar_id" value="13" />
                <div className="row w-2/3" bis_skin_checked="1">
                  <div
                    className="col-xl-12 col-lg-12 col-md-12"
                    bis_skin_checked="1"
                  >
                    <div className="form-group" bis_skin_checked="1">
                      <label className="prelabel" for="pro5-email">
                        Email address
                      </label>
                      <input
                        type="email"
                        name="email"
                        className="form-control"
                        id="pro5-email"
                        value={userData?.email}
                        required=""
                      />

                      <div
                        className="d-block d-verify is-yes w-1/4 text-center"
                        bis_skin_checked="1"
                      >
                        <div className="span-v" bis_skin_checked="1">
                          <i className="fas fa-user-check "></i>Verified
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="col-xl-12 col-lg-12 col-md-12"
                    bis_skin_checked="1"
                  >
                    <div className="form-group" bis_skin_checked="1">
                      <label className="prelabel" for="pro5-name">
                        Your name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="pro5-name"
                        name="name"
                        required=""
                        value={userData?.name}
                      />
                    </div>
                  </div>
                  <div
                    className="col-xl-12 col-lg-12 col-md-12"
                    bis_skin_checked="1"
                  >
                    <div className="form-group" bis_skin_checked="1">
                      <label className="prelabel" for="pro5-join">
                        Joined
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        disabled=""
                        id="pro5-join"
                        value="2023-08-06"
                      />
                    </div>
                  </div>
                  <div
                    className="col-xl-12 col-lg-12 col-md-12"
                    bis_skin_checked="1"
                  >
                    <div className="block" bis_skin_checked="1">
                      <a
                        className="btn btn-sm btn-clear"
                        data-toggle="collapse"
                        href="#show-changepass"
                      >
                        <i className="fas fa-key mr-2"></i>Change password
                      </a>
                    </div>
                    <div
                      id="show-changepass"
                      className="collapse mt-3"
                      bis_skin_checked="1"
                    >
                      <div className="form-group" bis_skin_checked="1">
                        <label className="prelabel" for="pro5-currentpass">
                          Current Password
                        </label>
                        <input
                          type="password"
                          className="form-control"
                          id="pro5-currentpass"
                          name="current_password"
                        />
                      </div>
                      <div className="form-group" bis_skin_checked="1">
                        <label className="prelabel" for="pro5-pass">
                          New Password
                        </label>
                        <input
                          type="password"
                          className="form-control"
                          id="pro5-pass"
                          name="new_password"
                        />
                      </div>
                      <div className="form-group" bis_skin_checked="1">
                        <label className="prelabel" for="pro5-confirm">
                          Confirm New Password
                        </label>
                        <input
                          type="password"
                          className="form-control"
                          id="pro5-confirm"
                          name="confirm_new_password"
                        />
                      </div>
                    </div>
                  </div>
                  <div
                    className="col-xl-12 col-lg-12 col-md-12"
                    bis_skin_checked="1"
                  >
                    <div className="form-group" bis_skin_checked="1">
                      <div className="mt-4" bis_skin_checked="1"></div>
                      <button className="btn btn-block btn-primary">
                        Save
                      </button>
                      <div
                        className="loading-relative"
                        id="profile-loading"
                        style={{ display: "none" }}
                        bis_skin_checked="1"
                      >
                        <div className="loading" bis_skin_checked="1">
                          <div className="span1" bis_skin_checked="1"></div>
                          <div className="span2" bis_skin_checked="1"></div>
                          <div className="span3" bis_skin_checked="1"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="clearfix" bis_skin_checked="1"></div>
      </div>
    </div>
  );
};

export default ProfilePage;
