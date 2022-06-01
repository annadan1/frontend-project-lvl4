import axios from 'axios';
import * as yup from 'yup';
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { Button, Card, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/authContext.jsx';
import routes from '../routes.js';

function SignUp() {
  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, []);
  const auth = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [signupFailed, setSignupFailed] = useState(false);

  const f = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: yup.object().shape({
      username: yup
        .string()
        .min(3, t('signUp.errors.symbolsName'))
        .max(20, t('signUp.errors.symbolsName'))
        .required(t('signUp.errors.required')),
      password: yup
        .string()
        .min(6, t('signUp.errors.symbolsPassword'))
        .required(t('signUp.errors.required')),
      confirmPassword: yup
        .string()
        .oneOf([yup.ref('password')], t('signUp.errors.confirmPassword')),
    }),
    onSubmit: async ({ username, password }) => {
      setSignupFailed(false);
      try {
        const { data } = await axios.post(routes.signUpPath(), {
          username,
          password,
        });
        auth.logIn(data);
        navigate('/');
      } catch (err) {
        if (err.isAxiosError && err.response.status === 401) {
          setSignupFailed(true);
          inputRef.current.select();
          return;
        }
        if (err.response.status === 409) {
          setSignupFailed(true);
          inputRef.current.select();
          return;
        }
        throw err;
      }
    },
  });

  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-4 col-xxl-4">
          <Card className="shadow-sm">
            <Card.Body className="d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
              <Form onSubmit={f.handleSubmit}>
                <h1 className="text-center mb-4">{t('signUp.title')}</h1>
                <Form.Group className="form-floating mb-3">
                  <Form.Control
                    name="username"
                    autoComplete="username"
                    placeholder={t('signUp.username')}
                    id="username"
                    onChange={f.handleChange}
                    value={f.values.username}
                    isInvalid={
                      (f.errors.username && f.values.username !== '') || signupFailed
                    }
                    ref={inputRef}
                    disabled={f.isSubmitting}
                    required
                  />
                  <Form.Label htmlFor="username">
                    {t('signUp.username')}
                  </Form.Label>
                  {f.errors.username ? (
                    <Form.Control.Feedback type="invalid" tooltip>
                      {f.errors.username}
                    </Form.Control.Feedback>
                  ) : null}
                </Form.Group>
                <Form.Group className="form-floating mb-3">
                  <Form.Control
                    name="password"
                    autoComplete="password"
                    placeholder={t('signUp.password')}
                    id="password"
                    type="password"
                    onChange={f.handleChange}
                    value={f.values.password}
                    isInvalid={
                      (f.errors.password && f.values.password !== '') || signupFailed
                    }
                    disabled={f.isSubmitting}
                    required
                  />
                  <Form.Label htmlFor="password">
                    {t('signUp.password')}
                  </Form.Label>
                  {f.errors.password ? (
                    <Form.Control.Feedback type="invalid" tooltip>
                      {f.errors.password}
                    </Form.Control.Feedback>
                  ) : null}
                </Form.Group>
                <Form.Group className="form-floating mb-4">
                  <Form.Control
                    name="confirmPassword"
                    autoComplete="current-password"
                    placeholder={t('signUp.confirmPassword')}
                    id="confirmPassword"
                    type="password"
                    onChange={f.handleChange}
                    value={f.values.confirmPassword}
                    isInvalid={f.errors.confirmPassword || signupFailed}
                    disabled={f.isSubmitting}
                    required
                  />
                  <Form.Label htmlFor="confirmPassword">
                    {t('signUp.confirmPassword')}
                  </Form.Label>
                  {f.errors.confirmPassword || signupFailed ? (
                    <Form.Control.Feedback type="invalid" tooltip>
                      {f.errors.confirmPassword || t('signUp.errors.unique')}
                    </Form.Control.Feedback>
                  ) : null}
                </Form.Group>
                <Button
                  type="submit"
                  variant="outline-primary"
                  className="w-100 mb-3"
                >
                  {t('signUp.buttonSubmit')}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
