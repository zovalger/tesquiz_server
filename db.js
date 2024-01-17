import mongoose from 'mongoose'


export const ConnectDB = async () =>{
    try{
        await mongoose.connect("mongodb+srv://Cluster0:bGUmFz2JiHmW3EXt@cluster0.yr9edop.mongodb.net/Prueba?retryWrites=true&w=majority")
        console.log("DB is Connect");
    }catch(e){
        console.log(e);
    }
}