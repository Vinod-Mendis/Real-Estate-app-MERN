import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const [errorOccurred, setErrorOccured] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success == false) {
        setLoading(false);
        setErrorOccured(data.message);
        return;
      }
      setErrorOccured(null);
      setLoading(false);
      navigate("/");
    } catch (error) {
      setLoading(false);
      setErrorOccured(error.message);
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold m-7">Sign in</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="email"
          className="border p-3 rounded-lg"
          id="email"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="password"
          className="border p-3 rounded-lg"
          id="password"
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className="bg-blue-600 text-white font-medium p-3 rounded-lg hover:bg-blue-800 transition"
        >
          {loading ? "Loading..." : "Sign in"}
        </button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Don&apos;t have an account?</p>
        <Link to={"/sign-up"}>
          <span className="text-blue-600">Sign up</span>
        </Link>
      </div>
      {errorOccurred && <p className="text-red-500 mt-5">{errorOccurred}</p>}
    </div>
  );
}
