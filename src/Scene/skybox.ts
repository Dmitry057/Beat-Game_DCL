
export function SkyboxMaterial(entity: Entity) 
{
    const mat = new Material()
    mat.albedoColor = Color3.Black()
    mat.castShadows = false;
    entity.addComponent(mat);
}