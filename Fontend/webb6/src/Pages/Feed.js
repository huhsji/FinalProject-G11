import React from 'react';
import Share from './share';
import PostsList from './PostsList';

function Feed() {
  return (
    <div className="feed" style={{ 
      backgroundColor: 'white', 
      minHeight: '100vh',
      position: 'relative',
      zIndex: 1 
    }}>
      <div className="feedWrapper" style={{ padding: '20px' }}>
        <Share />
        <PostsList />
      </div>
    </div>
  );
}

export default Feed;