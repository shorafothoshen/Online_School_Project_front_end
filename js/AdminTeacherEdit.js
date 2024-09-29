document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('teacher-form');
    const teacherId = new URLSearchParams(location.search).get("TeacherId");
    const userId = localStorage.getItem("user_id")

    const fetchTeacherData = async () => {
        try {
            const response = await fetch(`https://online-school-989z.onrender.com/api/admin/${userId}/teacher/${teacherId}/`);
            const data = await response.json();
            document.getElementById('first-name').value = data.user.first_name;
            document.getElementById('last-name').value = data.user.last_name;
            document.getElementById('email').value = data.user.email;
            document.getElementById('Birthday').value = data.user.birthday;
            document.getElementById('Country').value = data.Country;
            document.getElementById('City').value = data.City;
            document.querySelector(`input[name="gender"][value="${data.user.gender}"]`).checked = true;
            
            const selectedDepartment = data.department; 
            fetchDepartments(selectedDepartment);
        } catch (error) {
            console.error('Error fetching teacher data:', error);
        }
    };

    const fetchDepartments = async (selectedDepartment) => {
        try {
            const response = await fetch(`https://online-school-989z.onrender.com/api/admin/${userId}/Department/`);
            const departments = await response.json();
            const departmentSelect = document.getElementById('department');
            departmentSelect.innerHTML = ''; // Clear existing options
            departments.forEach(department => {
                const option = document.createElement('option');
                option.value = department.id;
                option.textContent = department.name;
                if (department.id == selectedDepartment) {
                    option.selected = true; // Mark this option as selected
                }
                departmentSelect.appendChild(option);
            });
        } catch (error) {
            console.error('Error fetching departments:', error);
        }
    };


    // Submit the form with PATCH request
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const first_name = document.getElementById('first-name').value;
        const last_name = document.getElementById('last-name').value;
        const email = document.getElementById('email').value;
        const birthday = document.getElementById('Birthday').value;
        const gender = document.querySelector('input[name="gender"]:checked').value;
        const department = document.getElementById('department').value;
        const Country = document.getElementById('Country').value;
        const City = document.getElementById('City').value;
        const imageFile = document.querySelector('input[name="image"]').files[0]; 

        const formData = new FormData();
        formData.append('first_name', first_name);
        formData.append('last_name', last_name);
        formData.append('email', email);
        formData.append('gender', gender);
        formData.append('birthday', birthday);
        formData.append('department', department);
        formData.append('Country', Country);
        formData.append('City', City);

        if (imageFile) {
            formData.append('image', imageFile);
        }
        formData.forEach((value, key) => {
            console.log(key, value);
        });

        try {
            const response = await fetch(`https://online-school-989z.onrender.com/api/admin/${userId}/teacher/${teacherId}/`, {
                method: 'PATCH',
                body: formData 
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Teacher updated:', data);
                alert("Successfully Updated User Details!");
                // Redirect to another page if necessary
                // window.location.href = "./AdminTeachers.html";
            } else {
                const errorData = await response.json();
                console.error('Error updating teacher:', errorData);
                alert('Error updating teacher.');
            }
        } catch (error) {
            console.error('Error updating teacher:', error);
            alert('Error updating teacher.');
        }
    });


    // Call the fetch function to populate the form
    fetchTeacherData();
});