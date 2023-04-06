import { useTranslation } from 'react-i18next';
import notFoundImage from '../../images/notFound.svg';
import { pageRoutes } from '../../routes.js';

const NotFoundPage = () => {
  const { t } = useTranslation();

  return (
    <div className="text-center">
      <img
        alt={t('notFound.notFound')}
        className="img-fluid h-25"
        src={notFoundImage}
      />
      <h1 className="h4 text-muted">{t('notFound.notFound')}</h1>
      <p className="text-muted">
        {t('notFound.canRedirect')}
        {' '}
        <a href={pageRoutes.mainPage()}>{t('notFound.onMain')}</a>
      </p>
    </div>
  );
};

export default NotFoundPage;
