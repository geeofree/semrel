module.exports = {
  async onRelease(data, $) {
    $.verbose = true;
    await $.noquote`npm publish -t ${data.nextTag} --dry-run`;
  },
};
