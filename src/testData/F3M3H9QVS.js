export default [
  {
    id: '<6295394298d7f3b202541995d7612e8992a9d9ac>',
    workflowInstanceId: 'F3M3H9QVS',
    appData: {
      workflowData: {
        harvestData: {
          loadingStatus: true,
          seedLine: 'Heritage seed company v. Ohio 22'
        },
        loadingStatus: true,
        seedLine: 'Heritage seed company v. Ohio 22',
        elevatorData: {
          received: true,
          notes: 'Elevator received corn feed'
        },
        merchandiserData: {
          received: true,
          notes: 'Packaged v. Ohio 22 for Diary #13'
        },
        dairyData: {
          received: true,
          notes: 'Received v. Ohio 22 for feedlot 24'
        },
        producerData: {
          received: true,
          notes: 'Received from Dairy 22 lot 13'
        },
        factoryData: {
          received: true,
          notes: 'Received from producer 32'
        }
      },
      spot: 'complete',
      workflowName: 'unileverV1',
      workflowInstanceId: 'F3M3H9QVS',
      workflowRootPopcode: 'true',
      popcodeName: 'P1_F3M3H9QVS',
      workflowDef: {
        title: 'Unilever V1',
        name: 'unileverV1',
        startScreen: 'Home',
        version: '1.0',
        steps: {
          harvestCorn: {
            step: 'harvestCorn',
            title: 'Harvest Corn',
            screen: 'HarvestCorn'
          },
          grainElevator: {
            step: 'grainElevator',
            title: 'Grain Elevator',
            screen: 'GrainElevator',
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
            screen: 'Completed'
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
                roles: ['orgadmin'],
                action: [
                  {
                    operation: 'navigate',
                    screen: 'Scan'
                  }
                ]
              },
              harvest: {
                title: 'Harvest',
                roles: ['orgadmin'],
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
            'base64_Y2xhc3MgU21hcnRDb250cmFjdCBleHRlbmRzIFNtYXJ0Q29udHJhY3RCYXNlIHsKICBjb25zdHJ1Y3Rvcihob29rcykgewogICAgICBzdXBlcihob29rcykKICAgICAgdGhpcy5kZWJ1Z0xvZygnKioqKioqKioqKioqKiogU21hcnRDb250cmFjdCcpOwogIH0KCiAgYXN5bmMgZWNobygpIHsKICAgICAgdGhpcy5kZWJ1Z0xvZygnZWNobycpOwogICAgICB2YXIgcnZhbCA9IHsKICAgICAgICAgIGRhdGE6ICdoZWxsbycKICAgICAgfTsKICAgICAgdGhpcy5ob29rcy5maW5pc2gucmVzb2x2ZShydmFsKTsKICB9CgogIGFzeW5jIGhhcnZlc3RDb3JuT2soKSB7IHJldHVybiBhd2FpdCB0aGlzLm1pbnRTdGVwKCdoYXJ2ZXN0Q29ybicsICdncmFpbkVsZXZhdG9yJywgJ0Nvcm4gU2hpcHBlZCcpOyB9CiAgYXN5bmMgZ3JhaW5FbGV2YXRvck9rKCkgeyByZXR1cm4gYXdhaXQgdGhpcy5zdGVwT2soJ2dyYWluRWxldmF0b3InLCAnbWVyY2hhbmRpc2VyJywgJ2VsZXZhdG9yRGF0YScsICdHcmFpbiBFbGV2YXRvciByZWNlaXZlcycpOyB9CiAgYXN5bmMgbWVyY2hhbmRpc2VyT2soKSB7IHJldHVybiBhd2FpdCB0aGlzLnN0ZXBPaygnbWVyY2hhbmRpc2VyJywgJ2RhaXJ5RmFybWVyJywgJ21lcmNoYW5kaXNlckRhdGEnLCAnTWVyY2hhbmRpc2VyIHJlY2VpdmVzJyk7IH0KICBhc3luYyBkYWlyeUZhcm1lck9rKCkgeyByZXR1cm4gYXdhaXQgdGhpcy5zdGVwT2soJ2RhaXJ5RmFybWVyJywgJ21pbGtQcm9kdWNkZXInLCAnZGFpcnlEYXRhJywgJ0RhaXJ5IEZhcm1lciByZWNlaXZlcycpOyB9CiAgYXN5bmMgbWlsa1Byb2R1Y2Rlck9rKCkgeyByZXR1cm4gYXdhaXQgdGhpcy5zdGVwT2soJ21pbGtQcm9kdWNkZXInLCAnaWNlQ3JlYW1GYWN0b3J5JywgJ3Byb2R1Y2VyRGF0YScsICdNaWxrIFByb2R1Y2RlciByZWNlaXZlcycpOyB9CiAgYXN5bmMgaWNlQ3JlYW1GYWN0b3J5T2soKSB7IHJldHVybiBhd2FpdCB0aGlzLnN0ZXBPaygnaWNlQ3JlYW1GYWN0b3J5JywgJ2NvbXBsZXRlJywgJ2ZhY3RvcnlEYXRhJywgJ0ljZUNyZWFtIEZhY3RvcnkgcmVjZWl2ZXMnKTsgfQoKICBhc3luYyBzdGVwT2sobGFzdFNwb3QsIG5leHRTcG90LCBmaWVsZE5hbWUsIHN0ZXBUaXRsZSkgewogICAgICB0aGlzLmRlYnVnTG9nKCdleGVjdXRlIHN0ZXBPaycpOwoKICAgICAgdmFyIF8gPSB0aGlzLmhvb2tzLl87CiAgICAgIHZhciBwb3Bjb2RlID0gdGhpcy5zdGF0ZS5wb3Bjb2RlOwogICAgICB2YXIgYWRkcmVzcyA9IHBvcGNvZGUuYWRkcmVzczsKICAgICAgdmFyIGFwcCA9IHRoaXMuaG9va3MuYXBwOwogICAgICB2YXIgdXNlckNyZWRlbnRpYWxzID0gYXBwLmdldEFwcFN0YXRlKCd1c2VyQ3JlZGVudGlhbHMnKTsKICAgICAgdmFyIHB1YmxpY0tleSA9IHVzZXJDcmVkZW50aWFscy5wdWJsaWNLZXk7CiAgICAgIHZhciBwcml2YXRlS2V5ID0gdXNlckNyZWRlbnRpYWxzLnByaXZhdGVLZXk7CiAgICAgIHZhciBmb3JtID0gdGhpcy5zdGF0ZS5mb3JtOwogICAgICB2YXIgZm9ybURhdGEgPSBfLmdldChmb3JtLCBbZmllbGROYW1lXSk7CgogICAgICB2YXIgZGF0YSA9CiAgICAgICAgICB7CiAgICAgICAgICAgICJhcHBEYXRhIjogewogICAgICAgICAgICAgICJzdGVwTmFtZSI6IGxhc3RTcG90LAogICAgICAgICAgICAgIHN0ZXBUaXRsZSwKICAgICAgICAgICAgICAic3BvdCI6IG5leHRTcG90LAogICAgICAgICAgICAgICJ3b3JrZmxvd0RhdGEiOiBmb3JtCiAgICAgICAgICAgIH0KICAgICAgICAgIH07CgogICAgICB0aGlzLmRlYnVnTG9nKCdibG9iRGF0YScpOwogICAgICB0aGlzLmRlYnVnTG9nKGRhdGEpOwoKICAgICAgdmFyIHJlcyA9IGF3YWl0IHRoaXMuYmxvYkNyZWF0ZShhZGRyZXNzLGRhdGEscHVibGljS2V5LHByaXZhdGVLZXkpOwoKICAgICAgdmFyIHJ2YWwgPSB7CiAgICAgICAgICBhY3Rpb246IFtdCiAgICAgIH07CiAgICAgIHRoaXMuaG9va3MuZmluaXNoLnJlc29sdmUocnZhbCk7CiAgfQoKICBhc3luYyBtaW50U3RlcChsYXN0U3BvdCwgbmV4dFNwb3QsIHN0ZXBUaXRsZSkgewogICAgICB0aGlzLmRlYnVnTG9nKCdleGVjdXRlIG1pbnRTdGVwJyk7CgogICAgICB2YXIgc3MgPSB0aGlzLmhvb2tzLnNjcmVlblN0YXRlOwogICAgICB2YXIgYXBwID0gdGhpcy5ob29rcy5hcHA7CiAgICAgIHZhciB1c2VyQ3JlZGVudGlhbHMgPSBhcHAuZ2V0QXBwU3RhdGUoJ3VzZXJDcmVkZW50aWFscycpOwogICAgICB2YXIgcHVibGljS2V5ID0gdXNlckNyZWRlbnRpYWxzLnB1YmxpY0tleTsKICAgICAgdmFyIHByaXZhdGVLZXkgPSB1c2VyQ3JlZGVudGlhbHMucHJpdmF0ZUtleTsKICAgICAgdmFyIHdvcmtmbG93ID0gc3Mud29ya2Zsb3c7CiAgICAgIHZhciBuZXdJZCA9IHRoaXMuaG9va3Muc2hvcnRpZC5nZW5lcmF0ZSgpOwogICAgICB2YXIgeyBmb3JtIH0gPSB0aGlzLnN0YXRlOwogICAgICAvLyB0aGlzLmRlYnVnTG9nKCcjIyMjIyMjIyMjIyMjICBuZXdJZDogJyArIG5ld0lkKTsKICAgICAgdmFyIHsgcG9wY29kZSB9ID0gYXdhaXQgdGhpcy5nZW5Qb3Bjb2RlKCk7CiAgICAgIHZhciB7IGFkZHJlc3MgfSA9IHBvcGNvZGU7CgogICAgICB2YXIgZGF0YSA9CiAgICAgICAgICB7CiAgICAgICAgICAgICJhcHBEYXRhIjogewogICAgICAgICAgICAgICJ3b3JrZmxvd0RhdGEiOiBmb3JtLAogICAgICAgICAgICAgICJzcG90IjogbGFzdFNwb3QsCiAgICAgICAgICAgICAgIndvcmtmbG93TmFtZSI6IHNzLndvcmtmbG93Lm5hbWUsCiAgICAgICAgICAgICAgIndvcmtmbG93SW5zdGFuY2VJZCI6IG5ld0lkLAogICAgICAgICAgICAgICJ3b3JrZmxvd1Jvb3RQb3Bjb2RlIjogInRydWUiLAogICAgICAgICAgICAgICJwb3Bjb2RlTmFtZSI6ICdQMV8nICsgbmV3SWQsCiAgICAgICAgICAgICAgIndvcmtmbG93RGVmIjogd29ya2Zsb3cKICAgICAgICAgICAgfQogICAgICAgICAgfTsKCiAgICAgIHRoaXMuZGVidWdMb2coJ21pbnREYXRhJyk7CiAgICAgIHRoaXMuZGVidWdMb2coZGF0YSk7CgogICAgICB2YXIgcmVzID0gYXdhaXQgdGhpcy5taW50Q3JlYXRlKGFkZHJlc3MsZGF0YSxwdWJsaWNLZXkscHJpdmF0ZUtleSk7CiAgICAgIC8vIHRoaXMuZGVidWdMb2coJ3RoaXMubWludENyZWF0ZSByZXMuYm9keTogJyArIHJlcy5ib2R5KTsKCiAgICAgIHZhciBkYXRhID0KICAgICAgICAgIHsKICAgICAgICAgICAgImFwcERhdGEiOiB7CiAgICAgICAgICAgICAgInN0ZXBOYW1lIjogbGFzdFNwb3QsCiAgICAgICAgICAgICAgc3RlcFRpdGxlLAogICAgICAgICAgICAgICJzcG90IjogbmV4dFNwb3QsCiAgICAgICAgICAgICAgIndvcmtmbG93RGF0YSI6IGZvcm0uaGFydmVzdERhdGEKICAgICAgICAgICAgfQogICAgICAgICAgfTsKCiAgICAgIHRoaXMuZGVidWdMb2coJ2Jsb2JEYXRhJyk7CiAgICAgIHRoaXMuZGVidWdMb2coZGF0YSk7CgogICAgICB2YXIgcmVzID0gYXdhaXQgdGhpcy5ibG9iQ3JlYXRlKGFkZHJlc3MsZGF0YSxwdWJsaWNLZXkscHJpdmF0ZUtleSk7CgogICAgICB2YXIgcnZhbCA9IHsKICAgICAgICAgIGFjdGlvbjogW10KICAgICAgfTsKICAgICAgdGhpcy5ob29rcy5maW5pc2gucmVzb2x2ZShydmFsKTsKICB9Cgp9Owo='
          ]
        }
      },
      timestamp: 1519676548120,
      stepName: 'iceCreamFactory',
      stepTitle: 'IceCream Factory receives'
    },
    publicKey: 'AzFSqglD2Tz0BHF7fyc5OZ0NYkqslptvM8W2ghgAjmAN',
    spot: 'complete',
    unit: 'container',
    type: 'popcode',
    popcodeName: 'P1_F3M3H9QVS',
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
          screen: 'HarvestCorn'
        },
        grainElevator: {
          step: 'grainElevator',
          title: 'Grain Elevator',
          screen: 'GrainElevator',
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
          screen: 'Completed'
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
              roles: ['orgadmin'],
              action: [
                {
                  operation: 'navigate',
                  screen: 'Scan'
                }
              ]
            },
            harvest: {
              title: 'Harvest',
              roles: ['orgadmin'],
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
          'base64_Y2xhc3MgU21hcnRDb250cmFjdCBleHRlbmRzIFNtYXJ0Q29udHJhY3RCYXNlIHsKICBjb25zdHJ1Y3Rvcihob29rcykgewogICAgICBzdXBlcihob29rcykKICAgICAgdGhpcy5kZWJ1Z0xvZygnKioqKioqKioqKioqKiogU21hcnRDb250cmFjdCcpOwogIH0KCiAgYXN5bmMgZWNobygpIHsKICAgICAgdGhpcy5kZWJ1Z0xvZygnZWNobycpOwogICAgICB2YXIgcnZhbCA9IHsKICAgICAgICAgIGRhdGE6ICdoZWxsbycKICAgICAgfTsKICAgICAgdGhpcy5ob29rcy5maW5pc2gucmVzb2x2ZShydmFsKTsKICB9CgogIGFzeW5jIGhhcnZlc3RDb3JuT2soKSB7IHJldHVybiBhd2FpdCB0aGlzLm1pbnRTdGVwKCdoYXJ2ZXN0Q29ybicsICdncmFpbkVsZXZhdG9yJywgJ0Nvcm4gU2hpcHBlZCcpOyB9CiAgYXN5bmMgZ3JhaW5FbGV2YXRvck9rKCkgeyByZXR1cm4gYXdhaXQgdGhpcy5zdGVwT2soJ2dyYWluRWxldmF0b3InLCAnbWVyY2hhbmRpc2VyJywgJ2VsZXZhdG9yRGF0YScsICdHcmFpbiBFbGV2YXRvciByZWNlaXZlcycpOyB9CiAgYXN5bmMgbWVyY2hhbmRpc2VyT2soKSB7IHJldHVybiBhd2FpdCB0aGlzLnN0ZXBPaygnbWVyY2hhbmRpc2VyJywgJ2RhaXJ5RmFybWVyJywgJ21lcmNoYW5kaXNlckRhdGEnLCAnTWVyY2hhbmRpc2VyIHJlY2VpdmVzJyk7IH0KICBhc3luYyBkYWlyeUZhcm1lck9rKCkgeyByZXR1cm4gYXdhaXQgdGhpcy5zdGVwT2soJ2RhaXJ5RmFybWVyJywgJ21pbGtQcm9kdWNkZXInLCAnZGFpcnlEYXRhJywgJ0RhaXJ5IEZhcm1lciByZWNlaXZlcycpOyB9CiAgYXN5bmMgbWlsa1Byb2R1Y2Rlck9rKCkgeyByZXR1cm4gYXdhaXQgdGhpcy5zdGVwT2soJ21pbGtQcm9kdWNkZXInLCAnaWNlQ3JlYW1GYWN0b3J5JywgJ3Byb2R1Y2VyRGF0YScsICdNaWxrIFByb2R1Y2RlciByZWNlaXZlcycpOyB9CiAgYXN5bmMgaWNlQ3JlYW1GYWN0b3J5T2soKSB7IHJldHVybiBhd2FpdCB0aGlzLnN0ZXBPaygnaWNlQ3JlYW1GYWN0b3J5JywgJ2NvbXBsZXRlJywgJ2ZhY3RvcnlEYXRhJywgJ0ljZUNyZWFtIEZhY3RvcnkgcmVjZWl2ZXMnKTsgfQoKICBhc3luYyBzdGVwT2sobGFzdFNwb3QsIG5leHRTcG90LCBmaWVsZE5hbWUsIHN0ZXBUaXRsZSkgewogICAgICB0aGlzLmRlYnVnTG9nKCdleGVjdXRlIHN0ZXBPaycpOwoKICAgICAgdmFyIF8gPSB0aGlzLmhvb2tzLl87CiAgICAgIHZhciBwb3Bjb2RlID0gdGhpcy5zdGF0ZS5wb3Bjb2RlOwogICAgICB2YXIgYWRkcmVzcyA9IHBvcGNvZGUuYWRkcmVzczsKICAgICAgdmFyIGFwcCA9IHRoaXMuaG9va3MuYXBwOwogICAgICB2YXIgdXNlckNyZWRlbnRpYWxzID0gYXBwLmdldEFwcFN0YXRlKCd1c2VyQ3JlZGVudGlhbHMnKTsKICAgICAgdmFyIHB1YmxpY0tleSA9IHVzZXJDcmVkZW50aWFscy5wdWJsaWNLZXk7CiAgICAgIHZhciBwcml2YXRlS2V5ID0gdXNlckNyZWRlbnRpYWxzLnByaXZhdGVLZXk7CiAgICAgIHZhciBmb3JtID0gdGhpcy5zdGF0ZS5mb3JtOwogICAgICB2YXIgZm9ybURhdGEgPSBfLmdldChmb3JtLCBbZmllbGROYW1lXSk7CgogICAgICB2YXIgZGF0YSA9CiAgICAgICAgICB7CiAgICAgICAgICAgICJhcHBEYXRhIjogewogICAgICAgICAgICAgICJzdGVwTmFtZSI6IGxhc3RTcG90LAogICAgICAgICAgICAgIHN0ZXBUaXRsZSwKICAgICAgICAgICAgICAic3BvdCI6IG5leHRTcG90LAogICAgICAgICAgICAgICJ3b3JrZmxvd0RhdGEiOiBmb3JtCiAgICAgICAgICAgIH0KICAgICAgICAgIH07CgogICAgICB0aGlzLmRlYnVnTG9nKCdibG9iRGF0YScpOwogICAgICB0aGlzLmRlYnVnTG9nKGRhdGEpOwoKICAgICAgdmFyIHJlcyA9IGF3YWl0IHRoaXMuYmxvYkNyZWF0ZShhZGRyZXNzLGRhdGEscHVibGljS2V5LHByaXZhdGVLZXkpOwoKICAgICAgdmFyIHJ2YWwgPSB7CiAgICAgICAgICBhY3Rpb246IFtdCiAgICAgIH07CiAgICAgIHRoaXMuaG9va3MuZmluaXNoLnJlc29sdmUocnZhbCk7CiAgfQoKICBhc3luYyBtaW50U3RlcChsYXN0U3BvdCwgbmV4dFNwb3QsIHN0ZXBUaXRsZSkgewogICAgICB0aGlzLmRlYnVnTG9nKCdleGVjdXRlIG1pbnRTdGVwJyk7CgogICAgICB2YXIgc3MgPSB0aGlzLmhvb2tzLnNjcmVlblN0YXRlOwogICAgICB2YXIgYXBwID0gdGhpcy5ob29rcy5hcHA7CiAgICAgIHZhciB1c2VyQ3JlZGVudGlhbHMgPSBhcHAuZ2V0QXBwU3RhdGUoJ3VzZXJDcmVkZW50aWFscycpOwogICAgICB2YXIgcHVibGljS2V5ID0gdXNlckNyZWRlbnRpYWxzLnB1YmxpY0tleTsKICAgICAgdmFyIHByaXZhdGVLZXkgPSB1c2VyQ3JlZGVudGlhbHMucHJpdmF0ZUtleTsKICAgICAgdmFyIHdvcmtmbG93ID0gc3Mud29ya2Zsb3c7CiAgICAgIHZhciBuZXdJZCA9IHRoaXMuaG9va3Muc2hvcnRpZC5nZW5lcmF0ZSgpOwogICAgICB2YXIgeyBmb3JtIH0gPSB0aGlzLnN0YXRlOwogICAgICAvLyB0aGlzLmRlYnVnTG9nKCcjIyMjIyMjIyMjIyMjICBuZXdJZDogJyArIG5ld0lkKTsKICAgICAgdmFyIHsgcG9wY29kZSB9ID0gYXdhaXQgdGhpcy5nZW5Qb3Bjb2RlKCk7CiAgICAgIHZhciB7IGFkZHJlc3MgfSA9IHBvcGNvZGU7CgogICAgICB2YXIgZGF0YSA9CiAgICAgICAgICB7CiAgICAgICAgICAgICJhcHBEYXRhIjogewogICAgICAgICAgICAgICJ3b3JrZmxvd0RhdGEiOiBmb3JtLAogICAgICAgICAgICAgICJzcG90IjogbGFzdFNwb3QsCiAgICAgICAgICAgICAgIndvcmtmbG93TmFtZSI6IHNzLndvcmtmbG93Lm5hbWUsCiAgICAgICAgICAgICAgIndvcmtmbG93SW5zdGFuY2VJZCI6IG5ld0lkLAogICAgICAgICAgICAgICJ3b3JrZmxvd1Jvb3RQb3Bjb2RlIjogInRydWUiLAogICAgICAgICAgICAgICJwb3Bjb2RlTmFtZSI6ICdQMV8nICsgbmV3SWQsCiAgICAgICAgICAgICAgIndvcmtmbG93RGVmIjogd29ya2Zsb3cKICAgICAgICAgICAgfQogICAgICAgICAgfTsKCiAgICAgIHRoaXMuZGVidWdMb2coJ21pbnREYXRhJyk7CiAgICAgIHRoaXMuZGVidWdMb2coZGF0YSk7CgogICAgICB2YXIgcmVzID0gYXdhaXQgdGhpcy5taW50Q3JlYXRlKGFkZHJlc3MsZGF0YSxwdWJsaWNLZXkscHJpdmF0ZUtleSk7CiAgICAgIC8vIHRoaXMuZGVidWdMb2coJ3RoaXMubWludENyZWF0ZSByZXMuYm9keTogJyArIHJlcy5ib2R5KTsKCiAgICAgIHZhciBkYXRhID0KICAgICAgICAgIHsKICAgICAgICAgICAgImFwcERhdGEiOiB7CiAgICAgICAgICAgICAgInN0ZXBOYW1lIjogbGFzdFNwb3QsCiAgICAgICAgICAgICAgc3RlcFRpdGxlLAogICAgICAgICAgICAgICJzcG90IjogbmV4dFNwb3QsCiAgICAgICAgICAgICAgIndvcmtmbG93RGF0YSI6IGZvcm0uaGFydmVzdERhdGEKICAgICAgICAgICAgfQogICAgICAgICAgfTsKCiAgICAgIHRoaXMuZGVidWdMb2coJ2Jsb2JEYXRhJyk7CiAgICAgIHRoaXMuZGVidWdMb2coZGF0YSk7CgogICAgICB2YXIgcmVzID0gYXdhaXQgdGhpcy5ibG9iQ3JlYXRlKGFkZHJlc3MsZGF0YSxwdWJsaWNLZXkscHJpdmF0ZUtleSk7CgogICAgICB2YXIgcnZhbCA9IHsKICAgICAgICAgIGFjdGlvbjogW10KICAgICAgfTsKICAgICAgdGhpcy5ob29rcy5maW5pc2gucmVzb2x2ZShydmFsKTsKICB9Cgp9Owo='
        ]
      }
    },
    address: '6295394298d7f3b202541995d7612e8992a9d9ac',
    workflowRootPopcode: 'true',
    transaction: [
      {
        id:
          '<e2e940a227a1d36747f306bc264f69445d55dad09cfb66123c19b92b0300cbec>',
        popcode: '<6295394298d7f3b202541995d7612e8992a9d9ac>',
        spot: 'harvestCorn',
        unit: 'container',
        txId:
          'e2e940a227a1d36747f306bc264f69445d55dad09cfb66123c19b92b0300cbec',
        data: {
          metadata: {
            appData: {
              workflowData: {
                harvestData: {
                  loadingStatus: true,
                  seedLine: 'Heritage seed company v. Ohio 22'
                }
              },
              spot: 'harvestCorn',
              workflowName: 'unileverV1',
              workflowInstanceId: 'F3M3H9QVS',
              workflowRootPopcode: 'true',
              popcodeName: 'P1_F3M3H9QVS',
              workflowDef: {
                title: 'Unilever V1',
                name: 'unileverV1',
                startScreen: 'Home',
                version: '1.0',
                steps: {
                  harvestCorn: {
                    step: 'harvestCorn',
                    title: 'Harvest Corn',
                    screen: 'HarvestCorn'
                  },
                  grainElevator: {
                    step: 'grainElevator',
                    title: 'Grain Elevator',
                    screen: 'GrainElevator',
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
                    screen: 'Completed'
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
                        roles: ['orgadmin'],
                        action: [
                          {
                            operation: 'navigate',
                            screen: 'Scan'
                          }
                        ]
                      },
                      harvest: {
                        title: 'Harvest',
                        roles: ['orgadmin'],
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
                    'base64_Y2xhc3MgU21hcnRDb250cmFjdCBleHRlbmRzIFNtYXJ0Q29udHJhY3RCYXNlIHsKICBjb25zdHJ1Y3Rvcihob29rcykgewogICAgICBzdXBlcihob29rcykKICAgICAgdGhpcy5kZWJ1Z0xvZygnKioqKioqKioqKioqKiogU21hcnRDb250cmFjdCcpOwogIH0KCiAgYXN5bmMgZWNobygpIHsKICAgICAgdGhpcy5kZWJ1Z0xvZygnZWNobycpOwogICAgICB2YXIgcnZhbCA9IHsKICAgICAgICAgIGRhdGE6ICdoZWxsbycKICAgICAgfTsKICAgICAgdGhpcy5ob29rcy5maW5pc2gucmVzb2x2ZShydmFsKTsKICB9CgogIGFzeW5jIGhhcnZlc3RDb3JuT2soKSB7IHJldHVybiBhd2FpdCB0aGlzLm1pbnRTdGVwKCdoYXJ2ZXN0Q29ybicsICdncmFpbkVsZXZhdG9yJywgJ0Nvcm4gU2hpcHBlZCcpOyB9CiAgYXN5bmMgZ3JhaW5FbGV2YXRvck9rKCkgeyByZXR1cm4gYXdhaXQgdGhpcy5zdGVwT2soJ2dyYWluRWxldmF0b3InLCAnbWVyY2hhbmRpc2VyJywgJ2VsZXZhdG9yRGF0YScsICdHcmFpbiBFbGV2YXRvciByZWNlaXZlcycpOyB9CiAgYXN5bmMgbWVyY2hhbmRpc2VyT2soKSB7IHJldHVybiBhd2FpdCB0aGlzLnN0ZXBPaygnbWVyY2hhbmRpc2VyJywgJ2RhaXJ5RmFybWVyJywgJ21lcmNoYW5kaXNlckRhdGEnLCAnTWVyY2hhbmRpc2VyIHJlY2VpdmVzJyk7IH0KICBhc3luYyBkYWlyeUZhcm1lck9rKCkgeyByZXR1cm4gYXdhaXQgdGhpcy5zdGVwT2soJ2RhaXJ5RmFybWVyJywgJ21pbGtQcm9kdWNkZXInLCAnZGFpcnlEYXRhJywgJ0RhaXJ5IEZhcm1lciByZWNlaXZlcycpOyB9CiAgYXN5bmMgbWlsa1Byb2R1Y2Rlck9rKCkgeyByZXR1cm4gYXdhaXQgdGhpcy5zdGVwT2soJ21pbGtQcm9kdWNkZXInLCAnaWNlQ3JlYW1GYWN0b3J5JywgJ3Byb2R1Y2VyRGF0YScsICdNaWxrIFByb2R1Y2RlciByZWNlaXZlcycpOyB9CiAgYXN5bmMgaWNlQ3JlYW1GYWN0b3J5T2soKSB7IHJldHVybiBhd2FpdCB0aGlzLnN0ZXBPaygnaWNlQ3JlYW1GYWN0b3J5JywgJ2NvbXBsZXRlJywgJ2ZhY3RvcnlEYXRhJywgJ0ljZUNyZWFtIEZhY3RvcnkgcmVjZWl2ZXMnKTsgfQoKICBhc3luYyBzdGVwT2sobGFzdFNwb3QsIG5leHRTcG90LCBmaWVsZE5hbWUsIHN0ZXBUaXRsZSkgewogICAgICB0aGlzLmRlYnVnTG9nKCdleGVjdXRlIHN0ZXBPaycpOwoKICAgICAgdmFyIF8gPSB0aGlzLmhvb2tzLl87CiAgICAgIHZhciBwb3Bjb2RlID0gdGhpcy5zdGF0ZS5wb3Bjb2RlOwogICAgICB2YXIgYWRkcmVzcyA9IHBvcGNvZGUuYWRkcmVzczsKICAgICAgdmFyIGFwcCA9IHRoaXMuaG9va3MuYXBwOwogICAgICB2YXIgdXNlckNyZWRlbnRpYWxzID0gYXBwLmdldEFwcFN0YXRlKCd1c2VyQ3JlZGVudGlhbHMnKTsKICAgICAgdmFyIHB1YmxpY0tleSA9IHVzZXJDcmVkZW50aWFscy5wdWJsaWNLZXk7CiAgICAgIHZhciBwcml2YXRlS2V5ID0gdXNlckNyZWRlbnRpYWxzLnByaXZhdGVLZXk7CiAgICAgIHZhciBmb3JtID0gdGhpcy5zdGF0ZS5mb3JtOwogICAgICB2YXIgZm9ybURhdGEgPSBfLmdldChmb3JtLCBbZmllbGROYW1lXSk7CgogICAgICB2YXIgZGF0YSA9CiAgICAgICAgICB7CiAgICAgICAgICAgICJhcHBEYXRhIjogewogICAgICAgICAgICAgICJzdGVwTmFtZSI6IGxhc3RTcG90LAogICAgICAgICAgICAgIHN0ZXBUaXRsZSwKICAgICAgICAgICAgICAic3BvdCI6IG5leHRTcG90LAogICAgICAgICAgICAgICJ3b3JrZmxvd0RhdGEiOiBmb3JtCiAgICAgICAgICAgIH0KICAgICAgICAgIH07CgogICAgICB0aGlzLmRlYnVnTG9nKCdibG9iRGF0YScpOwogICAgICB0aGlzLmRlYnVnTG9nKGRhdGEpOwoKICAgICAgdmFyIHJlcyA9IGF3YWl0IHRoaXMuYmxvYkNyZWF0ZShhZGRyZXNzLGRhdGEscHVibGljS2V5LHByaXZhdGVLZXkpOwoKICAgICAgdmFyIHJ2YWwgPSB7CiAgICAgICAgICBhY3Rpb246IFtdCiAgICAgIH07CiAgICAgIHRoaXMuaG9va3MuZmluaXNoLnJlc29sdmUocnZhbCk7CiAgfQoKICBhc3luYyBtaW50U3RlcChsYXN0U3BvdCwgbmV4dFNwb3QsIHN0ZXBUaXRsZSkgewogICAgICB0aGlzLmRlYnVnTG9nKCdleGVjdXRlIG1pbnRTdGVwJyk7CgogICAgICB2YXIgc3MgPSB0aGlzLmhvb2tzLnNjcmVlblN0YXRlOwogICAgICB2YXIgYXBwID0gdGhpcy5ob29rcy5hcHA7CiAgICAgIHZhciB1c2VyQ3JlZGVudGlhbHMgPSBhcHAuZ2V0QXBwU3RhdGUoJ3VzZXJDcmVkZW50aWFscycpOwogICAgICB2YXIgcHVibGljS2V5ID0gdXNlckNyZWRlbnRpYWxzLnB1YmxpY0tleTsKICAgICAgdmFyIHByaXZhdGVLZXkgPSB1c2VyQ3JlZGVudGlhbHMucHJpdmF0ZUtleTsKICAgICAgdmFyIHdvcmtmbG93ID0gc3Mud29ya2Zsb3c7CiAgICAgIHZhciBuZXdJZCA9IHRoaXMuaG9va3Muc2hvcnRpZC5nZW5lcmF0ZSgpOwogICAgICB2YXIgeyBmb3JtIH0gPSB0aGlzLnN0YXRlOwogICAgICAvLyB0aGlzLmRlYnVnTG9nKCcjIyMjIyMjIyMjIyMjICBuZXdJZDogJyArIG5ld0lkKTsKICAgICAgdmFyIHsgcG9wY29kZSB9ID0gYXdhaXQgdGhpcy5nZW5Qb3Bjb2RlKCk7CiAgICAgIHZhciB7IGFkZHJlc3MgfSA9IHBvcGNvZGU7CgogICAgICB2YXIgZGF0YSA9CiAgICAgICAgICB7CiAgICAgICAgICAgICJhcHBEYXRhIjogewogICAgICAgICAgICAgICJ3b3JrZmxvd0RhdGEiOiBmb3JtLAogICAgICAgICAgICAgICJzcG90IjogbGFzdFNwb3QsCiAgICAgICAgICAgICAgIndvcmtmbG93TmFtZSI6IHNzLndvcmtmbG93Lm5hbWUsCiAgICAgICAgICAgICAgIndvcmtmbG93SW5zdGFuY2VJZCI6IG5ld0lkLAogICAgICAgICAgICAgICJ3b3JrZmxvd1Jvb3RQb3Bjb2RlIjogInRydWUiLAogICAgICAgICAgICAgICJwb3Bjb2RlTmFtZSI6ICdQMV8nICsgbmV3SWQsCiAgICAgICAgICAgICAgIndvcmtmbG93RGVmIjogd29ya2Zsb3cKICAgICAgICAgICAgfQogICAgICAgICAgfTsKCiAgICAgIHRoaXMuZGVidWdMb2coJ21pbnREYXRhJyk7CiAgICAgIHRoaXMuZGVidWdMb2coZGF0YSk7CgogICAgICB2YXIgcmVzID0gYXdhaXQgdGhpcy5taW50Q3JlYXRlKGFkZHJlc3MsZGF0YSxwdWJsaWNLZXkscHJpdmF0ZUtleSk7CiAgICAgIC8vIHRoaXMuZGVidWdMb2coJ3RoaXMubWludENyZWF0ZSByZXMuYm9keTogJyArIHJlcy5ib2R5KTsKCiAgICAgIHZhciBkYXRhID0KICAgICAgICAgIHsKICAgICAgICAgICAgImFwcERhdGEiOiB7CiAgICAgICAgICAgICAgInN0ZXBOYW1lIjogbGFzdFNwb3QsCiAgICAgICAgICAgICAgc3RlcFRpdGxlLAogICAgICAgICAgICAgICJzcG90IjogbmV4dFNwb3QsCiAgICAgICAgICAgICAgIndvcmtmbG93RGF0YSI6IGZvcm0uaGFydmVzdERhdGEKICAgICAgICAgICAgfQogICAgICAgICAgfTsKCiAgICAgIHRoaXMuZGVidWdMb2coJ2Jsb2JEYXRhJyk7CiAgICAgIHRoaXMuZGVidWdMb2coZGF0YSk7CgogICAgICB2YXIgcmVzID0gYXdhaXQgdGhpcy5ibG9iQ3JlYXRlKGFkZHJlc3MsZGF0YSxwdWJsaWNLZXkscHJpdmF0ZUtleSk7CgogICAgICB2YXIgcnZhbCA9IHsKICAgICAgICAgIGFjdGlvbjogW10KICAgICAgfTsKICAgICAgdGhpcy5ob29rcy5maW5pc2gucmVzb2x2ZShydmFsKTsKICB9Cgp9Owo='
                  ]
                }
              }
            }
          }
        },
        type: 'transaction',
        sourceCounter: 'ZvJ0ZtF+DUAkmAx8LfSNlxF7JNKquABDWmdA583dctk=',
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
              screen: 'HarvestCorn'
            },
            grainElevator: {
              step: 'grainElevator',
              title: 'Grain Elevator',
              screen: 'GrainElevator',
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
              screen: 'Completed'
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
                  roles: ['orgadmin'],
                  action: [
                    {
                      operation: 'navigate',
                      screen: 'Scan'
                    }
                  ]
                },
                harvest: {
                  title: 'Harvest',
                  roles: ['orgadmin'],
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
              'base64_Y2xhc3MgU21hcnRDb250cmFjdCBleHRlbmRzIFNtYXJ0Q29udHJhY3RCYXNlIHsKICBjb25zdHJ1Y3Rvcihob29rcykgewogICAgICBzdXBlcihob29rcykKICAgICAgdGhpcy5kZWJ1Z0xvZygnKioqKioqKioqKioqKiogU21hcnRDb250cmFjdCcpOwogIH0KCiAgYXN5bmMgZWNobygpIHsKICAgICAgdGhpcy5kZWJ1Z0xvZygnZWNobycpOwogICAgICB2YXIgcnZhbCA9IHsKICAgICAgICAgIGRhdGE6ICdoZWxsbycKICAgICAgfTsKICAgICAgdGhpcy5ob29rcy5maW5pc2gucmVzb2x2ZShydmFsKTsKICB9CgogIGFzeW5jIGhhcnZlc3RDb3JuT2soKSB7IHJldHVybiBhd2FpdCB0aGlzLm1pbnRTdGVwKCdoYXJ2ZXN0Q29ybicsICdncmFpbkVsZXZhdG9yJywgJ0Nvcm4gU2hpcHBlZCcpOyB9CiAgYXN5bmMgZ3JhaW5FbGV2YXRvck9rKCkgeyByZXR1cm4gYXdhaXQgdGhpcy5zdGVwT2soJ2dyYWluRWxldmF0b3InLCAnbWVyY2hhbmRpc2VyJywgJ2VsZXZhdG9yRGF0YScsICdHcmFpbiBFbGV2YXRvciByZWNlaXZlcycpOyB9CiAgYXN5bmMgbWVyY2hhbmRpc2VyT2soKSB7IHJldHVybiBhd2FpdCB0aGlzLnN0ZXBPaygnbWVyY2hhbmRpc2VyJywgJ2RhaXJ5RmFybWVyJywgJ21lcmNoYW5kaXNlckRhdGEnLCAnTWVyY2hhbmRpc2VyIHJlY2VpdmVzJyk7IH0KICBhc3luYyBkYWlyeUZhcm1lck9rKCkgeyByZXR1cm4gYXdhaXQgdGhpcy5zdGVwT2soJ2RhaXJ5RmFybWVyJywgJ21pbGtQcm9kdWNkZXInLCAnZGFpcnlEYXRhJywgJ0RhaXJ5IEZhcm1lciByZWNlaXZlcycpOyB9CiAgYXN5bmMgbWlsa1Byb2R1Y2Rlck9rKCkgeyByZXR1cm4gYXdhaXQgdGhpcy5zdGVwT2soJ21pbGtQcm9kdWNkZXInLCAnaWNlQ3JlYW1GYWN0b3J5JywgJ3Byb2R1Y2VyRGF0YScsICdNaWxrIFByb2R1Y2RlciByZWNlaXZlcycpOyB9CiAgYXN5bmMgaWNlQ3JlYW1GYWN0b3J5T2soKSB7IHJldHVybiBhd2FpdCB0aGlzLnN0ZXBPaygnaWNlQ3JlYW1GYWN0b3J5JywgJ2NvbXBsZXRlJywgJ2ZhY3RvcnlEYXRhJywgJ0ljZUNyZWFtIEZhY3RvcnkgcmVjZWl2ZXMnKTsgfQoKICBhc3luYyBzdGVwT2sobGFzdFNwb3QsIG5leHRTcG90LCBmaWVsZE5hbWUsIHN0ZXBUaXRsZSkgewogICAgICB0aGlzLmRlYnVnTG9nKCdleGVjdXRlIHN0ZXBPaycpOwoKICAgICAgdmFyIF8gPSB0aGlzLmhvb2tzLl87CiAgICAgIHZhciBwb3Bjb2RlID0gdGhpcy5zdGF0ZS5wb3Bjb2RlOwogICAgICB2YXIgYWRkcmVzcyA9IHBvcGNvZGUuYWRkcmVzczsKICAgICAgdmFyIGFwcCA9IHRoaXMuaG9va3MuYXBwOwogICAgICB2YXIgdXNlckNyZWRlbnRpYWxzID0gYXBwLmdldEFwcFN0YXRlKCd1c2VyQ3JlZGVudGlhbHMnKTsKICAgICAgdmFyIHB1YmxpY0tleSA9IHVzZXJDcmVkZW50aWFscy5wdWJsaWNLZXk7CiAgICAgIHZhciBwcml2YXRlS2V5ID0gdXNlckNyZWRlbnRpYWxzLnByaXZhdGVLZXk7CiAgICAgIHZhciBmb3JtID0gdGhpcy5zdGF0ZS5mb3JtOwogICAgICB2YXIgZm9ybURhdGEgPSBfLmdldChmb3JtLCBbZmllbGROYW1lXSk7CgogICAgICB2YXIgZGF0YSA9CiAgICAgICAgICB7CiAgICAgICAgICAgICJhcHBEYXRhIjogewogICAgICAgICAgICAgICJzdGVwTmFtZSI6IGxhc3RTcG90LAogICAgICAgICAgICAgIHN0ZXBUaXRsZSwKICAgICAgICAgICAgICAic3BvdCI6IG5leHRTcG90LAogICAgICAgICAgICAgICJ3b3JrZmxvd0RhdGEiOiBmb3JtCiAgICAgICAgICAgIH0KICAgICAgICAgIH07CgogICAgICB0aGlzLmRlYnVnTG9nKCdibG9iRGF0YScpOwogICAgICB0aGlzLmRlYnVnTG9nKGRhdGEpOwoKICAgICAgdmFyIHJlcyA9IGF3YWl0IHRoaXMuYmxvYkNyZWF0ZShhZGRyZXNzLGRhdGEscHVibGljS2V5LHByaXZhdGVLZXkpOwoKICAgICAgdmFyIHJ2YWwgPSB7CiAgICAgICAgICBhY3Rpb246IFtdCiAgICAgIH07CiAgICAgIHRoaXMuaG9va3MuZmluaXNoLnJlc29sdmUocnZhbCk7CiAgfQoKICBhc3luYyBtaW50U3RlcChsYXN0U3BvdCwgbmV4dFNwb3QsIHN0ZXBUaXRsZSkgewogICAgICB0aGlzLmRlYnVnTG9nKCdleGVjdXRlIG1pbnRTdGVwJyk7CgogICAgICB2YXIgc3MgPSB0aGlzLmhvb2tzLnNjcmVlblN0YXRlOwogICAgICB2YXIgYXBwID0gdGhpcy5ob29rcy5hcHA7CiAgICAgIHZhciB1c2VyQ3JlZGVudGlhbHMgPSBhcHAuZ2V0QXBwU3RhdGUoJ3VzZXJDcmVkZW50aWFscycpOwogICAgICB2YXIgcHVibGljS2V5ID0gdXNlckNyZWRlbnRpYWxzLnB1YmxpY0tleTsKICAgICAgdmFyIHByaXZhdGVLZXkgPSB1c2VyQ3JlZGVudGlhbHMucHJpdmF0ZUtleTsKICAgICAgdmFyIHdvcmtmbG93ID0gc3Mud29ya2Zsb3c7CiAgICAgIHZhciBuZXdJZCA9IHRoaXMuaG9va3Muc2hvcnRpZC5nZW5lcmF0ZSgpOwogICAgICB2YXIgeyBmb3JtIH0gPSB0aGlzLnN0YXRlOwogICAgICAvLyB0aGlzLmRlYnVnTG9nKCcjIyMjIyMjIyMjIyMjICBuZXdJZDogJyArIG5ld0lkKTsKICAgICAgdmFyIHsgcG9wY29kZSB9ID0gYXdhaXQgdGhpcy5nZW5Qb3Bjb2RlKCk7CiAgICAgIHZhciB7IGFkZHJlc3MgfSA9IHBvcGNvZGU7CgogICAgICB2YXIgZGF0YSA9CiAgICAgICAgICB7CiAgICAgICAgICAgICJhcHBEYXRhIjogewogICAgICAgICAgICAgICJ3b3JrZmxvd0RhdGEiOiBmb3JtLAogICAgICAgICAgICAgICJzcG90IjogbGFzdFNwb3QsCiAgICAgICAgICAgICAgIndvcmtmbG93TmFtZSI6IHNzLndvcmtmbG93Lm5hbWUsCiAgICAgICAgICAgICAgIndvcmtmbG93SW5zdGFuY2VJZCI6IG5ld0lkLAogICAgICAgICAgICAgICJ3b3JrZmxvd1Jvb3RQb3Bjb2RlIjogInRydWUiLAogICAgICAgICAgICAgICJwb3Bjb2RlTmFtZSI6ICdQMV8nICsgbmV3SWQsCiAgICAgICAgICAgICAgIndvcmtmbG93RGVmIjogd29ya2Zsb3cKICAgICAgICAgICAgfQogICAgICAgICAgfTsKCiAgICAgIHRoaXMuZGVidWdMb2coJ21pbnREYXRhJyk7CiAgICAgIHRoaXMuZGVidWdMb2coZGF0YSk7CgogICAgICB2YXIgcmVzID0gYXdhaXQgdGhpcy5taW50Q3JlYXRlKGFkZHJlc3MsZGF0YSxwdWJsaWNLZXkscHJpdmF0ZUtleSk7CiAgICAgIC8vIHRoaXMuZGVidWdMb2coJ3RoaXMubWludENyZWF0ZSByZXMuYm9keTogJyArIHJlcy5ib2R5KTsKCiAgICAgIHZhciBkYXRhID0KICAgICAgICAgIHsKICAgICAgICAgICAgImFwcERhdGEiOiB7CiAgICAgICAgICAgICAgInN0ZXBOYW1lIjogbGFzdFNwb3QsCiAgICAgICAgICAgICAgc3RlcFRpdGxlLAogICAgICAgICAgICAgICJzcG90IjogbmV4dFNwb3QsCiAgICAgICAgICAgICAgIndvcmtmbG93RGF0YSI6IGZvcm0uaGFydmVzdERhdGEKICAgICAgICAgICAgfQogICAgICAgICAgfTsKCiAgICAgIHRoaXMuZGVidWdMb2coJ2Jsb2JEYXRhJyk7CiAgICAgIHRoaXMuZGVidWdMb2coZGF0YSk7CgogICAgICB2YXIgcmVzID0gYXdhaXQgdGhpcy5ibG9iQ3JlYXRlKGFkZHJlc3MsZGF0YSxwdWJsaWNLZXkscHJpdmF0ZUtleSk7CgogICAgICB2YXIgcnZhbCA9IHsKICAgICAgICAgIGFjdGlvbjogW10KICAgICAgfTsKICAgICAgdGhpcy5ob29rcy5maW5pc2gucmVzb2x2ZShydmFsKTsKICB9Cgp9Owo='
            ]
          }
        },
        address: '6295394298d7f3b202541995d7612e8992a9d9ac',
        createdAt: '1519676287788',
        date: '1519676287788',
        operation: 'mint',
        destCounter: 'XF7NE9ONJvEwQKpF+BIZjIocUWktJeBCkVUSlr/4l3Y='
      },
      {
        id:
          '<d2baf4bbbaf3b41133fc458c5f9b8c9efc1576de2d44e7d5f952feb6c6b2f564>',
        popcode: '<6295394298d7f3b202541995d7612e8992a9d9ac>',
        spot: 'grainElevator',
        txId:
          'd2baf4bbbaf3b41133fc458c5f9b8c9efc1576de2d44e7d5f952feb6c6b2f564',
        data: {
          metadata: {
            appData: {
              stepName: 'harvestCorn',
              stepTitle: 'Corn Shipped',
              spot: 'grainElevator',
              workflowData: {
                loadingStatus: true,
                seedLine: 'Heritage seed company v. Ohio 22'
              }
            }
          }
        },
        type: 'transaction',
        sourceCounter: 'b8OKg/XnOo9oq9Lh1PXmugASxIoZRhU2mFdQca8deV0=',
        address: '6295394298d7f3b202541995d7612e8992a9d9ac',
        createdAt: '1519676290266',
        date: '1519676290266',
        operation: 'blobCreate',
        destCounter: 'Snyii7G2l1Mugn8A/JKtKASF3beH44d0tU7JIE0oYGY='
      },
      {
        id:
          '<3d9f239ed672a56fc0d9e0ba1b88b756388466cc479f7da649d39ba0e5cbb4a5>',
        popcode: '<6295394298d7f3b202541995d7612e8992a9d9ac>',
        spot: 'merchandiser',
        txId:
          '3d9f239ed672a56fc0d9e0ba1b88b756388466cc479f7da649d39ba0e5cbb4a5',
        data: {
          metadata: {
            appData: {
              stepName: 'grainElevator',
              stepTitle: 'Grain Elevator receives',
              spot: 'merchandiser',
              workflowData: {
                elevatorData: {
                  received: true,
                  notes: 'Elevator received corn feed'
                }
              }
            }
          }
        },
        type: 'transaction',
        sourceCounter: 'G0R31nFo6QuvHFGhqRtFehremoUAMYu0oCxeUS0LlT4=',
        address: '6295394298d7f3b202541995d7612e8992a9d9ac',
        createdAt: '1519676350074',
        date: '1519676350074',
        operation: 'blobCreate',
        destCounter: 'DrJSjT5OJFXqN7iAq8/mtG/4xQ2uHsDFRiM0Btur7KQ='
      },
      {
        id:
          '<76d8043420e4b755bba3343408eb515b69f6e2cbd12126cf73c55ca0432de0c7>',
        popcode: '<6295394298d7f3b202541995d7612e8992a9d9ac>',
        spot: 'dairyFarmer',
        txId:
          '76d8043420e4b755bba3343408eb515b69f6e2cbd12126cf73c55ca0432de0c7',
        data: {
          metadata: {
            appData: {
              stepName: 'merchandiser',
              stepTitle: 'Merchandiser receives',
              spot: 'dairyFarmer',
              workflowData: {
                merchandiserData: {
                  received: true,
                  notes: 'Packaged v. Ohio 22 for Diary #13'
                }
              }
            }
          }
        },
        type: 'transaction',
        sourceCounter: '45vhFNC29DsJ8LMUZuXDwMQ1akm+EKIxvBqQOTpQJk8=',
        address: '6295394298d7f3b202541995d7612e8992a9d9ac',
        createdAt: '1519676396861',
        date: '1519676396861',
        operation: 'blobCreate',
        destCounter: '32z0Urt35tQxgs4u0CZEtkZoLfXtsEs0fpW2fBvyguQ='
      },
      {
        id:
          '<f3cf99545a0a90c212bf9f4f43baa37968d06093ac5f6d18a752aab5fd0df608>',
        popcode: '<6295394298d7f3b202541995d7612e8992a9d9ac>',
        spot: 'milkProducder',
        txId:
          'f3cf99545a0a90c212bf9f4f43baa37968d06093ac5f6d18a752aab5fd0df608',
        data: {
          metadata: {
            appData: {
              stepName: 'dairyFarmer',
              stepTitle: 'Dairy Farmer receives',
              spot: 'milkProducder',
              workflowData: {
                dairyData: {
                  received: true,
                  notes: 'Received v. Ohio 22 for feedlot 24'
                }
              }
            }
          }
        },
        type: 'transaction',
        sourceCounter: 'x7umi/a/HIRJbSByp7ZiO6QuhwpyJpZVF+EGfAM/yg0=',
        address: '6295394298d7f3b202541995d7612e8992a9d9ac',
        createdAt: '1519676437201',
        date: '1519676437201',
        operation: 'blobCreate',
        destCounter: 'sSeXjV+kKyWWFd69OYR9hHGYih/QDlvhT3Qf1AmOYPI='
      },
      {
        id:
          '<46e97ea2a9a6c1ec40a91e4c000adc202180eab21d79a0fc5068356860eadabe>',
        popcode: '<6295394298d7f3b202541995d7612e8992a9d9ac>',
        spot: 'iceCreamFactory',
        txId:
          '46e97ea2a9a6c1ec40a91e4c000adc202180eab21d79a0fc5068356860eadabe',
        data: {
          metadata: {
            appData: {
              stepName: 'milkProducder',
              stepTitle: 'Milk Producder receives',
              spot: 'iceCreamFactory',
              workflowData: {
                producerData: {
                  received: true,
                  notes: 'Received from Dairy 22 lot 13'
                }
              }
            }
          }
        },
        type: 'transaction',
        sourceCounter: 'UrJg+Lqx+jOdj0uaSGveY+E2Y1K+RIhZwzlU75qQSLg=',
        address: '6295394298d7f3b202541995d7612e8992a9d9ac',
        createdAt: '1519676485189',
        date: '1519676485189',
        operation: 'blobCreate',
        destCounter: 'Y28CWNu5rSDNZj90P3huyHBJCMxdLTUoC2ENWNdGPkY='
      },
      {
        id:
          '<252563a07c14e91e99d75ca3843658ac5d5fc50c525944d23b7082ea25ce67b2>',
        popcode: '<6295394298d7f3b202541995d7612e8992a9d9ac>',
        spot: 'complete',
        txId:
          '252563a07c14e91e99d75ca3843658ac5d5fc50c525944d23b7082ea25ce67b2',
        data: {
          metadata: {
            appData: {
              stepName: 'iceCreamFactory',
              stepTitle: 'IceCream Factory receives',
              spot: 'complete',
              workflowData: {
                factoryData: {
                  received: true,
                  notes: 'Received from producer 32'
                }
              }
            }
          }
        },
        type: 'transaction',
        sourceCounter: '4EdXobWdiKJICZd0q93GdAbjuS0YWpe8tHl2dsiq5q8=',
        address: '6295394298d7f3b202541995d7612e8992a9d9ac',
        createdAt: '1519676548120',
        date: '1519676548120',
        operation: 'blobCreate',
        destCounter: 'AHTeVs/7ZXfoC8BWJ27BOZq473yTYNMlzmHrAUHdO80='
      }
    ],
    workflowName: 'unileverV1',
    workflowData: {
      harvestData: {
        loadingStatus: true,
        seedLine: 'Heritage seed company v. Ohio 22'
      },
      loadingStatus: true,
      seedLine: 'Heritage seed company v. Ohio 22',
      elevatorData: {
        received: true,
        notes: 'Elevator received corn feed'
      },
      merchandiserData: {
        received: true,
        notes: 'Packaged v. Ohio 22 for Diary #13'
      },
      dairyData: {
        received: true,
        notes: 'Received v. Ohio 22 for feedlot 24'
      },
      producerData: {
        received: true,
        notes: 'Received from Dairy 22 lot 13'
      },
      factoryData: {
        received: true,
        notes: 'Received from producer 32'
      }
    },
    timestamp: 1519676548120,
    stepName: 'iceCreamFactory',
    stepTitle: 'IceCream Factory receives'
  }
];
