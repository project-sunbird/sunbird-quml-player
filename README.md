# Quml player library for Sunbird platform!
Contains Quml player library components powered by angular. These components are designed to be used in sunbird consumption platforms *(mobile app, web portal, offline desktop app)* to drive reusability, maintainability hence reducing the redundant development effort significantly.

# Getting Started
For help getting started with a new Angular app, check out the Angular CLI.
For existing apps, follow these steps to begin using .

## Step 1: Install the packages

    npm install @project-sunbird/sunbird-quml-player-v9 --save
    npm install @project-sunbird/sb-styles --save
    npm install @project-sunbird/client-services --save
    npm install bootstrap --save
    npm install jquery --save
    npm install katex --save
    npm install lodash-es --save
    npm install ngx-bootstrap --save

## Step 2: Include the styles, scripts and assets in angular.json
    "styles": [
    ...
    ...
    "src/styles.css",
    "./node_modules/@project-sunbird/sb-styles/assets/_styles.scss",
    "./quml-carousel.css",
    "./node_modules/katex/dist/katex.min.css"
    ],
    "scripts": [
    ...
    ...
    "./node_modules/katex/dist/katex.min.js",
    "./node_modules/jquery/dist/jquery.min.js"
    ]

  Add following under architect.build.assets

     {
	    ...
	    "build": {
	    
	    "builder": "@angular-devkit/build-angular:browser",
	    
	    "options": {
		    ...
		    ...
    
		    "assets": [
		    
			   ...
			   ...
			    
			    {
				    "glob": "**/*.*",
				    "input": "./node_modules/@project-sunbird/sunbird-quml-player-v9/lib/assets/",
				    "output": "/assets/"
			    }
		    
		    ],
    
	    "styles": [
	        ...
            "src/styles.css",
            "./node_modules/@project-sunbird/sb-styles/assets/_styles.scss",
            "./quml-carousel.css",
            "./node_modules/katex/dist/katex.min.css"
	    ],
	    "scripts": [
            ...
            "./node_modules/katex/dist/katex.min.js",
            "./node_modules/jquery/dist/jquery.min.js"
         ]
	    ...
	    ...
    
    },

  

## Step 3: Import the modules and components
Import the NgModule where you want to use. Add [question-cursor-implementation.service.ts](projects/quml-demo-app/src/app/question-cursor-implementation.service.ts)
       
    import { CarouselModule } from 'ngx-bootstrap/carousel';
    import { QuestionCursorImplementationService } from './question-cursor-implementation.service';
    import { QumlLibraryModule, QuestionCursor } from '@project-sunbird/sunbird-quml-player-v9';

    
    @NgModule({
	    ...
	    
	    imports: [ QumlLibraryModule, CarouselModule.forRoot() ],
        providers: [{
            provide: QuestionCursor,
            useClass: QuestionCursorImplementationService
        }]
	    
	    ...
    })

  
    export class TestAppModule { }
    
## Step 4: Add css

    [styles.css](projects/quml-demo-app/src/styles.css)
    [quml-carousel.css](quml-carousel.css)


## Step 5: Send input to render Quml player
Use the mock config in your component to send input to Quml player
Click to see the mock - [playerConfig](projects/quml-demo-app/src/app/quml-library-data.ts)
Use 'singleContentRes' for single questionset and 'sectionContent' for section questionset in the mock

## Available components
|Feature| Notes| Selector|Code|Input|Output
|--|--|--|------------------------------------------------------------------------------------------|---|--|
| Quml Player | Can be used to render Quml | quml-main-player| *`<quml-main-player [playerConfig]="playerConfig"><quml-main-player>`*|playerConfig|playerEvent, telemetryEvent|

## Use as web components
Import this library in any web application and use the custom component.
Follow below-mentioned steps to use it in plain javascript project:

- Insert [library](https://github.com/project-sunbird/sunbird-quml-player/blob/release-4.3.0/web-component/sunbird-quml-player.js) as below:
	```javascript
	<script  type="text/javascript"  src="sunbird-quml-player.js"></script>
	```
- Create a asset folder and copy all the files from [here](https://github.com/project-sunbird/sunbird-quml-player/tree/release-4.3.0/web-component/assets), library requires these assets internally to work well.

- Get sample playerConfig from here: [playerConfig](https://github.com/project-sunbird/sunbird-quml-player/blob/release-4.3.0/projects/quml-demo-app/src/app/quml-library-data.ts)

- Pass the QuestionListAPI baseUrl for eg. [https://staging.sunbirded.org/api/question/v1/list](https://staging.sunbirded.org/api/question/v1/list)

- Create a custom html element: `sunbird-quml-player`
	```javascript
	const  qumlPlayerElement = document.createElement('sunbird-quml-player');
	```

- Pass data using `player-config`
	```javascript
	qumlPlayerElement.setAttribute('player-config', JSON.stringify(playerConfig));
	```
	**Note:** Attribute should be in **string** type
- Listen for the output events: **playerEvent** and **telemetryEvent**

	```javascript
	qumlPlayerElement.addEventListener('playerEvent', (event) => {
		console.log("On playerEvent", event);
	});
	qumlPlayerElement.addEventListener('telemetryEvent', (event) => {
		console.log("On telemetryEvent", event);
	});
	```

- Append this element to existing element
	```javascript
	const  myPlayer = document.getElementById("my-player");
	myPlayer.appendChild(qumlPlayerElement);
	```
- Refer demo [example](https://github.com/project-sunbird/sunbird-quml-player/blob/release-4.3.0/web-component/index.html)