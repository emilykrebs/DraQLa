import React from 'react';

export default function aboutContainer() {
  return (
    <div id='about'>
      <div className='aboutFlexItem'>
        <img src='../assets/story.png'></img>
        <h3>Your Story</h3>
        <p>You are seeking an upgrade from your REST API framework to GraphQL but the evolution seems daunting.</p>
      </div>
      <div className='aboutFlexItem'>
        <img src='../assets/idea.png'></img>
        <h3>Our Vision</h3>
        <p>DraQLA is a GraphQL migration assistance tool that empowers developers to build GraphQL schemas, without writing any code.</p>
      </div>
      <div className='aboutFlexItem'>
        <img id='feature' src='../assets/logoclear.png'></img>
        <h3>Features</h3>
        <p>
          GENERATE <br></br>
          ADVISE <br></br>
          TEST <br></br>
          PLAY <br></br>
        </p>
      </div>
    </div>
  );
}
