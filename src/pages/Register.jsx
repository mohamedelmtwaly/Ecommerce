import { Form,Link, useNavigate } from "react-router-dom";
import { FormInput, SubmitBtn } from "../components";
import { useFormik } from "formik";
import * as Yup from "yup";
import { customFetch } from "../utils";
import { useState } from "react";
import { toast } from "react-toastify";
import { userGlobal } from "../context/userContext";
import { Helmet } from 'react-helmet-async';

const url = '/api/v1/auth/signup'
export default function Register() {
  const [loading, setloading] = useState(false)
    const[ErrorMessage,setErrorMessage] =useState('')
    const navigate = useNavigate()
    const{setName,setUser}= userGlobal()


  let validate = Yup.object().shape({
    name: Yup.string()
      .min(3, "name is minLength 3")
      .max(10, "name is maxLength 10")
      .required("name is required"),
    email: Yup.string().email("email is invalid").required("email is invalid"),
    phone: Yup.string()
      .matches(/^01[0125][0-9]{8}$/, "phone is invalid")
      .required(),
    password: Yup.string()
      .matches(/^[A-Z][a-z0-9]{5,10}$/, "password must be uppercase")
      .required(),
    rePassword: Yup.string()
      .oneOf([Yup.ref("password")], "password and rePassword not match")
      .required(),
  });

          function Register(values){
            setloading(true)
                customFetch.post(url,values).then((response)=>{

                  if(response?.data.message === "success"){
                    setloading(false);
                    localStorage.setItem("token", response?.data.token)
                    setUser(response?.data.token)
                    localStorage.setItem("name",response?.data.user.name)
                    setName(response?.data.user.name)
                    toast.success(" Account successfully registered")
                    navigate('/')
                  }
                }).catch((err)=>{
                  setloading(false);

                  setErrorMessage(err.response.data.message)
                  toast.error(err.response.data.message)
                })
          }

        const {values,touched,handleChange,handleSubmit,handleBlur ,errors} = useFormik({
          initialValues: {
            name: "",
            email: "",
            password: "",
            rePassword: "",
            phone: "",
          },
          onSubmit :Register,
          validationSchema:validate
        })



  return (
    <section className="min-h-screen bg-gradient-to-b from-green-50 to-white flex items-center justify-center p-4">
        <Helmet>
        <title>Register</title>
      </Helmet>
      <div className="w-full max-w-md">
        {/* Logo/Brand Area */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl mb-4 shadow-lg">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path>
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h1>
          <p className="text-gray-600">Join us today and start shopping</p>
        </div>

        <Form onSubmit={handleSubmit} className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-green-200 p-8 space-y-6">
          <div className="space-y-5">
            <div className="relative">
              <FormInput type='text' name='name' label='Full Name' value={values.name} handleChange={handleChange} handleBlur={handleBlur} touched={touched} />
              {errors.name && touched.name && (
                <p className="mt-2 text-sm text-red-600 flex items-center gap-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.name}
                </p>
              )}
            </div>

            <div className="relative">
              <FormInput type='email' name='email' label='Email Address' value={values.email} handleChange={handleChange} handleBlur={handleBlur} touched={touched} />
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
              <FormInput type='password' name='password' label='Password' value={values.password} handleChange={handleChange} handleBlur={handleBlur} touched={touched} />
              {errors.password && touched.password && (
                <p className="mt-2 text-sm text-red-600 flex items-center gap-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.password}
                </p>
              )}
            </div>

            <div className="relative">
              <FormInput type='password' name='rePassword' label='Confirm Password' value={values.rePassword} handleChange={handleChange} handleBlur={handleBlur} touched={touched} />
              {errors.rePassword && touched.rePassword && (
                <p className="mt-2 text-sm text-red-600 flex items-center gap-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.rePassword}
                </p>
              )}
            </div>

            <div className="relative">
              <FormInput type='tel' name='phone' label='Phone Number' value={values.phone} handleChange={handleChange} handleBlur={handleBlur} touched={touched} />
              {errors.phone && touched.phone && (
                <p className="mt-2 text-sm text-red-600 flex items-center gap-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.phone}
                </p>
              )}
            </div>
          </div>

          <div className="pt-2">
            <SubmitBtn isloading={loading} text='Create Account' />
          </div>
          
          <div className="space-y-4 pt-4 border-t border-gray-100">
            <div className="text-center">
              <p className="text-gray-600">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-semibold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent hover:from-green-700 hover:to-emerald-700 transition-all duration-200"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </Form>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-xs text-gray-400">
            By creating an account, you agree to our Terms of Service
          </p>
        </div>
      </div>
    </section>
  )
}