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
    'ojs/ojinputtext',
    'ojs/ojselectcombobox',
    'ojs/ojslider'
    ], function (oj, ko, $, componentStrings) {

    function StickyModel() {

        //At the start of your viewModel constructor
        // var busyContext = oj.Context.getContext(context.element).getBusyContext();
        // var options = {"description": "CCA Startup - Waiting for data"};
        // self.busyResolve = busyContext.addBusyState(options);

        // self.composite = context.element;

        //Example observable
        // self.messageText = ko.observable('Hello from Example Component');
        // self.properties = context.properties;
        // self.res = componentStrings['new-sticky'];

        this.itemToAdd = ko.observable("");
        this.allItems = ko.observableArray([])
        this.category = ko.observable("Gain")
        this.selectedItems = ko.observableArray([]);

        // this.gainItems = this.allItems().filter(item => item.category == 'Gain')
        // this.painItems = this.allItems().filter(item => item.category == 'Pain')
        // this.jobItems = this.allItems().filter(item => item.category == 'Job')
        this.painItems = ko.observableArray([]);
        this.gainItems = ko.observableArray([]);
        this.jobItems = ko.observableArray([]);


        this.gainProvider = new oj.ArrayDataProvider(this.gainItems, {'keyAttributes': 'id'});
        this.painProvider = new oj.ArrayDataProvider(this.painItems, {'keyAttributes': 'id'});
        this.jobProvider = new oj.ArrayDataProvider(this.jobItems, {'keyAttributes': 'id'});

        var lastItemId = this.allItems().length;
        var self = this;
        this.addItem = () => {
            if ((self.itemToAdd() != "") && (self.allItems.indexOf(self.itemToAdd()) < 0)) {
                lastItemId++;
                if (self.category() === "Gain") {
                    self.gainItems.push({'id': lastItemId, 'text': self.itemToAdd(), 'category': self.category(), 'value': ko.observable(4)});
                } else if (self.category() === "Pain") {
                    self.painItems.push({'id': lastItemId, 'text': self.itemToAdd(), 'category': self.category(), 'value': ko.observable(4)});
                } else if (self.category() === "Job") {
                    self.jobItems.push({'id': lastItemId, 'text': self.itemToAdd(), 'category': self.category(), 'value': ko.observable(4)});
                }
            }
            self.itemToAdd("");
        }

        this.removeSelected = () => {
            $.each(self.selectedItems(), function(index, value) {
                self.gainItems.remove((item) => {
                    if ( item.category === "Gain" )
                    return (item.id == value);
                });
                self.painItems.remove((item) => {
                    if ( item.category === "Pain" )
                    return (item.id == value);
                });
                self.jobItems.remove((item) => {
                    if ( item.category === "Job" )
                    return (item.id == value);
                });
            });
        }
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
    // $( function() {
    //     ko.applyBindings(new StickyModel(), document.getElementById('listViewContainer'))
    // })

    return StickyModel;
});
