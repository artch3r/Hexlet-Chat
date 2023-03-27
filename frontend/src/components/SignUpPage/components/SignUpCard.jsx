import { Card } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import signUpImage from '../../../images/signUp.jpg';

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
    </Card>
  );
};

export default SignUpCard;
