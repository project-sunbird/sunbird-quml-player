**Quml player Component**

This component can be used to show Question Set which contains different kind of Questions in Quml Player. It receives questions as Input().

  

**Selector**: `quml-player`

  

  

**Exported as** : `QumlPlayerComponent`

  

  

### Properties

  
| Name     |  Description  |
|----------|:-------------:|
| @Input() questions | Question Set to display different kind of questions like multiple choice questions,short answer Questions, Long Answer Questions in the Quml Player |

### Events

| Name     |  Description  |
|----------|:-------------:|
| @Output() componentLoaded | Emits this event when user loads the component.|
| @Output() previousClicked | Emits this event when user clicks previous question in the component.|
| @Output() nextClicked | Emits this event when user clicks next question in the component.|
| @Output() questionClicked | Emits this event when user clicks on the options in the component.|
  