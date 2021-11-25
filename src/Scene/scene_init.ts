import { SpawnEntity } from "./obj_init";
import { SkyboxMaterial } from "./skybox";
import { BpmMaterial } from "../music_logic/bpm_material";
export function Scene_init()
{
    const testBox = new SpawnEntity(
        new GLTFShape("models/box.glb"),
        {
    position: new Vector3(8,1,8)
    });
    const mat = new Material();
    mat.albedoColor = Color3.Blue();
    testBox.addComponent(mat);

}