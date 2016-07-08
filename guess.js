// shortcut for $(document).ready(fn(){})
// (bonus: all new vars have function-level scope)
$(function() {

	// SAVE INITIAL STATE:
	//$(document).data("initialDivination", $("#yourDivination").clone(true));

	var $hint = $(".hint"),
		$guessbox = $("#guessbox"),
		$submit = $("#submitter"),
		$hintbutt = $("#hinter"),
		$reset = $("#reset-button"),
		$feedback = $(".guessbox #feedbacker"),
		magicNum, message, guessArray, $guess,
		$guessTotal, $guessCount, $guessBox, $triangle;

function initialize() {
		magicNum = Math.ceil(Math.random() * 100);
		guessArray = [];
		$guess = undefined;
		$guessTotal = 5;
		$guessCount = $guessTotal;
		$guessBox = $(".guessbox #guessbox");
		$feedback.text("~guess the number~").css("font-size", "100%");
		$triangle = $(".hint");
	}

	function restoreInput() {
		$submit.fadeIn();
		$hintbutt.fadeIn(("slow"));
		$guessBox.removeAttr("style").removeAttr("disabled");
		$guessBox.attr("placeholder", "intuit a number between 1 and 100");
	}

	initialize();


	function giveMessage() {
		$feedback.text(message).css("font-size", "75%");
	}

	$submit.on("click", function(event) {
		getGuess();
	});

	function getGuess() {
		$guess = parseInt($("input:text").val(), 10);
		if (!isNaN($guess) && $guess > 0 === $guess < 101) {
			$("input:text").val("");
			checkGuess();
		} else {
			$guessBox.attr("placeholder", "the number is between 1 and 100");
		}
	}

	function checkGuess() {
		if ($guessCount < ($guessTotal + 1)) {
			if ($guess === magicNum) {
				// INSERT WINNING ANIMATION!!!!!!!!!!!!!!
				message = "A winner is you!\nMay the spirits be ever in your favour!";
			} else if (guessArray.indexOf($guess) > -1) {
				message = "You've already divined that number;\n";
				message += "Focus your energies & try again.";
			} else {
				message = howClose();
				$triangle.css("background-image", "url(images/traingle-cold.png)");
				guessArray.push($guess);
				--$guessCount;
				$guessBox.attr("placeholder", $guessCount + " readings remain");
			}
		}
		giveMessage();
		if ($guessCount === 0) {
			// INSERT LOSING ANIMATION!!!!!!!!!!!
			$submit.fadeOut("slow");
			$hintbutt.fadeOut("slow");
			$guessBox.attr("placeholder", "Time to go back to psychic school.").attr("disabled", true);
			$guessBox.css("border", "none").css("background-color", "#4A4260").css("color", "#A4A0AF");
		}
	}

	function highLow() {
		var howHigh = "Have you made a connection?\nYour guess is ";
		return $guess < magicNum ? howHigh += "below and " : howHigh += "above and ";
	}

	function howClose() {
		var closeness = highLow();
		if (Math.abs($guess - magicNum) < 10) {
			closeness += "within 10 digits\n of the magic number.";
			$triangle.css("background-image", "url('images/triangle-hot.png')");
		} else if (Math.abs($guess - magicNum) < 20) {
			closeness += "within 20 digits\n of the magic number.";
			$triangle.css("background-image", "url(images/triangle-warm.png)");
		} else {
			closeness = "You sure you're clairvoyant?\n";
			closeness += "That isn't the magic number.\n";
			$triangle.css("background-image", "url(images/triangle-cold.png)");
		}
		return closeness;
	}

	$hintbutt.on("click", function(){
		hintMe();
	});

	function hintMe() {
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
	}

	$reset.on("click", function(event) {
		reset();
	});

	function reset() {
		//$(document).data("initialDivination").replaceAll("#yourDivination");
		initialize();
		restoreInput();
	}

});