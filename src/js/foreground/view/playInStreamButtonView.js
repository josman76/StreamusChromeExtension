﻿define([
    'text!template/playInStreamButton.html',
    'background/collection/streamItems',
    'background/model/player'
], function (PlayInStreamButtonTemplate, StreamItems, Player) {
    'use strict';

    var PlayInStreamButtonView = Backbone.Marionette.ItemView.extend({
        
        tagName: 'button',
        className: 'button-icon',
        template: _.template(PlayInStreamButtonTemplate),
        
        attributes: {
            title: chrome.i18n.getMessage('play')
        },
        
        events: {
            'click': 'playInStream',
            'dblclick': 'playInStream'
        },
        
        initialize: function () {
            this.applyTooltips();
        },
        
        playInStream: _.debounce(function () {

            var streamItem = StreamItems.getByVideo(this.model);

            if (_.isUndefined(streamItem)) {
                StreamItems.addByVideo(this.model, true);
            } else {
                if (streamItem.get('active')) {
                    Player.play();
                } else {
                    Player.playOnceVideoChanges();
                    streamItem.set('active', true);
                }
            }

            //  Don't allow dblclick to bubble up to the list item because that'll select it
            return false;
        }, 100, true)

    });

    return PlayInStreamButtonView;
});