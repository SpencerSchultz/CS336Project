import React from 'react';
import $ from 'jquery';

module.exports = React.createClass({
  getInitialState: function() {
    return {link: '', nickName: '', tag1: ''};
  },
  handleLinkChange: function(e) {
    this.setState({link: e.target.value});
  },
  handleNickNameChange: function(e) {
    this.setState({nickName: e.target.value});
  },
  handleTag1Change: function(e) {
    this.setState({tag1: e.target.value});
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var link = this.state.link.trim();
    var nickName = this.state.nickName.trim();
    var tag1 = this.state.tag1.trim();
    if (!nickName || !link || !tag1) {
      return;
    }
    this.props.onLinkSubmit({link: link, nickName: nickName, tag1: tag1});
    this.setState({link: '', nickName: '', tag1: ''});
  },
  render: function() {
    return (
      <form className="linkForm" onSubmit={this.handleSubmit}>
        <input
          type="link"
          placeholder="Actual Link"
          value={this.state.link}
          onChange={this.handleLinkChange}
        /><br />
        <input
          type="nickName"
          placeholder="Give it a nick-name"
          value={this.state.nickName}
          onChange={this.handleNickNameChange}
        /><br />
        <input
          type="tag1"
          placeholder="Give it a tag"
          value={this.state.tag1}
          onChange={this.handleTag1Change}
        /><br />
        <input type="submit" value="Post" />
      </form>
    );
  }
});
