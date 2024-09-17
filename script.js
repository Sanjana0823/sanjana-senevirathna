// skill page refresh

// Scroll to the section and refresh the page
document.getElementById('scroll').addEventListener('click', function() {
    // Store the section ID to scroll to after refresh
    localStorage.setItem('scrollToSection', '#my-skills');
    
    // Refresh the page
    location.reload();
});

// On page load, check if there's a section to scroll to
window.addEventListener('load', function() {
    const sectionId = localStorage.getItem('scrollToSection');
    
    if (sectionId) {
        // Scroll to the section
        document.querySelector(sectionId).scrollIntoView({ behavior: 'smooth' });
        
        // Remove the section ID from localStorage after scrolling
        localStorage.removeItem('scrollToSection');
    }
});


// nav bar active

// Select all section elements and navigation links
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

// Function to update the active class based on the section in view
window.addEventListener('scroll', () => {
    let currentSection = '';

    // Find the section that is currently in the viewport
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (window.pageYOffset >= sectionTop - sectionHeight / 3) {
            currentSection = section.getAttribute('id');
        }
    });

    // Remove active class from all links and apply to the current one
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(currentSection)) {
            link.classList.add('active');
        }
    });
});


// form js frontend

document.querySelector('form').addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.querySelector('input[name="name"]').value;
    const email = document.querySelector('input[name="email"]').value;
    const message = document.querySelector('textarea[name="message"]').value;

    fetch('http://127.0.0.1:3000/send-email', {  // Ensure this matches your backend server port
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: name,
            email: email,
            message: message
        })
    })
    .then(response => response.text())
    .then(data => {
        alert(data);  // Show success message
        
        // Clear the form fields
        document.querySelector('form').reset();
    })
    .catch(error => console.error('Error:', error));
});
