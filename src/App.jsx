import React, { Component } from "react";
import "./App.css";
import {
  FormGroup,
  FormControl,
  InputGroup,
  Container,
  Row,
  Col,
  Button
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { debounce } from "lodash";
import Profile from "./Profile";
import Album from "./Album";
import Suggestions from "./Suggestions";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      showSuggestion: false,
      keyword: null,
      artist: null,
      album: [],
      suggestion: []
    };
  }

  search() {
    const ROOT_URL = "https://ws.audioscrobbler.com/2.0/";
    const API_KEY = process.env.REACT_APP_SECRET_API_KEY;
    const SEARCH_ARTIST = "artist.search";
    const GET_ARTIST = "artist.getinfo";
    const GET_ALBUM = "artist.gettopalbums";

    let artistSearchResult = `${ROOT_URL}?method=${SEARCH_ARTIST}&artist=${this.state.query}&api_key=${API_KEY}&format=json`;

    if (this.state.showSuggestion) {
      this.setState({ showSuggestion: false });
    }

    fetch(artistSearchResult, { method: "GET" })
      .then(response => response.json())
      .then(result => {
        const { results } = result;
        this.setState({ keyword: results.artistmatches.artist[0].name });

        let artistInfo = `${ROOT_URL}?method=${GET_ARTIST}&artist=${this.state.keyword}&api_key=${API_KEY}&format=json`;
        let albumInfo = `${ROOT_URL}?method=${GET_ALBUM}&artist=${this.state.keyword}&api_key=${API_KEY}&limit=30&format=json`;

        fetch(artistInfo, { method: "GET" })
          .then(response => response.json())
          .then(result => {
            const { artist } = result;
            this.setState({ artist });
            fetch(albumInfo, { method: "GET" })
              .then(response => response.json())
              .then(result => {
                const { album } = result.topalbums;
                this.setState({ album });
              });
          });
      });
  }

  suggestions = debounce(() => {
    const ROOT_URL = "https://ws.audioscrobbler.com/2.0/";
    const API_KEY = process.env.REACT_APP_SECRET_API_KEY;
    const SEARCH_ARTIST = "artist.search";
    const SEARCH_LIMIT = 10;

    let artistSearchResult = `${ROOT_URL}?method=${SEARCH_ARTIST}&artist=${this.state.query}&api_key=${API_KEY}&limit=${SEARCH_LIMIT}&format=json`;
    fetch(artistSearchResult, { method: "GET" })
      .then(response => response.json())
      .then(result => {
        const { results } = result;
        this.setState({ suggestion: results.artistmatches.artist });
      });
  }, 400);

  onSelectSuggestion = keyword => {
    this.setState({ query: keyword });
  };

  render() {
    return (
      <div className="app">
        <Container>
          <h3 className="app-title">Music Search</h3>
          <Row>
            <Col>
              <div className="search-container">
                <FormGroup>
                  <InputGroup>
                    <FormControl
                      type="text"
                      placeholder="Search the artist..."
                      value={this.state.query}
                      onChange={event => {
                        this.setState({ query: event.target.value });
                      }}
                      onKeyPress={event => {
                        if (event.key === "Enter") {
                          this.search();
                        } else {
                          if (
                            this.state.query &&
                            this.state.query.length >= 2
                          ) {
                            this.suggestions();
                            this.setState({ showSuggestion: true });
                          }
                        }
                      }}
                      style={{ boxShadow: "none" }}
                    />
                    <InputGroup.Append>
                      <Button onClick={() => this.search()}>
                        <FontAwesomeIcon icon={faSearch} />
                      </Button>
                    </InputGroup.Append>
                  </InputGroup>
                </FormGroup>
                {this.state.showSuggestion ? (
                  <Suggestions
                    result={this.state.suggestion}
                    onSelectItem={this.onSelectSuggestion}
                  />
                ) : null}
              </div>
            </Col>
          </Row>
          {this.state.artist !== null ? (
            <Row>
              <Col>
                <Profile artist={this.state.artist} />
                <Album topalbum={this.state.album} />
              </Col>
            </Row>
          ) : null}
        </Container>
        <footer className="copyright">
          Made with{" "}
          <span role="img" aria-label="a laptop computer">
            💻
          </span>
          ,{" "}
          <span role="img" aria-label="a cup of tea">
            ☕
          </span>{" "}
          and{" "}
          <span role="img" aria-label="love">
            ❤️
          </span>{" "}
          by <a href="https://github.com/vinnlee/">Vincent Lee</a>
        </footer>
      </div>
    );
  }
}

export default App;
