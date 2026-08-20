(() => {
  const form = document.querySelector("#contact-form");
  if (!form) return;

  const config = window.LITHIC_CONTACT_CONFIG || {};
  const fields = config.fields || {};
  const formStatus = document.querySelector("#form-status");
  const sink = document.querySelector("#contact-sink");
  const successPanel = document.querySelector("#success-panel");
  const submitButton = form.querySelector("button[type='submit']");
  let submissionStarted = false;

  const requiredFieldKeys = ["fullName", "email", "phone", "company", "title", "helpRequest", "consentRecord"];
  const isConnected = Boolean(
    config.googleFormEndpoint &&
      requiredFieldKeys.every((key) => typeof fields[key] === "string" && fields[key].startsWith("entry."))
  );

  if (isConnected) {
    form.action = config.googleFormEndpoint;
    form.querySelectorAll("[data-google-field]").forEach((control) => {
      control.name = fields[control.dataset.googleField];
    });
  }

  form.querySelectorAll("input, textarea").forEach((control) => {
    control.addEventListener("input", () => {
      control.closest(".field")?.classList.remove("is-invalid");
      if (control.id === "consent") control.closest(".consent")?.classList.remove("is-invalid");
      formStatus.textContent = "";
    });
  });

  const validate = () => {
    let valid = true;
    form.querySelectorAll(".field").forEach((field) => field.classList.remove("is-invalid"));
    form.querySelector(".consent")?.classList.remove("is-invalid");

    form.querySelectorAll("input[required], textarea[required]").forEach((control) => {
      if (!control.checkValidity()) {
        control.closest(".field")?.classList.add("is-invalid");
        control.closest(".consent")?.classList.add("is-invalid");
        valid = false;
      }
    });
    return valid;
  };

  form.addEventListener("submit", (event) => {
    formStatus.textContent = "";

    if (document.querySelector("#website")?.value) {
      event.preventDefault();
      return;
    }

    if (!validate()) {
      event.preventDefault();
      formStatus.textContent = "Please check the highlighted details, then try again.";
      form.querySelector(".is-invalid input, .is-invalid textarea")?.focus();
      return;
    }

    if (!isConnected) {
      event.preventDefault();
      formStatus.textContent = "The private intake is being connected. Please check back shortly.";
      return;
    }

    submissionStarted = true;
    submitButton.disabled = true;
    submitButton.querySelector("span").textContent = "Sending";
    formStatus.textContent = "Sending securely…";
  });

  sink?.addEventListener("load", () => {
    if (!submissionStarted) return;
    form.hidden = true;
    successPanel.hidden = false;
    successPanel.focus();
    successPanel.scrollIntoView({ behavior: "smooth", block: "center" });
  });
})();
