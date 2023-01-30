module.exports = {
  async onRelease(data, $) {
    $.verbose = true;
    await $.noquote`npm version ${data.nextTag} --no-git-tag-version`;
    await $.noquote`npm publish`;
  },
};
