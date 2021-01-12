export const switchCase = (cases: any, defaultValue = null) => (
    (key: any) => cases[key] || cases.default || defaultValue
);
