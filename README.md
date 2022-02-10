# 吊篮百事通

English | [简体中文](./README-zh.md)


> 这是一个 吊篮百事通 管理后台。

**Live demo:** [](http://dl.chi86.com:3100/#/dashboard)

## Build Setup

```bash
# clone the project
git clone https://github.com/weisong110012/dlzj-background.git

# enter the project directory
cd dlzj-background

# install dependency
npm install

# develop
npm run dev
```

This will automatically open http://localhost:9528

## Build

```bash
# build for test environment
npm run build:stage

# build for production environment
npm run build:prod
```

## Advanced

```bash
# preview the release environment effect
npm run preview

# preview the release environment effect + static resource analysis
npm run preview -- --report

# code format check
npm run lint

# code format check and auto fix
npm run lint -- --fix
```