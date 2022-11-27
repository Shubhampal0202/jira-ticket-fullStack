import express from "express";
import cors from "cors";
import { connection } from './connection/db.js'
import { Ticket } from './model/ticket.js'
const app = express();
app.use(express.json());
app.use(cors());
const PORT = 9000;
connection();
app.post("/tickets", async (req, res) => {

    try {
        const newTicket = await Ticket.create({
            ticketColor: req.body.ticketColor,
            ticketTask: req.body.ticketTask,
            createdAt: Date.now()
        })
        res.status(200).send(newTicket)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

app.get("/tickets", async (req, res) => {

    try {
        const AllTickets = await Ticket.find()
        res.status(200).send(AllTickets)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

app.patch("/tickets/:_id", async (req, res) => {

    try {
        const updatedTicket = await Ticket.findByIdAndUpdate(req.params._id, req.body, { new: true })
        res.status(200).send(updatedTicket)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

app.delete("/tickets/:_id", async (req, res) => {

    try {
        const removedTicket = await Ticket.findByIdAndDelete(req.params._id);
        if (!req.params._id) {
            return res.status(400).send("specify the ticket id")
        }
         res.status(200).send(removedTicket)
    } catch (error) {
        res.status(500).send(error.message)
    }
})


app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})