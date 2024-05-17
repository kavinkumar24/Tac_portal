const express = require("express");
const cors = require('cors');
const app = express();
const multer = require('multer')
const collection = require("./mongo");
const tacdetails = require("./tac_details");
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());


const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './src/PDF'); 
  },
  filename: function(req, file, cb) {
    // Use the original filename with a timestamp to avoid conflicts
    const filename = `${file.originalname}`;
    cb(null, filename);
  }
});

const upload = multer({storage})

app.post("/", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await collection.findOne({ email, password });

    if (user) {
      const { rollno } = user;

      const existingTacEntry = await tacdetails.findOne({ roll_no: rollno });

      if (!existingTacEntry) {
        // If no Tac entry exists, create a new one
        const newTacEntry = new tacdetails({
          roll_no: rollno,
          Details: [], 
        });

        await newTacEntry.save();
      }

      // Send a response with the user's details
      res.json({ success: true, user: { name: user.name, rollno: user.rollno, email: user.email, password: user.password } });
    } else {
      // If the user is not found, send a failure response
      res.json({ success: false });
    }
  } catch (error) {
    console.error("Error finding user:", error);
    res.status(500).send({ success: false, message: "Internal server error" });
  }
});


app.get("/", cors(), async (req, res) => {
  try {
    const allUser = await collection.find({}).exec();
    res.send({ status: "ok", data: allUser });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: "Internal server error" });
  }
});

app.get("/add_form", cors(), async (req, res) => {
  try {
    const allFormEntries = await tacdetails.find({}).exec();
    res.send({ status: "ok", data: allFormEntries });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: "Internal server error" });
  }
});


app.post("/add_pdf", upload.single('file'), (req, res) => {
  if (req.file) {
  console.log("path...............................",req.body.pdfPath)
    console.log("File uploaded successfully:", req.file);
    res.json({ success: true, message: "PDF uploaded", filename: req.file.filename });
  } else {
    console.error("Error uploading file");
    res.status(500).json({ success: false, message: "Upload failed" });
  }
});


// app.post("/add_pdf",upload.single('file'),(req ,res)=>{
//   console.log(req.body);
//   console.log("file.......",req.file);
//   console.log(res)
// })
app.post("/register", async (req, res) => {
  const { name, rollno, email, password } = req.body;

  try {
    const existingUser = await collection.findOne({ $or: [{ email }, { rollno }] });
    if (existingUser) {
      // If a user with the same email or roll number exists, return an error response
      return res.status(400).json({ success: false, message: "User already exists with the same email or roll number" });
    }
    const newUser = new collection({
      name,
      rollno,
      email,
      password,
    });

    await newUser.save();
    res.json({ success: true, user: { name, rollno, email, password } });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});
app.post("/add_form", async (req, res) => {
  const { email, category, title, numberOfStudents,pdfPath } = req.body;

  try {
    // Find the user based on the email

    const user = await collection.findOne({ email });

    if (user) {
      const { rollno } = user;

      const newFormEntry = {
        category,
        title,
        numberOfStudents,
        additionalStudents: req.body.additionalStudents,
        pdfPath,
      };

      
      const updatedTacDetails = await tacdetails.findOneAndUpdate(
        { roll_no: rollno },
        { $push: { Details: newFormEntry } },
        { new: true }
      );

      if (updatedTacDetails) {
        res.json({ success: true, user: updatedTacDetails });
      } else {
        res.json({ success: false, message: "Failed to update details" });
      }
    } else {
      res.json({ success: false, message: "User not found" });
    }
  } catch (error) {
    console.error("Error adding form:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});


app.post('/update_status', async (req, res) => {
  const { detailId, newStatus } = req.body;

  try {
      // Find the document that contains the detail and update the status
      const updatedDetail = await tacdetails.findOneAndUpdate(
          { 'Details._id': detailId },
          { $set: { 'Details.$.status': newStatus } },
          { new: true }
      );

      if (updatedDetail) {
          res.json({ success: true, updatedDetail });
      } else {
          res.status(404).json({ success: false, message: 'Detail not found' });
      }
  } catch (error) {
      console.error('Error updating status:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
  }
});



// Start server
app.listen(8001, () => {
  console.log("Server is running on port 8001");
});