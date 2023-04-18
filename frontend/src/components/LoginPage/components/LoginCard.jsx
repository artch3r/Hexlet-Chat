import { useTranslation } from 'react-i18next';
import AuthCard from '../../commonComponents/AuthCard/AuthCard.jsx';
import loginImage from '../../../images/login.jpeg';
import { pageRoutes } from '../../../routes';

const LoginCard = ({ children }) => {
  const { t } = useTranslation();

  const image = { src: loginImage, alt: t('login.imageAlt') };

  const footer = { text: t('login.footerText'), hrefText: t('login.footerHrefText'), href: pageRoutes.signUpPage() };

  return (
    <AuthCard image={image} footer={footer}>
      {children}
    </AuthCard>
  );
};

export default LoginCard;
