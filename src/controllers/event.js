import mongoose from "mongoose";
import Event, { eventNames } from "../models/event";
import ProblemError from "../util/ProblemError";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();
import {
  INCORRECT_ID,
  NO_EVENT_NAME_FOUND,
  NO_AUTHOR_FOUND,
  NO_AUTHOR_EMAIL_FOUND,
  NO_TYPE_FOUND,
  NO_DATE_FOUND,
  NO_LOCATION_FOUND,
  NO_MAX_NR_PLAYERS_FOUND,
  NO_DESCRIPTION_FOUND,
  NO_EVENTS_FOUND,
  NO_EVENT_FOUND,
  NO_CURRENT_NR_PLAYERS_FOUND,
  MAX_NR_PLAYERS_REACHED_FOUND,
  PLAYER_ALREADY_IN_EVENT,
  EMAIL_FAIL
} from "../util/errors";

export const getAllEvents = async (_req, res, next) => {
  try {
    const events = await Event.find({});
    if (!events.length)
      throw new ProblemError(
        404,
        NO_EVENTS_FOUND.TYPE,
        NO_EVENTS_FOUND.DETAILS
      );
    return res.status(200).send(events);
  } catch (error) {
    console.log("🚀 ~ file: event.js ~ line 30 ~ getAllEvents ~ error", error);
    next(error);
  }
};

export const getSpecificEvent = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new ProblemError(400, INCORRECT_ID.TYPE, INCORRECT_ID.DETAILS);
    }

    const event = await Event.findOne({ _id: id });
    if (!event) {
      throw new ProblemError(404, NO_EVENT_FOUND.TYPE, NO_EVENT_FOUND.DETAILS);
    }
    return res.status(200).send(event);
  } catch (error) {
    console.log(
      "🚀 ~ file: event.js ~ line 48 ~ getSpecificEvent ~ error",
      error
    );
    next(error);
  }
};

export const postEvent = async (req, res, next) => {
  try {
    const title = req.body.title;
    const author = req.body.author;
    const authorEmail = req.body.authorEmail;
    const sport = req.body.sport;
    const date = req.body.date;
    const location = req.body.location;
    const maxPlayers = req.body.maxPlayers;
    const description = req.body.description;
    if (!title.length)
      throw new ProblemError(
        400,
        NO_EVENT_NAME_FOUND.TYPE,
        NO_EVENT_NAME_FOUND.DETAILS
      );
    if (!sport.length)
      throw new ProblemError(400, NO_TYPE_FOUND.TYPE, NO_TYPE_FOUND.DETAILS);

    if (!author.length)
      throw new ProblemError(
        400,
        NO_AUTHOR_FOUND.TYPE,
        NO_AUTHOR_FOUND.DETAILS
      );

    if (!authorEmail.length)
      throw new ProblemError(
        400,
        NO_AUTHOR_EMAIL_FOUND.TYPE,
        NO_AUTHOR_EMAIL_FOUND.DETAILS
      );

    if (!date)
      throw new ProblemError(400, NO_DATE_FOUND.TYPE, NO_DATE_FOUND.DETAILS);

    if (!location.length)
      throw new ProblemError(
        400,
        NO_LOCATION_FOUND.TYPE,
        NO_LOCATION_FOUND.DETAILS
      );

    if (!maxPlayers)
      throw new ProblemError(
        400,
        NO_MAX_NR_PLAYERS_FOUND.TYPE,
        NO_MAX_NR_PLAYERS_FOUND.DETAILS
      );

    if (!description.length)
      throw new ProblemError(
        400,
        NO_DESCRIPTION_FOUND.TYPE,
        NO_DESCRIPTION_FOUND.DETAILS
      );
    const newEvent = new Event({
      title,
      sport,
      author,
      authorEmail,
      date,
      location,
      maxPlayers,
      description
    });

    await newEvent.save();

    return res.status(200).send(newEvent);
  } catch (error) {
    console.log("🚀 ~ file: event.js ~ line 132 ~ postEvent ~ error", error);

    next(error);
  }
};

export const addPlayerToEvent = async (req, res, next) => {
  try {
    const id = req.params.id;
    const playerEmail = req.body.playerEmail;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new ProblemError(400, INCORRECT_ID.TYPE, INCORRECT_ID.DETAILS);
    }

    let event = await Event.findOne({ _id: id });
    if (!event) {
      throw new ProblemError(404, NO_EVENT_FOUND.TYPE, NO_EVENT_FOUND.DETAILS);
    }
    if (event.currentPlayers.length + 1 > event.maxPlayers) {
      throw new ProblemError(
        400,
        MAX_NR_PLAYERS_REACHED_FOUND.TYPE,
        MAX_NR_PLAYERS_REACHED_FOUND.DETAILS
      );
    }

    if (event.currentPlayers.includes(playerEmail)) {
      throw new ProblemError(
        400,
        PLAYER_ALREADY_IN_EVENT.TYPE,
        PLAYER_ALREADY_IN_EVENT.DETAILS
      );
    }
    let players = event.currentPlayers.join(" ");
    players = players.concat(` ${playerEmail}`);
    const ENAME = process.env.EMAIL_NAME;
    const EPASS = process.env.EMAIL_PASS;
    const etrans = nodemailer.createTransport({
      service: "yahoo",
      auth: {
        user: ENAME,
        pass: EPASS
      }
    });
    const email = {
      from: ENAME,
      to: event.authorEmail,
      subject: `New player is attending your event`,
      text: `Hey! ${playerEmail} is attending your event ${event.title}! Current players attending your event: ${players}`
    };
    etrans.sendMail(email, (err, res) => {
      if (err) {
        console.log(
          "🚀 ~ file: event.js ~ line 184 ~ etrans.sendMail ~ err",
          err
        );
        throw new ProblemError(400, EMAIL_FAIL.TYPE, EMAIL_FAIL.DETAILS);
      }
    });
    event.currentPlayers.push(playerEmail);

    await event.save();
    return res.status(200).send(event);
  } catch (error) {
    console.log(
      "🚀 ~ file: event.js ~ line 156 ~ addPlayerToEvent ~ error",
      error
    );
    next(error);
  }
};
export const removePlayerFromEvent = async (req, res, next) => {
  try {
    const id = req.params.id;
    const playerEmail = req.body.playerEmail;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new ProblemError(400, INCORRECT_ID.TYPE, INCORRECT_ID.DETAILS);
    }

    let event = await Event.findOne({ _id: id });
    if (!event) {
      throw new ProblemError(404, NO_EVENT_FOUND.TYPE, NO_EVENT_FOUND.DETAILS);
    }
    if (!event.currentPlayers.includes(playerEmail)) {
      return res.status(200).send({ message: "Player not in event" });
    }
    const ENAME = process.env.EMAIL_NAME;
    const EPASS = process.env.EMAIL_PASS;
    const etrans = nodemailer.createTransport({
      service: "yahoo",
      auth: {
        user: ENAME,
        pass: EPASS
      }
    });
    const players = event.currentPlayers
      .filter((email) => email !== playerEmail)
      .join(" ");
    const email = {
      from: ENAME,
      to: event.authorEmail,
      subject: `Player is not attending your event anymore`,
      text: `Hey! ${playerEmail} is not attending your event ${event.title} anymore!  Current players attending your event: ${players}`
    };
    etrans.sendMail(email, (err, res) => {
      if (err) {
        console.log(
          "🚀 ~ file: event.js ~ line 237 ~ etrans.sendMail ~ err",
          err
        );
        throw new ProblemError(400, EMAIL_FAIL.TYPE, EMAIL_FAIL.DETAILS);
      }
    });
    await Event.updateOne(
      { _id: id },
      { $pull: { currentPlayers: playerEmail } }
    );
    event = await Event.findById({ _id: id });
    return res.status(200).send(event);
  } catch (error) {
    console.log(
      "🚀 ~ file: event.js ~ line 252 ~ removePlayerFromEvent ~ error",
      error
    );
    next(error);
  }
};

export const removeSpecificEvent = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new ProblemError(400, INCORRECT_ID.TYPE, INCORRECT_ID.DETAILS);
    }

    const event = await Event.findOne({ _id: id });
    if (!event)
      throw new ProblemError(404, NO_EVENT_FOUND.TYPE, NO_EVENT_FOUND.DETAILS);
    await Event.deleteOne({ _id: id });
    return res.sendStatus(200);
  } catch (error) {
    console.log(
      "🚀 ~ file: event.js ~ line 172 ~ removeSpecificEvent ~ error",
      error
    );
    next(error);
  }
};

export const removeAllEvents = async (_req, res, next) => {
  try {
    const events = await Event.find({});
    if (!events.length)
      throw new ProblemError(404, NO_EVENT_FOUND.TYPE, NO_EVENT_FOUND.DETAILS);
    await Event.deleteMany({});
    return res.sendStatus(200);
  } catch (error) {
    console.log(
      "🚀 ~ file: event.js ~ line 185 ~ removeAllEvents ~ error",
      error
    );
    next(error);
  }
};
