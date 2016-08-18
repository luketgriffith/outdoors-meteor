import React, { Component } from 'react';
import { Modal } from 'react-bootstrap'

export default class Conversation extends Component {


  render() {

    let ownerMsg = [];
    let otherMsg = [];
    let ownerMsgSection;
    let otherMsgSection;

    if(this.props.conversation.messages && this.props.conversation.messages.length > 0) {
      this.props.conversation.messages.forEach((msg) => {
        if(msg.to == this.props.owner._id) {
          ownerMsg.push(msg);
        } else {
          otherMsg.push(msg);
        }
      })
    }

    console.log('owner Messages: ', ownerMsg);
    console.log('other Msg: ', otherMsg);

    if(ownerMsg.length > 0) {
      ownerMsgSection = ownerMsg.map((msg, index) => {
        console.log(msg)
        return(
          <div key={index}>
           {msg.message}
           </div>)
      })
    } else {
      ownerMsgSection = <div></div>
    }

    if(otherMsg.length > 0) {
      otherMsgSection = otherMsg.map((msg, index) => {
        console.log(msg)
        return( <div key={index}>{msg.message}</div>)
      })
    } else {
      otherMsgSection = <div></div>
    }

    return(
      <Modal show={this.props.visible} onHide={this.props.dismiss}>

      <Modal.Header closeButton>
        <Modal.Title>Conversation</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="col-md-3">
          {ownerMsgSection}
        </div>

        <div className="col-md-3">
          {otherMsgSection}
        </div>

        <form onSubmit={this.props.sendMessage}>
        <textarea onBlur={this.props.typeMessage} />
        <button className="btn btn-primary">Send</button>
        </form>
      </Modal.Body>



      </Modal>
    )
  }
}
