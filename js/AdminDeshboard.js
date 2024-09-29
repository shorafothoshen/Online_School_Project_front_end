document.getElementById("menu-btn").addEventListener("click", () => {
  document.getElementById("sidebar").classList.toggle("hidden");
});

document.getElementById("AdminImage").addEventListener("click", (event) => {
  event.stopPropagation();
  const dropdown = document.getElementById("dropdown");
  dropdown.classList.toggle("hidden");
});

window.addEventListener("click", (event) => {
  const dropdown = document.getElementById("dropdown");
  const profileButton = document.getElementById("AdminImage");
  if (
    !dropdown.classList.contains("hidden") &&
    !profileButton.contains(event.target)
  ) {
    dropdown.classList.add("hidden");
  }
});

// autometive slug field create

document.getElementById("name").addEventListener("input", function () {
  let nameValue = this.value;
  let slugValue = nameValue
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "");
  document.getElementById("slug").value = slugValue;
});

const AdminProfile = async () => {
  const user = localStorage.getItem("user_id");
  const res = await fetch(
    `https://online-school-989z.onrender.com/api/account/profile/${user}`
  );
  const profileData = await res.json();

  document.getElementById("AdminImage").src = profileData.image;

  document.getElementById(
    "AdminName"
  ).innerText = `${profileData.first_name} ${profileData.last_name}`;
  document.getElementById("AdminEmail").innerText = profileData.email;
};

const logout = async () => {
  try {
    const res = await fetch(
      "https://online-school-989z.onrender.com/api/account/logout/"
    );
    const logout = await res.json();
    console.log("Logout response:", logout);

    localStorage.removeItem("Token");
    localStorage.removeItem("user_id");

    window.location.href = "./index.html";
  } catch (error) {
    console.error("An error occurred during logout:", error);
  }
};

AdminProfile();
