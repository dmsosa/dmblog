//createSlug *some may say 'slugify'*

export function slugify(title: string) {
  return title.trim().toLowerCase().replace(/\W+|_/g, "-");
}

export function dateFormatter(date?: Date | null): string {
  if (!date) return "";
  return new Date(date).toLocaleDateString("en", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function checkRegisterErrors({ username, email, password, confirmPassword } : { username: string | null, email: string | null, password: string | null, confirmPassword: string | null }) : boolean {

  
  cleanErrors();



  //Das Null Validierung
  const nullFields = checkNullError("reg-form", Object.keys({ username, email, password, confirmPassword }));
  if (nullFields.length > 0) {
    createAndAppendErrorDiv("reg-form", nullFields, "nullError");
    return true;
  }

  //Passwort Validierung
  const passwordErrors = checkPasswordErrors(password as string, confirmPassword as string);
  if (passwordErrors.length > 0) {
    for (let i = 0 ; i < passwordErrors.length ; i++) {
      createAndAppendErrorDiv("reg-form", "password", passwordErrors[i])
    }
    return true;
  }

  //Das Lange Validierung
  for (const [field, value] of Object.entries({ username, email, password, confirmPassword })) {
    let lengthError = checkLengthError(field, value as string);
    if (lengthError.length > 0) {
      createAndAppendErrorDiv("reg-form", field, lengthError);
      return true;
    }
  }
  
  return false;
}


function cleanErrors() {
  const errors = document.querySelectorAll(".form-error");

  for (let i = 0; i < errors.length ; i++) {
    errors[i].parentNode?.removeChild(errors[i]);
  }
}

function createAndAppendErrorDiv(formId: string, fieldName: string, message: string) {
  const errorMessages: {[key:string]: string} = {
    "nullError": "{fieldName} must not be null",
    "usernameMin": "Username must contain at least 4 characters",
    "usernameMax": "Username must contain at most 30 characters",
    "emailMin": "Emil must contain at least 4 characters",
    "emailMax": "Email must contain at most 30 characters",
    "passwordMin": "Password must contain at least 4 characters",
    "passwordMax": "Password must contain at most 22 characters",
    "confirmPassword": "The passwords must be equal",
    "specialCharacter": 'Must contain at least one special character \"~`! @#$%^&*()-_+={}[]|\;:"<>,./?\"',
    "number": "Must contain at least one number",
    "uppercase": "Must contain at least one uppercase letter",
    "lowercase": "Must contain at least one lowercase letter",
  }
  const errorDiv = document.createElement("div");
  errorDiv.classList.add("form-error");
  if (message === "nullError") {
    errorDiv.innerText = errorMessages[message].replace("{fieldName}", fieldName);
  } else {
    errorDiv.innerText = errorMessages[message];
  }

  const inputElement = document.getElementById(formId + '-' + fieldName);
  inputElement?.parentNode?.appendChild(errorDiv);
}

function checkNullError(formId:string, fields: string[]) : string {
  for (let i = 0; i < fields.length ; i++ ) {
    let inputElement = document.getElementById(formId + '-' + fields[i]) as HTMLInputElement;
    if (!inputElement.value) {
      return fields[i];
    };
  }
  return "";
}

function checkLengthError(field: string, value: string): string {
  const min = 4; let max;
  if (field === "username" || field === "email") {
    max = 30;
  } else if (field === "password") {
    max = 22;
  } else return "";

  if (value.length < min) {
    return field + "Min";
  } else if (value.length > max) {
    return field + "Max";
  } else return "";
}

function checkPasswordErrors(password: string, confirmPassword: string) : string[] {
  let passwordErrors = [];
  const specialCharacter = /[~`!@#$%^&*()\-_+=\\{}[\]|;:"<>,./?]+/g
  const number = /[^\s]*[0-9]+[^\s]*/g
  const uppercase = /[^\s]*[A-Z]+[^\s]*/g
  const lowercase = /[^\s]*[a-z]+[^\s]*/g

  if (password !== confirmPassword) {
    passwordErrors.push("confirmPassword");
  }
  if (!password.match(specialCharacter)) {
    passwordErrors.push("specialCharacter");
  }
  if (!password.match(number)) {
    passwordErrors.push("number");
  }
  if (!password.match(uppercase)) {
    passwordErrors.push("uppercase");
  }
  if (!password.match(lowercase)) {
    passwordErrors.push("lowercase");
  }
  return passwordErrors;
}


//For field, checkLength
//if checkLength.length > 0, createAndAppendError, return true