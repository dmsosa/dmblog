import { ChangeEvent, useState } from "react";
import FormFieldset from "../FormFieldset";

function FooterForm() {
    const [emailForm, setEmailForm ] = useState("");
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEmailForm(e.target.value);
    }
    return (
        <form className="form-footer">
            <fieldset>
            <FormFieldset 
            title="Subscribe to our newsletter"
            type="email"
            name="newsletter"
            minLength={5}
            changeHandler={handleChange}
            value={emailForm}
            placeholder={"put your email"}>
            </FormFieldset>
            </fieldset>
        </form>
    );
}

export default FooterForm;