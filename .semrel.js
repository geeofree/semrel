module.exports = {
  async onRelease(data, $) {
    $.verbose = true;
    await $.noquote`npm version ${data.nextVersion} --no-git-tag-version`;
    await $.noquote`npm publish --access public`;
  },
};
