declare type ComponentType =
  | 'CMovement'
  | 'CPosition'
  | 'CMesh'
  | 'CSimulation';

declare type Component<T> = T & {
  type: ComponentType;
};
