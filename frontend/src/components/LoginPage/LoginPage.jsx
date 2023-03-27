import { useFormik } from 'formik';
import * as yup from 'yup';
import {
  Card, Form, Button, Container, Row,
} from 'react-bootstrap';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import loginImage from '../../images/login.jpeg';
import { useAuth } from '../providers/AuthProvider.jsx';
import routes from '../../routes';

const LoginCard = ({ children }) => {
  const { t } = useTranslation();

  return (
    <Card className="shadow-sm">
      <Card.Body className="row p-5">
        <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
          <img
            src={loginImage}
            className="rounded-circle"
            alt={t('loginPage.enter')}
          />
        </div>
        {children}
      </Card.Body>
      <Card.Footer className="p-4">
        <div className="text-center">
          <span>
            {t('loginPage.noAccount')}
            {' '}
          </span>
          <a href={routes.signUpPage()}>{t('loginPage.registration')}</a>
        </div>
      </Card.Footer>
    </Card>
  );
};

const LoginForm = () => {
  const { t } = useTranslation();
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
        const res = await axios.post(routes.apiLogin(), values);
        auth.logIn(res.data);
        navigate(routes.mainPage());
      } catch (error) {
        formik.setSubmitting(false);
        console.log('error', error);
        if (error.isAxiosError) {
          if (error.message === 'Network Error') {
            toast.error(t('toasts.networkError'));
            return;
          }

          if (error.response.status === 401) {
            setAuthFailed(true);
            inputRef.current.select();
            return;
          }
        }

        throw error;
      }
    },
  });

  return (
    <Form
      className="col-12 col-md-6 mt-3 mt-mb-0"
      onSubmit={formik.handleSubmit}
    >
      <h1 className="text-center mb-4">{t('loginPage.enter')}</h1>
      <Form.Group className="form-floating mb-3">
        <Form.Control
          name="username"
          autoComplete="username"
          required
          placeholder={t('loginPage.nickname')}
          id="username"
          type="login"
          isInvalid={authFailed}
          ref={inputRef}
          onChange={formik.handleChange}
          value={formik.values.username}
        />
        <Form.Label htmlFor="username">{t('loginPage.nickname')}</Form.Label>
      </Form.Group>
      <Form.Group className="form-floating mb-4">
        <Form.Control
          name="password"
          autoComplete="current-password"
          required
          placeholder={t('loginPage.password')}
          id="password"
          type="password"
          isInvalid={authFailed}
          onChange={formik.handleChange}
          value={formik.values.password}
        />
        <Form.Label htmlFor="password">{t('loginPage.password')}</Form.Label>
        <Form.Control.Feedback type="invalid">
          {t('loginPage.incorrectData')}
        </Form.Control.Feedback>
      </Form.Group>
      <Button
        type="submit"
        value="submit"
        variant="outline-primary"
        className="w-100 mb-3"
        disabled={formik.isSubmitting}
      >
        {t('loginPage.enter')}
      </Button>
    </Form>
  );
};

const LoginPage = () => (
  <Container fluid className="h-100">
    <Row className="justify-content-center align-content-center h-100">
      <div className="col-12 col-md-8 col-xxl-6">
        <LoginCard>
          <LoginForm />
        </LoginCard>
      </div>
    </Row>
  </Container>
);

export default LoginPage;
