import React from "react";
import Signin from "../../components/signin/Signin";
<<<<<<< HEAD
import style from "../SignIn/SignIn.module.css"
import { Helmet } from "react-helmet-async";

function SignIn() {
  return(
  <div className={style.container}>
    <Helmet>
      <title>تسجيل الدخول</title>
      <meta name="description" content = "تسجيل الدخول"></meta>
      <link rel="canoncial"  href="/signin"/>
    </Helmet>
   <Signin />
   
  </div>
  )
=======
import style from "../SignIn/SignIn.module.css";
import { Helmet } from "react-helmet-async";

function SignIn() {
  return (
    <div className={style.container}>
      <Helmet>
        <title>تسجيل الدخول</title>
        <meta name="description" content="تسجيل الدخول"></meta>
        <link rel="canoncial" href="/signin" />
      </Helmet>
      <Signin />
    </div>
  );
>>>>>>> b862b33e879d57931a28395af05066112d9bcf2c
}

export default SignIn;
