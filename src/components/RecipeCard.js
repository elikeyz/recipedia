import React from 'react';
import { Card, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

function RecipeCard({
  recipe: {
    image_url: imageUrl, title, image_url: sourceUrl, f2f_url: f2fUrl, publisher,
  },
}) {
  return (
    <Card>
      <Card.Img variant="top" src={imageUrl} alt={title} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>
          <a href={sourceUrl} target="_blank" rel="noopener noreferrer">
            Published by
            {' '}
            {publisher}
          </a>

        </Card.Text>
        <Button href={f2fUrl} target="_blank" rel="noopener noreferrer" className="btn-block" variant="dark">View on Food2Fork</Button>
      </Card.Body>
    </Card>
  );
}

RecipeCard.propTypes = {
  recipe: PropTypes.shape({
    image_url: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    source_url: PropTypes.string.isRequired,
    f2f_url: PropTypes.string.isRequired,
    publisher: PropTypes.string.isRequired,
  }).isRequired,
};

export default RecipeCard;
