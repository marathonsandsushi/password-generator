// Hi! Welcome to my password generator code!  
 
// get references to the #generate element
var generateBtn = document.querySelector("#generate");
 
// password requirements
const PASSWORD_MAX_LENGTH = 128;
const PASSWORD_MIN_LENGTH = 8;

// character types that we can use in password generation
// Users can choose to require that certain characters types are included
const characterTypes = [
    {
        type : "lowercase letters",
        values : "abcdefghijklmnopqrstuvwxyz",
        used : false
    },
    {
        type : "uppercase letters",
        values : "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
        used : false
    },
    {
        type : "numerical characters",
        values : "0123456789",
        used : false
    },
    {
        type : "special characters",
        values : "!#$%&'()*+,-./:;<=>?@[]^_`{|}~",
        used : false
    }
];

// user chosen password constraints 
let passwordLength = 0;
let specialRequirements = [];
 
function promptUserForPasswordRequirements () {

    promptPasswordLength();
    promptCharacterTypes();

}

function promptPasswordLength () {

    var keepAsking = true;

    while (keepAsking) {

        passwordLength = window.prompt ('How long should this password be? It should be at least ' + PASSWORD_MIN_LENGTH + ' characters and at most ' + PASSWORD_MAX_LENGTH + ' characters.');
    
        if ( passwordLength < PASSWORD_MIN_LENGTH || passwordLength > PASSWORD_MAX_LENGTH ) {

            // if the user entered an invalid password length
            alert ('You chose an invalid length.\n\nPlease enter a number that is at least ' + PASSWORD_MIN_LENGTH + ' characters and at most ' + PASSWORD_MAX_LENGTH + ' characters.');
        }
        else {

            keepAsking = false;
        }
    }
}

function promptCharacterTypes () {

    let keepAsking = true;

    while (keepAsking) {

        // for each character type
        // should there be x character type?
        for( let i = 0 ; i < characterTypes.length ; i++ ) {

            var characterTypeDecision = window.prompt ('If this password MUST include ' + characterTypes[i].type + ", please enter 1." + 
            "\nIf this password must NOT include " + characterTypes[i].type + ", please enter 2." +
            "\nIf this password CAN include " + characterTypes[i].type + " but doesn't have to, please enter 3.");
            
            if(characterTypeDecision.toUpperCase() === "1"){

                specialRequirements.push(characterTypes[i]);
                // break out of the while loop that I haven't written yet
            } 
            else if (characterTypeDecision.toUpperCase() === "2"){
                // break out of the while loop that I haven't written yet
            } 
            else if (characterTypeDecision.toUpperCase() === "3"){
                // break out of the while loop that I haven't written yet
                characterTypes[i].used = true;
                specialRequirements.push(characterTypes[i]);
            } 
            else {
                // Future, if the user enters something other than 1, 2, or 3, ask again
                // continue the while loop that I haven't written yet
            }
        }
       

        // make sure that the user chose at least one character type
        if (specialRequirements.length) {

            keepAsking = false;

            let message = "You chose these condition for the password: \n\n";

            message += " - The password's length should be " + passwordLength + "\n";


            for(let i = 0 ; i < specialRequirements.length; i++){

                if(specialRequirements[i].used === true) {
                    message += " - The password CAN contain " + specialRequirements[i].type + "\n";
                }
                else if(specialRequirements[i].used === false) {
                    message += " - The password MUST contain " + specialRequirements[i].type + "\n";
                }
            } 

            message += " - No other character types can be present in the password.";
            
            window.alert(message);
        }
        else {

            // you need to chose at least one character type
            window.alert("You need to chose at least one character type to include in the password");
        }

    } 
}

function generatePassword () {

    let password = '';

    // generate for the desired length of the password
    // but leave room so that you can make sure that all of the requirements were met
    for(var i = 0 ; i < passwordLength - specialRequirements.length; i++) {

        password += generateRandomChar();  
    }

    // make sure that you fill the special requirements
    for(let i = 0 ; i < specialRequirements.length ; i++ ) {

        if(!specialRequirements[i].used) {

            // approximately uniform distribution over the range [0 , highestIndex)
            let index = Math.floor(Math.random() * specialRequirements[i].values.length);
            let character = specialRequirements[i].values[index];
            // insert into random spot
            index = Math.floor(Math.random() * password.length);

            password = password.slice(0, index) + character + password.slice(index);
            specialRequirements[i].used = true;
        }
        else {

            let character = generateRandomChar();

            // insert into random spot
            let index = Math.floor(Math.random() * password.length);
         
            password = password.slice(0, index) + character + password.slice(index);
        }
    }

    resetVariablesForNextGeneration();

    return password;
}

function generateRandomChar () {

    // it will actually be higher than the highest index by one, 
    // but that's good because the randomizer function 'max' is non-inclusive
    let highestIndex = 0;

    for(let i = 0 ; i < specialRequirements.length ; i++ ){
        highestIndex += specialRequirements[i].values.length;
    }

    // approximately uniform distribution over the range [0 , highestIndex)
    let index = Math.floor(Math.random() * highestIndex);

    // grab the character from the appropriate character type
    for(let j = 0 ; j < specialRequirements.length; j++ ){

        if(index < specialRequirements[j].values.length ) {

            specialRequirements[j].used = true;
            return specialRequirements[j].values[index];
        }
        index -= specialRequirements[j].values.length;
    }
}

function resetVariablesForNextGeneration () {

    passwordLength = 0;
    specialRequirements = [];
    for(let i = 0 ; i < characterTypes.length ; i ++){
        characterTypes[i].used = false;
    }
}

// Write password to the #password input
function promptUserAndGeneratePassword() {

  promptUserForPasswordRequirements();

  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;
}

// Add event listener to generate button marathonsandsushi
generateBtn.addEventListener("click", promptUserAndGeneratePassword);
// Madison Kendall
