import { Container, Row, Card, Form, Button } from "react-bootstrap";
import { useRef, useEffect } from 'react';
import { useImmer } from "use-immer";
import { Formik } from "formik";
import * as yup from 'yup';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../providers/AuthProvider";
import signUpImage from '../../images/signUp.jpg';

const checkErrors = (errors, isSubmitting, updateSignUpErrors) => {
  if (isSubmitting) {
    if (errors.username) {
      updateSignUpErrors((state) => {
        state.username = errors.username;
      })
    } else {
      updateSignUpErrors((state) => {
        state.username = null;
      })
    }

    if (errors.password) {
      updateSignUpErrors((state) => {
        state.password = errors.password;
      })
    } else {
      updateSignUpErrors((state) => {
        state.password = null;
      })
    }

    if (errors.confirmPassword) {
      updateSignUpErrors((state) => {
        state.confirmPassword = errors.confirmPassword;
      })
    } else {
      updateSignUpErrors((state) => {
        state.confirmPassword = null;
      })
    }
  }
};

const SignUpCard = ({ children }) => (
  <Card className="shadow-sm">
    <Card.Body className="d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
      <div>
        <img src={signUpImage} className="rounded-circle" alt="Регистрация" />
      </div>
      {children}
    </Card.Body>
  </Card>
);

const SignUpForm = () => {
  const [signUpErrors, updateSignUpErrors] = useImmer({ username: null, password: null, confirmPassword: null, alreadyExist: null });
  const inputRef = useRef();
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  yup.setLocale({
    string: {
      min: 'От 3 до 20 символов',
      max: 'От 3 до 20 символов',
    },
    mixed: {
      required: 'Обязательное поле',
      oneOf: 'Пароли должны совпадать',
    },
  });

  const validationSchema = yup.object().shape({
    username: yup.string().min(3).max(20).required(),
    password: yup.string().min(6).max(20).required(),
    confirmPassword: yup.string().required().oneOf([yup.ref('password')])
  });


  return (
    <Formik
    initialValues={{
      username: '',
      password: '',
    }}
    validationSchema={validationSchema}
    onSubmit={async (values) => {
      updateSignUpErrors((state) => {
        state.alreadyExist = null;
      });

      try {
        const res = await axios.post('../../api/v1/signup', values);
        localStorage.setItem('userId', JSON.stringify(res.data));
        auth.logIn();
        navigate('/');
      } catch (error) {
        if (error.isAxiosError && error.response.status === 409) {
          updateSignUpErrors((state) => {
            state.alreadyExist = 'Такой пользователь уже существует';
          });

          inputRef.current.select();
          return;
        }
      }
    }}
    >
      {({ handleSubmit, handleChange, values, isSubmitting, errors }) => {
        checkErrors(errors, isSubmitting, updateSignUpErrors);

        return (
          <Form className="col-12 col-md-6 mt-3 mt-mb-0" onSubmit={handleSubmit}>
            <h1 className="text-center mb-4">Регистрация</h1>
            <Form.Group className="form-floating mb-3">
              <Form.Control
                name="username"
                autoComplete="username"
                placeholder="От 3 до 20 символов"
                id="username"
                type="login"
                isInvalid={!!signUpErrors.username || !!signUpErrors.alreadyExist}
                ref={inputRef}
                onChange={handleChange} 
                value={values.username} />
              <Form.Label htmlFor="username">Имя пользователя</Form.Label>
              <Form.Control.Feedback type="invalid">{signUpErrors.username}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="form-floating mb-3">
              <Form.Control 
                name="password" 
                autoComplete="new-password" 
                placeholder="Не менее 6 символов" 
                id="password" 
                type="password"
                aria-describedby='passwordHelpBlock'
                isInvalid={!!signUpErrors.password || !!signUpErrors.alreadyExist}
                onChange={handleChange}
                value={values.password}
              />
              <Form.Label htmlFor="password">Пароль</Form.Label>
              <Form.Control.Feedback type="invalid">{signUpErrors.password}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="form-floating mb-4">
              <Form.Control 
                name="confirmPassword" 
                autoComplete="new-password" 
                placeholder="Пароли должны совпадать" 
                id="confirmPassword" 
                type="password"
                isInvalid={!!signUpErrors.confirmPassword || !!signUpErrors.alreadyExist}
                onChange={handleChange}
                value={values.confirmPassword}
              />
              <Form.Label htmlFor="password">Подвтердите пароль</Form.Label>
              <Form.Control.Feedback type="invalid">{signUpErrors.confirmPassword || signUpErrors.alreadyExist}</Form.Control.Feedback>
            </Form.Group>
            <Button type="submit" value="submit" variant="outline-primary" className="w-100" disabled={isSubmitting}>Зарегистрироваться</Button>
          </Form>
        );
      }}
    </Formik>
  );
};

const SignUpPage = () => {
  return (
    <Container fluid className="h-100">
      <Row className="justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <SignUpCard>
            <SignUpForm />
          </SignUpCard>
        </div>
      </Row>
    </Container>
  );
};

export default SignUpPage;