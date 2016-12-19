import React from 'react';
import Flexbox from 'flexbox-react';
import $ from 'jquery';

import TagOrderedList from './tagOrderedList.js';
import LinkForm from './linkForm.js';
import FilterBar from './filterBar.js';

import { API_URL, POLL_INTERVAL } from './global';

module.exports = React.createClass({
  loadLinks: function() {
    $.ajax({
      url: API_URL,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(API_URL, status, err.toString());
      }.bind(this)
    });
  },
  handleFilterUpdate: function(value) {
    this.setState({
      filterText: value
    })
  },
  handleLinkSubmit: function(link) {
    var links = this.state.data;
    link._id = Date.now();
    var newLinks = links.concat([link]);
    this.setState({data: newLinks});
    $.ajax({
      url: API_URL,
      dataType: 'json',
      type: 'POST',
      data: link,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        this.setState({data: links});
        console.error(API_URL, status, err.toString());
      }.bind(this)
    });
  },
  getInitialState: function() {
    return {
      data: [],
      filterText: ''
    };
  },
  componentDidMount: function() {
    this.loadLinks();
    setInterval(this.loadLinks, POLL_INTERVAL);
  },
  render: function() {
    return (
      <div className="linkBox">
          {/*MIDDLE SECTION*/}
          <Flexbox
              flexDirection="row"
              justifyContent="center"
              >
            {/*MAIN CONTENT*/}
            <Flexbox flexDirection="column">
              <div className="search">
                <FilterBar
                  filterVal={this.state.filterText}
                  handleFilterUpdate={this.handleFilterUpdate}
                />
              </div>
              <TagOrderedList
                data={this.state.data}
                filter={this.state.filterText}
              />
            </Flexbox> {/*MAIN CONTENT END*/}
            {/*RIGHT COLUMN*/}
            <Flexbox
              flexDirection="column"
              >
              <h1 className="header">Link DB</h1>
              <div className="rightColTop">
                <h4>Tip:</h4>
                <p>You can delete entire links in the Edit Menu. Just click "Edit" next to a link!</p>
              </div>
              <div className="rightCol">
                <h4>Add a link!</h4>
                <LinkForm onLinkSubmit={this.handleLinkSubmit}/>
              </div>
            </Flexbox> {/*RIGHT COLUMN END*/}
          </Flexbox> {/*MIDDLE SECTION END*/}
      </div>
    );
  }
});
