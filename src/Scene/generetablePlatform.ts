import { SpawnEntity } from "./obj_init";
import { Methods } from "src/staticMethods";
import { Debug } from "src/Systems/debugSystem";
import { SpawnChank } from "./Chank/oneChank";
import { SoundMemory } from "src/music_logic/soud_memory";
import { BpmMaterial } from "src/music_logic/bpm_material";
import { movePlayerTo } from "@decentraland/RestrictedActions";
import { chankPrefab } from "./Chank/chankObjects";
export class GeneratablePlatform extends Entity implements ISystem
{
    //Components
    public bpm:number = 0.5454545
    ParentPlatform = new Entity();
    transfParnet = new Transform();
    methods = new Methods();
    bpmMat = new BpmMaterial(this.bpm);

    //Settings
    moveVector = new Vector3(0,0,-1)
    playerDistance = 6
    platformPos = new Vector3(0,0,0)
    countPlatforms = 0
    canStart = false;
    public biom_lenth = 76
    isDestroyed = false;
    //Debug
    canvas = new UICanvas()
   // debug_text = new UIText(this.canvas)

    //Sounds
    sound = new SoundMemory(new AudioClip("sound/bangarang.mp3"),this.bpm)
    audioSource = new Entity();
    audioTransform =  new Transform();

    constructor(
        public CBPK_chanks: GLTFShape[],
        public Space_chanks: GLTFShape[]
    )
    { 
        super();
        engine.addSystem(this.bpmMat);
        this.transfParnet.position = new Vector3(0,0,0)
        this.ParentPlatform.addComponentOrReplace(this.transfParnet);
        engine.addEntity(this.ParentPlatform)
    
        this.audioSource.addComponent(this.audioTransform)
        this.sound.StartMusicTrack(this.audioSource)
        
        //other objects init
        instantOtherObjects();
        
    }
    timer = this.bpm;
    startTime = 0.418;
    update(dt:number)
    {
        if(this.canStart)
        {
           this.trackGo(dt)
        }
        else
        {
            this.waitForBeatStart(dt)
        }
    }

    testCube():void{
        const testbox = new Entity()
        const testTransf = new Transform()
        testTransf.position = new Vector3(8,5,8)
        testbox.addComponent(new GLTFShape("models/test_objects/CubeEmissiveChamferTexture.gltf"))
        testbox.addComponent(testTransf)
        const material = new Material()
        material.albedoColor = Color3.Black();
        material.emissiveColor = Color3.Black();
        material.environmentIntensity = 0;
        testbox.addComponent(material);
        engine.addEntity(testbox)
    }
    audioTime = 15
    trackGo(dt:number){
        
        if (this.timer >= 0)
           {
           this.timer -= dt
           }
           else 
           {
            this.audioTime-= dt
           this.countPlatforms++;
           this.instChank();
           this.timer = this.bpm;
           
           }
        //    else if(!this.isDestroyed)
        //    {
        //     this.destroyChancks();
        //     this.isDestroyed = true;
        //    }
        this.moveParentPlatform()
    }
    
    waitForBeatStart(dt: number):void
    {
        if(this.startTime >= 0)
        {
            this.startTime-= dt}
       else
            this.canStart = true;
       
    }

    moveParentPlatform():void
    {
        this.platformPos = this.transfParnet.position
        this.transfParnet.position = Vector3.Lerp(this.transfParnet.position, this.methods.sumVec(this.transfParnet.position,this.moveVector),0.1);
        this.audioTransform.position = Camera.instance.worldPosition;
    }

    instChank():void
    {
        const chank = new SpawnChank(this.changeModel(),
        {
            position: this.methods.rasnVec(new Vector3(16,8,24),this.transfParnet.position)
        },
        this.transfParnet,
        this.countPlatforms,
        this.biom_lenth
        )
        chank.getComponent(GLTFShape).withCollisions = false;
        chank.setParent(this.ParentPlatform)
        engine.addSystem(chank);
        
    }
    changeModel():GLTFShape
    {
        if ( this.countPlatforms % this.biom_lenth >= this.biom_lenth/2)
        {
            return this.CBPK_chanks[this.methods.getRandomInt(0, this.CBPK_chanks.length)]
        }
        else
        {
            return this.Space_chanks[this.methods.getRandomInt(0, this.Space_chanks.length)]
        }
    }
    
}

function instantOtherObjects(){
    
     const collider = new SpawnEntity(
        new GLTFShape("models/test_objects/roomFixCol.gltf"),
       {
            position: new Vector3(16,2.2,10)
        })
    collider.getComponent(GLTFShape).visible = true;
    engine.addEntity(collider)
     movePlayerTo(new Vector3(collider.getComponent(Transform).position.x,collider.getComponent(Transform).position.y+2,collider.getComponent(Transform).position.z))
}

    