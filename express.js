app.post('/api/add-user', (req, res) => {
    const { username } = req.body;
  
    // Assuming you have already set up MongoDB Atlas connection
    // add db name and collection name
    const collection = client.db("your_database_name").collection("your_collection_name");
  
    collection.insertOne({ username })
      .then(result => {
        res.json({ message: "User added successfully", insertedId: result.insertedId });
      })
      .catch(error => {
        console.error("Error adding user:", error);
        res.status(500).json({ message: "Internal server error" });
      });
  });
  