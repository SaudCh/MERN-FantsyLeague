export const loginValidation = (data) => {
    let errors = {};

    if (!data.email) {
        errors.email = "Email Is Required."
    }
    else if (!/\S+@\S+\.\S+/.test(data.email)) {
        errors.email = "Invalid Email"
    }
    if (!data.password) {
        errors.password = "Password is required."
    }
    else if (data.password.length < 6) {
        errors.password = "Password must be more than six characters"
    }

    return errors;
}