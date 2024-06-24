import './index.scss';

import React from 'react';
import Loader from 'react-loader';

const BoxLoader = ({ top = '30%', lines = 3, scale = 1.5 }) => {
    return (
        <div className={'box-loader'}>
            <Loader
                lines={lines}
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
                top={top}
                left="50%"
                scale={scale}
            />
        </div>
    )
}

export default BoxLoader;