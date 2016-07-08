var magicNum = Math.ceil(Math.random() * 100);
var guess;
var guessCount = 5;
var diff = Math.abs(magicNum - guess);
var accuracy = Math.ceil(diff/100 * 5));

while (guessCount > 0) {
	switch (accuracy) {
		case 0:
			// YOU WIN
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
}
