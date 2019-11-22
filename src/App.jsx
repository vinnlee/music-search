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
import Profile from "./Profile";
import Album from "./Album";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      hideSearchList: true,
      keyword: null,
      artist: null,
      album: []
    };
  }

  search() {
    const ROOT_URL = "https://ws.audioscrobbler.com/2.0/";
    const API_KEY = process.env.REACT_APP_SECRET_API_KEY;
    const SEARCH_ARTIST = "artist.search";
    const GET_ARTIST = "artist.getinfo";
    const GET_ALBUM = "artist.gettopalbums";

    let artist_search_result = `${ROOT_URL}?method=${SEARCH_ARTIST}&artist=${this.state.query}&api_key=${API_KEY}&format=json`;

    fetch(artist_search_result, { method: "GET" })
      .then(response => response.json())
      .then(result => {
        const { results } = result;
        this.setState({ keyword: results.artistmatches.artist[0].name });

        let artist_info = `${ROOT_URL}?method=${GET_ARTIST}&artist=${this.state.keyword}&api_key=${API_KEY}&format=json`;
        let album_info = `${ROOT_URL}?method=${GET_ALBUM}&artist=${this.state.keyword}&api_key=${API_KEY}&limit=30&format=json`;

        fetch(artist_info, { method: "GET" })
          .then(response => response.json())
          .then(result => {
            const { artist } = result;
            this.setState({ artist });
            fetch(album_info, { method: "GET" })
              .then(response => response.json())
              .then(result => {
                const { album } = result.topalbums;
                this.setState({ album });
              });
          });
      });
  }

  render() {
    return (
      <div className="app">
        <Container>
          <h3 className="app-title">Music Search</h3>
          <Row>
            <Col>
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
                      }
                    }}
                    onFocus={() => {
                      this.setState({ hideSearchList: false });
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
