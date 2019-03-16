import React, {Component} from 'react';
import {debounce} from 'debounce';
import type {MovieDetails} from 'types';

export type LandingPageProps = {};

type LandingPageState = {
  searchText: string,
  results: Array<MovieDetails>,
  page: number,
  totalPages: number,
  totalResults: number,
};

class LandingPage extends Component<LandingPageProps, LandingPageState> {
  state: LandingPageState = {
    searchText: '',
  };

  getMovieFromDatabase = debounce((movieQuery: string) => {
    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=403ffcb3b4481da342203f94fb6e937e&query=${movieQuery}`,
    )
      .then(response => response.json())
      .then(res => {
        this.setState({
          page: res.page,
          results: res.results,
          totalPages: res.total_pages,
          totalResults: res.total_results,
        });
      });
  }, 250);

  handleTextChange = (e: SyntheticInput<>) => {
    const movieQuery = e.target.value;

    this.setState({searchText: movieQuery});

    if (movieQuery !== '') {
      this.getMovieFromDatabase(movieQuery);
    }
  };

  render() {
    return (
      <div className="LandingPage">
        <h3>Movie Search</h3>

        <label>
          Search:
          <input type="text" value={this.state.searchText} onChange={this.handleTextChange} />
        </label>
      </div>
    );
  }
}

export default LandingPage;
