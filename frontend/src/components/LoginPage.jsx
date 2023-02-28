import { useFormik } from 'formik';
import * as yup from 'yup';
import { Card, Form } from 'react-bootstrap';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import loginImage from '../images/login.jpeg';
import useAuth from '../hooks';

const LoginCard = ({ children }) => (
  <Card className="shadow-sm">
    <Card.Body className="row p-5">
      <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
        <img src={loginImage} className="rounded-circle" alt="Войти" />
      </div>
      {children}
    </Card.Body>
    <Card.Footer>
      <div className="text-center">
        <span>Нет аккаунта?</span>
        <a href="/singup">Регистрация</a>
      </div>
    </Card.Footer>
  </Card>
);

const LoginForm = () => {
  const [authFailed, setAuthFailed] = useState(false);
  const inputRef = useRef();
  const navigate = useNavigate();
  const auth = useAuth();
  useEffect(() => {
    inputRef.current.focus();
  }, []);
  
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: yup.object().shape({
      username: yup.string().required(),
      password: yup.string().required(),
    }),
    onSubmit: async (values) => {
      setAuthFailed(false);

      try {
        const res = await axios.post('../../api/v1/login', values);
        localStorage.setItem('userId', JSON.stringify(res.data));
        auth.logIn();
        navigate('/');
      } catch(error) {
        formik.setSubmitting(false);
        if (error.isAxiosError && error.response.status === 401) {
          setAuthFailed(true);
          inputRef.current.select();
          return;
        }

        throw error;
      }
    },
  });

  return (
    <Form className="col-12 col-md-6 mt-3 mt-mb-0" onSubmit={formik.handleSubmit}>
      <h1 className="text-center mb-4">Войти</h1>
      <Form.Group className="form-floating mb-3">
        <Form.Control
          name="username"
          autoComplete="username"
          required=""
          placeholder="Ваш ник"
          id="username"
          type="login"
          isInvalid={authFailed}
          ref={inputRef}
          onChange={formik.handleChange} 
          value={formik.values.username} />
        <Form.Label htmlFor="username">Ваш ник</Form.Label>
      </Form.Group>
      <Form.Group className="form-floating mb-4">
        <Form.Control 
          name="password" 
          autoComplete="current-password" 
          required="" 
          placeholder="Пароль" 
          id="password" 
          type="password"
          isInvalid={authFailed}
          onChange={formik.handleChange}
          value={formik.values.password}
        />
        <Form.Label htmlFor="oassword">Пароль</Form.Label>
        <Form.Control.Feedback type="invalid">Неверные имя пользователя или пароль</Form.Control.Feedback>
      </Form.Group>
      <button type="submit" className="w-100 mb-3 btn btn-outline-primary" value="submit">Войти</button>
    </Form>
  )
  
};

export const LoginPage = () => {
  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <LoginCard>
            <LoginForm />
          </LoginCard>
        </div>
      </div>
    </div>
  )
};
