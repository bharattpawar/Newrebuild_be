const validator = require("validator");

const validate = (data) => {
    const mandatoryFields = ['firstName', 'emailId', 'password'];
    const missingFields = [];
    
    // Check for missing fields
    mandatoryFields.forEach(field => {
        if (!data[field] || data[field].trim() === '') {
            missingFields.push(field);
        }
    });
    
    if (missingFields.length > 0) {
        throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
    }
    
    // Validate firstName
    if (data.firstName.length < 3) {
        throw new Error("First name must be at least 3 characters long");
    }
    
    if (data.firstName.length > 50) {
        throw new Error("First name must be less than 50 characters");
    }
    
    if (!/^[a-zA-Z\s]+$/.test(data.firstName)) {
        throw new Error("First name can only contain letters and spaces");
    }
    
    // Validate email
    if (!validator.isEmail(data.emailId)) {
        throw new Error("Please enter a valid email address");
    }
    
    // Validate password
    if (!validator.isStrongPassword(data.password, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
    })) {
        throw new Error("Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character");
    }
}

module.exports = validate;