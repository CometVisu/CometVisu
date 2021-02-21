const { Octokit } = require('@octokit/action');
const simpleGit = require('simple-git');
const camelCase = require('camelcase');
const AdmZip = require('adm-zip');
const https = require('follow-redirects').https;
const fs = require('fs');
const cvInfo = require('../../../package.json');

let core = {
  getInput(name) {
    const myArgs = process.argv.slice(2);
    switch (name) {
      case 'action':
        return myArgs[0];

      case 'options':
        return myArgs.slice(1);
    }
  },

  setOutput(name, data) {
    console.log(name + ":");
    console.log(data);
  },

  setFailed(message) {
    console.error("###########################################");
    console.error("Error: ");
    console.error(message);
    console.error("###########################################");
  }
}
try {
  if (process.env.GITHUB_EVENT_NAME) {
    core = require('@actions/core');
  }
} catch (e) {
  console.log("! - not in action context")
}

class GithubClient {
  constructor() {
    this.client = new Octokit();
    const [owner, repo] = process.env.GITHUB_REPOSITORY.split("/");
    this.owner = owner;
    this.repo = repo;
    this.versionRegex = new RegExp(`^${this.getVersion()}([0-9]+)$`, 'g');

    this.__cache = {};
  }

  getVersion() {
    return 'v' + cvInfo.version;
  }

  async getLatestNightlyBuild(key) {
    console.log(">>> Search latest nightly build for version: " + cvInfo.version);
    if (!this.__cache.hasOwnProperty('latest-nightly-release')) {
      const {data} = await this.client.request('GET /repos/{owner}/{repo}/releases', {
        owner: this.owner,
        repo: this.repo
      });
      const releases = data
        .filter(release => release.prerelease === true && this.versionRegex.test(release.tag_name))
        .sort((a, b) => {
          const leftDate = Date.parse(a.published_at);
          const rightDate = Date.parse(b.published_at);
          return rightDate - leftDate;
        });

      if (releases.length === 0) {
        throw new Error("No nightly build found for version: " + cvInfo.version)
      }
      this.__cache['latest-nightly-release'] = releases[0];
    }
    const release = this.__cache['latest-nightly-release'];
    if (key) {
      if (release.hasOwnProperty(key)) {
        return release[key];
      } else {
        core.setFailed(key + ' not found in result');
      }
    } else {
      return release;
    }
  }

  async getLatestTag() {
    const git = simpleGit();
    const res = await git.raw('for-each-ref', '--format=%(refname)', '--sort=-taggerdate', 'refs/tags');
    const regex = new RegExp(`^refs/tags/${this.getVersion()}(\\d+)$`);
    let tag = null;
    res.split('\n').some( line => {
      if (regex.test(line)) {
        tag = line;
        return true;
      }
    });
    return tag;
  }

  async checkForChanges(startRef, path) {
    const git = simpleGit();
    if (!startRef) {
      startRef = this.getLatestTag();
    } else if (startRef === 'asset') {
      // Special mode, use commit sha from latest CometVisu build in the release assets
      let lastBuildRev = await this.getCommitShaFromZip();
      // as fallback when not asset (or no one with a REV file int it) is found use the releases tag
      startRef = lastBuildRev ? lastBuildRev : await this.getLatestNightlyBuild('tag_name');
    }
    const endRef = await git.revparse(['--abbrev-ref', 'HEAD']);
    const args = {
      from: startRef,
      to: endRef,
      file: path,
      splitter: '\n',
      multiLine: true,
      symmetric: false
    }
    console.debug(args);
    const raw = await git.log(args);
    console.log(raw.total, "changes found");
    return raw.total > 0;
  }

  async getCommitShaFromZip() {
    const release = await this.getLatestNightlyBuild();
    // filter + order assets
    const zips = release.assets
      .filter(asset => /^CometVisu-.+\.zip$/.test(asset.name))
      .sort((a, b) => Date.parse(b.updated_at) - Date.parse(a.updated_at));

    if (zips.length > 0) {
      const zipAsset = zips[0];
      const dest = '/tmp/' + zipAsset.name;
      if (!fs.existsSync(dest)) {
        await this.download(dest, zipAsset.browser_download_url);
      }
      if (fs.existsSync(dest)) {
        const file = new AdmZip(dest);
        const zipEntries = file.getEntries();
        let revision = null;
        zipEntries.some((zipEntry)  => {
          if (zipEntry.entryName === 'cometvisu/release/REV') {
            revision = zipEntry.getData().toString('utf8');
            return true;
          }
        });
        return revision;
      }
    }

    return null;
  }

  async cleanupAssets(limit) {
    const release = await this.getLatestNightlyBuild();
    const zipBuildAssets =release.assets
      .filter(asset => /^CometVisu-.+\.zip$/.test(asset.name))
      .sort((a, b) => Date.parse(b.updated_at) - Date.parse(a.updated_at));
    const tarBuildAssets =release.assets
      .filter(asset => /^CometVisu-.+\.tar\.gz$/.test(asset.name))
      .sort((a, b) => Date.parse(b.updated_at) - Date.parse(a.updated_at));
    limit = parseInt(limit);
    if (zipBuildAssets.length > limit) {
      for (let i = limit; i < zipBuildAssets.length; i++) {
        await this.client.request('DELETE /repos/{owner}/{repo}/releases/assets/{assetId}', {
          owner: this.owner,
          repo: this.repo,
          assetId: zipBuildAssets[i].id
        });
        console.log("Deleting", zipBuildAssets[i].name)
      }
    }
    if (tarBuildAssets.length > limit) {
      for (let i = limit; i < tarBuildAssets.length; i++) {
        await this.client.request('DELETE /repos/{owner}/{repo}/releases/assets/{assetId}', {
          owner: this.owner,
          repo: this.repo,
          assetId: tarBuildAssets[i].id
        });
        console.log("Deleting", tarBuildAssets[i].name)
      }
    }
  }

  async download(dest, url) {
    const file = fs.createWriteStream(dest);
    return new Promise((resolve, reject) => {
      https.get(url, function(response) {
        response.pipe(file);
        file.on('finish', async function() {
          file.close(resolve);
        });
      }).on('error', function(err) { // Handle errors
        fs.unlink(dest);
        reject(err);
      });
    });
  }
}

(async () => {
  try {
    const action = core.getInput('action');
    let options = core.getInput('options');
    const gh = new GithubClient();
    const method = camelCase(action);
    if (typeof gh[method] === 'function') {
      if (typeof options === 'string') {
        options = options.split(" ");
      } else if (!Array.isArray(options)) {
        options = [options];
      }
      const result = await gh[method](...options);
      core.setOutput("result", result);
    } else {
      core.setFailed('unknown action: ' + action);
    }

  } catch (error) {
    core.setFailed(error.message);
  }
})();