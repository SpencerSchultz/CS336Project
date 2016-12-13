import React from 'react';
import $ from 'jquery';
import Remarkable from 'remarkable';
import { Link } from 'react-router';

import SingleLink from './singleLink.js';

module.exports = React.createClass({
  render: function() {
    var filterInput = this.props.filter.toLowerCase();
    var linkNodes = this.props.data
      .filter(function(link, i) {
        return (!link.tag1.toLowerCase().indexOf(filterInput))
      })
      .sort(function(a, b) {
        return a.nickName > b.nickName ? 1 : a.nickName < b.nickName ? -1 : 0;
      })
      .map(function(link) {
        return (
          <div className="tagAndList">
            <p>
                <Link to={'/' + link._id}>Edit</Link>   <tagTag>{link.tag1}</tagTag>   <a href={link.link} class="nickClass">{link.nickName}</a>
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
