import React, { PureComponent } from 'react';
import {
  Col,
  FormGroup,
  FormControl,
  ControlLabel,
  Button,
  Modal
} from 'react-bootstrap';
import { generateMnemonic } from '../utils/generateKeys';
import { getUserInfo } from './authApi';

const testPhrase = process.env.REACT_APP_TEST_PHRASE;

class AuthModal extends PureComponent {
  constructor(props, context) {
    super(props, context);
    console.log('construct AuthModal');
    this.state = {
      passPhrase: '',
      error: ''
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(event) {
    const target = event.target;
    this.setState({
      [target.name]: target.value
    });
  }

  async handleTestPhrase() {
    console.log('handleTestPhrase');
    console.log({testPhrase});
    
    const { handleSubmit, authHeader } = this.props;
    const passPhrase = testPhrase;
    try {
      console.log('call getUserInfo');
      const userPhraseKey = await getUserInfo(authHeader);
      console.log({userPhraseKey});
      console.log('call generateMnemonic');
      const mnemonic = generateMnemonic(passPhrase);
      console.log({mnemonic});

      const xPublicKey = mnemonic ? mnemonic.hdPrivateKey.xpubkey : null;
      if (!mnemonic || userPhraseKey.extPublicKey !== xPublicKey) {
        console.log('bad mnemonic');
        this.setState({
          error: 'Mnemonic invalid.'
        });
      } else {
        console.log('handleSubmit');
        handleSubmit(mnemonic);
      }
    } catch (error) {
      this.setState({
        error: error.message
      });
    }
  }
  
  async onSubmit() {
    const { handleSubmit, authHeader } = this.props;
    const { passPhrase } = this.state;
    try {
      const userPhraseKey = await getUserInfo(authHeader);
      const mnemonic = generateMnemonic(passPhrase);

      const xPublicKey = mnemonic ? mnemonic.hdPrivateKey.xpubkey : null;
      if (!mnemonic || userPhraseKey.extPublicKey !== xPublicKey) {
        this.setState({
          error: 'Mnemonic invalid.'
        });
      } else {
        handleSubmit(mnemonic);
      }
    } catch (error) {
      this.setState({
        error: error.message
      });
    }
  }

  render() {
    const { error } = this.state;
    console.log('render AuthModal');
    
    if(testPhrase) {
      this.handleTestPhrase();
      return null;
    }

    return (
      <Modal backdrop className="auth-modal" show>
        <Modal.Header>
          <Modal.Title>
            <div>Keys Not Found</div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            {error ? (
              <Col>
                <div className="error-prompt">
                  <div className="alert alert-danger error-box">
                    <strong>Error:&nbsp;</strong>
                    <span className="error-message">{error}</span>
                  </div>
                </div>
              </Col>
            ) : null}
            <Col>
              <FormGroup controlId="username">
                <ControlLabel>Please enter your passphrase.</ControlLabel>
                <FormControl
                  type="text"
                  name="passPhrase"
                  onChange={this.onChange}
                />
              </FormGroup>
            </Col>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            value="Authenticate"
            className="btn-primary"
            onClick={this.onSubmit}
          >
            Authenticate
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default AuthModal;
