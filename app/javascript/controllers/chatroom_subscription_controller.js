import { Controller } from "@hotwired/stimulus"
import {createConsumer} from "@rails/actioncable"

// Connects to data-controller="chatroom-subscription"
export default class extends Controller {
  static values = { chatroomId: Number }
  static targets = ["messages"]

  connect() {
    // console.log(this.chatroomIdValue)
    // console.log(this.messagesTarget)
    createConsumer().subscriptions.create(
      { channel: "ChatroomChannel", id: this.chatroomIdValue},
      // { received: data => console.log(data) }
      { received: data => this.#insertMessageAndScrollDown(data) }
    )
  }

  #insertMessageAndScrollDown(data) {
    this.messagesTarget.insertAdjacentHTML("beforeend", data)
    this.messagesTarget.scrollTo(0, this.messagesTarget.scrollHeight)
  }
}
