import { Card } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import loginImage from '../../../images/login.jpeg';
import routes from '../../../routes';

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

export default LoginCard;
