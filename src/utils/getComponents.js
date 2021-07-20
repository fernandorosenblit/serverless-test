// Inspiration taken from: https://medium.com/@dschnr/better-reusable-react-components-with-the-overrides-pattern-9eca2339f646

/**
 * @description Helper function used to unpack the overrides and merge them in with the set of default styled components.
 * @param {*} defaultComponents
 * @param {*} overrides
 */
export default function getComponents(defaultComponents, overrides = {}) {
  return Object.keys(defaultComponents).reduce((acc, name) => {
    const { component, ...props } = overrides[name] || {};

    acc[name] = {
      component: component || defaultComponents[name],
      props
    };

    return acc;
  }, {});
}
