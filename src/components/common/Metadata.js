import React from 'react';
import Helmet from 'react-helmet';
import { shape, string } from 'prop-types';

const Metadata = ({ fallbackTitle, metadata, canonicalUrl }) => {
  if (!metadata) {
    return <Helmet title={fallbackTitle} />;
  }

  const meta = [];
  if (metadata.description) {
    meta.push({ name: 'description', content: metadata.description });
  }
  if (metadata.keywords) {
    meta.push({ name: 'keywords', content: metadata.keywords });
  }

  return (
    <Helmet
      title={metadata.title || fallbackTitle}
      meta={meta}
      link={canonicalUrl ? [{ href: canonicalUrl, rel: 'canonical' }] : []}
    />
  );
};

Metadata.propTypes = {
  fallbackTitle: string,
  metadata: shape({
    title: string,
    description: string,
    keywords: string
  }),
  canonicalUrl: string
};

export default Metadata;
