/**
 * Form validation utilities
 */

// Common validation patterns
const validationPatterns = {
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    password:
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/,
    name: /^[a-zA-Z\s'-]{2,50}$/,
    username: /^[a-zA-Z0-9_-]{3,20}$/,
    phone: /^\+?[0-9]{10,15}$/,
    numeric: /^[0-9]+$/,
    date: /^\d{4}-\d{2}-\d{2}$/,
    alphaNumeric: /^[a-zA-Z0-9\s]+$/,
};

// Error messages for different validation types
const errorMessages = {
    required: "This field is required.",
    email: "Please enter a valid email address.",
    password:
        "Password must be at least 8 characters and include uppercase, lowercase, number, and special character.",
    confirmPassword: "Passwords do not match.",
    name: "Please enter a valid name.",
    username:
        "Username must be 3-20 characters and contain only letters, numbers, underscores, or hyphens.",
    phone: "Please enter a valid phone number.",
    min: "This field must have at least {0} characters.",
    max: "This field cannot exceed {0} characters.",
    numeric: "Please enter a valid number.",
    date: "Please enter a valid date in YYYY-MM-DD format.",
    alphaNumeric: "This field can only contain letters and numbers.",
};

// Initialize form validation for a specific form
function initFormValidation(formId) {
    const form = document.getElementById(formId);

    if (!form) return false;

    // Get all form inputs
    const inputs = form.querySelectorAll("input, select, textarea");

    // Add blur event listeners to all inputs for real-time validation
    inputs.forEach((input) => {
        input.addEventListener("blur", function () {
            validateInput(input);
        });
    });

    return true;
}

// Validate a specific input based on its attributes
function validateInput(input) {
    // Reset previous validation state
    const errorElement = document.getElementById(input.id + "Error");
    if (errorElement) {
        errorElement.style.display = "none";
    }

    // Required validation
    if (input.hasAttribute("required") && !input.value.trim()) {
        showError(input, errorMessages.required);
        return false;
    }

    // Skip further validation if field is empty and not required
    if (!input.value.trim() && !input.hasAttribute("required")) {
        return true;
    }

    // Email validation
    if (input.type === "email") {
        if (!validationPatterns.email.test(input.value)) {
            showError(input, errorMessages.email);
            return false;
        }
    }

    // Password validation
    if (input.type === "password" && input.id !== "confirmPassword") {
        if (
            input.getAttribute("data-validate") === "password" &&
            !validationPatterns.password.test(input.value)
        ) {
            showError(input, errorMessages.password);
            return false;
        }
    }

    // Confirm password validation
    if (input.id === "confirmPassword") {
        const passwordInput =
            document.getElementById("password") ||
            document.getElementById("newPassword");
        if (passwordInput && input.value !== passwordInput.value) {
            showError(input, errorMessages.confirmPassword);
            return false;
        }
    }

    // Name validation
    if (input.getAttribute("data-validate") === "name") {
        if (!validationPatterns.name.test(input.value)) {
            showError(input, errorMessages.name);
            return false;
        }
    }

    // Username validation
    if (input.getAttribute("data-validate") === "username") {
        if (!validationPatterns.username.test(input.value)) {
            showError(input, errorMessages.username);
            return false;
        }
    }

    // Phone validation
    if (
        input.type === "tel" ||
        input.getAttribute("data-validate") === "phone"
    ) {
        if (!validationPatterns.phone.test(input.value)) {
            showError(input, errorMessages.phone);
            return false;
        }
    }

    // Numeric validation
    if (input.getAttribute("data-validate") === "numeric") {
        if (!validationPatterns.numeric.test(input.value)) {
            showError(input, errorMessages.numeric);
            return false;
        }
    }

    // Min length validation
    if (input.hasAttribute("minlength")) {
        const minLength = parseInt(input.getAttribute("minlength"), 10);
        if (input.value.length < minLength) {
            showError(input, errorMessages.min.replace("{0}", minLength));
            return false;
        }
    }

    // Max length validation
    if (input.hasAttribute("maxlength")) {
        const maxLength = parseInt(input.getAttribute("maxlength"), 10);
        if (input.value.length > maxLength) {
            showError(input, errorMessages.max.replace("{0}", maxLength));
            return false;
        }
    }

    // Date validation
    if (
        input.type === "date" ||
        input.getAttribute("data-validate") === "date"
    ) {
        if (!validationPatterns.date.test(input.value)) {
            showError(input, errorMessages.date);
            return false;
        }
    }

    // Alpha-numeric validation
    if (input.getAttribute("data-validate") === "alphaNumeric") {
        if (!validationPatterns.alphaNumeric.test(input.value)) {
            showError(input, errorMessages.alphaNumeric);
            return false;
        }
    }

    // Custom pattern validation
    if (input.hasAttribute("pattern")) {
        const pattern = new RegExp(input.getAttribute("pattern"));
        if (!pattern.test(input.value)) {
            const customMessage =
                input.getAttribute("data-error-message") ||
                "Please match the requested format.";
            showError(input, customMessage);
            return false;
        }
    }

    return true;
}

// Show error message for an input
function showError(input, message) {
    const errorElement = document.getElementById(input.id + "Error");

    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = "block";
    } else {
        // If no error element exists, create one
        const newErrorElement = document.createElement("span");
        newErrorElement.id = input.id + "Error";
        newErrorElement.className = "error-text";
        newErrorElement.textContent = message;
        newErrorElement.style.display = "block";

        // Insert after the input
        input.parentNode.insertBefore(newErrorElement, input.nextSibling);
    }

    // Add error class to input
    input.classList.add("error");
}

// Validate entire form
function validateForm(formId) {
    const form = document.getElementById(formId);

    if (!form) return false;

    // Get all form inputs
    const inputs = form.querySelectorAll("input, select, textarea");

    let isValid = true;

    // Validate each input
    inputs.forEach((input) => {
        if (!validateInput(input)) {
            isValid = false;
        }
    });

    return isValid;
}

// Clear form errors
function clearFormErrors(formId) {
    const form = document.getElementById(formId);

    if (!form) return;

    // Remove all error messages
    const errorElements = form.querySelectorAll(".error-text");
    errorElements.forEach((element) => {
        element.style.display = "none";
    });

    // Remove error class from inputs
    const inputs = form.querySelectorAll(".error");
    inputs.forEach((input) => {
        input.classList.remove("error");
    });
}
