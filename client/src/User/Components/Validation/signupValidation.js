//validation function for register
export const signupValidation = (data) => {
    let errors = {};
    
    if (!data.name) {
        errors.name = "Name Is Required."
    }

    if (!data.email) {
        errors.email = "Email Is Required."
    }else if (!/\S+@\S+\.\S+/.test(data.email)) {
        errors.email = "Invalid Email"
    }
    if (!data.password) {
        errors.password = "Password is required."
    }else if (data.password.length < 6) {
        errors.password = "Password must be more than six characters"
    }

    if (!data.confirmPassword) {
        errors.confirmpassword = "Password is required."
    }else if (data.confirmPassword !== data.password) {
        errors.confirmpassword = "Password must be match"
    }

    return errors;
}