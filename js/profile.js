let uploadedFile = null;

const profile = async () => {
    const user = localStorage.getItem("user_id");  
    const res = await fetch(`https://online-school-project.onrender.com/api/account/profile/${user}`);
    const profileData = await res.json();

    document.getElementById('profileName').value = `${profileData.first_name} ${profileData.last_name}`;
    document.getElementById('profileEmail').value = profileData.email;
    document.getElementById('profileGender').value = profileData.gender;
    document.getElementById('profileBirthday').value = profileData.birthday;
    document.getElementById('profileImage').src = profileData.image;
   
};

function handleFileUpload(event) {
    const file = event.target.files[0];
    if (file) {
        uploadedFile = file;
        console.log('Uploaded file:', uploadedFile); // Add this line to ensure the file is set correctly
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('profileImage').src = e.target.result;
        };
        reader.readAsDataURL(file);

        document.getElementById('saveChangesButton').disabled = false;
    }
}


const EditProfile = async () => {
    const user = localStorage.getItem("user_id");

    // Gather updated form data
    const updatedProfile = {
        first_name: document.getElementById('profileName').value.split(' ')[0],
        last_name: document.getElementById('profileName').value.split(' ')[1] || '',
        email: document.getElementById('profileEmail').value,
        gender: document.getElementById('profileGender').value,
        birthday: document.getElementById('profileBirthday').value
    };

    // Prepare the form data
    const formData = new FormData();
    formData.append('first_name', updatedProfile.first_name);
    formData.append('last_name', updatedProfile.last_name);
    formData.append('email', updatedProfile.email);
    formData.append('gender', updatedProfile.gender);
    formData.append('birthday', updatedProfile.birthday);

    // Append file if uploaded
    if (uploadedFile) {
        formData.append('image', uploadedFile);  // Correct field name
    }

    // Debug: Log formData values (You can't console log formData directly)
    for (let pair of formData.entries()) {
        console.log(pair[0]+ ', ' + pair[1]); 
    }

    try {
        const res = await fetch(`https://online-school-project.onrender.com/api/account/profile/${user}/`, {
            method: 'PATCH',
            body: formData,
        });

        if (res.ok) {
            const data = await res.json();
            console.log('Profile updated successfully:', data);
            profile();  // Re-fetch and update the profile data
            alert('Profile updated successfully!');
        } else {
            const errorData = await res.text(); 
            console.error('Error updating profile:', errorData);
            alert('Failed to update profile.');
        }
    } catch (error) {
        console.error('Fetch error:', error);
        alert('An error occurred while updating the profile.');
    }
};



profile();

