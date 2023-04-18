import { useTranslation } from 'react-i18next';
import AuthCard from '../../commonComponents/AuthCard/AuthCard';
import signUpImage from '../../../images/signUp.jpg';
import { pageRoutes } from '../../../routes';

const SignUpCard = ({ children }) => {
  const { t } = useTranslation();

  const image = { src: signUpImage, alt: t('signUp.registration') };

  const footer = { text: t('signUp.footerText'), hrefText: t('signUp.footerHrefText'), href: pageRoutes.loginPage() };

  return (
    <AuthCard image={image} footer={footer}>
      {children}
    </AuthCard>
  );
};

export default SignUpCard;
