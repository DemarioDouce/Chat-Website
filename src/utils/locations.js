const generateLocation = (url) => {
  return {
    url,
    createdAt: new Date().getTime(),
  };
};

module.exports = {
  generateLocation,
};
