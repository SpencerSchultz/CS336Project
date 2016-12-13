import React from 'react';
import { Link } from 'react-router';
import $ from 'jquery';

import { API_URL } from './global';

module.exports = React.createClass({
    getInitialState: function() {
        return {link: '', nickName: '', tag1: ''};
    },
    componentDidMount: function() {
        this.loadData();
    },
    componentDidUpdate: function(prevProps) {
        if (this.props.params._id != prevProps.params._id) {
            this.loadData();
        }
    },
    loadData: function() {
        $.ajax(API_URL + "/" + this.props.params._id) .done(function(links) {
            this.setState(links[0]);
        }.bind(this));
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
    contextTypes: {
        router: React.PropTypes.object
    },
    handleUpdate: function() {
        var updatedLink = {
            link: this.state.link.trim(),
            nickName: this.state.nickName.trim(),
            tag1: this.state.tag1.trim()
        }
        $.ajax({
            url: API_URL + "/" + this.props.params._id,
            dataType: 'json',
            type: 'PUT',
            contentType:'application/json',
            data: JSON.stringify(updatedLink)
        })
         .done(function(links){
             this.context.router.push('/');
         }.bind(this))
         .fail(function(xhr, status, errorThrown) {
             console.error(API_URL, status, errorThrown.toString());
         }.bind(this));
    },
    handleDelete: function() {
        $.ajax({
            url: API_URL + "/" + this.props.params._id,
            type: 'DELETE',
        })
         .done(function(links){
             this.context.router.push('/');
         }.bind(this))
         .fail(function(xhr, status, errorThrown) {
             console.error(API_URL, status, errorThrown.toString());
         }.bind(this));
    },
    render: function() {
        return (
            <div>
                <form className="linkForm">
                    <h1>Link Edit - {this.state._id}</h1>
                    <input
                        type="text"
                        value={this.state.link}
                        onChange={this.handleLinkChange}
                    />
                    <input
                        type="text"
                        value={this.state.nickName}
                        onChange={this.handleNickNameChange}
                    />
                    <input
                        type="text"
                        value={this.state.tag1}
                        onChange={this.handleTag1Change}
                    />
                    <button type="button" onClick={this.handleUpdate}>Update</button>
                    <button type="button" onClick={this.handleDelete}>Delete</button>
                </form>
                <Link to='/'>Cancel</Link>
            </div>
        );
    }
});
