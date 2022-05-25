import axios from 'axios';
import * as yup from 'yup';
import React, { useEffect, useRef, useState } from 'react';
import { useFormik } from 'formik';
import { Button, Card, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/authContext.jsx';
import routes from '../routes.js';

const formSchema = yup.object().shape({
  username: yup
    .string()
    .min(3, 'От 3 до 20 символов')
    .max(20, 'От 3 до 20 символов')
    .required('Обязательное поле'),
  password: yup
    .string()
    .min(6, 'Не менее 6 символов')
    .required('Обязательное поле'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Пароли должны совпадать'),
});

function SignUp() {
  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, []);
  const auth = useAuth();
  const navigate = useNavigate();
  const [registrationFailed, setRegistrationFailed] = useState(false);

  const f = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: formSchema,
    onSubmit: async ({ username, password }) => {
      setRegistrationFailed(false);
      try {
        const { data } = await axios.post(routes.signUpPath(), {
          username,
          password,
        });
        auth.logIn(data);
        navigate('/');
      } catch (err) {
        if (err.isAxiosError && err.response.status === 401) {
          setRegistrationFailed(true);
          inputRef.current.select();
          return;
        }
        if (err.response.status === 409) {
          setRegistrationFailed(true);
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
            <Card.Body className="d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
              <Form onSubmit={f.handleSubmit}>
                <h1 className="text-center mb-4">Регистрация</h1>
                <Form.Group className="form-floating mb-3">
                  <Form.Control
                    name="username"
                    autoComplete="username"
                    placeholder="Имя пользователя"
                    id="username"
                    onChange={f.handleChange}
                    onBlur={f.handleBlur}
                    value={f.values.username}
                    isInvalid={(f.errors.username && f.touched.username) || registrationFailed}
                    ref={inputRef}
                    disabled={f.isSubmitting}
                    required
                  />
                  <Form.Label>Имя пользователя</Form.Label>
                  <Form.Control.Feedback type="invalid" tooltip>
                    {f.errors.username}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="form-floating mb-3">
                  <Form.Control
                    name="password"
                    autoComplete="password"
                    placeholder="Пароль"
                    id="password"
                    type="password"
                    onChange={f.handleChange}
                    onBlur={f.handleBlur}
                    value={f.values.password}
                    isInvalid={(f.errors.password && f.touched.password) || registrationFailed}
                    disabled={f.isSubmitting}
                    required
                  />
                  <Form.Label>Пароль</Form.Label>
                  <Form.Control.Feedback type="invalid" tooltip>
                    {f.errors.password}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="form-floating mb-4">
                  <Form.Control
                    name="confirmPassword"
                    autoComplete="current-password"
                    placeholder="Подтвердите пароль"
                    id="confirmPassword"
                    type="password"
                    onChange={f.handleChange}
                    value={f.values.confirmPassword}
                    isInvalid={f.errors.confirmPassword || registrationFailed}
                    disabled={f.isSubmitting}
                    required
                  />
                  <Form.Label>Подтвердите пароль</Form.Label>
                  <Form.Control.Feedback type="invalid" tooltip>
                    {f.errors.confirmPassword || 'Такой пользователь уже существует'}
                  </Form.Control.Feedback>
                </Form.Group>
                <Button
                  type="submit"
                  variant="outline-primary"
                  className="w-100 mb-3"
                >
                  Зарегистрироваться
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
