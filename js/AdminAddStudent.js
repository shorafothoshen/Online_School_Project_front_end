async function AdminRegister(event) {
    event.preventDefault(); 
    const userId = localStorage.getItem("user_id");

    const firstName = document.getElementById("First_Name").value;
    const lastName = document.getElementById("last-name").value;
    const email = document.getElementById("email").value;
    const gender = document.querySelector('input[name="gender"]:checked').value;
    const birthday = document.getElementById("Date").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm_password").value;
    const imageFile = document.querySelector('input[name="image"]').files[0];

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const formData = new FormData();
    formData.append("first_name", firstName);
    formData.append("last_name", lastName);
    formData.append("email", email);
    formData.append("gender", gender);
    formData.append("birthday", birthday);
    formData.append("password", password);
    formData.append("confirm_password", confirmPassword);

    if (imageFile) {
      formData.append("image", imageFile);
    }


    try {
      const response = await fetch(`https://online-school-989z.onrender.com/api/admin/${userId}/User/`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        alert("Student added successfully!");
        // Optionally redirect or reset the form
        document.querySelector("form").reset();
      } else {
        const errorDetails = await response.json();
        console.error("Server error:", errorDetails);
        alert(`Error: ${errorDetails.error || 'Something went wrong'}`);
      }
    } catch (error) {
      console.error("Error adding student:", error);
    }
  }
