import { Query } from "../models/queryModel.js";

export const createQuery = async (req, res) => {
  // Check if all required fields are present in the request body
  if (!req.body.mobileNumber || !req.body.email || !req.body.query) {
    return res.status(400).json({ message: "All fields are required." });
  }

  // Create a new query instance
  const query = new Query({
    mobileNumber: req.body.mobileNumber,
    email: req.body.email,
    query: req.body.query,
  });

  try {
    // Save the query to the database
    const createdQuery = await Query.create(query);

    // Respond with the created query
    return res.status(201).json(createdQuery);
  } catch (error) {
    // Handle any errors that occur during the creation process
    return res.status(500).json({ message: error.message });
  }
};

export const getQueries = async (req, res) => {
  try {
    // Retrieve all queries from the database
    const queries = await Query.find({});

    // Respond with the count and data of queries
    return res.status(200).json({
      count: queries.length,
      data: queries,
    });
  } catch (error) {
    // Handle any errors that occur during the retrieval process
    return res.status(500).json({ message: error.message });
  }
};
