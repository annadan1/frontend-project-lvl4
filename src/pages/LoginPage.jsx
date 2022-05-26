import axios from 'axios';
import * as yup from 'yup';
import React, { useEffect, useRef, useState } from 'react';
import { useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Form, Card } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import useAuth from '../hooks/authContext.jsx';
import routes from '../routes.js';

const formSchema = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().required(),
});

function Login() {
  const [authFailed, setAuthFailed] = useState(false);
  const navigate = useNavigate();
  const auth = useAuth();
  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, []);
  const { t } = useTranslation();

  const f = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: formSchema,
    onSubmit: async (values) => {
      setAuthFailed(false);
      try {
        const { data } = await axios.post(routes.loginPath(), values);
        auth.logIn(data);
        navigate('/');
      } catch (err) {
        if (err.isAxiosError && err.response.status === 401) {
          setAuthFailed(true);
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
                <h1 className="text-center mb-4">{t('loginPage.signIn')}</h1>
                <Form.Group className="form-floating mb-3">
                  <Form.Control
                    name="username"
                    autoComplete="username"
                    placeholder={t('loginPage.username')}
                    id="username"
                    onChange={f.handleChange}
                    value={f.values.username}
                    isInvalid={authFailed}
                    ref={inputRef}
                    disabled={f.isSubmitting}
                    required
                  />
                  <Form.Label>{t('loginPage.username')}</Form.Label>
                </Form.Group>
                <Form.Group className="form-floating mb-4">
                  <Form.Control
                    name="password"
                    autoComplete="current-password"
                    placeholder={t('loginPage.password')}
                    id="password"
                    type="password"
                    onChange={f.handleChange}
                    value={f.values.password}
                    isInvalid={authFailed}
                    disabled={f.isSubmitting}
                    required
                  />
                  <Form.Label>{t('loginPage.password')}</Form.Label>
                  <Form.Control.Feedback type="invalid">
                    {t('loginPage.error')}
                  </Form.Control.Feedback>
                </Form.Group>
                <Button
                  type="submit"
                  variant="outline-primary"
                  className="w-100 mb-3"
                >
                  {t('loginPage.signIn')}
                </Button>
              </Form>
            </Card.Body>
            <Card.Footer className=" p-4">
              <Card.Text className="text-center">
                <span>{t('loginPage.noAccount')}</span>
                <Link to="/signup">{t('loginPage.signUp')}</Link>
              </Card.Text>
            </Card.Footer>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Login;
