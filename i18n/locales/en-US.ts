export default defineI18nLocale(async (locale) => {
    return {
        error: {
            title: 'Error {code} !',
            404: 'Page not found',
            500: 'Internal server error',
            unknown: 'Unknown error'
        },
        language: {
            fr: 'French',
            en: 'English'
        },
        theme: {
            auto: 'Auto',
            light: 'Light',
            dark: 'Dark'
        },
        store: {
            title: 'Store'
        },
        verbs: (await import('./en-US/verbs')).default,
        home: (await import('./en-US/home')).default,
        products: (await import('./en-US/products')).default,
        account: (await import('./en-US/account')).default,
        about: (await import('./en-US/about')).default,
        checkout: (await import('./en-US/checkout')).default
    };
});