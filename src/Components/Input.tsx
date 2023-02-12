import React, {ChangeEvent} from 'react';
import s from './Input.module.css';

type InputType = {
    onChange: (event: ChangeEvent<HTMLInputElement>) => void
    value: number
    color?: string
}

export const Input:React.FC<InputType> = (props) => {

    const {onChange, value, color} = props

    const finalInputClassName = `
    ${s.input}
    ${color === 'error' ? s.error : ''}
    `

    return (
        <div>
            <input
                type={"number"}
                onChange={props.onChange}
                value={props.value}
                className={finalInputClassName}
            />
        </div>
    );
};

