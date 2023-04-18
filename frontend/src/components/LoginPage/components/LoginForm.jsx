import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../providers/AuthProvider';
import { pageRoutes, apiRoutes } from '../../../routes.js';
import AuthForm from '../../commonComponents/AuthForm/AuthForm';

const LoginForm = () => {
  const { t } = useTranslation();
  const [authFailed, setAuthFailed] = useState(false);
  const navigate = useNavigate();
  const auth = useAuth();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: yup.object().shape({
      username: yup.string().required('requiredField').trim(),
      password: yup.string().required('requiredField').trim(),
    }),
    onSubmit: async (values) => {
      setAuthFailed(false);

      try {
        const res = await axios.post(apiRoutes.login(), values);
        auth.logIn(res.data);
        navigate(pageRoutes.mainPage());
      } catch (error) {
        formik.setSubmitting(false);

        if (error.isAxiosError) {
          if (error.message === 'Network Error') {
            toast.error(t('toasts.networkError'));
            return;
          }

          if (error.response.status === 401) {
            setAuthFailed(true);
            return;
          }
        }

        throw error;
      }
    },
    validateOnMount: true,
  });

  return <AuthForm type="login" formik={formik} authState={{ authFailed, setAuthFailed }} />;
};

export default LoginForm;
