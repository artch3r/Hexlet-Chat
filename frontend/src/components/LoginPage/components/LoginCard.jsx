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

// const LoginCard = ({ children }) => {
//   const { t } = useTranslation();

//   return (
//     <Card className="shadow-sm">
//       <Card.Body className="row p-5">
//         <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
//           <img
//             src={loginImage}
//             className="rounded-circle"
//             alt={t('loginPage.enter')}
//           />
//         </div>
//         {children}
//       </Card.Body>
//       <Card.Footer className="p-4">
//         <div className="text-center">
//           <span>
//             {t('loginPage.noAccount')}
//             {' '}
//           </span>
//           <a href={pageRoutes.signUpPage()}>{t('loginPage.registration')}</a>
//         </div>
//       </Card.Footer>
//     </Card>
//   );
// };
