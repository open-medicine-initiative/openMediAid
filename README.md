Medium - Social Healthshare
======
> [Medium](https://github.com/mediumorg/medium/wiki) is a crowd-sourced, open medicine platform aiming to help patients find appropriate diagnoses and effective treatments more quickly. Based on the comparison of medical records it identifies progress made by individuals and distributes their discoveries to users with similar profiles. 

> Statistical information extracted from large sets of profiles is combined with established medical knowledge in order to generate suggestions about causes for symptoms and possible treatments.  

This page provides information mainly for developers. If you don't know what the [goal](https://github.com/mediumorg/medium/wiki/How-it-works) of this project is, [how it works](https://github.com/mediumorg/medium/wiki/How-it-works) and how to contribute please be referred to the [wiki](https://github.com/mediumorg/medium/wiki)


# Development
[WIP]

## Setup

* Install node.js and npm
* Checkout repository: `git clone https://github.com/mediumorg/medium`
* Change to the root directory where the code resides: `cd code`
* Ensure that `node` points to `nodejs` for compatibility of some plugins (set a symlink)
* Install gulp and bower globally: `npm install -g gulp bower`
* Install npm dependencies: `npm install`
* Install bower dependencies: `bower install`
* Run default build `gulp`

[WIP]

## The build process

[WIP]


## Project layout

* /build
  * /jsdoc
  * /tasks
* /src
  * /app
  * /components
* /test
* /dist

[WIP]

## Conventions

### Commit messages

The general pattern for commit messages is
`intent(component): message`

intents: fix,feature,refactor,doc,misc

components: build,app,medmod

Examples `fix(doc): corrected typo in ...` `feature(build): added lint validation for build scripts`


### License
 
 Something like MIT but has yet to be decided
