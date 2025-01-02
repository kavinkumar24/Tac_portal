const mongoose=require("mongoose");

// const dbName = "Tac_student_details"; 

// const username = "Admin";
// const password = "root";


const uri = "mongodb+srv://Admin:root@cluster0.kr2jo.mongodb.net/Tac_student_details?retryWrites=true&w=majority";





mongoose.connect(uri, {}).then(() => {
  console.log("Connected to MongoDB Atlas!");
}).catch((error) => {
  console.error("Error connecting to MongoDB Atlas:", error);
});

// const members={
//   name:{
//     type:String,
//     required:true
//   },
//   rollNo:{
//     type:String,
//     required:true
//   },
//   skillSet:{
//     type:String,
//     required:true
//   }

// }

// const student_data = {
//   category:{
//     type:String,
//     required:true
//   },
//   title:{
//     type:String,
//     required:true
//   },
//   numberOfStudents:{
//     type:String,
//     // required:true
//   },

//   additionalStudents:{
//     type:[members],
//     // required:true
//   },
//   pdfPath: {
//     type: String,
//     // default:'default.pdf'

//   },
//   status:{
//     type:String,
//     default:'Initiated'
//   },
//   createdAt:{
//     type:Date,
//     default:Date.now
//   },
 
//   }

const newSchema = {
    name: {
      type: String,
      required: true
    },
    rollno: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    password: {
      type:String,
      required:true
    },
    // Details: {
    //   type:[student_data],
    //   required:true
    // },
  
  };
  
const collection = mongoose.model("posts",newSchema)
module.exports=collection


