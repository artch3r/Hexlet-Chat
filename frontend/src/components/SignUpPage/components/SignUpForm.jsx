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
  });

  return <AuthForm type="signUp" formik={formik} authState={{ authFailed, setAuthFailed }} />;
};

export default SignUpForm;

// const handleChange = (formik, setSignUpFailed) => (e) => {
//   setSignUpFailed(false);
//   formik.handleChange(e);
// };

// const SignUpForm = () => {
//   const { t } = useTranslation();
//   const [signUpFailed, setSignUpFailed] = useState(false);
//   const inputRef = useRef();
//   const auth = useAuth();
//   const navigate = useNavigate();

//   useEffect(() => {
//     inputRef.current.focus();
//   }, []);

//   useEffect(() => {
//     if (signUpFailed) {
//       inputRef.current.select();
//     }
//   }, [signUpFailed]);

//   const formik = useFormik({
//     initialValues: {
//       username: '',
//       password: '',
//       confirmPassword: '',
//     },
//     validationSchema: yup.object().shape({
//       username: yup.string().min(3, 'incorrectUsernameLength')
// .max(20, 'incorrectUsernameLength').required('requiredField'),
//       password: yup.string().min(6, 'incorrectMinPasswordLength')
// .max(20, 'incorrectMaxPasswordLength').required('requiredField'),
//       confirmPassword: yup
//         .string()
//         .required('requiredField')
//         .oneOf([yup.ref('password')], 'shouldConfirm'),
//     }),
//     onSubmit: async (values) => {
//       setSignUpFailed(false);

//       try {
//         const res = await axios.post(apiRoutes.signUp(), values);
//         auth.logIn(res.data);
//         navigate(pageRoutes.mainPage());
//       } catch (error) {
//         if (error.isAxiosError) {
//           if (error.message === 'Network Error') {
//             toast.error(t('toasts.networkError'));
//             return;
//           }

//           if (error.response.status === 409) {
//             setSignUpFailed(true);
//             inputRef.current.select();
//             return;
//           }

//           throw error;
//         }
//       }
//     },
//   });

//   return (
//     <Form
//       className="col-12 col-md-6 mt-3 mt-mb-0"
//       onSubmit={formik.handleSubmit}
//     >
//       <h1 className="text-center mb-4">{t('signUpPage.registration')}</h1>
//       <Form.Group className="form-floating mb-3">
//         <Form.Control
//           name="username"
//           autoComplete="username"
//           placeholder={t('signUpPage.incorrectUsernameLength')}
//           id="username"
//           type="login"
//           isInvalid={
//             (formik.errors.username && formik.touched.username) || signUpFailed
//           }
//           disabled={formik.isSubmitting}
//           ref={inputRef}
//           onChange={handleChange(formik, setSignUpFailed)}
//           onBlur={formik.handleBlur}
//           value={formik.values.username}
//         />
//         <Form.Label htmlFor="username">
//           {t('signUpPage.username')}
//         </Form.Label>
//         <Form.Control.Feedback type="invalid">
//           {formik.errors.username && t(`errors.${formik.errors.username}`)}
//         </Form.Control.Feedback>
//       </Form.Group>
//       <Form.Group className="form-floating mb-3">
//         <Form.Control
//           name="password"
//           autoComplete="new-password"
//           placeholder={t('signUpPage.incorrectPasswordLength')}
//           id="password"
//           type="password"
//           aria-describedby="passwordHelpBlock"
//           isInvalid={
//             (formik.errors.password && formik.touched.password) || signUpFailed
//           }
//           disabled={formik.isSubmitting}
//           onChange={handleChange(formik, setSignUpFailed)}
//           onBlur={formik.handleBlur}
//           value={formik.values.password}
//         />
//         <Form.Label htmlFor="password">
//           {t('signUpPage.password')}
//         </Form.Label>
//         <Form.Control.Feedback type="invalid">
//           {formik.errors.password && t(`errors.${formik.errors.password}`)}
//         </Form.Control.Feedback>
//       </Form.Group>
//       <Form.Group className="form-floating mb-4">
//         <Form.Control
//           name="confirmPassword"
//           autoComplete="new-password"
//           placeholder={t('signUpPage.shouldConfirm')}
//           id="confirmPassword"
//           type="password"
//           isInvalid={
//             (formik.errors.confirmPassword && formik.touched.confirmPassword) || signUpFailed
//           }
//           disabled={formik.isSubmitting}
//           onChange={handleChange(formik, setSignUpFailed)}
//           onBlur={formik.handleBlur}
//           value={formik.values.confirmPassword}
//         />
//         <Form.Label htmlFor="confirmPassword">
//           {t('signUpPage.confirmPassword')}
//         </Form.Label>
//         <Form.Control.Feedback type="invalid">
//           {formik.errors.confirmPassword
//             ? t(`errors.${formik.errors.confirmPassword}`)
//             : t('errors.alreadyExist')}
//         </Form.Control.Feedback>
//       </Form.Group>
//       <Button
//         type="submit"
//         value="submit"
//         variant="outline-primary"
//         className="w-100"
//         disabled={formik.isSubmitting
//           || (Object.values(formik.errors).length > 0)}
//       >
//         {t('signUpPage.register')}
//       </Button>
//     </Form>
//   );
// };
