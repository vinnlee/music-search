import React, { Component } from 'react';
import { Grid, Row, Col, Thumbnail } from 'react-bootstrap';
import './App.css';

class Album extends Component {
    render() {
        const { topalbum } = this.props;
        return(
            <Grid className="top-albums">
                <h3 className="album-title">The Hottest Albums of this singer</h3>
                <Row className="albums-list">
            {
                topalbum.filter((album, index) => {
                    return album.name !== "(null)";
                }).map((album, index) => {
                    let albumImage = (album.image[3]['#text'] !== "") ? "https://lastfm-img2.akamaized.net/i/u/400x400/" + album.image[3]['#text'].split('/').pop() : "https://via.placeholder.com/400x400?text=Image+Not+Found";
                    return(
                        <Col xs={6} md={4} key={index}>
                            <Thumbnail src={albumImage} alt="" href={album.url} className="album-card" target="_blank">
                                {album.name}
                            </Thumbnail>
                        </Col>
                    )
                })
            }
                </Row>
            </Grid>
        )
    }
}

export default Album;