const mongoose=require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/Tac_student_details",{
    useNewUrlParser: true,
})
.then(()=>{
    console.log("connected")
})
.catch(()=>{
    console.log('failed')
})


const members={
    name:{
      type:String,
      required:true
    },
    rollNo:{
      type:String,
      required:true
    },
    skillSet:{
      type:String,
      required:true
    }
  
  }
  
const student_data = {
    category:{
      type:String,
      required:true
    },
    title:{
      type:String,
      required:true
    },
    numberOfStudents:{
      type:String,
      // required:true
    },
  
    additionalStudents:{
      type:[members],
      // required:true
    },
    pdfPath: {
      type: String,
      // default:'default.pdf'
  
    },
    status:{
      type:String,
      default:'Initiated'
    },
    rejectionReason: { type: String, default: '' },
    createdAt:{
      type:Date,
      default:Date.now
    },
   
    }
  

    
    const tacSchema = {
        roll_no:{
            type:String,
            required:true
        },
        Details: {
          type:[student_data],
          required:true
        },
      
      };
      
        
const collection = mongoose.model("tacdetails",tacSchema)
module.exports=collection
