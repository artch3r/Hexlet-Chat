import { useFormik } from 'formik';
import * as yup from 'yup';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../providers/AuthProvider';
import routes from '../../../routes.js';

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
          disabled={formik.isSubmitting}
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
          disabled={formik.isSubmitting}
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

export default LoginForm;
