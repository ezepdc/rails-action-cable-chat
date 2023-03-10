import { Controller } from "@hotwired/stimulus"
import {createConsumer} from "@rails/actioncable"

// Connects to data-controller="chatroom-subscription"
export default class extends Controller {
  static values = { chatroomId: Number }
  static targets = ["messages"]

  connect() {
    console.log(`Connecting to the ActionCable channel with id ${this.chatroomIdValue}`)
    // console.log(this.messagesTarget)
    this.channel = createConsumer().subscriptions.create(
      { channel: "ChatroomChannel", id: this.chatroomIdValue},
      // { received: data => console.log(data) }
      { received: data => this.#insertMessageAndScrollDown(data) }
    )
  }

  disconnect() {
    console.log(`Disconnecting from the channel...`)
    this.channel.unsubscribe()
  }

  resetForm(event) {
    // console.log(event)
    const form = event.target
    form.reset()
  }

  // private
  #insertMessageAndScrollDown(data) {
    this.messagesTarget.insertAdjacentHTML("beforeend", data)
    this.messagesTarget.scrollTo(0, this.messagesTarget.scrollHeight)
  }
}
