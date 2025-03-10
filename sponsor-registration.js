document.addEventListener("DOMContentLoaded", function () {
  // Initialize EmailJS
  emailjs.init("OPez39WQsIzfYsb7v");

  // Get the form element
  const sponsorForm = document.getElementById("sponsorForm");

  // Function to generate a unique submission ID
  function generateSubmissionId() {
    const timestamp = new Date().getTime();
    const random = Math.floor(Math.random() * 10000);
    return `TRACE-${timestamp}-${random}`;
  }

  // Function to format date to Malaysian time
  function formatMalaysianDateTime(date) {
    return date.toLocaleString("en-MY", {
      timeZone: "Asia/Kuala_Lumpur",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
  }

  sponsorForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Show loading state
    const submitButton = sponsorForm.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.innerHTML;
    submitButton.innerHTML = "Submitting...";
    submitButton.disabled = true;

    // Generate submission ID and timestamp
    const submissionId = generateSubmissionId();
    const submissionDate = new Date();
    const formattedDate = formatMalaysianDateTime(submissionDate);

    const formData = {
      submissionId: submissionId,
      submittedAt: formattedDate,
      contactPerson:
        document.getElementById("title").value +
        " " +
        document.getElementById("contactPerson").value,
      contactEmail: document.getElementById("contactEmail").value,
      contactPhone: document.getElementById("contactPhone").value,
      companyName: document.getElementById("companyName").value,
      companyAddress: document.getElementById("companyAddress").value,
      industryType: document.getElementById("industryType").value,
      companyWebsite: document.getElementById("companyWebsite").value,
      sponsorshipPackage: document.getElementById("sponsorshipPackage").value,
      sponsorshipValue: document.getElementById("sponsorshipValue").value,
      customRequests: document.getElementById("customRequests").value || "None",
    };

    // Send email only to admin
    emailjs
      .send("service_xldo53k", "template_if7yrng", formData)
      .then(function () {
        // Success handling
        submitButton.innerHTML = "Submitted Successfully!";

        // Show success message
        const successAlert = document.createElement("div");
        successAlert.className = "alert alert-success mt-3";
        successAlert.role = "alert";
        successAlert.innerHTML = `
          Your registration has been submitted successfully! (ID: ${submissionId})
        `;
        sponsorForm.insertBefore(successAlert, sponsorForm.firstChild);

        // Reset form
        sponsorForm.reset();

        // Reset button after 3 seconds
        setTimeout(() => {
          submitButton.innerHTML = originalButtonText;
          submitButton.disabled = false;
        }, 3000);
      })
      .catch(function (error) {
        // Error handling
        console.error("Error:", error);
        submitButton.innerHTML = originalButtonText;
        submitButton.disabled = false;

        // Show error message
        const errorAlert = document.createElement("div");
        errorAlert.className = "alert alert-danger mt-3";
        errorAlert.role = "alert";
        errorAlert.innerHTML =
          "There was an error submitting your registration. Please try again.";
        sponsorForm.insertBefore(errorAlert, sponsorForm.firstChild);
      });
  });

  // Remove alert messages when user starts typing again
  sponsorForm.addEventListener("input", function () {
    const existingAlerts = sponsorForm.querySelectorAll(".alert");
    existingAlerts.forEach((alert) => alert.remove());
  });
});

// Form validation functions
function validateForm() {
  const requiredFields = [
    "companyName",
    "contactPerson",
    "contactEmail",
    "contactPhone",
    "industryType",
    "sponsorshipPackage",
    "sponsorshipValue",
  ];

  let isValid = true;
  requiredFields.forEach((fieldId) => {
    const field = document.getElementById(fieldId);
    if (!field.value.trim()) {
      field.classList.add("is-invalid");
      isValid = false;
    } else {
      field.classList.remove("is-invalid");
    }
  });

  // Email validation
  const emailField = document.getElementById("contactEmail");
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(emailField.value)) {
    emailField.classList.add("is-invalid");
    isValid = false;
  }

  return isValid;
}
