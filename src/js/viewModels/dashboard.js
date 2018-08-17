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

    // page 1 data
    this.itemToAdd = ko.observable("");
    this.allItems = ko.observableArray([])
    this.category = ko.observable("Gain")
    this.selectedItems = ko.observableArray([]);

    this.painItems = ko.observableArray([]);
    this.gainItems = ko.observableArray([]);
    this.jobItems = ko.observableArray([]);
    this.doot = ko.observable("doot");

    this.gainProvider = new oj.ArrayDataProvider(this.gainItems, { 'keyAttributes': 'id' });
    this.painProvider = new oj.ArrayDataProvider(this.painItems, { 'keyAttributes': 'id' });
    this.jobProvider = new oj.ArrayDataProvider(this.jobItems, { 'keyAttributes': 'id' });

    // page 2 data
    this.itemToAdd2 = ko.observable("two");
    this.category2 = ko.observable("Gain Creator");
    this.selectedItems2 = ko.observable("");

    this.gainCreators = ko.observableArray([]);
    this.painRelievers = ko.observableArray([]);
    this.productsServices = ko.observableArray([]);

    this.gainCreatorsProvider = new oj.ArrayDataProvider(this.gainCreators, { 'keyAttributes': 'id' });
    this.painRelieversProvider = new oj.ArrayDataProvider(this.painRelievers, { 'keyAttributes': 'id' });
    this.productsServicesProvider = new oj.ArrayDataProvider(this.productsServices, { 'keyAttributes': 'id' });

    // page 3 data
    this.madlibSolution = ko.observable("");
    this.madlibSegment = ko.observable("");
    this.madlibTask = ko.observable("");
    this.madlibPainVerb = ko.observable("");
    this.madlibPainPhrase = ko.observable("");
    this.madlibGainVerb = ko.observable("");
    this.madlibGainPhrase = ko.observable("");
    this.madlibCompeting = ko.observable("");

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

    this.addItem2 = () => {
      // debugger
      if ((self.itemToAdd2() != "") && (self.allItems.indexOf(self.itemToAdd2()) < 0)) {
        lastItemId++;
        if (self.category2() === "Gain Creators") {
          self.gainCreators.push({ 'id': lastItemId, 'text': self.itemToAdd2(), 'category': self.category2(), 'value': ko.observable(4) });
        } else if (self.category2() === "Pain Relievers") {
          self.painRelievers.push({ 'id': lastItemId, 'text': self.itemToAdd2(), 'category': self.category2(), 'value': ko.observable(4) });
        } else if (self.category2() === "Products and Services") {
          self.productsServices.push({ 'id': lastItemId, 'text': self.itemToAdd2(), 'category': self.category2(), 'value': ko.observable(4) });
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
    this.removeSelected2 = () => {
      $.each(self.selectedItems(), function (index, value) {
        self.gainCreators.remove((item) => {
          if (item.category === "Gain Creators")
            return (item.id == value);
        });
        self.painRelievers.remove((item) => {
          if (item.category === "Pain Relievers")
            return (item.id == value);
        });
        self.productsServices.remove((item) => {
          if (item.category === "Products and Services")
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
