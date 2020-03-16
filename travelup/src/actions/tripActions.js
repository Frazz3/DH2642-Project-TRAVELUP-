// Samling av alla typer av actions för resor/trips. En typ av action skulle kunna vara att för vår nya resa sätta själva resmålet, t.ex. Stockholm.
// Varje action-funktion är ansvarig för att, baserat på eventuell indata (t.ex. "location"),
// returnera ett action-object, med ett type-attribut (t.ex. SET_LOCATION), och en payload (location i detta fall).
// type-attributet anger alltså TYPEN av action. "payloaden" anger datat vi vill göra nånting med. location är kanske strängen "Stockholm".

export const setTripLocation = location => {
  return {
    type: SET_LOCATION,
    location: location
  };
};
