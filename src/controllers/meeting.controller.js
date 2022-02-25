const Meeting = require("../models/meeting");

const bookMeeting = async (req, res) => {
  try {
    
    const meetingsForDate = await Meeting.find({
      meeting_date: req.body.meeting_date,
    });

    console.log(meetingsForDate)

    if ( Array.isArray(meetingsForDate) && meetingsForDate.length > 0) {
      const filteredMeetings = meetingsForDate.filter((item) => {
        if (
          req.body.start_time > item.start_time &&
          req.body.start_time < item.end_time
        ) {
          return item;
        } else if (
          req.body.end_time > item.start_time &&
          req.body.end_time < item.end_time
        ) {
          return item;
        } else {
          // all good
        }
      });
      console.log('filtered', filteredMeetings)
      if (filteredMeetings.length) {
        // cannot book. already filled up slot
        throw Error('Slot not available');
      } else {
        await Meeting.create({
          meeting_date: req.body.meeting_date,
          start_time: req.body.start_time,
          end_time: req.body.end_time,
        });
      }
    }

    await Meeting.create({
      meeting_date: req.body.meeting_date,
      start_time: req.body.start_time,
      end_time: req.body.end_time,
    });

    return res.send({ message: "Meeting successfully scheduled" });
  } catch (err) {
    console.log(err);
    return res.status(400).send({
      message: 'Slot already booked'
    })
  }
};

module.exports = {
  bookMeeting,
};
