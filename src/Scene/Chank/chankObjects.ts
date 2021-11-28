import { Methods } from "src/staticMethods";
import * as utils from "@dcl/ecs-scene-utils"
import { setScore } from "src/Systems/score";
export class chankPrefab extends Entity implements ISystem
{   
    entity = new Entity();
    transform = new Transform()
    method = new Methods()
    mustCheckOnTrigger = false
    constructor(
        enemyModels: GLTFShape[],
        boxModels:GLTFShape[],
        parentObj: Entity
    )
    {
        super();
        this.entity.setParent(parentObj);
        this.entity.addComponentOrReplace(this.transform);
        if(Math.random() > 0.4)
        {
           this.EnemiesLogic(enemyModels[this.method.getRandomInt(0,enemyModels.length)])
        }else{
            this.BoxLogic(boxModels[this.method.getRandomInt(0,boxModels.length)])
        }
        
    }
    SetTrabsformForEnemies()
    {
        this.transform.rotation = Quaternion.Euler(0,180,0)
        this.transform.position = new Vector3(this.method.getRandomInt(-4,4),Math.random() + 2,0)
    }
    SetTrabsformForBox()
    {
        this.transform.position = new Vector3(this.method.getRandomInt(-5,5),this.transform.scale.y,0.01)
    }

    EnemiesLogic(model:GLTFShape)
    {
        this.entity.addComponent(model);
        this.SetTrabsformForEnemies()
        this.entity.addComponent(
            new OnClick(() => {
                engine.removeEntity(this.entity);
                setScore(2);
            }))
    }
    BoxLogic(model:GLTFShape){
        this.entity.addComponent(model).withCollisions = false;
        this.entity.getComponent(GLTFShape).withCollisions = false;
        this.SetTrabsformForBox()
        //this.mustCheckOnTrigger = true;
    }
    BoxOnTriggerEnter()
    {
        setScore(-2);
    }
    update()
    {
        if(this.mustCheckOnTrigger)
        {
           if(Vector3.Distance(this.transform.position, new Vector3(Camera.instance.feetPosition.x, this.transform.position.y, Camera.instance.feetPosition.z )) <2)
           {
                this.BoxOnTriggerEnter();
                this.mustCheckOnTrigger = false;
           }
        }
    }
}