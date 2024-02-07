export class Event {
    event_id:number;
    modelEventName:string;
    price:number;
    static price: number;
    imagepath : string
    item_id: string | undefined; 
  img: string | undefined;
  id: number;
  name: string;
  
    constructor(event_id:number, modelEventName:string, price:number , img : string,id: number, name: string,) {
        this.event_id = event_id;
        this.modelEventName = modelEventName;
        this.price = price;
        this.imagepath = img;
        this.id = id;
        this.name = name;
        
    };
}

