import './index.scss';

import React, { useState } from "react";
import { Tabs as MaterialTabs, Tab } from '@material-ui/core';

const Tabs = ({ items, children, scrollable, initialValue, classes, centered = false, onTabChanged }) => {

    const [value, setValue] = useState(initialValue || 0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
        onTabChanged && onTabChanged(newValue);
    };

    const renderTabs = (tabs) => tabs.map((tab, index) => <Tab value={index} key={index} aria-controls={index} label={tab} id={index} />)

    const renderContents = (contents) => {
        return React.Children.map(contents.filter(content => !!content), (content, index) => {
            return index === value ? React.cloneElement(content) : null;
        })
    }

    return (
        <div className={`tabs ${centered ? 'tabs--centered' : ''}`}>
            <div className={`tabs__panel ${classes || ''}`}>
                <MaterialTabs value={value} centered={centered} variant={scrollable ? 'scrollable' : 'fullWidth'} onChange={handleChange}>
                    {renderTabs(items)}
                </MaterialTabs>
            </div>
            <div className={'tabs__content'}>
                {renderContents(children)}
            </div>
        </div>
    )
};

export default Tabs;