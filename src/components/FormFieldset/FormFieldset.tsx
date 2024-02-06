import { ReactNode } from "react";

function FormFieldset(
    {
        autoFocus=false,
        children,
        changeHandler,
        minLength,
        name,
        title,
        addClass="",
        placeholder,
        required=false,
        type,
        value,
    }
    : {
        autoFocus?: boolean,
        children?: ReactNode | ReactNode[] | null,
        changeHandler: (e:React.ChangeEvent<HTMLInputElement>) => void,
        minLength?: number | undefined,
        name: string,
        title: string,
        addClass?: string,
        placeholder: string | undefined,
        required?: boolean,
        type: string,
        value: string,
    }
) {
    return(
        <fieldset
            className="form-fieldset"
        >
            <label htmlFor={name} className="form-label">{title}</label>
            <input
                id={name}
                className={`form-input ${addClass.length>1? addClass : ""}`}
                onChange={changeHandler}
                minLength={minLength}
                placeholder={placeholder}
                name={name}
                autoFocus={autoFocus}
                required={required}
                type={type}
                value={value}
            />
            {children}
        </fieldset>
    )
}

export default FormFieldset;