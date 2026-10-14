// the users
export let db : any = {users:[], notes:[]}

export function RegisterUser(user:any) {
    const foundUser : any = db.users.filter( (val:any) => val.email === user.email && val.pwd === user.pwd)
    if(foundUser){
        return {status:400, err:`user exists`}
    }else{
        // save to store the user
        db.users.push(user)

        // and reroute 
        return {status:400, err:``}
    }
}

export function DeleteUser(user:any) {
    const result : any = db.users.filter( (val:any) => val.id != user.id) || []
    db.users = result
}

export function LoginUser(user:any) {
    const foundUser : any = db.users.filter( (val:any) => val.email === user.email && val.pwd === user.pwd)
    if(foundUser){
        // save to store the user
        // and reroute 
        return {status:200, err:``}
    }else{
        return {status:400, err:`user not found`}
    }
}

export function getGroups(user:any) {
    const foundUser : any = db.users.filter( (val:any) => val.email === user.email && val.pwd === user.pwd)
    if(foundUser){
        // save to store the user
        // and reroute 
        return {status:200, err:``}
    }else{
        return {status:400, err:`user not found`}
    }
}

// the notes
export let notes : any = []

export function AddNote(user:any) {
    db.push(user)
}

export function DeleteNote(user:any) {
    const result : any = db.filter( (val:any) => val.id != user.id) || []
    db = result
}

export function EditNote(user:any) {
    const result : any = db.filter( (val:any) => val.id != user.id) || []
    db = result
}