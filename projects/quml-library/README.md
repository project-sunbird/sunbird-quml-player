# Sunbird Quml Player
Player for consuming QuML questions & question sets

## Prerequisites:

Node js - v14

* Use nvm. [Installation instructions](https://github.com/nvm-sh/nvm#installing-and-updating)
* Install and use Node 14: 
```
cd $PATH_TO_REPO
nvm install 14
nvm use 14
```

## Usage


`npm i @project-sunbird/sunbird-quml-player-v9`


Add the module to the your player root module 

`import  { QumlLibraryModule, QuestionCursor } from '@project-sunbird/sunbird-quml-player-v9';`

```javascript
@NgModule({
  ...
  imports: [
    ...,
    QumlLibraryModule
  ],
  providers: [{
    provide: QuestionCursor,
    useClass: QuestionCursorImplementationService // This service class should be implemented by the consumer of the player to provide questions as async manner to make the player experience smooth when there are lot of questions in a set check the sample implementation in demo project in this repo
  }]
  ....
})
```

add the assets, scripts and styles in angular.json file

```javascript
....
 "assets": [
            ....
              {
                "glob": "**/*",
                "input": "node_modules/@project-sunbird/sunbird-quml-player-v9/lib/assets/",
                "output": "/assets/"
              }
            ],
"styles": [
    ...
    "./node_modules/@project-sunbird/sb-styles/assets/_styles.scss",
    "./quml-carousel.css",
    "./node_modules/katex/dist/katex.min.css"
    ...
],
"scripts": [
    "node_modules/@project-sunbird/telemetry-sdk/index.js",
    "node_modules/katex/dist/katex.min.js",
    ....
]
},
...

```

add peer dependecies of the player as dependecies in your project
 

add the component selector in your component like below

```html

    <quml-player    [QumlPlayerConfig]="QumlPlayerConfig" 
                    (playerEvent)="getPlayerEvents($event)" 
                    (telemetryEvent)="getTelemetryEvents($event)">
    </quml-player>

```

Still facing issues please refer the demo project in this repo as example

## Development

  check out this repo with latest release version branch

  cd to {repo_path} in terminal

  run  `sh setup.sh`

  above script installs the dependecies and link the epub player library project to demo app

  if you do any changes in library project run to get latest changes in demo app

  `npm run build-lib-link`

  once above command completed run `npm run start` which will run the player in demo app at http://localhost:4200



## References

https://project-sunbird.atlassian.net/wiki/spaces/CO/pages/1572536374/Object+Types
https://project-sunbird.atlassian.net/wiki/spaces/CO/pages/1572274218/Question+Set+Definition
https://project-sunbird.atlassian.net/wiki/spaces/CO/pages/1629356033/Question+Definition
https://project-sunbird.atlassian.net/wiki/spaces/CO/pages/1688404028/QuML+Question+Spec

