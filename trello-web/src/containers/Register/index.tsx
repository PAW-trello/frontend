import React from "react";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Container,
  Row,
  Col,
} from "reactstrap";

import api from "../../utils/api";
import * as Yup from "yup";
import { Formik } from "formik";
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
  console.log('xDDDDDDD')
  const handleSubmit = ({
    username,
    email,
    password,
    password_confirmation
  }: typeof initialValues) => {
    console.log(username);
    console.log(email);
    console.log(password);
    console.log(password_confirmation);
    api
      .register({
        username,
        password,
        email,
        password_confirmation
      })
      .then(({ ok, data }) => {
        if (ok) {
         console.log('zostales zarejestrowany')
        } else {
          console.log('cos sie zjebalo');
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
                values: { username, password, email,password_confirmation },
                errors,
                touched,
                handleSubmit,
                handleChange,
                handleBlur
              }) => {
                return (
                  <>
                    <FormGroup>
                      <Label for="exampleEmail">Nazwa użytkownika</Label>
                      <Input
                        type="text"
                        name="username"
                        value={username}
                        onChange={handleChange("username")}
                        error={touched.username && (errors.username as string)}
                        placeholder="Wpisz nazwę użytkownika"
                        onBlur={handleBlur("username")}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label for="exampleEmail">Email</Label>
                      <Input
                        type="email"
                        name="email"
                        value={email}
                        onChange={handleChange("email")}
                        error={touched.email && (errors.email as string)}
                        onBlur={handleBlur("email")}
                        placeholder="Wpisz email"
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label for="examplePassword">Hasło</Label>
                      <Input
                        type="password"
                        name="password"
                        onChange={handleChange("password")}
                        onBlur={handleBlur("password")}
                        error={touched.password && (errors.password as string)}
                        value={password}
                        placeholder="Wpisz hasło"
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label for="examplePassword">Potwierdź hasło</Label>
                      <Input
                        type="password"
                        name="password_confirmation"
                        onChange={handleChange("password_confirmation")}
                        onBlur={handleBlur("password_confirmation")}
                        error={touched.password_confirmation && (errors.password_confirmation as string)}
                        value={password_confirmation}
                        placeholder="Wpisz ponownie hasło"
                      />
                    </FormGroup>

                    <Button onClick={handleSubmit}>Zarejestruj się</Button>
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
