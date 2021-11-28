import { spawn } from "@decentraland/PortableExperiences";
import { GeneratablePlatform } from "src/Scene/generetablePlatform";

export class BpmMaterial extends Entity implements ISystem
{
   
    public material = new Material()
    public testplane1 = new Entity();
    public testplane2 = new Entity();
    down = true;
    firstColor = new Color3(0,0.4,4);
    secondColor = new Color3(0,0.4,1)
    colorRatio = 0;

    constructor(public bpm: number)
    {
    super();
    
    this.spawnLines(new Vector3(16,2,16))
   }
    halfBpm  = this.bpm/2
    timer = this.halfBpm;

    spawnLines(pos: Vector3)
    {
        const entity = new Entity()
        const transf = new Transform()
        transf.position = pos
        transf.rotation = Quaternion.Euler(-90,0,0);
        transf.scale = new Vector3(20,20,20)
        this.material.albedoColor = Color3.White();
        entity.addComponent(this.material)
        entity.addComponent(new PlaneShape)
        entity.addComponent(transf)
        engine.addEntity(entity)
    }
    update(dt: number)
    {
        if(this.timer > 0)
        {
          
            this.timer -= dt;
        }
        else
        {   
            this.down = !this.down
            this.timer = this.halfBpm
        }

        if(this.down)
        {
            this.material.albedoColor = Color3.Lerp(this.firstColor,this.secondColor, this.timer/this.halfBpm)
            
        }
        else
        {
            this.material.albedoColor = Color3.Lerp(this.secondColor,this.firstColor, this.timer/this.halfBpm)
        }
    }

}