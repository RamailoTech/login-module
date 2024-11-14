import { useNavigate } from "react-router-dom";

const ProfileCard = () => {
  const navigate = useNavigate()
  const HandleLogOut = () => {
    navigate("/login")
  }
  return (
    <div className="flex items h-screen justify-center">
      <div className="max-w-sm mx-auto bg-white shadow-lg rounded-lg  flex items-center flex-col mt-20 h-[360px]">
        <div className="bg-cover bg-center h-20" style={{ backgroundImage: "url('https://source.unsplash.com/random')" }}>
          <img
            className="w-24 h-24 rounded-full mx-auto border-4 border-white -mt-12"
            src="https://png.pngtree.com/thumb_back/fh260/background/20230612/pngtree-in-the-style-of-2d-game-art-image_2884743.jpg"
            alt="profile"
          />
        </div>
        <div className="text-center p-4">
          <h2 className="text-xl font-semibold text-gray-800">John Doe</h2>
          <p className="text-gray-600">Software Engineer</p>
          <p className="text-gray-700 mt-2">An enthusiastic developer with a passion for creating elegant solutions.</p>
          <div className="flex justify-center mt-4">
            <a href="#" className="text-blue-500 hover:text-blue-700 mx-2">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="text-blue-700 hover:text-blue-900 mx-2">
              <i className="fab fa-linkedin"></i>
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-800 mx-2">
              <i className="fab fa-github"></i>
            </a>
          </div>
          <button className="mt-4 px-4 py-2 bg-blue-500 text-white text-sm rounded-full hover:bg-blue-600 focus:outline-none" onClick={HandleLogOut}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
