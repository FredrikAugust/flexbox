/**
 * This script will modify the input elements in the form to ensure the values
 * in them is always the correct format and do necessary actions when the user
 * submits the table reservation form.
 * Written by Leonard
 */

const STANDARD_DIGITS = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

window.addEventListener("load", function() { // This block will run when site is finished loading
    let input_elements = document.querySelectorAll("#innerForm input");
    // Name
    let name_input_element = input_elements[0];
    // Seats
    let seats_input_element = input_elements[1];
    seats_input_element.addEventListener("input", integer_field_input);
});

function integer_field_input(event) {
    let pre_value = event.target.value;
    let new_value = "";
    for (let i = 0; i < pre_value.length; i++) {
        if (
            STANDARD_DIGITS.includes(pre_value[i]) || // Is character digit from 1 to 9
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

function submit_to_server(name, seats, phone, date) {
    
}