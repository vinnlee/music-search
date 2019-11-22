import React, { Component } from "react";
import { Media, Image } from "react-bootstrap";
import "./App.css";

class Profile extends Component {
  render() {
    let artist = {
      name: "",
      bio: { summary: "", content: "" },
      image: [
        {
          "#text": "",
          size: "small"
        },
        {
          "#text": "",
          size: "medium"
        },
        {
          "#text": "",
          size: "large"
        },
        {
          "#text": "",
          size: "extralarge"
        },
        {
          "#text": "",
          size: "mega"
        },
        {
          "#text": "",
          size: ""
        }
      ]
    };
    if (this.props.artist !== null) {
      artist = this.props.artist;
    }
    return (
      <div className="result-container">
        <Media className="profile">
          <Image
            src={artist.image[2]["#text"]}
            thumbnail
            className="artist-image"
          />
          <Media.Body>
            <h2 className="artist-cover">{artist.name}</h2>
            <p
              className="artist-summary"
              dangerouslySetInnerHTML={{ __html: artist.bio.summary }}
            />
          </Media.Body>
        </Media>
      </div>
    );
  }
}

export default Profile;
