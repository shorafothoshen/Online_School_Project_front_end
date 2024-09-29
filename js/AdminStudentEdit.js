document.addEventListener("DOMContentLoaded", async function () {
    const form = document.querySelector("form");
    const userId = localStorage.getItem('user_id');
    const studentId = new URLSearchParams(location.search).get("StudentId");

    try {
        const response = await fetch(`https://online-school-989z.onrender.com/api/admin/${userId}/User/${studentId}/`);
        if (response.ok) {
            const student = await response.json();
            document.getElementById('first-name').value = student.first_name;
            document.getElementById('last-name').value = student.last_name;
            document.getElementById('email').value = student.email;
            document.querySelector(`input[name="gender"][value="${student.gender}"]`).checked = true;
            const birthday = new Date(student.birthday).toISOString().split('T')[0]; // Format date to YYYY-MM-DD
            document.getElementById('birthday').value = birthday;
            if (student.image) {
                const imagePreview = document.createElement('img');
                imagePreview.src = student.image;
                imagePreview.alt = "Current Profile Picture";
                imagePreview.style.width = "150px";
                document.body.appendChild(imagePreview);
            }
        } else {
            console.error("Failed to fetch student data");
        }
    } catch (error) {
        console.error("Error fetching student data:", error);
    }

    // Handle form submission
    form.addEventListener("submit", async function (event) {
        event.preventDefault();

        const firstName = document.getElementById('first-name').value;
        const lastName = document.getElementById('last-name').value;
        const email = document.getElementById('email').value;
        const gender = document.querySelector('input[name="gender"]:checked').value;
        const birthday = document.getElementById('birthday').value;
        const imageFile = document.querySelector('input[name="image"]').files[0]; // Capture the image file

        const formData = new FormData();
        formData.append('first_name', firstName);
        formData.append('last_name', lastName);
        formData.append('email', email);
        formData.append('gender', gender);
        formData.append('birthday', birthday);

        if (imageFile) {
            formData.append('image', imageFile);
        }

        try {
            const response = await fetch(`https://online-school-989z.onrender.com/api/admin/${userId}/User/${studentId}/`, {
                method: "PATCH",
                body: formData,
            });

            if (response.ok) {
                alert('Successfully Update User Details!');
                window.location.href = "./AdminStudents.html"; // Redirect to the student list or dashboard after success
            } else {
                console.error("Failed to update student");
            }
        } catch (error) {
            console.error("Error updating student:", error);
        }
    });
});