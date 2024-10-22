/**
 * This script will modify the input elements in the form to ensure the values
 * in them is always the correct format and do necessary actions when the user
 * submits the table reservation form.
 * Written by Leonard
 */

const ERROR_MESSAGES = {
    no_name: "Vennligst fyll inn et navn reservasjonen skal være registrert til.",
    no_seats: "Vennligst skriv inn antall personer de ønsker å reservere bord for.",
    phone_not_complete: "Vennligst skriv inn et gyldig norsk telefon- eller mobilnummer.",
    date_not_complete: "Vennligst skriv inn en gyldig dato."
};
const MONTHS = [{}, // Phoney element to make the list one-indexed
{ minimum: "ja", name: "januar", size: 31 }, { minimum: "f", name: "februar", size: 28 },
{ minimum: "mar", name: "mars", size: 31 }, { minimum: "ap", name: "april", size: 30 },
{ minimum: "mai", name: "mai", size: 31 }, { minimum: "jun", name: "juni", size: 30 },
{ minimum: "jul", name: "juli", size: 31 }, { minimum: "au", name: "august", size: 31 },
{ minimum: "s", name: "september", size: 30 }, { minimum: "o", name: "oktober", size: 31 },
{ minimum: "n", name: "november", size: 30 }, { minimum: "d", name: "desember", size: 31 }
];

let message_element,
    name_input_element,
    seats_input_element,
    phone_input_element,
    date_input_element;

let dialog_element,
    dialog_text_element,
    dialog_button_element;

window.addEventListener("load", function () { // This block will run when site is finished loading
    let innerform_element = document.querySelector("#innerForm");
    innerform_element.addEventListener("keyup", innerform_keyup);

    let input_elements = innerform_element.querySelectorAll("input");
    // Name
    name_input_element = input_elements[0];
    // Seats
    seats_input_element = input_elements[1];
    seats_input_element.addEventListener("input", integer_field_input);
    // Phone number
    phone_input_element = input_elements[2];
    phone_input_element.addEventListener("input", phone_field_input);
    // Date
    date_input_element = input_elements[3];
    date_input_element.addEventListener("keydown", date_field_keydown);
    date_input_element.addEventListener("input", date_field_input);
    // Button
    input_elements[4].addEventListener("click", validate_form);

    message_element = innerform_element.querySelector("#message");

    dialog_element = document.querySelector(".dialog");
    dialog_text_element = dialog_element.querySelector("p");
    dialog_button_element = dialog_element.querySelector("input[type=\"button\"]");
    dialog_button_element.addEventListener("click", hide_form_popup);
});

function change_message(message) {
    message_element.innerHTML = message;
}

// Reacts to key presses when date field is in focus
function date_field_keydown(event) {
    let pre_value = event.target.value;
    // If keypress is backspace then
    if ((event.which || event.keyCode) == 8) {
        // Run through the string
        for (let i = pre_value.length - 1; i >= 0; i--) {
            // Delete the number at the end of the string
            if (/[0-9]/.test(pre_value[i])) {
                event.target.value = pre_value.slice(0, i);
                event.preventDefault();
                return;
            // or delete the whole month word if a letter is found instead of a digit
            } else if (/[a-zæøå]/.test(pre_value[i])) {
                i--;
                while (/[a-zæøå]/.test(pre_value[i])) {
                    i--;
                }
                i++;
                event.target.value = pre_value.slice(0, i);
                event.preventDefault();
                return;
            }
        }
    }
}
// Reacts to value changes in date field. We to have a lot of control over what can be written in the
// field. Therefore when the value changed no matter what triggered it, we run through the whole string
// and do a thorough parse, ignoring anything but digits, some letters and certain other special
// characters. This is by far the most advanced field, because it has to keep track of if a month or day
// is expected next and we wanted people to be able to paste in dates from "22. feb" to "9 / 9" and all
// would work. We achieved this.
function date_field_input(event) {
    let pre_value = event.target.value.replace(/\s/g, '').toLowerCase();
    let month, day = 0;
    let state = 0; /*
    0: Waiting for day,
    1: Waiting for month
    */

    // Run through the string
    for (let i = 0; i < pre_value.length; i++) {
        // If field is expecting a day value to be typed in
        if (state == 0) {
            // If this particular character is a digit, other wise: ignore
            if (/[0-9]/.test(pre_value[i])) {
                day = day * 10 + parseInt(pre_value[i]);
                // Check if digit can be added as day value or if it is too large.
                if (day > 31) {
                    day = Math.floor(day / 10);
                    month = parseInt(pre_value[i]);
                    state = 1;
                } else if (day > 9) {
                    month = 0;
                    state = 1;
                }
            // Checks for special characters that change the expected value type
            } else if (day != 0 && pre_value[i] == ".") {
                month = "";
                state = 1
            } else if (day != 0 && pre_value[i] == "/") {
                month = 0;
                state = 1
            }
            continue;
        }
        // If field is expecting a month value to be typed in
        if (state > 0) {
            if (
                /[1-9]/.test(pre_value[i]) ||
                pre_value[i] == "0" && month.length != 0
            ) {
                if (month == "") {
                    month = 0;
                }
                month = month * 10 + parseInt(pre_value[i]);
                if (month > 12) {
                    month = Math.floor(month / 10);
                } else if (MONTHS[parseInt(month)].size < day) {
                    month = Math.floor(month / 10);
                }
            }
            // Checks if a certain letter fits with any of the expected letters that would come next
            // when the characters previous to this is known.
            if (/[a-zæøå]/.test(pre_value[i])) {
                if (month == 0) {
                    month = "";
                }
                month += pre_value[i];
                valid = false;
                for (let i = 1; i <= 12; i++) {
                    if (MONTHS[i].name.startsWith(month) && MONTHS[i].size >= day) {
                        valid = true;
                        if (month.startsWith(MONTHS[i].minimum)) {
                            month = MONTHS[i].name;
                        }
                    }
                }
                if (!valid) {
                    month = month.slice(0, month.length - 1);
                }
            }
        }
    }
    event.target.value = "";
    if (day != 0) {
        event.target.value += day;
    }
    if (state > 0) {
        if (typeof (month) == "string") {
            event.target.value += ". " + month;
        } else if (typeof (month) == "number") {
            event.target.value += " / " + (month != 0 ? month : "");
        }
    }
}

function innerform_keyup(event) {
    if ((event.which || event.keyCode) == 13) {
        validate_form();
    }
}

function integer_field_input(event) {
    let pre_value = event.target.value; // Non-modified value
    let new_value = ""; // Current modified value
    for (let i = 0; i < pre_value.length; i++) {
        if (
            /[1-9]/.test(pre_value[i]) || // Is character digit from 1 to 9
            pre_value[i] == "0" && new_value.length != 0 // Is character 0 and is it preceded by other numbers
        ) {
            // Add digit to number
            new_value += pre_value[i];
            if (new_value.length == 3) { // Checking to see if number is max length
                break; // Stops run-through
            }
        }
    }
    event.target.value = new_value; // Changes field value to modified value
}

function hide_form_popup() {
    dialog_element.style.display = "none";
}

function phone_field_input(event) {
    let pre_value = event.target.value; // Non-modified value
    let new_value = ""; // Current modified value
    // Running through the new string, which might be longer than the last string plus one character.
    // Maybe the user used copy and paste.
    for (let i = 0; i < pre_value.length; i++) {
        if (
            /[2-9]/.test(pre_value[i]) ||
            /[01]/.test(pre_value[i]) && new_value.length != 0
        ) {
            new_value += pre_value[i];
            if (new_value.length == 8) {
                break;
            }
        }
    } 
    // Adding spaces in phone numbers according to specifications in Norwegian numbers
    if (new_value[0] == "4" || new_value[0] == "8" || new_value[0] == "9") {
        if (new_value.length > 5) {
            new_value = [new_value.slice(0, 5), " ", new_value.slice(5)].join("");
        }
        if (new_value.length > 3) {
            new_value = [new_value.slice(0, 3), " ", new_value.slice(3)].join("");
        }
    } else {
        if (new_value.length > 6) {
            new_value = [new_value.slice(0, 6), " ", new_value.slice(6)].join("");
        }
        if (new_value.length > 4) {
            new_value = [new_value.slice(0, 4), " ", new_value.slice(4)].join("");
        }
        if (new_value.length > 2) {
            new_value = [new_value.slice(0, 2), " ", new_value.slice(2)].join("");
        }
    }
    event.target.value = new_value;
}

function show_form_popup(name_value, seats_value, phone_value, date_value) {
    dialog_text_element.innerHTML = `Reservasjonen av bord for ${seats_value} ` + (seats_value == 1 ? "person" : "personer") + ` den ${date_value} for ${name_value} er fullført. Hvis du har spørsmål, ønsker å informere om noe eller å trekke reservasjonen, ring oss gjerne.`;

    dialog_element.style.display = "initial";
}

function submit_to_server(name, seats, phone, date) {
    /* Mocked as there's no back-end */
    change_message("");
    show_form_popup(name, seats, phone, date);
}

function validate_form() {
    let error;
    let name_value = name_input_element.value;
    if (name_value == "") {
        error = "no_name";
    }
    let seats_value = seats_input_element.value;
    if (seats_value == "") {
        error = "no_seats";
    }
    let phone_value = phone_input_element.value;
    if (
        !((phone_value.startsWith("4") || phone_value.startsWith("8") || phone_value.startsWith("9")) && phone_value.length == 10 ||
        phone_value.length == 11)
    ) {
        error = "phone_not_complete";
    }
    let valid_date = false;
    let date_value = date_input_element.value;
    for (let i = 1; i <= 12; i++) {
        if (date_value.includes(MONTHS[i].name)) {
            valid_date = true;
            break;
        }
    }
    if (!valid_date && !/^\d{1,2}\s\/\s\d{1,2}$/.test(date_value)) {
        error = "date_not_complete";
    }
    if (!error) {
        submit_to_server(name_value, seats_value, phone_value, date_value);
    } else {
        change_message(ERROR_MESSAGES[error]);
    }
}
