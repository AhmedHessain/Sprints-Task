import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

const Register = ({ setIsNew }) => {
  const [error, setError] = useState("");
  const formik = useFormik({
    initialValues: {
      firstName: "",
      email: "",
      lastName: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .max(15, "Must be 15 characters or less")
        .required("Required"),
      lastName: Yup.string()
        .max(20, "Must be 20 characters or less")
        .required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      phoneNumber: Yup.string()
        .required("Required")
        .matches(
          /^(01)[0-9]{9}$/,
          "Phone number is not valid. It should start with 01 and be 11 digits long."
        ),
      password: Yup.string()
        .required("Required")
        .min(3, "Password must be at least 3 characters long"),
      confirmPassword: Yup.string()
        .required("Please confirm your password")
        .oneOf([Yup.ref("password"), null], "Passwords must match"),
    }),
    onSubmit: (values) => {
      setError("");
      if (localStorage.getItem(values.email)) {
        setError("Email is already used");
      } else {
        localStorage.setItem(values.email, JSON.stringify(values));
        toast.success("Registration successful!");
        setIsNew(false);
      }
    },
  });

  return (
    <div className="flex flex-col items-center justify-center gap-5 border-black border p-3 rounded-lg">
      <p className="text-2xl font-semibold ">Register</p>
      <form className="flex flex-col gap-3" onSubmit={formik.handleSubmit}>
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          className="p-1 w-[400px]  border-b-2"
          {...formik.getFieldProps("firstName")}
        />
        {formik.touched.firstName && formik.errors.firstName ? (
          <div className="text-red-500">* {formik.errors.firstName}</div>
        ) : null}

        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          className="p-1 w-[400px]  border-b-2"
          {...formik.getFieldProps("lastName")}
        />
        {formik.touched.lastName && formik.errors.lastName ? (
          <div className="text-red-500">* {formik.errors.lastName}</div>
        ) : null}

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
          type="text"
          name="phoneNumber"
          placeholder="Phone Number"
          className="p-1 w-[400px]  border-b-2"
          {...formik.getFieldProps("phoneNumber")}
        />
        {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
          <div className="text-red-500">* {formik.errors.phoneNumber}</div>
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

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          className="p-1 w-[400px]  border-b-2"
          {...formik.getFieldProps("confirmPassword")}
        />
        {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
          <div className="text-red-500">* {formik.errors.confirmPassword}</div>
        ) : null}

        <button
          className="border p-2 rounded-lg text-xl active:border-black"
          type="submit"
        >
          Sign Up
        </button>
        <p
          className="cursor-pointer"
          onClick={() => {
            setIsNew(false);
          }}
        >
          Already have an account?
        </p>

        <p className="text-red-500 text-center">{error}</p>
      </form>
    </div>
  );
};

export default Register;
