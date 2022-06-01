import { Router } from "express";
import {
  getAllEvents,
  getSpecificEvent,
  postEvent,
  removeSpecificEvent,
  removeAllEvents,
  addPlayerToEvent,
  removePlayerFromEvent
} from "../controllers/event";

const eventRouter = new Router();

eventRouter.get("/:id", getSpecificEvent);
eventRouter.get("/", getAllEvents);
eventRouter.post("/", postEvent);
eventRouter.patch("/:id/addPlayer", addPlayerToEvent);
eventRouter.delete("/:id", removeSpecificEvent);
eventRouter.delete("/", removeAllEvents);
eventRouter.patch("/:id/removePlayer", removePlayerFromEvent);
export default eventRouter;
