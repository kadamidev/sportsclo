import React, { useState } from "react"
import { useFormik } from "formik"
import * as Yup from "yup"

export default function AuthForm(type) {
  const [message, setMessage] = useState({ message: "", color: "green" })

  const register = async (values) => {
    const resp = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
    const json = await resp.json()
    if (resp.ok) {
      setMessage({ message: "Registered successfully", color: "green" })
      return true
    } else {
      setMessage({ message: json.message, color: "red" })
      return false
    }
  }

  const form = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(4, "Must be 4 characters or more")
        .max(32, "Must be 32 characters or less")
        .required("Required"),
      password: Yup.string()
        .min(6, "Must be 6 characters long or more")
        .max(256, "Must be 256 characters or less")
        .required("Required"),
    }),
    onSubmit: (values) => {
      //register api
      register(values)
    },
  })

  return (
    <div>
      <form onSubmit={form.handleSubmit}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          id="username"
          onChange={form.handleChange}
          onBlur={form.handleBlur}
          value={form.values.username}
        />
        {form.errors.username && form.touched.username ? (
          <div>{form.errors.username}</div>
        ) : null}

        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          onChange={form.handleChange}
          onBlur={form.handleBlur}
          value={form.values.password}
        />
        {form.errors.password && form.touched.password ? (
          <div>{form.errors.password}</div>
        ) : null}

        {message.message && (
          <div style={{ color: `${message.color}` }}>{message.message}</div>
        )}

        <button type="submit">{type === "Login" ? "Login" : "Register"}</button>
      </form>
    </div>
  )
}
