import { SpawnEntity } from "./obj_init";
import { Methods } from "src/staticMethods";
import { Debug } from "src/Systems/debugSystem";
import { SpawnChank } from "./oneChank";
import { SoundMemory } from "src/music_logic/soud_memory";
import { BpmMaterial } from "src/music_logic/bpm_material";
export class GeneratablePlatform extends Entity implements ISystem
{
    //Components
    ParentPlatform = new Entity();
    transfParnet = new Transform();
    methods = new Methods();

    //Settings
    moveVector = new Vector3(0,0,-1)
    playerDistance = 6
    platformPos = new Vector3(0,0,0)
    countPlatforms = 0
    canStart = false;
    //Debug
    canvas = new UICanvas()
    debug_text = new UIText(this.canvas)

    //Sounds
    bpm:number = 0.5454545
    sound = new SoundMemory(new AudioClip("sound/bangarang.mp3"),this.bpm)
    audioSource = new Entity();
    audioTransform =  new Transform();

    constructor(
        public CBPK_chanks: GLTFShape[],
    )
    { 
        super();
        this.transfParnet.position = new Vector3(0,0,0)
        this.ParentPlatform.addComponentOrReplace(this.transfParnet);
        engine.addEntity(this.ParentPlatform)
    
        this.audioSource.addComponent(this.audioTransform)
        this.sound.StartMusicTrack(this.audioSource)
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
    trackGo(dt:number){
        this.debug_text.value = this.countPlatforms + ", " +this.timer.toString();
        if (this.timer >= 0)
           {
           this.timer -= dt

           }
           else
           {
           this.countPlatforms++;
           this.instChank();
           this.timer = this.bpm;
           }
       this.moveParentPlatform()
    }
    waitForBeatStart(dt: number):void
    {
        if(this.startTime >= 0)
        {
            this.startTime-= dt
        }
        else
        {
            this.canStart = true;
        }
    }
    moveParentPlatform():void
    {
        this.platformPos = this.transfParnet.position
        this.transfParnet.position = Vector3.Lerp(this.transfParnet.position, this.methods.sumVec(this.transfParnet.position,this.moveVector),0.1);
        this.audioTransform.position = Camera.instance.worldPosition;
    }
    instChank():void
    {
        
            const chank = new SpawnChank(this.CBPK_chanks[this.methods.getRandomInt(0, this.CBPK_chanks.length)],
            {
                position: this.methods.rasnVec(new Vector3(8,12,16),this.transfParnet.position)
            },
            this.transfParnet,
            this.countPlatforms
            
            )
            
            chank.setParent(this.ParentPlatform)
            engine.addSystem(chank);
        
    }
   
}

function instantOtherObjects(){
    for(let i = 0; i <4 ; i++)
    {
        const leader = new SpawnEntity(
            new GLTFShape("models/box.glb"),
           {
                scale: new Vector3(0.5,0.5,0.5),
                position: new Vector3(i+1,i,1)
            }
        )
        
    }
    for(let i = 5; i <16 ; i++)
    {
        const leader = new SpawnEntity(
            new GLTFShape("models/box.glb"),
           {
                scale: new Vector3(0.5,0.5,0.5),
                position: new Vector3(i,3,1)
            }
        )
    }
    const wall = new SpawnEntity(
     new GLTFShape("models/box.glb"),
    {
         scale: new Vector3(8,8,0.2),
         position: new Vector3(8,8,0.2)
     })
}

    