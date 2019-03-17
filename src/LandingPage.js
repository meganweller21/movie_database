import React, {Component} from 'react';
import {debounce} from 'debounce';
import type {MovieDetails} from 'types';
import styled, {css} from 'react-emotion';
import Results from './Results';
import ReactPaginate from 'react-paginate';

export type LandingPageProps = {};

type LandingPageState = {
  movieQuery: string,
  results: Array<MovieDetails>,
  page: number,
  totalPages: number,
  totalResults: number,
};

const LandingPageHeader = styled('div')`
  display: flex;
  align-items: center;
  flex-direction: column;

  ul {
    padding: 0px;
  }

  div {
    padding-top: 5px;
  }
`;

const SearchField = styled('div')`
  display: flex;

  input {
    width: 200px;
  }
`;

const Paginator = css`
  li {
    &.previous {
      border: none;
    }

    &.next {
      border: none;
    }

    &.selected {
      background-color: lightblue;
      color: white;
      border: 1px solid lightblue;
    }

    display: inline-block;
    padding: 5px;
    margin: 5px;
    background-color: white;
    border: 1px solid lightgray;
    color: gray;
    border-radius: 4px;
    cursor: pointer;
  }
`;

class LandingPage extends Component<LandingPageProps, LandingPageState> {
  state: LandingPageState = {
    movieQuery: '',
    results: [],
    page: 0,
    totalPages: 0,
    totalResults: 0,
  };

  getMovieFromDatabase = debounce((movieQuery: string) => {
    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=403ffcb3b4481da342203f94fb6e937e&query=${movieQuery}&include_adult=false`,
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

  getPageFromMovieResults = (page: number, movieQuery: string) => {
    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=403ffcb3b4481da342203f94fb6e937e&query=${movieQuery}&page=${page}&include_adult=false`,
    )
      .then(response => response.json())
      .then(res => {
        this.setState({
          page: res.page,
          results: res.results,
        });
      });
  };

  handleTextChange = (e: SyntheticInput<>) => {
    const movieQuery = e.target.value;

    this.setState({movieQuery});

    if (movieQuery !== '' && movieQuery !== null) {
      this.getMovieFromDatabase(movieQuery);
    }
  };

  handlePageChange = (page: Object) => {
    if (page) {
      this.getPageFromMovieResults(page.selected + 1, this.state.movieQuery);
    }
  };

  render() {
    return (
      <div className="LandingPageContainer">
        <LandingPageHeader>
          <h3>Movie Search</h3>
          <SearchField>
            <input type="text" value={this.state.movieQuery} onChange={this.handleTextChange} />
          </SearchField>
          {this.state.results.length > 0 && (
            <ReactPaginate
              pageCount={this.state.totalPages}
              pageRangeDisplayed={this.state.totalPages < 5 ? this.state.totalPages : 5}
              onPageChange={this.handlePageChange}
              marginPagesDisplayed={1}
              containerClassName={Paginator}
              nextLabel={'>'}
              previousLabel={'<'}
            />
          )}
          {this.state.results.length > 0 && <div> {this.state.totalResults} Results </div>}
          {this.state.results.length === 0 && this.state.page === 1 && <div>No search results</div>}
        </LandingPageHeader>
        <div className="MovieResultsContainer">
          {this.state.results && (
            <div>
              <Results results={this.state.results} page={this.state.page} />
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default LandingPage;
