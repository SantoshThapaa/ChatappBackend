import Message from '../models/Message.js';
import path from 'path';

export const uploadMedia = async (req, res) => {
  try {
    const { sender, groupId, mediaType } = req.body;

    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    if (!sender || !groupId) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const filePath = `/uploads/${req.file.filename}`;

    const newMessage = new Message({
      message: filePath,
      sender,
      groupId,
      type: mediaType || 'media',
      time: new Date()
    });

    const savedMessage = await newMessage.save();

    res.status(200).json({
      message: "Media uploaded successfully",
      filePath,
      mediaId: savedMessage._id  
    });

  } catch (err) {
    console.error("Upload Error:", JSON.stringify(err, null, 2));
    res.status(500).json({ 
        error: "Internal server error", 
        details: err.message 
    });
  }
};

export const getMediaById = async (req, res) => {
  try {
    const mediaId = req.params.mediaId;
    const media = await Message.findById(mediaId);
    if (!media) {
      return res.status(404).json({ error: "Media not found" });
    }
    res.status(200).json(media);
  } catch (err) {
    console.error("Get Media Error:", err);
    res.status(500).json({
      error: "Failed to fetch media",
      details: err.message
    });
  }
};