(function() {
    function showError(inputElem, message) {
        const errorSpan = inputElem.parentElement.querySelector('.error-msg');
        if (errorSpan) errorSpan.textContent = message;
        inputElem.classList.add('input-error'); 
    }

    function clearError(inputElem) {
        const errorSpan = inputElem.parentElement.querySelector('.error-msg');
        if (errorSpan) errorSpan.textContent = '';
        inputElem.classList.remove('input-error');
    }

    function validateField(id, validateFn) {
        const input = document.getElementById(id);
        if (!input) return true;
        return validateFn(input);
    }

    function validateGender() {
        const genderInput = document.querySelector('input[name="gender"]:checked');
        if (!genderInput) {
            alert('Please select a gender');
            return false;
        }
        return true;
    }

    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function() {
            this.value = this.value.replace(/\D/g, '').slice(0, 10);
        });
    }

    document.getElementById('registerBtn').addEventListener('click', function(e) {
        e.preventDefault();

        let isValid = true;

        if (!validateField('firstName', input => {
            if (input.value.trim() === '') { showError(input, 'First name is required'); return false; }
            clearError(input); return true;
        })) isValid = false;

        if (!validateField('lastName', input => {
            if (input.value.trim() === '') { showError(input, 'Last name is required'); return false; }
            clearError(input); return true;
        })) isValid = false;

        if (!validateField('email', input => {
            const val = input.value.trim();
            if (val === '') { showError(input, 'Email is required'); return false; }
            if (!val.includes('@')) { showError(input, 'Valid email required'); return false; }
            clearError(input); return true;
        })) isValid = false;

        if (!validateField('phone', input => {
            const val = input.value.trim();
            if (!/^\d{10}$/.test(val)) { showError(input, 'Phone must be 10 digits'); return false; }
            clearError(input); return true;
        })) isValid = false;

        if (!validateField('studentId', input => {
            if (input.value.trim() === '') { showError(input, 'Student ID required'); return false; }
            clearError(input); return true;
        })) isValid = false;

        if (!validateField('course', input => {
            if (!input.value) { showError(input, 'Please select a course'); return false; }
            clearError(input); return true;
        })) isValid = false;

        if (!validateField('address', input => {
            if (input.value.trim() === '') { showError(input, 'Address required'); return false; }
            clearError(input); return true;
        })) isValid = false;

        if (!validateField('aadhaar', input => {
            if (!/^\d{12}$/.test(input.value.trim())) { showError(input, 'Aadhaar must be 12 digits'); return false; }
            clearError(input); return true;
        })) isValid = false;

        const pass = document.getElementById('pass').value;
        const confirmPass = document.getElementById('confirmPass').value;

        if (pass.length < 8) {
            showError(document.getElementById('pass'), 'Minimum 8 characters');
            isValid = false;
        }

        if (pass !== confirmPass) {
            showError(document.getElementById('confirmPass'), 'Passwords do not match');
            isValid = false;
        }

        if (!validateGender()) isValid = false;

        if (!isValid) return;

        // ✅ CREATE USER OBJECT
        const formData = {
            firstName: document.getElementById('firstName').value.trim(),
            lastName: document.getElementById('lastName').value.trim(),
            email: document.getElementById('email').value.trim(),
            phone: document.getElementById('phone').value.trim(),
            studentId: document.getElementById('studentId').value.trim(),
            dob: document.getElementById('dob').value,
            course: document.getElementById('course').value,
            gender: document.querySelector('input[name="gender"]:checked').value,
            address: document.getElementById('address').value.trim(),
            aadhaar: document.getElementById('aadhaar').value.trim(),
            source: document.getElementById('source').value,
            password: pass,
        };
        let users = JSON.parse(localStorage.getItem("users")) || [];
        users.push(formData);
        localStorage.setItem("users", JSON.stringify(users));
        window.location.href = "user.html";
        
    });

})();