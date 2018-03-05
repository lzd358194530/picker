import React from 'react';
import ReactDOM from 'react-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

const propTypes = {
  visible: React.PropTypes.bool.isRequired,
  onCancel: React.PropTypes.func,
}

class BaseModal extends React.Component {
  constructor() {
    super();
  }

  componentDidUpdate () {
    if (this.refs.modalOverlay && !this.refs.modalOverlay.onclick) {

      // 点击阴影背景时cancel() popup
      this.refs.modalOverlay.onclick = (e) => {
        e.stopPropagation();
        this.props.onCancel && this.props.onCancel();
      }

      // 点击modal阻止默认行为
      // 原理：react event listener中无法阻止原生事件，所以用原生事件来替代react事件
      this.refs.modal.onclick = (e) => e.stopPropagation();
    }
  }

  render () {
    const modal = (
      <div className="modal-overlay" 
        ref={(modalOverlay) => { this.modalOverlay = modalOverlay;}}>
        <div className="modal" ref={(modal) => { this.modal = modal;}}>
          {this.props.children}
        </div>
      </div>
    );
    return (
       <CSSTransition 
        classNames="modal-transition" 
        timeout={300} 
        mountOnEnter = {true}
        unmountOnExit = {true}
        in={this.props.visible}>
         {modal}
      </CSSTransition>
    );
  }
}

BaseModal.propTypes = propTypes;

export default BaseModal;


