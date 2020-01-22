class StickWheel {
	constructor(f, id, position, s, l) {
		this.f = f;
		this.id = id;
		this.canvas = document.getElementById(id);

		this.s = s;
		this.canvas.width = this.s;
		this.canvas.height = this.s;
		this.center = { x: this.s / 2, y: this.s / 2 };
		this.r = l;
		this.r2 = l;
		this.gate = l;
		this.controllerR = 128;
		this.h = 15;
		this.c = 120 / 128;
		this.controller = "GameCube";

		this.position = { X: 0, Y: 0 };

		this.clickActive = false;

		var stickWheel = this;

		this.mouseEvent = function (e) {
			if (!stickWheel.clickActive)
				return;

			var rect = stickWheel.canvas.getBoundingClientRect();
			var x = e.clientX - rect.left;
			var y = e.clientY - rect.top;

			var position = { X: 0, Y: 0 };

			position.X = Math.min(Math.max(Math.floor((((x - stickWheel.center.x)) / stickWheel.r) * 120), -127), 127);
			position.Y = Math.min(Math.max(Math.floor((((stickWheel.center.y - y)) / stickWheel.r) * 120), -127), 127);

			if (stickWheel.controller == "Wiimote") {
				if (position.X < -24)
					position.X = -127;
				else if (position.X > 24)
					position.X = 127;
				else
					position.X = 0;

				if (position.Y < -24)
					position.Y = -127;
				else if (position.Y > 24)
					position.Y = 127;
				else
					position.Y = 0;

			} else {

				if (!InsideStickGate(stickWheel.controllerR, position.X, position.Y))
					position = stickWheel.position;

			}

			this.position = position;
			stickWheel.f(position);
		}

		this.canvas.ontouchmove = function(event) {
			event.preventDefault();

			if (event.touches.length === 1 && event.touches[0].identifier === 0) {

				var rect = stickWheel.canvas.getBoundingClientRect();
				var x = event.touches[0].clientX - rect.left;
				var y = event.touches[0].clientY - rect.top;

				var position = { X: 0, Y: 0 };

				position.X = Math.min(Math.max(Math.floor((((x - stickWheel.center.x)) / stickWheel.r) * 120), -127), 127);
				position.Y = Math.min(Math.max(Math.floor((((stickWheel.center.y - y)) / stickWheel.r) * 120), -127), 127);

				if (stickWheel.controller == "Wiimote") {
					if (position.X < -24)
						position.X = -127;
					else if (position.X > 24)
						position.X = 127;
					else
						position.X = 0;

					if (position.Y < -24)
						position.Y = -127;
					else if (position.Y > 24)
						position.Y = 127;
					else
						position.Y = 0;

				} else {

					if (!InsideStickGate(stickWheel.controllerR, position.X, position.Y))
						position = stickWheel.position;

				}

				this.position = position;
				stickWheel.f(position);
			}
		};


		this.canvas.addEventListener('mousedown', function (e) {
			stickWheel.clickActive = true;
		}, false);
		this.canvas.addEventListener('mousemove', this.mouseEvent, false);
		this.canvas.addEventListener('mouseup', function (e) {
			stickWheel.clickActive = false;
		}, false);
		this.canvas.addEventListener('mouseleave', function (e) {
			stickWheel.clickActive = false;
		}, false);

		this.drawStick = function (position) {
			var context = this.canvas.getContext("2d");
			
			context.clearRect(0, 0, this.canvas.width, this.canvas.height);

			//context.strokeStyle = '#FF0000';

			//context.beginPath();
			//context.strokeRect((this.center.x - this.r), (this.center.y - this.r), this.r * 2, this.r * 2);
			//context.closePath();
			//context.stroke();

			context.strokeStyle = '#000000';

			if (this.controller == "Wiimote") {
				context.beginPath();
				context.strokeRect((this.center.x - this.r * this.c), (this.center.y - this.r * this.c), this.r * 2 * this.c, this.r * 2 * this.c);
				context.closePath();
				context.stroke();
			}

			//context.beginPath();
			//context.strokeRect((this.center.x - this.r * this.c), (this.center.y - this.r * this.c), this.r * 2 * this.c, this.r * 2 * this.c);
			//context.closePath();
			//context.stroke();
			
			context.beginPath();
			context.arc(this.center.x, this.center.y, this.gate * this.controllerR / 128, 0, 2 * Math.PI);
			context.closePath();
			context.stroke();

			context.globalCompositeOperation = 'destination-out';
			context.beginPath();
			context.arc(this.center.x + (this.r * StickSensibilityPosition(position.X)), this.center.y + (-this.r * StickSensibilityPosition(position.Y)), this.r2 / 1.75, 0, 2 * Math.PI);
			context.closePath();
			context.fill();
			context.globalCompositeOperation = 'source-over';
			context.beginPath();
			context.arc(this.center.x + (this.r * StickSensibilityPosition(position.X)), this.center.y + (-this.r * StickSensibilityPosition(position.Y)), this.r2 / 1.75, 0, 2 * Math.PI);
			context.closePath();
			context.stroke();
			context.globalCompositeOperation = 'destination-out';
			context.beginPath();
			context.arc(this.center.x + (this.r * StickSensibilityPosition(position.X)), this.center.y + (-this.r * StickSensibilityPosition(position.Y)), this.r2 / 2.5, 0, 2 * Math.PI);
			context.closePath();
			context.fill();
			context.globalCompositeOperation = 'source-over';
			context.beginPath();
			context.arc(this.center.x + (this.r * StickSensibilityPosition(position.X)), this.center.y + (-this.r * StickSensibilityPosition(position.Y)), this.r2 / 2.5, 0, 2 * Math.PI);
			context.closePath();
			context.stroke();
			context.globalCompositeOperation = 'destination-out';
			context.beginPath();
			context.arc(this.center.x + (this.r * StickSensibilityPosition(position.X)), this.center.y + (-this.r * StickSensibilityPosition(position.Y)), this.r2 / 4, 0, 2 * Math.PI);
			context.closePath();
			context.fill();
			context.globalCompositeOperation = 'source-over';
			context.beginPath();
			context.arc(this.center.x + (this.r * StickSensibilityPosition(position.X)), this.center.y + (-this.r * StickSensibilityPosition(position.Y)), this.r2 / 4, 0, 2 * Math.PI);
			context.closePath();
			context.stroke();

			this.position = position;
		}

		this.drawStick(position);
		
	}

	
}

function DIAngleDeadzones(angle) {
	var deadzone = 11;
	if (angle <= deadzone || angle >= 360 - deadzone)
		angle = 0;
	else if (angle <= 90 + deadzone && angle >= 90 - deadzone)
		angle = 90;
	else if (angle <= 180 + deadzone && angle >= 180 - deadzone)
		angle = 180;
	else if (angle <= 270 + deadzone && angle >= 270 - deadzone)
		angle = 270;
	return angle;
}

function StickSensibilityPosition(value) {
	if (value < 24 && value > -24)
		return 0;
	if (value > 128)
		return 1;
	if (value < -128)
		return -1;
	return value / 128;
}

function StickSensibility(value) {
	if (value < 24 && value > -24)
		return 0;
	if (value > 120)
		return 1;
	if (value < -120)
		return -1;
	return value / 120;
}

function DI(stick, launchSpeed, totalLaunchSpeed) {
	if (totalLaunchSpeed < 0.00001) //There is an if on MSC but it shouldn't happen since it requires tumble for DI to work
		return Math.atan2(launchSpeed.Y, launchSpeed.X) * 180 / Math.PI;

	if (Math.abs(Math.atan2(launchSpeed.Y, launchSpeed.X)) < 0.17) //Cannot DI if launch angle is less than DI angle change param
		return Math.atan2(launchSpeed.Y, launchSpeed.X) * 180 / Math.PI;

	var X = StickSensibility(stick.X);
	var Y = StickSensibility(stick.Y);

	var check = Y * launchSpeed.X - X * launchSpeed.Y < 0;

	var variation = Math.abs(X * launchSpeed.Y - Y * launchSpeed.X) / totalLaunchSpeed;

	var di = 0.17 * variation;

	var angle = 0;

	if (check)
		angle = (Math.atan2(launchSpeed.Y, launchSpeed.X) - di) * 180 / Math.PI;
	else
		angle = (Math.atan2(launchSpeed.Y, launchSpeed.X) + di) * 180 / Math.PI;

	if (angle < 0)
		angle += 360;

	return angle;
}

function LSI(stickY, launch_angle) {
	if (launch_angle > 65 && launch_angle < 115)
		return 1;
	if (launch_angle > 245 && launch_angle < 295)
		return 1;

	var Y = StickSensibility(stickY);
	if (Y >= 0)
		return 1 + (1.095 - 1) * Y;
	return 1 - (1 - 0.92) * -Y;
}

function InsideStickGate(r, X, Y) {
	var d = Math.sqrt(Math.pow(X, 2) + Math.pow(Y, 2));
	return d <= r;
}

function GetAngle(X, Y) {
	var angle = Math.atan2(Y, X) * 180 / Math.PI;
	if (angle < 0)
		angle += 360;

	return angle;
}

function AngleToStickPosition(r, angle) {
	if (r != 0) {
		var x = Math.floor(r * Math.cos(angle * Math.PI / 180));
		var y = Math.floor(r * Math.sin(angle * Math.PI / 180));

		if (x < -127)
			x = -127;
		if (y < -127)
			y = -127;
		if (x > 128)
			x = 128;
		if (y > 128)
			y = 128;

		return { X: x, Y: y };
	} else {

		var x = Math.floor(128 * Math.cos(angle * Math.PI / 180));
		var y = Math.floor(128 * Math.sin(angle * Math.PI / 180));

		if (x < -24)
			x = -127;
		else if (x > 24)
			x = 128;
		else
			x = 0;

		if (y < -24)
			y = -127;
		else if (y > 24)
			y = 128;
		else
			y = 0;
		return { X: x, Y: y };
	}

}