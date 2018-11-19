import React, { Component } from 'react';

class Dialog extends Component {
  render() {
    return (
      <div id="modal" className="modal modal__bg" role="dialog">
        <div className="modal__dialog">
          <div className="modal__content">
            <p>{this.props.message}</p>

            <a
              href=""
              className="modal__close demo-close"
              onClick={this.props.onClick}
            >
              <svg className="" viewBox="0 0 24 24">
                <path d="M19 6.41l-1.41-1.41-5.59 5.59-5.59-5.59-1.41 1.41 5.59 5.59-5.59 5.59 1.41 1.41 5.59-5.59 5.59 5.59 1.41-1.41-5.59-5.59z" />
                <path d="M0 0h24v24h-24z" fill="none" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default Dialog;
