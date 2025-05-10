// EmailJS Contact Form Integration
document.addEventListener('DOMContentLoaded', function() {
    // Initialize EmailJS
    // Replace 'YOUR_PUBLIC_KEY' with your actual EmailJS public key
    (function() {
        emailjs.init({
            publicKey: "YOUR_PUBLIC_KEY",
        });
    })();

    // Get all contact forms on the page
    const contactForms = document.querySelectorAll('#contact-form');

    if (contactForms.length === 0) return;

    contactForms.forEach(form => {
        form.addEventListener('submit', function(event) {
            event.preventDefault();

            // Get form data
            const name = form.querySelector('#name').value;
            const email = form.querySelector('#email').value;
            const subject = form.querySelector('#subject').value;
            const message = form.querySelector('#message').value;

            // Validate form data
            if (!validateForm(name, email, subject, message)) {
                return;
            }

            // Show loading state
            const submitButton = form.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.textContent;
            submitButton.disabled = true;

            // Set button text based on current language
            const currentLang = document.querySelector('.lang-btn.active').dataset.lang;
            submitButton.textContent = currentLang === 'hr' ? 'Šaljem...' : 'Sending...';

            // Prepare data for EmailJS
            const templateParams = {
                from_name: name,
                from_email: email,
                subject: subject,
                message: message
            };

            // Replace these with your actual EmailJS service ID and template ID
            // You'll need to set these up at emailjs.com
            const serviceID = 'YOUR_SERVICE_ID'; // Replace with your EmailJS service ID
            const templateID = 'YOUR_TEMPLATE_ID'; // Replace with your EmailJS template ID

            // Send email using EmailJS
            emailjs.send(serviceID, templateID, templateParams)
                .then(function(response) {
                    console.log('SUCCESS!', response.status, response.text);
                    showSuccessMessage(form, currentLang);
                    form.reset();
                }, function(error) {
                    console.log('FAILED...', error);
                    showErrorMessage(form, currentLang);
                })
                .finally(function() {
                    submitButton.disabled = false;
                    submitButton.textContent = originalButtonText;
                });

            // For testing purposes (uncomment this and comment out the emailjs.send above)
            /*
            setTimeout(function() {
                showSuccessMessage(form, currentLang);
                form.reset();
                submitButton.disabled = false;
                submitButton.textContent = originalButtonText;
            }, 1500);
            */
        });
    });

    // Form validation function
    function validateForm(name, email, subject, message) {
        let isValid = true;
        const currentLang = document.querySelector('.lang-btn.active').dataset.lang;

        // Clear previous error messages
        document.querySelectorAll('.error-message').forEach(el => el.remove());

        // Validate name
        if (name.trim() === '') {
            const nameInput = document.querySelector('#name');
            showValidationError(
                nameInput,
                currentLang === 'hr' ? 'Molimo unesite vaše ime' : 'Please enter your name'
            );
            isValid = false;
        }

        // Validate email
        if (email.trim() === '' || !isValidEmail(email)) {
            const emailInput = document.querySelector('#email');
            showValidationError(
                emailInput,
                currentLang === 'hr' ? 'Molimo unesite ispravnu email adresu' : 'Please enter a valid email address'
            );
            isValid = false;
        }

        // Validate subject
        if (subject.trim() === '') {
            const subjectInput = document.querySelector('#subject');
            showValidationError(
                subjectInput,
                currentLang === 'hr' ? 'Molimo unesite predmet' : 'Please enter a subject'
            );
            isValid = false;
        }

        // Validate message
        if (message.trim() === '') {
            const messageInput = document.querySelector('#message');
            showValidationError(
                messageInput,
                currentLang === 'hr' ? 'Molimo unesite poruku' : 'Please enter a message'
            );
            isValid = false;
        }

        return isValid;
    }

    // Email validation helper
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Show validation error
    function showValidationError(inputElement, message) {
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        errorElement.style.color = '#ffcc00';
        errorElement.style.fontSize = '0.85rem';
        errorElement.style.marginTop = '0.25rem';

        inputElement.parentNode.appendChild(errorElement);
        inputElement.style.borderColor = '#ffcc00';

        // Remove error when input changes
        inputElement.addEventListener('input', function() {
            errorElement.remove();
            inputElement.style.borderColor = '';
        }, { once: true });
    }

    // Show success message
    function showSuccessMessage(form, currentLang) {
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.textContent = currentLang === 'hr'
            ? 'Hvala vam! Vaša poruka je uspješno poslana.'
            : 'Thank you! Your message has been sent successfully.';
        successMessage.style.color = '#ffffff';
        successMessage.style.backgroundColor = 'rgba(0, 128, 0, 0.2)';
        successMessage.style.padding = '1rem';
        successMessage.style.borderRadius = '8px';
        successMessage.style.marginTop = '1rem';
        successMessage.style.textAlign = 'center';

        form.appendChild(successMessage);

        // Remove success message after 5 seconds
        setTimeout(() => {
            successMessage.remove();
        }, 5000);
    }

    // Show error message
    function showErrorMessage(form, currentLang) {
        const errorMessage = document.createElement('div');
        errorMessage.className = 'error-message';
        errorMessage.textContent = currentLang === 'hr'
            ? 'Došlo je do greške. Molimo pokušajte ponovno kasnije.'
            : 'An error occurred. Please try again later.';
        errorMessage.style.color = '#ffffff';
        errorMessage.style.backgroundColor = 'rgba(255, 0, 0, 0.2)';
        errorMessage.style.padding = '1rem';
        errorMessage.style.borderRadius = '8px';
        errorMessage.style.marginTop = '1rem';
        errorMessage.style.textAlign = 'center';

        form.appendChild(errorMessage);

        // Remove error message after 5 seconds
        setTimeout(() => {
            errorMessage.remove();
        }, 5000);
    }
});
