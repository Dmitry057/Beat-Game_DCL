import { Methods } from "src/staticMethods";

export class SpawnChank extends Entity implements ISystem
{
   methods = new Methods()
   pos = new Vector3
   constructor(model:GLTFShape, public transf: TransformConstructorArgs, public parentTranf: Transform, public id: number )
   {
      super();
      engine.addEntity(this);
      
      this.addComponent(model);
      this.addComponent(new Transform(transf))
      this.pos = this.methods.sumVec(this.getComponent(Transform).position, new Vector3(0,-10,0))
     
   }
   update() 
   {
       if(this.transf.position?.z)
       {
         this.getComponent(Transform).position =  Vector3.Lerp(this.getComponent(Transform).position,this.pos,0.05)
          const sumPos = this.parentTranf.position.z +this.transf.position.z
          if(sumPos < 2)
          {
             engine.removeEntity(this);
             engine.removeSystem(this)
          }
      }
    }
}