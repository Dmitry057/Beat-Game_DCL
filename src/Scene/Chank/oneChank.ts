import { Methods } from "src/staticMethods";
import { chankPrefab } from "./chankObjects";

export class SpawnChank extends Entity implements ISystem
{
   
   methods = new Methods()
   pos = new Vector3
   change_biom = false
   constructor(model:GLTFShape, public transf: TransformConstructorArgs, public parentTranf: Transform, public id: number,public biom_lenth:number )
   {
      super();
      engine.addEntity(this);
      
      this.addComponent(model);
      this.addComponent(new Transform(transf))
      this.pos = this.methods.sumVec(this.getComponent(Transform).position, new Vector3(0,-7,0))
      this.chooseBiom(id);
   }
   update() 
   {
       if(this.transf.position?.z)
       {
         this.getComponent(Transform).position =  Vector3.Lerp(this.getComponent(Transform).position,this.pos,0.05)
          const sumPos = this.parentTranf.position.z +this.transf.position.z
          if(sumPos < 6)
          {
             engine.removeEntity(this);
             engine.removeSystem(this)
          }
      }
   }
   chooseBiom(id:number)
   {
      if(id % this.biom_lenth >= this.biom_lenth/2)
      {
         engine.addSystem(new chankPrefab( 
            [
            new GLTFShape("models/GameElements/Destructibles/cyberPunk1.gltf"),
            new GLTFShape("models/GameElements/Destructibles/cyberPunk2.gltf"),
            ],
            [
            new GLTFShape("models/GameElements/Indestructibles/cyberPunkInd.gltf"),
            new GLTFShape("models/GameElements/Indestructibles/cyberPunkInd.gltf"),
            ],
              this));
      }
      else
      {
        engine.addSystem(new chankPrefab( 
         [
         new GLTFShape("models/GameElements/Destructibles/space1.gltf"),
         new GLTFShape("models/GameElements/Destructibles/space2.gltf"),
         new GLTFShape("models/GameElements/Destructibles/space3.gltf"),
         ],
         [
         new GLTFShape("models/GameElements/Indestructibles/spaceInd.gltf"),
         new GLTFShape("models/GameElements/Indestructibles/spaceInd.gltf"),
         ],
           this));
      }
   }
}