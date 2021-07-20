import React from 'react';

import Header from 'components/common/Header/Header';
import Footer from 'components/common/Footer/Footer';

const withLayout = (WrappedComponent, disableHeader, disableFooter) => {
  const Layout = props => (
    <div className="layout">
      {!disableHeader && <Header {...props} />}
      <WrappedComponent {...props} />
      {!disableFooter && <Footer />}
    </div>
  );

  return Layout;
};

export default withLayout;
