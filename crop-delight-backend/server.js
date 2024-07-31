  const express = require('express');
  const bodyParser = require('body-parser');
  const { MongoClient, ServerApiVersion } = require('mongodb');
  const { v4: uuidv4 } = require('uuid');
  const multer = require('multer');
  const cors = require('cors');
  const path = require('path');
  const app = express();
  const PORT = 3000;

  const session = require('express-session');
  const MongoStore = require('connect-mongo');

  const { ObjectId } = require('mongodb');


// Middleware to parse JSON bodies
app.use(express.json());

// Session setup
app.use(session({
  secret: 'your-secret-key', // Replace with a secure random string
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: 'mongodb+srv://kishoreo:kishore@cropdelight.tcgopoi.mongodb.net/CropDelight?retryWrites=true&w=majority' // Use your MongoDB URL
  }),
  cookie: { secure: false } // Set to true if using HTTPS
}));


  // Multer setup for file uploads
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
      cb(null, uuidv4() + '-' + file.originalname);
    }
  });
  const upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
      if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return cb(new Error('Only image files are allowed!'), false);
      }
      cb(null, true);
    }
  });

  app.use(cors());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

  const uri = "mongodb+srv://kishoreo:kishore@cropdelight.tcgopoi.mongodb.net/CropDelight?retryWrites=true&w=majority";
  let client;

  // Connect to MongoDB
  async function connectToMongoDB() {
    client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      }
    });

    try {
      await client.connect();
      console.log("Connected to MongoDB");
    } catch (error) {
      console.error("Error connecting to MongoDB", error);
      process.exit(1);
    }
  }

  connectToMongoDB();

  // Function to write to the database
  async function writeToDb(collectionName, data) {
    try {
      const database = client.db('crop_delight_db');
      const collection = database.collection(collectionName);
      const result = await collection.insertOne(data);
      console.log(`New item inserted with the following id: ${result.insertedId}`);
      return result;
    } catch (error) {
      console.error("Error writing to the database", error);
      throw error;
    }
  }

  // Function to find item in the database
  async function findItem(collectionName, query) {
    try {
      const database = client.db('crop_delight_db');
      const collection = database.collection(collectionName);
      const item = await collection.findOne(query);
      return item;
    } catch (error) {
      console.error("Error finding item in the database", error);
      throw error;
    }
  }

  app.post('/register', upload.single('farmerLicense'), async (req, res) => {
    const { username, password, userType, email, phone } = req.body;

    if (!username || !password || !userType || !email || !phone) {
      return res.status(400).json({ message: 'Required fields are missing' });
    }

    try {
      const existingUser = await findItem('users', { $or: [{ username }, { email }, { phone }] });
      if (existingUser) {
        const existingFields = [];
        if (existingUser.username === username) existingFields.push('Username');
        if (existingUser.email === email) existingFields.push('Email');
        if (existingUser.phone === phone) existingFields.push('Phone Number');
        return res.status(400).json({ message: `${existingFields.join(', ')} already exists` });
      }

      let userData = { username, password, userType, email, phone };

      switch (userType) {
        case 'Farmer':
          const {
            farmerName,
            farmerId,
            sameAddress,
            addressStreet,
            addressCity,
            addressProvince,
            addressZipCode,
            farmLocationStreet,
            farmLocationCity,
            farmLocationProvince,
            farmLocationZipCode
          } = req.body;
          const farmerLicensePath = req.file ? req.file.path : '';
          
          if (!farmerName || !farmerId || !addressStreet || !addressCity || !addressProvince || !addressZipCode) {
            return res.status(400).json({ message: 'Farmer details and address are required' });
          }
          
          // Log the request body for debugging
          console.log('Received registration request:', req.body);
          
          // Convert sameAddress to boolean
          const isSameAddress = sameAddress === 'yes';
          
          userData = {
            ...userData,
            farmerName,
            farmerId,
            farmerLicense: farmerLicensePath,
            farmerAddress: {
              street: addressStreet,
              city: addressCity,
              province: addressProvince,
              zipCode: addressZipCode
            },
            farmLocationAddress: isSameAddress ? {
              street: addressStreet,
              city: addressCity,
              province: addressProvince,
              zipCode: addressZipCode
            } : {
              street: farmLocationStreet || '',
              city: farmLocationCity || '',
              province: farmLocationProvince || '',
              zipCode: farmLocationZipCode || ''
            }
          };

          break;

        case 'Customer':
          const {
            customerName,
            addressStreet: shippingStreet,
            addressCity: shippingCity,
            addressProvince: shippingProvince,
            addressZipCode: shippingZipCode
          } = req.body;

          if (!customerName || !shippingStreet || !shippingCity || !shippingProvince || !shippingZipCode) {
            return res.status(400).json({ message: 'Customer name and shipping address are required' });
          }

          userData = {
            ...userData,
            customerName,
            shippingAddress: {
              street: shippingStreet,
              city: shippingCity,
              province: shippingProvince,
              zipCode: shippingZipCode
            }
          };
          break;

        case 'Worker':
          const {
            workerName,
            addressStreet: communicationStreet,
            addressCity: communicationCity,
            addressProvince: communicationProvince,
            addressZipCode: communicationZipCode,
            skills
          } = req.body;

          if (!workerName || !communicationStreet || !communicationCity || !communicationProvince || !communicationZipCode || !skills) {
            return res.status(400).json({ message: 'All Worker details are required' });
          }

          userData = {
            ...userData,
            workerName,
            communicationAddress: {
              street: communicationStreet,
              city: communicationCity,
              province: communicationProvince,
              zipCode: communicationZipCode
            },
            skills
          };
          break;

        default:
          return res.status(400).json({ message: 'Invalid user type' });
      }

      // Log the final userData to be inserted
      console.log('Final userData to insert:', userData);

      await writeToDb('users', userData);
      return res.status(201).json({ message: 'Registration successful' });
    } catch (error) {
      console.error('Error during registration:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  });

 // Your existing login endpoint
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  try {
    const user = await findItem('users', { username });
    if (!user || user.password !== password) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Create session and store username
    req.session.username = username;

    // Include userType in the response
    res.status(200).json({ message: 'Login successful', userType: user.userType });
  } catch (error) {
    console.error("Error during login process", error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Middleware to check session and fetch user details
app.use(async (req, res, next) => {
  if (req.session.username) {
    try {
      const user = await findItem('users', { username: req.session.username });
      req.user = user;
    } catch (err) {
      console.error("Error fetching user details", err);
    }
  }
  next();
});

// Example endpoint to show how to access user details
app.get('/profile', (req, res) => {
  if (req.user) {
    res.json({ message: 'User details', user: req.user });
  } else {
    res.status(401).json({ message: 'Not authenticated' });
  }
});



  // Add product endpoint with file upload
  app.post('/product', upload.single('image'), async (req, res) => {
    // Extract all fields from the request body
    const { productName, price, category, username, weight, quantity, description } = req.body;
    const imagePath = req.file ? req.file.path : '';

    // Validate required fields
    if (!productName || !price || !category || !username) {
      return res.status(400).json({ message: 'Product name, price, category, and username are required' });
    }

    try {
      // Write all fields to the database
      const result = await writeToDb('products', {
        productName,
        price,
        category,
        username,
        imagePath,
        weight,
        quantity,
        description
        // Add other fields as needed
      });

      console.log(`New product inserted with the following id: ${result.insertedId}`);
      res.status(200).json({ message: 'Product added successfully' });
    } catch (error) {
      console.error("Error adding product to the database", error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

// Fetch all products endpoint
app.get('/products', async (req, res) => {
  try {
    const { username } = req.query;
    const database = client.db('crop_delight_db');
    const collection = database.collection('products');
    
    // Filter products based on the username
    const query = username ? { username } : {};
    const products = await collection.find(query).toArray();
    
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products from the database", error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Route to update a product
app.put('/products/:id', upload.single('image'), async (req, res) => {
  try {
    const { category, productName, weight, quantity, price, username } = req.body;
    const image = req.file ? req.file.filename : null; // Handle image upload

    const database = client.db('crop_delight_db');
    const collection = database.collection('products');

    // Define the filter for the product to update
    const filter = { _id: new ObjectId(req.params.id) }; // Use ObjectId to query by ID
    
    // Define the update operation
    const updateDoc = {
      $set: {
        category,
        productName,
        weight,
        quantity,
        price,
        image,
        username
      }
    };

    // Perform the update operation
    const result = await collection.updateOne(filter, updateDoc);

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const updatedProduct = await collection.findOne(filter);

    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ message: 'Error during product update' });
  }
});


// backend route to delete a product
// backend route to delete a product
const deleteProduct = async (productId, productName) => {
  const confirmDelete = window.confirm(`Are you sure you want to delete the product "${productName}"?`);
  if (confirmDelete) {
    try {
      const response = await fetch(`http://localhost:3000/products/${productId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setProducts(products.filter(product => product._id !== productId));
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to delete product');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      setError('Error deleting product');
    }
  }
};





  // Add Work endpoint
  app.post('/work/add', async (req, res) => {
    const { username, workTitle, salary, hours, description } = req.body;

    // Validate required fields
    if (!username || !workTitle || !salary || !hours || !description) {
      return res.status(400).json({ message: 'Required fields are missing' });
    }

    try {
      // Fetch user details
      const user = await findItem('users', { username });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      console.log("User data:", user); // Log user data to debug

      // Prepare work data
      const workData = {
        workTitle,
        salary,
        hours,
        description,
        username: user.username,
        farmName: user.farmerName || '',  // Include farmerName
        farmerAddress: user.farmerAddress || '',
        farmLocation: user.farmLocationAddress || ''  // Include farmLocationAddress
      };

      console.log("Work data to insert:", workData); // Log work data to debug

      // Insert work data into database
      await writeToDb('work', workData);
      return res.status(201).json({ message: 'Work added successfully' });
    } catch (error) {
      console.error('Error adding work:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  });

    app.get('/works', async (req, res) => {
      try {
        const database = client.db('crop_delight_db');// Replace 'yourdbname' with your actual DB name and 'work' with your collection name
        const collection = database.collection('work');
        const works = await collection.find({}).toArray();
        res.status(200).json(works);
      } catch (error) {
        console.error('Error fetching works', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    });

  // Order endpoint
  app.post('/orders', async (req, res) => {
    const orderData = req.body;

    try {
      const result = await writeToDb('orders', orderData);
      res.status(201).json({ orderId: result.insertedId });
    } catch (error) {
      console.error('Error saving order:', error);
      res.status(500).json({ error: 'Failed to save order' });
    }
  });



  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });

