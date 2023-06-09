const lineupReducer = (state, action) => {
  if (action.type === "GET_MUSICIANS") {
    return action.musician.map(
      ({ musicianId, musicianName, instrumentId, instrumentName }) => {
        return {
          musicianId: musicianId,
          musicianName: musicianName,
          instrumentId: instrumentId,
          instrumentName: instrumentName,
        };
      }
    );
  }

  if (action.type === "ADD_POSITION") {
    return [
      ...state,
      {
        musicianId: "",
        musicianName: "",
        instrumentId: "",
        instrumentName: "",
      },
    ];
  }

  if (action.type === "UPDATE_POSITION") {
    const { name, value } = action.payload.event.target;

    const musicianId =
      +action.payload.event.target[
        action.payload.event.target.selectedIndex
      ].getAttribute("musician-id");
    const instrumentId =
      +action.payload.event.target[
        action.payload.event.target.selectedIndex
      ].getAttribute("instrument-id");

    const list = [...state];
    list[action.payload.index][name] = value;

    if (musicianId) {
      list[action.payload.index].musicianId = musicianId;
    }
    if (instrumentId) {
      list[action.payload.index].instrumentId = instrumentId;
    }

    list[action.payload.index][name] = value;

    return list;
  }

  if (action.type === "REMOVE_POSITION") {
    const list = [...state];
    list.splice(action.index, 1);
    return [...list];
  }
};

export default lineupReducer;
