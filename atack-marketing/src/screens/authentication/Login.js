import React, {useContext}from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import firebase from "../../firebase";
import { useHistory, Redirect  } from "react-router-dom";
import Logo from "../../assets/full-logo.png";
import { withRouter, Link } from "react-router-dom";
import { AuthContext } from "./Auth";

const Login = () => {
  const history = useHistory();
  async function handleSubmit(values) {
    return new Promise(async (resolve, reject) => {
      if (values.email.length > 0 && values.password.length > 0) {
        await setTimeout(() => {
          firebase
            .auth()
            .signInWithEmailAndPassword(values.email, values.password)
            .then(() => {
              if (firebase.auth().currentUser.emailVerified === false) {
                firebase.auth().signOut();
                reject("Please verify email address.");
              }
            })

            .then(() => {
              resolve();
            })
            .catch((error) => reject("Firebase " + error));
        }, 1000);
      }
    });
  }

  const { currentUser } = useContext(AuthContext);

  if (!!currentUser) {
    return <Redirect to="/" />;
  }

  return (
    <div className="auth-container">
      <img className="logo" src={Logo} alt="logo" />
      <div className="auth-wrapper">
        <h1>Login</h1>
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={async (values, { resetForm }) => {
            try {
              await handleSubmit(values);
              resetForm();
              history.push("/home");
            } catch (error) {
              alert(error);
              values.password = "";
            }
          }}
          validationSchema={Yup.object().shape({
            email: Yup.string()
              .email("Valid email address required.")
              .required("Password Required."),
            password: Yup.string()
              .required("Enter Password.")
              .min(6, "Minimum of 6 characters required.")
              .matches(/(?=.*[0-9])/, "Password must contain a number."),
          })}
        >
          {(props) => {
            const {
              values,
              touched,
              errors,
              isSubmitting,
              handleChange,
              handleBlur,
              handleSubmit,
            } = props;

            return (
              <div>
                <form onSubmit={handleSubmit}>
                  <label htmlFor="email">Email</label>
                  <input
                    name="email"
                    type="text"
                    placeholder="Email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={errors.email && touched.email && "error"}
                  />
                  {errors.email && touched.email && (
                    <div className="input-feedback">{errors.email}</div>
                  )}

                  <label htmlFor="email">Password</label>
                  <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={errors.password && touched.password && "error"}
                  />
                  {errors.password && touched.password && (
                    <div className="input-feedback">{errors.password}</div>
                  )}
                  <button type="submit" disabled={isSubmitting}>
                    Login
                  </button>
                </form>
                <p className="auth-link">
                  Forgot password?{" "}
                  <Link to="/forgotPassword">Reset password</Link>
                </p>
                <p className="auth-link">
                  Not a member? <Link to="/register">Register</Link>
                </p>
              </div>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};
export default withRouter(Login);
