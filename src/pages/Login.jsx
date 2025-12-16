import { Form, Link, useNavigate } from "react-router-dom";
import { FormInput, SubmitBtn } from "../components";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useState } from "react";
import { customFetch } from "../utils";
import { useDispatch } from "react-redux";
import { useCartGlobalContext } from "../context/cartContext";
import { userGlobal } from "../context/userContext";
import { Helmet } from 'react-helmet-async';




const url = "/api/v1/auth/signin";
export default function Login() {

  const {GetUserCart} = useCartGlobalContext()
  const {setName,setUser} = userGlobal()
  const [loading, setloading] = useState(false)

  const navigate = useNavigate()
  // const[ErrorMessage,setErrorMessage] =useState('')

  let validate = Yup.object().shape({
    email: Yup.string().email("email is invalid").required("email is invalid"),

    password: Yup.string()
      .matches(/^[A-Z][a-z0-9]{5,10}$/, "password must be uppercase")
      .required(),
  });

  function Login(values) {
    setloading(true)
    customFetch
      .post(url, values)
      .then((response) => {
        
        if (response.data.message === "success") {
          setloading(false);
          localStorage.setItem("token", response?.data.token);
          setUser(response?.data.token)
          localStorage.setItem("name",response?.data.user.name)
          setName(response?.data.user.name)
         toast.success(`Welcome ${response?.data.user.name}`);
         GetUserCart()
          navigate("/");
        }
        
      })
      .catch((err) => {
        setloading(false)
         toast.error(err.response.data.message);
        
      });
  }

  const { values, touched, handleChange, handleSubmit, handleBlur, errors } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      onSubmit: Login,
      validationSchema: validate,
    });

  return (
    <section className="min-h-screen bg-gradient-to-b from-green-50 to-white flex items-center justify-center p-4">
        <Helmet>
        <title>Login</title>
      </Helmet>
      <div className="w-full max-w-md">
        {/* Logo/Brand Area */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl mb-4 shadow-lg">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
          <p className="text-gray-600">Enter your credentials to access your account</p>
        </div>

        <Form
          onSubmit={handleSubmit}
          method="post"
          className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-green-200 p-8 space-y-6"
        >
          <div className="space-y-5">
            <div className="relative">
              <FormInput
                type="email"
                name="email"
                label="Email Address"
                value={values.email}
                handleChange={handleChange}
                handleBlur={handleBlur}
                touched={touched}
              />
              {errors.email && touched.email && (
                <p className="mt-2 text-sm text-red-600 flex items-center gap-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.email}
                </p>
              )}
            </div>

            <div className="relative">
              <FormInput
                type="password"
                name="password"
                label="Password"
                value={values.password}
                handleChange={handleChange}
                handleBlur={handleBlur}
                touched={touched}
              />
              {errors.password && touched.password && (
                <p className="mt-2 text-sm text-red-600 flex items-center gap-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.password}
                </p>
              )}
            </div>
          </div>

          <div className="pt-2">
            <SubmitBtn isloading={loading} text="Sign In" />
          </div>
          
          <div className="space-y-4 pt-4 border-t border-gray-100">
            <div className="text-center">
              <p className="text-gray-600">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="font-semibold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent hover:from-green-700 hover:to-emerald-700 transition-all duration-200"
                >
                  Sign up
                </Link>
              </p>
            </div>
            
            <div className="text-center">
              <Link 
                to="/forgetpassword" 
                className="text-sm text-gray-500 hover:text-gray-700 transition-colors duration-200"
              >
                Forgot your password?
              </Link>
            </div>
          </div>
        </Form>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-xs text-gray-400">
            Secure login powered by industry-standard encryption
          </p>
        </div>
      </div>
    </section>
  );
}
