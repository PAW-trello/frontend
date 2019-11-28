import React, {useState} from "react";
import {
  Button,
  Form,
  Input,
  Container,
  Row,
  Col,
} from "reactstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import api from "../../utils/api";
import {toast} from "react-toastify";

import {useHistory} from 'react-router-dom'

const initialValues = {
  email: "",
  password: ""
};
const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Zły email")
    .required("Uzupełnij email"),
    password: Yup.string().required("Uzupełnij hasło")
});
export const Login = () => {
  const history = useHistory()
  const [loading, setLoading] = useState(false)
  const handleSubmit = ({ password, email }: typeof initialValues) => {
    setLoading(true)
    api
      .login({ email, password })
      .then(({ ok, data }) => {
        if (ok) {
          // @ts-ignore
          api.setAuthorizationHeader(data.auth_token as string);
          toast.success("Zalogowano");
          history.push('/')
        } else {
          setLoading(false)
          toast.error("Błąd logowania");
        }
      })
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
                values: { password, email },
                errors,
                touched,
                handleSubmit,
                handleChange,
                handleBlur
              }) => {
                return (
                  <>
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
                    <Button type="submit" onClick={handleSubmit} disabled={loading}>
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
