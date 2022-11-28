## Jira Ticket Clone App

An app to keep track of all tickets. We can create a new ticket, delete a ticket, update a ticket and see list of tickets.

### Techstack
```
Frontend: HTML, CSS, Javascript
Backend: NodeJS, Express
Database: MongoDB

```

### APIs

| METHOD | ENDPOINT    | DESCRIPTION        |
| ------ | ---------   | ----------------   |
| GET    | /tickets    | Get all tickets    |
| GET    | /tickets/id | Get ticket with id |
| POST   | /tickets    | Add new ticket     |
| PUT    | /tickets    | Update ticket      |
| DELETE | /tickets/id | Delete ticket      |

### Schema
```javascript
{
      ticketColor: {
        type: String,
        required: true
    },
    ticketTask: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}
```

### Response ticket
ticket:

```javascript
{
  id: ObjectId('637f65b73e424af99fccb02a'),
  ticketColor: "lightpink",
  ticketTask: "mumbai to delhi",
  createdAt:   2022-11-24T12:38:15.415+00:00
}
```

### Steps to run

Navigate to server folder

- Make a .env file with

```
DB_USERNAME=<YOUR_USERNAME>
DB_PASSWORD=<YOUR_PASSWORD>
```

by using userName and password create your MONGODB_URL like following this
`mongodb+srv://${USERNAME}:${PASSWORD}@jiraticketclone.o7lslss.mongodb.net/?retryWrites=true&w=majority`

Now run,

```npm
$ npm i
// If installation is successful
$ npm start
```

If server is up successfully, navigate to client folder

```npm
$ npm i
// If installation is successful
then run index.html file in the browser
```
### How to use the app

- When we start the application, gets all the tickets stored in the database

- To create a ticket we have to click on the add button(+) then modal will display on the UI. Enter your ticket text, select ticket color and press shift key.

- To edit the ticket, first unlock the ticket by clicking on the lock button, edit the ticket text and lock the ticket by clicking on the unlock button.

- To delete the ticket, first click on the remove button(X) remove button will active with the red color. Now now click any of the ticket which you want to delete.
