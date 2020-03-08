import React, { Component } from "react";

class Intro extends Component {
  state = {};
  render() {
    return (
      <p
        style={{
          textAlign: "justify",
          textAlignLast: "center"
        }}
      >
        <br></br>
        Hi, there. I'm Eoma and I'm here to help you decide what to eat. My
        philosophy of choosing what to eat depends on what you will be doing
        after you eat. For example, if I have a session of productivity planned
        right after eating, I will eat something light and healthy so I don't
        feel sleepy and lazy from a big, fatty meal. <br></br>
        <br></br>So, let me know what you got planned for today!
      </p>
    );
  }
}

export default Intro;
