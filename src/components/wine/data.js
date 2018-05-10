export const allPopcodes = [
    {
    "id": "<34baf20d6d7149f0472451911e91937762152480>",
    "workflowInstanceId": "FKX7YQETA",
    "appData": {
        "workflowData": {},
        "spot": "trucker.show",
        "wineBottles": 700,
        "wineUnit": "bottles of wine",
        "workflowName": "wineV1",
        "workflowInstanceId": "FKX7YQETA",
        "workflowRootPopcode": "true",
        "popcodeName": "Truck_PKETYWEVA",
        "workflowDef": {
            "title": "Wine V1",
            "name": "wineV1",
            "startScreen": "Home",
            "version": "2.0",
            "steps": {
                "winemaker.mint": {
                    "step": "winemaker.mint",
                    "title": "Winemaker Mint",
                    "screen": "WinemakerMint"
                },
                "trucker.pickup": {"step": "trucker.pickup", "title": "Trucker Pickup", "screen": "TruckerPickup"},
                "trucker.show": {"step": "trucker.show", "title": "Trucker Show", "screen": "TruckerShow"}
            },
            "appOptions": {"requireLogin": true},
            "screens": {
                "Home": {
                    "name": "Home",
                    "title": "Home",
                    "api": "/api/mobile",
                    "screenListItems": {
                        "fetchItems": "/popcodeByWorkflowName",
                        "method": "get",
                        "api": "cayley",
                        "fetchParameters": {"workflowName": "wineV1"},
                        "itemDataTypes": {"popcode": "object"},
                        "itemLabel": ["popcodeName"],
                        "itemActions": {
                            "click": {
                                "title": "Click",
                                "action": [{
                                    "operation": "startWorkflow",
                                    "replaceCurrent": true,
                                    "parameters": {"spot": "@popcode.spot", "popcode": "@popcode"}
                                }],
                                "parameters": {"popcode": "@item"}
                            }
                        }
                    },
                    "screenButtons": {
                        "scan": {
                            "title": "Scan",
                            "action": [{"operation": "navigate", "screen": "Scan"}],
                            "roles": ["admin", "winemaker", "trucker"]
                        },
                        "mint": {
                            "title": "Mint",
                            "action": [{"operation": "navigate", "resetStack": true, "screen": "WinemakerMint"}],
                            "roles": ["admin", "winemaker"]
                        }
                    }
                },
                "Scan": {
                    "name": "Scan",
                    "title": "Scan",
                    "api": "/api/mobile",
                    "parameters": {"user": "@user"},
                    "modal": false,
                    "screenScan": {},
                    "startAction": [{
                        "operation": "scanBarcode",
                        "barcodeTypes": ["qr", "code128"],
                        "outputs": {"scanData": "@scanData"}
                    }, {
                        "operation": "routePopcode",
                        "parameters": {"scanData": "@scanData"},
                        "outputs": {"address": "@address"}
                    }, {
                        "operation": "fetch",
                        "route": "/p",
                        "method": "get",
                        "parameters": {"address": "@address"},
                        "outputs": {"popcode": "@popcodes[0]"}
                    }, {
                        "operation": "startWorkflow",
                        "replaceCurrent": true,
                        "parameters": {"spot": "@popcode.spot", "popcode": "@popcode"}
                    }]
                },
                "WinemakerMint": {
                    "name": "WinemakerMint",
                    "title": "Winemaker Mint",
                    "api": "/api/mobile",
                    "parameters": {"container": "@container", "popcode": "@popcode", "user": "@user"},
                    "outputs": {"popcode": "@container"},
                    "screenForm": {
                        "fields": {
                            "type": "object",
                            "properties": {
                                "mintWineBottles": {
                                    "type": "object",
                                    "properties": {
                                        "Amount": {
                                            "type": "string",
                                            "value": "1000",
                                            "options": {"editable": true}
                                        },
                                        "Unit": {
                                            "type": "string",
                                            "value": "bottles of wine",
                                            "options": {"editable": true}
                                        }
                                    },
                                    "required": ["Amount", "Unit"]
                                }
                            },
                            "required": ["mintWineBottles"]
                        }, "options": {"auto": "labels"}
                    },
                    "screenButtons": {
                        "mint": {
                            "title": "Mint",
                            "action": [{
                                "operation": "contract",
                                "contract": "winemakerMintOk",
                                "parameters": {"popcode": "@popcode"},
                                "outputs": {"status": "@status", "txId": "@txId"}
                            }, {"operation": "navigate", "resetStack": true, "forceUpdate": true, "screen": "Home"}],
                            "roles": ["admin", "winemaker"]
                        },
                        "cancel": {
                            "title": "Cancel",
                            "action": [{"operation": "navigate", "resetStack": true, "screen": "Home"}]
                        }
                    }
                },
                "TruckerPickup": {
                    "name": "TruckerPickup",
                    "title": "Trucker Wine Pickup",
                    "api": "/api/mobile",
                    "parameters": {"container": "@container", "popcode": "@popcode", "user": "@user"},
                    "outputs": {"popcode": "@container"},
                    "tabs": {
                        "tab1": {
                            "title": "Pickup Wine",
                            "screenForm": {
                                "privateKey": ["winemaker", "admin"],
                                "publicKey": ["winemaker", "trucker", "admin"],
                                "fields": {
                                    "type": "object",
                                    "properties": {
                                        "popcode": {
                                            "type": "object",
                                            "properties": {
                                                "name": {
                                                    "type": "string",
                                                    "value": "@popcode.popcodeName",
                                                    "options": {"editable": false}
                                                },
                                                "address": {
                                                    "type": "string",
                                                    "value": "@popcode.address",
                                                    "options": {"editable": false}
                                                },
                                                "currentState": {
                                                    "type": "string",
                                                    "value": "@popcode.spot",
                                                    "options": {"editable": false}
                                                }
                                            },
                                            "required": ["name", "address", "currentState"]
                                        },
                                        "warehouseContents": {
                                            "type": "object",
                                            "properties": {
                                                "Amount": {
                                                    "type": "number",
                                                    "value": "@popcode.appData.wineBottles",
                                                    "options": {"editable": false}
                                                },
                                                "Unit": {
                                                    "type": "string",
                                                    "value": "@popcode.appData.wineUnit",
                                                    "options": {"editable": false}
                                                }
                                            }
                                        },
                                        "withdraw": {
                                            "type": "object",
                                            "properties": {
                                                "pickupAmount": {
                                                    "type": "number",
                                                    "options": {"editable": true}
                                                }
                                            },
                                            "required": ["pickupAmount"]
                                        }
                                    },
                                    "required": ["withdraw"]
                                },
                                "options": {"auto": "labels"}
                            }
                        }, "tab2": {"title": "Popcode Graph", "graphView": {"visName": "wine"}}
                    },
                    "screenButtons": {
                        "pickup": {
                            "title": "Pickup",
                            "action": [{
                                "operation": "contract",
                                "contract": "truckerPickupOk",
                                "parameters": {"popcode": "@popcode"},
                                "outputs": {"status": "@status", "txId": "@txId"}
                            }, {"operation": "navigate", "resetStack": true, "forceUpdate": true, "screen": "Home"}],
                            "roles": ["admin", "trucker"]
                        },
                        "cancel": {
                            "title": "Cancel",
                            "action": [{"operation": "navigate", "resetStack": true, "screen": "Home"}]
                        }
                    }
                },
                "TruckerShow": {
                    "name": "TruckerShow",
                    "title": "Truck Popcode",
                    "api": "/api/mobile",
                    "parameters": {"container": "@container", "popcode": "@popcode", "user": "@user"},
                    "outputs": {"popcode": "@container"},
                    "tabs": {
                        "tab1": {
                            "title": "Truck Contents",
                            "screenForm": {
                                "privateKey": ["trucker", "admin"],
                                "publicKey": ["winemaker", "trucker", "admin"],
                                "fields": {
                                    "type": "object",
                                    "properties": {
                                        "popcode": {
                                            "type": "object",
                                            "properties": {
                                                "name": {
                                                    "type": "string",
                                                    "value": "@popcode.popcodeName",
                                                    "options": {"editable": false}
                                                },
                                                "address": {
                                                    "type": "string",
                                                    "value": "@popcode.address",
                                                    "options": {"editable": false}
                                                },
                                                "currentState": {
                                                    "type": "string",
                                                    "value": "@popcode.spot",
                                                    "options": {"editable": false}
                                                }
                                            },
                                            "required": ["name", "address", "currentState"]
                                        },
                                        "truckContents": {
                                            "type": "object",
                                            "properties": {
                                                "Amount": {
                                                    "type": "number",
                                                    "value": "@popcode.appData.wineBottles",
                                                    "options": {"editable": false}
                                                },
                                                "Unit": {
                                                    "type": "string",
                                                    "value": "@popcode.appData.wineUnit",
                                                    "options": {"editable": false}
                                                }
                                            }
                                        }
                                    }
                                },
                                "options": {"auto": "labels"}
                            }
                        }, "tab2": {"title": "Popcode Graph", "graphView": {"visName": "wine"}}
                    },
                    "screenButtons": {
                        "ok": {
                            "title": "Ok",
                            "action": [{"operation": "navigate", "resetStack": true, "screen": "Home"}]
                        }
                    }
                }
            },
            "contractLib": {
                "name": "Wine SmartContract Library",
                "version": "1.0",
                "slug": "wine_1_0",
                "libs": ["base64_Y2xhc3MgU21hcnRDb250cmFjdEJhc2UgewogIGNvbnN0cnVjdG9yKGhvb2tzKSB7CiAgICAgIHRoaXMuaG9va3MgPSBob29rczsKICAgICAgdGhpcy5zdGF0ZSA9IGhvb2tzLnN0YXRlOwogICAgICB0aGlzLmRlYnVnTG9nID0gaG9va3MuZGVidWdMb2c7CiAgICAgIHRoaXMuZGVidWdMb2coJ2NvbnN0cnVjdCBTbWFydENvbnRyYWN0QmFzZScpOwogIH0KICBkZWJ1Z1NpemUobykgewogICAgdmFyIHMgPSBKU09OLnN0cmluZ2lmeShvKTsKICAgIHRoaXMuZGVidWdMb2coYHNpemU6ICR7cy5sZW5ndGgvMTAyNH0ga2ApOwogIH0KICBhc3luYyBieU5hbWUocE5hbWUpIHsKICAgIHZhciBhcGkgPSB0aGlzLmhvb2tzLnN0YWNrLmFwaTsKICAgIHZhciB1cmwgPSAnL3AvbmFtZS8nICsgcE5hbWU7CiAgICBjb25zdCByZXMgPSBhd2FpdCBhcGkuZ2V0KHVybCk7CiAgICByZXR1cm4gcmVzLmJvZHk7CiAgfQogIGFzeW5jIG9uZUJ5TmFtZShwTmFtZSkgewogICAgdmFyIF8gPSB0aGlzLmhvb2tzLl87CiAgICB2YXIgYXBpID0gdGhpcy5ob29rcy5zdGFjay5hcGk7CiAgICB2YXIgdXJsID0gJy9wL25hbWUvJyArIHBOYW1lOwogICAgY29uc3QgcmVzID0gYXdhaXQgYXBpLmdldCh1cmwpOwogICAgdmFyIHBvcGNvZGVzID0gIV8uaXNOaWwocmVzKQogICAgICYmICFfLmlzTmlsKHJlcy5ib2R5KQogICAgICYmICFfLmlzTmlsKHJlcy5ib2R5LnBvcGNvZGVzKSA/IHJlcy5ib2R5LnBvcGNvZGVzIDogbnVsbDsKICAgIHZhciBwb3Bjb2RlID0gXy5pc0FycmF5KHBvcGNvZGVzKSAmJiBwb3Bjb2Rlcy5sZW5ndGggPiAwCiAgICAgPyBwb3Bjb2Rlc1swXSA6IG51bGw7CiAgICByZXR1cm4gcG9wY29kZTsKICB9CiAgYXN5bmMgYmFsYW5jZShhZGRyZXNzKSB7CiAgICB2YXIgYXBpID0gdGhpcy5ob29rcy5zdGFjay5hcGk7CiAgICB2YXIgdXJsID0gJy9wL2JhbGFuY2UvJyArIGFkZHJlc3M7CiAgICBjb25zdCByZXMgPSBhd2FpdCBhcGkuZ2V0KHVybCk7CiAgICByZXR1cm4gcmVzLmJvZHk7CiAgfQogIGFzeW5jIGdlbmVyYXRlKCkgewogICAgdmFyIGFwaSA9IHRoaXMuaG9va3Muc3RhY2suYXBpOwogICAgdmFyIHVybCA9ICcvcC9nZW5lcmF0ZSc7CiAgICBjb25zdCByZXMgPSBhd2FpdCBhcGkuZ2V0KHVybCk7CiAgICByZXR1cm4gcmVzLmJvZHk7CiAgfQogIGFzeW5jIGNvbnRhaW5lclBvcGNvZGUoYWRkcmVzcykgewogICAgdmFyIGFwaSA9IHRoaXMuaG9va3Muc3RhY2suYXBpQ2F5bGV5OwogICAgdmFyIHVybCA9ICcvY29udGFpbmVyUG9wY29kZS8nICsgYWRkcmVzczsKICAgIGNvbnN0IHJlcyA9IGF3YWl0IGFwaS5nZXQodXJsKTsKICAgIHJldHVybiByZXMuYm9keTsKICB9CiAgYXN5bmMgYm9tUG9wY29kZXMoYWRkcmVzcykgewogICAgdmFyIGFwaSA9IHRoaXMuaG9va3Muc3RhY2suYXBpQ2F5bGV5OwogICAgdmFyIHVybCA9ICcvYm9tUG9wY29kZXMvJyArIGFkZHJlc3M7CiAgICBjb25zdCByZXMgPSBhd2FpdCBhcGkuZ2V0KHVybCk7CiAgICByZXR1cm4gcmVzLmJvZHk7CiAgfQogIGFzeW5jIHNpZ25NZXNzYWdlKGZpZWxkcyxwcml2YXRlS2V5KSB7CiAgICB2YXIgYXBpID0gdGhpcy5ob29rcy5zdGFjay5hcGk7CiAgICB2YXIgYm9keSA9IHsKICAgICAgZmllbGRzLAogICAgICBwcml2YXRlS2V5CiAgICB9OwogICAgdmFyIHVybCA9ICcvY3J5cHRvL3NpZ25NZXNzYWdlJzsKICAgIHRoaXMuZGVidWdMb2coJyoqKioqKioqKioqIHNpZ25NZXNzYWdlJyk7CiAgICB0aGlzLmRlYnVnTG9nKHtib2R5fSk7CiAgICBjb25zdCByZXMgPSBhd2FpdCBhcGkucG9zdCh1cmwsIHtib2R5fSk7CiAgICB0aGlzLmRlYnVnTG9nKHtib2R5OiByZXMuYm9keX0pOwogICAgcmV0dXJuIHJlcy5ib2R5OwogIH0KICBhc3luYyBibG9iQ3JlYXRlV2l0aFNpZyhzaWcsYWRkcmVzcyxkYXRhLHB1YmxpY0tleSkgewogICAgdmFyIGFwaSA9IHRoaXMuaG9va3Muc3RhY2suYXBpOwogICAgdmFyIGJvZHkgPSB7CiAgICAgIHNpZywKICAgICAgYWRkcmVzcywKICAgICAgcHVibGljS2V5LAogICAgICBkYXRhCiAgICB9OwogICAgdmFyIHVybCA9ICcvcC9ibG9iQ3JlYXRlV2l0aFNpZyc7CiAgICBjb25zdCByZXMgPSBhd2FpdCBhcGkucG9zdCh1cmwsIHtib2R5fSk7CiAgICByZXR1cm4gcmVzLmJvZHk7CiAgfQogIGFzeW5jIGJsb2JDcmVhdGUoYWRkcmVzcyxkYXRhLHB1YmxpY0tleSxwcml2YXRlS2V5KSB7CiAgICB2YXIgZmllbGRzID0gW107CgogICAgdmFyIHJlcyA9IGF3YWl0IHRoaXMuYmFsYW5jZShhZGRyZXNzKTsKICAgIGZpZWxkcy5wdXNoKHJlcy5iYWxhbmNlLkNvdW50ZXIpOwogICAgZmllbGRzLnB1c2goYWRkcmVzcyk7CiAgICBmaWVsZHMucHVzaChkYXRhKTsKCiAgICByZXMgPSBhd2FpdCB0aGlzLnNpZ25NZXNzYWdlKGZpZWxkcyxwcml2YXRlS2V5KTsKCiAgICByZXMgPSBhd2FpdCB0aGlzLmJsb2JDcmVhdGVXaXRoU2lnKHJlcy5zaWcsYWRkcmVzcyxkYXRhLHB1YmxpY0tleSk7CgogICAgcmV0dXJuIHJlczsKICB9CiAgYXN5bmMgbWludChzaWcsYWRkcmVzcyxkYXRhLHB1YmxpY0tleSxhbW91bnQsdW5pdCkgewogICAgdmFyIGFwaSA9IHRoaXMuaG9va3Muc3RhY2suYXBpOwogICAgdmFyIGJvZHkgPSB7CiAgICAgIHNpZywKICAgICAgYWRkcmVzcywKICAgICAgcHVibGljS2V5LAogICAgICBhbW91bnQsCiAgICAgIHVuaXQsCiAgICAgIGRhdGEKICAgIH07CiAgICB0aGlzLmRlYnVnTG9nKCcqKioqKioqKioqKiBkbyBtaW50Jyk7CiAgICB0aGlzLmRlYnVnTG9nKHtib2R5fSk7CiAgICB0aGlzLmRlYnVnTG9nKHthcGl9KTsKICAgIHRoaXMuZGVidWdTaXplKGJvZHkpOwogICAgdmFyIHVybCA9ICcvcC9taW50JzsKICAgIGNvbnN0IHJlcyA9IGF3YWl0IGFwaS5wb3N0KHVybCwge2JvZHl9KTsKICAgIHRoaXMuZGVidWdMb2coJyoqKioqKioqKioqIG1pbnQgcmVzdWx0Jyk7CiAgICB0aGlzLmRlYnVnTG9nKHJlcyk7CiAgICByZXR1cm4gcmVzOwogIH0KICBhc3luYyBzaWduQW5kTWludChhZGRyZXNzLGRhdGEscHVibGljS2V5LGFtb3VudCx1bml0LHByaXZhdGVLZXkpIHsKICAgIHRoaXMuZGVidWdMb2coJ3NpZ25BbmRNaW50Jyk7CiAgICB0aGlzLmRlYnVnTG9nKHthZGRyZXNzLGRhdGEscHVibGljS2V5LGFtb3VudCx1bml0LHByaXZhdGVLZXl9KTsKICAgIHZhciBmaWVsZHMgPSBbXTsKICAgIHZhciB7IGJhbGFuY2UgfSA9IGF3YWl0IHRoaXMuYmFsYW5jZShhZGRyZXNzKTsKICAgIC8vIHRoaXMuZGVidWdMb2coJyMjIyMjIyMjIyMjIyMjIyMgYmFsYW5jZS5Db3VudGVyOiAnICsgYmFsYW5jZS5Db3VudGVyKTsKICAgIGZpZWxkcy5wdXNoKGJhbGFuY2UuQ291bnRlcik7CiAgICBmaWVsZHMucHVzaChhZGRyZXNzKTsKICAgIGZpZWxkcy5wdXNoKGFtb3VudCk7CiAgICBmaWVsZHMucHVzaCh1bml0KTsKICAgIGZpZWxkcy5wdXNoKGRhdGEpOwoKICAgIHZhciB7IHNpZyB9ID0gYXdhaXQgdGhpcy5zaWduTWVzc2FnZShmaWVsZHMscHJpdmF0ZUtleSk7CgogICAgdmFyIHJlcyA9IGF3YWl0IHRoaXMubWludChzaWcsYWRkcmVzcyxkYXRhLHB1YmxpY0tleSxhbW91bnQsdW5pdCk7CgogICAgcmV0dXJuIHJlczsKICB9CiAgYXN5bmMgd2l0aGRyYXcoc2lnLHByaXZhdGVLZXksZGVzdEFkZHJlc3MsZGVzdEFtb3VudCxkYXRhLHNvdXJjZU91dHB1dCkgewogICAgdmFyIGFwaSA9IHRoaXMuaG9va3Muc3RhY2suYXBpOwogICAgdmFyIGJvZHkgPSB7CiAgICAgIHNpZywKICAgICAgcHJpdmF0ZUtleSwKICAgICAgZGVzdEFkZHJlc3MsCiAgICAgIGRlc3RBbW91bnQsCiAgICAgIGRhdGEsCiAgICAgIHNvdXJjZU91dHB1dAogICAgfTsKICAgIHRoaXMuZGVidWdMb2coJyoqKioqKioqKioqIHdpdGhkcmF3Jyk7CiAgICB0aGlzLmRlYnVnTG9nKHtib2R5fSk7CiAgICB2YXIgdXJsID0gJy9wL3dpdGhkcmF3JzsKICAgIGNvbnN0IHJlcyA9IGF3YWl0IGFwaS5wb3N0KHVybCwge2JvZHl9KTsKICAgIHJldHVybiByZXM7CiAgfQogIGFzeW5jIHNpZ25BbmRXaXRoZHJhdyhwcml2YXRlS2V5LHNvdXJjZUFkZHJlc3MsZGVzdEFkZHJlc3MsZGVzdEFtb3VudCxkYXRhLHNvdXJjZU91dHB1dCkgewogICAgdGhpcy5kZWJ1Z0xvZygnc2lnbkFuZFdpdGhkcmF3Jyk7CiAgICB0aGlzLmRlYnVnTG9nKHtwcml2YXRlS2V5LHNvdXJjZUFkZHJlc3MsZGVzdEFkZHJlc3MsZGVzdEFtb3VudCxkYXRhLHNvdXJjZU91dHB1dH0pOwogICAgdmFyIGZpZWxkcyA9IFtdOwogICAgdmFyIHsgYmFsYW5jZSB9ID0gYXdhaXQgdGhpcy5iYWxhbmNlKHNvdXJjZUFkZHJlc3MpOwogICAgLy8gdGhpcy5kZWJ1Z0xvZygnIyMjIyMjIyMjIyMjIyMjIyBiYWxhbmNlLkNvdW50ZXI6ICcgKyBiYWxhbmNlLkNvdW50ZXIpOwogICAgZmllbGRzLnB1c2goYmFsYW5jZS5Db3VudGVyKTsKICAgIGZpZWxkcy5wdXNoKGRlc3RBZGRyZXNzKTsKICAgIGZpZWxkcy5wdXNoKGRhdGEpOwogICAgZmllbGRzLnB1c2goc291cmNlT3V0cHV0KTsKICAgIGZpZWxkcy5wdXNoKGRlc3RBbW91bnQpOwoKICAgIHZhciB7IHNpZyB9ID0gYXdhaXQgdGhpcy5zaWduTWVzc2FnZShmaWVsZHMscHJpdmF0ZUtleSk7CgogICAgdmFyIHJlcyA9IGF3YWl0IHRoaXMud2l0aGRyYXcoc2lnLHByaXZhdGVLZXksZGVzdEFkZHJlc3MsZGVzdEFtb3VudCxkYXRhLHNvdXJjZU91dHB1dCk7CgogICAgcmV0dXJuIHJlczsKICB9CiAgYXN5bmMgYm9tVXBkYXRlV2l0aFNpZyhzaWcsYWRkcmVzcyxwdWJsaWNLZXksYm9tT3AsYm9tQWRkcmVzcykgewogICAgdmFyIGFwaSA9IHRoaXMuaG9va3Muc3RhY2suYXBpOwogICAgdmFyIGJvZHkgPSB7CiAgICAgIHNpZywKICAgICAgYWRkcmVzcywKICAgICAgcHVibGljS2V5LAogICAgICBib21PcCwKICAgICAgYm9tQWRkcmVzcwogICAgfTsKICAgIHRoaXMuZGVidWdMb2coJyoqKioqKioqKioqIGRvIGJvbVVwZGF0ZScpOwogICAgdGhpcy5kZWJ1Z0xvZyh7Ym9keX0pOwogICAgdGhpcy5kZWJ1Z0xvZyh7YXBpfSk7CiAgICB0aGlzLmRlYnVnU2l6ZShib2R5KTsKICAgIHZhciB1cmwgPSAnL3AvYm9tVXBkYXRlV2l0aFNpZyc7CiAgICBjb25zdCByZXMgPSBhd2FpdCBhcGkucG9zdCh1cmwsIHtib2R5fSk7CiAgICB0aGlzLmRlYnVnTG9nKCcqKioqKioqKioqKiBib21VcGRhdGUgcmVzdWx0Jyk7CiAgICB0aGlzLmRlYnVnTG9nKHJlcyk7CiAgICByZXR1cm4gcmVzOwogIH0KICBhc3luYyBzaWduQW5kVXBkYXRlQm9tKGFkZHJlc3MscHVibGljS2V5LGJvbU9wLGJvbUFkZHJlc3MscHJpdmF0ZUtleSkgewogICAgdGhpcy5kZWJ1Z0xvZygnc2lnbkFuZFVwZGF0ZUJvbScpOwogICAgdGhpcy5kZWJ1Z0xvZyh7YWRkcmVzcyxwdWJsaWNLZXksYm9tT3AsYm9tQWRkcmVzcyxwcml2YXRlS2V5fSk7CiAgICB2YXIgZmllbGRzID0gW107CiAgICB2YXIgeyBiYWxhbmNlIH0gPSBhd2FpdCB0aGlzLmJhbGFuY2UoYWRkcmVzcyk7CiAgICAvLyB0aGlzLmRlYnVnTG9nKCcjIyMjIyMjIyMjIyMjIyMjIGJhbGFuY2UuQ291bnRlcjogJyArIGJhbGFuY2UuQ291bnRlcik7CiAgICBmaWVsZHMucHVzaChiYWxhbmNlLkNvdW50ZXIpOwogICAgZmllbGRzLnB1c2goYWRkcmVzcyk7CiAgICBmaWVsZHMucHVzaChib21PcCk7CiAgICBmaWVsZHMucHVzaChib21BZGRyZXNzKTsKCiAgICB2YXIgeyBzaWcgfSA9IGF3YWl0IHRoaXMuc2lnbk1lc3NhZ2UoZmllbGRzLHByaXZhdGVLZXkpOwoKICAgIHZhciByZXMgPSBhd2FpdCB0aGlzLmJvbVVwZGF0ZVdpdGhTaWcoc2lnLGFkZHJlc3MscHVibGljS2V5LGJvbU9wLGJvbUFkZHJlc3MpOwoKICAgIHJldHVybiByZXM7CiAgfQp9Owo=", "base64_Y2xhc3MgU21hcnRDb250cmFjdCBleHRlbmRzIFNtYXJ0Q29udHJhY3RCYXNlIHsKICBjb25zdHJ1Y3Rvcihob29rcykgewogICAgICBzdXBlcihob29rcykKICAgICAgdGhpcy5kZWJ1Z0xvZygnKioqKioqKioqKioqKiogU21hcnRDb250cmFjdCcpOwogIH0KCiAgYXN5bmMgZWNobygpIHsKICAgICAgdGhpcy5kZWJ1Z0xvZygnZWNobycpOwogICAgICB2YXIgcnZhbCA9IHsKICAgICAgICAgIGRhdGE6ICdoZWxsbycKICAgICAgfTsKICAgICAgdGhpcy5ob29rcy5maW5pc2gucmVzb2x2ZShydmFsKTsKICB9CgogIGFzeW5jIHdpbmVtYWtlck1pbnRPaygpIHsgCiAgICB0aGlzLmRlYnVnTG9nKCdleGVjdXRlIHdpbmVtYWtlck1pbnRPaycpOwogICAgICB2YXIgXyA9IHRoaXMuaG9va3MuXzsKICAgICAgdmFyIHNzID0gdGhpcy5ob29rcy5zY3JlZW5TdGF0ZTsKICAgICAgdmFyIGFwcCA9IHRoaXMuaG9va3MuYXBwOwogICAgICB2YXIgdXNlckNyZWRlbnRpYWxzID0gYXBwLmdldEFwcFN0YXRlKCd1c2VyQ3JlZGVudGlhbHMnKTsKICAgICAgdmFyIHB1YmxpY0tleSA9IHVzZXJDcmVkZW50aWFscy5wdWJsaWNLZXk7CiAgICAgIHZhciBwcml2YXRlS2V5ID0gdXNlckNyZWRlbnRpYWxzLnByaXZhdGVLZXk7CiAgICAgIHZhciB3b3JrZmxvdyA9IHNzLndvcmtmbG93OwogICAgICB2YXIgbmV3SWQgPSB0aGlzLmhvb2tzLnNob3J0aWQuZ2VuZXJhdGUoKTsKICAgICAgdmFyIHBvcGNvZGVOYW1lID0gJ1dpbmVfJyArIG5ld0lkOwogICAgICB2YXIgeyBmb3JtIH0gPSB0aGlzLnN0YXRlOwogICAgICB0aGlzLmRlYnVnTG9nKGZvcm0pOwogICAgICB2YXIgeyBwb3Bjb2RlIH0gPSBhd2FpdCB0aGlzLmdlbmVyYXRlKCk7CiAgICAgIHZhciB7IGFkZHJlc3MgfSA9IHBvcGNvZGU7CiAgICAgIHZhciBuZXh0U3BvdCA9ICd0cnVja2VyLnBpY2t1cCc7CiAgICAgIHZhciBhbW91bnQgPSB0aGlzLnRvSW50ZWdlcihmb3JtLm1pbnRXaW5lQm90dGxlcy5BbW91bnQpOwogICAgICB2YXIgdW5pdCA9IGZvcm0ubWludFdpbmVCb3R0bGVzLlVuaXQ7CiAgICAgIHRoaXMuZGVidWdMb2coJyMjIyMjIyMjIyMjIyMlJSUlJSUlJSUlJSUlJCQkJCQkJCQkJCQkJCQgIGdlbmVyYXRlZCB3aW5lbWFrZXIgcG9wY29kZTonKTsKICAgICAgdGhpcy5kZWJ1Z0xvZyh7cG9wY29kZU5hbWUscG9wY29kZX0pOwogICAgICAKICAgICAgdmFyIGRhdGEgPQogICAgICAgICAgewogICAgICAgICAgICAiYXBwRGF0YSI6IHsKICAgICAgICAgICAgICAid29ya2Zsb3dEYXRhIjogZm9ybSwKICAgICAgICAgICAgICAid2luZUJvdHRsZXMiOiBhbW91bnQsCiAgICAgICAgICAgICAgIndpbmVVbml0IjogdW5pdCwKICAgICAgICAgICAgICAic3BvdCI6IG5leHRTcG90LAogICAgICAgICAgICAgICJ3b3JrZmxvd05hbWUiOiBzcy53b3JrZmxvdy5uYW1lLAogICAgICAgICAgICAgICJ3b3JrZmxvd0luc3RhbmNlSWQiOiBuZXdJZCwKICAgICAgICAgICAgICAid29ya2Zsb3dSb290UG9wY29kZSI6ICJ0cnVlIiwKICAgICAgICAgICAgICBwb3Bjb2RlTmFtZSAsCiAgICAgICAgICAgICAgIndvcmtmbG93RGVmIjogd29ya2Zsb3cKICAgICAgICAgICAgfQogICAgICAgICAgfTsKCiAgICAgIHRoaXMuZGVidWdMb2coZGF0YSk7CgogICAgICB2YXIgcmVzID0gYXdhaXQgdGhpcy5zaWduQW5kTWludChhZGRyZXNzLGRhdGEscHVibGljS2V5LGFtb3VudCx1bml0LHByaXZhdGVLZXkpOwogICAgICAvLyB0aGlzLmRlYnVnTG9nKCd0aGlzLnNpZ25BbmRNaW50IHJlcy5ib2R5LmtleXM6ICcgKyBPYmplY3Qua2V5cyhyZXMuYm9keSkpOwoKICAgICAgdmFyIHJ2YWwgPSB7CiAgICAgICAgICBhY3Rpb246IFtdCiAgICAgIH07CiAgICAgIHRoaXMuaG9va3MuZmluaXNoLnJlc29sdmUocnZhbCk7CiAgICAgIHJldHVybiBhZGRyZXNzOwogICAgCiAgfQogIHRvSW50ZWdlcih2YWx1ZSkgewogICAgdmFyIF8gPSB0aGlzLmhvb2tzLl87CiAgICBpZihfLmlzU3RyaW5nKHZhbHVlKSkKICAgICAgcmV0dXJuIHBhcnNlSW50KHZhbHVlKTsKICAgIGVsc2UKICAgICAgcmV0dXJuIHZhbHVlOwogIH0KICBhc3luYyB0cnVja2VyUGlja3VwT2soKSB7IAogICAgdGhpcy5kZWJ1Z0xvZygnZXhlY3V0ZSB0cnVja2VyUGlja3VwT2snKTsKICAgIHZhciBmb3JtID0gdGhpcy5zdGF0ZS5mb3JtOwogICAgdGhpcy5kZWJ1Z0xvZyh7Zm9ybX0pOwogICAgCiAgICB2YXIgcnZhbCA9IHsKICAgICAgICBhY3Rpb246IFtdCiAgICB9OwoKICAgIHZhciBfID0gdGhpcy5ob29rcy5fOwogICAgdmFyIHNzID0gdGhpcy5ob29rcy5zY3JlZW5TdGF0ZTsKICAgIHZhciBhcHAgPSB0aGlzLmhvb2tzLmFwcDsKICAgIHZhciB3b3JrZmxvdyA9IHNzLndvcmtmbG93OwogICAgCiAgICB2YXIgdXNlckNyZWRlbnRpYWxzID0gYXBwLmdldEFwcFN0YXRlKCd1c2VyQ3JlZGVudGlhbHMnKTsKICAgIHZhciB1c2VyUHVibGljS2V5ID0gdXNlckNyZWRlbnRpYWxzLnB1YmxpY0tleTsKICAgIHZhciB1c2VyUHJpdmF0ZUtleSA9IHVzZXJDcmVkZW50aWFscy5wcml2YXRlS2V5OwogICAgCiAgICB2YXIgc3JjUG9wY29kZSA9IHRoaXMuc3RhdGUucG9wY29kZTsKICAgIAoKICAgIHZhciBkZXN0QW1vdW50ID0gdGhpcy50b0ludGVnZXIodGhpcy5zdGF0ZS5mb3JtLndpdGhkcmF3LnBpY2t1cEFtb3VudCk7CiAgICB2YXIgZGVzdE5hbWUgPSAiVHJ1Y2tfIiArIHVzZXJDcmVkZW50aWFscy5zZXNzaW9uSWQ7CiAgICAKICAgIHZhciBkYXRhID0geyBkZXNjcmlwdGlvbjogYHdpdGhkcmF3ICR7ZGVzdEFtb3VudH0gYm90dGxlcyBvZiB3aW5lYCB9OwogICAgdmFyIHNvdXJjZU91dHB1dCA9IDA7CiAgICAKICAgIHRoaXMuZGVidWdMb2coJ2dldCB0cnVjayBwb3Bjb2RlOiAnICsgZGVzdE5hbWUpOwogICAgdmFyIHRydWNrUG9wY29kZSA9IGF3YWl0IHRoaXMub25lQnlOYW1lKGRlc3ROYW1lKTsKICAgIHRoaXMuZGVidWdMb2codHJ1Y2tQb3Bjb2RlKTsKICAgICAKICAgIHRoaXMuZGVidWdMb2coJ2NoZWNrIHNvdXJjZSB3aW5lIGJvdHRsZSBjb3VudCcpOwogICAgdmFyIHdpbmVCb3R0bGVzID0gdGhpcy50b0ludGVnZXIoc3JjUG9wY29kZS5hcHBEYXRhLndpbmVCb3R0bGVzKTsKICAgIHZhciB3aW5lVW5pdCA9IHNyY1BvcGNvZGUuYXBwRGF0YS53aW5lVW5pdDsKICAgIHRoaXMuZGVidWdMb2coe3NyY1BvcGNvZGV9KTsKICAgIHRoaXMuZGVidWdMb2coe3dpbmVCb3R0bGVzLGRlc3RBbW91bnQsd2luZVVuaXR9KTsKICAgIAogICAgaWYoXy5pc05pbChkZXN0QW1vdW50KSB8fCBfLmlzTmFOKGRlc3RBbW91bnQpKSB7CiAgICAgIHRoaXMuZGVidWdMb2coJyoqKioqKioqKioqKioqKioqKiBlcnJvciBiYWQgZGVzdEFtb3VudCknKTsKICAgICAgdGhpcy5ob29rcy5maW5pc2gucmVzb2x2ZShydmFsKTsKICAgICAgcmV0dXJuIDsKICAgIH0KICAgIAogICAgaWYoXy5pc05pbCh3aW5lQm90dGxlcykgfHwgXy5pc05hTihkZXN0QW1vdW50KSkgewogICAgICB0aGlzLmRlYnVnTG9nKCcqKioqKioqKioqKioqKioqKiogZXJyb3IgYmFkIHdpbmVCb3R0bGVzJyk7CiAgICAgIHRoaXMuaG9va3MuZmluaXNoLnJlc29sdmUocnZhbCk7CiAgICAgIHJldHVybiA7CiAgICB9CiAgICAKICAgIGlmKGRlc3RBbW91bnQgPiB3aW5lQm90dGxlcykgewogICAgICB0aGlzLmRlYnVnTG9nKCcqKioqKioqKioqKioqKioqKiogZXJyb3IgZGVzdEFtb3VudCA+IHdpbmVCb3R0bGVzJyk7CiAgICAgIHRoaXMuaG9va3MuZmluaXNoLnJlc29sdmUocnZhbCk7CiAgICAgIHJldHVybiA7CiAgICB9CiAgICAgCiAgICB2YXIgdHJ1Y2tCb3R0bGVzOwogICAgaWYgKF8uaXNOaWwodHJ1Y2tQb3Bjb2RlKSkgewogICAgICB0aGlzLmRlYnVnTG9nKCdNaW50aW5nIHRydWNrIHBvcGNvZGU6ICcgKyBkZXN0TmFtZSk7CiAgICAgIHZhciB0cnVja1Nwb3QgPSAndHJ1Y2tlci5zaG93JzsKICAgICAgdmFyIG5ld0lkID0gdGhpcy5ob29rcy5zaG9ydGlkLmdlbmVyYXRlKCk7CiAgICAgIHZhciB0cnVja1N0YXJ0QW1vdW50ID0gMDsKICAgICAgdmFyIHRydWNrVW5pdCA9ICdib3R0bGVzIG9mIHdpbmUnOwogICAgICB0cnVja0JvdHRsZXMgPSAwOwogICAgICB2YXIgdHJ1Y2tEYXRhID0KICAgICAgICAgIHsKICAgICAgICAgICAgImFwcERhdGEiOiB7CiAgICAgICAgICAgICAgIndvcmtmbG93RGF0YSI6IHt9LAogICAgICAgICAgICAgICJzcG90IjogdHJ1Y2tTcG90LAogICAgICAgICAgICAgICJ3aW5lQm90dGxlcyI6IHRydWNrQm90dGxlcywKICAgICAgICAgICAgICAid2luZVVuaXQiOiB3aW5lVW5pdCwKICAgICAgICAgICAgICAid29ya2Zsb3dOYW1lIjogc3Mud29ya2Zsb3cubmFtZSwKICAgICAgICAgICAgICAid29ya2Zsb3dJbnN0YW5jZUlkIjogbmV3SWQsCiAgICAgICAgICAgICAgIndvcmtmbG93Um9vdFBvcGNvZGUiOiAidHJ1ZSIsCiAgICAgICAgICAgICAgcG9wY29kZU5hbWU6IGRlc3ROYW1lLAogICAgICAgICAgICAgICJ3b3JrZmxvd0RlZiI6IHdvcmtmbG93CiAgICAgICAgICAgIH0KICAgICAgICAgIH07CiAgICAgIHZhciBuZXdQb3Bjb2RlID0gYXdhaXQgdGhpcy5nZW5lcmF0ZSgpOwogICAgICB2YXIgdHJ1Y2tBZGRyZXNzID0gbmV3UG9wY29kZS5wb3Bjb2RlLmFkZHJlc3M7CiAgICAgIAogICAgICB2YXIgcmVzID0gYXdhaXQgdGhpcy5zaWduQW5kTWludCh0cnVja0FkZHJlc3MsdHJ1Y2tEYXRhLHVzZXJQdWJsaWNLZXksdHJ1Y2tTdGFydEFtb3VudCx0cnVja1VuaXQsdXNlclByaXZhdGVLZXkpOwogICAgICAKICAgICAgdHJ1Y2tQb3Bjb2RlID0gYXdhaXQgdGhpcy5vbmVCeU5hbWUoZGVzdE5hbWUpOwogICAgfQogICAgZWxzZSB7CiAgICAgIHRoaXMuZGVidWdMb2coJ0ZvdW5kIGV4aXN0aW5nIHRydWNrIHBvcGNvZGU6ICcgKyBkZXN0TmFtZSk7CiAgICAgIHRydWNrQm90dGxlcyA9IHRydWNrUG9wY29kZS5hcHBEYXRhLndpbmVCb3R0bGVzOwogICAgfQogICAgCiAgICBpZihfLmlzTmlsKHRydWNrUG9wY29kZSkpIHsKICAgICAgdGhpcy5kZWJ1Z0xvZygnKioqKioqKioqKioqKioqKioqIEVycm9yIG1pbnRpbmcgdHJ1Y2sgcG9wY29kZScpOwogICAgICB0aGlzLmhvb2tzLmZpbmlzaC5yZXNvbHZlKHJ2YWwpOwogICAgICByZXR1cm4gOwogICAgfQogICAgCiAgICB0aGlzLmRlYnVnTG9nKCcjIyMjIyMjIyMjIyMjIyMjIHRydWNrIHBvcGNvZGU6Jyk7CiAgICB0aGlzLmRlYnVnTG9nKHRydWNrUG9wY29kZSk7CiAgICAKICAgIHZhciB3cmVzID0gYXdhaXQgdGhpcy5zaWduQW5kV2l0aGRyYXcoCiAgICAgIHNyY1BvcGNvZGUucHJpdmF0ZUtleSwKICAgICAgc3JjUG9wY29kZS5hZGRyZXNzLAogICAgICB0cnVja1BvcGNvZGUuYWRkcmVzcywKICAgICAgZGVzdEFtb3VudCwKICAgICAgZGF0YSwKICAgICAgc291cmNlT3V0cHV0CiAgICApOwogICAgCiAgICB0aGlzLmRlYnVnTG9nKCcjIyMjIyMjIyMjIyMjIyMjIHdpdGhkcmF3IHJlc3VsdDonKTsKICAgIHRoaXMuZGVidWdMb2cod3Jlcyk7CiAgICBydmFsLndyZXMgPSB3cmVzOwogICAgCiAgICB0aGlzLmRlYnVnTG9nKCcjIyMjIyMjIyMjIyMjIyMjIHVwZGF0ZSBzb3VyY2Ugd2luZSBib3R0bGUgY291bnQ6Jyk7CiAgICB2YXIgd2luZUNvdW50ID0gd2luZUJvdHRsZXMgLSBkZXN0QW1vdW50OwogICAgdmFyIHdpbmVEYXRhID0KICAgICAgICB7CiAgICAgICAgICAiYXBwRGF0YSI6IHsKICAgICAgICAgICAgIndpbmVCb3R0bGVzIjogd2luZUNvdW50CiAgICAgICAgICB9CiAgICAgICAgfTsKCiAgICB0aGlzLmRlYnVnTG9nKHdpbmVEYXRhKTsKICAgIHZhciBicmVzID0gYXdhaXQgdGhpcy5ibG9iQ3JlYXRlKAogICAgICBzcmNQb3Bjb2RlLmFkZHJlc3MsCiAgICAgIHdpbmVEYXRhLAogICAgICB1c2VyQ3JlZGVudGlhbHMucHVibGljS2V5LAogICAgICB1c2VyQ3JlZGVudGlhbHMucHJpdmF0ZUtleSk7CiAgICAgIAogICAgdGhpcy5kZWJ1Z0xvZygnIyMjIyMjIyMjIyMjIyMjIyBibG9iQ3JlYXRlIHJlc3VsdDonKTsKICAgIHRoaXMuZGVidWdMb2coYnJlcyk7CiAgICBydmFsLmJyZXMgPSBicmVzOwogICAgCiAgICB0aGlzLmRlYnVnTG9nKCcjIyMjIyMjIyMjIyMjIyMjIHVwZGF0ZSB0cnVjayB3aW5lIGJvdHRsZSBjb3VudDonKTsKICAgIHZhciB0cnVja0NvdW50ID0gdHJ1Y2tCb3R0bGVzICsgZGVzdEFtb3VudDsKICAgIHZhciB0cnVja1dpbmVEYXRhID0KICAgICAgICB7CiAgICAgICAgICAiYXBwRGF0YSI6IHsKICAgICAgICAgICAgIndpbmVCb3R0bGVzIjogdHJ1Y2tDb3VudAogICAgICAgICAgfQogICAgICAgIH07CgogICAgdGhpcy5kZWJ1Z0xvZyh0cnVja1dpbmVEYXRhKTsKICAgIHZhciBicmVzMiA9IGF3YWl0IHRoaXMuYmxvYkNyZWF0ZSgKICAgICAgdHJ1Y2tQb3Bjb2RlLmFkZHJlc3MsCiAgICAgIHRydWNrV2luZURhdGEsCiAgICAgIHVzZXJDcmVkZW50aWFscy5wdWJsaWNLZXksCiAgICAgIHVzZXJDcmVkZW50aWFscy5wcml2YXRlS2V5KTsKICAgICAgCiAgICB0aGlzLmRlYnVnTG9nKCcjIyMjIyMjIyMjIyMjIyMjIHRydWNrIGJsb2JDcmVhdGUgcmVzdWx0OicpOwogICAgdGhpcy5kZWJ1Z0xvZyhicmVzMik7CiAgICBydmFsLmJyZXMyID0gYnJlczI7CiAgICAKICAgIHRoaXMuaG9va3MuZmluaXNoLnJlc29sdmUocnZhbCk7CiAgIH0KCn07Cg=="]
            }
        },
        "timestamp": 1520232310606
    },
    "publicKey": "037c1c0f71594710ae01207f27ebec947e2212e81029d9bcbe5e3119ea13b6d7ca",
    "spot": "trucker.show",
    "unit": "bottles of wine",
    "privateKey": "e5a9de9176e6200ca0ce83b72da1cb2fd44a59e604560a6cc68df5e76e054ff9",
    "type": "popcode",
    "popcodeName": "Truck_PKETYWEVA",
    "amount": "0",
    "creatorPublicKey": "AzFSqglD2Tz0BHF7fyc5OZ0NYkqslptvM8W2ghgAjmAN",
    "workflowDef": {
        "title": "Wine V1",
        "name": "wineV1",
        "startScreen": "Home",
        "version": "2.0",
        "steps": {
            "winemaker.mint": {"step": "winemaker.mint", "title": "Winemaker Mint", "screen": "WinemakerMint"},
            "trucker.pickup": {"step": "trucker.pickup", "title": "Trucker Pickup", "screen": "TruckerPickup"},
            "trucker.show": {"step": "trucker.show", "title": "Trucker Show", "screen": "TruckerShow"}
        },
        "appOptions": {"requireLogin": true},
        "screens": {
            "Home": {
                "name": "Home",
                "title": "Home",
                "api": "/api/mobile",
                "screenListItems": {
                    "fetchItems": "/popcodeByWorkflowName",
                    "method": "get",
                    "api": "cayley",
                    "fetchParameters": {"workflowName": "wineV1"},
                    "itemDataTypes": {"popcode": "object"},
                    "itemLabel": ["popcodeName"],
                    "itemActions": {
                        "click": {
                            "title": "Click",
                            "action": [{
                                "operation": "startWorkflow",
                                "replaceCurrent": true,
                                "parameters": {"spot": "@popcode.spot", "popcode": "@popcode"}
                            }],
                            "parameters": {"popcode": "@item"}
                        }
                    }
                },
                "screenButtons": {
                    "scan": {
                        "title": "Scan",
                        "action": [{"operation": "navigate", "screen": "Scan"}],
                        "roles": ["admin", "winemaker", "trucker"]
                    },
                    "mint": {
                        "title": "Mint",
                        "action": [{"operation": "navigate", "resetStack": true, "screen": "WinemakerMint"}],
                        "roles": ["admin", "winemaker"]
                    }
                }
            },
            "Scan": {
                "name": "Scan",
                "title": "Scan",
                "api": "/api/mobile",
                "parameters": {"user": "@user"},
                "modal": false,
                "screenScan": {},
                "startAction": [{
                    "operation": "scanBarcode",
                    "barcodeTypes": ["qr", "code128"],
                    "outputs": {"scanData": "@scanData"}
                }, {
                    "operation": "routePopcode",
                    "parameters": {"scanData": "@scanData"},
                    "outputs": {"address": "@address"}
                }, {
                    "operation": "fetch",
                    "route": "/p",
                    "method": "get",
                    "parameters": {"address": "@address"},
                    "outputs": {"popcode": "@popcodes[0]"}
                }, {
                    "operation": "startWorkflow",
                    "replaceCurrent": true,
                    "parameters": {"spot": "@popcode.spot", "popcode": "@popcode"}
                }]
            },
            "WinemakerMint": {
                "name": "WinemakerMint",
                "title": "Winemaker Mint",
                "api": "/api/mobile",
                "parameters": {"container": "@container", "popcode": "@popcode", "user": "@user"},
                "outputs": {"popcode": "@container"},
                "screenForm": {
                    "fields": {
                        "type": "object",
                        "properties": {
                            "mintWineBottles": {
                                "type": "object",
                                "properties": {
                                    "Amount": {"type": "string", "value": "1000", "options": {"editable": true}},
                                    "Unit": {
                                        "type": "string",
                                        "value": "bottles of wine",
                                        "options": {"editable": true}
                                    }
                                },
                                "required": ["Amount", "Unit"]
                            }
                        },
                        "required": ["mintWineBottles"]
                    }, "options": {"auto": "labels"}
                },
                "screenButtons": {
                    "mint": {
                        "title": "Mint",
                        "action": [{
                            "operation": "contract",
                            "contract": "winemakerMintOk",
                            "parameters": {"popcode": "@popcode"},
                            "outputs": {"status": "@status", "txId": "@txId"}
                        }, {"operation": "navigate", "resetStack": true, "forceUpdate": true, "screen": "Home"}],
                        "roles": ["admin", "winemaker"]
                    },
                    "cancel": {
                        "title": "Cancel",
                        "action": [{"operation": "navigate", "resetStack": true, "screen": "Home"}]
                    }
                }
            },
            "TruckerPickup": {
                "name": "TruckerPickup",
                "title": "Trucker Wine Pickup",
                "api": "/api/mobile",
                "parameters": {"container": "@container", "popcode": "@popcode", "user": "@user"},
                "outputs": {"popcode": "@container"},
                "tabs": {
                    "tab1": {
                        "title": "Pickup Wine",
                        "screenForm": {
                            "privateKey": ["winemaker", "admin"],
                            "publicKey": ["winemaker", "trucker", "admin"],
                            "fields": {
                                "type": "object",
                                "properties": {
                                    "popcode": {
                                        "type": "object",
                                        "properties": {
                                            "name": {
                                                "type": "string",
                                                "value": "@popcode.popcodeName",
                                                "options": {"editable": false}
                                            },
                                            "address": {
                                                "type": "string",
                                                "value": "@popcode.address",
                                                "options": {"editable": false}
                                            },
                                            "currentState": {
                                                "type": "string",
                                                "value": "@popcode.spot",
                                                "options": {"editable": false}
                                            }
                                        },
                                        "required": ["name", "address", "currentState"]
                                    },
                                    "warehouseContents": {
                                        "type": "object",
                                        "properties": {
                                            "Amount": {
                                                "type": "number",
                                                "value": "@popcode.appData.wineBottles",
                                                "options": {"editable": false}
                                            },
                                            "Unit": {
                                                "type": "string",
                                                "value": "@popcode.appData.wineUnit",
                                                "options": {"editable": false}
                                            }
                                        }
                                    },
                                    "withdraw": {
                                        "type": "object",
                                        "properties": {
                                            "pickupAmount": {
                                                "type": "number",
                                                "options": {"editable": true}
                                            }
                                        },
                                        "required": ["pickupAmount"]
                                    }
                                },
                                "required": ["withdraw"]
                            },
                            "options": {"auto": "labels"}
                        }
                    }, "tab2": {"title": "Popcode Graph", "graphView": {"visName": "wine"}}
                },
                "screenButtons": {
                    "pickup": {
                        "title": "Pickup",
                        "action": [{
                            "operation": "contract",
                            "contract": "truckerPickupOk",
                            "parameters": {"popcode": "@popcode"},
                            "outputs": {"status": "@status", "txId": "@txId"}
                        }, {"operation": "navigate", "resetStack": true, "forceUpdate": true, "screen": "Home"}],
                        "roles": ["admin", "trucker"]
                    },
                    "cancel": {
                        "title": "Cancel",
                        "action": [{"operation": "navigate", "resetStack": true, "screen": "Home"}]
                    }
                }
            },
            "TruckerShow": {
                "name": "TruckerShow",
                "title": "Truck Popcode",
                "api": "/api/mobile",
                "parameters": {"container": "@container", "popcode": "@popcode", "user": "@user"},
                "outputs": {"popcode": "@container"},
                "tabs": {
                    "tab1": {
                        "title": "Truck Contents",
                        "screenForm": {
                            "privateKey": ["trucker", "admin"],
                            "publicKey": ["winemaker", "trucker", "admin"],
                            "fields": {
                                "type": "object",
                                "properties": {
                                    "popcode": {
                                        "type": "object",
                                        "properties": {
                                            "name": {
                                                "type": "string",
                                                "value": "@popcode.popcodeName",
                                                "options": {"editable": false}
                                            },
                                            "address": {
                                                "type": "string",
                                                "value": "@popcode.address",
                                                "options": {"editable": false}
                                            },
                                            "currentState": {
                                                "type": "string",
                                                "value": "@popcode.spot",
                                                "options": {"editable": false}
                                            }
                                        },
                                        "required": ["name", "address", "currentState"]
                                    },
                                    "truckContents": {
                                        "type": "object",
                                        "properties": {
                                            "Amount": {
                                                "type": "number",
                                                "value": "@popcode.appData.wineBottles",
                                                "options": {"editable": false}
                                            },
                                            "Unit": {
                                                "type": "string",
                                                "value": "@popcode.appData.wineUnit",
                                                "options": {"editable": false}
                                            }
                                        }
                                    }
                                }
                            },
                            "options": {"auto": "labels"}
                        }
                    }, "tab2": {"title": "Popcode Graph", "graphView": {"visName": "wine"}}
                },
                "screenButtons": {
                    "ok": {
                        "title": "Ok",
                        "action": [{"operation": "navigate", "resetStack": true, "screen": "Home"}]
                    }
                }
            }
        },
        "contractLib": {
            "name": "Wine SmartContract Library",
            "version": "1.0",
            "slug": "wine_1_0",
            "libs": ["base64_Y2xhc3MgU21hcnRDb250cmFjdEJhc2UgewogIGNvbnN0cnVjdG9yKGhvb2tzKSB7CiAgICAgIHRoaXMuaG9va3MgPSBob29rczsKICAgICAgdGhpcy5zdGF0ZSA9IGhvb2tzLnN0YXRlOwogICAgICB0aGlzLmRlYnVnTG9nID0gaG9va3MuZGVidWdMb2c7CiAgICAgIHRoaXMuZGVidWdMb2coJ2NvbnN0cnVjdCBTbWFydENvbnRyYWN0QmFzZScpOwogIH0KICBkZWJ1Z1NpemUobykgewogICAgdmFyIHMgPSBKU09OLnN0cmluZ2lmeShvKTsKICAgIHRoaXMuZGVidWdMb2coYHNpemU6ICR7cy5sZW5ndGgvMTAyNH0ga2ApOwogIH0KICBhc3luYyBieU5hbWUocE5hbWUpIHsKICAgIHZhciBhcGkgPSB0aGlzLmhvb2tzLnN0YWNrLmFwaTsKICAgIHZhciB1cmwgPSAnL3AvbmFtZS8nICsgcE5hbWU7CiAgICBjb25zdCByZXMgPSBhd2FpdCBhcGkuZ2V0KHVybCk7CiAgICByZXR1cm4gcmVzLmJvZHk7CiAgfQogIGFzeW5jIG9uZUJ5TmFtZShwTmFtZSkgewogICAgdmFyIF8gPSB0aGlzLmhvb2tzLl87CiAgICB2YXIgYXBpID0gdGhpcy5ob29rcy5zdGFjay5hcGk7CiAgICB2YXIgdXJsID0gJy9wL25hbWUvJyArIHBOYW1lOwogICAgY29uc3QgcmVzID0gYXdhaXQgYXBpLmdldCh1cmwpOwogICAgdmFyIHBvcGNvZGVzID0gIV8uaXNOaWwocmVzKQogICAgICYmICFfLmlzTmlsKHJlcy5ib2R5KQogICAgICYmICFfLmlzTmlsKHJlcy5ib2R5LnBvcGNvZGVzKSA/IHJlcy5ib2R5LnBvcGNvZGVzIDogbnVsbDsKICAgIHZhciBwb3Bjb2RlID0gXy5pc0FycmF5KHBvcGNvZGVzKSAmJiBwb3Bjb2Rlcy5sZW5ndGggPiAwCiAgICAgPyBwb3Bjb2Rlc1swXSA6IG51bGw7CiAgICByZXR1cm4gcG9wY29kZTsKICB9CiAgYXN5bmMgYmFsYW5jZShhZGRyZXNzKSB7CiAgICB2YXIgYXBpID0gdGhpcy5ob29rcy5zdGFjay5hcGk7CiAgICB2YXIgdXJsID0gJy9wL2JhbGFuY2UvJyArIGFkZHJlc3M7CiAgICBjb25zdCByZXMgPSBhd2FpdCBhcGkuZ2V0KHVybCk7CiAgICByZXR1cm4gcmVzLmJvZHk7CiAgfQogIGFzeW5jIGdlbmVyYXRlKCkgewogICAgdmFyIGFwaSA9IHRoaXMuaG9va3Muc3RhY2suYXBpOwogICAgdmFyIHVybCA9ICcvcC9nZW5lcmF0ZSc7CiAgICBjb25zdCByZXMgPSBhd2FpdCBhcGkuZ2V0KHVybCk7CiAgICByZXR1cm4gcmVzLmJvZHk7CiAgfQogIGFzeW5jIGNvbnRhaW5lclBvcGNvZGUoYWRkcmVzcykgewogICAgdmFyIGFwaSA9IHRoaXMuaG9va3Muc3RhY2suYXBpQ2F5bGV5OwogICAgdmFyIHVybCA9ICcvY29udGFpbmVyUG9wY29kZS8nICsgYWRkcmVzczsKICAgIGNvbnN0IHJlcyA9IGF3YWl0IGFwaS5nZXQodXJsKTsKICAgIHJldHVybiByZXMuYm9keTsKICB9CiAgYXN5bmMgYm9tUG9wY29kZXMoYWRkcmVzcykgewogICAgdmFyIGFwaSA9IHRoaXMuaG9va3Muc3RhY2suYXBpQ2F5bGV5OwogICAgdmFyIHVybCA9ICcvYm9tUG9wY29kZXMvJyArIGFkZHJlc3M7CiAgICBjb25zdCByZXMgPSBhd2FpdCBhcGkuZ2V0KHVybCk7CiAgICByZXR1cm4gcmVzLmJvZHk7CiAgfQogIGFzeW5jIHNpZ25NZXNzYWdlKGZpZWxkcyxwcml2YXRlS2V5KSB7CiAgICB2YXIgYXBpID0gdGhpcy5ob29rcy5zdGFjay5hcGk7CiAgICB2YXIgYm9keSA9IHsKICAgICAgZmllbGRzLAogICAgICBwcml2YXRlS2V5CiAgICB9OwogICAgdmFyIHVybCA9ICcvY3J5cHRvL3NpZ25NZXNzYWdlJzsKICAgIHRoaXMuZGVidWdMb2coJyoqKioqKioqKioqIHNpZ25NZXNzYWdlJyk7CiAgICB0aGlzLmRlYnVnTG9nKHtib2R5fSk7CiAgICBjb25zdCByZXMgPSBhd2FpdCBhcGkucG9zdCh1cmwsIHtib2R5fSk7CiAgICB0aGlzLmRlYnVnTG9nKHtib2R5OiByZXMuYm9keX0pOwogICAgcmV0dXJuIHJlcy5ib2R5OwogIH0KICBhc3luYyBibG9iQ3JlYXRlV2l0aFNpZyhzaWcsYWRkcmVzcyxkYXRhLHB1YmxpY0tleSkgewogICAgdmFyIGFwaSA9IHRoaXMuaG9va3Muc3RhY2suYXBpOwogICAgdmFyIGJvZHkgPSB7CiAgICAgIHNpZywKICAgICAgYWRkcmVzcywKICAgICAgcHVibGljS2V5LAogICAgICBkYXRhCiAgICB9OwogICAgdmFyIHVybCA9ICcvcC9ibG9iQ3JlYXRlV2l0aFNpZyc7CiAgICBjb25zdCByZXMgPSBhd2FpdCBhcGkucG9zdCh1cmwsIHtib2R5fSk7CiAgICByZXR1cm4gcmVzLmJvZHk7CiAgfQogIGFzeW5jIGJsb2JDcmVhdGUoYWRkcmVzcyxkYXRhLHB1YmxpY0tleSxwcml2YXRlS2V5KSB7CiAgICB2YXIgZmllbGRzID0gW107CgogICAgdmFyIHJlcyA9IGF3YWl0IHRoaXMuYmFsYW5jZShhZGRyZXNzKTsKICAgIGZpZWxkcy5wdXNoKHJlcy5iYWxhbmNlLkNvdW50ZXIpOwogICAgZmllbGRzLnB1c2goYWRkcmVzcyk7CiAgICBmaWVsZHMucHVzaChkYXRhKTsKCiAgICByZXMgPSBhd2FpdCB0aGlzLnNpZ25NZXNzYWdlKGZpZWxkcyxwcml2YXRlS2V5KTsKCiAgICByZXMgPSBhd2FpdCB0aGlzLmJsb2JDcmVhdGVXaXRoU2lnKHJlcy5zaWcsYWRkcmVzcyxkYXRhLHB1YmxpY0tleSk7CgogICAgcmV0dXJuIHJlczsKICB9CiAgYXN5bmMgbWludChzaWcsYWRkcmVzcyxkYXRhLHB1YmxpY0tleSxhbW91bnQsdW5pdCkgewogICAgdmFyIGFwaSA9IHRoaXMuaG9va3Muc3RhY2suYXBpOwogICAgdmFyIGJvZHkgPSB7CiAgICAgIHNpZywKICAgICAgYWRkcmVzcywKICAgICAgcHVibGljS2V5LAogICAgICBhbW91bnQsCiAgICAgIHVuaXQsCiAgICAgIGRhdGEKICAgIH07CiAgICB0aGlzLmRlYnVnTG9nKCcqKioqKioqKioqKiBkbyBtaW50Jyk7CiAgICB0aGlzLmRlYnVnTG9nKHtib2R5fSk7CiAgICB0aGlzLmRlYnVnTG9nKHthcGl9KTsKICAgIHRoaXMuZGVidWdTaXplKGJvZHkpOwogICAgdmFyIHVybCA9ICcvcC9taW50JzsKICAgIGNvbnN0IHJlcyA9IGF3YWl0IGFwaS5wb3N0KHVybCwge2JvZHl9KTsKICAgIHRoaXMuZGVidWdMb2coJyoqKioqKioqKioqIG1pbnQgcmVzdWx0Jyk7CiAgICB0aGlzLmRlYnVnTG9nKHJlcyk7CiAgICByZXR1cm4gcmVzOwogIH0KICBhc3luYyBzaWduQW5kTWludChhZGRyZXNzLGRhdGEscHVibGljS2V5LGFtb3VudCx1bml0LHByaXZhdGVLZXkpIHsKICAgIHRoaXMuZGVidWdMb2coJ3NpZ25BbmRNaW50Jyk7CiAgICB0aGlzLmRlYnVnTG9nKHthZGRyZXNzLGRhdGEscHVibGljS2V5LGFtb3VudCx1bml0LHByaXZhdGVLZXl9KTsKICAgIHZhciBmaWVsZHMgPSBbXTsKICAgIHZhciB7IGJhbGFuY2UgfSA9IGF3YWl0IHRoaXMuYmFsYW5jZShhZGRyZXNzKTsKICAgIC8vIHRoaXMuZGVidWdMb2coJyMjIyMjIyMjIyMjIyMjIyMgYmFsYW5jZS5Db3VudGVyOiAnICsgYmFsYW5jZS5Db3VudGVyKTsKICAgIGZpZWxkcy5wdXNoKGJhbGFuY2UuQ291bnRlcik7CiAgICBmaWVsZHMucHVzaChhZGRyZXNzKTsKICAgIGZpZWxkcy5wdXNoKGFtb3VudCk7CiAgICBmaWVsZHMucHVzaCh1bml0KTsKICAgIGZpZWxkcy5wdXNoKGRhdGEpOwoKICAgIHZhciB7IHNpZyB9ID0gYXdhaXQgdGhpcy5zaWduTWVzc2FnZShmaWVsZHMscHJpdmF0ZUtleSk7CgogICAgdmFyIHJlcyA9IGF3YWl0IHRoaXMubWludChzaWcsYWRkcmVzcyxkYXRhLHB1YmxpY0tleSxhbW91bnQsdW5pdCk7CgogICAgcmV0dXJuIHJlczsKICB9CiAgYXN5bmMgd2l0aGRyYXcoc2lnLHByaXZhdGVLZXksZGVzdEFkZHJlc3MsZGVzdEFtb3VudCxkYXRhLHNvdXJjZU91dHB1dCkgewogICAgdmFyIGFwaSA9IHRoaXMuaG9va3Muc3RhY2suYXBpOwogICAgdmFyIGJvZHkgPSB7CiAgICAgIHNpZywKICAgICAgcHJpdmF0ZUtleSwKICAgICAgZGVzdEFkZHJlc3MsCiAgICAgIGRlc3RBbW91bnQsCiAgICAgIGRhdGEsCiAgICAgIHNvdXJjZU91dHB1dAogICAgfTsKICAgIHRoaXMuZGVidWdMb2coJyoqKioqKioqKioqIHdpdGhkcmF3Jyk7CiAgICB0aGlzLmRlYnVnTG9nKHtib2R5fSk7CiAgICB2YXIgdXJsID0gJy9wL3dpdGhkcmF3JzsKICAgIGNvbnN0IHJlcyA9IGF3YWl0IGFwaS5wb3N0KHVybCwge2JvZHl9KTsKICAgIHJldHVybiByZXM7CiAgfQogIGFzeW5jIHNpZ25BbmRXaXRoZHJhdyhwcml2YXRlS2V5LHNvdXJjZUFkZHJlc3MsZGVzdEFkZHJlc3MsZGVzdEFtb3VudCxkYXRhLHNvdXJjZU91dHB1dCkgewogICAgdGhpcy5kZWJ1Z0xvZygnc2lnbkFuZFdpdGhkcmF3Jyk7CiAgICB0aGlzLmRlYnVnTG9nKHtwcml2YXRlS2V5LHNvdXJjZUFkZHJlc3MsZGVzdEFkZHJlc3MsZGVzdEFtb3VudCxkYXRhLHNvdXJjZU91dHB1dH0pOwogICAgdmFyIGZpZWxkcyA9IFtdOwogICAgdmFyIHsgYmFsYW5jZSB9ID0gYXdhaXQgdGhpcy5iYWxhbmNlKHNvdXJjZUFkZHJlc3MpOwogICAgLy8gdGhpcy5kZWJ1Z0xvZygnIyMjIyMjIyMjIyMjIyMjIyBiYWxhbmNlLkNvdW50ZXI6ICcgKyBiYWxhbmNlLkNvdW50ZXIpOwogICAgZmllbGRzLnB1c2goYmFsYW5jZS5Db3VudGVyKTsKICAgIGZpZWxkcy5wdXNoKGRlc3RBZGRyZXNzKTsKICAgIGZpZWxkcy5wdXNoKGRhdGEpOwogICAgZmllbGRzLnB1c2goc291cmNlT3V0cHV0KTsKICAgIGZpZWxkcy5wdXNoKGRlc3RBbW91bnQpOwoKICAgIHZhciB7IHNpZyB9ID0gYXdhaXQgdGhpcy5zaWduTWVzc2FnZShmaWVsZHMscHJpdmF0ZUtleSk7CgogICAgdmFyIHJlcyA9IGF3YWl0IHRoaXMud2l0aGRyYXcoc2lnLHByaXZhdGVLZXksZGVzdEFkZHJlc3MsZGVzdEFtb3VudCxkYXRhLHNvdXJjZU91dHB1dCk7CgogICAgcmV0dXJuIHJlczsKICB9CiAgYXN5bmMgYm9tVXBkYXRlV2l0aFNpZyhzaWcsYWRkcmVzcyxwdWJsaWNLZXksYm9tT3AsYm9tQWRkcmVzcykgewogICAgdmFyIGFwaSA9IHRoaXMuaG9va3Muc3RhY2suYXBpOwogICAgdmFyIGJvZHkgPSB7CiAgICAgIHNpZywKICAgICAgYWRkcmVzcywKICAgICAgcHVibGljS2V5LAogICAgICBib21PcCwKICAgICAgYm9tQWRkcmVzcwogICAgfTsKICAgIHRoaXMuZGVidWdMb2coJyoqKioqKioqKioqIGRvIGJvbVVwZGF0ZScpOwogICAgdGhpcy5kZWJ1Z0xvZyh7Ym9keX0pOwogICAgdGhpcy5kZWJ1Z0xvZyh7YXBpfSk7CiAgICB0aGlzLmRlYnVnU2l6ZShib2R5KTsKICAgIHZhciB1cmwgPSAnL3AvYm9tVXBkYXRlV2l0aFNpZyc7CiAgICBjb25zdCByZXMgPSBhd2FpdCBhcGkucG9zdCh1cmwsIHtib2R5fSk7CiAgICB0aGlzLmRlYnVnTG9nKCcqKioqKioqKioqKiBib21VcGRhdGUgcmVzdWx0Jyk7CiAgICB0aGlzLmRlYnVnTG9nKHJlcyk7CiAgICByZXR1cm4gcmVzOwogIH0KICBhc3luYyBzaWduQW5kVXBkYXRlQm9tKGFkZHJlc3MscHVibGljS2V5LGJvbU9wLGJvbUFkZHJlc3MscHJpdmF0ZUtleSkgewogICAgdGhpcy5kZWJ1Z0xvZygnc2lnbkFuZFVwZGF0ZUJvbScpOwogICAgdGhpcy5kZWJ1Z0xvZyh7YWRkcmVzcyxwdWJsaWNLZXksYm9tT3AsYm9tQWRkcmVzcyxwcml2YXRlS2V5fSk7CiAgICB2YXIgZmllbGRzID0gW107CiAgICB2YXIgeyBiYWxhbmNlIH0gPSBhd2FpdCB0aGlzLmJhbGFuY2UoYWRkcmVzcyk7CiAgICAvLyB0aGlzLmRlYnVnTG9nKCcjIyMjIyMjIyMjIyMjIyMjIGJhbGFuY2UuQ291bnRlcjogJyArIGJhbGFuY2UuQ291bnRlcik7CiAgICBmaWVsZHMucHVzaChiYWxhbmNlLkNvdW50ZXIpOwogICAgZmllbGRzLnB1c2goYWRkcmVzcyk7CiAgICBmaWVsZHMucHVzaChib21PcCk7CiAgICBmaWVsZHMucHVzaChib21BZGRyZXNzKTsKCiAgICB2YXIgeyBzaWcgfSA9IGF3YWl0IHRoaXMuc2lnbk1lc3NhZ2UoZmllbGRzLHByaXZhdGVLZXkpOwoKICAgIHZhciByZXMgPSBhd2FpdCB0aGlzLmJvbVVwZGF0ZVdpdGhTaWcoc2lnLGFkZHJlc3MscHVibGljS2V5LGJvbU9wLGJvbUFkZHJlc3MpOwoKICAgIHJldHVybiByZXM7CiAgfQp9Owo=", "base64_Y2xhc3MgU21hcnRDb250cmFjdCBleHRlbmRzIFNtYXJ0Q29udHJhY3RCYXNlIHsKICBjb25zdHJ1Y3Rvcihob29rcykgewogICAgICBzdXBlcihob29rcykKICAgICAgdGhpcy5kZWJ1Z0xvZygnKioqKioqKioqKioqKiogU21hcnRDb250cmFjdCcpOwogIH0KCiAgYXN5bmMgZWNobygpIHsKICAgICAgdGhpcy5kZWJ1Z0xvZygnZWNobycpOwogICAgICB2YXIgcnZhbCA9IHsKICAgICAgICAgIGRhdGE6ICdoZWxsbycKICAgICAgfTsKICAgICAgdGhpcy5ob29rcy5maW5pc2gucmVzb2x2ZShydmFsKTsKICB9CgogIGFzeW5jIHdpbmVtYWtlck1pbnRPaygpIHsgCiAgICB0aGlzLmRlYnVnTG9nKCdleGVjdXRlIHdpbmVtYWtlck1pbnRPaycpOwogICAgICB2YXIgXyA9IHRoaXMuaG9va3MuXzsKICAgICAgdmFyIHNzID0gdGhpcy5ob29rcy5zY3JlZW5TdGF0ZTsKICAgICAgdmFyIGFwcCA9IHRoaXMuaG9va3MuYXBwOwogICAgICB2YXIgdXNlckNyZWRlbnRpYWxzID0gYXBwLmdldEFwcFN0YXRlKCd1c2VyQ3JlZGVudGlhbHMnKTsKICAgICAgdmFyIHB1YmxpY0tleSA9IHVzZXJDcmVkZW50aWFscy5wdWJsaWNLZXk7CiAgICAgIHZhciBwcml2YXRlS2V5ID0gdXNlckNyZWRlbnRpYWxzLnByaXZhdGVLZXk7CiAgICAgIHZhciB3b3JrZmxvdyA9IHNzLndvcmtmbG93OwogICAgICB2YXIgbmV3SWQgPSB0aGlzLmhvb2tzLnNob3J0aWQuZ2VuZXJhdGUoKTsKICAgICAgdmFyIHBvcGNvZGVOYW1lID0gJ1dpbmVfJyArIG5ld0lkOwogICAgICB2YXIgeyBmb3JtIH0gPSB0aGlzLnN0YXRlOwogICAgICB0aGlzLmRlYnVnTG9nKGZvcm0pOwogICAgICB2YXIgeyBwb3Bjb2RlIH0gPSBhd2FpdCB0aGlzLmdlbmVyYXRlKCk7CiAgICAgIHZhciB7IGFkZHJlc3MgfSA9IHBvcGNvZGU7CiAgICAgIHZhciBuZXh0U3BvdCA9ICd0cnVja2VyLnBpY2t1cCc7CiAgICAgIHZhciBhbW91bnQgPSB0aGlzLnRvSW50ZWdlcihmb3JtLm1pbnRXaW5lQm90dGxlcy5BbW91bnQpOwogICAgICB2YXIgdW5pdCA9IGZvcm0ubWludFdpbmVCb3R0bGVzLlVuaXQ7CiAgICAgIHRoaXMuZGVidWdMb2coJyMjIyMjIyMjIyMjIyMlJSUlJSUlJSUlJSUlJCQkJCQkJCQkJCQkJCQgIGdlbmVyYXRlZCB3aW5lbWFrZXIgcG9wY29kZTonKTsKICAgICAgdGhpcy5kZWJ1Z0xvZyh7cG9wY29kZU5hbWUscG9wY29kZX0pOwogICAgICAKICAgICAgdmFyIGRhdGEgPQogICAgICAgICAgewogICAgICAgICAgICAiYXBwRGF0YSI6IHsKICAgICAgICAgICAgICAid29ya2Zsb3dEYXRhIjogZm9ybSwKICAgICAgICAgICAgICAid2luZUJvdHRsZXMiOiBhbW91bnQsCiAgICAgICAgICAgICAgIndpbmVVbml0IjogdW5pdCwKICAgICAgICAgICAgICAic3BvdCI6IG5leHRTcG90LAogICAgICAgICAgICAgICJ3b3JrZmxvd05hbWUiOiBzcy53b3JrZmxvdy5uYW1lLAogICAgICAgICAgICAgICJ3b3JrZmxvd0luc3RhbmNlSWQiOiBuZXdJZCwKICAgICAgICAgICAgICAid29ya2Zsb3dSb290UG9wY29kZSI6ICJ0cnVlIiwKICAgICAgICAgICAgICBwb3Bjb2RlTmFtZSAsCiAgICAgICAgICAgICAgIndvcmtmbG93RGVmIjogd29ya2Zsb3cKICAgICAgICAgICAgfQogICAgICAgICAgfTsKCiAgICAgIHRoaXMuZGVidWdMb2coZGF0YSk7CgogICAgICB2YXIgcmVzID0gYXdhaXQgdGhpcy5zaWduQW5kTWludChhZGRyZXNzLGRhdGEscHVibGljS2V5LGFtb3VudCx1bml0LHByaXZhdGVLZXkpOwogICAgICAvLyB0aGlzLmRlYnVnTG9nKCd0aGlzLnNpZ25BbmRNaW50IHJlcy5ib2R5LmtleXM6ICcgKyBPYmplY3Qua2V5cyhyZXMuYm9keSkpOwoKICAgICAgdmFyIHJ2YWwgPSB7CiAgICAgICAgICBhY3Rpb246IFtdCiAgICAgIH07CiAgICAgIHRoaXMuaG9va3MuZmluaXNoLnJlc29sdmUocnZhbCk7CiAgICAgIHJldHVybiBhZGRyZXNzOwogICAgCiAgfQogIHRvSW50ZWdlcih2YWx1ZSkgewogICAgdmFyIF8gPSB0aGlzLmhvb2tzLl87CiAgICBpZihfLmlzU3RyaW5nKHZhbHVlKSkKICAgICAgcmV0dXJuIHBhcnNlSW50KHZhbHVlKTsKICAgIGVsc2UKICAgICAgcmV0dXJuIHZhbHVlOwogIH0KICBhc3luYyB0cnVja2VyUGlja3VwT2soKSB7IAogICAgdGhpcy5kZWJ1Z0xvZygnZXhlY3V0ZSB0cnVja2VyUGlja3VwT2snKTsKICAgIHZhciBmb3JtID0gdGhpcy5zdGF0ZS5mb3JtOwogICAgdGhpcy5kZWJ1Z0xvZyh7Zm9ybX0pOwogICAgCiAgICB2YXIgcnZhbCA9IHsKICAgICAgICBhY3Rpb246IFtdCiAgICB9OwoKICAgIHZhciBfID0gdGhpcy5ob29rcy5fOwogICAgdmFyIHNzID0gdGhpcy5ob29rcy5zY3JlZW5TdGF0ZTsKICAgIHZhciBhcHAgPSB0aGlzLmhvb2tzLmFwcDsKICAgIHZhciB3b3JrZmxvdyA9IHNzLndvcmtmbG93OwogICAgCiAgICB2YXIgdXNlckNyZWRlbnRpYWxzID0gYXBwLmdldEFwcFN0YXRlKCd1c2VyQ3JlZGVudGlhbHMnKTsKICAgIHZhciB1c2VyUHVibGljS2V5ID0gdXNlckNyZWRlbnRpYWxzLnB1YmxpY0tleTsKICAgIHZhciB1c2VyUHJpdmF0ZUtleSA9IHVzZXJDcmVkZW50aWFscy5wcml2YXRlS2V5OwogICAgCiAgICB2YXIgc3JjUG9wY29kZSA9IHRoaXMuc3RhdGUucG9wY29kZTsKICAgIAoKICAgIHZhciBkZXN0QW1vdW50ID0gdGhpcy50b0ludGVnZXIodGhpcy5zdGF0ZS5mb3JtLndpdGhkcmF3LnBpY2t1cEFtb3VudCk7CiAgICB2YXIgZGVzdE5hbWUgPSAiVHJ1Y2tfIiArIHVzZXJDcmVkZW50aWFscy5zZXNzaW9uSWQ7CiAgICAKICAgIHZhciBkYXRhID0geyBkZXNjcmlwdGlvbjogYHdpdGhkcmF3ICR7ZGVzdEFtb3VudH0gYm90dGxlcyBvZiB3aW5lYCB9OwogICAgdmFyIHNvdXJjZU91dHB1dCA9IDA7CiAgICAKICAgIHRoaXMuZGVidWdMb2coJ2dldCB0cnVjayBwb3Bjb2RlOiAnICsgZGVzdE5hbWUpOwogICAgdmFyIHRydWNrUG9wY29kZSA9IGF3YWl0IHRoaXMub25lQnlOYW1lKGRlc3ROYW1lKTsKICAgIHRoaXMuZGVidWdMb2codHJ1Y2tQb3Bjb2RlKTsKICAgICAKICAgIHRoaXMuZGVidWdMb2coJ2NoZWNrIHNvdXJjZSB3aW5lIGJvdHRsZSBjb3VudCcpOwogICAgdmFyIHdpbmVCb3R0bGVzID0gdGhpcy50b0ludGVnZXIoc3JjUG9wY29kZS5hcHBEYXRhLndpbmVCb3R0bGVzKTsKICAgIHZhciB3aW5lVW5pdCA9IHNyY1BvcGNvZGUuYXBwRGF0YS53aW5lVW5pdDsKICAgIHRoaXMuZGVidWdMb2coe3NyY1BvcGNvZGV9KTsKICAgIHRoaXMuZGVidWdMb2coe3dpbmVCb3R0bGVzLGRlc3RBbW91bnQsd2luZVVuaXR9KTsKICAgIAogICAgaWYoXy5pc05pbChkZXN0QW1vdW50KSB8fCBfLmlzTmFOKGRlc3RBbW91bnQpKSB7CiAgICAgIHRoaXMuZGVidWdMb2coJyoqKioqKioqKioqKioqKioqKiBlcnJvciBiYWQgZGVzdEFtb3VudCknKTsKICAgICAgdGhpcy5ob29rcy5maW5pc2gucmVzb2x2ZShydmFsKTsKICAgICAgcmV0dXJuIDsKICAgIH0KICAgIAogICAgaWYoXy5pc05pbCh3aW5lQm90dGxlcykgfHwgXy5pc05hTihkZXN0QW1vdW50KSkgewogICAgICB0aGlzLmRlYnVnTG9nKCcqKioqKioqKioqKioqKioqKiogZXJyb3IgYmFkIHdpbmVCb3R0bGVzJyk7CiAgICAgIHRoaXMuaG9va3MuZmluaXNoLnJlc29sdmUocnZhbCk7CiAgICAgIHJldHVybiA7CiAgICB9CiAgICAKICAgIGlmKGRlc3RBbW91bnQgPiB3aW5lQm90dGxlcykgewogICAgICB0aGlzLmRlYnVnTG9nKCcqKioqKioqKioqKioqKioqKiogZXJyb3IgZGVzdEFtb3VudCA+IHdpbmVCb3R0bGVzJyk7CiAgICAgIHRoaXMuaG9va3MuZmluaXNoLnJlc29sdmUocnZhbCk7CiAgICAgIHJldHVybiA7CiAgICB9CiAgICAgCiAgICB2YXIgdHJ1Y2tCb3R0bGVzOwogICAgaWYgKF8uaXNOaWwodHJ1Y2tQb3Bjb2RlKSkgewogICAgICB0aGlzLmRlYnVnTG9nKCdNaW50aW5nIHRydWNrIHBvcGNvZGU6ICcgKyBkZXN0TmFtZSk7CiAgICAgIHZhciB0cnVja1Nwb3QgPSAndHJ1Y2tlci5zaG93JzsKICAgICAgdmFyIG5ld0lkID0gdGhpcy5ob29rcy5zaG9ydGlkLmdlbmVyYXRlKCk7CiAgICAgIHZhciB0cnVja1N0YXJ0QW1vdW50ID0gMDsKICAgICAgdmFyIHRydWNrVW5pdCA9ICdib3R0bGVzIG9mIHdpbmUnOwogICAgICB0cnVja0JvdHRsZXMgPSAwOwogICAgICB2YXIgdHJ1Y2tEYXRhID0KICAgICAgICAgIHsKICAgICAgICAgICAgImFwcERhdGEiOiB7CiAgICAgICAgICAgICAgIndvcmtmbG93RGF0YSI6IHt9LAogICAgICAgICAgICAgICJzcG90IjogdHJ1Y2tTcG90LAogICAgICAgICAgICAgICJ3aW5lQm90dGxlcyI6IHRydWNrQm90dGxlcywKICAgICAgICAgICAgICAid2luZVVuaXQiOiB3aW5lVW5pdCwKICAgICAgICAgICAgICAid29ya2Zsb3dOYW1lIjogc3Mud29ya2Zsb3cubmFtZSwKICAgICAgICAgICAgICAid29ya2Zsb3dJbnN0YW5jZUlkIjogbmV3SWQsCiAgICAgICAgICAgICAgIndvcmtmbG93Um9vdFBvcGNvZGUiOiAidHJ1ZSIsCiAgICAgICAgICAgICAgcG9wY29kZU5hbWU6IGRlc3ROYW1lLAogICAgICAgICAgICAgICJ3b3JrZmxvd0RlZiI6IHdvcmtmbG93CiAgICAgICAgICAgIH0KICAgICAgICAgIH07CiAgICAgIHZhciBuZXdQb3Bjb2RlID0gYXdhaXQgdGhpcy5nZW5lcmF0ZSgpOwogICAgICB2YXIgdHJ1Y2tBZGRyZXNzID0gbmV3UG9wY29kZS5wb3Bjb2RlLmFkZHJlc3M7CiAgICAgIAogICAgICB2YXIgcmVzID0gYXdhaXQgdGhpcy5zaWduQW5kTWludCh0cnVja0FkZHJlc3MsdHJ1Y2tEYXRhLHVzZXJQdWJsaWNLZXksdHJ1Y2tTdGFydEFtb3VudCx0cnVja1VuaXQsdXNlclByaXZhdGVLZXkpOwogICAgICAKICAgICAgdHJ1Y2tQb3Bjb2RlID0gYXdhaXQgdGhpcy5vbmVCeU5hbWUoZGVzdE5hbWUpOwogICAgfQogICAgZWxzZSB7CiAgICAgIHRoaXMuZGVidWdMb2coJ0ZvdW5kIGV4aXN0aW5nIHRydWNrIHBvcGNvZGU6ICcgKyBkZXN0TmFtZSk7CiAgICAgIHRydWNrQm90dGxlcyA9IHRydWNrUG9wY29kZS5hcHBEYXRhLndpbmVCb3R0bGVzOwogICAgfQogICAgCiAgICBpZihfLmlzTmlsKHRydWNrUG9wY29kZSkpIHsKICAgICAgdGhpcy5kZWJ1Z0xvZygnKioqKioqKioqKioqKioqKioqIEVycm9yIG1pbnRpbmcgdHJ1Y2sgcG9wY29kZScpOwogICAgICB0aGlzLmhvb2tzLmZpbmlzaC5yZXNvbHZlKHJ2YWwpOwogICAgICByZXR1cm4gOwogICAgfQogICAgCiAgICB0aGlzLmRlYnVnTG9nKCcjIyMjIyMjIyMjIyMjIyMjIHRydWNrIHBvcGNvZGU6Jyk7CiAgICB0aGlzLmRlYnVnTG9nKHRydWNrUG9wY29kZSk7CiAgICAKICAgIHZhciB3cmVzID0gYXdhaXQgdGhpcy5zaWduQW5kV2l0aGRyYXcoCiAgICAgIHNyY1BvcGNvZGUucHJpdmF0ZUtleSwKICAgICAgc3JjUG9wY29kZS5hZGRyZXNzLAogICAgICB0cnVja1BvcGNvZGUuYWRkcmVzcywKICAgICAgZGVzdEFtb3VudCwKICAgICAgZGF0YSwKICAgICAgc291cmNlT3V0cHV0CiAgICApOwogICAgCiAgICB0aGlzLmRlYnVnTG9nKCcjIyMjIyMjIyMjIyMjIyMjIHdpdGhkcmF3IHJlc3VsdDonKTsKICAgIHRoaXMuZGVidWdMb2cod3Jlcyk7CiAgICBydmFsLndyZXMgPSB3cmVzOwogICAgCiAgICB0aGlzLmRlYnVnTG9nKCcjIyMjIyMjIyMjIyMjIyMjIHVwZGF0ZSBzb3VyY2Ugd2luZSBib3R0bGUgY291bnQ6Jyk7CiAgICB2YXIgd2luZUNvdW50ID0gd2luZUJvdHRsZXMgLSBkZXN0QW1vdW50OwogICAgdmFyIHdpbmVEYXRhID0KICAgICAgICB7CiAgICAgICAgICAiYXBwRGF0YSI6IHsKICAgICAgICAgICAgIndpbmVCb3R0bGVzIjogd2luZUNvdW50CiAgICAgICAgICB9CiAgICAgICAgfTsKCiAgICB0aGlzLmRlYnVnTG9nKHdpbmVEYXRhKTsKICAgIHZhciBicmVzID0gYXdhaXQgdGhpcy5ibG9iQ3JlYXRlKAogICAgICBzcmNQb3Bjb2RlLmFkZHJlc3MsCiAgICAgIHdpbmVEYXRhLAogICAgICB1c2VyQ3JlZGVudGlhbHMucHVibGljS2V5LAogICAgICB1c2VyQ3JlZGVudGlhbHMucHJpdmF0ZUtleSk7CiAgICAgIAogICAgdGhpcy5kZWJ1Z0xvZygnIyMjIyMjIyMjIyMjIyMjIyBibG9iQ3JlYXRlIHJlc3VsdDonKTsKICAgIHRoaXMuZGVidWdMb2coYnJlcyk7CiAgICBydmFsLmJyZXMgPSBicmVzOwogICAgCiAgICB0aGlzLmRlYnVnTG9nKCcjIyMjIyMjIyMjIyMjIyMjIHVwZGF0ZSB0cnVjayB3aW5lIGJvdHRsZSBjb3VudDonKTsKICAgIHZhciB0cnVja0NvdW50ID0gdHJ1Y2tCb3R0bGVzICsgZGVzdEFtb3VudDsKICAgIHZhciB0cnVja1dpbmVEYXRhID0KICAgICAgICB7CiAgICAgICAgICAiYXBwRGF0YSI6IHsKICAgICAgICAgICAgIndpbmVCb3R0bGVzIjogdHJ1Y2tDb3VudAogICAgICAgICAgfQogICAgICAgIH07CgogICAgdGhpcy5kZWJ1Z0xvZyh0cnVja1dpbmVEYXRhKTsKICAgIHZhciBicmVzMiA9IGF3YWl0IHRoaXMuYmxvYkNyZWF0ZSgKICAgICAgdHJ1Y2tQb3Bjb2RlLmFkZHJlc3MsCiAgICAgIHRydWNrV2luZURhdGEsCiAgICAgIHVzZXJDcmVkZW50aWFscy5wdWJsaWNLZXksCiAgICAgIHVzZXJDcmVkZW50aWFscy5wcml2YXRlS2V5KTsKICAgICAgCiAgICB0aGlzLmRlYnVnTG9nKCcjIyMjIyMjIyMjIyMjIyMjIHRydWNrIGJsb2JDcmVhdGUgcmVzdWx0OicpOwogICAgdGhpcy5kZWJ1Z0xvZyhicmVzMik7CiAgICBydmFsLmJyZXMyID0gYnJlczI7CiAgICAKICAgIHRoaXMuaG9va3MuZmluaXNoLnJlc29sdmUocnZhbCk7CiAgIH0KCn07Cg=="]
        }
    },
    "address": "34baf20d6d7149f0472451911e91937762152480",
    "workflowRootPopcode": "true",
    "transaction": [{
        "id": "<73ca06cdd753af2cb362378302dfb9141353b74fa280ed8ec0ee25f20874d7c0>",
        "popcode": "<34baf20d6d7149f0472451911e91937762152480>",
        "spot": "trucker.show",
        "unit": "bottles of wine",
        "txId": "73ca06cdd753af2cb362378302dfb9141353b74fa280ed8ec0ee25f20874d7c0",
        "data": {
            "metadata": {
                "appData": {
                    "workflowData": {},
                    "spot": "trucker.show",
                    "wineBottles": 0,
                    "wineUnit": "bottles of wine",
                    "workflowName": "wineV1",
                    "workflowInstanceId": "FKX7YQETA",
                    "workflowRootPopcode": "true",
                    "popcodeName": "Truck_PKETYWEVA",
                    "workflowDef": {
                        "title": "Wine V1",
                        "name": "wineV1",
                        "startScreen": "Home",
                        "version": "2.0",
                        "steps": {
                            "winemaker.mint": {
                                "step": "winemaker.mint",
                                "title": "Winemaker Mint",
                                "screen": "WinemakerMint"
                            },
                            "trucker.pickup": {
                                "step": "trucker.pickup",
                                "title": "Trucker Pickup",
                                "screen": "TruckerPickup"
                            },
                            "trucker.show": {"step": "trucker.show", "title": "Trucker Show", "screen": "TruckerShow"}
                        },
                        "appOptions": {"requireLogin": true},
                        "screens": {
                            "Home": {
                                "name": "Home",
                                "title": "Home",
                                "api": "/api/mobile",
                                "screenListItems": {
                                    "fetchItems": "/popcodeByWorkflowName",
                                    "method": "get",
                                    "api": "cayley",
                                    "fetchParameters": {"workflowName": "wineV1"},
                                    "itemDataTypes": {"popcode": "object"},
                                    "itemLabel": ["popcodeName"],
                                    "itemActions": {
                                        "click": {
                                            "title": "Click",
                                            "action": [{
                                                "operation": "startWorkflow",
                                                "replaceCurrent": true,
                                                "parameters": {"spot": "@popcode.spot", "popcode": "@popcode"}
                                            }],
                                            "parameters": {"popcode": "@item"}
                                        }
                                    }
                                },
                                "screenButtons": {
                                    "scan": {
                                        "title": "Scan",
                                        "action": [{"operation": "navigate", "screen": "Scan"}],
                                        "roles": ["admin", "winemaker", "trucker"]
                                    },
                                    "mint": {
                                        "title": "Mint",
                                        "action": [{
                                            "operation": "navigate",
                                            "resetStack": true,
                                            "screen": "WinemakerMint"
                                        }],
                                        "roles": ["admin", "winemaker"]
                                    }
                                }
                            },
                            "Scan": {
                                "name": "Scan",
                                "title": "Scan",
                                "api": "/api/mobile",
                                "parameters": {"user": "@user"},
                                "modal": false,
                                "screenScan": {},
                                "startAction": [{
                                    "operation": "scanBarcode",
                                    "barcodeTypes": ["qr", "code128"],
                                    "outputs": {"scanData": "@scanData"}
                                }, {
                                    "operation": "routePopcode",
                                    "parameters": {"scanData": "@scanData"},
                                    "outputs": {"address": "@address"}
                                }, {
                                    "operation": "fetch",
                                    "route": "/p",
                                    "method": "get",
                                    "parameters": {"address": "@address"},
                                    "outputs": {"popcode": "@popcodes[0]"}
                                }, {
                                    "operation": "startWorkflow",
                                    "replaceCurrent": true,
                                    "parameters": {"spot": "@popcode.spot", "popcode": "@popcode"}
                                }]
                            },
                            "WinemakerMint": {
                                "name": "WinemakerMint",
                                "title": "Winemaker Mint",
                                "api": "/api/mobile",
                                "parameters": {"container": "@container", "popcode": "@popcode", "user": "@user"},
                                "outputs": {"popcode": "@container"},
                                "screenForm": {
                                    "fields": {
                                        "type": "object",
                                        "properties": {
                                            "mintWineBottles": {
                                                "type": "object",
                                                "properties": {
                                                    "Amount": {
                                                        "type": "string",
                                                        "value": "1000",
                                                        "options": {"editable": true}
                                                    },
                                                    "Unit": {
                                                        "type": "string",
                                                        "value": "bottles of wine",
                                                        "options": {"editable": true}
                                                    }
                                                },
                                                "required": ["Amount", "Unit"]
                                            }
                                        },
                                        "required": ["mintWineBottles"]
                                    }, "options": {"auto": "labels"}
                                },
                                "screenButtons": {
                                    "mint": {
                                        "title": "Mint",
                                        "action": [{
                                            "operation": "contract",
                                            "contract": "winemakerMintOk",
                                            "parameters": {"popcode": "@popcode"},
                                            "outputs": {"status": "@status", "txId": "@txId"}
                                        }, {
                                            "operation": "navigate",
                                            "resetStack": true,
                                            "forceUpdate": true,
                                            "screen": "Home"
                                        }],
                                        "roles": ["admin", "winemaker"]
                                    },
                                    "cancel": {
                                        "title": "Cancel",
                                        "action": [{"operation": "navigate", "resetStack": true, "screen": "Home"}]
                                    }
                                }
                            },
                            "TruckerPickup": {
                                "name": "TruckerPickup",
                                "title": "Trucker Wine Pickup",
                                "api": "/api/mobile",
                                "parameters": {"container": "@container", "popcode": "@popcode", "user": "@user"},
                                "outputs": {"popcode": "@container"},
                                "tabs": {
                                    "tab1": {
                                        "title": "Pickup Wine",
                                        "screenForm": {
                                            "privateKey": ["winemaker", "admin"],
                                            "publicKey": ["winemaker", "trucker", "admin"],
                                            "fields": {
                                                "type": "object",
                                                "properties": {
                                                    "popcode": {
                                                        "type": "object",
                                                        "properties": {
                                                            "name": {
                                                                "type": "string",
                                                                "value": "@popcode.popcodeName",
                                                                "options": {"editable": false}
                                                            },
                                                            "address": {
                                                                "type": "string",
                                                                "value": "@popcode.address",
                                                                "options": {"editable": false}
                                                            },
                                                            "currentState": {
                                                                "type": "string",
                                                                "value": "@popcode.spot",
                                                                "options": {"editable": false}
                                                            }
                                                        },
                                                        "required": ["name", "address", "currentState"]
                                                    },
                                                    "warehouseContents": {
                                                        "type": "object",
                                                        "properties": {
                                                            "Amount": {
                                                                "type": "number",
                                                                "value": "@popcode.appData.wineBottles",
                                                                "options": {"editable": false}
                                                            },
                                                            "Unit": {
                                                                "type": "string",
                                                                "value": "@popcode.appData.wineUnit",
                                                                "options": {"editable": false}
                                                            }
                                                        }
                                                    },
                                                    "withdraw": {
                                                        "type": "object",
                                                        "properties": {
                                                            "pickupAmount": {
                                                                "type": "number",
                                                                "options": {"editable": true}
                                                            }
                                                        },
                                                        "required": ["pickupAmount"]
                                                    }
                                                },
                                                "required": ["withdraw"]
                                            },
                                            "options": {"auto": "labels"}
                                        }
                                    }, "tab2": {"title": "Popcode Graph", "graphView": {"visName": "wine"}}
                                },
                                "screenButtons": {
                                    "pickup": {
                                        "title": "Pickup",
                                        "action": [{
                                            "operation": "contract",
                                            "contract": "truckerPickupOk",
                                            "parameters": {"popcode": "@popcode"},
                                            "outputs": {"status": "@status", "txId": "@txId"}
                                        }, {
                                            "operation": "navigate",
                                            "resetStack": true,
                                            "forceUpdate": true,
                                            "screen": "Home"
                                        }],
                                        "roles": ["admin", "trucker"]
                                    },
                                    "cancel": {
                                        "title": "Cancel",
                                        "action": [{"operation": "navigate", "resetStack": true, "screen": "Home"}]
                                    }
                                }
                            },
                            "TruckerShow": {
                                "name": "TruckerShow",
                                "title": "Truck Popcode",
                                "api": "/api/mobile",
                                "parameters": {"container": "@container", "popcode": "@popcode", "user": "@user"},
                                "outputs": {"popcode": "@container"},
                                "tabs": {
                                    "tab1": {
                                        "title": "Truck Contents",
                                        "screenForm": {
                                            "privateKey": ["trucker", "admin"],
                                            "publicKey": ["winemaker", "trucker", "admin"],
                                            "fields": {
                                                "type": "object",
                                                "properties": {
                                                    "popcode": {
                                                        "type": "object",
                                                        "properties": {
                                                            "name": {
                                                                "type": "string",
                                                                "value": "@popcode.popcodeName",
                                                                "options": {"editable": false}
                                                            },
                                                            "address": {
                                                                "type": "string",
                                                                "value": "@popcode.address",
                                                                "options": {"editable": false}
                                                            },
                                                            "currentState": {
                                                                "type": "string",
                                                                "value": "@popcode.spot",
                                                                "options": {"editable": false}
                                                            }
                                                        },
                                                        "required": ["name", "address", "currentState"]
                                                    },
                                                    "truckContents": {
                                                        "type": "object",
                                                        "properties": {
                                                            "Amount": {
                                                                "type": "number",
                                                                "value": "@popcode.appData.wineBottles",
                                                                "options": {"editable": false}
                                                            },
                                                            "Unit": {
                                                                "type": "string",
                                                                "value": "@popcode.appData.wineUnit",
                                                                "options": {"editable": false}
                                                            }
                                                        }
                                                    }
                                                }
                                            },
                                            "options": {"auto": "labels"}
                                        }
                                    }, "tab2": {"title": "Popcode Graph", "graphView": {"visName": "wine"}}
                                },
                                "screenButtons": {
                                    "ok": {
                                        "title": "Ok",
                                        "action": [{"operation": "navigate", "resetStack": true, "screen": "Home"}]
                                    }
                                }
                            }
                        },
                        "contractLib": {
                            "name": "Wine SmartContract Library",
                            "version": "1.0",
                            "slug": "wine_1_0",
                            "libs": ["base64_Y2xhc3MgU21hcnRDb250cmFjdEJhc2UgewogIGNvbnN0cnVjdG9yKGhvb2tzKSB7CiAgICAgIHRoaXMuaG9va3MgPSBob29rczsKICAgICAgdGhpcy5zdGF0ZSA9IGhvb2tzLnN0YXRlOwogICAgICB0aGlzLmRlYnVnTG9nID0gaG9va3MuZGVidWdMb2c7CiAgICAgIHRoaXMuZGVidWdMb2coJ2NvbnN0cnVjdCBTbWFydENvbnRyYWN0QmFzZScpOwogIH0KICBkZWJ1Z1NpemUobykgewogICAgdmFyIHMgPSBKU09OLnN0cmluZ2lmeShvKTsKICAgIHRoaXMuZGVidWdMb2coYHNpemU6ICR7cy5sZW5ndGgvMTAyNH0ga2ApOwogIH0KICBhc3luYyBieU5hbWUocE5hbWUpIHsKICAgIHZhciBhcGkgPSB0aGlzLmhvb2tzLnN0YWNrLmFwaTsKICAgIHZhciB1cmwgPSAnL3AvbmFtZS8nICsgcE5hbWU7CiAgICBjb25zdCByZXMgPSBhd2FpdCBhcGkuZ2V0KHVybCk7CiAgICByZXR1cm4gcmVzLmJvZHk7CiAgfQogIGFzeW5jIG9uZUJ5TmFtZShwTmFtZSkgewogICAgdmFyIF8gPSB0aGlzLmhvb2tzLl87CiAgICB2YXIgYXBpID0gdGhpcy5ob29rcy5zdGFjay5hcGk7CiAgICB2YXIgdXJsID0gJy9wL25hbWUvJyArIHBOYW1lOwogICAgY29uc3QgcmVzID0gYXdhaXQgYXBpLmdldCh1cmwpOwogICAgdmFyIHBvcGNvZGVzID0gIV8uaXNOaWwocmVzKQogICAgICYmICFfLmlzTmlsKHJlcy5ib2R5KQogICAgICYmICFfLmlzTmlsKHJlcy5ib2R5LnBvcGNvZGVzKSA/IHJlcy5ib2R5LnBvcGNvZGVzIDogbnVsbDsKICAgIHZhciBwb3Bjb2RlID0gXy5pc0FycmF5KHBvcGNvZGVzKSAmJiBwb3Bjb2Rlcy5sZW5ndGggPiAwCiAgICAgPyBwb3Bjb2Rlc1swXSA6IG51bGw7CiAgICByZXR1cm4gcG9wY29kZTsKICB9CiAgYXN5bmMgYmFsYW5jZShhZGRyZXNzKSB7CiAgICB2YXIgYXBpID0gdGhpcy5ob29rcy5zdGFjay5hcGk7CiAgICB2YXIgdXJsID0gJy9wL2JhbGFuY2UvJyArIGFkZHJlc3M7CiAgICBjb25zdCByZXMgPSBhd2FpdCBhcGkuZ2V0KHVybCk7CiAgICByZXR1cm4gcmVzLmJvZHk7CiAgfQogIGFzeW5jIGdlbmVyYXRlKCkgewogICAgdmFyIGFwaSA9IHRoaXMuaG9va3Muc3RhY2suYXBpOwogICAgdmFyIHVybCA9ICcvcC9nZW5lcmF0ZSc7CiAgICBjb25zdCByZXMgPSBhd2FpdCBhcGkuZ2V0KHVybCk7CiAgICByZXR1cm4gcmVzLmJvZHk7CiAgfQogIGFzeW5jIGNvbnRhaW5lclBvcGNvZGUoYWRkcmVzcykgewogICAgdmFyIGFwaSA9IHRoaXMuaG9va3Muc3RhY2suYXBpQ2F5bGV5OwogICAgdmFyIHVybCA9ICcvY29udGFpbmVyUG9wY29kZS8nICsgYWRkcmVzczsKICAgIGNvbnN0IHJlcyA9IGF3YWl0IGFwaS5nZXQodXJsKTsKICAgIHJldHVybiByZXMuYm9keTsKICB9CiAgYXN5bmMgYm9tUG9wY29kZXMoYWRkcmVzcykgewogICAgdmFyIGFwaSA9IHRoaXMuaG9va3Muc3RhY2suYXBpQ2F5bGV5OwogICAgdmFyIHVybCA9ICcvYm9tUG9wY29kZXMvJyArIGFkZHJlc3M7CiAgICBjb25zdCByZXMgPSBhd2FpdCBhcGkuZ2V0KHVybCk7CiAgICByZXR1cm4gcmVzLmJvZHk7CiAgfQogIGFzeW5jIHNpZ25NZXNzYWdlKGZpZWxkcyxwcml2YXRlS2V5KSB7CiAgICB2YXIgYXBpID0gdGhpcy5ob29rcy5zdGFjay5hcGk7CiAgICB2YXIgYm9keSA9IHsKICAgICAgZmllbGRzLAogICAgICBwcml2YXRlS2V5CiAgICB9OwogICAgdmFyIHVybCA9ICcvY3J5cHRvL3NpZ25NZXNzYWdlJzsKICAgIHRoaXMuZGVidWdMb2coJyoqKioqKioqKioqIHNpZ25NZXNzYWdlJyk7CiAgICB0aGlzLmRlYnVnTG9nKHtib2R5fSk7CiAgICBjb25zdCByZXMgPSBhd2FpdCBhcGkucG9zdCh1cmwsIHtib2R5fSk7CiAgICB0aGlzLmRlYnVnTG9nKHtib2R5OiByZXMuYm9keX0pOwogICAgcmV0dXJuIHJlcy5ib2R5OwogIH0KICBhc3luYyBibG9iQ3JlYXRlV2l0aFNpZyhzaWcsYWRkcmVzcyxkYXRhLHB1YmxpY0tleSkgewogICAgdmFyIGFwaSA9IHRoaXMuaG9va3Muc3RhY2suYXBpOwogICAgdmFyIGJvZHkgPSB7CiAgICAgIHNpZywKICAgICAgYWRkcmVzcywKICAgICAgcHVibGljS2V5LAogICAgICBkYXRhCiAgICB9OwogICAgdmFyIHVybCA9ICcvcC9ibG9iQ3JlYXRlV2l0aFNpZyc7CiAgICBjb25zdCByZXMgPSBhd2FpdCBhcGkucG9zdCh1cmwsIHtib2R5fSk7CiAgICByZXR1cm4gcmVzLmJvZHk7CiAgfQogIGFzeW5jIGJsb2JDcmVhdGUoYWRkcmVzcyxkYXRhLHB1YmxpY0tleSxwcml2YXRlS2V5KSB7CiAgICB2YXIgZmllbGRzID0gW107CgogICAgdmFyIHJlcyA9IGF3YWl0IHRoaXMuYmFsYW5jZShhZGRyZXNzKTsKICAgIGZpZWxkcy5wdXNoKHJlcy5iYWxhbmNlLkNvdW50ZXIpOwogICAgZmllbGRzLnB1c2goYWRkcmVzcyk7CiAgICBmaWVsZHMucHVzaChkYXRhKTsKCiAgICByZXMgPSBhd2FpdCB0aGlzLnNpZ25NZXNzYWdlKGZpZWxkcyxwcml2YXRlS2V5KTsKCiAgICByZXMgPSBhd2FpdCB0aGlzLmJsb2JDcmVhdGVXaXRoU2lnKHJlcy5zaWcsYWRkcmVzcyxkYXRhLHB1YmxpY0tleSk7CgogICAgcmV0dXJuIHJlczsKICB9CiAgYXN5bmMgbWludChzaWcsYWRkcmVzcyxkYXRhLHB1YmxpY0tleSxhbW91bnQsdW5pdCkgewogICAgdmFyIGFwaSA9IHRoaXMuaG9va3Muc3RhY2suYXBpOwogICAgdmFyIGJvZHkgPSB7CiAgICAgIHNpZywKICAgICAgYWRkcmVzcywKICAgICAgcHVibGljS2V5LAogICAgICBhbW91bnQsCiAgICAgIHVuaXQsCiAgICAgIGRhdGEKICAgIH07CiAgICB0aGlzLmRlYnVnTG9nKCcqKioqKioqKioqKiBkbyBtaW50Jyk7CiAgICB0aGlzLmRlYnVnTG9nKHtib2R5fSk7CiAgICB0aGlzLmRlYnVnTG9nKHthcGl9KTsKICAgIHRoaXMuZGVidWdTaXplKGJvZHkpOwogICAgdmFyIHVybCA9ICcvcC9taW50JzsKICAgIGNvbnN0IHJlcyA9IGF3YWl0IGFwaS5wb3N0KHVybCwge2JvZHl9KTsKICAgIHRoaXMuZGVidWdMb2coJyoqKioqKioqKioqIG1pbnQgcmVzdWx0Jyk7CiAgICB0aGlzLmRlYnVnTG9nKHJlcyk7CiAgICByZXR1cm4gcmVzOwogIH0KICBhc3luYyBzaWduQW5kTWludChhZGRyZXNzLGRhdGEscHVibGljS2V5LGFtb3VudCx1bml0LHByaXZhdGVLZXkpIHsKICAgIHRoaXMuZGVidWdMb2coJ3NpZ25BbmRNaW50Jyk7CiAgICB0aGlzLmRlYnVnTG9nKHthZGRyZXNzLGRhdGEscHVibGljS2V5LGFtb3VudCx1bml0LHByaXZhdGVLZXl9KTsKICAgIHZhciBmaWVsZHMgPSBbXTsKICAgIHZhciB7IGJhbGFuY2UgfSA9IGF3YWl0IHRoaXMuYmFsYW5jZShhZGRyZXNzKTsKICAgIC8vIHRoaXMuZGVidWdMb2coJyMjIyMjIyMjIyMjIyMjIyMgYmFsYW5jZS5Db3VudGVyOiAnICsgYmFsYW5jZS5Db3VudGVyKTsKICAgIGZpZWxkcy5wdXNoKGJhbGFuY2UuQ291bnRlcik7CiAgICBmaWVsZHMucHVzaChhZGRyZXNzKTsKICAgIGZpZWxkcy5wdXNoKGFtb3VudCk7CiAgICBmaWVsZHMucHVzaCh1bml0KTsKICAgIGZpZWxkcy5wdXNoKGRhdGEpOwoKICAgIHZhciB7IHNpZyB9ID0gYXdhaXQgdGhpcy5zaWduTWVzc2FnZShmaWVsZHMscHJpdmF0ZUtleSk7CgogICAgdmFyIHJlcyA9IGF3YWl0IHRoaXMubWludChzaWcsYWRkcmVzcyxkYXRhLHB1YmxpY0tleSxhbW91bnQsdW5pdCk7CgogICAgcmV0dXJuIHJlczsKICB9CiAgYXN5bmMgd2l0aGRyYXcoc2lnLHByaXZhdGVLZXksZGVzdEFkZHJlc3MsZGVzdEFtb3VudCxkYXRhLHNvdXJjZU91dHB1dCkgewogICAgdmFyIGFwaSA9IHRoaXMuaG9va3Muc3RhY2suYXBpOwogICAgdmFyIGJvZHkgPSB7CiAgICAgIHNpZywKICAgICAgcHJpdmF0ZUtleSwKICAgICAgZGVzdEFkZHJlc3MsCiAgICAgIGRlc3RBbW91bnQsCiAgICAgIGRhdGEsCiAgICAgIHNvdXJjZU91dHB1dAogICAgfTsKICAgIHRoaXMuZGVidWdMb2coJyoqKioqKioqKioqIHdpdGhkcmF3Jyk7CiAgICB0aGlzLmRlYnVnTG9nKHtib2R5fSk7CiAgICB2YXIgdXJsID0gJy9wL3dpdGhkcmF3JzsKICAgIGNvbnN0IHJlcyA9IGF3YWl0IGFwaS5wb3N0KHVybCwge2JvZHl9KTsKICAgIHJldHVybiByZXM7CiAgfQogIGFzeW5jIHNpZ25BbmRXaXRoZHJhdyhwcml2YXRlS2V5LHNvdXJjZUFkZHJlc3MsZGVzdEFkZHJlc3MsZGVzdEFtb3VudCxkYXRhLHNvdXJjZU91dHB1dCkgewogICAgdGhpcy5kZWJ1Z0xvZygnc2lnbkFuZFdpdGhkcmF3Jyk7CiAgICB0aGlzLmRlYnVnTG9nKHtwcml2YXRlS2V5LHNvdXJjZUFkZHJlc3MsZGVzdEFkZHJlc3MsZGVzdEFtb3VudCxkYXRhLHNvdXJjZU91dHB1dH0pOwogICAgdmFyIGZpZWxkcyA9IFtdOwogICAgdmFyIHsgYmFsYW5jZSB9ID0gYXdhaXQgdGhpcy5iYWxhbmNlKHNvdXJjZUFkZHJlc3MpOwogICAgLy8gdGhpcy5kZWJ1Z0xvZygnIyMjIyMjIyMjIyMjIyMjIyBiYWxhbmNlLkNvdW50ZXI6ICcgKyBiYWxhbmNlLkNvdW50ZXIpOwogICAgZmllbGRzLnB1c2goYmFsYW5jZS5Db3VudGVyKTsKICAgIGZpZWxkcy5wdXNoKGRlc3RBZGRyZXNzKTsKICAgIGZpZWxkcy5wdXNoKGRhdGEpOwogICAgZmllbGRzLnB1c2goc291cmNlT3V0cHV0KTsKICAgIGZpZWxkcy5wdXNoKGRlc3RBbW91bnQpOwoKICAgIHZhciB7IHNpZyB9ID0gYXdhaXQgdGhpcy5zaWduTWVzc2FnZShmaWVsZHMscHJpdmF0ZUtleSk7CgogICAgdmFyIHJlcyA9IGF3YWl0IHRoaXMud2l0aGRyYXcoc2lnLHByaXZhdGVLZXksZGVzdEFkZHJlc3MsZGVzdEFtb3VudCxkYXRhLHNvdXJjZU91dHB1dCk7CgogICAgcmV0dXJuIHJlczsKICB9CiAgYXN5bmMgYm9tVXBkYXRlV2l0aFNpZyhzaWcsYWRkcmVzcyxwdWJsaWNLZXksYm9tT3AsYm9tQWRkcmVzcykgewogICAgdmFyIGFwaSA9IHRoaXMuaG9va3Muc3RhY2suYXBpOwogICAgdmFyIGJvZHkgPSB7CiAgICAgIHNpZywKICAgICAgYWRkcmVzcywKICAgICAgcHVibGljS2V5LAogICAgICBib21PcCwKICAgICAgYm9tQWRkcmVzcwogICAgfTsKICAgIHRoaXMuZGVidWdMb2coJyoqKioqKioqKioqIGRvIGJvbVVwZGF0ZScpOwogICAgdGhpcy5kZWJ1Z0xvZyh7Ym9keX0pOwogICAgdGhpcy5kZWJ1Z0xvZyh7YXBpfSk7CiAgICB0aGlzLmRlYnVnU2l6ZShib2R5KTsKICAgIHZhciB1cmwgPSAnL3AvYm9tVXBkYXRlV2l0aFNpZyc7CiAgICBjb25zdCByZXMgPSBhd2FpdCBhcGkucG9zdCh1cmwsIHtib2R5fSk7CiAgICB0aGlzLmRlYnVnTG9nKCcqKioqKioqKioqKiBib21VcGRhdGUgcmVzdWx0Jyk7CiAgICB0aGlzLmRlYnVnTG9nKHJlcyk7CiAgICByZXR1cm4gcmVzOwogIH0KICBhc3luYyBzaWduQW5kVXBkYXRlQm9tKGFkZHJlc3MscHVibGljS2V5LGJvbU9wLGJvbUFkZHJlc3MscHJpdmF0ZUtleSkgewogICAgdGhpcy5kZWJ1Z0xvZygnc2lnbkFuZFVwZGF0ZUJvbScpOwogICAgdGhpcy5kZWJ1Z0xvZyh7YWRkcmVzcyxwdWJsaWNLZXksYm9tT3AsYm9tQWRkcmVzcyxwcml2YXRlS2V5fSk7CiAgICB2YXIgZmllbGRzID0gW107CiAgICB2YXIgeyBiYWxhbmNlIH0gPSBhd2FpdCB0aGlzLmJhbGFuY2UoYWRkcmVzcyk7CiAgICAvLyB0aGlzLmRlYnVnTG9nKCcjIyMjIyMjIyMjIyMjIyMjIGJhbGFuY2UuQ291bnRlcjogJyArIGJhbGFuY2UuQ291bnRlcik7CiAgICBmaWVsZHMucHVzaChiYWxhbmNlLkNvdW50ZXIpOwogICAgZmllbGRzLnB1c2goYWRkcmVzcyk7CiAgICBmaWVsZHMucHVzaChib21PcCk7CiAgICBmaWVsZHMucHVzaChib21BZGRyZXNzKTsKCiAgICB2YXIgeyBzaWcgfSA9IGF3YWl0IHRoaXMuc2lnbk1lc3NhZ2UoZmllbGRzLHByaXZhdGVLZXkpOwoKICAgIHZhciByZXMgPSBhd2FpdCB0aGlzLmJvbVVwZGF0ZVdpdGhTaWcoc2lnLGFkZHJlc3MscHVibGljS2V5LGJvbU9wLGJvbUFkZHJlc3MpOwoKICAgIHJldHVybiByZXM7CiAgfQp9Owo=", "base64_Y2xhc3MgU21hcnRDb250cmFjdCBleHRlbmRzIFNtYXJ0Q29udHJhY3RCYXNlIHsKICBjb25zdHJ1Y3Rvcihob29rcykgewogICAgICBzdXBlcihob29rcykKICAgICAgdGhpcy5kZWJ1Z0xvZygnKioqKioqKioqKioqKiogU21hcnRDb250cmFjdCcpOwogIH0KCiAgYXN5bmMgZWNobygpIHsKICAgICAgdGhpcy5kZWJ1Z0xvZygnZWNobycpOwogICAgICB2YXIgcnZhbCA9IHsKICAgICAgICAgIGRhdGE6ICdoZWxsbycKICAgICAgfTsKICAgICAgdGhpcy5ob29rcy5maW5pc2gucmVzb2x2ZShydmFsKTsKICB9CgogIGFzeW5jIHdpbmVtYWtlck1pbnRPaygpIHsgCiAgICB0aGlzLmRlYnVnTG9nKCdleGVjdXRlIHdpbmVtYWtlck1pbnRPaycpOwogICAgICB2YXIgXyA9IHRoaXMuaG9va3MuXzsKICAgICAgdmFyIHNzID0gdGhpcy5ob29rcy5zY3JlZW5TdGF0ZTsKICAgICAgdmFyIGFwcCA9IHRoaXMuaG9va3MuYXBwOwogICAgICB2YXIgdXNlckNyZWRlbnRpYWxzID0gYXBwLmdldEFwcFN0YXRlKCd1c2VyQ3JlZGVudGlhbHMnKTsKICAgICAgdmFyIHB1YmxpY0tleSA9IHVzZXJDcmVkZW50aWFscy5wdWJsaWNLZXk7CiAgICAgIHZhciBwcml2YXRlS2V5ID0gdXNlckNyZWRlbnRpYWxzLnByaXZhdGVLZXk7CiAgICAgIHZhciB3b3JrZmxvdyA9IHNzLndvcmtmbG93OwogICAgICB2YXIgbmV3SWQgPSB0aGlzLmhvb2tzLnNob3J0aWQuZ2VuZXJhdGUoKTsKICAgICAgdmFyIHBvcGNvZGVOYW1lID0gJ1dpbmVfJyArIG5ld0lkOwogICAgICB2YXIgeyBmb3JtIH0gPSB0aGlzLnN0YXRlOwogICAgICB0aGlzLmRlYnVnTG9nKGZvcm0pOwogICAgICB2YXIgeyBwb3Bjb2RlIH0gPSBhd2FpdCB0aGlzLmdlbmVyYXRlKCk7CiAgICAgIHZhciB7IGFkZHJlc3MgfSA9IHBvcGNvZGU7CiAgICAgIHZhciBuZXh0U3BvdCA9ICd0cnVja2VyLnBpY2t1cCc7CiAgICAgIHZhciBhbW91bnQgPSB0aGlzLnRvSW50ZWdlcihmb3JtLm1pbnRXaW5lQm90dGxlcy5BbW91bnQpOwogICAgICB2YXIgdW5pdCA9IGZvcm0ubWludFdpbmVCb3R0bGVzLlVuaXQ7CiAgICAgIHRoaXMuZGVidWdMb2coJyMjIyMjIyMjIyMjIyMlJSUlJSUlJSUlJSUlJCQkJCQkJCQkJCQkJCQgIGdlbmVyYXRlZCB3aW5lbWFrZXIgcG9wY29kZTonKTsKICAgICAgdGhpcy5kZWJ1Z0xvZyh7cG9wY29kZU5hbWUscG9wY29kZX0pOwogICAgICAKICAgICAgdmFyIGRhdGEgPQogICAgICAgICAgewogICAgICAgICAgICAiYXBwRGF0YSI6IHsKICAgICAgICAgICAgICAid29ya2Zsb3dEYXRhIjogZm9ybSwKICAgICAgICAgICAgICAid2luZUJvdHRsZXMiOiBhbW91bnQsCiAgICAgICAgICAgICAgIndpbmVVbml0IjogdW5pdCwKICAgICAgICAgICAgICAic3BvdCI6IG5leHRTcG90LAogICAgICAgICAgICAgICJ3b3JrZmxvd05hbWUiOiBzcy53b3JrZmxvdy5uYW1lLAogICAgICAgICAgICAgICJ3b3JrZmxvd0luc3RhbmNlSWQiOiBuZXdJZCwKICAgICAgICAgICAgICAid29ya2Zsb3dSb290UG9wY29kZSI6ICJ0cnVlIiwKICAgICAgICAgICAgICBwb3Bjb2RlTmFtZSAsCiAgICAgICAgICAgICAgIndvcmtmbG93RGVmIjogd29ya2Zsb3cKICAgICAgICAgICAgfQogICAgICAgICAgfTsKCiAgICAgIHRoaXMuZGVidWdMb2coZGF0YSk7CgogICAgICB2YXIgcmVzID0gYXdhaXQgdGhpcy5zaWduQW5kTWludChhZGRyZXNzLGRhdGEscHVibGljS2V5LGFtb3VudCx1bml0LHByaXZhdGVLZXkpOwogICAgICAvLyB0aGlzLmRlYnVnTG9nKCd0aGlzLnNpZ25BbmRNaW50IHJlcy5ib2R5LmtleXM6ICcgKyBPYmplY3Qua2V5cyhyZXMuYm9keSkpOwoKICAgICAgdmFyIHJ2YWwgPSB7CiAgICAgICAgICBhY3Rpb246IFtdCiAgICAgIH07CiAgICAgIHRoaXMuaG9va3MuZmluaXNoLnJlc29sdmUocnZhbCk7CiAgICAgIHJldHVybiBhZGRyZXNzOwogICAgCiAgfQogIHRvSW50ZWdlcih2YWx1ZSkgewogICAgdmFyIF8gPSB0aGlzLmhvb2tzLl87CiAgICBpZihfLmlzU3RyaW5nKHZhbHVlKSkKICAgICAgcmV0dXJuIHBhcnNlSW50KHZhbHVlKTsKICAgIGVsc2UKICAgICAgcmV0dXJuIHZhbHVlOwogIH0KICBhc3luYyB0cnVja2VyUGlja3VwT2soKSB7IAogICAgdGhpcy5kZWJ1Z0xvZygnZXhlY3V0ZSB0cnVja2VyUGlja3VwT2snKTsKICAgIHZhciBmb3JtID0gdGhpcy5zdGF0ZS5mb3JtOwogICAgdGhpcy5kZWJ1Z0xvZyh7Zm9ybX0pOwogICAgCiAgICB2YXIgcnZhbCA9IHsKICAgICAgICBhY3Rpb246IFtdCiAgICB9OwoKICAgIHZhciBfID0gdGhpcy5ob29rcy5fOwogICAgdmFyIHNzID0gdGhpcy5ob29rcy5zY3JlZW5TdGF0ZTsKICAgIHZhciBhcHAgPSB0aGlzLmhvb2tzLmFwcDsKICAgIHZhciB3b3JrZmxvdyA9IHNzLndvcmtmbG93OwogICAgCiAgICB2YXIgdXNlckNyZWRlbnRpYWxzID0gYXBwLmdldEFwcFN0YXRlKCd1c2VyQ3JlZGVudGlhbHMnKTsKICAgIHZhciB1c2VyUHVibGljS2V5ID0gdXNlckNyZWRlbnRpYWxzLnB1YmxpY0tleTsKICAgIHZhciB1c2VyUHJpdmF0ZUtleSA9IHVzZXJDcmVkZW50aWFscy5wcml2YXRlS2V5OwogICAgCiAgICB2YXIgc3JjUG9wY29kZSA9IHRoaXMuc3RhdGUucG9wY29kZTsKICAgIAoKICAgIHZhciBkZXN0QW1vdW50ID0gdGhpcy50b0ludGVnZXIodGhpcy5zdGF0ZS5mb3JtLndpdGhkcmF3LnBpY2t1cEFtb3VudCk7CiAgICB2YXIgZGVzdE5hbWUgPSAiVHJ1Y2tfIiArIHVzZXJDcmVkZW50aWFscy5zZXNzaW9uSWQ7CiAgICAKICAgIHZhciBkYXRhID0geyBkZXNjcmlwdGlvbjogYHdpdGhkcmF3ICR7ZGVzdEFtb3VudH0gYm90dGxlcyBvZiB3aW5lYCB9OwogICAgdmFyIHNvdXJjZU91dHB1dCA9IDA7CiAgICAKICAgIHRoaXMuZGVidWdMb2coJ2dldCB0cnVjayBwb3Bjb2RlOiAnICsgZGVzdE5hbWUpOwogICAgdmFyIHRydWNrUG9wY29kZSA9IGF3YWl0IHRoaXMub25lQnlOYW1lKGRlc3ROYW1lKTsKICAgIHRoaXMuZGVidWdMb2codHJ1Y2tQb3Bjb2RlKTsKICAgICAKICAgIHRoaXMuZGVidWdMb2coJ2NoZWNrIHNvdXJjZSB3aW5lIGJvdHRsZSBjb3VudCcpOwogICAgdmFyIHdpbmVCb3R0bGVzID0gdGhpcy50b0ludGVnZXIoc3JjUG9wY29kZS5hcHBEYXRhLndpbmVCb3R0bGVzKTsKICAgIHZhciB3aW5lVW5pdCA9IHNyY1BvcGNvZGUuYXBwRGF0YS53aW5lVW5pdDsKICAgIHRoaXMuZGVidWdMb2coe3NyY1BvcGNvZGV9KTsKICAgIHRoaXMuZGVidWdMb2coe3dpbmVCb3R0bGVzLGRlc3RBbW91bnQsd2luZVVuaXR9KTsKICAgIAogICAgaWYoXy5pc05pbChkZXN0QW1vdW50KSB8fCBfLmlzTmFOKGRlc3RBbW91bnQpKSB7CiAgICAgIHRoaXMuZGVidWdMb2coJyoqKioqKioqKioqKioqKioqKiBlcnJvciBiYWQgZGVzdEFtb3VudCknKTsKICAgICAgdGhpcy5ob29rcy5maW5pc2gucmVzb2x2ZShydmFsKTsKICAgICAgcmV0dXJuIDsKICAgIH0KICAgIAogICAgaWYoXy5pc05pbCh3aW5lQm90dGxlcykgfHwgXy5pc05hTihkZXN0QW1vdW50KSkgewogICAgICB0aGlzLmRlYnVnTG9nKCcqKioqKioqKioqKioqKioqKiogZXJyb3IgYmFkIHdpbmVCb3R0bGVzJyk7CiAgICAgIHRoaXMuaG9va3MuZmluaXNoLnJlc29sdmUocnZhbCk7CiAgICAgIHJldHVybiA7CiAgICB9CiAgICAKICAgIGlmKGRlc3RBbW91bnQgPiB3aW5lQm90dGxlcykgewogICAgICB0aGlzLmRlYnVnTG9nKCcqKioqKioqKioqKioqKioqKiogZXJyb3IgZGVzdEFtb3VudCA+IHdpbmVCb3R0bGVzJyk7CiAgICAgIHRoaXMuaG9va3MuZmluaXNoLnJlc29sdmUocnZhbCk7CiAgICAgIHJldHVybiA7CiAgICB9CiAgICAgCiAgICB2YXIgdHJ1Y2tCb3R0bGVzOwogICAgaWYgKF8uaXNOaWwodHJ1Y2tQb3Bjb2RlKSkgewogICAgICB0aGlzLmRlYnVnTG9nKCdNaW50aW5nIHRydWNrIHBvcGNvZGU6ICcgKyBkZXN0TmFtZSk7CiAgICAgIHZhciB0cnVja1Nwb3QgPSAndHJ1Y2tlci5zaG93JzsKICAgICAgdmFyIG5ld0lkID0gdGhpcy5ob29rcy5zaG9ydGlkLmdlbmVyYXRlKCk7CiAgICAgIHZhciB0cnVja1N0YXJ0QW1vdW50ID0gMDsKICAgICAgdmFyIHRydWNrVW5pdCA9ICdib3R0bGVzIG9mIHdpbmUnOwogICAgICB0cnVja0JvdHRsZXMgPSAwOwogICAgICB2YXIgdHJ1Y2tEYXRhID0KICAgICAgICAgIHsKICAgICAgICAgICAgImFwcERhdGEiOiB7CiAgICAgICAgICAgICAgIndvcmtmbG93RGF0YSI6IHt9LAogICAgICAgICAgICAgICJzcG90IjogdHJ1Y2tTcG90LAogICAgICAgICAgICAgICJ3aW5lQm90dGxlcyI6IHRydWNrQm90dGxlcywKICAgICAgICAgICAgICAid2luZVVuaXQiOiB3aW5lVW5pdCwKICAgICAgICAgICAgICAid29ya2Zsb3dOYW1lIjogc3Mud29ya2Zsb3cubmFtZSwKICAgICAgICAgICAgICAid29ya2Zsb3dJbnN0YW5jZUlkIjogbmV3SWQsCiAgICAgICAgICAgICAgIndvcmtmbG93Um9vdFBvcGNvZGUiOiAidHJ1ZSIsCiAgICAgICAgICAgICAgcG9wY29kZU5hbWU6IGRlc3ROYW1lLAogICAgICAgICAgICAgICJ3b3JrZmxvd0RlZiI6IHdvcmtmbG93CiAgICAgICAgICAgIH0KICAgICAgICAgIH07CiAgICAgIHZhciBuZXdQb3Bjb2RlID0gYXdhaXQgdGhpcy5nZW5lcmF0ZSgpOwogICAgICB2YXIgdHJ1Y2tBZGRyZXNzID0gbmV3UG9wY29kZS5wb3Bjb2RlLmFkZHJlc3M7CiAgICAgIAogICAgICB2YXIgcmVzID0gYXdhaXQgdGhpcy5zaWduQW5kTWludCh0cnVja0FkZHJlc3MsdHJ1Y2tEYXRhLHVzZXJQdWJsaWNLZXksdHJ1Y2tTdGFydEFtb3VudCx0cnVja1VuaXQsdXNlclByaXZhdGVLZXkpOwogICAgICAKICAgICAgdHJ1Y2tQb3Bjb2RlID0gYXdhaXQgdGhpcy5vbmVCeU5hbWUoZGVzdE5hbWUpOwogICAgfQogICAgZWxzZSB7CiAgICAgIHRoaXMuZGVidWdMb2coJ0ZvdW5kIGV4aXN0aW5nIHRydWNrIHBvcGNvZGU6ICcgKyBkZXN0TmFtZSk7CiAgICAgIHRydWNrQm90dGxlcyA9IHRydWNrUG9wY29kZS5hcHBEYXRhLndpbmVCb3R0bGVzOwogICAgfQogICAgCiAgICBpZihfLmlzTmlsKHRydWNrUG9wY29kZSkpIHsKICAgICAgdGhpcy5kZWJ1Z0xvZygnKioqKioqKioqKioqKioqKioqIEVycm9yIG1pbnRpbmcgdHJ1Y2sgcG9wY29kZScpOwogICAgICB0aGlzLmhvb2tzLmZpbmlzaC5yZXNvbHZlKHJ2YWwpOwogICAgICByZXR1cm4gOwogICAgfQogICAgCiAgICB0aGlzLmRlYnVnTG9nKCcjIyMjIyMjIyMjIyMjIyMjIHRydWNrIHBvcGNvZGU6Jyk7CiAgICB0aGlzLmRlYnVnTG9nKHRydWNrUG9wY29kZSk7CiAgICAKICAgIHZhciB3cmVzID0gYXdhaXQgdGhpcy5zaWduQW5kV2l0aGRyYXcoCiAgICAgIHNyY1BvcGNvZGUucHJpdmF0ZUtleSwKICAgICAgc3JjUG9wY29kZS5hZGRyZXNzLAogICAgICB0cnVja1BvcGNvZGUuYWRkcmVzcywKICAgICAgZGVzdEFtb3VudCwKICAgICAgZGF0YSwKICAgICAgc291cmNlT3V0cHV0CiAgICApOwogICAgCiAgICB0aGlzLmRlYnVnTG9nKCcjIyMjIyMjIyMjIyMjIyMjIHdpdGhkcmF3IHJlc3VsdDonKTsKICAgIHRoaXMuZGVidWdMb2cod3Jlcyk7CiAgICBydmFsLndyZXMgPSB3cmVzOwogICAgCiAgICB0aGlzLmRlYnVnTG9nKCcjIyMjIyMjIyMjIyMjIyMjIHVwZGF0ZSBzb3VyY2Ugd2luZSBib3R0bGUgY291bnQ6Jyk7CiAgICB2YXIgd2luZUNvdW50ID0gd2luZUJvdHRsZXMgLSBkZXN0QW1vdW50OwogICAgdmFyIHdpbmVEYXRhID0KICAgICAgICB7CiAgICAgICAgICAiYXBwRGF0YSI6IHsKICAgICAgICAgICAgIndpbmVCb3R0bGVzIjogd2luZUNvdW50CiAgICAgICAgICB9CiAgICAgICAgfTsKCiAgICB0aGlzLmRlYnVnTG9nKHdpbmVEYXRhKTsKICAgIHZhciBicmVzID0gYXdhaXQgdGhpcy5ibG9iQ3JlYXRlKAogICAgICBzcmNQb3Bjb2RlLmFkZHJlc3MsCiAgICAgIHdpbmVEYXRhLAogICAgICB1c2VyQ3JlZGVudGlhbHMucHVibGljS2V5LAogICAgICB1c2VyQ3JlZGVudGlhbHMucHJpdmF0ZUtleSk7CiAgICAgIAogICAgdGhpcy5kZWJ1Z0xvZygnIyMjIyMjIyMjIyMjIyMjIyBibG9iQ3JlYXRlIHJlc3VsdDonKTsKICAgIHRoaXMuZGVidWdMb2coYnJlcyk7CiAgICBydmFsLmJyZXMgPSBicmVzOwogICAgCiAgICB0aGlzLmRlYnVnTG9nKCcjIyMjIyMjIyMjIyMjIyMjIHVwZGF0ZSB0cnVjayB3aW5lIGJvdHRsZSBjb3VudDonKTsKICAgIHZhciB0cnVja0NvdW50ID0gdHJ1Y2tCb3R0bGVzICsgZGVzdEFtb3VudDsKICAgIHZhciB0cnVja1dpbmVEYXRhID0KICAgICAgICB7CiAgICAgICAgICAiYXBwRGF0YSI6IHsKICAgICAgICAgICAgIndpbmVCb3R0bGVzIjogdHJ1Y2tDb3VudAogICAgICAgICAgfQogICAgICAgIH07CgogICAgdGhpcy5kZWJ1Z0xvZyh0cnVja1dpbmVEYXRhKTsKICAgIHZhciBicmVzMiA9IGF3YWl0IHRoaXMuYmxvYkNyZWF0ZSgKICAgICAgdHJ1Y2tQb3Bjb2RlLmFkZHJlc3MsCiAgICAgIHRydWNrV2luZURhdGEsCiAgICAgIHVzZXJDcmVkZW50aWFscy5wdWJsaWNLZXksCiAgICAgIHVzZXJDcmVkZW50aWFscy5wcml2YXRlS2V5KTsKICAgICAgCiAgICB0aGlzLmRlYnVnTG9nKCcjIyMjIyMjIyMjIyMjIyMjIHRydWNrIGJsb2JDcmVhdGUgcmVzdWx0OicpOwogICAgdGhpcy5kZWJ1Z0xvZyhicmVzMik7CiAgICBydmFsLmJyZXMyID0gYnJlczI7CiAgICAKICAgIHRoaXMuaG9va3MuZmluaXNoLnJlc29sdmUocnZhbCk7CiAgIH0KCn07Cg=="]
                        }
                    }
                }
            }
        },
        "type": "transaction",
        "sourceCounter": "XEx7R7ja3ES4gSPoOFtTxrvidRwx775hvPcP0rfGA4A=",
        "amount": "0",
        "workflowDef": {
            "title": "Wine V1",
            "name": "wineV1",
            "startScreen": "Home",
            "version": "2.0",
            "steps": {
                "winemaker.mint": {
                    "step": "winemaker.mint",
                    "title": "Winemaker Mint",
                    "screen": "WinemakerMint"
                },
                "trucker.pickup": {"step": "trucker.pickup", "title": "Trucker Pickup", "screen": "TruckerPickup"},
                "trucker.show": {"step": "trucker.show", "title": "Trucker Show", "screen": "TruckerShow"}
            },
            "appOptions": {"requireLogin": true},
            "screens": {
                "Home": {
                    "name": "Home",
                    "title": "Home",
                    "api": "/api/mobile",
                    "screenListItems": {
                        "fetchItems": "/popcodeByWorkflowName",
                        "method": "get",
                        "api": "cayley",
                        "fetchParameters": {"workflowName": "wineV1"},
                        "itemDataTypes": {"popcode": "object"},
                        "itemLabel": ["popcodeName"],
                        "itemActions": {
                            "click": {
                                "title": "Click",
                                "action": [{
                                    "operation": "startWorkflow",
                                    "replaceCurrent": true,
                                    "parameters": {"spot": "@popcode.spot", "popcode": "@popcode"}
                                }],
                                "parameters": {"popcode": "@item"}
                            }
                        }
                    },
                    "screenButtons": {
                        "scan": {
                            "title": "Scan",
                            "action": [{"operation": "navigate", "screen": "Scan"}],
                            "roles": ["admin", "winemaker", "trucker"]
                        },
                        "mint": {
                            "title": "Mint",
                            "action": [{"operation": "navigate", "resetStack": true, "screen": "WinemakerMint"}],
                            "roles": ["admin", "winemaker"]
                        }
                    }
                },
                "Scan": {
                    "name": "Scan",
                    "title": "Scan",
                    "api": "/api/mobile",
                    "parameters": {"user": "@user"},
                    "modal": false,
                    "screenScan": {},
                    "startAction": [{
                        "operation": "scanBarcode",
                        "barcodeTypes": ["qr", "code128"],
                        "outputs": {"scanData": "@scanData"}
                    }, {
                        "operation": "routePopcode",
                        "parameters": {"scanData": "@scanData"},
                        "outputs": {"address": "@address"}
                    }, {
                        "operation": "fetch",
                        "route": "/p",
                        "method": "get",
                        "parameters": {"address": "@address"},
                        "outputs": {"popcode": "@popcodes[0]"}
                    }, {
                        "operation": "startWorkflow",
                        "replaceCurrent": true,
                        "parameters": {"spot": "@popcode.spot", "popcode": "@popcode"}
                    }]
                },
                "WinemakerMint": {
                    "name": "WinemakerMint",
                    "title": "Winemaker Mint",
                    "api": "/api/mobile",
                    "parameters": {"container": "@container", "popcode": "@popcode", "user": "@user"},
                    "outputs": {"popcode": "@container"},
                    "screenForm": {
                        "fields": {
                            "type": "object",
                            "properties": {
                                "mintWineBottles": {
                                    "type": "object",
                                    "properties": {
                                        "Amount": {
                                            "type": "string",
                                            "value": "1000",
                                            "options": {"editable": true}
                                        },
                                        "Unit": {
                                            "type": "string",
                                            "value": "bottles of wine",
                                            "options": {"editable": true}
                                        }
                                    },
                                    "required": ["Amount", "Unit"]
                                }
                            },
                            "required": ["mintWineBottles"]
                        }, "options": {"auto": "labels"}
                    },
                    "screenButtons": {
                        "mint": {
                            "title": "Mint",
                            "action": [{
                                "operation": "contract",
                                "contract": "winemakerMintOk",
                                "parameters": {"popcode": "@popcode"},
                                "outputs": {"status": "@status", "txId": "@txId"}
                            }, {"operation": "navigate", "resetStack": true, "forceUpdate": true, "screen": "Home"}],
                            "roles": ["admin", "winemaker"]
                        },
                        "cancel": {
                            "title": "Cancel",
                            "action": [{"operation": "navigate", "resetStack": true, "screen": "Home"}]
                        }
                    }
                },
                "TruckerPickup": {
                    "name": "TruckerPickup",
                    "title": "Trucker Wine Pickup",
                    "api": "/api/mobile",
                    "parameters": {"container": "@container", "popcode": "@popcode", "user": "@user"},
                    "outputs": {"popcode": "@container"},
                    "tabs": {
                        "tab1": {
                            "title": "Pickup Wine",
                            "screenForm": {
                                "privateKey": ["winemaker", "admin"],
                                "publicKey": ["winemaker", "trucker", "admin"],
                                "fields": {
                                    "type": "object",
                                    "properties": {
                                        "popcode": {
                                            "type": "object",
                                            "properties": {
                                                "name": {
                                                    "type": "string",
                                                    "value": "@popcode.popcodeName",
                                                    "options": {"editable": false}
                                                },
                                                "address": {
                                                    "type": "string",
                                                    "value": "@popcode.address",
                                                    "options": {"editable": false}
                                                },
                                                "currentState": {
                                                    "type": "string",
                                                    "value": "@popcode.spot",
                                                    "options": {"editable": false}
                                                }
                                            },
                                            "required": ["name", "address", "currentState"]
                                        },
                                        "warehouseContents": {
                                            "type": "object",
                                            "properties": {
                                                "Amount": {
                                                    "type": "number",
                                                    "value": "@popcode.appData.wineBottles",
                                                    "options": {"editable": false}
                                                },
                                                "Unit": {
                                                    "type": "string",
                                                    "value": "@popcode.appData.wineUnit",
                                                    "options": {"editable": false}
                                                }
                                            }
                                        },
                                        "withdraw": {
                                            "type": "object",
                                            "properties": {
                                                "pickupAmount": {
                                                    "type": "number",
                                                    "options": {"editable": true}
                                                }
                                            },
                                            "required": ["pickupAmount"]
                                        }
                                    },
                                    "required": ["withdraw"]
                                },
                                "options": {"auto": "labels"}
                            }
                        }, "tab2": {"title": "Popcode Graph", "graphView": {"visName": "wine"}}
                    },
                    "screenButtons": {
                        "pickup": {
                            "title": "Pickup",
                            "action": [{
                                "operation": "contract",
                                "contract": "truckerPickupOk",
                                "parameters": {"popcode": "@popcode"},
                                "outputs": {"status": "@status", "txId": "@txId"}
                            }, {"operation": "navigate", "resetStack": true, "forceUpdate": true, "screen": "Home"}],
                            "roles": ["admin", "trucker"]
                        },
                        "cancel": {
                            "title": "Cancel",
                            "action": [{"operation": "navigate", "resetStack": true, "screen": "Home"}]
                        }
                    }
                },
                "TruckerShow": {
                    "name": "TruckerShow",
                    "title": "Truck Popcode",
                    "api": "/api/mobile",
                    "parameters": {"container": "@container", "popcode": "@popcode", "user": "@user"},
                    "outputs": {"popcode": "@container"},
                    "tabs": {
                        "tab1": {
                            "title": "Truck Contents",
                            "screenForm": {
                                "privateKey": ["trucker", "admin"],
                                "publicKey": ["winemaker", "trucker", "admin"],
                                "fields": {
                                    "type": "object",
                                    "properties": {
                                        "popcode": {
                                            "type": "object",
                                            "properties": {
                                                "name": {
                                                    "type": "string",
                                                    "value": "@popcode.popcodeName",
                                                    "options": {"editable": false}
                                                },
                                                "address": {
                                                    "type": "string",
                                                    "value": "@popcode.address",
                                                    "options": {"editable": false}
                                                },
                                                "currentState": {
                                                    "type": "string",
                                                    "value": "@popcode.spot",
                                                    "options": {"editable": false}
                                                }
                                            },
                                            "required": ["name", "address", "currentState"]
                                        },
                                        "truckContents": {
                                            "type": "object",
                                            "properties": {
                                                "Amount": {
                                                    "type": "number",
                                                    "value": "@popcode.appData.wineBottles",
                                                    "options": {"editable": false}
                                                },
                                                "Unit": {
                                                    "type": "string",
                                                    "value": "@popcode.appData.wineUnit",
                                                    "options": {"editable": false}
                                                }
                                            }
                                        }
                                    }
                                },
                                "options": {"auto": "labels"}
                            }
                        }, "tab2": {"title": "Popcode Graph", "graphView": {"visName": "wine"}}
                    },
                    "screenButtons": {
                        "ok": {
                            "title": "Ok",
                            "action": [{"operation": "navigate", "resetStack": true, "screen": "Home"}]
                        }
                    }
                }
            },
            "contractLib": {
                "name": "Wine SmartContract Library",
                "version": "1.0",
                "slug": "wine_1_0",
                "libs": ["base64_Y2xhc3MgU21hcnRDb250cmFjdEJhc2UgewogIGNvbnN0cnVjdG9yKGhvb2tzKSB7CiAgICAgIHRoaXMuaG9va3MgPSBob29rczsKICAgICAgdGhpcy5zdGF0ZSA9IGhvb2tzLnN0YXRlOwogICAgICB0aGlzLmRlYnVnTG9nID0gaG9va3MuZGVidWdMb2c7CiAgICAgIHRoaXMuZGVidWdMb2coJ2NvbnN0cnVjdCBTbWFydENvbnRyYWN0QmFzZScpOwogIH0KICBkZWJ1Z1NpemUobykgewogICAgdmFyIHMgPSBKU09OLnN0cmluZ2lmeShvKTsKICAgIHRoaXMuZGVidWdMb2coYHNpemU6ICR7cy5sZW5ndGgvMTAyNH0ga2ApOwogIH0KICBhc3luYyBieU5hbWUocE5hbWUpIHsKICAgIHZhciBhcGkgPSB0aGlzLmhvb2tzLnN0YWNrLmFwaTsKICAgIHZhciB1cmwgPSAnL3AvbmFtZS8nICsgcE5hbWU7CiAgICBjb25zdCByZXMgPSBhd2FpdCBhcGkuZ2V0KHVybCk7CiAgICByZXR1cm4gcmVzLmJvZHk7CiAgfQogIGFzeW5jIG9uZUJ5TmFtZShwTmFtZSkgewogICAgdmFyIF8gPSB0aGlzLmhvb2tzLl87CiAgICB2YXIgYXBpID0gdGhpcy5ob29rcy5zdGFjay5hcGk7CiAgICB2YXIgdXJsID0gJy9wL25hbWUvJyArIHBOYW1lOwogICAgY29uc3QgcmVzID0gYXdhaXQgYXBpLmdldCh1cmwpOwogICAgdmFyIHBvcGNvZGVzID0gIV8uaXNOaWwocmVzKQogICAgICYmICFfLmlzTmlsKHJlcy5ib2R5KQogICAgICYmICFfLmlzTmlsKHJlcy5ib2R5LnBvcGNvZGVzKSA/IHJlcy5ib2R5LnBvcGNvZGVzIDogbnVsbDsKICAgIHZhciBwb3Bjb2RlID0gXy5pc0FycmF5KHBvcGNvZGVzKSAmJiBwb3Bjb2Rlcy5sZW5ndGggPiAwCiAgICAgPyBwb3Bjb2Rlc1swXSA6IG51bGw7CiAgICByZXR1cm4gcG9wY29kZTsKICB9CiAgYXN5bmMgYmFsYW5jZShhZGRyZXNzKSB7CiAgICB2YXIgYXBpID0gdGhpcy5ob29rcy5zdGFjay5hcGk7CiAgICB2YXIgdXJsID0gJy9wL2JhbGFuY2UvJyArIGFkZHJlc3M7CiAgICBjb25zdCByZXMgPSBhd2FpdCBhcGkuZ2V0KHVybCk7CiAgICByZXR1cm4gcmVzLmJvZHk7CiAgfQogIGFzeW5jIGdlbmVyYXRlKCkgewogICAgdmFyIGFwaSA9IHRoaXMuaG9va3Muc3RhY2suYXBpOwogICAgdmFyIHVybCA9ICcvcC9nZW5lcmF0ZSc7CiAgICBjb25zdCByZXMgPSBhd2FpdCBhcGkuZ2V0KHVybCk7CiAgICByZXR1cm4gcmVzLmJvZHk7CiAgfQogIGFzeW5jIGNvbnRhaW5lclBvcGNvZGUoYWRkcmVzcykgewogICAgdmFyIGFwaSA9IHRoaXMuaG9va3Muc3RhY2suYXBpQ2F5bGV5OwogICAgdmFyIHVybCA9ICcvY29udGFpbmVyUG9wY29kZS8nICsgYWRkcmVzczsKICAgIGNvbnN0IHJlcyA9IGF3YWl0IGFwaS5nZXQodXJsKTsKICAgIHJldHVybiByZXMuYm9keTsKICB9CiAgYXN5bmMgYm9tUG9wY29kZXMoYWRkcmVzcykgewogICAgdmFyIGFwaSA9IHRoaXMuaG9va3Muc3RhY2suYXBpQ2F5bGV5OwogICAgdmFyIHVybCA9ICcvYm9tUG9wY29kZXMvJyArIGFkZHJlc3M7CiAgICBjb25zdCByZXMgPSBhd2FpdCBhcGkuZ2V0KHVybCk7CiAgICByZXR1cm4gcmVzLmJvZHk7CiAgfQogIGFzeW5jIHNpZ25NZXNzYWdlKGZpZWxkcyxwcml2YXRlS2V5KSB7CiAgICB2YXIgYXBpID0gdGhpcy5ob29rcy5zdGFjay5hcGk7CiAgICB2YXIgYm9keSA9IHsKICAgICAgZmllbGRzLAogICAgICBwcml2YXRlS2V5CiAgICB9OwogICAgdmFyIHVybCA9ICcvY3J5cHRvL3NpZ25NZXNzYWdlJzsKICAgIHRoaXMuZGVidWdMb2coJyoqKioqKioqKioqIHNpZ25NZXNzYWdlJyk7CiAgICB0aGlzLmRlYnVnTG9nKHtib2R5fSk7CiAgICBjb25zdCByZXMgPSBhd2FpdCBhcGkucG9zdCh1cmwsIHtib2R5fSk7CiAgICB0aGlzLmRlYnVnTG9nKHtib2R5OiByZXMuYm9keX0pOwogICAgcmV0dXJuIHJlcy5ib2R5OwogIH0KICBhc3luYyBibG9iQ3JlYXRlV2l0aFNpZyhzaWcsYWRkcmVzcyxkYXRhLHB1YmxpY0tleSkgewogICAgdmFyIGFwaSA9IHRoaXMuaG9va3Muc3RhY2suYXBpOwogICAgdmFyIGJvZHkgPSB7CiAgICAgIHNpZywKICAgICAgYWRkcmVzcywKICAgICAgcHVibGljS2V5LAogICAgICBkYXRhCiAgICB9OwogICAgdmFyIHVybCA9ICcvcC9ibG9iQ3JlYXRlV2l0aFNpZyc7CiAgICBjb25zdCByZXMgPSBhd2FpdCBhcGkucG9zdCh1cmwsIHtib2R5fSk7CiAgICByZXR1cm4gcmVzLmJvZHk7CiAgfQogIGFzeW5jIGJsb2JDcmVhdGUoYWRkcmVzcyxkYXRhLHB1YmxpY0tleSxwcml2YXRlS2V5KSB7CiAgICB2YXIgZmllbGRzID0gW107CgogICAgdmFyIHJlcyA9IGF3YWl0IHRoaXMuYmFsYW5jZShhZGRyZXNzKTsKICAgIGZpZWxkcy5wdXNoKHJlcy5iYWxhbmNlLkNvdW50ZXIpOwogICAgZmllbGRzLnB1c2goYWRkcmVzcyk7CiAgICBmaWVsZHMucHVzaChkYXRhKTsKCiAgICByZXMgPSBhd2FpdCB0aGlzLnNpZ25NZXNzYWdlKGZpZWxkcyxwcml2YXRlS2V5KTsKCiAgICByZXMgPSBhd2FpdCB0aGlzLmJsb2JDcmVhdGVXaXRoU2lnKHJlcy5zaWcsYWRkcmVzcyxkYXRhLHB1YmxpY0tleSk7CgogICAgcmV0dXJuIHJlczsKICB9CiAgYXN5bmMgbWludChzaWcsYWRkcmVzcyxkYXRhLHB1YmxpY0tleSxhbW91bnQsdW5pdCkgewogICAgdmFyIGFwaSA9IHRoaXMuaG9va3Muc3RhY2suYXBpOwogICAgdmFyIGJvZHkgPSB7CiAgICAgIHNpZywKICAgICAgYWRkcmVzcywKICAgICAgcHVibGljS2V5LAogICAgICBhbW91bnQsCiAgICAgIHVuaXQsCiAgICAgIGRhdGEKICAgIH07CiAgICB0aGlzLmRlYnVnTG9nKCcqKioqKioqKioqKiBkbyBtaW50Jyk7CiAgICB0aGlzLmRlYnVnTG9nKHtib2R5fSk7CiAgICB0aGlzLmRlYnVnTG9nKHthcGl9KTsKICAgIHRoaXMuZGVidWdTaXplKGJvZHkpOwogICAgdmFyIHVybCA9ICcvcC9taW50JzsKICAgIGNvbnN0IHJlcyA9IGF3YWl0IGFwaS5wb3N0KHVybCwge2JvZHl9KTsKICAgIHRoaXMuZGVidWdMb2coJyoqKioqKioqKioqIG1pbnQgcmVzdWx0Jyk7CiAgICB0aGlzLmRlYnVnTG9nKHJlcyk7CiAgICByZXR1cm4gcmVzOwogIH0KICBhc3luYyBzaWduQW5kTWludChhZGRyZXNzLGRhdGEscHVibGljS2V5LGFtb3VudCx1bml0LHByaXZhdGVLZXkpIHsKICAgIHRoaXMuZGVidWdMb2coJ3NpZ25BbmRNaW50Jyk7CiAgICB0aGlzLmRlYnVnTG9nKHthZGRyZXNzLGRhdGEscHVibGljS2V5LGFtb3VudCx1bml0LHByaXZhdGVLZXl9KTsKICAgIHZhciBmaWVsZHMgPSBbXTsKICAgIHZhciB7IGJhbGFuY2UgfSA9IGF3YWl0IHRoaXMuYmFsYW5jZShhZGRyZXNzKTsKICAgIC8vIHRoaXMuZGVidWdMb2coJyMjIyMjIyMjIyMjIyMjIyMgYmFsYW5jZS5Db3VudGVyOiAnICsgYmFsYW5jZS5Db3VudGVyKTsKICAgIGZpZWxkcy5wdXNoKGJhbGFuY2UuQ291bnRlcik7CiAgICBmaWVsZHMucHVzaChhZGRyZXNzKTsKICAgIGZpZWxkcy5wdXNoKGFtb3VudCk7CiAgICBmaWVsZHMucHVzaCh1bml0KTsKICAgIGZpZWxkcy5wdXNoKGRhdGEpOwoKICAgIHZhciB7IHNpZyB9ID0gYXdhaXQgdGhpcy5zaWduTWVzc2FnZShmaWVsZHMscHJpdmF0ZUtleSk7CgogICAgdmFyIHJlcyA9IGF3YWl0IHRoaXMubWludChzaWcsYWRkcmVzcyxkYXRhLHB1YmxpY0tleSxhbW91bnQsdW5pdCk7CgogICAgcmV0dXJuIHJlczsKICB9CiAgYXN5bmMgd2l0aGRyYXcoc2lnLHByaXZhdGVLZXksZGVzdEFkZHJlc3MsZGVzdEFtb3VudCxkYXRhLHNvdXJjZU91dHB1dCkgewogICAgdmFyIGFwaSA9IHRoaXMuaG9va3Muc3RhY2suYXBpOwogICAgdmFyIGJvZHkgPSB7CiAgICAgIHNpZywKICAgICAgcHJpdmF0ZUtleSwKICAgICAgZGVzdEFkZHJlc3MsCiAgICAgIGRlc3RBbW91bnQsCiAgICAgIGRhdGEsCiAgICAgIHNvdXJjZU91dHB1dAogICAgfTsKICAgIHRoaXMuZGVidWdMb2coJyoqKioqKioqKioqIHdpdGhkcmF3Jyk7CiAgICB0aGlzLmRlYnVnTG9nKHtib2R5fSk7CiAgICB2YXIgdXJsID0gJy9wL3dpdGhkcmF3JzsKICAgIGNvbnN0IHJlcyA9IGF3YWl0IGFwaS5wb3N0KHVybCwge2JvZHl9KTsKICAgIHJldHVybiByZXM7CiAgfQogIGFzeW5jIHNpZ25BbmRXaXRoZHJhdyhwcml2YXRlS2V5LHNvdXJjZUFkZHJlc3MsZGVzdEFkZHJlc3MsZGVzdEFtb3VudCxkYXRhLHNvdXJjZU91dHB1dCkgewogICAgdGhpcy5kZWJ1Z0xvZygnc2lnbkFuZFdpdGhkcmF3Jyk7CiAgICB0aGlzLmRlYnVnTG9nKHtwcml2YXRlS2V5LHNvdXJjZUFkZHJlc3MsZGVzdEFkZHJlc3MsZGVzdEFtb3VudCxkYXRhLHNvdXJjZU91dHB1dH0pOwogICAgdmFyIGZpZWxkcyA9IFtdOwogICAgdmFyIHsgYmFsYW5jZSB9ID0gYXdhaXQgdGhpcy5iYWxhbmNlKHNvdXJjZUFkZHJlc3MpOwogICAgLy8gdGhpcy5kZWJ1Z0xvZygnIyMjIyMjIyMjIyMjIyMjIyBiYWxhbmNlLkNvdW50ZXI6ICcgKyBiYWxhbmNlLkNvdW50ZXIpOwogICAgZmllbGRzLnB1c2goYmFsYW5jZS5Db3VudGVyKTsKICAgIGZpZWxkcy5wdXNoKGRlc3RBZGRyZXNzKTsKICAgIGZpZWxkcy5wdXNoKGRhdGEpOwogICAgZmllbGRzLnB1c2goc291cmNlT3V0cHV0KTsKICAgIGZpZWxkcy5wdXNoKGRlc3RBbW91bnQpOwoKICAgIHZhciB7IHNpZyB9ID0gYXdhaXQgdGhpcy5zaWduTWVzc2FnZShmaWVsZHMscHJpdmF0ZUtleSk7CgogICAgdmFyIHJlcyA9IGF3YWl0IHRoaXMud2l0aGRyYXcoc2lnLHByaXZhdGVLZXksZGVzdEFkZHJlc3MsZGVzdEFtb3VudCxkYXRhLHNvdXJjZU91dHB1dCk7CgogICAgcmV0dXJuIHJlczsKICB9CiAgYXN5bmMgYm9tVXBkYXRlV2l0aFNpZyhzaWcsYWRkcmVzcyxwdWJsaWNLZXksYm9tT3AsYm9tQWRkcmVzcykgewogICAgdmFyIGFwaSA9IHRoaXMuaG9va3Muc3RhY2suYXBpOwogICAgdmFyIGJvZHkgPSB7CiAgICAgIHNpZywKICAgICAgYWRkcmVzcywKICAgICAgcHVibGljS2V5LAogICAgICBib21PcCwKICAgICAgYm9tQWRkcmVzcwogICAgfTsKICAgIHRoaXMuZGVidWdMb2coJyoqKioqKioqKioqIGRvIGJvbVVwZGF0ZScpOwogICAgdGhpcy5kZWJ1Z0xvZyh7Ym9keX0pOwogICAgdGhpcy5kZWJ1Z0xvZyh7YXBpfSk7CiAgICB0aGlzLmRlYnVnU2l6ZShib2R5KTsKICAgIHZhciB1cmwgPSAnL3AvYm9tVXBkYXRlV2l0aFNpZyc7CiAgICBjb25zdCByZXMgPSBhd2FpdCBhcGkucG9zdCh1cmwsIHtib2R5fSk7CiAgICB0aGlzLmRlYnVnTG9nKCcqKioqKioqKioqKiBib21VcGRhdGUgcmVzdWx0Jyk7CiAgICB0aGlzLmRlYnVnTG9nKHJlcyk7CiAgICByZXR1cm4gcmVzOwogIH0KICBhc3luYyBzaWduQW5kVXBkYXRlQm9tKGFkZHJlc3MscHVibGljS2V5LGJvbU9wLGJvbUFkZHJlc3MscHJpdmF0ZUtleSkgewogICAgdGhpcy5kZWJ1Z0xvZygnc2lnbkFuZFVwZGF0ZUJvbScpOwogICAgdGhpcy5kZWJ1Z0xvZyh7YWRkcmVzcyxwdWJsaWNLZXksYm9tT3AsYm9tQWRkcmVzcyxwcml2YXRlS2V5fSk7CiAgICB2YXIgZmllbGRzID0gW107CiAgICB2YXIgeyBiYWxhbmNlIH0gPSBhd2FpdCB0aGlzLmJhbGFuY2UoYWRkcmVzcyk7CiAgICAvLyB0aGlzLmRlYnVnTG9nKCcjIyMjIyMjIyMjIyMjIyMjIGJhbGFuY2UuQ291bnRlcjogJyArIGJhbGFuY2UuQ291bnRlcik7CiAgICBmaWVsZHMucHVzaChiYWxhbmNlLkNvdW50ZXIpOwogICAgZmllbGRzLnB1c2goYWRkcmVzcyk7CiAgICBmaWVsZHMucHVzaChib21PcCk7CiAgICBmaWVsZHMucHVzaChib21BZGRyZXNzKTsKCiAgICB2YXIgeyBzaWcgfSA9IGF3YWl0IHRoaXMuc2lnbk1lc3NhZ2UoZmllbGRzLHByaXZhdGVLZXkpOwoKICAgIHZhciByZXMgPSBhd2FpdCB0aGlzLmJvbVVwZGF0ZVdpdGhTaWcoc2lnLGFkZHJlc3MscHVibGljS2V5LGJvbU9wLGJvbUFkZHJlc3MpOwoKICAgIHJldHVybiByZXM7CiAgfQp9Owo=", "base64_Y2xhc3MgU21hcnRDb250cmFjdCBleHRlbmRzIFNtYXJ0Q29udHJhY3RCYXNlIHsKICBjb25zdHJ1Y3Rvcihob29rcykgewogICAgICBzdXBlcihob29rcykKICAgICAgdGhpcy5kZWJ1Z0xvZygnKioqKioqKioqKioqKiogU21hcnRDb250cmFjdCcpOwogIH0KCiAgYXN5bmMgZWNobygpIHsKICAgICAgdGhpcy5kZWJ1Z0xvZygnZWNobycpOwogICAgICB2YXIgcnZhbCA9IHsKICAgICAgICAgIGRhdGE6ICdoZWxsbycKICAgICAgfTsKICAgICAgdGhpcy5ob29rcy5maW5pc2gucmVzb2x2ZShydmFsKTsKICB9CgogIGFzeW5jIHdpbmVtYWtlck1pbnRPaygpIHsgCiAgICB0aGlzLmRlYnVnTG9nKCdleGVjdXRlIHdpbmVtYWtlck1pbnRPaycpOwogICAgICB2YXIgXyA9IHRoaXMuaG9va3MuXzsKICAgICAgdmFyIHNzID0gdGhpcy5ob29rcy5zY3JlZW5TdGF0ZTsKICAgICAgdmFyIGFwcCA9IHRoaXMuaG9va3MuYXBwOwogICAgICB2YXIgdXNlckNyZWRlbnRpYWxzID0gYXBwLmdldEFwcFN0YXRlKCd1c2VyQ3JlZGVudGlhbHMnKTsKICAgICAgdmFyIHB1YmxpY0tleSA9IHVzZXJDcmVkZW50aWFscy5wdWJsaWNLZXk7CiAgICAgIHZhciBwcml2YXRlS2V5ID0gdXNlckNyZWRlbnRpYWxzLnByaXZhdGVLZXk7CiAgICAgIHZhciB3b3JrZmxvdyA9IHNzLndvcmtmbG93OwogICAgICB2YXIgbmV3SWQgPSB0aGlzLmhvb2tzLnNob3J0aWQuZ2VuZXJhdGUoKTsKICAgICAgdmFyIHBvcGNvZGVOYW1lID0gJ1dpbmVfJyArIG5ld0lkOwogICAgICB2YXIgeyBmb3JtIH0gPSB0aGlzLnN0YXRlOwogICAgICB0aGlzLmRlYnVnTG9nKGZvcm0pOwogICAgICB2YXIgeyBwb3Bjb2RlIH0gPSBhd2FpdCB0aGlzLmdlbmVyYXRlKCk7CiAgICAgIHZhciB7IGFkZHJlc3MgfSA9IHBvcGNvZGU7CiAgICAgIHZhciBuZXh0U3BvdCA9ICd0cnVja2VyLnBpY2t1cCc7CiAgICAgIHZhciBhbW91bnQgPSB0aGlzLnRvSW50ZWdlcihmb3JtLm1pbnRXaW5lQm90dGxlcy5BbW91bnQpOwogICAgICB2YXIgdW5pdCA9IGZvcm0ubWludFdpbmVCb3R0bGVzLlVuaXQ7CiAgICAgIHRoaXMuZGVidWdMb2coJyMjIyMjIyMjIyMjIyMlJSUlJSUlJSUlJSUlJCQkJCQkJCQkJCQkJCQgIGdlbmVyYXRlZCB3aW5lbWFrZXIgcG9wY29kZTonKTsKICAgICAgdGhpcy5kZWJ1Z0xvZyh7cG9wY29kZU5hbWUscG9wY29kZX0pOwogICAgICAKICAgICAgdmFyIGRhdGEgPQogICAgICAgICAgewogICAgICAgICAgICAiYXBwRGF0YSI6IHsKICAgICAgICAgICAgICAid29ya2Zsb3dEYXRhIjogZm9ybSwKICAgICAgICAgICAgICAid2luZUJvdHRsZXMiOiBhbW91bnQsCiAgICAgICAgICAgICAgIndpbmVVbml0IjogdW5pdCwKICAgICAgICAgICAgICAic3BvdCI6IG5leHRTcG90LAogICAgICAgICAgICAgICJ3b3JrZmxvd05hbWUiOiBzcy53b3JrZmxvdy5uYW1lLAogICAgICAgICAgICAgICJ3b3JrZmxvd0luc3RhbmNlSWQiOiBuZXdJZCwKICAgICAgICAgICAgICAid29ya2Zsb3dSb290UG9wY29kZSI6ICJ0cnVlIiwKICAgICAgICAgICAgICBwb3Bjb2RlTmFtZSAsCiAgICAgICAgICAgICAgIndvcmtmbG93RGVmIjogd29ya2Zsb3cKICAgICAgICAgICAgfQogICAgICAgICAgfTsKCiAgICAgIHRoaXMuZGVidWdMb2coZGF0YSk7CgogICAgICB2YXIgcmVzID0gYXdhaXQgdGhpcy5zaWduQW5kTWludChhZGRyZXNzLGRhdGEscHVibGljS2V5LGFtb3VudCx1bml0LHByaXZhdGVLZXkpOwogICAgICAvLyB0aGlzLmRlYnVnTG9nKCd0aGlzLnNpZ25BbmRNaW50IHJlcy5ib2R5LmtleXM6ICcgKyBPYmplY3Qua2V5cyhyZXMuYm9keSkpOwoKICAgICAgdmFyIHJ2YWwgPSB7CiAgICAgICAgICBhY3Rpb246IFtdCiAgICAgIH07CiAgICAgIHRoaXMuaG9va3MuZmluaXNoLnJlc29sdmUocnZhbCk7CiAgICAgIHJldHVybiBhZGRyZXNzOwogICAgCiAgfQogIHRvSW50ZWdlcih2YWx1ZSkgewogICAgdmFyIF8gPSB0aGlzLmhvb2tzLl87CiAgICBpZihfLmlzU3RyaW5nKHZhbHVlKSkKICAgICAgcmV0dXJuIHBhcnNlSW50KHZhbHVlKTsKICAgIGVsc2UKICAgICAgcmV0dXJuIHZhbHVlOwogIH0KICBhc3luYyB0cnVja2VyUGlja3VwT2soKSB7IAogICAgdGhpcy5kZWJ1Z0xvZygnZXhlY3V0ZSB0cnVja2VyUGlja3VwT2snKTsKICAgIHZhciBmb3JtID0gdGhpcy5zdGF0ZS5mb3JtOwogICAgdGhpcy5kZWJ1Z0xvZyh7Zm9ybX0pOwogICAgCiAgICB2YXIgcnZhbCA9IHsKICAgICAgICBhY3Rpb246IFtdCiAgICB9OwoKICAgIHZhciBfID0gdGhpcy5ob29rcy5fOwogICAgdmFyIHNzID0gdGhpcy5ob29rcy5zY3JlZW5TdGF0ZTsKICAgIHZhciBhcHAgPSB0aGlzLmhvb2tzLmFwcDsKICAgIHZhciB3b3JrZmxvdyA9IHNzLndvcmtmbG93OwogICAgCiAgICB2YXIgdXNlckNyZWRlbnRpYWxzID0gYXBwLmdldEFwcFN0YXRlKCd1c2VyQ3JlZGVudGlhbHMnKTsKICAgIHZhciB1c2VyUHVibGljS2V5ID0gdXNlckNyZWRlbnRpYWxzLnB1YmxpY0tleTsKICAgIHZhciB1c2VyUHJpdmF0ZUtleSA9IHVzZXJDcmVkZW50aWFscy5wcml2YXRlS2V5OwogICAgCiAgICB2YXIgc3JjUG9wY29kZSA9IHRoaXMuc3RhdGUucG9wY29kZTsKICAgIAoKICAgIHZhciBkZXN0QW1vdW50ID0gdGhpcy50b0ludGVnZXIodGhpcy5zdGF0ZS5mb3JtLndpdGhkcmF3LnBpY2t1cEFtb3VudCk7CiAgICB2YXIgZGVzdE5hbWUgPSAiVHJ1Y2tfIiArIHVzZXJDcmVkZW50aWFscy5zZXNzaW9uSWQ7CiAgICAKICAgIHZhciBkYXRhID0geyBkZXNjcmlwdGlvbjogYHdpdGhkcmF3ICR7ZGVzdEFtb3VudH0gYm90dGxlcyBvZiB3aW5lYCB9OwogICAgdmFyIHNvdXJjZU91dHB1dCA9IDA7CiAgICAKICAgIHRoaXMuZGVidWdMb2coJ2dldCB0cnVjayBwb3Bjb2RlOiAnICsgZGVzdE5hbWUpOwogICAgdmFyIHRydWNrUG9wY29kZSA9IGF3YWl0IHRoaXMub25lQnlOYW1lKGRlc3ROYW1lKTsKICAgIHRoaXMuZGVidWdMb2codHJ1Y2tQb3Bjb2RlKTsKICAgICAKICAgIHRoaXMuZGVidWdMb2coJ2NoZWNrIHNvdXJjZSB3aW5lIGJvdHRsZSBjb3VudCcpOwogICAgdmFyIHdpbmVCb3R0bGVzID0gdGhpcy50b0ludGVnZXIoc3JjUG9wY29kZS5hcHBEYXRhLndpbmVCb3R0bGVzKTsKICAgIHZhciB3aW5lVW5pdCA9IHNyY1BvcGNvZGUuYXBwRGF0YS53aW5lVW5pdDsKICAgIHRoaXMuZGVidWdMb2coe3NyY1BvcGNvZGV9KTsKICAgIHRoaXMuZGVidWdMb2coe3dpbmVCb3R0bGVzLGRlc3RBbW91bnQsd2luZVVuaXR9KTsKICAgIAogICAgaWYoXy5pc05pbChkZXN0QW1vdW50KSB8fCBfLmlzTmFOKGRlc3RBbW91bnQpKSB7CiAgICAgIHRoaXMuZGVidWdMb2coJyoqKioqKioqKioqKioqKioqKiBlcnJvciBiYWQgZGVzdEFtb3VudCknKTsKICAgICAgdGhpcy5ob29rcy5maW5pc2gucmVzb2x2ZShydmFsKTsKICAgICAgcmV0dXJuIDsKICAgIH0KICAgIAogICAgaWYoXy5pc05pbCh3aW5lQm90dGxlcykgfHwgXy5pc05hTihkZXN0QW1vdW50KSkgewogICAgICB0aGlzLmRlYnVnTG9nKCcqKioqKioqKioqKioqKioqKiogZXJyb3IgYmFkIHdpbmVCb3R0bGVzJyk7CiAgICAgIHRoaXMuaG9va3MuZmluaXNoLnJlc29sdmUocnZhbCk7CiAgICAgIHJldHVybiA7CiAgICB9CiAgICAKICAgIGlmKGRlc3RBbW91bnQgPiB3aW5lQm90dGxlcykgewogICAgICB0aGlzLmRlYnVnTG9nKCcqKioqKioqKioqKioqKioqKiogZXJyb3IgZGVzdEFtb3VudCA+IHdpbmVCb3R0bGVzJyk7CiAgICAgIHRoaXMuaG9va3MuZmluaXNoLnJlc29sdmUocnZhbCk7CiAgICAgIHJldHVybiA7CiAgICB9CiAgICAgCiAgICB2YXIgdHJ1Y2tCb3R0bGVzOwogICAgaWYgKF8uaXNOaWwodHJ1Y2tQb3Bjb2RlKSkgewogICAgICB0aGlzLmRlYnVnTG9nKCdNaW50aW5nIHRydWNrIHBvcGNvZGU6ICcgKyBkZXN0TmFtZSk7CiAgICAgIHZhciB0cnVja1Nwb3QgPSAndHJ1Y2tlci5zaG93JzsKICAgICAgdmFyIG5ld0lkID0gdGhpcy5ob29rcy5zaG9ydGlkLmdlbmVyYXRlKCk7CiAgICAgIHZhciB0cnVja1N0YXJ0QW1vdW50ID0gMDsKICAgICAgdmFyIHRydWNrVW5pdCA9ICdib3R0bGVzIG9mIHdpbmUnOwogICAgICB0cnVja0JvdHRsZXMgPSAwOwogICAgICB2YXIgdHJ1Y2tEYXRhID0KICAgICAgICAgIHsKICAgICAgICAgICAgImFwcERhdGEiOiB7CiAgICAgICAgICAgICAgIndvcmtmbG93RGF0YSI6IHt9LAogICAgICAgICAgICAgICJzcG90IjogdHJ1Y2tTcG90LAogICAgICAgICAgICAgICJ3aW5lQm90dGxlcyI6IHRydWNrQm90dGxlcywKICAgICAgICAgICAgICAid2luZVVuaXQiOiB3aW5lVW5pdCwKICAgICAgICAgICAgICAid29ya2Zsb3dOYW1lIjogc3Mud29ya2Zsb3cubmFtZSwKICAgICAgICAgICAgICAid29ya2Zsb3dJbnN0YW5jZUlkIjogbmV3SWQsCiAgICAgICAgICAgICAgIndvcmtmbG93Um9vdFBvcGNvZGUiOiAidHJ1ZSIsCiAgICAgICAgICAgICAgcG9wY29kZU5hbWU6IGRlc3ROYW1lLAogICAgICAgICAgICAgICJ3b3JrZmxvd0RlZiI6IHdvcmtmbG93CiAgICAgICAgICAgIH0KICAgICAgICAgIH07CiAgICAgIHZhciBuZXdQb3Bjb2RlID0gYXdhaXQgdGhpcy5nZW5lcmF0ZSgpOwogICAgICB2YXIgdHJ1Y2tBZGRyZXNzID0gbmV3UG9wY29kZS5wb3Bjb2RlLmFkZHJlc3M7CiAgICAgIAogICAgICB2YXIgcmVzID0gYXdhaXQgdGhpcy5zaWduQW5kTWludCh0cnVja0FkZHJlc3MsdHJ1Y2tEYXRhLHVzZXJQdWJsaWNLZXksdHJ1Y2tTdGFydEFtb3VudCx0cnVja1VuaXQsdXNlclByaXZhdGVLZXkpOwogICAgICAKICAgICAgdHJ1Y2tQb3Bjb2RlID0gYXdhaXQgdGhpcy5vbmVCeU5hbWUoZGVzdE5hbWUpOwogICAgfQogICAgZWxzZSB7CiAgICAgIHRoaXMuZGVidWdMb2coJ0ZvdW5kIGV4aXN0aW5nIHRydWNrIHBvcGNvZGU6ICcgKyBkZXN0TmFtZSk7CiAgICAgIHRydWNrQm90dGxlcyA9IHRydWNrUG9wY29kZS5hcHBEYXRhLndpbmVCb3R0bGVzOwogICAgfQogICAgCiAgICBpZihfLmlzTmlsKHRydWNrUG9wY29kZSkpIHsKICAgICAgdGhpcy5kZWJ1Z0xvZygnKioqKioqKioqKioqKioqKioqIEVycm9yIG1pbnRpbmcgdHJ1Y2sgcG9wY29kZScpOwogICAgICB0aGlzLmhvb2tzLmZpbmlzaC5yZXNvbHZlKHJ2YWwpOwogICAgICByZXR1cm4gOwogICAgfQogICAgCiAgICB0aGlzLmRlYnVnTG9nKCcjIyMjIyMjIyMjIyMjIyMjIHRydWNrIHBvcGNvZGU6Jyk7CiAgICB0aGlzLmRlYnVnTG9nKHRydWNrUG9wY29kZSk7CiAgICAKICAgIHZhciB3cmVzID0gYXdhaXQgdGhpcy5zaWduQW5kV2l0aGRyYXcoCiAgICAgIHNyY1BvcGNvZGUucHJpdmF0ZUtleSwKICAgICAgc3JjUG9wY29kZS5hZGRyZXNzLAogICAgICB0cnVja1BvcGNvZGUuYWRkcmVzcywKICAgICAgZGVzdEFtb3VudCwKICAgICAgZGF0YSwKICAgICAgc291cmNlT3V0cHV0CiAgICApOwogICAgCiAgICB0aGlzLmRlYnVnTG9nKCcjIyMjIyMjIyMjIyMjIyMjIHdpdGhkcmF3IHJlc3VsdDonKTsKICAgIHRoaXMuZGVidWdMb2cod3Jlcyk7CiAgICBydmFsLndyZXMgPSB3cmVzOwogICAgCiAgICB0aGlzLmRlYnVnTG9nKCcjIyMjIyMjIyMjIyMjIyMjIHVwZGF0ZSBzb3VyY2Ugd2luZSBib3R0bGUgY291bnQ6Jyk7CiAgICB2YXIgd2luZUNvdW50ID0gd2luZUJvdHRsZXMgLSBkZXN0QW1vdW50OwogICAgdmFyIHdpbmVEYXRhID0KICAgICAgICB7CiAgICAgICAgICAiYXBwRGF0YSI6IHsKICAgICAgICAgICAgIndpbmVCb3R0bGVzIjogd2luZUNvdW50CiAgICAgICAgICB9CiAgICAgICAgfTsKCiAgICB0aGlzLmRlYnVnTG9nKHdpbmVEYXRhKTsKICAgIHZhciBicmVzID0gYXdhaXQgdGhpcy5ibG9iQ3JlYXRlKAogICAgICBzcmNQb3Bjb2RlLmFkZHJlc3MsCiAgICAgIHdpbmVEYXRhLAogICAgICB1c2VyQ3JlZGVudGlhbHMucHVibGljS2V5LAogICAgICB1c2VyQ3JlZGVudGlhbHMucHJpdmF0ZUtleSk7CiAgICAgIAogICAgdGhpcy5kZWJ1Z0xvZygnIyMjIyMjIyMjIyMjIyMjIyBibG9iQ3JlYXRlIHJlc3VsdDonKTsKICAgIHRoaXMuZGVidWdMb2coYnJlcyk7CiAgICBydmFsLmJyZXMgPSBicmVzOwogICAgCiAgICB0aGlzLmRlYnVnTG9nKCcjIyMjIyMjIyMjIyMjIyMjIHVwZGF0ZSB0cnVjayB3aW5lIGJvdHRsZSBjb3VudDonKTsKICAgIHZhciB0cnVja0NvdW50ID0gdHJ1Y2tCb3R0bGVzICsgZGVzdEFtb3VudDsKICAgIHZhciB0cnVja1dpbmVEYXRhID0KICAgICAgICB7CiAgICAgICAgICAiYXBwRGF0YSI6IHsKICAgICAgICAgICAgIndpbmVCb3R0bGVzIjogdHJ1Y2tDb3VudAogICAgICAgICAgfQogICAgICAgIH07CgogICAgdGhpcy5kZWJ1Z0xvZyh0cnVja1dpbmVEYXRhKTsKICAgIHZhciBicmVzMiA9IGF3YWl0IHRoaXMuYmxvYkNyZWF0ZSgKICAgICAgdHJ1Y2tQb3Bjb2RlLmFkZHJlc3MsCiAgICAgIHRydWNrV2luZURhdGEsCiAgICAgIHVzZXJDcmVkZW50aWFscy5wdWJsaWNLZXksCiAgICAgIHVzZXJDcmVkZW50aWFscy5wcml2YXRlS2V5KTsKICAgICAgCiAgICB0aGlzLmRlYnVnTG9nKCcjIyMjIyMjIyMjIyMjIyMjIHRydWNrIGJsb2JDcmVhdGUgcmVzdWx0OicpOwogICAgdGhpcy5kZWJ1Z0xvZyhicmVzMik7CiAgICBydmFsLmJyZXMyID0gYnJlczI7CiAgICAKICAgIHRoaXMuaG9va3MuZmluaXNoLnJlc29sdmUocnZhbCk7CiAgIH0KCn07Cg=="]
            }
        },
        "address": "34baf20d6d7149f0472451911e91937762152480",
        "createdAt": "1520231206538",
        "date": "1520231206538",
        "operation": "mint",
        "destCounter": "yMkv48yUcAVXdNN1IEAmxPR4TFv+1IAJEEVcBgjMMU8="
    },
        {"id": "<a425d5ac7aedb7b0e6336dd8680a3e1227ca130eb8d387dce620171a3fee5af7>",
        "sourceAddress": "0879c87ec18a84cde314b9d92826fd910e56e647",
        "destPopcode": "<34baf20d6d7149f0472451911e91937762152480>",
        "txId": "a425d5ac7aedb7b0e6336dd8680a3e1227ca130eb8d387dce620171a3fee5af7",
        "data": {"metadata": {"description": "withdraw 500 bottles of wine"}},
        "type": "transaction",
        "sourceCounter": "WjiZCxxNZ1p6Ay0XTxeNVNT88hEw7JyDgrnE+1+YlV0=",
        "createdAt": "1520231209673",
        "date": "1520231209673",
        "destAddress": "34baf20d6d7149f0472451911e91937762152480",
        "destAmount": "500",
        "operation": "withdraw",
        "sourcePopcode": "<0879c87ec18a84cde314b9d92826fd910e56e647>"
    },
        {"id": "<fa86dbf2417576d1dc5c99399ede92cba5962d0c0ef449553e2d01506484ba47>",
        "popcode": "<34baf20d6d7149f0472451911e91937762152480>",
        "txId": "fa86dbf2417576d1dc5c99399ede92cba5962d0c0ef449553e2d01506484ba47",
        "data": {"metadata": {"appData": {"wineBottles": 500}}},
        "type": "transaction",
        "sourceCounter": "EvR4uHCtzh6LhpOYBXjb7Mn2Wt24bB1LzrFYUcekP1Q=",
        "address": "34baf20d6d7149f0472451911e91937762152480",
        "createdAt": "1520231214872",
        "date": "1520231214872",
        "operation": "blobCreate",
        "destCounter": "Eoeq20MjmKcAHQ1yFrsBiy6r6LZEY7F/HCJxY1lqtX8="
    }, {
        "id": "<0cfd4b993d6d271e18ad6bdc361a663995f1339710c1437de902dba3068a6846>",
        "sourceAddress": "af5efdc4b5176fd77e9cc8c9c6e42f8b1552c1b3",
        "destPopcode": "<34baf20d6d7149f0472451911e91937762152480>",
        "txId": "0cfd4b993d6d271e18ad6bdc361a663995f1339710c1437de902dba3068a6846",
        "data": {"metadata": {"description": "withdraw 50 bottles of wine"}},
        "type": "transaction",
        "sourceCounter": "JUe2p5FA5zIzYmSSxEJBKXyAoCmD6q/e5oLMES5KgHs=",
        "createdAt": "1520232241135",
        "date": "1520232241135",
        "destAddress": "34baf20d6d7149f0472451911e91937762152480",
        "destAmount": "50",
        "operation": "withdraw",
        "sourcePopcode": "<af5efdc4b5176fd77e9cc8c9c6e42f8b1552c1b3>"
    }, {
        "id": "<dd98d608893c62911321a95c1415cc12763383503ef2575bf4d146d2721da65d>",
        "popcode": "<34baf20d6d7149f0472451911e91937762152480>",
        "txId": "dd98d608893c62911321a95c1415cc12763383503ef2575bf4d146d2721da65d",
        "data": {"metadata": {"appData": {"wineBottles": 550}}},
        "type": "transaction",
        "sourceCounter": "iSd2nA65+p6BcgXfY+/OD+Dy/YPupYUOh4WWdYMQYbk=",
        "address": "34baf20d6d7149f0472451911e91937762152480",
        "createdAt": "1520232249186",
        "date": "1520232249186",
        "operation": "blobCreate",
        "destCounter": "1GQVDhvYDgRmjSYlNpuRsZBfe3PoPAErTv2z2vikZOk="
    }, {
        "id": "<ab15d2c980074de6c459a29886a2bc6219535eb9fc43599acd1f3f737fd5e6b3>",
        "sourceAddress": "af5efdc4b5176fd77e9cc8c9c6e42f8b1552c1b3",
        "destPopcode": "<34baf20d6d7149f0472451911e91937762152480>",
        "txId": "ab15d2c980074de6c459a29886a2bc6219535eb9fc43599acd1f3f737fd5e6b3",
        "data": {"metadata": {"description": "withdraw 150 bottles of wine"}},
        "type": "transaction",
        "sourceCounter": "JUe2p5FA5zIzYmSSxEJBKXyAoCmD6q/e5oLMES5KgHs=",
        "createdAt": "1520232305656",
        "date": "1520232305656",
        "destAddress": "34baf20d6d7149f0472451911e91937762152480",
        "destAmount": "150",
        "operation": "withdraw",
        "sourcePopcode": "<af5efdc4b5176fd77e9cc8c9c6e42f8b1552c1b3>"
    }, {
        "id": "<b1aec8dd6ebe760fa71d8a17a4f5770a8efae04b313a132ec1f4fde9ded54b6e>",
        "popcode": "<34baf20d6d7149f0472451911e91937762152480>",
        "txId": "b1aec8dd6ebe760fa71d8a17a4f5770a8efae04b313a132ec1f4fde9ded54b6e",
        "data": {"metadata": {"appData": {"wineBottles": 700}}},
        "type": "transaction",
        "sourceCounter": "FpYahCQQMcdllpUOWNEbmt0scggQiF5mgGDND5UOkfg=",
        "address": "34baf20d6d7149f0472451911e91937762152480",
        "createdAt": "1520232310606",
        "date": "1520232310606",
        "operation": "blobCreate",
        "destCounter": "XU0L01Au/uCTds9y7ea54X/xiBcKeygVuF24Yx9pyxM="
    }],
    "workflowName": "wineV1",
    "workflowData": {},
    "wineBottles": 700,
    "wineUnit": "bottles of wine",
    "timestamp": 1520232310606
}]
export const visOpts = {
    "visName": "wine",
    "winePopcodes": [{
        "id": "<0879c87ec18a84cde314b9d92826fd910e56e647>",
        "workflowInstanceId": "F3SMYQ4TS",
        "appData": {
            "workflowData": {"mintWineBottles": {"Amount": "1000", "Unit": "bottles of wine"}},
            "wineBottles": 500,
            "wineUnit": "bottles of wine",
            "spot": "trucker.pickup",
            "workflowName": "wineV1",
            "workflowInstanceId": "F3SMYQ4TS",
            "workflowRootPopcode": "true",
            "popcodeName": "Wine_F3SMYQ4TS",
            "workflowDef": {
                "title": "Wine V1",
                "name": "wineV1",
                "startScreen": "Home",
                "version": "2.0",
                "steps": {
                    "winemaker.mint": {
                        "step": "winemaker.mint",
                        "title": "Winemaker Mint",
                        "screen": "WinemakerMint"
                    },
                    "trucker.pickup": {"step": "trucker.pickup", "title": "Trucker Pickup", "screen": "TruckerPickup"},
                    "trucker.show": {"step": "trucker.show", "title": "Trucker Show", "screen": "TruckerShow"}
                },
                "appOptions": {"requireLogin": true},
                "screens": {
                    "Home": {
                        "name": "Home",
                        "title": "Home",
                        "api": "/api/mobile",
                        "screenListItems": {
                            "fetchItems": "/popcodeByWorkflowName",
                            "method": "get",
                            "api": "cayley",
                            "fetchParameters": {"workflowName": "wineV1"},
                            "itemDataTypes": {"popcode": "object"},
                            "itemLabel": ["popcodeName"],
                            "itemActions": {
                                "click": {
                                    "title": "Click",
                                    "action": [{
                                        "operation": "startWorkflow",
                                        "replaceCurrent": true,
                                        "parameters": {"spot": "@popcode.spot", "popcode": "@popcode"}
                                    }],
                                    "parameters": {"popcode": "@item"}
                                }
                            }
                        },
                        "screenButtons": {
                            "scan": {
                                "title": "Scan",
                                "action": [{"operation": "navigate", "screen": "Scan"}],
                                "roles": ["admin", "winemaker", "trucker"]
                            },
                            "mint": {
                                "title": "Mint",
                                "action": [{"operation": "navigate", "resetStack": true, "screen": "WinemakerMint"}],
                                "roles": ["admin", "winemaker"]
                            }
                        }
                    },
                    "Scan": {
                        "name": "Scan",
                        "title": "Scan",
                        "api": "/api/mobile",
                        "parameters": {"user": "@user"},
                        "modal": false,
                        "screenScan": {},
                        "startAction": [{
                            "operation": "scanBarcode",
                            "barcodeTypes": ["qr", "code128"],
                            "outputs": {"scanData": "@scanData"}
                        }, {
                            "operation": "routePopcode",
                            "parameters": {"scanData": "@scanData"},
                            "outputs": {"address": "@address"}
                        }, {
                            "operation": "fetch",
                            "route": "/p",
                            "method": "get",
                            "parameters": {"address": "@address"},
                            "outputs": {"popcode": "@popcodes[0]"}
                        }, {
                            "operation": "startWorkflow",
                            "replaceCurrent": true,
                            "parameters": {"spot": "@popcode.spot", "popcode": "@popcode"}
                        }]
                    },
                    "WinemakerMint": {
                        "name": "WinemakerMint",
                        "title": "Winemaker Mint",
                        "api": "/api/mobile",
                        "parameters": {"container": "@container", "popcode": "@popcode", "user": "@user"},
                        "outputs": {"popcode": "@container"},
                        "screenForm": {
                            "fields": {
                                "type": "object",
                                "properties": {
                                    "mintWineBottles": {
                                        "type": "object",
                                        "properties": {
                                            "Amount": {
                                                "type": "string",
                                                "value": "1000",
                                                "options": {"editable": true}
                                            },
                                            "Unit": {
                                                "type": "string",
                                                "value": "bottles of wine",
                                                "options": {"editable": true}
                                            }
                                        },
                                        "required": ["Amount", "Unit"]
                                    }
                                },
                                "required": ["mintWineBottles"]
                            }, "options": {"auto": "labels"}
                        },
                        "screenButtons": {
                            "mint": {
                                "title": "Mint",
                                "action": [{
                                    "operation": "contract",
                                    "contract": "winemakerMintOk",
                                    "parameters": {"popcode": "@popcode"},
                                    "outputs": {"status": "@status", "txId": "@txId"}
                                }, {
                                    "operation": "navigate",
                                    "resetStack": true,
                                    "forceUpdate": true,
                                    "screen": "Home"
                                }],
                                "roles": ["admin", "winemaker"]
                            },
                            "cancel": {
                                "title": "Cancel",
                                "action": [{"operation": "navigate", "resetStack": true, "screen": "Home"}]
                            }
                        }
                    },
                    "TruckerPickup": {
                        "name": "TruckerPickup",
                        "title": "Trucker Wine Pickup",
                        "api": "/api/mobile",
                        "parameters": {"container": "@container", "popcode": "@popcode", "user": "@user"},
                        "outputs": {"popcode": "@container"},
                        "tabs": {
                            "tab1": {
                                "title": "Pickup Wine",
                                "screenForm": {
                                    "privateKey": ["winemaker", "admin"],
                                    "publicKey": ["winemaker", "trucker", "admin"],
                                    "fields": {
                                        "type": "object",
                                        "properties": {
                                            "popcode": {
                                                "type": "object",
                                                "properties": {
                                                    "name": {
                                                        "type": "string",
                                                        "value": "@popcode.popcodeName",
                                                        "options": {"editable": false}
                                                    },
                                                    "address": {
                                                        "type": "string",
                                                        "value": "@popcode.address",
                                                        "options": {"editable": false}
                                                    },
                                                    "currentState": {
                                                        "type": "string",
                                                        "value": "@popcode.spot",
                                                        "options": {"editable": false}
                                                    }
                                                },
                                                "required": ["name", "address", "currentState"]
                                            },
                                            "warehouseContents": {
                                                "type": "object",
                                                "properties": {
                                                    "Amount": {
                                                        "type": "number",
                                                        "value": "@popcode.appData.wineBottles",
                                                        "options": {"editable": false}
                                                    },
                                                    "Unit": {
                                                        "type": "string",
                                                        "value": "@popcode.appData.wineUnit",
                                                        "options": {"editable": false}
                                                    }
                                                }
                                            },
                                            "withdraw": {
                                                "type": "object",
                                                "properties": {
                                                    "pickupAmount": {
                                                        "type": "number",
                                                        "options": {"editable": true}
                                                    }
                                                },
                                                "required": ["pickupAmount"]
                                            }
                                        },
                                        "required": ["withdraw"]
                                    },
                                    "options": {"auto": "labels"}
                                }
                            }, "tab2": {"title": "Popcode Graph", "graphView": {"visName": "wine"}}
                        },
                        "screenButtons": {
                            "pickup": {
                                "title": "Pickup",
                                "action": [{
                                    "operation": "contract",
                                    "contract": "truckerPickupOk",
                                    "parameters": {"popcode": "@popcode"},
                                    "outputs": {"status": "@status", "txId": "@txId"}
                                }, {
                                    "operation": "navigate",
                                    "resetStack": true,
                                    "forceUpdate": true,
                                    "screen": "Home"
                                }],
                                "roles": ["admin", "trucker"]
                            },
                            "cancel": {
                                "title": "Cancel",
                                "action": [{"operation": "navigate", "resetStack": true, "screen": "Home"}]
                            }
                        }
                    },
                    "TruckerShow": {
                        "name": "TruckerShow",
                        "title": "Truck Popcode",
                        "api": "/api/mobile",
                        "parameters": {"container": "@container", "popcode": "@popcode", "user": "@user"},
                        "outputs": {"popcode": "@container"},
                        "tabs": {
                            "tab1": {
                                "title": "Truck Contents",
                                "screenForm": {
                                    "privateKey": ["trucker", "admin"],
                                    "publicKey": ["winemaker", "trucker", "admin"],
                                    "fields": {
                                        "type": "object",
                                        "properties": {
                                            "popcode": {
                                                "type": "object",
                                                "properties": {
                                                    "name": {
                                                        "type": "string",
                                                        "value": "@popcode.popcodeName",
                                                        "options": {"editable": false}
                                                    },
                                                    "address": {
                                                        "type": "string",
                                                        "value": "@popcode.address",
                                                        "options": {"editable": false}
                                                    },
                                                    "currentState": {
                                                        "type": "string",
                                                        "value": "@popcode.spot",
                                                        "options": {"editable": false}
                                                    }
                                                },
                                                "required": ["name", "address", "currentState"]
                                            },
                                            "truckContents": {
                                                "type": "object",
                                                "properties": {
                                                    "Amount": {
                                                        "type": "number",
                                                        "value": "@popcode.appData.wineBottles",
                                                        "options": {"editable": false}
                                                    },
                                                    "Unit": {
                                                        "type": "string",
                                                        "value": "@popcode.appData.wineUnit",
                                                        "options": {"editable": false}
                                                    }
                                                }
                                            }
                                        }
                                    },
                                    "options": {"auto": "labels"}
                                }
                            }, "tab2": {"title": "Popcode Graph", "graphView": {"visName": "wine"}}
                        },
                        "screenButtons": {
                            "ok": {
                                "title": "Ok",
                                "action": [{"operation": "navigate", "resetStack": true, "screen": "Home"}]
                            }
                        }
                    }
                },
                "contractLib": {
                    "name": "Wine SmartContract Library",
                    "version": "1.0",
                    "slug": "wine_1_0",
                    "libs": ["base64_Y2xhc3MgU21hcnRDb250cmFjdEJhc2UgewogIGNvbnN0cnVjdG9yKGhvb2tzKSB7CiAgICAgIHRoaXMuaG9va3MgPSBob29rczsKICAgICAgdGhpcy5zdGF0ZSA9IGhvb2tzLnN0YXRlOwogICAgICB0aGlzLmRlYnVnTG9nID0gaG9va3MuZGVidWdMb2c7CiAgICAgIHRoaXMuZGVidWdMb2coJ2NvbnN0cnVjdCBTbWFydENvbnRyYWN0QmFzZScpOwogIH0KICBkZWJ1Z1NpemUobykgewogICAgdmFyIHMgPSBKU09OLnN0cmluZ2lmeShvKTsKICAgIHRoaXMuZGVidWdMb2coYHNpemU6ICR7cy5sZW5ndGgvMTAyNH0ga2ApOwogIH0KICBhc3luYyBieU5hbWUocE5hbWUpIHsKICAgIHZhciBhcGkgPSB0aGlzLmhvb2tzLnN0YWNrLmFwaTsKICAgIHZhciB1cmwgPSAnL3AvbmFtZS8nICsgcE5hbWU7CiAgICBjb25zdCByZXMgPSBhd2FpdCBhcGkuZ2V0KHVybCk7CiAgICByZXR1cm4gcmVzLmJvZHk7CiAgfQogIGFzeW5jIG9uZUJ5TmFtZShwTmFtZSkgewogICAgdmFyIF8gPSB0aGlzLmhvb2tzLl87CiAgICB2YXIgYXBpID0gdGhpcy5ob29rcy5zdGFjay5hcGk7CiAgICB2YXIgdXJsID0gJy9wL25hbWUvJyArIHBOYW1lOwogICAgY29uc3QgcmVzID0gYXdhaXQgYXBpLmdldCh1cmwpOwogICAgdmFyIHBvcGNvZGVzID0gIV8uaXNOaWwocmVzKQogICAgICYmICFfLmlzTmlsKHJlcy5ib2R5KQogICAgICYmICFfLmlzTmlsKHJlcy5ib2R5LnBvcGNvZGVzKSA/IHJlcy5ib2R5LnBvcGNvZGVzIDogbnVsbDsKICAgIHZhciBwb3Bjb2RlID0gXy5pc0FycmF5KHBvcGNvZGVzKSAmJiBwb3Bjb2Rlcy5sZW5ndGggPiAwCiAgICAgPyBwb3Bjb2Rlc1swXSA6IG51bGw7CiAgICByZXR1cm4gcG9wY29kZTsKICB9CiAgYXN5bmMgYmFsYW5jZShhZGRyZXNzKSB7CiAgICB2YXIgYXBpID0gdGhpcy5ob29rcy5zdGFjay5hcGk7CiAgICB2YXIgdXJsID0gJy9wL2JhbGFuY2UvJyArIGFkZHJlc3M7CiAgICBjb25zdCByZXMgPSBhd2FpdCBhcGkuZ2V0KHVybCk7CiAgICByZXR1cm4gcmVzLmJvZHk7CiAgfQogIGFzeW5jIGdlbmVyYXRlKCkgewogICAgdmFyIGFwaSA9IHRoaXMuaG9va3Muc3RhY2suYXBpOwogICAgdmFyIHVybCA9ICcvcC9nZW5lcmF0ZSc7CiAgICBjb25zdCByZXMgPSBhd2FpdCBhcGkuZ2V0KHVybCk7CiAgICByZXR1cm4gcmVzLmJvZHk7CiAgfQogIGFzeW5jIGNvbnRhaW5lclBvcGNvZGUoYWRkcmVzcykgewogICAgdmFyIGFwaSA9IHRoaXMuaG9va3Muc3RhY2suYXBpQ2F5bGV5OwogICAgdmFyIHVybCA9ICcvY29udGFpbmVyUG9wY29kZS8nICsgYWRkcmVzczsKICAgIGNvbnN0IHJlcyA9IGF3YWl0IGFwaS5nZXQodXJsKTsKICAgIHJldHVybiByZXMuYm9keTsKICB9CiAgYXN5bmMgYm9tUG9wY29kZXMoYWRkcmVzcykgewogICAgdmFyIGFwaSA9IHRoaXMuaG9va3Muc3RhY2suYXBpQ2F5bGV5OwogICAgdmFyIHVybCA9ICcvYm9tUG9wY29kZXMvJyArIGFkZHJlc3M7CiAgICBjb25zdCByZXMgPSBhd2FpdCBhcGkuZ2V0KHVybCk7CiAgICByZXR1cm4gcmVzLmJvZHk7CiAgfQogIGFzeW5jIHNpZ25NZXNzYWdlKGZpZWxkcyxwcml2YXRlS2V5KSB7CiAgICB2YXIgYXBpID0gdGhpcy5ob29rcy5zdGFjay5hcGk7CiAgICB2YXIgYm9keSA9IHsKICAgICAgZmllbGRzLAogICAgICBwcml2YXRlS2V5CiAgICB9OwogICAgdmFyIHVybCA9ICcvY3J5cHRvL3NpZ25NZXNzYWdlJzsKICAgIHRoaXMuZGVidWdMb2coJyoqKioqKioqKioqIHNpZ25NZXNzYWdlJyk7CiAgICB0aGlzLmRlYnVnTG9nKHtib2R5fSk7CiAgICBjb25zdCByZXMgPSBhd2FpdCBhcGkucG9zdCh1cmwsIHtib2R5fSk7CiAgICB0aGlzLmRlYnVnTG9nKHtib2R5OiByZXMuYm9keX0pOwogICAgcmV0dXJuIHJlcy5ib2R5OwogIH0KICBhc3luYyBibG9iQ3JlYXRlV2l0aFNpZyhzaWcsYWRkcmVzcyxkYXRhLHB1YmxpY0tleSkgewogICAgdmFyIGFwaSA9IHRoaXMuaG9va3Muc3RhY2suYXBpOwogICAgdmFyIGJvZHkgPSB7CiAgICAgIHNpZywKICAgICAgYWRkcmVzcywKICAgICAgcHVibGljS2V5LAogICAgICBkYXRhCiAgICB9OwogICAgdmFyIHVybCA9ICcvcC9ibG9iQ3JlYXRlV2l0aFNpZyc7CiAgICBjb25zdCByZXMgPSBhd2FpdCBhcGkucG9zdCh1cmwsIHtib2R5fSk7CiAgICByZXR1cm4gcmVzLmJvZHk7CiAgfQogIGFzeW5jIGJsb2JDcmVhdGUoYWRkcmVzcyxkYXRhLHB1YmxpY0tleSxwcml2YXRlS2V5KSB7CiAgICB2YXIgZmllbGRzID0gW107CgogICAgdmFyIHJlcyA9IGF3YWl0IHRoaXMuYmFsYW5jZShhZGRyZXNzKTsKICAgIGZpZWxkcy5wdXNoKHJlcy5iYWxhbmNlLkNvdW50ZXIpOwogICAgZmllbGRzLnB1c2goYWRkcmVzcyk7CiAgICBmaWVsZHMucHVzaChkYXRhKTsKCiAgICByZXMgPSBhd2FpdCB0aGlzLnNpZ25NZXNzYWdlKGZpZWxkcyxwcml2YXRlS2V5KTsKCiAgICByZXMgPSBhd2FpdCB0aGlzLmJsb2JDcmVhdGVXaXRoU2lnKHJlcy5zaWcsYWRkcmVzcyxkYXRhLHB1YmxpY0tleSk7CgogICAgcmV0dXJuIHJlczsKICB9CiAgYXN5bmMgbWludChzaWcsYWRkcmVzcyxkYXRhLHB1YmxpY0tleSxhbW91bnQsdW5pdCkgewogICAgdmFyIGFwaSA9IHRoaXMuaG9va3Muc3RhY2suYXBpOwogICAgdmFyIGJvZHkgPSB7CiAgICAgIHNpZywKICAgICAgYWRkcmVzcywKICAgICAgcHVibGljS2V5LAogICAgICBhbW91bnQsCiAgICAgIHVuaXQsCiAgICAgIGRhdGEKICAgIH07CiAgICB0aGlzLmRlYnVnTG9nKCcqKioqKioqKioqKiBkbyBtaW50Jyk7CiAgICB0aGlzLmRlYnVnTG9nKHtib2R5fSk7CiAgICB0aGlzLmRlYnVnTG9nKHthcGl9KTsKICAgIHRoaXMuZGVidWdTaXplKGJvZHkpOwogICAgdmFyIHVybCA9ICcvcC9taW50JzsKICAgIGNvbnN0IHJlcyA9IGF3YWl0IGFwaS5wb3N0KHVybCwge2JvZHl9KTsKICAgIHRoaXMuZGVidWdMb2coJyoqKioqKioqKioqIG1pbnQgcmVzdWx0Jyk7CiAgICB0aGlzLmRlYnVnTG9nKHJlcyk7CiAgICByZXR1cm4gcmVzOwogIH0KICBhc3luYyBzaWduQW5kTWludChhZGRyZXNzLGRhdGEscHVibGljS2V5LGFtb3VudCx1bml0LHByaXZhdGVLZXkpIHsKICAgIHRoaXMuZGVidWdMb2coJ3NpZ25BbmRNaW50Jyk7CiAgICB0aGlzLmRlYnVnTG9nKHthZGRyZXNzLGRhdGEscHVibGljS2V5LGFtb3VudCx1bml0LHByaXZhdGVLZXl9KTsKICAgIHZhciBmaWVsZHMgPSBbXTsKICAgIHZhciB7IGJhbGFuY2UgfSA9IGF3YWl0IHRoaXMuYmFsYW5jZShhZGRyZXNzKTsKICAgIC8vIHRoaXMuZGVidWdMb2coJyMjIyMjIyMjIyMjIyMjIyMgYmFsYW5jZS5Db3VudGVyOiAnICsgYmFsYW5jZS5Db3VudGVyKTsKICAgIGZpZWxkcy5wdXNoKGJhbGFuY2UuQ291bnRlcik7CiAgICBmaWVsZHMucHVzaChhZGRyZXNzKTsKICAgIGZpZWxkcy5wdXNoKGFtb3VudCk7CiAgICBmaWVsZHMucHVzaCh1bml0KTsKICAgIGZpZWxkcy5wdXNoKGRhdGEpOwoKICAgIHZhciB7IHNpZyB9ID0gYXdhaXQgdGhpcy5zaWduTWVzc2FnZShmaWVsZHMscHJpdmF0ZUtleSk7CgogICAgdmFyIHJlcyA9IGF3YWl0IHRoaXMubWludChzaWcsYWRkcmVzcyxkYXRhLHB1YmxpY0tleSxhbW91bnQsdW5pdCk7CgogICAgcmV0dXJuIHJlczsKICB9CiAgYXN5bmMgd2l0aGRyYXcoc2lnLHByaXZhdGVLZXksZGVzdEFkZHJlc3MsZGVzdEFtb3VudCxkYXRhLHNvdXJjZU91dHB1dCkgewogICAgdmFyIGFwaSA9IHRoaXMuaG9va3Muc3RhY2suYXBpOwogICAgdmFyIGJvZHkgPSB7CiAgICAgIHNpZywKICAgICAgcHJpdmF0ZUtleSwKICAgICAgZGVzdEFkZHJlc3MsCiAgICAgIGRlc3RBbW91bnQsCiAgICAgIGRhdGEsCiAgICAgIHNvdXJjZU91dHB1dAogICAgfTsKICAgIHRoaXMuZGVidWdMb2coJyoqKioqKioqKioqIHdpdGhkcmF3Jyk7CiAgICB0aGlzLmRlYnVnTG9nKHtib2R5fSk7CiAgICB2YXIgdXJsID0gJy9wL3dpdGhkcmF3JzsKICAgIGNvbnN0IHJlcyA9IGF3YWl0IGFwaS5wb3N0KHVybCwge2JvZHl9KTsKICAgIHJldHVybiByZXM7CiAgfQogIGFzeW5jIHNpZ25BbmRXaXRoZHJhdyhwcml2YXRlS2V5LHNvdXJjZUFkZHJlc3MsZGVzdEFkZHJlc3MsZGVzdEFtb3VudCxkYXRhLHNvdXJjZU91dHB1dCkgewogICAgdGhpcy5kZWJ1Z0xvZygnc2lnbkFuZFdpdGhkcmF3Jyk7CiAgICB0aGlzLmRlYnVnTG9nKHtwcml2YXRlS2V5LHNvdXJjZUFkZHJlc3MsZGVzdEFkZHJlc3MsZGVzdEFtb3VudCxkYXRhLHNvdXJjZU91dHB1dH0pOwogICAgdmFyIGZpZWxkcyA9IFtdOwogICAgdmFyIHsgYmFsYW5jZSB9ID0gYXdhaXQgdGhpcy5iYWxhbmNlKHNvdXJjZUFkZHJlc3MpOwogICAgLy8gdGhpcy5kZWJ1Z0xvZygnIyMjIyMjIyMjIyMjIyMjIyBiYWxhbmNlLkNvdW50ZXI6ICcgKyBiYWxhbmNlLkNvdW50ZXIpOwogICAgZmllbGRzLnB1c2goYmFsYW5jZS5Db3VudGVyKTsKICAgIGZpZWxkcy5wdXNoKGRlc3RBZGRyZXNzKTsKICAgIGZpZWxkcy5wdXNoKGRhdGEpOwogICAgZmllbGRzLnB1c2goc291cmNlT3V0cHV0KTsKICAgIGZpZWxkcy5wdXNoKGRlc3RBbW91bnQpOwoKICAgIHZhciB7IHNpZyB9ID0gYXdhaXQgdGhpcy5zaWduTWVzc2FnZShmaWVsZHMscHJpdmF0ZUtleSk7CgogICAgdmFyIHJlcyA9IGF3YWl0IHRoaXMud2l0aGRyYXcoc2lnLHByaXZhdGVLZXksZGVzdEFkZHJlc3MsZGVzdEFtb3VudCxkYXRhLHNvdXJjZU91dHB1dCk7CgogICAgcmV0dXJuIHJlczsKICB9CiAgYXN5bmMgYm9tVXBkYXRlV2l0aFNpZyhzaWcsYWRkcmVzcyxwdWJsaWNLZXksYm9tT3AsYm9tQWRkcmVzcykgewogICAgdmFyIGFwaSA9IHRoaXMuaG9va3Muc3RhY2suYXBpOwogICAgdmFyIGJvZHkgPSB7CiAgICAgIHNpZywKICAgICAgYWRkcmVzcywKICAgICAgcHVibGljS2V5LAogICAgICBib21PcCwKICAgICAgYm9tQWRkcmVzcwogICAgfTsKICAgIHRoaXMuZGVidWdMb2coJyoqKioqKioqKioqIGRvIGJvbVVwZGF0ZScpOwogICAgdGhpcy5kZWJ1Z0xvZyh7Ym9keX0pOwogICAgdGhpcy5kZWJ1Z0xvZyh7YXBpfSk7CiAgICB0aGlzLmRlYnVnU2l6ZShib2R5KTsKICAgIHZhciB1cmwgPSAnL3AvYm9tVXBkYXRlV2l0aFNpZyc7CiAgICBjb25zdCByZXMgPSBhd2FpdCBhcGkucG9zdCh1cmwsIHtib2R5fSk7CiAgICB0aGlzLmRlYnVnTG9nKCcqKioqKioqKioqKiBib21VcGRhdGUgcmVzdWx0Jyk7CiAgICB0aGlzLmRlYnVnTG9nKHJlcyk7CiAgICByZXR1cm4gcmVzOwogIH0KICBhc3luYyBzaWduQW5kVXBkYXRlQm9tKGFkZHJlc3MscHVibGljS2V5LGJvbU9wLGJvbUFkZHJlc3MscHJpdmF0ZUtleSkgewogICAgdGhpcy5kZWJ1Z0xvZygnc2lnbkFuZFVwZGF0ZUJvbScpOwogICAgdGhpcy5kZWJ1Z0xvZyh7YWRkcmVzcyxwdWJsaWNLZXksYm9tT3AsYm9tQWRkcmVzcyxwcml2YXRlS2V5fSk7CiAgICB2YXIgZmllbGRzID0gW107CiAgICB2YXIgeyBiYWxhbmNlIH0gPSBhd2FpdCB0aGlzLmJhbGFuY2UoYWRkcmVzcyk7CiAgICAvLyB0aGlzLmRlYnVnTG9nKCcjIyMjIyMjIyMjIyMjIyMjIGJhbGFuY2UuQ291bnRlcjogJyArIGJhbGFuY2UuQ291bnRlcik7CiAgICBmaWVsZHMucHVzaChiYWxhbmNlLkNvdW50ZXIpOwogICAgZmllbGRzLnB1c2goYWRkcmVzcyk7CiAgICBmaWVsZHMucHVzaChib21PcCk7CiAgICBmaWVsZHMucHVzaChib21BZGRyZXNzKTsKCiAgICB2YXIgeyBzaWcgfSA9IGF3YWl0IHRoaXMuc2lnbk1lc3NhZ2UoZmllbGRzLHByaXZhdGVLZXkpOwoKICAgIHZhciByZXMgPSBhd2FpdCB0aGlzLmJvbVVwZGF0ZVdpdGhTaWcoc2lnLGFkZHJlc3MscHVibGljS2V5LGJvbU9wLGJvbUFkZHJlc3MpOwoKICAgIHJldHVybiByZXM7CiAgfQp9Owo=", "base64_Y2xhc3MgU21hcnRDb250cmFjdCBleHRlbmRzIFNtYXJ0Q29udHJhY3RCYXNlIHsKICBjb25zdHJ1Y3Rvcihob29rcykgewogICAgICBzdXBlcihob29rcykKICAgICAgdGhpcy5kZWJ1Z0xvZygnKioqKioqKioqKioqKiogU21hcnRDb250cmFjdCcpOwogIH0KCiAgYXN5bmMgZWNobygpIHsKICAgICAgdGhpcy5kZWJ1Z0xvZygnZWNobycpOwogICAgICB2YXIgcnZhbCA9IHsKICAgICAgICAgIGRhdGE6ICdoZWxsbycKICAgICAgfTsKICAgICAgdGhpcy5ob29rcy5maW5pc2gucmVzb2x2ZShydmFsKTsKICB9CgogIGFzeW5jIHdpbmVtYWtlck1pbnRPaygpIHsgCiAgICB0aGlzLmRlYnVnTG9nKCdleGVjdXRlIHdpbmVtYWtlck1pbnRPaycpOwogICAgICB2YXIgXyA9IHRoaXMuaG9va3MuXzsKICAgICAgdmFyIHNzID0gdGhpcy5ob29rcy5zY3JlZW5TdGF0ZTsKICAgICAgdmFyIGFwcCA9IHRoaXMuaG9va3MuYXBwOwogICAgICB2YXIgdXNlckNyZWRlbnRpYWxzID0gYXBwLmdldEFwcFN0YXRlKCd1c2VyQ3JlZGVudGlhbHMnKTsKICAgICAgdmFyIHB1YmxpY0tleSA9IHVzZXJDcmVkZW50aWFscy5wdWJsaWNLZXk7CiAgICAgIHZhciBwcml2YXRlS2V5ID0gdXNlckNyZWRlbnRpYWxzLnByaXZhdGVLZXk7CiAgICAgIHZhciB3b3JrZmxvdyA9IHNzLndvcmtmbG93OwogICAgICB2YXIgbmV3SWQgPSB0aGlzLmhvb2tzLnNob3J0aWQuZ2VuZXJhdGUoKTsKICAgICAgdmFyIHBvcGNvZGVOYW1lID0gJ1dpbmVfJyArIG5ld0lkOwogICAgICB2YXIgeyBmb3JtIH0gPSB0aGlzLnN0YXRlOwogICAgICB0aGlzLmRlYnVnTG9nKGZvcm0pOwogICAgICB2YXIgeyBwb3Bjb2RlIH0gPSBhd2FpdCB0aGlzLmdlbmVyYXRlKCk7CiAgICAgIHZhciB7IGFkZHJlc3MgfSA9IHBvcGNvZGU7CiAgICAgIHZhciBuZXh0U3BvdCA9ICd0cnVja2VyLnBpY2t1cCc7CiAgICAgIHZhciBhbW91bnQgPSB0aGlzLnRvSW50ZWdlcihmb3JtLm1pbnRXaW5lQm90dGxlcy5BbW91bnQpOwogICAgICB2YXIgdW5pdCA9IGZvcm0ubWludFdpbmVCb3R0bGVzLlVuaXQ7CiAgICAgIHRoaXMuZGVidWdMb2coJyMjIyMjIyMjIyMjIyMlJSUlJSUlJSUlJSUlJCQkJCQkJCQkJCQkJCQgIGdlbmVyYXRlZCB3aW5lbWFrZXIgcG9wY29kZTonKTsKICAgICAgdGhpcy5kZWJ1Z0xvZyh7cG9wY29kZU5hbWUscG9wY29kZX0pOwogICAgICAKICAgICAgdmFyIGRhdGEgPQogICAgICAgICAgewogICAgICAgICAgICAiYXBwRGF0YSI6IHsKICAgICAgICAgICAgICAid29ya2Zsb3dEYXRhIjogZm9ybSwKICAgICAgICAgICAgICAid2luZUJvdHRsZXMiOiBhbW91bnQsCiAgICAgICAgICAgICAgIndpbmVVbml0IjogdW5pdCwKICAgICAgICAgICAgICAic3BvdCI6IG5leHRTcG90LAogICAgICAgICAgICAgICJ3b3JrZmxvd05hbWUiOiBzcy53b3JrZmxvdy5uYW1lLAogICAgICAgICAgICAgICJ3b3JrZmxvd0luc3RhbmNlSWQiOiBuZXdJZCwKICAgICAgICAgICAgICAid29ya2Zsb3dSb290UG9wY29kZSI6ICJ0cnVlIiwKICAgICAgICAgICAgICBwb3Bjb2RlTmFtZSAsCiAgICAgICAgICAgICAgIndvcmtmbG93RGVmIjogd29ya2Zsb3cKICAgICAgICAgICAgfQogICAgICAgICAgfTsKCiAgICAgIHRoaXMuZGVidWdMb2coZGF0YSk7CgogICAgICB2YXIgcmVzID0gYXdhaXQgdGhpcy5zaWduQW5kTWludChhZGRyZXNzLGRhdGEscHVibGljS2V5LGFtb3VudCx1bml0LHByaXZhdGVLZXkpOwogICAgICAvLyB0aGlzLmRlYnVnTG9nKCd0aGlzLnNpZ25BbmRNaW50IHJlcy5ib2R5LmtleXM6ICcgKyBPYmplY3Qua2V5cyhyZXMuYm9keSkpOwoKICAgICAgdmFyIHJ2YWwgPSB7CiAgICAgICAgICBhY3Rpb246IFtdCiAgICAgIH07CiAgICAgIHRoaXMuaG9va3MuZmluaXNoLnJlc29sdmUocnZhbCk7CiAgICAgIHJldHVybiBhZGRyZXNzOwogICAgCiAgfQogIHRvSW50ZWdlcih2YWx1ZSkgewogICAgdmFyIF8gPSB0aGlzLmhvb2tzLl87CiAgICBpZihfLmlzU3RyaW5nKHZhbHVlKSkKICAgICAgcmV0dXJuIHBhcnNlSW50KHZhbHVlKTsKICAgIGVsc2UKICAgICAgcmV0dXJuIHZhbHVlOwogIH0KICBhc3luYyB0cnVja2VyUGlja3VwT2soKSB7IAogICAgdGhpcy5kZWJ1Z0xvZygnZXhlY3V0ZSB0cnVja2VyUGlja3VwT2snKTsKICAgIHZhciBmb3JtID0gdGhpcy5zdGF0ZS5mb3JtOwogICAgdGhpcy5kZWJ1Z0xvZyh7Zm9ybX0pOwogICAgCiAgICB2YXIgcnZhbCA9IHsKICAgICAgICBhY3Rpb246IFtdCiAgICB9OwoKICAgIHZhciBfID0gdGhpcy5ob29rcy5fOwogICAgdmFyIHNzID0gdGhpcy5ob29rcy5zY3JlZW5TdGF0ZTsKICAgIHZhciBhcHAgPSB0aGlzLmhvb2tzLmFwcDsKICAgIHZhciB3b3JrZmxvdyA9IHNzLndvcmtmbG93OwogICAgCiAgICB2YXIgdXNlckNyZWRlbnRpYWxzID0gYXBwLmdldEFwcFN0YXRlKCd1c2VyQ3JlZGVudGlhbHMnKTsKICAgIHZhciB1c2VyUHVibGljS2V5ID0gdXNlckNyZWRlbnRpYWxzLnB1YmxpY0tleTsKICAgIHZhciB1c2VyUHJpdmF0ZUtleSA9IHVzZXJDcmVkZW50aWFscy5wcml2YXRlS2V5OwogICAgCiAgICB2YXIgc3JjUG9wY29kZSA9IHRoaXMuc3RhdGUucG9wY29kZTsKICAgIAoKICAgIHZhciBkZXN0QW1vdW50ID0gdGhpcy50b0ludGVnZXIodGhpcy5zdGF0ZS5mb3JtLndpdGhkcmF3LnBpY2t1cEFtb3VudCk7CiAgICB2YXIgZGVzdE5hbWUgPSAiVHJ1Y2tfIiArIHVzZXJDcmVkZW50aWFscy5zZXNzaW9uSWQ7CiAgICAKICAgIHZhciBkYXRhID0geyBkZXNjcmlwdGlvbjogYHdpdGhkcmF3ICR7ZGVzdEFtb3VudH0gYm90dGxlcyBvZiB3aW5lYCB9OwogICAgdmFyIHNvdXJjZU91dHB1dCA9IDA7CiAgICAKICAgIHRoaXMuZGVidWdMb2coJ2dldCB0cnVjayBwb3Bjb2RlOiAnICsgZGVzdE5hbWUpOwogICAgdmFyIHRydWNrUG9wY29kZSA9IGF3YWl0IHRoaXMub25lQnlOYW1lKGRlc3ROYW1lKTsKICAgIHRoaXMuZGVidWdMb2codHJ1Y2tQb3Bjb2RlKTsKICAgICAKICAgIHRoaXMuZGVidWdMb2coJ2NoZWNrIHNvdXJjZSB3aW5lIGJvdHRsZSBjb3VudCcpOwogICAgdmFyIHdpbmVCb3R0bGVzID0gdGhpcy50b0ludGVnZXIoc3JjUG9wY29kZS5hcHBEYXRhLndpbmVCb3R0bGVzKTsKICAgIHZhciB3aW5lVW5pdCA9IHNyY1BvcGNvZGUuYXBwRGF0YS53aW5lVW5pdDsKICAgIHRoaXMuZGVidWdMb2coe3NyY1BvcGNvZGV9KTsKICAgIHRoaXMuZGVidWdMb2coe3dpbmVCb3R0bGVzLGRlc3RBbW91bnQsd2luZVVuaXR9KTsKICAgIAogICAgaWYoXy5pc05pbChkZXN0QW1vdW50KSB8fCBfLmlzTmFOKGRlc3RBbW91bnQpKSB7CiAgICAgIHRoaXMuZGVidWdMb2coJyoqKioqKioqKioqKioqKioqKiBlcnJvciBiYWQgZGVzdEFtb3VudCknKTsKICAgICAgdGhpcy5ob29rcy5maW5pc2gucmVzb2x2ZShydmFsKTsKICAgICAgcmV0dXJuIDsKICAgIH0KICAgIAogICAgaWYoXy5pc05pbCh3aW5lQm90dGxlcykgfHwgXy5pc05hTihkZXN0QW1vdW50KSkgewogICAgICB0aGlzLmRlYnVnTG9nKCcqKioqKioqKioqKioqKioqKiogZXJyb3IgYmFkIHdpbmVCb3R0bGVzJyk7CiAgICAgIHRoaXMuaG9va3MuZmluaXNoLnJlc29sdmUocnZhbCk7CiAgICAgIHJldHVybiA7CiAgICB9CiAgICAKICAgIGlmKGRlc3RBbW91bnQgPiB3aW5lQm90dGxlcykgewogICAgICB0aGlzLmRlYnVnTG9nKCcqKioqKioqKioqKioqKioqKiogZXJyb3IgZGVzdEFtb3VudCA+IHdpbmVCb3R0bGVzJyk7CiAgICAgIHRoaXMuaG9va3MuZmluaXNoLnJlc29sdmUocnZhbCk7CiAgICAgIHJldHVybiA7CiAgICB9CiAgICAgCiAgICB2YXIgdHJ1Y2tCb3R0bGVzOwogICAgaWYgKF8uaXNOaWwodHJ1Y2tQb3Bjb2RlKSkgewogICAgICB0aGlzLmRlYnVnTG9nKCdNaW50aW5nIHRydWNrIHBvcGNvZGU6ICcgKyBkZXN0TmFtZSk7CiAgICAgIHZhciB0cnVja1Nwb3QgPSAndHJ1Y2tlci5zaG93JzsKICAgICAgdmFyIG5ld0lkID0gdGhpcy5ob29rcy5zaG9ydGlkLmdlbmVyYXRlKCk7CiAgICAgIHZhciB0cnVja1N0YXJ0QW1vdW50ID0gMDsKICAgICAgdmFyIHRydWNrVW5pdCA9ICdib3R0bGVzIG9mIHdpbmUnOwogICAgICB0cnVja0JvdHRsZXMgPSAwOwogICAgICB2YXIgdHJ1Y2tEYXRhID0KICAgICAgICAgIHsKICAgICAgICAgICAgImFwcERhdGEiOiB7CiAgICAgICAgICAgICAgIndvcmtmbG93RGF0YSI6IHt9LAogICAgICAgICAgICAgICJzcG90IjogdHJ1Y2tTcG90LAogICAgICAgICAgICAgICJ3aW5lQm90dGxlcyI6IHRydWNrQm90dGxlcywKICAgICAgICAgICAgICAid2luZVVuaXQiOiB3aW5lVW5pdCwKICAgICAgICAgICAgICAid29ya2Zsb3dOYW1lIjogc3Mud29ya2Zsb3cubmFtZSwKICAgICAgICAgICAgICAid29ya2Zsb3dJbnN0YW5jZUlkIjogbmV3SWQsCiAgICAgICAgICAgICAgIndvcmtmbG93Um9vdFBvcGNvZGUiOiAidHJ1ZSIsCiAgICAgICAgICAgICAgcG9wY29kZU5hbWU6IGRlc3ROYW1lLAogICAgICAgICAgICAgICJ3b3JrZmxvd0RlZiI6IHdvcmtmbG93CiAgICAgICAgICAgIH0KICAgICAgICAgIH07CiAgICAgIHZhciBuZXdQb3Bjb2RlID0gYXdhaXQgdGhpcy5nZW5lcmF0ZSgpOwogICAgICB2YXIgdHJ1Y2tBZGRyZXNzID0gbmV3UG9wY29kZS5wb3Bjb2RlLmFkZHJlc3M7CiAgICAgIAogICAgICB2YXIgcmVzID0gYXdhaXQgdGhpcy5zaWduQW5kTWludCh0cnVja0FkZHJlc3MsdHJ1Y2tEYXRhLHVzZXJQdWJsaWNLZXksdHJ1Y2tTdGFydEFtb3VudCx0cnVja1VuaXQsdXNlclByaXZhdGVLZXkpOwogICAgICAKICAgICAgdHJ1Y2tQb3Bjb2RlID0gYXdhaXQgdGhpcy5vbmVCeU5hbWUoZGVzdE5hbWUpOwogICAgfQogICAgZWxzZSB7CiAgICAgIHRoaXMuZGVidWdMb2coJ0ZvdW5kIGV4aXN0aW5nIHRydWNrIHBvcGNvZGU6ICcgKyBkZXN0TmFtZSk7CiAgICAgIHRydWNrQm90dGxlcyA9IHRydWNrUG9wY29kZS5hcHBEYXRhLndpbmVCb3R0bGVzOwogICAgfQogICAgCiAgICBpZihfLmlzTmlsKHRydWNrUG9wY29kZSkpIHsKICAgICAgdGhpcy5kZWJ1Z0xvZygnKioqKioqKioqKioqKioqKioqIEVycm9yIG1pbnRpbmcgdHJ1Y2sgcG9wY29kZScpOwogICAgICB0aGlzLmhvb2tzLmZpbmlzaC5yZXNvbHZlKHJ2YWwpOwogICAgICByZXR1cm4gOwogICAgfQogICAgCiAgICB0aGlzLmRlYnVnTG9nKCcjIyMjIyMjIyMjIyMjIyMjIHRydWNrIHBvcGNvZGU6Jyk7CiAgICB0aGlzLmRlYnVnTG9nKHRydWNrUG9wY29kZSk7CiAgICAKICAgIHZhciB3cmVzID0gYXdhaXQgdGhpcy5zaWduQW5kV2l0aGRyYXcoCiAgICAgIHNyY1BvcGNvZGUucHJpdmF0ZUtleSwKICAgICAgc3JjUG9wY29kZS5hZGRyZXNzLAogICAgICB0cnVja1BvcGNvZGUuYWRkcmVzcywKICAgICAgZGVzdEFtb3VudCwKICAgICAgZGF0YSwKICAgICAgc291cmNlT3V0cHV0CiAgICApOwogICAgCiAgICB0aGlzLmRlYnVnTG9nKCcjIyMjIyMjIyMjIyMjIyMjIHdpdGhkcmF3IHJlc3VsdDonKTsKICAgIHRoaXMuZGVidWdMb2cod3Jlcyk7CiAgICBydmFsLndyZXMgPSB3cmVzOwogICAgCiAgICB0aGlzLmRlYnVnTG9nKCcjIyMjIyMjIyMjIyMjIyMjIHVwZGF0ZSBzb3VyY2Ugd2luZSBib3R0bGUgY291bnQ6Jyk7CiAgICB2YXIgd2luZUNvdW50ID0gd2luZUJvdHRsZXMgLSBkZXN0QW1vdW50OwogICAgdmFyIHdpbmVEYXRhID0KICAgICAgICB7CiAgICAgICAgICAiYXBwRGF0YSI6IHsKICAgICAgICAgICAgIndpbmVCb3R0bGVzIjogd2luZUNvdW50CiAgICAgICAgICB9CiAgICAgICAgfTsKCiAgICB0aGlzLmRlYnVnTG9nKHdpbmVEYXRhKTsKICAgIHZhciBicmVzID0gYXdhaXQgdGhpcy5ibG9iQ3JlYXRlKAogICAgICBzcmNQb3Bjb2RlLmFkZHJlc3MsCiAgICAgIHdpbmVEYXRhLAogICAgICB1c2VyQ3JlZGVudGlhbHMucHVibGljS2V5LAogICAgICB1c2VyQ3JlZGVudGlhbHMucHJpdmF0ZUtleSk7CiAgICAgIAogICAgdGhpcy5kZWJ1Z0xvZygnIyMjIyMjIyMjIyMjIyMjIyBibG9iQ3JlYXRlIHJlc3VsdDonKTsKICAgIHRoaXMuZGVidWdMb2coYnJlcyk7CiAgICBydmFsLmJyZXMgPSBicmVzOwogICAgCiAgICB0aGlzLmRlYnVnTG9nKCcjIyMjIyMjIyMjIyMjIyMjIHVwZGF0ZSB0cnVjayB3aW5lIGJvdHRsZSBjb3VudDonKTsKICAgIHZhciB0cnVja0NvdW50ID0gdHJ1Y2tCb3R0bGVzICsgZGVzdEFtb3VudDsKICAgIHZhciB0cnVja1dpbmVEYXRhID0KICAgICAgICB7CiAgICAgICAgICAiYXBwRGF0YSI6IHsKICAgICAgICAgICAgIndpbmVCb3R0bGVzIjogdHJ1Y2tDb3VudAogICAgICAgICAgfQogICAgICAgIH07CgogICAgdGhpcy5kZWJ1Z0xvZyh0cnVja1dpbmVEYXRhKTsKICAgIHZhciBicmVzMiA9IGF3YWl0IHRoaXMuYmxvYkNyZWF0ZSgKICAgICAgdHJ1Y2tQb3Bjb2RlLmFkZHJlc3MsCiAgICAgIHRydWNrV2luZURhdGEsCiAgICAgIHVzZXJDcmVkZW50aWFscy5wdWJsaWNLZXksCiAgICAgIHVzZXJDcmVkZW50aWFscy5wcml2YXRlS2V5KTsKICAgICAgCiAgICB0aGlzLmRlYnVnTG9nKCcjIyMjIyMjIyMjIyMjIyMjIHRydWNrIGJsb2JDcmVhdGUgcmVzdWx0OicpOwogICAgdGhpcy5kZWJ1Z0xvZyhicmVzMik7CiAgICBydmFsLmJyZXMyID0gYnJlczI7CiAgICAKICAgIHRoaXMuaG9va3MuZmluaXNoLnJlc29sdmUocnZhbCk7CiAgIH0KCn07Cg=="]
                }
            },
            "timestamp": 1520231212402
        },
        "publicKey": "034bba33353f7001d2b438fda4d69d6fce37ce3e9e630c091f033b911ecc08601c",
        "spot": "trucker.pickup",
        "unit": "bottles of wine",
        "privateKey": "43697e1da8940957093d6ba131e4e51a78ebbb8167cea56575926adeab96066f",
        "type": "popcode",
        "popcodeName": "Wine_F3SMYQ4TS",
        "amount": "1000",
        "creatorPublicKey": "AzFSqglD2Tz0BHF7fyc5OZ0NYkqslptvM8W2ghgAjmAN",
        "workflowDef": {
            "title": "Wine V1",
            "name": "wineV1",
            "startScreen": "Home",
            "version": "2.0",
            "steps": {
                "winemaker.mint": {
                    "step": "winemaker.mint",
                    "title": "Winemaker Mint",
                    "screen": "WinemakerMint"
                },
                "trucker.pickup": {"step": "trucker.pickup", "title": "Trucker Pickup", "screen": "TruckerPickup"},
                "trucker.show": {"step": "trucker.show", "title": "Trucker Show", "screen": "TruckerShow"}
            },
            "appOptions": {"requireLogin": true},
            "screens": {
                "Home": {
                    "name": "Home",
                    "title": "Home",
                    "api": "/api/mobile",
                    "screenListItems": {
                        "fetchItems": "/popcodeByWorkflowName",
                        "method": "get",
                        "api": "cayley",
                        "fetchParameters": {"workflowName": "wineV1"},
                        "itemDataTypes": {"popcode": "object"},
                        "itemLabel": ["popcodeName"],
                        "itemActions": {
                            "click": {
                                "title": "Click",
                                "action": [{
                                    "operation": "startWorkflow",
                                    "replaceCurrent": true,
                                    "parameters": {"spot": "@popcode.spot", "popcode": "@popcode"}
                                }],
                                "parameters": {"popcode": "@item"}
                            }
                        }
                    },
                    "screenButtons": {
                        "scan": {
                            "title": "Scan",
                            "action": [{"operation": "navigate", "screen": "Scan"}],
                            "roles": ["admin", "winemaker", "trucker"]
                        },
                        "mint": {
                            "title": "Mint",
                            "action": [{"operation": "navigate", "resetStack": true, "screen": "WinemakerMint"}],
                            "roles": ["admin", "winemaker"]
                        }
                    }
                },
                "Scan": {
                    "name": "Scan",
                    "title": "Scan",
                    "api": "/api/mobile",
                    "parameters": {"user": "@user"},
                    "modal": false,
                    "screenScan": {},
                    "startAction": [{
                        "operation": "scanBarcode",
                        "barcodeTypes": ["qr", "code128"],
                        "outputs": {"scanData": "@scanData"}
                    }, {
                        "operation": "routePopcode",
                        "parameters": {"scanData": "@scanData"},
                        "outputs": {"address": "@address"}
                    }, {
                        "operation": "fetch",
                        "route": "/p",
                        "method": "get",
                        "parameters": {"address": "@address"},
                        "outputs": {"popcode": "@popcodes[0]"}
                    }, {
                        "operation": "startWorkflow",
                        "replaceCurrent": true,
                        "parameters": {"spot": "@popcode.spot", "popcode": "@popcode"}
                    }]
                },
                "WinemakerMint": {
                    "name": "WinemakerMint",
                    "title": "Winemaker Mint",
                    "api": "/api/mobile",
                    "parameters": {"container": "@container", "popcode": "@popcode", "user": "@user"},
                    "outputs": {"popcode": "@container"},
                    "screenForm": {
                        "fields": {
                            "type": "object",
                            "properties": {
                                "mintWineBottles": {
                                    "type": "object",
                                    "properties": {
                                        "Amount": {
                                            "type": "string",
                                            "value": "1000",
                                            "options": {"editable": true}
                                        },
                                        "Unit": {
                                            "type": "string",
                                            "value": "bottles of wine",
                                            "options": {"editable": true}
                                        }
                                    },
                                    "required": ["Amount", "Unit"]
                                }
                            },
                            "required": ["mintWineBottles"]
                        }, "options": {"auto": "labels"}
                    },
                    "screenButtons": {
                        "mint": {
                            "title": "Mint",
                            "action": [{
                                "operation": "contract",
                                "contract": "winemakerMintOk",
                                "parameters": {"popcode": "@popcode"},
                                "outputs": {"status": "@status", "txId": "@txId"}
                            }, {"operation": "navigate", "resetStack": true, "forceUpdate": true, "screen": "Home"}],
                            "roles": ["admin", "winemaker"]
                        },
                        "cancel": {
                            "title": "Cancel",
                            "action": [{"operation": "navigate", "resetStack": true, "screen": "Home"}]
                        }
                    }
                },
                "TruckerPickup": {
                    "name": "TruckerPickup",
                    "title": "Trucker Wine Pickup",
                    "api": "/api/mobile",
                    "parameters": {"container": "@container", "popcode": "@popcode", "user": "@user"},
                    "outputs": {"popcode": "@container"},
                    "tabs": {
                        "tab1": {
                            "title": "Pickup Wine",
                            "screenForm": {
                                "privateKey": ["winemaker", "admin"],
                                "publicKey": ["winemaker", "trucker", "admin"],
                                "fields": {
                                    "type": "object",
                                    "properties": {
                                        "popcode": {
                                            "type": "object",
                                            "properties": {
                                                "name": {
                                                    "type": "string",
                                                    "value": "@popcode.popcodeName",
                                                    "options": {"editable": false}
                                                },
                                                "address": {
                                                    "type": "string",
                                                    "value": "@popcode.address",
                                                    "options": {"editable": false}
                                                },
                                                "currentState": {
                                                    "type": "string",
                                                    "value": "@popcode.spot",
                                                    "options": {"editable": false}
                                                }
                                            },
                                            "required": ["name", "address", "currentState"]
                                        },
                                        "warehouseContents": {
                                            "type": "object",
                                            "properties": {
                                                "Amount": {
                                                    "type": "number",
                                                    "value": "@popcode.appData.wineBottles",
                                                    "options": {"editable": false}
                                                },
                                                "Unit": {
                                                    "type": "string",
                                                    "value": "@popcode.appData.wineUnit",
                                                    "options": {"editable": false}
                                                }
                                            }
                                        },
                                        "withdraw": {
                                            "type": "object",
                                            "properties": {
                                                "pickupAmount": {
                                                    "type": "number",
                                                    "options": {"editable": true}
                                                }
                                            },
                                            "required": ["pickupAmount"]
                                        }
                                    },
                                    "required": ["withdraw"]
                                },
                                "options": {"auto": "labels"}
                            }
                        }, "tab2": {"title": "Popcode Graph", "graphView": {"visName": "wine"}}
                    },
                    "screenButtons": {
                        "pickup": {
                            "title": "Pickup",
                            "action": [{
                                "operation": "contract",
                                "contract": "truckerPickupOk",
                                "parameters": {"popcode": "@popcode"},
                                "outputs": {"status": "@status", "txId": "@txId"}
                            }, {"operation": "navigate", "resetStack": true, "forceUpdate": true, "screen": "Home"}],
                            "roles": ["admin", "trucker"]
                        },
                        "cancel": {
                            "title": "Cancel",
                            "action": [{"operation": "navigate", "resetStack": true, "screen": "Home"}]
                        }
                    }
                },
                "TruckerShow": {
                    "name": "TruckerShow",
                    "title": "Truck Popcode",
                    "api": "/api/mobile",
                    "parameters": {"container": "@container", "popcode": "@popcode", "user": "@user"},
                    "outputs": {"popcode": "@container"},
                    "tabs": {
                        "tab1": {
                            "title": "Truck Contents",
                            "screenForm": {
                                "privateKey": ["trucker", "admin"],
                                "publicKey": ["winemaker", "trucker", "admin"],
                                "fields": {
                                    "type": "object",
                                    "properties": {
                                        "popcode": {
                                            "type": "object",
                                            "properties": {
                                                "name": {
                                                    "type": "string",
                                                    "value": "@popcode.popcodeName",
                                                    "options": {"editable": false}
                                                },
                                                "address": {
                                                    "type": "string",
                                                    "value": "@popcode.address",
                                                    "options": {"editable": false}
                                                },
                                                "currentState": {
                                                    "type": "string",
                                                    "value": "@popcode.spot",
                                                    "options": {"editable": false}
                                                }
                                            },
                                            "required": ["name", "address", "currentState"]
                                        },
                                        "truckContents": {
                                            "type": "object",
                                            "properties": {
                                                "Amount": {
                                                    "type": "number",
                                                    "value": "@popcode.appData.wineBottles",
                                                    "options": {"editable": false}
                                                },
                                                "Unit": {
                                                    "type": "string",
                                                    "value": "@popcode.appData.wineUnit",
                                                    "options": {"editable": false}
                                                }
                                            }
                                        }
                                    }
                                },
                                "options": {"auto": "labels"}
                            }
                        }, "tab2": {"title": "Popcode Graph", "graphView": {"visName": "wine"}}
                    },
                    "screenButtons": {
                        "ok": {
                            "title": "Ok",
                            "action": [{"operation": "navigate", "resetStack": true, "screen": "Home"}]
                        }
                    }
                }
            },
            "contractLib": {
                "name": "Wine SmartContract Library",
                "version": "1.0",
                "slug": "wine_1_0",
                "libs": ["base64_Y2xhc3MgU21hcnRDb250cmFjdEJhc2UgewogIGNvbnN0cnVjdG9yKGhvb2tzKSB7CiAgICAgIHRoaXMuaG9va3MgPSBob29rczsKICAgICAgdGhpcy5zdGF0ZSA9IGhvb2tzLnN0YXRlOwogICAgICB0aGlzLmRlYnVnTG9nID0gaG9va3MuZGVidWdMb2c7CiAgICAgIHRoaXMuZGVidWdMb2coJ2NvbnN0cnVjdCBTbWFydENvbnRyYWN0QmFzZScpOwogIH0KICBkZWJ1Z1NpemUobykgewogICAgdmFyIHMgPSBKU09OLnN0cmluZ2lmeShvKTsKICAgIHRoaXMuZGVidWdMb2coYHNpemU6ICR7cy5sZW5ndGgvMTAyNH0ga2ApOwogIH0KICBhc3luYyBieU5hbWUocE5hbWUpIHsKICAgIHZhciBhcGkgPSB0aGlzLmhvb2tzLnN0YWNrLmFwaTsKICAgIHZhciB1cmwgPSAnL3AvbmFtZS8nICsgcE5hbWU7CiAgICBjb25zdCByZXMgPSBhd2FpdCBhcGkuZ2V0KHVybCk7CiAgICByZXR1cm4gcmVzLmJvZHk7CiAgfQogIGFzeW5jIG9uZUJ5TmFtZShwTmFtZSkgewogICAgdmFyIF8gPSB0aGlzLmhvb2tzLl87CiAgICB2YXIgYXBpID0gdGhpcy5ob29rcy5zdGFjay5hcGk7CiAgICB2YXIgdXJsID0gJy9wL25hbWUvJyArIHBOYW1lOwogICAgY29uc3QgcmVzID0gYXdhaXQgYXBpLmdldCh1cmwpOwogICAgdmFyIHBvcGNvZGVzID0gIV8uaXNOaWwocmVzKQogICAgICYmICFfLmlzTmlsKHJlcy5ib2R5KQogICAgICYmICFfLmlzTmlsKHJlcy5ib2R5LnBvcGNvZGVzKSA/IHJlcy5ib2R5LnBvcGNvZGVzIDogbnVsbDsKICAgIHZhciBwb3Bjb2RlID0gXy5pc0FycmF5KHBvcGNvZGVzKSAmJiBwb3Bjb2Rlcy5sZW5ndGggPiAwCiAgICAgPyBwb3Bjb2Rlc1swXSA6IG51bGw7CiAgICByZXR1cm4gcG9wY29kZTsKICB9CiAgYXN5bmMgYmFsYW5jZShhZGRyZXNzKSB7CiAgICB2YXIgYXBpID0gdGhpcy5ob29rcy5zdGFjay5hcGk7CiAgICB2YXIgdXJsID0gJy9wL2JhbGFuY2UvJyArIGFkZHJlc3M7CiAgICBjb25zdCByZXMgPSBhd2FpdCBhcGkuZ2V0KHVybCk7CiAgICByZXR1cm4gcmVzLmJvZHk7CiAgfQogIGFzeW5jIGdlbmVyYXRlKCkgewogICAgdmFyIGFwaSA9IHRoaXMuaG9va3Muc3RhY2suYXBpOwogICAgdmFyIHVybCA9ICcvcC9nZW5lcmF0ZSc7CiAgICBjb25zdCByZXMgPSBhd2FpdCBhcGkuZ2V0KHVybCk7CiAgICByZXR1cm4gcmVzLmJvZHk7CiAgfQogIGFzeW5jIGNvbnRhaW5lclBvcGNvZGUoYWRkcmVzcykgewogICAgdmFyIGFwaSA9IHRoaXMuaG9va3Muc3RhY2suYXBpQ2F5bGV5OwogICAgdmFyIHVybCA9ICcvY29udGFpbmVyUG9wY29kZS8nICsgYWRkcmVzczsKICAgIGNvbnN0IHJlcyA9IGF3YWl0IGFwaS5nZXQodXJsKTsKICAgIHJldHVybiByZXMuYm9keTsKICB9CiAgYXN5bmMgYm9tUG9wY29kZXMoYWRkcmVzcykgewogICAgdmFyIGFwaSA9IHRoaXMuaG9va3Muc3RhY2suYXBpQ2F5bGV5OwogICAgdmFyIHVybCA9ICcvYm9tUG9wY29kZXMvJyArIGFkZHJlc3M7CiAgICBjb25zdCByZXMgPSBhd2FpdCBhcGkuZ2V0KHVybCk7CiAgICByZXR1cm4gcmVzLmJvZHk7CiAgfQogIGFzeW5jIHNpZ25NZXNzYWdlKGZpZWxkcyxwcml2YXRlS2V5KSB7CiAgICB2YXIgYXBpID0gdGhpcy5ob29rcy5zdGFjay5hcGk7CiAgICB2YXIgYm9keSA9IHsKICAgICAgZmllbGRzLAogICAgICBwcml2YXRlS2V5CiAgICB9OwogICAgdmFyIHVybCA9ICcvY3J5cHRvL3NpZ25NZXNzYWdlJzsKICAgIHRoaXMuZGVidWdMb2coJyoqKioqKioqKioqIHNpZ25NZXNzYWdlJyk7CiAgICB0aGlzLmRlYnVnTG9nKHtib2R5fSk7CiAgICBjb25zdCByZXMgPSBhd2FpdCBhcGkucG9zdCh1cmwsIHtib2R5fSk7CiAgICB0aGlzLmRlYnVnTG9nKHtib2R5OiByZXMuYm9keX0pOwogICAgcmV0dXJuIHJlcy5ib2R5OwogIH0KICBhc3luYyBibG9iQ3JlYXRlV2l0aFNpZyhzaWcsYWRkcmVzcyxkYXRhLHB1YmxpY0tleSkgewogICAgdmFyIGFwaSA9IHRoaXMuaG9va3Muc3RhY2suYXBpOwogICAgdmFyIGJvZHkgPSB7CiAgICAgIHNpZywKICAgICAgYWRkcmVzcywKICAgICAgcHVibGljS2V5LAogICAgICBkYXRhCiAgICB9OwogICAgdmFyIHVybCA9ICcvcC9ibG9iQ3JlYXRlV2l0aFNpZyc7CiAgICBjb25zdCByZXMgPSBhd2FpdCBhcGkucG9zdCh1cmwsIHtib2R5fSk7CiAgICByZXR1cm4gcmVzLmJvZHk7CiAgfQogIGFzeW5jIGJsb2JDcmVhdGUoYWRkcmVzcyxkYXRhLHB1YmxpY0tleSxwcml2YXRlS2V5KSB7CiAgICB2YXIgZmllbGRzID0gW107CgogICAgdmFyIHJlcyA9IGF3YWl0IHRoaXMuYmFsYW5jZShhZGRyZXNzKTsKICAgIGZpZWxkcy5wdXNoKHJlcy5iYWxhbmNlLkNvdW50ZXIpOwogICAgZmllbGRzLnB1c2goYWRkcmVzcyk7CiAgICBmaWVsZHMucHVzaChkYXRhKTsKCiAgICByZXMgPSBhd2FpdCB0aGlzLnNpZ25NZXNzYWdlKGZpZWxkcyxwcml2YXRlS2V5KTsKCiAgICByZXMgPSBhd2FpdCB0aGlzLmJsb2JDcmVhdGVXaXRoU2lnKHJlcy5zaWcsYWRkcmVzcyxkYXRhLHB1YmxpY0tleSk7CgogICAgcmV0dXJuIHJlczsKICB9CiAgYXN5bmMgbWludChzaWcsYWRkcmVzcyxkYXRhLHB1YmxpY0tleSxhbW91bnQsdW5pdCkgewogICAgdmFyIGFwaSA9IHRoaXMuaG9va3Muc3RhY2suYXBpOwogICAgdmFyIGJvZHkgPSB7CiAgICAgIHNpZywKICAgICAgYWRkcmVzcywKICAgICAgcHVibGljS2V5LAogICAgICBhbW91bnQsCiAgICAgIHVuaXQsCiAgICAgIGRhdGEKICAgIH07CiAgICB0aGlzLmRlYnVnTG9nKCcqKioqKioqKioqKiBkbyBtaW50Jyk7CiAgICB0aGlzLmRlYnVnTG9nKHtib2R5fSk7CiAgICB0aGlzLmRlYnVnTG9nKHthcGl9KTsKICAgIHRoaXMuZGVidWdTaXplKGJvZHkpOwogICAgdmFyIHVybCA9ICcvcC9taW50JzsKICAgIGNvbnN0IHJlcyA9IGF3YWl0IGFwaS5wb3N0KHVybCwge2JvZHl9KTsKICAgIHRoaXMuZGVidWdMb2coJyoqKioqKioqKioqIG1pbnQgcmVzdWx0Jyk7CiAgICB0aGlzLmRlYnVnTG9nKHJlcyk7CiAgICByZXR1cm4gcmVzOwogIH0KICBhc3luYyBzaWduQW5kTWludChhZGRyZXNzLGRhdGEscHVibGljS2V5LGFtb3VudCx1bml0LHByaXZhdGVLZXkpIHsKICAgIHRoaXMuZGVidWdMb2coJ3NpZ25BbmRNaW50Jyk7CiAgICB0aGlzLmRlYnVnTG9nKHthZGRyZXNzLGRhdGEscHVibGljS2V5LGFtb3VudCx1bml0LHByaXZhdGVLZXl9KTsKICAgIHZhciBmaWVsZHMgPSBbXTsKICAgIHZhciB7IGJhbGFuY2UgfSA9IGF3YWl0IHRoaXMuYmFsYW5jZShhZGRyZXNzKTsKICAgIC8vIHRoaXMuZGVidWdMb2coJyMjIyMjIyMjIyMjIyMjIyMgYmFsYW5jZS5Db3VudGVyOiAnICsgYmFsYW5jZS5Db3VudGVyKTsKICAgIGZpZWxkcy5wdXNoKGJhbGFuY2UuQ291bnRlcik7CiAgICBmaWVsZHMucHVzaChhZGRyZXNzKTsKICAgIGZpZWxkcy5wdXNoKGFtb3VudCk7CiAgICBmaWVsZHMucHVzaCh1bml0KTsKICAgIGZpZWxkcy5wdXNoKGRhdGEpOwoKICAgIHZhciB7IHNpZyB9ID0gYXdhaXQgdGhpcy5zaWduTWVzc2FnZShmaWVsZHMscHJpdmF0ZUtleSk7CgogICAgdmFyIHJlcyA9IGF3YWl0IHRoaXMubWludChzaWcsYWRkcmVzcyxkYXRhLHB1YmxpY0tleSxhbW91bnQsdW5pdCk7CgogICAgcmV0dXJuIHJlczsKICB9CiAgYXN5bmMgd2l0aGRyYXcoc2lnLHByaXZhdGVLZXksZGVzdEFkZHJlc3MsZGVzdEFtb3VudCxkYXRhLHNvdXJjZU91dHB1dCkgewogICAgdmFyIGFwaSA9IHRoaXMuaG9va3Muc3RhY2suYXBpOwogICAgdmFyIGJvZHkgPSB7CiAgICAgIHNpZywKICAgICAgcHJpdmF0ZUtleSwKICAgICAgZGVzdEFkZHJlc3MsCiAgICAgIGRlc3RBbW91bnQsCiAgICAgIGRhdGEsCiAgICAgIHNvdXJjZU91dHB1dAogICAgfTsKICAgIHRoaXMuZGVidWdMb2coJyoqKioqKioqKioqIHdpdGhkcmF3Jyk7CiAgICB0aGlzLmRlYnVnTG9nKHtib2R5fSk7CiAgICB2YXIgdXJsID0gJy9wL3dpdGhkcmF3JzsKICAgIGNvbnN0IHJlcyA9IGF3YWl0IGFwaS5wb3N0KHVybCwge2JvZHl9KTsKICAgIHJldHVybiByZXM7CiAgfQogIGFzeW5jIHNpZ25BbmRXaXRoZHJhdyhwcml2YXRlS2V5LHNvdXJjZUFkZHJlc3MsZGVzdEFkZHJlc3MsZGVzdEFtb3VudCxkYXRhLHNvdXJjZU91dHB1dCkgewogICAgdGhpcy5kZWJ1Z0xvZygnc2lnbkFuZFdpdGhkcmF3Jyk7CiAgICB0aGlzLmRlYnVnTG9nKHtwcml2YXRlS2V5LHNvdXJjZUFkZHJlc3MsZGVzdEFkZHJlc3MsZGVzdEFtb3VudCxkYXRhLHNvdXJjZU91dHB1dH0pOwogICAgdmFyIGZpZWxkcyA9IFtdOwogICAgdmFyIHsgYmFsYW5jZSB9ID0gYXdhaXQgdGhpcy5iYWxhbmNlKHNvdXJjZUFkZHJlc3MpOwogICAgLy8gdGhpcy5kZWJ1Z0xvZygnIyMjIyMjIyMjIyMjIyMjIyBiYWxhbmNlLkNvdW50ZXI6ICcgKyBiYWxhbmNlLkNvdW50ZXIpOwogICAgZmllbGRzLnB1c2goYmFsYW5jZS5Db3VudGVyKTsKICAgIGZpZWxkcy5wdXNoKGRlc3RBZGRyZXNzKTsKICAgIGZpZWxkcy5wdXNoKGRhdGEpOwogICAgZmllbGRzLnB1c2goc291cmNlT3V0cHV0KTsKICAgIGZpZWxkcy5wdXNoKGRlc3RBbW91bnQpOwoKICAgIHZhciB7IHNpZyB9ID0gYXdhaXQgdGhpcy5zaWduTWVzc2FnZShmaWVsZHMscHJpdmF0ZUtleSk7CgogICAgdmFyIHJlcyA9IGF3YWl0IHRoaXMud2l0aGRyYXcoc2lnLHByaXZhdGVLZXksZGVzdEFkZHJlc3MsZGVzdEFtb3VudCxkYXRhLHNvdXJjZU91dHB1dCk7CgogICAgcmV0dXJuIHJlczsKICB9CiAgYXN5bmMgYm9tVXBkYXRlV2l0aFNpZyhzaWcsYWRkcmVzcyxwdWJsaWNLZXksYm9tT3AsYm9tQWRkcmVzcykgewogICAgdmFyIGFwaSA9IHRoaXMuaG9va3Muc3RhY2suYXBpOwogICAgdmFyIGJvZHkgPSB7CiAgICAgIHNpZywKICAgICAgYWRkcmVzcywKICAgICAgcHVibGljS2V5LAogICAgICBib21PcCwKICAgICAgYm9tQWRkcmVzcwogICAgfTsKICAgIHRoaXMuZGVidWdMb2coJyoqKioqKioqKioqIGRvIGJvbVVwZGF0ZScpOwogICAgdGhpcy5kZWJ1Z0xvZyh7Ym9keX0pOwogICAgdGhpcy5kZWJ1Z0xvZyh7YXBpfSk7CiAgICB0aGlzLmRlYnVnU2l6ZShib2R5KTsKICAgIHZhciB1cmwgPSAnL3AvYm9tVXBkYXRlV2l0aFNpZyc7CiAgICBjb25zdCByZXMgPSBhd2FpdCBhcGkucG9zdCh1cmwsIHtib2R5fSk7CiAgICB0aGlzLmRlYnVnTG9nKCcqKioqKioqKioqKiBib21VcGRhdGUgcmVzdWx0Jyk7CiAgICB0aGlzLmRlYnVnTG9nKHJlcyk7CiAgICByZXR1cm4gcmVzOwogIH0KICBhc3luYyBzaWduQW5kVXBkYXRlQm9tKGFkZHJlc3MscHVibGljS2V5LGJvbU9wLGJvbUFkZHJlc3MscHJpdmF0ZUtleSkgewogICAgdGhpcy5kZWJ1Z0xvZygnc2lnbkFuZFVwZGF0ZUJvbScpOwogICAgdGhpcy5kZWJ1Z0xvZyh7YWRkcmVzcyxwdWJsaWNLZXksYm9tT3AsYm9tQWRkcmVzcyxwcml2YXRlS2V5fSk7CiAgICB2YXIgZmllbGRzID0gW107CiAgICB2YXIgeyBiYWxhbmNlIH0gPSBhd2FpdCB0aGlzLmJhbGFuY2UoYWRkcmVzcyk7CiAgICAvLyB0aGlzLmRlYnVnTG9nKCcjIyMjIyMjIyMjIyMjIyMjIGJhbGFuY2UuQ291bnRlcjogJyArIGJhbGFuY2UuQ291bnRlcik7CiAgICBmaWVsZHMucHVzaChiYWxhbmNlLkNvdW50ZXIpOwogICAgZmllbGRzLnB1c2goYWRkcmVzcyk7CiAgICBmaWVsZHMucHVzaChib21PcCk7CiAgICBmaWVsZHMucHVzaChib21BZGRyZXNzKTsKCiAgICB2YXIgeyBzaWcgfSA9IGF3YWl0IHRoaXMuc2lnbk1lc3NhZ2UoZmllbGRzLHByaXZhdGVLZXkpOwoKICAgIHZhciByZXMgPSBhd2FpdCB0aGlzLmJvbVVwZGF0ZVdpdGhTaWcoc2lnLGFkZHJlc3MscHVibGljS2V5LGJvbU9wLGJvbUFkZHJlc3MpOwoKICAgIHJldHVybiByZXM7CiAgfQp9Owo=", "base64_Y2xhc3MgU21hcnRDb250cmFjdCBleHRlbmRzIFNtYXJ0Q29udHJhY3RCYXNlIHsKICBjb25zdHJ1Y3Rvcihob29rcykgewogICAgICBzdXBlcihob29rcykKICAgICAgdGhpcy5kZWJ1Z0xvZygnKioqKioqKioqKioqKiogU21hcnRDb250cmFjdCcpOwogIH0KCiAgYXN5bmMgZWNobygpIHsKICAgICAgdGhpcy5kZWJ1Z0xvZygnZWNobycpOwogICAgICB2YXIgcnZhbCA9IHsKICAgICAgICAgIGRhdGE6ICdoZWxsbycKICAgICAgfTsKICAgICAgdGhpcy5ob29rcy5maW5pc2gucmVzb2x2ZShydmFsKTsKICB9CgogIGFzeW5jIHdpbmVtYWtlck1pbnRPaygpIHsgCiAgICB0aGlzLmRlYnVnTG9nKCdleGVjdXRlIHdpbmVtYWtlck1pbnRPaycpOwogICAgICB2YXIgXyA9IHRoaXMuaG9va3MuXzsKICAgICAgdmFyIHNzID0gdGhpcy5ob29rcy5zY3JlZW5TdGF0ZTsKICAgICAgdmFyIGFwcCA9IHRoaXMuaG9va3MuYXBwOwogICAgICB2YXIgdXNlckNyZWRlbnRpYWxzID0gYXBwLmdldEFwcFN0YXRlKCd1c2VyQ3JlZGVudGlhbHMnKTsKICAgICAgdmFyIHB1YmxpY0tleSA9IHVzZXJDcmVkZW50aWFscy5wdWJsaWNLZXk7CiAgICAgIHZhciBwcml2YXRlS2V5ID0gdXNlckNyZWRlbnRpYWxzLnByaXZhdGVLZXk7CiAgICAgIHZhciB3b3JrZmxvdyA9IHNzLndvcmtmbG93OwogICAgICB2YXIgbmV3SWQgPSB0aGlzLmhvb2tzLnNob3J0aWQuZ2VuZXJhdGUoKTsKICAgICAgdmFyIHBvcGNvZGVOYW1lID0gJ1dpbmVfJyArIG5ld0lkOwogICAgICB2YXIgeyBmb3JtIH0gPSB0aGlzLnN0YXRlOwogICAgICB0aGlzLmRlYnVnTG9nKGZvcm0pOwogICAgICB2YXIgeyBwb3Bjb2RlIH0gPSBhd2FpdCB0aGlzLmdlbmVyYXRlKCk7CiAgICAgIHZhciB7IGFkZHJlc3MgfSA9IHBvcGNvZGU7CiAgICAgIHZhciBuZXh0U3BvdCA9ICd0cnVja2VyLnBpY2t1cCc7CiAgICAgIHZhciBhbW91bnQgPSB0aGlzLnRvSW50ZWdlcihmb3JtLm1pbnRXaW5lQm90dGxlcy5BbW91bnQpOwogICAgICB2YXIgdW5pdCA9IGZvcm0ubWludFdpbmVCb3R0bGVzLlVuaXQ7CiAgICAgIHRoaXMuZGVidWdMb2coJyMjIyMjIyMjIyMjIyMlJSUlJSUlJSUlJSUlJCQkJCQkJCQkJCQkJCQgIGdlbmVyYXRlZCB3aW5lbWFrZXIgcG9wY29kZTonKTsKICAgICAgdGhpcy5kZWJ1Z0xvZyh7cG9wY29kZU5hbWUscG9wY29kZX0pOwogICAgICAKICAgICAgdmFyIGRhdGEgPQogICAgICAgICAgewogICAgICAgICAgICAiYXBwRGF0YSI6IHsKICAgICAgICAgICAgICAid29ya2Zsb3dEYXRhIjogZm9ybSwKICAgICAgICAgICAgICAid2luZUJvdHRsZXMiOiBhbW91bnQsCiAgICAgICAgICAgICAgIndpbmVVbml0IjogdW5pdCwKICAgICAgICAgICAgICAic3BvdCI6IG5leHRTcG90LAogICAgICAgICAgICAgICJ3b3JrZmxvd05hbWUiOiBzcy53b3JrZmxvdy5uYW1lLAogICAgICAgICAgICAgICJ3b3JrZmxvd0luc3RhbmNlSWQiOiBuZXdJZCwKICAgICAgICAgICAgICAid29ya2Zsb3dSb290UG9wY29kZSI6ICJ0cnVlIiwKICAgICAgICAgICAgICBwb3Bjb2RlTmFtZSAsCiAgICAgICAgICAgICAgIndvcmtmbG93RGVmIjogd29ya2Zsb3cKICAgICAgICAgICAgfQogICAgICAgICAgfTsKCiAgICAgIHRoaXMuZGVidWdMb2coZGF0YSk7CgogICAgICB2YXIgcmVzID0gYXdhaXQgdGhpcy5zaWduQW5kTWludChhZGRyZXNzLGRhdGEscHVibGljS2V5LGFtb3VudCx1bml0LHByaXZhdGVLZXkpOwogICAgICAvLyB0aGlzLmRlYnVnTG9nKCd0aGlzLnNpZ25BbmRNaW50IHJlcy5ib2R5LmtleXM6ICcgKyBPYmplY3Qua2V5cyhyZXMuYm9keSkpOwoKICAgICAgdmFyIHJ2YWwgPSB7CiAgICAgICAgICBhY3Rpb246IFtdCiAgICAgIH07CiAgICAgIHRoaXMuaG9va3MuZmluaXNoLnJlc29sdmUocnZhbCk7CiAgICAgIHJldHVybiBhZGRyZXNzOwogICAgCiAgfQogIHRvSW50ZWdlcih2YWx1ZSkgewogICAgdmFyIF8gPSB0aGlzLmhvb2tzLl87CiAgICBpZihfLmlzU3RyaW5nKHZhbHVlKSkKICAgICAgcmV0dXJuIHBhcnNlSW50KHZhbHVlKTsKICAgIGVsc2UKICAgICAgcmV0dXJuIHZhbHVlOwogIH0KICBhc3luYyB0cnVja2VyUGlja3VwT2soKSB7IAogICAgdGhpcy5kZWJ1Z0xvZygnZXhlY3V0ZSB0cnVja2VyUGlja3VwT2snKTsKICAgIHZhciBmb3JtID0gdGhpcy5zdGF0ZS5mb3JtOwogICAgdGhpcy5kZWJ1Z0xvZyh7Zm9ybX0pOwogICAgCiAgICB2YXIgcnZhbCA9IHsKICAgICAgICBhY3Rpb246IFtdCiAgICB9OwoKICAgIHZhciBfID0gdGhpcy5ob29rcy5fOwogICAgdmFyIHNzID0gdGhpcy5ob29rcy5zY3JlZW5TdGF0ZTsKICAgIHZhciBhcHAgPSB0aGlzLmhvb2tzLmFwcDsKICAgIHZhciB3b3JrZmxvdyA9IHNzLndvcmtmbG93OwogICAgCiAgICB2YXIgdXNlckNyZWRlbnRpYWxzID0gYXBwLmdldEFwcFN0YXRlKCd1c2VyQ3JlZGVudGlhbHMnKTsKICAgIHZhciB1c2VyUHVibGljS2V5ID0gdXNlckNyZWRlbnRpYWxzLnB1YmxpY0tleTsKICAgIHZhciB1c2VyUHJpdmF0ZUtleSA9IHVzZXJDcmVkZW50aWFscy5wcml2YXRlS2V5OwogICAgCiAgICB2YXIgc3JjUG9wY29kZSA9IHRoaXMuc3RhdGUucG9wY29kZTsKICAgIAoKICAgIHZhciBkZXN0QW1vdW50ID0gdGhpcy50b0ludGVnZXIodGhpcy5zdGF0ZS5mb3JtLndpdGhkcmF3LnBpY2t1cEFtb3VudCk7CiAgICB2YXIgZGVzdE5hbWUgPSAiVHJ1Y2tfIiArIHVzZXJDcmVkZW50aWFscy5zZXNzaW9uSWQ7CiAgICAKICAgIHZhciBkYXRhID0geyBkZXNjcmlwdGlvbjogYHdpdGhkcmF3ICR7ZGVzdEFtb3VudH0gYm90dGxlcyBvZiB3aW5lYCB9OwogICAgdmFyIHNvdXJjZU91dHB1dCA9IDA7CiAgICAKICAgIHRoaXMuZGVidWdMb2coJ2dldCB0cnVjayBwb3Bjb2RlOiAnICsgZGVzdE5hbWUpOwogICAgdmFyIHRydWNrUG9wY29kZSA9IGF3YWl0IHRoaXMub25lQnlOYW1lKGRlc3ROYW1lKTsKICAgIHRoaXMuZGVidWdMb2codHJ1Y2tQb3Bjb2RlKTsKICAgICAKICAgIHRoaXMuZGVidWdMb2coJ2NoZWNrIHNvdXJjZSB3aW5lIGJvdHRsZSBjb3VudCcpOwogICAgdmFyIHdpbmVCb3R0bGVzID0gdGhpcy50b0ludGVnZXIoc3JjUG9wY29kZS5hcHBEYXRhLndpbmVCb3R0bGVzKTsKICAgIHZhciB3aW5lVW5pdCA9IHNyY1BvcGNvZGUuYXBwRGF0YS53aW5lVW5pdDsKICAgIHRoaXMuZGVidWdMb2coe3NyY1BvcGNvZGV9KTsKICAgIHRoaXMuZGVidWdMb2coe3dpbmVCb3R0bGVzLGRlc3RBbW91bnQsd2luZVVuaXR9KTsKICAgIAogICAgaWYoXy5pc05pbChkZXN0QW1vdW50KSB8fCBfLmlzTmFOKGRlc3RBbW91bnQpKSB7CiAgICAgIHRoaXMuZGVidWdMb2coJyoqKioqKioqKioqKioqKioqKiBlcnJvciBiYWQgZGVzdEFtb3VudCknKTsKICAgICAgdGhpcy5ob29rcy5maW5pc2gucmVzb2x2ZShydmFsKTsKICAgICAgcmV0dXJuIDsKICAgIH0KICAgIAogICAgaWYoXy5pc05pbCh3aW5lQm90dGxlcykgfHwgXy5pc05hTihkZXN0QW1vdW50KSkgewogICAgICB0aGlzLmRlYnVnTG9nKCcqKioqKioqKioqKioqKioqKiogZXJyb3IgYmFkIHdpbmVCb3R0bGVzJyk7CiAgICAgIHRoaXMuaG9va3MuZmluaXNoLnJlc29sdmUocnZhbCk7CiAgICAgIHJldHVybiA7CiAgICB9CiAgICAKICAgIGlmKGRlc3RBbW91bnQgPiB3aW5lQm90dGxlcykgewogICAgICB0aGlzLmRlYnVnTG9nKCcqKioqKioqKioqKioqKioqKiogZXJyb3IgZGVzdEFtb3VudCA+IHdpbmVCb3R0bGVzJyk7CiAgICAgIHRoaXMuaG9va3MuZmluaXNoLnJlc29sdmUocnZhbCk7CiAgICAgIHJldHVybiA7CiAgICB9CiAgICAgCiAgICB2YXIgdHJ1Y2tCb3R0bGVzOwogICAgaWYgKF8uaXNOaWwodHJ1Y2tQb3Bjb2RlKSkgewogICAgICB0aGlzLmRlYnVnTG9nKCdNaW50aW5nIHRydWNrIHBvcGNvZGU6ICcgKyBkZXN0TmFtZSk7CiAgICAgIHZhciB0cnVja1Nwb3QgPSAndHJ1Y2tlci5zaG93JzsKICAgICAgdmFyIG5ld0lkID0gdGhpcy5ob29rcy5zaG9ydGlkLmdlbmVyYXRlKCk7CiAgICAgIHZhciB0cnVja1N0YXJ0QW1vdW50ID0gMDsKICAgICAgdmFyIHRydWNrVW5pdCA9ICdib3R0bGVzIG9mIHdpbmUnOwogICAgICB0cnVja0JvdHRsZXMgPSAwOwogICAgICB2YXIgdHJ1Y2tEYXRhID0KICAgICAgICAgIHsKICAgICAgICAgICAgImFwcERhdGEiOiB7CiAgICAgICAgICAgICAgIndvcmtmbG93RGF0YSI6IHt9LAogICAgICAgICAgICAgICJzcG90IjogdHJ1Y2tTcG90LAogICAgICAgICAgICAgICJ3aW5lQm90dGxlcyI6IHRydWNrQm90dGxlcywKICAgICAgICAgICAgICAid2luZVVuaXQiOiB3aW5lVW5pdCwKICAgICAgICAgICAgICAid29ya2Zsb3dOYW1lIjogc3Mud29ya2Zsb3cubmFtZSwKICAgICAgICAgICAgICAid29ya2Zsb3dJbnN0YW5jZUlkIjogbmV3SWQsCiAgICAgICAgICAgICAgIndvcmtmbG93Um9vdFBvcGNvZGUiOiAidHJ1ZSIsCiAgICAgICAgICAgICAgcG9wY29kZU5hbWU6IGRlc3ROYW1lLAogICAgICAgICAgICAgICJ3b3JrZmxvd0RlZiI6IHdvcmtmbG93CiAgICAgICAgICAgIH0KICAgICAgICAgIH07CiAgICAgIHZhciBuZXdQb3Bjb2RlID0gYXdhaXQgdGhpcy5nZW5lcmF0ZSgpOwogICAgICB2YXIgdHJ1Y2tBZGRyZXNzID0gbmV3UG9wY29kZS5wb3Bjb2RlLmFkZHJlc3M7CiAgICAgIAogICAgICB2YXIgcmVzID0gYXdhaXQgdGhpcy5zaWduQW5kTWludCh0cnVja0FkZHJlc3MsdHJ1Y2tEYXRhLHVzZXJQdWJsaWNLZXksdHJ1Y2tTdGFydEFtb3VudCx0cnVja1VuaXQsdXNlclByaXZhdGVLZXkpOwogICAgICAKICAgICAgdHJ1Y2tQb3Bjb2RlID0gYXdhaXQgdGhpcy5vbmVCeU5hbWUoZGVzdE5hbWUpOwogICAgfQogICAgZWxzZSB7CiAgICAgIHRoaXMuZGVidWdMb2coJ0ZvdW5kIGV4aXN0aW5nIHRydWNrIHBvcGNvZGU6ICcgKyBkZXN0TmFtZSk7CiAgICAgIHRydWNrQm90dGxlcyA9IHRydWNrUG9wY29kZS5hcHBEYXRhLndpbmVCb3R0bGVzOwogICAgfQogICAgCiAgICBpZihfLmlzTmlsKHRydWNrUG9wY29kZSkpIHsKICAgICAgdGhpcy5kZWJ1Z0xvZygnKioqKioqKioqKioqKioqKioqIEVycm9yIG1pbnRpbmcgdHJ1Y2sgcG9wY29kZScpOwogICAgICB0aGlzLmhvb2tzLmZpbmlzaC5yZXNvbHZlKHJ2YWwpOwogICAgICByZXR1cm4gOwogICAgfQogICAgCiAgICB0aGlzLmRlYnVnTG9nKCcjIyMjIyMjIyMjIyMjIyMjIHRydWNrIHBvcGNvZGU6Jyk7CiAgICB0aGlzLmRlYnVnTG9nKHRydWNrUG9wY29kZSk7CiAgICAKICAgIHZhciB3cmVzID0gYXdhaXQgdGhpcy5zaWduQW5kV2l0aGRyYXcoCiAgICAgIHNyY1BvcGNvZGUucHJpdmF0ZUtleSwKICAgICAgc3JjUG9wY29kZS5hZGRyZXNzLAogICAgICB0cnVja1BvcGNvZGUuYWRkcmVzcywKICAgICAgZGVzdEFtb3VudCwKICAgICAgZGF0YSwKICAgICAgc291cmNlT3V0cHV0CiAgICApOwogICAgCiAgICB0aGlzLmRlYnVnTG9nKCcjIyMjIyMjIyMjIyMjIyMjIHdpdGhkcmF3IHJlc3VsdDonKTsKICAgIHRoaXMuZGVidWdMb2cod3Jlcyk7CiAgICBydmFsLndyZXMgPSB3cmVzOwogICAgCiAgICB0aGlzLmRlYnVnTG9nKCcjIyMjIyMjIyMjIyMjIyMjIHVwZGF0ZSBzb3VyY2Ugd2luZSBib3R0bGUgY291bnQ6Jyk7CiAgICB2YXIgd2luZUNvdW50ID0gd2luZUJvdHRsZXMgLSBkZXN0QW1vdW50OwogICAgdmFyIHdpbmVEYXRhID0KICAgICAgICB7CiAgICAgICAgICAiYXBwRGF0YSI6IHsKICAgICAgICAgICAgIndpbmVCb3R0bGVzIjogd2luZUNvdW50CiAgICAgICAgICB9CiAgICAgICAgfTsKCiAgICB0aGlzLmRlYnVnTG9nKHdpbmVEYXRhKTsKICAgIHZhciBicmVzID0gYXdhaXQgdGhpcy5ibG9iQ3JlYXRlKAogICAgICBzcmNQb3Bjb2RlLmFkZHJlc3MsCiAgICAgIHdpbmVEYXRhLAogICAgICB1c2VyQ3JlZGVudGlhbHMucHVibGljS2V5LAogICAgICB1c2VyQ3JlZGVudGlhbHMucHJpdmF0ZUtleSk7CiAgICAgIAogICAgdGhpcy5kZWJ1Z0xvZygnIyMjIyMjIyMjIyMjIyMjIyBibG9iQ3JlYXRlIHJlc3VsdDonKTsKICAgIHRoaXMuZGVidWdMb2coYnJlcyk7CiAgICBydmFsLmJyZXMgPSBicmVzOwogICAgCiAgICB0aGlzLmRlYnVnTG9nKCcjIyMjIyMjIyMjIyMjIyMjIHVwZGF0ZSB0cnVjayB3aW5lIGJvdHRsZSBjb3VudDonKTsKICAgIHZhciB0cnVja0NvdW50ID0gdHJ1Y2tCb3R0bGVzICsgZGVzdEFtb3VudDsKICAgIHZhciB0cnVja1dpbmVEYXRhID0KICAgICAgICB7CiAgICAgICAgICAiYXBwRGF0YSI6IHsKICAgICAgICAgICAgIndpbmVCb3R0bGVzIjogdHJ1Y2tDb3VudAogICAgICAgICAgfQogICAgICAgIH07CgogICAgdGhpcy5kZWJ1Z0xvZyh0cnVja1dpbmVEYXRhKTsKICAgIHZhciBicmVzMiA9IGF3YWl0IHRoaXMuYmxvYkNyZWF0ZSgKICAgICAgdHJ1Y2tQb3Bjb2RlLmFkZHJlc3MsCiAgICAgIHRydWNrV2luZURhdGEsCiAgICAgIHVzZXJDcmVkZW50aWFscy5wdWJsaWNLZXksCiAgICAgIHVzZXJDcmVkZW50aWFscy5wcml2YXRlS2V5KTsKICAgICAgCiAgICB0aGlzLmRlYnVnTG9nKCcjIyMjIyMjIyMjIyMjIyMjIHRydWNrIGJsb2JDcmVhdGUgcmVzdWx0OicpOwogICAgdGhpcy5kZWJ1Z0xvZyhicmVzMik7CiAgICBydmFsLmJyZXMyID0gYnJlczI7CiAgICAKICAgIHRoaXMuaG9va3MuZmluaXNoLnJlc29sdmUocnZhbCk7CiAgIH0KCn07Cg=="]
            }
        },
        "address": "0879c87ec18a84cde314b9d92826fd910e56e647",
        "workflowRootPopcode": "true",
        "transaction": [
            {
            "id": "<4e7eb288b89d6f3536b3bd5ac649006eae97e0c3e2d172e80935571d30905b24>",
            "popcode": "<0879c87ec18a84cde314b9d92826fd910e56e647>",
            "spot": "trucker.pickup",
            "unit": "bottles of wine",
            "txId": "4e7eb288b89d6f3536b3bd5ac649006eae97e0c3e2d172e80935571d30905b24",
            "data": {
                "metadata": {
                    "appData": {
                        "workflowData": {
                            "mintWineBottles": {
                                "Amount": "1000",
                                "Unit": "bottles of wine"
                            }
                        },
                        "wineBottles": 1000,
                        "wineUnit": "bottles of wine",
                        "spot": "trucker.pickup",
                        "workflowName": "wineV1",
                        "workflowInstanceId": "F3SMYQ4TS",
                        "workflowRootPopcode": "true",
                        "popcodeName": "Wine_F3SMYQ4TS",
                        "workflowDef": {
                            "title": "Wine V1",
                            "name": "wineV1",
                            "startScreen": "Home",
                            "version": "2.0",
                            "steps": {
                                "winemaker.mint": {
                                    "step": "winemaker.mint",
                                    "title": "Winemaker Mint",
                                    "screen": "WinemakerMint"
                                },
                                "trucker.pickup": {
                                    "step": "trucker.pickup",
                                    "title": "Trucker Pickup",
                                    "screen": "TruckerPickup"
                                },
                                "trucker.show": {
                                    "step": "trucker.show",
                                    "title": "Trucker Show",
                                    "screen": "TruckerShow"
                                }
                            },
                            "appOptions": {"requireLogin": true},
                            "screens": {
                                "Home": {
                                    "name": "Home",
                                    "title": "Home",
                                    "api": "/api/mobile",
                                    "screenListItems": {
                                        "fetchItems": "/popcodeByWorkflowName",
                                        "method": "get",
                                        "api": "cayley",
                                        "fetchParameters": {"workflowName": "wineV1"},
                                        "itemDataTypes": {"popcode": "object"},
                                        "itemLabel": ["popcodeName"],
                                        "itemActions": {
                                            "click": {
                                                "title": "Click",
                                                "action": [{
                                                    "operation": "startWorkflow",
                                                    "replaceCurrent": true,
                                                    "parameters": {"spot": "@popcode.spot", "popcode": "@popcode"}
                                                }],
                                                "parameters": {"popcode": "@item"}
                                            }
                                        }
                                    },
                                    "screenButtons": {
                                        "scan": {
                                            "title": "Scan",
                                            "action": [{"operation": "navigate", "screen": "Scan"}],
                                            "roles": ["admin", "winemaker", "trucker"]
                                        },
                                        "mint": {
                                            "title": "Mint",
                                            "action": [{
                                                "operation": "navigate",
                                                "resetStack": true,
                                                "screen": "WinemakerMint"
                                            }],
                                            "roles": ["admin", "winemaker"]
                                        }
                                    }
                                },
                                "Scan": {
                                    "name": "Scan",
                                    "title": "Scan",
                                    "api": "/api/mobile",
                                    "parameters": {"user": "@user"},
                                    "modal": false,
                                    "screenScan": {},
                                    "startAction": [{
                                        "operation": "scanBarcode",
                                        "barcodeTypes": ["qr", "code128"],
                                        "outputs": {"scanData": "@scanData"}
                                    }, {
                                        "operation": "routePopcode",
                                        "parameters": {"scanData": "@scanData"},
                                        "outputs": {"address": "@address"}
                                    }, {
                                        "operation": "fetch",
                                        "route": "/p",
                                        "method": "get",
                                        "parameters": {"address": "@address"},
                                        "outputs": {"popcode": "@popcodes[0]"}
                                    }, {
                                        "operation": "startWorkflow",
                                        "replaceCurrent": true,
                                        "parameters": {"spot": "@popcode.spot", "popcode": "@popcode"}
                                    }]
                                },
                                "WinemakerMint": {
                                    "name": "WinemakerMint",
                                    "title": "Winemaker Mint",
                                    "api": "/api/mobile",
                                    "parameters": {"container": "@container", "popcode": "@popcode", "user": "@user"},
                                    "outputs": {"popcode": "@container"},
                                    "screenForm": {
                                        "fields": {
                                            "type": "object",
                                            "properties": {
                                                "mintWineBottles": {
                                                    "type": "object",
                                                    "properties": {
                                                        "Amount": {
                                                            "type": "string",
                                                            "value": "1000",
                                                            "options": {"editable": true}
                                                        },
                                                        "Unit": {
                                                            "type": "string",
                                                            "value": "bottles of wine",
                                                            "options": {"editable": true}
                                                        }
                                                    },
                                                    "required": ["Amount", "Unit"]
                                                }
                                            },
                                            "required": ["mintWineBottles"]
                                        }, "options": {"auto": "labels"}
                                    },
                                    "screenButtons": {
                                        "mint": {
                                            "title": "Mint",
                                            "action": [{
                                                "operation": "contract",
                                                "contract": "winemakerMintOk",
                                                "parameters": {"popcode": "@popcode"},
                                                "outputs": {"status": "@status", "txId": "@txId"}
                                            }, {
                                                "operation": "navigate",
                                                "resetStack": true,
                                                "forceUpdate": true,
                                                "screen": "Home"
                                            }],
                                            "roles": ["admin", "winemaker"]
                                        },
                                        "cancel": {
                                            "title": "Cancel",
                                            "action": [{"operation": "navigate", "resetStack": true, "screen": "Home"}]
                                        }
                                    }
                                },
                                "TruckerPickup": {
                                    "name": "TruckerPickup",
                                    "title": "Trucker Wine Pickup",
                                    "api": "/api/mobile",
                                    "parameters": {"container": "@container", "popcode": "@popcode", "user": "@user"},
                                    "outputs": {"popcode": "@container"},
                                    "tabs": {
                                        "tab1": {
                                            "title": "Pickup Wine",
                                            "screenForm": {
                                                "privateKey": ["winemaker", "admin"],
                                                "publicKey": ["winemaker", "trucker", "admin"],
                                                "fields": {
                                                    "type": "object",
                                                    "properties": {
                                                        "popcode": {
                                                            "type": "object",
                                                            "properties": {
                                                                "name": {
                                                                    "type": "string",
                                                                    "value": "@popcode.popcodeName",
                                                                    "options": {"editable": false}
                                                                },
                                                                "address": {
                                                                    "type": "string",
                                                                    "value": "@popcode.address",
                                                                    "options": {"editable": false}
                                                                },
                                                                "currentState": {
                                                                    "type": "string",
                                                                    "value": "@popcode.spot",
                                                                    "options": {"editable": false}
                                                                }
                                                            },
                                                            "required": ["name", "address", "currentState"]
                                                        },
                                                        "warehouseContents": {
                                                            "type": "object",
                                                            "properties": {
                                                                "Amount": {
                                                                    "type": "number",
                                                                    "value": "@popcode.appData.wineBottles",
                                                                    "options": {"editable": false}
                                                                },
                                                                "Unit": {
                                                                    "type": "string",
                                                                    "value": "@popcode.appData.wineUnit",
                                                                    "options": {"editable": false}
                                                                }
                                                            }
                                                        },
                                                        "withdraw": {
                                                            "type": "object",
                                                            "properties": {
                                                                "pickupAmount": {
                                                                    "type": "number",
                                                                    "options": {"editable": true}
                                                                }
                                                            },
                                                            "required": ["pickupAmount"]
                                                        }
                                                    },
                                                    "required": ["withdraw"]
                                                },
                                                "options": {"auto": "labels"}
                                            }
                                        }, "tab2": {"title": "Popcode Graph", "graphView": {"visName": "wine"}}
                                    },
                                    "screenButtons": {
                                        "pickup": {
                                            "title": "Pickup",
                                            "action": [{
                                                "operation": "contract",
                                                "contract": "truckerPickupOk",
                                                "parameters": {"popcode": "@popcode"},
                                                "outputs": {"status": "@status", "txId": "@txId"}
                                            }, {
                                                "operation": "navigate",
                                                "resetStack": true,
                                                "forceUpdate": true,
                                                "screen": "Home"
                                            }],
                                            "roles": ["admin", "trucker"]
                                        },
                                        "cancel": {
                                            "title": "Cancel",
                                            "action": [{"operation": "navigate", "resetStack": true, "screen": "Home"}]
                                        }
                                    }
                                },
                                "TruckerShow": {
                                    "name": "TruckerShow",
                                    "title": "Truck Popcode",
                                    "api": "/api/mobile",
                                    "parameters": {"container": "@container", "popcode": "@popcode", "user": "@user"},
                                    "outputs": {"popcode": "@container"},
                                    "tabs": {
                                        "tab1": {
                                            "title": "Truck Contents",
                                            "screenForm": {
                                                "privateKey": ["trucker", "admin"],
                                                "publicKey": ["winemaker", "trucker", "admin"],
                                                "fields": {
                                                    "type": "object",
                                                    "properties": {
                                                        "popcode": {
                                                            "type": "object",
                                                            "properties": {
                                                                "name": {
                                                                    "type": "string",
                                                                    "value": "@popcode.popcodeName",
                                                                    "options": {"editable": false}
                                                                },
                                                                "address": {
                                                                    "type": "string",
                                                                    "value": "@popcode.address",
                                                                    "options": {"editable": false}
                                                                },
                                                                "currentState": {
                                                                    "type": "string",
                                                                    "value": "@popcode.spot",
                                                                    "options": {"editable": false}
                                                                }
                                                            },
                                                            "required": ["name", "address", "currentState"]
                                                        },
                                                        "truckContents": {
                                                            "type": "object",
                                                            "properties": {
                                                                "Amount": {
                                                                    "type": "number",
                                                                    "value": "@popcode.appData.wineBottles",
                                                                    "options": {"editable": false}
                                                                },
                                                                "Unit": {
                                                                    "type": "string",
                                                                    "value": "@popcode.appData.wineUnit",
                                                                    "options": {"editable": false}
                                                                }
                                                            }
                                                        }
                                                    }
                                                },
                                                "options": {"auto": "labels"}
                                            }
                                        }, "tab2": {"title": "Popcode Graph", "graphView": {"visName": "wine"}}
                                    },
                                    "screenButtons": {
                                        "ok": {
                                            "title": "Ok",
                                            "action": [{"operation": "navigate", "resetStack": true, "screen": "Home"}]
                                        }
                                    }
                                }
                            },
                            "contractLib": {
                                "name": "Wine SmartContract Library",
                                "version": "1.0",
                                "slug": "wine_1_0",
                                "libs": ["base64_Y2xhc3MgU21hcnRDb250cmFjdEJhc2UgewogIGNvbnN0cnVjdG9yKGhvb2tzKSB7CiAgICAgIHRoaXMuaG9va3MgPSBob29rczsKICAgICAgdGhpcy5zdGF0ZSA9IGhvb2tzLnN0YXRlOwogICAgICB0aGlzLmRlYnVnTG9nID0gaG9va3MuZGVidWdMb2c7CiAgICAgIHRoaXMuZGVidWdMb2coJ2NvbnN0cnVjdCBTbWFydENvbnRyYWN0QmFzZScpOwogIH0KICBkZWJ1Z1NpemUobykgewogICAgdmFyIHMgPSBKU09OLnN0cmluZ2lmeShvKTsKICAgIHRoaXMuZGVidWdMb2coYHNpemU6ICR7cy5sZW5ndGgvMTAyNH0ga2ApOwogIH0KICBhc3luYyBieU5hbWUocE5hbWUpIHsKICAgIHZhciBhcGkgPSB0aGlzLmhvb2tzLnN0YWNrLmFwaTsKICAgIHZhciB1cmwgPSAnL3AvbmFtZS8nICsgcE5hbWU7CiAgICBjb25zdCByZXMgPSBhd2FpdCBhcGkuZ2V0KHVybCk7CiAgICByZXR1cm4gcmVzLmJvZHk7CiAgfQogIGFzeW5jIG9uZUJ5TmFtZShwTmFtZSkgewogICAgdmFyIF8gPSB0aGlzLmhvb2tzLl87CiAgICB2YXIgYXBpID0gdGhpcy5ob29rcy5zdGFjay5hcGk7CiAgICB2YXIgdXJsID0gJy9wL25hbWUvJyArIHBOYW1lOwogICAgY29uc3QgcmVzID0gYXdhaXQgYXBpLmdldCh1cmwpOwogICAgdmFyIHBvcGNvZGVzID0gIV8uaXNOaWwocmVzKQogICAgICYmICFfLmlzTmlsKHJlcy5ib2R5KQogICAgICYmICFfLmlzTmlsKHJlcy5ib2R5LnBvcGNvZGVzKSA/IHJlcy5ib2R5LnBvcGNvZGVzIDogbnVsbDsKICAgIHZhciBwb3Bjb2RlID0gXy5pc0FycmF5KHBvcGNvZGVzKSAmJiBwb3Bjb2Rlcy5sZW5ndGggPiAwCiAgICAgPyBwb3Bjb2Rlc1swXSA6IG51bGw7CiAgICByZXR1cm4gcG9wY29kZTsKICB9CiAgYXN5bmMgYmFsYW5jZShhZGRyZXNzKSB7CiAgICB2YXIgYXBpID0gdGhpcy5ob29rcy5zdGFjay5hcGk7CiAgICB2YXIgdXJsID0gJy9wL2JhbGFuY2UvJyArIGFkZHJlc3M7CiAgICBjb25zdCByZXMgPSBhd2FpdCBhcGkuZ2V0KHVybCk7CiAgICByZXR1cm4gcmVzLmJvZHk7CiAgfQogIGFzeW5jIGdlbmVyYXRlKCkgewogICAgdmFyIGFwaSA9IHRoaXMuaG9va3Muc3RhY2suYXBpOwogICAgdmFyIHVybCA9ICcvcC9nZW5lcmF0ZSc7CiAgICBjb25zdCByZXMgPSBhd2FpdCBhcGkuZ2V0KHVybCk7CiAgICByZXR1cm4gcmVzLmJvZHk7CiAgfQogIGFzeW5jIGNvbnRhaW5lclBvcGNvZGUoYWRkcmVzcykgewogICAgdmFyIGFwaSA9IHRoaXMuaG9va3Muc3RhY2suYXBpQ2F5bGV5OwogICAgdmFyIHVybCA9ICcvY29udGFpbmVyUG9wY29kZS8nICsgYWRkcmVzczsKICAgIGNvbnN0IHJlcyA9IGF3YWl0IGFwaS5nZXQodXJsKTsKICAgIHJldHVybiByZXMuYm9keTsKICB9CiAgYXN5bmMgYm9tUG9wY29kZXMoYWRkcmVzcykgewogICAgdmFyIGFwaSA9IHRoaXMuaG9va3Muc3RhY2suYXBpQ2F5bGV5OwogICAgdmFyIHVybCA9ICcvYm9tUG9wY29kZXMvJyArIGFkZHJlc3M7CiAgICBjb25zdCByZXMgPSBhd2FpdCBhcGkuZ2V0KHVybCk7CiAgICByZXR1cm4gcmVzLmJvZHk7CiAgfQogIGFzeW5jIHNpZ25NZXNzYWdlKGZpZWxkcyxwcml2YXRlS2V5KSB7CiAgICB2YXIgYXBpID0gdGhpcy5ob29rcy5zdGFjay5hcGk7CiAgICB2YXIgYm9keSA9IHsKICAgICAgZmllbGRzLAogICAgICBwcml2YXRlS2V5CiAgICB9OwogICAgdmFyIHVybCA9ICcvY3J5cHRvL3NpZ25NZXNzYWdlJzsKICAgIHRoaXMuZGVidWdMb2coJyoqKioqKioqKioqIHNpZ25NZXNzYWdlJyk7CiAgICB0aGlzLmRlYnVnTG9nKHtib2R5fSk7CiAgICBjb25zdCByZXMgPSBhd2FpdCBhcGkucG9zdCh1cmwsIHtib2R5fSk7CiAgICB0aGlzLmRlYnVnTG9nKHtib2R5OiByZXMuYm9keX0pOwogICAgcmV0dXJuIHJlcy5ib2R5OwogIH0KICBhc3luYyBibG9iQ3JlYXRlV2l0aFNpZyhzaWcsYWRkcmVzcyxkYXRhLHB1YmxpY0tleSkgewogICAgdmFyIGFwaSA9IHRoaXMuaG9va3Muc3RhY2suYXBpOwogICAgdmFyIGJvZHkgPSB7CiAgICAgIHNpZywKICAgICAgYWRkcmVzcywKICAgICAgcHVibGljS2V5LAogICAgICBkYXRhCiAgICB9OwogICAgdmFyIHVybCA9ICcvcC9ibG9iQ3JlYXRlV2l0aFNpZyc7CiAgICBjb25zdCByZXMgPSBhd2FpdCBhcGkucG9zdCh1cmwsIHtib2R5fSk7CiAgICByZXR1cm4gcmVzLmJvZHk7CiAgfQogIGFzeW5jIGJsb2JDcmVhdGUoYWRkcmVzcyxkYXRhLHB1YmxpY0tleSxwcml2YXRlS2V5KSB7CiAgICB2YXIgZmllbGRzID0gW107CgogICAgdmFyIHJlcyA9IGF3YWl0IHRoaXMuYmFsYW5jZShhZGRyZXNzKTsKICAgIGZpZWxkcy5wdXNoKHJlcy5iYWxhbmNlLkNvdW50ZXIpOwogICAgZmllbGRzLnB1c2goYWRkcmVzcyk7CiAgICBmaWVsZHMucHVzaChkYXRhKTsKCiAgICByZXMgPSBhd2FpdCB0aGlzLnNpZ25NZXNzYWdlKGZpZWxkcyxwcml2YXRlS2V5KTsKCiAgICByZXMgPSBhd2FpdCB0aGlzLmJsb2JDcmVhdGVXaXRoU2lnKHJlcy5zaWcsYWRkcmVzcyxkYXRhLHB1YmxpY0tleSk7CgogICAgcmV0dXJuIHJlczsKICB9CiAgYXN5bmMgbWludChzaWcsYWRkcmVzcyxkYXRhLHB1YmxpY0tleSxhbW91bnQsdW5pdCkgewogICAgdmFyIGFwaSA9IHRoaXMuaG9va3Muc3RhY2suYXBpOwogICAgdmFyIGJvZHkgPSB7CiAgICAgIHNpZywKICAgICAgYWRkcmVzcywKICAgICAgcHVibGljS2V5LAogICAgICBhbW91bnQsCiAgICAgIHVuaXQsCiAgICAgIGRhdGEKICAgIH07CiAgICB0aGlzLmRlYnVnTG9nKCcqKioqKioqKioqKiBkbyBtaW50Jyk7CiAgICB0aGlzLmRlYnVnTG9nKHtib2R5fSk7CiAgICB0aGlzLmRlYnVnTG9nKHthcGl9KTsKICAgIHRoaXMuZGVidWdTaXplKGJvZHkpOwogICAgdmFyIHVybCA9ICcvcC9taW50JzsKICAgIGNvbnN0IHJlcyA9IGF3YWl0IGFwaS5wb3N0KHVybCwge2JvZHl9KTsKICAgIHRoaXMuZGVidWdMb2coJyoqKioqKioqKioqIG1pbnQgcmVzdWx0Jyk7CiAgICB0aGlzLmRlYnVnTG9nKHJlcyk7CiAgICByZXR1cm4gcmVzOwogIH0KICBhc3luYyBzaWduQW5kTWludChhZGRyZXNzLGRhdGEscHVibGljS2V5LGFtb3VudCx1bml0LHByaXZhdGVLZXkpIHsKICAgIHRoaXMuZGVidWdMb2coJ3NpZ25BbmRNaW50Jyk7CiAgICB0aGlzLmRlYnVnTG9nKHthZGRyZXNzLGRhdGEscHVibGljS2V5LGFtb3VudCx1bml0LHByaXZhdGVLZXl9KTsKICAgIHZhciBmaWVsZHMgPSBbXTsKICAgIHZhciB7IGJhbGFuY2UgfSA9IGF3YWl0IHRoaXMuYmFsYW5jZShhZGRyZXNzKTsKICAgIC8vIHRoaXMuZGVidWdMb2coJyMjIyMjIyMjIyMjIyMjIyMgYmFsYW5jZS5Db3VudGVyOiAnICsgYmFsYW5jZS5Db3VudGVyKTsKICAgIGZpZWxkcy5wdXNoKGJhbGFuY2UuQ291bnRlcik7CiAgICBmaWVsZHMucHVzaChhZGRyZXNzKTsKICAgIGZpZWxkcy5wdXNoKGFtb3VudCk7CiAgICBmaWVsZHMucHVzaCh1bml0KTsKICAgIGZpZWxkcy5wdXNoKGRhdGEpOwoKICAgIHZhciB7IHNpZyB9ID0gYXdhaXQgdGhpcy5zaWduTWVzc2FnZShmaWVsZHMscHJpdmF0ZUtleSk7CgogICAgdmFyIHJlcyA9IGF3YWl0IHRoaXMubWludChzaWcsYWRkcmVzcyxkYXRhLHB1YmxpY0tleSxhbW91bnQsdW5pdCk7CgogICAgcmV0dXJuIHJlczsKICB9CiAgYXN5bmMgd2l0aGRyYXcoc2lnLHByaXZhdGVLZXksZGVzdEFkZHJlc3MsZGVzdEFtb3VudCxkYXRhLHNvdXJjZU91dHB1dCkgewogICAgdmFyIGFwaSA9IHRoaXMuaG9va3Muc3RhY2suYXBpOwogICAgdmFyIGJvZHkgPSB7CiAgICAgIHNpZywKICAgICAgcHJpdmF0ZUtleSwKICAgICAgZGVzdEFkZHJlc3MsCiAgICAgIGRlc3RBbW91bnQsCiAgICAgIGRhdGEsCiAgICAgIHNvdXJjZU91dHB1dAogICAgfTsKICAgIHRoaXMuZGVidWdMb2coJyoqKioqKioqKioqIHdpdGhkcmF3Jyk7CiAgICB0aGlzLmRlYnVnTG9nKHtib2R5fSk7CiAgICB2YXIgdXJsID0gJy9wL3dpdGhkcmF3JzsKICAgIGNvbnN0IHJlcyA9IGF3YWl0IGFwaS5wb3N0KHVybCwge2JvZHl9KTsKICAgIHJldHVybiByZXM7CiAgfQogIGFzeW5jIHNpZ25BbmRXaXRoZHJhdyhwcml2YXRlS2V5LHNvdXJjZUFkZHJlc3MsZGVzdEFkZHJlc3MsZGVzdEFtb3VudCxkYXRhLHNvdXJjZU91dHB1dCkgewogICAgdGhpcy5kZWJ1Z0xvZygnc2lnbkFuZFdpdGhkcmF3Jyk7CiAgICB0aGlzLmRlYnVnTG9nKHtwcml2YXRlS2V5LHNvdXJjZUFkZHJlc3MsZGVzdEFkZHJlc3MsZGVzdEFtb3VudCxkYXRhLHNvdXJjZU91dHB1dH0pOwogICAgdmFyIGZpZWxkcyA9IFtdOwogICAgdmFyIHsgYmFsYW5jZSB9ID0gYXdhaXQgdGhpcy5iYWxhbmNlKHNvdXJjZUFkZHJlc3MpOwogICAgLy8gdGhpcy5kZWJ1Z0xvZygnIyMjIyMjIyMjIyMjIyMjIyBiYWxhbmNlLkNvdW50ZXI6ICcgKyBiYWxhbmNlLkNvdW50ZXIpOwogICAgZmllbGRzLnB1c2goYmFsYW5jZS5Db3VudGVyKTsKICAgIGZpZWxkcy5wdXNoKGRlc3RBZGRyZXNzKTsKICAgIGZpZWxkcy5wdXNoKGRhdGEpOwogICAgZmllbGRzLnB1c2goc291cmNlT3V0cHV0KTsKICAgIGZpZWxkcy5wdXNoKGRlc3RBbW91bnQpOwoKICAgIHZhciB7IHNpZyB9ID0gYXdhaXQgdGhpcy5zaWduTWVzc2FnZShmaWVsZHMscHJpdmF0ZUtleSk7CgogICAgdmFyIHJlcyA9IGF3YWl0IHRoaXMud2l0aGRyYXcoc2lnLHByaXZhdGVLZXksZGVzdEFkZHJlc3MsZGVzdEFtb3VudCxkYXRhLHNvdXJjZU91dHB1dCk7CgogICAgcmV0dXJuIHJlczsKICB9CiAgYXN5bmMgYm9tVXBkYXRlV2l0aFNpZyhzaWcsYWRkcmVzcyxwdWJsaWNLZXksYm9tT3AsYm9tQWRkcmVzcykgewogICAgdmFyIGFwaSA9IHRoaXMuaG9va3Muc3RhY2suYXBpOwogICAgdmFyIGJvZHkgPSB7CiAgICAgIHNpZywKICAgICAgYWRkcmVzcywKICAgICAgcHVibGljS2V5LAogICAgICBib21PcCwKICAgICAgYm9tQWRkcmVzcwogICAgfTsKICAgIHRoaXMuZGVidWdMb2coJyoqKioqKioqKioqIGRvIGJvbVVwZGF0ZScpOwogICAgdGhpcy5kZWJ1Z0xvZyh7Ym9keX0pOwogICAgdGhpcy5kZWJ1Z0xvZyh7YXBpfSk7CiAgICB0aGlzLmRlYnVnU2l6ZShib2R5KTsKICAgIHZhciB1cmwgPSAnL3AvYm9tVXBkYXRlV2l0aFNpZyc7CiAgICBjb25zdCByZXMgPSBhd2FpdCBhcGkucG9zdCh1cmwsIHtib2R5fSk7CiAgICB0aGlzLmRlYnVnTG9nKCcqKioqKioqKioqKiBib21VcGRhdGUgcmVzdWx0Jyk7CiAgICB0aGlzLmRlYnVnTG9nKHJlcyk7CiAgICByZXR1cm4gcmVzOwogIH0KICBhc3luYyBzaWduQW5kVXBkYXRlQm9tKGFkZHJlc3MscHVibGljS2V5LGJvbU9wLGJvbUFkZHJlc3MscHJpdmF0ZUtleSkgewogICAgdGhpcy5kZWJ1Z0xvZygnc2lnbkFuZFVwZGF0ZUJvbScpOwogICAgdGhpcy5kZWJ1Z0xvZyh7YWRkcmVzcyxwdWJsaWNLZXksYm9tT3AsYm9tQWRkcmVzcyxwcml2YXRlS2V5fSk7CiAgICB2YXIgZmllbGRzID0gW107CiAgICB2YXIgeyBiYWxhbmNlIH0gPSBhd2FpdCB0aGlzLmJhbGFuY2UoYWRkcmVzcyk7CiAgICAvLyB0aGlzLmRlYnVnTG9nKCcjIyMjIyMjIyMjIyMjIyMjIGJhbGFuY2UuQ291bnRlcjogJyArIGJhbGFuY2UuQ291bnRlcik7CiAgICBmaWVsZHMucHVzaChiYWxhbmNlLkNvdW50ZXIpOwogICAgZmllbGRzLnB1c2goYWRkcmVzcyk7CiAgICBmaWVsZHMucHVzaChib21PcCk7CiAgICBmaWVsZHMucHVzaChib21BZGRyZXNzKTsKCiAgICB2YXIgeyBzaWcgfSA9IGF3YWl0IHRoaXMuc2lnbk1lc3NhZ2UoZmllbGRzLHByaXZhdGVLZXkpOwoKICAgIHZhciByZXMgPSBhd2FpdCB0aGlzLmJvbVVwZGF0ZVdpdGhTaWcoc2lnLGFkZHJlc3MscHVibGljS2V5LGJvbU9wLGJvbUFkZHJlc3MpOwoKICAgIHJldHVybiByZXM7CiAgfQp9Owo=", "base64_Y2xhc3MgU21hcnRDb250cmFjdCBleHRlbmRzIFNtYXJ0Q29udHJhY3RCYXNlIHsKICBjb25zdHJ1Y3Rvcihob29rcykgewogICAgICBzdXBlcihob29rcykKICAgICAgdGhpcy5kZWJ1Z0xvZygnKioqKioqKioqKioqKiogU21hcnRDb250cmFjdCcpOwogIH0KCiAgYXN5bmMgZWNobygpIHsKICAgICAgdGhpcy5kZWJ1Z0xvZygnZWNobycpOwogICAgICB2YXIgcnZhbCA9IHsKICAgICAgICAgIGRhdGE6ICdoZWxsbycKICAgICAgfTsKICAgICAgdGhpcy5ob29rcy5maW5pc2gucmVzb2x2ZShydmFsKTsKICB9CgogIGFzeW5jIHdpbmVtYWtlck1pbnRPaygpIHsgCiAgICB0aGlzLmRlYnVnTG9nKCdleGVjdXRlIHdpbmVtYWtlck1pbnRPaycpOwogICAgICB2YXIgXyA9IHRoaXMuaG9va3MuXzsKICAgICAgdmFyIHNzID0gdGhpcy5ob29rcy5zY3JlZW5TdGF0ZTsKICAgICAgdmFyIGFwcCA9IHRoaXMuaG9va3MuYXBwOwogICAgICB2YXIgdXNlckNyZWRlbnRpYWxzID0gYXBwLmdldEFwcFN0YXRlKCd1c2VyQ3JlZGVudGlhbHMnKTsKICAgICAgdmFyIHB1YmxpY0tleSA9IHVzZXJDcmVkZW50aWFscy5wdWJsaWNLZXk7CiAgICAgIHZhciBwcml2YXRlS2V5ID0gdXNlckNyZWRlbnRpYWxzLnByaXZhdGVLZXk7CiAgICAgIHZhciB3b3JrZmxvdyA9IHNzLndvcmtmbG93OwogICAgICB2YXIgbmV3SWQgPSB0aGlzLmhvb2tzLnNob3J0aWQuZ2VuZXJhdGUoKTsKICAgICAgdmFyIHBvcGNvZGVOYW1lID0gJ1dpbmVfJyArIG5ld0lkOwogICAgICB2YXIgeyBmb3JtIH0gPSB0aGlzLnN0YXRlOwogICAgICB0aGlzLmRlYnVnTG9nKGZvcm0pOwogICAgICB2YXIgeyBwb3Bjb2RlIH0gPSBhd2FpdCB0aGlzLmdlbmVyYXRlKCk7CiAgICAgIHZhciB7IGFkZHJlc3MgfSA9IHBvcGNvZGU7CiAgICAgIHZhciBuZXh0U3BvdCA9ICd0cnVja2VyLnBpY2t1cCc7CiAgICAgIHZhciBhbW91bnQgPSB0aGlzLnRvSW50ZWdlcihmb3JtLm1pbnRXaW5lQm90dGxlcy5BbW91bnQpOwogICAgICB2YXIgdW5pdCA9IGZvcm0ubWludFdpbmVCb3R0bGVzLlVuaXQ7CiAgICAgIHRoaXMuZGVidWdMb2coJyMjIyMjIyMjIyMjIyMlJSUlJSUlJSUlJSUlJCQkJCQkJCQkJCQkJCQgIGdlbmVyYXRlZCB3aW5lbWFrZXIgcG9wY29kZTonKTsKICAgICAgdGhpcy5kZWJ1Z0xvZyh7cG9wY29kZU5hbWUscG9wY29kZX0pOwogICAgICAKICAgICAgdmFyIGRhdGEgPQogICAgICAgICAgewogICAgICAgICAgICAiYXBwRGF0YSI6IHsKICAgICAgICAgICAgICAid29ya2Zsb3dEYXRhIjogZm9ybSwKICAgICAgICAgICAgICAid2luZUJvdHRsZXMiOiBhbW91bnQsCiAgICAgICAgICAgICAgIndpbmVVbml0IjogdW5pdCwKICAgICAgICAgICAgICAic3BvdCI6IG5leHRTcG90LAogICAgICAgICAgICAgICJ3b3JrZmxvd05hbWUiOiBzcy53b3JrZmxvdy5uYW1lLAogICAgICAgICAgICAgICJ3b3JrZmxvd0luc3RhbmNlSWQiOiBuZXdJZCwKICAgICAgICAgICAgICAid29ya2Zsb3dSb290UG9wY29kZSI6ICJ0cnVlIiwKICAgICAgICAgICAgICBwb3Bjb2RlTmFtZSAsCiAgICAgICAgICAgICAgIndvcmtmbG93RGVmIjogd29ya2Zsb3cKICAgICAgICAgICAgfQogICAgICAgICAgfTsKCiAgICAgIHRoaXMuZGVidWdMb2coZGF0YSk7CgogICAgICB2YXIgcmVzID0gYXdhaXQgdGhpcy5zaWduQW5kTWludChhZGRyZXNzLGRhdGEscHVibGljS2V5LGFtb3VudCx1bml0LHByaXZhdGVLZXkpOwogICAgICAvLyB0aGlzLmRlYnVnTG9nKCd0aGlzLnNpZ25BbmRNaW50IHJlcy5ib2R5LmtleXM6ICcgKyBPYmplY3Qua2V5cyhyZXMuYm9keSkpOwoKICAgICAgdmFyIHJ2YWwgPSB7CiAgICAgICAgICBhY3Rpb246IFtdCiAgICAgIH07CiAgICAgIHRoaXMuaG9va3MuZmluaXNoLnJlc29sdmUocnZhbCk7CiAgICAgIHJldHVybiBhZGRyZXNzOwogICAgCiAgfQogIHRvSW50ZWdlcih2YWx1ZSkgewogICAgdmFyIF8gPSB0aGlzLmhvb2tzLl87CiAgICBpZihfLmlzU3RyaW5nKHZhbHVlKSkKICAgICAgcmV0dXJuIHBhcnNlSW50KHZhbHVlKTsKICAgIGVsc2UKICAgICAgcmV0dXJuIHZhbHVlOwogIH0KICBhc3luYyB0cnVja2VyUGlja3VwT2soKSB7IAogICAgdGhpcy5kZWJ1Z0xvZygnZXhlY3V0ZSB0cnVja2VyUGlja3VwT2snKTsKICAgIHZhciBmb3JtID0gdGhpcy5zdGF0ZS5mb3JtOwogICAgdGhpcy5kZWJ1Z0xvZyh7Zm9ybX0pOwogICAgCiAgICB2YXIgcnZhbCA9IHsKICAgICAgICBhY3Rpb246IFtdCiAgICB9OwoKICAgIHZhciBfID0gdGhpcy5ob29rcy5fOwogICAgdmFyIHNzID0gdGhpcy5ob29rcy5zY3JlZW5TdGF0ZTsKICAgIHZhciBhcHAgPSB0aGlzLmhvb2tzLmFwcDsKICAgIHZhciB3b3JrZmxvdyA9IHNzLndvcmtmbG93OwogICAgCiAgICB2YXIgdXNlckNyZWRlbnRpYWxzID0gYXBwLmdldEFwcFN0YXRlKCd1c2VyQ3JlZGVudGlhbHMnKTsKICAgIHZhciB1c2VyUHVibGljS2V5ID0gdXNlckNyZWRlbnRpYWxzLnB1YmxpY0tleTsKICAgIHZhciB1c2VyUHJpdmF0ZUtleSA9IHVzZXJDcmVkZW50aWFscy5wcml2YXRlS2V5OwogICAgCiAgICB2YXIgc3JjUG9wY29kZSA9IHRoaXMuc3RhdGUucG9wY29kZTsKICAgIAoKICAgIHZhciBkZXN0QW1vdW50ID0gdGhpcy50b0ludGVnZXIodGhpcy5zdGF0ZS5mb3JtLndpdGhkcmF3LnBpY2t1cEFtb3VudCk7CiAgICB2YXIgZGVzdE5hbWUgPSAiVHJ1Y2tfIiArIHVzZXJDcmVkZW50aWFscy5zZXNzaW9uSWQ7CiAgICAKICAgIHZhciBkYXRhID0geyBkZXNjcmlwdGlvbjogYHdpdGhkcmF3ICR7ZGVzdEFtb3VudH0gYm90dGxlcyBvZiB3aW5lYCB9OwogICAgdmFyIHNvdXJjZU91dHB1dCA9IDA7CiAgICAKICAgIHRoaXMuZGVidWdMb2coJ2dldCB0cnVjayBwb3Bjb2RlOiAnICsgZGVzdE5hbWUpOwogICAgdmFyIHRydWNrUG9wY29kZSA9IGF3YWl0IHRoaXMub25lQnlOYW1lKGRlc3ROYW1lKTsKICAgIHRoaXMuZGVidWdMb2codHJ1Y2tQb3Bjb2RlKTsKICAgICAKICAgIHRoaXMuZGVidWdMb2coJ2NoZWNrIHNvdXJjZSB3aW5lIGJvdHRsZSBjb3VudCcpOwogICAgdmFyIHdpbmVCb3R0bGVzID0gdGhpcy50b0ludGVnZXIoc3JjUG9wY29kZS5hcHBEYXRhLndpbmVCb3R0bGVzKTsKICAgIHZhciB3aW5lVW5pdCA9IHNyY1BvcGNvZGUuYXBwRGF0YS53aW5lVW5pdDsKICAgIHRoaXMuZGVidWdMb2coe3NyY1BvcGNvZGV9KTsKICAgIHRoaXMuZGVidWdMb2coe3dpbmVCb3R0bGVzLGRlc3RBbW91bnQsd2luZVVuaXR9KTsKICAgIAogICAgaWYoXy5pc05pbChkZXN0QW1vdW50KSB8fCBfLmlzTmFOKGRlc3RBbW91bnQpKSB7CiAgICAgIHRoaXMuZGVidWdMb2coJyoqKioqKioqKioqKioqKioqKiBlcnJvciBiYWQgZGVzdEFtb3VudCknKTsKICAgICAgdGhpcy5ob29rcy5maW5pc2gucmVzb2x2ZShydmFsKTsKICAgICAgcmV0dXJuIDsKICAgIH0KICAgIAogICAgaWYoXy5pc05pbCh3aW5lQm90dGxlcykgfHwgXy5pc05hTihkZXN0QW1vdW50KSkgewogICAgICB0aGlzLmRlYnVnTG9nKCcqKioqKioqKioqKioqKioqKiogZXJyb3IgYmFkIHdpbmVCb3R0bGVzJyk7CiAgICAgIHRoaXMuaG9va3MuZmluaXNoLnJlc29sdmUocnZhbCk7CiAgICAgIHJldHVybiA7CiAgICB9CiAgICAKICAgIGlmKGRlc3RBbW91bnQgPiB3aW5lQm90dGxlcykgewogICAgICB0aGlzLmRlYnVnTG9nKCcqKioqKioqKioqKioqKioqKiogZXJyb3IgZGVzdEFtb3VudCA+IHdpbmVCb3R0bGVzJyk7CiAgICAgIHRoaXMuaG9va3MuZmluaXNoLnJlc29sdmUocnZhbCk7CiAgICAgIHJldHVybiA7CiAgICB9CiAgICAgCiAgICB2YXIgdHJ1Y2tCb3R0bGVzOwogICAgaWYgKF8uaXNOaWwodHJ1Y2tQb3Bjb2RlKSkgewogICAgICB0aGlzLmRlYnVnTG9nKCdNaW50aW5nIHRydWNrIHBvcGNvZGU6ICcgKyBkZXN0TmFtZSk7CiAgICAgIHZhciB0cnVja1Nwb3QgPSAndHJ1Y2tlci5zaG93JzsKICAgICAgdmFyIG5ld0lkID0gdGhpcy5ob29rcy5zaG9ydGlkLmdlbmVyYXRlKCk7CiAgICAgIHZhciB0cnVja1N0YXJ0QW1vdW50ID0gMDsKICAgICAgdmFyIHRydWNrVW5pdCA9ICdib3R0bGVzIG9mIHdpbmUnOwogICAgICB0cnVja0JvdHRsZXMgPSAwOwogICAgICB2YXIgdHJ1Y2tEYXRhID0KICAgICAgICAgIHsKICAgICAgICAgICAgImFwcERhdGEiOiB7CiAgICAgICAgICAgICAgIndvcmtmbG93RGF0YSI6IHt9LAogICAgICAgICAgICAgICJzcG90IjogdHJ1Y2tTcG90LAogICAgICAgICAgICAgICJ3aW5lQm90dGxlcyI6IHRydWNrQm90dGxlcywKICAgICAgICAgICAgICAid2luZVVuaXQiOiB3aW5lVW5pdCwKICAgICAgICAgICAgICAid29ya2Zsb3dOYW1lIjogc3Mud29ya2Zsb3cubmFtZSwKICAgICAgICAgICAgICAid29ya2Zsb3dJbnN0YW5jZUlkIjogbmV3SWQsCiAgICAgICAgICAgICAgIndvcmtmbG93Um9vdFBvcGNvZGUiOiAidHJ1ZSIsCiAgICAgICAgICAgICAgcG9wY29kZU5hbWU6IGRlc3ROYW1lLAogICAgICAgICAgICAgICJ3b3JrZmxvd0RlZiI6IHdvcmtmbG93CiAgICAgICAgICAgIH0KICAgICAgICAgIH07CiAgICAgIHZhciBuZXdQb3Bjb2RlID0gYXdhaXQgdGhpcy5nZW5lcmF0ZSgpOwogICAgICB2YXIgdHJ1Y2tBZGRyZXNzID0gbmV3UG9wY29kZS5wb3Bjb2RlLmFkZHJlc3M7CiAgICAgIAogICAgICB2YXIgcmVzID0gYXdhaXQgdGhpcy5zaWduQW5kTWludCh0cnVja0FkZHJlc3MsdHJ1Y2tEYXRhLHVzZXJQdWJsaWNLZXksdHJ1Y2tTdGFydEFtb3VudCx0cnVja1VuaXQsdXNlclByaXZhdGVLZXkpOwogICAgICAKICAgICAgdHJ1Y2tQb3Bjb2RlID0gYXdhaXQgdGhpcy5vbmVCeU5hbWUoZGVzdE5hbWUpOwogICAgfQogICAgZWxzZSB7CiAgICAgIHRoaXMuZGVidWdMb2coJ0ZvdW5kIGV4aXN0aW5nIHRydWNrIHBvcGNvZGU6ICcgKyBkZXN0TmFtZSk7CiAgICAgIHRydWNrQm90dGxlcyA9IHRydWNrUG9wY29kZS5hcHBEYXRhLndpbmVCb3R0bGVzOwogICAgfQogICAgCiAgICBpZihfLmlzTmlsKHRydWNrUG9wY29kZSkpIHsKICAgICAgdGhpcy5kZWJ1Z0xvZygnKioqKioqKioqKioqKioqKioqIEVycm9yIG1pbnRpbmcgdHJ1Y2sgcG9wY29kZScpOwogICAgICB0aGlzLmhvb2tzLmZpbmlzaC5yZXNvbHZlKHJ2YWwpOwogICAgICByZXR1cm4gOwogICAgfQogICAgCiAgICB0aGlzLmRlYnVnTG9nKCcjIyMjIyMjIyMjIyMjIyMjIHRydWNrIHBvcGNvZGU6Jyk7CiAgICB0aGlzLmRlYnVnTG9nKHRydWNrUG9wY29kZSk7CiAgICAKICAgIHZhciB3cmVzID0gYXdhaXQgdGhpcy5zaWduQW5kV2l0aGRyYXcoCiAgICAgIHNyY1BvcGNvZGUucHJpdmF0ZUtleSwKICAgICAgc3JjUG9wY29kZS5hZGRyZXNzLAogICAgICB0cnVja1BvcGNvZGUuYWRkcmVzcywKICAgICAgZGVzdEFtb3VudCwKICAgICAgZGF0YSwKICAgICAgc291cmNlT3V0cHV0CiAgICApOwogICAgCiAgICB0aGlzLmRlYnVnTG9nKCcjIyMjIyMjIyMjIyMjIyMjIHdpdGhkcmF3IHJlc3VsdDonKTsKICAgIHRoaXMuZGVidWdMb2cod3Jlcyk7CiAgICBydmFsLndyZXMgPSB3cmVzOwogICAgCiAgICB0aGlzLmRlYnVnTG9nKCcjIyMjIyMjIyMjIyMjIyMjIHVwZGF0ZSBzb3VyY2Ugd2luZSBib3R0bGUgY291bnQ6Jyk7CiAgICB2YXIgd2luZUNvdW50ID0gd2luZUJvdHRsZXMgLSBkZXN0QW1vdW50OwogICAgdmFyIHdpbmVEYXRhID0KICAgICAgICB7CiAgICAgICAgICAiYXBwRGF0YSI6IHsKICAgICAgICAgICAgIndpbmVCb3R0bGVzIjogd2luZUNvdW50CiAgICAgICAgICB9CiAgICAgICAgfTsKCiAgICB0aGlzLmRlYnVnTG9nKHdpbmVEYXRhKTsKICAgIHZhciBicmVzID0gYXdhaXQgdGhpcy5ibG9iQ3JlYXRlKAogICAgICBzcmNQb3Bjb2RlLmFkZHJlc3MsCiAgICAgIHdpbmVEYXRhLAogICAgICB1c2VyQ3JlZGVudGlhbHMucHVibGljS2V5LAogICAgICB1c2VyQ3JlZGVudGlhbHMucHJpdmF0ZUtleSk7CiAgICAgIAogICAgdGhpcy5kZWJ1Z0xvZygnIyMjIyMjIyMjIyMjIyMjIyBibG9iQ3JlYXRlIHJlc3VsdDonKTsKICAgIHRoaXMuZGVidWdMb2coYnJlcyk7CiAgICBydmFsLmJyZXMgPSBicmVzOwogICAgCiAgICB0aGlzLmRlYnVnTG9nKCcjIyMjIyMjIyMjIyMjIyMjIHVwZGF0ZSB0cnVjayB3aW5lIGJvdHRsZSBjb3VudDonKTsKICAgIHZhciB0cnVja0NvdW50ID0gdHJ1Y2tCb3R0bGVzICsgZGVzdEFtb3VudDsKICAgIHZhciB0cnVja1dpbmVEYXRhID0KICAgICAgICB7CiAgICAgICAgICAiYXBwRGF0YSI6IHsKICAgICAgICAgICAgIndpbmVCb3R0bGVzIjogdHJ1Y2tDb3VudAogICAgICAgICAgfQogICAgICAgIH07CgogICAgdGhpcy5kZWJ1Z0xvZyh0cnVja1dpbmVEYXRhKTsKICAgIHZhciBicmVzMiA9IGF3YWl0IHRoaXMuYmxvYkNyZWF0ZSgKICAgICAgdHJ1Y2tQb3Bjb2RlLmFkZHJlc3MsCiAgICAgIHRydWNrV2luZURhdGEsCiAgICAgIHVzZXJDcmVkZW50aWFscy5wdWJsaWNLZXksCiAgICAgIHVzZXJDcmVkZW50aWFscy5wcml2YXRlS2V5KTsKICAgICAgCiAgICB0aGlzLmRlYnVnTG9nKCcjIyMjIyMjIyMjIyMjIyMjIHRydWNrIGJsb2JDcmVhdGUgcmVzdWx0OicpOwogICAgdGhpcy5kZWJ1Z0xvZyhicmVzMik7CiAgICBydmFsLmJyZXMyID0gYnJlczI7CiAgICAKICAgIHRoaXMuaG9va3MuZmluaXNoLnJlc29sdmUocnZhbCk7CiAgIH0KCn07Cg=="]
                            }
                        }
                    }
                }
            },
            "type": "transaction",
            "sourceCounter": "z1QmCwHXEE42e+hY6t+J54FhFZ+3AUaRlv0TuONKloQ=",
            "amount": "1000",
            "workflowDef": {
                "title": "Wine V1",
                "name": "wineV1",
                "startScreen": "Home",
                "version": "2.0",
                "steps": {
                    "winemaker.mint": {
                        "step": "winemaker.mint",
                        "title": "Winemaker Mint",
                        "screen": "WinemakerMint"
                    },
                    "trucker.pickup": {"step": "trucker.pickup", "title": "Trucker Pickup", "screen": "TruckerPickup"},
                    "trucker.show": {"step": "trucker.show", "title": "Trucker Show", "screen": "TruckerShow"}
                },
                "appOptions": {"requireLogin": true},
                "screens": {
                    "Home": {
                        "name": "Home",
                        "title": "Home",
                        "api": "/api/mobile",
                        "screenListItems": {
                            "fetchItems": "/popcodeByWorkflowName",
                            "method": "get",
                            "api": "cayley",
                            "fetchParameters": {"workflowName": "wineV1"},
                            "itemDataTypes": {"popcode": "object"},
                            "itemLabel": ["popcodeName"],
                            "itemActions": {
                                "click": {
                                    "title": "Click",
                                    "action": [{
                                        "operation": "startWorkflow",
                                        "replaceCurrent": true,
                                        "parameters": {"spot": "@popcode.spot", "popcode": "@popcode"}
                                    }],
                                    "parameters": {"popcode": "@item"}
                                }
                            }
                        },
                        "screenButtons": {
                            "scan": {
                                "title": "Scan",
                                "action": [{"operation": "navigate", "screen": "Scan"}],
                                "roles": ["admin", "winemaker", "trucker"]
                            },
                            "mint": {
                                "title": "Mint",
                                "action": [{"operation": "navigate", "resetStack": true, "screen": "WinemakerMint"}],
                                "roles": ["admin", "winemaker"]
                            }
                        }
                    },
                    "Scan": {
                        "name": "Scan",
                        "title": "Scan",
                        "api": "/api/mobile",
                        "parameters": {"user": "@user"},
                        "modal": false,
                        "screenScan": {},
                        "startAction": [{
                            "operation": "scanBarcode",
                            "barcodeTypes": ["qr", "code128"],
                            "outputs": {"scanData": "@scanData"}
                        }, {
                            "operation": "routePopcode",
                            "parameters": {"scanData": "@scanData"},
                            "outputs": {"address": "@address"}
                        }, {
                            "operation": "fetch",
                            "route": "/p",
                            "method": "get",
                            "parameters": {"address": "@address"},
                            "outputs": {"popcode": "@popcodes[0]"}
                        }, {
                            "operation": "startWorkflow",
                            "replaceCurrent": true,
                            "parameters": {"spot": "@popcode.spot", "popcode": "@popcode"}
                        }]
                    },
                    "WinemakerMint": {
                        "name": "WinemakerMint",
                        "title": "Winemaker Mint",
                        "api": "/api/mobile",
                        "parameters": {"container": "@container", "popcode": "@popcode", "user": "@user"},
                        "outputs": {"popcode": "@container"},
                        "screenForm": {
                            "fields": {
                                "type": "object",
                                "properties": {
                                    "mintWineBottles": {
                                        "type": "object",
                                        "properties": {
                                            "Amount": {
                                                "type": "string",
                                                "value": "1000",
                                                "options": {"editable": true}
                                            },
                                            "Unit": {
                                                "type": "string",
                                                "value": "bottles of wine",
                                                "options": {"editable": true}
                                            }
                                        },
                                        "required": ["Amount", "Unit"]
                                    }
                                },
                                "required": ["mintWineBottles"]
                            }, "options": {"auto": "labels"}
                        },
                        "screenButtons": {
                            "mint": {
                                "title": "Mint",
                                "action": [{
                                    "operation": "contract",
                                    "contract": "winemakerMintOk",
                                    "parameters": {"popcode": "@popcode"},
                                    "outputs": {"status": "@status", "txId": "@txId"}
                                }, {
                                    "operation": "navigate",
                                    "resetStack": true,
                                    "forceUpdate": true,
                                    "screen": "Home"
                                }],
                                "roles": ["admin", "winemaker"]
                            },
                            "cancel": {
                                "title": "Cancel",
                                "action": [{"operation": "navigate", "resetStack": true, "screen": "Home"}]
                            }
                        }
                    },
                    "TruckerPickup": {
                        "name": "TruckerPickup",
                        "title": "Trucker Wine Pickup",
                        "api": "/api/mobile",
                        "parameters": {"container": "@container", "popcode": "@popcode", "user": "@user"},
                        "outputs": {"popcode": "@container"},
                        "tabs": {
                            "tab1": {
                                "title": "Pickup Wine",
                                "screenForm": {
                                    "privateKey": ["winemaker", "admin"],
                                    "publicKey": ["winemaker", "trucker", "admin"],
                                    "fields": {
                                        "type": "object",
                                        "properties": {
                                            "popcode": {
                                                "type": "object",
                                                "properties": {
                                                    "name": {
                                                        "type": "string",
                                                        "value": "@popcode.popcodeName",
                                                        "options": {"editable": false}
                                                    },
                                                    "address": {
                                                        "type": "string",
                                                        "value": "@popcode.address",
                                                        "options": {"editable": false}
                                                    },
                                                    "currentState": {
                                                        "type": "string",
                                                        "value": "@popcode.spot",
                                                        "options": {"editable": false}
                                                    }
                                                },
                                                "required": ["name", "address", "currentState"]
                                            },
                                            "warehouseContents": {
                                                "type": "object",
                                                "properties": {
                                                    "Amount": {
                                                        "type": "number",
                                                        "value": "@popcode.appData.wineBottles",
                                                        "options": {"editable": false}
                                                    },
                                                    "Unit": {
                                                        "type": "string",
                                                        "value": "@popcode.appData.wineUnit",
                                                        "options": {"editable": false}
                                                    }
                                                }
                                            },
                                            "withdraw": {
                                                "type": "object",
                                                "properties": {
                                                    "pickupAmount": {
                                                        "type": "number",
                                                        "options": {"editable": true}
                                                    }
                                                },
                                                "required": ["pickupAmount"]
                                            }
                                        },
                                        "required": ["withdraw"]
                                    },
                                    "options": {"auto": "labels"}
                                }
                            }, "tab2": {"title": "Popcode Graph", "graphView": {"visName": "wine"}}
                        },
                        "screenButtons": {
                            "pickup": {
                                "title": "Pickup",
                                "action": [{
                                    "operation": "contract",
                                    "contract": "truckerPickupOk",
                                    "parameters": {"popcode": "@popcode"},
                                    "outputs": {"status": "@status", "txId": "@txId"}
                                }, {
                                    "operation": "navigate",
                                    "resetStack": true,
                                    "forceUpdate": true,
                                    "screen": "Home"
                                }],
                                "roles": ["admin", "trucker"]
                            },
                            "cancel": {
                                "title": "Cancel",
                                "action": [{"operation": "navigate", "resetStack": true, "screen": "Home"}]
                            }
                        }
                    },
                    "TruckerShow": {
                        "name": "TruckerShow",
                        "title": "Truck Popcode",
                        "api": "/api/mobile",
                        "parameters": {"container": "@container", "popcode": "@popcode", "user": "@user"},
                        "outputs": {"popcode": "@container"},
                        "tabs": {
                            "tab1": {
                                "title": "Truck Contents",
                                "screenForm": {
                                    "privateKey": ["trucker", "admin"],
                                    "publicKey": ["winemaker", "trucker", "admin"],
                                    "fields": {
                                        "type": "object",
                                        "properties": {
                                            "popcode": {
                                                "type": "object",
                                                "properties": {
                                                    "name": {
                                                        "type": "string",
                                                        "value": "@popcode.popcodeName",
                                                        "options": {"editable": false}
                                                    },
                                                    "address": {
                                                        "type": "string",
                                                        "value": "@popcode.address",
                                                        "options": {"editable": false}
                                                    },
                                                    "currentState": {
                                                        "type": "string",
                                                        "value": "@popcode.spot",
                                                        "options": {"editable": false}
                                                    }
                                                },
                                                "required": ["name", "address", "currentState"]
                                            },
                                            "truckContents": {
                                                "type": "object",
                                                "properties": {
                                                    "Amount": {
                                                        "type": "number",
                                                        "value": "@popcode.appData.wineBottles",
                                                        "options": {"editable": false}
                                                    },
                                                    "Unit": {
                                                        "type": "string",
                                                        "value": "@popcode.appData.wineUnit",
                                                        "options": {"editable": false}
                                                    }
                                                }
                                            }
                                        }
                                    },
                                    "options": {"auto": "labels"}
                                }
                            }, "tab2": {"title": "Popcode Graph", "graphView": {"visName": "wine"}}
                        },
                        "screenButtons": {
                            "ok": {
                                "title": "Ok",
                                "action": [{"operation": "navigate", "resetStack": true, "screen": "Home"}]
                            }
                        }
                    }
                },
                "contractLib": {
                    "name": "Wine SmartContract Library",
                    "version": "1.0",
                    "slug": "wine_1_0",
                    "libs": ["base64_Y2xhc3MgU21hcnRDb250cmFjdEJhc2UgewogIGNvbnN0cnVjdG9yKGhvb2tzKSB7CiAgICAgIHRoaXMuaG9va3MgPSBob29rczsKICAgICAgdGhpcy5zdGF0ZSA9IGhvb2tzLnN0YXRlOwogICAgICB0aGlzLmRlYnVnTG9nID0gaG9va3MuZGVidWdMb2c7CiAgICAgIHRoaXMuZGVidWdMb2coJ2NvbnN0cnVjdCBTbWFydENvbnRyYWN0QmFzZScpOwogIH0KICBkZWJ1Z1NpemUobykgewogICAgdmFyIHMgPSBKU09OLnN0cmluZ2lmeShvKTsKICAgIHRoaXMuZGVidWdMb2coYHNpemU6ICR7cy5sZW5ndGgvMTAyNH0ga2ApOwogIH0KICBhc3luYyBieU5hbWUocE5hbWUpIHsKICAgIHZhciBhcGkgPSB0aGlzLmhvb2tzLnN0YWNrLmFwaTsKICAgIHZhciB1cmwgPSAnL3AvbmFtZS8nICsgcE5hbWU7CiAgICBjb25zdCByZXMgPSBhd2FpdCBhcGkuZ2V0KHVybCk7CiAgICByZXR1cm4gcmVzLmJvZHk7CiAgfQogIGFzeW5jIG9uZUJ5TmFtZShwTmFtZSkgewogICAgdmFyIF8gPSB0aGlzLmhvb2tzLl87CiAgICB2YXIgYXBpID0gdGhpcy5ob29rcy5zdGFjay5hcGk7CiAgICB2YXIgdXJsID0gJy9wL25hbWUvJyArIHBOYW1lOwogICAgY29uc3QgcmVzID0gYXdhaXQgYXBpLmdldCh1cmwpOwogICAgdmFyIHBvcGNvZGVzID0gIV8uaXNOaWwocmVzKQogICAgICYmICFfLmlzTmlsKHJlcy5ib2R5KQogICAgICYmICFfLmlzTmlsKHJlcy5ib2R5LnBvcGNvZGVzKSA/IHJlcy5ib2R5LnBvcGNvZGVzIDogbnVsbDsKICAgIHZhciBwb3Bjb2RlID0gXy5pc0FycmF5KHBvcGNvZGVzKSAmJiBwb3Bjb2Rlcy5sZW5ndGggPiAwCiAgICAgPyBwb3Bjb2Rlc1swXSA6IG51bGw7CiAgICByZXR1cm4gcG9wY29kZTsKICB9CiAgYXN5bmMgYmFsYW5jZShhZGRyZXNzKSB7CiAgICB2YXIgYXBpID0gdGhpcy5ob29rcy5zdGFjay5hcGk7CiAgICB2YXIgdXJsID0gJy9wL2JhbGFuY2UvJyArIGFkZHJlc3M7CiAgICBjb25zdCByZXMgPSBhd2FpdCBhcGkuZ2V0KHVybCk7CiAgICByZXR1cm4gcmVzLmJvZHk7CiAgfQogIGFzeW5jIGdlbmVyYXRlKCkgewogICAgdmFyIGFwaSA9IHRoaXMuaG9va3Muc3RhY2suYXBpOwogICAgdmFyIHVybCA9ICcvcC9nZW5lcmF0ZSc7CiAgICBjb25zdCByZXMgPSBhd2FpdCBhcGkuZ2V0KHVybCk7CiAgICByZXR1cm4gcmVzLmJvZHk7CiAgfQogIGFzeW5jIGNvbnRhaW5lclBvcGNvZGUoYWRkcmVzcykgewogICAgdmFyIGFwaSA9IHRoaXMuaG9va3Muc3RhY2suYXBpQ2F5bGV5OwogICAgdmFyIHVybCA9ICcvY29udGFpbmVyUG9wY29kZS8nICsgYWRkcmVzczsKICAgIGNvbnN0IHJlcyA9IGF3YWl0IGFwaS5nZXQodXJsKTsKICAgIHJldHVybiByZXMuYm9keTsKICB9CiAgYXN5bmMgYm9tUG9wY29kZXMoYWRkcmVzcykgewogICAgdmFyIGFwaSA9IHRoaXMuaG9va3Muc3RhY2suYXBpQ2F5bGV5OwogICAgdmFyIHVybCA9ICcvYm9tUG9wY29kZXMvJyArIGFkZHJlc3M7CiAgICBjb25zdCByZXMgPSBhd2FpdCBhcGkuZ2V0KHVybCk7CiAgICByZXR1cm4gcmVzLmJvZHk7CiAgfQogIGFzeW5jIHNpZ25NZXNzYWdlKGZpZWxkcyxwcml2YXRlS2V5KSB7CiAgICB2YXIgYXBpID0gdGhpcy5ob29rcy5zdGFjay5hcGk7CiAgICB2YXIgYm9keSA9IHsKICAgICAgZmllbGRzLAogICAgICBwcml2YXRlS2V5CiAgICB9OwogICAgdmFyIHVybCA9ICcvY3J5cHRvL3NpZ25NZXNzYWdlJzsKICAgIHRoaXMuZGVidWdMb2coJyoqKioqKioqKioqIHNpZ25NZXNzYWdlJyk7CiAgICB0aGlzLmRlYnVnTG9nKHtib2R5fSk7CiAgICBjb25zdCByZXMgPSBhd2FpdCBhcGkucG9zdCh1cmwsIHtib2R5fSk7CiAgICB0aGlzLmRlYnVnTG9nKHtib2R5OiByZXMuYm9keX0pOwogICAgcmV0dXJuIHJlcy5ib2R5OwogIH0KICBhc3luYyBibG9iQ3JlYXRlV2l0aFNpZyhzaWcsYWRkcmVzcyxkYXRhLHB1YmxpY0tleSkgewogICAgdmFyIGFwaSA9IHRoaXMuaG9va3Muc3RhY2suYXBpOwogICAgdmFyIGJvZHkgPSB7CiAgICAgIHNpZywKICAgICAgYWRkcmVzcywKICAgICAgcHVibGljS2V5LAogICAgICBkYXRhCiAgICB9OwogICAgdmFyIHVybCA9ICcvcC9ibG9iQ3JlYXRlV2l0aFNpZyc7CiAgICBjb25zdCByZXMgPSBhd2FpdCBhcGkucG9zdCh1cmwsIHtib2R5fSk7CiAgICByZXR1cm4gcmVzLmJvZHk7CiAgfQogIGFzeW5jIGJsb2JDcmVhdGUoYWRkcmVzcyxkYXRhLHB1YmxpY0tleSxwcml2YXRlS2V5KSB7CiAgICB2YXIgZmllbGRzID0gW107CgogICAgdmFyIHJlcyA9IGF3YWl0IHRoaXMuYmFsYW5jZShhZGRyZXNzKTsKICAgIGZpZWxkcy5wdXNoKHJlcy5iYWxhbmNlLkNvdW50ZXIpOwogICAgZmllbGRzLnB1c2goYWRkcmVzcyk7CiAgICBmaWVsZHMucHVzaChkYXRhKTsKCiAgICByZXMgPSBhd2FpdCB0aGlzLnNpZ25NZXNzYWdlKGZpZWxkcyxwcml2YXRlS2V5KTsKCiAgICByZXMgPSBhd2FpdCB0aGlzLmJsb2JDcmVhdGVXaXRoU2lnKHJlcy5zaWcsYWRkcmVzcyxkYXRhLHB1YmxpY0tleSk7CgogICAgcmV0dXJuIHJlczsKICB9CiAgYXN5bmMgbWludChzaWcsYWRkcmVzcyxkYXRhLHB1YmxpY0tleSxhbW91bnQsdW5pdCkgewogICAgdmFyIGFwaSA9IHRoaXMuaG9va3Muc3RhY2suYXBpOwogICAgdmFyIGJvZHkgPSB7CiAgICAgIHNpZywKICAgICAgYWRkcmVzcywKICAgICAgcHVibGljS2V5LAogICAgICBhbW91bnQsCiAgICAgIHVuaXQsCiAgICAgIGRhdGEKICAgIH07CiAgICB0aGlzLmRlYnVnTG9nKCcqKioqKioqKioqKiBkbyBtaW50Jyk7CiAgICB0aGlzLmRlYnVnTG9nKHtib2R5fSk7CiAgICB0aGlzLmRlYnVnTG9nKHthcGl9KTsKICAgIHRoaXMuZGVidWdTaXplKGJvZHkpOwogICAgdmFyIHVybCA9ICcvcC9taW50JzsKICAgIGNvbnN0IHJlcyA9IGF3YWl0IGFwaS5wb3N0KHVybCwge2JvZHl9KTsKICAgIHRoaXMuZGVidWdMb2coJyoqKioqKioqKioqIG1pbnQgcmVzdWx0Jyk7CiAgICB0aGlzLmRlYnVnTG9nKHJlcyk7CiAgICByZXR1cm4gcmVzOwogIH0KICBhc3luYyBzaWduQW5kTWludChhZGRyZXNzLGRhdGEscHVibGljS2V5LGFtb3VudCx1bml0LHByaXZhdGVLZXkpIHsKICAgIHRoaXMuZGVidWdMb2coJ3NpZ25BbmRNaW50Jyk7CiAgICB0aGlzLmRlYnVnTG9nKHthZGRyZXNzLGRhdGEscHVibGljS2V5LGFtb3VudCx1bml0LHByaXZhdGVLZXl9KTsKICAgIHZhciBmaWVsZHMgPSBbXTsKICAgIHZhciB7IGJhbGFuY2UgfSA9IGF3YWl0IHRoaXMuYmFsYW5jZShhZGRyZXNzKTsKICAgIC8vIHRoaXMuZGVidWdMb2coJyMjIyMjIyMjIyMjIyMjIyMgYmFsYW5jZS5Db3VudGVyOiAnICsgYmFsYW5jZS5Db3VudGVyKTsKICAgIGZpZWxkcy5wdXNoKGJhbGFuY2UuQ291bnRlcik7CiAgICBmaWVsZHMucHVzaChhZGRyZXNzKTsKICAgIGZpZWxkcy5wdXNoKGFtb3VudCk7CiAgICBmaWVsZHMucHVzaCh1bml0KTsKICAgIGZpZWxkcy5wdXNoKGRhdGEpOwoKICAgIHZhciB7IHNpZyB9ID0gYXdhaXQgdGhpcy5zaWduTWVzc2FnZShmaWVsZHMscHJpdmF0ZUtleSk7CgogICAgdmFyIHJlcyA9IGF3YWl0IHRoaXMubWludChzaWcsYWRkcmVzcyxkYXRhLHB1YmxpY0tleSxhbW91bnQsdW5pdCk7CgogICAgcmV0dXJuIHJlczsKICB9CiAgYXN5bmMgd2l0aGRyYXcoc2lnLHByaXZhdGVLZXksZGVzdEFkZHJlc3MsZGVzdEFtb3VudCxkYXRhLHNvdXJjZU91dHB1dCkgewogICAgdmFyIGFwaSA9IHRoaXMuaG9va3Muc3RhY2suYXBpOwogICAgdmFyIGJvZHkgPSB7CiAgICAgIHNpZywKICAgICAgcHJpdmF0ZUtleSwKICAgICAgZGVzdEFkZHJlc3MsCiAgICAgIGRlc3RBbW91bnQsCiAgICAgIGRhdGEsCiAgICAgIHNvdXJjZU91dHB1dAogICAgfTsKICAgIHRoaXMuZGVidWdMb2coJyoqKioqKioqKioqIHdpdGhkcmF3Jyk7CiAgICB0aGlzLmRlYnVnTG9nKHtib2R5fSk7CiAgICB2YXIgdXJsID0gJy9wL3dpdGhkcmF3JzsKICAgIGNvbnN0IHJlcyA9IGF3YWl0IGFwaS5wb3N0KHVybCwge2JvZHl9KTsKICAgIHJldHVybiByZXM7CiAgfQogIGFzeW5jIHNpZ25BbmRXaXRoZHJhdyhwcml2YXRlS2V5LHNvdXJjZUFkZHJlc3MsZGVzdEFkZHJlc3MsZGVzdEFtb3VudCxkYXRhLHNvdXJjZU91dHB1dCkgewogICAgdGhpcy5kZWJ1Z0xvZygnc2lnbkFuZFdpdGhkcmF3Jyk7CiAgICB0aGlzLmRlYnVnTG9nKHtwcml2YXRlS2V5LHNvdXJjZUFkZHJlc3MsZGVzdEFkZHJlc3MsZGVzdEFtb3VudCxkYXRhLHNvdXJjZU91dHB1dH0pOwogICAgdmFyIGZpZWxkcyA9IFtdOwogICAgdmFyIHsgYmFsYW5jZSB9ID0gYXdhaXQgdGhpcy5iYWxhbmNlKHNvdXJjZUFkZHJlc3MpOwogICAgLy8gdGhpcy5kZWJ1Z0xvZygnIyMjIyMjIyMjIyMjIyMjIyBiYWxhbmNlLkNvdW50ZXI6ICcgKyBiYWxhbmNlLkNvdW50ZXIpOwogICAgZmllbGRzLnB1c2goYmFsYW5jZS5Db3VudGVyKTsKICAgIGZpZWxkcy5wdXNoKGRlc3RBZGRyZXNzKTsKICAgIGZpZWxkcy5wdXNoKGRhdGEpOwogICAgZmllbGRzLnB1c2goc291cmNlT3V0cHV0KTsKICAgIGZpZWxkcy5wdXNoKGRlc3RBbW91bnQpOwoKICAgIHZhciB7IHNpZyB9ID0gYXdhaXQgdGhpcy5zaWduTWVzc2FnZShmaWVsZHMscHJpdmF0ZUtleSk7CgogICAgdmFyIHJlcyA9IGF3YWl0IHRoaXMud2l0aGRyYXcoc2lnLHByaXZhdGVLZXksZGVzdEFkZHJlc3MsZGVzdEFtb3VudCxkYXRhLHNvdXJjZU91dHB1dCk7CgogICAgcmV0dXJuIHJlczsKICB9CiAgYXN5bmMgYm9tVXBkYXRlV2l0aFNpZyhzaWcsYWRkcmVzcyxwdWJsaWNLZXksYm9tT3AsYm9tQWRkcmVzcykgewogICAgdmFyIGFwaSA9IHRoaXMuaG9va3Muc3RhY2suYXBpOwogICAgdmFyIGJvZHkgPSB7CiAgICAgIHNpZywKICAgICAgYWRkcmVzcywKICAgICAgcHVibGljS2V5LAogICAgICBib21PcCwKICAgICAgYm9tQWRkcmVzcwogICAgfTsKICAgIHRoaXMuZGVidWdMb2coJyoqKioqKioqKioqIGRvIGJvbVVwZGF0ZScpOwogICAgdGhpcy5kZWJ1Z0xvZyh7Ym9keX0pOwogICAgdGhpcy5kZWJ1Z0xvZyh7YXBpfSk7CiAgICB0aGlzLmRlYnVnU2l6ZShib2R5KTsKICAgIHZhciB1cmwgPSAnL3AvYm9tVXBkYXRlV2l0aFNpZyc7CiAgICBjb25zdCByZXMgPSBhd2FpdCBhcGkucG9zdCh1cmwsIHtib2R5fSk7CiAgICB0aGlzLmRlYnVnTG9nKCcqKioqKioqKioqKiBib21VcGRhdGUgcmVzdWx0Jyk7CiAgICB0aGlzLmRlYnVnTG9nKHJlcyk7CiAgICByZXR1cm4gcmVzOwogIH0KICBhc3luYyBzaWduQW5kVXBkYXRlQm9tKGFkZHJlc3MscHVibGljS2V5LGJvbU9wLGJvbUFkZHJlc3MscHJpdmF0ZUtleSkgewogICAgdGhpcy5kZWJ1Z0xvZygnc2lnbkFuZFVwZGF0ZUJvbScpOwogICAgdGhpcy5kZWJ1Z0xvZyh7YWRkcmVzcyxwdWJsaWNLZXksYm9tT3AsYm9tQWRkcmVzcyxwcml2YXRlS2V5fSk7CiAgICB2YXIgZmllbGRzID0gW107CiAgICB2YXIgeyBiYWxhbmNlIH0gPSBhd2FpdCB0aGlzLmJhbGFuY2UoYWRkcmVzcyk7CiAgICAvLyB0aGlzLmRlYnVnTG9nKCcjIyMjIyMjIyMjIyMjIyMjIGJhbGFuY2UuQ291bnRlcjogJyArIGJhbGFuY2UuQ291bnRlcik7CiAgICBmaWVsZHMucHVzaChiYWxhbmNlLkNvdW50ZXIpOwogICAgZmllbGRzLnB1c2goYWRkcmVzcyk7CiAgICBmaWVsZHMucHVzaChib21PcCk7CiAgICBmaWVsZHMucHVzaChib21BZGRyZXNzKTsKCiAgICB2YXIgeyBzaWcgfSA9IGF3YWl0IHRoaXMuc2lnbk1lc3NhZ2UoZmllbGRzLHByaXZhdGVLZXkpOwoKICAgIHZhciByZXMgPSBhd2FpdCB0aGlzLmJvbVVwZGF0ZVdpdGhTaWcoc2lnLGFkZHJlc3MscHVibGljS2V5LGJvbU9wLGJvbUFkZHJlc3MpOwoKICAgIHJldHVybiByZXM7CiAgfQp9Owo=", "base64_Y2xhc3MgU21hcnRDb250cmFjdCBleHRlbmRzIFNtYXJ0Q29udHJhY3RCYXNlIHsKICBjb25zdHJ1Y3Rvcihob29rcykgewogICAgICBzdXBlcihob29rcykKICAgICAgdGhpcy5kZWJ1Z0xvZygnKioqKioqKioqKioqKiogU21hcnRDb250cmFjdCcpOwogIH0KCiAgYXN5bmMgZWNobygpIHsKICAgICAgdGhpcy5kZWJ1Z0xvZygnZWNobycpOwogICAgICB2YXIgcnZhbCA9IHsKICAgICAgICAgIGRhdGE6ICdoZWxsbycKICAgICAgfTsKICAgICAgdGhpcy5ob29rcy5maW5pc2gucmVzb2x2ZShydmFsKTsKICB9CgogIGFzeW5jIHdpbmVtYWtlck1pbnRPaygpIHsgCiAgICB0aGlzLmRlYnVnTG9nKCdleGVjdXRlIHdpbmVtYWtlck1pbnRPaycpOwogICAgICB2YXIgXyA9IHRoaXMuaG9va3MuXzsKICAgICAgdmFyIHNzID0gdGhpcy5ob29rcy5zY3JlZW5TdGF0ZTsKICAgICAgdmFyIGFwcCA9IHRoaXMuaG9va3MuYXBwOwogICAgICB2YXIgdXNlckNyZWRlbnRpYWxzID0gYXBwLmdldEFwcFN0YXRlKCd1c2VyQ3JlZGVudGlhbHMnKTsKICAgICAgdmFyIHB1YmxpY0tleSA9IHVzZXJDcmVkZW50aWFscy5wdWJsaWNLZXk7CiAgICAgIHZhciBwcml2YXRlS2V5ID0gdXNlckNyZWRlbnRpYWxzLnByaXZhdGVLZXk7CiAgICAgIHZhciB3b3JrZmxvdyA9IHNzLndvcmtmbG93OwogICAgICB2YXIgbmV3SWQgPSB0aGlzLmhvb2tzLnNob3J0aWQuZ2VuZXJhdGUoKTsKICAgICAgdmFyIHBvcGNvZGVOYW1lID0gJ1dpbmVfJyArIG5ld0lkOwogICAgICB2YXIgeyBmb3JtIH0gPSB0aGlzLnN0YXRlOwogICAgICB0aGlzLmRlYnVnTG9nKGZvcm0pOwogICAgICB2YXIgeyBwb3Bjb2RlIH0gPSBhd2FpdCB0aGlzLmdlbmVyYXRlKCk7CiAgICAgIHZhciB7IGFkZHJlc3MgfSA9IHBvcGNvZGU7CiAgICAgIHZhciBuZXh0U3BvdCA9ICd0cnVja2VyLnBpY2t1cCc7CiAgICAgIHZhciBhbW91bnQgPSB0aGlzLnRvSW50ZWdlcihmb3JtLm1pbnRXaW5lQm90dGxlcy5BbW91bnQpOwogICAgICB2YXIgdW5pdCA9IGZvcm0ubWludFdpbmVCb3R0bGVzLlVuaXQ7CiAgICAgIHRoaXMuZGVidWdMb2coJyMjIyMjIyMjIyMjIyMlJSUlJSUlJSUlJSUlJCQkJCQkJCQkJCQkJCQgIGdlbmVyYXRlZCB3aW5lbWFrZXIgcG9wY29kZTonKTsKICAgICAgdGhpcy5kZWJ1Z0xvZyh7cG9wY29kZU5hbWUscG9wY29kZX0pOwogICAgICAKICAgICAgdmFyIGRhdGEgPQogICAgICAgICAgewogICAgICAgICAgICAiYXBwRGF0YSI6IHsKICAgICAgICAgICAgICAid29ya2Zsb3dEYXRhIjogZm9ybSwKICAgICAgICAgICAgICAid2luZUJvdHRsZXMiOiBhbW91bnQsCiAgICAgICAgICAgICAgIndpbmVVbml0IjogdW5pdCwKICAgICAgICAgICAgICAic3BvdCI6IG5leHRTcG90LAogICAgICAgICAgICAgICJ3b3JrZmxvd05hbWUiOiBzcy53b3JrZmxvdy5uYW1lLAogICAgICAgICAgICAgICJ3b3JrZmxvd0luc3RhbmNlSWQiOiBuZXdJZCwKICAgICAgICAgICAgICAid29ya2Zsb3dSb290UG9wY29kZSI6ICJ0cnVlIiwKICAgICAgICAgICAgICBwb3Bjb2RlTmFtZSAsCiAgICAgICAgICAgICAgIndvcmtmbG93RGVmIjogd29ya2Zsb3cKICAgICAgICAgICAgfQogICAgICAgICAgfTsKCiAgICAgIHRoaXMuZGVidWdMb2coZGF0YSk7CgogICAgICB2YXIgcmVzID0gYXdhaXQgdGhpcy5zaWduQW5kTWludChhZGRyZXNzLGRhdGEscHVibGljS2V5LGFtb3VudCx1bml0LHByaXZhdGVLZXkpOwogICAgICAvLyB0aGlzLmRlYnVnTG9nKCd0aGlzLnNpZ25BbmRNaW50IHJlcy5ib2R5LmtleXM6ICcgKyBPYmplY3Qua2V5cyhyZXMuYm9keSkpOwoKICAgICAgdmFyIHJ2YWwgPSB7CiAgICAgICAgICBhY3Rpb246IFtdCiAgICAgIH07CiAgICAgIHRoaXMuaG9va3MuZmluaXNoLnJlc29sdmUocnZhbCk7CiAgICAgIHJldHVybiBhZGRyZXNzOwogICAgCiAgfQogIHRvSW50ZWdlcih2YWx1ZSkgewogICAgdmFyIF8gPSB0aGlzLmhvb2tzLl87CiAgICBpZihfLmlzU3RyaW5nKHZhbHVlKSkKICAgICAgcmV0dXJuIHBhcnNlSW50KHZhbHVlKTsKICAgIGVsc2UKICAgICAgcmV0dXJuIHZhbHVlOwogIH0KICBhc3luYyB0cnVja2VyUGlja3VwT2soKSB7IAogICAgdGhpcy5kZWJ1Z0xvZygnZXhlY3V0ZSB0cnVja2VyUGlja3VwT2snKTsKICAgIHZhciBmb3JtID0gdGhpcy5zdGF0ZS5mb3JtOwogICAgdGhpcy5kZWJ1Z0xvZyh7Zm9ybX0pOwogICAgCiAgICB2YXIgcnZhbCA9IHsKICAgICAgICBhY3Rpb246IFtdCiAgICB9OwoKICAgIHZhciBfID0gdGhpcy5ob29rcy5fOwogICAgdmFyIHNzID0gdGhpcy5ob29rcy5zY3JlZW5TdGF0ZTsKICAgIHZhciBhcHAgPSB0aGlzLmhvb2tzLmFwcDsKICAgIHZhciB3b3JrZmxvdyA9IHNzLndvcmtmbG93OwogICAgCiAgICB2YXIgdXNlckNyZWRlbnRpYWxzID0gYXBwLmdldEFwcFN0YXRlKCd1c2VyQ3JlZGVudGlhbHMnKTsKICAgIHZhciB1c2VyUHVibGljS2V5ID0gdXNlckNyZWRlbnRpYWxzLnB1YmxpY0tleTsKICAgIHZhciB1c2VyUHJpdmF0ZUtleSA9IHVzZXJDcmVkZW50aWFscy5wcml2YXRlS2V5OwogICAgCiAgICB2YXIgc3JjUG9wY29kZSA9IHRoaXMuc3RhdGUucG9wY29kZTsKICAgIAoKICAgIHZhciBkZXN0QW1vdW50ID0gdGhpcy50b0ludGVnZXIodGhpcy5zdGF0ZS5mb3JtLndpdGhkcmF3LnBpY2t1cEFtb3VudCk7CiAgICB2YXIgZGVzdE5hbWUgPSAiVHJ1Y2tfIiArIHVzZXJDcmVkZW50aWFscy5zZXNzaW9uSWQ7CiAgICAKICAgIHZhciBkYXRhID0geyBkZXNjcmlwdGlvbjogYHdpdGhkcmF3ICR7ZGVzdEFtb3VudH0gYm90dGxlcyBvZiB3aW5lYCB9OwogICAgdmFyIHNvdXJjZU91dHB1dCA9IDA7CiAgICAKICAgIHRoaXMuZGVidWdMb2coJ2dldCB0cnVjayBwb3Bjb2RlOiAnICsgZGVzdE5hbWUpOwogICAgdmFyIHRydWNrUG9wY29kZSA9IGF3YWl0IHRoaXMub25lQnlOYW1lKGRlc3ROYW1lKTsKICAgIHRoaXMuZGVidWdMb2codHJ1Y2tQb3Bjb2RlKTsKICAgICAKICAgIHRoaXMuZGVidWdMb2coJ2NoZWNrIHNvdXJjZSB3aW5lIGJvdHRsZSBjb3VudCcpOwogICAgdmFyIHdpbmVCb3R0bGVzID0gdGhpcy50b0ludGVnZXIoc3JjUG9wY29kZS5hcHBEYXRhLndpbmVCb3R0bGVzKTsKICAgIHZhciB3aW5lVW5pdCA9IHNyY1BvcGNvZGUuYXBwRGF0YS53aW5lVW5pdDsKICAgIHRoaXMuZGVidWdMb2coe3NyY1BvcGNvZGV9KTsKICAgIHRoaXMuZGVidWdMb2coe3dpbmVCb3R0bGVzLGRlc3RBbW91bnQsd2luZVVuaXR9KTsKICAgIAogICAgaWYoXy5pc05pbChkZXN0QW1vdW50KSB8fCBfLmlzTmFOKGRlc3RBbW91bnQpKSB7CiAgICAgIHRoaXMuZGVidWdMb2coJyoqKioqKioqKioqKioqKioqKiBlcnJvciBiYWQgZGVzdEFtb3VudCknKTsKICAgICAgdGhpcy5ob29rcy5maW5pc2gucmVzb2x2ZShydmFsKTsKICAgICAgcmV0dXJuIDsKICAgIH0KICAgIAogICAgaWYoXy5pc05pbCh3aW5lQm90dGxlcykgfHwgXy5pc05hTihkZXN0QW1vdW50KSkgewogICAgICB0aGlzLmRlYnVnTG9nKCcqKioqKioqKioqKioqKioqKiogZXJyb3IgYmFkIHdpbmVCb3R0bGVzJyk7CiAgICAgIHRoaXMuaG9va3MuZmluaXNoLnJlc29sdmUocnZhbCk7CiAgICAgIHJldHVybiA7CiAgICB9CiAgICAKICAgIGlmKGRlc3RBbW91bnQgPiB3aW5lQm90dGxlcykgewogICAgICB0aGlzLmRlYnVnTG9nKCcqKioqKioqKioqKioqKioqKiogZXJyb3IgZGVzdEFtb3VudCA+IHdpbmVCb3R0bGVzJyk7CiAgICAgIHRoaXMuaG9va3MuZmluaXNoLnJlc29sdmUocnZhbCk7CiAgICAgIHJldHVybiA7CiAgICB9CiAgICAgCiAgICB2YXIgdHJ1Y2tCb3R0bGVzOwogICAgaWYgKF8uaXNOaWwodHJ1Y2tQb3Bjb2RlKSkgewogICAgICB0aGlzLmRlYnVnTG9nKCdNaW50aW5nIHRydWNrIHBvcGNvZGU6ICcgKyBkZXN0TmFtZSk7CiAgICAgIHZhciB0cnVja1Nwb3QgPSAndHJ1Y2tlci5zaG93JzsKICAgICAgdmFyIG5ld0lkID0gdGhpcy5ob29rcy5zaG9ydGlkLmdlbmVyYXRlKCk7CiAgICAgIHZhciB0cnVja1N0YXJ0QW1vdW50ID0gMDsKICAgICAgdmFyIHRydWNrVW5pdCA9ICdib3R0bGVzIG9mIHdpbmUnOwogICAgICB0cnVja0JvdHRsZXMgPSAwOwogICAgICB2YXIgdHJ1Y2tEYXRhID0KICAgICAgICAgIHsKICAgICAgICAgICAgImFwcERhdGEiOiB7CiAgICAgICAgICAgICAgIndvcmtmbG93RGF0YSI6IHt9LAogICAgICAgICAgICAgICJzcG90IjogdHJ1Y2tTcG90LAogICAgICAgICAgICAgICJ3aW5lQm90dGxlcyI6IHRydWNrQm90dGxlcywKICAgICAgICAgICAgICAid2luZVVuaXQiOiB3aW5lVW5pdCwKICAgICAgICAgICAgICAid29ya2Zsb3dOYW1lIjogc3Mud29ya2Zsb3cubmFtZSwKICAgICAgICAgICAgICAid29ya2Zsb3dJbnN0YW5jZUlkIjogbmV3SWQsCiAgICAgICAgICAgICAgIndvcmtmbG93Um9vdFBvcGNvZGUiOiAidHJ1ZSIsCiAgICAgICAgICAgICAgcG9wY29kZU5hbWU6IGRlc3ROYW1lLAogICAgICAgICAgICAgICJ3b3JrZmxvd0RlZiI6IHdvcmtmbG93CiAgICAgICAgICAgIH0KICAgICAgICAgIH07CiAgICAgIHZhciBuZXdQb3Bjb2RlID0gYXdhaXQgdGhpcy5nZW5lcmF0ZSgpOwogICAgICB2YXIgdHJ1Y2tBZGRyZXNzID0gbmV3UG9wY29kZS5wb3Bjb2RlLmFkZHJlc3M7CiAgICAgIAogICAgICB2YXIgcmVzID0gYXdhaXQgdGhpcy5zaWduQW5kTWludCh0cnVja0FkZHJlc3MsdHJ1Y2tEYXRhLHVzZXJQdWJsaWNLZXksdHJ1Y2tTdGFydEFtb3VudCx0cnVja1VuaXQsdXNlclByaXZhdGVLZXkpOwogICAgICAKICAgICAgdHJ1Y2tQb3Bjb2RlID0gYXdhaXQgdGhpcy5vbmVCeU5hbWUoZGVzdE5hbWUpOwogICAgfQogICAgZWxzZSB7CiAgICAgIHRoaXMuZGVidWdMb2coJ0ZvdW5kIGV4aXN0aW5nIHRydWNrIHBvcGNvZGU6ICcgKyBkZXN0TmFtZSk7CiAgICAgIHRydWNrQm90dGxlcyA9IHRydWNrUG9wY29kZS5hcHBEYXRhLndpbmVCb3R0bGVzOwogICAgfQogICAgCiAgICBpZihfLmlzTmlsKHRydWNrUG9wY29kZSkpIHsKICAgICAgdGhpcy5kZWJ1Z0xvZygnKioqKioqKioqKioqKioqKioqIEVycm9yIG1pbnRpbmcgdHJ1Y2sgcG9wY29kZScpOwogICAgICB0aGlzLmhvb2tzLmZpbmlzaC5yZXNvbHZlKHJ2YWwpOwogICAgICByZXR1cm4gOwogICAgfQogICAgCiAgICB0aGlzLmRlYnVnTG9nKCcjIyMjIyMjIyMjIyMjIyMjIHRydWNrIHBvcGNvZGU6Jyk7CiAgICB0aGlzLmRlYnVnTG9nKHRydWNrUG9wY29kZSk7CiAgICAKICAgIHZhciB3cmVzID0gYXdhaXQgdGhpcy5zaWduQW5kV2l0aGRyYXcoCiAgICAgIHNyY1BvcGNvZGUucHJpdmF0ZUtleSwKICAgICAgc3JjUG9wY29kZS5hZGRyZXNzLAogICAgICB0cnVja1BvcGNvZGUuYWRkcmVzcywKICAgICAgZGVzdEFtb3VudCwKICAgICAgZGF0YSwKICAgICAgc291cmNlT3V0cHV0CiAgICApOwogICAgCiAgICB0aGlzLmRlYnVnTG9nKCcjIyMjIyMjIyMjIyMjIyMjIHdpdGhkcmF3IHJlc3VsdDonKTsKICAgIHRoaXMuZGVidWdMb2cod3Jlcyk7CiAgICBydmFsLndyZXMgPSB3cmVzOwogICAgCiAgICB0aGlzLmRlYnVnTG9nKCcjIyMjIyMjIyMjIyMjIyMjIHVwZGF0ZSBzb3VyY2Ugd2luZSBib3R0bGUgY291bnQ6Jyk7CiAgICB2YXIgd2luZUNvdW50ID0gd2luZUJvdHRsZXMgLSBkZXN0QW1vdW50OwogICAgdmFyIHdpbmVEYXRhID0KICAgICAgICB7CiAgICAgICAgICAiYXBwRGF0YSI6IHsKICAgICAgICAgICAgIndpbmVCb3R0bGVzIjogd2luZUNvdW50CiAgICAgICAgICB9CiAgICAgICAgfTsKCiAgICB0aGlzLmRlYnVnTG9nKHdpbmVEYXRhKTsKICAgIHZhciBicmVzID0gYXdhaXQgdGhpcy5ibG9iQ3JlYXRlKAogICAgICBzcmNQb3Bjb2RlLmFkZHJlc3MsCiAgICAgIHdpbmVEYXRhLAogICAgICB1c2VyQ3JlZGVudGlhbHMucHVibGljS2V5LAogICAgICB1c2VyQ3JlZGVudGlhbHMucHJpdmF0ZUtleSk7CiAgICAgIAogICAgdGhpcy5kZWJ1Z0xvZygnIyMjIyMjIyMjIyMjIyMjIyBibG9iQ3JlYXRlIHJlc3VsdDonKTsKICAgIHRoaXMuZGVidWdMb2coYnJlcyk7CiAgICBydmFsLmJyZXMgPSBicmVzOwogICAgCiAgICB0aGlzLmRlYnVnTG9nKCcjIyMjIyMjIyMjIyMjIyMjIHVwZGF0ZSB0cnVjayB3aW5lIGJvdHRsZSBjb3VudDonKTsKICAgIHZhciB0cnVja0NvdW50ID0gdHJ1Y2tCb3R0bGVzICsgZGVzdEFtb3VudDsKICAgIHZhciB0cnVja1dpbmVEYXRhID0KICAgICAgICB7CiAgICAgICAgICAiYXBwRGF0YSI6IHsKICAgICAgICAgICAgIndpbmVCb3R0bGVzIjogdHJ1Y2tDb3VudAogICAgICAgICAgfQogICAgICAgIH07CgogICAgdGhpcy5kZWJ1Z0xvZyh0cnVja1dpbmVEYXRhKTsKICAgIHZhciBicmVzMiA9IGF3YWl0IHRoaXMuYmxvYkNyZWF0ZSgKICAgICAgdHJ1Y2tQb3Bjb2RlLmFkZHJlc3MsCiAgICAgIHRydWNrV2luZURhdGEsCiAgICAgIHVzZXJDcmVkZW50aWFscy5wdWJsaWNLZXksCiAgICAgIHVzZXJDcmVkZW50aWFscy5wcml2YXRlS2V5KTsKICAgICAgCiAgICB0aGlzLmRlYnVnTG9nKCcjIyMjIyMjIyMjIyMjIyMjIHRydWNrIGJsb2JDcmVhdGUgcmVzdWx0OicpOwogICAgdGhpcy5kZWJ1Z0xvZyhicmVzMik7CiAgICBydmFsLmJyZXMyID0gYnJlczI7CiAgICAKICAgIHRoaXMuaG9va3MuZmluaXNoLnJlc29sdmUocnZhbCk7CiAgIH0KCn07Cg=="]
                }
            },
            "address": "0879c87ec18a84cde314b9d92826fd910e56e647",
            "createdAt": "1520231188776",
            "date": "1520231188776",
            "operation": "mint",
            "destCounter": "WjiZCxxNZ1p6Ay0XTxeNVNT88hEw7JyDgrnE+1+YlV0="
        },
            {
            "id": "<a425d5ac7aedb7b0e6336dd8680a3e1227ca130eb8d387dce620171a3fee5af7>",
            "sourceAddress": "0879c87ec18a84cde314b9d92826fd910e56e647",
            "destPopcode": "<34baf20d6d7149f0472451911e91937762152480>",
            "txId": "a425d5ac7aedb7b0e6336dd8680a3e1227ca130eb8d387dce620171a3fee5af7",
            "data": {"metadata": {"description": "withdraw 500 bottles of wine"}},
            "type": "transaction",
            "sourceCounter": "WjiZCxxNZ1p6Ay0XTxeNVNT88hEw7JyDgrnE+1+YlV0=",
            "createdAt": "1520231209673",
            "date": "1520231209673",
            "destAddress": "34baf20d6d7149f0472451911e91937762152480",
            "destAmount": "500",
            "operation": "withdraw",
            "sourcePopcode": "<0879c87ec18a84cde314b9d92826fd910e56e647>"
        },
            {"id": "<b62cdd8cf80da5a449931fdece718d9c2dee1a3bc9a95e59c9c622f78f89b7b5>",
            "popcode": "<0879c87ec18a84cde314b9d92826fd910e56e647>",
            "txId": "b62cdd8cf80da5a449931fdece718d9c2dee1a3bc9a95e59c9c622f78f89b7b5",
            "data": {"metadata": {"appData": {"wineBottles": 500}}},
            "type": "transaction",
            "sourceCounter": "zT6PCMZSygffKbrWtRwzrYjgzQeUAN/oFlPFYlhMDHg=",
            "address": "0879c87ec18a84cde314b9d92826fd910e56e647",
            "createdAt": "1520231212402",
            "date": "1520231212402",
            "operation": "blobCreate",
            "destCounter": "2AEzAC6dvaSRWOodYOd0BHmSu0TsQdsbUc8LmqSQnbE="
        }],
        "workflowName": "wineV1",
        "workflowData": {"mintWineBottles": {"Amount": "1000", "Unit": "bottles of wine"}},
        "wineBottles": 500,
        "wineUnit": "bottles of wine",
        "timestamp": 1520231212402,
        "withdrawAmount": "500",
        "withdrawTrans": {
            "id": "<a425d5ac7aedb7b0e6336dd8680a3e1227ca130eb8d387dce620171a3fee5af7>",
            "sourceAddress": "0879c87ec18a84cde314b9d92826fd910e56e647",
            "destPopcode": "<34baf20d6d7149f0472451911e91937762152480>",
            "txId": "a425d5ac7aedb7b0e6336dd8680a3e1227ca130eb8d387dce620171a3fee5af7",
            "data": {"metadata": {"description": "withdraw 500 bottles of wine"}},
            "type": "transaction",
            "sourceCounter": "WjiZCxxNZ1p6Ay0XTxeNVNT88hEw7JyDgrnE+1+YlV0=",
            "createdAt": "1520231209673",
            "date": "1520231209673",
            "destAddress": "34baf20d6d7149f0472451911e91937762152480",
            "destAmount": "500",
            "operation": "withdraw",
            "sourcePopcode": "<0879c87ec18a84cde314b9d92826fd910e56e647>"
        }
    },
        {
        "id": "<af5efdc4b5176fd77e9cc8c9c6e42f8b1552c1b3>",
        "workflowInstanceId": "PK9CFQEVS",
        "appData": {
            "workflowData": {"mintWineBottles": {"Amount": "1000", "Unit": "bottles of wine"}},
            "wineBottles": 800,
            "wineUnit": "bottles of wine",
            "spot": "trucker.pickup",
            "workflowName": "wineV1",
            "workflowInstanceId": "PK9CFQEVS",
            "workflowRootPopcode": "true",
            "popcodeName": "Wine_PK9CFQEVS",
            "workflowDef": {
                "title": "Wine V1",
                "name": "wineV1",
                "startScreen": "Home",
                "version": "2.0",
                "steps": {
                    "winemaker.mint": {
                        "step": "winemaker.mint",
                        "title": "Winemaker Mint",
                        "screen": "WinemakerMint"
                    },
                    "trucker.pickup": {"step": "trucker.pickup", "title": "Trucker Pickup", "screen": "TruckerPickup"},
                    "trucker.show": {"step": "trucker.show", "title": "Trucker Show", "screen": "TruckerShow"}
                },
                "appOptions": {"requireLogin": true},
                "screens": {
                    "Home": {
                        "name": "Home",
                        "title": "Home",
                        "api": "/api/mobile",
                        "screenListItems": {
                            "fetchItems": "/popcodeByWorkflowName",
                            "method": "get",
                            "api": "cayley",
                            "fetchParameters": {"workflowName": "wineV1"},
                            "itemDataTypes": {"popcode": "object"},
                            "itemLabel": ["popcodeName"],
                            "itemActions": {
                                "click": {
                                    "title": "Click",
                                    "action": [{
                                        "operation": "startWorkflow",
                                        "replaceCurrent": true,
                                        "parameters": {"spot": "@popcode.spot", "popcode": "@popcode"}
                                    }],
                                    "parameters": {"popcode": "@item"}
                                }
                            }
                        },
                        "screenButtons": {
                            "scan": {
                                "title": "Scan",
                                "action": [{"operation": "navigate", "screen": "Scan"}],
                                "roles": ["admin", "winemaker", "trucker"]
                            },
                            "mint": {
                                "title": "Mint",
                                "action": [{"operation": "navigate", "resetStack": true, "screen": "WinemakerMint"}],
                                "roles": ["admin", "winemaker"]
                            }
                        }
                    },
                    "Scan": {
                        "name": "Scan",
                        "title": "Scan",
                        "api": "/api/mobile",
                        "parameters": {"user": "@user"},
                        "modal": false,
                        "screenScan": {},
                        "startAction": [{
                            "operation": "scanBarcode",
                            "barcodeTypes": ["qr", "code128"],
                            "outputs": {"scanData": "@scanData"}
                        }, {
                            "operation": "routePopcode",
                            "parameters": {"scanData": "@scanData"},
                            "outputs": {"address": "@address"}
                        }, {
                            "operation": "fetch",
                            "route": "/p",
                            "method": "get",
                            "parameters": {"address": "@address"},
                            "outputs": {"popcode": "@popcodes[0]"}
                        }, {
                            "operation": "startWorkflow",
                            "replaceCurrent": true,
                            "parameters": {"spot": "@popcode.spot", "popcode": "@popcode"}
                        }]
                    },
                    "WinemakerMint": {
                        "name": "WinemakerMint",
                        "title": "Winemaker Mint",
                        "api": "/api/mobile",
                        "parameters": {"container": "@container", "popcode": "@popcode", "user": "@user"},
                        "outputs": {"popcode": "@container"},
                        "screenForm": {
                            "fields": {
                                "type": "object",
                                "properties": {
                                    "mintWineBottles": {
                                        "type": "object",
                                        "properties": {
                                            "Amount": {
                                                "type": "string",
                                                "value": "1000",
                                                "options": {"editable": true}
                                            },
                                            "Unit": {
                                                "type": "string",
                                                "value": "bottles of wine",
                                                "options": {"editable": true}
                                            }
                                        },
                                        "required": ["Amount", "Unit"]
                                    }
                                },
                                "required": ["mintWineBottles"]
                            }, "options": {"auto": "labels"}
                        },
                        "screenButtons": {
                            "mint": {
                                "title": "Mint",
                                "action": [{
                                    "operation": "contract",
                                    "contract": "winemakerMintOk",
                                    "parameters": {"popcode": "@popcode"},
                                    "outputs": {"status": "@status", "txId": "@txId"}
                                }, {
                                    "operation": "navigate",
                                    "resetStack": true,
                                    "forceUpdate": true,
                                    "screen": "Home"
                                }],
                                "roles": ["admin", "winemaker"]
                            },
                            "cancel": {
                                "title": "Cancel",
                                "action": [{"operation": "navigate", "resetStack": true, "screen": "Home"}]
                            }
                        }
                    },
                    "TruckerPickup": {
                        "name": "TruckerPickup",
                        "title": "Trucker Wine Pickup",
                        "api": "/api/mobile",
                        "parameters": {"container": "@container", "popcode": "@popcode", "user": "@user"},
                        "outputs": {"popcode": "@container"},
                        "tabs": {
                            "tab1": {
                                "title": "Pickup Wine",
                                "screenForm": {
                                    "privateKey": ["winemaker", "admin"],
                                    "publicKey": ["winemaker", "trucker", "admin"],
                                    "fields": {
                                        "type": "object",
                                        "properties": {
                                            "popcode": {
                                                "type": "object",
                                                "properties": {
                                                    "name": {
                                                        "type": "string",
                                                        "value": "@popcode.popcodeName",
                                                        "options": {"editable": false}
                                                    },
                                                    "address": {
                                                        "type": "string",
                                                        "value": "@popcode.address",
                                                        "options": {"editable": false}
                                                    },
                                                    "currentState": {
                                                        "type": "string",
                                                        "value": "@popcode.spot",
                                                        "options": {"editable": false}
                                                    }
                                                },
                                                "required": ["name", "address", "currentState"]
                                            },
                                            "warehouseContents": {
                                                "type": "object",
                                                "properties": {
                                                    "Amount": {
                                                        "type": "number",
                                                        "value": "@popcode.appData.wineBottles",
                                                        "options": {"editable": false}
                                                    },
                                                    "Unit": {
                                                        "type": "string",
                                                        "value": "@popcode.appData.wineUnit",
                                                        "options": {"editable": false}
                                                    }
                                                }
                                            },
                                            "withdraw": {
                                                "type": "object",
                                                "properties": {
                                                    "pickupAmount": {
                                                        "type": "number",
                                                        "options": {"editable": true}
                                                    }
                                                },
                                                "required": ["pickupAmount"]
                                            }
                                        },
                                        "required": ["withdraw"]
                                    },
                                    "options": {"auto": "labels"}
                                }
                            }, "tab2": {"title": "Popcode Graph", "graphView": {"visName": "wine"}}
                        },
                        "screenButtons": {
                            "pickup": {
                                "title": "Pickup",
                                "action": [{
                                    "operation": "contract",
                                    "contract": "truckerPickupOk",
                                    "parameters": {"popcode": "@popcode"},
                                    "outputs": {"status": "@status", "txId": "@txId"}
                                }, {
                                    "operation": "navigate",
                                    "resetStack": true,
                                    "forceUpdate": true,
                                    "screen": "Home"
                                }],
                                "roles": ["admin", "trucker"]
                            },
                            "cancel": {
                                "title": "Cancel",
                                "action": [{"operation": "navigate", "resetStack": true, "screen": "Home"}]
                            }
                        }
                    },
                    "TruckerShow": {
                        "name": "TruckerShow",
                        "title": "Truck Popcode",
                        "api": "/api/mobile",
                        "parameters": {"container": "@container", "popcode": "@popcode", "user": "@user"},
                        "outputs": {"popcode": "@container"},
                        "tabs": {
                            "tab1": {
                                "title": "Truck Contents",
                                "screenForm": {
                                    "privateKey": ["trucker", "admin"],
                                    "publicKey": ["winemaker", "trucker", "admin"],
                                    "fields": {
                                        "type": "object",
                                        "properties": {
                                            "popcode": {
                                                "type": "object",
                                                "properties": {
                                                    "name": {
                                                        "type": "string",
                                                        "value": "@popcode.popcodeName",
                                                        "options": {"editable": false}
                                                    },
                                                    "address": {
                                                        "type": "string",
                                                        "value": "@popcode.address",
                                                        "options": {"editable": false}
                                                    },
                                                    "currentState": {
                                                        "type": "string",
                                                        "value": "@popcode.spot",
                                                        "options": {"editable": false}
                                                    }
                                                },
                                                "required": ["name", "address", "currentState"]
                                            },
                                            "truckContents": {
                                                "type": "object",
                                                "properties": {
                                                    "Amount": {
                                                        "type": "number",
                                                        "value": "@popcode.appData.wineBottles",
                                                        "options": {"editable": false}
                                                    },
                                                    "Unit": {
                                                        "type": "string",
                                                        "value": "@popcode.appData.wineUnit",
                                                        "options": {"editable": false}
                                                    }
                                                }
                                            }
                                        }
                                    },
                                    "options": {"auto": "labels"}
                                }
                            }, "tab2": {"title": "Popcode Graph", "graphView": {"visName": "wine"}}
                        },
                        "screenButtons": {
                            "ok": {
                                "title": "Ok",
                                "action": [{"operation": "navigate", "resetStack": true, "screen": "Home"}]
                            }
                        }
                    }
                },
                "contractLib": {
                    "name": "Wine SmartContract Library",
                    "version": "1.0",
                    "slug": "wine_1_0",
                    "libs": ["base64_Y2xhc3MgU21hcnRDb250cmFjdEJhc2UgewogIGNvbnN0cnVjdG9yKGhvb2tzKSB7CiAgICAgIHRoaXMuaG9va3MgPSBob29rczsKICAgICAgdGhpcy5zdGF0ZSA9IGhvb2tzLnN0YXRlOwogICAgICB0aGlzLmRlYnVnTG9nID0gaG9va3MuZGVidWdMb2c7CiAgICAgIHRoaXMuZGVidWdMb2coJ2NvbnN0cnVjdCBTbWFydENvbnRyYWN0QmFzZScpOwogIH0KICBkZWJ1Z1NpemUobykgewogICAgdmFyIHMgPSBKU09OLnN0cmluZ2lmeShvKTsKICAgIHRoaXMuZGVidWdMb2coYHNpemU6ICR7cy5sZW5ndGgvMTAyNH0ga2ApOwogIH0KICBhc3luYyBieU5hbWUocE5hbWUpIHsKICAgIHZhciBhcGkgPSB0aGlzLmhvb2tzLnN0YWNrLmFwaTsKICAgIHZhciB1cmwgPSAnL3AvbmFtZS8nICsgcE5hbWU7CiAgICBjb25zdCByZXMgPSBhd2FpdCBhcGkuZ2V0KHVybCk7CiAgICByZXR1cm4gcmVzLmJvZHk7CiAgfQogIGFzeW5jIG9uZUJ5TmFtZShwTmFtZSkgewogICAgdmFyIF8gPSB0aGlzLmhvb2tzLl87CiAgICB2YXIgYXBpID0gdGhpcy5ob29rcy5zdGFjay5hcGk7CiAgICB2YXIgdXJsID0gJy9wL25hbWUvJyArIHBOYW1lOwogICAgY29uc3QgcmVzID0gYXdhaXQgYXBpLmdldCh1cmwpOwogICAgdmFyIHBvcGNvZGVzID0gIV8uaXNOaWwocmVzKQogICAgICYmICFfLmlzTmlsKHJlcy5ib2R5KQogICAgICYmICFfLmlzTmlsKHJlcy5ib2R5LnBvcGNvZGVzKSA/IHJlcy5ib2R5LnBvcGNvZGVzIDogbnVsbDsKICAgIHZhciBwb3Bjb2RlID0gXy5pc0FycmF5KHBvcGNvZGVzKSAmJiBwb3Bjb2Rlcy5sZW5ndGggPiAwCiAgICAgPyBwb3Bjb2Rlc1swXSA6IG51bGw7CiAgICByZXR1cm4gcG9wY29kZTsKICB9CiAgYXN5bmMgYmFsYW5jZShhZGRyZXNzKSB7CiAgICB2YXIgYXBpID0gdGhpcy5ob29rcy5zdGFjay5hcGk7CiAgICB2YXIgdXJsID0gJy9wL2JhbGFuY2UvJyArIGFkZHJlc3M7CiAgICBjb25zdCByZXMgPSBhd2FpdCBhcGkuZ2V0KHVybCk7CiAgICByZXR1cm4gcmVzLmJvZHk7CiAgfQogIGFzeW5jIGdlbmVyYXRlKCkgewogICAgdmFyIGFwaSA9IHRoaXMuaG9va3Muc3RhY2suYXBpOwogICAgdmFyIHVybCA9ICcvcC9nZW5lcmF0ZSc7CiAgICBjb25zdCByZXMgPSBhd2FpdCBhcGkuZ2V0KHVybCk7CiAgICByZXR1cm4gcmVzLmJvZHk7CiAgfQogIGFzeW5jIGNvbnRhaW5lclBvcGNvZGUoYWRkcmVzcykgewogICAgdmFyIGFwaSA9IHRoaXMuaG9va3Muc3RhY2suYXBpQ2F5bGV5OwogICAgdmFyIHVybCA9ICcvY29udGFpbmVyUG9wY29kZS8nICsgYWRkcmVzczsKICAgIGNvbnN0IHJlcyA9IGF3YWl0IGFwaS5nZXQodXJsKTsKICAgIHJldHVybiByZXMuYm9keTsKICB9CiAgYXN5bmMgYm9tUG9wY29kZXMoYWRkcmVzcykgewogICAgdmFyIGFwaSA9IHRoaXMuaG9va3Muc3RhY2suYXBpQ2F5bGV5OwogICAgdmFyIHVybCA9ICcvYm9tUG9wY29kZXMvJyArIGFkZHJlc3M7CiAgICBjb25zdCByZXMgPSBhd2FpdCBhcGkuZ2V0KHVybCk7CiAgICByZXR1cm4gcmVzLmJvZHk7CiAgfQogIGFzeW5jIHNpZ25NZXNzYWdlKGZpZWxkcyxwcml2YXRlS2V5KSB7CiAgICB2YXIgYXBpID0gdGhpcy5ob29rcy5zdGFjay5hcGk7CiAgICB2YXIgYm9keSA9IHsKICAgICAgZmllbGRzLAogICAgICBwcml2YXRlS2V5CiAgICB9OwogICAgdmFyIHVybCA9ICcvY3J5cHRvL3NpZ25NZXNzYWdlJzsKICAgIHRoaXMuZGVidWdMb2coJyoqKioqKioqKioqIHNpZ25NZXNzYWdlJyk7CiAgICB0aGlzLmRlYnVnTG9nKHtib2R5fSk7CiAgICBjb25zdCByZXMgPSBhd2FpdCBhcGkucG9zdCh1cmwsIHtib2R5fSk7CiAgICB0aGlzLmRlYnVnTG9nKHtib2R5OiByZXMuYm9keX0pOwogICAgcmV0dXJuIHJlcy5ib2R5OwogIH0KICBhc3luYyBibG9iQ3JlYXRlV2l0aFNpZyhzaWcsYWRkcmVzcyxkYXRhLHB1YmxpY0tleSkgewogICAgdmFyIGFwaSA9IHRoaXMuaG9va3Muc3RhY2suYXBpOwogICAgdmFyIGJvZHkgPSB7CiAgICAgIHNpZywKICAgICAgYWRkcmVzcywKICAgICAgcHVibGljS2V5LAogICAgICBkYXRhCiAgICB9OwogICAgdmFyIHVybCA9ICcvcC9ibG9iQ3JlYXRlV2l0aFNpZyc7CiAgICBjb25zdCByZXMgPSBhd2FpdCBhcGkucG9zdCh1cmwsIHtib2R5fSk7CiAgICByZXR1cm4gcmVzLmJvZHk7CiAgfQogIGFzeW5jIGJsb2JDcmVhdGUoYWRkcmVzcyxkYXRhLHB1YmxpY0tleSxwcml2YXRlS2V5KSB7CiAgICB2YXIgZmllbGRzID0gW107CgogICAgdmFyIHJlcyA9IGF3YWl0IHRoaXMuYmFsYW5jZShhZGRyZXNzKTsKICAgIGZpZWxkcy5wdXNoKHJlcy5iYWxhbmNlLkNvdW50ZXIpOwogICAgZmllbGRzLnB1c2goYWRkcmVzcyk7CiAgICBmaWVsZHMucHVzaChkYXRhKTsKCiAgICByZXMgPSBhd2FpdCB0aGlzLnNpZ25NZXNzYWdlKGZpZWxkcyxwcml2YXRlS2V5KTsKCiAgICByZXMgPSBhd2FpdCB0aGlzLmJsb2JDcmVhdGVXaXRoU2lnKHJlcy5zaWcsYWRkcmVzcyxkYXRhLHB1YmxpY0tleSk7CgogICAgcmV0dXJuIHJlczsKICB9CiAgYXN5bmMgbWludChzaWcsYWRkcmVzcyxkYXRhLHB1YmxpY0tleSxhbW91bnQsdW5pdCkgewogICAgdmFyIGFwaSA9IHRoaXMuaG9va3Muc3RhY2suYXBpOwogICAgdmFyIGJvZHkgPSB7CiAgICAgIHNpZywKICAgICAgYWRkcmVzcywKICAgICAgcHVibGljS2V5LAogICAgICBhbW91bnQsCiAgICAgIHVuaXQsCiAgICAgIGRhdGEKICAgIH07CiAgICB0aGlzLmRlYnVnTG9nKCcqKioqKioqKioqKiBkbyBtaW50Jyk7CiAgICB0aGlzLmRlYnVnTG9nKHtib2R5fSk7CiAgICB0aGlzLmRlYnVnTG9nKHthcGl9KTsKICAgIHRoaXMuZGVidWdTaXplKGJvZHkpOwogICAgdmFyIHVybCA9ICcvcC9taW50JzsKICAgIGNvbnN0IHJlcyA9IGF3YWl0IGFwaS5wb3N0KHVybCwge2JvZHl9KTsKICAgIHRoaXMuZGVidWdMb2coJyoqKioqKioqKioqIG1pbnQgcmVzdWx0Jyk7CiAgICB0aGlzLmRlYnVnTG9nKHJlcyk7CiAgICByZXR1cm4gcmVzOwogIH0KICBhc3luYyBzaWduQW5kTWludChhZGRyZXNzLGRhdGEscHVibGljS2V5LGFtb3VudCx1bml0LHByaXZhdGVLZXkpIHsKICAgIHRoaXMuZGVidWdMb2coJ3NpZ25BbmRNaW50Jyk7CiAgICB0aGlzLmRlYnVnTG9nKHthZGRyZXNzLGRhdGEscHVibGljS2V5LGFtb3VudCx1bml0LHByaXZhdGVLZXl9KTsKICAgIHZhciBmaWVsZHMgPSBbXTsKICAgIHZhciB7IGJhbGFuY2UgfSA9IGF3YWl0IHRoaXMuYmFsYW5jZShhZGRyZXNzKTsKICAgIC8vIHRoaXMuZGVidWdMb2coJyMjIyMjIyMjIyMjIyMjIyMgYmFsYW5jZS5Db3VudGVyOiAnICsgYmFsYW5jZS5Db3VudGVyKTsKICAgIGZpZWxkcy5wdXNoKGJhbGFuY2UuQ291bnRlcik7CiAgICBmaWVsZHMucHVzaChhZGRyZXNzKTsKICAgIGZpZWxkcy5wdXNoKGFtb3VudCk7CiAgICBmaWVsZHMucHVzaCh1bml0KTsKICAgIGZpZWxkcy5wdXNoKGRhdGEpOwoKICAgIHZhciB7IHNpZyB9ID0gYXdhaXQgdGhpcy5zaWduTWVzc2FnZShmaWVsZHMscHJpdmF0ZUtleSk7CgogICAgdmFyIHJlcyA9IGF3YWl0IHRoaXMubWludChzaWcsYWRkcmVzcyxkYXRhLHB1YmxpY0tleSxhbW91bnQsdW5pdCk7CgogICAgcmV0dXJuIHJlczsKICB9CiAgYXN5bmMgd2l0aGRyYXcoc2lnLHByaXZhdGVLZXksZGVzdEFkZHJlc3MsZGVzdEFtb3VudCxkYXRhLHNvdXJjZU91dHB1dCkgewogICAgdmFyIGFwaSA9IHRoaXMuaG9va3Muc3RhY2suYXBpOwogICAgdmFyIGJvZHkgPSB7CiAgICAgIHNpZywKICAgICAgcHJpdmF0ZUtleSwKICAgICAgZGVzdEFkZHJlc3MsCiAgICAgIGRlc3RBbW91bnQsCiAgICAgIGRhdGEsCiAgICAgIHNvdXJjZU91dHB1dAogICAgfTsKICAgIHRoaXMuZGVidWdMb2coJyoqKioqKioqKioqIHdpdGhkcmF3Jyk7CiAgICB0aGlzLmRlYnVnTG9nKHtib2R5fSk7CiAgICB2YXIgdXJsID0gJy9wL3dpdGhkcmF3JzsKICAgIGNvbnN0IHJlcyA9IGF3YWl0IGFwaS5wb3N0KHVybCwge2JvZHl9KTsKICAgIHJldHVybiByZXM7CiAgfQogIGFzeW5jIHNpZ25BbmRXaXRoZHJhdyhwcml2YXRlS2V5LHNvdXJjZUFkZHJlc3MsZGVzdEFkZHJlc3MsZGVzdEFtb3VudCxkYXRhLHNvdXJjZU91dHB1dCkgewogICAgdGhpcy5kZWJ1Z0xvZygnc2lnbkFuZFdpdGhkcmF3Jyk7CiAgICB0aGlzLmRlYnVnTG9nKHtwcml2YXRlS2V5LHNvdXJjZUFkZHJlc3MsZGVzdEFkZHJlc3MsZGVzdEFtb3VudCxkYXRhLHNvdXJjZU91dHB1dH0pOwogICAgdmFyIGZpZWxkcyA9IFtdOwogICAgdmFyIHsgYmFsYW5jZSB9ID0gYXdhaXQgdGhpcy5iYWxhbmNlKHNvdXJjZUFkZHJlc3MpOwogICAgLy8gdGhpcy5kZWJ1Z0xvZygnIyMjIyMjIyMjIyMjIyMjIyBiYWxhbmNlLkNvdW50ZXI6ICcgKyBiYWxhbmNlLkNvdW50ZXIpOwogICAgZmllbGRzLnB1c2goYmFsYW5jZS5Db3VudGVyKTsKICAgIGZpZWxkcy5wdXNoKGRlc3RBZGRyZXNzKTsKICAgIGZpZWxkcy5wdXNoKGRhdGEpOwogICAgZmllbGRzLnB1c2goc291cmNlT3V0cHV0KTsKICAgIGZpZWxkcy5wdXNoKGRlc3RBbW91bnQpOwoKICAgIHZhciB7IHNpZyB9ID0gYXdhaXQgdGhpcy5zaWduTWVzc2FnZShmaWVsZHMscHJpdmF0ZUtleSk7CgogICAgdmFyIHJlcyA9IGF3YWl0IHRoaXMud2l0aGRyYXcoc2lnLHByaXZhdGVLZXksZGVzdEFkZHJlc3MsZGVzdEFtb3VudCxkYXRhLHNvdXJjZU91dHB1dCk7CgogICAgcmV0dXJuIHJlczsKICB9CiAgYXN5bmMgYm9tVXBkYXRlV2l0aFNpZyhzaWcsYWRkcmVzcyxwdWJsaWNLZXksYm9tT3AsYm9tQWRkcmVzcykgewogICAgdmFyIGFwaSA9IHRoaXMuaG9va3Muc3RhY2suYXBpOwogICAgdmFyIGJvZHkgPSB7CiAgICAgIHNpZywKICAgICAgYWRkcmVzcywKICAgICAgcHVibGljS2V5LAogICAgICBib21PcCwKICAgICAgYm9tQWRkcmVzcwogICAgfTsKICAgIHRoaXMuZGVidWdMb2coJyoqKioqKioqKioqIGRvIGJvbVVwZGF0ZScpOwogICAgdGhpcy5kZWJ1Z0xvZyh7Ym9keX0pOwogICAgdGhpcy5kZWJ1Z0xvZyh7YXBpfSk7CiAgICB0aGlzLmRlYnVnU2l6ZShib2R5KTsKICAgIHZhciB1cmwgPSAnL3AvYm9tVXBkYXRlV2l0aFNpZyc7CiAgICBjb25zdCByZXMgPSBhd2FpdCBhcGkucG9zdCh1cmwsIHtib2R5fSk7CiAgICB0aGlzLmRlYnVnTG9nKCcqKioqKioqKioqKiBib21VcGRhdGUgcmVzdWx0Jyk7CiAgICB0aGlzLmRlYnVnTG9nKHJlcyk7CiAgICByZXR1cm4gcmVzOwogIH0KICBhc3luYyBzaWduQW5kVXBkYXRlQm9tKGFkZHJlc3MscHVibGljS2V5LGJvbU9wLGJvbUFkZHJlc3MscHJpdmF0ZUtleSkgewogICAgdGhpcy5kZWJ1Z0xvZygnc2lnbkFuZFVwZGF0ZUJvbScpOwogICAgdGhpcy5kZWJ1Z0xvZyh7YWRkcmVzcyxwdWJsaWNLZXksYm9tT3AsYm9tQWRkcmVzcyxwcml2YXRlS2V5fSk7CiAgICB2YXIgZmllbGRzID0gW107CiAgICB2YXIgeyBiYWxhbmNlIH0gPSBhd2FpdCB0aGlzLmJhbGFuY2UoYWRkcmVzcyk7CiAgICAvLyB0aGlzLmRlYnVnTG9nKCcjIyMjIyMjIyMjIyMjIyMjIGJhbGFuY2UuQ291bnRlcjogJyArIGJhbGFuY2UuQ291bnRlcik7CiAgICBmaWVsZHMucHVzaChiYWxhbmNlLkNvdW50ZXIpOwogICAgZmllbGRzLnB1c2goYWRkcmVzcyk7CiAgICBmaWVsZHMucHVzaChib21PcCk7CiAgICBmaWVsZHMucHVzaChib21BZGRyZXNzKTsKCiAgICB2YXIgeyBzaWcgfSA9IGF3YWl0IHRoaXMuc2lnbk1lc3NhZ2UoZmllbGRzLHByaXZhdGVLZXkpOwoKICAgIHZhciByZXMgPSBhd2FpdCB0aGlzLmJvbVVwZGF0ZVdpdGhTaWcoc2lnLGFkZHJlc3MscHVibGljS2V5LGJvbU9wLGJvbUFkZHJlc3MpOwoKICAgIHJldHVybiByZXM7CiAgfQp9Owo=", "base64_Y2xhc3MgU21hcnRDb250cmFjdCBleHRlbmRzIFNtYXJ0Q29udHJhY3RCYXNlIHsKICBjb25zdHJ1Y3Rvcihob29rcykgewogICAgICBzdXBlcihob29rcykKICAgICAgdGhpcy5kZWJ1Z0xvZygnKioqKioqKioqKioqKiogU21hcnRDb250cmFjdCcpOwogIH0KCiAgYXN5bmMgZWNobygpIHsKICAgICAgdGhpcy5kZWJ1Z0xvZygnZWNobycpOwogICAgICB2YXIgcnZhbCA9IHsKICAgICAgICAgIGRhdGE6ICdoZWxsbycKICAgICAgfTsKICAgICAgdGhpcy5ob29rcy5maW5pc2gucmVzb2x2ZShydmFsKTsKICB9CgogIGFzeW5jIHdpbmVtYWtlck1pbnRPaygpIHsgCiAgICB0aGlzLmRlYnVnTG9nKCdleGVjdXRlIHdpbmVtYWtlck1pbnRPaycpOwogICAgICB2YXIgXyA9IHRoaXMuaG9va3MuXzsKICAgICAgdmFyIHNzID0gdGhpcy5ob29rcy5zY3JlZW5TdGF0ZTsKICAgICAgdmFyIGFwcCA9IHRoaXMuaG9va3MuYXBwOwogICAgICB2YXIgdXNlckNyZWRlbnRpYWxzID0gYXBwLmdldEFwcFN0YXRlKCd1c2VyQ3JlZGVudGlhbHMnKTsKICAgICAgdmFyIHB1YmxpY0tleSA9IHVzZXJDcmVkZW50aWFscy5wdWJsaWNLZXk7CiAgICAgIHZhciBwcml2YXRlS2V5ID0gdXNlckNyZWRlbnRpYWxzLnByaXZhdGVLZXk7CiAgICAgIHZhciB3b3JrZmxvdyA9IHNzLndvcmtmbG93OwogICAgICB2YXIgbmV3SWQgPSB0aGlzLmhvb2tzLnNob3J0aWQuZ2VuZXJhdGUoKTsKICAgICAgdmFyIHBvcGNvZGVOYW1lID0gJ1dpbmVfJyArIG5ld0lkOwogICAgICB2YXIgeyBmb3JtIH0gPSB0aGlzLnN0YXRlOwogICAgICB0aGlzLmRlYnVnTG9nKGZvcm0pOwogICAgICB2YXIgeyBwb3Bjb2RlIH0gPSBhd2FpdCB0aGlzLmdlbmVyYXRlKCk7CiAgICAgIHZhciB7IGFkZHJlc3MgfSA9IHBvcGNvZGU7CiAgICAgIHZhciBuZXh0U3BvdCA9ICd0cnVja2VyLnBpY2t1cCc7CiAgICAgIHZhciBhbW91bnQgPSB0aGlzLnRvSW50ZWdlcihmb3JtLm1pbnRXaW5lQm90dGxlcy5BbW91bnQpOwogICAgICB2YXIgdW5pdCA9IGZvcm0ubWludFdpbmVCb3R0bGVzLlVuaXQ7CiAgICAgIHRoaXMuZGVidWdMb2coJyMjIyMjIyMjIyMjIyMlJSUlJSUlJSUlJSUlJCQkJCQkJCQkJCQkJCQgIGdlbmVyYXRlZCB3aW5lbWFrZXIgcG9wY29kZTonKTsKICAgICAgdGhpcy5kZWJ1Z0xvZyh7cG9wY29kZU5hbWUscG9wY29kZX0pOwogICAgICAKICAgICAgdmFyIGRhdGEgPQogICAgICAgICAgewogICAgICAgICAgICAiYXBwRGF0YSI6IHsKICAgICAgICAgICAgICAid29ya2Zsb3dEYXRhIjogZm9ybSwKICAgICAgICAgICAgICAid2luZUJvdHRsZXMiOiBhbW91bnQsCiAgICAgICAgICAgICAgIndpbmVVbml0IjogdW5pdCwKICAgICAgICAgICAgICAic3BvdCI6IG5leHRTcG90LAogICAgICAgICAgICAgICJ3b3JrZmxvd05hbWUiOiBzcy53b3JrZmxvdy5uYW1lLAogICAgICAgICAgICAgICJ3b3JrZmxvd0luc3RhbmNlSWQiOiBuZXdJZCwKICAgICAgICAgICAgICAid29ya2Zsb3dSb290UG9wY29kZSI6ICJ0cnVlIiwKICAgICAgICAgICAgICBwb3Bjb2RlTmFtZSAsCiAgICAgICAgICAgICAgIndvcmtmbG93RGVmIjogd29ya2Zsb3cKICAgICAgICAgICAgfQogICAgICAgICAgfTsKCiAgICAgIHRoaXMuZGVidWdMb2coZGF0YSk7CgogICAgICB2YXIgcmVzID0gYXdhaXQgdGhpcy5zaWduQW5kTWludChhZGRyZXNzLGRhdGEscHVibGljS2V5LGFtb3VudCx1bml0LHByaXZhdGVLZXkpOwogICAgICAvLyB0aGlzLmRlYnVnTG9nKCd0aGlzLnNpZ25BbmRNaW50IHJlcy5ib2R5LmtleXM6ICcgKyBPYmplY3Qua2V5cyhyZXMuYm9keSkpOwoKICAgICAgdmFyIHJ2YWwgPSB7CiAgICAgICAgICBhY3Rpb246IFtdCiAgICAgIH07CiAgICAgIHRoaXMuaG9va3MuZmluaXNoLnJlc29sdmUocnZhbCk7CiAgICAgIHJldHVybiBhZGRyZXNzOwogICAgCiAgfQogIHRvSW50ZWdlcih2YWx1ZSkgewogICAgdmFyIF8gPSB0aGlzLmhvb2tzLl87CiAgICBpZihfLmlzU3RyaW5nKHZhbHVlKSkKICAgICAgcmV0dXJuIHBhcnNlSW50KHZhbHVlKTsKICAgIGVsc2UKICAgICAgcmV0dXJuIHZhbHVlOwogIH0KICBhc3luYyB0cnVja2VyUGlja3VwT2soKSB7IAogICAgdGhpcy5kZWJ1Z0xvZygnZXhlY3V0ZSB0cnVja2VyUGlja3VwT2snKTsKICAgIHZhciBmb3JtID0gdGhpcy5zdGF0ZS5mb3JtOwogICAgdGhpcy5kZWJ1Z0xvZyh7Zm9ybX0pOwogICAgCiAgICB2YXIgcnZhbCA9IHsKICAgICAgICBhY3Rpb246IFtdCiAgICB9OwoKICAgIHZhciBfID0gdGhpcy5ob29rcy5fOwogICAgdmFyIHNzID0gdGhpcy5ob29rcy5zY3JlZW5TdGF0ZTsKICAgIHZhciBhcHAgPSB0aGlzLmhvb2tzLmFwcDsKICAgIHZhciB3b3JrZmxvdyA9IHNzLndvcmtmbG93OwogICAgCiAgICB2YXIgdXNlckNyZWRlbnRpYWxzID0gYXBwLmdldEFwcFN0YXRlKCd1c2VyQ3JlZGVudGlhbHMnKTsKICAgIHZhciB1c2VyUHVibGljS2V5ID0gdXNlckNyZWRlbnRpYWxzLnB1YmxpY0tleTsKICAgIHZhciB1c2VyUHJpdmF0ZUtleSA9IHVzZXJDcmVkZW50aWFscy5wcml2YXRlS2V5OwogICAgCiAgICB2YXIgc3JjUG9wY29kZSA9IHRoaXMuc3RhdGUucG9wY29kZTsKICAgIAoKICAgIHZhciBkZXN0QW1vdW50ID0gdGhpcy50b0ludGVnZXIodGhpcy5zdGF0ZS5mb3JtLndpdGhkcmF3LnBpY2t1cEFtb3VudCk7CiAgICB2YXIgZGVzdE5hbWUgPSAiVHJ1Y2tfIiArIHVzZXJDcmVkZW50aWFscy5zZXNzaW9uSWQ7CiAgICAKICAgIHZhciBkYXRhID0geyBkZXNjcmlwdGlvbjogYHdpdGhkcmF3ICR7ZGVzdEFtb3VudH0gYm90dGxlcyBvZiB3aW5lYCB9OwogICAgdmFyIHNvdXJjZU91dHB1dCA9IDA7CiAgICAKICAgIHRoaXMuZGVidWdMb2coJ2dldCB0cnVjayBwb3Bjb2RlOiAnICsgZGVzdE5hbWUpOwogICAgdmFyIHRydWNrUG9wY29kZSA9IGF3YWl0IHRoaXMub25lQnlOYW1lKGRlc3ROYW1lKTsKICAgIHRoaXMuZGVidWdMb2codHJ1Y2tQb3Bjb2RlKTsKICAgICAKICAgIHRoaXMuZGVidWdMb2coJ2NoZWNrIHNvdXJjZSB3aW5lIGJvdHRsZSBjb3VudCcpOwogICAgdmFyIHdpbmVCb3R0bGVzID0gdGhpcy50b0ludGVnZXIoc3JjUG9wY29kZS5hcHBEYXRhLndpbmVCb3R0bGVzKTsKICAgIHZhciB3aW5lVW5pdCA9IHNyY1BvcGNvZGUuYXBwRGF0YS53aW5lVW5pdDsKICAgIHRoaXMuZGVidWdMb2coe3NyY1BvcGNvZGV9KTsKICAgIHRoaXMuZGVidWdMb2coe3dpbmVCb3R0bGVzLGRlc3RBbW91bnQsd2luZVVuaXR9KTsKICAgIAogICAgaWYoXy5pc05pbChkZXN0QW1vdW50KSB8fCBfLmlzTmFOKGRlc3RBbW91bnQpKSB7CiAgICAgIHRoaXMuZGVidWdMb2coJyoqKioqKioqKioqKioqKioqKiBlcnJvciBiYWQgZGVzdEFtb3VudCknKTsKICAgICAgdGhpcy5ob29rcy5maW5pc2gucmVzb2x2ZShydmFsKTsKICAgICAgcmV0dXJuIDsKICAgIH0KICAgIAogICAgaWYoXy5pc05pbCh3aW5lQm90dGxlcykgfHwgXy5pc05hTihkZXN0QW1vdW50KSkgewogICAgICB0aGlzLmRlYnVnTG9nKCcqKioqKioqKioqKioqKioqKiogZXJyb3IgYmFkIHdpbmVCb3R0bGVzJyk7CiAgICAgIHRoaXMuaG9va3MuZmluaXNoLnJlc29sdmUocnZhbCk7CiAgICAgIHJldHVybiA7CiAgICB9CiAgICAKICAgIGlmKGRlc3RBbW91bnQgPiB3aW5lQm90dGxlcykgewogICAgICB0aGlzLmRlYnVnTG9nKCcqKioqKioqKioqKioqKioqKiogZXJyb3IgZGVzdEFtb3VudCA+IHdpbmVCb3R0bGVzJyk7CiAgICAgIHRoaXMuaG9va3MuZmluaXNoLnJlc29sdmUocnZhbCk7CiAgICAgIHJldHVybiA7CiAgICB9CiAgICAgCiAgICB2YXIgdHJ1Y2tCb3R0bGVzOwogICAgaWYgKF8uaXNOaWwodHJ1Y2tQb3Bjb2RlKSkgewogICAgICB0aGlzLmRlYnVnTG9nKCdNaW50aW5nIHRydWNrIHBvcGNvZGU6ICcgKyBkZXN0TmFtZSk7CiAgICAgIHZhciB0cnVja1Nwb3QgPSAndHJ1Y2tlci5zaG93JzsKICAgICAgdmFyIG5ld0lkID0gdGhpcy5ob29rcy5zaG9ydGlkLmdlbmVyYXRlKCk7CiAgICAgIHZhciB0cnVja1N0YXJ0QW1vdW50ID0gMDsKICAgICAgdmFyIHRydWNrVW5pdCA9ICdib3R0bGVzIG9mIHdpbmUnOwogICAgICB0cnVja0JvdHRsZXMgPSAwOwogICAgICB2YXIgdHJ1Y2tEYXRhID0KICAgICAgICAgIHsKICAgICAgICAgICAgImFwcERhdGEiOiB7CiAgICAgICAgICAgICAgIndvcmtmbG93RGF0YSI6IHt9LAogICAgICAgICAgICAgICJzcG90IjogdHJ1Y2tTcG90LAogICAgICAgICAgICAgICJ3aW5lQm90dGxlcyI6IHRydWNrQm90dGxlcywKICAgICAgICAgICAgICAid2luZVVuaXQiOiB3aW5lVW5pdCwKICAgICAgICAgICAgICAid29ya2Zsb3dOYW1lIjogc3Mud29ya2Zsb3cubmFtZSwKICAgICAgICAgICAgICAid29ya2Zsb3dJbnN0YW5jZUlkIjogbmV3SWQsCiAgICAgICAgICAgICAgIndvcmtmbG93Um9vdFBvcGNvZGUiOiAidHJ1ZSIsCiAgICAgICAgICAgICAgcG9wY29kZU5hbWU6IGRlc3ROYW1lLAogICAgICAgICAgICAgICJ3b3JrZmxvd0RlZiI6IHdvcmtmbG93CiAgICAgICAgICAgIH0KICAgICAgICAgIH07CiAgICAgIHZhciBuZXdQb3Bjb2RlID0gYXdhaXQgdGhpcy5nZW5lcmF0ZSgpOwogICAgICB2YXIgdHJ1Y2tBZGRyZXNzID0gbmV3UG9wY29kZS5wb3Bjb2RlLmFkZHJlc3M7CiAgICAgIAogICAgICB2YXIgcmVzID0gYXdhaXQgdGhpcy5zaWduQW5kTWludCh0cnVja0FkZHJlc3MsdHJ1Y2tEYXRhLHVzZXJQdWJsaWNLZXksdHJ1Y2tTdGFydEFtb3VudCx0cnVja1VuaXQsdXNlclByaXZhdGVLZXkpOwogICAgICAKICAgICAgdHJ1Y2tQb3Bjb2RlID0gYXdhaXQgdGhpcy5vbmVCeU5hbWUoZGVzdE5hbWUpOwogICAgfQogICAgZWxzZSB7CiAgICAgIHRoaXMuZGVidWdMb2coJ0ZvdW5kIGV4aXN0aW5nIHRydWNrIHBvcGNvZGU6ICcgKyBkZXN0TmFtZSk7CiAgICAgIHRydWNrQm90dGxlcyA9IHRydWNrUG9wY29kZS5hcHBEYXRhLndpbmVCb3R0bGVzOwogICAgfQogICAgCiAgICBpZihfLmlzTmlsKHRydWNrUG9wY29kZSkpIHsKICAgICAgdGhpcy5kZWJ1Z0xvZygnKioqKioqKioqKioqKioqKioqIEVycm9yIG1pbnRpbmcgdHJ1Y2sgcG9wY29kZScpOwogICAgICB0aGlzLmhvb2tzLmZpbmlzaC5yZXNvbHZlKHJ2YWwpOwogICAgICByZXR1cm4gOwogICAgfQogICAgCiAgICB0aGlzLmRlYnVnTG9nKCcjIyMjIyMjIyMjIyMjIyMjIHRydWNrIHBvcGNvZGU6Jyk7CiAgICB0aGlzLmRlYnVnTG9nKHRydWNrUG9wY29kZSk7CiAgICAKICAgIHZhciB3cmVzID0gYXdhaXQgdGhpcy5zaWduQW5kV2l0aGRyYXcoCiAgICAgIHNyY1BvcGNvZGUucHJpdmF0ZUtleSwKICAgICAgc3JjUG9wY29kZS5hZGRyZXNzLAogICAgICB0cnVja1BvcGNvZGUuYWRkcmVzcywKICAgICAgZGVzdEFtb3VudCwKICAgICAgZGF0YSwKICAgICAgc291cmNlT3V0cHV0CiAgICApOwogICAgCiAgICB0aGlzLmRlYnVnTG9nKCcjIyMjIyMjIyMjIyMjIyMjIHdpdGhkcmF3IHJlc3VsdDonKTsKICAgIHRoaXMuZGVidWdMb2cod3Jlcyk7CiAgICBydmFsLndyZXMgPSB3cmVzOwogICAgCiAgICB0aGlzLmRlYnVnTG9nKCcjIyMjIyMjIyMjIyMjIyMjIHVwZGF0ZSBzb3VyY2Ugd2luZSBib3R0bGUgY291bnQ6Jyk7CiAgICB2YXIgd2luZUNvdW50ID0gd2luZUJvdHRsZXMgLSBkZXN0QW1vdW50OwogICAgdmFyIHdpbmVEYXRhID0KICAgICAgICB7CiAgICAgICAgICAiYXBwRGF0YSI6IHsKICAgICAgICAgICAgIndpbmVCb3R0bGVzIjogd2luZUNvdW50CiAgICAgICAgICB9CiAgICAgICAgfTsKCiAgICB0aGlzLmRlYnVnTG9nKHdpbmVEYXRhKTsKICAgIHZhciBicmVzID0gYXdhaXQgdGhpcy5ibG9iQ3JlYXRlKAogICAgICBzcmNQb3Bjb2RlLmFkZHJlc3MsCiAgICAgIHdpbmVEYXRhLAogICAgICB1c2VyQ3JlZGVudGlhbHMucHVibGljS2V5LAogICAgICB1c2VyQ3JlZGVudGlhbHMucHJpdmF0ZUtleSk7CiAgICAgIAogICAgdGhpcy5kZWJ1Z0xvZygnIyMjIyMjIyMjIyMjIyMjIyBibG9iQ3JlYXRlIHJlc3VsdDonKTsKICAgIHRoaXMuZGVidWdMb2coYnJlcyk7CiAgICBydmFsLmJyZXMgPSBicmVzOwogICAgCiAgICB0aGlzLmRlYnVnTG9nKCcjIyMjIyMjIyMjIyMjIyMjIHVwZGF0ZSB0cnVjayB3aW5lIGJvdHRsZSBjb3VudDonKTsKICAgIHZhciB0cnVja0NvdW50ID0gdHJ1Y2tCb3R0bGVzICsgZGVzdEFtb3VudDsKICAgIHZhciB0cnVja1dpbmVEYXRhID0KICAgICAgICB7CiAgICAgICAgICAiYXBwRGF0YSI6IHsKICAgICAgICAgICAgIndpbmVCb3R0bGVzIjogdHJ1Y2tDb3VudAogICAgICAgICAgfQogICAgICAgIH07CgogICAgdGhpcy5kZWJ1Z0xvZyh0cnVja1dpbmVEYXRhKTsKICAgIHZhciBicmVzMiA9IGF3YWl0IHRoaXMuYmxvYkNyZWF0ZSgKICAgICAgdHJ1Y2tQb3Bjb2RlLmFkZHJlc3MsCiAgICAgIHRydWNrV2luZURhdGEsCiAgICAgIHVzZXJDcmVkZW50aWFscy5wdWJsaWNLZXksCiAgICAgIHVzZXJDcmVkZW50aWFscy5wcml2YXRlS2V5KTsKICAgICAgCiAgICB0aGlzLmRlYnVnTG9nKCcjIyMjIyMjIyMjIyMjIyMjIHRydWNrIGJsb2JDcmVhdGUgcmVzdWx0OicpOwogICAgdGhpcy5kZWJ1Z0xvZyhicmVzMik7CiAgICBydmFsLmJyZXMyID0gYnJlczI7CiAgICAKICAgIHRoaXMuaG9va3MuZmluaXNoLnJlc29sdmUocnZhbCk7CiAgIH0KCn07Cg=="]
                }
            },
            "timestamp": 1520232308155
        },
        "publicKey": "035e217f4f36a97056830955fd23ca2fc1b6a3986336080c1f86fb92aaecb9d34f",
        "spot": "trucker.pickup",
        "unit": "bottles of wine",
        "privateKey": "3bdfe8d06cafe40a161da4ac3272f24d7b82fc71d83784329640878e41228617",
        "type": "popcode",
        "popcodeName": "Wine_PK9CFQEVS",
        "amount": "1000",
        "creatorPublicKey": "AzFSqglD2Tz0BHF7fyc5OZ0NYkqslptvM8W2ghgAjmAN",
        "workflowDef": {
            "title": "Wine V1",
            "name": "wineV1",
            "startScreen": "Home",
            "version": "2.0",
            "steps": {
                "winemaker.mint": {
                    "step": "winemaker.mint",
                    "title": "Winemaker Mint",
                    "screen": "WinemakerMint"
                },
                "trucker.pickup": {"step": "trucker.pickup", "title": "Trucker Pickup", "screen": "TruckerPickup"},
                "trucker.show": {"step": "trucker.show", "title": "Trucker Show", "screen": "TruckerShow"}
            },
            "appOptions": {"requireLogin": true},
            "screens": {
                "Home": {
                    "name": "Home",
                    "title": "Home",
                    "api": "/api/mobile",
                    "screenListItems": {
                        "fetchItems": "/popcodeByWorkflowName",
                        "method": "get",
                        "api": "cayley",
                        "fetchParameters": {"workflowName": "wineV1"},
                        "itemDataTypes": {"popcode": "object"},
                        "itemLabel": ["popcodeName"],
                        "itemActions": {
                            "click": {
                                "title": "Click",
                                "action": [{
                                    "operation": "startWorkflow",
                                    "replaceCurrent": true,
                                    "parameters": {"spot": "@popcode.spot", "popcode": "@popcode"}
                                }],
                                "parameters": {"popcode": "@item"}
                            }
                        }
                    },
                    "screenButtons": {
                        "scan": {
                            "title": "Scan",
                            "action": [{"operation": "navigate", "screen": "Scan"}],
                            "roles": ["admin", "winemaker", "trucker"]
                        },
                        "mint": {
                            "title": "Mint",
                            "action": [{"operation": "navigate", "resetStack": true, "screen": "WinemakerMint"}],
                            "roles": ["admin", "winemaker"]
                        }
                    }
                },
                "Scan": {
                    "name": "Scan",
                    "title": "Scan",
                    "api": "/api/mobile",
                    "parameters": {"user": "@user"},
                    "modal": false,
                    "screenScan": {},
                    "startAction": [{
                        "operation": "scanBarcode",
                        "barcodeTypes": ["qr", "code128"],
                        "outputs": {"scanData": "@scanData"}
                    }, {
                        "operation": "routePopcode",
                        "parameters": {"scanData": "@scanData"},
                        "outputs": {"address": "@address"}
                    }, {
                        "operation": "fetch",
                        "route": "/p",
                        "method": "get",
                        "parameters": {"address": "@address"},
                        "outputs": {"popcode": "@popcodes[0]"}
                    }, {
                        "operation": "startWorkflow",
                        "replaceCurrent": true,
                        "parameters": {"spot": "@popcode.spot", "popcode": "@popcode"}
                    }]
                },
                "WinemakerMint": {
                    "name": "WinemakerMint",
                    "title": "Winemaker Mint",
                    "api": "/api/mobile",
                    "parameters": {"container": "@container", "popcode": "@popcode", "user": "@user"},
                    "outputs": {"popcode": "@container"},
                    "screenForm": {
                        "fields": {
                            "type": "object",
                            "properties": {
                                "mintWineBottles": {
                                    "type": "object",
                                    "properties": {
                                        "Amount": {
                                            "type": "string",
                                            "value": "1000",
                                            "options": {"editable": true}
                                        },
                                        "Unit": {
                                            "type": "string",
                                            "value": "bottles of wine",
                                            "options": {"editable": true}
                                        }
                                    },
                                    "required": ["Amount", "Unit"]
                                }
                            },
                            "required": ["mintWineBottles"]
                        }, "options": {"auto": "labels"}
                    },
                    "screenButtons": {
                        "mint": {
                            "title": "Mint",
                            "action": [{
                                "operation": "contract",
                                "contract": "winemakerMintOk",
                                "parameters": {"popcode": "@popcode"},
                                "outputs": {"status": "@status", "txId": "@txId"}
                            }, {"operation": "navigate", "resetStack": true, "forceUpdate": true, "screen": "Home"}],
                            "roles": ["admin", "winemaker"]
                        },
                        "cancel": {
                            "title": "Cancel",
                            "action": [{"operation": "navigate", "resetStack": true, "screen": "Home"}]
                        }
                    }
                },
                "TruckerPickup": {
                    "name": "TruckerPickup",
                    "title": "Trucker Wine Pickup",
                    "api": "/api/mobile",
                    "parameters": {"container": "@container", "popcode": "@popcode", "user": "@user"},
                    "outputs": {"popcode": "@container"},
                    "tabs": {
                        "tab1": {
                            "title": "Pickup Wine",
                            "screenForm": {
                                "privateKey": ["winemaker", "admin"],
                                "publicKey": ["winemaker", "trucker", "admin"],
                                "fields": {
                                    "type": "object",
                                    "properties": {
                                        "popcode": {
                                            "type": "object",
                                            "properties": {
                                                "name": {
                                                    "type": "string",
                                                    "value": "@popcode.popcodeName",
                                                    "options": {"editable": false}
                                                },
                                                "address": {
                                                    "type": "string",
                                                    "value": "@popcode.address",
                                                    "options": {"editable": false}
                                                },
                                                "currentState": {
                                                    "type": "string",
                                                    "value": "@popcode.spot",
                                                    "options": {"editable": false}
                                                }
                                            },
                                            "required": ["name", "address", "currentState"]
                                        },
                                        "warehouseContents": {
                                            "type": "object",
                                            "properties": {
                                                "Amount": {
                                                    "type": "number",
                                                    "value": "@popcode.appData.wineBottles",
                                                    "options": {"editable": false}
                                                },
                                                "Unit": {
                                                    "type": "string",
                                                    "value": "@popcode.appData.wineUnit",
                                                    "options": {"editable": false}
                                                }
                                            }
                                        },
                                        "withdraw": {
                                            "type": "object",
                                            "properties": {
                                                "pickupAmount": {
                                                    "type": "number",
                                                    "options": {"editable": true}
                                                }
                                            },
                                            "required": ["pickupAmount"]
                                        }
                                    },
                                    "required": ["withdraw"]
                                },
                                "options": {"auto": "labels"}
                            }
                        }, "tab2": {"title": "Popcode Graph", "graphView": {"visName": "wine"}}
                    },
                    "screenButtons": {
                        "pickup": {
                            "title": "Pickup",
                            "action": [{
                                "operation": "contract",
                                "contract": "truckerPickupOk",
                                "parameters": {"popcode": "@popcode"},
                                "outputs": {"status": "@status", "txId": "@txId"}
                            }, {"operation": "navigate", "resetStack": true, "forceUpdate": true, "screen": "Home"}],
                            "roles": ["admin", "trucker"]
                        },
                        "cancel": {
                            "title": "Cancel",
                            "action": [{"operation": "navigate", "resetStack": true, "screen": "Home"}]
                        }
                    }
                },
                "TruckerShow": {
                    "name": "TruckerShow",
                    "title": "Truck Popcode",
                    "api": "/api/mobile",
                    "parameters": {"container": "@container", "popcode": "@popcode", "user": "@user"},
                    "outputs": {"popcode": "@container"},
                    "tabs": {
                        "tab1": {
                            "title": "Truck Contents",
                            "screenForm": {
                                "privateKey": ["trucker", "admin"],
                                "publicKey": ["winemaker", "trucker", "admin"],
                                "fields": {
                                    "type": "object",
                                    "properties": {
                                        "popcode": {
                                            "type": "object",
                                            "properties": {
                                                "name": {
                                                    "type": "string",
                                                    "value": "@popcode.popcodeName",
                                                    "options": {"editable": false}
                                                },
                                                "address": {
                                                    "type": "string",
                                                    "value": "@popcode.address",
                                                    "options": {"editable": false}
                                                },
                                                "currentState": {
                                                    "type": "string",
                                                    "value": "@popcode.spot",
                                                    "options": {"editable": false}
                                                }
                                            },
                                            "required": ["name", "address", "currentState"]
                                        },
                                        "truckContents": {
                                            "type": "object",
                                            "properties": {
                                                "Amount": {
                                                    "type": "number",
                                                    "value": "@popcode.appData.wineBottles",
                                                    "options": {"editable": false}
                                                },
                                                "Unit": {
                                                    "type": "string",
                                                    "value": "@popcode.appData.wineUnit",
                                                    "options": {"editable": false}
                                                }
                                            }
                                        }
                                    }
                                },
                                "options": {"auto": "labels"}
                            }
                        }, "tab2": {"title": "Popcode Graph", "graphView": {"visName": "wine"}}
                    },
                    "screenButtons": {
                        "ok": {
                            "title": "Ok",
                            "action": [{"operation": "navigate", "resetStack": true, "screen": "Home"}]
                        }
                    }
                }
            },
            "contractLib": {
                "name": "Wine SmartContract Library",
                "version": "1.0",
                "slug": "wine_1_0",
                "libs": ["base64_Y2xhc3MgU21hcnRDb250cmFjdEJhc2UgewogIGNvbnN0cnVjdG9yKGhvb2tzKSB7CiAgICAgIHRoaXMuaG9va3MgPSBob29rczsKICAgICAgdGhpcy5zdGF0ZSA9IGhvb2tzLnN0YXRlOwogICAgICB0aGlzLmRlYnVnTG9nID0gaG9va3MuZGVidWdMb2c7CiAgICAgIHRoaXMuZGVidWdMb2coJ2NvbnN0cnVjdCBTbWFydENvbnRyYWN0QmFzZScpOwogIH0KICBkZWJ1Z1NpemUobykgewogICAgdmFyIHMgPSBKU09OLnN0cmluZ2lmeShvKTsKICAgIHRoaXMuZGVidWdMb2coYHNpemU6ICR7cy5sZW5ndGgvMTAyNH0ga2ApOwogIH0KICBhc3luYyBieU5hbWUocE5hbWUpIHsKICAgIHZhciBhcGkgPSB0aGlzLmhvb2tzLnN0YWNrLmFwaTsKICAgIHZhciB1cmwgPSAnL3AvbmFtZS8nICsgcE5hbWU7CiAgICBjb25zdCByZXMgPSBhd2FpdCBhcGkuZ2V0KHVybCk7CiAgICByZXR1cm4gcmVzLmJvZHk7CiAgfQogIGFzeW5jIG9uZUJ5TmFtZShwTmFtZSkgewogICAgdmFyIF8gPSB0aGlzLmhvb2tzLl87CiAgICB2YXIgYXBpID0gdGhpcy5ob29rcy5zdGFjay5hcGk7CiAgICB2YXIgdXJsID0gJy9wL25hbWUvJyArIHBOYW1lOwogICAgY29uc3QgcmVzID0gYXdhaXQgYXBpLmdldCh1cmwpOwogICAgdmFyIHBvcGNvZGVzID0gIV8uaXNOaWwocmVzKQogICAgICYmICFfLmlzTmlsKHJlcy5ib2R5KQogICAgICYmICFfLmlzTmlsKHJlcy5ib2R5LnBvcGNvZGVzKSA/IHJlcy5ib2R5LnBvcGNvZGVzIDogbnVsbDsKICAgIHZhciBwb3Bjb2RlID0gXy5pc0FycmF5KHBvcGNvZGVzKSAmJiBwb3Bjb2Rlcy5sZW5ndGggPiAwCiAgICAgPyBwb3Bjb2Rlc1swXSA6IG51bGw7CiAgICByZXR1cm4gcG9wY29kZTsKICB9CiAgYXN5bmMgYmFsYW5jZShhZGRyZXNzKSB7CiAgICB2YXIgYXBpID0gdGhpcy5ob29rcy5zdGFjay5hcGk7CiAgICB2YXIgdXJsID0gJy9wL2JhbGFuY2UvJyArIGFkZHJlc3M7CiAgICBjb25zdCByZXMgPSBhd2FpdCBhcGkuZ2V0KHVybCk7CiAgICByZXR1cm4gcmVzLmJvZHk7CiAgfQogIGFzeW5jIGdlbmVyYXRlKCkgewogICAgdmFyIGFwaSA9IHRoaXMuaG9va3Muc3RhY2suYXBpOwogICAgdmFyIHVybCA9ICcvcC9nZW5lcmF0ZSc7CiAgICBjb25zdCByZXMgPSBhd2FpdCBhcGkuZ2V0KHVybCk7CiAgICByZXR1cm4gcmVzLmJvZHk7CiAgfQogIGFzeW5jIGNvbnRhaW5lclBvcGNvZGUoYWRkcmVzcykgewogICAgdmFyIGFwaSA9IHRoaXMuaG9va3Muc3RhY2suYXBpQ2F5bGV5OwogICAgdmFyIHVybCA9ICcvY29udGFpbmVyUG9wY29kZS8nICsgYWRkcmVzczsKICAgIGNvbnN0IHJlcyA9IGF3YWl0IGFwaS5nZXQodXJsKTsKICAgIHJldHVybiByZXMuYm9keTsKICB9CiAgYXN5bmMgYm9tUG9wY29kZXMoYWRkcmVzcykgewogICAgdmFyIGFwaSA9IHRoaXMuaG9va3Muc3RhY2suYXBpQ2F5bGV5OwogICAgdmFyIHVybCA9ICcvYm9tUG9wY29kZXMvJyArIGFkZHJlc3M7CiAgICBjb25zdCByZXMgPSBhd2FpdCBhcGkuZ2V0KHVybCk7CiAgICByZXR1cm4gcmVzLmJvZHk7CiAgfQogIGFzeW5jIHNpZ25NZXNzYWdlKGZpZWxkcyxwcml2YXRlS2V5KSB7CiAgICB2YXIgYXBpID0gdGhpcy5ob29rcy5zdGFjay5hcGk7CiAgICB2YXIgYm9keSA9IHsKICAgICAgZmllbGRzLAogICAgICBwcml2YXRlS2V5CiAgICB9OwogICAgdmFyIHVybCA9ICcvY3J5cHRvL3NpZ25NZXNzYWdlJzsKICAgIHRoaXMuZGVidWdMb2coJyoqKioqKioqKioqIHNpZ25NZXNzYWdlJyk7CiAgICB0aGlzLmRlYnVnTG9nKHtib2R5fSk7CiAgICBjb25zdCByZXMgPSBhd2FpdCBhcGkucG9zdCh1cmwsIHtib2R5fSk7CiAgICB0aGlzLmRlYnVnTG9nKHtib2R5OiByZXMuYm9keX0pOwogICAgcmV0dXJuIHJlcy5ib2R5OwogIH0KICBhc3luYyBibG9iQ3JlYXRlV2l0aFNpZyhzaWcsYWRkcmVzcyxkYXRhLHB1YmxpY0tleSkgewogICAgdmFyIGFwaSA9IHRoaXMuaG9va3Muc3RhY2suYXBpOwogICAgdmFyIGJvZHkgPSB7CiAgICAgIHNpZywKICAgICAgYWRkcmVzcywKICAgICAgcHVibGljS2V5LAogICAgICBkYXRhCiAgICB9OwogICAgdmFyIHVybCA9ICcvcC9ibG9iQ3JlYXRlV2l0aFNpZyc7CiAgICBjb25zdCByZXMgPSBhd2FpdCBhcGkucG9zdCh1cmwsIHtib2R5fSk7CiAgICByZXR1cm4gcmVzLmJvZHk7CiAgfQogIGFzeW5jIGJsb2JDcmVhdGUoYWRkcmVzcyxkYXRhLHB1YmxpY0tleSxwcml2YXRlS2V5KSB7CiAgICB2YXIgZmllbGRzID0gW107CgogICAgdmFyIHJlcyA9IGF3YWl0IHRoaXMuYmFsYW5jZShhZGRyZXNzKTsKICAgIGZpZWxkcy5wdXNoKHJlcy5iYWxhbmNlLkNvdW50ZXIpOwogICAgZmllbGRzLnB1c2goYWRkcmVzcyk7CiAgICBmaWVsZHMucHVzaChkYXRhKTsKCiAgICByZXMgPSBhd2FpdCB0aGlzLnNpZ25NZXNzYWdlKGZpZWxkcyxwcml2YXRlS2V5KTsKCiAgICByZXMgPSBhd2FpdCB0aGlzLmJsb2JDcmVhdGVXaXRoU2lnKHJlcy5zaWcsYWRkcmVzcyxkYXRhLHB1YmxpY0tleSk7CgogICAgcmV0dXJuIHJlczsKICB9CiAgYXN5bmMgbWludChzaWcsYWRkcmVzcyxkYXRhLHB1YmxpY0tleSxhbW91bnQsdW5pdCkgewogICAgdmFyIGFwaSA9IHRoaXMuaG9va3Muc3RhY2suYXBpOwogICAgdmFyIGJvZHkgPSB7CiAgICAgIHNpZywKICAgICAgYWRkcmVzcywKICAgICAgcHVibGljS2V5LAogICAgICBhbW91bnQsCiAgICAgIHVuaXQsCiAgICAgIGRhdGEKICAgIH07CiAgICB0aGlzLmRlYnVnTG9nKCcqKioqKioqKioqKiBkbyBtaW50Jyk7CiAgICB0aGlzLmRlYnVnTG9nKHtib2R5fSk7CiAgICB0aGlzLmRlYnVnTG9nKHthcGl9KTsKICAgIHRoaXMuZGVidWdTaXplKGJvZHkpOwogICAgdmFyIHVybCA9ICcvcC9taW50JzsKICAgIGNvbnN0IHJlcyA9IGF3YWl0IGFwaS5wb3N0KHVybCwge2JvZHl9KTsKICAgIHRoaXMuZGVidWdMb2coJyoqKioqKioqKioqIG1pbnQgcmVzdWx0Jyk7CiAgICB0aGlzLmRlYnVnTG9nKHJlcyk7CiAgICByZXR1cm4gcmVzOwogIH0KICBhc3luYyBzaWduQW5kTWludChhZGRyZXNzLGRhdGEscHVibGljS2V5LGFtb3VudCx1bml0LHByaXZhdGVLZXkpIHsKICAgIHRoaXMuZGVidWdMb2coJ3NpZ25BbmRNaW50Jyk7CiAgICB0aGlzLmRlYnVnTG9nKHthZGRyZXNzLGRhdGEscHVibGljS2V5LGFtb3VudCx1bml0LHByaXZhdGVLZXl9KTsKICAgIHZhciBmaWVsZHMgPSBbXTsKICAgIHZhciB7IGJhbGFuY2UgfSA9IGF3YWl0IHRoaXMuYmFsYW5jZShhZGRyZXNzKTsKICAgIC8vIHRoaXMuZGVidWdMb2coJyMjIyMjIyMjIyMjIyMjIyMgYmFsYW5jZS5Db3VudGVyOiAnICsgYmFsYW5jZS5Db3VudGVyKTsKICAgIGZpZWxkcy5wdXNoKGJhbGFuY2UuQ291bnRlcik7CiAgICBmaWVsZHMucHVzaChhZGRyZXNzKTsKICAgIGZpZWxkcy5wdXNoKGFtb3VudCk7CiAgICBmaWVsZHMucHVzaCh1bml0KTsKICAgIGZpZWxkcy5wdXNoKGRhdGEpOwoKICAgIHZhciB7IHNpZyB9ID0gYXdhaXQgdGhpcy5zaWduTWVzc2FnZShmaWVsZHMscHJpdmF0ZUtleSk7CgogICAgdmFyIHJlcyA9IGF3YWl0IHRoaXMubWludChzaWcsYWRkcmVzcyxkYXRhLHB1YmxpY0tleSxhbW91bnQsdW5pdCk7CgogICAgcmV0dXJuIHJlczsKICB9CiAgYXN5bmMgd2l0aGRyYXcoc2lnLHByaXZhdGVLZXksZGVzdEFkZHJlc3MsZGVzdEFtb3VudCxkYXRhLHNvdXJjZU91dHB1dCkgewogICAgdmFyIGFwaSA9IHRoaXMuaG9va3Muc3RhY2suYXBpOwogICAgdmFyIGJvZHkgPSB7CiAgICAgIHNpZywKICAgICAgcHJpdmF0ZUtleSwKICAgICAgZGVzdEFkZHJlc3MsCiAgICAgIGRlc3RBbW91bnQsCiAgICAgIGRhdGEsCiAgICAgIHNvdXJjZU91dHB1dAogICAgfTsKICAgIHRoaXMuZGVidWdMb2coJyoqKioqKioqKioqIHdpdGhkcmF3Jyk7CiAgICB0aGlzLmRlYnVnTG9nKHtib2R5fSk7CiAgICB2YXIgdXJsID0gJy9wL3dpdGhkcmF3JzsKICAgIGNvbnN0IHJlcyA9IGF3YWl0IGFwaS5wb3N0KHVybCwge2JvZHl9KTsKICAgIHJldHVybiByZXM7CiAgfQogIGFzeW5jIHNpZ25BbmRXaXRoZHJhdyhwcml2YXRlS2V5LHNvdXJjZUFkZHJlc3MsZGVzdEFkZHJlc3MsZGVzdEFtb3VudCxkYXRhLHNvdXJjZU91dHB1dCkgewogICAgdGhpcy5kZWJ1Z0xvZygnc2lnbkFuZFdpdGhkcmF3Jyk7CiAgICB0aGlzLmRlYnVnTG9nKHtwcml2YXRlS2V5LHNvdXJjZUFkZHJlc3MsZGVzdEFkZHJlc3MsZGVzdEFtb3VudCxkYXRhLHNvdXJjZU91dHB1dH0pOwogICAgdmFyIGZpZWxkcyA9IFtdOwogICAgdmFyIHsgYmFsYW5jZSB9ID0gYXdhaXQgdGhpcy5iYWxhbmNlKHNvdXJjZUFkZHJlc3MpOwogICAgLy8gdGhpcy5kZWJ1Z0xvZygnIyMjIyMjIyMjIyMjIyMjIyBiYWxhbmNlLkNvdW50ZXI6ICcgKyBiYWxhbmNlLkNvdW50ZXIpOwogICAgZmllbGRzLnB1c2goYmFsYW5jZS5Db3VudGVyKTsKICAgIGZpZWxkcy5wdXNoKGRlc3RBZGRyZXNzKTsKICAgIGZpZWxkcy5wdXNoKGRhdGEpOwogICAgZmllbGRzLnB1c2goc291cmNlT3V0cHV0KTsKICAgIGZpZWxkcy5wdXNoKGRlc3RBbW91bnQpOwoKICAgIHZhciB7IHNpZyB9ID0gYXdhaXQgdGhpcy5zaWduTWVzc2FnZShmaWVsZHMscHJpdmF0ZUtleSk7CgogICAgdmFyIHJlcyA9IGF3YWl0IHRoaXMud2l0aGRyYXcoc2lnLHByaXZhdGVLZXksZGVzdEFkZHJlc3MsZGVzdEFtb3VudCxkYXRhLHNvdXJjZU91dHB1dCk7CgogICAgcmV0dXJuIHJlczsKICB9CiAgYXN5bmMgYm9tVXBkYXRlV2l0aFNpZyhzaWcsYWRkcmVzcyxwdWJsaWNLZXksYm9tT3AsYm9tQWRkcmVzcykgewogICAgdmFyIGFwaSA9IHRoaXMuaG9va3Muc3RhY2suYXBpOwogICAgdmFyIGJvZHkgPSB7CiAgICAgIHNpZywKICAgICAgYWRkcmVzcywKICAgICAgcHVibGljS2V5LAogICAgICBib21PcCwKICAgICAgYm9tQWRkcmVzcwogICAgfTsKICAgIHRoaXMuZGVidWdMb2coJyoqKioqKioqKioqIGRvIGJvbVVwZGF0ZScpOwogICAgdGhpcy5kZWJ1Z0xvZyh7Ym9keX0pOwogICAgdGhpcy5kZWJ1Z0xvZyh7YXBpfSk7CiAgICB0aGlzLmRlYnVnU2l6ZShib2R5KTsKICAgIHZhciB1cmwgPSAnL3AvYm9tVXBkYXRlV2l0aFNpZyc7CiAgICBjb25zdCByZXMgPSBhd2FpdCBhcGkucG9zdCh1cmwsIHtib2R5fSk7CiAgICB0aGlzLmRlYnVnTG9nKCcqKioqKioqKioqKiBib21VcGRhdGUgcmVzdWx0Jyk7CiAgICB0aGlzLmRlYnVnTG9nKHJlcyk7CiAgICByZXR1cm4gcmVzOwogIH0KICBhc3luYyBzaWduQW5kVXBkYXRlQm9tKGFkZHJlc3MscHVibGljS2V5LGJvbU9wLGJvbUFkZHJlc3MscHJpdmF0ZUtleSkgewogICAgdGhpcy5kZWJ1Z0xvZygnc2lnbkFuZFVwZGF0ZUJvbScpOwogICAgdGhpcy5kZWJ1Z0xvZyh7YWRkcmVzcyxwdWJsaWNLZXksYm9tT3AsYm9tQWRkcmVzcyxwcml2YXRlS2V5fSk7CiAgICB2YXIgZmllbGRzID0gW107CiAgICB2YXIgeyBiYWxhbmNlIH0gPSBhd2FpdCB0aGlzLmJhbGFuY2UoYWRkcmVzcyk7CiAgICAvLyB0aGlzLmRlYnVnTG9nKCcjIyMjIyMjIyMjIyMjIyMjIGJhbGFuY2UuQ291bnRlcjogJyArIGJhbGFuY2UuQ291bnRlcik7CiAgICBmaWVsZHMucHVzaChiYWxhbmNlLkNvdW50ZXIpOwogICAgZmllbGRzLnB1c2goYWRkcmVzcyk7CiAgICBmaWVsZHMucHVzaChib21PcCk7CiAgICBmaWVsZHMucHVzaChib21BZGRyZXNzKTsKCiAgICB2YXIgeyBzaWcgfSA9IGF3YWl0IHRoaXMuc2lnbk1lc3NhZ2UoZmllbGRzLHByaXZhdGVLZXkpOwoKICAgIHZhciByZXMgPSBhd2FpdCB0aGlzLmJvbVVwZGF0ZVdpdGhTaWcoc2lnLGFkZHJlc3MscHVibGljS2V5LGJvbU9wLGJvbUFkZHJlc3MpOwoKICAgIHJldHVybiByZXM7CiAgfQp9Owo=", "base64_Y2xhc3MgU21hcnRDb250cmFjdCBleHRlbmRzIFNtYXJ0Q29udHJhY3RCYXNlIHsKICBjb25zdHJ1Y3Rvcihob29rcykgewogICAgICBzdXBlcihob29rcykKICAgICAgdGhpcy5kZWJ1Z0xvZygnKioqKioqKioqKioqKiogU21hcnRDb250cmFjdCcpOwogIH0KCiAgYXN5bmMgZWNobygpIHsKICAgICAgdGhpcy5kZWJ1Z0xvZygnZWNobycpOwogICAgICB2YXIgcnZhbCA9IHsKICAgICAgICAgIGRhdGE6ICdoZWxsbycKICAgICAgfTsKICAgICAgdGhpcy5ob29rcy5maW5pc2gucmVzb2x2ZShydmFsKTsKICB9CgogIGFzeW5jIHdpbmVtYWtlck1pbnRPaygpIHsgCiAgICB0aGlzLmRlYnVnTG9nKCdleGVjdXRlIHdpbmVtYWtlck1pbnRPaycpOwogICAgICB2YXIgXyA9IHRoaXMuaG9va3MuXzsKICAgICAgdmFyIHNzID0gdGhpcy5ob29rcy5zY3JlZW5TdGF0ZTsKICAgICAgdmFyIGFwcCA9IHRoaXMuaG9va3MuYXBwOwogICAgICB2YXIgdXNlckNyZWRlbnRpYWxzID0gYXBwLmdldEFwcFN0YXRlKCd1c2VyQ3JlZGVudGlhbHMnKTsKICAgICAgdmFyIHB1YmxpY0tleSA9IHVzZXJDcmVkZW50aWFscy5wdWJsaWNLZXk7CiAgICAgIHZhciBwcml2YXRlS2V5ID0gdXNlckNyZWRlbnRpYWxzLnByaXZhdGVLZXk7CiAgICAgIHZhciB3b3JrZmxvdyA9IHNzLndvcmtmbG93OwogICAgICB2YXIgbmV3SWQgPSB0aGlzLmhvb2tzLnNob3J0aWQuZ2VuZXJhdGUoKTsKICAgICAgdmFyIHBvcGNvZGVOYW1lID0gJ1dpbmVfJyArIG5ld0lkOwogICAgICB2YXIgeyBmb3JtIH0gPSB0aGlzLnN0YXRlOwogICAgICB0aGlzLmRlYnVnTG9nKGZvcm0pOwogICAgICB2YXIgeyBwb3Bjb2RlIH0gPSBhd2FpdCB0aGlzLmdlbmVyYXRlKCk7CiAgICAgIHZhciB7IGFkZHJlc3MgfSA9IHBvcGNvZGU7CiAgICAgIHZhciBuZXh0U3BvdCA9ICd0cnVja2VyLnBpY2t1cCc7CiAgICAgIHZhciBhbW91bnQgPSB0aGlzLnRvSW50ZWdlcihmb3JtLm1pbnRXaW5lQm90dGxlcy5BbW91bnQpOwogICAgICB2YXIgdW5pdCA9IGZvcm0ubWludFdpbmVCb3R0bGVzLlVuaXQ7CiAgICAgIHRoaXMuZGVidWdMb2coJyMjIyMjIyMjIyMjIyMlJSUlJSUlJSUlJSUlJCQkJCQkJCQkJCQkJCQgIGdlbmVyYXRlZCB3aW5lbWFrZXIgcG9wY29kZTonKTsKICAgICAgdGhpcy5kZWJ1Z0xvZyh7cG9wY29kZU5hbWUscG9wY29kZX0pOwogICAgICAKICAgICAgdmFyIGRhdGEgPQogICAgICAgICAgewogICAgICAgICAgICAiYXBwRGF0YSI6IHsKICAgICAgICAgICAgICAid29ya2Zsb3dEYXRhIjogZm9ybSwKICAgICAgICAgICAgICAid2luZUJvdHRsZXMiOiBhbW91bnQsCiAgICAgICAgICAgICAgIndpbmVVbml0IjogdW5pdCwKICAgICAgICAgICAgICAic3BvdCI6IG5leHRTcG90LAogICAgICAgICAgICAgICJ3b3JrZmxvd05hbWUiOiBzcy53b3JrZmxvdy5uYW1lLAogICAgICAgICAgICAgICJ3b3JrZmxvd0luc3RhbmNlSWQiOiBuZXdJZCwKICAgICAgICAgICAgICAid29ya2Zsb3dSb290UG9wY29kZSI6ICJ0cnVlIiwKICAgICAgICAgICAgICBwb3Bjb2RlTmFtZSAsCiAgICAgICAgICAgICAgIndvcmtmbG93RGVmIjogd29ya2Zsb3cKICAgICAgICAgICAgfQogICAgICAgICAgfTsKCiAgICAgIHRoaXMuZGVidWdMb2coZGF0YSk7CgogICAgICB2YXIgcmVzID0gYXdhaXQgdGhpcy5zaWduQW5kTWludChhZGRyZXNzLGRhdGEscHVibGljS2V5LGFtb3VudCx1bml0LHByaXZhdGVLZXkpOwogICAgICAvLyB0aGlzLmRlYnVnTG9nKCd0aGlzLnNpZ25BbmRNaW50IHJlcy5ib2R5LmtleXM6ICcgKyBPYmplY3Qua2V5cyhyZXMuYm9keSkpOwoKICAgICAgdmFyIHJ2YWwgPSB7CiAgICAgICAgICBhY3Rpb246IFtdCiAgICAgIH07CiAgICAgIHRoaXMuaG9va3MuZmluaXNoLnJlc29sdmUocnZhbCk7CiAgICAgIHJldHVybiBhZGRyZXNzOwogICAgCiAgfQogIHRvSW50ZWdlcih2YWx1ZSkgewogICAgdmFyIF8gPSB0aGlzLmhvb2tzLl87CiAgICBpZihfLmlzU3RyaW5nKHZhbHVlKSkKICAgICAgcmV0dXJuIHBhcnNlSW50KHZhbHVlKTsKICAgIGVsc2UKICAgICAgcmV0dXJuIHZhbHVlOwogIH0KICBhc3luYyB0cnVja2VyUGlja3VwT2soKSB7IAogICAgdGhpcy5kZWJ1Z0xvZygnZXhlY3V0ZSB0cnVja2VyUGlja3VwT2snKTsKICAgIHZhciBmb3JtID0gdGhpcy5zdGF0ZS5mb3JtOwogICAgdGhpcy5kZWJ1Z0xvZyh7Zm9ybX0pOwogICAgCiAgICB2YXIgcnZhbCA9IHsKICAgICAgICBhY3Rpb246IFtdCiAgICB9OwoKICAgIHZhciBfID0gdGhpcy5ob29rcy5fOwogICAgdmFyIHNzID0gdGhpcy5ob29rcy5zY3JlZW5TdGF0ZTsKICAgIHZhciBhcHAgPSB0aGlzLmhvb2tzLmFwcDsKICAgIHZhciB3b3JrZmxvdyA9IHNzLndvcmtmbG93OwogICAgCiAgICB2YXIgdXNlckNyZWRlbnRpYWxzID0gYXBwLmdldEFwcFN0YXRlKCd1c2VyQ3JlZGVudGlhbHMnKTsKICAgIHZhciB1c2VyUHVibGljS2V5ID0gdXNlckNyZWRlbnRpYWxzLnB1YmxpY0tleTsKICAgIHZhciB1c2VyUHJpdmF0ZUtleSA9IHVzZXJDcmVkZW50aWFscy5wcml2YXRlS2V5OwogICAgCiAgICB2YXIgc3JjUG9wY29kZSA9IHRoaXMuc3RhdGUucG9wY29kZTsKICAgIAoKICAgIHZhciBkZXN0QW1vdW50ID0gdGhpcy50b0ludGVnZXIodGhpcy5zdGF0ZS5mb3JtLndpdGhkcmF3LnBpY2t1cEFtb3VudCk7CiAgICB2YXIgZGVzdE5hbWUgPSAiVHJ1Y2tfIiArIHVzZXJDcmVkZW50aWFscy5zZXNzaW9uSWQ7CiAgICAKICAgIHZhciBkYXRhID0geyBkZXNjcmlwdGlvbjogYHdpdGhkcmF3ICR7ZGVzdEFtb3VudH0gYm90dGxlcyBvZiB3aW5lYCB9OwogICAgdmFyIHNvdXJjZU91dHB1dCA9IDA7CiAgICAKICAgIHRoaXMuZGVidWdMb2coJ2dldCB0cnVjayBwb3Bjb2RlOiAnICsgZGVzdE5hbWUpOwogICAgdmFyIHRydWNrUG9wY29kZSA9IGF3YWl0IHRoaXMub25lQnlOYW1lKGRlc3ROYW1lKTsKICAgIHRoaXMuZGVidWdMb2codHJ1Y2tQb3Bjb2RlKTsKICAgICAKICAgIHRoaXMuZGVidWdMb2coJ2NoZWNrIHNvdXJjZSB3aW5lIGJvdHRsZSBjb3VudCcpOwogICAgdmFyIHdpbmVCb3R0bGVzID0gdGhpcy50b0ludGVnZXIoc3JjUG9wY29kZS5hcHBEYXRhLndpbmVCb3R0bGVzKTsKICAgIHZhciB3aW5lVW5pdCA9IHNyY1BvcGNvZGUuYXBwRGF0YS53aW5lVW5pdDsKICAgIHRoaXMuZGVidWdMb2coe3NyY1BvcGNvZGV9KTsKICAgIHRoaXMuZGVidWdMb2coe3dpbmVCb3R0bGVzLGRlc3RBbW91bnQsd2luZVVuaXR9KTsKICAgIAogICAgaWYoXy5pc05pbChkZXN0QW1vdW50KSB8fCBfLmlzTmFOKGRlc3RBbW91bnQpKSB7CiAgICAgIHRoaXMuZGVidWdMb2coJyoqKioqKioqKioqKioqKioqKiBlcnJvciBiYWQgZGVzdEFtb3VudCknKTsKICAgICAgdGhpcy5ob29rcy5maW5pc2gucmVzb2x2ZShydmFsKTsKICAgICAgcmV0dXJuIDsKICAgIH0KICAgIAogICAgaWYoXy5pc05pbCh3aW5lQm90dGxlcykgfHwgXy5pc05hTihkZXN0QW1vdW50KSkgewogICAgICB0aGlzLmRlYnVnTG9nKCcqKioqKioqKioqKioqKioqKiogZXJyb3IgYmFkIHdpbmVCb3R0bGVzJyk7CiAgICAgIHRoaXMuaG9va3MuZmluaXNoLnJlc29sdmUocnZhbCk7CiAgICAgIHJldHVybiA7CiAgICB9CiAgICAKICAgIGlmKGRlc3RBbW91bnQgPiB3aW5lQm90dGxlcykgewogICAgICB0aGlzLmRlYnVnTG9nKCcqKioqKioqKioqKioqKioqKiogZXJyb3IgZGVzdEFtb3VudCA+IHdpbmVCb3R0bGVzJyk7CiAgICAgIHRoaXMuaG9va3MuZmluaXNoLnJlc29sdmUocnZhbCk7CiAgICAgIHJldHVybiA7CiAgICB9CiAgICAgCiAgICB2YXIgdHJ1Y2tCb3R0bGVzOwogICAgaWYgKF8uaXNOaWwodHJ1Y2tQb3Bjb2RlKSkgewogICAgICB0aGlzLmRlYnVnTG9nKCdNaW50aW5nIHRydWNrIHBvcGNvZGU6ICcgKyBkZXN0TmFtZSk7CiAgICAgIHZhciB0cnVja1Nwb3QgPSAndHJ1Y2tlci5zaG93JzsKICAgICAgdmFyIG5ld0lkID0gdGhpcy5ob29rcy5zaG9ydGlkLmdlbmVyYXRlKCk7CiAgICAgIHZhciB0cnVja1N0YXJ0QW1vdW50ID0gMDsKICAgICAgdmFyIHRydWNrVW5pdCA9ICdib3R0bGVzIG9mIHdpbmUnOwogICAgICB0cnVja0JvdHRsZXMgPSAwOwogICAgICB2YXIgdHJ1Y2tEYXRhID0KICAgICAgICAgIHsKICAgICAgICAgICAgImFwcERhdGEiOiB7CiAgICAgICAgICAgICAgIndvcmtmbG93RGF0YSI6IHt9LAogICAgICAgICAgICAgICJzcG90IjogdHJ1Y2tTcG90LAogICAgICAgICAgICAgICJ3aW5lQm90dGxlcyI6IHRydWNrQm90dGxlcywKICAgICAgICAgICAgICAid2luZVVuaXQiOiB3aW5lVW5pdCwKICAgICAgICAgICAgICAid29ya2Zsb3dOYW1lIjogc3Mud29ya2Zsb3cubmFtZSwKICAgICAgICAgICAgICAid29ya2Zsb3dJbnN0YW5jZUlkIjogbmV3SWQsCiAgICAgICAgICAgICAgIndvcmtmbG93Um9vdFBvcGNvZGUiOiAidHJ1ZSIsCiAgICAgICAgICAgICAgcG9wY29kZU5hbWU6IGRlc3ROYW1lLAogICAgICAgICAgICAgICJ3b3JrZmxvd0RlZiI6IHdvcmtmbG93CiAgICAgICAgICAgIH0KICAgICAgICAgIH07CiAgICAgIHZhciBuZXdQb3Bjb2RlID0gYXdhaXQgdGhpcy5nZW5lcmF0ZSgpOwogICAgICB2YXIgdHJ1Y2tBZGRyZXNzID0gbmV3UG9wY29kZS5wb3Bjb2RlLmFkZHJlc3M7CiAgICAgIAogICAgICB2YXIgcmVzID0gYXdhaXQgdGhpcy5zaWduQW5kTWludCh0cnVja0FkZHJlc3MsdHJ1Y2tEYXRhLHVzZXJQdWJsaWNLZXksdHJ1Y2tTdGFydEFtb3VudCx0cnVja1VuaXQsdXNlclByaXZhdGVLZXkpOwogICAgICAKICAgICAgdHJ1Y2tQb3Bjb2RlID0gYXdhaXQgdGhpcy5vbmVCeU5hbWUoZGVzdE5hbWUpOwogICAgfQogICAgZWxzZSB7CiAgICAgIHRoaXMuZGVidWdMb2coJ0ZvdW5kIGV4aXN0aW5nIHRydWNrIHBvcGNvZGU6ICcgKyBkZXN0TmFtZSk7CiAgICAgIHRydWNrQm90dGxlcyA9IHRydWNrUG9wY29kZS5hcHBEYXRhLndpbmVCb3R0bGVzOwogICAgfQogICAgCiAgICBpZihfLmlzTmlsKHRydWNrUG9wY29kZSkpIHsKICAgICAgdGhpcy5kZWJ1Z0xvZygnKioqKioqKioqKioqKioqKioqIEVycm9yIG1pbnRpbmcgdHJ1Y2sgcG9wY29kZScpOwogICAgICB0aGlzLmhvb2tzLmZpbmlzaC5yZXNvbHZlKHJ2YWwpOwogICAgICByZXR1cm4gOwogICAgfQogICAgCiAgICB0aGlzLmRlYnVnTG9nKCcjIyMjIyMjIyMjIyMjIyMjIHRydWNrIHBvcGNvZGU6Jyk7CiAgICB0aGlzLmRlYnVnTG9nKHRydWNrUG9wY29kZSk7CiAgICAKICAgIHZhciB3cmVzID0gYXdhaXQgdGhpcy5zaWduQW5kV2l0aGRyYXcoCiAgICAgIHNyY1BvcGNvZGUucHJpdmF0ZUtleSwKICAgICAgc3JjUG9wY29kZS5hZGRyZXNzLAogICAgICB0cnVja1BvcGNvZGUuYWRkcmVzcywKICAgICAgZGVzdEFtb3VudCwKICAgICAgZGF0YSwKICAgICAgc291cmNlT3V0cHV0CiAgICApOwogICAgCiAgICB0aGlzLmRlYnVnTG9nKCcjIyMjIyMjIyMjIyMjIyMjIHdpdGhkcmF3IHJlc3VsdDonKTsKICAgIHRoaXMuZGVidWdMb2cod3Jlcyk7CiAgICBydmFsLndyZXMgPSB3cmVzOwogICAgCiAgICB0aGlzLmRlYnVnTG9nKCcjIyMjIyMjIyMjIyMjIyMjIHVwZGF0ZSBzb3VyY2Ugd2luZSBib3R0bGUgY291bnQ6Jyk7CiAgICB2YXIgd2luZUNvdW50ID0gd2luZUJvdHRsZXMgLSBkZXN0QW1vdW50OwogICAgdmFyIHdpbmVEYXRhID0KICAgICAgICB7CiAgICAgICAgICAiYXBwRGF0YSI6IHsKICAgICAgICAgICAgIndpbmVCb3R0bGVzIjogd2luZUNvdW50CiAgICAgICAgICB9CiAgICAgICAgfTsKCiAgICB0aGlzLmRlYnVnTG9nKHdpbmVEYXRhKTsKICAgIHZhciBicmVzID0gYXdhaXQgdGhpcy5ibG9iQ3JlYXRlKAogICAgICBzcmNQb3Bjb2RlLmFkZHJlc3MsCiAgICAgIHdpbmVEYXRhLAogICAgICB1c2VyQ3JlZGVudGlhbHMucHVibGljS2V5LAogICAgICB1c2VyQ3JlZGVudGlhbHMucHJpdmF0ZUtleSk7CiAgICAgIAogICAgdGhpcy5kZWJ1Z0xvZygnIyMjIyMjIyMjIyMjIyMjIyBibG9iQ3JlYXRlIHJlc3VsdDonKTsKICAgIHRoaXMuZGVidWdMb2coYnJlcyk7CiAgICBydmFsLmJyZXMgPSBicmVzOwogICAgCiAgICB0aGlzLmRlYnVnTG9nKCcjIyMjIyMjIyMjIyMjIyMjIHVwZGF0ZSB0cnVjayB3aW5lIGJvdHRsZSBjb3VudDonKTsKICAgIHZhciB0cnVja0NvdW50ID0gdHJ1Y2tCb3R0bGVzICsgZGVzdEFtb3VudDsKICAgIHZhciB0cnVja1dpbmVEYXRhID0KICAgICAgICB7CiAgICAgICAgICAiYXBwRGF0YSI6IHsKICAgICAgICAgICAgIndpbmVCb3R0bGVzIjogdHJ1Y2tDb3VudAogICAgICAgICAgfQogICAgICAgIH07CgogICAgdGhpcy5kZWJ1Z0xvZyh0cnVja1dpbmVEYXRhKTsKICAgIHZhciBicmVzMiA9IGF3YWl0IHRoaXMuYmxvYkNyZWF0ZSgKICAgICAgdHJ1Y2tQb3Bjb2RlLmFkZHJlc3MsCiAgICAgIHRydWNrV2luZURhdGEsCiAgICAgIHVzZXJDcmVkZW50aWFscy5wdWJsaWNLZXksCiAgICAgIHVzZXJDcmVkZW50aWFscy5wcml2YXRlS2V5KTsKICAgICAgCiAgICB0aGlzLmRlYnVnTG9nKCcjIyMjIyMjIyMjIyMjIyMjIHRydWNrIGJsb2JDcmVhdGUgcmVzdWx0OicpOwogICAgdGhpcy5kZWJ1Z0xvZyhicmVzMik7CiAgICBydmFsLmJyZXMyID0gYnJlczI7CiAgICAKICAgIHRoaXMuaG9va3MuZmluaXNoLnJlc29sdmUocnZhbCk7CiAgIH0KCn07Cg=="]
            }
        },
        "address": "af5efdc4b5176fd77e9cc8c9c6e42f8b1552c1b3",
        "workflowRootPopcode": "true",
        "transaction": [{
            "id": "<576bab1f849256a43f656fed6cac5f552d73c4fdaced28d62a9dbaf07fc28ce0>",
            "popcode": "<af5efdc4b5176fd77e9cc8c9c6e42f8b1552c1b3>",
            "spot": "trucker.pickup",
            "unit": "bottles of wine",
            "txId": "576bab1f849256a43f656fed6cac5f552d73c4fdaced28d62a9dbaf07fc28ce0",
            "data": {
                "metadata": {
                    "appData": {
                        "workflowData": {
                            "mintWineBottles": {
                                "Amount": "1000",
                                "Unit": "bottles of wine"
                            }
                        },
                        "wineBottles": 1000,
                        "wineUnit": "bottles of wine",
                        "spot": "trucker.pickup",
                        "workflowName": "wineV1",
                        "workflowInstanceId": "PK9CFQEVS",
                        "workflowRootPopcode": "true",
                        "popcodeName": "Wine_PK9CFQEVS",
                        "workflowDef": {
                            "title": "Wine V1",
                            "name": "wineV1",
                            "startScreen": "Home",
                            "version": "2.0",
                            "steps": {
                                "winemaker.mint": {
                                    "step": "winemaker.mint",
                                    "title": "Winemaker Mint",
                                    "screen": "WinemakerMint"
                                },
                                "trucker.pickup": {
                                    "step": "trucker.pickup",
                                    "title": "Trucker Pickup",
                                    "screen": "TruckerPickup"
                                },
                                "trucker.show": {
                                    "step": "trucker.show",
                                    "title": "Trucker Show",
                                    "screen": "TruckerShow"
                                }
                            },
                            "appOptions": {"requireLogin": true},
                            "screens": {
                                "Home": {
                                    "name": "Home",
                                    "title": "Home",
                                    "api": "/api/mobile",
                                    "screenListItems": {
                                        "fetchItems": "/popcodeByWorkflowName",
                                        "method": "get",
                                        "api": "cayley",
                                        "fetchParameters": {"workflowName": "wineV1"},
                                        "itemDataTypes": {"popcode": "object"},
                                        "itemLabel": ["popcodeName"],
                                        "itemActions": {
                                            "click": {
                                                "title": "Click",
                                                "action": [{
                                                    "operation": "startWorkflow",
                                                    "replaceCurrent": true,
                                                    "parameters": {"spot": "@popcode.spot", "popcode": "@popcode"}
                                                }],
                                                "parameters": {"popcode": "@item"}
                                            }
                                        }
                                    },
                                    "screenButtons": {
                                        "scan": {
                                            "title": "Scan",
                                            "action": [{"operation": "navigate", "screen": "Scan"}],
                                            "roles": ["admin", "winemaker", "trucker"]
                                        },
                                        "mint": {
                                            "title": "Mint",
                                            "action": [{
                                                "operation": "navigate",
                                                "resetStack": true,
                                                "screen": "WinemakerMint"
                                            }],
                                            "roles": ["admin", "winemaker"]
                                        }
                                    }
                                },
                                "Scan": {
                                    "name": "Scan",
                                    "title": "Scan",
                                    "api": "/api/mobile",
                                    "parameters": {"user": "@user"},
                                    "modal": false,
                                    "screenScan": {},
                                    "startAction": [{
                                        "operation": "scanBarcode",
                                        "barcodeTypes": ["qr", "code128"],
                                        "outputs": {"scanData": "@scanData"}
                                    }, {
                                        "operation": "routePopcode",
                                        "parameters": {"scanData": "@scanData"},
                                        "outputs": {"address": "@address"}
                                    }, {
                                        "operation": "fetch",
                                        "route": "/p",
                                        "method": "get",
                                        "parameters": {"address": "@address"},
                                        "outputs": {"popcode": "@popcodes[0]"}
                                    }, {
                                        "operation": "startWorkflow",
                                        "replaceCurrent": true,
                                        "parameters": {"spot": "@popcode.spot", "popcode": "@popcode"}
                                    }]
                                },
                                "WinemakerMint": {
                                    "name": "WinemakerMint",
                                    "title": "Winemaker Mint",
                                    "api": "/api/mobile",
                                    "parameters": {"container": "@container", "popcode": "@popcode", "user": "@user"},
                                    "outputs": {"popcode": "@container"},
                                    "screenForm": {
                                        "fields": {
                                            "type": "object",
                                            "properties": {
                                                "mintWineBottles": {
                                                    "type": "object",
                                                    "properties": {
                                                        "Amount": {
                                                            "type": "string",
                                                            "value": "1000",
                                                            "options": {"editable": true}
                                                        },
                                                        "Unit": {
                                                            "type": "string",
                                                            "value": "bottles of wine",
                                                            "options": {"editable": true}
                                                        }
                                                    },
                                                    "required": ["Amount", "Unit"]
                                                }
                                            },
                                            "required": ["mintWineBottles"]
                                        }, "options": {"auto": "labels"}
                                    },
                                    "screenButtons": {
                                        "mint": {
                                            "title": "Mint",
                                            "action": [{
                                                "operation": "contract",
                                                "contract": "winemakerMintOk",
                                                "parameters": {"popcode": "@popcode"},
                                                "outputs": {"status": "@status", "txId": "@txId"}
                                            }, {
                                                "operation": "navigate",
                                                "resetStack": true,
                                                "forceUpdate": true,
                                                "screen": "Home"
                                            }],
                                            "roles": ["admin", "winemaker"]
                                        },
                                        "cancel": {
                                            "title": "Cancel",
                                            "action": [{"operation": "navigate", "resetStack": true, "screen": "Home"}]
                                        }
                                    }
                                },
                                "TruckerPickup": {
                                    "name": "TruckerPickup",
                                    "title": "Trucker Wine Pickup",
                                    "api": "/api/mobile",
                                    "parameters": {"container": "@container", "popcode": "@popcode", "user": "@user"},
                                    "outputs": {"popcode": "@container"},
                                    "tabs": {
                                        "tab1": {
                                            "title": "Pickup Wine",
                                            "screenForm": {
                                                "privateKey": ["winemaker", "admin"],
                                                "publicKey": ["winemaker", "trucker", "admin"],
                                                "fields": {
                                                    "type": "object",
                                                    "properties": {
                                                        "popcode": {
                                                            "type": "object",
                                                            "properties": {
                                                                "name": {
                                                                    "type": "string",
                                                                    "value": "@popcode.popcodeName",
                                                                    "options": {"editable": false}
                                                                },
                                                                "address": {
                                                                    "type": "string",
                                                                    "value": "@popcode.address",
                                                                    "options": {"editable": false}
                                                                },
                                                                "currentState": {
                                                                    "type": "string",
                                                                    "value": "@popcode.spot",
                                                                    "options": {"editable": false}
                                                                }
                                                            },
                                                            "required": ["name", "address", "currentState"]
                                                        },
                                                        "warehouseContents": {
                                                            "type": "object",
                                                            "properties": {
                                                                "Amount": {
                                                                    "type": "number",
                                                                    "value": "@popcode.appData.wineBottles",
                                                                    "options": {"editable": false}
                                                                },
                                                                "Unit": {
                                                                    "type": "string",
                                                                    "value": "@popcode.appData.wineUnit",
                                                                    "options": {"editable": false}
                                                                }
                                                            }
                                                        },
                                                        "withdraw": {
                                                            "type": "object",
                                                            "properties": {
                                                                "pickupAmount": {
                                                                    "type": "number",
                                                                    "options": {"editable": true}
                                                                }
                                                            },
                                                            "required": ["pickupAmount"]
                                                        }
                                                    },
                                                    "required": ["withdraw"]
                                                },
                                                "options": {"auto": "labels"}
                                            }
                                        }, "tab2": {"title": "Popcode Graph", "graphView": {"visName": "wine"}}
                                    },
                                    "screenButtons": {
                                        "pickup": {
                                            "title": "Pickup",
                                            "action": [{
                                                "operation": "contract",
                                                "contract": "truckerPickupOk",
                                                "parameters": {"popcode": "@popcode"},
                                                "outputs": {"status": "@status", "txId": "@txId"}
                                            }, {
                                                "operation": "navigate",
                                                "resetStack": true,
                                                "forceUpdate": true,
                                                "screen": "Home"
                                            }],
                                            "roles": ["admin", "trucker"]
                                        },
                                        "cancel": {
                                            "title": "Cancel",
                                            "action": [{"operation": "navigate", "resetStack": true, "screen": "Home"}]
                                        }
                                    }
                                },
                                "TruckerShow": {
                                    "name": "TruckerShow",
                                    "title": "Truck Popcode",
                                    "api": "/api/mobile",
                                    "parameters": {"container": "@container", "popcode": "@popcode", "user": "@user"},
                                    "outputs": {"popcode": "@container"},
                                    "tabs": {
                                        "tab1": {
                                            "title": "Truck Contents",
                                            "screenForm": {
                                                "privateKey": ["trucker", "admin"],
                                                "publicKey": ["winemaker", "trucker", "admin"],
                                                "fields": {
                                                    "type": "object",
                                                    "properties": {
                                                        "popcode": {
                                                            "type": "object",
                                                            "properties": {
                                                                "name": {
                                                                    "type": "string",
                                                                    "value": "@popcode.popcodeName",
                                                                    "options": {"editable": false}
                                                                },
                                                                "address": {
                                                                    "type": "string",
                                                                    "value": "@popcode.address",
                                                                    "options": {"editable": false}
                                                                },
                                                                "currentState": {
                                                                    "type": "string",
                                                                    "value": "@popcode.spot",
                                                                    "options": {"editable": false}
                                                                }
                                                            },
                                                            "required": ["name", "address", "currentState"]
                                                        },
                                                        "truckContents": {
                                                            "type": "object",
                                                            "properties": {
                                                                "Amount": {
                                                                    "type": "number",
                                                                    "value": "@popcode.appData.wineBottles",
                                                                    "options": {"editable": false}
                                                                },
                                                                "Unit": {
                                                                    "type": "string",
                                                                    "value": "@popcode.appData.wineUnit",
                                                                    "options": {"editable": false}
                                                                }
                                                            }
                                                        }
                                                    }
                                                },
                                                "options": {"auto": "labels"}
                                            }
                                        }, "tab2": {"title": "Popcode Graph", "graphView": {"visName": "wine"}}
                                    },
                                    "screenButtons": {
                                        "ok": {
                                            "title": "Ok",
                                            "action": [{"operation": "navigate", "resetStack": true, "screen": "Home"}]
                                        }
                                    }
                                }
                            },
                            "contractLib": {
                                "name": "Wine SmartContract Library",
                                "version": "1.0",
                                "slug": "wine_1_0",
                                "libs": ["base64_Y2xhc3MgU21hcnRDb250cmFjdEJhc2UgewogIGNvbnN0cnVjdG9yKGhvb2tzKSB7CiAgICAgIHRoaXMuaG9va3MgPSBob29rczsKICAgICAgdGhpcy5zdGF0ZSA9IGhvb2tzLnN0YXRlOwogICAgICB0aGlzLmRlYnVnTG9nID0gaG9va3MuZGVidWdMb2c7CiAgICAgIHRoaXMuZGVidWdMb2coJ2NvbnN0cnVjdCBTbWFydENvbnRyYWN0QmFzZScpOwogIH0KICBkZWJ1Z1NpemUobykgewogICAgdmFyIHMgPSBKU09OLnN0cmluZ2lmeShvKTsKICAgIHRoaXMuZGVidWdMb2coYHNpemU6ICR7cy5sZW5ndGgvMTAyNH0ga2ApOwogIH0KICBhc3luYyBieU5hbWUocE5hbWUpIHsKICAgIHZhciBhcGkgPSB0aGlzLmhvb2tzLnN0YWNrLmFwaTsKICAgIHZhciB1cmwgPSAnL3AvbmFtZS8nICsgcE5hbWU7CiAgICBjb25zdCByZXMgPSBhd2FpdCBhcGkuZ2V0KHVybCk7CiAgICByZXR1cm4gcmVzLmJvZHk7CiAgfQogIGFzeW5jIG9uZUJ5TmFtZShwTmFtZSkgewogICAgdmFyIF8gPSB0aGlzLmhvb2tzLl87CiAgICB2YXIgYXBpID0gdGhpcy5ob29rcy5zdGFjay5hcGk7CiAgICB2YXIgdXJsID0gJy9wL25hbWUvJyArIHBOYW1lOwogICAgY29uc3QgcmVzID0gYXdhaXQgYXBpLmdldCh1cmwpOwogICAgdmFyIHBvcGNvZGVzID0gIV8uaXNOaWwocmVzKQogICAgICYmICFfLmlzTmlsKHJlcy5ib2R5KQogICAgICYmICFfLmlzTmlsKHJlcy5ib2R5LnBvcGNvZGVzKSA/IHJlcy5ib2R5LnBvcGNvZGVzIDogbnVsbDsKICAgIHZhciBwb3Bjb2RlID0gXy5pc0FycmF5KHBvcGNvZGVzKSAmJiBwb3Bjb2Rlcy5sZW5ndGggPiAwCiAgICAgPyBwb3Bjb2Rlc1swXSA6IG51bGw7CiAgICByZXR1cm4gcG9wY29kZTsKICB9CiAgYXN5bmMgYmFsYW5jZShhZGRyZXNzKSB7CiAgICB2YXIgYXBpID0gdGhpcy5ob29rcy5zdGFjay5hcGk7CiAgICB2YXIgdXJsID0gJy9wL2JhbGFuY2UvJyArIGFkZHJlc3M7CiAgICBjb25zdCByZXMgPSBhd2FpdCBhcGkuZ2V0KHVybCk7CiAgICByZXR1cm4gcmVzLmJvZHk7CiAgfQogIGFzeW5jIGdlbmVyYXRlKCkgewogICAgdmFyIGFwaSA9IHRoaXMuaG9va3Muc3RhY2suYXBpOwogICAgdmFyIHVybCA9ICcvcC9nZW5lcmF0ZSc7CiAgICBjb25zdCByZXMgPSBhd2FpdCBhcGkuZ2V0KHVybCk7CiAgICByZXR1cm4gcmVzLmJvZHk7CiAgfQogIGFzeW5jIGNvbnRhaW5lclBvcGNvZGUoYWRkcmVzcykgewogICAgdmFyIGFwaSA9IHRoaXMuaG9va3Muc3RhY2suYXBpQ2F5bGV5OwogICAgdmFyIHVybCA9ICcvY29udGFpbmVyUG9wY29kZS8nICsgYWRkcmVzczsKICAgIGNvbnN0IHJlcyA9IGF3YWl0IGFwaS5nZXQodXJsKTsKICAgIHJldHVybiByZXMuYm9keTsKICB9CiAgYXN5bmMgYm9tUG9wY29kZXMoYWRkcmVzcykgewogICAgdmFyIGFwaSA9IHRoaXMuaG9va3Muc3RhY2suYXBpQ2F5bGV5OwogICAgdmFyIHVybCA9ICcvYm9tUG9wY29kZXMvJyArIGFkZHJlc3M7CiAgICBjb25zdCByZXMgPSBhd2FpdCBhcGkuZ2V0KHVybCk7CiAgICByZXR1cm4gcmVzLmJvZHk7CiAgfQogIGFzeW5jIHNpZ25NZXNzYWdlKGZpZWxkcyxwcml2YXRlS2V5KSB7CiAgICB2YXIgYXBpID0gdGhpcy5ob29rcy5zdGFjay5hcGk7CiAgICB2YXIgYm9keSA9IHsKICAgICAgZmllbGRzLAogICAgICBwcml2YXRlS2V5CiAgICB9OwogICAgdmFyIHVybCA9ICcvY3J5cHRvL3NpZ25NZXNzYWdlJzsKICAgIHRoaXMuZGVidWdMb2coJyoqKioqKioqKioqIHNpZ25NZXNzYWdlJyk7CiAgICB0aGlzLmRlYnVnTG9nKHtib2R5fSk7CiAgICBjb25zdCByZXMgPSBhd2FpdCBhcGkucG9zdCh1cmwsIHtib2R5fSk7CiAgICB0aGlzLmRlYnVnTG9nKHtib2R5OiByZXMuYm9keX0pOwogICAgcmV0dXJuIHJlcy5ib2R5OwogIH0KICBhc3luYyBibG9iQ3JlYXRlV2l0aFNpZyhzaWcsYWRkcmVzcyxkYXRhLHB1YmxpY0tleSkgewogICAgdmFyIGFwaSA9IHRoaXMuaG9va3Muc3RhY2suYXBpOwogICAgdmFyIGJvZHkgPSB7CiAgICAgIHNpZywKICAgICAgYWRkcmVzcywKICAgICAgcHVibGljS2V5LAogICAgICBkYXRhCiAgICB9OwogICAgdmFyIHVybCA9ICcvcC9ibG9iQ3JlYXRlV2l0aFNpZyc7CiAgICBjb25zdCByZXMgPSBhd2FpdCBhcGkucG9zdCh1cmwsIHtib2R5fSk7CiAgICByZXR1cm4gcmVzLmJvZHk7CiAgfQogIGFzeW5jIGJsb2JDcmVhdGUoYWRkcmVzcyxkYXRhLHB1YmxpY0tleSxwcml2YXRlS2V5KSB7CiAgICB2YXIgZmllbGRzID0gW107CgogICAgdmFyIHJlcyA9IGF3YWl0IHRoaXMuYmFsYW5jZShhZGRyZXNzKTsKICAgIGZpZWxkcy5wdXNoKHJlcy5iYWxhbmNlLkNvdW50ZXIpOwogICAgZmllbGRzLnB1c2goYWRkcmVzcyk7CiAgICBmaWVsZHMucHVzaChkYXRhKTsKCiAgICByZXMgPSBhd2FpdCB0aGlzLnNpZ25NZXNzYWdlKGZpZWxkcyxwcml2YXRlS2V5KTsKCiAgICByZXMgPSBhd2FpdCB0aGlzLmJsb2JDcmVhdGVXaXRoU2lnKHJlcy5zaWcsYWRkcmVzcyxkYXRhLHB1YmxpY0tleSk7CgogICAgcmV0dXJuIHJlczsKICB9CiAgYXN5bmMgbWludChzaWcsYWRkcmVzcyxkYXRhLHB1YmxpY0tleSxhbW91bnQsdW5pdCkgewogICAgdmFyIGFwaSA9IHRoaXMuaG9va3Muc3RhY2suYXBpOwogICAgdmFyIGJvZHkgPSB7CiAgICAgIHNpZywKICAgICAgYWRkcmVzcywKICAgICAgcHVibGljS2V5LAogICAgICBhbW91bnQsCiAgICAgIHVuaXQsCiAgICAgIGRhdGEKICAgIH07CiAgICB0aGlzLmRlYnVnTG9nKCcqKioqKioqKioqKiBkbyBtaW50Jyk7CiAgICB0aGlzLmRlYnVnTG9nKHtib2R5fSk7CiAgICB0aGlzLmRlYnVnTG9nKHthcGl9KTsKICAgIHRoaXMuZGVidWdTaXplKGJvZHkpOwogICAgdmFyIHVybCA9ICcvcC9taW50JzsKICAgIGNvbnN0IHJlcyA9IGF3YWl0IGFwaS5wb3N0KHVybCwge2JvZHl9KTsKICAgIHRoaXMuZGVidWdMb2coJyoqKioqKioqKioqIG1pbnQgcmVzdWx0Jyk7CiAgICB0aGlzLmRlYnVnTG9nKHJlcyk7CiAgICByZXR1cm4gcmVzOwogIH0KICBhc3luYyBzaWduQW5kTWludChhZGRyZXNzLGRhdGEscHVibGljS2V5LGFtb3VudCx1bml0LHByaXZhdGVLZXkpIHsKICAgIHRoaXMuZGVidWdMb2coJ3NpZ25BbmRNaW50Jyk7CiAgICB0aGlzLmRlYnVnTG9nKHthZGRyZXNzLGRhdGEscHVibGljS2V5LGFtb3VudCx1bml0LHByaXZhdGVLZXl9KTsKICAgIHZhciBmaWVsZHMgPSBbXTsKICAgIHZhciB7IGJhbGFuY2UgfSA9IGF3YWl0IHRoaXMuYmFsYW5jZShhZGRyZXNzKTsKICAgIC8vIHRoaXMuZGVidWdMb2coJyMjIyMjIyMjIyMjIyMjIyMgYmFsYW5jZS5Db3VudGVyOiAnICsgYmFsYW5jZS5Db3VudGVyKTsKICAgIGZpZWxkcy5wdXNoKGJhbGFuY2UuQ291bnRlcik7CiAgICBmaWVsZHMucHVzaChhZGRyZXNzKTsKICAgIGZpZWxkcy5wdXNoKGFtb3VudCk7CiAgICBmaWVsZHMucHVzaCh1bml0KTsKICAgIGZpZWxkcy5wdXNoKGRhdGEpOwoKICAgIHZhciB7IHNpZyB9ID0gYXdhaXQgdGhpcy5zaWduTWVzc2FnZShmaWVsZHMscHJpdmF0ZUtleSk7CgogICAgdmFyIHJlcyA9IGF3YWl0IHRoaXMubWludChzaWcsYWRkcmVzcyxkYXRhLHB1YmxpY0tleSxhbW91bnQsdW5pdCk7CgogICAgcmV0dXJuIHJlczsKICB9CiAgYXN5bmMgd2l0aGRyYXcoc2lnLHByaXZhdGVLZXksZGVzdEFkZHJlc3MsZGVzdEFtb3VudCxkYXRhLHNvdXJjZU91dHB1dCkgewogICAgdmFyIGFwaSA9IHRoaXMuaG9va3Muc3RhY2suYXBpOwogICAgdmFyIGJvZHkgPSB7CiAgICAgIHNpZywKICAgICAgcHJpdmF0ZUtleSwKICAgICAgZGVzdEFkZHJlc3MsCiAgICAgIGRlc3RBbW91bnQsCiAgICAgIGRhdGEsCiAgICAgIHNvdXJjZU91dHB1dAogICAgfTsKICAgIHRoaXMuZGVidWdMb2coJyoqKioqKioqKioqIHdpdGhkcmF3Jyk7CiAgICB0aGlzLmRlYnVnTG9nKHtib2R5fSk7CiAgICB2YXIgdXJsID0gJy9wL3dpdGhkcmF3JzsKICAgIGNvbnN0IHJlcyA9IGF3YWl0IGFwaS5wb3N0KHVybCwge2JvZHl9KTsKICAgIHJldHVybiByZXM7CiAgfQogIGFzeW5jIHNpZ25BbmRXaXRoZHJhdyhwcml2YXRlS2V5LHNvdXJjZUFkZHJlc3MsZGVzdEFkZHJlc3MsZGVzdEFtb3VudCxkYXRhLHNvdXJjZU91dHB1dCkgewogICAgdGhpcy5kZWJ1Z0xvZygnc2lnbkFuZFdpdGhkcmF3Jyk7CiAgICB0aGlzLmRlYnVnTG9nKHtwcml2YXRlS2V5LHNvdXJjZUFkZHJlc3MsZGVzdEFkZHJlc3MsZGVzdEFtb3VudCxkYXRhLHNvdXJjZU91dHB1dH0pOwogICAgdmFyIGZpZWxkcyA9IFtdOwogICAgdmFyIHsgYmFsYW5jZSB9ID0gYXdhaXQgdGhpcy5iYWxhbmNlKHNvdXJjZUFkZHJlc3MpOwogICAgLy8gdGhpcy5kZWJ1Z0xvZygnIyMjIyMjIyMjIyMjIyMjIyBiYWxhbmNlLkNvdW50ZXI6ICcgKyBiYWxhbmNlLkNvdW50ZXIpOwogICAgZmllbGRzLnB1c2goYmFsYW5jZS5Db3VudGVyKTsKICAgIGZpZWxkcy5wdXNoKGRlc3RBZGRyZXNzKTsKICAgIGZpZWxkcy5wdXNoKGRhdGEpOwogICAgZmllbGRzLnB1c2goc291cmNlT3V0cHV0KTsKICAgIGZpZWxkcy5wdXNoKGRlc3RBbW91bnQpOwoKICAgIHZhciB7IHNpZyB9ID0gYXdhaXQgdGhpcy5zaWduTWVzc2FnZShmaWVsZHMscHJpdmF0ZUtleSk7CgogICAgdmFyIHJlcyA9IGF3YWl0IHRoaXMud2l0aGRyYXcoc2lnLHByaXZhdGVLZXksZGVzdEFkZHJlc3MsZGVzdEFtb3VudCxkYXRhLHNvdXJjZU91dHB1dCk7CgogICAgcmV0dXJuIHJlczsKICB9CiAgYXN5bmMgYm9tVXBkYXRlV2l0aFNpZyhzaWcsYWRkcmVzcyxwdWJsaWNLZXksYm9tT3AsYm9tQWRkcmVzcykgewogICAgdmFyIGFwaSA9IHRoaXMuaG9va3Muc3RhY2suYXBpOwogICAgdmFyIGJvZHkgPSB7CiAgICAgIHNpZywKICAgICAgYWRkcmVzcywKICAgICAgcHVibGljS2V5LAogICAgICBib21PcCwKICAgICAgYm9tQWRkcmVzcwogICAgfTsKICAgIHRoaXMuZGVidWdMb2coJyoqKioqKioqKioqIGRvIGJvbVVwZGF0ZScpOwogICAgdGhpcy5kZWJ1Z0xvZyh7Ym9keX0pOwogICAgdGhpcy5kZWJ1Z0xvZyh7YXBpfSk7CiAgICB0aGlzLmRlYnVnU2l6ZShib2R5KTsKICAgIHZhciB1cmwgPSAnL3AvYm9tVXBkYXRlV2l0aFNpZyc7CiAgICBjb25zdCByZXMgPSBhd2FpdCBhcGkucG9zdCh1cmwsIHtib2R5fSk7CiAgICB0aGlzLmRlYnVnTG9nKCcqKioqKioqKioqKiBib21VcGRhdGUgcmVzdWx0Jyk7CiAgICB0aGlzLmRlYnVnTG9nKHJlcyk7CiAgICByZXR1cm4gcmVzOwogIH0KICBhc3luYyBzaWduQW5kVXBkYXRlQm9tKGFkZHJlc3MscHVibGljS2V5LGJvbU9wLGJvbUFkZHJlc3MscHJpdmF0ZUtleSkgewogICAgdGhpcy5kZWJ1Z0xvZygnc2lnbkFuZFVwZGF0ZUJvbScpOwogICAgdGhpcy5kZWJ1Z0xvZyh7YWRkcmVzcyxwdWJsaWNLZXksYm9tT3AsYm9tQWRkcmVzcyxwcml2YXRlS2V5fSk7CiAgICB2YXIgZmllbGRzID0gW107CiAgICB2YXIgeyBiYWxhbmNlIH0gPSBhd2FpdCB0aGlzLmJhbGFuY2UoYWRkcmVzcyk7CiAgICAvLyB0aGlzLmRlYnVnTG9nKCcjIyMjIyMjIyMjIyMjIyMjIGJhbGFuY2UuQ291bnRlcjogJyArIGJhbGFuY2UuQ291bnRlcik7CiAgICBmaWVsZHMucHVzaChiYWxhbmNlLkNvdW50ZXIpOwogICAgZmllbGRzLnB1c2goYWRkcmVzcyk7CiAgICBmaWVsZHMucHVzaChib21PcCk7CiAgICBmaWVsZHMucHVzaChib21BZGRyZXNzKTsKCiAgICB2YXIgeyBzaWcgfSA9IGF3YWl0IHRoaXMuc2lnbk1lc3NhZ2UoZmllbGRzLHByaXZhdGVLZXkpOwoKICAgIHZhciByZXMgPSBhd2FpdCB0aGlzLmJvbVVwZGF0ZVdpdGhTaWcoc2lnLGFkZHJlc3MscHVibGljS2V5LGJvbU9wLGJvbUFkZHJlc3MpOwoKICAgIHJldHVybiByZXM7CiAgfQp9Owo=", "base64_Y2xhc3MgU21hcnRDb250cmFjdCBleHRlbmRzIFNtYXJ0Q29udHJhY3RCYXNlIHsKICBjb25zdHJ1Y3Rvcihob29rcykgewogICAgICBzdXBlcihob29rcykKICAgICAgdGhpcy5kZWJ1Z0xvZygnKioqKioqKioqKioqKiogU21hcnRDb250cmFjdCcpOwogIH0KCiAgYXN5bmMgZWNobygpIHsKICAgICAgdGhpcy5kZWJ1Z0xvZygnZWNobycpOwogICAgICB2YXIgcnZhbCA9IHsKICAgICAgICAgIGRhdGE6ICdoZWxsbycKICAgICAgfTsKICAgICAgdGhpcy5ob29rcy5maW5pc2gucmVzb2x2ZShydmFsKTsKICB9CgogIGFzeW5jIHdpbmVtYWtlck1pbnRPaygpIHsgCiAgICB0aGlzLmRlYnVnTG9nKCdleGVjdXRlIHdpbmVtYWtlck1pbnRPaycpOwogICAgICB2YXIgXyA9IHRoaXMuaG9va3MuXzsKICAgICAgdmFyIHNzID0gdGhpcy5ob29rcy5zY3JlZW5TdGF0ZTsKICAgICAgdmFyIGFwcCA9IHRoaXMuaG9va3MuYXBwOwogICAgICB2YXIgdXNlckNyZWRlbnRpYWxzID0gYXBwLmdldEFwcFN0YXRlKCd1c2VyQ3JlZGVudGlhbHMnKTsKICAgICAgdmFyIHB1YmxpY0tleSA9IHVzZXJDcmVkZW50aWFscy5wdWJsaWNLZXk7CiAgICAgIHZhciBwcml2YXRlS2V5ID0gdXNlckNyZWRlbnRpYWxzLnByaXZhdGVLZXk7CiAgICAgIHZhciB3b3JrZmxvdyA9IHNzLndvcmtmbG93OwogICAgICB2YXIgbmV3SWQgPSB0aGlzLmhvb2tzLnNob3J0aWQuZ2VuZXJhdGUoKTsKICAgICAgdmFyIHBvcGNvZGVOYW1lID0gJ1dpbmVfJyArIG5ld0lkOwogICAgICB2YXIgeyBmb3JtIH0gPSB0aGlzLnN0YXRlOwogICAgICB0aGlzLmRlYnVnTG9nKGZvcm0pOwogICAgICB2YXIgeyBwb3Bjb2RlIH0gPSBhd2FpdCB0aGlzLmdlbmVyYXRlKCk7CiAgICAgIHZhciB7IGFkZHJlc3MgfSA9IHBvcGNvZGU7CiAgICAgIHZhciBuZXh0U3BvdCA9ICd0cnVja2VyLnBpY2t1cCc7CiAgICAgIHZhciBhbW91bnQgPSB0aGlzLnRvSW50ZWdlcihmb3JtLm1pbnRXaW5lQm90dGxlcy5BbW91bnQpOwogICAgICB2YXIgdW5pdCA9IGZvcm0ubWludFdpbmVCb3R0bGVzLlVuaXQ7CiAgICAgIHRoaXMuZGVidWdMb2coJyMjIyMjIyMjIyMjIyMlJSUlJSUlJSUlJSUlJCQkJCQkJCQkJCQkJCQgIGdlbmVyYXRlZCB3aW5lbWFrZXIgcG9wY29kZTonKTsKICAgICAgdGhpcy5kZWJ1Z0xvZyh7cG9wY29kZU5hbWUscG9wY29kZX0pOwogICAgICAKICAgICAgdmFyIGRhdGEgPQogICAgICAgICAgewogICAgICAgICAgICAiYXBwRGF0YSI6IHsKICAgICAgICAgICAgICAid29ya2Zsb3dEYXRhIjogZm9ybSwKICAgICAgICAgICAgICAid2luZUJvdHRsZXMiOiBhbW91bnQsCiAgICAgICAgICAgICAgIndpbmVVbml0IjogdW5pdCwKICAgICAgICAgICAgICAic3BvdCI6IG5leHRTcG90LAogICAgICAgICAgICAgICJ3b3JrZmxvd05hbWUiOiBzcy53b3JrZmxvdy5uYW1lLAogICAgICAgICAgICAgICJ3b3JrZmxvd0luc3RhbmNlSWQiOiBuZXdJZCwKICAgICAgICAgICAgICAid29ya2Zsb3dSb290UG9wY29kZSI6ICJ0cnVlIiwKICAgICAgICAgICAgICBwb3Bjb2RlTmFtZSAsCiAgICAgICAgICAgICAgIndvcmtmbG93RGVmIjogd29ya2Zsb3cKICAgICAgICAgICAgfQogICAgICAgICAgfTsKCiAgICAgIHRoaXMuZGVidWdMb2coZGF0YSk7CgogICAgICB2YXIgcmVzID0gYXdhaXQgdGhpcy5zaWduQW5kTWludChhZGRyZXNzLGRhdGEscHVibGljS2V5LGFtb3VudCx1bml0LHByaXZhdGVLZXkpOwogICAgICAvLyB0aGlzLmRlYnVnTG9nKCd0aGlzLnNpZ25BbmRNaW50IHJlcy5ib2R5LmtleXM6ICcgKyBPYmplY3Qua2V5cyhyZXMuYm9keSkpOwoKICAgICAgdmFyIHJ2YWwgPSB7CiAgICAgICAgICBhY3Rpb246IFtdCiAgICAgIH07CiAgICAgIHRoaXMuaG9va3MuZmluaXNoLnJlc29sdmUocnZhbCk7CiAgICAgIHJldHVybiBhZGRyZXNzOwogICAgCiAgfQogIHRvSW50ZWdlcih2YWx1ZSkgewogICAgdmFyIF8gPSB0aGlzLmhvb2tzLl87CiAgICBpZihfLmlzU3RyaW5nKHZhbHVlKSkKICAgICAgcmV0dXJuIHBhcnNlSW50KHZhbHVlKTsKICAgIGVsc2UKICAgICAgcmV0dXJuIHZhbHVlOwogIH0KICBhc3luYyB0cnVja2VyUGlja3VwT2soKSB7IAogICAgdGhpcy5kZWJ1Z0xvZygnZXhlY3V0ZSB0cnVja2VyUGlja3VwT2snKTsKICAgIHZhciBmb3JtID0gdGhpcy5zdGF0ZS5mb3JtOwogICAgdGhpcy5kZWJ1Z0xvZyh7Zm9ybX0pOwogICAgCiAgICB2YXIgcnZhbCA9IHsKICAgICAgICBhY3Rpb246IFtdCiAgICB9OwoKICAgIHZhciBfID0gdGhpcy5ob29rcy5fOwogICAgdmFyIHNzID0gdGhpcy5ob29rcy5zY3JlZW5TdGF0ZTsKICAgIHZhciBhcHAgPSB0aGlzLmhvb2tzLmFwcDsKICAgIHZhciB3b3JrZmxvdyA9IHNzLndvcmtmbG93OwogICAgCiAgICB2YXIgdXNlckNyZWRlbnRpYWxzID0gYXBwLmdldEFwcFN0YXRlKCd1c2VyQ3JlZGVudGlhbHMnKTsKICAgIHZhciB1c2VyUHVibGljS2V5ID0gdXNlckNyZWRlbnRpYWxzLnB1YmxpY0tleTsKICAgIHZhciB1c2VyUHJpdmF0ZUtleSA9IHVzZXJDcmVkZW50aWFscy5wcml2YXRlS2V5OwogICAgCiAgICB2YXIgc3JjUG9wY29kZSA9IHRoaXMuc3RhdGUucG9wY29kZTsKICAgIAoKICAgIHZhciBkZXN0QW1vdW50ID0gdGhpcy50b0ludGVnZXIodGhpcy5zdGF0ZS5mb3JtLndpdGhkcmF3LnBpY2t1cEFtb3VudCk7CiAgICB2YXIgZGVzdE5hbWUgPSAiVHJ1Y2tfIiArIHVzZXJDcmVkZW50aWFscy5zZXNzaW9uSWQ7CiAgICAKICAgIHZhciBkYXRhID0geyBkZXNjcmlwdGlvbjogYHdpdGhkcmF3ICR7ZGVzdEFtb3VudH0gYm90dGxlcyBvZiB3aW5lYCB9OwogICAgdmFyIHNvdXJjZU91dHB1dCA9IDA7CiAgICAKICAgIHRoaXMuZGVidWdMb2coJ2dldCB0cnVjayBwb3Bjb2RlOiAnICsgZGVzdE5hbWUpOwogICAgdmFyIHRydWNrUG9wY29kZSA9IGF3YWl0IHRoaXMub25lQnlOYW1lKGRlc3ROYW1lKTsKICAgIHRoaXMuZGVidWdMb2codHJ1Y2tQb3Bjb2RlKTsKICAgICAKICAgIHRoaXMuZGVidWdMb2coJ2NoZWNrIHNvdXJjZSB3aW5lIGJvdHRsZSBjb3VudCcpOwogICAgdmFyIHdpbmVCb3R0bGVzID0gdGhpcy50b0ludGVnZXIoc3JjUG9wY29kZS5hcHBEYXRhLndpbmVCb3R0bGVzKTsKICAgIHZhciB3aW5lVW5pdCA9IHNyY1BvcGNvZGUuYXBwRGF0YS53aW5lVW5pdDsKICAgIHRoaXMuZGVidWdMb2coe3NyY1BvcGNvZGV9KTsKICAgIHRoaXMuZGVidWdMb2coe3dpbmVCb3R0bGVzLGRlc3RBbW91bnQsd2luZVVuaXR9KTsKICAgIAogICAgaWYoXy5pc05pbChkZXN0QW1vdW50KSB8fCBfLmlzTmFOKGRlc3RBbW91bnQpKSB7CiAgICAgIHRoaXMuZGVidWdMb2coJyoqKioqKioqKioqKioqKioqKiBlcnJvciBiYWQgZGVzdEFtb3VudCknKTsKICAgICAgdGhpcy5ob29rcy5maW5pc2gucmVzb2x2ZShydmFsKTsKICAgICAgcmV0dXJuIDsKICAgIH0KICAgIAogICAgaWYoXy5pc05pbCh3aW5lQm90dGxlcykgfHwgXy5pc05hTihkZXN0QW1vdW50KSkgewogICAgICB0aGlzLmRlYnVnTG9nKCcqKioqKioqKioqKioqKioqKiogZXJyb3IgYmFkIHdpbmVCb3R0bGVzJyk7CiAgICAgIHRoaXMuaG9va3MuZmluaXNoLnJlc29sdmUocnZhbCk7CiAgICAgIHJldHVybiA7CiAgICB9CiAgICAKICAgIGlmKGRlc3RBbW91bnQgPiB3aW5lQm90dGxlcykgewogICAgICB0aGlzLmRlYnVnTG9nKCcqKioqKioqKioqKioqKioqKiogZXJyb3IgZGVzdEFtb3VudCA+IHdpbmVCb3R0bGVzJyk7CiAgICAgIHRoaXMuaG9va3MuZmluaXNoLnJlc29sdmUocnZhbCk7CiAgICAgIHJldHVybiA7CiAgICB9CiAgICAgCiAgICB2YXIgdHJ1Y2tCb3R0bGVzOwogICAgaWYgKF8uaXNOaWwodHJ1Y2tQb3Bjb2RlKSkgewogICAgICB0aGlzLmRlYnVnTG9nKCdNaW50aW5nIHRydWNrIHBvcGNvZGU6ICcgKyBkZXN0TmFtZSk7CiAgICAgIHZhciB0cnVja1Nwb3QgPSAndHJ1Y2tlci5zaG93JzsKICAgICAgdmFyIG5ld0lkID0gdGhpcy5ob29rcy5zaG9ydGlkLmdlbmVyYXRlKCk7CiAgICAgIHZhciB0cnVja1N0YXJ0QW1vdW50ID0gMDsKICAgICAgdmFyIHRydWNrVW5pdCA9ICdib3R0bGVzIG9mIHdpbmUnOwogICAgICB0cnVja0JvdHRsZXMgPSAwOwogICAgICB2YXIgdHJ1Y2tEYXRhID0KICAgICAgICAgIHsKICAgICAgICAgICAgImFwcERhdGEiOiB7CiAgICAgICAgICAgICAgIndvcmtmbG93RGF0YSI6IHt9LAogICAgICAgICAgICAgICJzcG90IjogdHJ1Y2tTcG90LAogICAgICAgICAgICAgICJ3aW5lQm90dGxlcyI6IHRydWNrQm90dGxlcywKICAgICAgICAgICAgICAid2luZVVuaXQiOiB3aW5lVW5pdCwKICAgICAgICAgICAgICAid29ya2Zsb3dOYW1lIjogc3Mud29ya2Zsb3cubmFtZSwKICAgICAgICAgICAgICAid29ya2Zsb3dJbnN0YW5jZUlkIjogbmV3SWQsCiAgICAgICAgICAgICAgIndvcmtmbG93Um9vdFBvcGNvZGUiOiAidHJ1ZSIsCiAgICAgICAgICAgICAgcG9wY29kZU5hbWU6IGRlc3ROYW1lLAogICAgICAgICAgICAgICJ3b3JrZmxvd0RlZiI6IHdvcmtmbG93CiAgICAgICAgICAgIH0KICAgICAgICAgIH07CiAgICAgIHZhciBuZXdQb3Bjb2RlID0gYXdhaXQgdGhpcy5nZW5lcmF0ZSgpOwogICAgICB2YXIgdHJ1Y2tBZGRyZXNzID0gbmV3UG9wY29kZS5wb3Bjb2RlLmFkZHJlc3M7CiAgICAgIAogICAgICB2YXIgcmVzID0gYXdhaXQgdGhpcy5zaWduQW5kTWludCh0cnVja0FkZHJlc3MsdHJ1Y2tEYXRhLHVzZXJQdWJsaWNLZXksdHJ1Y2tTdGFydEFtb3VudCx0cnVja1VuaXQsdXNlclByaXZhdGVLZXkpOwogICAgICAKICAgICAgdHJ1Y2tQb3Bjb2RlID0gYXdhaXQgdGhpcy5vbmVCeU5hbWUoZGVzdE5hbWUpOwogICAgfQogICAgZWxzZSB7CiAgICAgIHRoaXMuZGVidWdMb2coJ0ZvdW5kIGV4aXN0aW5nIHRydWNrIHBvcGNvZGU6ICcgKyBkZXN0TmFtZSk7CiAgICAgIHRydWNrQm90dGxlcyA9IHRydWNrUG9wY29kZS5hcHBEYXRhLndpbmVCb3R0bGVzOwogICAgfQogICAgCiAgICBpZihfLmlzTmlsKHRydWNrUG9wY29kZSkpIHsKICAgICAgdGhpcy5kZWJ1Z0xvZygnKioqKioqKioqKioqKioqKioqIEVycm9yIG1pbnRpbmcgdHJ1Y2sgcG9wY29kZScpOwogICAgICB0aGlzLmhvb2tzLmZpbmlzaC5yZXNvbHZlKHJ2YWwpOwogICAgICByZXR1cm4gOwogICAgfQogICAgCiAgICB0aGlzLmRlYnVnTG9nKCcjIyMjIyMjIyMjIyMjIyMjIHRydWNrIHBvcGNvZGU6Jyk7CiAgICB0aGlzLmRlYnVnTG9nKHRydWNrUG9wY29kZSk7CiAgICAKICAgIHZhciB3cmVzID0gYXdhaXQgdGhpcy5zaWduQW5kV2l0aGRyYXcoCiAgICAgIHNyY1BvcGNvZGUucHJpdmF0ZUtleSwKICAgICAgc3JjUG9wY29kZS5hZGRyZXNzLAogICAgICB0cnVja1BvcGNvZGUuYWRkcmVzcywKICAgICAgZGVzdEFtb3VudCwKICAgICAgZGF0YSwKICAgICAgc291cmNlT3V0cHV0CiAgICApOwogICAgCiAgICB0aGlzLmRlYnVnTG9nKCcjIyMjIyMjIyMjIyMjIyMjIHdpdGhkcmF3IHJlc3VsdDonKTsKICAgIHRoaXMuZGVidWdMb2cod3Jlcyk7CiAgICBydmFsLndyZXMgPSB3cmVzOwogICAgCiAgICB0aGlzLmRlYnVnTG9nKCcjIyMjIyMjIyMjIyMjIyMjIHVwZGF0ZSBzb3VyY2Ugd2luZSBib3R0bGUgY291bnQ6Jyk7CiAgICB2YXIgd2luZUNvdW50ID0gd2luZUJvdHRsZXMgLSBkZXN0QW1vdW50OwogICAgdmFyIHdpbmVEYXRhID0KICAgICAgICB7CiAgICAgICAgICAiYXBwRGF0YSI6IHsKICAgICAgICAgICAgIndpbmVCb3R0bGVzIjogd2luZUNvdW50CiAgICAgICAgICB9CiAgICAgICAgfTsKCiAgICB0aGlzLmRlYnVnTG9nKHdpbmVEYXRhKTsKICAgIHZhciBicmVzID0gYXdhaXQgdGhpcy5ibG9iQ3JlYXRlKAogICAgICBzcmNQb3Bjb2RlLmFkZHJlc3MsCiAgICAgIHdpbmVEYXRhLAogICAgICB1c2VyQ3JlZGVudGlhbHMucHVibGljS2V5LAogICAgICB1c2VyQ3JlZGVudGlhbHMucHJpdmF0ZUtleSk7CiAgICAgIAogICAgdGhpcy5kZWJ1Z0xvZygnIyMjIyMjIyMjIyMjIyMjIyBibG9iQ3JlYXRlIHJlc3VsdDonKTsKICAgIHRoaXMuZGVidWdMb2coYnJlcyk7CiAgICBydmFsLmJyZXMgPSBicmVzOwogICAgCiAgICB0aGlzLmRlYnVnTG9nKCcjIyMjIyMjIyMjIyMjIyMjIHVwZGF0ZSB0cnVjayB3aW5lIGJvdHRsZSBjb3VudDonKTsKICAgIHZhciB0cnVja0NvdW50ID0gdHJ1Y2tCb3R0bGVzICsgZGVzdEFtb3VudDsKICAgIHZhciB0cnVja1dpbmVEYXRhID0KICAgICAgICB7CiAgICAgICAgICAiYXBwRGF0YSI6IHsKICAgICAgICAgICAgIndpbmVCb3R0bGVzIjogdHJ1Y2tDb3VudAogICAgICAgICAgfQogICAgICAgIH07CgogICAgdGhpcy5kZWJ1Z0xvZyh0cnVja1dpbmVEYXRhKTsKICAgIHZhciBicmVzMiA9IGF3YWl0IHRoaXMuYmxvYkNyZWF0ZSgKICAgICAgdHJ1Y2tQb3Bjb2RlLmFkZHJlc3MsCiAgICAgIHRydWNrV2luZURhdGEsCiAgICAgIHVzZXJDcmVkZW50aWFscy5wdWJsaWNLZXksCiAgICAgIHVzZXJDcmVkZW50aWFscy5wcml2YXRlS2V5KTsKICAgICAgCiAgICB0aGlzLmRlYnVnTG9nKCcjIyMjIyMjIyMjIyMjIyMjIHRydWNrIGJsb2JDcmVhdGUgcmVzdWx0OicpOwogICAgdGhpcy5kZWJ1Z0xvZyhicmVzMik7CiAgICBydmFsLmJyZXMyID0gYnJlczI7CiAgICAKICAgIHRoaXMuaG9va3MuZmluaXNoLnJlc29sdmUocnZhbCk7CiAgIH0KCn07Cg=="]
                            }
                        }
                    }
                }
            },
            "type": "transaction",
            "sourceCounter": "gf/ryS1EIscoGwSpBK3qwbqtSIlVWD05zlgZm6vZFWA=",
            "amount": "1000",
            "workflowDef": {
                "title": "Wine V1",
                "name": "wineV1",
                "startScreen": "Home",
                "version": "2.0",
                "steps": {
                    "winemaker.mint": {
                        "step": "winemaker.mint",
                        "title": "Winemaker Mint",
                        "screen": "WinemakerMint"
                    },
                    "trucker.pickup": {"step": "trucker.pickup", "title": "Trucker Pickup", "screen": "TruckerPickup"},
                    "trucker.show": {"step": "trucker.show", "title": "Trucker Show", "screen": "TruckerShow"}
                },
                "appOptions": {"requireLogin": true},
                "screens": {
                    "Home": {
                        "name": "Home",
                        "title": "Home",
                        "api": "/api/mobile",
                        "screenListItems": {
                            "fetchItems": "/popcodeByWorkflowName",
                            "method": "get",
                            "api": "cayley",
                            "fetchParameters": {"workflowName": "wineV1"},
                            "itemDataTypes": {"popcode": "object"},
                            "itemLabel": ["popcodeName"],
                            "itemActions": {
                                "click": {
                                    "title": "Click",
                                    "action": [{
                                        "operation": "startWorkflow",
                                        "replaceCurrent": true,
                                        "parameters": {"spot": "@popcode.spot", "popcode": "@popcode"}
                                    }],
                                    "parameters": {"popcode": "@item"}
                                }
                            }
                        },
                        "screenButtons": {
                            "scan": {
                                "title": "Scan",
                                "action": [{"operation": "navigate", "screen": "Scan"}],
                                "roles": ["admin", "winemaker", "trucker"]
                            },
                            "mint": {
                                "title": "Mint",
                                "action": [{"operation": "navigate", "resetStack": true, "screen": "WinemakerMint"}],
                                "roles": ["admin", "winemaker"]
                            }
                        }
                    },
                    "Scan": {
                        "name": "Scan",
                        "title": "Scan",
                        "api": "/api/mobile",
                        "parameters": {"user": "@user"},
                        "modal": false,
                        "screenScan": {},
                        "startAction": [{
                            "operation": "scanBarcode",
                            "barcodeTypes": ["qr", "code128"],
                            "outputs": {"scanData": "@scanData"}
                        }, {
                            "operation": "routePopcode",
                            "parameters": {"scanData": "@scanData"},
                            "outputs": {"address": "@address"}
                        }, {
                            "operation": "fetch",
                            "route": "/p",
                            "method": "get",
                            "parameters": {"address": "@address"},
                            "outputs": {"popcode": "@popcodes[0]"}
                        }, {
                            "operation": "startWorkflow",
                            "replaceCurrent": true,
                            "parameters": {"spot": "@popcode.spot", "popcode": "@popcode"}
                        }]
                    },
                    "WinemakerMint": {
                        "name": "WinemakerMint",
                        "title": "Winemaker Mint",
                        "api": "/api/mobile",
                        "parameters": {"container": "@container", "popcode": "@popcode", "user": "@user"},
                        "outputs": {"popcode": "@container"},
                        "screenForm": {
                            "fields": {
                                "type": "object",
                                "properties": {
                                    "mintWineBottles": {
                                        "type": "object",
                                        "properties": {
                                            "Amount": {
                                                "type": "string",
                                                "value": "1000",
                                                "options": {"editable": true}
                                            },
                                            "Unit": {
                                                "type": "string",
                                                "value": "bottles of wine",
                                                "options": {"editable": true}
                                            }
                                        },
                                        "required": ["Amount", "Unit"]
                                    }
                                },
                                "required": ["mintWineBottles"]
                            }, "options": {"auto": "labels"}
                        },
                        "screenButtons": {
                            "mint": {
                                "title": "Mint",
                                "action": [{
                                    "operation": "contract",
                                    "contract": "winemakerMintOk",
                                    "parameters": {"popcode": "@popcode"},
                                    "outputs": {"status": "@status", "txId": "@txId"}
                                }, {
                                    "operation": "navigate",
                                    "resetStack": true,
                                    "forceUpdate": true,
                                    "screen": "Home"
                                }],
                                "roles": ["admin", "winemaker"]
                            },
                            "cancel": {
                                "title": "Cancel",
                                "action": [{"operation": "navigate", "resetStack": true, "screen": "Home"}]
                            }
                        }
                    },
                    "TruckerPickup": {
                        "name": "TruckerPickup",
                        "title": "Trucker Wine Pickup",
                        "api": "/api/mobile",
                        "parameters": {"container": "@container", "popcode": "@popcode", "user": "@user"},
                        "outputs": {"popcode": "@container"},
                        "tabs": {
                            "tab1": {
                                "title": "Pickup Wine",
                                "screenForm": {
                                    "privateKey": ["winemaker", "admin"],
                                    "publicKey": ["winemaker", "trucker", "admin"],
                                    "fields": {
                                        "type": "object",
                                        "properties": {
                                            "popcode": {
                                                "type": "object",
                                                "properties": {
                                                    "name": {
                                                        "type": "string",
                                                        "value": "@popcode.popcodeName",
                                                        "options": {"editable": false}
                                                    },
                                                    "address": {
                                                        "type": "string",
                                                        "value": "@popcode.address",
                                                        "options": {"editable": false}
                                                    },
                                                    "currentState": {
                                                        "type": "string",
                                                        "value": "@popcode.spot",
                                                        "options": {"editable": false}
                                                    }
                                                },
                                                "required": ["name", "address", "currentState"]
                                            },
                                            "warehouseContents": {
                                                "type": "object",
                                                "properties": {
                                                    "Amount": {
                                                        "type": "number",
                                                        "value": "@popcode.appData.wineBottles",
                                                        "options": {"editable": false}
                                                    },
                                                    "Unit": {
                                                        "type": "string",
                                                        "value": "@popcode.appData.wineUnit",
                                                        "options": {"editable": false}
                                                    }
                                                }
                                            },
                                            "withdraw": {
                                                "type": "object",
                                                "properties": {
                                                    "pickupAmount": {
                                                        "type": "number",
                                                        "options": {"editable": true}
                                                    }
                                                },
                                                "required": ["pickupAmount"]
                                            }
                                        },
                                        "required": ["withdraw"]
                                    },
                                    "options": {"auto": "labels"}
                                }
                            }, "tab2": {"title": "Popcode Graph", "graphView": {"visName": "wine"}}
                        },
                        "screenButtons": {
                            "pickup": {
                                "title": "Pickup",
                                "action": [{
                                    "operation": "contract",
                                    "contract": "truckerPickupOk",
                                    "parameters": {"popcode": "@popcode"},
                                    "outputs": {"status": "@status", "txId": "@txId"}
                                }, {
                                    "operation": "navigate",
                                    "resetStack": true,
                                    "forceUpdate": true,
                                    "screen": "Home"
                                }],
                                "roles": ["admin", "trucker"]
                            },
                            "cancel": {
                                "title": "Cancel",
                                "action": [{"operation": "navigate", "resetStack": true, "screen": "Home"}]
                            }
                        }
                    },
                    "TruckerShow": {
                        "name": "TruckerShow",
                        "title": "Truck Popcode",
                        "api": "/api/mobile",
                        "parameters": {"container": "@container", "popcode": "@popcode", "user": "@user"},
                        "outputs": {"popcode": "@container"},
                        "tabs": {
                            "tab1": {
                                "title": "Truck Contents",
                                "screenForm": {
                                    "privateKey": ["trucker", "admin"],
                                    "publicKey": ["winemaker", "trucker", "admin"],
                                    "fields": {
                                        "type": "object",
                                        "properties": {
                                            "popcode": {
                                                "type": "object",
                                                "properties": {
                                                    "name": {
                                                        "type": "string",
                                                        "value": "@popcode.popcodeName",
                                                        "options": {"editable": false}
                                                    },
                                                    "address": {
                                                        "type": "string",
                                                        "value": "@popcode.address",
                                                        "options": {"editable": false}
                                                    },
                                                    "currentState": {
                                                        "type": "string",
                                                        "value": "@popcode.spot",
                                                        "options": {"editable": false}
                                                    }
                                                },
                                                "required": ["name", "address", "currentState"]
                                            },
                                            "truckContents": {
                                                "type": "object",
                                                "properties": {
                                                    "Amount": {
                                                        "type": "number",
                                                        "value": "@popcode.appData.wineBottles",
                                                        "options": {"editable": false}
                                                    },
                                                    "Unit": {
                                                        "type": "string",
                                                        "value": "@popcode.appData.wineUnit",
                                                        "options": {"editable": false}
                                                    }
                                                }
                                            }
                                        }
                                    },
                                    "options": {"auto": "labels"}
                                }
                            }, "tab2": {"title": "Popcode Graph", "graphView": {"visName": "wine"}}
                        },
                        "screenButtons": {
                            "ok": {
                                "title": "Ok",
                                "action": [{"operation": "navigate", "resetStack": true, "screen": "Home"}]
                            }
                        }
                    }
                },
                "contractLib": {
                    "name": "Wine SmartContract Library",
                    "version": "1.0",
                    "slug": "wine_1_0",
                    "libs": ["base64_Y2xhc3MgU21hcnRDb250cmFjdEJhc2UgewogIGNvbnN0cnVjdG9yKGhvb2tzKSB7CiAgICAgIHRoaXMuaG9va3MgPSBob29rczsKICAgICAgdGhpcy5zdGF0ZSA9IGhvb2tzLnN0YXRlOwogICAgICB0aGlzLmRlYnVnTG9nID0gaG9va3MuZGVidWdMb2c7CiAgICAgIHRoaXMuZGVidWdMb2coJ2NvbnN0cnVjdCBTbWFydENvbnRyYWN0QmFzZScpOwogIH0KICBkZWJ1Z1NpemUobykgewogICAgdmFyIHMgPSBKU09OLnN0cmluZ2lmeShvKTsKICAgIHRoaXMuZGVidWdMb2coYHNpemU6ICR7cy5sZW5ndGgvMTAyNH0ga2ApOwogIH0KICBhc3luYyBieU5hbWUocE5hbWUpIHsKICAgIHZhciBhcGkgPSB0aGlzLmhvb2tzLnN0YWNrLmFwaTsKICAgIHZhciB1cmwgPSAnL3AvbmFtZS8nICsgcE5hbWU7CiAgICBjb25zdCByZXMgPSBhd2FpdCBhcGkuZ2V0KHVybCk7CiAgICByZXR1cm4gcmVzLmJvZHk7CiAgfQogIGFzeW5jIG9uZUJ5TmFtZShwTmFtZSkgewogICAgdmFyIF8gPSB0aGlzLmhvb2tzLl87CiAgICB2YXIgYXBpID0gdGhpcy5ob29rcy5zdGFjay5hcGk7CiAgICB2YXIgdXJsID0gJy9wL25hbWUvJyArIHBOYW1lOwogICAgY29uc3QgcmVzID0gYXdhaXQgYXBpLmdldCh1cmwpOwogICAgdmFyIHBvcGNvZGVzID0gIV8uaXNOaWwocmVzKQogICAgICYmICFfLmlzTmlsKHJlcy5ib2R5KQogICAgICYmICFfLmlzTmlsKHJlcy5ib2R5LnBvcGNvZGVzKSA/IHJlcy5ib2R5LnBvcGNvZGVzIDogbnVsbDsKICAgIHZhciBwb3Bjb2RlID0gXy5pc0FycmF5KHBvcGNvZGVzKSAmJiBwb3Bjb2Rlcy5sZW5ndGggPiAwCiAgICAgPyBwb3Bjb2Rlc1swXSA6IG51bGw7CiAgICByZXR1cm4gcG9wY29kZTsKICB9CiAgYXN5bmMgYmFsYW5jZShhZGRyZXNzKSB7CiAgICB2YXIgYXBpID0gdGhpcy5ob29rcy5zdGFjay5hcGk7CiAgICB2YXIgdXJsID0gJy9wL2JhbGFuY2UvJyArIGFkZHJlc3M7CiAgICBjb25zdCByZXMgPSBhd2FpdCBhcGkuZ2V0KHVybCk7CiAgICByZXR1cm4gcmVzLmJvZHk7CiAgfQogIGFzeW5jIGdlbmVyYXRlKCkgewogICAgdmFyIGFwaSA9IHRoaXMuaG9va3Muc3RhY2suYXBpOwogICAgdmFyIHVybCA9ICcvcC9nZW5lcmF0ZSc7CiAgICBjb25zdCByZXMgPSBhd2FpdCBhcGkuZ2V0KHVybCk7CiAgICByZXR1cm4gcmVzLmJvZHk7CiAgfQogIGFzeW5jIGNvbnRhaW5lclBvcGNvZGUoYWRkcmVzcykgewogICAgdmFyIGFwaSA9IHRoaXMuaG9va3Muc3RhY2suYXBpQ2F5bGV5OwogICAgdmFyIHVybCA9ICcvY29udGFpbmVyUG9wY29kZS8nICsgYWRkcmVzczsKICAgIGNvbnN0IHJlcyA9IGF3YWl0IGFwaS5nZXQodXJsKTsKICAgIHJldHVybiByZXMuYm9keTsKICB9CiAgYXN5bmMgYm9tUG9wY29kZXMoYWRkcmVzcykgewogICAgdmFyIGFwaSA9IHRoaXMuaG9va3Muc3RhY2suYXBpQ2F5bGV5OwogICAgdmFyIHVybCA9ICcvYm9tUG9wY29kZXMvJyArIGFkZHJlc3M7CiAgICBjb25zdCByZXMgPSBhd2FpdCBhcGkuZ2V0KHVybCk7CiAgICByZXR1cm4gcmVzLmJvZHk7CiAgfQogIGFzeW5jIHNpZ25NZXNzYWdlKGZpZWxkcyxwcml2YXRlS2V5KSB7CiAgICB2YXIgYXBpID0gdGhpcy5ob29rcy5zdGFjay5hcGk7CiAgICB2YXIgYm9keSA9IHsKICAgICAgZmllbGRzLAogICAgICBwcml2YXRlS2V5CiAgICB9OwogICAgdmFyIHVybCA9ICcvY3J5cHRvL3NpZ25NZXNzYWdlJzsKICAgIHRoaXMuZGVidWdMb2coJyoqKioqKioqKioqIHNpZ25NZXNzYWdlJyk7CiAgICB0aGlzLmRlYnVnTG9nKHtib2R5fSk7CiAgICBjb25zdCByZXMgPSBhd2FpdCBhcGkucG9zdCh1cmwsIHtib2R5fSk7CiAgICB0aGlzLmRlYnVnTG9nKHtib2R5OiByZXMuYm9keX0pOwogICAgcmV0dXJuIHJlcy5ib2R5OwogIH0KICBhc3luYyBibG9iQ3JlYXRlV2l0aFNpZyhzaWcsYWRkcmVzcyxkYXRhLHB1YmxpY0tleSkgewogICAgdmFyIGFwaSA9IHRoaXMuaG9va3Muc3RhY2suYXBpOwogICAgdmFyIGJvZHkgPSB7CiAgICAgIHNpZywKICAgICAgYWRkcmVzcywKICAgICAgcHVibGljS2V5LAogICAgICBkYXRhCiAgICB9OwogICAgdmFyIHVybCA9ICcvcC9ibG9iQ3JlYXRlV2l0aFNpZyc7CiAgICBjb25zdCByZXMgPSBhd2FpdCBhcGkucG9zdCh1cmwsIHtib2R5fSk7CiAgICByZXR1cm4gcmVzLmJvZHk7CiAgfQogIGFzeW5jIGJsb2JDcmVhdGUoYWRkcmVzcyxkYXRhLHB1YmxpY0tleSxwcml2YXRlS2V5KSB7CiAgICB2YXIgZmllbGRzID0gW107CgogICAgdmFyIHJlcyA9IGF3YWl0IHRoaXMuYmFsYW5jZShhZGRyZXNzKTsKICAgIGZpZWxkcy5wdXNoKHJlcy5iYWxhbmNlLkNvdW50ZXIpOwogICAgZmllbGRzLnB1c2goYWRkcmVzcyk7CiAgICBmaWVsZHMucHVzaChkYXRhKTsKCiAgICByZXMgPSBhd2FpdCB0aGlzLnNpZ25NZXNzYWdlKGZpZWxkcyxwcml2YXRlS2V5KTsKCiAgICByZXMgPSBhd2FpdCB0aGlzLmJsb2JDcmVhdGVXaXRoU2lnKHJlcy5zaWcsYWRkcmVzcyxkYXRhLHB1YmxpY0tleSk7CgogICAgcmV0dXJuIHJlczsKICB9CiAgYXN5bmMgbWludChzaWcsYWRkcmVzcyxkYXRhLHB1YmxpY0tleSxhbW91bnQsdW5pdCkgewogICAgdmFyIGFwaSA9IHRoaXMuaG9va3Muc3RhY2suYXBpOwogICAgdmFyIGJvZHkgPSB7CiAgICAgIHNpZywKICAgICAgYWRkcmVzcywKICAgICAgcHVibGljS2V5LAogICAgICBhbW91bnQsCiAgICAgIHVuaXQsCiAgICAgIGRhdGEKICAgIH07CiAgICB0aGlzLmRlYnVnTG9nKCcqKioqKioqKioqKiBkbyBtaW50Jyk7CiAgICB0aGlzLmRlYnVnTG9nKHtib2R5fSk7CiAgICB0aGlzLmRlYnVnTG9nKHthcGl9KTsKICAgIHRoaXMuZGVidWdTaXplKGJvZHkpOwogICAgdmFyIHVybCA9ICcvcC9taW50JzsKICAgIGNvbnN0IHJlcyA9IGF3YWl0IGFwaS5wb3N0KHVybCwge2JvZHl9KTsKICAgIHRoaXMuZGVidWdMb2coJyoqKioqKioqKioqIG1pbnQgcmVzdWx0Jyk7CiAgICB0aGlzLmRlYnVnTG9nKHJlcyk7CiAgICByZXR1cm4gcmVzOwogIH0KICBhc3luYyBzaWduQW5kTWludChhZGRyZXNzLGRhdGEscHVibGljS2V5LGFtb3VudCx1bml0LHByaXZhdGVLZXkpIHsKICAgIHRoaXMuZGVidWdMb2coJ3NpZ25BbmRNaW50Jyk7CiAgICB0aGlzLmRlYnVnTG9nKHthZGRyZXNzLGRhdGEscHVibGljS2V5LGFtb3VudCx1bml0LHByaXZhdGVLZXl9KTsKICAgIHZhciBmaWVsZHMgPSBbXTsKICAgIHZhciB7IGJhbGFuY2UgfSA9IGF3YWl0IHRoaXMuYmFsYW5jZShhZGRyZXNzKTsKICAgIC8vIHRoaXMuZGVidWdMb2coJyMjIyMjIyMjIyMjIyMjIyMgYmFsYW5jZS5Db3VudGVyOiAnICsgYmFsYW5jZS5Db3VudGVyKTsKICAgIGZpZWxkcy5wdXNoKGJhbGFuY2UuQ291bnRlcik7CiAgICBmaWVsZHMucHVzaChhZGRyZXNzKTsKICAgIGZpZWxkcy5wdXNoKGFtb3VudCk7CiAgICBmaWVsZHMucHVzaCh1bml0KTsKICAgIGZpZWxkcy5wdXNoKGRhdGEpOwoKICAgIHZhciB7IHNpZyB9ID0gYXdhaXQgdGhpcy5zaWduTWVzc2FnZShmaWVsZHMscHJpdmF0ZUtleSk7CgogICAgdmFyIHJlcyA9IGF3YWl0IHRoaXMubWludChzaWcsYWRkcmVzcyxkYXRhLHB1YmxpY0tleSxhbW91bnQsdW5pdCk7CgogICAgcmV0dXJuIHJlczsKICB9CiAgYXN5bmMgd2l0aGRyYXcoc2lnLHByaXZhdGVLZXksZGVzdEFkZHJlc3MsZGVzdEFtb3VudCxkYXRhLHNvdXJjZU91dHB1dCkgewogICAgdmFyIGFwaSA9IHRoaXMuaG9va3Muc3RhY2suYXBpOwogICAgdmFyIGJvZHkgPSB7CiAgICAgIHNpZywKICAgICAgcHJpdmF0ZUtleSwKICAgICAgZGVzdEFkZHJlc3MsCiAgICAgIGRlc3RBbW91bnQsCiAgICAgIGRhdGEsCiAgICAgIHNvdXJjZU91dHB1dAogICAgfTsKICAgIHRoaXMuZGVidWdMb2coJyoqKioqKioqKioqIHdpdGhkcmF3Jyk7CiAgICB0aGlzLmRlYnVnTG9nKHtib2R5fSk7CiAgICB2YXIgdXJsID0gJy9wL3dpdGhkcmF3JzsKICAgIGNvbnN0IHJlcyA9IGF3YWl0IGFwaS5wb3N0KHVybCwge2JvZHl9KTsKICAgIHJldHVybiByZXM7CiAgfQogIGFzeW5jIHNpZ25BbmRXaXRoZHJhdyhwcml2YXRlS2V5LHNvdXJjZUFkZHJlc3MsZGVzdEFkZHJlc3MsZGVzdEFtb3VudCxkYXRhLHNvdXJjZU91dHB1dCkgewogICAgdGhpcy5kZWJ1Z0xvZygnc2lnbkFuZFdpdGhkcmF3Jyk7CiAgICB0aGlzLmRlYnVnTG9nKHtwcml2YXRlS2V5LHNvdXJjZUFkZHJlc3MsZGVzdEFkZHJlc3MsZGVzdEFtb3VudCxkYXRhLHNvdXJjZU91dHB1dH0pOwogICAgdmFyIGZpZWxkcyA9IFtdOwogICAgdmFyIHsgYmFsYW5jZSB9ID0gYXdhaXQgdGhpcy5iYWxhbmNlKHNvdXJjZUFkZHJlc3MpOwogICAgLy8gdGhpcy5kZWJ1Z0xvZygnIyMjIyMjIyMjIyMjIyMjIyBiYWxhbmNlLkNvdW50ZXI6ICcgKyBiYWxhbmNlLkNvdW50ZXIpOwogICAgZmllbGRzLnB1c2goYmFsYW5jZS5Db3VudGVyKTsKICAgIGZpZWxkcy5wdXNoKGRlc3RBZGRyZXNzKTsKICAgIGZpZWxkcy5wdXNoKGRhdGEpOwogICAgZmllbGRzLnB1c2goc291cmNlT3V0cHV0KTsKICAgIGZpZWxkcy5wdXNoKGRlc3RBbW91bnQpOwoKICAgIHZhciB7IHNpZyB9ID0gYXdhaXQgdGhpcy5zaWduTWVzc2FnZShmaWVsZHMscHJpdmF0ZUtleSk7CgogICAgdmFyIHJlcyA9IGF3YWl0IHRoaXMud2l0aGRyYXcoc2lnLHByaXZhdGVLZXksZGVzdEFkZHJlc3MsZGVzdEFtb3VudCxkYXRhLHNvdXJjZU91dHB1dCk7CgogICAgcmV0dXJuIHJlczsKICB9CiAgYXN5bmMgYm9tVXBkYXRlV2l0aFNpZyhzaWcsYWRkcmVzcyxwdWJsaWNLZXksYm9tT3AsYm9tQWRkcmVzcykgewogICAgdmFyIGFwaSA9IHRoaXMuaG9va3Muc3RhY2suYXBpOwogICAgdmFyIGJvZHkgPSB7CiAgICAgIHNpZywKICAgICAgYWRkcmVzcywKICAgICAgcHVibGljS2V5LAogICAgICBib21PcCwKICAgICAgYm9tQWRkcmVzcwogICAgfTsKICAgIHRoaXMuZGVidWdMb2coJyoqKioqKioqKioqIGRvIGJvbVVwZGF0ZScpOwogICAgdGhpcy5kZWJ1Z0xvZyh7Ym9keX0pOwogICAgdGhpcy5kZWJ1Z0xvZyh7YXBpfSk7CiAgICB0aGlzLmRlYnVnU2l6ZShib2R5KTsKICAgIHZhciB1cmwgPSAnL3AvYm9tVXBkYXRlV2l0aFNpZyc7CiAgICBjb25zdCByZXMgPSBhd2FpdCBhcGkucG9zdCh1cmwsIHtib2R5fSk7CiAgICB0aGlzLmRlYnVnTG9nKCcqKioqKioqKioqKiBib21VcGRhdGUgcmVzdWx0Jyk7CiAgICB0aGlzLmRlYnVnTG9nKHJlcyk7CiAgICByZXR1cm4gcmVzOwogIH0KICBhc3luYyBzaWduQW5kVXBkYXRlQm9tKGFkZHJlc3MscHVibGljS2V5LGJvbU9wLGJvbUFkZHJlc3MscHJpdmF0ZUtleSkgewogICAgdGhpcy5kZWJ1Z0xvZygnc2lnbkFuZFVwZGF0ZUJvbScpOwogICAgdGhpcy5kZWJ1Z0xvZyh7YWRkcmVzcyxwdWJsaWNLZXksYm9tT3AsYm9tQWRkcmVzcyxwcml2YXRlS2V5fSk7CiAgICB2YXIgZmllbGRzID0gW107CiAgICB2YXIgeyBiYWxhbmNlIH0gPSBhd2FpdCB0aGlzLmJhbGFuY2UoYWRkcmVzcyk7CiAgICAvLyB0aGlzLmRlYnVnTG9nKCcjIyMjIyMjIyMjIyMjIyMjIGJhbGFuY2UuQ291bnRlcjogJyArIGJhbGFuY2UuQ291bnRlcik7CiAgICBmaWVsZHMucHVzaChiYWxhbmNlLkNvdW50ZXIpOwogICAgZmllbGRzLnB1c2goYWRkcmVzcyk7CiAgICBmaWVsZHMucHVzaChib21PcCk7CiAgICBmaWVsZHMucHVzaChib21BZGRyZXNzKTsKCiAgICB2YXIgeyBzaWcgfSA9IGF3YWl0IHRoaXMuc2lnbk1lc3NhZ2UoZmllbGRzLHByaXZhdGVLZXkpOwoKICAgIHZhciByZXMgPSBhd2FpdCB0aGlzLmJvbVVwZGF0ZVdpdGhTaWcoc2lnLGFkZHJlc3MscHVibGljS2V5LGJvbU9wLGJvbUFkZHJlc3MpOwoKICAgIHJldHVybiByZXM7CiAgfQp9Owo=", "base64_Y2xhc3MgU21hcnRDb250cmFjdCBleHRlbmRzIFNtYXJ0Q29udHJhY3RCYXNlIHsKICBjb25zdHJ1Y3Rvcihob29rcykgewogICAgICBzdXBlcihob29rcykKICAgICAgdGhpcy5kZWJ1Z0xvZygnKioqKioqKioqKioqKiogU21hcnRDb250cmFjdCcpOwogIH0KCiAgYXN5bmMgZWNobygpIHsKICAgICAgdGhpcy5kZWJ1Z0xvZygnZWNobycpOwogICAgICB2YXIgcnZhbCA9IHsKICAgICAgICAgIGRhdGE6ICdoZWxsbycKICAgICAgfTsKICAgICAgdGhpcy5ob29rcy5maW5pc2gucmVzb2x2ZShydmFsKTsKICB9CgogIGFzeW5jIHdpbmVtYWtlck1pbnRPaygpIHsgCiAgICB0aGlzLmRlYnVnTG9nKCdleGVjdXRlIHdpbmVtYWtlck1pbnRPaycpOwogICAgICB2YXIgXyA9IHRoaXMuaG9va3MuXzsKICAgICAgdmFyIHNzID0gdGhpcy5ob29rcy5zY3JlZW5TdGF0ZTsKICAgICAgdmFyIGFwcCA9IHRoaXMuaG9va3MuYXBwOwogICAgICB2YXIgdXNlckNyZWRlbnRpYWxzID0gYXBwLmdldEFwcFN0YXRlKCd1c2VyQ3JlZGVudGlhbHMnKTsKICAgICAgdmFyIHB1YmxpY0tleSA9IHVzZXJDcmVkZW50aWFscy5wdWJsaWNLZXk7CiAgICAgIHZhciBwcml2YXRlS2V5ID0gdXNlckNyZWRlbnRpYWxzLnByaXZhdGVLZXk7CiAgICAgIHZhciB3b3JrZmxvdyA9IHNzLndvcmtmbG93OwogICAgICB2YXIgbmV3SWQgPSB0aGlzLmhvb2tzLnNob3J0aWQuZ2VuZXJhdGUoKTsKICAgICAgdmFyIHBvcGNvZGVOYW1lID0gJ1dpbmVfJyArIG5ld0lkOwogICAgICB2YXIgeyBmb3JtIH0gPSB0aGlzLnN0YXRlOwogICAgICB0aGlzLmRlYnVnTG9nKGZvcm0pOwogICAgICB2YXIgeyBwb3Bjb2RlIH0gPSBhd2FpdCB0aGlzLmdlbmVyYXRlKCk7CiAgICAgIHZhciB7IGFkZHJlc3MgfSA9IHBvcGNvZGU7CiAgICAgIHZhciBuZXh0U3BvdCA9ICd0cnVja2VyLnBpY2t1cCc7CiAgICAgIHZhciBhbW91bnQgPSB0aGlzLnRvSW50ZWdlcihmb3JtLm1pbnRXaW5lQm90dGxlcy5BbW91bnQpOwogICAgICB2YXIgdW5pdCA9IGZvcm0ubWludFdpbmVCb3R0bGVzLlVuaXQ7CiAgICAgIHRoaXMuZGVidWdMb2coJyMjIyMjIyMjIyMjIyMlJSUlJSUlJSUlJSUlJCQkJCQkJCQkJCQkJCQgIGdlbmVyYXRlZCB3aW5lbWFrZXIgcG9wY29kZTonKTsKICAgICAgdGhpcy5kZWJ1Z0xvZyh7cG9wY29kZU5hbWUscG9wY29kZX0pOwogICAgICAKICAgICAgdmFyIGRhdGEgPQogICAgICAgICAgewogICAgICAgICAgICAiYXBwRGF0YSI6IHsKICAgICAgICAgICAgICAid29ya2Zsb3dEYXRhIjogZm9ybSwKICAgICAgICAgICAgICAid2luZUJvdHRsZXMiOiBhbW91bnQsCiAgICAgICAgICAgICAgIndpbmVVbml0IjogdW5pdCwKICAgICAgICAgICAgICAic3BvdCI6IG5leHRTcG90LAogICAgICAgICAgICAgICJ3b3JrZmxvd05hbWUiOiBzcy53b3JrZmxvdy5uYW1lLAogICAgICAgICAgICAgICJ3b3JrZmxvd0luc3RhbmNlSWQiOiBuZXdJZCwKICAgICAgICAgICAgICAid29ya2Zsb3dSb290UG9wY29kZSI6ICJ0cnVlIiwKICAgICAgICAgICAgICBwb3Bjb2RlTmFtZSAsCiAgICAgICAgICAgICAgIndvcmtmbG93RGVmIjogd29ya2Zsb3cKICAgICAgICAgICAgfQogICAgICAgICAgfTsKCiAgICAgIHRoaXMuZGVidWdMb2coZGF0YSk7CgogICAgICB2YXIgcmVzID0gYXdhaXQgdGhpcy5zaWduQW5kTWludChhZGRyZXNzLGRhdGEscHVibGljS2V5LGFtb3VudCx1bml0LHByaXZhdGVLZXkpOwogICAgICAvLyB0aGlzLmRlYnVnTG9nKCd0aGlzLnNpZ25BbmRNaW50IHJlcy5ib2R5LmtleXM6ICcgKyBPYmplY3Qua2V5cyhyZXMuYm9keSkpOwoKICAgICAgdmFyIHJ2YWwgPSB7CiAgICAgICAgICBhY3Rpb246IFtdCiAgICAgIH07CiAgICAgIHRoaXMuaG9va3MuZmluaXNoLnJlc29sdmUocnZhbCk7CiAgICAgIHJldHVybiBhZGRyZXNzOwogICAgCiAgfQogIHRvSW50ZWdlcih2YWx1ZSkgewogICAgdmFyIF8gPSB0aGlzLmhvb2tzLl87CiAgICBpZihfLmlzU3RyaW5nKHZhbHVlKSkKICAgICAgcmV0dXJuIHBhcnNlSW50KHZhbHVlKTsKICAgIGVsc2UKICAgICAgcmV0dXJuIHZhbHVlOwogIH0KICBhc3luYyB0cnVja2VyUGlja3VwT2soKSB7IAogICAgdGhpcy5kZWJ1Z0xvZygnZXhlY3V0ZSB0cnVja2VyUGlja3VwT2snKTsKICAgIHZhciBmb3JtID0gdGhpcy5zdGF0ZS5mb3JtOwogICAgdGhpcy5kZWJ1Z0xvZyh7Zm9ybX0pOwogICAgCiAgICB2YXIgcnZhbCA9IHsKICAgICAgICBhY3Rpb246IFtdCiAgICB9OwoKICAgIHZhciBfID0gdGhpcy5ob29rcy5fOwogICAgdmFyIHNzID0gdGhpcy5ob29rcy5zY3JlZW5TdGF0ZTsKICAgIHZhciBhcHAgPSB0aGlzLmhvb2tzLmFwcDsKICAgIHZhciB3b3JrZmxvdyA9IHNzLndvcmtmbG93OwogICAgCiAgICB2YXIgdXNlckNyZWRlbnRpYWxzID0gYXBwLmdldEFwcFN0YXRlKCd1c2VyQ3JlZGVudGlhbHMnKTsKICAgIHZhciB1c2VyUHVibGljS2V5ID0gdXNlckNyZWRlbnRpYWxzLnB1YmxpY0tleTsKICAgIHZhciB1c2VyUHJpdmF0ZUtleSA9IHVzZXJDcmVkZW50aWFscy5wcml2YXRlS2V5OwogICAgCiAgICB2YXIgc3JjUG9wY29kZSA9IHRoaXMuc3RhdGUucG9wY29kZTsKICAgIAoKICAgIHZhciBkZXN0QW1vdW50ID0gdGhpcy50b0ludGVnZXIodGhpcy5zdGF0ZS5mb3JtLndpdGhkcmF3LnBpY2t1cEFtb3VudCk7CiAgICB2YXIgZGVzdE5hbWUgPSAiVHJ1Y2tfIiArIHVzZXJDcmVkZW50aWFscy5zZXNzaW9uSWQ7CiAgICAKICAgIHZhciBkYXRhID0geyBkZXNjcmlwdGlvbjogYHdpdGhkcmF3ICR7ZGVzdEFtb3VudH0gYm90dGxlcyBvZiB3aW5lYCB9OwogICAgdmFyIHNvdXJjZU91dHB1dCA9IDA7CiAgICAKICAgIHRoaXMuZGVidWdMb2coJ2dldCB0cnVjayBwb3Bjb2RlOiAnICsgZGVzdE5hbWUpOwogICAgdmFyIHRydWNrUG9wY29kZSA9IGF3YWl0IHRoaXMub25lQnlOYW1lKGRlc3ROYW1lKTsKICAgIHRoaXMuZGVidWdMb2codHJ1Y2tQb3Bjb2RlKTsKICAgICAKICAgIHRoaXMuZGVidWdMb2coJ2NoZWNrIHNvdXJjZSB3aW5lIGJvdHRsZSBjb3VudCcpOwogICAgdmFyIHdpbmVCb3R0bGVzID0gdGhpcy50b0ludGVnZXIoc3JjUG9wY29kZS5hcHBEYXRhLndpbmVCb3R0bGVzKTsKICAgIHZhciB3aW5lVW5pdCA9IHNyY1BvcGNvZGUuYXBwRGF0YS53aW5lVW5pdDsKICAgIHRoaXMuZGVidWdMb2coe3NyY1BvcGNvZGV9KTsKICAgIHRoaXMuZGVidWdMb2coe3dpbmVCb3R0bGVzLGRlc3RBbW91bnQsd2luZVVuaXR9KTsKICAgIAogICAgaWYoXy5pc05pbChkZXN0QW1vdW50KSB8fCBfLmlzTmFOKGRlc3RBbW91bnQpKSB7CiAgICAgIHRoaXMuZGVidWdMb2coJyoqKioqKioqKioqKioqKioqKiBlcnJvciBiYWQgZGVzdEFtb3VudCknKTsKICAgICAgdGhpcy5ob29rcy5maW5pc2gucmVzb2x2ZShydmFsKTsKICAgICAgcmV0dXJuIDsKICAgIH0KICAgIAogICAgaWYoXy5pc05pbCh3aW5lQm90dGxlcykgfHwgXy5pc05hTihkZXN0QW1vdW50KSkgewogICAgICB0aGlzLmRlYnVnTG9nKCcqKioqKioqKioqKioqKioqKiogZXJyb3IgYmFkIHdpbmVCb3R0bGVzJyk7CiAgICAgIHRoaXMuaG9va3MuZmluaXNoLnJlc29sdmUocnZhbCk7CiAgICAgIHJldHVybiA7CiAgICB9CiAgICAKICAgIGlmKGRlc3RBbW91bnQgPiB3aW5lQm90dGxlcykgewogICAgICB0aGlzLmRlYnVnTG9nKCcqKioqKioqKioqKioqKioqKiogZXJyb3IgZGVzdEFtb3VudCA+IHdpbmVCb3R0bGVzJyk7CiAgICAgIHRoaXMuaG9va3MuZmluaXNoLnJlc29sdmUocnZhbCk7CiAgICAgIHJldHVybiA7CiAgICB9CiAgICAgCiAgICB2YXIgdHJ1Y2tCb3R0bGVzOwogICAgaWYgKF8uaXNOaWwodHJ1Y2tQb3Bjb2RlKSkgewogICAgICB0aGlzLmRlYnVnTG9nKCdNaW50aW5nIHRydWNrIHBvcGNvZGU6ICcgKyBkZXN0TmFtZSk7CiAgICAgIHZhciB0cnVja1Nwb3QgPSAndHJ1Y2tlci5zaG93JzsKICAgICAgdmFyIG5ld0lkID0gdGhpcy5ob29rcy5zaG9ydGlkLmdlbmVyYXRlKCk7CiAgICAgIHZhciB0cnVja1N0YXJ0QW1vdW50ID0gMDsKICAgICAgdmFyIHRydWNrVW5pdCA9ICdib3R0bGVzIG9mIHdpbmUnOwogICAgICB0cnVja0JvdHRsZXMgPSAwOwogICAgICB2YXIgdHJ1Y2tEYXRhID0KICAgICAgICAgIHsKICAgICAgICAgICAgImFwcERhdGEiOiB7CiAgICAgICAgICAgICAgIndvcmtmbG93RGF0YSI6IHt9LAogICAgICAgICAgICAgICJzcG90IjogdHJ1Y2tTcG90LAogICAgICAgICAgICAgICJ3aW5lQm90dGxlcyI6IHRydWNrQm90dGxlcywKICAgICAgICAgICAgICAid2luZVVuaXQiOiB3aW5lVW5pdCwKICAgICAgICAgICAgICAid29ya2Zsb3dOYW1lIjogc3Mud29ya2Zsb3cubmFtZSwKICAgICAgICAgICAgICAid29ya2Zsb3dJbnN0YW5jZUlkIjogbmV3SWQsCiAgICAgICAgICAgICAgIndvcmtmbG93Um9vdFBvcGNvZGUiOiAidHJ1ZSIsCiAgICAgICAgICAgICAgcG9wY29kZU5hbWU6IGRlc3ROYW1lLAogICAgICAgICAgICAgICJ3b3JrZmxvd0RlZiI6IHdvcmtmbG93CiAgICAgICAgICAgIH0KICAgICAgICAgIH07CiAgICAgIHZhciBuZXdQb3Bjb2RlID0gYXdhaXQgdGhpcy5nZW5lcmF0ZSgpOwogICAgICB2YXIgdHJ1Y2tBZGRyZXNzID0gbmV3UG9wY29kZS5wb3Bjb2RlLmFkZHJlc3M7CiAgICAgIAogICAgICB2YXIgcmVzID0gYXdhaXQgdGhpcy5zaWduQW5kTWludCh0cnVja0FkZHJlc3MsdHJ1Y2tEYXRhLHVzZXJQdWJsaWNLZXksdHJ1Y2tTdGFydEFtb3VudCx0cnVja1VuaXQsdXNlclByaXZhdGVLZXkpOwogICAgICAKICAgICAgdHJ1Y2tQb3Bjb2RlID0gYXdhaXQgdGhpcy5vbmVCeU5hbWUoZGVzdE5hbWUpOwogICAgfQogICAgZWxzZSB7CiAgICAgIHRoaXMuZGVidWdMb2coJ0ZvdW5kIGV4aXN0aW5nIHRydWNrIHBvcGNvZGU6ICcgKyBkZXN0TmFtZSk7CiAgICAgIHRydWNrQm90dGxlcyA9IHRydWNrUG9wY29kZS5hcHBEYXRhLndpbmVCb3R0bGVzOwogICAgfQogICAgCiAgICBpZihfLmlzTmlsKHRydWNrUG9wY29kZSkpIHsKICAgICAgdGhpcy5kZWJ1Z0xvZygnKioqKioqKioqKioqKioqKioqIEVycm9yIG1pbnRpbmcgdHJ1Y2sgcG9wY29kZScpOwogICAgICB0aGlzLmhvb2tzLmZpbmlzaC5yZXNvbHZlKHJ2YWwpOwogICAgICByZXR1cm4gOwogICAgfQogICAgCiAgICB0aGlzLmRlYnVnTG9nKCcjIyMjIyMjIyMjIyMjIyMjIHRydWNrIHBvcGNvZGU6Jyk7CiAgICB0aGlzLmRlYnVnTG9nKHRydWNrUG9wY29kZSk7CiAgICAKICAgIHZhciB3cmVzID0gYXdhaXQgdGhpcy5zaWduQW5kV2l0aGRyYXcoCiAgICAgIHNyY1BvcGNvZGUucHJpdmF0ZUtleSwKICAgICAgc3JjUG9wY29kZS5hZGRyZXNzLAogICAgICB0cnVja1BvcGNvZGUuYWRkcmVzcywKICAgICAgZGVzdEFtb3VudCwKICAgICAgZGF0YSwKICAgICAgc291cmNlT3V0cHV0CiAgICApOwogICAgCiAgICB0aGlzLmRlYnVnTG9nKCcjIyMjIyMjIyMjIyMjIyMjIHdpdGhkcmF3IHJlc3VsdDonKTsKICAgIHRoaXMuZGVidWdMb2cod3Jlcyk7CiAgICBydmFsLndyZXMgPSB3cmVzOwogICAgCiAgICB0aGlzLmRlYnVnTG9nKCcjIyMjIyMjIyMjIyMjIyMjIHVwZGF0ZSBzb3VyY2Ugd2luZSBib3R0bGUgY291bnQ6Jyk7CiAgICB2YXIgd2luZUNvdW50ID0gd2luZUJvdHRsZXMgLSBkZXN0QW1vdW50OwogICAgdmFyIHdpbmVEYXRhID0KICAgICAgICB7CiAgICAgICAgICAiYXBwRGF0YSI6IHsKICAgICAgICAgICAgIndpbmVCb3R0bGVzIjogd2luZUNvdW50CiAgICAgICAgICB9CiAgICAgICAgfTsKCiAgICB0aGlzLmRlYnVnTG9nKHdpbmVEYXRhKTsKICAgIHZhciBicmVzID0gYXdhaXQgdGhpcy5ibG9iQ3JlYXRlKAogICAgICBzcmNQb3Bjb2RlLmFkZHJlc3MsCiAgICAgIHdpbmVEYXRhLAogICAgICB1c2VyQ3JlZGVudGlhbHMucHVibGljS2V5LAogICAgICB1c2VyQ3JlZGVudGlhbHMucHJpdmF0ZUtleSk7CiAgICAgIAogICAgdGhpcy5kZWJ1Z0xvZygnIyMjIyMjIyMjIyMjIyMjIyBibG9iQ3JlYXRlIHJlc3VsdDonKTsKICAgIHRoaXMuZGVidWdMb2coYnJlcyk7CiAgICBydmFsLmJyZXMgPSBicmVzOwogICAgCiAgICB0aGlzLmRlYnVnTG9nKCcjIyMjIyMjIyMjIyMjIyMjIHVwZGF0ZSB0cnVjayB3aW5lIGJvdHRsZSBjb3VudDonKTsKICAgIHZhciB0cnVja0NvdW50ID0gdHJ1Y2tCb3R0bGVzICsgZGVzdEFtb3VudDsKICAgIHZhciB0cnVja1dpbmVEYXRhID0KICAgICAgICB7CiAgICAgICAgICAiYXBwRGF0YSI6IHsKICAgICAgICAgICAgIndpbmVCb3R0bGVzIjogdHJ1Y2tDb3VudAogICAgICAgICAgfQogICAgICAgIH07CgogICAgdGhpcy5kZWJ1Z0xvZyh0cnVja1dpbmVEYXRhKTsKICAgIHZhciBicmVzMiA9IGF3YWl0IHRoaXMuYmxvYkNyZWF0ZSgKICAgICAgdHJ1Y2tQb3Bjb2RlLmFkZHJlc3MsCiAgICAgIHRydWNrV2luZURhdGEsCiAgICAgIHVzZXJDcmVkZW50aWFscy5wdWJsaWNLZXksCiAgICAgIHVzZXJDcmVkZW50aWFscy5wcml2YXRlS2V5KTsKICAgICAgCiAgICB0aGlzLmRlYnVnTG9nKCcjIyMjIyMjIyMjIyMjIyMjIHRydWNrIGJsb2JDcmVhdGUgcmVzdWx0OicpOwogICAgdGhpcy5kZWJ1Z0xvZyhicmVzMik7CiAgICBydmFsLmJyZXMyID0gYnJlczI7CiAgICAKICAgIHRoaXMuaG9va3MuZmluaXNoLnJlc29sdmUocnZhbCk7CiAgIH0KCn07Cg=="]
                }
            },
            "address": "af5efdc4b5176fd77e9cc8c9c6e42f8b1552c1b3",
            "createdAt": "1520232078625",
            "date": "1520232078625",
            "operation": "mint",
            "destCounter": "JUe2p5FA5zIzYmSSxEJBKXyAoCmD6q/e5oLMES5KgHs="
        }, {
            "id": "<0cfd4b993d6d271e18ad6bdc361a663995f1339710c1437de902dba3068a6846>",
            "sourceAddress": "af5efdc4b5176fd77e9cc8c9c6e42f8b1552c1b3",
            "destPopcode": "<34baf20d6d7149f0472451911e91937762152480>",
            "txId": "0cfd4b993d6d271e18ad6bdc361a663995f1339710c1437de902dba3068a6846",
            "data": {"metadata": {"description": "withdraw 50 bottles of wine"}},
            "type": "transaction",
            "sourceCounter": "JUe2p5FA5zIzYmSSxEJBKXyAoCmD6q/e5oLMES5KgHs=",
            "createdAt": "1520232241135",
            "date": "1520232241135",
            "destAddress": "34baf20d6d7149f0472451911e91937762152480",
            "destAmount": "50",
            "operation": "withdraw",
            "sourcePopcode": "<af5efdc4b5176fd77e9cc8c9c6e42f8b1552c1b3>"
        }, {
            "id": "<f2581ae499fcaf31ec11be53db7a78c47dd0cb377938e978c5c33c1f42ec5bf4>",
            "popcode": "<af5efdc4b5176fd77e9cc8c9c6e42f8b1552c1b3>",
            "txId": "f2581ae499fcaf31ec11be53db7a78c47dd0cb377938e978c5c33c1f42ec5bf4",
            "data": {"metadata": {"appData": {"wineBottles": 950}}},
            "type": "transaction",
            "sourceCounter": "sy+ZtZ+L7T+3JxqUIfSQNv7adiyRlpWLeWhBKqMxi90=",
            "address": "af5efdc4b5176fd77e9cc8c9c6e42f8b1552c1b3",
            "createdAt": "1520232246462",
            "date": "1520232246462",
            "operation": "blobCreate",
            "destCounter": "+V2qTKbyLPfvCkak+O8iCXNCvDpQjqectABSNhGosnA="
        }, {
            "id": "<ab15d2c980074de6c459a29886a2bc6219535eb9fc43599acd1f3f737fd5e6b3>",
            "sourceAddress": "af5efdc4b5176fd77e9cc8c9c6e42f8b1552c1b3",
            "destPopcode": "<34baf20d6d7149f0472451911e91937762152480>",
            "txId": "ab15d2c980074de6c459a29886a2bc6219535eb9fc43599acd1f3f737fd5e6b3",
            "data": {"metadata": {"description": "withdraw 150 bottles of wine"}},
            "type": "transaction",
            "sourceCounter": "JUe2p5FA5zIzYmSSxEJBKXyAoCmD6q/e5oLMES5KgHs=",
            "createdAt": "1520232305656",
            "date": "1520232305656",
            "destAddress": "34baf20d6d7149f0472451911e91937762152480",
            "destAmount": "150",
            "operation": "withdraw",
            "sourcePopcode": "<af5efdc4b5176fd77e9cc8c9c6e42f8b1552c1b3>"
        }, {
            "id": "<b626a3a0a2e3c34147ae0f9a9126688f5cedab4cd4ecf24f05e78c8dc9d6af9c>",
            "popcode": "<af5efdc4b5176fd77e9cc8c9c6e42f8b1552c1b3>",
            "txId": "b626a3a0a2e3c34147ae0f9a9126688f5cedab4cd4ecf24f05e78c8dc9d6af9c",
            "data": {"metadata": {"appData": {"wineBottles": 800}}},
            "type": "transaction",
            "sourceCounter": "bq9i88F15iwRzTvYZCEPCfMtDqohH4TzILrdoe5un4o=",
            "address": "af5efdc4b5176fd77e9cc8c9c6e42f8b1552c1b3",
            "createdAt": "1520232308155",
            "date": "1520232308155",
            "operation": "blobCreate",
            "destCounter": "TgE5LT+eLkjr8S+xRvqYubSUxdCLF2twfnVzWCvjXsM="
        }],
        "workflowName": "wineV1",
        "workflowData": {"mintWineBottles": {"Amount": "1000", "Unit": "bottles of wine"}},
        "wineBottles": 800,
        "wineUnit": "bottles of wine",
        "timestamp": 1520232308155,
        "withdrawAmount": "50",
        "withdrawTrans": {
            "id": "<0cfd4b993d6d271e18ad6bdc361a663995f1339710c1437de902dba3068a6846>",
            "sourceAddress": "af5efdc4b5176fd77e9cc8c9c6e42f8b1552c1b3",
            "destPopcode": "<34baf20d6d7149f0472451911e91937762152480>",
            "txId": "0cfd4b993d6d271e18ad6bdc361a663995f1339710c1437de902dba3068a6846",
            "data": {"metadata": {"description": "withdraw 50 bottles of wine"}},
            "type": "transaction",
            "sourceCounter": "JUe2p5FA5zIzYmSSxEJBKXyAoCmD6q/e5oLMES5KgHs=",
            "createdAt": "1520232241135",
            "date": "1520232241135",
            "destAddress": "34baf20d6d7149f0472451911e91937762152480",
            "destAmount": "50",
            "operation": "withdraw",
            "sourcePopcode": "<af5efdc4b5176fd77e9cc8c9c6e42f8b1552c1b3>"
        }
    }, {
        "id": "<af5efdc4b5176fd77e9cc8c9c6e42f8b1552c1b3>",
        "workflowInstanceId": "PK9CFQEVS",
        "appData": {
            "workflowData": {"mintWineBottles": {"Amount": "1000", "Unit": "bottles of wine"}},
            "wineBottles": 800,
            "wineUnit": "bottles of wine",
            "spot": "trucker.pickup",
            "workflowName": "wineV1",
            "workflowInstanceId": "PK9CFQEVS",
            "workflowRootPopcode": "true",
            "popcodeName": "Wine_PK9CFQEVS",
            "workflowDef": {
                "title": "Wine V1",
                "name": "wineV1",
                "startScreen": "Home",
                "version": "2.0",
                "steps": {
                    "winemaker.mint": {
                        "step": "winemaker.mint",
                        "title": "Winemaker Mint",
                        "screen": "WinemakerMint"
                    },
                    "trucker.pickup": {"step": "trucker.pickup", "title": "Trucker Pickup", "screen": "TruckerPickup"},
                    "trucker.show": {"step": "trucker.show", "title": "Trucker Show", "screen": "TruckerShow"}
                },
                "appOptions": {"requireLogin": true},
                "screens": {
                    "Home": {
                        "name": "Home",
                        "title": "Home",
                        "api": "/api/mobile",
                        "screenListItems": {
                            "fetchItems": "/popcodeByWorkflowName",
                            "method": "get",
                            "api": "cayley",
                            "fetchParameters": {"workflowName": "wineV1"},
                            "itemDataTypes": {"popcode": "object"},
                            "itemLabel": ["popcodeName"],
                            "itemActions": {
                                "click": {
                                    "title": "Click",
                                    "action": [{
                                        "operation": "startWorkflow",
                                        "replaceCurrent": true,
                                        "parameters": {"spot": "@popcode.spot", "popcode": "@popcode"}
                                    }],
                                    "parameters": {"popcode": "@item"}
                                }
                            }
                        },
                        "screenButtons": {
                            "scan": {
                                "title": "Scan",
                                "action": [{"operation": "navigate", "screen": "Scan"}],
                                "roles": ["admin", "winemaker", "trucker"]
                            },
                            "mint": {
                                "title": "Mint",
                                "action": [{"operation": "navigate", "resetStack": true, "screen": "WinemakerMint"}],
                                "roles": ["admin", "winemaker"]
                            }
                        }
                    },
                    "Scan": {
                        "name": "Scan",
                        "title": "Scan",
                        "api": "/api/mobile",
                        "parameters": {"user": "@user"},
                        "modal": false,
                        "screenScan": {},
                        "startAction": [{
                            "operation": "scanBarcode",
                            "barcodeTypes": ["qr", "code128"],
                            "outputs": {"scanData": "@scanData"}
                        }, {
                            "operation": "routePopcode",
                            "parameters": {"scanData": "@scanData"},
                            "outputs": {"address": "@address"}
                        }, {
                            "operation": "fetch",
                            "route": "/p",
                            "method": "get",
                            "parameters": {"address": "@address"},
                            "outputs": {"popcode": "@popcodes[0]"}
                        }, {
                            "operation": "startWorkflow",
                            "replaceCurrent": true,
                            "parameters": {"spot": "@popcode.spot", "popcode": "@popcode"}
                        }]
                    },
                    "WinemakerMint": {
                        "name": "WinemakerMint",
                        "title": "Winemaker Mint",
                        "api": "/api/mobile",
                        "parameters": {"container": "@container", "popcode": "@popcode", "user": "@user"},
                        "outputs": {"popcode": "@container"},
                        "screenForm": {
                            "fields": {
                                "type": "object",
                                "properties": {
                                    "mintWineBottles": {
                                        "type": "object",
                                        "properties": {
                                            "Amount": {
                                                "type": "string",
                                                "value": "1000",
                                                "options": {"editable": true}
                                            },
                                            "Unit": {
                                                "type": "string",
                                                "value": "bottles of wine",
                                                "options": {"editable": true}
                                            }
                                        },
                                        "required": ["Amount", "Unit"]
                                    }
                                },
                                "required": ["mintWineBottles"]
                            }, "options": {"auto": "labels"}
                        },
                        "screenButtons": {
                            "mint": {
                                "title": "Mint",
                                "action": [{
                                    "operation": "contract",
                                    "contract": "winemakerMintOk",
                                    "parameters": {"popcode": "@popcode"},
                                    "outputs": {"status": "@status", "txId": "@txId"}
                                }, {
                                    "operation": "navigate",
                                    "resetStack": true,
                                    "forceUpdate": true,
                                    "screen": "Home"
                                }],
                                "roles": ["admin", "winemaker"]
                            },
                            "cancel": {
                                "title": "Cancel",
                                "action": [{"operation": "navigate", "resetStack": true, "screen": "Home"}]
                            }
                        }
                    },
                    "TruckerPickup": {
                        "name": "TruckerPickup",
                        "title": "Trucker Wine Pickup",
                        "api": "/api/mobile",
                        "parameters": {"container": "@container", "popcode": "@popcode", "user": "@user"},
                        "outputs": {"popcode": "@container"},
                        "tabs": {
                            "tab1": {
                                "title": "Pickup Wine",
                                "screenForm": {
                                    "privateKey": ["winemaker", "admin"],
                                    "publicKey": ["winemaker", "trucker", "admin"],
                                    "fields": {
                                        "type": "object",
                                        "properties": {
                                            "popcode": {
                                                "type": "object",
                                                "properties": {
                                                    "name": {
                                                        "type": "string",
                                                        "value": "@popcode.popcodeName",
                                                        "options": {"editable": false}
                                                    },
                                                    "address": {
                                                        "type": "string",
                                                        "value": "@popcode.address",
                                                        "options": {"editable": false}
                                                    },
                                                    "currentState": {
                                                        "type": "string",
                                                        "value": "@popcode.spot",
                                                        "options": {"editable": false}
                                                    }
                                                },
                                                "required": ["name", "address", "currentState"]
                                            },
                                            "warehouseContents": {
                                                "type": "object",
                                                "properties": {
                                                    "Amount": {
                                                        "type": "number",
                                                        "value": "@popcode.appData.wineBottles",
                                                        "options": {"editable": false}
                                                    },
                                                    "Unit": {
                                                        "type": "string",
                                                        "value": "@popcode.appData.wineUnit",
                                                        "options": {"editable": false}
                                                    }
                                                }
                                            },
                                            "withdraw": {
                                                "type": "object",
                                                "properties": {
                                                    "pickupAmount": {
                                                        "type": "number",
                                                        "options": {"editable": true}
                                                    }
                                                },
                                                "required": ["pickupAmount"]
                                            }
                                        },
                                        "required": ["withdraw"]
                                    },
                                    "options": {"auto": "labels"}
                                }
                            }, "tab2": {"title": "Popcode Graph", "graphView": {"visName": "wine"}}
                        },
                        "screenButtons": {
                            "pickup": {
                                "title": "Pickup",
                                "action": [{
                                    "operation": "contract",
                                    "contract": "truckerPickupOk",
                                    "parameters": {"popcode": "@popcode"},
                                    "outputs": {"status": "@status", "txId": "@txId"}
                                }, {
                                    "operation": "navigate",
                                    "resetStack": true,
                                    "forceUpdate": true,
                                    "screen": "Home"
                                }],
                                "roles": ["admin", "trucker"]
                            },
                            "cancel": {
                                "title": "Cancel",
                                "action": [{"operation": "navigate", "resetStack": true, "screen": "Home"}]
                            }
                        }
                    },
                    "TruckerShow": {
                        "name": "TruckerShow",
                        "title": "Truck Popcode",
                        "api": "/api/mobile",
                        "parameters": {"container": "@container", "popcode": "@popcode", "user": "@user"},
                        "outputs": {"popcode": "@container"},
                        "tabs": {
                            "tab1": {
                                "title": "Truck Contents",
                                "screenForm": {
                                    "privateKey": ["trucker", "admin"],
                                    "publicKey": ["winemaker", "trucker", "admin"],
                                    "fields": {
                                        "type": "object",
                                        "properties": {
                                            "popcode": {
                                                "type": "object",
                                                "properties": {
                                                    "name": {
                                                        "type": "string",
                                                        "value": "@popcode.popcodeName",
                                                        "options": {"editable": false}
                                                    },
                                                    "address": {
                                                        "type": "string",
                                                        "value": "@popcode.address",
                                                        "options": {"editable": false}
                                                    },
                                                    "currentState": {
                                                        "type": "string",
                                                        "value": "@popcode.spot",
                                                        "options": {"editable": false}
                                                    }
                                                },
                                                "required": ["name", "address", "currentState"]
                                            },
                                            "truckContents": {
                                                "type": "object",
                                                "properties": {
                                                    "Amount": {
                                                        "type": "number",
                                                        "value": "@popcode.appData.wineBottles",
                                                        "options": {"editable": false}
                                                    },
                                                    "Unit": {
                                                        "type": "string",
                                                        "value": "@popcode.appData.wineUnit",
                                                        "options": {"editable": false}
                                                    }
                                                }
                                            }
                                        }
                                    },
                                    "options": {"auto": "labels"}
                                }
                            }, "tab2": {"title": "Popcode Graph", "graphView": {"visName": "wine"}}
                        },
                        "screenButtons": {
                            "ok": {
                                "title": "Ok",
                                "action": [{"operation": "navigate", "resetStack": true, "screen": "Home"}]
                            }
                        }
                    }
                },
                "contractLib": {
                    "name": "Wine SmartContract Library",
                    "version": "1.0",
                    "slug": "wine_1_0",
                    "libs": ["base64_Y2xhc3MgU21hcnRDb250cmFjdEJhc2UgewogIGNvbnN0cnVjdG9yKGhvb2tzKSB7CiAgICAgIHRoaXMuaG9va3MgPSBob29rczsKICAgICAgdGhpcy5zdGF0ZSA9IGhvb2tzLnN0YXRlOwogICAgICB0aGlzLmRlYnVnTG9nID0gaG9va3MuZGVidWdMb2c7CiAgICAgIHRoaXMuZGVidWdMb2coJ2NvbnN0cnVjdCBTbWFydENvbnRyYWN0QmFzZScpOwogIH0KICBkZWJ1Z1NpemUobykgewogICAgdmFyIHMgPSBKU09OLnN0cmluZ2lmeShvKTsKICAgIHRoaXMuZGVidWdMb2coYHNpemU6ICR7cy5sZW5ndGgvMTAyNH0ga2ApOwogIH0KICBhc3luYyBieU5hbWUocE5hbWUpIHsKICAgIHZhciBhcGkgPSB0aGlzLmhvb2tzLnN0YWNrLmFwaTsKICAgIHZhciB1cmwgPSAnL3AvbmFtZS8nICsgcE5hbWU7CiAgICBjb25zdCByZXMgPSBhd2FpdCBhcGkuZ2V0KHVybCk7CiAgICByZXR1cm4gcmVzLmJvZHk7CiAgfQogIGFzeW5jIG9uZUJ5TmFtZShwTmFtZSkgewogICAgdmFyIF8gPSB0aGlzLmhvb2tzLl87CiAgICB2YXIgYXBpID0gdGhpcy5ob29rcy5zdGFjay5hcGk7CiAgICB2YXIgdXJsID0gJy9wL25hbWUvJyArIHBOYW1lOwogICAgY29uc3QgcmVzID0gYXdhaXQgYXBpLmdldCh1cmwpOwogICAgdmFyIHBvcGNvZGVzID0gIV8uaXNOaWwocmVzKQogICAgICYmICFfLmlzTmlsKHJlcy5ib2R5KQogICAgICYmICFfLmlzTmlsKHJlcy5ib2R5LnBvcGNvZGVzKSA/IHJlcy5ib2R5LnBvcGNvZGVzIDogbnVsbDsKICAgIHZhciBwb3Bjb2RlID0gXy5pc0FycmF5KHBvcGNvZGVzKSAmJiBwb3Bjb2Rlcy5sZW5ndGggPiAwCiAgICAgPyBwb3Bjb2Rlc1swXSA6IG51bGw7CiAgICByZXR1cm4gcG9wY29kZTsKICB9CiAgYXN5bmMgYmFsYW5jZShhZGRyZXNzKSB7CiAgICB2YXIgYXBpID0gdGhpcy5ob29rcy5zdGFjay5hcGk7CiAgICB2YXIgdXJsID0gJy9wL2JhbGFuY2UvJyArIGFkZHJlc3M7CiAgICBjb25zdCByZXMgPSBhd2FpdCBhcGkuZ2V0KHVybCk7CiAgICByZXR1cm4gcmVzLmJvZHk7CiAgfQogIGFzeW5jIGdlbmVyYXRlKCkgewogICAgdmFyIGFwaSA9IHRoaXMuaG9va3Muc3RhY2suYXBpOwogICAgdmFyIHVybCA9ICcvcC9nZW5lcmF0ZSc7CiAgICBjb25zdCByZXMgPSBhd2FpdCBhcGkuZ2V0KHVybCk7CiAgICByZXR1cm4gcmVzLmJvZHk7CiAgfQogIGFzeW5jIGNvbnRhaW5lclBvcGNvZGUoYWRkcmVzcykgewogICAgdmFyIGFwaSA9IHRoaXMuaG9va3Muc3RhY2suYXBpQ2F5bGV5OwogICAgdmFyIHVybCA9ICcvY29udGFpbmVyUG9wY29kZS8nICsgYWRkcmVzczsKICAgIGNvbnN0IHJlcyA9IGF3YWl0IGFwaS5nZXQodXJsKTsKICAgIHJldHVybiByZXMuYm9keTsKICB9CiAgYXN5bmMgYm9tUG9wY29kZXMoYWRkcmVzcykgewogICAgdmFyIGFwaSA9IHRoaXMuaG9va3Muc3RhY2suYXBpQ2F5bGV5OwogICAgdmFyIHVybCA9ICcvYm9tUG9wY29kZXMvJyArIGFkZHJlc3M7CiAgICBjb25zdCByZXMgPSBhd2FpdCBhcGkuZ2V0KHVybCk7CiAgICByZXR1cm4gcmVzLmJvZHk7CiAgfQogIGFzeW5jIHNpZ25NZXNzYWdlKGZpZWxkcyxwcml2YXRlS2V5KSB7CiAgICB2YXIgYXBpID0gdGhpcy5ob29rcy5zdGFjay5hcGk7CiAgICB2YXIgYm9keSA9IHsKICAgICAgZmllbGRzLAogICAgICBwcml2YXRlS2V5CiAgICB9OwogICAgdmFyIHVybCA9ICcvY3J5cHRvL3NpZ25NZXNzYWdlJzsKICAgIHRoaXMuZGVidWdMb2coJyoqKioqKioqKioqIHNpZ25NZXNzYWdlJyk7CiAgICB0aGlzLmRlYnVnTG9nKHtib2R5fSk7CiAgICBjb25zdCByZXMgPSBhd2FpdCBhcGkucG9zdCh1cmwsIHtib2R5fSk7CiAgICB0aGlzLmRlYnVnTG9nKHtib2R5OiByZXMuYm9keX0pOwogICAgcmV0dXJuIHJlcy5ib2R5OwogIH0KICBhc3luYyBibG9iQ3JlYXRlV2l0aFNpZyhzaWcsYWRkcmVzcyxkYXRhLHB1YmxpY0tleSkgewogICAgdmFyIGFwaSA9IHRoaXMuaG9va3Muc3RhY2suYXBpOwogICAgdmFyIGJvZHkgPSB7CiAgICAgIHNpZywKICAgICAgYWRkcmVzcywKICAgICAgcHVibGljS2V5LAogICAgICBkYXRhCiAgICB9OwogICAgdmFyIHVybCA9ICcvcC9ibG9iQ3JlYXRlV2l0aFNpZyc7CiAgICBjb25zdCByZXMgPSBhd2FpdCBhcGkucG9zdCh1cmwsIHtib2R5fSk7CiAgICByZXR1cm4gcmVzLmJvZHk7CiAgfQogIGFzeW5jIGJsb2JDcmVhdGUoYWRkcmVzcyxkYXRhLHB1YmxpY0tleSxwcml2YXRlS2V5KSB7CiAgICB2YXIgZmllbGRzID0gW107CgogICAgdmFyIHJlcyA9IGF3YWl0IHRoaXMuYmFsYW5jZShhZGRyZXNzKTsKICAgIGZpZWxkcy5wdXNoKHJlcy5iYWxhbmNlLkNvdW50ZXIpOwogICAgZmllbGRzLnB1c2goYWRkcmVzcyk7CiAgICBmaWVsZHMucHVzaChkYXRhKTsKCiAgICByZXMgPSBhd2FpdCB0aGlzLnNpZ25NZXNzYWdlKGZpZWxkcyxwcml2YXRlS2V5KTsKCiAgICByZXMgPSBhd2FpdCB0aGlzLmJsb2JDcmVhdGVXaXRoU2lnKHJlcy5zaWcsYWRkcmVzcyxkYXRhLHB1YmxpY0tleSk7CgogICAgcmV0dXJuIHJlczsKICB9CiAgYXN5bmMgbWludChzaWcsYWRkcmVzcyxkYXRhLHB1YmxpY0tleSxhbW91bnQsdW5pdCkgewogICAgdmFyIGFwaSA9IHRoaXMuaG9va3Muc3RhY2suYXBpOwogICAgdmFyIGJvZHkgPSB7CiAgICAgIHNpZywKICAgICAgYWRkcmVzcywKICAgICAgcHVibGljS2V5LAogICAgICBhbW91bnQsCiAgICAgIHVuaXQsCiAgICAgIGRhdGEKICAgIH07CiAgICB0aGlzLmRlYnVnTG9nKCcqKioqKioqKioqKiBkbyBtaW50Jyk7CiAgICB0aGlzLmRlYnVnTG9nKHtib2R5fSk7CiAgICB0aGlzLmRlYnVnTG9nKHthcGl9KTsKICAgIHRoaXMuZGVidWdTaXplKGJvZHkpOwogICAgdmFyIHVybCA9ICcvcC9taW50JzsKICAgIGNvbnN0IHJlcyA9IGF3YWl0IGFwaS5wb3N0KHVybCwge2JvZHl9KTsKICAgIHRoaXMuZGVidWdMb2coJyoqKioqKioqKioqIG1pbnQgcmVzdWx0Jyk7CiAgICB0aGlzLmRlYnVnTG9nKHJlcyk7CiAgICByZXR1cm4gcmVzOwogIH0KICBhc3luYyBzaWduQW5kTWludChhZGRyZXNzLGRhdGEscHVibGljS2V5LGFtb3VudCx1bml0LHByaXZhdGVLZXkpIHsKICAgIHRoaXMuZGVidWdMb2coJ3NpZ25BbmRNaW50Jyk7CiAgICB0aGlzLmRlYnVnTG9nKHthZGRyZXNzLGRhdGEscHVibGljS2V5LGFtb3VudCx1bml0LHByaXZhdGVLZXl9KTsKICAgIHZhciBmaWVsZHMgPSBbXTsKICAgIHZhciB7IGJhbGFuY2UgfSA9IGF3YWl0IHRoaXMuYmFsYW5jZShhZGRyZXNzKTsKICAgIC8vIHRoaXMuZGVidWdMb2coJyMjIyMjIyMjIyMjIyMjIyMgYmFsYW5jZS5Db3VudGVyOiAnICsgYmFsYW5jZS5Db3VudGVyKTsKICAgIGZpZWxkcy5wdXNoKGJhbGFuY2UuQ291bnRlcik7CiAgICBmaWVsZHMucHVzaChhZGRyZXNzKTsKICAgIGZpZWxkcy5wdXNoKGFtb3VudCk7CiAgICBmaWVsZHMucHVzaCh1bml0KTsKICAgIGZpZWxkcy5wdXNoKGRhdGEpOwoKICAgIHZhciB7IHNpZyB9ID0gYXdhaXQgdGhpcy5zaWduTWVzc2FnZShmaWVsZHMscHJpdmF0ZUtleSk7CgogICAgdmFyIHJlcyA9IGF3YWl0IHRoaXMubWludChzaWcsYWRkcmVzcyxkYXRhLHB1YmxpY0tleSxhbW91bnQsdW5pdCk7CgogICAgcmV0dXJuIHJlczsKICB9CiAgYXN5bmMgd2l0aGRyYXcoc2lnLHByaXZhdGVLZXksZGVzdEFkZHJlc3MsZGVzdEFtb3VudCxkYXRhLHNvdXJjZU91dHB1dCkgewogICAgdmFyIGFwaSA9IHRoaXMuaG9va3Muc3RhY2suYXBpOwogICAgdmFyIGJvZHkgPSB7CiAgICAgIHNpZywKICAgICAgcHJpdmF0ZUtleSwKICAgICAgZGVzdEFkZHJlc3MsCiAgICAgIGRlc3RBbW91bnQsCiAgICAgIGRhdGEsCiAgICAgIHNvdXJjZU91dHB1dAogICAgfTsKICAgIHRoaXMuZGVidWdMb2coJyoqKioqKioqKioqIHdpdGhkcmF3Jyk7CiAgICB0aGlzLmRlYnVnTG9nKHtib2R5fSk7CiAgICB2YXIgdXJsID0gJy9wL3dpdGhkcmF3JzsKICAgIGNvbnN0IHJlcyA9IGF3YWl0IGFwaS5wb3N0KHVybCwge2JvZHl9KTsKICAgIHJldHVybiByZXM7CiAgfQogIGFzeW5jIHNpZ25BbmRXaXRoZHJhdyhwcml2YXRlS2V5LHNvdXJjZUFkZHJlc3MsZGVzdEFkZHJlc3MsZGVzdEFtb3VudCxkYXRhLHNvdXJjZU91dHB1dCkgewogICAgdGhpcy5kZWJ1Z0xvZygnc2lnbkFuZFdpdGhkcmF3Jyk7CiAgICB0aGlzLmRlYnVnTG9nKHtwcml2YXRlS2V5LHNvdXJjZUFkZHJlc3MsZGVzdEFkZHJlc3MsZGVzdEFtb3VudCxkYXRhLHNvdXJjZU91dHB1dH0pOwogICAgdmFyIGZpZWxkcyA9IFtdOwogICAgdmFyIHsgYmFsYW5jZSB9ID0gYXdhaXQgdGhpcy5iYWxhbmNlKHNvdXJjZUFkZHJlc3MpOwogICAgLy8gdGhpcy5kZWJ1Z0xvZygnIyMjIyMjIyMjIyMjIyMjIyBiYWxhbmNlLkNvdW50ZXI6ICcgKyBiYWxhbmNlLkNvdW50ZXIpOwogICAgZmllbGRzLnB1c2goYmFsYW5jZS5Db3VudGVyKTsKICAgIGZpZWxkcy5wdXNoKGRlc3RBZGRyZXNzKTsKICAgIGZpZWxkcy5wdXNoKGRhdGEpOwogICAgZmllbGRzLnB1c2goc291cmNlT3V0cHV0KTsKICAgIGZpZWxkcy5wdXNoKGRlc3RBbW91bnQpOwoKICAgIHZhciB7IHNpZyB9ID0gYXdhaXQgdGhpcy5zaWduTWVzc2FnZShmaWVsZHMscHJpdmF0ZUtleSk7CgogICAgdmFyIHJlcyA9IGF3YWl0IHRoaXMud2l0aGRyYXcoc2lnLHByaXZhdGVLZXksZGVzdEFkZHJlc3MsZGVzdEFtb3VudCxkYXRhLHNvdXJjZU91dHB1dCk7CgogICAgcmV0dXJuIHJlczsKICB9CiAgYXN5bmMgYm9tVXBkYXRlV2l0aFNpZyhzaWcsYWRkcmVzcyxwdWJsaWNLZXksYm9tT3AsYm9tQWRkcmVzcykgewogICAgdmFyIGFwaSA9IHRoaXMuaG9va3Muc3RhY2suYXBpOwogICAgdmFyIGJvZHkgPSB7CiAgICAgIHNpZywKICAgICAgYWRkcmVzcywKICAgICAgcHVibGljS2V5LAogICAgICBib21PcCwKICAgICAgYm9tQWRkcmVzcwogICAgfTsKICAgIHRoaXMuZGVidWdMb2coJyoqKioqKioqKioqIGRvIGJvbVVwZGF0ZScpOwogICAgdGhpcy5kZWJ1Z0xvZyh7Ym9keX0pOwogICAgdGhpcy5kZWJ1Z0xvZyh7YXBpfSk7CiAgICB0aGlzLmRlYnVnU2l6ZShib2R5KTsKICAgIHZhciB1cmwgPSAnL3AvYm9tVXBkYXRlV2l0aFNpZyc7CiAgICBjb25zdCByZXMgPSBhd2FpdCBhcGkucG9zdCh1cmwsIHtib2R5fSk7CiAgICB0aGlzLmRlYnVnTG9nKCcqKioqKioqKioqKiBib21VcGRhdGUgcmVzdWx0Jyk7CiAgICB0aGlzLmRlYnVnTG9nKHJlcyk7CiAgICByZXR1cm4gcmVzOwogIH0KICBhc3luYyBzaWduQW5kVXBkYXRlQm9tKGFkZHJlc3MscHVibGljS2V5LGJvbU9wLGJvbUFkZHJlc3MscHJpdmF0ZUtleSkgewogICAgdGhpcy5kZWJ1Z0xvZygnc2lnbkFuZFVwZGF0ZUJvbScpOwogICAgdGhpcy5kZWJ1Z0xvZyh7YWRkcmVzcyxwdWJsaWNLZXksYm9tT3AsYm9tQWRkcmVzcyxwcml2YXRlS2V5fSk7CiAgICB2YXIgZmllbGRzID0gW107CiAgICB2YXIgeyBiYWxhbmNlIH0gPSBhd2FpdCB0aGlzLmJhbGFuY2UoYWRkcmVzcyk7CiAgICAvLyB0aGlzLmRlYnVnTG9nKCcjIyMjIyMjIyMjIyMjIyMjIGJhbGFuY2UuQ291bnRlcjogJyArIGJhbGFuY2UuQ291bnRlcik7CiAgICBmaWVsZHMucHVzaChiYWxhbmNlLkNvdW50ZXIpOwogICAgZmllbGRzLnB1c2goYWRkcmVzcyk7CiAgICBmaWVsZHMucHVzaChib21PcCk7CiAgICBmaWVsZHMucHVzaChib21BZGRyZXNzKTsKCiAgICB2YXIgeyBzaWcgfSA9IGF3YWl0IHRoaXMuc2lnbk1lc3NhZ2UoZmllbGRzLHByaXZhdGVLZXkpOwoKICAgIHZhciByZXMgPSBhd2FpdCB0aGlzLmJvbVVwZGF0ZVdpdGhTaWcoc2lnLGFkZHJlc3MscHVibGljS2V5LGJvbU9wLGJvbUFkZHJlc3MpOwoKICAgIHJldHVybiByZXM7CiAgfQp9Owo=", "base64_Y2xhc3MgU21hcnRDb250cmFjdCBleHRlbmRzIFNtYXJ0Q29udHJhY3RCYXNlIHsKICBjb25zdHJ1Y3Rvcihob29rcykgewogICAgICBzdXBlcihob29rcykKICAgICAgdGhpcy5kZWJ1Z0xvZygnKioqKioqKioqKioqKiogU21hcnRDb250cmFjdCcpOwogIH0KCiAgYXN5bmMgZWNobygpIHsKICAgICAgdGhpcy5kZWJ1Z0xvZygnZWNobycpOwogICAgICB2YXIgcnZhbCA9IHsKICAgICAgICAgIGRhdGE6ICdoZWxsbycKICAgICAgfTsKICAgICAgdGhpcy5ob29rcy5maW5pc2gucmVzb2x2ZShydmFsKTsKICB9CgogIGFzeW5jIHdpbmVtYWtlck1pbnRPaygpIHsgCiAgICB0aGlzLmRlYnVnTG9nKCdleGVjdXRlIHdpbmVtYWtlck1pbnRPaycpOwogICAgICB2YXIgXyA9IHRoaXMuaG9va3MuXzsKICAgICAgdmFyIHNzID0gdGhpcy5ob29rcy5zY3JlZW5TdGF0ZTsKICAgICAgdmFyIGFwcCA9IHRoaXMuaG9va3MuYXBwOwogICAgICB2YXIgdXNlckNyZWRlbnRpYWxzID0gYXBwLmdldEFwcFN0YXRlKCd1c2VyQ3JlZGVudGlhbHMnKTsKICAgICAgdmFyIHB1YmxpY0tleSA9IHVzZXJDcmVkZW50aWFscy5wdWJsaWNLZXk7CiAgICAgIHZhciBwcml2YXRlS2V5ID0gdXNlckNyZWRlbnRpYWxzLnByaXZhdGVLZXk7CiAgICAgIHZhciB3b3JrZmxvdyA9IHNzLndvcmtmbG93OwogICAgICB2YXIgbmV3SWQgPSB0aGlzLmhvb2tzLnNob3J0aWQuZ2VuZXJhdGUoKTsKICAgICAgdmFyIHBvcGNvZGVOYW1lID0gJ1dpbmVfJyArIG5ld0lkOwogICAgICB2YXIgeyBmb3JtIH0gPSB0aGlzLnN0YXRlOwogICAgICB0aGlzLmRlYnVnTG9nKGZvcm0pOwogICAgICB2YXIgeyBwb3Bjb2RlIH0gPSBhd2FpdCB0aGlzLmdlbmVyYXRlKCk7CiAgICAgIHZhciB7IGFkZHJlc3MgfSA9IHBvcGNvZGU7CiAgICAgIHZhciBuZXh0U3BvdCA9ICd0cnVja2VyLnBpY2t1cCc7CiAgICAgIHZhciBhbW91bnQgPSB0aGlzLnRvSW50ZWdlcihmb3JtLm1pbnRXaW5lQm90dGxlcy5BbW91bnQpOwogICAgICB2YXIgdW5pdCA9IGZvcm0ubWludFdpbmVCb3R0bGVzLlVuaXQ7CiAgICAgIHRoaXMuZGVidWdMb2coJyMjIyMjIyMjIyMjIyMlJSUlJSUlJSUlJSUlJCQkJCQkJCQkJCQkJCQgIGdlbmVyYXRlZCB3aW5lbWFrZXIgcG9wY29kZTonKTsKICAgICAgdGhpcy5kZWJ1Z0xvZyh7cG9wY29kZU5hbWUscG9wY29kZX0pOwogICAgICAKICAgICAgdmFyIGRhdGEgPQogICAgICAgICAgewogICAgICAgICAgICAiYXBwRGF0YSI6IHsKICAgICAgICAgICAgICAid29ya2Zsb3dEYXRhIjogZm9ybSwKICAgICAgICAgICAgICAid2luZUJvdHRsZXMiOiBhbW91bnQsCiAgICAgICAgICAgICAgIndpbmVVbml0IjogdW5pdCwKICAgICAgICAgICAgICAic3BvdCI6IG5leHRTcG90LAogICAgICAgICAgICAgICJ3b3JrZmxvd05hbWUiOiBzcy53b3JrZmxvdy5uYW1lLAogICAgICAgICAgICAgICJ3b3JrZmxvd0luc3RhbmNlSWQiOiBuZXdJZCwKICAgICAgICAgICAgICAid29ya2Zsb3dSb290UG9wY29kZSI6ICJ0cnVlIiwKICAgICAgICAgICAgICBwb3Bjb2RlTmFtZSAsCiAgICAgICAgICAgICAgIndvcmtmbG93RGVmIjogd29ya2Zsb3cKICAgICAgICAgICAgfQogICAgICAgICAgfTsKCiAgICAgIHRoaXMuZGVidWdMb2coZGF0YSk7CgogICAgICB2YXIgcmVzID0gYXdhaXQgdGhpcy5zaWduQW5kTWludChhZGRyZXNzLGRhdGEscHVibGljS2V5LGFtb3VudCx1bml0LHByaXZhdGVLZXkpOwogICAgICAvLyB0aGlzLmRlYnVnTG9nKCd0aGlzLnNpZ25BbmRNaW50IHJlcy5ib2R5LmtleXM6ICcgKyBPYmplY3Qua2V5cyhyZXMuYm9keSkpOwoKICAgICAgdmFyIHJ2YWwgPSB7CiAgICAgICAgICBhY3Rpb246IFtdCiAgICAgIH07CiAgICAgIHRoaXMuaG9va3MuZmluaXNoLnJlc29sdmUocnZhbCk7CiAgICAgIHJldHVybiBhZGRyZXNzOwogICAgCiAgfQogIHRvSW50ZWdlcih2YWx1ZSkgewogICAgdmFyIF8gPSB0aGlzLmhvb2tzLl87CiAgICBpZihfLmlzU3RyaW5nKHZhbHVlKSkKICAgICAgcmV0dXJuIHBhcnNlSW50KHZhbHVlKTsKICAgIGVsc2UKICAgICAgcmV0dXJuIHZhbHVlOwogIH0KICBhc3luYyB0cnVja2VyUGlja3VwT2soKSB7IAogICAgdGhpcy5kZWJ1Z0xvZygnZXhlY3V0ZSB0cnVja2VyUGlja3VwT2snKTsKICAgIHZhciBmb3JtID0gdGhpcy5zdGF0ZS5mb3JtOwogICAgdGhpcy5kZWJ1Z0xvZyh7Zm9ybX0pOwogICAgCiAgICB2YXIgcnZhbCA9IHsKICAgICAgICBhY3Rpb246IFtdCiAgICB9OwoKICAgIHZhciBfID0gdGhpcy5ob29rcy5fOwogICAgdmFyIHNzID0gdGhpcy5ob29rcy5zY3JlZW5TdGF0ZTsKICAgIHZhciBhcHAgPSB0aGlzLmhvb2tzLmFwcDsKICAgIHZhciB3b3JrZmxvdyA9IHNzLndvcmtmbG93OwogICAgCiAgICB2YXIgdXNlckNyZWRlbnRpYWxzID0gYXBwLmdldEFwcFN0YXRlKCd1c2VyQ3JlZGVudGlhbHMnKTsKICAgIHZhciB1c2VyUHVibGljS2V5ID0gdXNlckNyZWRlbnRpYWxzLnB1YmxpY0tleTsKICAgIHZhciB1c2VyUHJpdmF0ZUtleSA9IHVzZXJDcmVkZW50aWFscy5wcml2YXRlS2V5OwogICAgCiAgICB2YXIgc3JjUG9wY29kZSA9IHRoaXMuc3RhdGUucG9wY29kZTsKICAgIAoKICAgIHZhciBkZXN0QW1vdW50ID0gdGhpcy50b0ludGVnZXIodGhpcy5zdGF0ZS5mb3JtLndpdGhkcmF3LnBpY2t1cEFtb3VudCk7CiAgICB2YXIgZGVzdE5hbWUgPSAiVHJ1Y2tfIiArIHVzZXJDcmVkZW50aWFscy5zZXNzaW9uSWQ7CiAgICAKICAgIHZhciBkYXRhID0geyBkZXNjcmlwdGlvbjogYHdpdGhkcmF3ICR7ZGVzdEFtb3VudH0gYm90dGxlcyBvZiB3aW5lYCB9OwogICAgdmFyIHNvdXJjZU91dHB1dCA9IDA7CiAgICAKICAgIHRoaXMuZGVidWdMb2coJ2dldCB0cnVjayBwb3Bjb2RlOiAnICsgZGVzdE5hbWUpOwogICAgdmFyIHRydWNrUG9wY29kZSA9IGF3YWl0IHRoaXMub25lQnlOYW1lKGRlc3ROYW1lKTsKICAgIHRoaXMuZGVidWdMb2codHJ1Y2tQb3Bjb2RlKTsKICAgICAKICAgIHRoaXMuZGVidWdMb2coJ2NoZWNrIHNvdXJjZSB3aW5lIGJvdHRsZSBjb3VudCcpOwogICAgdmFyIHdpbmVCb3R0bGVzID0gdGhpcy50b0ludGVnZXIoc3JjUG9wY29kZS5hcHBEYXRhLndpbmVCb3R0bGVzKTsKICAgIHZhciB3aW5lVW5pdCA9IHNyY1BvcGNvZGUuYXBwRGF0YS53aW5lVW5pdDsKICAgIHRoaXMuZGVidWdMb2coe3NyY1BvcGNvZGV9KTsKICAgIHRoaXMuZGVidWdMb2coe3dpbmVCb3R0bGVzLGRlc3RBbW91bnQsd2luZVVuaXR9KTsKICAgIAogICAgaWYoXy5pc05pbChkZXN0QW1vdW50KSB8fCBfLmlzTmFOKGRlc3RBbW91bnQpKSB7CiAgICAgIHRoaXMuZGVidWdMb2coJyoqKioqKioqKioqKioqKioqKiBlcnJvciBiYWQgZGVzdEFtb3VudCknKTsKICAgICAgdGhpcy5ob29rcy5maW5pc2gucmVzb2x2ZShydmFsKTsKICAgICAgcmV0dXJuIDsKICAgIH0KICAgIAogICAgaWYoXy5pc05pbCh3aW5lQm90dGxlcykgfHwgXy5pc05hTihkZXN0QW1vdW50KSkgewogICAgICB0aGlzLmRlYnVnTG9nKCcqKioqKioqKioqKioqKioqKiogZXJyb3IgYmFkIHdpbmVCb3R0bGVzJyk7CiAgICAgIHRoaXMuaG9va3MuZmluaXNoLnJlc29sdmUocnZhbCk7CiAgICAgIHJldHVybiA7CiAgICB9CiAgICAKICAgIGlmKGRlc3RBbW91bnQgPiB3aW5lQm90dGxlcykgewogICAgICB0aGlzLmRlYnVnTG9nKCcqKioqKioqKioqKioqKioqKiogZXJyb3IgZGVzdEFtb3VudCA+IHdpbmVCb3R0bGVzJyk7CiAgICAgIHRoaXMuaG9va3MuZmluaXNoLnJlc29sdmUocnZhbCk7CiAgICAgIHJldHVybiA7CiAgICB9CiAgICAgCiAgICB2YXIgdHJ1Y2tCb3R0bGVzOwogICAgaWYgKF8uaXNOaWwodHJ1Y2tQb3Bjb2RlKSkgewogICAgICB0aGlzLmRlYnVnTG9nKCdNaW50aW5nIHRydWNrIHBvcGNvZGU6ICcgKyBkZXN0TmFtZSk7CiAgICAgIHZhciB0cnVja1Nwb3QgPSAndHJ1Y2tlci5zaG93JzsKICAgICAgdmFyIG5ld0lkID0gdGhpcy5ob29rcy5zaG9ydGlkLmdlbmVyYXRlKCk7CiAgICAgIHZhciB0cnVja1N0YXJ0QW1vdW50ID0gMDsKICAgICAgdmFyIHRydWNrVW5pdCA9ICdib3R0bGVzIG9mIHdpbmUnOwogICAgICB0cnVja0JvdHRsZXMgPSAwOwogICAgICB2YXIgdHJ1Y2tEYXRhID0KICAgICAgICAgIHsKICAgICAgICAgICAgImFwcERhdGEiOiB7CiAgICAgICAgICAgICAgIndvcmtmbG93RGF0YSI6IHt9LAogICAgICAgICAgICAgICJzcG90IjogdHJ1Y2tTcG90LAogICAgICAgICAgICAgICJ3aW5lQm90dGxlcyI6IHRydWNrQm90dGxlcywKICAgICAgICAgICAgICAid2luZVVuaXQiOiB3aW5lVW5pdCwKICAgICAgICAgICAgICAid29ya2Zsb3dOYW1lIjogc3Mud29ya2Zsb3cubmFtZSwKICAgICAgICAgICAgICAid29ya2Zsb3dJbnN0YW5jZUlkIjogbmV3SWQsCiAgICAgICAgICAgICAgIndvcmtmbG93Um9vdFBvcGNvZGUiOiAidHJ1ZSIsCiAgICAgICAgICAgICAgcG9wY29kZU5hbWU6IGRlc3ROYW1lLAogICAgICAgICAgICAgICJ3b3JrZmxvd0RlZiI6IHdvcmtmbG93CiAgICAgICAgICAgIH0KICAgICAgICAgIH07CiAgICAgIHZhciBuZXdQb3Bjb2RlID0gYXdhaXQgdGhpcy5nZW5lcmF0ZSgpOwogICAgICB2YXIgdHJ1Y2tBZGRyZXNzID0gbmV3UG9wY29kZS5wb3Bjb2RlLmFkZHJlc3M7CiAgICAgIAogICAgICB2YXIgcmVzID0gYXdhaXQgdGhpcy5zaWduQW5kTWludCh0cnVja0FkZHJlc3MsdHJ1Y2tEYXRhLHVzZXJQdWJsaWNLZXksdHJ1Y2tTdGFydEFtb3VudCx0cnVja1VuaXQsdXNlclByaXZhdGVLZXkpOwogICAgICAKICAgICAgdHJ1Y2tQb3Bjb2RlID0gYXdhaXQgdGhpcy5vbmVCeU5hbWUoZGVzdE5hbWUpOwogICAgfQogICAgZWxzZSB7CiAgICAgIHRoaXMuZGVidWdMb2coJ0ZvdW5kIGV4aXN0aW5nIHRydWNrIHBvcGNvZGU6ICcgKyBkZXN0TmFtZSk7CiAgICAgIHRydWNrQm90dGxlcyA9IHRydWNrUG9wY29kZS5hcHBEYXRhLndpbmVCb3R0bGVzOwogICAgfQogICAgCiAgICBpZihfLmlzTmlsKHRydWNrUG9wY29kZSkpIHsKICAgICAgdGhpcy5kZWJ1Z0xvZygnKioqKioqKioqKioqKioqKioqIEVycm9yIG1pbnRpbmcgdHJ1Y2sgcG9wY29kZScpOwogICAgICB0aGlzLmhvb2tzLmZpbmlzaC5yZXNvbHZlKHJ2YWwpOwogICAgICByZXR1cm4gOwogICAgfQogICAgCiAgICB0aGlzLmRlYnVnTG9nKCcjIyMjIyMjIyMjIyMjIyMjIHRydWNrIHBvcGNvZGU6Jyk7CiAgICB0aGlzLmRlYnVnTG9nKHRydWNrUG9wY29kZSk7CiAgICAKICAgIHZhciB3cmVzID0gYXdhaXQgdGhpcy5zaWduQW5kV2l0aGRyYXcoCiAgICAgIHNyY1BvcGNvZGUucHJpdmF0ZUtleSwKICAgICAgc3JjUG9wY29kZS5hZGRyZXNzLAogICAgICB0cnVja1BvcGNvZGUuYWRkcmVzcywKICAgICAgZGVzdEFtb3VudCwKICAgICAgZGF0YSwKICAgICAgc291cmNlT3V0cHV0CiAgICApOwogICAgCiAgICB0aGlzLmRlYnVnTG9nKCcjIyMjIyMjIyMjIyMjIyMjIHdpdGhkcmF3IHJlc3VsdDonKTsKICAgIHRoaXMuZGVidWdMb2cod3Jlcyk7CiAgICBydmFsLndyZXMgPSB3cmVzOwogICAgCiAgICB0aGlzLmRlYnVnTG9nKCcjIyMjIyMjIyMjIyMjIyMjIHVwZGF0ZSBzb3VyY2Ugd2luZSBib3R0bGUgY291bnQ6Jyk7CiAgICB2YXIgd2luZUNvdW50ID0gd2luZUJvdHRsZXMgLSBkZXN0QW1vdW50OwogICAgdmFyIHdpbmVEYXRhID0KICAgICAgICB7CiAgICAgICAgICAiYXBwRGF0YSI6IHsKICAgICAgICAgICAgIndpbmVCb3R0bGVzIjogd2luZUNvdW50CiAgICAgICAgICB9CiAgICAgICAgfTsKCiAgICB0aGlzLmRlYnVnTG9nKHdpbmVEYXRhKTsKICAgIHZhciBicmVzID0gYXdhaXQgdGhpcy5ibG9iQ3JlYXRlKAogICAgICBzcmNQb3Bjb2RlLmFkZHJlc3MsCiAgICAgIHdpbmVEYXRhLAogICAgICB1c2VyQ3JlZGVudGlhbHMucHVibGljS2V5LAogICAgICB1c2VyQ3JlZGVudGlhbHMucHJpdmF0ZUtleSk7CiAgICAgIAogICAgdGhpcy5kZWJ1Z0xvZygnIyMjIyMjIyMjIyMjIyMjIyBibG9iQ3JlYXRlIHJlc3VsdDonKTsKICAgIHRoaXMuZGVidWdMb2coYnJlcyk7CiAgICBydmFsLmJyZXMgPSBicmVzOwogICAgCiAgICB0aGlzLmRlYnVnTG9nKCcjIyMjIyMjIyMjIyMjIyMjIHVwZGF0ZSB0cnVjayB3aW5lIGJvdHRsZSBjb3VudDonKTsKICAgIHZhciB0cnVja0NvdW50ID0gdHJ1Y2tCb3R0bGVzICsgZGVzdEFtb3VudDsKICAgIHZhciB0cnVja1dpbmVEYXRhID0KICAgICAgICB7CiAgICAgICAgICAiYXBwRGF0YSI6IHsKICAgICAgICAgICAgIndpbmVCb3R0bGVzIjogdHJ1Y2tDb3VudAogICAgICAgICAgfQogICAgICAgIH07CgogICAgdGhpcy5kZWJ1Z0xvZyh0cnVja1dpbmVEYXRhKTsKICAgIHZhciBicmVzMiA9IGF3YWl0IHRoaXMuYmxvYkNyZWF0ZSgKICAgICAgdHJ1Y2tQb3Bjb2RlLmFkZHJlc3MsCiAgICAgIHRydWNrV2luZURhdGEsCiAgICAgIHVzZXJDcmVkZW50aWFscy5wdWJsaWNLZXksCiAgICAgIHVzZXJDcmVkZW50aWFscy5wcml2YXRlS2V5KTsKICAgICAgCiAgICB0aGlzLmRlYnVnTG9nKCcjIyMjIyMjIyMjIyMjIyMjIHRydWNrIGJsb2JDcmVhdGUgcmVzdWx0OicpOwogICAgdGhpcy5kZWJ1Z0xvZyhicmVzMik7CiAgICBydmFsLmJyZXMyID0gYnJlczI7CiAgICAKICAgIHRoaXMuaG9va3MuZmluaXNoLnJlc29sdmUocnZhbCk7CiAgIH0KCn07Cg=="]
                }
            },
            "timestamp": 1520232308155
        },
        "publicKey": "035e217f4f36a97056830955fd23ca2fc1b6a3986336080c1f86fb92aaecb9d34f",
        "spot": "trucker.pickup",
        "unit": "bottles of wine",
        "privateKey": "3bdfe8d06cafe40a161da4ac3272f24d7b82fc71d83784329640878e41228617",
        "type": "popcode",
        "popcodeName": "Wine_PK9CFQEVS",
        "amount": "1000",
        "creatorPublicKey": "AzFSqglD2Tz0BHF7fyc5OZ0NYkqslptvM8W2ghgAjmAN",
        "workflowDef": {
            "title": "Wine V1",
            "name": "wineV1",
            "startScreen": "Home",
            "version": "2.0",
            "steps": {
                "winemaker.mint": {
                    "step": "winemaker.mint",
                    "title": "Winemaker Mint",
                    "screen": "WinemakerMint"
                },
                "trucker.pickup": {"step": "trucker.pickup", "title": "Trucker Pickup", "screen": "TruckerPickup"},
                "trucker.show": {"step": "trucker.show", "title": "Trucker Show", "screen": "TruckerShow"}
            },
            "appOptions": {"requireLogin": true},
            "screens": {
                "Home": {
                    "name": "Home",
                    "title": "Home",
                    "api": "/api/mobile",
                    "screenListItems": {
                        "fetchItems": "/popcodeByWorkflowName",
                        "method": "get",
                        "api": "cayley",
                        "fetchParameters": {"workflowName": "wineV1"},
                        "itemDataTypes": {"popcode": "object"},
                        "itemLabel": ["popcodeName"],
                        "itemActions": {
                            "click": {
                                "title": "Click",
                                "action": [{
                                    "operation": "startWorkflow",
                                    "replaceCurrent": true,
                                    "parameters": {"spot": "@popcode.spot", "popcode": "@popcode"}
                                }],
                                "parameters": {"popcode": "@item"}
                            }
                        }
                    },
                    "screenButtons": {
                        "scan": {
                            "title": "Scan",
                            "action": [{"operation": "navigate", "screen": "Scan"}],
                            "roles": ["admin", "winemaker", "trucker"]
                        },
                        "mint": {
                            "title": "Mint",
                            "action": [{"operation": "navigate", "resetStack": true, "screen": "WinemakerMint"}],
                            "roles": ["admin", "winemaker"]
                        }
                    }
                },
                "Scan": {
                    "name": "Scan",
                    "title": "Scan",
                    "api": "/api/mobile",
                    "parameters": {"user": "@user"},
                    "modal": false,
                    "screenScan": {},
                    "startAction": [{
                        "operation": "scanBarcode",
                        "barcodeTypes": ["qr", "code128"],
                        "outputs": {"scanData": "@scanData"}
                    }, {
                        "operation": "routePopcode",
                        "parameters": {"scanData": "@scanData"},
                        "outputs": {"address": "@address"}
                    }, {
                        "operation": "fetch",
                        "route": "/p",
                        "method": "get",
                        "parameters": {"address": "@address"},
                        "outputs": {"popcode": "@popcodes[0]"}
                    }, {
                        "operation": "startWorkflow",
                        "replaceCurrent": true,
                        "parameters": {"spot": "@popcode.spot", "popcode": "@popcode"}
                    }]
                },
                "WinemakerMint": {
                    "name": "WinemakerMint",
                    "title": "Winemaker Mint",
                    "api": "/api/mobile",
                    "parameters": {"container": "@container", "popcode": "@popcode", "user": "@user"},
                    "outputs": {"popcode": "@container"},
                    "screenForm": {
                        "fields": {
                            "type": "object",
                            "properties": {
                                "mintWineBottles": {
                                    "type": "object",
                                    "properties": {
                                        "Amount": {
                                            "type": "string",
                                            "value": "1000",
                                            "options": {"editable": true}
                                        },
                                        "Unit": {
                                            "type": "string",
                                            "value": "bottles of wine",
                                            "options": {"editable": true}
                                        }
                                    },
                                    "required": ["Amount", "Unit"]
                                }
                            },
                            "required": ["mintWineBottles"]
                        }, "options": {"auto": "labels"}
                    },
                    "screenButtons": {
                        "mint": {
                            "title": "Mint",
                            "action": [{
                                "operation": "contract",
                                "contract": "winemakerMintOk",
                                "parameters": {"popcode": "@popcode"},
                                "outputs": {"status": "@status", "txId": "@txId"}
                            }, {"operation": "navigate", "resetStack": true, "forceUpdate": true, "screen": "Home"}],
                            "roles": ["admin", "winemaker"]
                        },
                        "cancel": {
                            "title": "Cancel",
                            "action": [{"operation": "navigate", "resetStack": true, "screen": "Home"}]
                        }
                    }
                },
                "TruckerPickup": {
                    "name": "TruckerPickup",
                    "title": "Trucker Wine Pickup",
                    "api": "/api/mobile",
                    "parameters": {"container": "@container", "popcode": "@popcode", "user": "@user"},
                    "outputs": {"popcode": "@container"},
                    "tabs": {
                        "tab1": {
                            "title": "Pickup Wine",
                            "screenForm": {
                                "privateKey": ["winemaker", "admin"],
                                "publicKey": ["winemaker", "trucker", "admin"],
                                "fields": {
                                    "type": "object",
                                    "properties": {
                                        "popcode": {
                                            "type": "object",
                                            "properties": {
                                                "name": {
                                                    "type": "string",
                                                    "value": "@popcode.popcodeName",
                                                    "options": {"editable": false}
                                                },
                                                "address": {
                                                    "type": "string",
                                                    "value": "@popcode.address",
                                                    "options": {"editable": false}
                                                },
                                                "currentState": {
                                                    "type": "string",
                                                    "value": "@popcode.spot",
                                                    "options": {"editable": false}
                                                }
                                            },
                                            "required": ["name", "address", "currentState"]
                                        },
                                        "warehouseContents": {
                                            "type": "object",
                                            "properties": {
                                                "Amount": {
                                                    "type": "number",
                                                    "value": "@popcode.appData.wineBottles",
                                                    "options": {"editable": false}
                                                },
                                                "Unit": {
                                                    "type": "string",
                                                    "value": "@popcode.appData.wineUnit",
                                                    "options": {"editable": false}
                                                }
                                            }
                                        },
                                        "withdraw": {
                                            "type": "object",
                                            "properties": {
                                                "pickupAmount": {
                                                    "type": "number",
                                                    "options": {"editable": true}
                                                }
                                            },
                                            "required": ["pickupAmount"]
                                        }
                                    },
                                    "required": ["withdraw"]
                                },
                                "options": {"auto": "labels"}
                            }
                        }, "tab2": {"title": "Popcode Graph", "graphView": {"visName": "wine"}}
                    },
                    "screenButtons": {
                        "pickup": {
                            "title": "Pickup",
                            "action": [{
                                "operation": "contract",
                                "contract": "truckerPickupOk",
                                "parameters": {"popcode": "@popcode"},
                                "outputs": {"status": "@status", "txId": "@txId"}
                            }, {"operation": "navigate", "resetStack": true, "forceUpdate": true, "screen": "Home"}],
                            "roles": ["admin", "trucker"]
                        },
                        "cancel": {
                            "title": "Cancel",
                            "action": [{"operation": "navigate", "resetStack": true, "screen": "Home"}]
                        }
                    }
                },
                "TruckerShow": {
                    "name": "TruckerShow",
                    "title": "Truck Popcode",
                    "api": "/api/mobile",
                    "parameters": {"container": "@container", "popcode": "@popcode", "user": "@user"},
                    "outputs": {"popcode": "@container"},
                    "tabs": {
                        "tab1": {
                            "title": "Truck Contents",
                            "screenForm": {
                                "privateKey": ["trucker", "admin"],
                                "publicKey": ["winemaker", "trucker", "admin"],
                                "fields": {
                                    "type": "object",
                                    "properties": {
                                        "popcode": {
                                            "type": "object",
                                            "properties": {
                                                "name": {
                                                    "type": "string",
                                                    "value": "@popcode.popcodeName",
                                                    "options": {"editable": false}
                                                },
                                                "address": {
                                                    "type": "string",
                                                    "value": "@popcode.address",
                                                    "options": {"editable": false}
                                                },
                                                "currentState": {
                                                    "type": "string",
                                                    "value": "@popcode.spot",
                                                    "options": {"editable": false}
                                                }
                                            },
                                            "required": ["name", "address", "currentState"]
                                        },
                                        "truckContents": {
                                            "type": "object",
                                            "properties": {
                                                "Amount": {
                                                    "type": "number",
                                                    "value": "@popcode.appData.wineBottles",
                                                    "options": {"editable": false}
                                                },
                                                "Unit": {
                                                    "type": "string",
                                                    "value": "@popcode.appData.wineUnit",
                                                    "options": {"editable": false}
                                                }
                                            }
                                        }
                                    }
                                },
                                "options": {"auto": "labels"}
                            }
                        }, "tab2": {"title": "Popcode Graph", "graphView": {"visName": "wine"}}
                    },
                    "screenButtons": {
                        "ok": {
                            "title": "Ok",
                            "action": [{"operation": "navigate", "resetStack": true, "screen": "Home"}]
                        }
                    }
                }
            },
            "contractLib": {
                "name": "Wine SmartContract Library",
                "version": "1.0",
                "slug": "wine_1_0",
                "libs": ["base64_Y2xhc3MgU21hcnRDb250cmFjdEJhc2UgewogIGNvbnN0cnVjdG9yKGhvb2tzKSB7CiAgICAgIHRoaXMuaG9va3MgPSBob29rczsKICAgICAgdGhpcy5zdGF0ZSA9IGhvb2tzLnN0YXRlOwogICAgICB0aGlzLmRlYnVnTG9nID0gaG9va3MuZGVidWdMb2c7CiAgICAgIHRoaXMuZGVidWdMb2coJ2NvbnN0cnVjdCBTbWFydENvbnRyYWN0QmFzZScpOwogIH0KICBkZWJ1Z1NpemUobykgewogICAgdmFyIHMgPSBKU09OLnN0cmluZ2lmeShvKTsKICAgIHRoaXMuZGVidWdMb2coYHNpemU6ICR7cy5sZW5ndGgvMTAyNH0ga2ApOwogIH0KICBhc3luYyBieU5hbWUocE5hbWUpIHsKICAgIHZhciBhcGkgPSB0aGlzLmhvb2tzLnN0YWNrLmFwaTsKICAgIHZhciB1cmwgPSAnL3AvbmFtZS8nICsgcE5hbWU7CiAgICBjb25zdCByZXMgPSBhd2FpdCBhcGkuZ2V0KHVybCk7CiAgICByZXR1cm4gcmVzLmJvZHk7CiAgfQogIGFzeW5jIG9uZUJ5TmFtZShwTmFtZSkgewogICAgdmFyIF8gPSB0aGlzLmhvb2tzLl87CiAgICB2YXIgYXBpID0gdGhpcy5ob29rcy5zdGFjay5hcGk7CiAgICB2YXIgdXJsID0gJy9wL25hbWUvJyArIHBOYW1lOwogICAgY29uc3QgcmVzID0gYXdhaXQgYXBpLmdldCh1cmwpOwogICAgdmFyIHBvcGNvZGVzID0gIV8uaXNOaWwocmVzKQogICAgICYmICFfLmlzTmlsKHJlcy5ib2R5KQogICAgICYmICFfLmlzTmlsKHJlcy5ib2R5LnBvcGNvZGVzKSA/IHJlcy5ib2R5LnBvcGNvZGVzIDogbnVsbDsKICAgIHZhciBwb3Bjb2RlID0gXy5pc0FycmF5KHBvcGNvZGVzKSAmJiBwb3Bjb2Rlcy5sZW5ndGggPiAwCiAgICAgPyBwb3Bjb2Rlc1swXSA6IG51bGw7CiAgICByZXR1cm4gcG9wY29kZTsKICB9CiAgYXN5bmMgYmFsYW5jZShhZGRyZXNzKSB7CiAgICB2YXIgYXBpID0gdGhpcy5ob29rcy5zdGFjay5hcGk7CiAgICB2YXIgdXJsID0gJy9wL2JhbGFuY2UvJyArIGFkZHJlc3M7CiAgICBjb25zdCByZXMgPSBhd2FpdCBhcGkuZ2V0KHVybCk7CiAgICByZXR1cm4gcmVzLmJvZHk7CiAgfQogIGFzeW5jIGdlbmVyYXRlKCkgewogICAgdmFyIGFwaSA9IHRoaXMuaG9va3Muc3RhY2suYXBpOwogICAgdmFyIHVybCA9ICcvcC9nZW5lcmF0ZSc7CiAgICBjb25zdCByZXMgPSBhd2FpdCBhcGkuZ2V0KHVybCk7CiAgICByZXR1cm4gcmVzLmJvZHk7CiAgfQogIGFzeW5jIGNvbnRhaW5lclBvcGNvZGUoYWRkcmVzcykgewogICAgdmFyIGFwaSA9IHRoaXMuaG9va3Muc3RhY2suYXBpQ2F5bGV5OwogICAgdmFyIHVybCA9ICcvY29udGFpbmVyUG9wY29kZS8nICsgYWRkcmVzczsKICAgIGNvbnN0IHJlcyA9IGF3YWl0IGFwaS5nZXQodXJsKTsKICAgIHJldHVybiByZXMuYm9keTsKICB9CiAgYXN5bmMgYm9tUG9wY29kZXMoYWRkcmVzcykgewogICAgdmFyIGFwaSA9IHRoaXMuaG9va3Muc3RhY2suYXBpQ2F5bGV5OwogICAgdmFyIHVybCA9ICcvYm9tUG9wY29kZXMvJyArIGFkZHJlc3M7CiAgICBjb25zdCByZXMgPSBhd2FpdCBhcGkuZ2V0KHVybCk7CiAgICByZXR1cm4gcmVzLmJvZHk7CiAgfQogIGFzeW5jIHNpZ25NZXNzYWdlKGZpZWxkcyxwcml2YXRlS2V5KSB7CiAgICB2YXIgYXBpID0gdGhpcy5ob29rcy5zdGFjay5hcGk7CiAgICB2YXIgYm9keSA9IHsKICAgICAgZmllbGRzLAogICAgICBwcml2YXRlS2V5CiAgICB9OwogICAgdmFyIHVybCA9ICcvY3J5cHRvL3NpZ25NZXNzYWdlJzsKICAgIHRoaXMuZGVidWdMb2coJyoqKioqKioqKioqIHNpZ25NZXNzYWdlJyk7CiAgICB0aGlzLmRlYnVnTG9nKHtib2R5fSk7CiAgICBjb25zdCByZXMgPSBhd2FpdCBhcGkucG9zdCh1cmwsIHtib2R5fSk7CiAgICB0aGlzLmRlYnVnTG9nKHtib2R5OiByZXMuYm9keX0pOwogICAgcmV0dXJuIHJlcy5ib2R5OwogIH0KICBhc3luYyBibG9iQ3JlYXRlV2l0aFNpZyhzaWcsYWRkcmVzcyxkYXRhLHB1YmxpY0tleSkgewogICAgdmFyIGFwaSA9IHRoaXMuaG9va3Muc3RhY2suYXBpOwogICAgdmFyIGJvZHkgPSB7CiAgICAgIHNpZywKICAgICAgYWRkcmVzcywKICAgICAgcHVibGljS2V5LAogICAgICBkYXRhCiAgICB9OwogICAgdmFyIHVybCA9ICcvcC9ibG9iQ3JlYXRlV2l0aFNpZyc7CiAgICBjb25zdCByZXMgPSBhd2FpdCBhcGkucG9zdCh1cmwsIHtib2R5fSk7CiAgICByZXR1cm4gcmVzLmJvZHk7CiAgfQogIGFzeW5jIGJsb2JDcmVhdGUoYWRkcmVzcyxkYXRhLHB1YmxpY0tleSxwcml2YXRlS2V5KSB7CiAgICB2YXIgZmllbGRzID0gW107CgogICAgdmFyIHJlcyA9IGF3YWl0IHRoaXMuYmFsYW5jZShhZGRyZXNzKTsKICAgIGZpZWxkcy5wdXNoKHJlcy5iYWxhbmNlLkNvdW50ZXIpOwogICAgZmllbGRzLnB1c2goYWRkcmVzcyk7CiAgICBmaWVsZHMucHVzaChkYXRhKTsKCiAgICByZXMgPSBhd2FpdCB0aGlzLnNpZ25NZXNzYWdlKGZpZWxkcyxwcml2YXRlS2V5KTsKCiAgICByZXMgPSBhd2FpdCB0aGlzLmJsb2JDcmVhdGVXaXRoU2lnKHJlcy5zaWcsYWRkcmVzcyxkYXRhLHB1YmxpY0tleSk7CgogICAgcmV0dXJuIHJlczsKICB9CiAgYXN5bmMgbWludChzaWcsYWRkcmVzcyxkYXRhLHB1YmxpY0tleSxhbW91bnQsdW5pdCkgewogICAgdmFyIGFwaSA9IHRoaXMuaG9va3Muc3RhY2suYXBpOwogICAgdmFyIGJvZHkgPSB7CiAgICAgIHNpZywKICAgICAgYWRkcmVzcywKICAgICAgcHVibGljS2V5LAogICAgICBhbW91bnQsCiAgICAgIHVuaXQsCiAgICAgIGRhdGEKICAgIH07CiAgICB0aGlzLmRlYnVnTG9nKCcqKioqKioqKioqKiBkbyBtaW50Jyk7CiAgICB0aGlzLmRlYnVnTG9nKHtib2R5fSk7CiAgICB0aGlzLmRlYnVnTG9nKHthcGl9KTsKICAgIHRoaXMuZGVidWdTaXplKGJvZHkpOwogICAgdmFyIHVybCA9ICcvcC9taW50JzsKICAgIGNvbnN0IHJlcyA9IGF3YWl0IGFwaS5wb3N0KHVybCwge2JvZHl9KTsKICAgIHRoaXMuZGVidWdMb2coJyoqKioqKioqKioqIG1pbnQgcmVzdWx0Jyk7CiAgICB0aGlzLmRlYnVnTG9nKHJlcyk7CiAgICByZXR1cm4gcmVzOwogIH0KICBhc3luYyBzaWduQW5kTWludChhZGRyZXNzLGRhdGEscHVibGljS2V5LGFtb3VudCx1bml0LHByaXZhdGVLZXkpIHsKICAgIHRoaXMuZGVidWdMb2coJ3NpZ25BbmRNaW50Jyk7CiAgICB0aGlzLmRlYnVnTG9nKHthZGRyZXNzLGRhdGEscHVibGljS2V5LGFtb3VudCx1bml0LHByaXZhdGVLZXl9KTsKICAgIHZhciBmaWVsZHMgPSBbXTsKICAgIHZhciB7IGJhbGFuY2UgfSA9IGF3YWl0IHRoaXMuYmFsYW5jZShhZGRyZXNzKTsKICAgIC8vIHRoaXMuZGVidWdMb2coJyMjIyMjIyMjIyMjIyMjIyMgYmFsYW5jZS5Db3VudGVyOiAnICsgYmFsYW5jZS5Db3VudGVyKTsKICAgIGZpZWxkcy5wdXNoKGJhbGFuY2UuQ291bnRlcik7CiAgICBmaWVsZHMucHVzaChhZGRyZXNzKTsKICAgIGZpZWxkcy5wdXNoKGFtb3VudCk7CiAgICBmaWVsZHMucHVzaCh1bml0KTsKICAgIGZpZWxkcy5wdXNoKGRhdGEpOwoKICAgIHZhciB7IHNpZyB9ID0gYXdhaXQgdGhpcy5zaWduTWVzc2FnZShmaWVsZHMscHJpdmF0ZUtleSk7CgogICAgdmFyIHJlcyA9IGF3YWl0IHRoaXMubWludChzaWcsYWRkcmVzcyxkYXRhLHB1YmxpY0tleSxhbW91bnQsdW5pdCk7CgogICAgcmV0dXJuIHJlczsKICB9CiAgYXN5bmMgd2l0aGRyYXcoc2lnLHByaXZhdGVLZXksZGVzdEFkZHJlc3MsZGVzdEFtb3VudCxkYXRhLHNvdXJjZU91dHB1dCkgewogICAgdmFyIGFwaSA9IHRoaXMuaG9va3Muc3RhY2suYXBpOwogICAgdmFyIGJvZHkgPSB7CiAgICAgIHNpZywKICAgICAgcHJpdmF0ZUtleSwKICAgICAgZGVzdEFkZHJlc3MsCiAgICAgIGRlc3RBbW91bnQsCiAgICAgIGRhdGEsCiAgICAgIHNvdXJjZU91dHB1dAogICAgfTsKICAgIHRoaXMuZGVidWdMb2coJyoqKioqKioqKioqIHdpdGhkcmF3Jyk7CiAgICB0aGlzLmRlYnVnTG9nKHtib2R5fSk7CiAgICB2YXIgdXJsID0gJy9wL3dpdGhkcmF3JzsKICAgIGNvbnN0IHJlcyA9IGF3YWl0IGFwaS5wb3N0KHVybCwge2JvZHl9KTsKICAgIHJldHVybiByZXM7CiAgfQogIGFzeW5jIHNpZ25BbmRXaXRoZHJhdyhwcml2YXRlS2V5LHNvdXJjZUFkZHJlc3MsZGVzdEFkZHJlc3MsZGVzdEFtb3VudCxkYXRhLHNvdXJjZU91dHB1dCkgewogICAgdGhpcy5kZWJ1Z0xvZygnc2lnbkFuZFdpdGhkcmF3Jyk7CiAgICB0aGlzLmRlYnVnTG9nKHtwcml2YXRlS2V5LHNvdXJjZUFkZHJlc3MsZGVzdEFkZHJlc3MsZGVzdEFtb3VudCxkYXRhLHNvdXJjZU91dHB1dH0pOwogICAgdmFyIGZpZWxkcyA9IFtdOwogICAgdmFyIHsgYmFsYW5jZSB9ID0gYXdhaXQgdGhpcy5iYWxhbmNlKHNvdXJjZUFkZHJlc3MpOwogICAgLy8gdGhpcy5kZWJ1Z0xvZygnIyMjIyMjIyMjIyMjIyMjIyBiYWxhbmNlLkNvdW50ZXI6ICcgKyBiYWxhbmNlLkNvdW50ZXIpOwogICAgZmllbGRzLnB1c2goYmFsYW5jZS5Db3VudGVyKTsKICAgIGZpZWxkcy5wdXNoKGRlc3RBZGRyZXNzKTsKICAgIGZpZWxkcy5wdXNoKGRhdGEpOwogICAgZmllbGRzLnB1c2goc291cmNlT3V0cHV0KTsKICAgIGZpZWxkcy5wdXNoKGRlc3RBbW91bnQpOwoKICAgIHZhciB7IHNpZyB9ID0gYXdhaXQgdGhpcy5zaWduTWVzc2FnZShmaWVsZHMscHJpdmF0ZUtleSk7CgogICAgdmFyIHJlcyA9IGF3YWl0IHRoaXMud2l0aGRyYXcoc2lnLHByaXZhdGVLZXksZGVzdEFkZHJlc3MsZGVzdEFtb3VudCxkYXRhLHNvdXJjZU91dHB1dCk7CgogICAgcmV0dXJuIHJlczsKICB9CiAgYXN5bmMgYm9tVXBkYXRlV2l0aFNpZyhzaWcsYWRkcmVzcyxwdWJsaWNLZXksYm9tT3AsYm9tQWRkcmVzcykgewogICAgdmFyIGFwaSA9IHRoaXMuaG9va3Muc3RhY2suYXBpOwogICAgdmFyIGJvZHkgPSB7CiAgICAgIHNpZywKICAgICAgYWRkcmVzcywKICAgICAgcHVibGljS2V5LAogICAgICBib21PcCwKICAgICAgYm9tQWRkcmVzcwogICAgfTsKICAgIHRoaXMuZGVidWdMb2coJyoqKioqKioqKioqIGRvIGJvbVVwZGF0ZScpOwogICAgdGhpcy5kZWJ1Z0xvZyh7Ym9keX0pOwogICAgdGhpcy5kZWJ1Z0xvZyh7YXBpfSk7CiAgICB0aGlzLmRlYnVnU2l6ZShib2R5KTsKICAgIHZhciB1cmwgPSAnL3AvYm9tVXBkYXRlV2l0aFNpZyc7CiAgICBjb25zdCByZXMgPSBhd2FpdCBhcGkucG9zdCh1cmwsIHtib2R5fSk7CiAgICB0aGlzLmRlYnVnTG9nKCcqKioqKioqKioqKiBib21VcGRhdGUgcmVzdWx0Jyk7CiAgICB0aGlzLmRlYnVnTG9nKHJlcyk7CiAgICByZXR1cm4gcmVzOwogIH0KICBhc3luYyBzaWduQW5kVXBkYXRlQm9tKGFkZHJlc3MscHVibGljS2V5LGJvbU9wLGJvbUFkZHJlc3MscHJpdmF0ZUtleSkgewogICAgdGhpcy5kZWJ1Z0xvZygnc2lnbkFuZFVwZGF0ZUJvbScpOwogICAgdGhpcy5kZWJ1Z0xvZyh7YWRkcmVzcyxwdWJsaWNLZXksYm9tT3AsYm9tQWRkcmVzcyxwcml2YXRlS2V5fSk7CiAgICB2YXIgZmllbGRzID0gW107CiAgICB2YXIgeyBiYWxhbmNlIH0gPSBhd2FpdCB0aGlzLmJhbGFuY2UoYWRkcmVzcyk7CiAgICAvLyB0aGlzLmRlYnVnTG9nKCcjIyMjIyMjIyMjIyMjIyMjIGJhbGFuY2UuQ291bnRlcjogJyArIGJhbGFuY2UuQ291bnRlcik7CiAgICBmaWVsZHMucHVzaChiYWxhbmNlLkNvdW50ZXIpOwogICAgZmllbGRzLnB1c2goYWRkcmVzcyk7CiAgICBmaWVsZHMucHVzaChib21PcCk7CiAgICBmaWVsZHMucHVzaChib21BZGRyZXNzKTsKCiAgICB2YXIgeyBzaWcgfSA9IGF3YWl0IHRoaXMuc2lnbk1lc3NhZ2UoZmllbGRzLHByaXZhdGVLZXkpOwoKICAgIHZhciByZXMgPSBhd2FpdCB0aGlzLmJvbVVwZGF0ZVdpdGhTaWcoc2lnLGFkZHJlc3MscHVibGljS2V5LGJvbU9wLGJvbUFkZHJlc3MpOwoKICAgIHJldHVybiByZXM7CiAgfQp9Owo=", "base64_Y2xhc3MgU21hcnRDb250cmFjdCBleHRlbmRzIFNtYXJ0Q29udHJhY3RCYXNlIHsKICBjb25zdHJ1Y3Rvcihob29rcykgewogICAgICBzdXBlcihob29rcykKICAgICAgdGhpcy5kZWJ1Z0xvZygnKioqKioqKioqKioqKiogU21hcnRDb250cmFjdCcpOwogIH0KCiAgYXN5bmMgZWNobygpIHsKICAgICAgdGhpcy5kZWJ1Z0xvZygnZWNobycpOwogICAgICB2YXIgcnZhbCA9IHsKICAgICAgICAgIGRhdGE6ICdoZWxsbycKICAgICAgfTsKICAgICAgdGhpcy5ob29rcy5maW5pc2gucmVzb2x2ZShydmFsKTsKICB9CgogIGFzeW5jIHdpbmVtYWtlck1pbnRPaygpIHsgCiAgICB0aGlzLmRlYnVnTG9nKCdleGVjdXRlIHdpbmVtYWtlck1pbnRPaycpOwogICAgICB2YXIgXyA9IHRoaXMuaG9va3MuXzsKICAgICAgdmFyIHNzID0gdGhpcy5ob29rcy5zY3JlZW5TdGF0ZTsKICAgICAgdmFyIGFwcCA9IHRoaXMuaG9va3MuYXBwOwogICAgICB2YXIgdXNlckNyZWRlbnRpYWxzID0gYXBwLmdldEFwcFN0YXRlKCd1c2VyQ3JlZGVudGlhbHMnKTsKICAgICAgdmFyIHB1YmxpY0tleSA9IHVzZXJDcmVkZW50aWFscy5wdWJsaWNLZXk7CiAgICAgIHZhciBwcml2YXRlS2V5ID0gdXNlckNyZWRlbnRpYWxzLnByaXZhdGVLZXk7CiAgICAgIHZhciB3b3JrZmxvdyA9IHNzLndvcmtmbG93OwogICAgICB2YXIgbmV3SWQgPSB0aGlzLmhvb2tzLnNob3J0aWQuZ2VuZXJhdGUoKTsKICAgICAgdmFyIHBvcGNvZGVOYW1lID0gJ1dpbmVfJyArIG5ld0lkOwogICAgICB2YXIgeyBmb3JtIH0gPSB0aGlzLnN0YXRlOwogICAgICB0aGlzLmRlYnVnTG9nKGZvcm0pOwogICAgICB2YXIgeyBwb3Bjb2RlIH0gPSBhd2FpdCB0aGlzLmdlbmVyYXRlKCk7CiAgICAgIHZhciB7IGFkZHJlc3MgfSA9IHBvcGNvZGU7CiAgICAgIHZhciBuZXh0U3BvdCA9ICd0cnVja2VyLnBpY2t1cCc7CiAgICAgIHZhciBhbW91bnQgPSB0aGlzLnRvSW50ZWdlcihmb3JtLm1pbnRXaW5lQm90dGxlcy5BbW91bnQpOwogICAgICB2YXIgdW5pdCA9IGZvcm0ubWludFdpbmVCb3R0bGVzLlVuaXQ7CiAgICAgIHRoaXMuZGVidWdMb2coJyMjIyMjIyMjIyMjIyMlJSUlJSUlJSUlJSUlJCQkJCQkJCQkJCQkJCQgIGdlbmVyYXRlZCB3aW5lbWFrZXIgcG9wY29kZTonKTsKICAgICAgdGhpcy5kZWJ1Z0xvZyh7cG9wY29kZU5hbWUscG9wY29kZX0pOwogICAgICAKICAgICAgdmFyIGRhdGEgPQogICAgICAgICAgewogICAgICAgICAgICAiYXBwRGF0YSI6IHsKICAgICAgICAgICAgICAid29ya2Zsb3dEYXRhIjogZm9ybSwKICAgICAgICAgICAgICAid2luZUJvdHRsZXMiOiBhbW91bnQsCiAgICAgICAgICAgICAgIndpbmVVbml0IjogdW5pdCwKICAgICAgICAgICAgICAic3BvdCI6IG5leHRTcG90LAogICAgICAgICAgICAgICJ3b3JrZmxvd05hbWUiOiBzcy53b3JrZmxvdy5uYW1lLAogICAgICAgICAgICAgICJ3b3JrZmxvd0luc3RhbmNlSWQiOiBuZXdJZCwKICAgICAgICAgICAgICAid29ya2Zsb3dSb290UG9wY29kZSI6ICJ0cnVlIiwKICAgICAgICAgICAgICBwb3Bjb2RlTmFtZSAsCiAgICAgICAgICAgICAgIndvcmtmbG93RGVmIjogd29ya2Zsb3cKICAgICAgICAgICAgfQogICAgICAgICAgfTsKCiAgICAgIHRoaXMuZGVidWdMb2coZGF0YSk7CgogICAgICB2YXIgcmVzID0gYXdhaXQgdGhpcy5zaWduQW5kTWludChhZGRyZXNzLGRhdGEscHVibGljS2V5LGFtb3VudCx1bml0LHByaXZhdGVLZXkpOwogICAgICAvLyB0aGlzLmRlYnVnTG9nKCd0aGlzLnNpZ25BbmRNaW50IHJlcy5ib2R5LmtleXM6ICcgKyBPYmplY3Qua2V5cyhyZXMuYm9keSkpOwoKICAgICAgdmFyIHJ2YWwgPSB7CiAgICAgICAgICBhY3Rpb246IFtdCiAgICAgIH07CiAgICAgIHRoaXMuaG9va3MuZmluaXNoLnJlc29sdmUocnZhbCk7CiAgICAgIHJldHVybiBhZGRyZXNzOwogICAgCiAgfQogIHRvSW50ZWdlcih2YWx1ZSkgewogICAgdmFyIF8gPSB0aGlzLmhvb2tzLl87CiAgICBpZihfLmlzU3RyaW5nKHZhbHVlKSkKICAgICAgcmV0dXJuIHBhcnNlSW50KHZhbHVlKTsKICAgIGVsc2UKICAgICAgcmV0dXJuIHZhbHVlOwogIH0KICBhc3luYyB0cnVja2VyUGlja3VwT2soKSB7IAogICAgdGhpcy5kZWJ1Z0xvZygnZXhlY3V0ZSB0cnVja2VyUGlja3VwT2snKTsKICAgIHZhciBmb3JtID0gdGhpcy5zdGF0ZS5mb3JtOwogICAgdGhpcy5kZWJ1Z0xvZyh7Zm9ybX0pOwogICAgCiAgICB2YXIgcnZhbCA9IHsKICAgICAgICBhY3Rpb246IFtdCiAgICB9OwoKICAgIHZhciBfID0gdGhpcy5ob29rcy5fOwogICAgdmFyIHNzID0gdGhpcy5ob29rcy5zY3JlZW5TdGF0ZTsKICAgIHZhciBhcHAgPSB0aGlzLmhvb2tzLmFwcDsKICAgIHZhciB3b3JrZmxvdyA9IHNzLndvcmtmbG93OwogICAgCiAgICB2YXIgdXNlckNyZWRlbnRpYWxzID0gYXBwLmdldEFwcFN0YXRlKCd1c2VyQ3JlZGVudGlhbHMnKTsKICAgIHZhciB1c2VyUHVibGljS2V5ID0gdXNlckNyZWRlbnRpYWxzLnB1YmxpY0tleTsKICAgIHZhciB1c2VyUHJpdmF0ZUtleSA9IHVzZXJDcmVkZW50aWFscy5wcml2YXRlS2V5OwogICAgCiAgICB2YXIgc3JjUG9wY29kZSA9IHRoaXMuc3RhdGUucG9wY29kZTsKICAgIAoKICAgIHZhciBkZXN0QW1vdW50ID0gdGhpcy50b0ludGVnZXIodGhpcy5zdGF0ZS5mb3JtLndpdGhkcmF3LnBpY2t1cEFtb3VudCk7CiAgICB2YXIgZGVzdE5hbWUgPSAiVHJ1Y2tfIiArIHVzZXJDcmVkZW50aWFscy5zZXNzaW9uSWQ7CiAgICAKICAgIHZhciBkYXRhID0geyBkZXNjcmlwdGlvbjogYHdpdGhkcmF3ICR7ZGVzdEFtb3VudH0gYm90dGxlcyBvZiB3aW5lYCB9OwogICAgdmFyIHNvdXJjZU91dHB1dCA9IDA7CiAgICAKICAgIHRoaXMuZGVidWdMb2coJ2dldCB0cnVjayBwb3Bjb2RlOiAnICsgZGVzdE5hbWUpOwogICAgdmFyIHRydWNrUG9wY29kZSA9IGF3YWl0IHRoaXMub25lQnlOYW1lKGRlc3ROYW1lKTsKICAgIHRoaXMuZGVidWdMb2codHJ1Y2tQb3Bjb2RlKTsKICAgICAKICAgIHRoaXMuZGVidWdMb2coJ2NoZWNrIHNvdXJjZSB3aW5lIGJvdHRsZSBjb3VudCcpOwogICAgdmFyIHdpbmVCb3R0bGVzID0gdGhpcy50b0ludGVnZXIoc3JjUG9wY29kZS5hcHBEYXRhLndpbmVCb3R0bGVzKTsKICAgIHZhciB3aW5lVW5pdCA9IHNyY1BvcGNvZGUuYXBwRGF0YS53aW5lVW5pdDsKICAgIHRoaXMuZGVidWdMb2coe3NyY1BvcGNvZGV9KTsKICAgIHRoaXMuZGVidWdMb2coe3dpbmVCb3R0bGVzLGRlc3RBbW91bnQsd2luZVVuaXR9KTsKICAgIAogICAgaWYoXy5pc05pbChkZXN0QW1vdW50KSB8fCBfLmlzTmFOKGRlc3RBbW91bnQpKSB7CiAgICAgIHRoaXMuZGVidWdMb2coJyoqKioqKioqKioqKioqKioqKiBlcnJvciBiYWQgZGVzdEFtb3VudCknKTsKICAgICAgdGhpcy5ob29rcy5maW5pc2gucmVzb2x2ZShydmFsKTsKICAgICAgcmV0dXJuIDsKICAgIH0KICAgIAogICAgaWYoXy5pc05pbCh3aW5lQm90dGxlcykgfHwgXy5pc05hTihkZXN0QW1vdW50KSkgewogICAgICB0aGlzLmRlYnVnTG9nKCcqKioqKioqKioqKioqKioqKiogZXJyb3IgYmFkIHdpbmVCb3R0bGVzJyk7CiAgICAgIHRoaXMuaG9va3MuZmluaXNoLnJlc29sdmUocnZhbCk7CiAgICAgIHJldHVybiA7CiAgICB9CiAgICAKICAgIGlmKGRlc3RBbW91bnQgPiB3aW5lQm90dGxlcykgewogICAgICB0aGlzLmRlYnVnTG9nKCcqKioqKioqKioqKioqKioqKiogZXJyb3IgZGVzdEFtb3VudCA+IHdpbmVCb3R0bGVzJyk7CiAgICAgIHRoaXMuaG9va3MuZmluaXNoLnJlc29sdmUocnZhbCk7CiAgICAgIHJldHVybiA7CiAgICB9CiAgICAgCiAgICB2YXIgdHJ1Y2tCb3R0bGVzOwogICAgaWYgKF8uaXNOaWwodHJ1Y2tQb3Bjb2RlKSkgewogICAgICB0aGlzLmRlYnVnTG9nKCdNaW50aW5nIHRydWNrIHBvcGNvZGU6ICcgKyBkZXN0TmFtZSk7CiAgICAgIHZhciB0cnVja1Nwb3QgPSAndHJ1Y2tlci5zaG93JzsKICAgICAgdmFyIG5ld0lkID0gdGhpcy5ob29rcy5zaG9ydGlkLmdlbmVyYXRlKCk7CiAgICAgIHZhciB0cnVja1N0YXJ0QW1vdW50ID0gMDsKICAgICAgdmFyIHRydWNrVW5pdCA9ICdib3R0bGVzIG9mIHdpbmUnOwogICAgICB0cnVja0JvdHRsZXMgPSAwOwogICAgICB2YXIgdHJ1Y2tEYXRhID0KICAgICAgICAgIHsKICAgICAgICAgICAgImFwcERhdGEiOiB7CiAgICAgICAgICAgICAgIndvcmtmbG93RGF0YSI6IHt9LAogICAgICAgICAgICAgICJzcG90IjogdHJ1Y2tTcG90LAogICAgICAgICAgICAgICJ3aW5lQm90dGxlcyI6IHRydWNrQm90dGxlcywKICAgICAgICAgICAgICAid2luZVVuaXQiOiB3aW5lVW5pdCwKICAgICAgICAgICAgICAid29ya2Zsb3dOYW1lIjogc3Mud29ya2Zsb3cubmFtZSwKICAgICAgICAgICAgICAid29ya2Zsb3dJbnN0YW5jZUlkIjogbmV3SWQsCiAgICAgICAgICAgICAgIndvcmtmbG93Um9vdFBvcGNvZGUiOiAidHJ1ZSIsCiAgICAgICAgICAgICAgcG9wY29kZU5hbWU6IGRlc3ROYW1lLAogICAgICAgICAgICAgICJ3b3JrZmxvd0RlZiI6IHdvcmtmbG93CiAgICAgICAgICAgIH0KICAgICAgICAgIH07CiAgICAgIHZhciBuZXdQb3Bjb2RlID0gYXdhaXQgdGhpcy5nZW5lcmF0ZSgpOwogICAgICB2YXIgdHJ1Y2tBZGRyZXNzID0gbmV3UG9wY29kZS5wb3Bjb2RlLmFkZHJlc3M7CiAgICAgIAogICAgICB2YXIgcmVzID0gYXdhaXQgdGhpcy5zaWduQW5kTWludCh0cnVja0FkZHJlc3MsdHJ1Y2tEYXRhLHVzZXJQdWJsaWNLZXksdHJ1Y2tTdGFydEFtb3VudCx0cnVja1VuaXQsdXNlclByaXZhdGVLZXkpOwogICAgICAKICAgICAgdHJ1Y2tQb3Bjb2RlID0gYXdhaXQgdGhpcy5vbmVCeU5hbWUoZGVzdE5hbWUpOwogICAgfQogICAgZWxzZSB7CiAgICAgIHRoaXMuZGVidWdMb2coJ0ZvdW5kIGV4aXN0aW5nIHRydWNrIHBvcGNvZGU6ICcgKyBkZXN0TmFtZSk7CiAgICAgIHRydWNrQm90dGxlcyA9IHRydWNrUG9wY29kZS5hcHBEYXRhLndpbmVCb3R0bGVzOwogICAgfQogICAgCiAgICBpZihfLmlzTmlsKHRydWNrUG9wY29kZSkpIHsKICAgICAgdGhpcy5kZWJ1Z0xvZygnKioqKioqKioqKioqKioqKioqIEVycm9yIG1pbnRpbmcgdHJ1Y2sgcG9wY29kZScpOwogICAgICB0aGlzLmhvb2tzLmZpbmlzaC5yZXNvbHZlKHJ2YWwpOwogICAgICByZXR1cm4gOwogICAgfQogICAgCiAgICB0aGlzLmRlYnVnTG9nKCcjIyMjIyMjIyMjIyMjIyMjIHRydWNrIHBvcGNvZGU6Jyk7CiAgICB0aGlzLmRlYnVnTG9nKHRydWNrUG9wY29kZSk7CiAgICAKICAgIHZhciB3cmVzID0gYXdhaXQgdGhpcy5zaWduQW5kV2l0aGRyYXcoCiAgICAgIHNyY1BvcGNvZGUucHJpdmF0ZUtleSwKICAgICAgc3JjUG9wY29kZS5hZGRyZXNzLAogICAgICB0cnVja1BvcGNvZGUuYWRkcmVzcywKICAgICAgZGVzdEFtb3VudCwKICAgICAgZGF0YSwKICAgICAgc291cmNlT3V0cHV0CiAgICApOwogICAgCiAgICB0aGlzLmRlYnVnTG9nKCcjIyMjIyMjIyMjIyMjIyMjIHdpdGhkcmF3IHJlc3VsdDonKTsKICAgIHRoaXMuZGVidWdMb2cod3Jlcyk7CiAgICBydmFsLndyZXMgPSB3cmVzOwogICAgCiAgICB0aGlzLmRlYnVnTG9nKCcjIyMjIyMjIyMjIyMjIyMjIHVwZGF0ZSBzb3VyY2Ugd2luZSBib3R0bGUgY291bnQ6Jyk7CiAgICB2YXIgd2luZUNvdW50ID0gd2luZUJvdHRsZXMgLSBkZXN0QW1vdW50OwogICAgdmFyIHdpbmVEYXRhID0KICAgICAgICB7CiAgICAgICAgICAiYXBwRGF0YSI6IHsKICAgICAgICAgICAgIndpbmVCb3R0bGVzIjogd2luZUNvdW50CiAgICAgICAgICB9CiAgICAgICAgfTsKCiAgICB0aGlzLmRlYnVnTG9nKHdpbmVEYXRhKTsKICAgIHZhciBicmVzID0gYXdhaXQgdGhpcy5ibG9iQ3JlYXRlKAogICAgICBzcmNQb3Bjb2RlLmFkZHJlc3MsCiAgICAgIHdpbmVEYXRhLAogICAgICB1c2VyQ3JlZGVudGlhbHMucHVibGljS2V5LAogICAgICB1c2VyQ3JlZGVudGlhbHMucHJpdmF0ZUtleSk7CiAgICAgIAogICAgdGhpcy5kZWJ1Z0xvZygnIyMjIyMjIyMjIyMjIyMjIyBibG9iQ3JlYXRlIHJlc3VsdDonKTsKICAgIHRoaXMuZGVidWdMb2coYnJlcyk7CiAgICBydmFsLmJyZXMgPSBicmVzOwogICAgCiAgICB0aGlzLmRlYnVnTG9nKCcjIyMjIyMjIyMjIyMjIyMjIHVwZGF0ZSB0cnVjayB3aW5lIGJvdHRsZSBjb3VudDonKTsKICAgIHZhciB0cnVja0NvdW50ID0gdHJ1Y2tCb3R0bGVzICsgZGVzdEFtb3VudDsKICAgIHZhciB0cnVja1dpbmVEYXRhID0KICAgICAgICB7CiAgICAgICAgICAiYXBwRGF0YSI6IHsKICAgICAgICAgICAgIndpbmVCb3R0bGVzIjogdHJ1Y2tDb3VudAogICAgICAgICAgfQogICAgICAgIH07CgogICAgdGhpcy5kZWJ1Z0xvZyh0cnVja1dpbmVEYXRhKTsKICAgIHZhciBicmVzMiA9IGF3YWl0IHRoaXMuYmxvYkNyZWF0ZSgKICAgICAgdHJ1Y2tQb3Bjb2RlLmFkZHJlc3MsCiAgICAgIHRydWNrV2luZURhdGEsCiAgICAgIHVzZXJDcmVkZW50aWFscy5wdWJsaWNLZXksCiAgICAgIHVzZXJDcmVkZW50aWFscy5wcml2YXRlS2V5KTsKICAgICAgCiAgICB0aGlzLmRlYnVnTG9nKCcjIyMjIyMjIyMjIyMjIyMjIHRydWNrIGJsb2JDcmVhdGUgcmVzdWx0OicpOwogICAgdGhpcy5kZWJ1Z0xvZyhicmVzMik7CiAgICBydmFsLmJyZXMyID0gYnJlczI7CiAgICAKICAgIHRoaXMuaG9va3MuZmluaXNoLnJlc29sdmUocnZhbCk7CiAgIH0KCn07Cg=="]
            }
        },
        "address": "af5efdc4b5176fd77e9cc8c9c6e42f8b1552c1b3",
        "workflowRootPopcode": "true",
        "transaction": [{
            "id": "<576bab1f849256a43f656fed6cac5f552d73c4fdaced28d62a9dbaf07fc28ce0>",
            "popcode": "<af5efdc4b5176fd77e9cc8c9c6e42f8b1552c1b3>",
            "spot": "trucker.pickup",
            "unit": "bottles of wine",
            "txId": "576bab1f849256a43f656fed6cac5f552d73c4fdaced28d62a9dbaf07fc28ce0",
            "data": {
                "metadata": {
                    "appData": {
                        "workflowData": {
                            "mintWineBottles": {
                                "Amount": "1000",
                                "Unit": "bottles of wine"
                            }
                        },
                        "wineBottles": 1000,
                        "wineUnit": "bottles of wine",
                        "spot": "trucker.pickup",
                        "workflowName": "wineV1",
                        "workflowInstanceId": "PK9CFQEVS",
                        "workflowRootPopcode": "true",
                        "popcodeName": "Wine_PK9CFQEVS",
                        "workflowDef": {
                            "title": "Wine V1",
                            "name": "wineV1",
                            "startScreen": "Home",
                            "version": "2.0",
                            "steps": {
                                "winemaker.mint": {
                                    "step": "winemaker.mint",
                                    "title": "Winemaker Mint",
                                    "screen": "WinemakerMint"
                                },
                                "trucker.pickup": {
                                    "step": "trucker.pickup",
                                    "title": "Trucker Pickup",
                                    "screen": "TruckerPickup"
                                },
                                "trucker.show": {
                                    "step": "trucker.show",
                                    "title": "Trucker Show",
                                    "screen": "TruckerShow"
                                }
                            },
                            "appOptions": {"requireLogin": true},
                            "screens": {
                                "Home": {
                                    "name": "Home",
                                    "title": "Home",
                                    "api": "/api/mobile",
                                    "screenListItems": {
                                        "fetchItems": "/popcodeByWorkflowName",
                                        "method": "get",
                                        "api": "cayley",
                                        "fetchParameters": {"workflowName": "wineV1"},
                                        "itemDataTypes": {"popcode": "object"},
                                        "itemLabel": ["popcodeName"],
                                        "itemActions": {
                                            "click": {
                                                "title": "Click",
                                                "action": [{
                                                    "operation": "startWorkflow",
                                                    "replaceCurrent": true,
                                                    "parameters": {"spot": "@popcode.spot", "popcode": "@popcode"}
                                                }],
                                                "parameters": {"popcode": "@item"}
                                            }
                                        }
                                    },
                                    "screenButtons": {
                                        "scan": {
                                            "title": "Scan",
                                            "action": [{"operation": "navigate", "screen": "Scan"}],
                                            "roles": ["admin", "winemaker", "trucker"]
                                        },
                                        "mint": {
                                            "title": "Mint",
                                            "action": [{
                                                "operation": "navigate",
                                                "resetStack": true,
                                                "screen": "WinemakerMint"
                                            }],
                                            "roles": ["admin", "winemaker"]
                                        }
                                    }
                                },
                                "Scan": {
                                    "name": "Scan",
                                    "title": "Scan",
                                    "api": "/api/mobile",
                                    "parameters": {"user": "@user"},
                                    "modal": false,
                                    "screenScan": {},
                                    "startAction": [{
                                        "operation": "scanBarcode",
                                        "barcodeTypes": ["qr", "code128"],
                                        "outputs": {"scanData": "@scanData"}
                                    }, {
                                        "operation": "routePopcode",
                                        "parameters": {"scanData": "@scanData"},
                                        "outputs": {"address": "@address"}
                                    }, {
                                        "operation": "fetch",
                                        "route": "/p",
                                        "method": "get",
                                        "parameters": {"address": "@address"},
                                        "outputs": {"popcode": "@popcodes[0]"}
                                    }, {
                                        "operation": "startWorkflow",
                                        "replaceCurrent": true,
                                        "parameters": {"spot": "@popcode.spot", "popcode": "@popcode"}
                                    }]
                                },
                                "WinemakerMint": {
                                    "name": "WinemakerMint",
                                    "title": "Winemaker Mint",
                                    "api": "/api/mobile",
                                    "parameters": {"container": "@container", "popcode": "@popcode", "user": "@user"},
                                    "outputs": {"popcode": "@container"},
                                    "screenForm": {
                                        "fields": {
                                            "type": "object",
                                            "properties": {
                                                "mintWineBottles": {
                                                    "type": "object",
                                                    "properties": {
                                                        "Amount": {
                                                            "type": "string",
                                                            "value": "1000",
                                                            "options": {"editable": true}
                                                        },
                                                        "Unit": {
                                                            "type": "string",
                                                            "value": "bottles of wine",
                                                            "options": {"editable": true}
                                                        }
                                                    },
                                                    "required": ["Amount", "Unit"]
                                                }
                                            },
                                            "required": ["mintWineBottles"]
                                        }, "options": {"auto": "labels"}
                                    },
                                    "screenButtons": {
                                        "mint": {
                                            "title": "Mint",
                                            "action": [{
                                                "operation": "contract",
                                                "contract": "winemakerMintOk",
                                                "parameters": {"popcode": "@popcode"},
                                                "outputs": {"status": "@status", "txId": "@txId"}
                                            }, {
                                                "operation": "navigate",
                                                "resetStack": true,
                                                "forceUpdate": true,
                                                "screen": "Home"
                                            }],
                                            "roles": ["admin", "winemaker"]
                                        },
                                        "cancel": {
                                            "title": "Cancel",
                                            "action": [{"operation": "navigate", "resetStack": true, "screen": "Home"}]
                                        }
                                    }
                                },
                                "TruckerPickup": {
                                    "name": "TruckerPickup",
                                    "title": "Trucker Wine Pickup",
                                    "api": "/api/mobile",
                                    "parameters": {"container": "@container", "popcode": "@popcode", "user": "@user"},
                                    "outputs": {"popcode": "@container"},
                                    "tabs": {
                                        "tab1": {
                                            "title": "Pickup Wine",
                                            "screenForm": {
                                                "privateKey": ["winemaker", "admin"],
                                                "publicKey": ["winemaker", "trucker", "admin"],
                                                "fields": {
                                                    "type": "object",
                                                    "properties": {
                                                        "popcode": {
                                                            "type": "object",
                                                            "properties": {
                                                                "name": {
                                                                    "type": "string",
                                                                    "value": "@popcode.popcodeName",
                                                                    "options": {"editable": false}
                                                                },
                                                                "address": {
                                                                    "type": "string",
                                                                    "value": "@popcode.address",
                                                                    "options": {"editable": false}
                                                                },
                                                                "currentState": {
                                                                    "type": "string",
                                                                    "value": "@popcode.spot",
                                                                    "options": {"editable": false}
                                                                }
                                                            },
                                                            "required": ["name", "address", "currentState"]
                                                        },
                                                        "warehouseContents": {
                                                            "type": "object",
                                                            "properties": {
                                                                "Amount": {
                                                                    "type": "number",
                                                                    "value": "@popcode.appData.wineBottles",
                                                                    "options": {"editable": false}
                                                                },
                                                                "Unit": {
                                                                    "type": "string",
                                                                    "value": "@popcode.appData.wineUnit",
                                                                    "options": {"editable": false}
                                                                }
                                                            }
                                                        },
                                                        "withdraw": {
                                                            "type": "object",
                                                            "properties": {
                                                                "pickupAmount": {
                                                                    "type": "number",
                                                                    "options": {"editable": true}
                                                                }
                                                            },
                                                            "required": ["pickupAmount"]
                                                        }
                                                    },
                                                    "required": ["withdraw"]
                                                },
                                                "options": {"auto": "labels"}
                                            }
                                        }, "tab2": {"title": "Popcode Graph", "graphView": {"visName": "wine"}}
                                    },
                                    "screenButtons": {
                                        "pickup": {
                                            "title": "Pickup",
                                            "action": [{
                                                "operation": "contract",
                                                "contract": "truckerPickupOk",
                                                "parameters": {"popcode": "@popcode"},
                                                "outputs": {"status": "@status", "txId": "@txId"}
                                            }, {
                                                "operation": "navigate",
                                                "resetStack": true,
                                                "forceUpdate": true,
                                                "screen": "Home"
                                            }],
                                            "roles": ["admin", "trucker"]
                                        },
                                        "cancel": {
                                            "title": "Cancel",
                                            "action": [{"operation": "navigate", "resetStack": true, "screen": "Home"}]
                                        }
                                    }
                                },
                                "TruckerShow": {
                                    "name": "TruckerShow",
                                    "title": "Truck Popcode",
                                    "api": "/api/mobile",
                                    "parameters": {"container": "@container", "popcode": "@popcode", "user": "@user"},
                                    "outputs": {"popcode": "@container"},
                                    "tabs": {
                                        "tab1": {
                                            "title": "Truck Contents",
                                            "screenForm": {
                                                "privateKey": ["trucker", "admin"],
                                                "publicKey": ["winemaker", "trucker", "admin"],
                                                "fields": {
                                                    "type": "object",
                                                    "properties": {
                                                        "popcode": {
                                                            "type": "object",
                                                            "properties": {
                                                                "name": {
                                                                    "type": "string",
                                                                    "value": "@popcode.popcodeName",
                                                                    "options": {"editable": false}
                                                                },
                                                                "address": {
                                                                    "type": "string",
                                                                    "value": "@popcode.address",
                                                                    "options": {"editable": false}
                                                                },
                                                                "currentState": {
                                                                    "type": "string",
                                                                    "value": "@popcode.spot",
                                                                    "options": {"editable": false}
                                                                }
                                                            },
                                                            "required": ["name", "address", "currentState"]
                                                        },
                                                        "truckContents": {
                                                            "type": "object",
                                                            "properties": {
                                                                "Amount": {
                                                                    "type": "number",
                                                                    "value": "@popcode.appData.wineBottles",
                                                                    "options": {"editable": false}
                                                                },
                                                                "Unit": {
                                                                    "type": "string",
                                                                    "value": "@popcode.appData.wineUnit",
                                                                    "options": {"editable": false}
                                                                }
                                                            }
                                                        }
                                                    }
                                                },
                                                "options": {"auto": "labels"}
                                            }
                                        }, "tab2": {"title": "Popcode Graph", "graphView": {"visName": "wine"}}
                                    },
                                    "screenButtons": {
                                        "ok": {
                                            "title": "Ok",
                                            "action": [{"operation": "navigate", "resetStack": true, "screen": "Home"}]
                                        }
                                    }
                                }
                            },
                            "contractLib": {
                                "name": "Wine SmartContract Library",
                                "version": "1.0",
                                "slug": "wine_1_0",
                                "libs": ["base64_Y2xhc3MgU21hcnRDb250cmFjdEJhc2UgewogIGNvbnN0cnVjdG9yKGhvb2tzKSB7CiAgICAgIHRoaXMuaG9va3MgPSBob29rczsKICAgICAgdGhpcy5zdGF0ZSA9IGhvb2tzLnN0YXRlOwogICAgICB0aGlzLmRlYnVnTG9nID0gaG9va3MuZGVidWdMb2c7CiAgICAgIHRoaXMuZGVidWdMb2coJ2NvbnN0cnVjdCBTbWFydENvbnRyYWN0QmFzZScpOwogIH0KICBkZWJ1Z1NpemUobykgewogICAgdmFyIHMgPSBKU09OLnN0cmluZ2lmeShvKTsKICAgIHRoaXMuZGVidWdMb2coYHNpemU6ICR7cy5sZW5ndGgvMTAyNH0ga2ApOwogIH0KICBhc3luYyBieU5hbWUocE5hbWUpIHsKICAgIHZhciBhcGkgPSB0aGlzLmhvb2tzLnN0YWNrLmFwaTsKICAgIHZhciB1cmwgPSAnL3AvbmFtZS8nICsgcE5hbWU7CiAgICBjb25zdCByZXMgPSBhd2FpdCBhcGkuZ2V0KHVybCk7CiAgICByZXR1cm4gcmVzLmJvZHk7CiAgfQogIGFzeW5jIG9uZUJ5TmFtZShwTmFtZSkgewogICAgdmFyIF8gPSB0aGlzLmhvb2tzLl87CiAgICB2YXIgYXBpID0gdGhpcy5ob29rcy5zdGFjay5hcGk7CiAgICB2YXIgdXJsID0gJy9wL25hbWUvJyArIHBOYW1lOwogICAgY29uc3QgcmVzID0gYXdhaXQgYXBpLmdldCh1cmwpOwogICAgdmFyIHBvcGNvZGVzID0gIV8uaXNOaWwocmVzKQogICAgICYmICFfLmlzTmlsKHJlcy5ib2R5KQogICAgICYmICFfLmlzTmlsKHJlcy5ib2R5LnBvcGNvZGVzKSA/IHJlcy5ib2R5LnBvcGNvZGVzIDogbnVsbDsKICAgIHZhciBwb3Bjb2RlID0gXy5pc0FycmF5KHBvcGNvZGVzKSAmJiBwb3Bjb2Rlcy5sZW5ndGggPiAwCiAgICAgPyBwb3Bjb2Rlc1swXSA6IG51bGw7CiAgICByZXR1cm4gcG9wY29kZTsKICB9CiAgYXN5bmMgYmFsYW5jZShhZGRyZXNzKSB7CiAgICB2YXIgYXBpID0gdGhpcy5ob29rcy5zdGFjay5hcGk7CiAgICB2YXIgdXJsID0gJy9wL2JhbGFuY2UvJyArIGFkZHJlc3M7CiAgICBjb25zdCByZXMgPSBhd2FpdCBhcGkuZ2V0KHVybCk7CiAgICByZXR1cm4gcmVzLmJvZHk7CiAgfQogIGFzeW5jIGdlbmVyYXRlKCkgewogICAgdmFyIGFwaSA9IHRoaXMuaG9va3Muc3RhY2suYXBpOwogICAgdmFyIHVybCA9ICcvcC9nZW5lcmF0ZSc7CiAgICBjb25zdCByZXMgPSBhd2FpdCBhcGkuZ2V0KHVybCk7CiAgICByZXR1cm4gcmVzLmJvZHk7CiAgfQogIGFzeW5jIGNvbnRhaW5lclBvcGNvZGUoYWRkcmVzcykgewogICAgdmFyIGFwaSA9IHRoaXMuaG9va3Muc3RhY2suYXBpQ2F5bGV5OwogICAgdmFyIHVybCA9ICcvY29udGFpbmVyUG9wY29kZS8nICsgYWRkcmVzczsKICAgIGNvbnN0IHJlcyA9IGF3YWl0IGFwaS5nZXQodXJsKTsKICAgIHJldHVybiByZXMuYm9keTsKICB9CiAgYXN5bmMgYm9tUG9wY29kZXMoYWRkcmVzcykgewogICAgdmFyIGFwaSA9IHRoaXMuaG9va3Muc3RhY2suYXBpQ2F5bGV5OwogICAgdmFyIHVybCA9ICcvYm9tUG9wY29kZXMvJyArIGFkZHJlc3M7CiAgICBjb25zdCByZXMgPSBhd2FpdCBhcGkuZ2V0KHVybCk7CiAgICByZXR1cm4gcmVzLmJvZHk7CiAgfQogIGFzeW5jIHNpZ25NZXNzYWdlKGZpZWxkcyxwcml2YXRlS2V5KSB7CiAgICB2YXIgYXBpID0gdGhpcy5ob29rcy5zdGFjay5hcGk7CiAgICB2YXIgYm9keSA9IHsKICAgICAgZmllbGRzLAogICAgICBwcml2YXRlS2V5CiAgICB9OwogICAgdmFyIHVybCA9ICcvY3J5cHRvL3NpZ25NZXNzYWdlJzsKICAgIHRoaXMuZGVidWdMb2coJyoqKioqKioqKioqIHNpZ25NZXNzYWdlJyk7CiAgICB0aGlzLmRlYnVnTG9nKHtib2R5fSk7CiAgICBjb25zdCByZXMgPSBhd2FpdCBhcGkucG9zdCh1cmwsIHtib2R5fSk7CiAgICB0aGlzLmRlYnVnTG9nKHtib2R5OiByZXMuYm9keX0pOwogICAgcmV0dXJuIHJlcy5ib2R5OwogIH0KICBhc3luYyBibG9iQ3JlYXRlV2l0aFNpZyhzaWcsYWRkcmVzcyxkYXRhLHB1YmxpY0tleSkgewogICAgdmFyIGFwaSA9IHRoaXMuaG9va3Muc3RhY2suYXBpOwogICAgdmFyIGJvZHkgPSB7CiAgICAgIHNpZywKICAgICAgYWRkcmVzcywKICAgICAgcHVibGljS2V5LAogICAgICBkYXRhCiAgICB9OwogICAgdmFyIHVybCA9ICcvcC9ibG9iQ3JlYXRlV2l0aFNpZyc7CiAgICBjb25zdCByZXMgPSBhd2FpdCBhcGkucG9zdCh1cmwsIHtib2R5fSk7CiAgICByZXR1cm4gcmVzLmJvZHk7CiAgfQogIGFzeW5jIGJsb2JDcmVhdGUoYWRkcmVzcyxkYXRhLHB1YmxpY0tleSxwcml2YXRlS2V5KSB7CiAgICB2YXIgZmllbGRzID0gW107CgogICAgdmFyIHJlcyA9IGF3YWl0IHRoaXMuYmFsYW5jZShhZGRyZXNzKTsKICAgIGZpZWxkcy5wdXNoKHJlcy5iYWxhbmNlLkNvdW50ZXIpOwogICAgZmllbGRzLnB1c2goYWRkcmVzcyk7CiAgICBmaWVsZHMucHVzaChkYXRhKTsKCiAgICByZXMgPSBhd2FpdCB0aGlzLnNpZ25NZXNzYWdlKGZpZWxkcyxwcml2YXRlS2V5KTsKCiAgICByZXMgPSBhd2FpdCB0aGlzLmJsb2JDcmVhdGVXaXRoU2lnKHJlcy5zaWcsYWRkcmVzcyxkYXRhLHB1YmxpY0tleSk7CgogICAgcmV0dXJuIHJlczsKICB9CiAgYXN5bmMgbWludChzaWcsYWRkcmVzcyxkYXRhLHB1YmxpY0tleSxhbW91bnQsdW5pdCkgewogICAgdmFyIGFwaSA9IHRoaXMuaG9va3Muc3RhY2suYXBpOwogICAgdmFyIGJvZHkgPSB7CiAgICAgIHNpZywKICAgICAgYWRkcmVzcywKICAgICAgcHVibGljS2V5LAogICAgICBhbW91bnQsCiAgICAgIHVuaXQsCiAgICAgIGRhdGEKICAgIH07CiAgICB0aGlzLmRlYnVnTG9nKCcqKioqKioqKioqKiBkbyBtaW50Jyk7CiAgICB0aGlzLmRlYnVnTG9nKHtib2R5fSk7CiAgICB0aGlzLmRlYnVnTG9nKHthcGl9KTsKICAgIHRoaXMuZGVidWdTaXplKGJvZHkpOwogICAgdmFyIHVybCA9ICcvcC9taW50JzsKICAgIGNvbnN0IHJlcyA9IGF3YWl0IGFwaS5wb3N0KHVybCwge2JvZHl9KTsKICAgIHRoaXMuZGVidWdMb2coJyoqKioqKioqKioqIG1pbnQgcmVzdWx0Jyk7CiAgICB0aGlzLmRlYnVnTG9nKHJlcyk7CiAgICByZXR1cm4gcmVzOwogIH0KICBhc3luYyBzaWduQW5kTWludChhZGRyZXNzLGRhdGEscHVibGljS2V5LGFtb3VudCx1bml0LHByaXZhdGVLZXkpIHsKICAgIHRoaXMuZGVidWdMb2coJ3NpZ25BbmRNaW50Jyk7CiAgICB0aGlzLmRlYnVnTG9nKHthZGRyZXNzLGRhdGEscHVibGljS2V5LGFtb3VudCx1bml0LHByaXZhdGVLZXl9KTsKICAgIHZhciBmaWVsZHMgPSBbXTsKICAgIHZhciB7IGJhbGFuY2UgfSA9IGF3YWl0IHRoaXMuYmFsYW5jZShhZGRyZXNzKTsKICAgIC8vIHRoaXMuZGVidWdMb2coJyMjIyMjIyMjIyMjIyMjIyMgYmFsYW5jZS5Db3VudGVyOiAnICsgYmFsYW5jZS5Db3VudGVyKTsKICAgIGZpZWxkcy5wdXNoKGJhbGFuY2UuQ291bnRlcik7CiAgICBmaWVsZHMucHVzaChhZGRyZXNzKTsKICAgIGZpZWxkcy5wdXNoKGFtb3VudCk7CiAgICBmaWVsZHMucHVzaCh1bml0KTsKICAgIGZpZWxkcy5wdXNoKGRhdGEpOwoKICAgIHZhciB7IHNpZyB9ID0gYXdhaXQgdGhpcy5zaWduTWVzc2FnZShmaWVsZHMscHJpdmF0ZUtleSk7CgogICAgdmFyIHJlcyA9IGF3YWl0IHRoaXMubWludChzaWcsYWRkcmVzcyxkYXRhLHB1YmxpY0tleSxhbW91bnQsdW5pdCk7CgogICAgcmV0dXJuIHJlczsKICB9CiAgYXN5bmMgd2l0aGRyYXcoc2lnLHByaXZhdGVLZXksZGVzdEFkZHJlc3MsZGVzdEFtb3VudCxkYXRhLHNvdXJjZU91dHB1dCkgewogICAgdmFyIGFwaSA9IHRoaXMuaG9va3Muc3RhY2suYXBpOwogICAgdmFyIGJvZHkgPSB7CiAgICAgIHNpZywKICAgICAgcHJpdmF0ZUtleSwKICAgICAgZGVzdEFkZHJlc3MsCiAgICAgIGRlc3RBbW91bnQsCiAgICAgIGRhdGEsCiAgICAgIHNvdXJjZU91dHB1dAogICAgfTsKICAgIHRoaXMuZGVidWdMb2coJyoqKioqKioqKioqIHdpdGhkcmF3Jyk7CiAgICB0aGlzLmRlYnVnTG9nKHtib2R5fSk7CiAgICB2YXIgdXJsID0gJy9wL3dpdGhkcmF3JzsKICAgIGNvbnN0IHJlcyA9IGF3YWl0IGFwaS5wb3N0KHVybCwge2JvZHl9KTsKICAgIHJldHVybiByZXM7CiAgfQogIGFzeW5jIHNpZ25BbmRXaXRoZHJhdyhwcml2YXRlS2V5LHNvdXJjZUFkZHJlc3MsZGVzdEFkZHJlc3MsZGVzdEFtb3VudCxkYXRhLHNvdXJjZU91dHB1dCkgewogICAgdGhpcy5kZWJ1Z0xvZygnc2lnbkFuZFdpdGhkcmF3Jyk7CiAgICB0aGlzLmRlYnVnTG9nKHtwcml2YXRlS2V5LHNvdXJjZUFkZHJlc3MsZGVzdEFkZHJlc3MsZGVzdEFtb3VudCxkYXRhLHNvdXJjZU91dHB1dH0pOwogICAgdmFyIGZpZWxkcyA9IFtdOwogICAgdmFyIHsgYmFsYW5jZSB9ID0gYXdhaXQgdGhpcy5iYWxhbmNlKHNvdXJjZUFkZHJlc3MpOwogICAgLy8gdGhpcy5kZWJ1Z0xvZygnIyMjIyMjIyMjIyMjIyMjIyBiYWxhbmNlLkNvdW50ZXI6ICcgKyBiYWxhbmNlLkNvdW50ZXIpOwogICAgZmllbGRzLnB1c2goYmFsYW5jZS5Db3VudGVyKTsKICAgIGZpZWxkcy5wdXNoKGRlc3RBZGRyZXNzKTsKICAgIGZpZWxkcy5wdXNoKGRhdGEpOwogICAgZmllbGRzLnB1c2goc291cmNlT3V0cHV0KTsKICAgIGZpZWxkcy5wdXNoKGRlc3RBbW91bnQpOwoKICAgIHZhciB7IHNpZyB9ID0gYXdhaXQgdGhpcy5zaWduTWVzc2FnZShmaWVsZHMscHJpdmF0ZUtleSk7CgogICAgdmFyIHJlcyA9IGF3YWl0IHRoaXMud2l0aGRyYXcoc2lnLHByaXZhdGVLZXksZGVzdEFkZHJlc3MsZGVzdEFtb3VudCxkYXRhLHNvdXJjZU91dHB1dCk7CgogICAgcmV0dXJuIHJlczsKICB9CiAgYXN5bmMgYm9tVXBkYXRlV2l0aFNpZyhzaWcsYWRkcmVzcyxwdWJsaWNLZXksYm9tT3AsYm9tQWRkcmVzcykgewogICAgdmFyIGFwaSA9IHRoaXMuaG9va3Muc3RhY2suYXBpOwogICAgdmFyIGJvZHkgPSB7CiAgICAgIHNpZywKICAgICAgYWRkcmVzcywKICAgICAgcHVibGljS2V5LAogICAgICBib21PcCwKICAgICAgYm9tQWRkcmVzcwogICAgfTsKICAgIHRoaXMuZGVidWdMb2coJyoqKioqKioqKioqIGRvIGJvbVVwZGF0ZScpOwogICAgdGhpcy5kZWJ1Z0xvZyh7Ym9keX0pOwogICAgdGhpcy5kZWJ1Z0xvZyh7YXBpfSk7CiAgICB0aGlzLmRlYnVnU2l6ZShib2R5KTsKICAgIHZhciB1cmwgPSAnL3AvYm9tVXBkYXRlV2l0aFNpZyc7CiAgICBjb25zdCByZXMgPSBhd2FpdCBhcGkucG9zdCh1cmwsIHtib2R5fSk7CiAgICB0aGlzLmRlYnVnTG9nKCcqKioqKioqKioqKiBib21VcGRhdGUgcmVzdWx0Jyk7CiAgICB0aGlzLmRlYnVnTG9nKHJlcyk7CiAgICByZXR1cm4gcmVzOwogIH0KICBhc3luYyBzaWduQW5kVXBkYXRlQm9tKGFkZHJlc3MscHVibGljS2V5LGJvbU9wLGJvbUFkZHJlc3MscHJpdmF0ZUtleSkgewogICAgdGhpcy5kZWJ1Z0xvZygnc2lnbkFuZFVwZGF0ZUJvbScpOwogICAgdGhpcy5kZWJ1Z0xvZyh7YWRkcmVzcyxwdWJsaWNLZXksYm9tT3AsYm9tQWRkcmVzcyxwcml2YXRlS2V5fSk7CiAgICB2YXIgZmllbGRzID0gW107CiAgICB2YXIgeyBiYWxhbmNlIH0gPSBhd2FpdCB0aGlzLmJhbGFuY2UoYWRkcmVzcyk7CiAgICAvLyB0aGlzLmRlYnVnTG9nKCcjIyMjIyMjIyMjIyMjIyMjIGJhbGFuY2UuQ291bnRlcjogJyArIGJhbGFuY2UuQ291bnRlcik7CiAgICBmaWVsZHMucHVzaChiYWxhbmNlLkNvdW50ZXIpOwogICAgZmllbGRzLnB1c2goYWRkcmVzcyk7CiAgICBmaWVsZHMucHVzaChib21PcCk7CiAgICBmaWVsZHMucHVzaChib21BZGRyZXNzKTsKCiAgICB2YXIgeyBzaWcgfSA9IGF3YWl0IHRoaXMuc2lnbk1lc3NhZ2UoZmllbGRzLHByaXZhdGVLZXkpOwoKICAgIHZhciByZXMgPSBhd2FpdCB0aGlzLmJvbVVwZGF0ZVdpdGhTaWcoc2lnLGFkZHJlc3MscHVibGljS2V5LGJvbU9wLGJvbUFkZHJlc3MpOwoKICAgIHJldHVybiByZXM7CiAgfQp9Owo=", "base64_Y2xhc3MgU21hcnRDb250cmFjdCBleHRlbmRzIFNtYXJ0Q29udHJhY3RCYXNlIHsKICBjb25zdHJ1Y3Rvcihob29rcykgewogICAgICBzdXBlcihob29rcykKICAgICAgdGhpcy5kZWJ1Z0xvZygnKioqKioqKioqKioqKiogU21hcnRDb250cmFjdCcpOwogIH0KCiAgYXN5bmMgZWNobygpIHsKICAgICAgdGhpcy5kZWJ1Z0xvZygnZWNobycpOwogICAgICB2YXIgcnZhbCA9IHsKICAgICAgICAgIGRhdGE6ICdoZWxsbycKICAgICAgfTsKICAgICAgdGhpcy5ob29rcy5maW5pc2gucmVzb2x2ZShydmFsKTsKICB9CgogIGFzeW5jIHdpbmVtYWtlck1pbnRPaygpIHsgCiAgICB0aGlzLmRlYnVnTG9nKCdleGVjdXRlIHdpbmVtYWtlck1pbnRPaycpOwogICAgICB2YXIgXyA9IHRoaXMuaG9va3MuXzsKICAgICAgdmFyIHNzID0gdGhpcy5ob29rcy5zY3JlZW5TdGF0ZTsKICAgICAgdmFyIGFwcCA9IHRoaXMuaG9va3MuYXBwOwogICAgICB2YXIgdXNlckNyZWRlbnRpYWxzID0gYXBwLmdldEFwcFN0YXRlKCd1c2VyQ3JlZGVudGlhbHMnKTsKICAgICAgdmFyIHB1YmxpY0tleSA9IHVzZXJDcmVkZW50aWFscy5wdWJsaWNLZXk7CiAgICAgIHZhciBwcml2YXRlS2V5ID0gdXNlckNyZWRlbnRpYWxzLnByaXZhdGVLZXk7CiAgICAgIHZhciB3b3JrZmxvdyA9IHNzLndvcmtmbG93OwogICAgICB2YXIgbmV3SWQgPSB0aGlzLmhvb2tzLnNob3J0aWQuZ2VuZXJhdGUoKTsKICAgICAgdmFyIHBvcGNvZGVOYW1lID0gJ1dpbmVfJyArIG5ld0lkOwogICAgICB2YXIgeyBmb3JtIH0gPSB0aGlzLnN0YXRlOwogICAgICB0aGlzLmRlYnVnTG9nKGZvcm0pOwogICAgICB2YXIgeyBwb3Bjb2RlIH0gPSBhd2FpdCB0aGlzLmdlbmVyYXRlKCk7CiAgICAgIHZhciB7IGFkZHJlc3MgfSA9IHBvcGNvZGU7CiAgICAgIHZhciBuZXh0U3BvdCA9ICd0cnVja2VyLnBpY2t1cCc7CiAgICAgIHZhciBhbW91bnQgPSB0aGlzLnRvSW50ZWdlcihmb3JtLm1pbnRXaW5lQm90dGxlcy5BbW91bnQpOwogICAgICB2YXIgdW5pdCA9IGZvcm0ubWludFdpbmVCb3R0bGVzLlVuaXQ7CiAgICAgIHRoaXMuZGVidWdMb2coJyMjIyMjIyMjIyMjIyMlJSUlJSUlJSUlJSUlJCQkJCQkJCQkJCQkJCQgIGdlbmVyYXRlZCB3aW5lbWFrZXIgcG9wY29kZTonKTsKICAgICAgdGhpcy5kZWJ1Z0xvZyh7cG9wY29kZU5hbWUscG9wY29kZX0pOwogICAgICAKICAgICAgdmFyIGRhdGEgPQogICAgICAgICAgewogICAgICAgICAgICAiYXBwRGF0YSI6IHsKICAgICAgICAgICAgICAid29ya2Zsb3dEYXRhIjogZm9ybSwKICAgICAgICAgICAgICAid2luZUJvdHRsZXMiOiBhbW91bnQsCiAgICAgICAgICAgICAgIndpbmVVbml0IjogdW5pdCwKICAgICAgICAgICAgICAic3BvdCI6IG5leHRTcG90LAogICAgICAgICAgICAgICJ3b3JrZmxvd05hbWUiOiBzcy53b3JrZmxvdy5uYW1lLAogICAgICAgICAgICAgICJ3b3JrZmxvd0luc3RhbmNlSWQiOiBuZXdJZCwKICAgICAgICAgICAgICAid29ya2Zsb3dSb290UG9wY29kZSI6ICJ0cnVlIiwKICAgICAgICAgICAgICBwb3Bjb2RlTmFtZSAsCiAgICAgICAgICAgICAgIndvcmtmbG93RGVmIjogd29ya2Zsb3cKICAgICAgICAgICAgfQogICAgICAgICAgfTsKCiAgICAgIHRoaXMuZGVidWdMb2coZGF0YSk7CgogICAgICB2YXIgcmVzID0gYXdhaXQgdGhpcy5zaWduQW5kTWludChhZGRyZXNzLGRhdGEscHVibGljS2V5LGFtb3VudCx1bml0LHByaXZhdGVLZXkpOwogICAgICAvLyB0aGlzLmRlYnVnTG9nKCd0aGlzLnNpZ25BbmRNaW50IHJlcy5ib2R5LmtleXM6ICcgKyBPYmplY3Qua2V5cyhyZXMuYm9keSkpOwoKICAgICAgdmFyIHJ2YWwgPSB7CiAgICAgICAgICBhY3Rpb246IFtdCiAgICAgIH07CiAgICAgIHRoaXMuaG9va3MuZmluaXNoLnJlc29sdmUocnZhbCk7CiAgICAgIHJldHVybiBhZGRyZXNzOwogICAgCiAgfQogIHRvSW50ZWdlcih2YWx1ZSkgewogICAgdmFyIF8gPSB0aGlzLmhvb2tzLl87CiAgICBpZihfLmlzU3RyaW5nKHZhbHVlKSkKICAgICAgcmV0dXJuIHBhcnNlSW50KHZhbHVlKTsKICAgIGVsc2UKICAgICAgcmV0dXJuIHZhbHVlOwogIH0KICBhc3luYyB0cnVja2VyUGlja3VwT2soKSB7IAogICAgdGhpcy5kZWJ1Z0xvZygnZXhlY3V0ZSB0cnVja2VyUGlja3VwT2snKTsKICAgIHZhciBmb3JtID0gdGhpcy5zdGF0ZS5mb3JtOwogICAgdGhpcy5kZWJ1Z0xvZyh7Zm9ybX0pOwogICAgCiAgICB2YXIgcnZhbCA9IHsKICAgICAgICBhY3Rpb246IFtdCiAgICB9OwoKICAgIHZhciBfID0gdGhpcy5ob29rcy5fOwogICAgdmFyIHNzID0gdGhpcy5ob29rcy5zY3JlZW5TdGF0ZTsKICAgIHZhciBhcHAgPSB0aGlzLmhvb2tzLmFwcDsKICAgIHZhciB3b3JrZmxvdyA9IHNzLndvcmtmbG93OwogICAgCiAgICB2YXIgdXNlckNyZWRlbnRpYWxzID0gYXBwLmdldEFwcFN0YXRlKCd1c2VyQ3JlZGVudGlhbHMnKTsKICAgIHZhciB1c2VyUHVibGljS2V5ID0gdXNlckNyZWRlbnRpYWxzLnB1YmxpY0tleTsKICAgIHZhciB1c2VyUHJpdmF0ZUtleSA9IHVzZXJDcmVkZW50aWFscy5wcml2YXRlS2V5OwogICAgCiAgICB2YXIgc3JjUG9wY29kZSA9IHRoaXMuc3RhdGUucG9wY29kZTsKICAgIAoKICAgIHZhciBkZXN0QW1vdW50ID0gdGhpcy50b0ludGVnZXIodGhpcy5zdGF0ZS5mb3JtLndpdGhkcmF3LnBpY2t1cEFtb3VudCk7CiAgICB2YXIgZGVzdE5hbWUgPSAiVHJ1Y2tfIiArIHVzZXJDcmVkZW50aWFscy5zZXNzaW9uSWQ7CiAgICAKICAgIHZhciBkYXRhID0geyBkZXNjcmlwdGlvbjogYHdpdGhkcmF3ICR7ZGVzdEFtb3VudH0gYm90dGxlcyBvZiB3aW5lYCB9OwogICAgdmFyIHNvdXJjZU91dHB1dCA9IDA7CiAgICAKICAgIHRoaXMuZGVidWdMb2coJ2dldCB0cnVjayBwb3Bjb2RlOiAnICsgZGVzdE5hbWUpOwogICAgdmFyIHRydWNrUG9wY29kZSA9IGF3YWl0IHRoaXMub25lQnlOYW1lKGRlc3ROYW1lKTsKICAgIHRoaXMuZGVidWdMb2codHJ1Y2tQb3Bjb2RlKTsKICAgICAKICAgIHRoaXMuZGVidWdMb2coJ2NoZWNrIHNvdXJjZSB3aW5lIGJvdHRsZSBjb3VudCcpOwogICAgdmFyIHdpbmVCb3R0bGVzID0gdGhpcy50b0ludGVnZXIoc3JjUG9wY29kZS5hcHBEYXRhLndpbmVCb3R0bGVzKTsKICAgIHZhciB3aW5lVW5pdCA9IHNyY1BvcGNvZGUuYXBwRGF0YS53aW5lVW5pdDsKICAgIHRoaXMuZGVidWdMb2coe3NyY1BvcGNvZGV9KTsKICAgIHRoaXMuZGVidWdMb2coe3dpbmVCb3R0bGVzLGRlc3RBbW91bnQsd2luZVVuaXR9KTsKICAgIAogICAgaWYoXy5pc05pbChkZXN0QW1vdW50KSB8fCBfLmlzTmFOKGRlc3RBbW91bnQpKSB7CiAgICAgIHRoaXMuZGVidWdMb2coJyoqKioqKioqKioqKioqKioqKiBlcnJvciBiYWQgZGVzdEFtb3VudCknKTsKICAgICAgdGhpcy5ob29rcy5maW5pc2gucmVzb2x2ZShydmFsKTsKICAgICAgcmV0dXJuIDsKICAgIH0KICAgIAogICAgaWYoXy5pc05pbCh3aW5lQm90dGxlcykgfHwgXy5pc05hTihkZXN0QW1vdW50KSkgewogICAgICB0aGlzLmRlYnVnTG9nKCcqKioqKioqKioqKioqKioqKiogZXJyb3IgYmFkIHdpbmVCb3R0bGVzJyk7CiAgICAgIHRoaXMuaG9va3MuZmluaXNoLnJlc29sdmUocnZhbCk7CiAgICAgIHJldHVybiA7CiAgICB9CiAgICAKICAgIGlmKGRlc3RBbW91bnQgPiB3aW5lQm90dGxlcykgewogICAgICB0aGlzLmRlYnVnTG9nKCcqKioqKioqKioqKioqKioqKiogZXJyb3IgZGVzdEFtb3VudCA+IHdpbmVCb3R0bGVzJyk7CiAgICAgIHRoaXMuaG9va3MuZmluaXNoLnJlc29sdmUocnZhbCk7CiAgICAgIHJldHVybiA7CiAgICB9CiAgICAgCiAgICB2YXIgdHJ1Y2tCb3R0bGVzOwogICAgaWYgKF8uaXNOaWwodHJ1Y2tQb3Bjb2RlKSkgewogICAgICB0aGlzLmRlYnVnTG9nKCdNaW50aW5nIHRydWNrIHBvcGNvZGU6ICcgKyBkZXN0TmFtZSk7CiAgICAgIHZhciB0cnVja1Nwb3QgPSAndHJ1Y2tlci5zaG93JzsKICAgICAgdmFyIG5ld0lkID0gdGhpcy5ob29rcy5zaG9ydGlkLmdlbmVyYXRlKCk7CiAgICAgIHZhciB0cnVja1N0YXJ0QW1vdW50ID0gMDsKICAgICAgdmFyIHRydWNrVW5pdCA9ICdib3R0bGVzIG9mIHdpbmUnOwogICAgICB0cnVja0JvdHRsZXMgPSAwOwogICAgICB2YXIgdHJ1Y2tEYXRhID0KICAgICAgICAgIHsKICAgICAgICAgICAgImFwcERhdGEiOiB7CiAgICAgICAgICAgICAgIndvcmtmbG93RGF0YSI6IHt9LAogICAgICAgICAgICAgICJzcG90IjogdHJ1Y2tTcG90LAogICAgICAgICAgICAgICJ3aW5lQm90dGxlcyI6IHRydWNrQm90dGxlcywKICAgICAgICAgICAgICAid2luZVVuaXQiOiB3aW5lVW5pdCwKICAgICAgICAgICAgICAid29ya2Zsb3dOYW1lIjogc3Mud29ya2Zsb3cubmFtZSwKICAgICAgICAgICAgICAid29ya2Zsb3dJbnN0YW5jZUlkIjogbmV3SWQsCiAgICAgICAgICAgICAgIndvcmtmbG93Um9vdFBvcGNvZGUiOiAidHJ1ZSIsCiAgICAgICAgICAgICAgcG9wY29kZU5hbWU6IGRlc3ROYW1lLAogICAgICAgICAgICAgICJ3b3JrZmxvd0RlZiI6IHdvcmtmbG93CiAgICAgICAgICAgIH0KICAgICAgICAgIH07CiAgICAgIHZhciBuZXdQb3Bjb2RlID0gYXdhaXQgdGhpcy5nZW5lcmF0ZSgpOwogICAgICB2YXIgdHJ1Y2tBZGRyZXNzID0gbmV3UG9wY29kZS5wb3Bjb2RlLmFkZHJlc3M7CiAgICAgIAogICAgICB2YXIgcmVzID0gYXdhaXQgdGhpcy5zaWduQW5kTWludCh0cnVja0FkZHJlc3MsdHJ1Y2tEYXRhLHVzZXJQdWJsaWNLZXksdHJ1Y2tTdGFydEFtb3VudCx0cnVja1VuaXQsdXNlclByaXZhdGVLZXkpOwogICAgICAKICAgICAgdHJ1Y2tQb3Bjb2RlID0gYXdhaXQgdGhpcy5vbmVCeU5hbWUoZGVzdE5hbWUpOwogICAgfQogICAgZWxzZSB7CiAgICAgIHRoaXMuZGVidWdMb2coJ0ZvdW5kIGV4aXN0aW5nIHRydWNrIHBvcGNvZGU6ICcgKyBkZXN0TmFtZSk7CiAgICAgIHRydWNrQm90dGxlcyA9IHRydWNrUG9wY29kZS5hcHBEYXRhLndpbmVCb3R0bGVzOwogICAgfQogICAgCiAgICBpZihfLmlzTmlsKHRydWNrUG9wY29kZSkpIHsKICAgICAgdGhpcy5kZWJ1Z0xvZygnKioqKioqKioqKioqKioqKioqIEVycm9yIG1pbnRpbmcgdHJ1Y2sgcG9wY29kZScpOwogICAgICB0aGlzLmhvb2tzLmZpbmlzaC5yZXNvbHZlKHJ2YWwpOwogICAgICByZXR1cm4gOwogICAgfQogICAgCiAgICB0aGlzLmRlYnVnTG9nKCcjIyMjIyMjIyMjIyMjIyMjIHRydWNrIHBvcGNvZGU6Jyk7CiAgICB0aGlzLmRlYnVnTG9nKHRydWNrUG9wY29kZSk7CiAgICAKICAgIHZhciB3cmVzID0gYXdhaXQgdGhpcy5zaWduQW5kV2l0aGRyYXcoCiAgICAgIHNyY1BvcGNvZGUucHJpdmF0ZUtleSwKICAgICAgc3JjUG9wY29kZS5hZGRyZXNzLAogICAgICB0cnVja1BvcGNvZGUuYWRkcmVzcywKICAgICAgZGVzdEFtb3VudCwKICAgICAgZGF0YSwKICAgICAgc291cmNlT3V0cHV0CiAgICApOwogICAgCiAgICB0aGlzLmRlYnVnTG9nKCcjIyMjIyMjIyMjIyMjIyMjIHdpdGhkcmF3IHJlc3VsdDonKTsKICAgIHRoaXMuZGVidWdMb2cod3Jlcyk7CiAgICBydmFsLndyZXMgPSB3cmVzOwogICAgCiAgICB0aGlzLmRlYnVnTG9nKCcjIyMjIyMjIyMjIyMjIyMjIHVwZGF0ZSBzb3VyY2Ugd2luZSBib3R0bGUgY291bnQ6Jyk7CiAgICB2YXIgd2luZUNvdW50ID0gd2luZUJvdHRsZXMgLSBkZXN0QW1vdW50OwogICAgdmFyIHdpbmVEYXRhID0KICAgICAgICB7CiAgICAgICAgICAiYXBwRGF0YSI6IHsKICAgICAgICAgICAgIndpbmVCb3R0bGVzIjogd2luZUNvdW50CiAgICAgICAgICB9CiAgICAgICAgfTsKCiAgICB0aGlzLmRlYnVnTG9nKHdpbmVEYXRhKTsKICAgIHZhciBicmVzID0gYXdhaXQgdGhpcy5ibG9iQ3JlYXRlKAogICAgICBzcmNQb3Bjb2RlLmFkZHJlc3MsCiAgICAgIHdpbmVEYXRhLAogICAgICB1c2VyQ3JlZGVudGlhbHMucHVibGljS2V5LAogICAgICB1c2VyQ3JlZGVudGlhbHMucHJpdmF0ZUtleSk7CiAgICAgIAogICAgdGhpcy5kZWJ1Z0xvZygnIyMjIyMjIyMjIyMjIyMjIyBibG9iQ3JlYXRlIHJlc3VsdDonKTsKICAgIHRoaXMuZGVidWdMb2coYnJlcyk7CiAgICBydmFsLmJyZXMgPSBicmVzOwogICAgCiAgICB0aGlzLmRlYnVnTG9nKCcjIyMjIyMjIyMjIyMjIyMjIHVwZGF0ZSB0cnVjayB3aW5lIGJvdHRsZSBjb3VudDonKTsKICAgIHZhciB0cnVja0NvdW50ID0gdHJ1Y2tCb3R0bGVzICsgZGVzdEFtb3VudDsKICAgIHZhciB0cnVja1dpbmVEYXRhID0KICAgICAgICB7CiAgICAgICAgICAiYXBwRGF0YSI6IHsKICAgICAgICAgICAgIndpbmVCb3R0bGVzIjogdHJ1Y2tDb3VudAogICAgICAgICAgfQogICAgICAgIH07CgogICAgdGhpcy5kZWJ1Z0xvZyh0cnVja1dpbmVEYXRhKTsKICAgIHZhciBicmVzMiA9IGF3YWl0IHRoaXMuYmxvYkNyZWF0ZSgKICAgICAgdHJ1Y2tQb3Bjb2RlLmFkZHJlc3MsCiAgICAgIHRydWNrV2luZURhdGEsCiAgICAgIHVzZXJDcmVkZW50aWFscy5wdWJsaWNLZXksCiAgICAgIHVzZXJDcmVkZW50aWFscy5wcml2YXRlS2V5KTsKICAgICAgCiAgICB0aGlzLmRlYnVnTG9nKCcjIyMjIyMjIyMjIyMjIyMjIHRydWNrIGJsb2JDcmVhdGUgcmVzdWx0OicpOwogICAgdGhpcy5kZWJ1Z0xvZyhicmVzMik7CiAgICBydmFsLmJyZXMyID0gYnJlczI7CiAgICAKICAgIHRoaXMuaG9va3MuZmluaXNoLnJlc29sdmUocnZhbCk7CiAgIH0KCn07Cg=="]
                            }
                        }
                    }
                }
            },
            "type": "transaction",
            "sourceCounter": "gf/ryS1EIscoGwSpBK3qwbqtSIlVWD05zlgZm6vZFWA=",
            "amount": "1000",
            "workflowDef": {
                "title": "Wine V1",
                "name": "wineV1",
                "startScreen": "Home",
                "version": "2.0",
                "steps": {
                    "winemaker.mint": {
                        "step": "winemaker.mint",
                        "title": "Winemaker Mint",
                        "screen": "WinemakerMint"
                    },
                    "trucker.pickup": {"step": "trucker.pickup", "title": "Trucker Pickup", "screen": "TruckerPickup"},
                    "trucker.show": {"step": "trucker.show", "title": "Trucker Show", "screen": "TruckerShow"}
                },
                "appOptions": {"requireLogin": true},
                "screens": {
                    "Home": {
                        "name": "Home",
                        "title": "Home",
                        "api": "/api/mobile",
                        "screenListItems": {
                            "fetchItems": "/popcodeByWorkflowName",
                            "method": "get",
                            "api": "cayley",
                            "fetchParameters": {"workflowName": "wineV1"},
                            "itemDataTypes": {"popcode": "object"},
                            "itemLabel": ["popcodeName"],
                            "itemActions": {
                                "click": {
                                    "title": "Click",
                                    "action": [{
                                        "operation": "startWorkflow",
                                        "replaceCurrent": true,
                                        "parameters": {"spot": "@popcode.spot", "popcode": "@popcode"}
                                    }],
                                    "parameters": {"popcode": "@item"}
                                }
                            }
                        },
                        "screenButtons": {
                            "scan": {
                                "title": "Scan",
                                "action": [{"operation": "navigate", "screen": "Scan"}],
                                "roles": ["admin", "winemaker", "trucker"]
                            },
                            "mint": {
                                "title": "Mint",
                                "action": [{"operation": "navigate", "resetStack": true, "screen": "WinemakerMint"}],
                                "roles": ["admin", "winemaker"]
                            }
                        }
                    },
                    "Scan": {
                        "name": "Scan",
                        "title": "Scan",
                        "api": "/api/mobile",
                        "parameters": {"user": "@user"},
                        "modal": false,
                        "screenScan": {},
                        "startAction": [{
                            "operation": "scanBarcode",
                            "barcodeTypes": ["qr", "code128"],
                            "outputs": {"scanData": "@scanData"}
                        }, {
                            "operation": "routePopcode",
                            "parameters": {"scanData": "@scanData"},
                            "outputs": {"address": "@address"}
                        }, {
                            "operation": "fetch",
                            "route": "/p",
                            "method": "get",
                            "parameters": {"address": "@address"},
                            "outputs": {"popcode": "@popcodes[0]"}
                        }, {
                            "operation": "startWorkflow",
                            "replaceCurrent": true,
                            "parameters": {"spot": "@popcode.spot", "popcode": "@popcode"}
                        }]
                    },
                    "WinemakerMint": {
                        "name": "WinemakerMint",
                        "title": "Winemaker Mint",
                        "api": "/api/mobile",
                        "parameters": {"container": "@container", "popcode": "@popcode", "user": "@user"},
                        "outputs": {"popcode": "@container"},
                        "screenForm": {
                            "fields": {
                                "type": "object",
                                "properties": {
                                    "mintWineBottles": {
                                        "type": "object",
                                        "properties": {
                                            "Amount": {
                                                "type": "string",
                                                "value": "1000",
                                                "options": {"editable": true}
                                            },
                                            "Unit": {
                                                "type": "string",
                                                "value": "bottles of wine",
                                                "options": {"editable": true}
                                            }
                                        },
                                        "required": ["Amount", "Unit"]
                                    }
                                },
                                "required": ["mintWineBottles"]
                            }, "options": {"auto": "labels"}
                        },
                        "screenButtons": {
                            "mint": {
                                "title": "Mint",
                                "action": [{
                                    "operation": "contract",
                                    "contract": "winemakerMintOk",
                                    "parameters": {"popcode": "@popcode"},
                                    "outputs": {"status": "@status", "txId": "@txId"}
                                }, {
                                    "operation": "navigate",
                                    "resetStack": true,
                                    "forceUpdate": true,
                                    "screen": "Home"
                                }],
                                "roles": ["admin", "winemaker"]
                            },
                            "cancel": {
                                "title": "Cancel",
                                "action": [{"operation": "navigate", "resetStack": true, "screen": "Home"}]
                            }
                        }
                    },
                    "TruckerPickup": {
                        "name": "TruckerPickup",
                        "title": "Trucker Wine Pickup",
                        "api": "/api/mobile",
                        "parameters": {"container": "@container", "popcode": "@popcode", "user": "@user"},
                        "outputs": {"popcode": "@container"},
                        "tabs": {
                            "tab1": {
                                "title": "Pickup Wine",
                                "screenForm": {
                                    "privateKey": ["winemaker", "admin"],
                                    "publicKey": ["winemaker", "trucker", "admin"],
                                    "fields": {
                                        "type": "object",
                                        "properties": {
                                            "popcode": {
                                                "type": "object",
                                                "properties": {
                                                    "name": {
                                                        "type": "string",
                                                        "value": "@popcode.popcodeName",
                                                        "options": {"editable": false}
                                                    },
                                                    "address": {
                                                        "type": "string",
                                                        "value": "@popcode.address",
                                                        "options": {"editable": false}
                                                    },
                                                    "currentState": {
                                                        "type": "string",
                                                        "value": "@popcode.spot",
                                                        "options": {"editable": false}
                                                    }
                                                },
                                                "required": ["name", "address", "currentState"]
                                            },
                                            "warehouseContents": {
                                                "type": "object",
                                                "properties": {
                                                    "Amount": {
                                                        "type": "number",
                                                        "value": "@popcode.appData.wineBottles",
                                                        "options": {"editable": false}
                                                    },
                                                    "Unit": {
                                                        "type": "string",
                                                        "value": "@popcode.appData.wineUnit",
                                                        "options": {"editable": false}
                                                    }
                                                }
                                            },
                                            "withdraw": {
                                                "type": "object",
                                                "properties": {
                                                    "pickupAmount": {
                                                        "type": "number",
                                                        "options": {"editable": true}
                                                    }
                                                },
                                                "required": ["pickupAmount"]
                                            }
                                        },
                                        "required": ["withdraw"]
                                    },
                                    "options": {"auto": "labels"}
                                }
                            }, "tab2": {"title": "Popcode Graph", "graphView": {"visName": "wine"}}
                        },
                        "screenButtons": {
                            "pickup": {
                                "title": "Pickup",
                                "action": [{
                                    "operation": "contract",
                                    "contract": "truckerPickupOk",
                                    "parameters": {"popcode": "@popcode"},
                                    "outputs": {"status": "@status", "txId": "@txId"}
                                }, {
                                    "operation": "navigate",
                                    "resetStack": true,
                                    "forceUpdate": true,
                                    "screen": "Home"
                                }],
                                "roles": ["admin", "trucker"]
                            },
                            "cancel": {
                                "title": "Cancel",
                                "action": [{"operation": "navigate", "resetStack": true, "screen": "Home"}]
                            }
                        }
                    },
                    "TruckerShow": {
                        "name": "TruckerShow",
                        "title": "Truck Popcode",
                        "api": "/api/mobile",
                        "parameters": {"container": "@container", "popcode": "@popcode", "user": "@user"},
                        "outputs": {"popcode": "@container"},
                        "tabs": {
                            "tab1": {
                                "title": "Truck Contents",
                                "screenForm": {
                                    "privateKey": ["trucker", "admin"],
                                    "publicKey": ["winemaker", "trucker", "admin"],
                                    "fields": {
                                        "type": "object",
                                        "properties": {
                                            "popcode": {
                                                "type": "object",
                                                "properties": {
                                                    "name": {
                                                        "type": "string",
                                                        "value": "@popcode.popcodeName",
                                                        "options": {"editable": false}
                                                    },
                                                    "address": {
                                                        "type": "string",
                                                        "value": "@popcode.address",
                                                        "options": {"editable": false}
                                                    },
                                                    "currentState": {
                                                        "type": "string",
                                                        "value": "@popcode.spot",
                                                        "options": {"editable": false}
                                                    }
                                                },
                                                "required": ["name", "address", "currentState"]
                                            },
                                            "truckContents": {
                                                "type": "object",
                                                "properties": {
                                                    "Amount": {
                                                        "type": "number",
                                                        "value": "@popcode.appData.wineBottles",
                                                        "options": {"editable": false}
                                                    },
                                                    "Unit": {
                                                        "type": "string",
                                                        "value": "@popcode.appData.wineUnit",
                                                        "options": {"editable": false}
                                                    }
                                                }
                                            }
                                        }
                                    },
                                    "options": {"auto": "labels"}
                                }
                            }, "tab2": {"title": "Popcode Graph", "graphView": {"visName": "wine"}}
                        },
                        "screenButtons": {
                            "ok": {
                                "title": "Ok",
                                "action": [{"operation": "navigate", "resetStack": true, "screen": "Home"}]
                            }
                        }
                    }
                },
                "contractLib": {
                    "name": "Wine SmartContract Library",
                    "version": "1.0",
                    "slug": "wine_1_0",
                    "libs": ["base64_Y2xhc3MgU21hcnRDb250cmFjdEJhc2UgewogIGNvbnN0cnVjdG9yKGhvb2tzKSB7CiAgICAgIHRoaXMuaG9va3MgPSBob29rczsKICAgICAgdGhpcy5zdGF0ZSA9IGhvb2tzLnN0YXRlOwogICAgICB0aGlzLmRlYnVnTG9nID0gaG9va3MuZGVidWdMb2c7CiAgICAgIHRoaXMuZGVidWdMb2coJ2NvbnN0cnVjdCBTbWFydENvbnRyYWN0QmFzZScpOwogIH0KICBkZWJ1Z1NpemUobykgewogICAgdmFyIHMgPSBKU09OLnN0cmluZ2lmeShvKTsKICAgIHRoaXMuZGVidWdMb2coYHNpemU6ICR7cy5sZW5ndGgvMTAyNH0ga2ApOwogIH0KICBhc3luYyBieU5hbWUocE5hbWUpIHsKICAgIHZhciBhcGkgPSB0aGlzLmhvb2tzLnN0YWNrLmFwaTsKICAgIHZhciB1cmwgPSAnL3AvbmFtZS8nICsgcE5hbWU7CiAgICBjb25zdCByZXMgPSBhd2FpdCBhcGkuZ2V0KHVybCk7CiAgICByZXR1cm4gcmVzLmJvZHk7CiAgfQogIGFzeW5jIG9uZUJ5TmFtZShwTmFtZSkgewogICAgdmFyIF8gPSB0aGlzLmhvb2tzLl87CiAgICB2YXIgYXBpID0gdGhpcy5ob29rcy5zdGFjay5hcGk7CiAgICB2YXIgdXJsID0gJy9wL25hbWUvJyArIHBOYW1lOwogICAgY29uc3QgcmVzID0gYXdhaXQgYXBpLmdldCh1cmwpOwogICAgdmFyIHBvcGNvZGVzID0gIV8uaXNOaWwocmVzKQogICAgICYmICFfLmlzTmlsKHJlcy5ib2R5KQogICAgICYmICFfLmlzTmlsKHJlcy5ib2R5LnBvcGNvZGVzKSA/IHJlcy5ib2R5LnBvcGNvZGVzIDogbnVsbDsKICAgIHZhciBwb3Bjb2RlID0gXy5pc0FycmF5KHBvcGNvZGVzKSAmJiBwb3Bjb2Rlcy5sZW5ndGggPiAwCiAgICAgPyBwb3Bjb2Rlc1swXSA6IG51bGw7CiAgICByZXR1cm4gcG9wY29kZTsKICB9CiAgYXN5bmMgYmFsYW5jZShhZGRyZXNzKSB7CiAgICB2YXIgYXBpID0gdGhpcy5ob29rcy5zdGFjay5hcGk7CiAgICB2YXIgdXJsID0gJy9wL2JhbGFuY2UvJyArIGFkZHJlc3M7CiAgICBjb25zdCByZXMgPSBhd2FpdCBhcGkuZ2V0KHVybCk7CiAgICByZXR1cm4gcmVzLmJvZHk7CiAgfQogIGFzeW5jIGdlbmVyYXRlKCkgewogICAgdmFyIGFwaSA9IHRoaXMuaG9va3Muc3RhY2suYXBpOwogICAgdmFyIHVybCA9ICcvcC9nZW5lcmF0ZSc7CiAgICBjb25zdCByZXMgPSBhd2FpdCBhcGkuZ2V0KHVybCk7CiAgICByZXR1cm4gcmVzLmJvZHk7CiAgfQogIGFzeW5jIGNvbnRhaW5lclBvcGNvZGUoYWRkcmVzcykgewogICAgdmFyIGFwaSA9IHRoaXMuaG9va3Muc3RhY2suYXBpQ2F5bGV5OwogICAgdmFyIHVybCA9ICcvY29udGFpbmVyUG9wY29kZS8nICsgYWRkcmVzczsKICAgIGNvbnN0IHJlcyA9IGF3YWl0IGFwaS5nZXQodXJsKTsKICAgIHJldHVybiByZXMuYm9keTsKICB9CiAgYXN5bmMgYm9tUG9wY29kZXMoYWRkcmVzcykgewogICAgdmFyIGFwaSA9IHRoaXMuaG9va3Muc3RhY2suYXBpQ2F5bGV5OwogICAgdmFyIHVybCA9ICcvYm9tUG9wY29kZXMvJyArIGFkZHJlc3M7CiAgICBjb25zdCByZXMgPSBhd2FpdCBhcGkuZ2V0KHVybCk7CiAgICByZXR1cm4gcmVzLmJvZHk7CiAgfQogIGFzeW5jIHNpZ25NZXNzYWdlKGZpZWxkcyxwcml2YXRlS2V5KSB7CiAgICB2YXIgYXBpID0gdGhpcy5ob29rcy5zdGFjay5hcGk7CiAgICB2YXIgYm9keSA9IHsKICAgICAgZmllbGRzLAogICAgICBwcml2YXRlS2V5CiAgICB9OwogICAgdmFyIHVybCA9ICcvY3J5cHRvL3NpZ25NZXNzYWdlJzsKICAgIHRoaXMuZGVidWdMb2coJyoqKioqKioqKioqIHNpZ25NZXNzYWdlJyk7CiAgICB0aGlzLmRlYnVnTG9nKHtib2R5fSk7CiAgICBjb25zdCByZXMgPSBhd2FpdCBhcGkucG9zdCh1cmwsIHtib2R5fSk7CiAgICB0aGlzLmRlYnVnTG9nKHtib2R5OiByZXMuYm9keX0pOwogICAgcmV0dXJuIHJlcy5ib2R5OwogIH0KICBhc3luYyBibG9iQ3JlYXRlV2l0aFNpZyhzaWcsYWRkcmVzcyxkYXRhLHB1YmxpY0tleSkgewogICAgdmFyIGFwaSA9IHRoaXMuaG9va3Muc3RhY2suYXBpOwogICAgdmFyIGJvZHkgPSB7CiAgICAgIHNpZywKICAgICAgYWRkcmVzcywKICAgICAgcHVibGljS2V5LAogICAgICBkYXRhCiAgICB9OwogICAgdmFyIHVybCA9ICcvcC9ibG9iQ3JlYXRlV2l0aFNpZyc7CiAgICBjb25zdCByZXMgPSBhd2FpdCBhcGkucG9zdCh1cmwsIHtib2R5fSk7CiAgICByZXR1cm4gcmVzLmJvZHk7CiAgfQogIGFzeW5jIGJsb2JDcmVhdGUoYWRkcmVzcyxkYXRhLHB1YmxpY0tleSxwcml2YXRlS2V5KSB7CiAgICB2YXIgZmllbGRzID0gW107CgogICAgdmFyIHJlcyA9IGF3YWl0IHRoaXMuYmFsYW5jZShhZGRyZXNzKTsKICAgIGZpZWxkcy5wdXNoKHJlcy5iYWxhbmNlLkNvdW50ZXIpOwogICAgZmllbGRzLnB1c2goYWRkcmVzcyk7CiAgICBmaWVsZHMucHVzaChkYXRhKTsKCiAgICByZXMgPSBhd2FpdCB0aGlzLnNpZ25NZXNzYWdlKGZpZWxkcyxwcml2YXRlS2V5KTsKCiAgICByZXMgPSBhd2FpdCB0aGlzLmJsb2JDcmVhdGVXaXRoU2lnKHJlcy5zaWcsYWRkcmVzcyxkYXRhLHB1YmxpY0tleSk7CgogICAgcmV0dXJuIHJlczsKICB9CiAgYXN5bmMgbWludChzaWcsYWRkcmVzcyxkYXRhLHB1YmxpY0tleSxhbW91bnQsdW5pdCkgewogICAgdmFyIGFwaSA9IHRoaXMuaG9va3Muc3RhY2suYXBpOwogICAgdmFyIGJvZHkgPSB7CiAgICAgIHNpZywKICAgICAgYWRkcmVzcywKICAgICAgcHVibGljS2V5LAogICAgICBhbW91bnQsCiAgICAgIHVuaXQsCiAgICAgIGRhdGEKICAgIH07CiAgICB0aGlzLmRlYnVnTG9nKCcqKioqKioqKioqKiBkbyBtaW50Jyk7CiAgICB0aGlzLmRlYnVnTG9nKHtib2R5fSk7CiAgICB0aGlzLmRlYnVnTG9nKHthcGl9KTsKICAgIHRoaXMuZGVidWdTaXplKGJvZHkpOwogICAgdmFyIHVybCA9ICcvcC9taW50JzsKICAgIGNvbnN0IHJlcyA9IGF3YWl0IGFwaS5wb3N0KHVybCwge2JvZHl9KTsKICAgIHRoaXMuZGVidWdMb2coJyoqKioqKioqKioqIG1pbnQgcmVzdWx0Jyk7CiAgICB0aGlzLmRlYnVnTG9nKHJlcyk7CiAgICByZXR1cm4gcmVzOwogIH0KICBhc3luYyBzaWduQW5kTWludChhZGRyZXNzLGRhdGEscHVibGljS2V5LGFtb3VudCx1bml0LHByaXZhdGVLZXkpIHsKICAgIHRoaXMuZGVidWdMb2coJ3NpZ25BbmRNaW50Jyk7CiAgICB0aGlzLmRlYnVnTG9nKHthZGRyZXNzLGRhdGEscHVibGljS2V5LGFtb3VudCx1bml0LHByaXZhdGVLZXl9KTsKICAgIHZhciBmaWVsZHMgPSBbXTsKICAgIHZhciB7IGJhbGFuY2UgfSA9IGF3YWl0IHRoaXMuYmFsYW5jZShhZGRyZXNzKTsKICAgIC8vIHRoaXMuZGVidWdMb2coJyMjIyMjIyMjIyMjIyMjIyMgYmFsYW5jZS5Db3VudGVyOiAnICsgYmFsYW5jZS5Db3VudGVyKTsKICAgIGZpZWxkcy5wdXNoKGJhbGFuY2UuQ291bnRlcik7CiAgICBmaWVsZHMucHVzaChhZGRyZXNzKTsKICAgIGZpZWxkcy5wdXNoKGFtb3VudCk7CiAgICBmaWVsZHMucHVzaCh1bml0KTsKICAgIGZpZWxkcy5wdXNoKGRhdGEpOwoKICAgIHZhciB7IHNpZyB9ID0gYXdhaXQgdGhpcy5zaWduTWVzc2FnZShmaWVsZHMscHJpdmF0ZUtleSk7CgogICAgdmFyIHJlcyA9IGF3YWl0IHRoaXMubWludChzaWcsYWRkcmVzcyxkYXRhLHB1YmxpY0tleSxhbW91bnQsdW5pdCk7CgogICAgcmV0dXJuIHJlczsKICB9CiAgYXN5bmMgd2l0aGRyYXcoc2lnLHByaXZhdGVLZXksZGVzdEFkZHJlc3MsZGVzdEFtb3VudCxkYXRhLHNvdXJjZU91dHB1dCkgewogICAgdmFyIGFwaSA9IHRoaXMuaG9va3Muc3RhY2suYXBpOwogICAgdmFyIGJvZHkgPSB7CiAgICAgIHNpZywKICAgICAgcHJpdmF0ZUtleSwKICAgICAgZGVzdEFkZHJlc3MsCiAgICAgIGRlc3RBbW91bnQsCiAgICAgIGRhdGEsCiAgICAgIHNvdXJjZU91dHB1dAogICAgfTsKICAgIHRoaXMuZGVidWdMb2coJyoqKioqKioqKioqIHdpdGhkcmF3Jyk7CiAgICB0aGlzLmRlYnVnTG9nKHtib2R5fSk7CiAgICB2YXIgdXJsID0gJy9wL3dpdGhkcmF3JzsKICAgIGNvbnN0IHJlcyA9IGF3YWl0IGFwaS5wb3N0KHVybCwge2JvZHl9KTsKICAgIHJldHVybiByZXM7CiAgfQogIGFzeW5jIHNpZ25BbmRXaXRoZHJhdyhwcml2YXRlS2V5LHNvdXJjZUFkZHJlc3MsZGVzdEFkZHJlc3MsZGVzdEFtb3VudCxkYXRhLHNvdXJjZU91dHB1dCkgewogICAgdGhpcy5kZWJ1Z0xvZygnc2lnbkFuZFdpdGhkcmF3Jyk7CiAgICB0aGlzLmRlYnVnTG9nKHtwcml2YXRlS2V5LHNvdXJjZUFkZHJlc3MsZGVzdEFkZHJlc3MsZGVzdEFtb3VudCxkYXRhLHNvdXJjZU91dHB1dH0pOwogICAgdmFyIGZpZWxkcyA9IFtdOwogICAgdmFyIHsgYmFsYW5jZSB9ID0gYXdhaXQgdGhpcy5iYWxhbmNlKHNvdXJjZUFkZHJlc3MpOwogICAgLy8gdGhpcy5kZWJ1Z0xvZygnIyMjIyMjIyMjIyMjIyMjIyBiYWxhbmNlLkNvdW50ZXI6ICcgKyBiYWxhbmNlLkNvdW50ZXIpOwogICAgZmllbGRzLnB1c2goYmFsYW5jZS5Db3VudGVyKTsKICAgIGZpZWxkcy5wdXNoKGRlc3RBZGRyZXNzKTsKICAgIGZpZWxkcy5wdXNoKGRhdGEpOwogICAgZmllbGRzLnB1c2goc291cmNlT3V0cHV0KTsKICAgIGZpZWxkcy5wdXNoKGRlc3RBbW91bnQpOwoKICAgIHZhciB7IHNpZyB9ID0gYXdhaXQgdGhpcy5zaWduTWVzc2FnZShmaWVsZHMscHJpdmF0ZUtleSk7CgogICAgdmFyIHJlcyA9IGF3YWl0IHRoaXMud2l0aGRyYXcoc2lnLHByaXZhdGVLZXksZGVzdEFkZHJlc3MsZGVzdEFtb3VudCxkYXRhLHNvdXJjZU91dHB1dCk7CgogICAgcmV0dXJuIHJlczsKICB9CiAgYXN5bmMgYm9tVXBkYXRlV2l0aFNpZyhzaWcsYWRkcmVzcyxwdWJsaWNLZXksYm9tT3AsYm9tQWRkcmVzcykgewogICAgdmFyIGFwaSA9IHRoaXMuaG9va3Muc3RhY2suYXBpOwogICAgdmFyIGJvZHkgPSB7CiAgICAgIHNpZywKICAgICAgYWRkcmVzcywKICAgICAgcHVibGljS2V5LAogICAgICBib21PcCwKICAgICAgYm9tQWRkcmVzcwogICAgfTsKICAgIHRoaXMuZGVidWdMb2coJyoqKioqKioqKioqIGRvIGJvbVVwZGF0ZScpOwogICAgdGhpcy5kZWJ1Z0xvZyh7Ym9keX0pOwogICAgdGhpcy5kZWJ1Z0xvZyh7YXBpfSk7CiAgICB0aGlzLmRlYnVnU2l6ZShib2R5KTsKICAgIHZhciB1cmwgPSAnL3AvYm9tVXBkYXRlV2l0aFNpZyc7CiAgICBjb25zdCByZXMgPSBhd2FpdCBhcGkucG9zdCh1cmwsIHtib2R5fSk7CiAgICB0aGlzLmRlYnVnTG9nKCcqKioqKioqKioqKiBib21VcGRhdGUgcmVzdWx0Jyk7CiAgICB0aGlzLmRlYnVnTG9nKHJlcyk7CiAgICByZXR1cm4gcmVzOwogIH0KICBhc3luYyBzaWduQW5kVXBkYXRlQm9tKGFkZHJlc3MscHVibGljS2V5LGJvbU9wLGJvbUFkZHJlc3MscHJpdmF0ZUtleSkgewogICAgdGhpcy5kZWJ1Z0xvZygnc2lnbkFuZFVwZGF0ZUJvbScpOwogICAgdGhpcy5kZWJ1Z0xvZyh7YWRkcmVzcyxwdWJsaWNLZXksYm9tT3AsYm9tQWRkcmVzcyxwcml2YXRlS2V5fSk7CiAgICB2YXIgZmllbGRzID0gW107CiAgICB2YXIgeyBiYWxhbmNlIH0gPSBhd2FpdCB0aGlzLmJhbGFuY2UoYWRkcmVzcyk7CiAgICAvLyB0aGlzLmRlYnVnTG9nKCcjIyMjIyMjIyMjIyMjIyMjIGJhbGFuY2UuQ291bnRlcjogJyArIGJhbGFuY2UuQ291bnRlcik7CiAgICBmaWVsZHMucHVzaChiYWxhbmNlLkNvdW50ZXIpOwogICAgZmllbGRzLnB1c2goYWRkcmVzcyk7CiAgICBmaWVsZHMucHVzaChib21PcCk7CiAgICBmaWVsZHMucHVzaChib21BZGRyZXNzKTsKCiAgICB2YXIgeyBzaWcgfSA9IGF3YWl0IHRoaXMuc2lnbk1lc3NhZ2UoZmllbGRzLHByaXZhdGVLZXkpOwoKICAgIHZhciByZXMgPSBhd2FpdCB0aGlzLmJvbVVwZGF0ZVdpdGhTaWcoc2lnLGFkZHJlc3MscHVibGljS2V5LGJvbU9wLGJvbUFkZHJlc3MpOwoKICAgIHJldHVybiByZXM7CiAgfQp9Owo=", "base64_Y2xhc3MgU21hcnRDb250cmFjdCBleHRlbmRzIFNtYXJ0Q29udHJhY3RCYXNlIHsKICBjb25zdHJ1Y3Rvcihob29rcykgewogICAgICBzdXBlcihob29rcykKICAgICAgdGhpcy5kZWJ1Z0xvZygnKioqKioqKioqKioqKiogU21hcnRDb250cmFjdCcpOwogIH0KCiAgYXN5bmMgZWNobygpIHsKICAgICAgdGhpcy5kZWJ1Z0xvZygnZWNobycpOwogICAgICB2YXIgcnZhbCA9IHsKICAgICAgICAgIGRhdGE6ICdoZWxsbycKICAgICAgfTsKICAgICAgdGhpcy5ob29rcy5maW5pc2gucmVzb2x2ZShydmFsKTsKICB9CgogIGFzeW5jIHdpbmVtYWtlck1pbnRPaygpIHsgCiAgICB0aGlzLmRlYnVnTG9nKCdleGVjdXRlIHdpbmVtYWtlck1pbnRPaycpOwogICAgICB2YXIgXyA9IHRoaXMuaG9va3MuXzsKICAgICAgdmFyIHNzID0gdGhpcy5ob29rcy5zY3JlZW5TdGF0ZTsKICAgICAgdmFyIGFwcCA9IHRoaXMuaG9va3MuYXBwOwogICAgICB2YXIgdXNlckNyZWRlbnRpYWxzID0gYXBwLmdldEFwcFN0YXRlKCd1c2VyQ3JlZGVudGlhbHMnKTsKICAgICAgdmFyIHB1YmxpY0tleSA9IHVzZXJDcmVkZW50aWFscy5wdWJsaWNLZXk7CiAgICAgIHZhciBwcml2YXRlS2V5ID0gdXNlckNyZWRlbnRpYWxzLnByaXZhdGVLZXk7CiAgICAgIHZhciB3b3JrZmxvdyA9IHNzLndvcmtmbG93OwogICAgICB2YXIgbmV3SWQgPSB0aGlzLmhvb2tzLnNob3J0aWQuZ2VuZXJhdGUoKTsKICAgICAgdmFyIHBvcGNvZGVOYW1lID0gJ1dpbmVfJyArIG5ld0lkOwogICAgICB2YXIgeyBmb3JtIH0gPSB0aGlzLnN0YXRlOwogICAgICB0aGlzLmRlYnVnTG9nKGZvcm0pOwogICAgICB2YXIgeyBwb3Bjb2RlIH0gPSBhd2FpdCB0aGlzLmdlbmVyYXRlKCk7CiAgICAgIHZhciB7IGFkZHJlc3MgfSA9IHBvcGNvZGU7CiAgICAgIHZhciBuZXh0U3BvdCA9ICd0cnVja2VyLnBpY2t1cCc7CiAgICAgIHZhciBhbW91bnQgPSB0aGlzLnRvSW50ZWdlcihmb3JtLm1pbnRXaW5lQm90dGxlcy5BbW91bnQpOwogICAgICB2YXIgdW5pdCA9IGZvcm0ubWludFdpbmVCb3R0bGVzLlVuaXQ7CiAgICAgIHRoaXMuZGVidWdMb2coJyMjIyMjIyMjIyMjIyMlJSUlJSUlJSUlJSUlJCQkJCQkJCQkJCQkJCQgIGdlbmVyYXRlZCB3aW5lbWFrZXIgcG9wY29kZTonKTsKICAgICAgdGhpcy5kZWJ1Z0xvZyh7cG9wY29kZU5hbWUscG9wY29kZX0pOwogICAgICAKICAgICAgdmFyIGRhdGEgPQogICAgICAgICAgewogICAgICAgICAgICAiYXBwRGF0YSI6IHsKICAgICAgICAgICAgICAid29ya2Zsb3dEYXRhIjogZm9ybSwKICAgICAgICAgICAgICAid2luZUJvdHRsZXMiOiBhbW91bnQsCiAgICAgICAgICAgICAgIndpbmVVbml0IjogdW5pdCwKICAgICAgICAgICAgICAic3BvdCI6IG5leHRTcG90LAogICAgICAgICAgICAgICJ3b3JrZmxvd05hbWUiOiBzcy53b3JrZmxvdy5uYW1lLAogICAgICAgICAgICAgICJ3b3JrZmxvd0luc3RhbmNlSWQiOiBuZXdJZCwKICAgICAgICAgICAgICAid29ya2Zsb3dSb290UG9wY29kZSI6ICJ0cnVlIiwKICAgICAgICAgICAgICBwb3Bjb2RlTmFtZSAsCiAgICAgICAgICAgICAgIndvcmtmbG93RGVmIjogd29ya2Zsb3cKICAgICAgICAgICAgfQogICAgICAgICAgfTsKCiAgICAgIHRoaXMuZGVidWdMb2coZGF0YSk7CgogICAgICB2YXIgcmVzID0gYXdhaXQgdGhpcy5zaWduQW5kTWludChhZGRyZXNzLGRhdGEscHVibGljS2V5LGFtb3VudCx1bml0LHByaXZhdGVLZXkpOwogICAgICAvLyB0aGlzLmRlYnVnTG9nKCd0aGlzLnNpZ25BbmRNaW50IHJlcy5ib2R5LmtleXM6ICcgKyBPYmplY3Qua2V5cyhyZXMuYm9keSkpOwoKICAgICAgdmFyIHJ2YWwgPSB7CiAgICAgICAgICBhY3Rpb246IFtdCiAgICAgIH07CiAgICAgIHRoaXMuaG9va3MuZmluaXNoLnJlc29sdmUocnZhbCk7CiAgICAgIHJldHVybiBhZGRyZXNzOwogICAgCiAgfQogIHRvSW50ZWdlcih2YWx1ZSkgewogICAgdmFyIF8gPSB0aGlzLmhvb2tzLl87CiAgICBpZihfLmlzU3RyaW5nKHZhbHVlKSkKICAgICAgcmV0dXJuIHBhcnNlSW50KHZhbHVlKTsKICAgIGVsc2UKICAgICAgcmV0dXJuIHZhbHVlOwogIH0KICBhc3luYyB0cnVja2VyUGlja3VwT2soKSB7IAogICAgdGhpcy5kZWJ1Z0xvZygnZXhlY3V0ZSB0cnVja2VyUGlja3VwT2snKTsKICAgIHZhciBmb3JtID0gdGhpcy5zdGF0ZS5mb3JtOwogICAgdGhpcy5kZWJ1Z0xvZyh7Zm9ybX0pOwogICAgCiAgICB2YXIgcnZhbCA9IHsKICAgICAgICBhY3Rpb246IFtdCiAgICB9OwoKICAgIHZhciBfID0gdGhpcy5ob29rcy5fOwogICAgdmFyIHNzID0gdGhpcy5ob29rcy5zY3JlZW5TdGF0ZTsKICAgIHZhciBhcHAgPSB0aGlzLmhvb2tzLmFwcDsKICAgIHZhciB3b3JrZmxvdyA9IHNzLndvcmtmbG93OwogICAgCiAgICB2YXIgdXNlckNyZWRlbnRpYWxzID0gYXBwLmdldEFwcFN0YXRlKCd1c2VyQ3JlZGVudGlhbHMnKTsKICAgIHZhciB1c2VyUHVibGljS2V5ID0gdXNlckNyZWRlbnRpYWxzLnB1YmxpY0tleTsKICAgIHZhciB1c2VyUHJpdmF0ZUtleSA9IHVzZXJDcmVkZW50aWFscy5wcml2YXRlS2V5OwogICAgCiAgICB2YXIgc3JjUG9wY29kZSA9IHRoaXMuc3RhdGUucG9wY29kZTsKICAgIAoKICAgIHZhciBkZXN0QW1vdW50ID0gdGhpcy50b0ludGVnZXIodGhpcy5zdGF0ZS5mb3JtLndpdGhkcmF3LnBpY2t1cEFtb3VudCk7CiAgICB2YXIgZGVzdE5hbWUgPSAiVHJ1Y2tfIiArIHVzZXJDcmVkZW50aWFscy5zZXNzaW9uSWQ7CiAgICAKICAgIHZhciBkYXRhID0geyBkZXNjcmlwdGlvbjogYHdpdGhkcmF3ICR7ZGVzdEFtb3VudH0gYm90dGxlcyBvZiB3aW5lYCB9OwogICAgdmFyIHNvdXJjZU91dHB1dCA9IDA7CiAgICAKICAgIHRoaXMuZGVidWdMb2coJ2dldCB0cnVjayBwb3Bjb2RlOiAnICsgZGVzdE5hbWUpOwogICAgdmFyIHRydWNrUG9wY29kZSA9IGF3YWl0IHRoaXMub25lQnlOYW1lKGRlc3ROYW1lKTsKICAgIHRoaXMuZGVidWdMb2codHJ1Y2tQb3Bjb2RlKTsKICAgICAKICAgIHRoaXMuZGVidWdMb2coJ2NoZWNrIHNvdXJjZSB3aW5lIGJvdHRsZSBjb3VudCcpOwogICAgdmFyIHdpbmVCb3R0bGVzID0gdGhpcy50b0ludGVnZXIoc3JjUG9wY29kZS5hcHBEYXRhLndpbmVCb3R0bGVzKTsKICAgIHZhciB3aW5lVW5pdCA9IHNyY1BvcGNvZGUuYXBwRGF0YS53aW5lVW5pdDsKICAgIHRoaXMuZGVidWdMb2coe3NyY1BvcGNvZGV9KTsKICAgIHRoaXMuZGVidWdMb2coe3dpbmVCb3R0bGVzLGRlc3RBbW91bnQsd2luZVVuaXR9KTsKICAgIAogICAgaWYoXy5pc05pbChkZXN0QW1vdW50KSB8fCBfLmlzTmFOKGRlc3RBbW91bnQpKSB7CiAgICAgIHRoaXMuZGVidWdMb2coJyoqKioqKioqKioqKioqKioqKiBlcnJvciBiYWQgZGVzdEFtb3VudCknKTsKICAgICAgdGhpcy5ob29rcy5maW5pc2gucmVzb2x2ZShydmFsKTsKICAgICAgcmV0dXJuIDsKICAgIH0KICAgIAogICAgaWYoXy5pc05pbCh3aW5lQm90dGxlcykgfHwgXy5pc05hTihkZXN0QW1vdW50KSkgewogICAgICB0aGlzLmRlYnVnTG9nKCcqKioqKioqKioqKioqKioqKiogZXJyb3IgYmFkIHdpbmVCb3R0bGVzJyk7CiAgICAgIHRoaXMuaG9va3MuZmluaXNoLnJlc29sdmUocnZhbCk7CiAgICAgIHJldHVybiA7CiAgICB9CiAgICAKICAgIGlmKGRlc3RBbW91bnQgPiB3aW5lQm90dGxlcykgewogICAgICB0aGlzLmRlYnVnTG9nKCcqKioqKioqKioqKioqKioqKiogZXJyb3IgZGVzdEFtb3VudCA+IHdpbmVCb3R0bGVzJyk7CiAgICAgIHRoaXMuaG9va3MuZmluaXNoLnJlc29sdmUocnZhbCk7CiAgICAgIHJldHVybiA7CiAgICB9CiAgICAgCiAgICB2YXIgdHJ1Y2tCb3R0bGVzOwogICAgaWYgKF8uaXNOaWwodHJ1Y2tQb3Bjb2RlKSkgewogICAgICB0aGlzLmRlYnVnTG9nKCdNaW50aW5nIHRydWNrIHBvcGNvZGU6ICcgKyBkZXN0TmFtZSk7CiAgICAgIHZhciB0cnVja1Nwb3QgPSAndHJ1Y2tlci5zaG93JzsKICAgICAgdmFyIG5ld0lkID0gdGhpcy5ob29rcy5zaG9ydGlkLmdlbmVyYXRlKCk7CiAgICAgIHZhciB0cnVja1N0YXJ0QW1vdW50ID0gMDsKICAgICAgdmFyIHRydWNrVW5pdCA9ICdib3R0bGVzIG9mIHdpbmUnOwogICAgICB0cnVja0JvdHRsZXMgPSAwOwogICAgICB2YXIgdHJ1Y2tEYXRhID0KICAgICAgICAgIHsKICAgICAgICAgICAgImFwcERhdGEiOiB7CiAgICAgICAgICAgICAgIndvcmtmbG93RGF0YSI6IHt9LAogICAgICAgICAgICAgICJzcG90IjogdHJ1Y2tTcG90LAogICAgICAgICAgICAgICJ3aW5lQm90dGxlcyI6IHRydWNrQm90dGxlcywKICAgICAgICAgICAgICAid2luZVVuaXQiOiB3aW5lVW5pdCwKICAgICAgICAgICAgICAid29ya2Zsb3dOYW1lIjogc3Mud29ya2Zsb3cubmFtZSwKICAgICAgICAgICAgICAid29ya2Zsb3dJbnN0YW5jZUlkIjogbmV3SWQsCiAgICAgICAgICAgICAgIndvcmtmbG93Um9vdFBvcGNvZGUiOiAidHJ1ZSIsCiAgICAgICAgICAgICAgcG9wY29kZU5hbWU6IGRlc3ROYW1lLAogICAgICAgICAgICAgICJ3b3JrZmxvd0RlZiI6IHdvcmtmbG93CiAgICAgICAgICAgIH0KICAgICAgICAgIH07CiAgICAgIHZhciBuZXdQb3Bjb2RlID0gYXdhaXQgdGhpcy5nZW5lcmF0ZSgpOwogICAgICB2YXIgdHJ1Y2tBZGRyZXNzID0gbmV3UG9wY29kZS5wb3Bjb2RlLmFkZHJlc3M7CiAgICAgIAogICAgICB2YXIgcmVzID0gYXdhaXQgdGhpcy5zaWduQW5kTWludCh0cnVja0FkZHJlc3MsdHJ1Y2tEYXRhLHVzZXJQdWJsaWNLZXksdHJ1Y2tTdGFydEFtb3VudCx0cnVja1VuaXQsdXNlclByaXZhdGVLZXkpOwogICAgICAKICAgICAgdHJ1Y2tQb3Bjb2RlID0gYXdhaXQgdGhpcy5vbmVCeU5hbWUoZGVzdE5hbWUpOwogICAgfQogICAgZWxzZSB7CiAgICAgIHRoaXMuZGVidWdMb2coJ0ZvdW5kIGV4aXN0aW5nIHRydWNrIHBvcGNvZGU6ICcgKyBkZXN0TmFtZSk7CiAgICAgIHRydWNrQm90dGxlcyA9IHRydWNrUG9wY29kZS5hcHBEYXRhLndpbmVCb3R0bGVzOwogICAgfQogICAgCiAgICBpZihfLmlzTmlsKHRydWNrUG9wY29kZSkpIHsKICAgICAgdGhpcy5kZWJ1Z0xvZygnKioqKioqKioqKioqKioqKioqIEVycm9yIG1pbnRpbmcgdHJ1Y2sgcG9wY29kZScpOwogICAgICB0aGlzLmhvb2tzLmZpbmlzaC5yZXNvbHZlKHJ2YWwpOwogICAgICByZXR1cm4gOwogICAgfQogICAgCiAgICB0aGlzLmRlYnVnTG9nKCcjIyMjIyMjIyMjIyMjIyMjIHRydWNrIHBvcGNvZGU6Jyk7CiAgICB0aGlzLmRlYnVnTG9nKHRydWNrUG9wY29kZSk7CiAgICAKICAgIHZhciB3cmVzID0gYXdhaXQgdGhpcy5zaWduQW5kV2l0aGRyYXcoCiAgICAgIHNyY1BvcGNvZGUucHJpdmF0ZUtleSwKICAgICAgc3JjUG9wY29kZS5hZGRyZXNzLAogICAgICB0cnVja1BvcGNvZGUuYWRkcmVzcywKICAgICAgZGVzdEFtb3VudCwKICAgICAgZGF0YSwKICAgICAgc291cmNlT3V0cHV0CiAgICApOwogICAgCiAgICB0aGlzLmRlYnVnTG9nKCcjIyMjIyMjIyMjIyMjIyMjIHdpdGhkcmF3IHJlc3VsdDonKTsKICAgIHRoaXMuZGVidWdMb2cod3Jlcyk7CiAgICBydmFsLndyZXMgPSB3cmVzOwogICAgCiAgICB0aGlzLmRlYnVnTG9nKCcjIyMjIyMjIyMjIyMjIyMjIHVwZGF0ZSBzb3VyY2Ugd2luZSBib3R0bGUgY291bnQ6Jyk7CiAgICB2YXIgd2luZUNvdW50ID0gd2luZUJvdHRsZXMgLSBkZXN0QW1vdW50OwogICAgdmFyIHdpbmVEYXRhID0KICAgICAgICB7CiAgICAgICAgICAiYXBwRGF0YSI6IHsKICAgICAgICAgICAgIndpbmVCb3R0bGVzIjogd2luZUNvdW50CiAgICAgICAgICB9CiAgICAgICAgfTsKCiAgICB0aGlzLmRlYnVnTG9nKHdpbmVEYXRhKTsKICAgIHZhciBicmVzID0gYXdhaXQgdGhpcy5ibG9iQ3JlYXRlKAogICAgICBzcmNQb3Bjb2RlLmFkZHJlc3MsCiAgICAgIHdpbmVEYXRhLAogICAgICB1c2VyQ3JlZGVudGlhbHMucHVibGljS2V5LAogICAgICB1c2VyQ3JlZGVudGlhbHMucHJpdmF0ZUtleSk7CiAgICAgIAogICAgdGhpcy5kZWJ1Z0xvZygnIyMjIyMjIyMjIyMjIyMjIyBibG9iQ3JlYXRlIHJlc3VsdDonKTsKICAgIHRoaXMuZGVidWdMb2coYnJlcyk7CiAgICBydmFsLmJyZXMgPSBicmVzOwogICAgCiAgICB0aGlzLmRlYnVnTG9nKCcjIyMjIyMjIyMjIyMjIyMjIHVwZGF0ZSB0cnVjayB3aW5lIGJvdHRsZSBjb3VudDonKTsKICAgIHZhciB0cnVja0NvdW50ID0gdHJ1Y2tCb3R0bGVzICsgZGVzdEFtb3VudDsKICAgIHZhciB0cnVja1dpbmVEYXRhID0KICAgICAgICB7CiAgICAgICAgICAiYXBwRGF0YSI6IHsKICAgICAgICAgICAgIndpbmVCb3R0bGVzIjogdHJ1Y2tDb3VudAogICAgICAgICAgfQogICAgICAgIH07CgogICAgdGhpcy5kZWJ1Z0xvZyh0cnVja1dpbmVEYXRhKTsKICAgIHZhciBicmVzMiA9IGF3YWl0IHRoaXMuYmxvYkNyZWF0ZSgKICAgICAgdHJ1Y2tQb3Bjb2RlLmFkZHJlc3MsCiAgICAgIHRydWNrV2luZURhdGEsCiAgICAgIHVzZXJDcmVkZW50aWFscy5wdWJsaWNLZXksCiAgICAgIHVzZXJDcmVkZW50aWFscy5wcml2YXRlS2V5KTsKICAgICAgCiAgICB0aGlzLmRlYnVnTG9nKCcjIyMjIyMjIyMjIyMjIyMjIHRydWNrIGJsb2JDcmVhdGUgcmVzdWx0OicpOwogICAgdGhpcy5kZWJ1Z0xvZyhicmVzMik7CiAgICBydmFsLmJyZXMyID0gYnJlczI7CiAgICAKICAgIHRoaXMuaG9va3MuZmluaXNoLnJlc29sdmUocnZhbCk7CiAgIH0KCn07Cg=="]
                }
            },
            "address": "af5efdc4b5176fd77e9cc8c9c6e42f8b1552c1b3",
            "createdAt": "1520232078625",
            "date": "1520232078625",
            "operation": "mint",
            "destCounter": "JUe2p5FA5zIzYmSSxEJBKXyAoCmD6q/e5oLMES5KgHs="
        }, {
            "id": "<0cfd4b993d6d271e18ad6bdc361a663995f1339710c1437de902dba3068a6846>",
            "sourceAddress": "af5efdc4b5176fd77e9cc8c9c6e42f8b1552c1b3",
            "destPopcode": "<34baf20d6d7149f0472451911e91937762152480>",
            "txId": "0cfd4b993d6d271e18ad6bdc361a663995f1339710c1437de902dba3068a6846",
            "data": {"metadata": {"description": "withdraw 50 bottles of wine"}},
            "type": "transaction",
            "sourceCounter": "JUe2p5FA5zIzYmSSxEJBKXyAoCmD6q/e5oLMES5KgHs=",
            "createdAt": "1520232241135",
            "date": "1520232241135",
            "destAddress": "34baf20d6d7149f0472451911e91937762152480",
            "destAmount": "50",
            "operation": "withdraw",
            "sourcePopcode": "<af5efdc4b5176fd77e9cc8c9c6e42f8b1552c1b3>"
        }, {
            "id": "<f2581ae499fcaf31ec11be53db7a78c47dd0cb377938e978c5c33c1f42ec5bf4>",
            "popcode": "<af5efdc4b5176fd77e9cc8c9c6e42f8b1552c1b3>",
            "txId": "f2581ae499fcaf31ec11be53db7a78c47dd0cb377938e978c5c33c1f42ec5bf4",
            "data": {"metadata": {"appData": {"wineBottles": 950}}},
            "type": "transaction",
            "sourceCounter": "sy+ZtZ+L7T+3JxqUIfSQNv7adiyRlpWLeWhBKqMxi90=",
            "address": "af5efdc4b5176fd77e9cc8c9c6e42f8b1552c1b3",
            "createdAt": "1520232246462",
            "date": "1520232246462",
            "operation": "blobCreate",
            "destCounter": "+V2qTKbyLPfvCkak+O8iCXNCvDpQjqectABSNhGosnA="
        }, {
            "id": "<ab15d2c980074de6c459a29886a2bc6219535eb9fc43599acd1f3f737fd5e6b3>",
            "sourceAddress": "af5efdc4b5176fd77e9cc8c9c6e42f8b1552c1b3",
            "destPopcode": "<34baf20d6d7149f0472451911e91937762152480>",
            "txId": "ab15d2c980074de6c459a29886a2bc6219535eb9fc43599acd1f3f737fd5e6b3",
            "data": {"metadata": {"description": "withdraw 150 bottles of wine"}},
            "type": "transaction",
            "sourceCounter": "JUe2p5FA5zIzYmSSxEJBKXyAoCmD6q/e5oLMES5KgHs=",
            "createdAt": "1520232305656",
            "date": "1520232305656",
            "destAddress": "34baf20d6d7149f0472451911e91937762152480",
            "destAmount": "150",
            "operation": "withdraw",
            "sourcePopcode": "<af5efdc4b5176fd77e9cc8c9c6e42f8b1552c1b3>"
        }, {
            "id": "<b626a3a0a2e3c34147ae0f9a9126688f5cedab4cd4ecf24f05e78c8dc9d6af9c>",
            "popcode": "<af5efdc4b5176fd77e9cc8c9c6e42f8b1552c1b3>",
            "txId": "b626a3a0a2e3c34147ae0f9a9126688f5cedab4cd4ecf24f05e78c8dc9d6af9c",
            "data": {"metadata": {"appData": {"wineBottles": 800}}},
            "type": "transaction",
            "sourceCounter": "bq9i88F15iwRzTvYZCEPCfMtDqohH4TzILrdoe5un4o=",
            "address": "af5efdc4b5176fd77e9cc8c9c6e42f8b1552c1b3",
            "createdAt": "1520232308155",
            "date": "1520232308155",
            "operation": "blobCreate",
            "destCounter": "TgE5LT+eLkjr8S+xRvqYubSUxdCLF2twfnVzWCvjXsM="
        }],
        "workflowName": "wineV1",
        "workflowData": {"mintWineBottles": {"Amount": "1000", "Unit": "bottles of wine"}},
        "wineBottles": 800,
        "wineUnit": "bottles of wine",
        "timestamp": 1520232308155,
        "withdrawAmount": "150",
        "withdrawTrans": {
            "id": "<ab15d2c980074de6c459a29886a2bc6219535eb9fc43599acd1f3f737fd5e6b3>",
            "sourceAddress": "af5efdc4b5176fd77e9cc8c9c6e42f8b1552c1b3",
            "destPopcode": "<34baf20d6d7149f0472451911e91937762152480>",
            "txId": "ab15d2c980074de6c459a29886a2bc6219535eb9fc43599acd1f3f737fd5e6b3",
            "data": {"metadata": {"description": "withdraw 150 bottles of wine"}},
            "type": "transaction",
            "sourceCounter": "JUe2p5FA5zIzYmSSxEJBKXyAoCmD6q/e5oLMES5KgHs=",
            "createdAt": "1520232305656",
            "date": "1520232305656",
            "destAddress": "34baf20d6d7149f0472451911e91937762152480",
            "destAmount": "150",
            "operation": "withdraw",
            "sourcePopcode": "<af5efdc4b5176fd77e9cc8c9c6e42f8b1552c1b3>"
        }
    }]
}