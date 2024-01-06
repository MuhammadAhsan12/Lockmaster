import asyncHandler from "express-async-handler";
import Phone from "../models/phoneModel.js";

const getMyPhones = asyncHandler(async (req, res) => {
  const phones = await Phone.find({ user: req.params.id });

  if (phones) {
    res.json(phones);
  } else {
    res.status(404);
    throw new Error("Phones Not Found");
  }
});

const updatePhone = asyncHandler(async (req, res) => {
  const phone = await Phone.findById(req.params.id);

  if (phone) {
    phone.name = req.body.name || phone.name;
    phone.deviceId = req.body.deviceId || phone.deviceId;
    phone.paid = req.body.paid || phone.paid;
    phone.status = req.body.status || phone.status;
    const updatedPhone = await phone.save();
    res.json(updatedPhone);
  } else {
    res.status(404);
    throw new Error("Request Failed");
  }
});

const addPhone = asyncHandler(async (req, res) => {
  const { userId, name, deviceId } = req.body;

  if (userId && !name) {
    res.status(400);
    throw new Error("No phone items");
    return;
  } else {
    const phone = new Phone({
      user: userId,
      name,
      deviceId,
    });
    const createdPhone = await phone.save();
    res.status(201).json(createdPhone);
  }
});

const getPhones = asyncHandler(async (req, res) => {
  const phones = await Phone.find({}).populate(
    "user",
    "firstName lastName phoneNum"
  );

  if (phones) {
    res.json(phones);
  } else {
    res.status(404);
    throw new Error("Phones Not Found");
  }
});

const getPhoneById = asyncHandler(async (req, res) => {
  const phone = await Phone.findById(req.params.id).select("-password");

  if (phone) {
    res.json(phone);
  } else {
    res.status(404);
    throw new Error("Phone Not Found");
  }
});

export { getPhones, getPhoneById, getMyPhones, updatePhone, addPhone };
