async function loadTeachers() {
    const userId = localStorage.getItem("user_id");
    const tableBody = document.getElementById("teacherTableBody");

    try {
      const response = await fetch(`https://online-school-989z.onrender.com/api/admin/${userId}/teacher/`);
      if (response.ok) {
        const teachers = await response.json();

        tableBody.innerHTML = '';
        teachers.forEach((teacher) => {
          const row = document.createElement("tr");
          row.innerHTML = `
              <td class="px-6 py-4 whitespace-nowrap">${teacher.id}</td>
              <td class="px-6 py-4 whitespace-nowrap">${teacher.user.first_name}</td>
              <td class="px-6 py-4 whitespace-nowrap">${teacher.user.last_name}</td>
              <td class="px-6 py-4 whitespace-nowrap">${teacher.user.email}</td>
              <td class="px-6 py-4 whitespace-nowrap">${teacher.user.gender}</td>
              <td class="px-6 py-4 whitespace-nowrap">${teacher.user.birthday}</td>
              <td class="px-6 py-4 whitespace-nowrap">${teacher.department}</td>
              <td class="px-6 py-4 whitespace-nowrap">${teacher.Country}</td>
              <td class="px-6 py-4 whitespace-nowrap">${teacher.City}</td>
              <td class="px-6 py-4 whitespace-nowrap">
                <img src="${teacher.user.image || 'https://via.placeholder.com/50'}" class='w-14 h-14' alt="Teacher Image">
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <a href="./AdminTeacherEditPage.html?TeacherId=${teacher.id}"><button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Edit</button></a>
                <button onclick="handleDelete(${teacher.id})" class="bg-gray-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Delete</button>
              </td>
            `;
          tableBody.appendChild(row);
        });
      } else {
        console.error("Failed to load teachers");
      }
    } catch (error) {
      console.error("Error loading teachers:", error);
    }
  }
  document.addEventListener("DOMContentLoaded", loadTeachers);