import { movePlayerTo } from "@decentraland/RestrictedActions";

import { GeneratablePlatform } from "./generetablePlatform";
import { SpawnEntity } from "./obj_init";
export class Scene_init extends Entity implements ISystem
{
    canvas = new UICanvas();
    text = new UIText(this.canvas);
    tryOne = false
    nft  = new Entity()
    constructor(){
        super();
      this.text.fontSize = 100;
      this.InstantPyramid();
    }
    
    timer = 5
    update(dt: number)
    {
        if(Vector3.Distance(Camera.instance.feetPosition,new Vector3(16,0,16)) <5)
        if(this.timer>0)
        {
            this.timer -= dt
            if(this.timer > 4)
            {
                this.text.value = "5"
            }
            else if(this.timer > 3)
            {
                this.text.value = "4"
            }
            else if(this.timer > 2)
            {
                this.text.value = "3"
            }
            else if(this.timer > 1)
            {
                this.text.value = "2"
            }
            else if(this.timer > 0)
            {
                this.text.value = "1"
            }
        }
        else if(!this.tryOne)
        {
            this.nft.getComponent(GLTFShape).visible = false
            this.text.value = ""
            engine.addSystem( new GeneratablePlatform(
                [
                    new GLTFShape("models/GameElements/Chunks/cyberChunk.gltf"),
                    new GLTFShape("models/GameElements/Chunks/cyberChunk.gltf"),
                    new GLTFShape("models/GameElements/Chunks/cyberChunk.gltf"),
                ],
                [
                    new GLTFShape("models/GameElements/Chunks/spaceChunk1.gltf"),
                    new GLTFShape("models/GameElements/Chunks/spaceChunk2.gltf"),
                    new GLTFShape("models/GameElements/Chunks/spaceChunk3.gltf"),
                ]
            
            ))
            this.tryOne = true;
           
        }
  
    }
    InstantPyramid(){
        const arms = new SpawnEntity(
            new GLTFShape("models/pyramidNew/pyramidArmsNew.gltf"),
                {position: new Vector3(16,0,16) })
        const interer = new SpawnEntity(
            new GLTFShape("models/pyramidNew/pyramidInterior.gltf"),
                {position: new Vector3(16,0,16) })
        const main = new SpawnEntity(
            new GLTFShape("models/pyramidNew/pyramidMain.gltf"),
                {position: new Vector3(16,0,16) })
        const piedestal = new SpawnEntity(
            new GLTFShape("models/pyramidNew/pyramidPedestal.gltf"),
                {position: new Vector3(16,0,16) })
        this.nft = new SpawnEntity(
            new GLTFShape("models/cyberJacketTest.glb"),
            {}
        )
        this.nft.setParent(piedestal);
        this.nft.getComponent(Transform).position = new Vector3(0,1.5,3)
        this.nft.getComponent(Transform).rotation = Quaternion.Euler(0,180,0)
        this.nft.getComponent(Transform).scale = new Vector3(2,2,2)

        const sphere = new SpawnEntity(
            new GLTFShape("models/pyramidNew/pyramidSphere.gltf"),
                {position: new Vector3(16,0,16) })
        
        
    }
}
