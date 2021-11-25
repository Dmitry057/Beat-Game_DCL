export function BpmMaterial(entity: Entity)
{
    const mat = new Material();
    mat.albedoColor = Color3.Blue();
    entity.addComponent(mat);
}