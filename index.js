
(function() {
    document.getElementById('registerBtn').addEventListener('click', function(e) {
        e.preventDefault();
        
        const formData = {
            firstName: document.getElementById('firstName')?.value.trim() || '',
            lastName: document.getElementById('lastName')?.value.trim() || '',
            email: document.getElementById('email')?.value.trim() || '',
            phone: document.getElementById('phone')?.value.trim() || '',
            studentId: document.getElementById('studentId')?.value.trim() || '',
            dob: document.getElementById('dob')?.value || 'not given',
            city: document.getElementById('city')?.value.trim() || 'not given',
            address: document.getElementById('address')?.value.trim() || 'not given',
            zip: document.getElementById('zip')?.value.trim() || 'not given',
            course: document.getElementById('course')?.value || '',
            source: document.getElementById('source')?.value || '',
            password: document.getElementById('pass')?.value || '',
            confirm: document.getElementById('confirmPass')?.value || '',
            gender: document.querySelector('input[name="gender"]:checked')?.nextElementSibling?.textContent || 'Male',
            timestamp: new Date().toISOString()
        };

        if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone || !formData.studentId) {
            return alert('Please fill all required fields');
        }
        if (!formData.email.includes('@')) return alert('Valid email required');
        if (formData.password !== formData.confirm) return alert('Passwords do not match');
        if (formData.password && formData.password.length < 8) return alert('Password must be 8+ characters');
        if (!formData.course || formData.course === 'Select') return alert('Please select a course');

        console.log( JSON.stringify(formData, null, 2));
        
        alert(' Registration successful!');
        
        document.querySelectorAll('input:not([type="radio"]), select').forEach(f => f.value = '');
        document.querySelectorAll('select').forEach(s => s.selectedIndex = 0);
        document.getElementById('male').checked = true;
        
    });
})();