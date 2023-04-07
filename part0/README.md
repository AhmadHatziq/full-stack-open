# Exercise 0

### Sample Sequence Diagram (Opening the page `https://studies.cs.helsinki.fi/exampleapp/notes`)
```mermaid 
sequenceDiagram
    participant browser
    participant server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes
    activate server
    server-->>browser: HTML document
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser: the css file
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    activate server
    server-->>browser: the JavaScript file
    deactivate server

    Note right of browser: The browser starts executing the JavaScript code that fetches the JSON from the server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: [{ "content": "HTML is easy", "date": "2023-1-1" }, ... ]
    deactivate server

    Note right of browser: The browser executes the callback function that renders the notes
```

## 0.4: New Note Diagram 
The sequence diagram below denotes the situation where the user creates a new note on the page https://studies.cs.helsinki.fi/exampleapp/notes by writing something into the text field and clicking the submit button.

```mermaid 
sequenceDiagram
    participant browser
    participant server

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note. Payload consists of text content for the new note. 
    activate server
    server-->>browser: Browser returns status code 302. The browser is to be redirected to /exampleapp/notes. 
    deactivate server

    Note right of browser: The subsequent sequence diagram depicts the browser loading the page at exampleapp/notes again. Hence, this is a repetition of the previous sequence diagram. 

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes
    activate server
    server-->>browser: HTML document
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser: the css file
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    activate server
    server-->>browser: the JavaScript file
    deactivate server

    Note right of browser: The browser starts executing the JavaScript code that fetches the JSON from the server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: [{ "content": "HTML is easy", "date": "2023-1-1" }, ... ]
    deactivate server

    Note right of browser: The browser executes the callback function that renders the notes

```

## 0.5: Simple Page App Diagram
Create a diagram depicting the situation where the user goes to the single-page app version of the notes app at https://studies.cs.helsinki.fi/exampleapp/spa.

```mermaid 
sequenceDiagram
    participant browser
    participant server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa
    activate server
    server-->>browser: HTML document
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser: the css file
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa.js
    activate server
    server-->>browser: the JavaScript file
    deactivate server

    Note right of browser: The browser starts executing the JavaScript code. The code creates an empty notes array and assigns an event handler function to the form, overriding the default behaviour. The code then fetches the JSON data from the server. 

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: [{ "content": "HTML is easy", "date": "2023-1-1" }, ... ]
    deactivate server

    Note right of browser: The browser executes the callback redrawNotes function that renders the notes. 
```



## 0.6: New Note in Single Page App Diagram 
Create a diagram depicting the situation where the user creates a new note using the single-page version of the app.

```mermaid 
sequenceDiagram
    participant browser
    participant server

    Note right of browser: The browser extracts the note content and adds it into the notes array. 

    Note right of browser: The browser empties the textbox of the form and re-renders the notes content, which has the newly inputted content.  

    Note right of browser: The browser sends the new note data to the server via POST.

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_node_spa. Payload consists of text content for the new note and the date time. 
    activate server
    server-->>browser: Status code 201. This indicates that the request has successfully led to the creation of the resource ie saved into the server database. 
    deactivate server
```
