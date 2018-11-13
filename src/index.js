import { connect } from 'react-redux';

module.exports = { inject };

const throwError = (modelName) => {
  throw new Error(`Rematch injector: Model ${modelName} is not available in store!`);
};

const mapState = modelNames => (state) => {
  let mapped = {};
  modelNames.forEach((modelName) => {
    if (!(modelName in state)) {
      throwError(modelName);
    }
    mapped[modelName] = state[modelName];
  });
  return mapped;
};

const mapDispatch = modelNames => (state) => {
  let mapped = {};
  modelNames.forEach((modelName) => {
    mapped = Object.assign({}, mapped, state[modelName]);
  });
  return mapped;
};

/**
 * Inject rematch models to React component
 */
function inject(...modelNames) {
  if (typeof modelNames[0] === 'function') {
    return component => connect(modelNames[0], modelNames[1])(component);
  }
  return component => connect(mapState(modelNames), mapDispatch(modelNames))(component);
}
