import React from "react";
import firebase from "../firebase";
import { Formik } from "formik";
import * as Yup from "yup";
import Logo from "../assets/full-logo.png";
import { useHistory } from "react-router-dom";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .label("Email")
    .email("Enter a registered email.")
    .required("Please enter a registered email."),
});

const ForgotPassword = (props) => {
  const history = useHistory();
  async function handleSubmit(values) {
    return new Promise(async (resolve, reject) => {
      if (values.email.length > 0) {
        await setTimeout(() => {
          firebase
            .auth()
            .sendPasswordResetEmail(values.email)

            .then(() => {
              alert(
                values.email +
                  "Please check email for password reset instructions."
              );
              resolve();
            })
            .catch((error) => {
              reject("firebase " + error);
            });
        }, 3000);
      }
    });
  }
  return (
    <div className="auth-container">
      <img className="logo" src={Logo} alt="logo" />
      <div className="auth-wrapper">
        <Formik
          initialValues={{ email: "" }}
          onSubmit={async (values, { resetForm }) => {
            try {
              await handleSubmit(values);
              history.push("/Login");
            } catch (error) {
              alert(error);
              resetForm();
            }
          }}
          validationSchema={validationSchema}
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
                  <button type="submit" disabled={isSubmitting}>
                    Send Email
                  </button>
                </form>
              </div>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};
export default ForgotPassword;
