import React from 'react';

class Footer extends React.Component{

  render (){
    return(
    <React.Fragment>
      <footer className="navbar fixed-bottom p-3 bg-light">
        <div className="container">
          <span className="me-3 text-secondary">Built by Jacob Adili</span>
        </div>
      </footer>
    </React.Fragment>
    );
  }
}

export default Footer;