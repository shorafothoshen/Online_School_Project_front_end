document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('teacher-form');
    const userId = localStorage.getItem("user_id")

    async function fetchDepartments() {
      try {
        const response = await fetch(`https://online-school-989z.onrender.com/api/admin/${userId}/Department/`);
        if (!response.ok) {
          throw new Error("Failed to fetch departments.");
        }

        const departments = await response.json();
        const departmentSelect = document.getElementById('department');
        departmentSelect.innerHTML = '<option value="" selected>Select Department</option>';

        departments.forEach(department => {
          const option = document.createElement('option');
          option.value = department.id;  
          option.textContent = department.name; 
          departmentSelect.appendChild(option);
        });
      } catch (error) {
        console.error("Error fetching departments:", error);
      }
    }
    fetchDepartments();

    form.addEventListener('submit', async function (event) {
      event.preventDefault(); 
      const userId = localStorage.getItem("user_id")

      const formData = new FormData();
      formData.append('first_name', document.getElementById('first-name').value);
      formData.append('last_name', document.getElementById('last-name').value);
      formData.append('email', document.getElementById('email').value);
      formData.append('birthday', document.getElementById('Birthday').value);
      formData.append('gender', document.querySelector('input[name="gender"]:checked').value);
      formData.append('department', document.getElementById('department').value);
      formData.append('country', document.getElementById('Country').value);
      formData.append('city', document.getElementById('City').value);
      formData.append('password', document.getElementById('password').value);
      formData.append('confirm_password', document.getElementById('confirm-password').value);

      const imageInput = document.querySelector('input[name="image"]');
      if (imageInput.files.length > 0) {
        formData.append('image', imageInput.files[0]);
      }
      formData.forEach((element) => {
        console.log(element);

      })
      try {
        const response = await fetch(`https://online-school-989z.onrender.com/api/admin/${userId}/teacher/`, {
          method: 'POST',
          body: formData,  // Send the FormData object
        });

        if (!response.ok) {
          throw new Error('Error submitting the form');
        }

        const result = await response.json();
        console.log('Success:', result);

        alert('Form submitted successfully!');
      } catch (error) {
        console.error('Error:', error);
        alert('There was an error submitting the form.');
      }
    });
  });