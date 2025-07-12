// Validation utility functions
class ValidationManager {
    static validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    static validateRequired(value) {
        return value && value.trim().length > 0;
    }

    static validateName(name) {
        return name && name.trim().length >= 2 && /^[a-zA-Z\s]+$/.test(name.trim());
    }

    static validateForm(formData) {
        const errors = {};

        // First Name validation
        if (!this.validateRequired(formData.firstName)) {
            errors.firstName = 'First name is required';
        } else if (!this.validateName(formData.firstName)) {
            errors.firstName = 'First name must be at least 2 characters and contain only letters';
        }

        // Last Name validation
        if (!this.validateRequired(formData.lastName)) {
            errors.lastName = 'Last name is required';
        } else if (!this.validateName(formData.lastName)) {
            errors.lastName = 'Last name must be at least 2 characters and contain only letters';
        }

        // Email validation
        if (!this.validateRequired(formData.email)) {
            errors.email = 'Email is required';
        } else if (!this.validateEmail(formData.email)) {
            errors.email = 'Please enter a valid email address';
        }

        // Department validation
        if (!this.validateRequired(formData.department)) {
            errors.department = 'Department is required';
        }

        // Role validation
        if (!this.validateRequired(formData.role)) {
            errors.role = 'Role is required';
        }

        return errors;
    }

    static displayErrors(errors) {
        // Clear previous errors
        const errorElements = document.querySelectorAll('.error-message');
        errorElements.forEach(element => element.textContent = '');
        
        const inputElements = document.querySelectorAll('input, select');
        inputElements.forEach(element => element.classList.remove('error'));

        // Display new errors
        Object.keys(errors).forEach(field => {
            const errorElement = document.getElementById(`${field}Error`);
            const inputElement = document.getElementById(field);
            
            if (errorElement && inputElement) {
                errorElement.textContent = errors[field];
                inputElement.classList.add('error');
            }
        });
    }

    static clearErrors() {
        const errorElements = document.querySelectorAll('.error-message');
        errorElements.forEach(element => element.textContent = '');
        
        const inputElements = document.querySelectorAll('input, select');
        inputElements.forEach(element => element.classList.remove('error'));
    }
}