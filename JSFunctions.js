"use strict";




//Testutskrifter
/*
console.log( oGameData );
oGameData.initGlobalObject();
console.log( oGameData.gameField );
console.log( oGameData.checkForGameOver() );
*/

/*
console.log( oGameData.checkHorizontal() );
console.log( oGameData.checkVertical() );
console.log( oGameData.checkDiagonalLeftToRight() );
console.log( oGameData.checkDiagonalRightToLeft() );
console.log( oGameData.checkForDraw() );
*/



/**
 * Globalt objekt som innehåller de attribut som ni skall använda.
 * Initieras genom anrop till funktionern initGlobalObject().
 */
let oGameData = {};

/**
 * Initerar det globala objektet med de attribut som ni skall använda er av.
 * Funktionen tar inte emot några värden.
 * Funktionen returnerar inte något värde.
 */
oGameData.initGlobalObject = function() {

    //Datastruktur för vilka platser som är lediga respektive har brickor
    oGameData.gameField = Array('', '', '', '', '', '', '', '', '');https://canvas.kau.se/
    
    /* Testdata för att testa rättningslösning */
    //oGameData.gameField = Array('X', 'X', 'X', '', '', '', '', '', '');
    //oGameData.gameField = Array('X', '', '', 'X', '', '', 'X', '', '');
    //oGameData.gameField = Array('X', '', '', '', 'X', '', '', '', 'X');
    //oGameData.gameField = Array('', '', 'X', '', 'X', '', 'X', '', '');
    //oGameData.gameField = Array('X', 'O', 'X', '0', 'X', 'O', 'O', 'X', 'O');

    //Indikerar tecknet som skall användas för spelare ett.
    oGameData.playerOne = "X";

    //Indikerar tecknet som skall användas för spelare två.
    oGameData.playerTwo = "O";

    //Kan anta värdet X eller O och indikerar vilken spelare som för tillfället skall lägga sin "bricka".
    oGameData.currentPlayer = "";

    //Nickname för spelare ett som tilldelas från ett formulärelement,
    oGameData.nickNamePlayerOne = "";

    //Nickname för spelare två som tilldelas från ett formulärelement.
    oGameData.nickNamePlayerTwo = "";

    //Färg för spelare ett som tilldelas från ett formulärelement.
    oGameData.colorPlayerOne = "";

    //Färg för spelare två som tilldelas från ett formulärelement.
    oGameData.colorPlayerTwo = "";

    //"Flagga" som indikerar om användaren klickat för checkboken.
    oGameData.timerEnabled = false;

    //Timerid om användaren har klickat för checkboxen. 
    oGameData.timerId = null;

}


/**
 * Kontrollerar för tre i rad.
 * Returnerar 0 om det inte är någon vinnare, 
 * returnerar 1 om spelaren med ett kryss (X) är vinnare,
 * returnerar 2 om spelaren med en cirkel (O) är vinnare eller
 * returnerar 3 om det är oavgjort.
 * Funktionen tar inte emot några värden.
 */
oGameData.checkForGameOver = function() {
    // Kolla horisontella, vertikala och diagonal vinnande kombinationer
    if (this.checkHorizontal() || this.checkVertical() || this.checkDiagonalLeftToRight() || this.checkDiagonalRightToLeft()) {
        if(this.currentPlayer === this.playerOne){
            return 1;
        } else {
            return 2;
        }
        
    } else if (this.checkForDraw()) {
        return 3; // Oavgjort om det inte finns fler tomma fält
    } else {
        return 0; // Inget avslut ännu
    }
}

/**
 * Kontrollerar horisontella vinnande kombinationer.
 * Returnerar true om det finns en vinnare, annars false.
 * loopen körs så länge i är mindre än 9
 * i kommer att vara 0, 3, 6 när loopen körs.
 */
oGameData.checkHorizontal = function() {
    for (let i = 0; i < 9; i += 3) {
        if (this.gameField[i] !== '' && this.gameField[i] === this.gameField[i + 1] && this.gameField[i + 1] === this.gameField[i + 2]) {
            this.currentPlayer = this.gameField[i];
            return true;
        }
    }
    return false;
}

/**
 * Kontrollerar vertikala vinnande kombinationer.
 * Returnerar true om det finns en vinnare, annars false.
 * loopen körs så länge som i är mindre än 3.
 * värdet på i ökar med 1 efter varje iteration av loopen. i++ är samma sak som i = i + 1.
 */
oGameData.checkVertical = function() {
    for (let i = 0; i < 3; i++) {
        if (this.gameField[i] !== '' && this.gameField[i] === this.gameField[i + 3] && this.gameField[i + 3] === this.gameField[i + 6]) {
            this.currentPlayer = this.gameField[i];
            return true;
        }
    }
    return false;
}

/**
 * Kontrollerar diagonal vinnande kombinationer (från vänster till höger).
 * Returnerar true om det finns en vinnare, annars false.
 */
oGameData.checkDiagonalLeftToRight = function() {
    if (this.gameField[0] !== '' && this.gameField[0] === this.gameField[4] && this.gameField[4] === this.gameField[8]) {
        return true;
    }
    return false;
}

/**
 * Kontrollerar diagonal vinnande kombinationer (från höger till vänster).
 * Returnerar true om det finns en vinnare, annars false.
 */
oGameData.checkDiagonalRightToLeft = function() {
    if (this.gameField[2] !== '' && this.gameField[2] === this.gameField[4] && this.gameField[4] === this.gameField[6]) {
        return true;
    }
    return false;
}

/**
 * Kontrollerar om spelet är oavgjort (inga tomma fält kvar).
 * Returnerar true om spelet är oavgjort, annars false.
 */
oGameData.checkForDraw = function() {
    for (let i = 0; i < this.gameField.length; i++) {
        if (this.gameField[i] === '') {
            return false; // Det finns minst ett tomt fält kvar
        }
    }
    return true; // Alla fält är ifyllda, det är oavgjort
}


/**
här börjar lab2
 */


window.addEventListener("load", function(){ //Väntar på att hela HTML sidan laddats innan funktionne körs
    console.log("sidan har laddats");

oGameData.initGlobalObject(); //Anropar metoden initGlobalObject

let gameArea = document.querySelector("#game-area"); /* document.querySelector används för att hitta det första elementet som har id:et "game-area" 
                                                      * i HTML-dokumentet och tilldelar det till variabeln gameArea
                                                      */

gameArea.classList.add("d-none"); //Lägger till d-none och gömmer game-area
console.log("Spelområdet är gömt"); // Kontroll att spelområdet har dolts

let startKnapp = this.document.querySelector("#newGame"); //När knappen Starta spelet! klickas så anropas funktionen validateform

startKnapp.addEventListener("click", function(){ // lyssnare på ”Starta spelet!” knappen läggs, för att lyssna efter klick-händelsen

    console.log("Starta-spelet knappen har klickats"); // Kontroll att startknappen har klickats

    validateForm();

});

});



/**
 * validateForm kontrollerar 
 * om namnen är mer eller lika med 5 tecken
 * om färgerna är olika samt att färgerna inte är svart eller vit
 * är det inga fel så körs initiateGame
 * är det fel så skrivs det ett fel-meddelande ut 
 */

function validateForm() {
   
    let errorMsg = ""; // skapar en variabel errorMsg och tilldelar den en tom sträng som standardvärde, den ska sedan annvädnas för att lagra felmedelandet vid validering

    let playerOne = document.querySelector("#nick1").value; /* hämtar värdet för första spelaren Nick1,...  
                                                             * value gör att om användaren skriver in sitt namn i input-fältet, kommer 
                                                             * .value att returnera namnet sedan i <h1>*/

    let playerTwo = document.querySelector("#nick2").value; /* hämtar värdet för andra spelaren Nick2 */

    let colorPlayerOne =  document.querySelector("#color1").value;  // här hämtas värdet från det första färginput-fältet med id "color1" och tilldelar det till den första spelaren färg
    
    let colorPlayerTwo =  document.querySelector("#color2").value;  // på samma sätt här hämtas värdet från det andra färginput-fältet med id "color2" och tilldelar det till den andra spelarens färg


    try {

        if(playerOne.length === 0 || playerTwo.length === 0){ // här kontrollerar vi om något av input-fälten för spelarnamnen är tomma
            throw new Error("Ange namn för båda spelarna.");  // om något av fälten är tomt kastar vi ett fel med throw new Error().
        }
        

        /* vi kontrollerar om längden på spelarnas namn är mindre än 5 tecken 
         * Om något av namnen är kortare än 5 tecken kastar vi ett fel
         */
        
        if(playerOne.length < 5 || playerTwo.length < 5){
            throw new Error("Namn måste vara minst 5 tecken långa."); // Nickname (för båda spelarna) måste vara minst 5 tecken långt
        }
        

        /* här jämför vi spelarnas namn med varandra för att se om de är samma namn.
         * om de är det kastar vi ett fel eftersom båda spelarna måste ha olika namn.
         */

        if(playerOne === playerTwo){
            throw new Error("Namnen får inte vara samma."); // här Kontrolleras att namnen inte är samma dvs Nickname för spelare 1 och spelare 2 får inte vara lika
        }


        /* kontrollerar för både spelarna om färgerna är antingen vit (#FFFFFF) eller svart (#000000), 
         * eller om de två spelarna har valt samma färg.
         * kastar ett Error om de har samma färg eller om spelarna har vit eller svart färg
         */

        if(colorPlayerOne === "#FFFFFF" || colorPlayerOne === "#000000" || colorPlayerOne === colorPlayerTwo){
            throw new Error("Färg får inte vara svart, vit eller samma som andra spelaren."); // Valda färger får INTE vara vit, svart eller lika för båda spelarna
        }

        if(colorPlayerTwo === "#FFFFFF" || colorPlayerTwo === "#000000" || colorPlayerTwo === colorPlayerOne){
            throw new Error("Färg får inte vara svart, vit eller samma som andra spelaren.");
        }


        initiateGame(); /*om valideringen uppfylls, anropas funktionen initiateGame() för att starta spelet*/


    } catch (error) {  /* om något av ovanstående valideringen inte är uppfyllt skall ett fel-meddelande visas i p-elementet med id=”errorMsg” */
       
        let errorMsg = document.querySelector("#errorMsg"); // Här hämtar vi referensen till det HTML-element som har id "errorMsg" och tilldelar det till variabeln errorMsg
                                                            // vi ska användaa den för att visa felmeddelanden för användaren
       
        errorMsg.textContent = error.message; /* visas felmeddelandet för användaren med felmeddelandet som genererats av det kastade felet*/
        
        console.log("validering krav uppfylls inte"); // kontrollerar genom console när validering av förmuläret inte uppfylls
    }

}



/**
 * initiera spelet om valideringen lyckas.
 * om villkoren ovan är uppfyllda ska metoden ”initiateGame” anropas */

function initiateGame() { // Metoden här tar inga invärden och har inget returvärde
    console.log("Initierar spelet."); // Kontroll att spelet initieras

    let form = document.querySelector("#div-in-form"); //Gömmer formuläret
    form.classList.add("d-none"); 

    console.log("Formuläret är dolt nu"); //kontrollerar att förmuläret är dolt i console


    let gameArea = document.querySelector("#game-area"); //Tar bort d-none och visar spelplanen
    gameArea.classList.remove("d-none");

    console.log("Spelområdet visas nu"); // kontrollerar via console att speltabellen visas


    let errorMsg = document.querySelector("#errorMsg"); // tömmer eventuell felmeddelandet 
    errorMsg.textContent = "";

    oGameData.nickNamePlayerOne = document.querySelector("#nick1").value;
    oGameData.nickNamePlayerTwo = document.querySelector("#nick2").value; //sparar värdet som skrevs in för namn
    oGameData.colorPlayerOne = document.querySelector("#color1").value; // färg värden
    oGameData.colorPlayerTwo = document.querySelector("#color2").value;

    let spelPlan = document.querySelectorAll("td"); //loopar igenom alla "td" i spelplanen och tömmer dom samt sätter bakgrundsfärgen till vit


    /* for loop används för att iterera över varje element i arrayen spelPlan
     * inuti loopen nollställs textContent för varje element i spelPlan
    */

    for(let i=0; i < spelPlan.length; i++){
        spelPlan[i].textContent = ""; // innehållet i varje spelruta rensas ut och sätts till en tom sträng
        spelPlan[i].style.backgroundColor = "white"; //Tog denna rad från CHAT-GPT, den ändrar bakgrundsfärgen till vit För varje element i spelPlan
    }

    let slumpTal = Math.random() //slumpar ett tal mellan 0 och 1 
                                 // Funktionen används för att slumpa tal mellan 0 och 1 som sedan används för att slumpmässigt välja ett nummer som ska vara antingen 
                                 // om talet är mindre än 0.5 eller om talet är större eller lika med 0.5

    let playerChar, playerName; // Deklarera variablerna här


    if(slumpTal < 0.5){ //om det är mindre än 0.5 så tilldelas playerChar till playerOne och playerName till namnet
      
        playerChar = oGameData.playerOne; // tilldelning av tecknet till den första spelaren
        playerName = oGameData.nickNamePlayerOne; // variabeln playerName tilldelas värdet av oGameData.nickNamePlayerOne dvs namnet på den första spelaren tilldelas variabeln playerName
        oGameData.currentPlayer = oGameData.playerOne; // det här betyder att den första spelaren är den aktuella spelaren

        console.log("Slumptal mindre än 0.5, första spelare börjar"); // kontrollerar genom konsolen om att slumpnumret är mindre än 0.5 och att den första spelaren börjar.

  
    } else if(slumpTal >= 0.5){ //Om villkoret i rad 288 är falskt, som innebär att slumpnumret är 0.5 eller större, då utförs koden i denna else if-sats
      
        playerChar = oGameData.playerTwo; // tilldelning av tecknet till den andra spelaren
        playerName = oGameData.nickNamePlayerTwo; // här tilldelas playerName namnet på den andra spelaren
        oGameData.currentPlayer = oGameData.playerTwo; // den här raden betdyder att den andra spelaren är den aktiva spelare

        console.log("Slumptal större än eller lika med 0.5, andra spelaren börjar"); // kontrollerar att slumpnumret är 0.5 eller större och att den andra spelaren börjar
    }

  
    let jumbotron = document.querySelector(".jumbotron h1"); /* document.querySelector för att hitta <h1> elementet som är
                                                              * inuti ett element med klassen "jumbotron" 
                                                              * för att sedan ändra texten i h1-elementet */

 
    if (oGameData.currentPlayer === oGameData.playerOne) { // en villkorssats för att kontrollerar om den aktuella spelaren är samma som den första spelaren
        jumbotron.textContent = "Aktuell spelare är " + oGameData.nickNamePlayerOne + " (" + playerChar + ")"; 
        /* om villkoret i rad 309 är sant, uppdateras texten i h1 (jumbotron) till att visa att den aktuella spelaren är den första spelaren 
         * och vilket tecken de spelar med genom att använda (playerChar) 
        */



        /* om villkoret är falskt utförs koden i else.
         * här uppdateras texten i h1 (jumbotron) för att visa att den aktuella spelaren är den andra spelaren
         */

    } else {
        jumbotron.textContent = "Aktuell spelare är " + oGameData.nickNamePlayerTwo + " (" + playerChar + ")";

    }
    console.log("rubriken är nu uppdaterad"); // kontrollerar att rubriken har uppdaterats

    var table = document.querySelector("#game-area table"); //Väljer spelplanen

    table.addEventListener("click", function(e){ //Lägger en lyssnare som lyssnar efter klick på spelrutorna
        if(e.target.tagName === "TD"){ //Kollar om det man klickade på var en tabell(Spelplanen)
            executeMove(e.target); //Anropar funktionen executeMove med den tabell(ruta) man klickade på
            //console.log("Lyssnaren funkar om man klickar på en ruta"); 
        }
    });

}

function executeMove(clickedCell) {

    let cellIndex = parseInt(clickedCell.dataset.id); 

    let jumbotron = document.querySelector(".jumbotron h1");

    if(oGameData.gameField[cellIndex] === ""){ //Kollar om rutan man klickade i är tom
        oGameData.gameField[cellIndex] = oGameData.currentPlayer;
        
        clickedCell.textContent = oGameData.currentPlayer;

        //console.log("Rutan är tom och " + oGameData.currentPlayer + " placerade på rutan " + cellIndex);

        if(oGameData.currentPlayer === oGameData.playerOne){
            clickedCell.style.backgroundColor = oGameData.colorPlayerOne; //Bakgrundsfärgen som spelare ett valde sätts som bakgrund
            oGameData.currentPlayer = oGameData.playerTwo; //När spelare ett har gjort sitt drag så blir det spelare två tur
            jumbotron.textContent = "Aktuell spelare är " + oGameData.nickNamePlayerOne + " (" + oGameData.playerTwo + ")"; //Uppdaterar texten i jumbatronen till aktuell spelare
            console.log("playerOne tur");
        } else {
            clickedCell.style.backgroundColor = oGameData.colorPlayerTwo; //Bakgrundsfärgen som spelare två valde sätts som bakgrund
            oGameData.currentPlayer = oGameData.playerOne; //När spelare två har gjort sitt drag så blir det spelare ett tur
            jumbotron.textContent = "Aktuell spelare är " + oGameData.nickNamePlayerTwo + " (" + oGameData.playerOne + ")"; 
            console.log("playerTwo tur");
        }

    } else {
        console.log("Rutan är upptagen, välj en ny ruta");
    }

}