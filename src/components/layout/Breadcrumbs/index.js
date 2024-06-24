import './index.scss';

import React from 'react';
import { Link, useParams } from 'react-router-dom';

import { replaceParamsPlaceholdersWithParamsValues } from 'utils/routes';

const Breadcrumbs = ({ route}) => {

    const params = useParams();

    const breadcrumbs = route.meta?.breadcrumbs;
    const title = route.meta?.title;
    const renderItem = (crumb) => {
        return (
            <li className={'breadcrumbs__item'} key={crumb.path}>
                <Link className={'breadcrumbs__link'} to={replaceParamsPlaceholdersWithParamsValues(crumb.path, params)}>{crumb.name}</Link>
            </li>
        )
    }

    const renderBreadcrumbs = (crumbs, title) => {
        return (
            <ul className={'breadcrumbs__list'}>
                {crumbs.map(renderItem)}
                <li className={'breadcrumbs__item'}>
                    <span className={'breadcrumbs__title'}>{title}</span>
                </li>
            </ul>
        )
    }

    return (
        <div className={'breadcrumbs'}>
            {breadcrumbs && renderBreadcrumbs(breadcrumbs, title)}
        </div>
    )
}

export default Breadcrumbs;