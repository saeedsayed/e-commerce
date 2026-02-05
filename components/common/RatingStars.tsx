import { FaStar } from "react-icons/fa6";

type Props = {
  rating: number;
};

const RatingStars = ({ rating }: Props) => {
  return (
    <div className="flex">
      {[...Array(Math.ceil(rating))].map((_, i) => (
        <span key={i} className="text-yellow-500">
          <FaStar />
          {/* ⭐ */}
        </span>
      ))}
      {[...Array(5 - Math.ceil(rating))].map((_, i) => (
        <span key={i} className="text-gray-300">
          <FaStar className="opacity-30" />
          {/* ⭐ */}
        </span>
      ))}
    </div>
  );
};

export default RatingStars;
