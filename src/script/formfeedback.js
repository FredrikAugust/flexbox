/**
 * This script will modify the input elements in the form to ensure the values
 * in them is always the correct format and do necessary actions when the user
 * submits the table reservation form.
 * Written by Leonard
 */

window.addEventListener("load", function() { // This block will run when site is finished loading
    let input_elements = document.querySelectorAll("#innerForm input");
    // Name
    let name_input_element = input_elements[0];
    // Seats
    let seats_input_element = input_elements[1];
    seats_input_element.addEventListener("keydown", integer_field_keydown);
});

function integer_field_keydown(event) {
    // Browser independant way to find the keyCode
    let keyCode = event.which || event.keyCode || 0;
    let pre_value = event.target.value;
    console.log(keyCode);
    // Allows backspace and tab
    if (keyCode == 8 || keyCode == 9) {
        return;
    }
    // Checks for existing number in field
    if (pre_value.length == 0) { // If none:
        if (49 <= keyCode && keyCode <= 57) { // Checks if input is a number between 1 and 9
            return; // Allows such number
        }
    } else if (pre_value.length == 1 || pre_value.length == 2) { // If one or two digit number:
        if (48 <= keyCode && keyCode <= 57) { // Checks if input is a number between 0 and 9
            return; // Allows such number
        }
    }
    event.preventDefault(); // Inhibits all other buttonpresses
}

function submit_to_server(name, seats, phone, date) {
    
}