import { makeVar } from "@apollo/client";

export default {
    modalVar: makeVar({
        Component: null,
        props: null,
        options: null
    }),
    isNotificationsOpenVar: makeVar(false),
    doctorProfileRedirect: makeVar(''),
    couponProfileRedirect: makeVar(''),
    packageProfileRedirect: makeVar(''),
    adProfileRedirect: makeVar(''),
    advertisementProfileRedirect: makeVar(''),
    clinicProfileRedirect: makeVar(''),
    userLang: makeVar({
        lang: 'en',
    })
}