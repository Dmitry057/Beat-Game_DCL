export class SpawnEntity extends Entity {

    constructor(model: GLTFShape, 
        transform: TranformConstructorArgs) {
      super();
      engine.addEntity(this);
      this.addComponent(model);
      this.addComponent(new Transform(transform))
    }
  }