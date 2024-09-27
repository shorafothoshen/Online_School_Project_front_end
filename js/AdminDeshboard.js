
const AdminProfile = async () => {
    const user = localStorage.getItem("user_id");  
    const res = await fetch(`https://online-school-project.onrender.com/api/account/profile/${user}`);
    const profileData = await res.json();
    
    document.getElementById('AdminImage').src = profileData.image;
    
    document.getElementById('AdminName').innerText = `${profileData.first_name} ${profileData.last_name}`;
    document.getElementById('AdminEmail').innerText = profileData.email;
};

AdminProfile();


