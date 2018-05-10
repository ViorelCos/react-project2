import React from 'react';
import Modal from 'react-modal';


const helpTip = {
  background: '#5a5e5e',
  border: '1px solid #a3aaaa',
  borderRadius: '50%',
  boxShadow: '0 1px 2px rgba(0, 0, 0, 0.18)',
  boxSizing: 'border-box',
  color: '#fafafa',
  cursor: 'default',
  fontSize: '11px',
  height: '14px',
  lineHeight: '14px',
  marginTop: '1px',
  textAlign: 'center',
  width: '14px'
};

const modalStyles = {
  content : {
    backgroundColor: '#e1ded5',
    bottom: 'auto',
    left: '350px',
    right: 'auto',
    top: '10px',
    zIndex: '2'
  }
};

const modalMobileStyles = {
  content : {
    backgroundColor: '#e1ded5',
    bottom: 'auto',
    left: '50%',
    marginRight: '-50%',
    right: 'auto',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: '2'
  }
};

const contentSty = {
  background: 'transparent',
  border: '1px solid rgba(0, 0, 0, 0.08)',
  borderRadius: '3px',
  boxShadow: '0 2px 6px rgba(0, 0, 0, 0.2)',
  color: '#000',
  fontSize: '0.9375em',
  lineHeight: '1.2em',
  maxWidth: '280px',
  minWidth: '200px',
  padding: '5px',
  textAlign: 'left',
  wordWrap: 'break-word',
  zIndex: '2'
};

const titleSty = {
  fontWeight: '700'
};

const centerBtnSty = {display: 'block', margin: 'auto', textAlign: 'center', width: '100%'};

export default class ModalInfo extends React.Component {
  state = {modalIsOpen: false};
  openModal = () => {
    this.setState({modalIsOpen: true});
  }

  closeModal = () => {
    this.setState({modalIsOpen: false});
  }
  render() {
    let help = '?';
    let displayContent = {__html: this.props.helpText};

    let modalStyle, buttonSty;
    if (this.props.isDesktop) {
      buttonSty = AppStyles.buttonSty;
      modalStyle = Object.assign({}, modalStyles);
    } else {
      buttonSty = AppStyles.buttonMobileSty;
      modalStyle = Object.assign({}, modalMobileStyles);
    }
    let closeBtn = {buttonid: 'close', text: 'Close', reStyle: buttonSty};
    return (
      <div>
        <div id="events" onClick={this.openModal}>
          <div id="helpTip" style={helpTip}>{help}</div>
        </div>
        <Modal
          contentLabel="Transaction Info"
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          style={modalStyle}
        >

          <div id="contentSty" style={contentSty}>
            {transactionInfo}
          </div>
          <br /><br />
          <div style={centerBtnSty}>
            <Button btn={closeBtn} onClick={this.closeModal} />
          </div>
        </Modal>
      </div>
    );
  }
}
