const express = require("express");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const router = express.Router();
const Messages = require("../model/messages");
const { upload } = require("../multer");
const ErrorHandler = require("../utils/ErrorHandler");

//Create a new Message

router.post(
  "/create-new-message",
  upload.array("images"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const messageData = req.body;

      if (req.files) {
        const files = req.files;
        const imagesURLs = files.map((file) => `${file.filename}`);
        messageData.images = imagesURLs;
      }
      messageData.conversationId = req.body.conversationId;
      messageData.sender = req.body.sender;
      messageData.text = req.body.text;

      const message = new Messages({
        conversationId: messageData.conversationId,
        text: messageData.text,
        sender: messageData.sender,
        images: messageData.images ? messageData.images : undefined,
      });

      await message.save();

      res.status(201).json({
        success: true,
        message,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 500));
    }
  })
);

router.get(
  "/get-all-messages/:id",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const messages = await Messages.find({ conversationId: req.params.id });
      res.status(201).json({
        success: true,
        messages,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 500));
    }
  })
);

module.exports = router;
