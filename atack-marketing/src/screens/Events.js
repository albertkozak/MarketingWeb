import React from "react";
import { QRCode } from "react-qr-svg";

const styles = {
  wrapper: {
    position: "relative",
    paddingTop: 100,
  },
  h1: {
    textAlign: "center",
  },
  qrcode: {
    textAlign: "center",
  },
  form: {
    textAlign: "center",
    margin: 20
  }
};

export default class Events extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    alert(this.state.value);
    event.preventDefault();
  }

  componentDidMount() {}

  render() {
    return (
      <div style={styles.wrapper}>
        <h1 style={styles.h1}>QR Generator</h1>
        <br />
        <h1 style={styles.h1}>{this.state.value}</h1>
        <div style={styles.qrcode}>
          <QRCode
            level="Q"
            style={{ width: 256 }}
            value={JSON.stringify({
              event: this.state.value,
              id: 123,
              time: `${Date.now()}`,
            })}
          />
          <br />
          <form style={styles.form} onSubmit={this.handleSubmit}>
            <label>Event Name</label>
            <br/>
            <input
              type="text"
              value={this.state.value}
              onChange={this.handleChange}
            />
          </form>
        </div>
      </div>
    );
  }
}
