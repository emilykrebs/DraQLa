import React, { useContext } from 'react';
import { dynamicText, staticText } from '../graphs/helperFunctions'

// import the Context Objects 
import { GeneralContext, URIContext } from '../state/contexts';


export default function URILink({ databaseName }) {
  const { generalDispatch } = useContext(GeneralContext);

  const { codeDispatch, psqlDispatch, mongoDispatch, adviceDispatch } = useContext(URIContext);

  return (
    <div className='URILinkBox'>
      <p>{databaseName} Link</p>
      <input
        type="text"
        className="linkInput"
        id={`${databaseName}Input`}
        placeholder="paste your database link"></input>

      <button className='buttonClass' id='submitbtn' onClick={() => {

        // send inputted URL to server
        const url = document.getElementById(`${databaseName}Input`).value;

        fetch(`/${databaseName.toLowerCase()}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'Application/JSON',
          },
          body: JSON.stringify({
            [`${databaseName.toLowerCase()}URI`]: url,
          }),
        })
          .then(data => data.json())
          .then((data) => {

            // update Code
            codeDispatch({
              type: 'UPDATE_CODE',
              payload: {
                schema: data.schema.types,
                resolver: data.schema.resolvers,
              }
            })

            // update Advice state
            adviceDispatch({
              type: 'UPDATE_ADVICE',
              payload: {
                advice: data.advice,
                dynamicText: dynamicText(data.advice),
                staticText: staticText,
              }
            })

            // update either DB states depending on what server sends back
            if (data.dbName === 'psql') {

              psqlDispatch({
                type: 'UPDATE_D3TABLES',
                payload: data.d3Data
              })
            } else {
              mongoDispatch({
                type: 'UPDATE_D3TABLES',
                payload: data.d3Data
              })
            }
          })
          .catch(e => console.log('error: ', e));

        // to close out URI Modal
        generalDispatch({ type: 'CLOSE_URI_MODAL' })

      }}>
        <span className="noselect">Submit</span>
        <div id="circle"></div>
      </button>
    </div>
  )
};