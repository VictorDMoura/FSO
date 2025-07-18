```mermaid
sequenceDiagram
    participant browser
    participant server

    Note right of browser: Usuário preenche campo e clica em "Save" [4]
    Note right of browser: JavaScript no navegador intercepta a submissão do formulário (e.preventDefault()) [5, 6]
    Note right of browser: Nova nota é criada localmente, adicionada à lista e a página é re-renderizada (redrawNotes()) [6]
    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa [7, 8]
    activate server
    Note right of browser: Dados da nota (JSON) são enviados no corpo da requisição [7]
    Note right of browser: Cabeçalho Content-Type: application/json [7, 8]
    server-->>browser: HTTP Status 201 Created [7]
    deactivate server
    
    Note right of browser: Servidor NÃO solicita redirecionamento; navegador permanece na mesma página [7]
    Note right of browser: NENHUMA requisição HTTP adicional é feita pelo navegador [7]
```