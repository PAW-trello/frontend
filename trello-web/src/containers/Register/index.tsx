import React from "react";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Container,
  Row,
  Col
} from "reactstrap";

import api from "../../utils/api";
import * as Yup from "yup";
import { Formik } from "formik";
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const initialValues = {
  email: "",
  username: "",
  password: "",
  password_confirmation: ""
};
const validationSchema = Yup.object().shape({
  username: Yup.string().required("Uzupełnij nazwe użtkownika"),
  password: Yup.string().required("Uzupełnij hasło"),
  password_confirmation: Yup.string().required("Uzupełnij ponownie hasło"),
  email: Yup.string()
    .email("Źle podany email")
    .required("Uzupełnij email")
});
export const Register = () => {
  const handleSubmit = ({
    username,
    email,
    password,
    password_confirmation
  }: typeof initialValues) => {
    console.log(username + email + password + password_confirmation )
   api
      .register({
        username,
        email,
        password,
        password_confirmation
      }).then(({ok, data}) => {
        if (ok) {
          toast.success("Zarejestrowano");
        } else {
          console.log(data)
          toast.error("Błąd podczas rejestracji", {
            position: toast.POSITION.TOP_RIGHT
          });
        }
      })
      .catch(e => {
        console.log(e);
      });

  };

  return (
    <Container>
      <Row>
        <Col sm="12" md={{ size: 6, offset: 3 }}>
          <Form>
            <Formik
              initialValues={initialValues}
              onSubmit={handleSubmit}
              validationSchema={validationSchema}
            >
              {({
                values: { password, email, username, password_confirmation },
                errors,
                touched,
                handleSubmit,
                handleChange,
                handleBlur
              }) => {
                return (
                  <>
                    <ToastContainer/>
                    <label htmlFor="username" style={{ display: "block" }}>
                      Nazwa użytkownika
                    </label>
                    <Input
                      id="username"
                      placeholder="Wpisz nazwę"
                      type="text"
                      value={username}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    {errors.username && touched.username && (
                      <div className="input-feedback">{errors.username}</div>
                    )}
                    <label htmlFor="email" style={{ display: "block" }}>
                      Email
                    </label>
                    <Input
                      id="email"
                      placeholder="Wpisz email"
                      type="text"
                      value={email}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    {errors.email && touched.email && (
                      <div className="input-feedback">{errors.email}</div>
                    )}
                    <label htmlFor="email" style={{ display: "block" }}>
                      Hasło
                    </label>
                    <Input
                      id="password"
                      placeholder="Wpisz Hasło"
                      type="password"
                      value={password}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    {errors.password && touched.password && (
                      <div className="input-feedback">{errors.password}</div>
                    )}

                    <label htmlFor="email" style={{ display: "block" }}>
                      Potwierdzenie hasła
                    </label>
                    <Input
                      id="password_confirmation"
                      placeholder="Potwierdź Hasło"
                      type="password"
                      value={password_confirmation}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    {errors.password_confirmation &&
                      touched.password_confirmation && (
                        <div className="input-feedback">
                          {errors.password_confirmation}
                        </div>
                      )}

                    <Button type="submit" onClick={handleSubmit}>
                      Zarejestruj się
                    </Button>
                  </>
                );
              }}
            </Formik>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};
