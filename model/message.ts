export class MyError extends Error {
    constructor(
        name: string,
        message: string,
        public status: number
    ) {
        super();
        this.name = name;
        this.message = message;
    }
}

export class resInfo {
    constructor(msg: string, status: number, properties?: any) { }
}

// interface info {
//     msg: string;
//     status: number;
//     res?: any;
// }
// export class resInfo {
//     msg: string;
//     status: number;
//     res?: any;
//     constructor(data: info) {
//         this.msg = data.msg;
//         this.status = data.status;
//         this.res = data.res;
//     }
// }
