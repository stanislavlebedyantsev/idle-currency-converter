import React, { useEffect } from 'react';
import Router from '@/components/wrappers/Router';
import '@/App.css';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '@/types/rootStateTypes';
import i18next from 'i18next';
import { setLanguage } from '@/actions';

function App(): React.ReactElement {
  const dispatch = useDispatch();
  const { language } = useSelector((state: IRootState) => state.language);
  const isLanguageExist = i18next.languages.find(
    (element: string) => element === language
  );
  useEffect(() => {
    if (!language) {
      dispatch(setLanguage(navigator.language));
    }
    if (language && isLanguageExist) {
      i18next.changeLanguage(language);
    } else if (!isLanguageExist) {
      i18next.changeLanguage('en-US');
    }
  }, [dispatch]);
  return <Router />;
}

export default App;
