import { Octokit } from '@octokit/action';
import * as simpleGit from 'simple-git';
import * as camelCase from 'camelcase';
import * as AdmZip from 'adm-zip';
import https from 'follow-redirects';
import * as fs from 'fs';
import * as cvInfo from '../../../package.json' assert { type: "json" };;

//
// For local testing run this with the following environment variables set:
// GITHUB_REPOSITORY=CometVisu/CometVisu GITHUB_TOKEN=<your-github-token> GITHUB_ACTION=test node .github/actions/github/index.js <action> <options>
//

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
    this.maxTextLength = 70

    this.__cache = {};
  }

  getVersion() {
    return 'v' + cvInfo.version;
  }

  async getLatestNightlyBuild(key) {
    if (!this.__cache.hasOwnProperty('latest-nightly-release')) {
      console.log(">>> Search latest nightly build for version: " + cvInfo.version);
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

  async getLatestTag(baseVersion) {
    const git = simpleGit();
    if (!baseVersion) {
      baseVersion = this.getVersion();
    }
    const res = await git.raw('for-each-ref', '--format=%(refname)', '--sort=-taggerdate', 'refs/tags');
    const regex = new RegExp(`^refs/tags/${baseVersion}(\\d+)$`);
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
    //console.debug(args);
    const raw = await git.log(args);
    console.log(raw.total, "changes found from", startRef, "to", endRef);
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

  /**
   * Keep only the latest `limit` CometVisu release builds as assets in a release.
   * @param limit {Number} amount of builds to keep
   * @returns {Promise<null>}
   */
  async cleanupAssets(limit) {
    let release
    try {
      release = await this.getLatestNightlyBuild();
    } catch (e) {
      console.log(e.message);
      // no nightly found, nothing to delete
      return;
    }
    const zipBuildAssets =release.assets
      .filter(asset => /^CometVisu-.+\.zip$/.test(asset.name))
      .sort((a, b) => Date.parse(b.updated_at) - Date.parse(a.updated_at));
    const tarBuildAssets =release.assets
      .filter(asset => /^CometVisu-.+\.tar\.gz$/.test(asset.name))
      .sort((a, b) => Date.parse(b.updated_at) - Date.parse(a.updated_at));
    limit = parseInt(limit);
    const releaseVerRegex = new RegExp("^CometVisu-"+release.tag_name+"(\\.tar\\.gz|\\.zip)$")
    const containsLatest = release.assets.some(asset => releaseVerRegex.test(asset.name))
    if (!containsLatest) {
      // current release is no been attached yet, we need to decrease the limit
      limit--
    }
    if (zipBuildAssets.length > limit) {
      for (let i = limit; i < zipBuildAssets.length; i++) {
        console.log("Deleting", zipBuildAssets[i].name, "from", release.name)
        await this.client.request('DELETE /repos/{owner}/{repo}/releases/assets/{assetId}', {
          owner: this.owner,
          repo: this.repo,
          assetId: zipBuildAssets[i].id
        });
      }
    }
    if (tarBuildAssets.length > limit) {
      for (let i = limit; i < tarBuildAssets.length; i++) {
        console.log("Deleting", tarBuildAssets[i].name, "from", release.name)
        await this.client.request('DELETE /repos/{owner}/{repo}/releases/assets/{assetId}', {
          owner: this.owner,
          repo: this.repo,
          assetId: tarBuildAssets[i].id
        });
      }
    }
  }

  /**
   * Download fil (e.g an asset from an release)
   * @param dest {string} path to store the file (including filename)
   * @param url {string} URL to download the file from
   * @returns {Promise<null>}
   */
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


  /**
   * Get title + body from pull request
   * @param pullId {Number} id of the pull request
   * @returns {string}
   */
  async getRequestDescription(pullId) {
    const pr = await this.client.pulls.get({
      owner: 'CometVisu',
      repo: this.repo,
      pull_number: pullId
    });
    let text = pr.data.title ? pr.data.title.trim() : "";
    const body = pr.data.body ? pr.data.body.trim().split("\n").filter(line => !/^s*Signed-off-by:.+$/.test(line)) : []
    if (text.endsWith('…') && body.length > 0 && body[0].startsWith('…')) {
      text = text.substr(0, text.length-1) + body.pop().substr(1).trim();
    }
    return `- [#${pullId}](${pr.data.html_url}) ${text.length > this.maxTextLength ? text.substr(0, this.maxTextLength) + '…' : text} (@${pr.data.user.login})\n`;
  }

  /**
   * Collect information for all pull requests that have been merged since "ref"
   * @param ref {string} Tag or commit SHA
   * @returns {Promise<string>}
   */
  async getMergeInfo(ref) {
    const git = simpleGit();
    const endRef = await git.revparse(['--abbrev-ref', 'HEAD']);
    const out = await git.log(['--merges', `${ref}..${endRef}`]);
    let text = ''
    for (const entry of out.all) {
      const match = /^Merge pull request #([\d]+) from.+$/.exec(entry.message);
      if (match) {
        const info = await this.getRequestDescription(parseInt(match[1]));
        text += info;
      }
    }
    return text
  }

  async increaseBuildTag(start, type, dryRun) {
    if (typeof start === 'string') {
      start = start === 'true';
    } else if (typeof start !== 'boolean') {
      start = false;
    }
    if (!type) {
      type = "nightly";
    }
    if (typeof dryRun === 'string') {
      dryRun = dryRun === 'true';
    } else if (typeof start !== 'boolean') {
      dryRun = false;
    }
    let baseVersion = this.getVersion();
    let latestTag = null;
    let latestRelease = null;
    if (type === 'rc' && baseVersion.endsWith('-dev')) {
      baseVersion = baseVersion.substr(0, baseVersion.indexOf('-dev'));
    }
    if (/.\d+$/.test(baseVersion)) {
      //end with number -> avoid v0.12.01 tags, we want v0.12.0-1
      if (type ==='nightly') {
        baseVersion += "-";
      }
    }
    let useLastRelease = false;
    let currentRelease
    let noMergeInfo = false;
    let force = false;

    switch (type) {
      case "nightly":
        latestTag = await this.getLatestTag(baseVersion);
        break;
      case "rc":
        baseVersion += "-RC";
        latestTag = await this.getLatestTag(baseVersion);
        currentRelease = await this.client.repos.getLatestRelease({
          owner: this.owner,
          repo: this.repo,
        });
        latestRelease = `refs/tags/${currentRelease.data.tag_name}`;
        break;
      case "release":
        currentRelease = await this.client.repos.getLatestRelease({
          owner: this.owner,
          repo: this.repo,
        });
        latestTag = `refs/tags/${currentRelease.data.tag_name}`;
        useLastRelease = true;
        break;
    }


    if (!latestTag) {
      if (!start) {
        core.setFailed(`Need a manual starting tag for ${baseVersion} - aborting`);
        return;
      } else if (type === 'nightly') {
        noMergeInfo = true;
        force = true;
      } else if (!latestRelease) {
        const currentRelease = await this.client.repos.getLatestRelease({
          owner: this.owner,
          repo: this.repo,
        });
        console.log(currentRelease)
        latestTag = `refs/tags/${currentRelease.tag_name}`;
        useLastRelease = true;
      }
    }
    const git = simpleGit();
    let lastTagHash = null;
    if (type === 'rc' && !latestTag) {
      lastTagHash = await git.raw(['rev-list', '-n', '1', latestRelease]);
    } else if (latestTag) {
      lastTagHash = await git.raw(['rev-list', '-n', '1', latestTag]);
    }
    const currentHash = await git.revparse(['HEAD']);

    let buildNo = 0
    let newRev = ''
    if (type === 'release') {
      const parts = baseVersion.split('.');
      buildNo = parseInt(parts.pop());
      baseVersion = parts.join('.') + '.';
      newRev = `${baseVersion}${buildNo}`;
      let tagExists = await git.raw(['tag', '-l', newRev]);
      while (tagExists) {
        buildNo++;
        newRev = `${baseVersion}${buildNo}`;
        tagExists = await git.raw(['tag', '-l', newRev]);
      }
    } else if (!latestTag && type === 'nightly') {
      newRev = baseVersion + "0";
    } else {
      const re = new RegExp(`^${baseVersion}(\\d+)$`)
      const m = type === 'rc' && !latestTag ? re.exec(latestRelease.split('/')[2]) : re.exec(latestTag.split('/')[2]);
      if (!m) {
        if (!start) {
          core.setFailed(`Unable to parse previous tag '${type === 'rc' && !latestTag ? latestRelease.split('/')[2] : latestTag.split('/')[2]}'`);
          return;
        }
      } else {
        buildNo = parseInt(m[1]);
      }
      newRev = `${baseVersion}${buildNo + 1}`;
    }

    if (!force) {
      if (currentHash === lastTagHash) {
        console.log('No new commits - skipping');
        return;
      } else {
        const hasChanges = !latestTag || await this.checkForChanges(latestTag);
        if (!hasChanges) {
          console.log('No changes in source folder - skipping');
          return;
        }
      }

      console.log('New commits detected - tagging new dev release:', newRev);
    }

    const branch = await git.revparse(['--abbrev-ref', 'HEAD']);

    let buildInfo = `
---

Branch       : ${branch}
Commit       : ${currentHash}
`;

    let tagDescription = ""
    let info = ''
    if (!noMergeInfo) {
      if (type === 'rc') {
        if (latestTag) {
          const lastRcChanged = await this.getMergeInfo(latestTag);
          if (lastRcChanged) {
            info += 'Changes since last release candidate (' + latestTag.split('/')[2] + '):\n\n';
            info += lastRcChanged;
            info += '\n\n';
            info += 'Changes since last release (' + latestRelease.split('/')[2] + '):\n\n';
          }
        }
        info += await this.getMergeInfo(latestRelease);
      } else if (!useLastRelease) {
        info += await this.getMergeInfo(latestTag);
      }
    }
    if (info) {
      tagDescription += 'This release comes with these annotated changes:\n\n'
      tagDescription += info
    } else {
      tagDescription += 'This release contains minor fixes or improvements.\n'
    }
    git.addConfig("user.name", process.env.COMMIT_AUTHOR_NAME);
    git.addConfig("user.email", process.env.COMMIT_AUTHOR_EMAIL);

    if (!dryRun) {
      await git.addAnnotatedTag(newRev, tagDescription + buildInfo);
    }

    if (!dryRun) {
      console.log("Pushing tags...");
      await git.pushTags('origin')
      console.log("Creating release...");
    }
    let releaseName = newRev;
    let prerelease = false;
    const draft = false;
    let changes = tagDescription;
      //`The latest changes can be seen in the [change log](https://raw.githubusercontent.com/${this.owner}/${this.repo}/${newRev}/ChangeLog).`;
    let releaseMessage = `
The CometVisu project is happy to publish the version ${newRev} that can be downloaded at
[https://github.com/${this.owner}/${this.repo}/releases/tag/${newRev}](https://github.com/${this.owner}/${this.repo}/releases/tag/${newRev}).

${changes}
`;
    if (baseVersion.endsWith("dev") || type === 'nightly') {
      releaseName = `Nightly build ${newRev}`;
      prerelease = true;
      changes = tagDescription;
      releaseMessage = `
This release contains the most up-to-date nightly builds. Please keep in mind that nightly builds are snapshots of the 
current development status of the CometVisu and that some things might not work as excepted.

The build can be downloaded at:
[https://github.com/${this.owner}/${this.repo}/releases/tag/${newRev}](https://github.com/${this.owner}/${this.repo}/releases/tag/${newRev}).

${changes}
`;
    } else if (baseVersion.endsWith("RC") || type === 'rc') {
      releaseName = `CometVisu release ${baseVersion.substr(0, baseVersion.length - 3)} - release candidate ${newRev.substr(baseVersion.length)}`
      prerelease = true;
    } else if (type === 'release') {
      releaseName = `CometVisu release ${newRev}`
      prerelease = false;
    }

    if (type === 'nightly') {
      let latestNightly = null;
      try {
        latestNightly = await this.getLatestNightlyBuild();
        if (!latestNightly) {
          core.setFailed("No nightly release found");
          return
        }
      } catch (e) {
        console.log(e.message);
      }
      if (!dryRun) {
        if (latestNightly) {
          await this.client.repos.updateRelease({
            owner: this.owner,
            repo: this.repo,
            tag_name: newRev,
            name: releaseName,
            body: releaseMessage,
            release_id: latestNightly.id
          });
        } else {
          await this.client.repos.createRelease({
            owner: this.owner,
            repo: this.repo,
            tag_name: newRev,
            name: releaseName,
            body: releaseMessage,
            draft: draft,
            prerelease: prerelease
          });
        }
        return "refs/tags/"+ newRev;
      } else {
        if (latestNightly) {
          console.log(`would have updated release '${releaseName}' (${latestNightly.id}) from '${latestNightly.tag_name}' to '${newRev}'\n\n${releaseMessage}`);
        } else {
          console.log(`would have created release '${releaseName}' to '${newRev}'\n\n${releaseMessage}`);
        }
      }
    } else {
      if (!dryRun) {
        await this.client.repos.createRelease({
          owner: this.owner,
          repo: this.repo,
          tag_name: newRev,
          name: releaseName,
          body: releaseMessage,
          draft: draft,
          prerelease: prerelease
        });
        return "refs/tags/"+ newRev;
      } else {
        console.log(`would have created new git release '${releaseName}' from tag '${newRev}', prerelease=${prerelease}\n\n${releaseMessage}`);
      }
    }
    return "";
  }

  async triggerBuild(ref) {
    if (ref) {
      console.log("running build_release for ref", ref);

      // build nightly and deploy it to github
      await this.client.actions.createWorkflowDispatch({
        owner: this.owner,
        repo: this.repo,
        workflow_id: "build_release.yml",
        ref: ref
      });
      // delete old nightlies
      await this.client.actions.createWorkflowDispatch({
        owner: this.owner,
        repo: this.repo,
        workflow_id: "cleanup_nightly.yml",
        ref: ref
      });

      // build nightly and deploy it to sentry + docker
      await this.client.actions.createWorkflowDispatch({
        owner: this.owner,
        repo: this.repo,
        workflow_id: "main.yml",
        ref: ref
      });
    }
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
