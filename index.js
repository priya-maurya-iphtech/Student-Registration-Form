(function() {
    function showError(inputElem, message) {
        const errorSpan = inputElem.parentElement.querySelector('.error-msg');
        if (errorSpan) errorSpan.textContent = message;
        inputElem.classList.add('input-error'); 
    }

    // Clear error message
    function clearError(inputElem) {
        const errorSpan = inputElem.parentElement.querySelector('.error-msg');
        if (errorSpan) errorSpan.textContent = '';
        inputElem.classList.remove('input-error');
    }

    // Validate individual field
    function validateField(id, validateFn) {
        const input = document.getElementById(id);
        if (!input) return true;
        return validateFn(input);
    }

    // Gender validation
    function validateGender() {
        const genderInput = document.querySelector('input[name="gender"]:checked');
        if (!genderInput) {
            alert('Please select a gender');
            return false;
        }
        return true;
    }

    document.getElementById('registerBtn').addEventListener('click', function(e) {
        e.preventDefault();

        let isValid = true;

        // First Name
        if (!validateField('firstName', input => {
            if (input.value.trim() === '') { showError(input, 'First name is required'); return false; }
            clearError(input); return true;
        })) isValid = false;

        // Last Name
        if (!validateField('lastName', input => {
            if (input.value.trim() === '') { showError(input, 'Last name is required'); return false; }
            clearError(input); return true;
        })) isValid = false;

        // Email
        if (!validateField('email', input => {
            const val = input.value.trim();
            if (val === '') { showError(input, 'Email is required'); return false; }
            if (!val.includes('@')) { showError(input, 'Valid email required'); return false; }
            clearError(input); return true;
        })) isValid = false;

        // Phone
        if (!validateField('phone', input => {
            if (input.value.trim() === '') { showError(input, 'Phone number is required'); return false; }
            clearError(input); return true;
        })) isValid = false;

        // Student ID
        if (!validateField('studentId', input => {
            if (input.value.trim() === '') { showError(input, 'Student ID is required'); return false; }
            clearError(input); return true;
        })) isValid = false;

        // Course
        if (!validateField('course', input => {
            if (input.value === '' || input.value === 'Select') { showError(input, 'Please select a course'); return false; }
            clearError(input); return true;
        })) isValid = false;

        // Address
        if (!validateField('address', input => {
            if (input.value.trim() === '') { showError(input, 'Address is required'); return false; }
            clearError(input); return true;
        })) isValid = false;

        // Aadhaar
        if (!validateField('aadhaar', input => {
            const val = input.value.trim();
            if (val === '') { showError(input, 'Aadhaar number is required'); return false; }
            if (!/^\d{12}$/.test(val)) { showError(input, 'Aadhaar must be 12 digits'); return false; }
            clearError(input); return true;
        })) isValid = false;

        // Password
        if (!validateField('pass', input => {
            const val = input.value;
            if (val !== '' && val.length < 8) { showError(input, 'Password must be at least 8 characters'); return false; }
            clearError(input); return true;
        })) isValid = false;

        // Confirm Password
        const pass = document.getElementById('pass').value;
        const confirmPass = document.getElementById('confirmPass').value;
        if (pass !== confirmPass) {
            showError(document.getElementById('confirmPass'), 'Passwords do not match');
            isValid = false;
        } else {
            clearError(document.getElementById('confirmPass'));
        }

        if (!validateGender()) isValid = false;

        if (!isValid) return;

        const formData = {
            firstName: document.getElementById('firstName').value.trim(),
            lastName: document.getElementById('lastName').value.trim(),
            email: document.getElementById('email').value.trim(),
            phone: document.getElementById('phone').value.trim(),
            studentId: document.getElementById('studentId').value.trim(),
            dob: document.getElementById('dob')?.value || 'not given',
            city: document.getElementById('city')?.value.trim() || 'not given',
            address: document.getElementById('address').value.trim(),
            zip: document.getElementById('zip')?.value.trim() || 'not given',
            aadhaar: document.getElementById('aadhaar').value.trim(),
            course: document.getElementById('course').value,
            source: document.getElementById('source')?.value || '',
            password: pass,
            confirm: confirmPass,
            gender: document.querySelector('input[name="gender"]:checked')?.nextElementSibling?.textContent || 'Male',
            timestamp: new Date().toISOString()
        };

        console.log(JSON.stringify(formData, null, 2));
        alert('Registration successful!');

        document.querySelectorAll('input:not([type="radio"]), select').forEach(f => {
            f.value = '';
            clearError(f);
        });
        document.querySelectorAll('select').forEach(s => s.selectedIndex = 0);
        document.getElementById('male').checked = true;
    });

})();