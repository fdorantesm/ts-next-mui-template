// Basic localization hooks - minimal implementation

export function useLocales() {
  return {
    currentLang: 'en',
    allLangs: [
      { label: 'English', value: 'en' },
      { label: 'Español', value: 'es' },
    ],
    onChangeLang: (lang: string) => {
      console.log('Language changed to:', lang);
    },
  };
}

export function useTranslate() {
  return (key: string) => key; // Simple passthrough implementation
}
