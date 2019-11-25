import React, { Component } from "react";
import { Row, Col, Figure } from "react-bootstrap";
import "./App.css";
import notfound from "./images/notfound.png";

class Album extends Component {
  render() {
    const { topalbum } = this.props;
    return (
      <div className="top-albums">
        <h3 className="album-title">The Hottest Albums of this singer</h3>
        <Row className="albums-list">
          {topalbum
            .filter(album => album.name !== "(null)")
            .map((album, index) => {
              let albumImage =
                album.image[3]["#text"] !== ""
                  ? "https://lastfm-img2.akamaized.net/i/u/400x400/" +
                    album.image[3]["#text"].split("/").pop()
                  : notfound;
              return (
                <Col xs={6} md={4} key={index}>
                  <a
                    href={album.url}
                    target="_blank"
                    className="albums-list-item"
                    rel="noopener noreferrer"
                  >
                    <Figure>
                      <Figure.Image src={albumImage} alt={album.name} />
                      <Figure.Caption style={{ textAlign: "center" }}>
                        {album.name}
                      </Figure.Caption>
                    </Figure>
                  </a>
                </Col>
              );
            })}
        </Row>
      </div>
    );
  }
}

export default Album;
