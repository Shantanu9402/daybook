// In backend/src/controllers/entrycontroller.js

import Entry from "../models/entryModel.js";

// Your createEntry function (corrected)
export const createEntry = async (req, res) => {
  const { date, mood, title, content } = req.body;
  const loggedUser = req.user;
  if (!title || !content || !mood) {
    return res.status(422).json({ message: "Please submit with required fields!" });
  }
  if (title.length > 50) {
    return res.status(422).json({ message: "Title length should not be more than 50 characters!" });
  }
  try {
    const saveEntry = await Entry.create({ createdBy: loggedUser._id, date, title, mood, content });
    res.status(201).json({ message: "Entry added successfully!", saveEntry });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong! Please try again later!" });
  }
};

// Your getEntries function (correct)
export const getEntries = async (req, res) => {
  const loggedUser = req.user;
  try {
    const entries = await Entry.find({ createdBy: loggedUser._id }).sort({ date: -1 });
    res.status(200).json({ message: "Entries fetched successfully!", data: entries });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong!" });
  }
};


// 👇 **THIS IS THE NEW, FULLY IMPLEMENTED SEARCH FUNCTION** 👇
export const searchEntries = async (req, res) => {
  const loggedUser = req.user;
  const queryText = req.query.text; // Get the search text from the URL

  if (!queryText?.trim()) {
    return res.status(400).json({ message: "Search text is required!" });
  }

  try {
    // This query finds entries where:
    // 1. The title OR content contains the search text (case-insensitive)
    // 2. The entry was created by the currently logged-in user
    const entries = await Entry.find({
      $and: [
        { createdBy: loggedUser._id },
        {
          $or: [
            { title: { $regex: queryText, $options: "i" } },
            { content: { $regex: queryText, $options: "i" } },
          ],
        },
      ],
    }).sort({ date: -1 });

    res.status(200).json({
      message: "Search results fetched successfully!",
      data: entries,
    });
  } catch (error) {
    console.error("Error searching entries!", error);
    res.status(500).json({ message: "Something went wrong during search!" });
  }
};


// Your other functions (placeholders for completeness)
export const getEntry = async (req, res) => { /* ... Your existing getEntry logic ... */ };
export const updateEntry = async (req, res) => { /* ... Your existing updateEntry logic ... */ };
export const deleteEntry = async (req, res) => { /* ... Your existing deleteEntry logic ... */ };