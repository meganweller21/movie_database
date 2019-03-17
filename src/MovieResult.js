import React from 'react';
import type {MovieDetails} from 'types';
import styled from 'react-emotion';

export type MovieResultProps = {
  movie: MovieDetails,
};

const MovieCard = styled('div')`
  padding: 50px;
  display: flex;
  height: 230px;
  img {
    height: 215px;
  }
`;

const MovieDetail = styled('div')`
  display: flex;
  flex-direction: column;
  padding-left: 8px;
  font-size: 14px;

  div {
    padding-bottom: 5px;
  }

  .title {
    font-size: 20px;
  }

  .date {
    color: gray;
  }
`;

const MovieResult = (props: MovieResultProps) => {
  return (
    <MovieCard>
      {props.movie.poster_path !== null && (
        <img src={`https://image.tmdb.org/t/p/w500/${props.movie.poster_path}`} />
      )}
      <MovieDetail>
        <div className="title"> {props.movie.title}</div>
        <div className="date"> {props.movie.release_date}</div>

        <div className="description">{props.movie.overview}</div>
        <div className="voting">
          <b> {props.movie.vote_average} / 10 </b> on {props.movie.vote_count} reviews
        </div>
      </MovieDetail>
    </MovieCard>
  );
};

export default MovieResult;
