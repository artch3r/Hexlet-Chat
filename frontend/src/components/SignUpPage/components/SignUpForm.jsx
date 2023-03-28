import { Form, Button } from 'react-bootstrap';
import { useRef, useEffect, useState } from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useAuth } from '../../providers/AuthProvider';
import routes from '../../../routes';

const SignUpForm = () => {
  const { t } = useTranslation();
  const [signUpFailed, setSignUpFailed] = useState(false);
  const inputRef = useRef();
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const validationSchema = yup.object().shape({
    username: yup.string().min(3, 'incorrectUsernameLength').max(20, 'incorrectUsernameLength').required('requiredField'),
    password: yup.string().min(6, 'incorrectMinPasswordLength').max(20, 'incorrectMaxPasswordLength').required('requiredField'),
    confirmPassword: yup
      .string()
      .required('requiredField')
      .oneOf([yup.ref('password')], 'shouldConfirm'),
  });

  return (
    <Formik
      initialValues={{
        username: '',
        password: '',
        confirmPassword: '',
      }}
      validationSchema={validationSchema}
      onSubmit={async (values) => {
        setSignUpFailed(false);

        try {
          const res = await axios.post(routes.apiSignUp(), values);
          auth.logIn(res.data);
          navigate(routes.mainPage());
        } catch (error) {
          if (error.isAxiosError) {
            if (error.message === 'Network Error') {
              toast.error(t('toasts.networkError'));
              return;
            }

            if (error.response.status === 409) {
              setSignUpFailed(true);
              inputRef.current.select();
              return;
            }

            throw error;
          }
        }
      }}
    >
      {({
        handleSubmit, handleChange, values, isSubmitting, errors, touched,
      }) => (
        <Form
          className="col-12 col-md-6 mt-3 mt-mb-0"
          onSubmit={handleSubmit}
        >
          <h1 className="text-center mb-4">{t('signUpPage.registration')}</h1>
          <Form.Group className="form-floating mb-3">
            <Form.Control
              name="username"
              autoComplete="username"
              placeholder={t('signUpPage.incorrectUsernameLength')}
              id="username"
              type="login"
              isInvalid={
                (errors.username && touched.username) || signUpFailed
              }
              disabled={isSubmitting}
              ref={inputRef}
              onChange={handleChange}
              value={values.username}
            />
            <Form.Label htmlFor="username">
              {t('signUpPage.username')}
            </Form.Label>
            <Form.Control.Feedback type="invalid">
              {errors.username && t(`errors.${errors.username}`)}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="form-floating mb-3">
            <Form.Control
              name="password"
              autoComplete="new-password"
              placeholder={t('signUpPage.incorrectPasswordLength')}
              id="password"
              type="password"
              aria-describedby="passwordHelpBlock"
              isInvalid={
                (errors.password && touched.password) || signUpFailed
              }
              disabled={isSubmitting}
              onChange={handleChange}
              value={values.password}
            />
            <Form.Label htmlFor="password">
              {t('signUpPage.password')}
            </Form.Label>
            <Form.Control.Feedback type="invalid">
              {errors.password && t(`errors.${errors.password}`)}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="form-floating mb-4">
            <Form.Control
              name="confirmPassword"
              autoComplete="new-password"
              placeholder={t('signUpPage.shouldConfirm')}
              id="confirmPassword"
              type="password"
              isInvalid={
                (errors.confirmPassword && touched.confirmPassword) || signUpFailed
              }
              disabled={isSubmitting}
              onChange={handleChange}
              value={values.confirmPassword}
            />
            <Form.Label htmlFor="confirmPassword">
              {t('signUpPage.confirmPassword')}
            </Form.Label>
            <Form.Control.Feedback type="invalid">
              {errors.confirmPassword
                ? t(`errors.${errors.confirmPassword}`)
                : t('errors.alreadyExist')}
            </Form.Control.Feedback>
          </Form.Group>
          <Button
            type="submit"
            value="submit"
            variant="outline-primary"
            className="w-100"
            disabled={isSubmitting
              || (Object.values(errors).length > 0 && Object.values(touched).length > 0)}
          >
            {t('signUpPage.register')}
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default SignUpForm;
