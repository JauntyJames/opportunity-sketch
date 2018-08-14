/**
  Copyright (c) 2015, 2018, Oracle and/or its affiliates.
  The Universal Permissive License (UPL), Version 1.0
*/
'use strict';
define([
    'ojs/ojcore',
    'knockout',
    'jquery',
    'ojL10n!./resources/nls/new-sticky-strings',
    'promise',
    'ojs/ojlistview',
    'ojs/ojarraydataprovider',
    'ojs/ojbutton',
    'ojs/ojinputtext'
    ], function (oj, ko, $, componentStrings) {

    // function Sticky(stickyText, stickyCategory) {
    //     let self = this;

    //     self.stickyText = stickyText;
    //     self.stickyCategory = stickyCategory;
    // }

    function StickyModel() {
        var self = this;

        //At the start of your viewModel constructor
        // var busyContext = oj.Context.getContext(context.element).getBusyContext();
        // var options = {"description": "CCA Startup - Waiting for data"};
        // self.busyResolve = busyContext.addBusyState(options);

        // self.composite = context.element;

        //Example observable
        // self.messageText = ko.observable('Hello from Example Component');
        // self.properties = context.properties;
        // self.res = componentStrings['new-sticky'];

        this.itemToAdd = ko.observable("hey");
        this.allItems = ko.observableArray([
            {id: 1, text: "Poo Tee Weet", category: "Gains"}
        ])

        let lastItemId = this.allItems().length;

        this.dataProvider = new oj.ArrayDataProvider(this.allItems, {'keyAttributes': 'id'});

        this.addItem = () => {
            if ((self.itemToAdd() != "") && (self.allItems.indexOf(self.itemToAdd()) < 0)) {
                lastItemId++;
                self.allItems.push({id: lastItemId, text: self.itemToAdd()});
            }
            self.itemToAdd("");
        }
        // self.stickies = ko.observableArray([
        //     new Sticky("Hello World!", "Gains")
        // ]);
        // // Example for parsing context properties
        // if (context.properties.name) {
        //     parse the context properties here
        // }

        //Once all startup and async activities have finished, relocate if there are any async activities
        // self.busyResolve();
    };

    //Lifecycle methods - uncomment and implement if necessary
    //ExampleComponentModel.prototype.activated = function(context){
    //};

    //ExampleComponentModel.prototype.connected = function(context){
    //};

    //ExampleComponentModel.prototype.bindingsApplied = function(context){
    //};

    //ExampleComponentModel.prototype.disconnect = function(context){
    //};

    //ExampleComponentModel.prototype.propertyChanged = function(context){
    //};
    $( function() {
        ko.applyBindings(new StickyModel(document.getElementById('listViewContainer')), document.getElementById('listViewContainer'))
    })

    return StickyModel;
});
