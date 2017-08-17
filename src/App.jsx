import React, { Component } from 'react';
import './App.css';
import { FormGroup, FormControl, InputGroup, Glyphicon, Grid } from 'react-bootstrap';
import Profile from './Profile';
import Album from './Album';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            query: "",
            artist: null,
            album: []
        }
    }

    search() {
        const ROOT_URL = "http://ws.audioscrobbler.com/2.0/";
        const API_KEY  = "4f252d962d0d150de60957d3e904dc27";
        const GET_ARTIST = "artist.getinfo";
        const GET_ALBUM = "artist.gettopalbums";
        
        let artist_info = `${ROOT_URL}?method=${GET_ARTIST}&artist=${this.state.query}&api_key=${API_KEY}&format=json`;
        let album_info = `${ROOT_URL}?method=${GET_ALBUM}&artist=${this.state.query}&api_key=${API_KEY}&limit=30&format=json`;

        fetch(artist_info, {
            method: "GET"
        })
        .then(response => response.json())
        .then(result => {
            const artist = result.artist; // artist = result.artist
            this.setState({artist});
            fetch(album_info, {
                method: "GET"
            })
            .then(response => response.json())
            .then(result => {
                const { album } = result.topalbums;
                this.setState({album});
            })
        });
    }

    render() {
        return (
            <div className="app">
                <Grid>
                    <h3 className="app-title">Music Search</h3>
                    <FormGroup>
                        <InputGroup>
                            <FormControl
                                type="text"
                                placeholder="Search the artist..."
                                value={this.state.query}
                                onChange={event => {this.setState({ query: event.target.value })}}
                                onKeyPress={event => {
                                    if(event.key === "Enter") {
                                        this.search()
                                    }
                                }}
                            />
                            <InputGroup.Addon onClick={ () => this.search() }>
                                <Glyphicon glyph="search"></Glyphicon>
                            </InputGroup.Addon>
                        </InputGroup>
                    </FormGroup>
                    {
                        this.state.artist !== null
                        ?
                        <div>
                            <Profile artist={this.state.artist} />
                            <Album topalbum={this.state.album} />
                        </div>
                        :
                        <div></div>
                    }
                </Grid>
            </div>
        )
    }
}

export default App;