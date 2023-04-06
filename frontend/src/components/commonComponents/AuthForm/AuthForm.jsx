/* eslint-disable react/no-array-index-key */
import { Form, Button } from 'react-bootstrap';
import { useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const chooseControlType = (field) => {
  if (field === 'username') {
    return 'username';
  }
  if (field === 'password' || field === 'confirmPassword') {
    return 'password';
  }

  return null;
};

const handleChange = (formik, setAuthFailed) => (e) => {
  setAuthFailed(false);
  formik.handleChange(e);
};

const renderFeedback = (currentIndex, lastFieldIndex, field, type, errors, t) => {
  if (currentIndex === lastFieldIndex) {
    return errors[field]
      ? t(`errors.${errors[field]}`)
      : t(`errors.authFailed.${type}`);
  }

  return errors[field] && t(`errors.${errors[field]}`);
};

const AuthForm = ({ type, formik, authState }) => {
  const { t } = useTranslation();
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  useEffect(() => {
    if (authState.authFailed) {
      inputRef.current.select();
    }
  }, [authState.authFailed]);

  const fields = Object.keys(formik.values);
  const firstFieldIndex = 0;
  const lastFieldIndex = fields.length - 1;

  return (
    <Form
      className="col-12 col-md-6 mt-3 mt-mb-0"
      onSubmit={formik.handleSubmit}
    >
      <h1 className="text-center mb-4">{t(`${type}.formTitle`)}</h1>
      {fields.map((field, currentIndex) => (
        <Form.Group className="form-floating mb-3" key={currentIndex.toString()}>
          <Form.Control
            name={field}
            autoComplete={field}
            placeholder={t(`${type}.${field}`)}
            id={field}
            type={chooseControlType(field)}
            isInvalid={
              (formik.errors[field] && formik.touched[field]) || authState.authFailed
            }
            disabled={formik.isSubmitting}
            ref={currentIndex === firstFieldIndex ? inputRef : null}
            onChange={handleChange(formik, authState.setAuthFailed)}
            onBlur={formik.handleBlur}
            value={formik.values[field]}
          />
          <Form.Label htmlFor={field}>
            {t(`${type}.${field}`)}
          </Form.Label>
          <Form.Control.Feedback type="invalid" tooltip>
            {renderFeedback(currentIndex, lastFieldIndex, field, type, formik.errors, t)}
          </Form.Control.Feedback>
        </Form.Group>
      ))}
      <Button
        type="submit"
        value="submit"
        variant="outline-primary"
        className="w-100"
        disabled={formik.isSubmitting}
      >
        {t(`${type}.formButton`)}
      </Button>
    </Form>
  );
};

export default AuthForm;
