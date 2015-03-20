# OpenMediAid - Crowd Wisdom Meets Open Medicine 


This is the development page of OpenMediAid. For more information about the project please visit [openmediaid.org](http://www.openmediaid.org).

This repository tries to be self-explanatory with README.md files which are added to the most important parts.

# Development
[WIP]

## Setup

* Prerequisites: Installation of basic software packages
  *  Install git, node.js and npm
  *  Ensure that `node` points to `nodejs` for compatibility of some plugins (set a symlink)
  *  Install gulp and bower globally: `sudo npm install -g gulp bower`
  *  Install karma client globally for convenience `sudo npm install -g karma-cli`
* Setting up the OpenMediAid project  
  *  Clone the OpenMediAid repository: `git clone https://github.com/open-medicine-initiative/openMediAid`
  *  Change to the root directory of the frontend code: `cd frontend`
  *  Install projects npm dependencies: `npm install`
  *  Install projects bower dependencies: `bower install`
  *  Run default build `gulp`

[WIP]

## Conventions

### Commit messages

The general pattern for commit messages is
`intent(component): message`

intents: fix,feature,refactor,doc,misc

components: build,app

Examples `fix(doc): corrected typo in ...` `feature(build): added lint validation for build scripts`


### License
 
Something like MIT but has yet to be decided
