import { useTranslation } from "react-i18next";
import notFoundImage from '../../images/notFound.svg';
import routes from '../../routes.js';

export const NotFoundPage = () => {
  const { t } = useTranslation();

  return (
    <div className="text-center">
      <img alt={t('notFoundPage.notFound')} className='img-fluid h-25' src={notFoundImage} />
      <h1 className="h4 text-muted">{t('notFoundPage.notFound')}</h1>
      <p className="text-muted">{t('notFoundPage.canRedirect')} <a href={routes.mainPage()}>{t('notFoundPage.onMain')}</a></p>
    </div>
  );
}