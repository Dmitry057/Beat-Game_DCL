import { GeneratablePlatform } from "./generetablePlatform";
import { SpawnEntity } from "./obj_init";
export function Scene_init()
{
   engine.addSystem( new GeneratablePlatform(
    [
        new GLTFShape("models/Chanks/chank1.glb"),
        new GLTFShape("models/Chanks/chank2.glb"), 
        new GLTFShape("models/Chanks/chank3.glb"),
    ]
   ))
//    const testbox = new SpawnEntity(
//        new GLTFShape("models/test_objects/CubeEmissiveChamferTexture.gltf"),
//        {
//            position: new Vector3(8,1,8)
//        })
//     testbox.getComponent(Material).emissiveColor = new Color3(15,15,15);
}