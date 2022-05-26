import React from 'react';
import { useTranslation } from 'react-i18next';

const divStyle = {
  width: '100%',
  height: '90%',
  position: 'fixed',
  top: '50px',
  left: '0',
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
  const { t } = useTranslation();
  return (
    <div style={divStyle}>
      <h3 style={h3Style}>{t('notFound')}</h3>
    </div>
  );
}

function Notfound() {
  return NoMatchPage();
}

export default Notfound;
