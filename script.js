document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('loginForm');
    if (!form) return;

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const username = (document.getElementById('username')?.value || '').trim();
        const password = document.getElementById('password')?.value || '';
        const role = document.getElementById('role')?.value || '';

        if (username !== 'Cynthia Ferrao' || password !== '123') {
            alert('Invalid username or password.');
            return;
        }

        localStorage.setItem('examPortalSession', JSON.stringify({
            name: 'Cynthia Ferrao',
            role: role,
            loggedIn: true
        }));

        if (role === 'student') window.location.href = 'student.html';
        else if (role === 'examiner') window.location.href = 'examiner.html';
        else if (role === 'admin') window.location.href = 'admin.html';
        else alert('Please select a role.');
    });
});
