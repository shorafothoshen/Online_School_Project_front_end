const HandleRegistration = async (event) => {
    event.preventDefault();
    const first_name = get_value("first-name");
    const last_name = get_value("last-name");
    const radiostatus = document.getElementsByName("gender");
    const gender = Array.from(radiostatus).find((button) => button.checked)?.value;
    const email = get_value("email");
    const birthday = get_value("Birthday");
    const password = get_value("password");
    const confirm_password = get_value("confirm_password");

    const info = {
        first_name,
        last_name,
        gender,
        email,
        birthday,
        password,
        confirm_password
    };
    console.log(info);
    
    if (password === confirm_password) {
        try {
            const res = await fetch("https://online-school-project.onrender.com/api/account/register/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(info),
            });

            const register = await res.json();
            console.log(register);
            

            if (register.registrationStatus === "success") {
                // Show the success modal
                showModal();

                setTimeout(closeModal, 20000);
            } else {
                errorModal(register.error);
                console.log(register.error);
                

                setTimeout(closeErrorModal, 10000);
                
            }
        } catch (error) {
            console.error("An error occurred:", error);
            alert("An error occurred during registration. Please try again.");
        }
    } else {
        console.log("Passwords do not match");
        alert("Passwords do not match");
    }
};

// Function to show the modal
const showModal = () => {
    document.getElementById("verifyModal").classList.remove("hidden");
};

// Function to close the modal
const closeModal = () => {
    document.getElementById("verifyModal").classList.add("hidden");
};

const errorModal = (error) => {
    document.getElementById("errorModal").classList.remove("hidden");
    document.getElementById("errors").innerHTML=error;
};

// Function to close the modal
const closeErrorModal = () => {
    document.getElementById("errorModal").classList.add("hidden");
};



const get_value=(id)=>{
    const value=document.getElementById(id).value;
    return value;
};

// Toggle visibility of profile dropdown
function toggleDropdown() {
    const dropdownMenu = document.getElementById("dropdownMenu");
    dropdownMenu.classList.toggle("hidden");
}

// Hide dropdown when clicking outside
document.addEventListener("click", (event) => {
    const dropdownMenu = document.getElementById("dropdownMenu");
    if (!event.target.closest("#profileDropdown")) {
        dropdownMenu.classList.add("hidden");
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const token = localStorage.getItem("Token");

    // Desktop Navbar Elements
    const profileDropdown = document.getElementById("profileDropdown");
    const coursesLink = document.getElementById("coursesLink");
    const signUpButton = document.getElementById("signUpButton");
    const loginButton = document.getElementById("loginButton");

    // Mobile Navbar Elements
    const mobileCoursesLink = document.getElementById("mobileCoursesLink");
    const mobileSignUpButton = document.getElementById("mobileSignUpButton");
    const mobileLoginButton = document.getElementById("mobileLoginButton");
    const mobileProfileDropdown = document.getElementById("mobileProfileDropdown");

    if (token) {
        profileDropdown?.classList.remove("hidden");
        profileDropdown?.classList.add("block");
        coursesLink?.classList.remove("hidden");
        mobileCoursesLink?.classList.remove("hidden");
        signUpButton?.classList.add("hidden");
        loginButton?.classList.add("hidden");
        mobileProfileDropdown?.classList.remove("hidden")
        mobileProfileDropdown?.classList.add("block")
        mobileSignUpButton?.classList.add("hidden");
        mobileLoginButton?.classList.add("hidden");
    } else {
        profileDropdown?.classList.add("hidden");
        profileDropdown?.classList.remove("block", "md:block");
        coursesLink?.classList.add("hidden");
        mobileCoursesLink?.classList.add("hidden");
        signUpButton?.classList.remove("hidden");
        loginButton?.classList.remove("hidden");
        mobileProfileDropdown?.classList.add("hidden")
        mobileProfileDropdown?.classList.remove("block","md:block")
        mobileSignUpButton?.classList.remove("hidden");
        mobileLoginButton?.classList.remove("hidden");
    }
});

// Handle logout functionality
const handlegout = async () => {
    try {
        const res = await fetch("https://online-school-project.onrender.com/api/account/logout/");
        const logout = await res.json();
        console.log("Logout response:", logout);

        localStorage.removeItem("Token");
        localStorage.removeItem("user_id");

        window.location.href = "./index.html";
    } catch (error) {
        console.error("An error occurred during logout:", error);
    }
};



// Handle login form submission
const HandleLogin = async (event) => {
    event.preventDefault();
    const email = get_value("Email");
    const password = get_value("password");

    try {
        const res = await fetch("https://online-school-project.onrender.com/api/account/login/", {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });

        const login = await res.json();

        // Check for success
        if (res.ok && login.role) {
            // Successful login
            
            localStorage.setItem("Token", login.token);
            localStorage.setItem("user_id", login.user_id);
            
            if (login.role === "admin") {
                window.location.href = "./AdminDeshboard.html";
            } else if (login.role === "teacher") {
                window.location.href = "./TeacherDeshborad.html";
            } else if (login.role === "user") {
                window.location.href = "./index.html";
            } else {
                alert("Unknown role. Please contact support.");
            }
            alert("Login successful!");
        } else {
            alert("Login failed. Please check your email and password.");
        }
    } catch (error) {
        console.error("An error occurred during login:", error);
        alert("An error occurred during login. Please try again later.");
    }
};


const NavbarImage = async () => {
    const user = localStorage.getItem("user_id");  
    const res = await fetch(`https://online-school-project.onrender.com/api/account/profile/${user}`);
    const profileData = await res.json();
    
    document.getElementById('profileImage1').src = profileData.image;
    document.getElementById('profileImage2').src = profileData.image;
    document.getElementById('profileImage3').src = profileData.image;
    document.getElementById('profileImage4').src = profileData.image;

    document.getElementById('profileName1').innerText = `${profileData.first_name} ${profileData.last_name}`;
    document.getElementById('profileName2').innerText = `${profileData.first_name} ${profileData.last_name}`;

};

NavbarImage();


