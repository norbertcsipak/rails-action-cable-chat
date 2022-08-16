import { Controller } from "@hotwired/stimulus"
import { createConsumer } from "@rails/actioncable"

export default class extends Controller {
  static values = { chatroomId: Number }
  static targets = ["messages"]

  connect() {
    this.channel = createConsumer().subscriptions.create(
      { channel: "ChatroomChannel", id: this.chatroomIdValue },
      { received: (message) => {
        this.element.insertAdjacentHTML('beforeend', message)
        this.element.scrollTop = this.element.scrollHeight
      }
    }
    )
    console.log(`Subscribed to the chatroom with the id ${this.chatroomIdValue}.`)
  }
}
