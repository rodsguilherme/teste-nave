

const emailValidation = (email) => {
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (emailRegex.test(String(email).toLowerCase())) {
        return true;
    }
    else {
        return false;
    }
};

const telephoneValidation = (telephone) => {
    const telephoneRegex = '^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$';
    return telephoneRegex.test(telephone);
};
export default { emailValidation, telephoneValidation };