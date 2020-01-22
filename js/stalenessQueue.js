function StaleNegation(queue, shieldQueue) {

	var S = [0.09, 0.08545, 0.07635, 0.0679, 0.05945, 0.05035, 0.04255, 0.03345, 0.025];
	var s = 1;
	for (var i = 0; i < queue.length; i++) {
		if (queue[i]) {
			if (!shieldQueue[i])
				s -= S[i];
			else
				s -= S[i] * 0.85;
		}
	}
	if (s == 1) {
		return 1.05;
	}
	return s;
}

class Queue {
	constructor(size = 9) {
		this.size = size;
		this.queue = [];

		this.push = function (e, s) {
			for (var i = this.size-1; i >= 0; i--) {
				this.queue[i] = this.queue[i - 1];
			}
			this.queue[0] = { move: e, shield: s };
		}

		this.reset = function () {
			for (var i = 0; i < this.size; i++) {
				this.queue[i] = {move: "", shield: false};
			}
		}

		this.reset();

		this.print = function () {
			var s = "<table id='stalenessQueue'><tr>";
			for (var i = 0; i < this.size; i++) {
				if (this.queue[i].shield)
					s += `<td class='hitShield' title='${this.queue[i].move} hit on shield'>${this.queue[i].move}</td>`;
				else
					s += `<td>${this.queue[i].move}</td>`;
			}
			s += "</tr></table>"
			return s;
		}

		this.getMultipliers = function () {
			var s = "";
			var currentMoves = [];

			for (var i = 0; i < this.queue.length; i++) {
				if (this.queue[i].move == "")
					break;
				
				var move = this.queue[i].move;
				if (currentMoves.indexOf(move) >= 0)
					continue;

				var q = [false, false, false, false, false, false, false, false, false];
				var sq = [false, false, false, false, false, false, false, false, false];

				q[i] = true;
				sq[i] = this.queue[i].shield;

				for (var x = i + 1; x < this.queue.length; x++) {
					if (this.queue[x].move == move) {
						q[x] = true;
						sq[x] = this.queue[x].shield;
					}
				}

				var r = +StaleNegation(q, sq).toFixed(4);

				s += `${move}: ${r}x\n<br/>\n`;

				currentMoves.push(move);
			}
			s += "Moves not in queue: Freshness bonus 1.05x";
			return s;
		}
	}
}

var MoveList = [
	"Jab 1",
	"Jab 2",
	"Jab 3",
	"Rapid Jab / Rapid Jab Finisher",
	"Ftilt 1",
	"Ftilt 2",
	"Ftilt 3",
	"Utilt",
	"Dtilt",
	"Fsmash",
	"Usmash",
	"Dsmash",
	"Nair",
	"Fair 1",
	"Fair 2",
	"Fair 3",
	"Bair",
	"Uair",
	"Dair",
	"Zair",
	"Pummel",
	"Fthrow",
	"Bthrow",
	"Uthrow",
	"Dthrow",
	"Neutral B",
	"Side B",
	"Up B",
	"Down B",
	"Final Smash"
];

function SetMoveList() {
	var s = "";
	for (var i = 0; i < MoveList.length; i++) {
		if(i==0)
			s += `<option value='${MoveList[i]}' selected>${MoveList[i]}</option>`;
		else
			s += `<option value='${MoveList[i]}'>${MoveList[i]}</option>`;
	}
	return s;
}