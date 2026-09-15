document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const role = document.getElementById("role").value;

    if (role === "student") {
        window.location.href = "student.html";
    } 
    else if (role === "examiner") {
        window.location.href = "examiner.html";
    } 
    else {
        window.location.href = "admin.html";
    }
});