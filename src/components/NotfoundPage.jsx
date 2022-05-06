import React from 'react';

const divStyle = {
  width: '65%',
  height: '75%',
  position: 'fixed',
  display: 'flex',
  'align-items': 'center',
  'align-content': 'center',
  'justify-content': 'center',
  overflow: 'auto',
};

const h3Style = {
  'font-size': '100px',
};

function NoMatchPage() {
  return (
    <div style={divStyle}>
      <h3 style={h3Style}>404 - Not found</h3>
    </div>
  );
}

function Notfound() {
  return NoMatchPage();
}

export default Notfound;
