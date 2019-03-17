import React, {Component} from 'react';
import type {MovieDetails} from 'types';
import MovieResult from './MovieResult';

export type ResultsProps = {
  results: Array<MovieDetails>,
  page: number,
};

type ResultsState = {
  results: Array<MovieDetails>,
};

class Results extends Component<ResultsProps, ResultsState> {
  state = {
    results: [],
  };

  syncStateToProps = (props: ResultsProps) => {
    this.setState({results: props.results});
  };

  componentDidMount() {
    this.syncStateToProps(this.props);
  }

  componentDidUpdate(prevProps: ResultsProps) {
    if (prevProps.results !== this.props.results) {
      this.syncStateToProps(this.props);
    }
  }

  render() {
    return (
      <div className="Results">
        {this.state.results && this.state.results.length > 1 && (
          <div>
            {this.state.results.map(result => (
              <MovieResult key={result.id} movie={result} />
            ))}
          </div>
        )}
        {this.state.results.length === 0 && this.props.page === 1 && <div>No search results</div>}
      </div>
    );
  }
}

export default Results;
