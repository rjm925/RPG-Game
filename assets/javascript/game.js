var hp = [100, 125, 150, 175];
var atk = [15, 10, 7, 5];
var def = [10, 12, 20, 15];
var names = ["Syndra", "Ziggs", "Riven", "Bard"];
var images = ["syndra.png", "ziggs.png", "riven.png", "bard.png"];
var fight;
var count;
var defeated;

newGame();

function newGame() {
	$("#restart").hide();
	count = 0;
	defeated = 0;
	fight = false;

	for (var i = 0; i < 4; i++) {
		var info = $("<div>");
		info.addClass("card");
		info.attr("name", names[i]);
		info.attr("health-points", hp[i]);
		info.attr("attack", atk[i]);
		info.attr("counter-attack", def[i]);
		info.attr("free", "true");
		var holder = $("<div>");
		var image = $("<img>");
		image.attr("src", "assets/images/" + images[i]);
		image.attr("alt", names[i]);		
		holder.append(image);
		info.append(names[i]);
		info.append(holder);
		var hitPoints = $("<p>");
		hitPoints.addClass("health");
		// hitPoints.attr("id", names[i]);
		hitPoints.append(hp[i]);
		info.append(hitPoints);
		$(".characters").append(info);
	}

	$(".card").on("click", function() {
		if (count === 0) {
			count++;
			userHP = $(this).attr("health-points");
			baseATK = $(this).attr("attack");
			$(this).find("p").attr("id", "yourHP");
			$("#yourHP").text(userHP);
			$("#yourName").append($(this).attr("name"));
			$("#user").append($(this));
			$("#message").text("");
			$(this).attr("free", "false");
			$(".enemies").append($(".characters"));	
		}

		if (fight === false && $(this).attr("free") === "true") {
			fight = true;
			enemyHP = $(this).attr("health-points");
			enemyATK = $(this).attr("counter-attack");
			enemyName = $(this).attr("name");
			$(this).find("p").attr("id", "oppHP");
			$("#oppHP").text(enemyHP);
			$("#oppName").append($(this).attr("name"));
			$("#fighter").append($(this));
			$("#message").text("");
		}
	});
}

$("#attack").on("click", function() {
	if (fight === false) {
		$("#message").text("Select an opponent");
		$("#message2").text("");
	}

	if (fight === true) {
		if (userHP > 0) {
			userATK = baseATK * count;
			enemyHP -= userATK;
			count++;

			$("#message").text("You attacked " + enemyName + " for " + userATK + " damage.");
			$("#message2").text(enemyName + " attacked you back for " + enemyATK + " damage.");	

			if (enemyHP <= 0) {
				$("#fighter").empty();
				fight = false;
				defeated++;
				$("#message").text("You have defeated " + enemyName + ", choose anoher enemy.");
				$("#message2").text("");
			}

			else {
				userHP -= enemyATK;
				if (userHP <= 0) {
					userHP = 0;
					$("#message").text("You lose.......GAME OVER");
					$("#message2").text("");
					$("#restart").show();
				}
			}					

			$("#yourHP").text(userHP);
			$("#oppHP").text(enemyHP);			
		}
	}		

	if (count === 0) {
		$("#message").text("Select your champion.");
		$("#message2").text("");
	}

	if (defeated === 3) {
		$("#message").text("You Win!!!");
		$("#message2").text("");
		$("#restart").show();
	}
});

$("#restart").on("click", function() {
	$("#start").append($(".characters"));
	$("#user").empty();
	$("#fighter").empty();
	$("#message").empty();
	newGame();
});