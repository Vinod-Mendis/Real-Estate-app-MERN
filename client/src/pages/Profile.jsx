/** @format */

import { useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

export default function Profile() {
  const dispatch = useDispatch();
  const fileRef = useRef();
  const [image, setImage] = useState(undefined);
  const [uploadProgress, setuploadProgress] = useState(0);
  const [fileuploadError, setfileuploadError] = useState(false);
  const [showListingsError, setShowListingsError] = useState(false);
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [userListings, setUserListings] = useState([]);

  useEffect(() => {
    if (image) {
      handleImageUpload(image);
    }
  }, [image]);

  const handleImageUpload = (image) => {
    const storage = getStorage(app);
    const filename = new Date().getTime() + image.name;
    const storageRef = ref(storage, filename);
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setuploadProgress(Math.round(progress));
      },
      (error) => {
        setfileuploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, profilePicture: downloadURL })
        );
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());

      const res = await fetch(`api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }

      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  const handleDelete = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {}
    dispatch(deleteUserFailure(error.message));
  };

  const handleSignOut = async () => {
    try {
      dispatch(signInStart());
      const res = await fetch("/api/auth/signout");
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleShowListing = async () => {
    try {
      setShowListingsError(false);
      const res = await fetch(`/api/user/listing/${currentUser._id}`);
      const data = await res.json();
      if (data.success === false) {
        setShowListingsError(true);
        return;
      }
      setUserListings(data);
    } catch (error) {
      setShowListingsError(true);
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-12">Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
          onChange={(e) => {
            setImage(e.target.files[0]);
          }}
        />
        <img
          src={formData.profilePicture || currentUser.profilePicture}
          alt="profile-picture"
          className="rounded-full w-32 h-32 object-cover self-center cursor-pointer"
          onClick={() => fileRef.current.click()}
        />
        <p>
          {fileuploadError ? (
            <span className="text-red-500">
              Image Upload Error! (size should be less than 2 mb)
            </span>
          ) : uploadProgress > 0 && uploadProgress < 100 ? (
            <span className="text-green-700">
              {`Uploading ${uploadProgress}%`}
            </span>
          ) : uploadProgress === 100 ? (
            <span className="text-green-700 font-semibold">
              Upload Successful!
            </span>
          ) : (
            ""
          )}
        </p>
        <input
          type="text"
          placeholder="username"
          id="username"
          defaultValue={currentUser.username}
          className="border p-3 rounded-lg "
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="email"
          id="email"
          defaultValue={currentUser.email}
          className="border p-3 rounded-lg "
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          className="border p-3 rounded-lg "
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className="bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition disabled:opacity-75">
          {loading ? "Loading..." : "Update"}
        </button>
        <Link
          className="bg-green-700 text-white p-3 rounded-lg hover:bg-green-800 text-center transition disabled:opacity-75"
          to={"/create-listing"}>
          Create Listing
        </Link>
      </form>
      <div className="flex justify-between mt-3">
        <span onClick={handleDelete} className="text-red-500 cursor-pointer">
          Delete account
        </span>
        <span onClick={handleSignOut} className="text-red-500 cursor-pointer">
          Sign out
        </span>
      </div>

      <p className="text-red-500 mt-4 ">{error ? error.message : ""}</p>
      <p className="text-green-600 mt-4 ">
        {updateSuccess ? "User Update Successfully!" : ""}
      </p>
      <button
        onClick={handleShowListing}
        className="bg-gray-300 w-full text-gray-800 p-3 rounded-lg hover:bg-gray-400 transition disabled:opacity-75">
        Show Listings
      </button>
      <p className="text-red-500 mt-4 ">
        {showListingsError ? "Error Showing Listings!" : ""}
      </p>

      {userListings && userListings.length > 0 && (
        <div className="flex flex-col gap-4 mt-10">
          <h1 className="font-semibold text-xl text-gray-500">Your Listings</h1>
          {userListings.map((listing) => (
          <div
            key={listing._id}
            className="flex justify-between border border-slate-50 hover:bg-slate-50 p-4 rounded-xl hover:shadow-lg transition">
            <Link
              to={`/listing/${listing._id}`}
              className="flex justify-between w-full items-center">
              <img
                src={listing.imageUrls[0]}
                alt="listing image"
                className="h-full w-16 object-cover rounded-lg"
              />
              <p className="font-semibold flex-1 pl-4 truncate">
                {listing.name}
              </p>
            </Link>
            <div>
              <button className="text-blue-500 font-medium">Edit</button>
              <button className="text-red-400 font-medium">Delete</button>
            </div>
          </div>
          ))}
        </div>
      )}
    </div>
  );
}
