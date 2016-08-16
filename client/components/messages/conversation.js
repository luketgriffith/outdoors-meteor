import React, { Component } from 'react';
import { Modal } from 'react-bootstrap'

export default class Conversation extends Component {
  render() {
    return(
      <Modal show={this.props.visible} hide={this.props.dismiss}>
      <div className="col-md-3">
        {this.props.toMessages.map((msg) => {
          <div className="conversation-msg">
            <span>{msg.message}</span>
          </div>
        })}
      </div>

      <div className="col-md-3">
        {this.props.fromMessages.map((msg) => {
          <div className="conversation-msg">
            <span>{msg.message}</span>
          </div>
        })}
      </div>

      <form onSubmit={this.props.sendMessage}>
        <textarea onBlur={this.props.typeMessage} />
        <button className="btn btn-primary">Send</button>
      </form>

      </Modal>
    )
  }
}
