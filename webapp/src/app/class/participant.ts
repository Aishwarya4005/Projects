export class participant {
[x: string]: any;
    username: string ;
    name: string;
    contactno: string;
    password: string;
    participantId:number;
    email : string;
    constructor(participantId:number, name:string, contactno:string, username:string, password:string , email : string) {
            this.participantId = participantId;
            this.name = name;
            this.contactno = contactno;
            this.username = username;
            this.password = password;
            this.email= email;
    };
  
}

