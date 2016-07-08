// shortcut for $(document).ready(fn(){})
// (bonus: all new vars have function-level scope)
$(function() {

	// SAVE INITIAL STATE:
	$(document).data("initialDivination", $("#yourDivination").clone(true));


	var $hint = $(".hint:image"),
		$guessbox = $("#guessbox"),
		$submit = $("#submitter"),
		$reset = $("#reset-button"),

		magicNum = Math.ceil(Math.random() * 100),
		message,
		guessArray = [],
		$guess,
		$guessTotal = 5,
		$guessCount = $guessTotal,
		$triangle = $(".hint");

	function giveMessage() {
		alert(message);
	}

	function getGuess() {
		$submit.on("click", function(){
			$guess = +$("input:text").val();
			$("input:text").val("");
		});
		checkGuess();
	}

	function checkGuess() {
		if ($guessCount <= $guessTotal && $guessCount > 0) {
			if ($guess === magicNum) {
				// INSERT WINNING ANIMATION!!!!!!!!!!!!!!
				message = "A winner is you!\nMay the spirits be ever in your favour.";
			} else if (guessArray.indexOf($guess) < 0) {
				message = "You've already divined that number;\n";
				message += "Focus your energies & try again.";
			} else {
				message = "Are you sure you're clairvoyant?\n";
				message += "That is not the magic number.\n" + howClose();
				guessArray.push($guess);
				$triangle.css("background-image", "url(images/traingle-cold.png)");
			}
		} else {
			// INSERT LOSING ANIMATION!!!!!!!!!!!
			message = "You are out of tries.\nTime to go back to psychic school.";
		}
		giveMessage();
	}

	function highLow() {
		var howHigh = "Your guess is ";
		return $guess < magicNum ? howHigh += "below and " : howHigh += "above and ";
	}

	function howClose() {
		var closeness = highLow();
		if (Math.abs($guess - magicNum) < 10) {
			closeness += "within 10 digits of the magic number.";
			$triangle.css("background-image", "url(images/traingle-hot.png)");
		} else if (Math.abs($guess - magicNum) < 20) {
			closeness += "within 20 digits of the magic number.";
			$triangle.css("background-image", "url(images/traingle-warm.png)");
		}
		return beginning;
	}

	function hintMe() {
		$($submit).on("click", function(){
			// CREATE HINTS
			var hintArr = [],
				numHints = $guessTotal * 2 - guessArray.length;

			for (var i = 0; i < numHints; ++i) {
				hintArr.push(Math.ceil(Math.random() * 100));
			}
			hintArr[Math.ceil(Math.random() * numHints - 1)] = magicNum;
			message = "One of the following is the winning number:\n";
			message += hintArr.join("  ");
			giveMessage();
		});
	}

	function reset() {
		$(document).data("initialDivination").replaceAll("#yourDivination");
	}

});