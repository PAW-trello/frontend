import React from "react";

import api from "../../utils/api";
import * as Yup from "yup";
import { Formik } from "formik";
import {toast} from 'react-toastify';
import { Grid, Form, Button } from 'semantic-ui-react';
import { useHistory } from 'react-router';

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
  const history = useHistory()
  const handleSubmit = ({
    username,
    email,
    password,
    password_confirmation
  }: typeof initialValues) => {
   api
      .register({
        username,
        email,
        password,
        password_confirmation
      }).then(({ok, data}) => {
        if (ok) {
          toast.success("Zarejestrowano");
          history.push('/login')
        } else {
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
    <Grid centered  >
      <Grid.Row>
        <Grid.Column mobile={16} computer={4}>
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
                setFieldValue,
                setFieldTouched
              }) => {
                return (
                  <>
                  <Form.Field>
                    <label>Nazwa uzytkownika</label>
                    <Form.Input 
                      fluid
                      placeholder='Nazwa uzytkownika' 
                      value={username} 
                      onChange={(e) => setFieldValue('username', e.target.value)}
                      error={touched.username && errors.username && errors.username}
                      onBlur={() => setFieldTouched('username', true)}
                    />
                  </Form.Field>
                  <Form.Field>
                    <label>E-mail</label>
                    <Form.Input 
                      fluid
                      placeholder='E-mail' 
                      value={email} 
                      onChange={(e) => setFieldValue('email', e.target.value)}
                      error={touched.email && errors.email && errors.email}
                      onBlur={() => setFieldTouched('email', true)}
                    />
                  </Form.Field>
                  <Form.Field>
                    <label>Password</label>
                    <Form.Input
                      type='password'
                      placeholder='Password'
                      value={password} 
                      onChange={(e) => setFieldValue('password', e.target.value)}
                      error={touched.password && errors.password && errors.password}
                      onBlur={() => setFieldTouched('password', true)}
                    />
                  </Form.Field>
                  <Form.Field>
                    <label>Password</label>
                    <Form.Input
                      type='password'
                      placeholder='Potwierdź hasło'
                      value={password_confirmation} 
                      onChange={(e) => setFieldValue('password_confirmation', e.target.value)}
                      error={touched.password_confirmation && errors.password_confirmation && errors.password_confirmation}
                      onBlur={() => setFieldTouched('password_confirmation', true)}
                    />
                  </Form.Field>
                  <br/>
                  <Button onClick={() => handleSubmit()} type="submit">
                    Zarejetruj
                  </Button>
                </>
                );
              }}
            </Formik>
          </Form>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};
