import APE from "ape-ecs";

import CPosition from "@ecs/components/CPosition";
import CMovement from "@ecs/components/CMovement";

export default class MovementSystem extends APE.System {
  private positionQuery: APE.Query;

  init(): void {
    this.positionQuery = this.createQuery()
      .fromAll(CPosition, CMovement)
      .persist();
  }

  update(): void {
    const entities = this.positionQuery.execute();
    for (const entity of entities) {
      const pos = entity.getOne(CPosition);
      const mov = entity.getOne(CMovement);

      if (!pos || !mov) return;

      if (mov.linearMaxSpeed > mov.linearSpeed) {
        mov.linearSpeed = Math.max(
          mov.linearMaxSpeed,
          mov.linearSpeed + mov.linearAcceleration
        );
      }
      if (mov.angularMaxSpeed > mov.angularSpeed) {
        mov.angularSpeed = Math.max(
          mov.angularMaxSpeed,
          mov.angularSpeed + mov.angularAcceleration
        );
      }
      pos.angle += mov.angularSpeed;
      pos.angle %= Math.PI * 2;

      const mx = Math.cos(pos.angle) * mov.linearSpeed;
      const my = Math.sin(pos.angle) * mov.linearSpeed;
      pos.x += mx;
      pos.y += my;

      pos.update();
    }
  }
}
