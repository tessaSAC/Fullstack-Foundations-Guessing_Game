$(function() {
// shortcut for $(document).ready(fn(){})
// bonus: all new vars have function-level scope
	var $hint = $(".hint:image");
	var $guessbox = $("#guessbox");
	var $submit = $("#submitter");
	var $reset = $("#reset-button");

	var $magicNum = Math.ceil(Math.random() * 100);
	var $guessCount = 5;
	var $guess, $diff, $accuracy;

	while ($guessCount > 0) {
		// establish accuracy of guess
		$guess = $("submit").val();
		$diff = Math.abs(magicNum - $guess);
		$accuracy = Math.ceil($diff/100 * 5);
		// HINT feedback
		switch ($accuracy) {
			case 0:
				// YOU WIN
				guessCount = 1;
				break;
			case 1:
				// HOT
				break;
			case 2:
				// WARM
				break;
			default:
				// COLD
		}
		--$guess;
	}

	$("reset").on("click", function() {
		// RESET EVERYTHING
	});
});