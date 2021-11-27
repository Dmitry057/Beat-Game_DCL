export class Methods
{
    public getRandomInt(min: number, max: number):number
    {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min )) + min;
    }
    public sumVec(v1:Vector3, v2:Vector3):Vector3
    {
        return new Vector3(v1.x+v2.x,v1.y+v2.y,v1.z+v2.z)
    }
    public rasnVec(v1:Vector3, v2:Vector3):Vector3
    {
        return new Vector3(v1.x-v2.x,v1.y-v2.y,v1.z-v2.z)
    }
}
