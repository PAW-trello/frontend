import React from "react";
import {
  Button,
  Form,
  Input,
  Container,
  Row,
  Col,
  Toast,
  ToastBody,
  ToastHeader
} from "reactstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import api from "../../utils/api";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


const initialValues = {
  email: "",
  password: ""
};
const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Zły email")
    .required("Uzupełnij")
});
export const Login = () => {
  const handleSubmit = ({ password, email }: typeof initialValues) => {
    api
      .login({ email, password })
      .then(({ ok, data }) => {
        if (ok) {
          api.setAuthorizationHeader(data as string);
          toast.success("Zalogowano");
          console.log(data);
        } else {
          console.log(data);
          toast.error("Błąd logowania");
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
          {" "}
          <Form>
            <Formik
              initialValues={initialValues}
              onSubmit={handleSubmit}
              validationSchema={validationSchema}
            >
              {({
                values: { password, email },
                errors,
                touched,
                handleSubmit,
                handleChange,
                handleBlur
              }) => {
                return (
                  <>
                    <ToastContainer/>
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
                    <Button type="submit" onClick={handleSubmit}>
                      Zaloguj
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
