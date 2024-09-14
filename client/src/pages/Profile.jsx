import { useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";

export default function Profile() {
  const fileRef = useRef();
  const [image, setImage] = useState(undefined);
  const [uploadProgress, setuploadProgress] = useState(0);
  const [fileuploadError, setfileuploadError] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({});
  console.log(formData);

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

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-12">Profile</h1>
      <form className="flex flex-col gap-4">
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
          className="rounded-full w-32 object-cover self-center cursor-pointer"
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
        <span className="text-red-500 cursor-pointer">Delete account</span>
        <span className="text-red-500 cursor-pointer">Sign out</span>
      </div>
    </div>
  );
}
