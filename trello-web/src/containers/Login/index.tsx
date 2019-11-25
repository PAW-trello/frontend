import React, { Component } from "react";
import {
  Button,
  Form,
  Input,
  Container,
  Row,
  Col
} from "reactstrap";
import { Formik } from "formik";
import * as Yup from "yup";

const initialValues = {
  email: '',
  password: ''
};
const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Zły email')
    .required('Uzupełnij'),
});
export const Login = () => {
  const handleSubmit = ({ password, email }: typeof initialValues) => {
    console.log(password + email);
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
                  <form onSubmit={handleSubmit}>
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
                  </form>
                );
              }}
            </Formik>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};
