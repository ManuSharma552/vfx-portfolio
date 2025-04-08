// js/form-validation.js
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contact-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const formStatus = document.getElementById('form-status');

    if (!form) return; // Exit if form doesn't exist

    const showError = (input, message) => {
        const formGroup = input.parentElement;
        formGroup.classList.add('error');
        formGroup.classList.remove('success'); // Remove success if it was there
        const errorElement = formGroup.querySelector('.error-message');
        if (errorElement) errorElement.textContent = message;
    };

    const showSuccess = (input) => {
        const formGroup = input.parentElement;
        formGroup.classList.remove('error');
        formGroup.classList.add('success'); // Add success class for styling (e.g., green border)
         const errorElement = formGroup.querySelector('.error-message');
         if (errorElement) errorElement.textContent = ''; // Clear error message
    };

    const validateEmail = (email) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    };

    const checkRequired = (inputs) => {
        let isValid = true;
        inputs.forEach(input => {
            if (input.value.trim() === '') {
                showError(input, `${getFieldName(input)} is required`);
                isValid = false;
            } else {
                showSuccess(input);
            }
        });
        return isValid;
    };

     const checkEmailFormat = (input) => {
        if (input.value.trim() !== '' && !validateEmail(input.value.trim())) {
            showError(input, 'Email is not valid');
            return false;
        } else if (input.value.trim() !== '') {
             showSuccess(input); // Show success if not empty and valid
        }
        return true;
    };

    const getFieldName = (input) => {
        // Get the label text or capitalize the id/name
        const label = input.previousElementSibling;
        if(label && label.tagName === 'LABEL') return label.textContent.replace(':', '');
        return input.id.charAt(0).toUpperCase() + input.id.slice(1);
    };

    form.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevent actual submission for now

        let isRequiredValid = checkRequired([nameInput, emailInput, messageInput]);
        let isEmailFormatValid = checkEmailFormat(emailInput);

        if (isRequiredValid && isEmailFormatValid) {
            // Form is valid - ready to submit (e.g., via AJAX)
            console.log('Form is valid. Submitting...');
            if(formStatus) {
                formStatus.textContent = 'Sending...';
                formStatus.className = 'status-sending';
            }

            // --- Placeholder for actual submission ---
            // Use fetch() API here to send data to a backend or service like Formspree/Netlify Forms
            // Example using Formspree (replace YOUR_FORM_ID):
            /*
            const formData = new FormData(form);
            fetch('https://formspree.io/f/YOUR_FORM_ID', {
                method: 'POST',
                body: formData,
                headers: { 'Accept': 'application/json' }
            })
            .then(response => {
                if (response.ok) {
                    formStatus.textContent = 'Message sent successfully!';
                    formStatus.className = 'status-success';
                    form.reset(); // Clear form
                    // Optionally remove success classes from inputs
                     document.querySelectorAll('.form-group.success').forEach(el => el.classList.remove('success'));
                } else {
                    response.json().then(data => {
                         if (Object.hasOwn(data, 'errors')) {
                             formStatus.textContent = data["errors"].map(error => error["message"]).join(", ");
                         } else {
                             formStatus.textContent = 'Oops! There was a problem submitting your form.';
                         }
                         formStatus.className = 'status-error';
                    })
                }
            })
            .catch(error => {
                formStatus.textContent = 'Oops! There was a problem submitting your form.';
                formStatus.className = 'status-error';
                console.error('Form submission error:', error);
            });
            */
           // --- End Placeholder ---

           // For demo purposes without backend:
            setTimeout(() => {
                if(formStatus) {
                    formStatus.textContent = 'Message sent successfully! (Demo)';
                    formStatus.className = 'status-success';
                }
                form.reset();
                document.querySelectorAll('.form-group.success').forEach(el => el.classList.remove('success'));
                 document.querySelectorAll('.form-group.error').forEach(el => el.classList.remove('error')); // Clear errors too
            }, 1500);


        } else {
            console.log('Form validation failed.');
             if(formStatus) {
                formStatus.textContent = 'Please fix the errors above.';
                formStatus.className = 'status-error';
             }
        }
    });

     // Optional: Real-time validation feedback as user types or leaves field
     [nameInput, emailInput, messageInput].forEach(input => {
         input.addEventListener('blur', () => { // When field loses focus
             if(input.required && input.value.trim() === '') {
                 showError(input, `${getFieldName(input)} is required`);
             } else if (input.type === 'email') {
                checkEmailFormat(input)
             }
             else if (input.required && input.value.trim() !== '') {
                  showSuccess(input);
             }
         });
          input.addEventListener('input', () => { // As user types
             // Optionally clear error as user starts typing again
              const formGroup = input.parentElement;
              if (formGroup.classList.contains('error')) {
                 // Simple clearing:
                  // formGroup.classList.remove('error');
                  // const errorElement = formGroup.querySelector('.error-message');
                  // if (errorElement) errorElement.textContent = '';

                  // Or re-validate on input (can be intensive)
                   if(input.required && input.value.trim() !== '') showSuccess(input);
                   if(input.type === 'email' && validateEmail(input.value.trim())) showSuccess(input);
              }
          });
     });
});

 // CSS for .form-group.error, .form-group.success, .error-message, #form-status styles needed in components.css