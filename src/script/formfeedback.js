/**
 * This script will modify the input elements in the form to ensure the values
 * in them is always the correct format and do necessary actions when the user
 * submits the table reservation form.
 * Written by Leonard
 */

const DIGIT_CHARACTERS = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

window.addEventListener("load", function() { // This block will run when site is finished loading
    let input_elements = document.querySelectorAll("#innerForm input");
    // Name
    let name_input_element = input_elements[0];
    // Seats
    let seats_input_element = input_elements[1];
    seats_input_element.addEventListener("input", integer_field_input);
    // Phone number
    let phone_input_element = input_elements[2];
    phone_input_element.addEventListener("input", phone_field_input);
});

function integer_field_input(event) {
    let pre_value = event.target.value; // Non-modified value
    let new_value = ""; // Current modified value
    for (let i = 0; i < pre_value.length; i++) {
        if (
            DIGIT_CHARACTERS.includes(pre_value[i]) && pre_value[i] != "0" || // Is character digit from 1 to 9
            pre_value[i] == "0" && new_value.length != 0 // Is character 0 and is it preceded by other numbers
        ) {
            // Add digit to number
            new_value += pre_value[i];
            if (new_value.length == 3) { // Checking to see if value is number is max length
                break; // Stops run-through
            }
        }
    }
    event.target.value = new_value; // Changes field value to modified value
}

function phone_field_input(event) {
    let pre_value = event.target.value; // Non-modified value
    let new_value = ""; // Current modified value
    for (let i = 0; i < pre_value.length; i++) {
        if (
            DIGIT_CHARACTERS.includes(pre_value[i]) && pre_value[i] != "0" && pre_value[i] != "1" ||
            (pre_value[i] == "0" || pre_value[i] == "1") && new_value.length != 0
        ) {
            new_value += pre_value[i];
            if (new_value.length == 8) {
                break;
            }
        }
    }
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

function submit_to_server(name, seats, phone, date) {
    
}