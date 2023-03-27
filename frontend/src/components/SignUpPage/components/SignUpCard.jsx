import { Card } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import signUpImage from '../../../images/signUp.jpg';
import routes from '../../../routes';

const SignUpCard = ({ children }) => {
  const { t } = useTranslation();

  return (
    <Card className="shadow-sm">
      <Card.Body className="d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
        <div>
          <img
            src={signUpImage}
            className="rounded-circle"
            alt={t('signUpPage.registration')}
          />
        </div>
        {children}
      </Card.Body>
      <Card.Footer className="p-4">
        <div className="text-center">
          <span>
            {t('signUpPage.alreadyHave')}
            {' '}
          </span>
          <a href={routes.loginPage()}>{t('signUpPage.login')}</a>
        </div>
      </Card.Footer>
    </Card>
  );
};

export default SignUpCard;
