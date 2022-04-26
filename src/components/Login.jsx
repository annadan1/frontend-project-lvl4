import React from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import { Link } from 'react-router-dom';

const schema = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().required(),
});

function Login() {
  const classForm = ['form-control'];
  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <div className="card shadow-sm">
            <div className="card-body row p-5 justify-content-center">
              <form className="col-12 col-md-6 mt-3 mt-mb-0">
                <h1 className="text-center mb-4">Войти</h1>
                <Formik
                  initialValues={{
                    username: '',
                    password: '',
                  }}
                  isSubmitting
                  onSubmit={(values) => {
                    console.log(values);
                  }}
                >
                  {({ values, errors, handleChange, handleSubmit }) => [
                    <div className="form-floating mb-3" key="1">
                      <input
                        name="username"
                        autoComplete="username"
                        required
                        placeholder="Ваш ник"
                        id="username"
                        className={classForm}
                        onChange={handleChange}
                        value={values.username}
                      />
                      <label htmlFor="username">Ваш ник</label>
                    </div>,
                    <div className="form-floating mb-4" key="2">
                      <input
                        name="password"
                        autoComplete="current-password"
                        required
                        placeholder="Пароль"
                        id="password"
                        type="password"
                        className={classForm}
                        onChange={handleChange}
                        value={values.password}
                      />
                      <label htmlFor="password">Пароль</label>
                      {errors.name && errors.password && (
                        <div className={'invalid-tooltip'}>
                          Неверные имя пользователя или пароль
                        </div>
                      )}
                    </div>,
                    <button
                      type="submit"
                      className="w-100 mb-3 btn btn-outline-primary"
                      onClick={handleSubmit}
                      key="3"
                    >
                      Войти
                    </button>,
                  ]}
                </Formik>
              </form>
            </div>
            <div className="card-footer p-4">
              <div className="text-center">
                <span>Нет аккаунта?</span>
                <Link to="/signup">Регистрация</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
