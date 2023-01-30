module.exports = {
  async onRelease(data, $) {
    $.verbose = true;
    console.log(data);
    await $.noquote`npm version ${data.nextTag} --no-git-tag-version`;
    await $.noquote`npm publish --access public`;
  },
};
