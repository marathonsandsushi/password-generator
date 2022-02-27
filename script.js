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
        type : "lowercase",
        values : "abcdefghijklmnopqrstuvwxyz",
        used : false
    },
    {
        type : "uppercase",
        values : "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
        used : false
    },
    {
        type : "numerical",
        values : "0123456789",
        used : false
    },
    {
        type : "special",
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

            var characterTypeDecision = window.prompt ('Should this password include ' + characterTypes[i].type + " characters?");
            
            if(characterTypeDecision.toUpperCase() === "YES"){

                specialRequirements.push(characterTypes[i]);
                // break out of the while loop that I haven't written yet
            } 
            else if (characterTypeDecision.toUpperCase() === "NO"){
                // break out of the while loop that I haven't written yet
                characterTypes[i].used = true;
            } 
            else {

                // CODE NOT DONE
                // continue the while loop that I haven't written yet
            }
        }
       

        // make sure that the user chose at least one character type
        if (specialRequirements.length) {

            keepAsking = false;

            let message = "You chose to include these character types: \n\n";

            for(let i = 0 ; i < specialRequirements.length; i++){

                message += "- " + specialRequirements[i].type + "\n";
            }
            
            window.alert(message);
        }
        else {

            // you need to chose at least one character type
            window.alert("you need to chose at least one character type to include in the password");
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

    window.alert("PASSWord so far: " + password);
    // make sure that you fill the special requirements
    for(let i = 0 ; i < specialRequirements.length ; i++ ) {

        if(!specialRequirements[i].used) {

            // approximately uniform distribution over the range [0 , highestIndex)
            let index = Math.floor(Math.random() * specialRequirements[i].values.length);
            let character = specialRequirements[i].values[index];
            //insert into random spot
            index = Math.floor(Math.random() * password.length);

            password = password.slice(0, index) + character + password.slice(index);
            specialRequirements[i].used = true;
        }
        else {
            window.alert(specialRequirements[i].type + " has been used ..  generating random char");

            let character = generateRandomChar();

            //insert into random spot
            let index = Math.floor(Math.random() * password.length);

            window.alert("character: " + character + " index to insert: " + index);
                                                                                                    // O'm working this method
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

    for(let i = 0 ; i < characterTypes.length ; i++ ){
        highestIndex += characterTypes[i].values.length;
    }

    // approximately uniform distribution over the range [0 , highestIndex)
    let index = Math.floor(Math.random() * highestIndex);

    // grab the character from the appropriate character type
    for(let j = 0 ; j < characterTypes.length; j++ ){

        if(index < characterTypes[j].values.length ) {

            characterTypes[j].used = true;
            return characterTypes[j].values[index];
        }
        index -= characterTypes[j].values.length;
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
