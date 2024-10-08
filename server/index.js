const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const jwt = require("jsonwebtoken");

const port = process.env.PORT || 8000;

// middleware
const corsOptions = {
  origin: ["http://localhost:5173", "https://greenhar01.web.app" , "https://greenhar01.firebaseapp.com"],
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());

// Verify Token Middleware
const verifyToken = async (req, res, next) => {
  const token = req.cookies?.token;
  console.log(token);
  if (!token) {
    return res.status(401).send({ message: "unauthorized access" });
  }
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      console.log(err);
      return res.status(401).send({ message: "unauthorized access" });
    }
    req.user = decoded;
    next();
  });
};

const uri = `mongodb+srv://${process.env.DB_USERR}:${process.env.DB_PASS}@cluster0.ncq0h0t.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    const userCollection = client.db("GreenHarvest").collection("users");
    const weofferCollection = client.db("GreenHarvest").collection("Offer");
    const projectCollection = client.db("GreenHarvest").collection("Projects");
    const blosCollection = client.db("GreenHarvest").collection("blogs");
    const foodCollection = client.db("GreenHarvest").collection("Food");
    const cartCollection = client.db("GreenHarvest").collection("cart");

    // auth related api
    app.post("/jwt", async (req, res) => {
      const user = req.body;
      const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "365d",
      });
      res
        .cookie("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        })
        .send({ success: true });
    });
    // Logout
    app.get("/logout", async (req, res) => {
      try {
        res
          .clearCookie("token", {
            maxAge: 0,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
          })
          .send({ success: true });
        console.log("Logout successful");
      } catch (err) {
        res.status(500).send(err);
      }
    });

    // **************************user releted api************************

    // Save user
    app.put("/user", async (req, res) => {
      const user = req.body;

      try {
        // Check if the email already exists in the database
        const existingUser = await userCollection.findOne({
          email: user.email,
        });

        if (existingUser) {
          // If the email exists, return a response indicating that the user already exists
          return res
            .status(400)
            .send({ message: "Email already exists in the database" });
        }

        // If the email does not exist, insert the new user
        const result = await userCollection.insertOne(user);
        res.send(result);
      } catch (error) {
        // Handle any errors that occur during the database operation
        res.status(500).send({ message: "An error occurred", error });
      }
    });

    // get all user

    app.get("/users", verifyToken, async (req, res) => {
      try {
        const users = await userCollection.find().toArray();
        res.send(users);
      } catch (error) {
        res.status(500).send({ message: "An error occurred", error });
      }
    });

    // get userby email
    app.get("/users/:email", async (req, res) => {
      try {
        const user = await userCollection.findOne({ email: req.params.email });
        if (!user) {
          res.status(404).send({ message: "User not found" });
        } else {
          res.send(user);
        }
      } catch (error) {
        res.status(500).send({ message: "An error occurred", error });
      }
    });

    // update role
    // Update user role by user ID
    app.patch("/users/:id/role", async (req, res) => {
      const userId = req.params.id;
      const { role } = req.body;

      try {
        // Update the user's role in the database
        const result = await userCollection.updateOne(
          { _id: new ObjectId(userId) },
          { $set: { role } }
        );

        if (result.modifiedCount === 0) {
          return res
            .status(404)
            .send({ message: "User not found or role unchanged" });
        }

        res.send({ message: "Role updated successfully" });
      } catch (error) {
        res.status(500).send({ message: "An error occurred", error });
      }
    });

    // **********************We offer related api ****************

    // get offer
    app.get("/getoffer", async (req, res) => {
      try {
        const offers = await weofferCollection.find().toArray();
        res.send(offers);
      } catch (error) {
        res.status(500).send({ message: "An error occurred", error });
      }
    });

    // get offer by id
    // Get offer by ID
    app.get("/getofferbyid/:id", async (req, res) => {
      const id = new ObjectId(req.params.id); // Convert the ID to an ObjectId
      try {
        const offer = await weofferCollection.findOne({ _id: id });
        if (!offer) {
          res.status(404).send({ message: "Offer not found" });
        } else {
          res.send(offer);
        }
      } catch (error) {
        res.status(500).send({ message: "An error occurred", error });
      }
    });

    // ************************projects related ************************

    // get all projects
    app.get("/getprojects", async (req, res) => {
      try {
        const projects = await projectCollection.find().toArray();
        res.send(projects);
      } catch (error) {
        res.status(500).send({ message: "An error occurred", error });
      }
    });

    // get projects by id
    app.get("/getprojectbyid/:id", async (req, res) => {
      const id = new ObjectId(req.params.id); // Convert the ID to an ObjectId
      try {
        const project = await projectCollection.findOne({ _id: id });
        if (!project) {
          res.status(404).send({ message: "Project not found" });
        } else {
          res.send(project);
        }
      } catch (error) {
        res.status(500).send({ message: "An error occurred", error });
      }
    });

    // ***********************Blogs related****************

    // add blogs
    app.post("/addblogs", async (req, res) => {
      const {
        title,
        description,
        imgSrc,
        category,
        userEmail,
        userName,
        userImage,
      } = req.body;

      // Check for missing fields
      if (
        !title ||
        !description ||
        !imgSrc ||
        !category ||
        !userEmail ||
        !userName ||
        !userImage
      ) {
        return res.status(400).json({ message: "All fields are required." });
      }

      try {
        const newBlog = {
          title,
          description,
          imgSrc,
          category,
          userEmail,
          userName,
          userImage,
          date: new Date().toISOString(),
        };

        // Insert the blog into the database
        const result = await blosCollection.insertOne(newBlog);

        // Check if insertion was successful
        if (result.acknowledged) {
          res
            .status(201)
            .json({ message: "Blog added successfully!", blog: newBlog });
        } else {
          res
            .status(500)
            .json({ message: "Failed to add blog to the database." });
        }
      } catch (error) {
        console.error("Error adding blog:", error);
        res
          .status(500)
          .json({ message: "An error occurred while adding the blog." });
      }
    });

    // get all blogs
    app.get("/getblogs", async (req, res) => {
      try {
        const blogs = await blosCollection.find().toArray();
        res.send(blogs);
      } catch (error) {
        res.status(500).send({ message: "An error occurred", error });
      }
    });

    // get blogs by id

    app.get("/getblogbyid/:id", async (req, res) => {
      const id = new ObjectId(req.params.id); // Convert the ID to an ObjectId
      try {
        const blog = await blosCollection.findOne({ _id: id });
        if (!blog) {
          res.status(404).send({ message: "Blog not found" });
        } else {
          res.send(blog);
        }
      } catch (error) {
        res.status(500).send({ message: "An error occurred", error });
      }
    });

    // get blogs by email address

    app.get("/getblogbyuser/:email", verifyToken, async (req, res) => {
      const email = req.params.email;
      try {
        const blogs = await blosCollection.find({ userEmail: email }).toArray();
        if (!blogs.length) {
          res.status(404).send({ message: "No blogs found for this user" });
        } else {
          res.send(blogs);
        }
      } catch (error) {
        res.status(500).send({ message: "An error occurred", error });
      }
    });

    // delet blogs by id
    app.delete("/blogdelet/:id", function (req, res) {
      const id = new ObjectId(req.params.id);
      blosCollection.deleteOne({ _id: id }, (err, result) => {
        if (err) return res.send(500, err);
        res.send(`Deleted ${result.deletedCount} blog.`);
      });
    });

    // update blogs
    app.put("/updateblog/:id", async (req, res) => {
      const id = new ObjectId(req.params.id);
      const { title, description, imgSrc, category } = req.body;
      const updatedBlog = {
        title,
        description,
        imgSrc,
        category,
        date: new Date().toISOString(),
      };

      try {
        const result = await blosCollection.updateOne(
          { _id: id },
          { $set: updatedBlog }
        );

        if (result.modifiedCount === 0) {
          return res.status(404).send({ message: "Blog not found" });
        }

        res.send(updatedBlog);
      } catch (error) {
        res.status(500).send({ message: "An error occurred", error });
      }
    });

    // *********************************food related functions*******************************
    // add food

    // Add a new food item
    app.post("/food", async (req, res) => {
      const {
        name,
        category,
        price,
        imageLink,
        description,
        userEmail,
        userName,
        userPhotoURL,
        status,
      } = req.body;

      // Validate input
      if (
        !name ||
        !category ||
        !price ||
        !imageLink ||
        !description ||
        !userEmail ||
        !userName ||
        !userPhotoURL
      ) {
        return res.status(400).json({ message: "All fields are required." });
      }

      const newFood = {
        name,
        category,
        price,
        imageLink,
        description,
        status,
        userEmail,
        userName,
        userPhotoURL,
        createdAt: new Date().toISOString(),
      };

      try {
        const result = await foodCollection.insertOne(newFood);

        // Check if insertion was successful
        if (result.acknowledged) {
          res
            .status(201)
            .json({ message: "Food item added successfully!", food: newFood });
        } else {
          res
            .status(500)
            .json({ message: "Failed to add food item to the database." });
        }
      } catch (error) {
        console.error("Error adding food item:", error);
        res
          .status(500)
          .json({ message: "An error occurred while adding the food item." });
      }
    });

    // get food by email address
    app.get("/food/user/:email", verifyToken, async (req, res) => {
      const email = req.params.email;
      try {
        const food = await foodCollection.find({ userEmail: email }).toArray();
        if (!food.length) {
          res
            .status(404)
            .send({ message: "No food items found for this user" });
        } else {
          res.send(food);
        }
      } catch (error) {
        res.status(500).send({ message: "An error occurred", error });
      }
    });

    // get all food items
    app.get("/foods", async (req, res) => {
      try {
        const food = await foodCollection.find().toArray();
        res.send(food);
      } catch (error) {
        res.status(500).send({ message: "An error occurred", error });
      }
    });

    // food delet by id
    app.delete("/fooddelete/:id", async (req, res) => {
      const id = new ObjectId(req.params.id);
      await foodCollection.deleteOne({ _id: id });
      res.send(`Deleted food item with id: ${id}`);
    });

    // food status change
    app.patch("/foodtoggle/:id", async (req, res) => {
      const id = new ObjectId(req.params.id); // Convert the ID to an ObjectId
      try {
        // Find the current food item
        const food = await foodCollection.findOne({ _id: id });
        if (!food) {
          return res.status(404).json({ message: "Food not found" });
        }

        // Toggle status between 'paused' and 'available'
        const newStatus = food.status === "available" ? "paused" : "available";

        // Update food item with the new status
        const result = await foodCollection.updateOne(
          { _id: id },
          { $set: { status: newStatus } }
        );

        if (result.modifiedCount === 0) {
          return res
            .status(400)
            .json({ message: "Failed to update food status" });
        }

        // Return the updated food item
        const updatedFood = await foodCollection.findOne({ _id: id });
        res.json(updatedFood);
      } catch (error) {
        console.error("Error updating food status:", error);
        res.status(500).json({ message: "Failed to toggle food status" });
      }
    });

    // get all food
    app.get("/allfood", async (req, res) => {
      try {
        const food = await foodCollection.find().toArray();
        res.send(food);
      } catch (error) {
        res.status(500).send({ message: "An error occurred", error });
      }
    });

    // get food by id
    app.get("/foodid/:id", async (req, res) => {
      const id = new ObjectId(req.params.id);
      try {
        const food = await foodCollection.findOne({ _id: id });
        if (!food) {
          return res.status(404).json({ message: "Food not found" });
        }
        res.send(food);
      } catch (error) {
        console.error("Error getting food item:", error);
        res
          .status(500)
          .json({ message: "An error occurred while getting the food item." });
      }
    });

    //  ******************************cart releted api ******************************

    // add to cart

    app.post("/cartadd", async (req, res) => {
      const { foodName, quantity, totalPrice, userName, userEmail, foodImage } =
        req.body;
      try {
        const newCartItem = {
          foodName,
          totalPrice,
          foodImage,
          userName,
          userEmail,
          quantity,
        };

        const result = await cartCollection.insertOne(newCartItem);
        if (result.acknowledged) {
          res.status(201).json({
            message: "Cart item added successfully!",
            cartItem: newCartItem,
          });
        } else {
          res
            .status(500)
            .json({ message: "Failed to add cart item to the database." });
        }
      } catch (error) {
        console.error("Error adding cart item:", error);
        res
          .status(500)
          .json({ message: "An error occurred while adding the cart item." });
      }
    });

    // get cart by email address
    app.get("/cartbymail/:email", async (req, res) => {
      const email = req.params.email;
      try {
        const cartItems = await cartCollection
          .find({ userEmail: email })
          .toArray();
        if (!cartItems.length) {
          res
            .status(404)
            .send({ message: "No cart items found for this user" });
        } else {
          res.send(cartItems);
        }
      } catch (error) {
        res.status(500).send({ message: "An error occurred", error });
      }
    });

    // delet cart item
    app.delete("/cartdelete/:id", async (req, res) => {
      const id = new ObjectId(req.params.id);
      await cartCollection.deleteOne({ _id: id });
      res.send(`Deleted cart item with id: ${id}`);
    });

    // update cart item quantity

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello from Green Harvests Server..");
});

app.listen(port, () => {
  console.log(`Green Harvests is running on port ${port}`);
});
