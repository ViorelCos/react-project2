export default [
  {
    id: '<95c14b602ea5930232b7cf8039002ae333f13194>',
    workflowInstanceId: 'F3MTBSPTA',
    appData: {
      workflowData: {
        harvestData: {
          loadingStatus: true,
          seedLine: 'Good seed'
        },
        popcode: {
          name: 'P1_F3MTBSPTA',
          address: '95c14b602ea5930232b7cf8039002ae333f13194',
          currentState: 'iceCreamFactory'
        },
        elevatorData: {
          received: true,
          notes: 'The elevator is full'
        },
        merchandiserData: {
          received: true,
          notes: 'Merchants are happy'
        },
        dairyData: {
          received: true,
          notes: 'The cows like the feed'
        },
        producerData: {
          received: true,
          notes: 'The milk is getting powdered'
        },
        factoryData: {
          received: true,
          notes: 'Yum'
        }
      },
      spot: 'complete',
      workflowName: 'unileverV1',
      workflowInstanceId: 'F3MTBSPTA',
      workflowRootPopcode: 'true',
      popcodeName: 'P1_F3MTBSPTA',
      workflowDef: {
        title: 'Unilever V1',
        name: 'unileverV1',
        startScreen: 'Home',
        version: '1.0',
        steps: {
          harvestCorn: {
            step: 'harvestCorn',
            title: 'Harvest Corn',
            screen: 'HarvestCorn',
            roles: ['farmer', 'root']
          },
          grainElevator: {
            step: 'grainElevator',
            title: 'Grain Elevator',
            screen: 'GrainElevator',
            roles: ['farmer', 'root'],
            complete: [
              {
                operation: 'navigate',
                screen: 'Home',
                resetStack: true,
                forceUpdate: true
              }
            ]
          },
          merchandiser: {
            step: 'merchandiser',
            title: 'Merchandiser',
            screen: 'Merchandiser',
            roles: ['merchandiser', 'root'],
            complete: [
              {
                operation: 'navigate',
                screen: 'Home',
                resetStack: true,
                forceUpdate: true
              }
            ]
          },
          dairyFarmer: {
            step: 'dairyFarmer',
            title: 'Dairy Farmer',
            screen: 'DairyFarmer',
            roles: ['farmer', 'root'],
            complete: [
              {
                operation: 'navigate',
                screen: 'Home',
                resetStack: true,
                forceUpdate: true
              }
            ]
          },
          milkProducder: {
            step: 'milkProducder',
            title: 'Milk Producer',
            screen: 'MilkProducer',
            roles: ['farmer', 'root'],
            complete: [
              {
                operation: 'navigate',
                screen: 'Home',
                resetStack: true,
                forceUpdate: true
              }
            ]
          },
          iceCreamFactory: {
            step: 'iceCreamFactory',
            title: 'Unilever Ice Cream Factory',
            screen: 'IceCreamFactory',
            roles: ['merchandiser', 'root'],
            complete: [
              {
                operation: 'navigate',
                screen: 'Home',
                resetStack: true,
                forceUpdate: true
              }
            ]
          },
          complete: {
            step: 'process.complete',
            title: 'Process Complete',
            screen: 'Completed',
            roles: ['merchandiser', 'farmer', 'root']
          }
        },
        screens: {
          HarvestCorn: {
            name: 'HarvestCorn',
            title: 'Harvest Corn',
            parameters: {
              popcode: '@popcode',
              user: '@user'
            },
            outputs: {
              popcode: '@popcode'
            },
            screenForm: {
              options: {
                auto: 'labels'
              },
              fields: {
                type: 'object',
                description: 'Harvest Corn',
                properties: {
                  harvestData: {
                    type: 'object',
                    properties: {
                      loadingStatus: {
                        type: 'boolean',
                        options: {
                          editable: true
                        }
                      },
                      seedLine: {
                        type: 'string',
                        options: {
                          editable: true
                        }
                      }
                    },
                    required: ['seedLine']
                  }
                }
              }
            },
            screenButtons: {
              ok: {
                title: 'Ok',
                roles: ['farmer', 'root'],
                action: [
                  {
                    operation: 'contract',
                    contract: 'harvestCornOk',
                    parameters: {
                      popcode: '@popcode'
                    },
                    outputs: {
                      status: '@status',
                      txId: '@txId'
                    }
                  },
                  {
                    operation: 'navigate',
                    screen: 'Home',
                    resetStack: true,
                    forceUpdate: true
                  }
                ]
              },
              cancel: {
                title: 'Cancel',
                action: [
                  {
                    operation: 'navigate',
                    screen: 'Home',
                    resetStack: true
                  }
                ]
              }
            }
          },
          GrainElevator: {
            name: 'GrainElevator',
            title: 'Grain Elevator',
            parameters: {
              popcode: '@popcode',
              user: '@user'
            },
            outputs: {
              popcode: '@popcode'
            },
            screenForm: {
              options: {
                auto: 'labels'
              },
              fields: {
                type: 'object',
                properties: {
                  popcode: {
                    type: 'object',
                    properties: {
                      name: {
                        type: 'string',
                        value: '@popcode.popcodeName',
                        options: {
                          editable: false
                        }
                      },
                      address: {
                        type: 'string',
                        value: '@popcode.address',
                        options: {
                          editable: false
                        }
                      },
                      currentState: {
                        type: 'string',
                        value: '@popcode.spot',
                        options: {
                          editable: false
                        }
                      }
                    },
                    required: ['name', 'address', 'currentState']
                  },
                  elevatorData: {
                    type: 'object',
                    properties: {
                      received: {
                        type: 'boolean',
                        options: {
                          editable: true
                        }
                      },
                      notes: {
                        type: 'string',
                        options: {
                          editable: true
                        }
                      }
                    }
                  }
                }
              }
            },
            screenButtons: {
              ok: {
                title: 'Ok',
                roles: ['farmer', 'root'],
                action: [
                  {
                    operation: 'contract',
                    contract: 'grainElevatorOk',
                    parameters: {
                      popcode: '@popcode'
                    },
                    outputs: {
                      status: '@status',
                      txId: '@txId'
                    }
                  }
                ]
              },
              cancel: {
                title: 'Cancel',
                action: [
                  {
                    operation: 'navigate',
                    screen: 'Home',
                    resetStack: true
                  }
                ]
              }
            }
          },
          Merchandiser: {
            name: 'Merchandiser',
            title: 'Merchandiser',
            parameters: {
              popcode: '@popcode',
              user: '@user'
            },
            outputs: {
              popcode: '@popcode'
            },
            screenForm: {
              options: {
                auto: 'labels'
              },
              fields: {
                type: 'object',
                description: 'Merchandiser',
                properties: {
                  popcode: {
                    type: 'object',
                    properties: {
                      name: {
                        type: 'string',
                        value: '@popcode.popcodeName',
                        options: {
                          editable: false
                        }
                      },
                      address: {
                        type: 'string',
                        value: '@popcode.address',
                        options: {
                          editable: false
                        }
                      },
                      currentState: {
                        type: 'string',
                        value: '@popcode.spot',
                        options: {
                          editable: false
                        }
                      }
                    },
                    required: ['name', 'address', 'currentState']
                  },
                  merchandiserData: {
                    type: 'object',
                    properties: {
                      received: {
                        type: 'boolean',
                        options: {
                          editable: true
                        }
                      },
                      notes: {
                        type: 'string',
                        options: {
                          editable: true
                        }
                      }
                    }
                  }
                }
              }
            },
            screenButtons: {
              ok: {
                title: 'Ok',
                action: [
                  {
                    operation: 'contract',
                    contract: 'merchandiserOk',
                    parameters: {
                      popcode: '@popcode'
                    },
                    outputs: {
                      status: '@status',
                      txId: '@txId'
                    }
                  }
                ]
              },
              cancel: {
                title: 'Cancel',
                action: [
                  {
                    operation: 'navigate',
                    screen: 'Home',
                    resetStack: true
                  }
                ]
              }
            }
          },
          DairyFarmer: {
            name: 'DairyFarmer',
            title: 'Dairy Farmer',
            parameters: {
              popcode: '@popcode',
              user: '@user'
            },
            outputs: {
              popcode: '@popcode'
            },
            screenForm: {
              options: {
                auto: 'labels'
              },
              fields: {
                type: 'object',
                description: 'Dairy Farmer',
                properties: {
                  popcode: {
                    type: 'object',
                    properties: {
                      name: {
                        type: 'string',
                        value: '@popcode.popcodeName',
                        options: {
                          editable: false
                        }
                      },
                      address: {
                        type: 'string',
                        value: '@popcode.address',
                        options: {
                          editable: false
                        }
                      },
                      currentState: {
                        type: 'string',
                        value: '@popcode.spot',
                        options: {
                          editable: false
                        }
                      }
                    },
                    required: ['name', 'address', 'currentState']
                  },
                  dairyData: {
                    type: 'object',
                    properties: {
                      received: {
                        type: 'boolean',
                        options: {
                          editable: true
                        }
                      },
                      notes: {
                        type: 'string',
                        options: {
                          editable: true
                        }
                      }
                    }
                  }
                }
              }
            },
            screenButtons: {
              ok: {
                title: 'Ok',
                roles: ['farmer', 'root'],
                action: [
                  {
                    operation: 'contract',
                    contract: 'dairyFarmerOk',
                    parameters: {
                      popcode: '@popcode'
                    },
                    outputs: {
                      status: '@status',
                      txId: '@txId'
                    }
                  }
                ]
              },
              cancel: {
                title: 'Cancel',
                action: [
                  {
                    operation: 'navigate',
                    screen: 'Home',
                    resetStack: true
                  }
                ]
              }
            }
          },
          MilkProducer: {
            name: 'MilkProducer',
            title: 'Milk Producer',
            parameters: {
              popcode: '@popcode',
              user: '@user'
            },
            outputs: {
              popcode: '@popcode'
            },
            screenForm: {
              options: {
                auto: 'labels'
              },
              fields: {
                type: 'object',
                description: 'Milk Producer',
                properties: {
                  popcode: {
                    type: 'object',
                    properties: {
                      name: {
                        type: 'string',
                        value: '@popcode.popcodeName',
                        options: {
                          editable: false
                        }
                      },
                      address: {
                        type: 'string',
                        value: '@popcode.address',
                        options: {
                          editable: false
                        }
                      },
                      currentState: {
                        type: 'string',
                        value: '@popcode.spot',
                        options: {
                          editable: false
                        }
                      }
                    },
                    required: ['name', 'address', 'currentState']
                  },
                  producerData: {
                    type: 'object',
                    properties: {
                      received: {
                        type: 'boolean',
                        options: {
                          editable: true
                        }
                      },
                      notes: {
                        type: 'string',
                        options: {
                          editable: true
                        }
                      }
                    }
                  }
                }
              }
            },
            screenButtons: {
              ok: {
                title: 'Ok',
                roles: ['farmer', 'root'],
                action: [
                  {
                    operation: 'contract',
                    contract: 'milkProducderOk',
                    parameters: {
                      popcode: '@popcode'
                    },
                    outputs: {
                      status: '@status',
                      txId: '@txId'
                    }
                  }
                ]
              },
              cancel: {
                title: 'Cancel',
                action: [
                  {
                    operation: 'navigate',
                    screen: 'Home',
                    resetStack: true
                  }
                ]
              }
            }
          },
          IceCreamFactory: {
            name: 'IceCreamFactory',
            title: 'IceCream Factory',
            parameters: {
              popcode: '@popcode',
              user: '@user'
            },
            outputs: {
              popcode: '@popcode'
            },
            screenForm: {
              options: {
                auto: 'labels'
              },
              fields: {
                type: 'object',
                description: 'IceCream Factory',
                properties: {
                  popcode: {
                    type: 'object',
                    properties: {
                      name: {
                        type: 'string',
                        value: '@popcode.popcodeName',
                        options: {
                          editable: false
                        }
                      },
                      address: {
                        type: 'string',
                        value: '@popcode.address',
                        options: {
                          editable: false
                        }
                      },
                      currentState: {
                        type: 'string',
                        value: '@popcode.spot',
                        options: {
                          editable: false
                        }
                      }
                    },
                    required: ['name', 'address', 'currentState']
                  },
                  factoryData: {
                    type: 'object',
                    properties: {
                      received: {
                        type: 'boolean',
                        options: {
                          editable: true
                        }
                      },
                      notes: {
                        type: 'string',
                        options: {
                          editable: true
                        }
                      }
                    }
                  }
                }
              }
            },
            screenButtons: {
              ok: {
                title: 'Ok',
                roles: ['merchandiser', 'root'],
                action: [
                  {
                    operation: 'contract',
                    contract: 'iceCreamFactoryOk',
                    parameters: {
                      popcode: '@popcode'
                    },
                    outputs: {
                      status: '@status',
                      txId: '@txId'
                    }
                  }
                ]
              },
              cancel: {
                title: 'Cancel',
                action: [
                  {
                    operation: 'navigate',
                    screen: 'Home',
                    resetStack: true
                  }
                ]
              }
            }
          },
          Home: {
            name: 'Home',
            title: 'Home',
            screenListItems: {
              fetchItems: '/popcodeByWorkflowName',
              method: 'get',
              api: 'cayley',
              fetchParameters: {
                workflowName: 'unileverV1'
              },
              itemDataTypes: {
                popcode: 'object'
              },
              itemLabel: ['popcodeName'],
              itemActions: {
                click: {
                  title: 'Click',
                  parameters: {
                    popcode: '@item'
                  },
                  action: [
                    {
                      operation: 'startWorkflow',
                      parameters: {
                        spot: '@popcode.spot',
                        popcode: '@popcode'
                      },
                      replaceCurrent: false
                    }
                  ]
                }
              }
            },
            screenButtons: {
              scan: {
                title: 'Scan',
                roles: ['merchandiser', 'farmer', 'root'],
                action: [
                  {
                    operation: 'navigate',
                    screen: 'Scan'
                  }
                ]
              },
              harvest: {
                title: 'Harvest',
                roles: ['farmer', 'root'],
                action: [
                  {
                    operation: 'navigate',
                    screen: 'HarvestCorn'
                  }
                ]
              }
            }
          },
          Scan: {
            name: 'Scan',
            title: 'Scan',
            api: '/api/mobile',
            modal: false,
            parameters: {
              user: '@user'
            },
            startAction: [
              {
                operation: 'scanBarcode',
                barcodeTypes: ['qr', 'code128'],
                outputs: {
                  scanData: '@scanData'
                }
              },
              {
                operation: 'routePopcode',
                parameters: {
                  scanData: '@scanData'
                },
                outputs: {
                  address: '@address'
                }
              },
              {
                operation: 'fetch',
                route: '/p',
                method: 'get',
                parameters: {
                  address: '@address'
                },
                outputs: {
                  popcode: '@popcodes[0]'
                }
              },
              {
                operation: 'startWorkflow',
                parameters: {
                  spot: '@popcode.spot',
                  popcode: '@popcode',
                  container: '@popcode'
                },
                replaceCurrent: true
              }
            ],
            screenScan: {}
          },
          Completed: {
            name: 'Completed',
            title: 'Completed',
            api: '/api/mobile',
            parameters: {
              popcode: '@popcode'
            },
            screenForm: {
              options: {
                auto: 'labels'
              },
              fields: {
                type: 'object',
                description: 'Completed',
                properties: {
                  popcode: {
                    type: 'object',
                    properties: {
                      name: {
                        type: 'string',
                        value: '@popcode.popcodeName',
                        options: {
                          editable: false
                        }
                      },
                      address: {
                        type: 'string',
                        value: '@popcode.address',
                        options: {
                          editable: false
                        }
                      },
                      currentState: {
                        type: 'string',
                        value: '@popcode.spot',
                        options: {
                          editable: false
                        }
                      }
                    },
                    required: ['name', 'address', 'currentState']
                  }
                },
                required: ['popcode']
              }
            },
            screenButtons: {
              ok: {
                title: 'Ok',
                action: [
                  {
                    operation: 'navigate',
                    screen: 'Home',
                    resetStack: true
                  }
                ]
              }
            }
          }
        },
        contractLib: {
          name: 'Unilever SmartContract Library',
          version: '1.0',
          slug: 'uni_1_0',
          libs: [
            'base64_Y2xhc3MgU21hcnRDb250cmFjdEJhc2UgewogIGNvbnN0cnVjdG9yKGhvb2tzKSB7CiAgICAgIHRoaXMuaG9va3MgPSBob29rczsKICAgICAgdGhpcy5zdGF0ZSA9IGhvb2tzLnN0YXRlOwogICAgICB0aGlzLmRlYnVnTG9nID0gaG9va3MuZGVidWdMb2c7CiAgICAgIHRoaXMuZGVidWdMb2coJ2NvbnN0cnVjdCBTbWFydENvbnRyYWN0QmFzZScpOwogIH0KICBhc3luYyBiYWxhbmNlKGFkZHJlc3MpIHsKICAgIHZhciBhcGkgPSB0aGlzLmhvb2tzLnN0YWNrLmFwaTsKICAgIHZhciB1cmwgPSAnL3AvYmFsYW5jZS8nICsgYWRkcmVzczsKICAgIGNvbnN0IHJlcyA9IGF3YWl0IGFwaS5nZXQodXJsKTsKICAgIHJldHVybiByZXMuYm9keTsKICB9CiAgYXN5bmMgZ2VuUG9wY29kZShhZGRyZXNzKSB7CiAgICB2YXIgYXBpID0gdGhpcy5ob29rcy5zdGFjay5hcGk7CiAgICB2YXIgdXJsID0gJy9wL2dlbmVyYXRlJzsKICAgIGNvbnN0IHJlcyA9IGF3YWl0IGFwaS5nZXQodXJsKTsKICAgIHJldHVybiByZXMuYm9keTsKICB9CiAgYXN5bmMgY29udGFpbmVyUG9wY29kZShhZGRyZXNzKSB7CiAgICB2YXIgYXBpID0gdGhpcy5ob29rcy5zdGFjay5hcGlDYXlsZXk7CiAgICB2YXIgdXJsID0gJy9jb250YWluZXJQb3Bjb2RlLycgKyBhZGRyZXNzOwogICAgY29uc3QgcmVzID0gYXdhaXQgYXBpLmdldCh1cmwpOwogICAgcmV0dXJuIHJlcy5ib2R5OwogIH0KICBhc3luYyBib21Qb3Bjb2RlcyhhZGRyZXNzKSB7CiAgICB2YXIgYXBpID0gdGhpcy5ob29rcy5zdGFjay5hcGlDYXlsZXk7CiAgICB2YXIgdXJsID0gJy9ib21Qb3Bjb2Rlcy8nICsgYWRkcmVzczsKICAgIGNvbnN0IHJlcyA9IGF3YWl0IGFwaS5nZXQodXJsKTsKICAgIHJldHVybiByZXMuYm9keTsKICB9CiAgYXN5bmMgc2lnbk1lc3NhZ2UoZmllbGRzLHByaXZhdGVLZXkpIHsKICAgIHZhciBhcGkgPSB0aGlzLmhvb2tzLnN0YWNrLmFwaTsKICAgIHZhciBib2R5ID0gewogICAgICBmaWVsZHMsCiAgICAgIHByaXZhdGVLZXkKICAgIH07CiAgICB2YXIgdXJsID0gJy9jcnlwdG8vc2lnbk1lc3NhZ2UnOwogICAgY29uc3QgcmVzID0gYXdhaXQgYXBpLnBvc3QodXJsLCB7Ym9keX0pOwogICAgcmV0dXJuIHJlcy5ib2R5OwogIH0KICBhc3luYyBibG9iQ3JlYXRlV2l0aFNpZyhzaWcsYWRkcmVzcyxkYXRhLHB1YmxpY0tleSkgewogICAgdmFyIGFwaSA9IHRoaXMuaG9va3Muc3RhY2suYXBpOwogICAgdmFyIGJvZHkgPSB7CiAgICAgIHNpZywKICAgICAgYWRkcmVzcywKICAgICAgcHVibGljS2V5LAogICAgICBkYXRhCiAgICB9OwogICAgdmFyIHVybCA9ICcvcC9ibG9iQ3JlYXRlV2l0aFNpZyc7CiAgICBjb25zdCByZXMgPSBhd2FpdCBhcGkucG9zdCh1cmwsIHtib2R5fSk7CiAgICByZXR1cm4gcmVzLmJvZHk7CiAgfQogIGFzeW5jIGJsb2JDcmVhdGUoYWRkcmVzcyxkYXRhLHB1YmxpY0tleSxwcml2YXRlS2V5KSB7CiAgICB2YXIgZmllbGRzID0gW107CgogICAgdmFyIHJlcyA9IGF3YWl0IHRoaXMuYmFsYW5jZShhZGRyZXNzKTsKICAgIGZpZWxkcy5wdXNoKHJlcy5iYWxhbmNlLkNvdW50ZXIpOwogICAgZmllbGRzLnB1c2goYWRkcmVzcyk7CiAgICBmaWVsZHMucHVzaChkYXRhKTsKCiAgICByZXMgPSBhd2FpdCB0aGlzLnNpZ25NZXNzYWdlKGZpZWxkcyxwcml2YXRlS2V5KTsKCiAgICByZXMgPSBhd2FpdCB0aGlzLmJsb2JDcmVhdGVXaXRoU2lnKHJlcy5zaWcsYWRkcmVzcyxkYXRhLHB1YmxpY0tleSk7CgogICAgcmV0dXJuIHJlcy5ib2R5OwogIH0KICBhc3luYyBtaW50Q3JlYXRlV2l0aFNpZyhzaWcsYWRkcmVzcyxkYXRhLHB1YmxpY0tleSxhbW91bnQsdW5pdCkgewogICAgdmFyIGFwaSA9IHRoaXMuaG9va3Muc3RhY2suYXBpOwogICAgdmFyIGJvZHkgPSB7CiAgICAgIHNpZywKICAgICAgYWRkcmVzcywKICAgICAgcHVibGljS2V5LAogICAgICBhbW91bnQsCiAgICAgIHVuaXQsCiAgICAgIGRhdGEKICAgIH07CiAgICB2YXIgdXJsID0gJy9wL21pbnQnOwogICAgY29uc3QgcmVzID0gYXdhaXQgYXBpLnBvc3QodXJsLCB7Ym9keX0pOwogICAgcmV0dXJuIHJlczsKICB9CiAgYXN5bmMgbWludENyZWF0ZShhZGRyZXNzLGRhdGEscHVibGljS2V5LHByaXZhdGVLZXkpIHsKICAgIHZhciBmaWVsZHMgPSBbXTsKICAgIHZhciBhbW91bnQgPSAxOwogICAgdmFyIHVuaXQgPSAnY29udGFpbmVyJzsKCiAgICB2YXIgeyBiYWxhbmNlIH0gPSBhd2FpdCB0aGlzLmJhbGFuY2UoYWRkcmVzcyk7CiAgICAvLyB0aGlzLmRlYnVnTG9nKCcjIyMjIyMjIyMjIyMjIyMjIGJhbGFuY2UuQ291bnRlcjogJyArIGJhbGFuY2UuQ291bnRlcik7CiAgICBmaWVsZHMucHVzaChiYWxhbmNlLkNvdW50ZXIpOwogICAgZmllbGRzLnB1c2goYWRkcmVzcyk7CiAgICBmaWVsZHMucHVzaChhbW91bnQpOwogICAgZmllbGRzLnB1c2godW5pdCk7CiAgICBmaWVsZHMucHVzaChkYXRhKTsKCiAgICB2YXIgeyBzaWcgfSA9IGF3YWl0IHRoaXMuc2lnbk1lc3NhZ2UoZmllbGRzLHByaXZhdGVLZXkpOwoKICAgIHZhciByZXMgPSBhd2FpdCB0aGlzLm1pbnRDcmVhdGVXaXRoU2lnKHNpZyxhZGRyZXNzLGRhdGEscHVibGljS2V5LGFtb3VudCx1bml0KTsKCiAgICByZXR1cm4gcmVzOwogIH0KfTsK',
            'base64_Y2xhc3MgU21hcnRDb250cmFjdCBleHRlbmRzIFNtYXJ0Q29udHJhY3RCYXNlIHsKICBjb25zdHJ1Y3Rvcihob29rcykgewogICAgICBzdXBlcihob29rcykKICAgICAgdGhpcy5kZWJ1Z0xvZygnKioqKioqKioqKioqKiogU21hcnRDb250cmFjdCcpOwogIH0KCiAgYXN5bmMgZWNobygpIHsKICAgICAgdGhpcy5kZWJ1Z0xvZygnZWNobycpOwogICAgICB2YXIgcnZhbCA9IHsKICAgICAgICAgIGRhdGE6ICdoZWxsbycKICAgICAgfTsKICAgICAgdGhpcy5ob29rcy5maW5pc2gucmVzb2x2ZShydmFsKTsKICB9CgogIGFzeW5jIGhhcnZlc3RDb3JuT2soKSB7IHJldHVybiBhd2FpdCB0aGlzLm1pbnRTdGVwKCdoYXJ2ZXN0Q29ybicsICdncmFpbkVsZXZhdG9yJywgJ0Nvcm4gU2hpcHBlZCcpOyB9CiAgYXN5bmMgZ3JhaW5FbGV2YXRvck9rKCkgeyByZXR1cm4gYXdhaXQgdGhpcy5zdGVwT2soJ2dyYWluRWxldmF0b3InLCAnbWVyY2hhbmRpc2VyJywgJ2VsZXZhdG9yRGF0YScsICdHcmFpbiBFbGV2YXRvciByZWNlaXZlcycpOyB9CiAgYXN5bmMgbWVyY2hhbmRpc2VyT2soKSB7IHJldHVybiBhd2FpdCB0aGlzLnN0ZXBPaygnbWVyY2hhbmRpc2VyJywgJ2RhaXJ5RmFybWVyJywgJ21lcmNoYW5kaXNlckRhdGEnLCAnTWVyY2hhbmRpc2VyIHJlY2VpdmVzJyk7IH0KICBhc3luYyBkYWlyeUZhcm1lck9rKCkgeyByZXR1cm4gYXdhaXQgdGhpcy5zdGVwT2soJ2RhaXJ5RmFybWVyJywgJ21pbGtQcm9kdWNkZXInLCAnZGFpcnlEYXRhJywgJ0RhaXJ5IEZhcm1lciByZWNlaXZlcycpOyB9CiAgYXN5bmMgbWlsa1Byb2R1Y2Rlck9rKCkgeyByZXR1cm4gYXdhaXQgdGhpcy5zdGVwT2soJ21pbGtQcm9kdWNkZXInLCAnaWNlQ3JlYW1GYWN0b3J5JywgJ3Byb2R1Y2VyRGF0YScsICdNaWxrIFByb2R1Y2RlciByZWNlaXZlcycpOyB9CiAgYXN5bmMgaWNlQ3JlYW1GYWN0b3J5T2soKSB7IHJldHVybiBhd2FpdCB0aGlzLnN0ZXBPaygnaWNlQ3JlYW1GYWN0b3J5JywgJ2NvbXBsZXRlJywgJ2ZhY3RvcnlEYXRhJywgJ0ljZUNyZWFtIEZhY3RvcnkgcmVjZWl2ZXMnKTsgfQoKICBhc3luYyBzdGVwT2sobGFzdFNwb3QsIG5leHRTcG90LCBmaWVsZE5hbWUsIHN0ZXBUaXRsZSkgewogICAgICB0aGlzLmRlYnVnTG9nKCdleGVjdXRlIHN0ZXBPaycpOwoKICAgICAgdmFyIF8gPSB0aGlzLmhvb2tzLl87CiAgICAgIHZhciBwb3Bjb2RlID0gdGhpcy5zdGF0ZS5wb3Bjb2RlOwogICAgICB2YXIgYWRkcmVzcyA9IHBvcGNvZGUuYWRkcmVzczsKICAgICAgdmFyIGFwcCA9IHRoaXMuaG9va3MuYXBwOwogICAgICB2YXIgdXNlckNyZWRlbnRpYWxzID0gYXBwLmdldEFwcFN0YXRlKCd1c2VyQ3JlZGVudGlhbHMnKTsKICAgICAgdmFyIHB1YmxpY0tleSA9IHVzZXJDcmVkZW50aWFscy5wdWJsaWNLZXk7CiAgICAgIHZhciBwcml2YXRlS2V5ID0gdXNlckNyZWRlbnRpYWxzLnByaXZhdGVLZXk7CiAgICAgIHZhciBmb3JtID0gdGhpcy5zdGF0ZS5mb3JtOwogICAgICAvLyB2YXIgZm9ybURhdGEgPSBfLmdldChmb3JtLCBbZmllbGROYW1lXSk7CgogICAgICB2YXIgZGF0YSA9CiAgICAgICAgICB7CiAgICAgICAgICAgICJhcHBEYXRhIjogewogICAgICAgICAgICAgICJzdGVwTmFtZSI6IGxhc3RTcG90LAogICAgICAgICAgICAgIHN0ZXBUaXRsZSwKICAgICAgICAgICAgICAic3BvdCI6IG5leHRTcG90LAogICAgICAgICAgICAgICJ3b3JrZmxvd0RhdGEiOiBmb3JtCiAgICAgICAgICAgIH0KICAgICAgICAgIH07CgogICAgICB0aGlzLmRlYnVnTG9nKCdibG9iRGF0YScpOwogICAgICB0aGlzLmRlYnVnTG9nKGRhdGEpOwoKICAgICAgdmFyIHJlcyA9IGF3YWl0IHRoaXMuYmxvYkNyZWF0ZShhZGRyZXNzLGRhdGEscHVibGljS2V5LHByaXZhdGVLZXkpOwoKICAgICAgdmFyIHJ2YWwgPSB7CiAgICAgICAgICBhY3Rpb246IFtdCiAgICAgIH07CiAgICAgIHRoaXMuaG9va3MuZmluaXNoLnJlc29sdmUocnZhbCk7CiAgfQoKICBhc3luYyBtaW50U3RlcChsYXN0U3BvdCwgbmV4dFNwb3QsIHN0ZXBUaXRsZSkgewogICAgICB0aGlzLmRlYnVnTG9nKCdleGVjdXRlIG1pbnRTdGVwJyk7CgogICAgICB2YXIgc3MgPSB0aGlzLmhvb2tzLnNjcmVlblN0YXRlOwogICAgICB2YXIgYXBwID0gdGhpcy5ob29rcy5hcHA7CiAgICAgIHZhciB1c2VyQ3JlZGVudGlhbHMgPSBhcHAuZ2V0QXBwU3RhdGUoJ3VzZXJDcmVkZW50aWFscycpOwogICAgICB2YXIgcHVibGljS2V5ID0gdXNlckNyZWRlbnRpYWxzLnB1YmxpY0tleTsKICAgICAgdmFyIHByaXZhdGVLZXkgPSB1c2VyQ3JlZGVudGlhbHMucHJpdmF0ZUtleTsKICAgICAgdmFyIHdvcmtmbG93ID0gc3Mud29ya2Zsb3c7CiAgICAgIHZhciBuZXdJZCA9IHRoaXMuaG9va3Muc2hvcnRpZC5nZW5lcmF0ZSgpOwogICAgICB2YXIgeyBmb3JtIH0gPSB0aGlzLnN0YXRlOwogICAgICAvLyB0aGlzLmRlYnVnTG9nKCcjIyMjIyMjIyMjIyMjICBuZXdJZDogJyArIG5ld0lkKTsKICAgICAgdmFyIHsgcG9wY29kZSB9ID0gYXdhaXQgdGhpcy5nZW5Qb3Bjb2RlKCk7CiAgICAgIHZhciB7IGFkZHJlc3MgfSA9IHBvcGNvZGU7CgogICAgICB2YXIgZGF0YSA9CiAgICAgICAgICB7CiAgICAgICAgICAgICJhcHBEYXRhIjogewogICAgICAgICAgICAgICJ3b3JrZmxvd0RhdGEiOiBmb3JtLAogICAgICAgICAgICAgICJzcG90IjogbGFzdFNwb3QsCiAgICAgICAgICAgICAgIndvcmtmbG93TmFtZSI6IHNzLndvcmtmbG93Lm5hbWUsCiAgICAgICAgICAgICAgIndvcmtmbG93SW5zdGFuY2VJZCI6IG5ld0lkLAogICAgICAgICAgICAgICJ3b3JrZmxvd1Jvb3RQb3Bjb2RlIjogInRydWUiLAogICAgICAgICAgICAgICJwb3Bjb2RlTmFtZSI6ICdQMV8nICsgbmV3SWQsCiAgICAgICAgICAgICAgIndvcmtmbG93RGVmIjogd29ya2Zsb3cKICAgICAgICAgICAgfQogICAgICAgICAgfTsKCiAgICAgIHRoaXMuZGVidWdMb2coJ21pbnREYXRhJyk7CiAgICAgIHRoaXMuZGVidWdMb2coZGF0YSk7CgogICAgICB2YXIgcmVzID0gYXdhaXQgdGhpcy5taW50Q3JlYXRlKGFkZHJlc3MsZGF0YSxwdWJsaWNLZXkscHJpdmF0ZUtleSk7CiAgICAgIC8vIHRoaXMuZGVidWdMb2coJ3RoaXMubWludENyZWF0ZSByZXMuYm9keTogJyArIHJlcy5ib2R5KTsKCiAgICAgIHZhciBkYXRhID0KICAgICAgICAgIHsKICAgICAgICAgICAgImFwcERhdGEiOiB7CiAgICAgICAgICAgICAgInN0ZXBOYW1lIjogbGFzdFNwb3QsCiAgICAgICAgICAgICAgc3RlcFRpdGxlLAogICAgICAgICAgICAgICJzcG90IjogbmV4dFNwb3QsCiAgICAgICAgICAgICAgIndvcmtmbG93RGF0YSI6IGZvcm0KICAgICAgICAgICAgfQogICAgICAgICAgfTsKCiAgICAgIHRoaXMuZGVidWdMb2coJ2Jsb2JEYXRhJyk7CiAgICAgIHRoaXMuZGVidWdMb2coZGF0YSk7CgogICAgICB2YXIgcmVzID0gYXdhaXQgdGhpcy5ibG9iQ3JlYXRlKGFkZHJlc3MsZGF0YSxwdWJsaWNLZXkscHJpdmF0ZUtleSk7CgogICAgICB2YXIgcnZhbCA9IHsKICAgICAgICAgIGFjdGlvbjogW10KICAgICAgfTsKICAgICAgdGhpcy5ob29rcy5maW5pc2gucmVzb2x2ZShydmFsKTsKICB9Cgp9Owo='
          ]
        }
      },
      timestamp: 1519700915204,
      stepName: 'iceCreamFactory',
      stepTitle: 'IceCream Factory receives'
    },
    publicKey: 'AzFSqglD2Tz0BHF7fyc5OZ0NYkqslptvM8W2ghgAjmAN',
    spot: 'complete',
    unit: 'container',
    type: 'popcode',
    popcodeName: 'P1_F3MTBSPTA',
    amount: '1',
    workflowDef: {
      title: 'Unilever V1',
      name: 'unileverV1',
      startScreen: 'Home',
      version: '1.0',
      steps: {
        harvestCorn: {
          step: 'harvestCorn',
          title: 'Harvest Corn',
          screen: 'HarvestCorn',
          roles: ['farmer', 'root']
        },
        grainElevator: {
          step: 'grainElevator',
          title: 'Grain Elevator',
          screen: 'GrainElevator',
          roles: ['farmer', 'root'],
          complete: [
            {
              operation: 'navigate',
              screen: 'Home',
              resetStack: true,
              forceUpdate: true
            }
          ]
        },
        merchandiser: {
          step: 'merchandiser',
          title: 'Merchandiser',
          screen: 'Merchandiser',
          roles: ['merchandiser', 'root'],
          complete: [
            {
              operation: 'navigate',
              screen: 'Home',
              resetStack: true,
              forceUpdate: true
            }
          ]
        },
        dairyFarmer: {
          step: 'dairyFarmer',
          title: 'Dairy Farmer',
          screen: 'DairyFarmer',
          roles: ['farmer', 'root'],
          complete: [
            {
              operation: 'navigate',
              screen: 'Home',
              resetStack: true,
              forceUpdate: true
            }
          ]
        },
        milkProducder: {
          step: 'milkProducder',
          title: 'Milk Producer',
          screen: 'MilkProducer',
          roles: ['farmer', 'root'],
          complete: [
            {
              operation: 'navigate',
              screen: 'Home',
              resetStack: true,
              forceUpdate: true
            }
          ]
        },
        iceCreamFactory: {
          step: 'iceCreamFactory',
          title: 'Unilever Ice Cream Factory',
          screen: 'IceCreamFactory',
          roles: ['merchandiser', 'root'],
          complete: [
            {
              operation: 'navigate',
              screen: 'Home',
              resetStack: true,
              forceUpdate: true
            }
          ]
        },
        complete: {
          step: 'process.complete',
          title: 'Process Complete',
          screen: 'Completed',
          roles: ['merchandiser', 'farmer', 'root']
        }
      },
      screens: {
        HarvestCorn: {
          name: 'HarvestCorn',
          title: 'Harvest Corn',
          parameters: {
            popcode: '@popcode',
            user: '@user'
          },
          outputs: {
            popcode: '@popcode'
          },
          screenForm: {
            options: {
              auto: 'labels'
            },
            fields: {
              type: 'object',
              description: 'Harvest Corn',
              properties: {
                harvestData: {
                  type: 'object',
                  properties: {
                    loadingStatus: {
                      type: 'boolean',
                      options: {
                        editable: true
                      }
                    },
                    seedLine: {
                      type: 'string',
                      options: {
                        editable: true
                      }
                    }
                  },
                  required: ['seedLine']
                }
              }
            }
          },
          screenButtons: {
            ok: {
              title: 'Ok',
              roles: ['farmer', 'root'],
              action: [
                {
                  operation: 'contract',
                  contract: 'harvestCornOk',
                  parameters: {
                    popcode: '@popcode'
                  },
                  outputs: {
                    status: '@status',
                    txId: '@txId'
                  }
                },
                {
                  operation: 'navigate',
                  screen: 'Home',
                  resetStack: true,
                  forceUpdate: true
                }
              ]
            },
            cancel: {
              title: 'Cancel',
              action: [
                {
                  operation: 'navigate',
                  screen: 'Home',
                  resetStack: true
                }
              ]
            }
          }
        },
        GrainElevator: {
          name: 'GrainElevator',
          title: 'Grain Elevator',
          parameters: {
            popcode: '@popcode',
            user: '@user'
          },
          outputs: {
            popcode: '@popcode'
          },
          screenForm: {
            options: {
              auto: 'labels'
            },
            fields: {
              type: 'object',
              properties: {
                popcode: {
                  type: 'object',
                  properties: {
                    name: {
                      type: 'string',
                      value: '@popcode.popcodeName',
                      options: {
                        editable: false
                      }
                    },
                    address: {
                      type: 'string',
                      value: '@popcode.address',
                      options: {
                        editable: false
                      }
                    },
                    currentState: {
                      type: 'string',
                      value: '@popcode.spot',
                      options: {
                        editable: false
                      }
                    }
                  },
                  required: ['name', 'address', 'currentState']
                },
                elevatorData: {
                  type: 'object',
                  properties: {
                    received: {
                      type: 'boolean',
                      options: {
                        editable: true
                      }
                    },
                    notes: {
                      type: 'string',
                      options: {
                        editable: true
                      }
                    }
                  }
                }
              }
            }
          },
          screenButtons: {
            ok: {
              title: 'Ok',
              roles: ['farmer', 'root'],
              action: [
                {
                  operation: 'contract',
                  contract: 'grainElevatorOk',
                  parameters: {
                    popcode: '@popcode'
                  },
                  outputs: {
                    status: '@status',
                    txId: '@txId'
                  }
                }
              ]
            },
            cancel: {
              title: 'Cancel',
              action: [
                {
                  operation: 'navigate',
                  screen: 'Home',
                  resetStack: true
                }
              ]
            }
          }
        },
        Merchandiser: {
          name: 'Merchandiser',
          title: 'Merchandiser',
          parameters: {
            popcode: '@popcode',
            user: '@user'
          },
          outputs: {
            popcode: '@popcode'
          },
          screenForm: {
            options: {
              auto: 'labels'
            },
            fields: {
              type: 'object',
              description: 'Merchandiser',
              properties: {
                popcode: {
                  type: 'object',
                  properties: {
                    name: {
                      type: 'string',
                      value: '@popcode.popcodeName',
                      options: {
                        editable: false
                      }
                    },
                    address: {
                      type: 'string',
                      value: '@popcode.address',
                      options: {
                        editable: false
                      }
                    },
                    currentState: {
                      type: 'string',
                      value: '@popcode.spot',
                      options: {
                        editable: false
                      }
                    }
                  },
                  required: ['name', 'address', 'currentState']
                },
                merchandiserData: {
                  type: 'object',
                  properties: {
                    received: {
                      type: 'boolean',
                      options: {
                        editable: true
                      }
                    },
                    notes: {
                      type: 'string',
                      options: {
                        editable: true
                      }
                    }
                  }
                }
              }
            }
          },
          screenButtons: {
            ok: {
              title: 'Ok',
              action: [
                {
                  operation: 'contract',
                  contract: 'merchandiserOk',
                  parameters: {
                    popcode: '@popcode'
                  },
                  outputs: {
                    status: '@status',
                    txId: '@txId'
                  }
                }
              ]
            },
            cancel: {
              title: 'Cancel',
              action: [
                {
                  operation: 'navigate',
                  screen: 'Home',
                  resetStack: true
                }
              ]
            }
          }
        },
        DairyFarmer: {
          name: 'DairyFarmer',
          title: 'Dairy Farmer',
          parameters: {
            popcode: '@popcode',
            user: '@user'
          },
          outputs: {
            popcode: '@popcode'
          },
          screenForm: {
            options: {
              auto: 'labels'
            },
            fields: {
              type: 'object',
              description: 'Dairy Farmer',
              properties: {
                popcode: {
                  type: 'object',
                  properties: {
                    name: {
                      type: 'string',
                      value: '@popcode.popcodeName',
                      options: {
                        editable: false
                      }
                    },
                    address: {
                      type: 'string',
                      value: '@popcode.address',
                      options: {
                        editable: false
                      }
                    },
                    currentState: {
                      type: 'string',
                      value: '@popcode.spot',
                      options: {
                        editable: false
                      }
                    }
                  },
                  required: ['name', 'address', 'currentState']
                },
                dairyData: {
                  type: 'object',
                  properties: {
                    received: {
                      type: 'boolean',
                      options: {
                        editable: true
                      }
                    },
                    notes: {
                      type: 'string',
                      options: {
                        editable: true
                      }
                    }
                  }
                }
              }
            }
          },
          screenButtons: {
            ok: {
              title: 'Ok',
              roles: ['farmer', 'root'],
              action: [
                {
                  operation: 'contract',
                  contract: 'dairyFarmerOk',
                  parameters: {
                    popcode: '@popcode'
                  },
                  outputs: {
                    status: '@status',
                    txId: '@txId'
                  }
                }
              ]
            },
            cancel: {
              title: 'Cancel',
              action: [
                {
                  operation: 'navigate',
                  screen: 'Home',
                  resetStack: true
                }
              ]
            }
          }
        },
        MilkProducer: {
          name: 'MilkProducer',
          title: 'Milk Producer',
          parameters: {
            popcode: '@popcode',
            user: '@user'
          },
          outputs: {
            popcode: '@popcode'
          },
          screenForm: {
            options: {
              auto: 'labels'
            },
            fields: {
              type: 'object',
              description: 'Milk Producer',
              properties: {
                popcode: {
                  type: 'object',
                  properties: {
                    name: {
                      type: 'string',
                      value: '@popcode.popcodeName',
                      options: {
                        editable: false
                      }
                    },
                    address: {
                      type: 'string',
                      value: '@popcode.address',
                      options: {
                        editable: false
                      }
                    },
                    currentState: {
                      type: 'string',
                      value: '@popcode.spot',
                      options: {
                        editable: false
                      }
                    }
                  },
                  required: ['name', 'address', 'currentState']
                },
                producerData: {
                  type: 'object',
                  properties: {
                    received: {
                      type: 'boolean',
                      options: {
                        editable: true
                      }
                    },
                    notes: {
                      type: 'string',
                      options: {
                        editable: true
                      }
                    }
                  }
                }
              }
            }
          },
          screenButtons: {
            ok: {
              title: 'Ok',
              roles: ['farmer', 'root'],
              action: [
                {
                  operation: 'contract',
                  contract: 'milkProducderOk',
                  parameters: {
                    popcode: '@popcode'
                  },
                  outputs: {
                    status: '@status',
                    txId: '@txId'
                  }
                }
              ]
            },
            cancel: {
              title: 'Cancel',
              action: [
                {
                  operation: 'navigate',
                  screen: 'Home',
                  resetStack: true
                }
              ]
            }
          }
        },
        IceCreamFactory: {
          name: 'IceCreamFactory',
          title: 'IceCream Factory',
          parameters: {
            popcode: '@popcode',
            user: '@user'
          },
          outputs: {
            popcode: '@popcode'
          },
          screenForm: {
            options: {
              auto: 'labels'
            },
            fields: {
              type: 'object',
              description: 'IceCream Factory',
              properties: {
                popcode: {
                  type: 'object',
                  properties: {
                    name: {
                      type: 'string',
                      value: '@popcode.popcodeName',
                      options: {
                        editable: false
                      }
                    },
                    address: {
                      type: 'string',
                      value: '@popcode.address',
                      options: {
                        editable: false
                      }
                    },
                    currentState: {
                      type: 'string',
                      value: '@popcode.spot',
                      options: {
                        editable: false
                      }
                    }
                  },
                  required: ['name', 'address', 'currentState']
                },
                factoryData: {
                  type: 'object',
                  properties: {
                    received: {
                      type: 'boolean',
                      options: {
                        editable: true
                      }
                    },
                    notes: {
                      type: 'string',
                      options: {
                        editable: true
                      }
                    }
                  }
                }
              }
            }
          },
          screenButtons: {
            ok: {
              title: 'Ok',
              roles: ['merchandiser', 'root'],
              action: [
                {
                  operation: 'contract',
                  contract: 'iceCreamFactoryOk',
                  parameters: {
                    popcode: '@popcode'
                  },
                  outputs: {
                    status: '@status',
                    txId: '@txId'
                  }
                }
              ]
            },
            cancel: {
              title: 'Cancel',
              action: [
                {
                  operation: 'navigate',
                  screen: 'Home',
                  resetStack: true
                }
              ]
            }
          }
        },
        Home: {
          name: 'Home',
          title: 'Home',
          screenListItems: {
            fetchItems: '/popcodeByWorkflowName',
            method: 'get',
            api: 'cayley',
            fetchParameters: {
              workflowName: 'unileverV1'
            },
            itemDataTypes: {
              popcode: 'object'
            },
            itemLabel: ['popcodeName'],
            itemActions: {
              click: {
                title: 'Click',
                parameters: {
                  popcode: '@item'
                },
                action: [
                  {
                    operation: 'startWorkflow',
                    parameters: {
                      spot: '@popcode.spot',
                      popcode: '@popcode'
                    },
                    replaceCurrent: false
                  }
                ]
              }
            }
          },
          screenButtons: {
            scan: {
              title: 'Scan',
              roles: ['merchandiser', 'farmer', 'root'],
              action: [
                {
                  operation: 'navigate',
                  screen: 'Scan'
                }
              ]
            },
            harvest: {
              title: 'Harvest',
              roles: ['farmer', 'root'],
              action: [
                {
                  operation: 'navigate',
                  screen: 'HarvestCorn'
                }
              ]
            }
          }
        },
        Scan: {
          name: 'Scan',
          title: 'Scan',
          api: '/api/mobile',
          modal: false,
          parameters: {
            user: '@user'
          },
          startAction: [
            {
              operation: 'scanBarcode',
              barcodeTypes: ['qr', 'code128'],
              outputs: {
                scanData: '@scanData'
              }
            },
            {
              operation: 'routePopcode',
              parameters: {
                scanData: '@scanData'
              },
              outputs: {
                address: '@address'
              }
            },
            {
              operation: 'fetch',
              route: '/p',
              method: 'get',
              parameters: {
                address: '@address'
              },
              outputs: {
                popcode: '@popcodes[0]'
              }
            },
            {
              operation: 'startWorkflow',
              parameters: {
                spot: '@popcode.spot',
                popcode: '@popcode',
                container: '@popcode'
              },
              replaceCurrent: true
            }
          ],
          screenScan: {}
        },
        Completed: {
          name: 'Completed',
          title: 'Completed',
          api: '/api/mobile',
          parameters: {
            popcode: '@popcode'
          },
          screenForm: {
            options: {
              auto: 'labels'
            },
            fields: {
              type: 'object',
              description: 'Completed',
              properties: {
                popcode: {
                  type: 'object',
                  properties: {
                    name: {
                      type: 'string',
                      value: '@popcode.popcodeName',
                      options: {
                        editable: false
                      }
                    },
                    address: {
                      type: 'string',
                      value: '@popcode.address',
                      options: {
                        editable: false
                      }
                    },
                    currentState: {
                      type: 'string',
                      value: '@popcode.spot',
                      options: {
                        editable: false
                      }
                    }
                  },
                  required: ['name', 'address', 'currentState']
                }
              },
              required: ['popcode']
            }
          },
          screenButtons: {
            ok: {
              title: 'Ok',
              action: [
                {
                  operation: 'navigate',
                  screen: 'Home',
                  resetStack: true
                }
              ]
            }
          }
        }
      },
      contractLib: {
        name: 'Unilever SmartContract Library',
        version: '1.0',
        slug: 'uni_1_0',
        libs: [
          'base64_Y2xhc3MgU21hcnRDb250cmFjdEJhc2UgewogIGNvbnN0cnVjdG9yKGhvb2tzKSB7CiAgICAgIHRoaXMuaG9va3MgPSBob29rczsKICAgICAgdGhpcy5zdGF0ZSA9IGhvb2tzLnN0YXRlOwogICAgICB0aGlzLmRlYnVnTG9nID0gaG9va3MuZGVidWdMb2c7CiAgICAgIHRoaXMuZGVidWdMb2coJ2NvbnN0cnVjdCBTbWFydENvbnRyYWN0QmFzZScpOwogIH0KICBhc3luYyBiYWxhbmNlKGFkZHJlc3MpIHsKICAgIHZhciBhcGkgPSB0aGlzLmhvb2tzLnN0YWNrLmFwaTsKICAgIHZhciB1cmwgPSAnL3AvYmFsYW5jZS8nICsgYWRkcmVzczsKICAgIGNvbnN0IHJlcyA9IGF3YWl0IGFwaS5nZXQodXJsKTsKICAgIHJldHVybiByZXMuYm9keTsKICB9CiAgYXN5bmMgZ2VuUG9wY29kZShhZGRyZXNzKSB7CiAgICB2YXIgYXBpID0gdGhpcy5ob29rcy5zdGFjay5hcGk7CiAgICB2YXIgdXJsID0gJy9wL2dlbmVyYXRlJzsKICAgIGNvbnN0IHJlcyA9IGF3YWl0IGFwaS5nZXQodXJsKTsKICAgIHJldHVybiByZXMuYm9keTsKICB9CiAgYXN5bmMgY29udGFpbmVyUG9wY29kZShhZGRyZXNzKSB7CiAgICB2YXIgYXBpID0gdGhpcy5ob29rcy5zdGFjay5hcGlDYXlsZXk7CiAgICB2YXIgdXJsID0gJy9jb250YWluZXJQb3Bjb2RlLycgKyBhZGRyZXNzOwogICAgY29uc3QgcmVzID0gYXdhaXQgYXBpLmdldCh1cmwpOwogICAgcmV0dXJuIHJlcy5ib2R5OwogIH0KICBhc3luYyBib21Qb3Bjb2RlcyhhZGRyZXNzKSB7CiAgICB2YXIgYXBpID0gdGhpcy5ob29rcy5zdGFjay5hcGlDYXlsZXk7CiAgICB2YXIgdXJsID0gJy9ib21Qb3Bjb2Rlcy8nICsgYWRkcmVzczsKICAgIGNvbnN0IHJlcyA9IGF3YWl0IGFwaS5nZXQodXJsKTsKICAgIHJldHVybiByZXMuYm9keTsKICB9CiAgYXN5bmMgc2lnbk1lc3NhZ2UoZmllbGRzLHByaXZhdGVLZXkpIHsKICAgIHZhciBhcGkgPSB0aGlzLmhvb2tzLnN0YWNrLmFwaTsKICAgIHZhciBib2R5ID0gewogICAgICBmaWVsZHMsCiAgICAgIHByaXZhdGVLZXkKICAgIH07CiAgICB2YXIgdXJsID0gJy9jcnlwdG8vc2lnbk1lc3NhZ2UnOwogICAgY29uc3QgcmVzID0gYXdhaXQgYXBpLnBvc3QodXJsLCB7Ym9keX0pOwogICAgcmV0dXJuIHJlcy5ib2R5OwogIH0KICBhc3luYyBibG9iQ3JlYXRlV2l0aFNpZyhzaWcsYWRkcmVzcyxkYXRhLHB1YmxpY0tleSkgewogICAgdmFyIGFwaSA9IHRoaXMuaG9va3Muc3RhY2suYXBpOwogICAgdmFyIGJvZHkgPSB7CiAgICAgIHNpZywKICAgICAgYWRkcmVzcywKICAgICAgcHVibGljS2V5LAogICAgICBkYXRhCiAgICB9OwogICAgdmFyIHVybCA9ICcvcC9ibG9iQ3JlYXRlV2l0aFNpZyc7CiAgICBjb25zdCByZXMgPSBhd2FpdCBhcGkucG9zdCh1cmwsIHtib2R5fSk7CiAgICByZXR1cm4gcmVzLmJvZHk7CiAgfQogIGFzeW5jIGJsb2JDcmVhdGUoYWRkcmVzcyxkYXRhLHB1YmxpY0tleSxwcml2YXRlS2V5KSB7CiAgICB2YXIgZmllbGRzID0gW107CgogICAgdmFyIHJlcyA9IGF3YWl0IHRoaXMuYmFsYW5jZShhZGRyZXNzKTsKICAgIGZpZWxkcy5wdXNoKHJlcy5iYWxhbmNlLkNvdW50ZXIpOwogICAgZmllbGRzLnB1c2goYWRkcmVzcyk7CiAgICBmaWVsZHMucHVzaChkYXRhKTsKCiAgICByZXMgPSBhd2FpdCB0aGlzLnNpZ25NZXNzYWdlKGZpZWxkcyxwcml2YXRlS2V5KTsKCiAgICByZXMgPSBhd2FpdCB0aGlzLmJsb2JDcmVhdGVXaXRoU2lnKHJlcy5zaWcsYWRkcmVzcyxkYXRhLHB1YmxpY0tleSk7CgogICAgcmV0dXJuIHJlcy5ib2R5OwogIH0KICBhc3luYyBtaW50Q3JlYXRlV2l0aFNpZyhzaWcsYWRkcmVzcyxkYXRhLHB1YmxpY0tleSxhbW91bnQsdW5pdCkgewogICAgdmFyIGFwaSA9IHRoaXMuaG9va3Muc3RhY2suYXBpOwogICAgdmFyIGJvZHkgPSB7CiAgICAgIHNpZywKICAgICAgYWRkcmVzcywKICAgICAgcHVibGljS2V5LAogICAgICBhbW91bnQsCiAgICAgIHVuaXQsCiAgICAgIGRhdGEKICAgIH07CiAgICB2YXIgdXJsID0gJy9wL21pbnQnOwogICAgY29uc3QgcmVzID0gYXdhaXQgYXBpLnBvc3QodXJsLCB7Ym9keX0pOwogICAgcmV0dXJuIHJlczsKICB9CiAgYXN5bmMgbWludENyZWF0ZShhZGRyZXNzLGRhdGEscHVibGljS2V5LHByaXZhdGVLZXkpIHsKICAgIHZhciBmaWVsZHMgPSBbXTsKICAgIHZhciBhbW91bnQgPSAxOwogICAgdmFyIHVuaXQgPSAnY29udGFpbmVyJzsKCiAgICB2YXIgeyBiYWxhbmNlIH0gPSBhd2FpdCB0aGlzLmJhbGFuY2UoYWRkcmVzcyk7CiAgICAvLyB0aGlzLmRlYnVnTG9nKCcjIyMjIyMjIyMjIyMjIyMjIGJhbGFuY2UuQ291bnRlcjogJyArIGJhbGFuY2UuQ291bnRlcik7CiAgICBmaWVsZHMucHVzaChiYWxhbmNlLkNvdW50ZXIpOwogICAgZmllbGRzLnB1c2goYWRkcmVzcyk7CiAgICBmaWVsZHMucHVzaChhbW91bnQpOwogICAgZmllbGRzLnB1c2godW5pdCk7CiAgICBmaWVsZHMucHVzaChkYXRhKTsKCiAgICB2YXIgeyBzaWcgfSA9IGF3YWl0IHRoaXMuc2lnbk1lc3NhZ2UoZmllbGRzLHByaXZhdGVLZXkpOwoKICAgIHZhciByZXMgPSBhd2FpdCB0aGlzLm1pbnRDcmVhdGVXaXRoU2lnKHNpZyxhZGRyZXNzLGRhdGEscHVibGljS2V5LGFtb3VudCx1bml0KTsKCiAgICByZXR1cm4gcmVzOwogIH0KfTsK',
          'base64_Y2xhc3MgU21hcnRDb250cmFjdCBleHRlbmRzIFNtYXJ0Q29udHJhY3RCYXNlIHsKICBjb25zdHJ1Y3Rvcihob29rcykgewogICAgICBzdXBlcihob29rcykKICAgICAgdGhpcy5kZWJ1Z0xvZygnKioqKioqKioqKioqKiogU21hcnRDb250cmFjdCcpOwogIH0KCiAgYXN5bmMgZWNobygpIHsKICAgICAgdGhpcy5kZWJ1Z0xvZygnZWNobycpOwogICAgICB2YXIgcnZhbCA9IHsKICAgICAgICAgIGRhdGE6ICdoZWxsbycKICAgICAgfTsKICAgICAgdGhpcy5ob29rcy5maW5pc2gucmVzb2x2ZShydmFsKTsKICB9CgogIGFzeW5jIGhhcnZlc3RDb3JuT2soKSB7IHJldHVybiBhd2FpdCB0aGlzLm1pbnRTdGVwKCdoYXJ2ZXN0Q29ybicsICdncmFpbkVsZXZhdG9yJywgJ0Nvcm4gU2hpcHBlZCcpOyB9CiAgYXN5bmMgZ3JhaW5FbGV2YXRvck9rKCkgeyByZXR1cm4gYXdhaXQgdGhpcy5zdGVwT2soJ2dyYWluRWxldmF0b3InLCAnbWVyY2hhbmRpc2VyJywgJ2VsZXZhdG9yRGF0YScsICdHcmFpbiBFbGV2YXRvciByZWNlaXZlcycpOyB9CiAgYXN5bmMgbWVyY2hhbmRpc2VyT2soKSB7IHJldHVybiBhd2FpdCB0aGlzLnN0ZXBPaygnbWVyY2hhbmRpc2VyJywgJ2RhaXJ5RmFybWVyJywgJ21lcmNoYW5kaXNlckRhdGEnLCAnTWVyY2hhbmRpc2VyIHJlY2VpdmVzJyk7IH0KICBhc3luYyBkYWlyeUZhcm1lck9rKCkgeyByZXR1cm4gYXdhaXQgdGhpcy5zdGVwT2soJ2RhaXJ5RmFybWVyJywgJ21pbGtQcm9kdWNkZXInLCAnZGFpcnlEYXRhJywgJ0RhaXJ5IEZhcm1lciByZWNlaXZlcycpOyB9CiAgYXN5bmMgbWlsa1Byb2R1Y2Rlck9rKCkgeyByZXR1cm4gYXdhaXQgdGhpcy5zdGVwT2soJ21pbGtQcm9kdWNkZXInLCAnaWNlQ3JlYW1GYWN0b3J5JywgJ3Byb2R1Y2VyRGF0YScsICdNaWxrIFByb2R1Y2RlciByZWNlaXZlcycpOyB9CiAgYXN5bmMgaWNlQ3JlYW1GYWN0b3J5T2soKSB7IHJldHVybiBhd2FpdCB0aGlzLnN0ZXBPaygnaWNlQ3JlYW1GYWN0b3J5JywgJ2NvbXBsZXRlJywgJ2ZhY3RvcnlEYXRhJywgJ0ljZUNyZWFtIEZhY3RvcnkgcmVjZWl2ZXMnKTsgfQoKICBhc3luYyBzdGVwT2sobGFzdFNwb3QsIG5leHRTcG90LCBmaWVsZE5hbWUsIHN0ZXBUaXRsZSkgewogICAgICB0aGlzLmRlYnVnTG9nKCdleGVjdXRlIHN0ZXBPaycpOwoKICAgICAgdmFyIF8gPSB0aGlzLmhvb2tzLl87CiAgICAgIHZhciBwb3Bjb2RlID0gdGhpcy5zdGF0ZS5wb3Bjb2RlOwogICAgICB2YXIgYWRkcmVzcyA9IHBvcGNvZGUuYWRkcmVzczsKICAgICAgdmFyIGFwcCA9IHRoaXMuaG9va3MuYXBwOwogICAgICB2YXIgdXNlckNyZWRlbnRpYWxzID0gYXBwLmdldEFwcFN0YXRlKCd1c2VyQ3JlZGVudGlhbHMnKTsKICAgICAgdmFyIHB1YmxpY0tleSA9IHVzZXJDcmVkZW50aWFscy5wdWJsaWNLZXk7CiAgICAgIHZhciBwcml2YXRlS2V5ID0gdXNlckNyZWRlbnRpYWxzLnByaXZhdGVLZXk7CiAgICAgIHZhciBmb3JtID0gdGhpcy5zdGF0ZS5mb3JtOwogICAgICAvLyB2YXIgZm9ybURhdGEgPSBfLmdldChmb3JtLCBbZmllbGROYW1lXSk7CgogICAgICB2YXIgZGF0YSA9CiAgICAgICAgICB7CiAgICAgICAgICAgICJhcHBEYXRhIjogewogICAgICAgICAgICAgICJzdGVwTmFtZSI6IGxhc3RTcG90LAogICAgICAgICAgICAgIHN0ZXBUaXRsZSwKICAgICAgICAgICAgICAic3BvdCI6IG5leHRTcG90LAogICAgICAgICAgICAgICJ3b3JrZmxvd0RhdGEiOiBmb3JtCiAgICAgICAgICAgIH0KICAgICAgICAgIH07CgogICAgICB0aGlzLmRlYnVnTG9nKCdibG9iRGF0YScpOwogICAgICB0aGlzLmRlYnVnTG9nKGRhdGEpOwoKICAgICAgdmFyIHJlcyA9IGF3YWl0IHRoaXMuYmxvYkNyZWF0ZShhZGRyZXNzLGRhdGEscHVibGljS2V5LHByaXZhdGVLZXkpOwoKICAgICAgdmFyIHJ2YWwgPSB7CiAgICAgICAgICBhY3Rpb246IFtdCiAgICAgIH07CiAgICAgIHRoaXMuaG9va3MuZmluaXNoLnJlc29sdmUocnZhbCk7CiAgfQoKICBhc3luYyBtaW50U3RlcChsYXN0U3BvdCwgbmV4dFNwb3QsIHN0ZXBUaXRsZSkgewogICAgICB0aGlzLmRlYnVnTG9nKCdleGVjdXRlIG1pbnRTdGVwJyk7CgogICAgICB2YXIgc3MgPSB0aGlzLmhvb2tzLnNjcmVlblN0YXRlOwogICAgICB2YXIgYXBwID0gdGhpcy5ob29rcy5hcHA7CiAgICAgIHZhciB1c2VyQ3JlZGVudGlhbHMgPSBhcHAuZ2V0QXBwU3RhdGUoJ3VzZXJDcmVkZW50aWFscycpOwogICAgICB2YXIgcHVibGljS2V5ID0gdXNlckNyZWRlbnRpYWxzLnB1YmxpY0tleTsKICAgICAgdmFyIHByaXZhdGVLZXkgPSB1c2VyQ3JlZGVudGlhbHMucHJpdmF0ZUtleTsKICAgICAgdmFyIHdvcmtmbG93ID0gc3Mud29ya2Zsb3c7CiAgICAgIHZhciBuZXdJZCA9IHRoaXMuaG9va3Muc2hvcnRpZC5nZW5lcmF0ZSgpOwogICAgICB2YXIgeyBmb3JtIH0gPSB0aGlzLnN0YXRlOwogICAgICAvLyB0aGlzLmRlYnVnTG9nKCcjIyMjIyMjIyMjIyMjICBuZXdJZDogJyArIG5ld0lkKTsKICAgICAgdmFyIHsgcG9wY29kZSB9ID0gYXdhaXQgdGhpcy5nZW5Qb3Bjb2RlKCk7CiAgICAgIHZhciB7IGFkZHJlc3MgfSA9IHBvcGNvZGU7CgogICAgICB2YXIgZGF0YSA9CiAgICAgICAgICB7CiAgICAgICAgICAgICJhcHBEYXRhIjogewogICAgICAgICAgICAgICJ3b3JrZmxvd0RhdGEiOiBmb3JtLAogICAgICAgICAgICAgICJzcG90IjogbGFzdFNwb3QsCiAgICAgICAgICAgICAgIndvcmtmbG93TmFtZSI6IHNzLndvcmtmbG93Lm5hbWUsCiAgICAgICAgICAgICAgIndvcmtmbG93SW5zdGFuY2VJZCI6IG5ld0lkLAogICAgICAgICAgICAgICJ3b3JrZmxvd1Jvb3RQb3Bjb2RlIjogInRydWUiLAogICAgICAgICAgICAgICJwb3Bjb2RlTmFtZSI6ICdQMV8nICsgbmV3SWQsCiAgICAgICAgICAgICAgIndvcmtmbG93RGVmIjogd29ya2Zsb3cKICAgICAgICAgICAgfQogICAgICAgICAgfTsKCiAgICAgIHRoaXMuZGVidWdMb2coJ21pbnREYXRhJyk7CiAgICAgIHRoaXMuZGVidWdMb2coZGF0YSk7CgogICAgICB2YXIgcmVzID0gYXdhaXQgdGhpcy5taW50Q3JlYXRlKGFkZHJlc3MsZGF0YSxwdWJsaWNLZXkscHJpdmF0ZUtleSk7CiAgICAgIC8vIHRoaXMuZGVidWdMb2coJ3RoaXMubWludENyZWF0ZSByZXMuYm9keTogJyArIHJlcy5ib2R5KTsKCiAgICAgIHZhciBkYXRhID0KICAgICAgICAgIHsKICAgICAgICAgICAgImFwcERhdGEiOiB7CiAgICAgICAgICAgICAgInN0ZXBOYW1lIjogbGFzdFNwb3QsCiAgICAgICAgICAgICAgc3RlcFRpdGxlLAogICAgICAgICAgICAgICJzcG90IjogbmV4dFNwb3QsCiAgICAgICAgICAgICAgIndvcmtmbG93RGF0YSI6IGZvcm0KICAgICAgICAgICAgfQogICAgICAgICAgfTsKCiAgICAgIHRoaXMuZGVidWdMb2coJ2Jsb2JEYXRhJyk7CiAgICAgIHRoaXMuZGVidWdMb2coZGF0YSk7CgogICAgICB2YXIgcmVzID0gYXdhaXQgdGhpcy5ibG9iQ3JlYXRlKGFkZHJlc3MsZGF0YSxwdWJsaWNLZXkscHJpdmF0ZUtleSk7CgogICAgICB2YXIgcnZhbCA9IHsKICAgICAgICAgIGFjdGlvbjogW10KICAgICAgfTsKICAgICAgdGhpcy5ob29rcy5maW5pc2gucmVzb2x2ZShydmFsKTsKICB9Cgp9Owo='
        ]
      }
    },
    address: '95c14b602ea5930232b7cf8039002ae333f13194',
    workflowRootPopcode: 'true',
    transaction: [
      {
        id:
          '<2da574d9c138a6177562d576348acc919feced9aa7099a1696be5209d278f235>',
        popcode: '<95c14b602ea5930232b7cf8039002ae333f13194>',
        spot: 'harvestCorn',
        unit: 'container',
        txId:
          '2da574d9c138a6177562d576348acc919feced9aa7099a1696be5209d278f235',
        data: {
          metadata: {
            appData: {
              workflowData: {
                harvestData: {
                  loadingStatus: true,
                  seedLine: 'Good seed'
                }
              },
              spot: 'harvestCorn',
              workflowName: 'unileverV1',
              workflowInstanceId: 'F3MTBSPTA',
              workflowRootPopcode: 'true',
              popcodeName: 'P1_F3MTBSPTA',
              workflowDef: {
                title: 'Unilever V1',
                name: 'unileverV1',
                startScreen: 'Home',
                version: '1.0',
                steps: {
                  harvestCorn: {
                    step: 'harvestCorn',
                    title: 'Harvest Corn',
                    screen: 'HarvestCorn',
                    roles: ['farmer', 'root']
                  },
                  grainElevator: {
                    step: 'grainElevator',
                    title: 'Grain Elevator',
                    screen: 'GrainElevator',
                    roles: ['farmer', 'root'],
                    complete: [
                      {
                        operation: 'navigate',
                        screen: 'Home',
                        resetStack: true,
                        forceUpdate: true
                      }
                    ]
                  },
                  merchandiser: {
                    step: 'merchandiser',
                    title: 'Merchandiser',
                    screen: 'Merchandiser',
                    roles: ['merchandiser', 'root'],
                    complete: [
                      {
                        operation: 'navigate',
                        screen: 'Home',
                        resetStack: true,
                        forceUpdate: true
                      }
                    ]
                  },
                  dairyFarmer: {
                    step: 'dairyFarmer',
                    title: 'Dairy Farmer',
                    screen: 'DairyFarmer',
                    roles: ['farmer', 'root'],
                    complete: [
                      {
                        operation: 'navigate',
                        screen: 'Home',
                        resetStack: true,
                        forceUpdate: true
                      }
                    ]
                  },
                  milkProducder: {
                    step: 'milkProducder',
                    title: 'Milk Producer',
                    screen: 'MilkProducer',
                    roles: ['farmer', 'root'],
                    complete: [
                      {
                        operation: 'navigate',
                        screen: 'Home',
                        resetStack: true,
                        forceUpdate: true
                      }
                    ]
                  },
                  iceCreamFactory: {
                    step: 'iceCreamFactory',
                    title: 'Unilever Ice Cream Factory',
                    screen: 'IceCreamFactory',
                    roles: ['merchandiser', 'root'],
                    complete: [
                      {
                        operation: 'navigate',
                        screen: 'Home',
                        resetStack: true,
                        forceUpdate: true
                      }
                    ]
                  },
                  complete: {
                    step: 'process.complete',
                    title: 'Process Complete',
                    screen: 'Completed',
                    roles: ['merchandiser', 'farmer', 'root']
                  }
                },
                screens: {
                  HarvestCorn: {
                    name: 'HarvestCorn',
                    title: 'Harvest Corn',
                    parameters: {
                      popcode: '@popcode',
                      user: '@user'
                    },
                    outputs: {
                      popcode: '@popcode'
                    },
                    screenForm: {
                      options: {
                        auto: 'labels'
                      },
                      fields: {
                        type: 'object',
                        description: 'Harvest Corn',
                        properties: {
                          harvestData: {
                            type: 'object',
                            properties: {
                              loadingStatus: {
                                type: 'boolean',
                                options: {
                                  editable: true
                                }
                              },
                              seedLine: {
                                type: 'string',
                                options: {
                                  editable: true
                                }
                              }
                            },
                            required: ['seedLine']
                          }
                        }
                      }
                    },
                    screenButtons: {
                      ok: {
                        title: 'Ok',
                        roles: ['farmer', 'root'],
                        action: [
                          {
                            operation: 'contract',
                            contract: 'harvestCornOk',
                            parameters: {
                              popcode: '@popcode'
                            },
                            outputs: {
                              status: '@status',
                              txId: '@txId'
                            }
                          },
                          {
                            operation: 'navigate',
                            screen: 'Home',
                            resetStack: true,
                            forceUpdate: true
                          }
                        ]
                      },
                      cancel: {
                        title: 'Cancel',
                        action: [
                          {
                            operation: 'navigate',
                            screen: 'Home',
                            resetStack: true
                          }
                        ]
                      }
                    }
                  },
                  GrainElevator: {
                    name: 'GrainElevator',
                    title: 'Grain Elevator',
                    parameters: {
                      popcode: '@popcode',
                      user: '@user'
                    },
                    outputs: {
                      popcode: '@popcode'
                    },
                    screenForm: {
                      options: {
                        auto: 'labels'
                      },
                      fields: {
                        type: 'object',
                        properties: {
                          popcode: {
                            type: 'object',
                            properties: {
                              name: {
                                type: 'string',
                                value: '@popcode.popcodeName',
                                options: {
                                  editable: false
                                }
                              },
                              address: {
                                type: 'string',
                                value: '@popcode.address',
                                options: {
                                  editable: false
                                }
                              },
                              currentState: {
                                type: 'string',
                                value: '@popcode.spot',
                                options: {
                                  editable: false
                                }
                              }
                            },
                            required: ['name', 'address', 'currentState']
                          },
                          elevatorData: {
                            type: 'object',
                            properties: {
                              received: {
                                type: 'boolean',
                                options: {
                                  editable: true
                                }
                              },
                              notes: {
                                type: 'string',
                                options: {
                                  editable: true
                                }
                              }
                            }
                          }
                        }
                      }
                    },
                    screenButtons: {
                      ok: {
                        title: 'Ok',
                        roles: ['farmer', 'root'],
                        action: [
                          {
                            operation: 'contract',
                            contract: 'grainElevatorOk',
                            parameters: {
                              popcode: '@popcode'
                            },
                            outputs: {
                              status: '@status',
                              txId: '@txId'
                            }
                          }
                        ]
                      },
                      cancel: {
                        title: 'Cancel',
                        action: [
                          {
                            operation: 'navigate',
                            screen: 'Home',
                            resetStack: true
                          }
                        ]
                      }
                    }
                  },
                  Merchandiser: {
                    name: 'Merchandiser',
                    title: 'Merchandiser',
                    parameters: {
                      popcode: '@popcode',
                      user: '@user'
                    },
                    outputs: {
                      popcode: '@popcode'
                    },
                    screenForm: {
                      options: {
                        auto: 'labels'
                      },
                      fields: {
                        type: 'object',
                        description: 'Merchandiser',
                        properties: {
                          popcode: {
                            type: 'object',
                            properties: {
                              name: {
                                type: 'string',
                                value: '@popcode.popcodeName',
                                options: {
                                  editable: false
                                }
                              },
                              address: {
                                type: 'string',
                                value: '@popcode.address',
                                options: {
                                  editable: false
                                }
                              },
                              currentState: {
                                type: 'string',
                                value: '@popcode.spot',
                                options: {
                                  editable: false
                                }
                              }
                            },
                            required: ['name', 'address', 'currentState']
                          },
                          merchandiserData: {
                            type: 'object',
                            properties: {
                              received: {
                                type: 'boolean',
                                options: {
                                  editable: true
                                }
                              },
                              notes: {
                                type: 'string',
                                options: {
                                  editable: true
                                }
                              }
                            }
                          }
                        }
                      }
                    },
                    screenButtons: {
                      ok: {
                        title: 'Ok',
                        action: [
                          {
                            operation: 'contract',
                            contract: 'merchandiserOk',
                            parameters: {
                              popcode: '@popcode'
                            },
                            outputs: {
                              status: '@status',
                              txId: '@txId'
                            }
                          }
                        ]
                      },
                      cancel: {
                        title: 'Cancel',
                        action: [
                          {
                            operation: 'navigate',
                            screen: 'Home',
                            resetStack: true
                          }
                        ]
                      }
                    }
                  },
                  DairyFarmer: {
                    name: 'DairyFarmer',
                    title: 'Dairy Farmer',
                    parameters: {
                      popcode: '@popcode',
                      user: '@user'
                    },
                    outputs: {
                      popcode: '@popcode'
                    },
                    screenForm: {
                      options: {
                        auto: 'labels'
                      },
                      fields: {
                        type: 'object',
                        description: 'Dairy Farmer',
                        properties: {
                          popcode: {
                            type: 'object',
                            properties: {
                              name: {
                                type: 'string',
                                value: '@popcode.popcodeName',
                                options: {
                                  editable: false
                                }
                              },
                              address: {
                                type: 'string',
                                value: '@popcode.address',
                                options: {
                                  editable: false
                                }
                              },
                              currentState: {
                                type: 'string',
                                value: '@popcode.spot',
                                options: {
                                  editable: false
                                }
                              }
                            },
                            required: ['name', 'address', 'currentState']
                          },
                          dairyData: {
                            type: 'object',
                            properties: {
                              received: {
                                type: 'boolean',
                                options: {
                                  editable: true
                                }
                              },
                              notes: {
                                type: 'string',
                                options: {
                                  editable: true
                                }
                              }
                            }
                          }
                        }
                      }
                    },
                    screenButtons: {
                      ok: {
                        title: 'Ok',
                        roles: ['farmer', 'root'],
                        action: [
                          {
                            operation: 'contract',
                            contract: 'dairyFarmerOk',
                            parameters: {
                              popcode: '@popcode'
                            },
                            outputs: {
                              status: '@status',
                              txId: '@txId'
                            }
                          }
                        ]
                      },
                      cancel: {
                        title: 'Cancel',
                        action: [
                          {
                            operation: 'navigate',
                            screen: 'Home',
                            resetStack: true
                          }
                        ]
                      }
                    }
                  },
                  MilkProducer: {
                    name: 'MilkProducer',
                    title: 'Milk Producer',
                    parameters: {
                      popcode: '@popcode',
                      user: '@user'
                    },
                    outputs: {
                      popcode: '@popcode'
                    },
                    screenForm: {
                      options: {
                        auto: 'labels'
                      },
                      fields: {
                        type: 'object',
                        description: 'Milk Producer',
                        properties: {
                          popcode: {
                            type: 'object',
                            properties: {
                              name: {
                                type: 'string',
                                value: '@popcode.popcodeName',
                                options: {
                                  editable: false
                                }
                              },
                              address: {
                                type: 'string',
                                value: '@popcode.address',
                                options: {
                                  editable: false
                                }
                              },
                              currentState: {
                                type: 'string',
                                value: '@popcode.spot',
                                options: {
                                  editable: false
                                }
                              }
                            },
                            required: ['name', 'address', 'currentState']
                          },
                          producerData: {
                            type: 'object',
                            properties: {
                              received: {
                                type: 'boolean',
                                options: {
                                  editable: true
                                }
                              },
                              notes: {
                                type: 'string',
                                options: {
                                  editable: true
                                }
                              }
                            }
                          }
                        }
                      }
                    },
                    screenButtons: {
                      ok: {
                        title: 'Ok',
                        roles: ['farmer', 'root'],
                        action: [
                          {
                            operation: 'contract',
                            contract: 'milkProducderOk',
                            parameters: {
                              popcode: '@popcode'
                            },
                            outputs: {
                              status: '@status',
                              txId: '@txId'
                            }
                          }
                        ]
                      },
                      cancel: {
                        title: 'Cancel',
                        action: [
                          {
                            operation: 'navigate',
                            screen: 'Home',
                            resetStack: true
                          }
                        ]
                      }
                    }
                  },
                  IceCreamFactory: {
                    name: 'IceCreamFactory',
                    title: 'IceCream Factory',
                    parameters: {
                      popcode: '@popcode',
                      user: '@user'
                    },
                    outputs: {
                      popcode: '@popcode'
                    },
                    screenForm: {
                      options: {
                        auto: 'labels'
                      },
                      fields: {
                        type: 'object',
                        description: 'IceCream Factory',
                        properties: {
                          popcode: {
                            type: 'object',
                            properties: {
                              name: {
                                type: 'string',
                                value: '@popcode.popcodeName',
                                options: {
                                  editable: false
                                }
                              },
                              address: {
                                type: 'string',
                                value: '@popcode.address',
                                options: {
                                  editable: false
                                }
                              },
                              currentState: {
                                type: 'string',
                                value: '@popcode.spot',
                                options: {
                                  editable: false
                                }
                              }
                            },
                            required: ['name', 'address', 'currentState']
                          },
                          factoryData: {
                            type: 'object',
                            properties: {
                              received: {
                                type: 'boolean',
                                options: {
                                  editable: true
                                }
                              },
                              notes: {
                                type: 'string',
                                options: {
                                  editable: true
                                }
                              }
                            }
                          }
                        }
                      }
                    },
                    screenButtons: {
                      ok: {
                        title: 'Ok',
                        roles: ['merchandiser', 'root'],
                        action: [
                          {
                            operation: 'contract',
                            contract: 'iceCreamFactoryOk',
                            parameters: {
                              popcode: '@popcode'
                            },
                            outputs: {
                              status: '@status',
                              txId: '@txId'
                            }
                          }
                        ]
                      },
                      cancel: {
                        title: 'Cancel',
                        action: [
                          {
                            operation: 'navigate',
                            screen: 'Home',
                            resetStack: true
                          }
                        ]
                      }
                    }
                  },
                  Home: {
                    name: 'Home',
                    title: 'Home',
                    screenListItems: {
                      fetchItems: '/popcodeByWorkflowName',
                      method: 'get',
                      api: 'cayley',
                      fetchParameters: {
                        workflowName: 'unileverV1'
                      },
                      itemDataTypes: {
                        popcode: 'object'
                      },
                      itemLabel: ['popcodeName'],
                      itemActions: {
                        click: {
                          title: 'Click',
                          parameters: {
                            popcode: '@item'
                          },
                          action: [
                            {
                              operation: 'startWorkflow',
                              parameters: {
                                spot: '@popcode.spot',
                                popcode: '@popcode'
                              },
                              replaceCurrent: false
                            }
                          ]
                        }
                      }
                    },
                    screenButtons: {
                      scan: {
                        title: 'Scan',
                        roles: ['merchandiser', 'farmer', 'root'],
                        action: [
                          {
                            operation: 'navigate',
                            screen: 'Scan'
                          }
                        ]
                      },
                      harvest: {
                        title: 'Harvest',
                        roles: ['farmer', 'root'],
                        action: [
                          {
                            operation: 'navigate',
                            screen: 'HarvestCorn'
                          }
                        ]
                      }
                    }
                  },
                  Scan: {
                    name: 'Scan',
                    title: 'Scan',
                    api: '/api/mobile',
                    modal: false,
                    parameters: {
                      user: '@user'
                    },
                    startAction: [
                      {
                        operation: 'scanBarcode',
                        barcodeTypes: ['qr', 'code128'],
                        outputs: {
                          scanData: '@scanData'
                        }
                      },
                      {
                        operation: 'routePopcode',
                        parameters: {
                          scanData: '@scanData'
                        },
                        outputs: {
                          address: '@address'
                        }
                      },
                      {
                        operation: 'fetch',
                        route: '/p',
                        method: 'get',
                        parameters: {
                          address: '@address'
                        },
                        outputs: {
                          popcode: '@popcodes[0]'
                        }
                      },
                      {
                        operation: 'startWorkflow',
                        parameters: {
                          spot: '@popcode.spot',
                          popcode: '@popcode',
                          container: '@popcode'
                        },
                        replaceCurrent: true
                      }
                    ],
                    screenScan: {}
                  },
                  Completed: {
                    name: 'Completed',
                    title: 'Completed',
                    api: '/api/mobile',
                    parameters: {
                      popcode: '@popcode'
                    },
                    screenForm: {
                      options: {
                        auto: 'labels'
                      },
                      fields: {
                        type: 'object',
                        description: 'Completed',
                        properties: {
                          popcode: {
                            type: 'object',
                            properties: {
                              name: {
                                type: 'string',
                                value: '@popcode.popcodeName',
                                options: {
                                  editable: false
                                }
                              },
                              address: {
                                type: 'string',
                                value: '@popcode.address',
                                options: {
                                  editable: false
                                }
                              },
                              currentState: {
                                type: 'string',
                                value: '@popcode.spot',
                                options: {
                                  editable: false
                                }
                              }
                            },
                            required: ['name', 'address', 'currentState']
                          }
                        },
                        required: ['popcode']
                      }
                    },
                    screenButtons: {
                      ok: {
                        title: 'Ok',
                        action: [
                          {
                            operation: 'navigate',
                            screen: 'Home',
                            resetStack: true
                          }
                        ]
                      }
                    }
                  }
                },
                contractLib: {
                  name: 'Unilever SmartContract Library',
                  version: '1.0',
                  slug: 'uni_1_0',
                  libs: [
                    'base64_Y2xhc3MgU21hcnRDb250cmFjdEJhc2UgewogIGNvbnN0cnVjdG9yKGhvb2tzKSB7CiAgICAgIHRoaXMuaG9va3MgPSBob29rczsKICAgICAgdGhpcy5zdGF0ZSA9IGhvb2tzLnN0YXRlOwogICAgICB0aGlzLmRlYnVnTG9nID0gaG9va3MuZGVidWdMb2c7CiAgICAgIHRoaXMuZGVidWdMb2coJ2NvbnN0cnVjdCBTbWFydENvbnRyYWN0QmFzZScpOwogIH0KICBhc3luYyBiYWxhbmNlKGFkZHJlc3MpIHsKICAgIHZhciBhcGkgPSB0aGlzLmhvb2tzLnN0YWNrLmFwaTsKICAgIHZhciB1cmwgPSAnL3AvYmFsYW5jZS8nICsgYWRkcmVzczsKICAgIGNvbnN0IHJlcyA9IGF3YWl0IGFwaS5nZXQodXJsKTsKICAgIHJldHVybiByZXMuYm9keTsKICB9CiAgYXN5bmMgZ2VuUG9wY29kZShhZGRyZXNzKSB7CiAgICB2YXIgYXBpID0gdGhpcy5ob29rcy5zdGFjay5hcGk7CiAgICB2YXIgdXJsID0gJy9wL2dlbmVyYXRlJzsKICAgIGNvbnN0IHJlcyA9IGF3YWl0IGFwaS5nZXQodXJsKTsKICAgIHJldHVybiByZXMuYm9keTsKICB9CiAgYXN5bmMgY29udGFpbmVyUG9wY29kZShhZGRyZXNzKSB7CiAgICB2YXIgYXBpID0gdGhpcy5ob29rcy5zdGFjay5hcGlDYXlsZXk7CiAgICB2YXIgdXJsID0gJy9jb250YWluZXJQb3Bjb2RlLycgKyBhZGRyZXNzOwogICAgY29uc3QgcmVzID0gYXdhaXQgYXBpLmdldCh1cmwpOwogICAgcmV0dXJuIHJlcy5ib2R5OwogIH0KICBhc3luYyBib21Qb3Bjb2RlcyhhZGRyZXNzKSB7CiAgICB2YXIgYXBpID0gdGhpcy5ob29rcy5zdGFjay5hcGlDYXlsZXk7CiAgICB2YXIgdXJsID0gJy9ib21Qb3Bjb2Rlcy8nICsgYWRkcmVzczsKICAgIGNvbnN0IHJlcyA9IGF3YWl0IGFwaS5nZXQodXJsKTsKICAgIHJldHVybiByZXMuYm9keTsKICB9CiAgYXN5bmMgc2lnbk1lc3NhZ2UoZmllbGRzLHByaXZhdGVLZXkpIHsKICAgIHZhciBhcGkgPSB0aGlzLmhvb2tzLnN0YWNrLmFwaTsKICAgIHZhciBib2R5ID0gewogICAgICBmaWVsZHMsCiAgICAgIHByaXZhdGVLZXkKICAgIH07CiAgICB2YXIgdXJsID0gJy9jcnlwdG8vc2lnbk1lc3NhZ2UnOwogICAgY29uc3QgcmVzID0gYXdhaXQgYXBpLnBvc3QodXJsLCB7Ym9keX0pOwogICAgcmV0dXJuIHJlcy5ib2R5OwogIH0KICBhc3luYyBibG9iQ3JlYXRlV2l0aFNpZyhzaWcsYWRkcmVzcyxkYXRhLHB1YmxpY0tleSkgewogICAgdmFyIGFwaSA9IHRoaXMuaG9va3Muc3RhY2suYXBpOwogICAgdmFyIGJvZHkgPSB7CiAgICAgIHNpZywKICAgICAgYWRkcmVzcywKICAgICAgcHVibGljS2V5LAogICAgICBkYXRhCiAgICB9OwogICAgdmFyIHVybCA9ICcvcC9ibG9iQ3JlYXRlV2l0aFNpZyc7CiAgICBjb25zdCByZXMgPSBhd2FpdCBhcGkucG9zdCh1cmwsIHtib2R5fSk7CiAgICByZXR1cm4gcmVzLmJvZHk7CiAgfQogIGFzeW5jIGJsb2JDcmVhdGUoYWRkcmVzcyxkYXRhLHB1YmxpY0tleSxwcml2YXRlS2V5KSB7CiAgICB2YXIgZmllbGRzID0gW107CgogICAgdmFyIHJlcyA9IGF3YWl0IHRoaXMuYmFsYW5jZShhZGRyZXNzKTsKICAgIGZpZWxkcy5wdXNoKHJlcy5iYWxhbmNlLkNvdW50ZXIpOwogICAgZmllbGRzLnB1c2goYWRkcmVzcyk7CiAgICBmaWVsZHMucHVzaChkYXRhKTsKCiAgICByZXMgPSBhd2FpdCB0aGlzLnNpZ25NZXNzYWdlKGZpZWxkcyxwcml2YXRlS2V5KTsKCiAgICByZXMgPSBhd2FpdCB0aGlzLmJsb2JDcmVhdGVXaXRoU2lnKHJlcy5zaWcsYWRkcmVzcyxkYXRhLHB1YmxpY0tleSk7CgogICAgcmV0dXJuIHJlcy5ib2R5OwogIH0KICBhc3luYyBtaW50Q3JlYXRlV2l0aFNpZyhzaWcsYWRkcmVzcyxkYXRhLHB1YmxpY0tleSxhbW91bnQsdW5pdCkgewogICAgdmFyIGFwaSA9IHRoaXMuaG9va3Muc3RhY2suYXBpOwogICAgdmFyIGJvZHkgPSB7CiAgICAgIHNpZywKICAgICAgYWRkcmVzcywKICAgICAgcHVibGljS2V5LAogICAgICBhbW91bnQsCiAgICAgIHVuaXQsCiAgICAgIGRhdGEKICAgIH07CiAgICB2YXIgdXJsID0gJy9wL21pbnQnOwogICAgY29uc3QgcmVzID0gYXdhaXQgYXBpLnBvc3QodXJsLCB7Ym9keX0pOwogICAgcmV0dXJuIHJlczsKICB9CiAgYXN5bmMgbWludENyZWF0ZShhZGRyZXNzLGRhdGEscHVibGljS2V5LHByaXZhdGVLZXkpIHsKICAgIHZhciBmaWVsZHMgPSBbXTsKICAgIHZhciBhbW91bnQgPSAxOwogICAgdmFyIHVuaXQgPSAnY29udGFpbmVyJzsKCiAgICB2YXIgeyBiYWxhbmNlIH0gPSBhd2FpdCB0aGlzLmJhbGFuY2UoYWRkcmVzcyk7CiAgICAvLyB0aGlzLmRlYnVnTG9nKCcjIyMjIyMjIyMjIyMjIyMjIGJhbGFuY2UuQ291bnRlcjogJyArIGJhbGFuY2UuQ291bnRlcik7CiAgICBmaWVsZHMucHVzaChiYWxhbmNlLkNvdW50ZXIpOwogICAgZmllbGRzLnB1c2goYWRkcmVzcyk7CiAgICBmaWVsZHMucHVzaChhbW91bnQpOwogICAgZmllbGRzLnB1c2godW5pdCk7CiAgICBmaWVsZHMucHVzaChkYXRhKTsKCiAgICB2YXIgeyBzaWcgfSA9IGF3YWl0IHRoaXMuc2lnbk1lc3NhZ2UoZmllbGRzLHByaXZhdGVLZXkpOwoKICAgIHZhciByZXMgPSBhd2FpdCB0aGlzLm1pbnRDcmVhdGVXaXRoU2lnKHNpZyxhZGRyZXNzLGRhdGEscHVibGljS2V5LGFtb3VudCx1bml0KTsKCiAgICByZXR1cm4gcmVzOwogIH0KfTsK',
                    'base64_Y2xhc3MgU21hcnRDb250cmFjdCBleHRlbmRzIFNtYXJ0Q29udHJhY3RCYXNlIHsKICBjb25zdHJ1Y3Rvcihob29rcykgewogICAgICBzdXBlcihob29rcykKICAgICAgdGhpcy5kZWJ1Z0xvZygnKioqKioqKioqKioqKiogU21hcnRDb250cmFjdCcpOwogIH0KCiAgYXN5bmMgZWNobygpIHsKICAgICAgdGhpcy5kZWJ1Z0xvZygnZWNobycpOwogICAgICB2YXIgcnZhbCA9IHsKICAgICAgICAgIGRhdGE6ICdoZWxsbycKICAgICAgfTsKICAgICAgdGhpcy5ob29rcy5maW5pc2gucmVzb2x2ZShydmFsKTsKICB9CgogIGFzeW5jIGhhcnZlc3RDb3JuT2soKSB7IHJldHVybiBhd2FpdCB0aGlzLm1pbnRTdGVwKCdoYXJ2ZXN0Q29ybicsICdncmFpbkVsZXZhdG9yJywgJ0Nvcm4gU2hpcHBlZCcpOyB9CiAgYXN5bmMgZ3JhaW5FbGV2YXRvck9rKCkgeyByZXR1cm4gYXdhaXQgdGhpcy5zdGVwT2soJ2dyYWluRWxldmF0b3InLCAnbWVyY2hhbmRpc2VyJywgJ2VsZXZhdG9yRGF0YScsICdHcmFpbiBFbGV2YXRvciByZWNlaXZlcycpOyB9CiAgYXN5bmMgbWVyY2hhbmRpc2VyT2soKSB7IHJldHVybiBhd2FpdCB0aGlzLnN0ZXBPaygnbWVyY2hhbmRpc2VyJywgJ2RhaXJ5RmFybWVyJywgJ21lcmNoYW5kaXNlckRhdGEnLCAnTWVyY2hhbmRpc2VyIHJlY2VpdmVzJyk7IH0KICBhc3luYyBkYWlyeUZhcm1lck9rKCkgeyByZXR1cm4gYXdhaXQgdGhpcy5zdGVwT2soJ2RhaXJ5RmFybWVyJywgJ21pbGtQcm9kdWNkZXInLCAnZGFpcnlEYXRhJywgJ0RhaXJ5IEZhcm1lciByZWNlaXZlcycpOyB9CiAgYXN5bmMgbWlsa1Byb2R1Y2Rlck9rKCkgeyByZXR1cm4gYXdhaXQgdGhpcy5zdGVwT2soJ21pbGtQcm9kdWNkZXInLCAnaWNlQ3JlYW1GYWN0b3J5JywgJ3Byb2R1Y2VyRGF0YScsICdNaWxrIFByb2R1Y2RlciByZWNlaXZlcycpOyB9CiAgYXN5bmMgaWNlQ3JlYW1GYWN0b3J5T2soKSB7IHJldHVybiBhd2FpdCB0aGlzLnN0ZXBPaygnaWNlQ3JlYW1GYWN0b3J5JywgJ2NvbXBsZXRlJywgJ2ZhY3RvcnlEYXRhJywgJ0ljZUNyZWFtIEZhY3RvcnkgcmVjZWl2ZXMnKTsgfQoKICBhc3luYyBzdGVwT2sobGFzdFNwb3QsIG5leHRTcG90LCBmaWVsZE5hbWUsIHN0ZXBUaXRsZSkgewogICAgICB0aGlzLmRlYnVnTG9nKCdleGVjdXRlIHN0ZXBPaycpOwoKICAgICAgdmFyIF8gPSB0aGlzLmhvb2tzLl87CiAgICAgIHZhciBwb3Bjb2RlID0gdGhpcy5zdGF0ZS5wb3Bjb2RlOwogICAgICB2YXIgYWRkcmVzcyA9IHBvcGNvZGUuYWRkcmVzczsKICAgICAgdmFyIGFwcCA9IHRoaXMuaG9va3MuYXBwOwogICAgICB2YXIgdXNlckNyZWRlbnRpYWxzID0gYXBwLmdldEFwcFN0YXRlKCd1c2VyQ3JlZGVudGlhbHMnKTsKICAgICAgdmFyIHB1YmxpY0tleSA9IHVzZXJDcmVkZW50aWFscy5wdWJsaWNLZXk7CiAgICAgIHZhciBwcml2YXRlS2V5ID0gdXNlckNyZWRlbnRpYWxzLnByaXZhdGVLZXk7CiAgICAgIHZhciBmb3JtID0gdGhpcy5zdGF0ZS5mb3JtOwogICAgICAvLyB2YXIgZm9ybURhdGEgPSBfLmdldChmb3JtLCBbZmllbGROYW1lXSk7CgogICAgICB2YXIgZGF0YSA9CiAgICAgICAgICB7CiAgICAgICAgICAgICJhcHBEYXRhIjogewogICAgICAgICAgICAgICJzdGVwTmFtZSI6IGxhc3RTcG90LAogICAgICAgICAgICAgIHN0ZXBUaXRsZSwKICAgICAgICAgICAgICAic3BvdCI6IG5leHRTcG90LAogICAgICAgICAgICAgICJ3b3JrZmxvd0RhdGEiOiBmb3JtCiAgICAgICAgICAgIH0KICAgICAgICAgIH07CgogICAgICB0aGlzLmRlYnVnTG9nKCdibG9iRGF0YScpOwogICAgICB0aGlzLmRlYnVnTG9nKGRhdGEpOwoKICAgICAgdmFyIHJlcyA9IGF3YWl0IHRoaXMuYmxvYkNyZWF0ZShhZGRyZXNzLGRhdGEscHVibGljS2V5LHByaXZhdGVLZXkpOwoKICAgICAgdmFyIHJ2YWwgPSB7CiAgICAgICAgICBhY3Rpb246IFtdCiAgICAgIH07CiAgICAgIHRoaXMuaG9va3MuZmluaXNoLnJlc29sdmUocnZhbCk7CiAgfQoKICBhc3luYyBtaW50U3RlcChsYXN0U3BvdCwgbmV4dFNwb3QsIHN0ZXBUaXRsZSkgewogICAgICB0aGlzLmRlYnVnTG9nKCdleGVjdXRlIG1pbnRTdGVwJyk7CgogICAgICB2YXIgc3MgPSB0aGlzLmhvb2tzLnNjcmVlblN0YXRlOwogICAgICB2YXIgYXBwID0gdGhpcy5ob29rcy5hcHA7CiAgICAgIHZhciB1c2VyQ3JlZGVudGlhbHMgPSBhcHAuZ2V0QXBwU3RhdGUoJ3VzZXJDcmVkZW50aWFscycpOwogICAgICB2YXIgcHVibGljS2V5ID0gdXNlckNyZWRlbnRpYWxzLnB1YmxpY0tleTsKICAgICAgdmFyIHByaXZhdGVLZXkgPSB1c2VyQ3JlZGVudGlhbHMucHJpdmF0ZUtleTsKICAgICAgdmFyIHdvcmtmbG93ID0gc3Mud29ya2Zsb3c7CiAgICAgIHZhciBuZXdJZCA9IHRoaXMuaG9va3Muc2hvcnRpZC5nZW5lcmF0ZSgpOwogICAgICB2YXIgeyBmb3JtIH0gPSB0aGlzLnN0YXRlOwogICAgICAvLyB0aGlzLmRlYnVnTG9nKCcjIyMjIyMjIyMjIyMjICBuZXdJZDogJyArIG5ld0lkKTsKICAgICAgdmFyIHsgcG9wY29kZSB9ID0gYXdhaXQgdGhpcy5nZW5Qb3Bjb2RlKCk7CiAgICAgIHZhciB7IGFkZHJlc3MgfSA9IHBvcGNvZGU7CgogICAgICB2YXIgZGF0YSA9CiAgICAgICAgICB7CiAgICAgICAgICAgICJhcHBEYXRhIjogewogICAgICAgICAgICAgICJ3b3JrZmxvd0RhdGEiOiBmb3JtLAogICAgICAgICAgICAgICJzcG90IjogbGFzdFNwb3QsCiAgICAgICAgICAgICAgIndvcmtmbG93TmFtZSI6IHNzLndvcmtmbG93Lm5hbWUsCiAgICAgICAgICAgICAgIndvcmtmbG93SW5zdGFuY2VJZCI6IG5ld0lkLAogICAgICAgICAgICAgICJ3b3JrZmxvd1Jvb3RQb3Bjb2RlIjogInRydWUiLAogICAgICAgICAgICAgICJwb3Bjb2RlTmFtZSI6ICdQMV8nICsgbmV3SWQsCiAgICAgICAgICAgICAgIndvcmtmbG93RGVmIjogd29ya2Zsb3cKICAgICAgICAgICAgfQogICAgICAgICAgfTsKCiAgICAgIHRoaXMuZGVidWdMb2coJ21pbnREYXRhJyk7CiAgICAgIHRoaXMuZGVidWdMb2coZGF0YSk7CgogICAgICB2YXIgcmVzID0gYXdhaXQgdGhpcy5taW50Q3JlYXRlKGFkZHJlc3MsZGF0YSxwdWJsaWNLZXkscHJpdmF0ZUtleSk7CiAgICAgIC8vIHRoaXMuZGVidWdMb2coJ3RoaXMubWludENyZWF0ZSByZXMuYm9keTogJyArIHJlcy5ib2R5KTsKCiAgICAgIHZhciBkYXRhID0KICAgICAgICAgIHsKICAgICAgICAgICAgImFwcERhdGEiOiB7CiAgICAgICAgICAgICAgInN0ZXBOYW1lIjogbGFzdFNwb3QsCiAgICAgICAgICAgICAgc3RlcFRpdGxlLAogICAgICAgICAgICAgICJzcG90IjogbmV4dFNwb3QsCiAgICAgICAgICAgICAgIndvcmtmbG93RGF0YSI6IGZvcm0KICAgICAgICAgICAgfQogICAgICAgICAgfTsKCiAgICAgIHRoaXMuZGVidWdMb2coJ2Jsb2JEYXRhJyk7CiAgICAgIHRoaXMuZGVidWdMb2coZGF0YSk7CgogICAgICB2YXIgcmVzID0gYXdhaXQgdGhpcy5ibG9iQ3JlYXRlKGFkZHJlc3MsZGF0YSxwdWJsaWNLZXkscHJpdmF0ZUtleSk7CgogICAgICB2YXIgcnZhbCA9IHsKICAgICAgICAgIGFjdGlvbjogW10KICAgICAgfTsKICAgICAgdGhpcy5ob29rcy5maW5pc2gucmVzb2x2ZShydmFsKTsKICB9Cgp9Owo='
                  ]
                }
              }
            }
          }
        },
        type: 'transaction',
        sourceCounter: 'GA4CRwNGwULPg2bBnqFRi8gxe8llP64+xLBiwH5A7+U=',
        amount: '1',
        workflowDef: {
          title: 'Unilever V1',
          name: 'unileverV1',
          startScreen: 'Home',
          version: '1.0',
          steps: {
            harvestCorn: {
              step: 'harvestCorn',
              title: 'Harvest Corn',
              screen: 'HarvestCorn',
              roles: ['farmer', 'root']
            },
            grainElevator: {
              step: 'grainElevator',
              title: 'Grain Elevator',
              screen: 'GrainElevator',
              roles: ['farmer', 'root'],
              complete: [
                {
                  operation: 'navigate',
                  screen: 'Home',
                  resetStack: true,
                  forceUpdate: true
                }
              ]
            },
            merchandiser: {
              step: 'merchandiser',
              title: 'Merchandiser',
              screen: 'Merchandiser',
              roles: ['merchandiser', 'root'],
              complete: [
                {
                  operation: 'navigate',
                  screen: 'Home',
                  resetStack: true,
                  forceUpdate: true
                }
              ]
            },
            dairyFarmer: {
              step: 'dairyFarmer',
              title: 'Dairy Farmer',
              screen: 'DairyFarmer',
              roles: ['farmer', 'root'],
              complete: [
                {
                  operation: 'navigate',
                  screen: 'Home',
                  resetStack: true,
                  forceUpdate: true
                }
              ]
            },
            milkProducder: {
              step: 'milkProducder',
              title: 'Milk Producer',
              screen: 'MilkProducer',
              roles: ['farmer', 'root'],
              complete: [
                {
                  operation: 'navigate',
                  screen: 'Home',
                  resetStack: true,
                  forceUpdate: true
                }
              ]
            },
            iceCreamFactory: {
              step: 'iceCreamFactory',
              title: 'Unilever Ice Cream Factory',
              screen: 'IceCreamFactory',
              roles: ['merchandiser', 'root'],
              complete: [
                {
                  operation: 'navigate',
                  screen: 'Home',
                  resetStack: true,
                  forceUpdate: true
                }
              ]
            },
            complete: {
              step: 'process.complete',
              title: 'Process Complete',
              screen: 'Completed',
              roles: ['merchandiser', 'farmer', 'root']
            }
          },
          screens: {
            HarvestCorn: {
              name: 'HarvestCorn',
              title: 'Harvest Corn',
              parameters: {
                popcode: '@popcode',
                user: '@user'
              },
              outputs: {
                popcode: '@popcode'
              },
              screenForm: {
                options: {
                  auto: 'labels'
                },
                fields: {
                  type: 'object',
                  description: 'Harvest Corn',
                  properties: {
                    harvestData: {
                      type: 'object',
                      properties: {
                        loadingStatus: {
                          type: 'boolean',
                          options: {
                            editable: true
                          }
                        },
                        seedLine: {
                          type: 'string',
                          options: {
                            editable: true
                          }
                        }
                      },
                      required: ['seedLine']
                    }
                  }
                }
              },
              screenButtons: {
                ok: {
                  title: 'Ok',
                  roles: ['farmer', 'root'],
                  action: [
                    {
                      operation: 'contract',
                      contract: 'harvestCornOk',
                      parameters: {
                        popcode: '@popcode'
                      },
                      outputs: {
                        status: '@status',
                        txId: '@txId'
                      }
                    },
                    {
                      operation: 'navigate',
                      screen: 'Home',
                      resetStack: true,
                      forceUpdate: true
                    }
                  ]
                },
                cancel: {
                  title: 'Cancel',
                  action: [
                    {
                      operation: 'navigate',
                      screen: 'Home',
                      resetStack: true
                    }
                  ]
                }
              }
            },
            GrainElevator: {
              name: 'GrainElevator',
              title: 'Grain Elevator',
              parameters: {
                popcode: '@popcode',
                user: '@user'
              },
              outputs: {
                popcode: '@popcode'
              },
              screenForm: {
                options: {
                  auto: 'labels'
                },
                fields: {
                  type: 'object',
                  properties: {
                    popcode: {
                      type: 'object',
                      properties: {
                        name: {
                          type: 'string',
                          value: '@popcode.popcodeName',
                          options: {
                            editable: false
                          }
                        },
                        address: {
                          type: 'string',
                          value: '@popcode.address',
                          options: {
                            editable: false
                          }
                        },
                        currentState: {
                          type: 'string',
                          value: '@popcode.spot',
                          options: {
                            editable: false
                          }
                        }
                      },
                      required: ['name', 'address', 'currentState']
                    },
                    elevatorData: {
                      type: 'object',
                      properties: {
                        received: {
                          type: 'boolean',
                          options: {
                            editable: true
                          }
                        },
                        notes: {
                          type: 'string',
                          options: {
                            editable: true
                          }
                        }
                      }
                    }
                  }
                }
              },
              screenButtons: {
                ok: {
                  title: 'Ok',
                  roles: ['farmer', 'root'],
                  action: [
                    {
                      operation: 'contract',
                      contract: 'grainElevatorOk',
                      parameters: {
                        popcode: '@popcode'
                      },
                      outputs: {
                        status: '@status',
                        txId: '@txId'
                      }
                    }
                  ]
                },
                cancel: {
                  title: 'Cancel',
                  action: [
                    {
                      operation: 'navigate',
                      screen: 'Home',
                      resetStack: true
                    }
                  ]
                }
              }
            },
            Merchandiser: {
              name: 'Merchandiser',
              title: 'Merchandiser',
              parameters: {
                popcode: '@popcode',
                user: '@user'
              },
              outputs: {
                popcode: '@popcode'
              },
              screenForm: {
                options: {
                  auto: 'labels'
                },
                fields: {
                  type: 'object',
                  description: 'Merchandiser',
                  properties: {
                    popcode: {
                      type: 'object',
                      properties: {
                        name: {
                          type: 'string',
                          value: '@popcode.popcodeName',
                          options: {
                            editable: false
                          }
                        },
                        address: {
                          type: 'string',
                          value: '@popcode.address',
                          options: {
                            editable: false
                          }
                        },
                        currentState: {
                          type: 'string',
                          value: '@popcode.spot',
                          options: {
                            editable: false
                          }
                        }
                      },
                      required: ['name', 'address', 'currentState']
                    },
                    merchandiserData: {
                      type: 'object',
                      properties: {
                        received: {
                          type: 'boolean',
                          options: {
                            editable: true
                          }
                        },
                        notes: {
                          type: 'string',
                          options: {
                            editable: true
                          }
                        }
                      }
                    }
                  }
                }
              },
              screenButtons: {
                ok: {
                  title: 'Ok',
                  action: [
                    {
                      operation: 'contract',
                      contract: 'merchandiserOk',
                      parameters: {
                        popcode: '@popcode'
                      },
                      outputs: {
                        status: '@status',
                        txId: '@txId'
                      }
                    }
                  ]
                },
                cancel: {
                  title: 'Cancel',
                  action: [
                    {
                      operation: 'navigate',
                      screen: 'Home',
                      resetStack: true
                    }
                  ]
                }
              }
            },
            DairyFarmer: {
              name: 'DairyFarmer',
              title: 'Dairy Farmer',
              parameters: {
                popcode: '@popcode',
                user: '@user'
              },
              outputs: {
                popcode: '@popcode'
              },
              screenForm: {
                options: {
                  auto: 'labels'
                },
                fields: {
                  type: 'object',
                  description: 'Dairy Farmer',
                  properties: {
                    popcode: {
                      type: 'object',
                      properties: {
                        name: {
                          type: 'string',
                          value: '@popcode.popcodeName',
                          options: {
                            editable: false
                          }
                        },
                        address: {
                          type: 'string',
                          value: '@popcode.address',
                          options: {
                            editable: false
                          }
                        },
                        currentState: {
                          type: 'string',
                          value: '@popcode.spot',
                          options: {
                            editable: false
                          }
                        }
                      },
                      required: ['name', 'address', 'currentState']
                    },
                    dairyData: {
                      type: 'object',
                      properties: {
                        received: {
                          type: 'boolean',
                          options: {
                            editable: true
                          }
                        },
                        notes: {
                          type: 'string',
                          options: {
                            editable: true
                          }
                        }
                      }
                    }
                  }
                }
              },
              screenButtons: {
                ok: {
                  title: 'Ok',
                  roles: ['farmer', 'root'],
                  action: [
                    {
                      operation: 'contract',
                      contract: 'dairyFarmerOk',
                      parameters: {
                        popcode: '@popcode'
                      },
                      outputs: {
                        status: '@status',
                        txId: '@txId'
                      }
                    }
                  ]
                },
                cancel: {
                  title: 'Cancel',
                  action: [
                    {
                      operation: 'navigate',
                      screen: 'Home',
                      resetStack: true
                    }
                  ]
                }
              }
            },
            MilkProducer: {
              name: 'MilkProducer',
              title: 'Milk Producer',
              parameters: {
                popcode: '@popcode',
                user: '@user'
              },
              outputs: {
                popcode: '@popcode'
              },
              screenForm: {
                options: {
                  auto: 'labels'
                },
                fields: {
                  type: 'object',
                  description: 'Milk Producer',
                  properties: {
                    popcode: {
                      type: 'object',
                      properties: {
                        name: {
                          type: 'string',
                          value: '@popcode.popcodeName',
                          options: {
                            editable: false
                          }
                        },
                        address: {
                          type: 'string',
                          value: '@popcode.address',
                          options: {
                            editable: false
                          }
                        },
                        currentState: {
                          type: 'string',
                          value: '@popcode.spot',
                          options: {
                            editable: false
                          }
                        }
                      },
                      required: ['name', 'address', 'currentState']
                    },
                    producerData: {
                      type: 'object',
                      properties: {
                        received: {
                          type: 'boolean',
                          options: {
                            editable: true
                          }
                        },
                        notes: {
                          type: 'string',
                          options: {
                            editable: true
                          }
                        }
                      }
                    }
                  }
                }
              },
              screenButtons: {
                ok: {
                  title: 'Ok',
                  roles: ['farmer', 'root'],
                  action: [
                    {
                      operation: 'contract',
                      contract: 'milkProducderOk',
                      parameters: {
                        popcode: '@popcode'
                      },
                      outputs: {
                        status: '@status',
                        txId: '@txId'
                      }
                    }
                  ]
                },
                cancel: {
                  title: 'Cancel',
                  action: [
                    {
                      operation: 'navigate',
                      screen: 'Home',
                      resetStack: true
                    }
                  ]
                }
              }
            },
            IceCreamFactory: {
              name: 'IceCreamFactory',
              title: 'IceCream Factory',
              parameters: {
                popcode: '@popcode',
                user: '@user'
              },
              outputs: {
                popcode: '@popcode'
              },
              screenForm: {
                options: {
                  auto: 'labels'
                },
                fields: {
                  type: 'object',
                  description: 'IceCream Factory',
                  properties: {
                    popcode: {
                      type: 'object',
                      properties: {
                        name: {
                          type: 'string',
                          value: '@popcode.popcodeName',
                          options: {
                            editable: false
                          }
                        },
                        address: {
                          type: 'string',
                          value: '@popcode.address',
                          options: {
                            editable: false
                          }
                        },
                        currentState: {
                          type: 'string',
                          value: '@popcode.spot',
                          options: {
                            editable: false
                          }
                        }
                      },
                      required: ['name', 'address', 'currentState']
                    },
                    factoryData: {
                      type: 'object',
                      properties: {
                        received: {
                          type: 'boolean',
                          options: {
                            editable: true
                          }
                        },
                        notes: {
                          type: 'string',
                          options: {
                            editable: true
                          }
                        }
                      }
                    }
                  }
                }
              },
              screenButtons: {
                ok: {
                  title: 'Ok',
                  roles: ['merchandiser', 'root'],
                  action: [
                    {
                      operation: 'contract',
                      contract: 'iceCreamFactoryOk',
                      parameters: {
                        popcode: '@popcode'
                      },
                      outputs: {
                        status: '@status',
                        txId: '@txId'
                      }
                    }
                  ]
                },
                cancel: {
                  title: 'Cancel',
                  action: [
                    {
                      operation: 'navigate',
                      screen: 'Home',
                      resetStack: true
                    }
                  ]
                }
              }
            },
            Home: {
              name: 'Home',
              title: 'Home',
              screenListItems: {
                fetchItems: '/popcodeByWorkflowName',
                method: 'get',
                api: 'cayley',
                fetchParameters: {
                  workflowName: 'unileverV1'
                },
                itemDataTypes: {
                  popcode: 'object'
                },
                itemLabel: ['popcodeName'],
                itemActions: {
                  click: {
                    title: 'Click',
                    parameters: {
                      popcode: '@item'
                    },
                    action: [
                      {
                        operation: 'startWorkflow',
                        parameters: {
                          spot: '@popcode.spot',
                          popcode: '@popcode'
                        },
                        replaceCurrent: false
                      }
                    ]
                  }
                }
              },
              screenButtons: {
                scan: {
                  title: 'Scan',
                  roles: ['merchandiser', 'farmer', 'root'],
                  action: [
                    {
                      operation: 'navigate',
                      screen: 'Scan'
                    }
                  ]
                },
                harvest: {
                  title: 'Harvest',
                  roles: ['farmer', 'root'],
                  action: [
                    {
                      operation: 'navigate',
                      screen: 'HarvestCorn'
                    }
                  ]
                }
              }
            },
            Scan: {
              name: 'Scan',
              title: 'Scan',
              api: '/api/mobile',
              modal: false,
              parameters: {
                user: '@user'
              },
              startAction: [
                {
                  operation: 'scanBarcode',
                  barcodeTypes: ['qr', 'code128'],
                  outputs: {
                    scanData: '@scanData'
                  }
                },
                {
                  operation: 'routePopcode',
                  parameters: {
                    scanData: '@scanData'
                  },
                  outputs: {
                    address: '@address'
                  }
                },
                {
                  operation: 'fetch',
                  route: '/p',
                  method: 'get',
                  parameters: {
                    address: '@address'
                  },
                  outputs: {
                    popcode: '@popcodes[0]'
                  }
                },
                {
                  operation: 'startWorkflow',
                  parameters: {
                    spot: '@popcode.spot',
                    popcode: '@popcode',
                    container: '@popcode'
                  },
                  replaceCurrent: true
                }
              ],
              screenScan: {}
            },
            Completed: {
              name: 'Completed',
              title: 'Completed',
              api: '/api/mobile',
              parameters: {
                popcode: '@popcode'
              },
              screenForm: {
                options: {
                  auto: 'labels'
                },
                fields: {
                  type: 'object',
                  description: 'Completed',
                  properties: {
                    popcode: {
                      type: 'object',
                      properties: {
                        name: {
                          type: 'string',
                          value: '@popcode.popcodeName',
                          options: {
                            editable: false
                          }
                        },
                        address: {
                          type: 'string',
                          value: '@popcode.address',
                          options: {
                            editable: false
                          }
                        },
                        currentState: {
                          type: 'string',
                          value: '@popcode.spot',
                          options: {
                            editable: false
                          }
                        }
                      },
                      required: ['name', 'address', 'currentState']
                    }
                  },
                  required: ['popcode']
                }
              },
              screenButtons: {
                ok: {
                  title: 'Ok',
                  action: [
                    {
                      operation: 'navigate',
                      screen: 'Home',
                      resetStack: true
                    }
                  ]
                }
              }
            }
          },
          contractLib: {
            name: 'Unilever SmartContract Library',
            version: '1.0',
            slug: 'uni_1_0',
            libs: [
              'base64_Y2xhc3MgU21hcnRDb250cmFjdEJhc2UgewogIGNvbnN0cnVjdG9yKGhvb2tzKSB7CiAgICAgIHRoaXMuaG9va3MgPSBob29rczsKICAgICAgdGhpcy5zdGF0ZSA9IGhvb2tzLnN0YXRlOwogICAgICB0aGlzLmRlYnVnTG9nID0gaG9va3MuZGVidWdMb2c7CiAgICAgIHRoaXMuZGVidWdMb2coJ2NvbnN0cnVjdCBTbWFydENvbnRyYWN0QmFzZScpOwogIH0KICBhc3luYyBiYWxhbmNlKGFkZHJlc3MpIHsKICAgIHZhciBhcGkgPSB0aGlzLmhvb2tzLnN0YWNrLmFwaTsKICAgIHZhciB1cmwgPSAnL3AvYmFsYW5jZS8nICsgYWRkcmVzczsKICAgIGNvbnN0IHJlcyA9IGF3YWl0IGFwaS5nZXQodXJsKTsKICAgIHJldHVybiByZXMuYm9keTsKICB9CiAgYXN5bmMgZ2VuUG9wY29kZShhZGRyZXNzKSB7CiAgICB2YXIgYXBpID0gdGhpcy5ob29rcy5zdGFjay5hcGk7CiAgICB2YXIgdXJsID0gJy9wL2dlbmVyYXRlJzsKICAgIGNvbnN0IHJlcyA9IGF3YWl0IGFwaS5nZXQodXJsKTsKICAgIHJldHVybiByZXMuYm9keTsKICB9CiAgYXN5bmMgY29udGFpbmVyUG9wY29kZShhZGRyZXNzKSB7CiAgICB2YXIgYXBpID0gdGhpcy5ob29rcy5zdGFjay5hcGlDYXlsZXk7CiAgICB2YXIgdXJsID0gJy9jb250YWluZXJQb3Bjb2RlLycgKyBhZGRyZXNzOwogICAgY29uc3QgcmVzID0gYXdhaXQgYXBpLmdldCh1cmwpOwogICAgcmV0dXJuIHJlcy5ib2R5OwogIH0KICBhc3luYyBib21Qb3Bjb2RlcyhhZGRyZXNzKSB7CiAgICB2YXIgYXBpID0gdGhpcy5ob29rcy5zdGFjay5hcGlDYXlsZXk7CiAgICB2YXIgdXJsID0gJy9ib21Qb3Bjb2Rlcy8nICsgYWRkcmVzczsKICAgIGNvbnN0IHJlcyA9IGF3YWl0IGFwaS5nZXQodXJsKTsKICAgIHJldHVybiByZXMuYm9keTsKICB9CiAgYXN5bmMgc2lnbk1lc3NhZ2UoZmllbGRzLHByaXZhdGVLZXkpIHsKICAgIHZhciBhcGkgPSB0aGlzLmhvb2tzLnN0YWNrLmFwaTsKICAgIHZhciBib2R5ID0gewogICAgICBmaWVsZHMsCiAgICAgIHByaXZhdGVLZXkKICAgIH07CiAgICB2YXIgdXJsID0gJy9jcnlwdG8vc2lnbk1lc3NhZ2UnOwogICAgY29uc3QgcmVzID0gYXdhaXQgYXBpLnBvc3QodXJsLCB7Ym9keX0pOwogICAgcmV0dXJuIHJlcy5ib2R5OwogIH0KICBhc3luYyBibG9iQ3JlYXRlV2l0aFNpZyhzaWcsYWRkcmVzcyxkYXRhLHB1YmxpY0tleSkgewogICAgdmFyIGFwaSA9IHRoaXMuaG9va3Muc3RhY2suYXBpOwogICAgdmFyIGJvZHkgPSB7CiAgICAgIHNpZywKICAgICAgYWRkcmVzcywKICAgICAgcHVibGljS2V5LAogICAgICBkYXRhCiAgICB9OwogICAgdmFyIHVybCA9ICcvcC9ibG9iQ3JlYXRlV2l0aFNpZyc7CiAgICBjb25zdCByZXMgPSBhd2FpdCBhcGkucG9zdCh1cmwsIHtib2R5fSk7CiAgICByZXR1cm4gcmVzLmJvZHk7CiAgfQogIGFzeW5jIGJsb2JDcmVhdGUoYWRkcmVzcyxkYXRhLHB1YmxpY0tleSxwcml2YXRlS2V5KSB7CiAgICB2YXIgZmllbGRzID0gW107CgogICAgdmFyIHJlcyA9IGF3YWl0IHRoaXMuYmFsYW5jZShhZGRyZXNzKTsKICAgIGZpZWxkcy5wdXNoKHJlcy5iYWxhbmNlLkNvdW50ZXIpOwogICAgZmllbGRzLnB1c2goYWRkcmVzcyk7CiAgICBmaWVsZHMucHVzaChkYXRhKTsKCiAgICByZXMgPSBhd2FpdCB0aGlzLnNpZ25NZXNzYWdlKGZpZWxkcyxwcml2YXRlS2V5KTsKCiAgICByZXMgPSBhd2FpdCB0aGlzLmJsb2JDcmVhdGVXaXRoU2lnKHJlcy5zaWcsYWRkcmVzcyxkYXRhLHB1YmxpY0tleSk7CgogICAgcmV0dXJuIHJlcy5ib2R5OwogIH0KICBhc3luYyBtaW50Q3JlYXRlV2l0aFNpZyhzaWcsYWRkcmVzcyxkYXRhLHB1YmxpY0tleSxhbW91bnQsdW5pdCkgewogICAgdmFyIGFwaSA9IHRoaXMuaG9va3Muc3RhY2suYXBpOwogICAgdmFyIGJvZHkgPSB7CiAgICAgIHNpZywKICAgICAgYWRkcmVzcywKICAgICAgcHVibGljS2V5LAogICAgICBhbW91bnQsCiAgICAgIHVuaXQsCiAgICAgIGRhdGEKICAgIH07CiAgICB2YXIgdXJsID0gJy9wL21pbnQnOwogICAgY29uc3QgcmVzID0gYXdhaXQgYXBpLnBvc3QodXJsLCB7Ym9keX0pOwogICAgcmV0dXJuIHJlczsKICB9CiAgYXN5bmMgbWludENyZWF0ZShhZGRyZXNzLGRhdGEscHVibGljS2V5LHByaXZhdGVLZXkpIHsKICAgIHZhciBmaWVsZHMgPSBbXTsKICAgIHZhciBhbW91bnQgPSAxOwogICAgdmFyIHVuaXQgPSAnY29udGFpbmVyJzsKCiAgICB2YXIgeyBiYWxhbmNlIH0gPSBhd2FpdCB0aGlzLmJhbGFuY2UoYWRkcmVzcyk7CiAgICAvLyB0aGlzLmRlYnVnTG9nKCcjIyMjIyMjIyMjIyMjIyMjIGJhbGFuY2UuQ291bnRlcjogJyArIGJhbGFuY2UuQ291bnRlcik7CiAgICBmaWVsZHMucHVzaChiYWxhbmNlLkNvdW50ZXIpOwogICAgZmllbGRzLnB1c2goYWRkcmVzcyk7CiAgICBmaWVsZHMucHVzaChhbW91bnQpOwogICAgZmllbGRzLnB1c2godW5pdCk7CiAgICBmaWVsZHMucHVzaChkYXRhKTsKCiAgICB2YXIgeyBzaWcgfSA9IGF3YWl0IHRoaXMuc2lnbk1lc3NhZ2UoZmllbGRzLHByaXZhdGVLZXkpOwoKICAgIHZhciByZXMgPSBhd2FpdCB0aGlzLm1pbnRDcmVhdGVXaXRoU2lnKHNpZyxhZGRyZXNzLGRhdGEscHVibGljS2V5LGFtb3VudCx1bml0KTsKCiAgICByZXR1cm4gcmVzOwogIH0KfTsK',
              'base64_Y2xhc3MgU21hcnRDb250cmFjdCBleHRlbmRzIFNtYXJ0Q29udHJhY3RCYXNlIHsKICBjb25zdHJ1Y3Rvcihob29rcykgewogICAgICBzdXBlcihob29rcykKICAgICAgdGhpcy5kZWJ1Z0xvZygnKioqKioqKioqKioqKiogU21hcnRDb250cmFjdCcpOwogIH0KCiAgYXN5bmMgZWNobygpIHsKICAgICAgdGhpcy5kZWJ1Z0xvZygnZWNobycpOwogICAgICB2YXIgcnZhbCA9IHsKICAgICAgICAgIGRhdGE6ICdoZWxsbycKICAgICAgfTsKICAgICAgdGhpcy5ob29rcy5maW5pc2gucmVzb2x2ZShydmFsKTsKICB9CgogIGFzeW5jIGhhcnZlc3RDb3JuT2soKSB7IHJldHVybiBhd2FpdCB0aGlzLm1pbnRTdGVwKCdoYXJ2ZXN0Q29ybicsICdncmFpbkVsZXZhdG9yJywgJ0Nvcm4gU2hpcHBlZCcpOyB9CiAgYXN5bmMgZ3JhaW5FbGV2YXRvck9rKCkgeyByZXR1cm4gYXdhaXQgdGhpcy5zdGVwT2soJ2dyYWluRWxldmF0b3InLCAnbWVyY2hhbmRpc2VyJywgJ2VsZXZhdG9yRGF0YScsICdHcmFpbiBFbGV2YXRvciByZWNlaXZlcycpOyB9CiAgYXN5bmMgbWVyY2hhbmRpc2VyT2soKSB7IHJldHVybiBhd2FpdCB0aGlzLnN0ZXBPaygnbWVyY2hhbmRpc2VyJywgJ2RhaXJ5RmFybWVyJywgJ21lcmNoYW5kaXNlckRhdGEnLCAnTWVyY2hhbmRpc2VyIHJlY2VpdmVzJyk7IH0KICBhc3luYyBkYWlyeUZhcm1lck9rKCkgeyByZXR1cm4gYXdhaXQgdGhpcy5zdGVwT2soJ2RhaXJ5RmFybWVyJywgJ21pbGtQcm9kdWNkZXInLCAnZGFpcnlEYXRhJywgJ0RhaXJ5IEZhcm1lciByZWNlaXZlcycpOyB9CiAgYXN5bmMgbWlsa1Byb2R1Y2Rlck9rKCkgeyByZXR1cm4gYXdhaXQgdGhpcy5zdGVwT2soJ21pbGtQcm9kdWNkZXInLCAnaWNlQ3JlYW1GYWN0b3J5JywgJ3Byb2R1Y2VyRGF0YScsICdNaWxrIFByb2R1Y2RlciByZWNlaXZlcycpOyB9CiAgYXN5bmMgaWNlQ3JlYW1GYWN0b3J5T2soKSB7IHJldHVybiBhd2FpdCB0aGlzLnN0ZXBPaygnaWNlQ3JlYW1GYWN0b3J5JywgJ2NvbXBsZXRlJywgJ2ZhY3RvcnlEYXRhJywgJ0ljZUNyZWFtIEZhY3RvcnkgcmVjZWl2ZXMnKTsgfQoKICBhc3luYyBzdGVwT2sobGFzdFNwb3QsIG5leHRTcG90LCBmaWVsZE5hbWUsIHN0ZXBUaXRsZSkgewogICAgICB0aGlzLmRlYnVnTG9nKCdleGVjdXRlIHN0ZXBPaycpOwoKICAgICAgdmFyIF8gPSB0aGlzLmhvb2tzLl87CiAgICAgIHZhciBwb3Bjb2RlID0gdGhpcy5zdGF0ZS5wb3Bjb2RlOwogICAgICB2YXIgYWRkcmVzcyA9IHBvcGNvZGUuYWRkcmVzczsKICAgICAgdmFyIGFwcCA9IHRoaXMuaG9va3MuYXBwOwogICAgICB2YXIgdXNlckNyZWRlbnRpYWxzID0gYXBwLmdldEFwcFN0YXRlKCd1c2VyQ3JlZGVudGlhbHMnKTsKICAgICAgdmFyIHB1YmxpY0tleSA9IHVzZXJDcmVkZW50aWFscy5wdWJsaWNLZXk7CiAgICAgIHZhciBwcml2YXRlS2V5ID0gdXNlckNyZWRlbnRpYWxzLnByaXZhdGVLZXk7CiAgICAgIHZhciBmb3JtID0gdGhpcy5zdGF0ZS5mb3JtOwogICAgICAvLyB2YXIgZm9ybURhdGEgPSBfLmdldChmb3JtLCBbZmllbGROYW1lXSk7CgogICAgICB2YXIgZGF0YSA9CiAgICAgICAgICB7CiAgICAgICAgICAgICJhcHBEYXRhIjogewogICAgICAgICAgICAgICJzdGVwTmFtZSI6IGxhc3RTcG90LAogICAgICAgICAgICAgIHN0ZXBUaXRsZSwKICAgICAgICAgICAgICAic3BvdCI6IG5leHRTcG90LAogICAgICAgICAgICAgICJ3b3JrZmxvd0RhdGEiOiBmb3JtCiAgICAgICAgICAgIH0KICAgICAgICAgIH07CgogICAgICB0aGlzLmRlYnVnTG9nKCdibG9iRGF0YScpOwogICAgICB0aGlzLmRlYnVnTG9nKGRhdGEpOwoKICAgICAgdmFyIHJlcyA9IGF3YWl0IHRoaXMuYmxvYkNyZWF0ZShhZGRyZXNzLGRhdGEscHVibGljS2V5LHByaXZhdGVLZXkpOwoKICAgICAgdmFyIHJ2YWwgPSB7CiAgICAgICAgICBhY3Rpb246IFtdCiAgICAgIH07CiAgICAgIHRoaXMuaG9va3MuZmluaXNoLnJlc29sdmUocnZhbCk7CiAgfQoKICBhc3luYyBtaW50U3RlcChsYXN0U3BvdCwgbmV4dFNwb3QsIHN0ZXBUaXRsZSkgewogICAgICB0aGlzLmRlYnVnTG9nKCdleGVjdXRlIG1pbnRTdGVwJyk7CgogICAgICB2YXIgc3MgPSB0aGlzLmhvb2tzLnNjcmVlblN0YXRlOwogICAgICB2YXIgYXBwID0gdGhpcy5ob29rcy5hcHA7CiAgICAgIHZhciB1c2VyQ3JlZGVudGlhbHMgPSBhcHAuZ2V0QXBwU3RhdGUoJ3VzZXJDcmVkZW50aWFscycpOwogICAgICB2YXIgcHVibGljS2V5ID0gdXNlckNyZWRlbnRpYWxzLnB1YmxpY0tleTsKICAgICAgdmFyIHByaXZhdGVLZXkgPSB1c2VyQ3JlZGVudGlhbHMucHJpdmF0ZUtleTsKICAgICAgdmFyIHdvcmtmbG93ID0gc3Mud29ya2Zsb3c7CiAgICAgIHZhciBuZXdJZCA9IHRoaXMuaG9va3Muc2hvcnRpZC5nZW5lcmF0ZSgpOwogICAgICB2YXIgeyBmb3JtIH0gPSB0aGlzLnN0YXRlOwogICAgICAvLyB0aGlzLmRlYnVnTG9nKCcjIyMjIyMjIyMjIyMjICBuZXdJZDogJyArIG5ld0lkKTsKICAgICAgdmFyIHsgcG9wY29kZSB9ID0gYXdhaXQgdGhpcy5nZW5Qb3Bjb2RlKCk7CiAgICAgIHZhciB7IGFkZHJlc3MgfSA9IHBvcGNvZGU7CgogICAgICB2YXIgZGF0YSA9CiAgICAgICAgICB7CiAgICAgICAgICAgICJhcHBEYXRhIjogewogICAgICAgICAgICAgICJ3b3JrZmxvd0RhdGEiOiBmb3JtLAogICAgICAgICAgICAgICJzcG90IjogbGFzdFNwb3QsCiAgICAgICAgICAgICAgIndvcmtmbG93TmFtZSI6IHNzLndvcmtmbG93Lm5hbWUsCiAgICAgICAgICAgICAgIndvcmtmbG93SW5zdGFuY2VJZCI6IG5ld0lkLAogICAgICAgICAgICAgICJ3b3JrZmxvd1Jvb3RQb3Bjb2RlIjogInRydWUiLAogICAgICAgICAgICAgICJwb3Bjb2RlTmFtZSI6ICdQMV8nICsgbmV3SWQsCiAgICAgICAgICAgICAgIndvcmtmbG93RGVmIjogd29ya2Zsb3cKICAgICAgICAgICAgfQogICAgICAgICAgfTsKCiAgICAgIHRoaXMuZGVidWdMb2coJ21pbnREYXRhJyk7CiAgICAgIHRoaXMuZGVidWdMb2coZGF0YSk7CgogICAgICB2YXIgcmVzID0gYXdhaXQgdGhpcy5taW50Q3JlYXRlKGFkZHJlc3MsZGF0YSxwdWJsaWNLZXkscHJpdmF0ZUtleSk7CiAgICAgIC8vIHRoaXMuZGVidWdMb2coJ3RoaXMubWludENyZWF0ZSByZXMuYm9keTogJyArIHJlcy5ib2R5KTsKCiAgICAgIHZhciBkYXRhID0KICAgICAgICAgIHsKICAgICAgICAgICAgImFwcERhdGEiOiB7CiAgICAgICAgICAgICAgInN0ZXBOYW1lIjogbGFzdFNwb3QsCiAgICAgICAgICAgICAgc3RlcFRpdGxlLAogICAgICAgICAgICAgICJzcG90IjogbmV4dFNwb3QsCiAgICAgICAgICAgICAgIndvcmtmbG93RGF0YSI6IGZvcm0KICAgICAgICAgICAgfQogICAgICAgICAgfTsKCiAgICAgIHRoaXMuZGVidWdMb2coJ2Jsb2JEYXRhJyk7CiAgICAgIHRoaXMuZGVidWdMb2coZGF0YSk7CgogICAgICB2YXIgcmVzID0gYXdhaXQgdGhpcy5ibG9iQ3JlYXRlKGFkZHJlc3MsZGF0YSxwdWJsaWNLZXkscHJpdmF0ZUtleSk7CgogICAgICB2YXIgcnZhbCA9IHsKICAgICAgICAgIGFjdGlvbjogW10KICAgICAgfTsKICAgICAgdGhpcy5ob29rcy5maW5pc2gucmVzb2x2ZShydmFsKTsKICB9Cgp9Owo='
            ]
          }
        },
        address: '95c14b602ea5930232b7cf8039002ae333f13194',
        createdAt: '1519700753730',
        date: '1519700753730',
        operation: 'mint',
        destCounter: 'OX+icwDXRT8HuXKjm0CcqwhLlF0n+mPfYmmXKioTs6M='
      },
      {
        id:
          '<151aa69ab7c2dc8eabc2b6c144b668c0751a511bf0d816c469d6dc86d3818099>',
        popcode: '<95c14b602ea5930232b7cf8039002ae333f13194>',
        spot: 'grainElevator',
        txId:
          '151aa69ab7c2dc8eabc2b6c144b668c0751a511bf0d816c469d6dc86d3818099',
        data: {
          metadata: {
            appData: {
              stepName: 'harvestCorn',
              stepTitle: 'Corn Shipped',
              spot: 'grainElevator',
              workflowData: {
                harvestData: {
                  loadingStatus: true,
                  seedLine: 'Good seed'
                }
              }
            }
          }
        },
        type: 'transaction',
        sourceCounter: 'JQzowthyo8kiYI8H/25Pihj4EyWnrIioceS6d8yUMsY=',
        address: '95c14b602ea5930232b7cf8039002ae333f13194',
        createdAt: '1519700756305',
        date: '1519700756305',
        operation: 'blobCreate',
        destCounter: 'gqK1fGR+aloS7EsBmhPjaxYf+3iZsKU+KSvBDRO6bnI='
      },
      {
        id:
          '<b094e64acc9a7ded59f35b9e91ea54df25df8565be3a34986a0ef75ce42708be>',
        popcode: '<95c14b602ea5930232b7cf8039002ae333f13194>',
        spot: 'merchandiser',
        txId:
          'b094e64acc9a7ded59f35b9e91ea54df25df8565be3a34986a0ef75ce42708be',
        data: {
          metadata: {
            appData: {
              stepName: 'grainElevator',
              stepTitle: 'Grain Elevator receives',
              spot: 'merchandiser',
              workflowData: {
                popcode: {
                  name: 'P1_F3MTBSPTA',
                  address: '95c14b602ea5930232b7cf8039002ae333f13194',
                  currentState: 'grainElevator'
                },
                elevatorData: {
                  received: true,
                  notes: 'The elevator is full'
                }
              }
            }
          }
        },
        type: 'transaction',
        sourceCounter: '0LTrZTaAEYCcPtbIMcR0rlq46sbmtNEJHjnA+Ur/XU4=',
        address: '95c14b602ea5930232b7cf8039002ae333f13194',
        createdAt: '1519700793729',
        date: '1519700793729',
        operation: 'blobCreate',
        destCounter: 'swrwkU5gV5i4ZWKhBl/j1Sp+CmHhbHoqxVL37NwgmdY='
      },
      {
        id:
          '<dd5ce52a7ba25581b10b5433b40c201f6bbb4762fede8b5511382ab47bb30614>',
        popcode: '<95c14b602ea5930232b7cf8039002ae333f13194>',
        spot: 'dairyFarmer',
        txId:
          'dd5ce52a7ba25581b10b5433b40c201f6bbb4762fede8b5511382ab47bb30614',
        data: {
          metadata: {
            appData: {
              stepName: 'merchandiser',
              stepTitle: 'Merchandiser receives',
              spot: 'dairyFarmer',
              workflowData: {
                popcode: {
                  name: 'P1_F3MTBSPTA',
                  address: '95c14b602ea5930232b7cf8039002ae333f13194',
                  currentState: 'merchandiser'
                },
                merchandiserData: {
                  received: true,
                  notes: 'Merchants are happy'
                }
              }
            }
          }
        },
        type: 'transaction',
        sourceCounter: 'bjb2bQe6tkqR13zxFBxf61tJ/5zCPT1T6PS1nlUNgpw=',
        address: '95c14b602ea5930232b7cf8039002ae333f13194',
        createdAt: '1519700820113',
        date: '1519700820113',
        operation: 'blobCreate',
        destCounter: 'ie486pnbwHLAvyTcQg73CuYBl2kSKn8o28atihYcN2k='
      },
      {
        id:
          '<84e5f5b36917992534cae374c15abf69277044e75250f58f7555b15a5d519a1e>',
        popcode: '<95c14b602ea5930232b7cf8039002ae333f13194>',
        spot: 'milkProducder',
        txId:
          '84e5f5b36917992534cae374c15abf69277044e75250f58f7555b15a5d519a1e',
        data: {
          metadata: {
            appData: {
              stepName: 'dairyFarmer',
              stepTitle: 'Dairy Farmer receives',
              spot: 'milkProducder',
              workflowData: {
                popcode: {
                  name: 'P1_F3MTBSPTA',
                  address: '95c14b602ea5930232b7cf8039002ae333f13194',
                  currentState: 'dairyFarmer'
                },
                dairyData: {
                  received: true,
                  notes: 'The cows like the feed'
                }
              }
            }
          }
        },
        type: 'transaction',
        sourceCounter: 'aOmzuhCITRStQVxgRSUjqH7VCIO6TJX62JOZ1IawmZ4=',
        address: '95c14b602ea5930232b7cf8039002ae333f13194',
        createdAt: '1519700846704',
        date: '1519700846704',
        operation: 'blobCreate',
        destCounter: '6bpNVGFIbwVOh5D/jfgyS9szDBpjT/KelsIAvYJ81LA='
      },
      {
        id:
          '<6a9e51c57bbbe2a931936911d65bfb4e2f7e62ac1cb8d15c3df3d9dcb41a7e07>',
        popcode: '<95c14b602ea5930232b7cf8039002ae333f13194>',
        spot: 'iceCreamFactory',
        txId:
          '6a9e51c57bbbe2a931936911d65bfb4e2f7e62ac1cb8d15c3df3d9dcb41a7e07',
        data: {
          metadata: {
            appData: {
              stepName: 'milkProducder',
              stepTitle: 'Milk Producder receives',
              spot: 'iceCreamFactory',
              workflowData: {
                popcode: {
                  name: 'P1_F3MTBSPTA',
                  address: '95c14b602ea5930232b7cf8039002ae333f13194',
                  currentState: 'milkProducder'
                },
                producerData: {
                  received: true,
                  notes: 'The milk is getting powdered'
                }
              }
            }
          }
        },
        type: 'transaction',
        sourceCounter: '2jFB5SXTYiJBPGai0HA37B68zEv6oB/JYc76mwSXkEY=',
        address: '95c14b602ea5930232b7cf8039002ae333f13194',
        createdAt: '1519700899912',
        date: '1519700899912',
        operation: 'blobCreate',
        destCounter: '6721+rz3gYy0ULzP9c91AaEMjih8JZXGwZPWCVWbJbw='
      },
      {
        id:
          '<776942113a1aef6d8f1425878318fce8b983e343f9ae816904bc77c03996553d>',
        popcode: '<95c14b602ea5930232b7cf8039002ae333f13194>',
        spot: 'complete',
        txId:
          '776942113a1aef6d8f1425878318fce8b983e343f9ae816904bc77c03996553d',
        data: {
          metadata: {
            appData: {
              stepName: 'iceCreamFactory',
              stepTitle: 'IceCream Factory receives',
              spot: 'complete',
              workflowData: {
                popcode: {
                  name: 'P1_F3MTBSPTA',
                  address: '95c14b602ea5930232b7cf8039002ae333f13194',
                  currentState: 'iceCreamFactory'
                },
                factoryData: {
                  received: true,
                  notes: 'Yum'
                }
              }
            }
          }
        },
        type: 'transaction',
        sourceCounter: 'Pxd+0nO9j3pBoV5yBEX/JITPx4cFbUexNulgEEdI3eQ=',
        address: '95c14b602ea5930232b7cf8039002ae333f13194',
        createdAt: '1519700915204',
        date: '1519700915204',
        operation: 'blobCreate',
        destCounter: '0w7A5FlOyFyN5ONpMM74qUzx+5fKg4uaD1mBldKTk2I='
      }
    ],
    workflowName: 'unileverV1',
    workflowData: {
      harvestData: {
        loadingStatus: true,
        seedLine: 'Good seed'
      },
      popcode: {
        name: 'P1_F3MTBSPTA',
        address: '95c14b602ea5930232b7cf8039002ae333f13194',
        currentState: 'iceCreamFactory'
      },
      elevatorData: {
        received: true,
        notes: 'The elevator is full'
      },
      merchandiserData: {
        received: true,
        notes: 'Merchants are happy'
      },
      dairyData: {
        received: true,
        notes: 'The cows like the feed'
      },
      producerData: {
        received: true,
        notes: 'The milk is getting powdered'
      },
      factoryData: {
        received: true,
        notes: 'Yum'
      }
    },
    timestamp: 1519700915204,
    stepName: 'iceCreamFactory',
    stepTitle: 'IceCream Factory receives'
  }
];
