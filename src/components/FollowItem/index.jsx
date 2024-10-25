import PropTypes from "prop-types";
import { getAvatar } from "../../utils/generateImages";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faCheck } from '@fortawesome/free-solid-svg-icons';

export function FollowItem({ name, username, isVerified }) {
  const avatar = getAvatar(`${name + Math.floor(Math.random() * 1000)}@email.com`);
  
  return (
    <div className="flex items-center justify-between py-3 hover:bg-gray-800 transition duration-200 flex space-x-3">
      <div className="flex items-center">
        <img src={avatar} alt="user avatar" className="w-12 h-12 rounded-full mr-3" />
        <div>
          <p className="font-bold flex items-center space-x-1">
            {name}
            {isVerified && <FontAwesomeIcon icon={faCheck} className="text-blue-500" />}
          </p>
          <p className="text-gray-500">@{username}</p>
        </div>
      </div>
      <div>
        <button className="bg-white text-black font-bold px-4 py-2 rounded-full hover:bg-gray-300 transition duration-200">
          Follow
        </button>
      </div>
    </div>
  );
}

FollowItem.propTypes = {
  name: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  isVerified: PropTypes.bool
};
