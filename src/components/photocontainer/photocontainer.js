import React from 'react';
import Photo from './photo';
import NotFound from './notfound';

const PhotoContainer = props => {

    const loading = props.loading;
    const results = props.data;
    let photos;
    let loadingContent;

    if (loading === true) {
        loadingContent = <p>Loading...</p>;
    }
    else if (results.length > 0) {
        photos = results.map(photo => <Photo
            src={`https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`}
            key={photo.id}
        />);
    } else {
        photos = <NotFound />
    }

    return (
        <div className="photo-container">
            <h2>Results</h2>
            {loadingContent}
            <ul>
                {photos}
            </ul>
        </div>
    );
}

export default PhotoContainer;
