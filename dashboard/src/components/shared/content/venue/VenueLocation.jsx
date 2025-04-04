const VenueLocation = ({ location }) => {
    return (
      <div className="location flex items-center justify-center">
        <button className="cursor-pointer flex items-center gap-x-1 ">
          📍
          <span>{location || "نامشخص"}</span>
        </button>
      </div>
    );
  };
  export default VenueLocation;
  