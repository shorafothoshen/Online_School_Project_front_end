const fetchWeeks = async () => {
    const userId = localStorage.getItem("user_id")
    try {
      const response = await fetch(`https://online-school-989z.onrender.com/api/admin/${userId}/weeks/`);
      const weeksData = await response.json();

      renderWeeks(weeksData);
    } catch (error) {
      console.error('Error fetching weeks:', error);
    }
  };

  const renderWeeks = (weeks) => {
    const tableBody = document.getElementById('weeks-table-body');
    tableBody.innerHTML = ''; 

    weeks.forEach((week) => {
      const row = document.createElement('tr');
      row.innerHTML = `
                <td class="px-6 py-4 whitespace-nowrap">${week.id}</td>
                <td class="px-6 py-4 whitespace-nowrap">${week.course}</td>
                <td class="px-6 py-4 whitespace-nowrap">${week.name}</td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                    <button class="bg-gray-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                </td>
            `;
      tableBody.appendChild(row);
    });
  };

  window.onload = fetchWeeks;