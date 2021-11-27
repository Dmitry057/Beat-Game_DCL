export class Debug extends Entity 
{
    
    canvas = new UICanvas()
    public debug_text = new UIText(this.canvas)
    constructor(text: string){
        super();
        this.init()
        this.debug_text.value = text;
    }
    public init():void{
        this.debug_text.positionX= -450;
        this.debug_text.positionY= 350;
    }
    
}