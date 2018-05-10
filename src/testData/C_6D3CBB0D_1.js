export default {
  id: '<1a5863ca30df1dbca096a276b806ed56c45c286e>',
  workflowInstanceId: '44196A5A-738A-4CB1-9961-9FEF33067834',
  appData: {
    spot: 'complete.child',
    workflowName: 'nttV2',
    workflowInstanceId: '44196A5A-738A-4CB1-9961-9FEF33067834',
    workflowRootPopcode: 'false',
    popcodeName: 'C_6D3CBB0D_1',
    workflowDef: {
      nttV2: {
        title: 'NTT V2',
        name: 'nttV2',
        startScreen: 'Home',
        version: '2.0',
        steps: {
          vanning: {
            step: 'vanning',
            title: 'Vanning Parent',
            screen: 'Vanning Children'
          },
          'vanning.child': {
            step: 'vanning.child',
            title: 'Vanning Child',
            screen: 'Vanning',
            complete: [
              {
                operation: 'contract',
                contract: 'vanningChildComplete',
                parameters: {
                  popcode: '@popcode'
                },
                outputs: {
                  actions: '@actions'
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
          shipping: {
            step: 'shipping',
            title: 'Shipping',
            screen: 'Shipping',
            complete: [
              {
                operation: 'navigate',
                screen: 'Home',
                resetStack: true,
                forceUpdate: true
              }
            ]
          },
          'shipping.child': {
            step: 'shipping.child',
            title: 'Show Popcode',
            screen: 'ShowPopcode'
          },
          terminalIn: {
            step: 'terminalIn',
            title: 'Terminal-In',
            screen: 'TerminalIn',
            complete: [
              {
                operation: 'navigate',
                screen: 'Home',
                resetStack: true,
                forceUpdate: true
              }
            ]
          },
          'terminalIn.child': {
            step: 'terminalIn.child',
            title: 'Show Popcode',
            screen: 'ShowPopcode'
          },
          arrival: {
            step: 'arrival',
            title: 'Arrival Parent',
            screen: 'Arrived Children'
          },
          'arrival.child': {
            step: 'arrival.child',
            title: 'Arrival Child',
            screen: 'Arrival',
            complete: [
              {
                operation: 'contract',
                contract: 'arrivalChildComplete',
                parameters: {
                  popcode: '@popcode'
                },
                outputs: {
                  actions: '@actions'
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
          delivered: {
            step: 'delivered',
            title: 'Delivered Parent',
            screen: 'Delivered',
            complete: [
              {
                operation: 'navigate',
                screen: 'Home',
                resetStack: true,
                forceUpdate: true
              }
            ]
          },
          'delivered.child': {
            step: 'delivered.child',
            title: 'Delivered Child',
            screen: 'ShowPopcode'
          },
          complete: {
            step: 'process.complete',
            title: 'Process Complete',
            screen: 'Completed'
          },
          'complete.child': {
            step: 'process.complete',
            title: 'Process Complete',
            screen: 'ShowPopcode'
          }
        },
        appOptions: {
          requireLogin: true
        },
        screens: {
          Home: {
            name: 'Home',
            title: 'Home',
            api: '/api/mobile',
            screenListItems: {
              fetchItems: '/allRootPopcodes',
              method: 'get',
              api: 'cayley',
              fetchParameters: {
                workflowName: 'nttV2'
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
                operation: 'fetch',
                route: '/containerPopcode',
                api: 'cayley',
                method: 'get',
                parameters: {
                  address: '@address'
                },
                outputs: {
                  container: '@popcodes[0]'
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
          'Vanning Children': {
            name: 'Vanning',
            title: 'Vanning',
            api: '/api/mobile',
            parameters: {
              popcode: '@popcode',
              user: '@user'
            },
            screenListItems: {
              fetchItems: '/p/bom',
              method: 'get',
              parameters: {
                address: '@popcode.address'
              },
              itemDataTypes: {
                popcode: 'object'
              },
              itemLabel: ['popcodeName'],
              itemActions: {
                click: {
                  title: 'Click',
                  parameters: {
                    container: '@popcode',
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
              }
            }
          },
          'Arrived Children': {
            name: 'Arrived',
            title: 'Arrived',
            api: '/api/mobile',
            parameters: {
              popcode: '@popcode',
              user: '@user'
            },
            screenListItems: {
              fetchItems: '/p/bom',
              method: 'get',
              parameters: {
                address: '@popcode.address'
              },
              itemDataTypes: {
                popcode: 'object'
              },
              itemLabel: ['popcodeName'],
              itemActions: {
                click: {
                  title: 'Click',
                  parameters: {
                    container: '@popcode',
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
              }
            }
          },
          Vanning: {
            name: 'Vanning',
            title: 'Vanning',
            api: '/api/mobile',
            parameters: {
              container: '@container',
              popcode: '@popcode',
              user: '@user'
            },
            outputs: {
              popcode: '@container'
            },
            screenForm: {
              options: {
                auto: 'labels'
              },
              fields: {
                type: 'object',
                description: 'Vanning',
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
                  workflowData: {
                    type: 'object',
                    properties: {
                      loadingStatus: {
                        type: 'boolean',
                        options: {
                          editable: true
                        }
                      },
                      vanningNotes: {
                        type: 'string',
                        options: {
                          editable: true
                        }
                      }
                    },
                    required: ['loadingStatus']
                  }
                },
                required: ['popcode', 'workflowData']
              }
            },
            screenButtons: {
              ok: {
                title: 'Ok',
                action: [
                  {
                    operation: 'contract',
                    contract: 'vanningChildOk',
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
          Shipping: {
            name: 'Shipping',
            title: 'Shipping',
            api: '/api/mobile',
            parameters: {
              container: '@container',
              popcode: '@popcode',
              user: '@user'
            },
            outputs: {
              popcode: '@container'
            },
            screenForm: {
              options: {
                auto: 'labels'
              },
              fields: {
                type: 'object',
                description: 'Shipping',
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
                  workflowData: {
                    type: 'object',
                    properties: {
                      shippingComplete: {
                        type: 'boolean',
                        options: {
                          editable: true
                        }
                      },
                      trackingNumber: {
                        type: 'string',
                        options: {
                          editable: true
                        }
                      },
                      shippingNotes: {
                        type: 'string',
                        options: {
                          editable: true
                        }
                      }
                    },
                    required: ['shippingComplete']
                  }
                },
                required: ['popcode', 'workflowData']
              }
            },
            screenButtons: {
              ok: {
                title: 'Ok',
                action: [
                  {
                    operation: 'contract',
                    contract: 'shippingOk',
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
          TerminalIn: {
            name: 'TerminalIn',
            title: 'TerminalIn',
            api: '/api/mobile',
            parameters: {
              container: '@container',
              popcode: '@popcode',
              user: '@user'
            },
            outputs: {
              popcode: '@container'
            },
            screenForm: {
              options: {
                auto: 'labels'
              },
              fields: {
                type: 'object',
                description: 'Terminal In',
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
                  workflowData: {
                    type: 'object',
                    properties: {
                      terminalInComplete: {
                        type: 'boolean',
                        options: {
                          editable: true
                        }
                      },
                      terminalInNotes: {
                        type: 'string',
                        options: {
                          editable: true
                        }
                      }
                    },
                    required: ['terminalInComplete']
                  }
                },
                required: ['popcode', 'workflowData']
              }
            },
            screenButtons: {
              ok: {
                title: 'Ok',
                action: [
                  {
                    operation: 'contract',
                    contract: 'terminalInOk',
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
          Arrival: {
            name: 'Arrival',
            title: 'Arrival',
            api: '/api/mobile',
            parameters: {
              container: '@container',
              popcode: '@popcode',
              user: '@user'
            },
            outputs: {
              popcode: '@container'
            },
            screenForm: {
              options: {
                auto: 'labels'
              },
              fields: {
                type: 'object',
                description: 'Arrival',
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
                  workflowData: {
                    type: 'object',
                    properties: {
                      arrivalComplete: {
                        type: 'boolean',
                        options: {
                          editable: true
                        }
                      },
                      arrivalNotes: {
                        type: 'string',
                        options: {
                          editable: true
                        }
                      }
                    },
                    required: ['arrivalComplete']
                  }
                },
                required: ['popcode', 'workflowData']
              }
            },
            screenButtons: {
              ok: {
                title: 'Ok',
                action: [
                  {
                    operation: 'contract',
                    contract: 'arrivalChildOk',
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
          Delivered: {
            name: 'Delivered',
            title: 'Delivered',
            api: '/api/mobile',
            parameters: {
              container: '@container',
              popcode: '@popcode',
              user: '@user'
            },
            outputs: {
              popcode: '@container'
            },
            screenForm: {
              options: {
                auto: 'labels'
              },
              fields: {
                type: 'object',
                description: 'Delivered',
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
                  workflowData: {
                    type: 'object',
                    properties: {
                      deliveredComplete: {
                        type: 'boolean',
                        options: {
                          editable: true
                        }
                      },
                      deliveredNotes: {
                        type: 'string',
                        options: {
                          editable: true
                        }
                      }
                    },
                    required: ['deliveredComplete']
                  }
                },
                required: ['popcode', 'workflowData']
              }
            },
            screenButtons: {
              ok: {
                title: 'Ok',
                action: [
                  {
                    operation: 'contract',
                    contract: 'deliveredOk',
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
          },
          ShowPopcode: {
            name: 'ShowPopcode',
            title: 'Popcode',
            api: '/api/mobile',
            parameters: {
              popcode: '@popcode'
            },
            screenForm: {
              fields: {
                type: 'object',
                properties: {
                  'Popcode Name': {
                    type: 'string',
                    value: '@popcode.popcodeName'
                  },
                  'Popcode Address': {
                    type: 'string',
                    value: '@popcode.address'
                  },
                  currentState: {
                    type: 'string',
                    value: '@popcode.spot',
                    options: {
                      editable: false
                    }
                  }
                },
                required: ['Popcode Name', 'Popcode Address', 'currentState']
              }
            },
            screenButtons: {
              ok: {
                title: 'Ok',
                action: []
              }
            }
          },
          Error: {
            name: 'Error',
            api: '/api/mobile',
            screenButtons: {
              ok: {
                action: '^Home',
                title: 'Ok'
              }
            },
            screenForm: {
              fields: {
                type: 'object',
                properties: {
                  status: {
                    type: 'string',
                    value: '@status'
                  },
                  error: {
                    type: 'string',
                    value: '@error'
                  }
                },
                required: ['status', 'error']
              }
            },
            parameters: {
              error: '@error',
              status: '@status'
            },
            title: 'Error'
          }
        },
        contractLib: {
          name: 'NTT SmartContract Library',
          version: '2.1',
          slug: 'nttd_2_1',
          libs: [
            'base64_Y2xhc3MgU21hcnRDb250cmFjdEJhc2UgewogIGNvbnN0cnVjdG9yKGhvb2tzKSB7CiAgICAgIHRoaXMuaG9va3MgPSBob29rczsKICAgICAgdGhpcy5zdGF0ZSA9IGhvb2tzLnN0YXRlOwogICAgICB0aGlzLmRlYnVnTG9nID0gaG9va3MuZGVidWdMb2c7CiAgICAgIHRoaXMuZGVidWdMb2coJ2NvbnN0cnVjdCBTbWFydENvbnRyYWN0QmFzZScpOwogIH0KICBhc3luYyBiYWxhbmNlKGFkZHJlc3MpIHsKICAgIHZhciBhcGkgPSB0aGlzLmhvb2tzLnN0YWNrLmFwaTsKICAgIHZhciB1cmwgPSAnL3AvYmFsYW5jZS8nICsgYWRkcmVzczsKICAgIGNvbnN0IHJlcyA9IGF3YWl0IGFwaS5nZXQodXJsKTsKICAgIHJldHVybiByZXMuYm9keTsKICB9CiAgYXN5bmMgZ2VuUG9wY29kZShhZGRyZXNzKSB7CiAgICB2YXIgYXBpID0gdGhpcy5ob29rcy5zdGFjay5hcGk7CiAgICB2YXIgdXJsID0gJy9wL2dlbmVyYXRlJzsKICAgIGNvbnN0IHJlcyA9IGF3YWl0IGFwaS5nZXQodXJsKTsKICAgIHJldHVybiByZXMuYm9keTsKICB9CiAgYXN5bmMgY29udGFpbmVyUG9wY29kZShhZGRyZXNzKSB7CiAgICB2YXIgYXBpID0gdGhpcy5ob29rcy5zdGFjay5hcGlDYXlsZXk7CiAgICB2YXIgdXJsID0gJy9jb250YWluZXJQb3Bjb2RlLycgKyBhZGRyZXNzOwogICAgY29uc3QgcmVzID0gYXdhaXQgYXBpLmdldCh1cmwpOwogICAgcmV0dXJuIHJlcy5ib2R5OwogIH0KICBhc3luYyBib21Qb3Bjb2RlcyhhZGRyZXNzKSB7CiAgICB2YXIgYXBpID0gdGhpcy5ob29rcy5zdGFjay5hcGlDYXlsZXk7CiAgICB2YXIgdXJsID0gJy9ib21Qb3Bjb2Rlcy8nICsgYWRkcmVzczsKICAgIGNvbnN0IHJlcyA9IGF3YWl0IGFwaS5nZXQodXJsKTsKICAgIHJldHVybiByZXMuYm9keTsKICB9CiAgYXN5bmMgc2lnbk1lc3NhZ2UoZmllbGRzLHByaXZhdGVLZXkpIHsKICAgIHZhciBhcGkgPSB0aGlzLmhvb2tzLnN0YWNrLmFwaTsKICAgIHZhciBib2R5ID0gewogICAgICBmaWVsZHMsCiAgICAgIHByaXZhdGVLZXkKICAgIH07CiAgICB2YXIgdXJsID0gJy9jcnlwdG8vc2lnbk1lc3NhZ2UnOwogICAgY29uc3QgcmVzID0gYXdhaXQgYXBpLnBvc3QodXJsLCB7Ym9keX0pOwogICAgcmV0dXJuIHJlcy5ib2R5OwogIH0KICBhc3luYyBibG9iQ3JlYXRlV2l0aFNpZyhzaWcsYWRkcmVzcyxkYXRhLHB1YmxpY0tleSkgewogICAgdmFyIGFwaSA9IHRoaXMuaG9va3Muc3RhY2suYXBpOwogICAgdmFyIGJvZHkgPSB7CiAgICAgIHNpZywKICAgICAgYWRkcmVzcywKICAgICAgcHVibGljS2V5LAogICAgICBkYXRhCiAgICB9OwogICAgdmFyIHVybCA9ICcvcC9ibG9iQ3JlYXRlV2l0aFNpZyc7CiAgICBjb25zdCByZXMgPSBhd2FpdCBhcGkucG9zdCh1cmwsIHtib2R5fSk7CiAgICByZXR1cm4gcmVzLmJvZHk7CiAgfQogIGFzeW5jIGJsb2JDcmVhdGUoYWRkcmVzcyxkYXRhLHB1YmxpY0tleSxwcml2YXRlS2V5KSB7CiAgICB2YXIgZmllbGRzID0gW107CgogICAgdmFyIHJlcyA9IGF3YWl0IHRoaXMuYmFsYW5jZShhZGRyZXNzKTsKICAgIGZpZWxkcy5wdXNoKHJlcy5iYWxhbmNlLkNvdW50ZXIpOwogICAgZmllbGRzLnB1c2goYWRkcmVzcyk7CiAgICBmaWVsZHMucHVzaChkYXRhKTsKCiAgICByZXMgPSBhd2FpdCB0aGlzLnNpZ25NZXNzYWdlKGZpZWxkcyxwcml2YXRlS2V5KTsKCiAgICByZXMgPSBhd2FpdCB0aGlzLmJsb2JDcmVhdGVXaXRoU2lnKHJlcy5zaWcsYWRkcmVzcyxkYXRhLHB1YmxpY0tleSk7CgogICAgcmV0dXJuIHJlcy5ib2R5OwogIH0KICBhc3luYyBtaW50Q3JlYXRlV2l0aFNpZyhzaWcsYWRkcmVzcyxkYXRhLHB1YmxpY0tleSxhbW91bnQsdW5pdCkgewogICAgdmFyIGFwaSA9IHRoaXMuaG9va3Muc3RhY2suYXBpOwogICAgdmFyIGJvZHkgPSB7CiAgICAgIHNpZywKICAgICAgYWRkcmVzcywKICAgICAgcHVibGljS2V5LAogICAgICBhbW91bnQsCiAgICAgIHVuaXQsCiAgICAgIGRhdGEKICAgIH07CiAgICB2YXIgdXJsID0gJy9wL21pbnQnOwogICAgY29uc3QgcmVzID0gYXdhaXQgYXBpLnBvc3QodXJsLCB7Ym9keX0pOwogICAgcmV0dXJuIHJlczsKICB9CiAgYXN5bmMgbWludENyZWF0ZShhZGRyZXNzLGRhdGEscHVibGljS2V5LHByaXZhdGVLZXkpIHsKICAgIHZhciBmaWVsZHMgPSBbXTsKICAgIHZhciBhbW91bnQgPSAxOwogICAgdmFyIHVuaXQgPSAnY29udGFpbmVyJzsKCiAgICB2YXIgeyBiYWxhbmNlIH0gPSBhd2FpdCB0aGlzLmJhbGFuY2UoYWRkcmVzcyk7CiAgICAvLyB0aGlzLmRlYnVnTG9nKCcjIyMjIyMjIyMjIyMjIyMjIGJhbGFuY2UuQ291bnRlcjogJyArIGJhbGFuY2UuQ291bnRlcik7CiAgICBmaWVsZHMucHVzaChiYWxhbmNlLkNvdW50ZXIpOwogICAgZmllbGRzLnB1c2goYWRkcmVzcyk7CiAgICBmaWVsZHMucHVzaChhbW91bnQpOwogICAgZmllbGRzLnB1c2godW5pdCk7CiAgICBmaWVsZHMucHVzaChkYXRhKTsKCiAgICB2YXIgeyBzaWcgfSA9IGF3YWl0IHRoaXMuc2lnbk1lc3NhZ2UoZmllbGRzLHByaXZhdGVLZXkpOwoKICAgIHZhciByZXMgPSBhd2FpdCB0aGlzLm1pbnRDcmVhdGVXaXRoU2lnKHNpZyxhZGRyZXNzLGRhdGEscHVibGljS2V5LGFtb3VudCx1bml0KTsKCiAgICByZXR1cm4gcmVzOwogIH0KfTsK',
            'base64_dmFyIGNyZWF0ZUJsb2JBY3Rpb25zID0gewogICAgICAgICAgImFjdGlvbiI6IFsKICAgICAgICAgICAgewogICAgICAgICAgICAgICJvcGVyYXRpb24iOiAiZmV0Y2giLAogICAgICAgICAgICAgICJyb3V0ZSI6ICIvcC9iYWxhbmNlIiwKICAgICAgICAgICAgICAibWV0aG9kIjogImdldCIsCiAgICAgICAgICAgICAgInBhcmFtZXRlcnMiOiB7CiAgICAgICAgICAgICAgICAiYWRkcmVzcyI6ICJAcG9wY29kZS5hZGRyZXNzIgogICAgICAgICAgICAgIH0sCiAgICAgICAgICAgICAgIm91dHB1dHMiOiB7CiAgICAgICAgICAgICAgICAiYmFsYW5jZSI6ICJAYmFsYW5jZSIKICAgICAgICAgICAgICB9CiAgICAgICAgICAgIH0sCiAgICAgICAgICAgIHsKICAgICAgICAgICAgICAib3BlcmF0aW9uIjogImZldGNoIiwKICAgICAgICAgICAgICAicm91dGUiOiAiL2NyeXB0by9zaWduTWVzc2FnZSIsCiAgICAgICAgICAgICAgIm1ldGhvZCI6ICJwb3N0IiwKICAgICAgICAgICAgICAicGFyYW1ldGVycyI6IHsKICAgICAgICAgICAgICAgICJmaWVsZHMiOiBbCiAgICAgICAgICAgICAgICAgICJAYmFsYW5jZS5Db3VudGVyIiwKICAgICAgICAgICAgICAgICAgIkBwb3Bjb2RlLmFkZHJlc3MiCiAgICAgICAgICAgICAgICAgXSwKICAgICAgICAgICAgICAgICAicHJpdmF0ZUtleSI6ICJAdXNlci5wcml2YXRlS2V5IgogICAgICAgICAgICAgIH0sCiAgICAgICAgICAgICAgIm91dHB1dHMiOiB7CiAgICAgICAgICAgICAgICAic2lnIjogIkBzaWciCiAgICAgICAgICAgICAgfQogICAgICAgICAgICB9LAogICAgICAgICAgICB7CiAgICAgICAgICAgICAgIm9wZXJhdGlvbiI6ICJmZXRjaCIsCiAgICAgICAgICAgICAgInJvdXRlIjogIi9wL2Jsb2JDcmVhdGVXaXRoU2lnIiwKICAgICAgICAgICAgICAibWV0aG9kIjogImJsb2JDcmVhdGVXaXRoU2lnIiwKICAgICAgICAgICAgICAicGFyYW1ldGVycyI6IHsKICAgICAgICAgICAgICAgICJzaWciOiAiQHNpZyIsCiAgICAgICAgICAgICAgICAiYWRkcmVzcyI6ICJAcG9wY29kZS5hZGRyZXNzIiwKICAgICAgICAgICAgICAgICJwdWJsaWNLZXkiOiAiQHVzZXIucHVibGljS2V5IiwKICAgICAgICAgICAgICAgICJkYXRhIjogewogICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgIH0sCiAgICAgICAgICAgICAgIm91dHB1dHMiOiB7CiAgICAgICAgICAgICAgICAic3RhdHVzIjogIkBzdGF0dXMiLAogICAgICAgICAgICAgICAgInR4SWQiOiAiQHR4SWQiCiAgICAgICAgICAgICAgfQogICAgICAgICAgICB9CiAgICAgICAgICBdCn07CmNsYXNzIFNtYXJ0Q29udHJhY3QgZXh0ZW5kcyBTbWFydENvbnRyYWN0QmFzZSB7CiAgY29uc3RydWN0b3IoaG9va3MpIHsKICAgICAgc3VwZXIoaG9va3MpCiAgICAgIHRoaXMuZGVidWdMb2coJyoqKioqKioqKioqKioqIFNtYXJ0Q29udHJhY3QnKTsKICB9CgogIGFzeW5jIGVjaG8oKSB7CiAgICAgIHRoaXMuZGVidWdMb2coJ2VjaG8nKTsKICAgICAgdmFyIHJ2YWwgPSB7CiAgICAgICAgICBkYXRhOiAnaGVsbG8nCiAgICAgIH07CiAgICAgIHRoaXMuaG9va3MuZmluaXNoLnJlc29sdmUocnZhbCk7CiAgfQoKICBhc3luYyB2YW5uaW5nQ2hpbGRPaygpIHsgcmV0dXJuIGF3YWl0IHRoaXMuY2hpbGRPaygndmFubmluZ0NoaWxkJywgJ3NoaXBwaW5nLmNoaWxkJywgJ1Zhbm5pbmcnKTsgfQogIGFzeW5jIGFycml2YWxDaGlsZE9rKCkgeyByZXR1cm4gYXdhaXQgdGhpcy5jaGlsZE9rKCdhcnJpdmFsQ2hpbGQnLCAnZGVsaXZlcmVkLmNoaWxkJywgJ0Fycml2YWwnKTsgfQoKICBhc3luYyBjaGlsZE9rKGxhc3RTcG90LCBuZXh0U3BvdCwgc3RlcFRpdGxlKSB7CiAgICAgIHRoaXMuZGVidWdMb2coJ2V4ZWN1dGUgY2hpbGRPaycpOwoKICAgICAgdmFyIHBvcGNvZGUgPSB0aGlzLnN0YXRlLnBvcGNvZGU7CiAgICAgIHZhciBhZGRyZXNzID0gcG9wY29kZS5hZGRyZXNzOwogICAgICB2YXIgYXBwID0gdGhpcy5ob29rcy5hcHA7CiAgICAgIHZhciB1c2VyQ3JlZGVudGlhbHMgPSBhcHAuZ2V0QXBwU3RhdGUoJ3VzZXJDcmVkZW50aWFscycpOwogICAgICB2YXIgcHVibGljS2V5ID0gdXNlckNyZWRlbnRpYWxzLnB1YmxpY0tleTsKICAgICAgdmFyIHByaXZhdGVLZXkgPSB1c2VyQ3JlZGVudGlhbHMucHJpdmF0ZUtleTsKCiAgICAgIHZhciBkYXRhID0KICAgICAgICAgIHsKICAgICAgICAgICAgImFwcERhdGEiOiB7CiAgICAgICAgICAgICAgInN0ZXBOYW1lIjogbGFzdFNwb3QsCiAgICAgICAgICAgICAgc3RlcFRpdGxlLAogICAgICAgICAgICAgICJ3b3JrZmxvd0RhdGEiOiB0aGlzLnN0YXRlLmZvcm0ud29ya2Zsb3dEYXRhLAogICAgICAgICAgICAgICJzcG90IjogbmV4dFNwb3QKICAgICAgICAgICAgfQogICAgICAgICAgfTsKCiAgICAgIHRoaXMuZGVidWdMb2coJ2Jsb2JEYXRhJyk7CiAgICAgIHRoaXMuZGVidWdMb2coZGF0YSk7CgogICAgICB2YXIgcmVzID0gYXdhaXQgdGhpcy5ibG9iQ3JlYXRlKGFkZHJlc3MsZGF0YSxwdWJsaWNLZXkscHJpdmF0ZUtleSk7CgogICAgICB2YXIgcnZhbCA9IHsKICAgICAgICAgIGFjdGlvbjogW10KICAgICAgfTsKICAgICAgdGhpcy5ob29rcy5maW5pc2gucmVzb2x2ZShydmFsKTsKICB9CgogIGFzeW5jIHZhbm5pbmdDaGlsZENvbXBsZXRlKCkgeyByZXR1cm4gYXdhaXQgdGhpcy5jaGlsZENvbXBsZXRlKCdzaGlwcGluZy5jaGlsZCcsICdzaGlwcGluZycsICd2YW5uaW5nQ2hpbGRDb21wbGV0ZScsICdWYW5uaW5nIENvbXBsZXRlJyk7IH0KICBhc3luYyBhcnJpdmFsQ2hpbGRDb21wbGV0ZSgpIHsgcmV0dXJuIGF3YWl0IHRoaXMuY2hpbGRDb21wbGV0ZSgnZGVsaXZlcmVkLmNoaWxkJywgJ2RlbGl2ZXJlZCcsICdhcnJpdmFsQ2hpbGRDb21wbGV0ZScsICdBcnJpdmFsIENvbXBsZXRlJyk7IH0KCiAgYXN5bmMgY2hpbGRDb21wbGV0ZShsYXN0U3BvdCwgbmV4dFNwb3QsIHN0ZXBOYW1lLCBzdGVwVGl0bGUpIHsKICAgICAgdGhpcy5kZWJ1Z0xvZygnZXhlY3V0ZSBjaGlsZENvbXBsZXRlJyk7CiAgICAgIHZhciBfID0gdGhpcy5ob29rcy5fOwogICAgICB2YXIgc3MgPSB0aGlzLmhvb2tzLnNjcmVlblN0YXRlOwogICAgICB0aGlzLmRlYnVnTG9nKHRoaXMuc3RhdGUpOwogICAgICB2YXIgaXNDb21wbGV0ZSA9IGZhbHNlOwoKICAgICAgaWYoIV8uaXNOaWwodGhpcy5zdGF0ZS5wb3Bjb2RlKSkgewogICAgICAgIHZhciBwb3Bjb2RlID0gdGhpcy5zdGF0ZS5wb3Bjb2RlOwogICAgICAgIHRoaXMuZGVidWdMb2coJ25hbWU6ICcgKyBwb3Bjb2RlLnBvcGNvZGVOYW1lKTsKICAgICAgICB0aGlzLmRlYnVnTG9nKCdhZGRyZXNzOiAnICsgcG9wY29kZS5hZGRyZXNzKTsKCiAgICAgICAgdGhpcy5kZWJ1Z0xvZygnY2FsbCBib21Qb3Bjb2Rlcy4uLicpOwogICAgICAgIHZhciByZXMgPSBhd2FpdCB0aGlzLmJvbVBvcGNvZGVzKHBvcGNvZGUuYWRkcmVzcyk7CgogICAgICAgIHRoaXMuZGVidWdMb2coJ3Jlc3VsdDonKTsKICAgICAgICB0aGlzLmRlYnVnTG9nKHJlcyk7CgoKICAgICAgICBpZihfLmlzQXJyYXkocmVzLnBvcGNvZGVzKSkgewogICAgICAgICAgdmFyIG4gPSAwOwogICAgICAgICAgZm9yKGxldCBjaGlsZCBvZiByZXMucG9wY29kZXMpIHsKICAgICAgICAgICAgdmFyIHNwb3QgPSBzcy5nZXRXb3JrZmxvd1Nwb3QoY2hpbGQpOwogICAgICAgICAgICB0aGlzLmRlYnVnTG9nKHNwb3QpOwogICAgICAgICAgICBpZihzcG90ID09PSBsYXN0U3BvdCkgewogICAgICAgICAgICAgIG4rKzsKICAgICAgICAgICAgfQogICAgICAgICAgfQogICAgICAgICAgaWYobiA9PT0gcmVzLnBvcGNvZGVzLmxlbmd0aCkKICAgICAgICAgICAgaXNDb21wbGV0ZSA9IHRydWU7CiAgICAgICAgfQogICAgICB9CgogICAgICB0aGlzLmRlYnVnTG9nKCdpc0NvbXBsZXRlOiAnICsgaXNDb21wbGV0ZSk7CgogICAgICB2YXIgcnZhbCA9IHsKICAgICAgICBpc0NvbXBsZXRlCiAgICAgIH07CgogICAgICBpZihpc0NvbXBsZXRlKSB7CiAgICAgICAgdmFyIHBvcGNvZGUgPSB0aGlzLnN0YXRlLnBvcGNvZGU7CiAgICAgICAgdmFyIGFkZHJlc3MgPSBwb3Bjb2RlLmFkZHJlc3M7CiAgICAgICAgdmFyIGFwcCA9IHRoaXMuaG9va3MuYXBwOwogICAgICAgIHZhciB1c2VyQ3JlZGVudGlhbHMgPSBhcHAuZ2V0QXBwU3RhdGUoJ3VzZXJDcmVkZW50aWFscycpOwogICAgICAgIHZhciBwdWJsaWNLZXkgPSB1c2VyQ3JlZGVudGlhbHMucHVibGljS2V5OwogICAgICAgIHZhciBwcml2YXRlS2V5ID0gdXNlckNyZWRlbnRpYWxzLnByaXZhdGVLZXk7CiAgICAgICAgdmFyIGRhdGEgPQogICAgICAgICAgewogICAgICAgICAgICAiYXBwRGF0YSI6IHsKICAgICAgICAgICAgICBzdGVwTmFtZSwKICAgICAgICAgICAgICBzdGVwVGl0bGUsCiAgICAgICAgICAgICAgInNwb3QiOiBuZXh0U3BvdAogICAgICAgICAgICB9CiAgICAgICAgICB9OwogICAgICAgIHZhciByZXMgPSBhd2FpdCB0aGlzLmJsb2JDcmVhdGUoYWRkcmVzcyxkYXRhLHB1YmxpY0tleSxwcml2YXRlS2V5KTsKICAgICAgICBydmFsLnJlcyA9IHJlczsKICAgICAgfQoKCiAgICAgIHRoaXMuaG9va3MuZmluaXNoLnJlc29sdmUocnZhbCk7CiAgfQoKICBhc3luYyBzaGlwcGluZ09rKCkgeyByZXR1cm4gYXdhaXQgdGhpcy5wYXJlbnRPaygnc2hpcHBpbmcnLCAndGVybWluYWxJbicsICd0ZXJtaW5hbEluLmNoaWxkJywgJ1NoaXBwaW5nJyk7IH0KICBhc3luYyB0ZXJtaW5hbEluT2soKSB7IHJldHVybiBhd2FpdCB0aGlzLnBhcmVudE9rKCd0ZXJtaW5hbEluJywgJ2Fycml2YWwnLCAnYXJyaXZhbC5jaGlsZCcsICdUZXJtaW5hbC1JbicpOyB9CiAgYXN5bmMgZGVsaXZlcmVkT2soKSB7IHJldHVybiBhd2FpdCB0aGlzLnBhcmVudE9rKCdkZWxpdmVyZWQnLCAnY29tcGxldGUnLCAnY29tcGxldGUuY2hpbGQnLCAnRGVsaXZlcmVkJyk7IH0KCiAgYXN5bmMgcGFyZW50T2sobGFzdFNwb3QsIHBhcmVudFNwb3QsIGNoaWxkU3BvdCwgc3RlcFRpdGxlKSB7CiAgICAgIHRoaXMuZGVidWdMb2coJ2V4ZWN1dGUgcGFyZW50T2snKTsKICAgICAgdmFyIF8gPSB0aGlzLmhvb2tzLl87CgogICAgICB2YXIgcG9wY29kZSA9IHRoaXMuc3RhdGUucG9wY29kZTsKICAgICAgdmFyIGFkZHJlc3MgPSBwb3Bjb2RlLmFkZHJlc3M7CiAgICAgIHZhciBhcHAgPSB0aGlzLmhvb2tzLmFwcDsKICAgICAgdmFyIHVzZXJDcmVkZW50aWFscyA9IGFwcC5nZXRBcHBTdGF0ZSgndXNlckNyZWRlbnRpYWxzJyk7CiAgICAgIHZhciBwdWJsaWNLZXkgPSB1c2VyQ3JlZGVudGlhbHMucHVibGljS2V5OwogICAgICB2YXIgcHJpdmF0ZUtleSA9IHVzZXJDcmVkZW50aWFscy5wcml2YXRlS2V5OwoKICAgICAgdmFyIGRhdGEgPQogICAgICAgICAgewogICAgICAgICAgICAiYXBwRGF0YSI6IHsKICAgICAgICAgICAgICAic3RlcE5hbWUiOiBsYXN0U3BvdCwKICAgICAgICAgICAgICBzdGVwVGl0bGUsCiAgICAgICAgICAgICAgIndvcmtmbG93RGF0YSI6IHRoaXMuc3RhdGUuZm9ybS53b3JrZmxvd0RhdGEsCiAgICAgICAgICAgICAgInNwb3QiOiBwYXJlbnRTcG90CiAgICAgICAgICAgIH0KICAgICAgICAgIH07CgogICAgICB0aGlzLmRlYnVnTG9nKCdibG9iRGF0YScpOwogICAgICB0aGlzLmRlYnVnTG9nKGRhdGEpOwoKICAgICAgdmFyIHJlcyA9IGF3YWl0IHRoaXMuYmxvYkNyZWF0ZShhZGRyZXNzLGRhdGEscHVibGljS2V5LHByaXZhdGVLZXkpOwoKICAgICAgdGhpcy5kZWJ1Z0xvZygnY2FsbCBib21Qb3Bjb2Rlcy4uLicpOwogICAgICB2YXIgcmVzID0gYXdhaXQgdGhpcy5ib21Qb3Bjb2Rlcyhwb3Bjb2RlLmFkZHJlc3MpOwoKICAgICAgdGhpcy5kZWJ1Z0xvZygncmVzdWx0OicpOwogICAgICB0aGlzLmRlYnVnTG9nKHJlcyk7CgoKICAgICAgaWYoXy5pc0FycmF5KHJlcy5wb3Bjb2RlcykpIHsKICAgICAgICBmb3IobGV0IHBvcGNvZGUyIG9mIHJlcy5wb3Bjb2RlcykgewogICAgICAgICAgdmFyIGFkZHJlc3MgPSBwb3Bjb2RlMi5hZGRyZXNzOwogICAgICAgICAgdmFyIGRhdGEgPQogICAgICAgICAgICB7CiAgICAgICAgICAgICAgImFwcERhdGEiOiB7CiAgICAgICAgICAgICAgICAic3BvdCI6IGNoaWxkU3BvdAogICAgICAgICAgICAgIH0KICAgICAgICAgICAgfTsKICAgICAgICAgIGF3YWl0IHRoaXMuYmxvYkNyZWF0ZShhZGRyZXNzLGRhdGEscHVibGljS2V5LHByaXZhdGVLZXkpOwogICAgICAgIH0KICAgICAgfQoKICAgICAgdmFyIHJ2YWwgPSB7CiAgICAgICAgICBhY3Rpb246IFtdCiAgICAgIH07CiAgICAgIHRoaXMuaG9va3MuZmluaXNoLnJlc29sdmUocnZhbCk7CiAgfQoKfTsK'
          ]
        }
      }
    },
    timestamp: 1519676064145,
    stepName: 'arrivalChild',
    stepTitle: 'Arrival',
    workflowData: {
      loadingStatus: true,
      vanningNotes: 'Child 1 is vanned',
      arrivalComplete: true,
      arrivalNotes: 'Pallet 1 arrived'
    }
  },
  publicKey: 'AzFSqglD2Tz0BHF7fyc5OZ0NYkqslptvM8W2ghgAjmAN',
  spot: 'complete.child',
  unit: 'PS4',
  bomContainer: '<9a98591fbb7db838073157e2e42747e0f45db059>',
  type: 'popcode',
  popcodeName: 'C_6D3CBB0D_1',
  amount: '1',
  workflowDef: {
    nttV2: {
      title: 'NTT V2',
      name: 'nttV2',
      startScreen: 'Home',
      version: '2.0',
      steps: {
        vanning: {
          step: 'vanning',
          title: 'Vanning Parent',
          screen: 'Vanning Children'
        },
        'vanning.child': {
          step: 'vanning.child',
          title: 'Vanning Child',
          screen: 'Vanning',
          complete: [
            {
              operation: 'contract',
              contract: 'vanningChildComplete',
              parameters: {
                popcode: '@popcode'
              },
              outputs: {
                actions: '@actions'
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
        shipping: {
          step: 'shipping',
          title: 'Shipping',
          screen: 'Shipping',
          complete: [
            {
              operation: 'navigate',
              screen: 'Home',
              resetStack: true,
              forceUpdate: true
            }
          ]
        },
        'shipping.child': {
          step: 'shipping.child',
          title: 'Show Popcode',
          screen: 'ShowPopcode'
        },
        terminalIn: {
          step: 'terminalIn',
          title: 'Terminal-In',
          screen: 'TerminalIn',
          complete: [
            {
              operation: 'navigate',
              screen: 'Home',
              resetStack: true,
              forceUpdate: true
            }
          ]
        },
        'terminalIn.child': {
          step: 'terminalIn.child',
          title: 'Show Popcode',
          screen: 'ShowPopcode'
        },
        arrival: {
          step: 'arrival',
          title: 'Arrival Parent',
          screen: 'Arrived Children'
        },
        'arrival.child': {
          step: 'arrival.child',
          title: 'Arrival Child',
          screen: 'Arrival',
          complete: [
            {
              operation: 'contract',
              contract: 'arrivalChildComplete',
              parameters: {
                popcode: '@popcode'
              },
              outputs: {
                actions: '@actions'
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
        delivered: {
          step: 'delivered',
          title: 'Delivered Parent',
          screen: 'Delivered',
          complete: [
            {
              operation: 'navigate',
              screen: 'Home',
              resetStack: true,
              forceUpdate: true
            }
          ]
        },
        'delivered.child': {
          step: 'delivered.child',
          title: 'Delivered Child',
          screen: 'ShowPopcode'
        },
        complete: {
          step: 'process.complete',
          title: 'Process Complete',
          screen: 'Completed'
        },
        'complete.child': {
          step: 'process.complete',
          title: 'Process Complete',
          screen: 'ShowPopcode'
        }
      },
      appOptions: {
        requireLogin: true
      },
      screens: {
        Home: {
          name: 'Home',
          title: 'Home',
          api: '/api/mobile',
          screenListItems: {
            fetchItems: '/allRootPopcodes',
            method: 'get',
            api: 'cayley',
            fetchParameters: {
              workflowName: 'nttV2'
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
              operation: 'fetch',
              route: '/containerPopcode',
              api: 'cayley',
              method: 'get',
              parameters: {
                address: '@address'
              },
              outputs: {
                container: '@popcodes[0]'
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
        'Vanning Children': {
          name: 'Vanning',
          title: 'Vanning',
          api: '/api/mobile',
          parameters: {
            popcode: '@popcode',
            user: '@user'
          },
          screenListItems: {
            fetchItems: '/p/bom',
            method: 'get',
            parameters: {
              address: '@popcode.address'
            },
            itemDataTypes: {
              popcode: 'object'
            },
            itemLabel: ['popcodeName'],
            itemActions: {
              click: {
                title: 'Click',
                parameters: {
                  container: '@popcode',
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
            }
          }
        },
        'Arrived Children': {
          name: 'Arrived',
          title: 'Arrived',
          api: '/api/mobile',
          parameters: {
            popcode: '@popcode',
            user: '@user'
          },
          screenListItems: {
            fetchItems: '/p/bom',
            method: 'get',
            parameters: {
              address: '@popcode.address'
            },
            itemDataTypes: {
              popcode: 'object'
            },
            itemLabel: ['popcodeName'],
            itemActions: {
              click: {
                title: 'Click',
                parameters: {
                  container: '@popcode',
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
            }
          }
        },
        Vanning: {
          name: 'Vanning',
          title: 'Vanning',
          api: '/api/mobile',
          parameters: {
            container: '@container',
            popcode: '@popcode',
            user: '@user'
          },
          outputs: {
            popcode: '@container'
          },
          screenForm: {
            options: {
              auto: 'labels'
            },
            fields: {
              type: 'object',
              description: 'Vanning',
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
                workflowData: {
                  type: 'object',
                  properties: {
                    loadingStatus: {
                      type: 'boolean',
                      options: {
                        editable: true
                      }
                    },
                    vanningNotes: {
                      type: 'string',
                      options: {
                        editable: true
                      }
                    }
                  },
                  required: ['loadingStatus']
                }
              },
              required: ['popcode', 'workflowData']
            }
          },
          screenButtons: {
            ok: {
              title: 'Ok',
              action: [
                {
                  operation: 'contract',
                  contract: 'vanningChildOk',
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
        Shipping: {
          name: 'Shipping',
          title: 'Shipping',
          api: '/api/mobile',
          parameters: {
            container: '@container',
            popcode: '@popcode',
            user: '@user'
          },
          outputs: {
            popcode: '@container'
          },
          screenForm: {
            options: {
              auto: 'labels'
            },
            fields: {
              type: 'object',
              description: 'Shipping',
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
                workflowData: {
                  type: 'object',
                  properties: {
                    shippingComplete: {
                      type: 'boolean',
                      options: {
                        editable: true
                      }
                    },
                    trackingNumber: {
                      type: 'string',
                      options: {
                        editable: true
                      }
                    },
                    shippingNotes: {
                      type: 'string',
                      options: {
                        editable: true
                      }
                    }
                  },
                  required: ['shippingComplete']
                }
              },
              required: ['popcode', 'workflowData']
            }
          },
          screenButtons: {
            ok: {
              title: 'Ok',
              action: [
                {
                  operation: 'contract',
                  contract: 'shippingOk',
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
        TerminalIn: {
          name: 'TerminalIn',
          title: 'TerminalIn',
          api: '/api/mobile',
          parameters: {
            container: '@container',
            popcode: '@popcode',
            user: '@user'
          },
          outputs: {
            popcode: '@container'
          },
          screenForm: {
            options: {
              auto: 'labels'
            },
            fields: {
              type: 'object',
              description: 'Terminal In',
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
                workflowData: {
                  type: 'object',
                  properties: {
                    terminalInComplete: {
                      type: 'boolean',
                      options: {
                        editable: true
                      }
                    },
                    terminalInNotes: {
                      type: 'string',
                      options: {
                        editable: true
                      }
                    }
                  },
                  required: ['terminalInComplete']
                }
              },
              required: ['popcode', 'workflowData']
            }
          },
          screenButtons: {
            ok: {
              title: 'Ok',
              action: [
                {
                  operation: 'contract',
                  contract: 'terminalInOk',
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
        Arrival: {
          name: 'Arrival',
          title: 'Arrival',
          api: '/api/mobile',
          parameters: {
            container: '@container',
            popcode: '@popcode',
            user: '@user'
          },
          outputs: {
            popcode: '@container'
          },
          screenForm: {
            options: {
              auto: 'labels'
            },
            fields: {
              type: 'object',
              description: 'Arrival',
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
                workflowData: {
                  type: 'object',
                  properties: {
                    arrivalComplete: {
                      type: 'boolean',
                      options: {
                        editable: true
                      }
                    },
                    arrivalNotes: {
                      type: 'string',
                      options: {
                        editable: true
                      }
                    }
                  },
                  required: ['arrivalComplete']
                }
              },
              required: ['popcode', 'workflowData']
            }
          },
          screenButtons: {
            ok: {
              title: 'Ok',
              action: [
                {
                  operation: 'contract',
                  contract: 'arrivalChildOk',
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
        Delivered: {
          name: 'Delivered',
          title: 'Delivered',
          api: '/api/mobile',
          parameters: {
            container: '@container',
            popcode: '@popcode',
            user: '@user'
          },
          outputs: {
            popcode: '@container'
          },
          screenForm: {
            options: {
              auto: 'labels'
            },
            fields: {
              type: 'object',
              description: 'Delivered',
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
                workflowData: {
                  type: 'object',
                  properties: {
                    deliveredComplete: {
                      type: 'boolean',
                      options: {
                        editable: true
                      }
                    },
                    deliveredNotes: {
                      type: 'string',
                      options: {
                        editable: true
                      }
                    }
                  },
                  required: ['deliveredComplete']
                }
              },
              required: ['popcode', 'workflowData']
            }
          },
          screenButtons: {
            ok: {
              title: 'Ok',
              action: [
                {
                  operation: 'contract',
                  contract: 'deliveredOk',
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
        },
        ShowPopcode: {
          name: 'ShowPopcode',
          title: 'Popcode',
          api: '/api/mobile',
          parameters: {
            popcode: '@popcode'
          },
          screenForm: {
            fields: {
              type: 'object',
              properties: {
                'Popcode Name': {
                  type: 'string',
                  value: '@popcode.popcodeName'
                },
                'Popcode Address': {
                  type: 'string',
                  value: '@popcode.address'
                },
                currentState: {
                  type: 'string',
                  value: '@popcode.spot',
                  options: {
                    editable: false
                  }
                }
              },
              required: ['Popcode Name', 'Popcode Address', 'currentState']
            }
          },
          screenButtons: {
            ok: {
              title: 'Ok',
              action: []
            }
          }
        },
        Error: {
          name: 'Error',
          api: '/api/mobile',
          screenButtons: {
            ok: {
              action: '^Home',
              title: 'Ok'
            }
          },
          screenForm: {
            fields: {
              type: 'object',
              properties: {
                status: {
                  type: 'string',
                  value: '@status'
                },
                error: {
                  type: 'string',
                  value: '@error'
                }
              },
              required: ['status', 'error']
            }
          },
          parameters: {
            error: '@error',
            status: '@status'
          },
          title: 'Error'
        }
      },
      contractLib: {
        name: 'NTT SmartContract Library',
        version: '2.1',
        slug: 'nttd_2_1',
        libs: [
          'base64_Y2xhc3MgU21hcnRDb250cmFjdEJhc2UgewogIGNvbnN0cnVjdG9yKGhvb2tzKSB7CiAgICAgIHRoaXMuaG9va3MgPSBob29rczsKICAgICAgdGhpcy5zdGF0ZSA9IGhvb2tzLnN0YXRlOwogICAgICB0aGlzLmRlYnVnTG9nID0gaG9va3MuZGVidWdMb2c7CiAgICAgIHRoaXMuZGVidWdMb2coJ2NvbnN0cnVjdCBTbWFydENvbnRyYWN0QmFzZScpOwogIH0KICBhc3luYyBiYWxhbmNlKGFkZHJlc3MpIHsKICAgIHZhciBhcGkgPSB0aGlzLmhvb2tzLnN0YWNrLmFwaTsKICAgIHZhciB1cmwgPSAnL3AvYmFsYW5jZS8nICsgYWRkcmVzczsKICAgIGNvbnN0IHJlcyA9IGF3YWl0IGFwaS5nZXQodXJsKTsKICAgIHJldHVybiByZXMuYm9keTsKICB9CiAgYXN5bmMgZ2VuUG9wY29kZShhZGRyZXNzKSB7CiAgICB2YXIgYXBpID0gdGhpcy5ob29rcy5zdGFjay5hcGk7CiAgICB2YXIgdXJsID0gJy9wL2dlbmVyYXRlJzsKICAgIGNvbnN0IHJlcyA9IGF3YWl0IGFwaS5nZXQodXJsKTsKICAgIHJldHVybiByZXMuYm9keTsKICB9CiAgYXN5bmMgY29udGFpbmVyUG9wY29kZShhZGRyZXNzKSB7CiAgICB2YXIgYXBpID0gdGhpcy5ob29rcy5zdGFjay5hcGlDYXlsZXk7CiAgICB2YXIgdXJsID0gJy9jb250YWluZXJQb3Bjb2RlLycgKyBhZGRyZXNzOwogICAgY29uc3QgcmVzID0gYXdhaXQgYXBpLmdldCh1cmwpOwogICAgcmV0dXJuIHJlcy5ib2R5OwogIH0KICBhc3luYyBib21Qb3Bjb2RlcyhhZGRyZXNzKSB7CiAgICB2YXIgYXBpID0gdGhpcy5ob29rcy5zdGFjay5hcGlDYXlsZXk7CiAgICB2YXIgdXJsID0gJy9ib21Qb3Bjb2Rlcy8nICsgYWRkcmVzczsKICAgIGNvbnN0IHJlcyA9IGF3YWl0IGFwaS5nZXQodXJsKTsKICAgIHJldHVybiByZXMuYm9keTsKICB9CiAgYXN5bmMgc2lnbk1lc3NhZ2UoZmllbGRzLHByaXZhdGVLZXkpIHsKICAgIHZhciBhcGkgPSB0aGlzLmhvb2tzLnN0YWNrLmFwaTsKICAgIHZhciBib2R5ID0gewogICAgICBmaWVsZHMsCiAgICAgIHByaXZhdGVLZXkKICAgIH07CiAgICB2YXIgdXJsID0gJy9jcnlwdG8vc2lnbk1lc3NhZ2UnOwogICAgY29uc3QgcmVzID0gYXdhaXQgYXBpLnBvc3QodXJsLCB7Ym9keX0pOwogICAgcmV0dXJuIHJlcy5ib2R5OwogIH0KICBhc3luYyBibG9iQ3JlYXRlV2l0aFNpZyhzaWcsYWRkcmVzcyxkYXRhLHB1YmxpY0tleSkgewogICAgdmFyIGFwaSA9IHRoaXMuaG9va3Muc3RhY2suYXBpOwogICAgdmFyIGJvZHkgPSB7CiAgICAgIHNpZywKICAgICAgYWRkcmVzcywKICAgICAgcHVibGljS2V5LAogICAgICBkYXRhCiAgICB9OwogICAgdmFyIHVybCA9ICcvcC9ibG9iQ3JlYXRlV2l0aFNpZyc7CiAgICBjb25zdCByZXMgPSBhd2FpdCBhcGkucG9zdCh1cmwsIHtib2R5fSk7CiAgICByZXR1cm4gcmVzLmJvZHk7CiAgfQogIGFzeW5jIGJsb2JDcmVhdGUoYWRkcmVzcyxkYXRhLHB1YmxpY0tleSxwcml2YXRlS2V5KSB7CiAgICB2YXIgZmllbGRzID0gW107CgogICAgdmFyIHJlcyA9IGF3YWl0IHRoaXMuYmFsYW5jZShhZGRyZXNzKTsKICAgIGZpZWxkcy5wdXNoKHJlcy5iYWxhbmNlLkNvdW50ZXIpOwogICAgZmllbGRzLnB1c2goYWRkcmVzcyk7CiAgICBmaWVsZHMucHVzaChkYXRhKTsKCiAgICByZXMgPSBhd2FpdCB0aGlzLnNpZ25NZXNzYWdlKGZpZWxkcyxwcml2YXRlS2V5KTsKCiAgICByZXMgPSBhd2FpdCB0aGlzLmJsb2JDcmVhdGVXaXRoU2lnKHJlcy5zaWcsYWRkcmVzcyxkYXRhLHB1YmxpY0tleSk7CgogICAgcmV0dXJuIHJlcy5ib2R5OwogIH0KICBhc3luYyBtaW50Q3JlYXRlV2l0aFNpZyhzaWcsYWRkcmVzcyxkYXRhLHB1YmxpY0tleSxhbW91bnQsdW5pdCkgewogICAgdmFyIGFwaSA9IHRoaXMuaG9va3Muc3RhY2suYXBpOwogICAgdmFyIGJvZHkgPSB7CiAgICAgIHNpZywKICAgICAgYWRkcmVzcywKICAgICAgcHVibGljS2V5LAogICAgICBhbW91bnQsCiAgICAgIHVuaXQsCiAgICAgIGRhdGEKICAgIH07CiAgICB2YXIgdXJsID0gJy9wL21pbnQnOwogICAgY29uc3QgcmVzID0gYXdhaXQgYXBpLnBvc3QodXJsLCB7Ym9keX0pOwogICAgcmV0dXJuIHJlczsKICB9CiAgYXN5bmMgbWludENyZWF0ZShhZGRyZXNzLGRhdGEscHVibGljS2V5LHByaXZhdGVLZXkpIHsKICAgIHZhciBmaWVsZHMgPSBbXTsKICAgIHZhciBhbW91bnQgPSAxOwogICAgdmFyIHVuaXQgPSAnY29udGFpbmVyJzsKCiAgICB2YXIgeyBiYWxhbmNlIH0gPSBhd2FpdCB0aGlzLmJhbGFuY2UoYWRkcmVzcyk7CiAgICAvLyB0aGlzLmRlYnVnTG9nKCcjIyMjIyMjIyMjIyMjIyMjIGJhbGFuY2UuQ291bnRlcjogJyArIGJhbGFuY2UuQ291bnRlcik7CiAgICBmaWVsZHMucHVzaChiYWxhbmNlLkNvdW50ZXIpOwogICAgZmllbGRzLnB1c2goYWRkcmVzcyk7CiAgICBmaWVsZHMucHVzaChhbW91bnQpOwogICAgZmllbGRzLnB1c2godW5pdCk7CiAgICBmaWVsZHMucHVzaChkYXRhKTsKCiAgICB2YXIgeyBzaWcgfSA9IGF3YWl0IHRoaXMuc2lnbk1lc3NhZ2UoZmllbGRzLHByaXZhdGVLZXkpOwoKICAgIHZhciByZXMgPSBhd2FpdCB0aGlzLm1pbnRDcmVhdGVXaXRoU2lnKHNpZyxhZGRyZXNzLGRhdGEscHVibGljS2V5LGFtb3VudCx1bml0KTsKCiAgICByZXR1cm4gcmVzOwogIH0KfTsK',
          'base64_dmFyIGNyZWF0ZUJsb2JBY3Rpb25zID0gewogICAgICAgICAgImFjdGlvbiI6IFsKICAgICAgICAgICAgewogICAgICAgICAgICAgICJvcGVyYXRpb24iOiAiZmV0Y2giLAogICAgICAgICAgICAgICJyb3V0ZSI6ICIvcC9iYWxhbmNlIiwKICAgICAgICAgICAgICAibWV0aG9kIjogImdldCIsCiAgICAgICAgICAgICAgInBhcmFtZXRlcnMiOiB7CiAgICAgICAgICAgICAgICAiYWRkcmVzcyI6ICJAcG9wY29kZS5hZGRyZXNzIgogICAgICAgICAgICAgIH0sCiAgICAgICAgICAgICAgIm91dHB1dHMiOiB7CiAgICAgICAgICAgICAgICAiYmFsYW5jZSI6ICJAYmFsYW5jZSIKICAgICAgICAgICAgICB9CiAgICAgICAgICAgIH0sCiAgICAgICAgICAgIHsKICAgICAgICAgICAgICAib3BlcmF0aW9uIjogImZldGNoIiwKICAgICAgICAgICAgICAicm91dGUiOiAiL2NyeXB0by9zaWduTWVzc2FnZSIsCiAgICAgICAgICAgICAgIm1ldGhvZCI6ICJwb3N0IiwKICAgICAgICAgICAgICAicGFyYW1ldGVycyI6IHsKICAgICAgICAgICAgICAgICJmaWVsZHMiOiBbCiAgICAgICAgICAgICAgICAgICJAYmFsYW5jZS5Db3VudGVyIiwKICAgICAgICAgICAgICAgICAgIkBwb3Bjb2RlLmFkZHJlc3MiCiAgICAgICAgICAgICAgICAgXSwKICAgICAgICAgICAgICAgICAicHJpdmF0ZUtleSI6ICJAdXNlci5wcml2YXRlS2V5IgogICAgICAgICAgICAgIH0sCiAgICAgICAgICAgICAgIm91dHB1dHMiOiB7CiAgICAgICAgICAgICAgICAic2lnIjogIkBzaWciCiAgICAgICAgICAgICAgfQogICAgICAgICAgICB9LAogICAgICAgICAgICB7CiAgICAgICAgICAgICAgIm9wZXJhdGlvbiI6ICJmZXRjaCIsCiAgICAgICAgICAgICAgInJvdXRlIjogIi9wL2Jsb2JDcmVhdGVXaXRoU2lnIiwKICAgICAgICAgICAgICAibWV0aG9kIjogImJsb2JDcmVhdGVXaXRoU2lnIiwKICAgICAgICAgICAgICAicGFyYW1ldGVycyI6IHsKICAgICAgICAgICAgICAgICJzaWciOiAiQHNpZyIsCiAgICAgICAgICAgICAgICAiYWRkcmVzcyI6ICJAcG9wY29kZS5hZGRyZXNzIiwKICAgICAgICAgICAgICAgICJwdWJsaWNLZXkiOiAiQHVzZXIucHVibGljS2V5IiwKICAgICAgICAgICAgICAgICJkYXRhIjogewogICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgIH0sCiAgICAgICAgICAgICAgIm91dHB1dHMiOiB7CiAgICAgICAgICAgICAgICAic3RhdHVzIjogIkBzdGF0dXMiLAogICAgICAgICAgICAgICAgInR4SWQiOiAiQHR4SWQiCiAgICAgICAgICAgICAgfQogICAgICAgICAgICB9CiAgICAgICAgICBdCn07CmNsYXNzIFNtYXJ0Q29udHJhY3QgZXh0ZW5kcyBTbWFydENvbnRyYWN0QmFzZSB7CiAgY29uc3RydWN0b3IoaG9va3MpIHsKICAgICAgc3VwZXIoaG9va3MpCiAgICAgIHRoaXMuZGVidWdMb2coJyoqKioqKioqKioqKioqIFNtYXJ0Q29udHJhY3QnKTsKICB9CgogIGFzeW5jIGVjaG8oKSB7CiAgICAgIHRoaXMuZGVidWdMb2coJ2VjaG8nKTsKICAgICAgdmFyIHJ2YWwgPSB7CiAgICAgICAgICBkYXRhOiAnaGVsbG8nCiAgICAgIH07CiAgICAgIHRoaXMuaG9va3MuZmluaXNoLnJlc29sdmUocnZhbCk7CiAgfQoKICBhc3luYyB2YW5uaW5nQ2hpbGRPaygpIHsgcmV0dXJuIGF3YWl0IHRoaXMuY2hpbGRPaygndmFubmluZ0NoaWxkJywgJ3NoaXBwaW5nLmNoaWxkJywgJ1Zhbm5pbmcnKTsgfQogIGFzeW5jIGFycml2YWxDaGlsZE9rKCkgeyByZXR1cm4gYXdhaXQgdGhpcy5jaGlsZE9rKCdhcnJpdmFsQ2hpbGQnLCAnZGVsaXZlcmVkLmNoaWxkJywgJ0Fycml2YWwnKTsgfQoKICBhc3luYyBjaGlsZE9rKGxhc3RTcG90LCBuZXh0U3BvdCwgc3RlcFRpdGxlKSB7CiAgICAgIHRoaXMuZGVidWdMb2coJ2V4ZWN1dGUgY2hpbGRPaycpOwoKICAgICAgdmFyIHBvcGNvZGUgPSB0aGlzLnN0YXRlLnBvcGNvZGU7CiAgICAgIHZhciBhZGRyZXNzID0gcG9wY29kZS5hZGRyZXNzOwogICAgICB2YXIgYXBwID0gdGhpcy5ob29rcy5hcHA7CiAgICAgIHZhciB1c2VyQ3JlZGVudGlhbHMgPSBhcHAuZ2V0QXBwU3RhdGUoJ3VzZXJDcmVkZW50aWFscycpOwogICAgICB2YXIgcHVibGljS2V5ID0gdXNlckNyZWRlbnRpYWxzLnB1YmxpY0tleTsKICAgICAgdmFyIHByaXZhdGVLZXkgPSB1c2VyQ3JlZGVudGlhbHMucHJpdmF0ZUtleTsKCiAgICAgIHZhciBkYXRhID0KICAgICAgICAgIHsKICAgICAgICAgICAgImFwcERhdGEiOiB7CiAgICAgICAgICAgICAgInN0ZXBOYW1lIjogbGFzdFNwb3QsCiAgICAgICAgICAgICAgc3RlcFRpdGxlLAogICAgICAgICAgICAgICJ3b3JrZmxvd0RhdGEiOiB0aGlzLnN0YXRlLmZvcm0ud29ya2Zsb3dEYXRhLAogICAgICAgICAgICAgICJzcG90IjogbmV4dFNwb3QKICAgICAgICAgICAgfQogICAgICAgICAgfTsKCiAgICAgIHRoaXMuZGVidWdMb2coJ2Jsb2JEYXRhJyk7CiAgICAgIHRoaXMuZGVidWdMb2coZGF0YSk7CgogICAgICB2YXIgcmVzID0gYXdhaXQgdGhpcy5ibG9iQ3JlYXRlKGFkZHJlc3MsZGF0YSxwdWJsaWNLZXkscHJpdmF0ZUtleSk7CgogICAgICB2YXIgcnZhbCA9IHsKICAgICAgICAgIGFjdGlvbjogW10KICAgICAgfTsKICAgICAgdGhpcy5ob29rcy5maW5pc2gucmVzb2x2ZShydmFsKTsKICB9CgogIGFzeW5jIHZhbm5pbmdDaGlsZENvbXBsZXRlKCkgeyByZXR1cm4gYXdhaXQgdGhpcy5jaGlsZENvbXBsZXRlKCdzaGlwcGluZy5jaGlsZCcsICdzaGlwcGluZycsICd2YW5uaW5nQ2hpbGRDb21wbGV0ZScsICdWYW5uaW5nIENvbXBsZXRlJyk7IH0KICBhc3luYyBhcnJpdmFsQ2hpbGRDb21wbGV0ZSgpIHsgcmV0dXJuIGF3YWl0IHRoaXMuY2hpbGRDb21wbGV0ZSgnZGVsaXZlcmVkLmNoaWxkJywgJ2RlbGl2ZXJlZCcsICdhcnJpdmFsQ2hpbGRDb21wbGV0ZScsICdBcnJpdmFsIENvbXBsZXRlJyk7IH0KCiAgYXN5bmMgY2hpbGRDb21wbGV0ZShsYXN0U3BvdCwgbmV4dFNwb3QsIHN0ZXBOYW1lLCBzdGVwVGl0bGUpIHsKICAgICAgdGhpcy5kZWJ1Z0xvZygnZXhlY3V0ZSBjaGlsZENvbXBsZXRlJyk7CiAgICAgIHZhciBfID0gdGhpcy5ob29rcy5fOwogICAgICB2YXIgc3MgPSB0aGlzLmhvb2tzLnNjcmVlblN0YXRlOwogICAgICB0aGlzLmRlYnVnTG9nKHRoaXMuc3RhdGUpOwogICAgICB2YXIgaXNDb21wbGV0ZSA9IGZhbHNlOwoKICAgICAgaWYoIV8uaXNOaWwodGhpcy5zdGF0ZS5wb3Bjb2RlKSkgewogICAgICAgIHZhciBwb3Bjb2RlID0gdGhpcy5zdGF0ZS5wb3Bjb2RlOwogICAgICAgIHRoaXMuZGVidWdMb2coJ25hbWU6ICcgKyBwb3Bjb2RlLnBvcGNvZGVOYW1lKTsKICAgICAgICB0aGlzLmRlYnVnTG9nKCdhZGRyZXNzOiAnICsgcG9wY29kZS5hZGRyZXNzKTsKCiAgICAgICAgdGhpcy5kZWJ1Z0xvZygnY2FsbCBib21Qb3Bjb2Rlcy4uLicpOwogICAgICAgIHZhciByZXMgPSBhd2FpdCB0aGlzLmJvbVBvcGNvZGVzKHBvcGNvZGUuYWRkcmVzcyk7CgogICAgICAgIHRoaXMuZGVidWdMb2coJ3Jlc3VsdDonKTsKICAgICAgICB0aGlzLmRlYnVnTG9nKHJlcyk7CgoKICAgICAgICBpZihfLmlzQXJyYXkocmVzLnBvcGNvZGVzKSkgewogICAgICAgICAgdmFyIG4gPSAwOwogICAgICAgICAgZm9yKGxldCBjaGlsZCBvZiByZXMucG9wY29kZXMpIHsKICAgICAgICAgICAgdmFyIHNwb3QgPSBzcy5nZXRXb3JrZmxvd1Nwb3QoY2hpbGQpOwogICAgICAgICAgICB0aGlzLmRlYnVnTG9nKHNwb3QpOwogICAgICAgICAgICBpZihzcG90ID09PSBsYXN0U3BvdCkgewogICAgICAgICAgICAgIG4rKzsKICAgICAgICAgICAgfQogICAgICAgICAgfQogICAgICAgICAgaWYobiA9PT0gcmVzLnBvcGNvZGVzLmxlbmd0aCkKICAgICAgICAgICAgaXNDb21wbGV0ZSA9IHRydWU7CiAgICAgICAgfQogICAgICB9CgogICAgICB0aGlzLmRlYnVnTG9nKCdpc0NvbXBsZXRlOiAnICsgaXNDb21wbGV0ZSk7CgogICAgICB2YXIgcnZhbCA9IHsKICAgICAgICBpc0NvbXBsZXRlCiAgICAgIH07CgogICAgICBpZihpc0NvbXBsZXRlKSB7CiAgICAgICAgdmFyIHBvcGNvZGUgPSB0aGlzLnN0YXRlLnBvcGNvZGU7CiAgICAgICAgdmFyIGFkZHJlc3MgPSBwb3Bjb2RlLmFkZHJlc3M7CiAgICAgICAgdmFyIGFwcCA9IHRoaXMuaG9va3MuYXBwOwogICAgICAgIHZhciB1c2VyQ3JlZGVudGlhbHMgPSBhcHAuZ2V0QXBwU3RhdGUoJ3VzZXJDcmVkZW50aWFscycpOwogICAgICAgIHZhciBwdWJsaWNLZXkgPSB1c2VyQ3JlZGVudGlhbHMucHVibGljS2V5OwogICAgICAgIHZhciBwcml2YXRlS2V5ID0gdXNlckNyZWRlbnRpYWxzLnByaXZhdGVLZXk7CiAgICAgICAgdmFyIGRhdGEgPQogICAgICAgICAgewogICAgICAgICAgICAiYXBwRGF0YSI6IHsKICAgICAgICAgICAgICBzdGVwTmFtZSwKICAgICAgICAgICAgICBzdGVwVGl0bGUsCiAgICAgICAgICAgICAgInNwb3QiOiBuZXh0U3BvdAogICAgICAgICAgICB9CiAgICAgICAgICB9OwogICAgICAgIHZhciByZXMgPSBhd2FpdCB0aGlzLmJsb2JDcmVhdGUoYWRkcmVzcyxkYXRhLHB1YmxpY0tleSxwcml2YXRlS2V5KTsKICAgICAgICBydmFsLnJlcyA9IHJlczsKICAgICAgfQoKCiAgICAgIHRoaXMuaG9va3MuZmluaXNoLnJlc29sdmUocnZhbCk7CiAgfQoKICBhc3luYyBzaGlwcGluZ09rKCkgeyByZXR1cm4gYXdhaXQgdGhpcy5wYXJlbnRPaygnc2hpcHBpbmcnLCAndGVybWluYWxJbicsICd0ZXJtaW5hbEluLmNoaWxkJywgJ1NoaXBwaW5nJyk7IH0KICBhc3luYyB0ZXJtaW5hbEluT2soKSB7IHJldHVybiBhd2FpdCB0aGlzLnBhcmVudE9rKCd0ZXJtaW5hbEluJywgJ2Fycml2YWwnLCAnYXJyaXZhbC5jaGlsZCcsICdUZXJtaW5hbC1JbicpOyB9CiAgYXN5bmMgZGVsaXZlcmVkT2soKSB7IHJldHVybiBhd2FpdCB0aGlzLnBhcmVudE9rKCdkZWxpdmVyZWQnLCAnY29tcGxldGUnLCAnY29tcGxldGUuY2hpbGQnLCAnRGVsaXZlcmVkJyk7IH0KCiAgYXN5bmMgcGFyZW50T2sobGFzdFNwb3QsIHBhcmVudFNwb3QsIGNoaWxkU3BvdCwgc3RlcFRpdGxlKSB7CiAgICAgIHRoaXMuZGVidWdMb2coJ2V4ZWN1dGUgcGFyZW50T2snKTsKICAgICAgdmFyIF8gPSB0aGlzLmhvb2tzLl87CgogICAgICB2YXIgcG9wY29kZSA9IHRoaXMuc3RhdGUucG9wY29kZTsKICAgICAgdmFyIGFkZHJlc3MgPSBwb3Bjb2RlLmFkZHJlc3M7CiAgICAgIHZhciBhcHAgPSB0aGlzLmhvb2tzLmFwcDsKICAgICAgdmFyIHVzZXJDcmVkZW50aWFscyA9IGFwcC5nZXRBcHBTdGF0ZSgndXNlckNyZWRlbnRpYWxzJyk7CiAgICAgIHZhciBwdWJsaWNLZXkgPSB1c2VyQ3JlZGVudGlhbHMucHVibGljS2V5OwogICAgICB2YXIgcHJpdmF0ZUtleSA9IHVzZXJDcmVkZW50aWFscy5wcml2YXRlS2V5OwoKICAgICAgdmFyIGRhdGEgPQogICAgICAgICAgewogICAgICAgICAgICAiYXBwRGF0YSI6IHsKICAgICAgICAgICAgICAic3RlcE5hbWUiOiBsYXN0U3BvdCwKICAgICAgICAgICAgICBzdGVwVGl0bGUsCiAgICAgICAgICAgICAgIndvcmtmbG93RGF0YSI6IHRoaXMuc3RhdGUuZm9ybS53b3JrZmxvd0RhdGEsCiAgICAgICAgICAgICAgInNwb3QiOiBwYXJlbnRTcG90CiAgICAgICAgICAgIH0KICAgICAgICAgIH07CgogICAgICB0aGlzLmRlYnVnTG9nKCdibG9iRGF0YScpOwogICAgICB0aGlzLmRlYnVnTG9nKGRhdGEpOwoKICAgICAgdmFyIHJlcyA9IGF3YWl0IHRoaXMuYmxvYkNyZWF0ZShhZGRyZXNzLGRhdGEscHVibGljS2V5LHByaXZhdGVLZXkpOwoKICAgICAgdGhpcy5kZWJ1Z0xvZygnY2FsbCBib21Qb3Bjb2Rlcy4uLicpOwogICAgICB2YXIgcmVzID0gYXdhaXQgdGhpcy5ib21Qb3Bjb2Rlcyhwb3Bjb2RlLmFkZHJlc3MpOwoKICAgICAgdGhpcy5kZWJ1Z0xvZygncmVzdWx0OicpOwogICAgICB0aGlzLmRlYnVnTG9nKHJlcyk7CgoKICAgICAgaWYoXy5pc0FycmF5KHJlcy5wb3Bjb2RlcykpIHsKICAgICAgICBmb3IobGV0IHBvcGNvZGUyIG9mIHJlcy5wb3Bjb2RlcykgewogICAgICAgICAgdmFyIGFkZHJlc3MgPSBwb3Bjb2RlMi5hZGRyZXNzOwogICAgICAgICAgdmFyIGRhdGEgPQogICAgICAgICAgICB7CiAgICAgICAgICAgICAgImFwcERhdGEiOiB7CiAgICAgICAgICAgICAgICAic3BvdCI6IGNoaWxkU3BvdAogICAgICAgICAgICAgIH0KICAgICAgICAgICAgfTsKICAgICAgICAgIGF3YWl0IHRoaXMuYmxvYkNyZWF0ZShhZGRyZXNzLGRhdGEscHVibGljS2V5LHByaXZhdGVLZXkpOwogICAgICAgIH0KICAgICAgfQoKICAgICAgdmFyIHJ2YWwgPSB7CiAgICAgICAgICBhY3Rpb246IFtdCiAgICAgIH07CiAgICAgIHRoaXMuaG9va3MuZmluaXNoLnJlc29sdmUocnZhbCk7CiAgfQoKfTsK'
        ]
      }
    }
  },
  address: '1a5863ca30df1dbca096a276b806ed56c45c286e',
  workflowRootPopcode: 'false',
  transaction: [
    {
      id: '<3ec5655b91d683eea86fffe1b0e658e4b1f86ff8204d887a39dcdd991311be40>',
      popcode: '<1a5863ca30df1dbca096a276b806ed56c45c286e>',
      spot: 'vanning.child',
      unit: 'PS4',
      txId: '3ec5655b91d683eea86fffe1b0e658e4b1f86ff8204d887a39dcdd991311be40',
      data: {
        metadata: {
          appData: {
            spot: 'vanning.child',
            workflowName: 'nttV2',
            workflowInstanceId: '44196A5A-738A-4CB1-9961-9FEF33067834',
            workflowRootPopcode: 'false',
            popcodeName: 'C_6D3CBB0D_1',
            workflowDef: {
              nttV2: {
                title: 'NTT V2',
                name: 'nttV2',
                startScreen: 'Home',
                version: '2.0',
                steps: {
                  vanning: {
                    step: 'vanning',
                    title: 'Vanning Parent',
                    screen: 'Vanning Children'
                  },
                  'vanning.child': {
                    step: 'vanning.child',
                    title: 'Vanning Child',
                    screen: 'Vanning',
                    complete: [
                      {
                        operation: 'contract',
                        contract: 'vanningChildComplete',
                        parameters: {
                          popcode: '@popcode'
                        },
                        outputs: {
                          actions: '@actions'
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
                  shipping: {
                    step: 'shipping',
                    title: 'Shipping',
                    screen: 'Shipping',
                    complete: [
                      {
                        operation: 'navigate',
                        screen: 'Home',
                        resetStack: true,
                        forceUpdate: true
                      }
                    ]
                  },
                  'shipping.child': {
                    step: 'shipping.child',
                    title: 'Show Popcode',
                    screen: 'ShowPopcode'
                  },
                  terminalIn: {
                    step: 'terminalIn',
                    title: 'Terminal-In',
                    screen: 'TerminalIn',
                    complete: [
                      {
                        operation: 'navigate',
                        screen: 'Home',
                        resetStack: true,
                        forceUpdate: true
                      }
                    ]
                  },
                  'terminalIn.child': {
                    step: 'terminalIn.child',
                    title: 'Show Popcode',
                    screen: 'ShowPopcode'
                  },
                  arrival: {
                    step: 'arrival',
                    title: 'Arrival Parent',
                    screen: 'Arrived Children'
                  },
                  'arrival.child': {
                    step: 'arrival.child',
                    title: 'Arrival Child',
                    screen: 'Arrival',
                    complete: [
                      {
                        operation: 'contract',
                        contract: 'arrivalChildComplete',
                        parameters: {
                          popcode: '@popcode'
                        },
                        outputs: {
                          actions: '@actions'
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
                  delivered: {
                    step: 'delivered',
                    title: 'Delivered Parent',
                    screen: 'Delivered',
                    complete: [
                      {
                        operation: 'navigate',
                        screen: 'Home',
                        resetStack: true,
                        forceUpdate: true
                      }
                    ]
                  },
                  'delivered.child': {
                    step: 'delivered.child',
                    title: 'Delivered Child',
                    screen: 'ShowPopcode'
                  },
                  complete: {
                    step: 'process.complete',
                    title: 'Process Complete',
                    screen: 'Completed'
                  },
                  'complete.child': {
                    step: 'process.complete',
                    title: 'Process Complete',
                    screen: 'ShowPopcode'
                  }
                },
                appOptions: {
                  requireLogin: true
                },
                screens: {
                  Home: {
                    name: 'Home',
                    title: 'Home',
                    api: '/api/mobile',
                    screenListItems: {
                      fetchItems: '/allRootPopcodes',
                      method: 'get',
                      api: 'cayley',
                      fetchParameters: {
                        workflowName: 'nttV2'
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
                        operation: 'fetch',
                        route: '/containerPopcode',
                        api: 'cayley',
                        method: 'get',
                        parameters: {
                          address: '@address'
                        },
                        outputs: {
                          container: '@popcodes[0]'
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
                  'Vanning Children': {
                    name: 'Vanning',
                    title: 'Vanning',
                    api: '/api/mobile',
                    parameters: {
                      popcode: '@popcode',
                      user: '@user'
                    },
                    screenListItems: {
                      fetchItems: '/p/bom',
                      method: 'get',
                      parameters: {
                        address: '@popcode.address'
                      },
                      itemDataTypes: {
                        popcode: 'object'
                      },
                      itemLabel: ['popcodeName'],
                      itemActions: {
                        click: {
                          title: 'Click',
                          parameters: {
                            container: '@popcode',
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
                      }
                    }
                  },
                  'Arrived Children': {
                    name: 'Arrived',
                    title: 'Arrived',
                    api: '/api/mobile',
                    parameters: {
                      popcode: '@popcode',
                      user: '@user'
                    },
                    screenListItems: {
                      fetchItems: '/p/bom',
                      method: 'get',
                      parameters: {
                        address: '@popcode.address'
                      },
                      itemDataTypes: {
                        popcode: 'object'
                      },
                      itemLabel: ['popcodeName'],
                      itemActions: {
                        click: {
                          title: 'Click',
                          parameters: {
                            container: '@popcode',
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
                      }
                    }
                  },
                  Vanning: {
                    name: 'Vanning',
                    title: 'Vanning',
                    api: '/api/mobile',
                    parameters: {
                      container: '@container',
                      popcode: '@popcode',
                      user: '@user'
                    },
                    outputs: {
                      popcode: '@container'
                    },
                    screenForm: {
                      options: {
                        auto: 'labels'
                      },
                      fields: {
                        type: 'object',
                        description: 'Vanning',
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
                          workflowData: {
                            type: 'object',
                            properties: {
                              loadingStatus: {
                                type: 'boolean',
                                options: {
                                  editable: true
                                }
                              },
                              vanningNotes: {
                                type: 'string',
                                options: {
                                  editable: true
                                }
                              }
                            },
                            required: ['loadingStatus']
                          }
                        },
                        required: ['popcode', 'workflowData']
                      }
                    },
                    screenButtons: {
                      ok: {
                        title: 'Ok',
                        action: [
                          {
                            operation: 'contract',
                            contract: 'vanningChildOk',
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
                  Shipping: {
                    name: 'Shipping',
                    title: 'Shipping',
                    api: '/api/mobile',
                    parameters: {
                      container: '@container',
                      popcode: '@popcode',
                      user: '@user'
                    },
                    outputs: {
                      popcode: '@container'
                    },
                    screenForm: {
                      options: {
                        auto: 'labels'
                      },
                      fields: {
                        type: 'object',
                        description: 'Shipping',
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
                          workflowData: {
                            type: 'object',
                            properties: {
                              shippingComplete: {
                                type: 'boolean',
                                options: {
                                  editable: true
                                }
                              },
                              trackingNumber: {
                                type: 'string',
                                options: {
                                  editable: true
                                }
                              },
                              shippingNotes: {
                                type: 'string',
                                options: {
                                  editable: true
                                }
                              }
                            },
                            required: ['shippingComplete']
                          }
                        },
                        required: ['popcode', 'workflowData']
                      }
                    },
                    screenButtons: {
                      ok: {
                        title: 'Ok',
                        action: [
                          {
                            operation: 'contract',
                            contract: 'shippingOk',
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
                  TerminalIn: {
                    name: 'TerminalIn',
                    title: 'TerminalIn',
                    api: '/api/mobile',
                    parameters: {
                      container: '@container',
                      popcode: '@popcode',
                      user: '@user'
                    },
                    outputs: {
                      popcode: '@container'
                    },
                    screenForm: {
                      options: {
                        auto: 'labels'
                      },
                      fields: {
                        type: 'object',
                        description: 'Terminal In',
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
                          workflowData: {
                            type: 'object',
                            properties: {
                              terminalInComplete: {
                                type: 'boolean',
                                options: {
                                  editable: true
                                }
                              },
                              terminalInNotes: {
                                type: 'string',
                                options: {
                                  editable: true
                                }
                              }
                            },
                            required: ['terminalInComplete']
                          }
                        },
                        required: ['popcode', 'workflowData']
                      }
                    },
                    screenButtons: {
                      ok: {
                        title: 'Ok',
                        action: [
                          {
                            operation: 'contract',
                            contract: 'terminalInOk',
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
                  Arrival: {
                    name: 'Arrival',
                    title: 'Arrival',
                    api: '/api/mobile',
                    parameters: {
                      container: '@container',
                      popcode: '@popcode',
                      user: '@user'
                    },
                    outputs: {
                      popcode: '@container'
                    },
                    screenForm: {
                      options: {
                        auto: 'labels'
                      },
                      fields: {
                        type: 'object',
                        description: 'Arrival',
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
                          workflowData: {
                            type: 'object',
                            properties: {
                              arrivalComplete: {
                                type: 'boolean',
                                options: {
                                  editable: true
                                }
                              },
                              arrivalNotes: {
                                type: 'string',
                                options: {
                                  editable: true
                                }
                              }
                            },
                            required: ['arrivalComplete']
                          }
                        },
                        required: ['popcode', 'workflowData']
                      }
                    },
                    screenButtons: {
                      ok: {
                        title: 'Ok',
                        action: [
                          {
                            operation: 'contract',
                            contract: 'arrivalChildOk',
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
                  Delivered: {
                    name: 'Delivered',
                    title: 'Delivered',
                    api: '/api/mobile',
                    parameters: {
                      container: '@container',
                      popcode: '@popcode',
                      user: '@user'
                    },
                    outputs: {
                      popcode: '@container'
                    },
                    screenForm: {
                      options: {
                        auto: 'labels'
                      },
                      fields: {
                        type: 'object',
                        description: 'Delivered',
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
                          workflowData: {
                            type: 'object',
                            properties: {
                              deliveredComplete: {
                                type: 'boolean',
                                options: {
                                  editable: true
                                }
                              },
                              deliveredNotes: {
                                type: 'string',
                                options: {
                                  editable: true
                                }
                              }
                            },
                            required: ['deliveredComplete']
                          }
                        },
                        required: ['popcode', 'workflowData']
                      }
                    },
                    screenButtons: {
                      ok: {
                        title: 'Ok',
                        action: [
                          {
                            operation: 'contract',
                            contract: 'deliveredOk',
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
                  },
                  ShowPopcode: {
                    name: 'ShowPopcode',
                    title: 'Popcode',
                    api: '/api/mobile',
                    parameters: {
                      popcode: '@popcode'
                    },
                    screenForm: {
                      fields: {
                        type: 'object',
                        properties: {
                          'Popcode Name': {
                            type: 'string',
                            value: '@popcode.popcodeName'
                          },
                          'Popcode Address': {
                            type: 'string',
                            value: '@popcode.address'
                          },
                          currentState: {
                            type: 'string',
                            value: '@popcode.spot',
                            options: {
                              editable: false
                            }
                          }
                        },
                        required: [
                          'Popcode Name',
                          'Popcode Address',
                          'currentState'
                        ]
                      }
                    },
                    screenButtons: {
                      ok: {
                        title: 'Ok',
                        action: []
                      }
                    }
                  },
                  Error: {
                    name: 'Error',
                    api: '/api/mobile',
                    screenButtons: {
                      ok: {
                        action: '^Home',
                        title: 'Ok'
                      }
                    },
                    screenForm: {
                      fields: {
                        type: 'object',
                        properties: {
                          status: {
                            type: 'string',
                            value: '@status'
                          },
                          error: {
                            type: 'string',
                            value: '@error'
                          }
                        },
                        required: ['status', 'error']
                      }
                    },
                    parameters: {
                      error: '@error',
                      status: '@status'
                    },
                    title: 'Error'
                  }
                },
                contractLib: {
                  name: 'NTT SmartContract Library',
                  version: '2.1',
                  slug: 'nttd_2_1',
                  libs: [
                    'base64_Y2xhc3MgU21hcnRDb250cmFjdEJhc2UgewogIGNvbnN0cnVjdG9yKGhvb2tzKSB7CiAgICAgIHRoaXMuaG9va3MgPSBob29rczsKICAgICAgdGhpcy5zdGF0ZSA9IGhvb2tzLnN0YXRlOwogICAgICB0aGlzLmRlYnVnTG9nID0gaG9va3MuZGVidWdMb2c7CiAgICAgIHRoaXMuZGVidWdMb2coJ2NvbnN0cnVjdCBTbWFydENvbnRyYWN0QmFzZScpOwogIH0KICBhc3luYyBiYWxhbmNlKGFkZHJlc3MpIHsKICAgIHZhciBhcGkgPSB0aGlzLmhvb2tzLnN0YWNrLmFwaTsKICAgIHZhciB1cmwgPSAnL3AvYmFsYW5jZS8nICsgYWRkcmVzczsKICAgIGNvbnN0IHJlcyA9IGF3YWl0IGFwaS5nZXQodXJsKTsKICAgIHJldHVybiByZXMuYm9keTsKICB9CiAgYXN5bmMgZ2VuUG9wY29kZShhZGRyZXNzKSB7CiAgICB2YXIgYXBpID0gdGhpcy5ob29rcy5zdGFjay5hcGk7CiAgICB2YXIgdXJsID0gJy9wL2dlbmVyYXRlJzsKICAgIGNvbnN0IHJlcyA9IGF3YWl0IGFwaS5nZXQodXJsKTsKICAgIHJldHVybiByZXMuYm9keTsKICB9CiAgYXN5bmMgY29udGFpbmVyUG9wY29kZShhZGRyZXNzKSB7CiAgICB2YXIgYXBpID0gdGhpcy5ob29rcy5zdGFjay5hcGlDYXlsZXk7CiAgICB2YXIgdXJsID0gJy9jb250YWluZXJQb3Bjb2RlLycgKyBhZGRyZXNzOwogICAgY29uc3QgcmVzID0gYXdhaXQgYXBpLmdldCh1cmwpOwogICAgcmV0dXJuIHJlcy5ib2R5OwogIH0KICBhc3luYyBib21Qb3Bjb2RlcyhhZGRyZXNzKSB7CiAgICB2YXIgYXBpID0gdGhpcy5ob29rcy5zdGFjay5hcGlDYXlsZXk7CiAgICB2YXIgdXJsID0gJy9ib21Qb3Bjb2Rlcy8nICsgYWRkcmVzczsKICAgIGNvbnN0IHJlcyA9IGF3YWl0IGFwaS5nZXQodXJsKTsKICAgIHJldHVybiByZXMuYm9keTsKICB9CiAgYXN5bmMgc2lnbk1lc3NhZ2UoZmllbGRzLHByaXZhdGVLZXkpIHsKICAgIHZhciBhcGkgPSB0aGlzLmhvb2tzLnN0YWNrLmFwaTsKICAgIHZhciBib2R5ID0gewogICAgICBmaWVsZHMsCiAgICAgIHByaXZhdGVLZXkKICAgIH07CiAgICB2YXIgdXJsID0gJy9jcnlwdG8vc2lnbk1lc3NhZ2UnOwogICAgY29uc3QgcmVzID0gYXdhaXQgYXBpLnBvc3QodXJsLCB7Ym9keX0pOwogICAgcmV0dXJuIHJlcy5ib2R5OwogIH0KICBhc3luYyBibG9iQ3JlYXRlV2l0aFNpZyhzaWcsYWRkcmVzcyxkYXRhLHB1YmxpY0tleSkgewogICAgdmFyIGFwaSA9IHRoaXMuaG9va3Muc3RhY2suYXBpOwogICAgdmFyIGJvZHkgPSB7CiAgICAgIHNpZywKICAgICAgYWRkcmVzcywKICAgICAgcHVibGljS2V5LAogICAgICBkYXRhCiAgICB9OwogICAgdmFyIHVybCA9ICcvcC9ibG9iQ3JlYXRlV2l0aFNpZyc7CiAgICBjb25zdCByZXMgPSBhd2FpdCBhcGkucG9zdCh1cmwsIHtib2R5fSk7CiAgICByZXR1cm4gcmVzLmJvZHk7CiAgfQogIGFzeW5jIGJsb2JDcmVhdGUoYWRkcmVzcyxkYXRhLHB1YmxpY0tleSxwcml2YXRlS2V5KSB7CiAgICB2YXIgZmllbGRzID0gW107CgogICAgdmFyIHJlcyA9IGF3YWl0IHRoaXMuYmFsYW5jZShhZGRyZXNzKTsKICAgIGZpZWxkcy5wdXNoKHJlcy5iYWxhbmNlLkNvdW50ZXIpOwogICAgZmllbGRzLnB1c2goYWRkcmVzcyk7CiAgICBmaWVsZHMucHVzaChkYXRhKTsKCiAgICByZXMgPSBhd2FpdCB0aGlzLnNpZ25NZXNzYWdlKGZpZWxkcyxwcml2YXRlS2V5KTsKCiAgICByZXMgPSBhd2FpdCB0aGlzLmJsb2JDcmVhdGVXaXRoU2lnKHJlcy5zaWcsYWRkcmVzcyxkYXRhLHB1YmxpY0tleSk7CgogICAgcmV0dXJuIHJlcy5ib2R5OwogIH0KICBhc3luYyBtaW50Q3JlYXRlV2l0aFNpZyhzaWcsYWRkcmVzcyxkYXRhLHB1YmxpY0tleSxhbW91bnQsdW5pdCkgewogICAgdmFyIGFwaSA9IHRoaXMuaG9va3Muc3RhY2suYXBpOwogICAgdmFyIGJvZHkgPSB7CiAgICAgIHNpZywKICAgICAgYWRkcmVzcywKICAgICAgcHVibGljS2V5LAogICAgICBhbW91bnQsCiAgICAgIHVuaXQsCiAgICAgIGRhdGEKICAgIH07CiAgICB2YXIgdXJsID0gJy9wL21pbnQnOwogICAgY29uc3QgcmVzID0gYXdhaXQgYXBpLnBvc3QodXJsLCB7Ym9keX0pOwogICAgcmV0dXJuIHJlczsKICB9CiAgYXN5bmMgbWludENyZWF0ZShhZGRyZXNzLGRhdGEscHVibGljS2V5LHByaXZhdGVLZXkpIHsKICAgIHZhciBmaWVsZHMgPSBbXTsKICAgIHZhciBhbW91bnQgPSAxOwogICAgdmFyIHVuaXQgPSAnY29udGFpbmVyJzsKCiAgICB2YXIgeyBiYWxhbmNlIH0gPSBhd2FpdCB0aGlzLmJhbGFuY2UoYWRkcmVzcyk7CiAgICAvLyB0aGlzLmRlYnVnTG9nKCcjIyMjIyMjIyMjIyMjIyMjIGJhbGFuY2UuQ291bnRlcjogJyArIGJhbGFuY2UuQ291bnRlcik7CiAgICBmaWVsZHMucHVzaChiYWxhbmNlLkNvdW50ZXIpOwogICAgZmllbGRzLnB1c2goYWRkcmVzcyk7CiAgICBmaWVsZHMucHVzaChhbW91bnQpOwogICAgZmllbGRzLnB1c2godW5pdCk7CiAgICBmaWVsZHMucHVzaChkYXRhKTsKCiAgICB2YXIgeyBzaWcgfSA9IGF3YWl0IHRoaXMuc2lnbk1lc3NhZ2UoZmllbGRzLHByaXZhdGVLZXkpOwoKICAgIHZhciByZXMgPSBhd2FpdCB0aGlzLm1pbnRDcmVhdGVXaXRoU2lnKHNpZyxhZGRyZXNzLGRhdGEscHVibGljS2V5LGFtb3VudCx1bml0KTsKCiAgICByZXR1cm4gcmVzOwogIH0KfTsK',
                    'base64_dmFyIGNyZWF0ZUJsb2JBY3Rpb25zID0gewogICAgICAgICAgImFjdGlvbiI6IFsKICAgICAgICAgICAgewogICAgICAgICAgICAgICJvcGVyYXRpb24iOiAiZmV0Y2giLAogICAgICAgICAgICAgICJyb3V0ZSI6ICIvcC9iYWxhbmNlIiwKICAgICAgICAgICAgICAibWV0aG9kIjogImdldCIsCiAgICAgICAgICAgICAgInBhcmFtZXRlcnMiOiB7CiAgICAgICAgICAgICAgICAiYWRkcmVzcyI6ICJAcG9wY29kZS5hZGRyZXNzIgogICAgICAgICAgICAgIH0sCiAgICAgICAgICAgICAgIm91dHB1dHMiOiB7CiAgICAgICAgICAgICAgICAiYmFsYW5jZSI6ICJAYmFsYW5jZSIKICAgICAgICAgICAgICB9CiAgICAgICAgICAgIH0sCiAgICAgICAgICAgIHsKICAgICAgICAgICAgICAib3BlcmF0aW9uIjogImZldGNoIiwKICAgICAgICAgICAgICAicm91dGUiOiAiL2NyeXB0by9zaWduTWVzc2FnZSIsCiAgICAgICAgICAgICAgIm1ldGhvZCI6ICJwb3N0IiwKICAgICAgICAgICAgICAicGFyYW1ldGVycyI6IHsKICAgICAgICAgICAgICAgICJmaWVsZHMiOiBbCiAgICAgICAgICAgICAgICAgICJAYmFsYW5jZS5Db3VudGVyIiwKICAgICAgICAgICAgICAgICAgIkBwb3Bjb2RlLmFkZHJlc3MiCiAgICAgICAgICAgICAgICAgXSwKICAgICAgICAgICAgICAgICAicHJpdmF0ZUtleSI6ICJAdXNlci5wcml2YXRlS2V5IgogICAgICAgICAgICAgIH0sCiAgICAgICAgICAgICAgIm91dHB1dHMiOiB7CiAgICAgICAgICAgICAgICAic2lnIjogIkBzaWciCiAgICAgICAgICAgICAgfQogICAgICAgICAgICB9LAogICAgICAgICAgICB7CiAgICAgICAgICAgICAgIm9wZXJhdGlvbiI6ICJmZXRjaCIsCiAgICAgICAgICAgICAgInJvdXRlIjogIi9wL2Jsb2JDcmVhdGVXaXRoU2lnIiwKICAgICAgICAgICAgICAibWV0aG9kIjogImJsb2JDcmVhdGVXaXRoU2lnIiwKICAgICAgICAgICAgICAicGFyYW1ldGVycyI6IHsKICAgICAgICAgICAgICAgICJzaWciOiAiQHNpZyIsCiAgICAgICAgICAgICAgICAiYWRkcmVzcyI6ICJAcG9wY29kZS5hZGRyZXNzIiwKICAgICAgICAgICAgICAgICJwdWJsaWNLZXkiOiAiQHVzZXIucHVibGljS2V5IiwKICAgICAgICAgICAgICAgICJkYXRhIjogewogICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgIH0sCiAgICAgICAgICAgICAgIm91dHB1dHMiOiB7CiAgICAgICAgICAgICAgICAic3RhdHVzIjogIkBzdGF0dXMiLAogICAgICAgICAgICAgICAgInR4SWQiOiAiQHR4SWQiCiAgICAgICAgICAgICAgfQogICAgICAgICAgICB9CiAgICAgICAgICBdCn07CmNsYXNzIFNtYXJ0Q29udHJhY3QgZXh0ZW5kcyBTbWFydENvbnRyYWN0QmFzZSB7CiAgY29uc3RydWN0b3IoaG9va3MpIHsKICAgICAgc3VwZXIoaG9va3MpCiAgICAgIHRoaXMuZGVidWdMb2coJyoqKioqKioqKioqKioqIFNtYXJ0Q29udHJhY3QnKTsKICB9CgogIGFzeW5jIGVjaG8oKSB7CiAgICAgIHRoaXMuZGVidWdMb2coJ2VjaG8nKTsKICAgICAgdmFyIHJ2YWwgPSB7CiAgICAgICAgICBkYXRhOiAnaGVsbG8nCiAgICAgIH07CiAgICAgIHRoaXMuaG9va3MuZmluaXNoLnJlc29sdmUocnZhbCk7CiAgfQoKICBhc3luYyB2YW5uaW5nQ2hpbGRPaygpIHsgcmV0dXJuIGF3YWl0IHRoaXMuY2hpbGRPaygndmFubmluZ0NoaWxkJywgJ3NoaXBwaW5nLmNoaWxkJywgJ1Zhbm5pbmcnKTsgfQogIGFzeW5jIGFycml2YWxDaGlsZE9rKCkgeyByZXR1cm4gYXdhaXQgdGhpcy5jaGlsZE9rKCdhcnJpdmFsQ2hpbGQnLCAnZGVsaXZlcmVkLmNoaWxkJywgJ0Fycml2YWwnKTsgfQoKICBhc3luYyBjaGlsZE9rKGxhc3RTcG90LCBuZXh0U3BvdCwgc3RlcFRpdGxlKSB7CiAgICAgIHRoaXMuZGVidWdMb2coJ2V4ZWN1dGUgY2hpbGRPaycpOwoKICAgICAgdmFyIHBvcGNvZGUgPSB0aGlzLnN0YXRlLnBvcGNvZGU7CiAgICAgIHZhciBhZGRyZXNzID0gcG9wY29kZS5hZGRyZXNzOwogICAgICB2YXIgYXBwID0gdGhpcy5ob29rcy5hcHA7CiAgICAgIHZhciB1c2VyQ3JlZGVudGlhbHMgPSBhcHAuZ2V0QXBwU3RhdGUoJ3VzZXJDcmVkZW50aWFscycpOwogICAgICB2YXIgcHVibGljS2V5ID0gdXNlckNyZWRlbnRpYWxzLnB1YmxpY0tleTsKICAgICAgdmFyIHByaXZhdGVLZXkgPSB1c2VyQ3JlZGVudGlhbHMucHJpdmF0ZUtleTsKCiAgICAgIHZhciBkYXRhID0KICAgICAgICAgIHsKICAgICAgICAgICAgImFwcERhdGEiOiB7CiAgICAgICAgICAgICAgInN0ZXBOYW1lIjogbGFzdFNwb3QsCiAgICAgICAgICAgICAgc3RlcFRpdGxlLAogICAgICAgICAgICAgICJ3b3JrZmxvd0RhdGEiOiB0aGlzLnN0YXRlLmZvcm0ud29ya2Zsb3dEYXRhLAogICAgICAgICAgICAgICJzcG90IjogbmV4dFNwb3QKICAgICAgICAgICAgfQogICAgICAgICAgfTsKCiAgICAgIHRoaXMuZGVidWdMb2coJ2Jsb2JEYXRhJyk7CiAgICAgIHRoaXMuZGVidWdMb2coZGF0YSk7CgogICAgICB2YXIgcmVzID0gYXdhaXQgdGhpcy5ibG9iQ3JlYXRlKGFkZHJlc3MsZGF0YSxwdWJsaWNLZXkscHJpdmF0ZUtleSk7CgogICAgICB2YXIgcnZhbCA9IHsKICAgICAgICAgIGFjdGlvbjogW10KICAgICAgfTsKICAgICAgdGhpcy5ob29rcy5maW5pc2gucmVzb2x2ZShydmFsKTsKICB9CgogIGFzeW5jIHZhbm5pbmdDaGlsZENvbXBsZXRlKCkgeyByZXR1cm4gYXdhaXQgdGhpcy5jaGlsZENvbXBsZXRlKCdzaGlwcGluZy5jaGlsZCcsICdzaGlwcGluZycsICd2YW5uaW5nQ2hpbGRDb21wbGV0ZScsICdWYW5uaW5nIENvbXBsZXRlJyk7IH0KICBhc3luYyBhcnJpdmFsQ2hpbGRDb21wbGV0ZSgpIHsgcmV0dXJuIGF3YWl0IHRoaXMuY2hpbGRDb21wbGV0ZSgnZGVsaXZlcmVkLmNoaWxkJywgJ2RlbGl2ZXJlZCcsICdhcnJpdmFsQ2hpbGRDb21wbGV0ZScsICdBcnJpdmFsIENvbXBsZXRlJyk7IH0KCiAgYXN5bmMgY2hpbGRDb21wbGV0ZShsYXN0U3BvdCwgbmV4dFNwb3QsIHN0ZXBOYW1lLCBzdGVwVGl0bGUpIHsKICAgICAgdGhpcy5kZWJ1Z0xvZygnZXhlY3V0ZSBjaGlsZENvbXBsZXRlJyk7CiAgICAgIHZhciBfID0gdGhpcy5ob29rcy5fOwogICAgICB2YXIgc3MgPSB0aGlzLmhvb2tzLnNjcmVlblN0YXRlOwogICAgICB0aGlzLmRlYnVnTG9nKHRoaXMuc3RhdGUpOwogICAgICB2YXIgaXNDb21wbGV0ZSA9IGZhbHNlOwoKICAgICAgaWYoIV8uaXNOaWwodGhpcy5zdGF0ZS5wb3Bjb2RlKSkgewogICAgICAgIHZhciBwb3Bjb2RlID0gdGhpcy5zdGF0ZS5wb3Bjb2RlOwogICAgICAgIHRoaXMuZGVidWdMb2coJ25hbWU6ICcgKyBwb3Bjb2RlLnBvcGNvZGVOYW1lKTsKICAgICAgICB0aGlzLmRlYnVnTG9nKCdhZGRyZXNzOiAnICsgcG9wY29kZS5hZGRyZXNzKTsKCiAgICAgICAgdGhpcy5kZWJ1Z0xvZygnY2FsbCBib21Qb3Bjb2Rlcy4uLicpOwogICAgICAgIHZhciByZXMgPSBhd2FpdCB0aGlzLmJvbVBvcGNvZGVzKHBvcGNvZGUuYWRkcmVzcyk7CgogICAgICAgIHRoaXMuZGVidWdMb2coJ3Jlc3VsdDonKTsKICAgICAgICB0aGlzLmRlYnVnTG9nKHJlcyk7CgoKICAgICAgICBpZihfLmlzQXJyYXkocmVzLnBvcGNvZGVzKSkgewogICAgICAgICAgdmFyIG4gPSAwOwogICAgICAgICAgZm9yKGxldCBjaGlsZCBvZiByZXMucG9wY29kZXMpIHsKICAgICAgICAgICAgdmFyIHNwb3QgPSBzcy5nZXRXb3JrZmxvd1Nwb3QoY2hpbGQpOwogICAgICAgICAgICB0aGlzLmRlYnVnTG9nKHNwb3QpOwogICAgICAgICAgICBpZihzcG90ID09PSBsYXN0U3BvdCkgewogICAgICAgICAgICAgIG4rKzsKICAgICAgICAgICAgfQogICAgICAgICAgfQogICAgICAgICAgaWYobiA9PT0gcmVzLnBvcGNvZGVzLmxlbmd0aCkKICAgICAgICAgICAgaXNDb21wbGV0ZSA9IHRydWU7CiAgICAgICAgfQogICAgICB9CgogICAgICB0aGlzLmRlYnVnTG9nKCdpc0NvbXBsZXRlOiAnICsgaXNDb21wbGV0ZSk7CgogICAgICB2YXIgcnZhbCA9IHsKICAgICAgICBpc0NvbXBsZXRlCiAgICAgIH07CgogICAgICBpZihpc0NvbXBsZXRlKSB7CiAgICAgICAgdmFyIHBvcGNvZGUgPSB0aGlzLnN0YXRlLnBvcGNvZGU7CiAgICAgICAgdmFyIGFkZHJlc3MgPSBwb3Bjb2RlLmFkZHJlc3M7CiAgICAgICAgdmFyIGFwcCA9IHRoaXMuaG9va3MuYXBwOwogICAgICAgIHZhciB1c2VyQ3JlZGVudGlhbHMgPSBhcHAuZ2V0QXBwU3RhdGUoJ3VzZXJDcmVkZW50aWFscycpOwogICAgICAgIHZhciBwdWJsaWNLZXkgPSB1c2VyQ3JlZGVudGlhbHMucHVibGljS2V5OwogICAgICAgIHZhciBwcml2YXRlS2V5ID0gdXNlckNyZWRlbnRpYWxzLnByaXZhdGVLZXk7CiAgICAgICAgdmFyIGRhdGEgPQogICAgICAgICAgewogICAgICAgICAgICAiYXBwRGF0YSI6IHsKICAgICAgICAgICAgICBzdGVwTmFtZSwKICAgICAgICAgICAgICBzdGVwVGl0bGUsCiAgICAgICAgICAgICAgInNwb3QiOiBuZXh0U3BvdAogICAgICAgICAgICB9CiAgICAgICAgICB9OwogICAgICAgIHZhciByZXMgPSBhd2FpdCB0aGlzLmJsb2JDcmVhdGUoYWRkcmVzcyxkYXRhLHB1YmxpY0tleSxwcml2YXRlS2V5KTsKICAgICAgICBydmFsLnJlcyA9IHJlczsKICAgICAgfQoKCiAgICAgIHRoaXMuaG9va3MuZmluaXNoLnJlc29sdmUocnZhbCk7CiAgfQoKICBhc3luYyBzaGlwcGluZ09rKCkgeyByZXR1cm4gYXdhaXQgdGhpcy5wYXJlbnRPaygnc2hpcHBpbmcnLCAndGVybWluYWxJbicsICd0ZXJtaW5hbEluLmNoaWxkJywgJ1NoaXBwaW5nJyk7IH0KICBhc3luYyB0ZXJtaW5hbEluT2soKSB7IHJldHVybiBhd2FpdCB0aGlzLnBhcmVudE9rKCd0ZXJtaW5hbEluJywgJ2Fycml2YWwnLCAnYXJyaXZhbC5jaGlsZCcsICdUZXJtaW5hbC1JbicpOyB9CiAgYXN5bmMgZGVsaXZlcmVkT2soKSB7IHJldHVybiBhd2FpdCB0aGlzLnBhcmVudE9rKCdkZWxpdmVyZWQnLCAnY29tcGxldGUnLCAnY29tcGxldGUuY2hpbGQnLCAnRGVsaXZlcmVkJyk7IH0KCiAgYXN5bmMgcGFyZW50T2sobGFzdFNwb3QsIHBhcmVudFNwb3QsIGNoaWxkU3BvdCwgc3RlcFRpdGxlKSB7CiAgICAgIHRoaXMuZGVidWdMb2coJ2V4ZWN1dGUgcGFyZW50T2snKTsKICAgICAgdmFyIF8gPSB0aGlzLmhvb2tzLl87CgogICAgICB2YXIgcG9wY29kZSA9IHRoaXMuc3RhdGUucG9wY29kZTsKICAgICAgdmFyIGFkZHJlc3MgPSBwb3Bjb2RlLmFkZHJlc3M7CiAgICAgIHZhciBhcHAgPSB0aGlzLmhvb2tzLmFwcDsKICAgICAgdmFyIHVzZXJDcmVkZW50aWFscyA9IGFwcC5nZXRBcHBTdGF0ZSgndXNlckNyZWRlbnRpYWxzJyk7CiAgICAgIHZhciBwdWJsaWNLZXkgPSB1c2VyQ3JlZGVudGlhbHMucHVibGljS2V5OwogICAgICB2YXIgcHJpdmF0ZUtleSA9IHVzZXJDcmVkZW50aWFscy5wcml2YXRlS2V5OwoKICAgICAgdmFyIGRhdGEgPQogICAgICAgICAgewogICAgICAgICAgICAiYXBwRGF0YSI6IHsKICAgICAgICAgICAgICAic3RlcE5hbWUiOiBsYXN0U3BvdCwKICAgICAgICAgICAgICBzdGVwVGl0bGUsCiAgICAgICAgICAgICAgIndvcmtmbG93RGF0YSI6IHRoaXMuc3RhdGUuZm9ybS53b3JrZmxvd0RhdGEsCiAgICAgICAgICAgICAgInNwb3QiOiBwYXJlbnRTcG90CiAgICAgICAgICAgIH0KICAgICAgICAgIH07CgogICAgICB0aGlzLmRlYnVnTG9nKCdibG9iRGF0YScpOwogICAgICB0aGlzLmRlYnVnTG9nKGRhdGEpOwoKICAgICAgdmFyIHJlcyA9IGF3YWl0IHRoaXMuYmxvYkNyZWF0ZShhZGRyZXNzLGRhdGEscHVibGljS2V5LHByaXZhdGVLZXkpOwoKICAgICAgdGhpcy5kZWJ1Z0xvZygnY2FsbCBib21Qb3Bjb2Rlcy4uLicpOwogICAgICB2YXIgcmVzID0gYXdhaXQgdGhpcy5ib21Qb3Bjb2Rlcyhwb3Bjb2RlLmFkZHJlc3MpOwoKICAgICAgdGhpcy5kZWJ1Z0xvZygncmVzdWx0OicpOwogICAgICB0aGlzLmRlYnVnTG9nKHJlcyk7CgoKICAgICAgaWYoXy5pc0FycmF5KHJlcy5wb3Bjb2RlcykpIHsKICAgICAgICBmb3IobGV0IHBvcGNvZGUyIG9mIHJlcy5wb3Bjb2RlcykgewogICAgICAgICAgdmFyIGFkZHJlc3MgPSBwb3Bjb2RlMi5hZGRyZXNzOwogICAgICAgICAgdmFyIGRhdGEgPQogICAgICAgICAgICB7CiAgICAgICAgICAgICAgImFwcERhdGEiOiB7CiAgICAgICAgICAgICAgICAic3BvdCI6IGNoaWxkU3BvdAogICAgICAgICAgICAgIH0KICAgICAgICAgICAgfTsKICAgICAgICAgIGF3YWl0IHRoaXMuYmxvYkNyZWF0ZShhZGRyZXNzLGRhdGEscHVibGljS2V5LHByaXZhdGVLZXkpOwogICAgICAgIH0KICAgICAgfQoKICAgICAgdmFyIHJ2YWwgPSB7CiAgICAgICAgICBhY3Rpb246IFtdCiAgICAgIH07CiAgICAgIHRoaXMuaG9va3MuZmluaXNoLnJlc29sdmUocnZhbCk7CiAgfQoKfTsK'
                  ]
                }
              }
            }
          }
        }
      },
      type: 'transaction',
      sourceCounter: 'qgwrpHU2vzg993llHMlVIKSL74dSv8VgJBJySMeeWAU=',
      amount: '1',
      workflowDef: {
        nttV2: {
          title: 'NTT V2',
          name: 'nttV2',
          startScreen: 'Home',
          version: '2.0',
          steps: {
            vanning: {
              step: 'vanning',
              title: 'Vanning Parent',
              screen: 'Vanning Children'
            },
            'vanning.child': {
              step: 'vanning.child',
              title: 'Vanning Child',
              screen: 'Vanning',
              complete: [
                {
                  operation: 'contract',
                  contract: 'vanningChildComplete',
                  parameters: {
                    popcode: '@popcode'
                  },
                  outputs: {
                    actions: '@actions'
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
            shipping: {
              step: 'shipping',
              title: 'Shipping',
              screen: 'Shipping',
              complete: [
                {
                  operation: 'navigate',
                  screen: 'Home',
                  resetStack: true,
                  forceUpdate: true
                }
              ]
            },
            'shipping.child': {
              step: 'shipping.child',
              title: 'Show Popcode',
              screen: 'ShowPopcode'
            },
            terminalIn: {
              step: 'terminalIn',
              title: 'Terminal-In',
              screen: 'TerminalIn',
              complete: [
                {
                  operation: 'navigate',
                  screen: 'Home',
                  resetStack: true,
                  forceUpdate: true
                }
              ]
            },
            'terminalIn.child': {
              step: 'terminalIn.child',
              title: 'Show Popcode',
              screen: 'ShowPopcode'
            },
            arrival: {
              step: 'arrival',
              title: 'Arrival Parent',
              screen: 'Arrived Children'
            },
            'arrival.child': {
              step: 'arrival.child',
              title: 'Arrival Child',
              screen: 'Arrival',
              complete: [
                {
                  operation: 'contract',
                  contract: 'arrivalChildComplete',
                  parameters: {
                    popcode: '@popcode'
                  },
                  outputs: {
                    actions: '@actions'
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
            delivered: {
              step: 'delivered',
              title: 'Delivered Parent',
              screen: 'Delivered',
              complete: [
                {
                  operation: 'navigate',
                  screen: 'Home',
                  resetStack: true,
                  forceUpdate: true
                }
              ]
            },
            'delivered.child': {
              step: 'delivered.child',
              title: 'Delivered Child',
              screen: 'ShowPopcode'
            },
            complete: {
              step: 'process.complete',
              title: 'Process Complete',
              screen: 'Completed'
            },
            'complete.child': {
              step: 'process.complete',
              title: 'Process Complete',
              screen: 'ShowPopcode'
            }
          },
          appOptions: {
            requireLogin: true
          },
          screens: {
            Home: {
              name: 'Home',
              title: 'Home',
              api: '/api/mobile',
              screenListItems: {
                fetchItems: '/allRootPopcodes',
                method: 'get',
                api: 'cayley',
                fetchParameters: {
                  workflowName: 'nttV2'
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
                  operation: 'fetch',
                  route: '/containerPopcode',
                  api: 'cayley',
                  method: 'get',
                  parameters: {
                    address: '@address'
                  },
                  outputs: {
                    container: '@popcodes[0]'
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
            'Vanning Children': {
              name: 'Vanning',
              title: 'Vanning',
              api: '/api/mobile',
              parameters: {
                popcode: '@popcode',
                user: '@user'
              },
              screenListItems: {
                fetchItems: '/p/bom',
                method: 'get',
                parameters: {
                  address: '@popcode.address'
                },
                itemDataTypes: {
                  popcode: 'object'
                },
                itemLabel: ['popcodeName'],
                itemActions: {
                  click: {
                    title: 'Click',
                    parameters: {
                      container: '@popcode',
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
                }
              }
            },
            'Arrived Children': {
              name: 'Arrived',
              title: 'Arrived',
              api: '/api/mobile',
              parameters: {
                popcode: '@popcode',
                user: '@user'
              },
              screenListItems: {
                fetchItems: '/p/bom',
                method: 'get',
                parameters: {
                  address: '@popcode.address'
                },
                itemDataTypes: {
                  popcode: 'object'
                },
                itemLabel: ['popcodeName'],
                itemActions: {
                  click: {
                    title: 'Click',
                    parameters: {
                      container: '@popcode',
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
                }
              }
            },
            Vanning: {
              name: 'Vanning',
              title: 'Vanning',
              api: '/api/mobile',
              parameters: {
                container: '@container',
                popcode: '@popcode',
                user: '@user'
              },
              outputs: {
                popcode: '@container'
              },
              screenForm: {
                options: {
                  auto: 'labels'
                },
                fields: {
                  type: 'object',
                  description: 'Vanning',
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
                    workflowData: {
                      type: 'object',
                      properties: {
                        loadingStatus: {
                          type: 'boolean',
                          options: {
                            editable: true
                          }
                        },
                        vanningNotes: {
                          type: 'string',
                          options: {
                            editable: true
                          }
                        }
                      },
                      required: ['loadingStatus']
                    }
                  },
                  required: ['popcode', 'workflowData']
                }
              },
              screenButtons: {
                ok: {
                  title: 'Ok',
                  action: [
                    {
                      operation: 'contract',
                      contract: 'vanningChildOk',
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
            Shipping: {
              name: 'Shipping',
              title: 'Shipping',
              api: '/api/mobile',
              parameters: {
                container: '@container',
                popcode: '@popcode',
                user: '@user'
              },
              outputs: {
                popcode: '@container'
              },
              screenForm: {
                options: {
                  auto: 'labels'
                },
                fields: {
                  type: 'object',
                  description: 'Shipping',
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
                    workflowData: {
                      type: 'object',
                      properties: {
                        shippingComplete: {
                          type: 'boolean',
                          options: {
                            editable: true
                          }
                        },
                        trackingNumber: {
                          type: 'string',
                          options: {
                            editable: true
                          }
                        },
                        shippingNotes: {
                          type: 'string',
                          options: {
                            editable: true
                          }
                        }
                      },
                      required: ['shippingComplete']
                    }
                  },
                  required: ['popcode', 'workflowData']
                }
              },
              screenButtons: {
                ok: {
                  title: 'Ok',
                  action: [
                    {
                      operation: 'contract',
                      contract: 'shippingOk',
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
            TerminalIn: {
              name: 'TerminalIn',
              title: 'TerminalIn',
              api: '/api/mobile',
              parameters: {
                container: '@container',
                popcode: '@popcode',
                user: '@user'
              },
              outputs: {
                popcode: '@container'
              },
              screenForm: {
                options: {
                  auto: 'labels'
                },
                fields: {
                  type: 'object',
                  description: 'Terminal In',
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
                    workflowData: {
                      type: 'object',
                      properties: {
                        terminalInComplete: {
                          type: 'boolean',
                          options: {
                            editable: true
                          }
                        },
                        terminalInNotes: {
                          type: 'string',
                          options: {
                            editable: true
                          }
                        }
                      },
                      required: ['terminalInComplete']
                    }
                  },
                  required: ['popcode', 'workflowData']
                }
              },
              screenButtons: {
                ok: {
                  title: 'Ok',
                  action: [
                    {
                      operation: 'contract',
                      contract: 'terminalInOk',
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
            Arrival: {
              name: 'Arrival',
              title: 'Arrival',
              api: '/api/mobile',
              parameters: {
                container: '@container',
                popcode: '@popcode',
                user: '@user'
              },
              outputs: {
                popcode: '@container'
              },
              screenForm: {
                options: {
                  auto: 'labels'
                },
                fields: {
                  type: 'object',
                  description: 'Arrival',
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
                    workflowData: {
                      type: 'object',
                      properties: {
                        arrivalComplete: {
                          type: 'boolean',
                          options: {
                            editable: true
                          }
                        },
                        arrivalNotes: {
                          type: 'string',
                          options: {
                            editable: true
                          }
                        }
                      },
                      required: ['arrivalComplete']
                    }
                  },
                  required: ['popcode', 'workflowData']
                }
              },
              screenButtons: {
                ok: {
                  title: 'Ok',
                  action: [
                    {
                      operation: 'contract',
                      contract: 'arrivalChildOk',
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
            Delivered: {
              name: 'Delivered',
              title: 'Delivered',
              api: '/api/mobile',
              parameters: {
                container: '@container',
                popcode: '@popcode',
                user: '@user'
              },
              outputs: {
                popcode: '@container'
              },
              screenForm: {
                options: {
                  auto: 'labels'
                },
                fields: {
                  type: 'object',
                  description: 'Delivered',
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
                    workflowData: {
                      type: 'object',
                      properties: {
                        deliveredComplete: {
                          type: 'boolean',
                          options: {
                            editable: true
                          }
                        },
                        deliveredNotes: {
                          type: 'string',
                          options: {
                            editable: true
                          }
                        }
                      },
                      required: ['deliveredComplete']
                    }
                  },
                  required: ['popcode', 'workflowData']
                }
              },
              screenButtons: {
                ok: {
                  title: 'Ok',
                  action: [
                    {
                      operation: 'contract',
                      contract: 'deliveredOk',
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
            },
            ShowPopcode: {
              name: 'ShowPopcode',
              title: 'Popcode',
              api: '/api/mobile',
              parameters: {
                popcode: '@popcode'
              },
              screenForm: {
                fields: {
                  type: 'object',
                  properties: {
                    'Popcode Name': {
                      type: 'string',
                      value: '@popcode.popcodeName'
                    },
                    'Popcode Address': {
                      type: 'string',
                      value: '@popcode.address'
                    },
                    currentState: {
                      type: 'string',
                      value: '@popcode.spot',
                      options: {
                        editable: false
                      }
                    }
                  },
                  required: ['Popcode Name', 'Popcode Address', 'currentState']
                }
              },
              screenButtons: {
                ok: {
                  title: 'Ok',
                  action: []
                }
              }
            },
            Error: {
              name: 'Error',
              api: '/api/mobile',
              screenButtons: {
                ok: {
                  action: '^Home',
                  title: 'Ok'
                }
              },
              screenForm: {
                fields: {
                  type: 'object',
                  properties: {
                    status: {
                      type: 'string',
                      value: '@status'
                    },
                    error: {
                      type: 'string',
                      value: '@error'
                    }
                  },
                  required: ['status', 'error']
                }
              },
              parameters: {
                error: '@error',
                status: '@status'
              },
              title: 'Error'
            }
          },
          contractLib: {
            name: 'NTT SmartContract Library',
            version: '2.1',
            slug: 'nttd_2_1',
            libs: [
              'base64_Y2xhc3MgU21hcnRDb250cmFjdEJhc2UgewogIGNvbnN0cnVjdG9yKGhvb2tzKSB7CiAgICAgIHRoaXMuaG9va3MgPSBob29rczsKICAgICAgdGhpcy5zdGF0ZSA9IGhvb2tzLnN0YXRlOwogICAgICB0aGlzLmRlYnVnTG9nID0gaG9va3MuZGVidWdMb2c7CiAgICAgIHRoaXMuZGVidWdMb2coJ2NvbnN0cnVjdCBTbWFydENvbnRyYWN0QmFzZScpOwogIH0KICBhc3luYyBiYWxhbmNlKGFkZHJlc3MpIHsKICAgIHZhciBhcGkgPSB0aGlzLmhvb2tzLnN0YWNrLmFwaTsKICAgIHZhciB1cmwgPSAnL3AvYmFsYW5jZS8nICsgYWRkcmVzczsKICAgIGNvbnN0IHJlcyA9IGF3YWl0IGFwaS5nZXQodXJsKTsKICAgIHJldHVybiByZXMuYm9keTsKICB9CiAgYXN5bmMgZ2VuUG9wY29kZShhZGRyZXNzKSB7CiAgICB2YXIgYXBpID0gdGhpcy5ob29rcy5zdGFjay5hcGk7CiAgICB2YXIgdXJsID0gJy9wL2dlbmVyYXRlJzsKICAgIGNvbnN0IHJlcyA9IGF3YWl0IGFwaS5nZXQodXJsKTsKICAgIHJldHVybiByZXMuYm9keTsKICB9CiAgYXN5bmMgY29udGFpbmVyUG9wY29kZShhZGRyZXNzKSB7CiAgICB2YXIgYXBpID0gdGhpcy5ob29rcy5zdGFjay5hcGlDYXlsZXk7CiAgICB2YXIgdXJsID0gJy9jb250YWluZXJQb3Bjb2RlLycgKyBhZGRyZXNzOwogICAgY29uc3QgcmVzID0gYXdhaXQgYXBpLmdldCh1cmwpOwogICAgcmV0dXJuIHJlcy5ib2R5OwogIH0KICBhc3luYyBib21Qb3Bjb2RlcyhhZGRyZXNzKSB7CiAgICB2YXIgYXBpID0gdGhpcy5ob29rcy5zdGFjay5hcGlDYXlsZXk7CiAgICB2YXIgdXJsID0gJy9ib21Qb3Bjb2Rlcy8nICsgYWRkcmVzczsKICAgIGNvbnN0IHJlcyA9IGF3YWl0IGFwaS5nZXQodXJsKTsKICAgIHJldHVybiByZXMuYm9keTsKICB9CiAgYXN5bmMgc2lnbk1lc3NhZ2UoZmllbGRzLHByaXZhdGVLZXkpIHsKICAgIHZhciBhcGkgPSB0aGlzLmhvb2tzLnN0YWNrLmFwaTsKICAgIHZhciBib2R5ID0gewogICAgICBmaWVsZHMsCiAgICAgIHByaXZhdGVLZXkKICAgIH07CiAgICB2YXIgdXJsID0gJy9jcnlwdG8vc2lnbk1lc3NhZ2UnOwogICAgY29uc3QgcmVzID0gYXdhaXQgYXBpLnBvc3QodXJsLCB7Ym9keX0pOwogICAgcmV0dXJuIHJlcy5ib2R5OwogIH0KICBhc3luYyBibG9iQ3JlYXRlV2l0aFNpZyhzaWcsYWRkcmVzcyxkYXRhLHB1YmxpY0tleSkgewogICAgdmFyIGFwaSA9IHRoaXMuaG9va3Muc3RhY2suYXBpOwogICAgdmFyIGJvZHkgPSB7CiAgICAgIHNpZywKICAgICAgYWRkcmVzcywKICAgICAgcHVibGljS2V5LAogICAgICBkYXRhCiAgICB9OwogICAgdmFyIHVybCA9ICcvcC9ibG9iQ3JlYXRlV2l0aFNpZyc7CiAgICBjb25zdCByZXMgPSBhd2FpdCBhcGkucG9zdCh1cmwsIHtib2R5fSk7CiAgICByZXR1cm4gcmVzLmJvZHk7CiAgfQogIGFzeW5jIGJsb2JDcmVhdGUoYWRkcmVzcyxkYXRhLHB1YmxpY0tleSxwcml2YXRlS2V5KSB7CiAgICB2YXIgZmllbGRzID0gW107CgogICAgdmFyIHJlcyA9IGF3YWl0IHRoaXMuYmFsYW5jZShhZGRyZXNzKTsKICAgIGZpZWxkcy5wdXNoKHJlcy5iYWxhbmNlLkNvdW50ZXIpOwogICAgZmllbGRzLnB1c2goYWRkcmVzcyk7CiAgICBmaWVsZHMucHVzaChkYXRhKTsKCiAgICByZXMgPSBhd2FpdCB0aGlzLnNpZ25NZXNzYWdlKGZpZWxkcyxwcml2YXRlS2V5KTsKCiAgICByZXMgPSBhd2FpdCB0aGlzLmJsb2JDcmVhdGVXaXRoU2lnKHJlcy5zaWcsYWRkcmVzcyxkYXRhLHB1YmxpY0tleSk7CgogICAgcmV0dXJuIHJlcy5ib2R5OwogIH0KICBhc3luYyBtaW50Q3JlYXRlV2l0aFNpZyhzaWcsYWRkcmVzcyxkYXRhLHB1YmxpY0tleSxhbW91bnQsdW5pdCkgewogICAgdmFyIGFwaSA9IHRoaXMuaG9va3Muc3RhY2suYXBpOwogICAgdmFyIGJvZHkgPSB7CiAgICAgIHNpZywKICAgICAgYWRkcmVzcywKICAgICAgcHVibGljS2V5LAogICAgICBhbW91bnQsCiAgICAgIHVuaXQsCiAgICAgIGRhdGEKICAgIH07CiAgICB2YXIgdXJsID0gJy9wL21pbnQnOwogICAgY29uc3QgcmVzID0gYXdhaXQgYXBpLnBvc3QodXJsLCB7Ym9keX0pOwogICAgcmV0dXJuIHJlczsKICB9CiAgYXN5bmMgbWludENyZWF0ZShhZGRyZXNzLGRhdGEscHVibGljS2V5LHByaXZhdGVLZXkpIHsKICAgIHZhciBmaWVsZHMgPSBbXTsKICAgIHZhciBhbW91bnQgPSAxOwogICAgdmFyIHVuaXQgPSAnY29udGFpbmVyJzsKCiAgICB2YXIgeyBiYWxhbmNlIH0gPSBhd2FpdCB0aGlzLmJhbGFuY2UoYWRkcmVzcyk7CiAgICAvLyB0aGlzLmRlYnVnTG9nKCcjIyMjIyMjIyMjIyMjIyMjIGJhbGFuY2UuQ291bnRlcjogJyArIGJhbGFuY2UuQ291bnRlcik7CiAgICBmaWVsZHMucHVzaChiYWxhbmNlLkNvdW50ZXIpOwogICAgZmllbGRzLnB1c2goYWRkcmVzcyk7CiAgICBmaWVsZHMucHVzaChhbW91bnQpOwogICAgZmllbGRzLnB1c2godW5pdCk7CiAgICBmaWVsZHMucHVzaChkYXRhKTsKCiAgICB2YXIgeyBzaWcgfSA9IGF3YWl0IHRoaXMuc2lnbk1lc3NhZ2UoZmllbGRzLHByaXZhdGVLZXkpOwoKICAgIHZhciByZXMgPSBhd2FpdCB0aGlzLm1pbnRDcmVhdGVXaXRoU2lnKHNpZyxhZGRyZXNzLGRhdGEscHVibGljS2V5LGFtb3VudCx1bml0KTsKCiAgICByZXR1cm4gcmVzOwogIH0KfTsK',
              'base64_dmFyIGNyZWF0ZUJsb2JBY3Rpb25zID0gewogICAgICAgICAgImFjdGlvbiI6IFsKICAgICAgICAgICAgewogICAgICAgICAgICAgICJvcGVyYXRpb24iOiAiZmV0Y2giLAogICAgICAgICAgICAgICJyb3V0ZSI6ICIvcC9iYWxhbmNlIiwKICAgICAgICAgICAgICAibWV0aG9kIjogImdldCIsCiAgICAgICAgICAgICAgInBhcmFtZXRlcnMiOiB7CiAgICAgICAgICAgICAgICAiYWRkcmVzcyI6ICJAcG9wY29kZS5hZGRyZXNzIgogICAgICAgICAgICAgIH0sCiAgICAgICAgICAgICAgIm91dHB1dHMiOiB7CiAgICAgICAgICAgICAgICAiYmFsYW5jZSI6ICJAYmFsYW5jZSIKICAgICAgICAgICAgICB9CiAgICAgICAgICAgIH0sCiAgICAgICAgICAgIHsKICAgICAgICAgICAgICAib3BlcmF0aW9uIjogImZldGNoIiwKICAgICAgICAgICAgICAicm91dGUiOiAiL2NyeXB0by9zaWduTWVzc2FnZSIsCiAgICAgICAgICAgICAgIm1ldGhvZCI6ICJwb3N0IiwKICAgICAgICAgICAgICAicGFyYW1ldGVycyI6IHsKICAgICAgICAgICAgICAgICJmaWVsZHMiOiBbCiAgICAgICAgICAgICAgICAgICJAYmFsYW5jZS5Db3VudGVyIiwKICAgICAgICAgICAgICAgICAgIkBwb3Bjb2RlLmFkZHJlc3MiCiAgICAgICAgICAgICAgICAgXSwKICAgICAgICAgICAgICAgICAicHJpdmF0ZUtleSI6ICJAdXNlci5wcml2YXRlS2V5IgogICAgICAgICAgICAgIH0sCiAgICAgICAgICAgICAgIm91dHB1dHMiOiB7CiAgICAgICAgICAgICAgICAic2lnIjogIkBzaWciCiAgICAgICAgICAgICAgfQogICAgICAgICAgICB9LAogICAgICAgICAgICB7CiAgICAgICAgICAgICAgIm9wZXJhdGlvbiI6ICJmZXRjaCIsCiAgICAgICAgICAgICAgInJvdXRlIjogIi9wL2Jsb2JDcmVhdGVXaXRoU2lnIiwKICAgICAgICAgICAgICAibWV0aG9kIjogImJsb2JDcmVhdGVXaXRoU2lnIiwKICAgICAgICAgICAgICAicGFyYW1ldGVycyI6IHsKICAgICAgICAgICAgICAgICJzaWciOiAiQHNpZyIsCiAgICAgICAgICAgICAgICAiYWRkcmVzcyI6ICJAcG9wY29kZS5hZGRyZXNzIiwKICAgICAgICAgICAgICAgICJwdWJsaWNLZXkiOiAiQHVzZXIucHVibGljS2V5IiwKICAgICAgICAgICAgICAgICJkYXRhIjogewogICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgIH0sCiAgICAgICAgICAgICAgIm91dHB1dHMiOiB7CiAgICAgICAgICAgICAgICAic3RhdHVzIjogIkBzdGF0dXMiLAogICAgICAgICAgICAgICAgInR4SWQiOiAiQHR4SWQiCiAgICAgICAgICAgICAgfQogICAgICAgICAgICB9CiAgICAgICAgICBdCn07CmNsYXNzIFNtYXJ0Q29udHJhY3QgZXh0ZW5kcyBTbWFydENvbnRyYWN0QmFzZSB7CiAgY29uc3RydWN0b3IoaG9va3MpIHsKICAgICAgc3VwZXIoaG9va3MpCiAgICAgIHRoaXMuZGVidWdMb2coJyoqKioqKioqKioqKioqIFNtYXJ0Q29udHJhY3QnKTsKICB9CgogIGFzeW5jIGVjaG8oKSB7CiAgICAgIHRoaXMuZGVidWdMb2coJ2VjaG8nKTsKICAgICAgdmFyIHJ2YWwgPSB7CiAgICAgICAgICBkYXRhOiAnaGVsbG8nCiAgICAgIH07CiAgICAgIHRoaXMuaG9va3MuZmluaXNoLnJlc29sdmUocnZhbCk7CiAgfQoKICBhc3luYyB2YW5uaW5nQ2hpbGRPaygpIHsgcmV0dXJuIGF3YWl0IHRoaXMuY2hpbGRPaygndmFubmluZ0NoaWxkJywgJ3NoaXBwaW5nLmNoaWxkJywgJ1Zhbm5pbmcnKTsgfQogIGFzeW5jIGFycml2YWxDaGlsZE9rKCkgeyByZXR1cm4gYXdhaXQgdGhpcy5jaGlsZE9rKCdhcnJpdmFsQ2hpbGQnLCAnZGVsaXZlcmVkLmNoaWxkJywgJ0Fycml2YWwnKTsgfQoKICBhc3luYyBjaGlsZE9rKGxhc3RTcG90LCBuZXh0U3BvdCwgc3RlcFRpdGxlKSB7CiAgICAgIHRoaXMuZGVidWdMb2coJ2V4ZWN1dGUgY2hpbGRPaycpOwoKICAgICAgdmFyIHBvcGNvZGUgPSB0aGlzLnN0YXRlLnBvcGNvZGU7CiAgICAgIHZhciBhZGRyZXNzID0gcG9wY29kZS5hZGRyZXNzOwogICAgICB2YXIgYXBwID0gdGhpcy5ob29rcy5hcHA7CiAgICAgIHZhciB1c2VyQ3JlZGVudGlhbHMgPSBhcHAuZ2V0QXBwU3RhdGUoJ3VzZXJDcmVkZW50aWFscycpOwogICAgICB2YXIgcHVibGljS2V5ID0gdXNlckNyZWRlbnRpYWxzLnB1YmxpY0tleTsKICAgICAgdmFyIHByaXZhdGVLZXkgPSB1c2VyQ3JlZGVudGlhbHMucHJpdmF0ZUtleTsKCiAgICAgIHZhciBkYXRhID0KICAgICAgICAgIHsKICAgICAgICAgICAgImFwcERhdGEiOiB7CiAgICAgICAgICAgICAgInN0ZXBOYW1lIjogbGFzdFNwb3QsCiAgICAgICAgICAgICAgc3RlcFRpdGxlLAogICAgICAgICAgICAgICJ3b3JrZmxvd0RhdGEiOiB0aGlzLnN0YXRlLmZvcm0ud29ya2Zsb3dEYXRhLAogICAgICAgICAgICAgICJzcG90IjogbmV4dFNwb3QKICAgICAgICAgICAgfQogICAgICAgICAgfTsKCiAgICAgIHRoaXMuZGVidWdMb2coJ2Jsb2JEYXRhJyk7CiAgICAgIHRoaXMuZGVidWdMb2coZGF0YSk7CgogICAgICB2YXIgcmVzID0gYXdhaXQgdGhpcy5ibG9iQ3JlYXRlKGFkZHJlc3MsZGF0YSxwdWJsaWNLZXkscHJpdmF0ZUtleSk7CgogICAgICB2YXIgcnZhbCA9IHsKICAgICAgICAgIGFjdGlvbjogW10KICAgICAgfTsKICAgICAgdGhpcy5ob29rcy5maW5pc2gucmVzb2x2ZShydmFsKTsKICB9CgogIGFzeW5jIHZhbm5pbmdDaGlsZENvbXBsZXRlKCkgeyByZXR1cm4gYXdhaXQgdGhpcy5jaGlsZENvbXBsZXRlKCdzaGlwcGluZy5jaGlsZCcsICdzaGlwcGluZycsICd2YW5uaW5nQ2hpbGRDb21wbGV0ZScsICdWYW5uaW5nIENvbXBsZXRlJyk7IH0KICBhc3luYyBhcnJpdmFsQ2hpbGRDb21wbGV0ZSgpIHsgcmV0dXJuIGF3YWl0IHRoaXMuY2hpbGRDb21wbGV0ZSgnZGVsaXZlcmVkLmNoaWxkJywgJ2RlbGl2ZXJlZCcsICdhcnJpdmFsQ2hpbGRDb21wbGV0ZScsICdBcnJpdmFsIENvbXBsZXRlJyk7IH0KCiAgYXN5bmMgY2hpbGRDb21wbGV0ZShsYXN0U3BvdCwgbmV4dFNwb3QsIHN0ZXBOYW1lLCBzdGVwVGl0bGUpIHsKICAgICAgdGhpcy5kZWJ1Z0xvZygnZXhlY3V0ZSBjaGlsZENvbXBsZXRlJyk7CiAgICAgIHZhciBfID0gdGhpcy5ob29rcy5fOwogICAgICB2YXIgc3MgPSB0aGlzLmhvb2tzLnNjcmVlblN0YXRlOwogICAgICB0aGlzLmRlYnVnTG9nKHRoaXMuc3RhdGUpOwogICAgICB2YXIgaXNDb21wbGV0ZSA9IGZhbHNlOwoKICAgICAgaWYoIV8uaXNOaWwodGhpcy5zdGF0ZS5wb3Bjb2RlKSkgewogICAgICAgIHZhciBwb3Bjb2RlID0gdGhpcy5zdGF0ZS5wb3Bjb2RlOwogICAgICAgIHRoaXMuZGVidWdMb2coJ25hbWU6ICcgKyBwb3Bjb2RlLnBvcGNvZGVOYW1lKTsKICAgICAgICB0aGlzLmRlYnVnTG9nKCdhZGRyZXNzOiAnICsgcG9wY29kZS5hZGRyZXNzKTsKCiAgICAgICAgdGhpcy5kZWJ1Z0xvZygnY2FsbCBib21Qb3Bjb2Rlcy4uLicpOwogICAgICAgIHZhciByZXMgPSBhd2FpdCB0aGlzLmJvbVBvcGNvZGVzKHBvcGNvZGUuYWRkcmVzcyk7CgogICAgICAgIHRoaXMuZGVidWdMb2coJ3Jlc3VsdDonKTsKICAgICAgICB0aGlzLmRlYnVnTG9nKHJlcyk7CgoKICAgICAgICBpZihfLmlzQXJyYXkocmVzLnBvcGNvZGVzKSkgewogICAgICAgICAgdmFyIG4gPSAwOwogICAgICAgICAgZm9yKGxldCBjaGlsZCBvZiByZXMucG9wY29kZXMpIHsKICAgICAgICAgICAgdmFyIHNwb3QgPSBzcy5nZXRXb3JrZmxvd1Nwb3QoY2hpbGQpOwogICAgICAgICAgICB0aGlzLmRlYnVnTG9nKHNwb3QpOwogICAgICAgICAgICBpZihzcG90ID09PSBsYXN0U3BvdCkgewogICAgICAgICAgICAgIG4rKzsKICAgICAgICAgICAgfQogICAgICAgICAgfQogICAgICAgICAgaWYobiA9PT0gcmVzLnBvcGNvZGVzLmxlbmd0aCkKICAgICAgICAgICAgaXNDb21wbGV0ZSA9IHRydWU7CiAgICAgICAgfQogICAgICB9CgogICAgICB0aGlzLmRlYnVnTG9nKCdpc0NvbXBsZXRlOiAnICsgaXNDb21wbGV0ZSk7CgogICAgICB2YXIgcnZhbCA9IHsKICAgICAgICBpc0NvbXBsZXRlCiAgICAgIH07CgogICAgICBpZihpc0NvbXBsZXRlKSB7CiAgICAgICAgdmFyIHBvcGNvZGUgPSB0aGlzLnN0YXRlLnBvcGNvZGU7CiAgICAgICAgdmFyIGFkZHJlc3MgPSBwb3Bjb2RlLmFkZHJlc3M7CiAgICAgICAgdmFyIGFwcCA9IHRoaXMuaG9va3MuYXBwOwogICAgICAgIHZhciB1c2VyQ3JlZGVudGlhbHMgPSBhcHAuZ2V0QXBwU3RhdGUoJ3VzZXJDcmVkZW50aWFscycpOwogICAgICAgIHZhciBwdWJsaWNLZXkgPSB1c2VyQ3JlZGVudGlhbHMucHVibGljS2V5OwogICAgICAgIHZhciBwcml2YXRlS2V5ID0gdXNlckNyZWRlbnRpYWxzLnByaXZhdGVLZXk7CiAgICAgICAgdmFyIGRhdGEgPQogICAgICAgICAgewogICAgICAgICAgICAiYXBwRGF0YSI6IHsKICAgICAgICAgICAgICBzdGVwTmFtZSwKICAgICAgICAgICAgICBzdGVwVGl0bGUsCiAgICAgICAgICAgICAgInNwb3QiOiBuZXh0U3BvdAogICAgICAgICAgICB9CiAgICAgICAgICB9OwogICAgICAgIHZhciByZXMgPSBhd2FpdCB0aGlzLmJsb2JDcmVhdGUoYWRkcmVzcyxkYXRhLHB1YmxpY0tleSxwcml2YXRlS2V5KTsKICAgICAgICBydmFsLnJlcyA9IHJlczsKICAgICAgfQoKCiAgICAgIHRoaXMuaG9va3MuZmluaXNoLnJlc29sdmUocnZhbCk7CiAgfQoKICBhc3luYyBzaGlwcGluZ09rKCkgeyByZXR1cm4gYXdhaXQgdGhpcy5wYXJlbnRPaygnc2hpcHBpbmcnLCAndGVybWluYWxJbicsICd0ZXJtaW5hbEluLmNoaWxkJywgJ1NoaXBwaW5nJyk7IH0KICBhc3luYyB0ZXJtaW5hbEluT2soKSB7IHJldHVybiBhd2FpdCB0aGlzLnBhcmVudE9rKCd0ZXJtaW5hbEluJywgJ2Fycml2YWwnLCAnYXJyaXZhbC5jaGlsZCcsICdUZXJtaW5hbC1JbicpOyB9CiAgYXN5bmMgZGVsaXZlcmVkT2soKSB7IHJldHVybiBhd2FpdCB0aGlzLnBhcmVudE9rKCdkZWxpdmVyZWQnLCAnY29tcGxldGUnLCAnY29tcGxldGUuY2hpbGQnLCAnRGVsaXZlcmVkJyk7IH0KCiAgYXN5bmMgcGFyZW50T2sobGFzdFNwb3QsIHBhcmVudFNwb3QsIGNoaWxkU3BvdCwgc3RlcFRpdGxlKSB7CiAgICAgIHRoaXMuZGVidWdMb2coJ2V4ZWN1dGUgcGFyZW50T2snKTsKICAgICAgdmFyIF8gPSB0aGlzLmhvb2tzLl87CgogICAgICB2YXIgcG9wY29kZSA9IHRoaXMuc3RhdGUucG9wY29kZTsKICAgICAgdmFyIGFkZHJlc3MgPSBwb3Bjb2RlLmFkZHJlc3M7CiAgICAgIHZhciBhcHAgPSB0aGlzLmhvb2tzLmFwcDsKICAgICAgdmFyIHVzZXJDcmVkZW50aWFscyA9IGFwcC5nZXRBcHBTdGF0ZSgndXNlckNyZWRlbnRpYWxzJyk7CiAgICAgIHZhciBwdWJsaWNLZXkgPSB1c2VyQ3JlZGVudGlhbHMucHVibGljS2V5OwogICAgICB2YXIgcHJpdmF0ZUtleSA9IHVzZXJDcmVkZW50aWFscy5wcml2YXRlS2V5OwoKICAgICAgdmFyIGRhdGEgPQogICAgICAgICAgewogICAgICAgICAgICAiYXBwRGF0YSI6IHsKICAgICAgICAgICAgICAic3RlcE5hbWUiOiBsYXN0U3BvdCwKICAgICAgICAgICAgICBzdGVwVGl0bGUsCiAgICAgICAgICAgICAgIndvcmtmbG93RGF0YSI6IHRoaXMuc3RhdGUuZm9ybS53b3JrZmxvd0RhdGEsCiAgICAgICAgICAgICAgInNwb3QiOiBwYXJlbnRTcG90CiAgICAgICAgICAgIH0KICAgICAgICAgIH07CgogICAgICB0aGlzLmRlYnVnTG9nKCdibG9iRGF0YScpOwogICAgICB0aGlzLmRlYnVnTG9nKGRhdGEpOwoKICAgICAgdmFyIHJlcyA9IGF3YWl0IHRoaXMuYmxvYkNyZWF0ZShhZGRyZXNzLGRhdGEscHVibGljS2V5LHByaXZhdGVLZXkpOwoKICAgICAgdGhpcy5kZWJ1Z0xvZygnY2FsbCBib21Qb3Bjb2Rlcy4uLicpOwogICAgICB2YXIgcmVzID0gYXdhaXQgdGhpcy5ib21Qb3Bjb2Rlcyhwb3Bjb2RlLmFkZHJlc3MpOwoKICAgICAgdGhpcy5kZWJ1Z0xvZygncmVzdWx0OicpOwogICAgICB0aGlzLmRlYnVnTG9nKHJlcyk7CgoKICAgICAgaWYoXy5pc0FycmF5KHJlcy5wb3Bjb2RlcykpIHsKICAgICAgICBmb3IobGV0IHBvcGNvZGUyIG9mIHJlcy5wb3Bjb2RlcykgewogICAgICAgICAgdmFyIGFkZHJlc3MgPSBwb3Bjb2RlMi5hZGRyZXNzOwogICAgICAgICAgdmFyIGRhdGEgPQogICAgICAgICAgICB7CiAgICAgICAgICAgICAgImFwcERhdGEiOiB7CiAgICAgICAgICAgICAgICAic3BvdCI6IGNoaWxkU3BvdAogICAgICAgICAgICAgIH0KICAgICAgICAgICAgfTsKICAgICAgICAgIGF3YWl0IHRoaXMuYmxvYkNyZWF0ZShhZGRyZXNzLGRhdGEscHVibGljS2V5LHByaXZhdGVLZXkpOwogICAgICAgIH0KICAgICAgfQoKICAgICAgdmFyIHJ2YWwgPSB7CiAgICAgICAgICBhY3Rpb246IFtdCiAgICAgIH07CiAgICAgIHRoaXMuaG9va3MuZmluaXNoLnJlc29sdmUocnZhbCk7CiAgfQoKfTsK'
            ]
          }
        }
      },
      address: '1a5863ca30df1dbca096a276b806ed56c45c286e',
      createdAt: '1519675548494',
      date: '1519675548494',
      operation: 'mint',
      destCounter: 'PFmUO5WOCJY5Qx+4ktY4zw76WfDfEGUNC5HXaRXbios='
    },
    {
      id: '<c979828b7647215dba0d9b177ccf7d09620cc1cf87282038a42f9794e94a8c0f>',
      popcode: '<1a5863ca30df1dbca096a276b806ed56c45c286e>',
      spot: 'shipping.child',
      txId: 'c979828b7647215dba0d9b177ccf7d09620cc1cf87282038a42f9794e94a8c0f',
      data: {
        metadata: {
          appData: {
            stepName: 'vanningChild',
            stepTitle: 'Vanning',
            workflowData: {
              loadingStatus: true,
              vanningNotes: 'Child 1 is vanned'
            },
            spot: 'shipping.child'
          }
        }
      },
      type: 'transaction',
      sourceCounter: '70PpHAjw5nlbRkwTlqh/3PUbACBBpO0is3Em/9lVSdQ=',
      address: '1a5863ca30df1dbca096a276b806ed56c45c286e',
      createdAt: '1519675843199',
      date: '1519675843199',
      operation: 'blobCreate',
      destCounter: 'F2gXK+3g7Dlhc7K9+qkvitMg6UV2jAakIa//v1hns5I='
    },
    {
      id: '<170db8b0e848acbd4a1186f657a18fac015c74fcf2fcba9ea65aad9c258183f4>',
      popcode: '<1a5863ca30df1dbca096a276b806ed56c45c286e>',
      spot: 'terminalIn.child',
      txId: '170db8b0e848acbd4a1186f657a18fac015c74fcf2fcba9ea65aad9c258183f4',
      data: {
        metadata: {
          appData: {
            spot: 'terminalIn.child'
          }
        }
      },
      type: 'transaction',
      sourceCounter: '+iKUc0ff9TG7RUI7Li6NZcAsSWdpWIzZyI4xd59UPbc=',
      address: '1a5863ca30df1dbca096a276b806ed56c45c286e',
      createdAt: '1519675926883',
      date: '1519675926883',
      operation: 'blobCreate',
      destCounter: 'lBpYmQfInSlLtCi5fZlhnhrYH9FYar56otYA1cvUrRc='
    },
    {
      id: '<f5a20293b45eec9b4ddbd157eb62b4f9dcbf1e3a4114a535d4df3ccae781211e>',
      popcode: '<1a5863ca30df1dbca096a276b806ed56c45c286e>',
      spot: 'arrival.child',
      txId: 'f5a20293b45eec9b4ddbd157eb62b4f9dcbf1e3a4114a535d4df3ccae781211e',
      data: {
        metadata: {
          appData: {
            spot: 'arrival.child'
          }
        }
      },
      type: 'transaction',
      sourceCounter: 'qBDiVLzExD3p26c/F9KZ2KlPX6CWNlod7Ds3VeD6kzM=',
      address: '1a5863ca30df1dbca096a276b806ed56c45c286e',
      createdAt: '1519675980619',
      date: '1519675980619',
      operation: 'blobCreate',
      destCounter: 'VuY0zKXbvj05YNIkxWVoWYkRtxvHzyZ9mtrwSuZ+RGo='
    },
    {
      id: '<ee3f9067854f13340631e674b8b37b5b926ee93e61ba9c339e86aaf988859d2f>',
      popcode: '<1a5863ca30df1dbca096a276b806ed56c45c286e>',
      spot: 'delivered.child',
      txId: 'ee3f9067854f13340631e674b8b37b5b926ee93e61ba9c339e86aaf988859d2f',
      data: {
        metadata: {
          appData: {
            stepName: 'arrivalChild',
            stepTitle: 'Arrival',
            workflowData: {
              arrivalComplete: true,
              arrivalNotes: 'Pallet 1 arrived'
            },
            spot: 'delivered.child'
          }
        }
      },
      type: 'transaction',
      sourceCounter: 'y2Q+fjGoi0R+dL6CHuAwZ9j2Wll98tRPhRBUgVNzs5o=',
      address: '1a5863ca30df1dbca096a276b806ed56c45c286e',
      createdAt: '1519676008565',
      date: '1519676008565',
      operation: 'blobCreate',
      destCounter: 'iTVfIjKIlNE2CMH8vnZfB9crMeGaMc61YnC407XwJbI='
    },
    {
      id: '<ec145f617d448ab97ef4243408a791b3906b065f902321d0c03115bf37fadc5b>',
      popcode: '<1a5863ca30df1dbca096a276b806ed56c45c286e>',
      spot: 'complete.child',
      txId: 'ec145f617d448ab97ef4243408a791b3906b065f902321d0c03115bf37fadc5b',
      data: {
        metadata: {
          appData: {
            spot: 'complete.child'
          }
        }
      },
      type: 'transaction',
      sourceCounter: 'SR5VX2YOwSSdZ4wgucUMjb3VX7AQPKcLYZr2mT/9UEY=',
      address: '1a5863ca30df1dbca096a276b806ed56c45c286e',
      createdAt: '1519676064145',
      date: '1519676064145',
      operation: 'blobCreate',
      destCounter: 'PpMDbJi3zsHDVJUTY/156Jl5nSQlrZmsbG4XtmBBiuQ='
    }
  ],
  workflowName: 'nttV2',
  timestamp: 1519676064145,
  stepName: 'arrivalChild',
  stepTitle: 'Arrival',
  workflowData: {
    loadingStatus: true,
    vanningNotes: 'Child 1 is vanned',
    arrivalComplete: true,
    arrivalNotes: 'Pallet 1 arrived'
  }
};
