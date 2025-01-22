// Initialize EmailJS with your public key
(function () {
  emailjs.init("OPez39WQsIzfYsb7v"); // Replace with your actual public key
})();

// Get the form element
const form = document.getElementById("sponsorForm");

// Add form submission handler
form.addEventListener("submit", function (event) {
  event.preventDefault();

  // Show loading state
  const submitButton = form.querySelector('button[type="submit"]');
  const originalButtonText = submitButton.innerHTML;
  submitButton.innerHTML = "Sending...";
  submitButton.disabled = true;

  // Generate submission ID
  const submissionId = "TRACE-" + Date.now().toString(36).toUpperCase();

  // Get current date in desired format
  const submissionDate = new Date().toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  // Prepare form data for EmailJS
  const templateParams = {
    submission_id: submissionId,
    submission_date: submissionDate,
    company_name: document.getElementById("companyName").value,
    contact_person: document.getElementById("contactPerson").value,
    contact_email: document.getElementById("contactEmail").value,
    contact_phone: document.getElementById("contactPhone").value,
    company_address: document.getElementById("companyAddress").value,
    industry_type: document.getElementById("industryType").value,
    company_website: document.getElementById("companyWebsite").value,
    sponsorship_package: document.getElementById("sponsorshipPackage").value,
    sponsorship_value: document.getElementById("sponsorshipValue").value,
    custom_requests: document.getElementById("customRequests").value,
  };

  // Send email using EmailJS
  emailjs
    .send(
      "service_xldo53k", // Replace with your EmailJS service ID
      "template_zs736ee", // Replace with your EmailJS template ID
      templateParams
    )
    .then(function (response) {
      // Show success message
      alert("Registration submitted successfully! We will contact you soon.");
      form.reset();
    })
    .catch(function (error) {
      // Show error message
      alert(
        "Sorry, there was an error submitting your registration. Please try again later."
      );
      console.error("EmailJS error:", error);
    })
    .finally(function () {
      // Reset button state
      submitButton.innerHTML = originalButtonText;
      submitButton.disabled = false;
    });
});

// Form validation
function validateForm() {
  const requiredFields = form.querySelectorAll("[required]");
  let isValid = true;

  requiredFields.forEach((field) => {
    if (!field.value.trim()) {
      field.classList.add("is-invalid");
      isValid = false;
    } else {
      field.classList.remove("is-invalid");
    }
  });

  // Email validation
  const emailField = document.getElementById("contactEmail");
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(emailField.value)) {
    emailField.classList.add("is-invalid");
    isValid = false;
  }

  // Phone validation
  const phoneField = document.getElementById("contactPhone");
  const phonePattern = /^[\d\s\-\+\(\)]+$/;
  if (!phonePattern.test(phoneField.value)) {
    phoneField.classList.add("is-invalid");
    isValid = false;
  }

  return isValid;
}

// Add input event listeners for real-time validation
form.querySelectorAll("input, select, textarea").forEach((field) => {
  field.addEventListener("input", function () {
    if (field.hasAttribute("required")) {
      if (field.value.trim()) {
        field.classList.remove("is-invalid");
      } else {
        field.classList.add("is-invalid");
      }
    }
  });
});
