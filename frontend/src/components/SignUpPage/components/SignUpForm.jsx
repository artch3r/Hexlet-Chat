/* eslint-disable no-param-reassign */
import { Form, Button } from 'react-bootstrap';
import { useRef, useEffect } from 'react';
import { useImmer } from 'use-immer';
import { Formik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useAuth } from '../../providers/AuthProvider';
import routes from '../../../routes';

const checkErrors = (errors, isSubmitting, updateSignUpErrors) => {
  console.log('errors', errors);
  if (isSubmitting) {
    if (errors.username) {
      updateSignUpErrors((state) => {
        state.username = errors.username;
      });
    } else {
      updateSignUpErrors((state) => {
        state.username = null;
      });
    }

    if (errors.password) {
      updateSignUpErrors((state) => {
        state.password = errors.password;
      });
    } else {
      updateSignUpErrors((state) => {
        state.password = null;
      });
    }

    if (errors.confirmPassword) {
      updateSignUpErrors((state) => {
        state.confirmPassword = errors.confirmPassword;
      });
    } else {
      updateSignUpErrors((state) => {
        state.confirmPassword = null;
      });
    }
  }
};

const SignUpForm = () => {
  const { t } = useTranslation();
  const [signUpErrors, updateSignUpErrors] = useImmer({
    username: null,
    password: null,
    confirmPassword: null,
    alreadyExist: null,
  });
  const inputRef = useRef();
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  yup.setLocale({
    string: {
      min: ({ min }) => {
        if (min === 3) {
          return 'incorrectUsernameLength';
        }

        return 'incorrectPasswordLength';
      },
      max: 'incorrectMaxLength',
    },
    mixed: {
      required: 'requiredField',
      oneOf: 'shouldConfirm',
    },
  });

  const validationSchema = yup.object().shape({
    username: yup.string().min(3).max(20).required(),
    password: yup.string().min(6).max(20).required(),
    confirmPassword: yup
      .string()
      .required()
      .oneOf([yup.ref('password')]),
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
        updateSignUpErrors((state) => {
          state.alreadyExist = null;
        });

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
              updateSignUpErrors((state) => {
                state.alreadyExist = 'alreadyExist';
              });

              inputRef.current.select();
              return;
            }

            throw error;
          }
        }
      }}
    >
      {({
        handleSubmit, handleChange, values, isSubmitting, errors,
      }) => {
        checkErrors(errors, isSubmitting, updateSignUpErrors);

        return (
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
                  !!signUpErrors.username || !!signUpErrors.alreadyExist
                }
                ref={inputRef}
                onChange={handleChange}
                value={values.username}
              />
              <Form.Label htmlFor="username">
                {t('signUpPage.username')}
              </Form.Label>
              <Form.Control.Feedback type="invalid">
                {signUpErrors.username && t(`errors.${signUpErrors.username}`)}
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
                  !!signUpErrors.password || !!signUpErrors.alreadyExist
                }
                onChange={handleChange}
                value={values.password}
              />
              <Form.Label htmlFor="password">
                {t('signUpPage.password')}
              </Form.Label>
              <Form.Control.Feedback type="invalid">
                {signUpErrors.password && t(`errors.${signUpErrors.password}`)}
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
                  !!signUpErrors.confirmPassword || !!signUpErrors.alreadyExist
                }
                onChange={handleChange}
                value={values.confirmPassword}
              />
              <Form.Label htmlFor="confirmPassword">
                {t('signUpPage.confirmPassword')}
              </Form.Label>
              <Form.Control.Feedback type="invalid">
                {signUpErrors.confirmPassword
                  ? t(`errors.${signUpErrors.confirmPassword}`)
                  : t(`errors.${signUpErrors.alreadyExist}`)}
              </Form.Control.Feedback>
            </Form.Group>
            <Button
              type="submit"
              value="submit"
              variant="outline-primary"
              className="w-100"
              disabled={isSubmitting}
            >
              {t('signUpPage.register')}
            </Button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default SignUpForm;
