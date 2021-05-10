#!/usr/bin/env node
const {program} = require("commander");
const {version} = require("../package.json");
const {createProject} = require('..');
const ora = require('ora');
// 创建命令的数据结构
const commanderActions = {
    create: {
        alias: 'crt',
        description: '创建react项目',
        examples: ['hsy create|crt <projectName>'],
    },
    // config: {
    //     alias: 'cfg',
    //     description: '配置项目',
    //     examples: [
    //         'hsy config|cfg set <k> <val>',
    //         'hsy config|cfg get <k>',
    //     ],
    // },
}

// 遍历添加命令
Object.keys(commanderActions).forEach(action => {
    const commanderInfo = commanderActions[action];
    program
        .command(action)
        .alias(commanderInfo.alias)
        .description(commanderInfo.description)
        .action(() => {
            if (action === 'create' || action === 'crt') {
                const spinner = ora('')
                if (process.argv.slice(3).length === 0) {
                    spinner.fail("请输入项目名称")
                    return
                }
                if (process.argv.slice(3).length > 1) {
                    spinner.fail("项目名称只允许输入一个")
                    return
                }
                const projectName = process.argv.slice(3)[0];
                createProject(projectName);
            }
        })
})

// 监听--help命令
program.on('--help', () => {
    console.log('Examples: ')
    Object.keys(commanderActions).forEach(action => {
        const commanderInfo = commanderActions[action];
        commanderInfo.examples.forEach(item => {
            console.log("  " + item)
        })
    })
})

// 将新增的命令弄到类似于帮助文档中
program.version(version).parse(process.argv);