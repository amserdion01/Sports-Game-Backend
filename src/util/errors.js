const ERROR_TYPES = {
  SWAGGER_ERROR: "swagger-error",
  NOT_FOUND: "not-found",
  INCORRECT_DATA: "incorrect-data"
};

export const SWAGGER_ERROR = {
  TYPE: ERROR_TYPES.SWAGGER_ERROR,
  DETAILS: "Swagger validation failed"
};

export const NO_TODO_FOUND = {
  TYPE: ERROR_TYPES.NOT_FOUND,
  DETAILS: "No todo was found"
};

export const NO_MESSAGE_PROVIDED = {
  TYPE: ERROR_TYPES.NOT_FOUND,
  DETAILS: "No message was provided"
};

export const INCORRECT_ID = {
  TYPE: ERROR_TYPES.INCORRECT_DATA,
  DETAILS: "The id provided is incorrect"
};

export const NO_EVENTS_FOUND = {
  TYPE: ERROR_TYPES.NOT_FOUND,
  DETAILS: "No events were found"
};
export const NO_EVENT_FOUND = {
  TYPE: ERROR_TYPES.NOT_FOUND,
  DETAILS: "The event was not found"
};

export const NO_EVENT_NAME_FOUND = {
  TYPE: ERROR_TYPES.NOT_FOUND,
  DETAILS: "No event name was found"
};

export const NO_AUTHOR_FOUND = {
  TYPE: ERROR_TYPES.NOT_FOUND,
  DETAILS: "No event author was found"
};

export const NO_AUTHOR_EMAIL_FOUND = {
  TYPE: ERROR_TYPES.NOT_FOUND,
  DETAILS: "No event author email was found"
};

export const NO_TYPE_FOUND = {
  TYPE: ERROR_TYPES.NOT_FOUND,
  DETAILS: "No event sport type was found"
};

export const NO_DATE_FOUND = {
  TYPE: ERROR_TYPES.NOT_FOUND,
  DETAILS: "No event date of event was found"
};

export const NO_LOCATION_FOUND = {
  TYPE: ERROR_TYPES.NOT_FOUND,
  DETAILS: "No event location was found"
};

export const NO_MAX_NR_PLAYERS_FOUND = {
  TYPE: ERROR_TYPES.NOT_FOUND,
  DETAILS: "No event maximum number of players was found"
};

export const NO_CURRENT_NR_PLAYERS_FOUND = {
  TYPE: ERROR_TYPES.NOT_FOUND,
  DETAILS: "No event current number of players was found"
};

export const NO_DESCRIPTION_FOUND = {
  TYPE: ERROR_TYPES.NOT_FOUND,
  DETAILS: "No event description was found"
};

export const MAX_NR_PLAYERS_REACHED_FOUND = {
  TYPE: ERROR_TYPES.INCORRECT_DATA,
  DETAILS: "Max number of players is reached"
};
export const PLAYER_ALREADY_IN_EVENT = {
  TYPE: ERROR_TYPES.INCORRECT_DATA,
  DETAILS: "You are already signed up for this event"
};
export const EMAIL_FAIL = {
  TYPE: ERROR_TYPES.INCORRECT_DATA,
  DETAILS: "Failed to send email"
};

