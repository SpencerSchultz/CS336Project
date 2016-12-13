import React from 'react';
import $ from 'jquery';

module.exports = React.createClass({
  render: function() {
    const { filterVal, handleFilterUpdate} = this.props
      return (
        <form>
          <input
            type='text'
            ref='filterInput'
            placeholder='Search via tag...'
            value={filterVal}
            onChange={() => {
              handleFilterUpdate(this.refs.filterInput.value)
            }}
          />
        </form>
      );
  }
});
