# Workflow

Documentation of workflow that should be implemented by all members of Hake me Mapi

## Gitflow

### Branches

#### Master

The master branch, or production branch, is the version of our project that is available to our client. When anything is pushed to master on github, Travis CI pushes it automatically to Heroku, if acceptance tests are passing.

Ideally only push to master at the end of each sprint, with new acceptance tests.

All config files should be configured on the master branch to use camdenmaps.herokuapp ... url 


#### Dev

The development branch is our default branch on github. It is the branch we do most of the pull requests and merging to. Also, all new branches should be made from the development branch.

All config files should be configured for localhost.


#### Feature branches

Feature branches are mostly for when we are working remotely. For example if you are working on a ticket "add search again button"
your feature branch name would be searchagainbutton and you will continue to work on that branch until that feature is complete. Then pull request to dev.


#### Working branches

Working branches should be used by everyone. Instead of working directly on the dev branch, or on a feature branch. all coding locally is done on your own specifically named working branch. Once you are done on that aspect of the project then merge request



## Sass

The main.scss file should include nothing but @imports for your partial files. All styling should be in those partials.

All partials should be in organised files based on the FAC style guide. In this project we have base, components, helpers and layout.

#### Base

_reset.scss
used for basic styling for tags that apply to your whole project. Can be substituted for normalise.

_colours.scss
Used for all our colour variables and mixins

_typography
Used for typography variables and mixins

#### Components

Own sass partial for each type of component. For example Buttons, forms, popups, etc.


#### Helpers

All generic mixins, variables, helper fuctions, etc.


#### Layout

Header, footer, and general layout styling is located here. Best to avoid using layout.scss as much as possible!!! Opt for using components instead, even if that means making a new partial.



