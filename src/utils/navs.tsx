import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { MyLandingPage } from '../components/LandingPage'

export const LandingPage = () => {
  const { t } = useTranslation('plugin__console-demo-plugin');
  return <MyLandingPage title={t('Welcome LLNL HPC Scientists')}/>;
};
