import { useSelector } from "react-redux";

export default function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-12">Profile</h1>
      <form className="flex flex-col gap-4">
        <img
          src={currentUser.profilePicture}
          alt="profile-picture"
          className="rounded-full w-32 object-cover self-center"
        />
        <input
          type="text"
          placeholder="username"
          className="border p-3 rounded-lg "
        />
        <input
          type="email"
          placeholder="email"
          className="border p-3 rounded-lg "
        />
        <input
          type="password"
          placeholder="password"
          className="border p-3 rounded-lg "
        />
        <button className="bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition">
          Update
        </button>
      </form>
      <div className="flex justify-between mt-3">
        <span className="text-red-500">Delete account</span>
        <span className="text-red-500">Sign out</span>
      </div>
    </div>
  );
}
