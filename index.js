import { initializeApp } from "firebase/app";
import { getDatabase, ref, push } from "firebase/database";
import { setLogLevel } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyB-HEKeE-SEOMvTw_CadV4f0yXSgMf9IY0",
  authDomain: "trace-website.firebaseapp.com",
  projectId: "trace-website",
  databaseURL:
    "https://trace-website-default-rtdb.asia-southeast1.firebasedatabase.app/",
  storageBucket: "trace-website.appspot.com",
  messagingSenderId: "631284572539",
  appId: "1:631284572539:web:bc46d2d1dea25033fc1dde",
};

setLogLevel("debug");

let app;
let database;

try {
  app = initializeApp(firebaseConfig);
  database = getDatabase(app);
  console.log("Firebase Realtime Database initialized successfully");
} catch (error) {
  console.error("Error initializing Firebase:", error);
}

// Email service function to send form data
async function sendFormToEmail(formData) {
  try {
    // Using Email JS or a similar service
    const response = await fetch(
      "https://api.emailjs.com/api/v1.0/email/send",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          service_id: "YOUR_SERVICE_ID", // Replace with your Email JS service ID
          template_id: "YOUR_TEMPLATE_ID", // Replace with your Email JS template ID
          user_id: "YOUR_USER_ID", // Replace with your Email JS user ID
          template_params: {
            to_email: "your-email@example.com", // Replace with your email
            from_name: formData.companyName,
            message: `
                        New Sponsor Registration:
                        
                        Company Name: ${formData.companyName}
                        Contact Person: ${formData.contactPerson}
                        Email: ${formData.email}
                        Phone: ${formData.phone}
                        
                        Company Address: ${formData.address}
                        Industry Type: ${formData.industryType}
                        Website: ${formData.website}
                        
                        Sponsorship Package: ${formData.sponsorshipPackage}
                        Sponsorship Value: RM${formData.sponsorshipValue}
                        
                        Additional Requests:
                        ${formData.additionalRequests || "None"}
                        
                        Submitted at: ${formData.submittedAt}
                    `,
          },
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to send email");
    }

    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
}

async function submitForm(e) {
  e.preventDefault();

  if (!database) {
    console.error("Database not initialized");
    return;
  }

  const form = document.getElementById("sponsorForm");

  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  try {
    // Collect form data
    const formData = {
      companyName: document.getElementById("companyName").value.trim(),
      contactPerson: document.getElementById("contactPerson").value.trim(),
      email: document.getElementById("contactEmail").value.trim(),
      phone: document.getElementById("contactPhone").value.trim(),
      address: document.getElementById("companyAddress").value.trim(),
      industryType: document.getElementById("industryType").value,
      website: document.getElementById("companyWebsite").value.trim(),
      sponsorshipPackage: document.getElementById("sponsorshipPackage").value,
      sponsorshipValue: document.getElementById("sponsorshipValue").value,
      additionalRequests: document
        .getElementById("customRequests")
        .value.trim(),
      submittedAt: new Date().toISOString(),
      status: "pending",
    };

    // Validate required fields
    const requiredFields = [
      "companyName",
      "contactPerson",
      "email",
      "phone",
      "sponsorshipPackage",
    ];
    for (const field of requiredFields) {
      if (!formData[field]) {
        throw new Error(`${field} is required`);
      }
    }

    // Check terms checkbox
    if (!document.getElementById("termsCheckbox").checked) {
      throw new Error("Please accept the terms and conditions");
    }

    // Save to database
    const sponsorsRef = ref(database, "sponsors-registration");
    const newSponsorRef = await push(sponsorsRef, formData);

    // Send email
    await sendFormToEmail(formData);

    console.log("Form submitted successfully. Reference:", newSponsorRef.key);
    alert("Registration submitted successfully! We will contact you shortly.");
    form.reset();
  } catch (error) {
    console.error("Error:", error);
    alert(error.message || "Error submitting form. Please try again.");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("sponsorForm");
  if (form) {
    form.addEventListener("submit", submitForm);
    console.log("Form listener attached");
  } else {
    console.error("Form element not found");
  }
});

export { database };
