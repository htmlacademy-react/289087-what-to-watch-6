import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {filmPropsValidation} from '../../props-validation';
import VideoPlayer from '../video-player/video-player';

const PREVIEW_VIDEO_PLAYER_TIMEOUT = 1000;

const MovieCard = ({film, onHover, isActive}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const {name, previewImage, id, previewVideoLink} = film;

  const handleOnCardMouseHover = () => {
    onHover(id);
  };

  const handleOnCardMouseLeave = () => {
    onHover(null);
  };

  useEffect(() => {
    const previewVideoPlayerTimeout = setTimeout(() => {
      if (isActive) {
        setIsPlaying(true);
      }
    }, PREVIEW_VIDEO_PLAYER_TIMEOUT);

    return () => {
      clearTimeout(previewVideoPlayerTimeout);
    };
  }, [isActive]);

  return (
    <article className="small-movie-card catalog__movies-card"
      onMouseOver={handleOnCardMouseHover}
      onMouseLeave={handleOnCardMouseLeave} >
      <div className="small-movie-card__image">
        { isActive
          ? <VideoPlayer poster={previewImage} src={previewVideoLink} isPlaying={isPlaying}/>
          : <img src={previewImage} alt={name} width="280" height="175" />
        }
      </div>
      <h3 className="small-movie-card__title">
        <Link to={`/films/${id}`} className="small-movie-card__link">{name}</Link>
      </h3>
    </article>
  );
};

MovieCard.propTypes = {
  ...filmPropsValidation,
  onHover: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired,
};

export default MovieCard;
