import React, { Component } from 'react';
import { Col, Thumbnail } from 'react-bootstrap';
import './App.css';

class Album extends Component {
    render() {
        const { topalbum } = this.props;
        return(
            <div className="top-albums">
                <h3 className="album-title">The Hottest Albums of this singer</h3>
            {
                topalbum.map((album, index) => {
                    let albumImage = (album.image[3]['#text'] !== "") ? album.image[3]['#text'] : "https://via.placeholder.com/300x300?text=Image+Not+Found";
                    return(
                        <Col xs={6} md={4} key={index}>
                            <Thumbnail src={albumImage} alt="" href={album.url} className="album-card">
                                <p>{album.name}</p>
                            </Thumbnail>
                        </Col>
                    )
                })
            }
            </div>
        )
    }
}

export default Album;