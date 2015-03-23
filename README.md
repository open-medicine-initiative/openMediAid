# OpenMediAid - Crowd Wisdom Meets Open Medicine 


This is the development page of OpenMediAid. For more information about the project please visit [openmediaid.org](http://www.openmediaid.org).

This repository tries to be self-explanatory with README.md files which are added to the most important parts.

# Development


## Project layout
  * backend: Backend code used to run the REST api and other server side processing
  * frontend: Frontend code that makes up the html5 web app
  * target: The artifacts produced be the build system (web app, jsdoc site, code reports)
  are generated into this folder

## Setup

* Prerequisites: Installation of basic software packages (see package.json for required node.js version)
  *  Install git, node.js and npm
  *  Create a symlink such that `node` points to `nodejs` (required for compatibility of some plugins )
    * Users of Ubuntu just install nodejs-legacy `sudo apt-get install nodejs-legacy` 
    * Otherwise use `whereis nodejs`to find location of your nodejs binary (e.g. /usr/bin/nodejs). 
    Set a symlink `ln -s /usr/bin/nodejs /usr/bin/node`
  *  Install gulp and bower globally: `sudo npm install -g gulp bower`
  *  Install karma client globally for convenience `sudo npm install -g karma-cli`
* Setting up the OpenMediAid project  
  *  Clone the OpenMediAid repository: `git clone https://github.com/open-medicine-initiative/openMediAid`
  *  Frontend
    * Change to the root directory of the frontend code: `cd frontend`
    *  Install projects npm dependencies: `npm install`
    *  Install projects bower dependencies: `bower install`
    *  Run default build `gulp` to generate the web app.
    *  Run `gulp devmode` to fire up a local webserver. Visit the site on `localhost:8000`

[WIP]

## Conventions

### Commit messages

The general pattern for commit messages is
`intent(component): message`

* intents: fix,feature,refactor,doc,misc
* components: build,app


Examples: `fix(doc): corrected typo in ...` `feature(build): added lint validation for build scripts`


### License
 
Something like MIT but has yet to be decided
