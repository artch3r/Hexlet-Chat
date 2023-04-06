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
  });

  return <AuthForm type="login" formik={formik} authState={{ authFailed, setAuthFailed }} />;
};

export default LoginForm;

// const handleChange = (formik, setAuthFailed) => (e) => {
//   setAuthFailed(false);
//   formik.handleChange(e);
// };

// const LoginForm = () => {
//   const { t } = useTranslation();
//   const [authFailed, setAuthFailed] = useState(false);
//   const inputRef = useRef();
//   const navigate = useNavigate();
//   const auth = useAuth();

//   useEffect(() => {
//     inputRef.current.focus();
//   }, []);

//   useEffect(() => {
//     if (authFailed) {
//       inputRef.current.select();
//     }
//   }, [authFailed]);

//   const formik = useFormik({
//     initialValues: {
//       username: '',
//       password: '',
//     },
//     validationSchema: yup.object().shape({
//       username: yup.string().required('requiredField').trim(),
//       password: yup.string().required('requiredField').trim(),
//     }),
//     onSubmit: async (values) => {
//       setAuthFailed(false);

//       try {
//         const res = await axios.post(apiRoutes.login(), values);
//         auth.logIn(res.data);
//         navigate(pageRoutes.mainPage());
//       } catch (error) {
//         formik.setSubmitting(false);

//         if (error.isAxiosError) {
//           if (error.message === 'Network Error') {
//             toast.error(t('toasts.networkError'));
//             return;
//           }

//           if (error.response.status === 401) {
//             setAuthFailed(true);
//             inputRef.current.select();
//             return;
//           }
//         }

//         throw error;
//       }
//     },
//   });

//   return (
//     <Form
//       className="col-12 col-md-6 mt-3 mt-mb-0"
//       onSubmit={formik.handleSubmit}
//     >
//       <h1 className="text-center mb-4">{t('loginPage.enter')}</h1>
//       <Form.Group className="form-floating mb-3">
//         <Form.Control
//           name="username"
//           autoComplete="username"
//           required
//           placeholder={t('loginPage.nickname')}
//           id="username"
//           type="login"
//           isInvalid={(formik.errors.username && formik.touched.username) || authFailed}
//           disabled={formik.isSubmitting}
//           ref={inputRef}
//           onChange={handleChange(formik, setAuthFailed)}
//           onBlur={formik.handleBlur}
//           value={formik.values.username}
//         />
//         <Form.Control.Feedback type="invalid" tooltip>
//           {formik.errors.username && t(`errors.${formik.errors.username}`)}
//         </Form.Control.Feedback>
//         <Form.Label htmlFor="username">{t('loginPage.nickname')}</Form.Label>
//       </Form.Group>
//       <Form.Group className="form-floating mb-4">
//         <Form.Control
//           name="password"
//           autoComplete="current-password"
//           required
//           placeholder={t('loginPage.password')}
//           id="password"
//           type="password"
//           isInvalid={(formik.errors.password && formik.touched.password) || authFailed}
//           disabled={formik.isSubmitting}
//           onChange={handleChange(formik, setAuthFailed)}
//           onBlur={formik.handleBlur}
//           value={formik.values.password}
//         />
//         <Form.Label htmlFor="password">{t('loginPage.password')}</Form.Label>
//         <Form.Control.Feedback type="invalid" tooltip>
//           {formik.errors.password
//             ? t(`errors.${formik.errors.password}`)
//             : t('loginPage.incorrectData')}
//         </Form.Control.Feedback>
//       </Form.Group>
//       <Button
//         type="submit"
//         value="submit"
//         variant="outline-primary"
//         className="w-100 mb-3"
//         disabled={formik.isSubmitting || Object.values(formik.errors).length > 0}
//       >
//         {t('loginPage.enter')}
//       </Button>
//     </Form>
//   );
// };
