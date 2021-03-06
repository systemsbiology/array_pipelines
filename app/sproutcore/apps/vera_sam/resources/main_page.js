// ==========================================================================
// Project:   VeraSam - mainPage
// Copyright: ©2010 Institute for Systems Biology
// ==========================================================================
/*globals VeraSam */

// This page describes the main user interface for your application.  
VeraSam.mainPage = SC.Page.design({

  // The main pane is made visible on screen as soon as your app is loaded.
  // Add childViews to this pane for views to display immediately on page 
  // load.
  mainPane: SC.MainPane.design({
    defaultResponder: VeraSam,

    childViews: 'topView sceneView'.w(),
    
    topView: SC.ToolbarView.design({
      layout: { left: 0, top: 0, right: 0, height: 32 },
      anchorLocation: SC.ANCHOR_TOP,

      childViews: 'titleView'.w(),

      titleView: SC.LabelView.design({
        layout: { left: 20, top: 4, width: 400, height: 24 },
        controlSize: SC.LARGE_CONTROL_SIZE,
        value: 'Exiqon VERA/SAM 2-color Pipeline'
      })
    }),

    sceneView: SC.SceneView.design({
      layout: { left: 0, top: 32, right: 0, bottom: 0 },
      scenes: "labGroupsLoading labGroupsFailed labGroupsLoaded".w(),
      nowShowingBinding: "VeraSam.currentScene"
    })

  }),
  
  labGroupsLoading: SC.View.design({
    layout: { left: 0, right: 0, top: 0, bottom: 0 },
    childViews: 'labelView'.w(),
    
    labelView: SC.LabelView.design({
      layout: { width: 400, height: 32, centerX: 0, centerY: 0 },
	  controlSize: SC.LARGE_CONTROL_SIZE,
      fontWeight: SC.BOLD_WEIGHT,
      value: 'Loading lab groups and projects...'
    })
  }),

  labGroupsFailed: SC.View.design({
    defaultResponder: VeraSam,

    layout: { left: 0, right: 0, top: 0, bottom: 0 },
    childViews: 'failureMessage retryButton'.w(),
    
    failureMessage: SC.LabelView.design({
      textAlign: SC.ALIGN_CENTER,
      layout: { width: 250, height: 32, centerX: 0, centerY: 0 },
      value: 'Failed to load naming labGroups'
    }),

    retryButton: SC.ButtonView.design({
      layout: { width: 100, height: 32, centerX:0, centerY: 32 },
      title: 'Retry',
      action: 'retryLoading'
    })
  }),

  labGroupsLoaded: SC.View.design({
    layout: { left: 0, right: 0, top: 0, bottom: 0 },
    childViews: 'mainView'.w(),
    
    mainView: SC.SplitView.design({
      layout: { left: 0, right: 0, top: 0, bottom: 0 },
      layoutDirection: SC.LAYOUT_HORIZONTAL,
			dividerThickness: 1,
      defaultThickness: 200,

      topLeftView: SC.View.design({
        childViews: 'labGroupScroll'.w(),

        labGroupScroll: SC.ScrollView.design({
          borderStyle: SC.BORDER_NONE,
					hasHorizontalScroller: NO,
					contentView: SC.SourceListView.design({
            backgroundColor: '#D6DDE5',
						contentBinding: "VeraSam.sourceController.arrangedObjects",
						selectionBinding: "VeraSam.sourceController.selection",
						contentValueKey: "name",
						canEditContent: NO,
						canDeleteContent: NO,
						rowHeight:24
					})
				}) // labGroupScroll
      }), // topLeftView

      bottomRightView: SC.View.design({
        backgroundColor: '#EEEEEE',
        
        childViews: 'legend splitView'.w(),
        
        legend: Slimarray.LegendView.design({
          layout: { top: 10, left: 280, width: 400, height: 26 }
        }),

        splitView: SC.SplitView.design({
          dividerThickness: 0,
          defaultThickness: 0.55,
          autoresizeBehavior: SC.RESIZE_TOP_LEFT,

          topLeftView: SC.View.design({
            childViews: 'availableLabel availableScroll'.w(),

            availableLabel: SC.LabelView.design({
              classNames: ['array-scroll-label'],
              layout: { left: 20, top: 40 },
              value: 'Available Arrays'
            }),

            availableScroll: SC.ScrollView.design({
              layout: { left: 20, top: 60, bottom: 50, right: 10 },
          
              contentView: SC.ListView.design({
                contentBinding: "VeraSam.availableMicroarraysController.arrangedObjects",
                selectionBinding: "VeraSam.availableMicroarraysController.selection",
                contentValueKey: "displayName",
                hasContentIcon: YES,
                contentIconKey: "icon"
              })
            })
          }),

          bottomRightView: SC.View.design({
            childViews: 'addButton removeButton selectedLabel selectedScroll analyzeButton'.w(),

            addButton: SC.ButtonView.design({
              layout: { left: 0, centerY: -15, width: 120, height: 24 },
              title: 'Add Array(s)',
              target: 'VeraSam.selectedMicroarraysController',
              action: 'add',
              isEnabledBinding: 'VeraSam.availableMicroarraysController.hasSelection'
            }),

            removeButton: SC.ButtonView.design({
              layout: { left: 0, centerY: 15, width: 120, height: 24 },
              title: 'Remove Array(s)',
              target: 'VeraSam.selectedMicroarraysController',
              action: 'remove',
              isEnabledBinding: 'VeraSam.selectedMicroarraysController.hasSelection'
            }),

            selectedLabel: SC.LabelView.design({
              classNames: ['array-scroll-label'],
              layout: { left: 130, top: 40 },
              value: 'Selected Arrays'
            }),

            selectedScroll: SC.ScrollView.design({
              layout: { left: 130, top: 60, bottom: 50, right: 20 },
          
              contentView: SC.ListView.design({
                contentBinding: "VeraSam.selectedMicroarraysController.arrangedObjects",
                selectionBinding: "VeraSam.selectedMicroarraysController.selection",
                contentValueKey: "displayName",
                hasContentIcon: YES,
                contentIconKey: "icon",
                toolTipKey: "displayName"
              })
            }),

            analyzeButton: SC.ButtonView.design({
              layout: { right: 20, width: 120, bottom: 13, height: 24 },
              title: 'Download',
              isEnabledBinding: 'VeraSam.selectedMicroarraysController.hasArrays',
              action: 'runAnalysis'
            })
          })
        })
      })
    })
  }),

  samplesFailed: SC.PanelPane.design({
	defaultResponder: VeraSam,
	
    layout: { width: 400, height: 200, centerX: 0, centerY: 0 },

    contentView: SC.View.design({
      childViews: 'errorMessage retryButton cancelButton'.w(),

      errorMessage: SC.LabelView.design({
        layout: { top: 20, height: 32, left: 0, right: 0 },
        value: 'Loading samples from the server failed',
        textAlign: SC.ALIGN_CENTER,
        controlSize: SC.LARGE_CONTROL_SIZE
      }),

      retryButton: SC.ButtonView.design({
        layout: { bottom: 20, height: 32, right: 20, width: 100},
        title: 'Retry',
        isDefault: YES,
        action: 'retryLoading'
      }),

      cancelButton: SC.ButtonView.design({
        layout: { bottom: 20, height: 32, right: 130, width: 100},
        title: 'Cancel',
        action: 'cancelLoading'
      }),
    }),
  }),
  
  analysisRunning: SC.PanelPane.design({
    defaultResponder: VeraSam,
	
    layout: { width: 400, height: 200, centerX: 0, centerY: 0 },
    
    contentView: SC.View.design({
      childViews: 'message loadingIndicator cancelButton'.w(),
      
      message: SC.LabelView.design({
        layout: { top: 20, height: 32, left: 60, right: 0 },
        value: 'VERA/SAM Pipeline Running',
        controlSize: SC.LARGE_CONTROL_SIZE
      }),
      
      loadingIndicator: SC.ImageView.design({
        layout: { left: 20, top: 20, width: 32, height: 32 },
        value: 'icon-loading-32'
      }),
      
      cancelButton: SC.ButtonView.design({
        layout: { bottom: 20, centerX: 0, width: 100, height: 32 },
        title: 'Cancel',
        action: 'cancel'
      })
    })
  }),
  
  analysisFailed: SC.PanelPane.design({
    defaultResponder: VeraSam,
	
    layout: { width: 400, height: 200, centerX: 0, centerY: 0 },
    
    contentView: SC.View.design({
      childViews: 'errorMessage errorDetail retryButton cancelButton'.w(),

      errorMessage: SC.LabelView.design({
        layout: { top: 20, height: 32, left: 0, right: 0 },
        value: 'VERA/SAM pipeline failed',
        textAlign: SC.ALIGN_CENTER,
        controlSize: SC.LARGE_CONTROL_SIZE
      }),

      errorDetail: SC.LabelView.design({
        layout: { top: 60, height: 80, left: 10, right: 10 },
        textAlign: SC.ALIGN_CENTER,
        valueBinding: 'VeraSam.analysisController.failureMessage',
        escapeHTML: NO
      }),

      retryButton: SC.ButtonView.design({
        layout: { bottom: 20, height: 32, right: 20, width: 100},
        title: 'Retry',
        isDefault: YES,
        action: 'retry'
      }),

      cancelButton: SC.ButtonView.design({
        layout: { bottom: 20, height: 32, right: 130, width: 100},
        title: 'Cancel',
        action: 'cancel'
      }),
	})
  }),
  
  analysisDone: SC.PanelPane.design({
    defaultResponder: VeraSam,
	
    layout: { width: 400, height: 200, centerX: 0, centerY: 0 },
    
    contentView: SC.View.design({
      childViews: 'message resultLink closeButton'.w(),
      
      message: SC.LabelView.design({
        layout: { top: 20, height: 32, left: 0, right: 0 },
        textAlign: SC.ALIGN_CENTER,
        value: 'Download results',
        controlSize: SC.LARGE_CONTROL_SIZE
      }),
      
      resultLink: SC.LabelView.design({
        layout: { centerY: 0, height: 32, left: 0, right: 0 },
        textAlign: SC.ALIGN_CENTER,
        valueBinding: 'VeraSam.analysisController.hyperlink',
        escapeHTML: NO
      }),
      
      closeButton: SC.ButtonView.design({
        layout: { bottom: 20, centerX: 0, width: 100, height: 32 },
        title: 'Close',
        action: 'close'
      })
    })
  }),
});
