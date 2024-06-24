import './index.scss';

import React from "react";
import { Link } from 'react-router-dom';

import { GlobalAppRouter } from 'routes';

const Footer = () => {
    return (
        <div className={'footer'}>
            <span className={'footer__copyright'}>© 2020 MSHFA. All right reserved.</span>
            <ul className={'footer__links'}>
                <Link className={'footer__link'} to={`${GlobalAppRouter.paths.legal}?tab=terms`}>Terms of Use</Link>
                <Link className={'footer__link'} to={`${GlobalAppRouter.paths.legal}?tab=policy`}>Privacy Policy</Link>
            </ul>
        </div>
    )
}

export default Footer;