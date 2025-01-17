export default defineI18nLocale(async (locale) => {
    return {
        error: {
            title: 'Erreur {code} !',
            404: 'Page non trouvée',
            500: 'Erreur interne du serveur',
            unknown: 'Erreur inconnue'
        },
        language: {
            fr: 'Français',
            en: 'Anglais'
        },
        theme: {
            auto: 'Auto',
            light: 'Clair',
            dark: 'Sombre'
        },
        store: {
            title: 'Magasin'
        },
        verbs: (await import('./fr-FR/verbs')).default,
        home: (await import('./fr-FR/home')).default,
        products: (await import('./fr-FR/products')).default,
        account: (await import('./fr-FR/account')).default,
        about: (await import('./fr-FR/about')).default,
        order: (await import('./fr-FR/order')).default,
        checkout: (await import('./fr-FR/checkout')).default
    };
});