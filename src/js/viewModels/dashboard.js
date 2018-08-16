/**
 * @license
 * Copyright (c) 2014, 2018, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your dashboard ViewModel code goes here
 */
define([
  'ojs/ojcore',
  'knockout',
  'jquery',
  'appController',
  'ojs/ojmodule-element-utils',
  'jet-composites/new-sticky/loader',
  'promise',
  'ojs/ojlistview',
  'ojs/ojarraydataprovider',
  'ojs/ojbutton',
  'ojs/ojinputtext',
  'ojs/ojselectcombobox',
  'ojs/ojslider'
], function (oj, ko, $, app, moduleUtils) {

  function DashboardViewModel() {
    var self = this;

    this.itemToAdd = ko.observable("");
    this.allItems = ko.observableArray([])
    this.category = ko.observable("Gain")
    this.selectedItems = ko.observableArray([]);

    this.painItems = ko.observableArray([]);
    this.gainItems = ko.observableArray([]);
    this.jobItems = ko.observableArray([]);

    this.gainProvider = new oj.ArrayDataProvider(this.gainItems, { 'keyAttributes': 'id' });
    this.painProvider = new oj.ArrayDataProvider(this.painItems, { 'keyAttributes': 'id' });
    this.jobProvider = new oj.ArrayDataProvider(this.jobItems, { 'keyAttributes': 'id' });

    var lastItemId = this.allItems().length;
    var self = this;
    this.addItem = () => {
      if ((self.itemToAdd() != "") && (self.allItems.indexOf(self.itemToAdd()) < 0)) {
        lastItemId++;
        if (self.category() === "Gain") {
          self.gainItems.push({ 'id': lastItemId, 'text': self.itemToAdd(), 'category': self.category(), 'value': ko.observable(4) });
        } else if (self.category() === "Pain") {
          self.painItems.push({ 'id': lastItemId, 'text': self.itemToAdd(), 'category': self.category(), 'value': ko.observable(4) });
        } else if (self.category() === "Job") {
          self.jobItems.push({ 'id': lastItemId, 'text': self.itemToAdd(), 'category': self.category(), 'value': ko.observable(4) });
        }
      }
      self.itemToAdd("");
    }

    this.removeSelected = () => {
      $.each(self.selectedItems(), function (index, value) {
        self.gainItems.remove((item) => {
          if (item.category === "Gain")
            return (item.id == value);
        });
        self.painItems.remove((item) => {
          if (item.category === "Pain")
            return (item.id == value);
        });
        self.jobItems.remove((item) => {
          if (item.category === "Job")
            return (item.id == value);
        });
      });
    }
  };
  // Header Config
  self.headerConfig = ko.observable({ 'view': [], 'viewModel': null });
  moduleUtils.createView({ 'viewPath': 'views/header.html' }).then(function (view) {
    self.headerConfig({ 'view': view, 'viewModel': new app.getHeaderModel() })
  })

  // Below are a set of the ViewModel methods invoked by the oj-module component.
  // Please reference the oj-module jsDoc for additional information.

  /**
   * Optional ViewModel method invoked after the View is inserted into the
   * document DOM.  The application can put logic that requires the DOM being
   * attached here.
   * This method might be called multiple times - after the View is created
   * and inserted into the DOM and after the View is reconnected
   * after being disconnected.
   */
  self.connected = function () {
    // Implement if needed
  };

  /**
   * Optional ViewModel method invoked after the View is disconnected from the DOM.
   */
  self.disconnected = function () {
    // Implement if needed
  };

  /**
   * Optional ViewModel method invoked after transition to the new View is complete.
   * That includes any possible animation between the old and the new View.
   */
  self.transitionCompleted = function () {
    // Implement if needed
  };


  /*
   * Returns a constructor for the ViewModel so that the ViewModel is constructed
   * each time the view is displayed.  Return an instance of the ViewModel if
   * only one instance of the ViewModel is needed.
   */
  return new DashboardViewModel();
}
);
