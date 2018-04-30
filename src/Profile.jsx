import React, { Component } from 'react';
import { Media, Image } from 'react-bootstrap';
import './App.css';

class Profile extends Component {
    render() {
        let artist = {
            name: "",
            bio: { summary: "", content: "" },
            image: [{
                "#text": "",
                "size": "small"
              }, {
                "#text": "",
                "size": "medium"
              }, {
                "#text": "",
                "size": "large"
              }, {
                "#text": "",
                "size": "extralarge"
              }, {
                "#text": "",
                "size": "mega"
              }, {
                "#text": "",
                "size": ""
              }]
        }
        if(this.props.artist !== null) {
            artist = this.props.artist;
        }
        return(
            <div className="result-container">
                <Media className="profile">
                    <Media.Left>
                      <Image src={artist.image[2]['#text']} />
                    </Media.Left>
                    <Media.Body>
                      <Media.Heading>{artist.name}</Media.Heading>
                      <p className="artist-summary" dangerouslySetInnerHTML={{__html: artist.bio.summary}} />
                    </Media.Body>
                </Media>
            </div>
        )
    }
}

export default Profile;