// make Express Request to include custom fields 

declare namespace Express{
    export interface Request{
        userld? : string
        name? : string
        email? : string
        role? : string
    
    } 
}

// now include file name in typeRoot of tsconfig