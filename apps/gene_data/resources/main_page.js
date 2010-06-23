// ==========================================================================
// Project:   GeneData - mainPage
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals GeneData */

// This page describes the main user interface for your application.  
GeneData.mainPage = SC.Page.design({

  // The main pane is made visible on screen as soon as your app is loaded.
  // Add childViews to this pane for views to display immediately on page 
  // load.
  mainPane: SC.MainPane.design({
    defaultResponder: GeneData,

    childViews: 'sceneView'.w(),
    
    sceneView: SC.SceneView.design({
      scenes: "schemesLoading schemesFailed schemesLoaded".w(),
      nowShowingBinding: "GeneData.currentScene"
    }),

  }),

  //schemesLoading: SC.PanelPane.design({
  //  layout: { width: 400, height: 200, centerX: 0, centerY: 0 },
  //  title: 'Loading Naming Schemes...',
  //}),
  
  schemesLoading: SC.View.design({
    layout: { left: 0, right: 0, top: 0, bottom: 0 },
    childViews: 'labelView'.w(),
    
    labelView: SC.LabelView.design({
      layout: { width: 200, height: 32, centerX: 0, centerY: 0 },
      value: 'Loading naming schemes...'
    }),
  }),

  schemesFailed: SC.View.design({
    defaultResponder: GeneData,

    layout: { left: 0, right: 0, top: 0, bottom: 0 },
    childViews: 'failureMessage retryButton'.w(),
    
    failureMessage: SC.LabelView.design({
      textAlign: SC.ALIGN_CENTER,
      layout: { width: 250, height: 32, centerX: 0, centerY: 0 },
      value: 'Failed to load naming schemes'
    }),

    retryButton: SC.ButtonView.design({
      layout: { width: 100, height: 32, centerX:0, centerY: 32 },
      title: 'Retry',
      action: 'retryLoading'
    }),
  }),

  schemesLoaded: SC.View.design({
    layout: { left: 0, right: 0, top: 0, bottom: 0 },
    childViews: 'topView mainView bottomView'.w(),
    
    topView: SC.ToolbarView.design({
      layout: { left: 0, top: 0, right: 0, height: 32 },
      anchorLocation: SC.ANCHOR_TOP,

      childViews: 'titleView'.w(),

      titleView: SC.LabelView.design({
        layout: { left: 20, top: 4, width: 300, height: 24 },
        controlSize: SC.LARGE_CONTROL_SIZE,
        value: 'GeneData Import File Generator'
      }),
    }),

    mainView: SC.SplitView.design({
      layout: { left: 0, right: 0, top: 32, bottom: 32 },
      layoutDirection: SC.LAYOUT_HORIZONTAL,
			dividerThickness: 1,
      defaultThickness: 200,

      topLeftView: SC.View.design({
        childViews: 'schemeLabel schemeScroll'.w(),

        schemeLabel: SC.LabelView.design({
          classNames: ['scheme-label'],
          layout: { left: 4, top: 4, right: 4, height: 28 },
          controlSize: SC.MEDIUM_CONTROL_SIZE,
          value: 'Choose a naming scheme:',      
        }),

        schemeScroll: SC.ScrollView.design({
          borderStyle: SC.BORDER_NONE,
					hasHorizontalScroller: NO,
					contentView: SC.SourceListView.design({
            backgroundColor: '#D6DDE5',
						contentBinding: "GeneData.sourceController.arrangedObjects",
						selectionBinding: "GeneData.sourceController.selection",
						contentValueKey: "name",
						canEditContent: NO,
						canDeleteContent: NO,
						rowHeight:24,
					})
				}), // schemeScroll
      }), // topLeftView

      bottomRightView: SC.View.design({
        backgroundColor: '#EEEEEE',
        
        childViews: 'availableLabel availableScroll addButton removeButton selectedLabel selectedScroll'.w(),

        availableLabel: SC.LabelView.design({
          classNames: ['array-scroll-label'],
          layout: { left: 20, top: 20 },
          value: 'Available Arrays',
        }),

        availableScroll: SC.ScrollView.design({
          layout: { left: 20, top: 40, bottom: 20, width: 400 },

          contentView: SC.ListView.design({
            contentBinding: "GeneData.availableHybridizationsController.arrangedObjects",
            selectionBinding: "GeneData.availableHybridizationsController.selection",
            contentValueKey: "name",
          }),
        }),

        addButton: SC.ButtonView.design({
          layout: { left: 430, centerY: -15, width: 120, height: 24 },
          title: 'Add Array(s)',
          target: 'GeneData.selectedHybridizationsController',
          action: 'add',
        }),

        removeButton: SC.ButtonView.design({
          layout: { left: 430, centerY: 15, width: 120, height: 24 },
          title: 'Remove Array(s)',
          target: 'GeneData.selectedHybridizationsController',
          action: 'remove',
        }),

        selectedLabel: SC.LabelView.design({
          classNames: ['array-scroll-label'],
          layout: { left: 560, top: 20 },
          value: 'Selected Arrays',
        }),

        selectedScroll: SC.ScrollView.design({
          layout: { left: 560, top: 40, bottom: 20, width: 400 },

          contentView: SC.ListView.design({
            contentBinding: "GeneData.selectedHybridizationsController.arrangedObjects",
            selectionBinding: "GeneData.selectedHybridizationsController.selection",
            contentValueKey: "name",
          }),
        }),
      }),
    }),

    bottomView: SC.ToolbarView.design({
      layout: { left: 0, right: 0, botom: 0, height: 32},
      anchorLocation: SC.ANCHOR_BOTTOM,
    })
  }),

});
