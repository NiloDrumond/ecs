import APE from 'ape-ecs';

import CPosition from '@ecs/components/CPosition';
import CMovement from '@ecs/components/CMovement';
import { IMovement, IPosition } from '../interfaces/components';

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
      let newLinearSpeed = mov.linearSpeed;
      let newAngularSpeed = mov.angularSpeed;

      if (mov.linearMaxSpeed > mov.linearSpeed) {
        newLinearSpeed = Math.max(
          mov.linearMaxSpeed,
          mov.linearSpeed + mov.linearAcceleration,
        );
      }
      if (mov.angularMaxSpeed > mov.angularSpeed) {
        newAngularSpeed = Math.max(
          mov.angularMaxSpeed,
          mov.angularSpeed + mov.angularAcceleration,
        );
      }
      if (
        newLinearSpeed !== mov.linearSpeed ||
        newAngularSpeed !== mov.angularSpeed
      ) {
        const movementUpdate: Partial<IMovement> = {
          angularSpeed: newAngularSpeed,
          linearSpeed: newLinearSpeed,
        };
        mov.update(movementUpdate);
      }
      let newAngle = pos.angle + mov.angularSpeed;
      newAngle %= Math.PI * 2;
      const mx = Math.cos(pos.angle) * mov.linearSpeed;
      const my = Math.sin(pos.angle) * mov.linearSpeed;
      const newX = pos.x + mx;
      const newY = pos.y + my;
      const positionUpdate: Partial<IPosition> = {
        angle: newAngle,
        x: newX,
        y: newY,
      };
      pos.update(positionUpdate);
    }
  }
}
