import { Component, OnInit } from "@angular/core";
import * as ex from "excalibur";
import { BombermanGame } from "src/app/game/bomberman-game.class";

@Component({
	selector: "app-game",
	templateUrl: "./game.component.html",
	styleUrls: ["./game.component.scss"]
})
export class GameComponent implements OnInit {

	constructor() { }

	ngOnInit() {

		const game= new BombermanGame("game", 800, 600);

		// const engine= new ex.Engine({
		// 	canvasElementId: "game",
		// 	width: 800,
		// 	height: 600
		// });

		// const paddle= this.createPaddle(engine);
		// engine.add(paddle);

		// const bricks= this.addBricks(engine);

		// const ball= this.createBall(engine, bricks);

		// engine.add(ball);

		// engine.start();
	}

	private createPaddle(engine): ex.Actor {
		// Create an actor with x position of 150px,
		// y position of 40px from the bottom of the screen,
		// width of 200px, height and a height of 20px
		const paddle= new ex.Actor(150, engine.drawHeight - 40, 200, 20);

		// Let's give it some color with one of the predefined
		// color constants
		paddle.color = ex.Color.Chartreuse;

		// Make sure the paddle can partipate in collisions, by default excalibur actors do not collide
		paddle.body.collider.type = ex.CollisionType.Fixed;

		// Add a mouse move listener
		engine.input.pointers.primary.on("move", (evt) => {
			paddle.pos.x = evt.worldPos.x;
		});

		return paddle;
	}

	private createBall(engine, bricks): ex.Actor {
		// Create a ball
		const ball = new ex.Actor(100, 300, 20, 20);

		// Set the color
		ball.color = ex.Color.Red;

		// Set the velocity in pixels per second
		ball.vel.setTo(100, 100);

		// Set the collision Type to passive
		// This means "tell me when I collide with an emitted event, but don't let excalibur do anything automatically"
		ball.body.collider.type = ex.CollisionType.Passive;
		// Other possible collision types:
		// "ex.CollisionType.PreventCollision - this means do not participate in any collision notification at all"
		// "ex.CollisionType.Active - this means participate and let excalibur resolve the positions/velocities of actors after collision"
		// "ex.CollisionType.Fixed - this means participate, but this object is unmovable"

		// Wire up to the postupdate event
		ball.on("postupdate", function() {
			// If the ball collides with the left side
			// of the screen reverse the x velocity
			if (this.pos.x < this.width / 2) {
				this.vel.x *= -1;
			}

			// If the ball collides with the right side
			// of the screen reverse the x velocity
			if (this.pos.x + this.width / 2 > engine.drawWidth) {
				this.vel.x *= -1;
			}

			// If the ball collides with the top
			// of the screen reverse the y velocity
			if (this.pos.y < this.height / 2) {
				this.vel.y *= -1;
			}
		});

		// On collision remove the brick, bounce the ball
		ball.on("precollision", function(ev) {
			if (bricks.indexOf(ev.other) > -1) {
				// kill removes an actor from the current scene
				// therefore it will no longer be drawn or updated
				ev.other.kill();
			}

			// reverse course after any collision
			// intersections are the direction body A has to move to not be clipping body B
			// `ev.intersection` is a vector `normalize()` will make the length of it 1
			// `negate()` flips the direction of the vector
			const intersection = ev.intersection.normalize();

			// The largest component of intersection is our axis to flip
			if (Math.abs(intersection.x) > Math.abs(intersection.y)) {
				ball.vel.x *= -1;
			} else {
				ball.vel.y *= -1;
			}
		});

		// Draw is passed a rendering context and a delta in milliseconds since the last frame
		ball.draw = function(ctx, delta) {
			// Optionally call original 'base' method
			// ex.Actor.prototype.draw.call(this, ctx, delta)

			// Custom draw code
			ctx.fillStyle= this.color.toString();
			ctx.beginPath();
			ctx.arc(this.pos.x, this.pos.y, 10, 0, Math.PI * 2);
			ctx.closePath();
			ctx.fill();
		};

		ball.on("exitviewport", function() {
			alert("You lose!");
		});

		return ball;
	}

	private addBricks(engine): any[] {

		// Build Bricks

		// Padding between bricks
		const padding = 20; // px
		const xoffset = 65; // x-offset
		const yoffset = 20; // y-offset
		const columns = 5;
		const rows = 3;

		const brickColor = [ex.Color.Violet, ex.Color.Orange, ex.Color.Yellow];

		// Individual brick width with padding factored in
		const brickWidth = engine.drawWidth / columns - padding - padding / columns; // px
		const brickHeight = 30; // px
		const bricks = [];
		for (let j = 0; j < rows; j++) {
			for (let i = 0; i < columns; i++) {
				bricks.push(
					new ex.Actor(
						xoffset + i * (brickWidth + padding) + padding,
						yoffset + j * (brickHeight + padding) + padding,
						brickWidth,
						brickHeight,
						brickColor[j % brickColor.length]
					)
				);
			}
		}

		bricks.forEach(function(brick) {
			// Make sure that bricks can participate in collisions
			brick.body.collider.type= ex.CollisionType.Active;

			// Add the brick to the current scene to be drawn
			engine.add(brick);
		});

		return bricks;
	}
}
