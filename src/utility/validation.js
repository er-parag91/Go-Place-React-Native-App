
const validate = (value, rules, connectedValue) => {
    let isValid = true;

    for (let rule in rules) {
        switch (rule) {
            case 'isEmail':
                isValid = isValid && emailValidator(value)
                break;
                
            case 'minLength':
                isValid = isValid && minLengthValidator(value, rules[rule])
                break;
                
            case 'toEqual':
                isValid = isValid && isEqualValidator(value, connectedValue[rule])
                break;
                
            case 'notEmpty':
                isValid = isValid && isEmptyValidator(value)
                break;

            default:
                isValid = true;
        }
    }
    return isValid;
}

const emailValidator = value => {
    return  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value);
}

const minLengthValidator = (value, minLength) => {
    return value.length >= minLength;
}

const isEqualValidator = (value, compareValue) => {
    return value === compareValue;
}

const isEmptyValidator = value => {
    return value.trim() !== '';
}
 
export default  validate;