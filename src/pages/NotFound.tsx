import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import PageContainer from '@/components/layout/PageContainer';

export default function NotFound() {
  const { t } = useTranslation();

  return (
    <PageContainer>
      <div className="max-w-2xl mx-auto text-center space-y-6">
        <h1 className="text-6xl md:text-8xl font-display font-bold text-light-text-primary dark:text-dark-text-primary">
          {t('pages.notFound.title')}
        </h1>
        <h2 className="text-2xl md:text-3xl font-display font-semibold text-light-text-primary dark:text-dark-text-primary">
          {t('pages.notFound.subtitle')}
        </h2>
        <p className="text-light-text-secondary dark:text-dark-text-secondary">
          {t('pages.notFound.description')}
        </p>
        <Link
          to="/"
          className="inline-block btn-primary mt-8"
        >
          {t('pages.notFound.goHome')}
        </Link>
      </div>
    </PageContainer>
  );
}

