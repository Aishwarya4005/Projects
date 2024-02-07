export class Admin {
    adminId: number;
    adminName: string;
    adminPhone: string;
    username: string;
    adminpassword: string;
userpassword: any;
  
    constructor(adminId: number, adminName: string, adminPhone: string, username: string, adminpassword: string) {
      this.adminId = adminId;
      this.adminName = adminName;
      this.adminPhone = adminPhone;
      this.username = username;
      this.adminpassword = adminpassword;
    };
  }
  