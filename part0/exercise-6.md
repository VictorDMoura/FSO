```mermaid
sequenceDiagram
    participant browser
    participant server

    Note right of browser: Usuário preenche campo e clica em "Save"
    Note right of browser: JavaScript no navegador intercepta a submissão do formulário (e.preventDefault())
    Note right of browser: Nova nota é criada localmente, adicionada à lista e a página é re-renderizada (redrawNotes())
    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    Note right of browser: Dados da nota (JSON) são enviados no corpo da requisição
    Note right of browser: Cabeçalho Content-Type: application/json
    server-->>browser: HTTP Status 201 Created
    deactivate server
    Note right of browser: Servidor NÃO solicita redirecionamento; navegador permanece na mesma página
    Note right of browser: NENHUMA requisição HTTP adicional é feita pelo navegador
```