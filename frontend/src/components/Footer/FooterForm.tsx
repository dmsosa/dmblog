import React, { ChangeEvent, useState } from "react";
import FormFieldset from "../FormFieldset";

function FooterForm() {
  const [show, setShow] = useState(false);
  const [emailForm, setEmailForm] = useState("");
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmailForm(e.target.value);
  };

  const showNewsletter = () => {
    setShow(!show);
  };

  const handleSubmitNewsletter = (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <div className="footer-col col-12 row row-cols-2">
      <div className="col-6">
        <button
          className={
            show
              ? `btn btn-newsletter col-12`
              : `btn btn-newsletter show col-12`
          }
          onClick={showNewsletter}
        >
          Newsletter
        </button>
        <form
          className={show ? `footer-form show col-6` : `footer-form col-12`}
          onSubmit={handleSubmitNewsletter}
        >
          <fieldset>
            <FormFieldset
              title="Subscribe to our newsletter"
              type="email"
              name="newsletter"
              minLength={5}
              changeHandler={handleChange}
              value={emailForm}
              placeholder={"Put your email into it!"}
            ></FormFieldset>
            <button className="btn btn-form" onClick={showNewsletter}>
              Subscribe
            </button>
          </fieldset>
        </form>
      </div>
      <form className="footer-form show col-6">
        <fieldset>
          <FormFieldset
            title="Send me a message"
            type="email"
            name="email message"
            minLength={5}
            changeHandler={handleChange}
            value={emailForm}
            placeholder={"put your email"}
          ></FormFieldset>
          <button className="btn btn-form">Send</button>
        </fieldset>
      </form>
    </div>
  );
}

export default FooterForm;
