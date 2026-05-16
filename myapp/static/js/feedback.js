document.addEventListener("DOMContentLoaded", function() {

    const nameRegex = /^[A-ZА-ЯЁ][a-zа-яё]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const firstName = document.getElementById("firstName");
    const lastName = document.getElementById("lastName");
    const age = document.getElementById("age");
    const phone = document.getElementById("phone");
    const email = document.getElementById("email");
    const form = document.getElementById("feedbackForm");

    function validateName(input) {
        if (nameRegex.test(input.value)) {
            input.classList.remove("is-invalid");
            input.classList.add("is-valid");
        } else {
            input.classList.remove("is-valid");
            input.classList.add("is-invalid");
        }
    }

    firstName.addEventListener("input", () => validateName(firstName));

    lastName.addEventListener("input", () => validateName(lastName));

    age.addEventListener("input", function() {
        if (age.value >= 10 && age.value <= 100) {
            age.classList.remove("is-invalid");
            age.classList.add("is-valid");
        } else {
            age.classList.remove("is-valid");
            age.classList.add("is-invalid");
        }
    });

    phone.addEventListener("input", function() {
        let allDigits = phone.value.replace(/\D/g, "").substring(0, 11);

        if (allDigits.length == 1 && allDigits[0] != '7') {
            phone.value = "+7 (" + allDigits;
        } else {
            let digitsForDisplay = allDigits.length > 1 ? allDigits.substring(1) : "";

            let formatted = "+7";

            if (digitsForDisplay.length >= 1) formatted += " (" + digitsForDisplay.substring(0,3);
            if (digitsForDisplay.length >= 4) formatted += ") " + digitsForDisplay.substring(3,6);
            if (digitsForDisplay.length >= 7) formatted += "-" + digitsForDisplay.substring(6,8);
            if (digitsForDisplay.length >= 9) formatted += "-" + digitsForDisplay.substring(8,10);

            phone.value = formatted;
        }

        if (allDigits.length === 11) {
            phone.classList.remove("is-invalid");
            phone.classList.add("is-valid");
        } else {
            phone.classList.remove("is-valid");
            phone.classList.add("is-invalid");
        }
    });

    email.addEventListener("input", function() {
        if (emailRegex.test(email.value)) {
            email.classList.remove("is-invalid");
            email.classList.add("is-valid");
        } else {
            email.classList.remove("is-valid");
            email.classList.add("is-invalid");
        }
    });

    form.addEventListener("submit", function(e) {
        if (!form.checkValidity() ||
            !nameRegex.test(firstName.value) ||
            !nameRegex.test(lastName.value) ||
            !(age.value >= 10 && age.value <= 100) ||
            phone.value.length !== 18 ||
            !emailRegex.test(email.value)) {

            e.preventDefault();
            e.stopPropagation();
        }
    });

});