import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

const Login = ({ setUser, setIsNew }) => {
  const [error, setError] = useState("");
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      if (localStorage.getItem(values.email)) {
        const user = JSON.parse(localStorage.getItem(values.email));
        if (user.password === values.password) {
          toast.success("Registration successful!");
          setUser(user);
        } else {
          setError("Login Failed!");
        }
      } else {
        setError("Login Failed!");
      }
    },
  });

  return (
    <div className="flex flex-col items-center justify-center gap-5 border-black border p-3 rounded-lg">
      <p className="text-2xl font-semibold ">Login</p>
      <form className="flex flex-col gap-3" onSubmit={formik.handleSubmit}>
        <input
          type="text"
          name="email"
          placeholder="Email"
          className="p-1 w-[400px]  border-b-2"
          {...formik.getFieldProps("email")}
        />
        {formik.touched.email && formik.errors.email ? (
          <div className="text-red-500">* {formik.errors.email}</div>
        ) : null}

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="p-1 w-[400px]  border-b-2"
          {...formik.getFieldProps("password")}
        />
        {formik.touched.password && formik.errors.password ? (
          <div className="text-red-500">* {formik.errors.password}</div>
        ) : null}

        <button
          className="border p-2 rounded-lg text-xl active:border-black"
          type="submit"
        >
          Login
        </button>
        <p
          className="cursor-pointer"
          onClick={() => {
            setIsNew(true);
          }}
        >
          Don't have an account?
        </p>
        <p className="text-red-500 text-center">{error}</p>
      </form>
    </div>
  );
};

export default Login;
