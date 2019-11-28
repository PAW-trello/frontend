import React, {useState} from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import api from "../../utils/api";
import {toast} from "react-toastify";

import {useHistory} from 'react-router-dom'
import { Form, Grid, Button } from 'semantic-ui-react';

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
                values: { password, email },
                errors,
                touched,
                handleSubmit,
                setFieldValue,
                setFieldTouched,
              }) => {
                return (
                  <>
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
                    <br/>
                    <Button onClick={() => handleSubmit()} type="submit" disabled={loading}>
                      Zaloguj
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
