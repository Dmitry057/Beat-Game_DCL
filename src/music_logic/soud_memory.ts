enum Style
{
    Dubstep,
    Liric,
    Rep
}

export class SoundMemory extends Entity{
    constructor(
        public sound: AudioClip,
        public bpm: number
    )
    {
        super();
        
    }
    public StartMusicTrack(entity:Entity):void
    {
        const source = new AudioSource(this.sound)
        source.pitch = 1
        entity.addComponent(source);
        source.volume = 1
        source.playOnce();
        engine.addEntity(entity)
    }
}