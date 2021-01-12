import React from 'react';
import $ from './button.module.scss';
import joinClassNames from 'src/utils/join-class-names';
import switchCase from 'src/utils/switch-case';

interface Props {
    active?: boolean,
    event?: React.Dispatch<React.SetStateAction<any>>,
    eventValue?: unknown,
    eventFocus?: ((value: unknown) => void),
    label?: string,
    type: string,
    data?: string,
    disabled?: boolean,
    className?: string,
    tabindex?: number;
}

export const buttonClasses = {
    small: `${$.button} ${$.small}`,
    button: $.button,
};

const getButton = switchCase(buttonClasses);

const Button: React.FunctionComponent<Props> = ({
    children, className,
    label, active,
    eventValue, type,
    disabled, data,
    tabindex,
    event,
}) => {
    const buttonType = getButton(type);
    return (
        <button
            onClick={event && (() => { event(eventValue); })}
            className={joinClassNames(className, buttonType, active && $.active)}
            type="button"
            disabled={!!disabled}
            data-label={data}
            tabIndex={tabindex || 0}
        >
            {label}
            {children}
        </button>
    );
};

export default Button;
