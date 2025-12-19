import { useTranslation } from 'react-i18next';
import PageContainer from '@/components/layout/PageContainer';

export default function About() {
  const { t } = useTranslation();

  return (
    <PageContainer>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-display font-bold text-light-text-primary dark:text-dark-text-primary mb-8">
          {t('pages.about.title')}
        </h1>
        <p className="text-light-text-secondary dark:text-dark-text-secondary">
          {t('pages.about.content')}
        </p>
      </div>
    </PageContainer>
  );
}

