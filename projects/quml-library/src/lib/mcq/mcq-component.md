**mcq Component**

This component can be used to show Multiple Choice Questions in Quml Player. It receives questions and layout 
And emits component Loaded and options click event.

  

**Selector**: `quml-mcq`

  

  

**Exported as** : `McqComponent`

  

  

### Properties

  
| Name     |  Description  |
|----------|:-------------:|
| @Input() identifier |  Unique identifier for the question |
| @Input() questions | Dataset to display the multiple choice question in the Quml Player|    |
| @Input() layout: string | Layout to display the questions in different formats. Ex: Default, Column|


  

### Events

| Name     |  Description  |
|----------|:-------------:|
| @Output() componentLoaded | Emits this event when user loads the component.|
| @Output() answerChanged | Emits this event when user changes the selected option in the mcq Component.|