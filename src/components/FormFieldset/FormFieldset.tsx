import { ReactNode } from "react";

function FormFieldset(
    {
        autoFocus,
        children,
        changeHandler,
        minLength,
        name,
        normal,
        placeholder,
        required,
        type,
        value,
    }
    : {
        autoFocus: boolean,
        children?: ReactNode | ReactNode[] | null,
        changeHandler: (e:React.ChangeEvent<HTMLInputElement>) => void,
        minLength: number | undefined,
        name: string,
        normal: boolean,
        placeholder: string | undefined,
        required: boolean,
        type: string,
        value: string,
    }
) {
    return(
        <fieldset
            className="form-group"
        >
            <input
                className={`form-control ${normal? "" : "form-control-lg"}`}
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