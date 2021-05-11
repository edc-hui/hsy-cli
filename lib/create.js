const inquirer = require('inquirer');
const ncp = require('ncp');
const chalk = require("chalk");
const {getRepositoriesDetail, downLoadRemoteRepository} = require('./utils')
// const {spawnYarnCommand} = require("./utils/terminal");
module.exports = async function (projectName) {
    const reactTemplate = [
        'js语法模板',
        'ts语法模板',
    ];

    // 命令行询问选择哪个模板
    const inquirerTemplate = [
        {
            type: 'list',
            name: 'templateReact',
            message: '请选择项目模板',
            choices: reactTemplate
        }
    ];

    const {templateReact} = await inquirer.prompt(inquirerTemplate);

    let repoName;
    if (templateReact === 'js语法模板') {
        repoName = 'react-project-template-js';
    }

    if (templateReact === 'ts语法模板') {
        repoName = 'react-project-template-ts';
    }

    // 查询远程仓库是否有多个tag
    const {data} = await getRepositoriesDetail(repoName);
    let cacheDir; //缓存的目录
    if (data.length === 0) { // 说明没有其他版本  直接下载
        cacheDir = await downLoadRemoteRepository(repoName);
    } else {
        // 命令行询问选择模板的哪个tag
        const quesTag = [
            {
                type: 'list',
                name: 'tmpTag',
                message: '选择指定版本',
                choices: data.map(item => item.name)
            }
        ]
        const {tmpTag} = await inquirer.prompt(quesTag);
        cacheDir = await downLoadRemoteRepository(repoName, tmpTag);
    }

    // 下载模板成功之后，生成本地项目
    ncp(cacheDir, projectName);

    console.log(chalk.green(`创建成功，进入${projectName}，运行yarn，安装依赖`))

    // 执行yarn 安装依赖
    // await spawnYarnCommand(projectName);
}