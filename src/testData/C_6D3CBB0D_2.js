export default {
  id: '<d5c2434aabd0b18c0344b8d6cda07e61e2c8ccc1>',
  workflowInstanceId: '44196A5A-738A-4CB1-9961-9FEF33067834',
  appData: {
    spot: 'complete.child',
    workflowName: 'nttV2',
    workflowInstanceId: '44196A5A-738A-4CB1-9961-9FEF33067834',
    workflowRootPopcode: 'false',
    popcodeName: 'C_6D3CBB0D_2',
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
    timestamp: 1519676070092,
    stepName: 'arrivalChild',
    stepTitle: 'Arrival',
    workflowData: {
      loadingStatus: true,
      vanningNotes: 'Child 2 is vanned',
      arrivalComplete: true,
      arrivalNotes: 'Pallet 2 arrived'
    }
  },
  publicKey: 'AzFSqglD2Tz0BHF7fyc5OZ0NYkqslptvM8W2ghgAjmAN',
  spot: 'complete.child',
  unit: 'PS4',
  bomContainer: '<9a98591fbb7db838073157e2e42747e0f45db059>',
  type: 'popcode',
  popcodeName: 'C_6D3CBB0D_2',
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
  address: 'd5c2434aabd0b18c0344b8d6cda07e61e2c8ccc1',
  workflowRootPopcode: 'false',
  transaction: [
    {
      id: '<b3a53a2624c4b03917ec39db71d37886adfa886ccf43dc9ec5f0938aa2175882>',
      popcode: '<d5c2434aabd0b18c0344b8d6cda07e61e2c8ccc1>',
      spot: 'vanning.child',
      unit: 'PS4',
      txId: 'b3a53a2624c4b03917ec39db71d37886adfa886ccf43dc9ec5f0938aa2175882',
      data: {
        metadata: {
          appData: {
            spot: 'vanning.child',
            workflowName: 'nttV2',
            workflowInstanceId: '44196A5A-738A-4CB1-9961-9FEF33067834',
            workflowRootPopcode: 'false',
            popcodeName: 'C_6D3CBB0D_2',
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
      sourceCounter: 'oc3xY2XemWZIhyuZFcrK9dR/+cVCe93kBjBboZn+A6A=',
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
      address: 'd5c2434aabd0b18c0344b8d6cda07e61e2c8ccc1',
      createdAt: '1519675552892',
      date: '1519675552892',
      operation: 'mint',
      destCounter: 'jULDBHjdf41d76pkPRyCsqcszUDstoH+ewTI/P4lixo='
    },
    {
      id: '<5cdac17f08964c5aa6c87bce269c805f1d871fe5c8f46d26bebdb30f1c52fd60>',
      popcode: '<d5c2434aabd0b18c0344b8d6cda07e61e2c8ccc1>',
      spot: 'shipping.child',
      txId: '5cdac17f08964c5aa6c87bce269c805f1d871fe5c8f46d26bebdb30f1c52fd60',
      data: {
        metadata: {
          appData: {
            stepName: 'vanningChild',
            stepTitle: 'Vanning',
            workflowData: {
              loadingStatus: true,
              vanningNotes: 'Child 2 is vanned'
            },
            spot: 'shipping.child'
          }
        }
      },
      type: 'transaction',
      sourceCounter: 'yl3U64nsywjGjdo+tY+ib7BedZYpOFopmz29U8OAQ84=',
      address: 'd5c2434aabd0b18c0344b8d6cda07e61e2c8ccc1',
      createdAt: '1519675871547',
      date: '1519675871547',
      operation: 'blobCreate',
      destCounter: 'Wq1uUhYgLL1yx9XJi+1glv4nuTSapeo1P6mDREX49CM='
    },
    {
      id: '<9b270836abbb1ded1af528ee07e4b18c5cd97cfdbf167abf88742ae91ef57e9e>',
      popcode: '<d5c2434aabd0b18c0344b8d6cda07e61e2c8ccc1>',
      spot: 'terminalIn.child',
      txId: '9b270836abbb1ded1af528ee07e4b18c5cd97cfdbf167abf88742ae91ef57e9e',
      data: {
        metadata: {
          appData: {
            spot: 'terminalIn.child'
          }
        }
      },
      type: 'transaction',
      sourceCounter: '+sK4A8rGDmU5u/0BOuYYVVRnpZb0bWTpDUw+i8UUbZU=',
      address: 'd5c2434aabd0b18c0344b8d6cda07e61e2c8ccc1',
      createdAt: '1519675932886',
      date: '1519675932886',
      operation: 'blobCreate',
      destCounter: 'Ygs474cw7U1v9wNwKuMD+Pw7ZlnTNFZK+3h2acLZMII='
    },
    {
      id: '<ef4d63f0cafc633251529af0c89f45967bb2c026e548cc875f60745f68dfaf87>',
      popcode: '<d5c2434aabd0b18c0344b8d6cda07e61e2c8ccc1>',
      spot: 'arrival.child',
      txId: 'ef4d63f0cafc633251529af0c89f45967bb2c026e548cc875f60745f68dfaf87',
      data: {
        metadata: {
          appData: {
            spot: 'arrival.child'
          }
        }
      },
      type: 'transaction',
      sourceCounter: 'nI6ndpa1rRWWCRkwvZywp1UkSkaheejhlyNvGy2ITxg=',
      address: 'd5c2434aabd0b18c0344b8d6cda07e61e2c8ccc1',
      createdAt: '1519675985420',
      date: '1519675985420',
      operation: 'blobCreate',
      destCounter: 'D4Ydsyv3T7ixeL/HC2jY1eBHpJF77qxHInRdJElr9sY='
    },
    {
      id: '<79980a525c18275275dc9a2369dcf61b32b72e33b4ece16b86c893fbb153fe3d>',
      popcode: '<d5c2434aabd0b18c0344b8d6cda07e61e2c8ccc1>',
      spot: 'delivered.child',
      txId: '79980a525c18275275dc9a2369dcf61b32b72e33b4ece16b86c893fbb153fe3d',
      data: {
        metadata: {
          appData: {
            stepName: 'arrivalChild',
            stepTitle: 'Arrival',
            workflowData: {
              arrivalComplete: true,
              arrivalNotes: 'Pallet 2 arrived'
            },
            spot: 'delivered.child'
          }
        }
      },
      type: 'transaction',
      sourceCounter: 'XCPxHA0TtFEmVG6tDawYlqfUSwpNx6BI5byOnoYTRPg=',
      address: 'd5c2434aabd0b18c0344b8d6cda07e61e2c8ccc1',
      createdAt: '1519676026903',
      date: '1519676026903',
      operation: 'blobCreate',
      destCounter: 'XHMAbVzu9ajuVslPP7IDUnymPhl2nJi+VqtE7Nwxydk='
    },
    {
      id: '<435dd3bce4536bb30d0c9ce0a0962521a1f0510ef98471b57c12f739669d462b>',
      popcode: '<d5c2434aabd0b18c0344b8d6cda07e61e2c8ccc1>',
      spot: 'complete.child',
      txId: '435dd3bce4536bb30d0c9ce0a0962521a1f0510ef98471b57c12f739669d462b',
      data: {
        metadata: {
          appData: {
            spot: 'complete.child'
          }
        }
      },
      type: 'transaction',
      sourceCounter: 'qDBVl1RahdtUS3F2R/sLhUcyifMFznROfkhBxGizZ0Y=',
      address: 'd5c2434aabd0b18c0344b8d6cda07e61e2c8ccc1',
      createdAt: '1519676070092',
      date: '1519676070092',
      operation: 'blobCreate',
      destCounter: 'Y0dGzDATdcCicp4QpZCNbTZ2v7BZG4lUmxMaJJcZb40='
    }
  ],
  workflowName: 'nttV2',
  timestamp: 1519676070092,
  stepName: 'arrivalChild',
  stepTitle: 'Arrival',
  workflowData: {
    loadingStatus: true,
    vanningNotes: 'Child 2 is vanned',
    arrivalComplete: true,
    arrivalNotes: 'Pallet 2 arrived'
  }
};
