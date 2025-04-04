const VenueRating = ({ rating }) => {
    return (
      <div className="rating flex gap-x-1 items-center">
        <div className="flex space-x-1 text-orange-500 text-sm mt-1">
          {[...Array(5)].map((_, i) => (
            <span key={i} className={`text-2xl ${i < rating ? "text-yellow-400" : "text-gray-400"}`}>
              ★
            </span>
          ))}
        </div>
      </div>
    );
  };
  export default VenueRating;
  