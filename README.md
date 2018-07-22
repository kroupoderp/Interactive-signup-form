# Signup form

The signup form contains all the common HTML form fields: input, button, select, textarea, radio button, checkbox and so on. There is JavaScript functionality which checks if the mandatory fields have been filled out before submitting the form. I also included regular expressions that check if the email address, phone number and postal code are valid format, if not a message in red will be displayed to the user right beneath the form element once it loses focus. If a user hits the submit button and there are mistakes in the form, a modal window will be displayed telling which form fields need to be fixed. If there are no mistakes and the user hits the submit button, a modal window will display thanking the user for signing up, and the form will get reset.
I also added session storage in order to save any filled out fields. I rebuilt the form with React later on in order to solve an annoying problem where filled out form fields would flicker at every page reload. I removed the checkboxes and radio buttons by setting their display to none and used SVG elements instead. I added programming that will make the checkboxes and radio buttons trigger the input event when a user clicks on a checkbox/radiobutton SVG (the SVGs are set as background images inside span elements). I used webpack in order to bundle the modules instead of using multiple script tags inside the HTML file. Note: there is no back end functionality.

<img width="1280" alt="img-1" src="https://user-images.githubusercontent.com/23324252/40889894-1cae5f52-673c-11e8-94e4-2cb73897f1ab.png">

<img width="1280" alt="img-2" src="https://user-images.githubusercontent.com/23324252/43049375-f136e47a-8dc4-11e8-8396-0db226154f62.png">

<img width="400" alt="img-3" src="https://user-images.githubusercontent.com/23324252/40889900-29a76596-673c-11e8-8d39-ce06241aa8e6.png">

<img width="1280" alt="img-4" src="https://user-images.githubusercontent.com/23324252/40889905-2ee80ff6-673c-11e8-9ad5-03d5577ba3b2.png">

<img width="1280" alt="img-5" src="https://user-images.githubusercontent.com/23324252/40889906-3627d1c0-673c-11e8-8264-b1dce9eedc02.png">

<img width="1280" alt="img-6" src="https://user-images.githubusercontent.com/23324252/43049380-f93dc40e-8dc4-11e8-97b3-ea19e30632fd.png">

<img width="1280" alt="img-7" src="https://user-images.githubusercontent.com/23324252/43049383-03f924b0-8dc5-11e8-9fb9-66f3b2d14fee.png">
