document.addEventListener("DOMContentLoaded", function () {
    const userId = localStorage.getItem("user_id")
    const tableBody = document.getElementById("enrolltable")

    async function fetchEnrolledCourses() {
      try {
        const response = await fetch(`https://online-school-989z.onrender.com/api/admin/${userId}/enrolled/`);
        const data = await response.json();
        renderTable(data);
      } catch (error) {
        console.error("Error fetching enrolled courses:", error);
      }
    }

    function renderTable(enrollments) {
      tableBody.innerHTML = "";
      enrollments.forEach((enrollment) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td class="px-6 py-4 whitespace-nowrap">${enrollment.id}</td>
            <td class="px-6 py-4 whitespace-nowrap">${enrollment.user.first_name} ${enrollment.user.last_name}</td>
            <td class="px-6 py-4 whitespace-nowrap">${enrollment.course.title}</td>
            <td class="px-6 py-4 whitespace-nowrap">${new Date(enrollment.enroll_date).toLocaleDateString()}</td>
            <td class="px-6 py-4 whitespace-nowrap">
              <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onclick="editCourse(${enrollment.id})"><i class="fas fa-edit"></i> Edit</button>
              <button class="bg-gray-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onclick="deleteCourse(${enrollment.id})"><i class="fas fa-trash"></i> Delete</button>
            </td>
          `;
        tableBody.appendChild(row);
      });
    }

    // Function to handle edit course (dummy function for now)
    function editCourse(courseId) {
      alert(`Edit course with ID: ${courseId}`);
      // Implement the logic for editing the course
    }

    // Function to handle delete course (dummy function for now)
    function deleteCourse(courseId) {
      alert(`Delete course with ID: ${courseId}`);
      // Implement the logic for deleting the course
    }

    fetchEnrolledCourses();
  });