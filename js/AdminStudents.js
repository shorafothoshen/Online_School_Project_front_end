async function fetchStudents() {
    const userId = localStorage.getItem('user_id');
    try {
      const response = await fetch(`https://online-school-989z.onrender.com/api/admin/${userId}/User/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();

      const tableBody = document.getElementById('student-table-body');
      const students = Array.isArray(data) ? data : data.results;
      students.forEach(student => {
        if (!student.is_teacher && !student.is_staff) {  
          const studentRow = document.createElement('tr');

          studentRow.innerHTML = `
            <td class="px-2 py-4">${student.id}</td>
            <td class="px-2 py-4">${student.first_name}</td>
            <td class="px-2 py-4">${student.last_name}</td>
            <td class="px-2 py-4">${student.email}</td>
            <td class="px-2 py-4">${student.gender}</td>
            <td class="px-2 py-4">${student.birthday}</td>
            <td class="px-2 py-4">
                <img src="${student.image}" class="w-14 h-14" alt="Student Image">
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                <a href="./AdminStudentEditPage.html?StudentId=${student.id}"><button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Edit</button></a>
                <button onclick="handleDelete(${student.id})" class="bg-gray-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Delete</button>
              </td>
          `;

          tableBody.appendChild(studentRow);
        }
      });

    } catch (error) {
      console.error('Error fetching student data:', error);
    }
  }

  async function handleDelete(studentId) {
    const confirmDelete = confirm('Are you sure you want to delete this student?');
    if (confirmDelete) {
      const userId = localStorage.getItem('user_id');
      try {
        const response = await fetch(`https://online-school-989z.onrender.com/api/admin/${userId}/User/${studentId}/`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          alert('Student deleted successfully!');
          location.reload();
        } else {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      } catch (error) {
        console.error('Error deleting student:', error);
      }
    }
  }
  window.onload = fetchStudents;