import React from 'react';
import $ from 'jquery';
import Remarkable from 'remarkable';

import Link from './link.js';

module.exports = React.createClass({
  render: function() {
    var filterInput = this.props.filter.toLowerCase();
    var linkNodes = this.props.data
      .filter(function(link, i) {
        return (!link.tag1.toLowerCase().indexOf(filterInput))
      })
      .map(function(link) {
        return (
          <div className="tagAndList">
            <p>
              <tagTag>{link.tag1}</tagTag>  <a href={link.link}>{link.nickName}</a>
            </p>
            </div>
          );
        });
        return (
          <div className="tagOrderedList">
            {linkNodes}
          </div>
        );
      }
});