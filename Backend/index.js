const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
require('dotenv').config();
const stripe = require("stripe")(process.env.PAYMENT_SECRET);
const jwt = require('jsonwebtoken');
const cors = require('cors');
const { MongoClient, ServerApiVersion ,ObjectId, Transaction} = require('mongodb');

// MongoDB connection URI
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@yoga-guru.h3g2gn0.mongodb.net/?retryWrites=true&w=majority&appName=Yoga-Guru`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

// Middleware
app.use(cors());
app.use(express.json());

// verify token
const verifyJWT = (req,res,next)=>{
  const authorization = req.headers.authorization;
  if(!authorization){
    return res.status(401).send({message: 'Invalid authorization'})
  }

  const token = authorization?.split(' ')[1];
  jwt.verify(token, process.env.ACCESS_SECRET, (err,decoded)=>{
    if(err){
      return res.status(403).send({message: 'Forbidden access'})
    }
    req.decoded = decoded;
    next();
  })
}


const database = client.db("yoga-guru");
const classesCollection = database.collection("classes");
const usersCollection = database.collection("users");
const cartCollection = database.collection("cart");
const paymentCollection = database.collection("payments");
const enrolledCollection = database.collection("enrolled");
const appliedCollection = database.collection("applied");


// routes for users

app.post('/api/set-token', async(req,res)=>{
  const user = req.body;
  const token = jwt.sign(user,process.env.ACCESS_SECRET,{
    expiresIn: '24h'
  });
  res.send({token});
});

// middleware for admin and instructor
const verifyAdmin = async(req,res,next)=>{
  const email = req.decoded.email;
  const query = {email:email};
  const user = await usersCollection.findOne(query);
  if(user.role==='admin'){
    next();
  }
  else{
    return res.status(401).send({message: 'Forbidden access'});
  }
}

const verifyInstructor = async(req,res,next)=>{
  const email = req.decoded.email;
  const query = {email:email};
  const user = await usersCollection.findOne(query);
  if(user.role==='instructor'){
    next();
  }
  else{
    return res.status(401).send({message: 'Unauthorized access'})
  }
};

app.post('/new-user', async(req,res)=>{
  const newUser = req.body;
  const result = await usersCollection.insertOne(newUser);
  res.send(result);
});

app.get('/users', async(req,res)=>{
  const result = await usersCollection.find({}).toArray();
  res.send(result);
});

app.get('/users/:id', async(req,res)=>{
  const id = req.params.id;
  const query = {_id: new ObjectId(id)};
  const result = await usersCollection.findOne(query);
  res.send(result);
});

app.get('/users/email/:email', verifyJWT, async (req, res) => {
  try {
    const email = req.params.email;
    const result = await usersCollection.findOne({ email: email });
    res.send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});


app.delete('/delete-user/:id',verifyJWT,verifyAdmin, async(req,res)=>{
  const id = req.params.id;
  const query = {_id: new ObjectId(id)};
  const result = await usersCollection.deleteOne(query);
  res.send(result);
});

app.put('/update-user/:id', verifyJWT, verifyAdmin, async(req,res)=>{
  const id = req.params.id;
  const updatedUser = req.body;
  const filter = {_id: new ObjectId(id)};
  const options = {upsert: true};
  const updateDoc = {
    $set: {
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
      address: updatedUser.address,
      about: updatedUser.aboutUser,
      photoUrl: updatedUser.photoUrl,
      skills: updatedUser.skills? updatedUser.skills : null,
    }
  }

  const result = await usersCollection.updateOne(filter,updateDoc,options);
  res.send(result);
});

// Define routes
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/new-class', verifyJWT, verifyInstructor, async (req, res) => {
  try {
    const newClass = req.body;
    const result = await classesCollection.insertOne(newClass);
    res.send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/classes',async(req,res) =>{
  // const query = {status: "approved"};
  // const query = {price: "50"};
  const result = await classesCollection.find({status: "approved"}).toArray();
  res.send(result);
});

// classes of particular instructor
app.get('/classes/:email',verifyJWT, verifyInstructor, async(req,res)=>{
  const email = req.params.email;
  const query = {instructorEmail: email};
  const result = await classesCollection.find(query).toArray();
  res.send(result);
});

// manage classes
app.get('/classes-manage',async(req,res)=>{
  const result = await classesCollection.find().toArray();
  res.send(result);
})

// update classes
app.patch('/change-status/:id',verifyJWT,verifyAdmin,async(req,res)=>{
  const id = req.params.id;
  const status = req.body.status;
  const reason = req.body.reason;
  const filter = {_id: new ObjectId(id)};
  const options = {upsert: true};
  const updateDoc = {
    $set: {
      status: status,
      reason: reason,
    },
  };
  const result  = await classesCollection.updateOne(filter,updateDoc,options);
  res.send(result);
});

//get approved classes
app.get("/approved-classes", async(req,res)=>{
  const query = {status: 'approved'};
  const result = await classesCollection.find(query).toArray();
  res.send(result);
})

// get single class details
app.get('/class/:id', async(req,res)=>{
  const id = req.params.id;
  const query = {_id: new ObjectId(id)};
  const result = await classesCollection.findOne(query);
  res.send(result);
});

// update class details(all data)
app.put('/update-class/:id',verifyJWT,verifyInstructor, async(req,res)=>{
  const id = req.params.id;
  const updateClass = req.body;
  const filter = {_id: new ObjectId(id)};
  const options = {upsert: true};
  const updateDoc = {
    $set: {
      name: updateClass.name,
      description: updateClass.description,
      price: updateClass.price,
      availableSeats: parseInt(updateClass.availableSeats),
      videoLink: updateClass.videoLink,
      status: 'pending',
    }
  };
  const result = await classesCollection.updateOne(filter,updateDoc,options);
  res.send(result);
});

// cart routes---
app.post("/add-to-cart",verifyJWT, async(req,res)=>{
  const newCartItem = req.body;
  const result = await cartCollection.insertOne(newCartItem);
  res.send(result); 
});

// get cart item by id
app.get('/cart-item/:id',verifyJWT,  async(req,res)=>{
  const id = req.param.id;
  const email = req.body.email;
  const query = {
    classId: id,
    userMail: email
  };
  const projection = {classId: 1};
  const result = await cartCollection.findOne(query,{projection: projection});
  res.send(result);
});

//cart info by user email
app.get('/cart/:email', verifyJWT, async (req, res) => {
  try {
    const email = req.params.email;
    const query = { email }; // Ensure the field name matches your MongoDB document
    const projection = { classId: 1 };

    // Fetch the cart items and convert cursor to array
    const carts = await cartCollection.find(query, { projection }).toArray();

    // Map classIds from the carts
    const classIds = carts.map(cart => new ObjectId(cart.classId));

    // Ensure classIds is an array
    if (!Array.isArray(classIds) || classIds.length === 0) {
      return res.status(404).send({ message: 'No classes found for the user.' });
    }

    // MongoDB query to fetch classes
    const query2 = { _id: { $in: classIds } };
    const result = await classesCollection.find(query2).toArray();

    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Internal Server Error' });
  }
});


// delete cart item
app.delete('/delete-cart-item/:id',verifyJWT,async(req,res)=>{
  const id = req.params.id;
  const query = {classId: id};
  const result = await cartCollection.deleteOne(query);
  res.send(result);
});

// payment routes
app.post('/create-payment-intent', async(req,res)=>{
  const {price} = req.body;
  const amount = parseInt(price)*100;
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount, 
    currency: "inr",
    payment_method_types:["card"]
  });
  res.send({
    clientSecret: paymentIntent.client_secret,
  })
})

// post payment info to db
app.post('/payment-info', verifyJWT, async (req, res) => {
  const paymentInfo = req.body;
  const classesId = paymentInfo.classesId;
  const email = paymentInfo.email;
  const singleClassId = req.query.classId;

  let query;
  if (singleClassId) {
    query = { classId: singleClassId, email: email };
  } else {
    query = { classId: { $in: classesId } };
  }

  const classQuery = { _id: { $in: classesId.map(id => new ObjectId(id)) } };
  const classes = await classesCollection.find(classQuery).toArray();

  // Ensure singleClassId is an array
  const singleClassIdArray = Array.isArray(singleClassId) ? singleClassId : [singleClassId];

  const newEnrolledData = {
    email: email,
    classId: singleClassIdArray.map(id => new ObjectId(id)), // Ensure it's an array
    transactionId: paymentInfo.transactionId
  };

  const updatedDoc = {
    $set: {
      totalEnrolled: classes.reduce((total, current) => total + current.totalEnrolled, 0) + 1 || 0,
      availableSeats: classes.reduce((total, current) => total + current.availableSeats, 0) - 1 || 0
    }
  };

  const updatedResult = await classesCollection.updateMany(classQuery, updatedDoc, { upsert: true });
  const enrolledResult = await enrolledCollection.insertOne(newEnrolledData);
  const deletedResult = await cartCollection.deleteMany(query);
  const paymentResult = await paymentCollection.insertOne(paymentInfo);

  res.send({ paymentResult, deletedResult, enrolledResult, updatedResult });
});


// get payment history
app.get('/payment-history/:email', async(req,res)=>{
  const email = req.params.email;
  const query = {email: email};
  const result = await paymentCollection.find(query).sort({date:-1}).toArray();
  res.send(result);
});

// get payment history length
app.get('/payment-history-length/:email', async(req,res)=>{
  const email = req.params.email;
  const query = {userEmail: email};
  const total = await paymentCollection.countDocuments(query);
  res.send({total});
});

// Enrollment routes
app.get('/popular-classes', async(req,res)=>{
  const result = await classesCollection.find().sort({totalEnrolled:-1}).limit(6).toArray();
  res.send(result);
});

app.get('/popular-instructors', async(req,res) =>{
  const pipeline = [
    {
      $group: {
        _id: "$instructorEmail",
        totalEnrolled: {$sum: "$totalEnrolled"}
      }
    },
    {
      $lookup: {
        from: "users",
        localField: "_id",
        foreignField: "email",
        as: "instructor"
      }
    },
    {
      $match: {
        "instructor.role":"instructor",
      }
    },
    {
      $project: {
        _id: 0,
        instructor:{
          $arrayElemAt: ["$instructor",0]
        },
        totalEnrolled: 1
      }
    },
    {
      $sort:{
        totalEnrolled: -1
      }
    },
    {
      $limit: 6
    }
  ];

  const result = await classesCollection.aggregate(pipeline).toArray();
  res.send(result);
})

// admin stats
app.get('/admin-stats', verifyJWT, verifyAdmin, async (req, res) => {
  try {
      const approvedClasses = await classesCollection.find({ status: "approved" }).toArray();
      const pendingClasses = await classesCollection.find({ status: 'pending' }).toArray();
      const instructors = await usersCollection.find({ role: 'instructor' }).toArray();
      const totalClasses = await classesCollection.find().toArray();
      const totalEnrolled = await enrolledCollection.find().toArray();

      const result = {
          approvedClasses: approvedClasses.length,
          pendingClasses: pendingClasses.length,
          instructors: instructors.length,
          totalClasses: totalClasses.length,
          totalEnrolled: totalEnrolled.length
      };

      res.json(result);
  } catch (err) {
      console.error("Error fetching admin stats:", err);
      res.status(500).json({ error: "Internal server error" });
  }
});


app.get('/instructors', async(req,res)=>{
  const result = await usersCollection.find({role: 'instructor'}).toArray();
  res.send(result);
});

app.get('/enrolled-classes/:email', verifyJWT, async (req, res) => {
  const email = req.params.email;
  const query = { email: email };
  const pipeline = [
    {
      $match: query
    },
    {
      $lookup: {
        from: "classes",
        localField: "classId",
        foreignField: "_id",
        as: "classes"
      }
    },
    {
      $unwind: "$classes"
    },
    {
      $lookup: {
        from: "users",
        localField: "classes.instructorEmail",
        foreignField: "email",
        as: "instructor"
      }
    },
    {
      $project: {
        _id: 0,
        instructor: {
          $arrayElemAt: ["$instructor", 0]
        },
        classes: 1
      }
    }
  ];

  const result = await enrolledCollection.aggregate(pipeline).toArray();
  res.send(result);
});


//applied for instructor
app.post('/applied-instructor',async(req,res)=>{
  const data = req.body;
  const result = await appliedCollection.insertOne(data);
  res.send(result);
});

app.get('/applied-instructor/:email', async(req,res)=>{
  const email = req.params.email;
  const result = await appliedCollection.findOne({email});
  res.send(result);
});

// Connect to MongoDB and start the Express server
async function startServer() {
  try {
    await client.connect();
    console.log("Connected to MongoDB successfully");

    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  } catch (err) {
    console.error(err);
    process.exit(1); // Exit the process if MongoDB connection fails
  }
}

// Start the application
startServer();
