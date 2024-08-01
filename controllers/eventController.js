const Event = require('../models/Event');

// Create a new event
exports.createEvent = async (req, res) => {
  const { name, date, location, description } = req.body;

  try {
    const newEvent = new Event({
      name,
      date,
      location,
      description,
      userId: req.user.id,
    });

    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Retrieve all events for the logged-in user
exports.getEvents = async (req, res) => {
  try {
    const events = await Event.find({ userId: req.user.id });
    res.status(200).json(events);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Update an event by ID
exports.updateEvent = async (req, res) => {
  const { id } = req.params;
  const { name, date, location, description } = req.body;

  try {
    const updatedEvent = await Event.findOneAndUpdate(
      { _id: id, userId: req.user.id },
      { name, date, location, description },
      { new: true }
    );

    if (!updatedEvent) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.status(200).json(updatedEvent);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Delete an event by ID
exports.deleteEvent = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedEvent = await Event.findOneAndDelete({ _id: id, userId: req.user.id });

    if (!deletedEvent) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.status(200).json({ message: 'Event deleted successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server Error' });
  }
};
