import './index.scss';

import React from 'react';
import Loader from 'react-loader';

const GlobalLoader = () => {
    return (
        <div className={'global-loader'}>
            <Loader
                lines={3}
                length={10}
                width={3}
                radius={3}
                corners={0}
                rotate={90}
                direction={1}
                color={'#531D8B'}
                speed={1.3}
                trail={160}
                shadow={false}
                hwaccel={true}
                zIndex={2e9}
                top="45%"
                left="50%"
                scale={2}
            />
        </div>
    )
}

export default GlobalLoader;