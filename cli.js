#!/usr/bin/env node

const inquirer = require('inquirer');
const path = require('path');
const fs = require('fs');
const ejs = require('ejs')
inquirer.prompt([
    {
        type: 'input',
        name: 'projectName',
        message: '请输入项目名称'
    }
]).then(answer => {
    const templateDir = path.join(__dirname, 'templates');
    const targetDir = process.cwd();
    fs.readdir(templateDir, (err, files) => {
        if (err) throw new Error(err)
        files.forEach(file => {
            ejs.renderFile(path.join(templateDir, file), answer, (err, result) => {
                fs.writeFileSync(path.join(targetDir, file), result)
            })
        })
    })
})