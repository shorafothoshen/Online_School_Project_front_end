const Contact = async (event) => {
    event.preventDefault();

    const name = document.getElementById("ContactName").value;
    const email = document.getElementById("ContactEmail").value;
    const subject = document.getElementById("ContactSubject").value;
    const body = document.getElementById("ContactBody").value;
    
    const info = {
        name,
        email,
        subject,
        body
    };

    try {
        const res = await fetch("https://online-school-989z.onrender.com/api/admin/contact/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(info)
        });

        if (!res.ok) {
            throw new Error('Failed to submit contact form.');
        }
        showSuccessModal();

    } catch (error) {
        console.error('Error submitting contact form:', error);
    }
};

// Function to show the success modal
const showSuccessModal = () => {
    const modal = document.getElementById('successModal');
    modal.classList.remove('hidden'); // Show the modal
    
    // Auto-remove the modal after 3 seconds
    setTimeout(() => {
        modal.classList.add('hidden'); // Hide the modal after 3 seconds
    }, 2000);
};