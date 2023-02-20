// This is the file that uses the variables and constants to add logic:
//  open/close the overlay, takes user input, validates it and stores it

//function for editPlayer1BtnElement/editPlayer1BtnElement.addEventListener -
// to target modal overlay with id in aside element. This will change css to display: block;
// event gives access to the button clicked
function openPlayerConfig(event) {
    // datset.playerid targets the html element with data- atrribute
    // editedPlayer set to the playerid chosen (player 1 or 2) and holds value of 1 or 2
    editedPlayer = +event.target.dataset.playerid; // +makes a string become a number - +'1' => 1
    playerConfigOverlayElement.style.display = 'block';
    backdropElement.style.display = 'block';
};

// closes overlay and backdrop when cancel button clicked
function closePlayerConfig() {
    playerConfigOverlayElement.style.display = 'none';
    backdropElement.style.display = 'none';
    // Removes error class from div in form element when typing in overlay input
    formElement.firstElementChild.classList.remove('error');
    // removes error messege from p element
    errorsOutputElement.textContent = '';
    // accesses the input element in form and sets value to empty string after overlay closed 
    formElement.firstElementChild.lastElementChild.value = '';
};

//Function for form (specifically) where form is sumbitted when button is fired - for the overlay
// event.preventDefault(); stops the browser from sending request automactically so page doesn't reload
// event is the form element
function savePlayerConfig(event) {
    event.preventDefault();
    // FormData()is object blueprint and the same as making an object => const formData = {}; This will extract the values entered in the html form input
    const formData = new FormData(event.target);
    // targets the input and extracts value by using name attribute in input element
    const enteredPlayerName = formData.get('playername').trim(); // trim() gets rid of widespace from infront and after string content. Do this so empty spaces arent entered
    
    // if statement (truthy/falsey) boolean used for validation if enteredPlayerName is an empty string ("")
    // same as writing if (enteredPlayerName === "")
    if (!enteredPlayerName) {
        // .firstElementChild is the div which is a child of form element (event)
        // This adds error class to div element when invalid input detected
        event.target.firstElementChild.classList.add('error');
        errorsOutputElement.textContent = 'Please enter a valid name ';
        // return stops all code after it from functioning only if this if statement is executed
        return;
    }

    // constructed this code dynamically to change which id is selected depending on player 1 or 2
    // the playername is then updated to what was typed by player
    const updatedPlayerDataElement = document.getElementById('player-' + editedPlayer + '-data');
    updatedPlayerDataElement.children[1].textContent = enteredPlayerName;
    console.log(enteredPlayerName);

    // accessing the array elements to display them on screen and store the values internally
     if (editedPlayer === 1) {
        players[0].name = enteredPlayerName;
     } else {
        players[1].name = enteredPlayerName;
     }
    // Or write the if statement like this
    //  players[editedPlayer - 1].name=enteredPlayerName;

    // after player data is edited the overlay should close manually with the function. Making sure to add () after it
    closePlayerConfig();
};