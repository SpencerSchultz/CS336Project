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
        if (this.props.params.id != prevProps.params.id) {
            this.loadData();
        }
    },
    loadData: function() {
        $.ajax(API_URL + "/" + this.props.params.id) .done(function(links) {
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
            //_id: this.props.params.id,
            link: this.state.link.trim(),
            nickName: this.state.nickName.trim(),
            lastVisited: Date.now(),
            tag1: this.state.tag1.trim()
        }
        $.ajax({
            url: API_URL + "/" + this.props.params.id,
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
            url: API_URL + "/" + this.props.params.id,
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
                    <h1>Link Edit - {this.state.nickName}</h1>
                    <input
                        type="text"
                        value={this.state.link}
                        ref='linkInput'
                        onChange={this.handleLinkChange}
                    />
                    <input
                        type="text"
                        value={this.state.nickName}
                        ref='nickNameInput'
                        onChange={this.handleNickNameChange}
                    />
                    <input
                        type="text"
                        value={this.state.tag1}
                        ref='tag1Input'
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
