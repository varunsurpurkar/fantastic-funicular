export class Feeds{
    constructor(
        public feedId : number,
        public feedBy : string,
        public feedTime : Date,
        public feeTitle : string,
        public feedContent : string,
        public media : string,
        public isImage : string,
        public isVideo : string ){
            
        }

}