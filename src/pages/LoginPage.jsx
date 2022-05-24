import axios from 'axios';
import * as yup from 'yup';
import React, { useEffect, useRef, useState } from 'react';
import { useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Form, Card } from 'react-bootstrap';
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
        <div className="col-12 col-md-4 col-xxl-3">
          <Card className="shadow-sm">
            <Card.Body className="row p-5 justify-content-center">
              <Form onSubmit={f.handleSubmit}>
                <h1 className="text-center mb-4">Войти</h1>
                <Form.Group className="form-floating mb-3">
                  <Form.Control
                    name="username"
                    autoComplete="username"
                    placeholder="Ваш ник"
                    id="username"
                    onChange={f.handleChange}
                    value={f.values.username}
                    isInvalid={authFailed}
                    ref={inputRef}
                    disabled={f.isSubmitting}
                  />
                  <Form.Label>Ваш ник</Form.Label>
                </Form.Group>
                <Form.Group className="form-floating mb-4">
                  <Form.Control
                    name="password"
                    autoComplete="current-password"
                    placeholder="Пароль"
                    id="password"
                    type="password"
                    onChange={f.handleChange}
                    value={f.values.password}
                    isInvalid={authFailed}
                    disabled={f.isSubmitting}
                  />
                  <Form.Label>Пароль</Form.Label>
                  <Form.Control.Feedback type="invalid">
                    Неверные имя пользователя или пароль
                  </Form.Control.Feedback>
                </Form.Group>
                <Button
                  type="submit"
                  variant="outline-primary"
                  className="w-100 mb-3"
                >
                  Войти
                </Button>
              </Form>
            </Card.Body>
            <Card.Footer className=" p-4">
              <Card.Text className="text-center">
                <span>Нет аккаунта? </span>
                <Link to="/signup">Регистрация</Link>
              </Card.Text>
            </Card.Footer>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Login;