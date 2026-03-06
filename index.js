(function () {
    if (editIndex !== null) {

        let users = JSON.parse(localStorage.getItem("users")) || [];
        let user = users[editIndex];

        if (user) {

            document.getElementById("firstName").value = user.firstName;
            document.getElementById("lastName").value = user.lastName;
            document.getElementById("email").value = user.email;
            document.getElementById("phone").value = user.phone;
            document.getElementById("studentId").value = user.studentId;
            document.getElementById("dob").value = user.dob;
            document.getElementById("course").value = user.course;
            document.getElementById("address").value = user.address;
            document.getElementById("aadhaar").value = user.aadhaar;
            document.getElementById("source").value = user.source;

            document.querySelector(`input[name="gender"][value="${user.gender}"]`).checked = true;

            document.getElementById("pass").value = user.password;
            document.getElementById("confirmPass").value = user.password;
        }
    }
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

    // PHONE RESTRICTION
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function () {
            this.value = this.value.replace(/\D/g, '').slice(0, 10);
        });
    }


    let editIndex = localStorage.getItem("editUserIndex");

    


    document.getElementById('registerBtn').addEventListener('click', function (e) {

        e.preventDefault();

        let isValid = true;

        // FIRST NAME
        if (!validateField('firstName', input => {

            const val = input.value.trim();

            if (val === '') {
                showError(input, 'First name is required');
                return false;
            }

            if (!/^[A-Za-z\s]+$/.test(val)) {
                showError(input, 'First name must contain only letters');
                return false;
            }

            clearError(input);
            return true;

        })) isValid = false;


        // LAST NAME
        if (!validateField('lastName', input => {

            const val = input.value.trim();

            if (val === '') {
                showError(input, 'Last name is required');
                return false;
            }

            if (!/^[A-Za-z\s]+$/.test(val)) {
                showError(input, 'Last name must contain only letters');
                return false;
            }

            clearError(input);
            return true;

        })) isValid = false;


        // EMAIL
        if (!validateField('email', input => {

            const val = input.value.trim();

            if (val === '') {
                showError(input, 'Email is required');
                return false;
            }

            const emailRegex = /^[a-zA-Z0-9._%+-]{1,14}@[a-zA-Z0-9.-]{3,7}\.[A-Za-z]{2,4}$/;

            if (!emailRegex.test(val)) {
                showError(input, 'Enter a valid email address');
                return false;
            }

            clearError(input);
            return true;

        })) isValid = false;


        // PHONE
        if (!validateField('phone', input => {

            const val = input.value.trim();

            if (!/^\d{10}$/.test(val)) {
                showError(input, 'Phone must be 10 digits');
                return false;
            }

            clearError(input);
            return true;

        })) isValid = false;


        // STUDENT ID
        if (!validateField('studentId', input => {

            if (input.value.trim() === '') {
                showError(input, 'Student ID required');
                return false;
            }

            clearError(input);
            return true;

        })) isValid = false;


        // COURSE
        if (!validateField('course', input => {

            if (!input.value) {
                showError(input, 'Please select a course');
                return false;
            }

            clearError(input);
            return true;

        })) isValid = false;


        // ADDRESS
        if (!validateField('address', input => {

            const val = input.value.trim();

            if (val === '') {
                showError(input, 'Address required');
                return false;
            }

            if (!/^[A-Za-z0-9\s,.-]+$/.test(val)) {
                showError(input, 'Invalid address format');
                return false;
            }

            clearError(input);
            return true;

        })) isValid = false;


        // AADHAAR
        if (!validateField('aadhaar', input => {

            const val = input.value.trim();

            if (!/^\d{12}$/.test(val)) {
                showError(input, 'Aadhaar must be 12 digits');
                return false;
            }

            clearError(input);
            return true;

        })) isValid = false;


        // PASSWORD
        const passInput = document.getElementById('pass');
        const confirmPassInput = document.getElementById('confirmPass');

        const pass = passInput.value;
        const confirmPass = confirmPassInput.value;

        if (pass.length < 8) {
            showError(passInput, 'Minimum 8 characters');
            isValid = false;
        } else {
            clearError(passInput);
        }

        if (pass !== confirmPass) {
            showError(confirmPassInput, 'Passwords do not match');
            isValid = false;
        } else {
            clearError(confirmPassInput);
        }


        // GENDER
        if (!validateGender()) isValid = false;

        if (!isValid) return;


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
            password: pass

        };

        let users = JSON.parse(localStorage.getItem("users")) || [];

        if (editIndex !== null) {

            users[editIndex] = formData;
            localStorage.removeItem("editUserIndex");

        } else {

            users.push(formData);

        }

        localStorage.setItem("users", JSON.stringify(users));

        window.location.href = "user.html";

    });

})();