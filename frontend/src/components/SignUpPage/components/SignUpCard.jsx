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

// const SignUpCard = ({ children }) => {
//   const { t } = useTranslation();

//   return (
//     <Card className="shadow-sm">
//       <Card.Body
// className="d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
//         <div>
//           <img
//             src={signUpImage}
//             className="rounded-circle"
//             alt={t('signUpPage.registration')}
//           />
//         </div>
//         {children}
//       </Card.Body>
//       <Card.Footer className="p-4">
//         <div className="text-center">
//           <span>
//             {t('signUpPage.alreadyHave')}
//             {' '}
//           </span>
//           <a href={pageRoutes.loginPage()}>{t('signUpPage.login')}</a>
//         </div>
//       </Card.Footer>
//     </Card>
//   );
// };
