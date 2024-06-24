import './index.scss';
import React from "react";
import {FormattedMessage} from "react-intl";

import { Paper } from "components/layout";


const Index = () => {
    return <div className={ 'page support-page' }>
        <Paper>
            <h1><FormattedMessage id={'words.common.support'}/></h1>
            <p dir="rtl"><a href="mailto:support@mshfa.app">support@mshfa.app</a>: بريد الالكتروني </p>
            <p dir="rtl"><span className="phone">+965 6660 4066: </span><span>هاتف </span></p>
            <p dir="rtl">            عنوان: السالمية قطعة 7 شارع حمد المبارك قسيمة 262 الدور الثاني</p>
            <p dir="rtl">عيادة طبية</p>
            <h2>Contacts</h2>
            <p><FormattedMessage id={'words.common.email'}/>: <a href="mailto:support@mshfa.app">support@mshfa.app</a></p>
            <p>Phone: <span className="phone">+965 6660 4066</span></p>
            <h2>Address:</h2>
            <p>Salmiya, Block 7, Hamad AlMubarak Street, Building 262, Second Floor</p>
            <p>Mshfa.app, available on apple store and google play</p>
            <p>Owners: ACT systems General trading Company</p>
        </Paper>
    </div>
}

export default Index;
