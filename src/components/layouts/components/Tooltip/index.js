import Tippy from '@tippyjs/react';
import React from 'react';
import 'tippy.js/dist/tippy.css';

const Tooltip = ({ children, ...rest }) => {
    return <Tippy {...rest}>{children}</Tippy>;
};

Tooltip.defaultProps = {
    animation: 'fade',
    arrow: true,
    delay: 150,
    theme: 'translucent',
};

export default Tooltip;
