// src/constants/screenSizes.js
const sizes = {
    mobile: '768px',
};

export const device = {
    mobile: `(max-width: ${sizes.mobile})`,
    desktop: `(min-width: ${parseInt(sizes.mobile, 10) + 1}px)`,
};  