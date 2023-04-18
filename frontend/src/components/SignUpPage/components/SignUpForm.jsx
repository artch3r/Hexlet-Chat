import { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useAuth } from '../../providers/AuthProvider';
import { pageRoutes, apiRoutes } from '../../../routes';
import AuthForm from '../../commonComponents/AuthForm/AuthForm';

const SignUpForm = () => {
  const { t } = useTranslation();
  const [authFailed, setAuthFailed] = useState(false);
  const auth = useAuth();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: yup.object().shape({
      username: yup.string().min(3, 'incorrectUsernameLength').max(20, 'incorrectUsernameLength').required('requiredField'),
      password: yup.string().min(6, 'incorrectMinPasswordLength').max(20, 'incorrectMaxPasswordLength').required('requiredField'),
      confirmPassword: yup
        .string()
        .required('requiredField')
        .oneOf([yup.ref('password')], 'shouldConfirm'),
    }),
    onSubmit: async (values) => {
      setAuthFailed(false);

      try {
        const res = await axios.post(apiRoutes.signUp(), values);
        auth.logIn(res.data);
        navigate(pageRoutes.mainPage());
      } catch (error) {
        if (error.isAxiosError) {
          if (error.message === 'Network Error') {
            toast.error(t('toasts.networkError'));
            return;
          }

          if (error.response.status === 409) {
            setAuthFailed(true);
            return;
          }

          throw error;
        }
      }
    },
    validateOnMount: true,
  });

  return <AuthForm type="signUp" formik={formik} authState={{ authFailed, setAuthFailed }} />;
};

export default SignUpForm;
