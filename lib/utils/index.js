const axios = require('axios');
const path = require('path');
const fs = require('fs');
const {promisify} = require('util');
const ora = require("ora");
const chalk = require('chalk');

let downloadGitRepo = require('download-git-repo');
downloadGitRepo = promisify(downloadGitRepo);

const token = "123456-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-123456";
const tokenResult = token.split("-")[1];

const headers = {"Authorization": "token " + tokenResult};
const githubUserName = 'edc-hui';



/**
 * 通过github用户名获取该用户所有的仓库
 */
const getAllRepositories = () => {
    return axios.get(`https://api.github.com/users/${githubUserName}/repos`, {
        headers
    })
}

/**
 * 获取指定仓库的详细信息
 */
const getRepositoriesDetail = (repoName = '') => {
    return axios.get(`https://api.github.com/repos/${githubUserName}/${repoName}/tags`, {
        headers
    })
}

/**
 * 下载github远程仓库
 * @param repoName  远程仓库名
 * @param tag  远程仓库的版本
 */
const downLoadRemoteRepository = async (repoName = '', tag = '') => {
    const cachePath = `${process.env[process.platform === 'win32' ? 'USERPROFILE' : 'HOME']}/.tmp`;
    let api = `${githubUserName}/${repoName}`;
    if (tag) {
        api += `#/${tag}`;
    } else {
        api += `#main`;
    }
    // console.log(api)
    const cacheDir = tag ? path.resolve(cachePath, repoName, tag) : path.resolve(cachePath, repoName);
    if (!fs.existsSync(cacheDir)) {
        const spinner = ora(chalk.green('正在拉取远程模板，请稍候...'))
        spinner.start();
        // await downloadGitRepo(api, cacheDir,{ clone: true },(err)=>{
        const result = await downloadGitRepo(api, cacheDir);
        spinner.succeed(chalk.green('拉取成功'))
    }
    return cacheDir;
}

module.exports = {
    getAllRepositories,
    getRepositoriesDetail,
    downLoadRemoteRepository
}
