// Array of character's hit points
const hp = [130, 225, 165, 180];
// Array of character's attack
const atk = [17, 7, 15, 15];
// Array of character's counter-attack
const def = [40, 30, 20, 25];
// Array of character names
const names = ["Syndra", "Ziggs", "Riven", "Bard"];
// Array of character images
const images = ["syndra.png", "ziggs.png", "riven.png", "bard.png"];

let fight;			// Boolean for if character is fighting
let count;			// Used to multiply base attack of character 
let defeated;		// Counter for opponents defeated

// Function to set up game
function newGame() {
	// Hide reset button at start of game
	$("#restart").hide();
	// Set count to 0
	count = 0;
	// Set defeated to 0
	defeated = 0;
	// Set fighting to false
	fight = false;

	// Create character cards
	for (let i = 0; i < 4; i++) {
		// Div to hold card info
		let info = $("<div>");
		// Class card added to div
		info.addClass("card");
		// Assign character name
		info.attr("name", names[i]);
		// Assign character health points
		info.attr("health-points", hp[i]);
		// Assign character attack
		info.attr("attack", atk[i]);
		// Assign character counter-attack
		info.attr("counter-attack", def[i]);
		// Character has not been selected
		info.attr("free", "true");
		// Div to hold image
		let holder = $("<div>");
		// Image tag
		let image = $("<img>");
		// Assign src to image
		image.attr("src", "assets/images/" + images[i]);
		// Assign alt to image
		image.attr("alt", names[i]);
		// Append image to holder div		
		holder.append(image);
		// Append character name to info div
		info.append(names[i]);
		// Append image to info div
		info.append(holder);
		// Holder for hitpoints
		let hitPoints = $("<p>");
		// Class health added to hitpoints
		hitPoints.addClass("health");
		// Append hitpoints to hitpoints holder
		hitPoints.append(hp[i]);
		// Append hitpints to info div
		info.append(hitPoints);
		// Append info to characters
		$(".characters").append(info);
	}

	// Click event for character cards
	$(".card").on("click", function() {
		// If count is 0 then clicked card is user's character
		if (count === 0) {
			// Count incremented by 1
			count++;
			// Set userHP to health-points value
			userHP = $(this).attr("health-points");
			// Set baseATK to attack value
			baseATK = $(this).attr("attack");
			// Give this card an id yourHP
			$(this).find("p").attr("id", "yourHP");
			// Display userHP
			$("#yourHP").text(userHP);
			// Append this to user div
			$("#user").append($(this));
			// Clear any displayed messages
			$("#message").text("");
			// Sets free attribute to false. Clicking on card will do nothing
			$(this).attr("free", "false");
			// Moves remaining characters to enemies div
			$(".enemies").append($(".characters"));	
		}

		// Checks if user is not already fighting and if card is available to be clicked
		if (fight === false && $(this).attr("free") === "true") {
			// User is fighting an enemy
			fight = true;
			// Set enemyHP to health-points value
			enemyHP = $(this).attr("health-points");
			// Set enemyATK to counter-attack value
			enemyATK = $(this).attr("counter-attack");
			// Set enemyName to name value
			enemyName = $(this).attr("name");
			// Give card an id oppHP
			$(this).find("p").attr("id", "oppHP");
			// Display enemyHP
			$("#oppHP").text(enemyHP);
			// Move this card to fighter
			$("#fighter").append($(this));
			// Clear any displayed messages
			$("#message").text("");
		}
	});
}

// Click event when attack button is clicked
$("#attack").on("click", function() {
	// If no enemy is selected
	if (fight === false) {
		// Display message
		$("#message").text("Select an opponent");
		// Clear other message
		$("#message2").text("");
	}

	// If enemy is selected
	if (fight === true) {
		// Check if user still has HP
		if (userHP > 0) {
			// User attack increases by base throughout round
			userATK = baseATK * count;
			// Subtrack userATK from enemyHP
			enemyHP -= userATK;
			// Increment counter
			count++;

			// Display messages
			$("#message").text("You attacked " + enemyName + " for " + userATK + " damage.");
			$("#message2").text(enemyName + " attacked you back for " + enemyATK + " damage.");	

			// Check if enemy is dead
			if (enemyHP <= 0) {
				// Empty div
				$("#fighter").empty();
				// Set fight to false
				fight = false;
				// Increment number of defeated characters
				defeated++;
				// Display message
				$("#message").text("You have defeated " + enemyName + ", choose another enemy.");
				$("#message2").text("");
			}

			// If enemy is still alive
			else {
				// Subtract enemy counter-attack from userHP
				userHP -= enemyATK;
				// Check if user is dead
				if (userHP <= 0) {
					// If dead set userHP to 0
					userHP = 0;
					// Display message
					$("#message").text("You lose.......GAME OVER");
					$("#message2").text("");
					// Show restart button
					$("#restart").show();
				}
			}					

			// Update HTML of userHP and enemyHP
			$("#yourHP").text(userHP);
			$("#oppHP").text(enemyHP);			
		}
	}		

	// Checks if user selected his character
	if (count === 0) {
		// Display message
		$("#message").text("Select your champion.");
		$("#message2").text("");
	}

	// Checks if there anre enemies left
	if (defeated === 3) {
		// Display message
		$("#message").text("You Win!!!");
		$("#message2").text("");
		// Show restart button
		$("#restart").show();
	}
});

// Restart click event
$("#restart").on("click", function() {
	// Empties any remaining enemies
	$(".characters").empty();
	// Moves div to start div
	$("#start").append($(".characters"));
	// Empties user div
	$("#user").empty();
	// Empties fighter div
	$("#fighter").empty();
	// Clears messages
	$("#message").empty();
	// Start new round
	newGame();
});

// Start game
newGame();