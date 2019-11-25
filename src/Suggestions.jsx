import React from "react";
import { ListGroup } from "react-bootstrap";

function Suggestions(props) {
  const result = props.result.map((artist, index) => (
    <ListGroup.Item
      variant="light"
      key={index}
      action
      onClick={() => props.onSelectItem(artist.name)}
    >
      {artist.name}
    </ListGroup.Item>
  ));
  return <ListGroup className="suggestion-list">{result}</ListGroup>;
}

export default Suggestions;
