export default [
  {
    "id": "<d0c35e470ba6eeb0c3b89a9f072a25d1a32b2ca9>",
    "stateName": [
      "ScanAnalyzer",
      "PrepareShipmentBox"
    ],
    "workflowInstanceId": "8522db15-764d-4e4b-80d9-2aace4cae802",
    "publicKey": "A6L4c9UIC4Fb7mw/TTXmF1pAUa4ggPxkXVq/xxmBtWxS",
    "unit": "box",
    "type": "popcode",
    "popcodeName": "ShipBox_1234",
    "stateActionName": [
      "shipBox",
      "handleScan",
      "addBoxScan",
      "createShippingBox",
      "addBox"
    ],
    "amount": "1",
    "address": "d0c35e470ba6eeb0c3b89a9f072a25d1a32b2ca9",
    "workflowRootPopcode": "true",
    "bom": [
      "<545e81d7e52bc7ca9673e0318a799d7fdd41be3b>",
      "<e957ae577ea65151bf8797db01bbcbe44f21eedc>"
    ],
    "transaction": [
      {
        "id": "<0ee452b5df4d5a6a73d9a15be4e07d31c4b88d3696124928b4223c34767c28cf>",
        "popcode": "<d0c35e470ba6eeb0c3b89a9f072a25d1a32b2ca9>",
        "unit": "box",
        "txId": "0ee452b5df4d5a6a73d9a15be4e07d31c4b88d3696124928b4223c34767c28cf",
        "data": {
          "metadata": {
            "appData": {
              "workflowName": "siemensv4",
              "workflowInstanceId": "8522db15-764d-4e4b-80d9-2aace4cae802",
              "workflowRootPopcode": "true",
              "popcodeName": "ShipBox_1234"
            }
          }
        },
        "type": "transaction",
        "sourceCounter": "VVLqsr91/mv4nqqgbLnoArW26Uv1aT+GF2ScwqroKRU=",
        "amount": "1",
        "address": "d0c35e470ba6eeb0c3b89a9f072a25d1a32b2ca9",
        "createdAt": "1517599326918",
        "date": "1517599326918",
        "operation": "mint",
        "destCounter": "6GixJdhEUERTw3YG8jSkgMFhVQAi/K/KsIWTlkh17ic="
      },
      {
        "id": "<9dac05185463a71fe3dc627f65e28d67ca4a11b84fc41d389b065770cec28c72>",
        "stateName": "ScanAnalyzer",
        "popcode": "<d0c35e470ba6eeb0c3b89a9f072a25d1a32b2ca9>",
        "txId": "9dac05185463a71fe3dc627f65e28d67ca4a11b84fc41d389b065770cec28c72",
        "data": {
          "metadata": {
            "appData": {
              "popcodeName": "ShipBox_1234",
              "workflowName": "siemensv4",
              "workflowInstanceId": "8522db15-764d-4e4b-80d9-2aace4cae802",
              "stateName": "ScanAnalyzer",
              "stateActionName": "handleScan",
              "username": "trucker",
              "scanData": {
                "data": "1234",
                "type": "org.iso.Code128"
              }
            }
          }
        },
        "type": "transaction",
        "sourceCounter": "wtKDeNsOcJDZr6NUmCOFgQjO3M3cMIr4PrJuuk96OTI=",
        "stateActionName": "handleScan",
        "address": "d0c35e470ba6eeb0c3b89a9f072a25d1a32b2ca9",
        "createdAt": "1517599329613",
        "date": "1517599329613",
        "username": "trucker",
        "operation": "blobCreate",
        "destCounter": "kSPMsS0GooyMnD1nFJH/KmEX1531FdVBDhpkCn4X/PE="
      },
      {
        "id": "<514cbc9bc61ccc271785b223d6bc1abcb0190c19d4b292bc606cbcd9f85ab001>",
        "stateName": "PrepareShipmentBox",
        "popcode": "<d0c35e470ba6eeb0c3b89a9f072a25d1a32b2ca9>",
        "txId": "514cbc9bc61ccc271785b223d6bc1abcb0190c19d4b292bc606cbcd9f85ab001",
        "data": {
          "metadata": {
            "appData": {
              "workflowName": "siemensv4",
              "workflowInstanceId": "8522db15-764d-4e4b-80d9-2aace4cae802",
              "stateName": "PrepareShipmentBox",
              "stateActionName": "createShippingBox",
              "username": "trucker",
              "popcodeName": "ShipBox_1234",
              "scanData": {
                "data": "1234",
                "type": "org.iso.Code128"
              },
              "formData": {
                "Status": true,
                "value": "1",
                "unit": "box",
                "Projectname": "test",
                "TM_PO Number": "test",
                "Tool_Manager_name": "test",
                "Shipped_to_TM_Date": "1/1/2018",
                "Shipped_to_TM_Tracking Number": "99999"
              }
            }
          }
        },
        "type": "transaction",
        "sourceCounter": "Qdhegyuacl+q2YgeLUL3dcHtQCYkyYLLY9eVsWasl8g=",
        "stateActionName": "createShippingBox",
        "address": "d0c35e470ba6eeb0c3b89a9f072a25d1a32b2ca9",
        "createdAt": "1517599332366",
        "date": "1517599332366",
        "username": "trucker",
        "operation": "blobCreate",
        "destCounter": "rwHQDLw9iDkVBIBlu5W7/A6fYQwXY+PdpSaitwXMZF8="
      },
      {
        "id": "<6582a95deecc1403e22023b052c5fb824095116bfd6b8fef3c3c529bf97a79da>",
        "stateName": "PrepareShipmentBox",
        "bomAddress": "e957ae577ea65151bf8797db01bbcbe44f21eedc",
        "popcode": "<d0c35e470ba6eeb0c3b89a9f072a25d1a32b2ca9>",
        "txId": "6582a95deecc1403e22023b052c5fb824095116bfd6b8fef3c3c529bf97a79da",
        "data": {
          "metadata": {
            "appData": {
              "workflowName": "siemensv4",
              "workflowInstanceId": "8522db15-764d-4e4b-80d9-2aace4cae802",
              "stateName": "PrepareShipmentBox",
              "stateActionName": "addBoxScan",
              "username": "trucker",
              "popcodeName": "ShipBox_1234",
              "bomPopcodeName": "SecondBox_4321",
              "bomAddress": "e957ae577ea65151bf8797db01bbcbe44f21eedc",
              "bomOp": "in",
              "scanData": {
                "data": "4321",
                "type": "org.iso.Code128"
              }
            }
          }
        },
        "type": "transaction",
        "sourceCounter": "TBlU7Cw2qULm0zp6zBn95j2QS2vnLPN2lJLerCphV/Y=",
        "stateActionName": "addBoxScan",
        "address": "d0c35e470ba6eeb0c3b89a9f072a25d1a32b2ca9",
        "createdAt": "1517599335478",
        "date": "1517599335478",
        "bomPopcodeName": "SecondBox_4321",
        "username": "trucker",
        "operation": "blobCreate",
        "bomOp": "in",
        "destCounter": "w8bx/mJnc/L4M1BA/QlAGunViHCmJf0Snh5TgVGmuRs="
      },
      {
        "id": "<b074dd79f6a9527fc0b5418b8b939ad58cab22e36164675a37a2ab70592863ac>",
        "stateName": "PrepareShipmentBox",
        "bomAddress": "e957ae577ea65151bf8797db01bbcbe44f21eedc",
        "popcode": "<d0c35e470ba6eeb0c3b89a9f072a25d1a32b2ca9>",
        "txId": "b074dd79f6a9527fc0b5418b8b939ad58cab22e36164675a37a2ab70592863ac",
        "data": {
          "metadata": {
            "appData": {
              "workflowName": "siemensv4",
              "workflowInstanceId": "8522db15-764d-4e4b-80d9-2aace4cae802",
              "stateName": "PrepareShipmentBox",
              "stateActionName": "addBox",
              "username": "trucker",
              "popcodeName": "ShipBox_1234",
              "bomPopcodeName": "SecondBox_4321",
              "bomAddress": "e957ae577ea65151bf8797db01bbcbe44f21eedc",
              "bomOp": "in",
              "scanData": {
                "data": "4321",
                "type": "org.iso.Code128"
              },
              "formData": {
                "Status": true
              }
            }
          }
        },
        "type": "transaction",
        "sourceCounter": "KTzgOzCBxu5RjkkH00oS8Iv0+0FetendzM0jOomRhhI=",
        "stateActionName": "addBox",
        "address": "d0c35e470ba6eeb0c3b89a9f072a25d1a32b2ca9",
        "createdAt": "1517599338185",
        "date": "1517599338185",
        "bomPopcodeName": "SecondBox_4321",
        "username": "trucker",
        "operation": "blobCreate",
        "bomOp": "in",
        "destCounter": "bX8AbcUca86QuHgjxF9EmzDynd9nll9GlF2AitAR9ro="
      },
      {
        "id": "<2244b4ade35d1d9480524b623656e7e004fa881b81614cbe0562a4f452b4b33b>",
        "bomAddress": "e957ae577ea65151bf8797db01bbcbe44f21eedc",
        "popcode": "<d0c35e470ba6eeb0c3b89a9f072a25d1a32b2ca9>",
        "txId": "2244b4ade35d1d9480524b623656e7e004fa881b81614cbe0562a4f452b4b33b",
        "data": {
          "metadata": {}
        },
        "type": "transaction",
        "sourceCounter": "uAcwvC25yHQ3dt87gDnT7KTBo1ZHhEn7iSClf5hpTlY=",
        "address": "d0c35e470ba6eeb0c3b89a9f072a25d1a32b2ca9",
        "createdAt": "1517599343811",
        "date": "1517599343811",
        "operation": "bomUpdate",
        "bomOp": "in",
        "destCounter": "svXWPympwYSe7vdao1Mbror7KTxdjbfF8wwPvyqSdw8="
      },
      {
        "id": "<1055f5669dd643d4ad0666a5ab7e101334635d330bbccd5efff475661e3457bd>",
        "stateName": "PrepareShipmentBox",
        "bomAddress": "545e81d7e52bc7ca9673e0318a799d7fdd41be3b",
        "popcode": "<d0c35e470ba6eeb0c3b89a9f072a25d1a32b2ca9>",
        "txId": "1055f5669dd643d4ad0666a5ab7e101334635d330bbccd5efff475661e3457bd",
        "data": {
          "metadata": {
            "appData": {
              "workflowName": "siemensv4",
              "workflowInstanceId": "8522db15-764d-4e4b-80d9-2aace4cae802",
              "stateName": "PrepareShipmentBox",
              "stateActionName": "addBoxScan",
              "username": "trucker",
              "popcodeName": "ShipBox_1234",
              "bomPopcodeName": "AssemblyBox_5678",
              "bomAddress": "545e81d7e52bc7ca9673e0318a799d7fdd41be3b",
              "bomOp": "in",
              "scanData": {
                "data": "5678",
                "type": "org.iso.Code128"
              }
            }
          }
        },
        "type": "transaction",
        "sourceCounter": "z2/lOqAz6Pj48N1sUAXDDVvFbi8XNX19dVTem+FgGGU=",
        "stateActionName": "addBoxScan",
        "address": "d0c35e470ba6eeb0c3b89a9f072a25d1a32b2ca9",
        "createdAt": "1517599346962",
        "date": "1517599346962",
        "bomPopcodeName": "AssemblyBox_5678",
        "username": "trucker",
        "operation": "blobCreate",
        "bomOp": "in",
        "destCounter": "DXWcW+G1LtUX587FhNLJmoRleYJLgqce5mlmg1y+4Dg="
      },
      {
        "id": "<7c42c56748773871572ad5e1816b2c95f03b5214eec08a298f4aba1ef11987b5>",
        "stateName": "PrepareShipmentBox",
        "bomAddress": "545e81d7e52bc7ca9673e0318a799d7fdd41be3b",
        "popcode": "<d0c35e470ba6eeb0c3b89a9f072a25d1a32b2ca9>",
        "txId": "7c42c56748773871572ad5e1816b2c95f03b5214eec08a298f4aba1ef11987b5",
        "data": {
          "metadata": {
            "appData": {
              "workflowName": "siemensv4",
              "workflowInstanceId": "8522db15-764d-4e4b-80d9-2aace4cae802",
              "stateName": "PrepareShipmentBox",
              "stateActionName": "addBox",
              "username": "trucker",
              "popcodeName": "ShipBox_1234",
              "bomPopcodeName": "AssemblyBox_5678",
              "bomAddress": "545e81d7e52bc7ca9673e0318a799d7fdd41be3b",
              "bomOp": "in",
              "scanData": {
                "data": "5678",
                "type": "org.iso.Code128"
              },
              "formData": {
                "Status": true,
                "toolOverride": false,
                "scanData": "5678",
                "toolName": "PARALLELENDMASSESATZ",
                "chargeCode": "2013-435",
                "sap": "A2A60015516",
                "abmessung": "III-103=1,00-100MM"
              }
            }
          }
        },
        "type": "transaction",
        "sourceCounter": "ZXytDnkgbhdcC/cPbx2jgiJ2TwFeCxwI621Se4DWoUM=",
        "stateActionName": "addBox",
        "address": "d0c35e470ba6eeb0c3b89a9f072a25d1a32b2ca9",
        "createdAt": "1517599349646",
        "date": "1517599349646",
        "bomPopcodeName": "AssemblyBox_5678",
        "username": "trucker",
        "operation": "blobCreate",
        "bomOp": "in",
        "destCounter": "yv56nQFeQYNDhuOE1F2KdlxhMcbUnXF26+rrrycv5zo="
      },
      {
        "id": "<a6787d4f4d575c5a26841f1e2f84d5931e79ad22c83dd84c4686a539b1c54f65>",
        "bomAddress": "545e81d7e52bc7ca9673e0318a799d7fdd41be3b",
        "popcode": "<d0c35e470ba6eeb0c3b89a9f072a25d1a32b2ca9>",
        "txId": "a6787d4f4d575c5a26841f1e2f84d5931e79ad22c83dd84c4686a539b1c54f65",
        "data": {
          "metadata": {}
        },
        "type": "transaction",
        "sourceCounter": "NJHP9cWcdokOauTIX2plXVMOOT7nTLD3KJ075pwujJw=",
        "address": "d0c35e470ba6eeb0c3b89a9f072a25d1a32b2ca9",
        "createdAt": "1517599355104",
        "date": "1517599355104",
        "operation": "bomUpdate",
        "bomOp": "in",
        "destCounter": "4I8m8f14dHErb0BTvgDugCuvARxpZ/j6krsktQZvQvk="
      },
      {
        "id": "<c4bd69cc8bebd53773a1f134b483093925024b1daa8882d4b902098d0cc2934e>",
        "stateName": "PrepareShipmentBox",
        "popcode": "<d0c35e470ba6eeb0c3b89a9f072a25d1a32b2ca9>",
        "txId": "c4bd69cc8bebd53773a1f134b483093925024b1daa8882d4b902098d0cc2934e",
        "data": {
          "metadata": {
            "appData": {
              "workflowName": "siemensv4",
              "workflowInstanceId": "8522db15-764d-4e4b-80d9-2aace4cae802",
              "stateName": "PrepareShipmentBox",
              "stateActionName": "shipBox",
              "username": "trucker",
              "popcodeName": "ShipBox_1234",
              "formData": {
                "Status": true
              }
            }
          }
        },
        "type": "transaction",
        "sourceCounter": "SiuN0WLuNwfIonBuvActvM3JSzFLZa++RtGsVxiClMc=",
        "stateActionName": "shipBox",
        "address": "d0c35e470ba6eeb0c3b89a9f072a25d1a32b2ca9",
        "createdAt": "1517599357799",
        "date": "1517599357799",
        "username": "trucker",
        "operation": "blobCreate",
        "destCounter": "LSkr7wTQi2OeDuqxcGT6IEoSgeuspzc1rB2ium7qknE="
      }
    ],
    "workflowName": "siemensv4"
  },
  {
    "id": "<e957ae577ea65151bf8797db01bbcbe44f21eedc>",
    "workflowInstanceId": "8522db15-764d-4e4b-80d9-2aace4cae802",
    "publicKey": "A6L4c9UIC4Fb7mw/TTXmF1pAUa4ggPxkXVq/xxmBtWxS",
    "unit": "box",
    "type": "popcode",
    "popcodeName": "SecondBox_4321",
    "amount": "1",
    "address": "e957ae577ea65151bf8797db01bbcbe44f21eedc",
    "transaction": [
      {
        "id": "<0ed01e690d9751a6fe034be17ff7dff270dbf5a03d1520d1bdee918cb5c9b289>",
        "popcode": "<e957ae577ea65151bf8797db01bbcbe44f21eedc>",
        "unit": "box",
        "txId": "0ed01e690d9751a6fe034be17ff7dff270dbf5a03d1520d1bdee918cb5c9b289",
        "data": {
          "metadata": {
            "appData": {
              "workflowName": "siemensv4",
              "workflowInstanceId": "8522db15-764d-4e4b-80d9-2aace4cae802",
              "popcodeName": "SecondBox_4321"
            }
          }
        },
        "type": "transaction",
        "sourceCounter": "EYL6ZStpVuiySIi6S0IWczXFkTn7YtvV7/UlPFMaTn8=",
        "amount": "1",
        "address": "e957ae577ea65151bf8797db01bbcbe44f21eedc",
        "createdAt": "1517599340866",
        "date": "1517599340866",
        "operation": "mint",
        "destCounter": "x7X+3DNwCvE0Sq8sovbHrvL9hae3fzC2hSDCEEo3k8A="
      }
    ],
    "workflowName": "siemensv4"
  },
  {
    "id": "<545e81d7e52bc7ca9673e0318a799d7fdd41be3b>",
    "workflowInstanceId": "8522db15-764d-4e4b-80d9-2aace4cae802",
    "publicKey": "A6L4c9UIC4Fb7mw/TTXmF1pAUa4ggPxkXVq/xxmBtWxS",
    "unit": "box",
    "type": "popcode",
    "popcodeName": "AssemblyBox_5678",
    "amount": "1",
    "address": "545e81d7e52bc7ca9673e0318a799d7fdd41be3b",
    "transaction": [
      {
        "id": "<f56290188aedacbf996c619ad7418b51130f4d4d273b16c6a89feb0efcbf79d2>",
        "popcode": "<545e81d7e52bc7ca9673e0318a799d7fdd41be3b>",
        "unit": "box",
        "txId": "f56290188aedacbf996c619ad7418b51130f4d4d273b16c6a89feb0efcbf79d2",
        "data": {
          "metadata": {
            "appData": {
              "workflowName": "siemensv4",
              "workflowInstanceId": "8522db15-764d-4e4b-80d9-2aace4cae802",
              "popcodeName": "AssemblyBox_5678"
            }
          }
        },
        "type": "transaction",
        "sourceCounter": "cnQxbfbef9URbpKK3kkqZLjM1dZxVvaoDlIx1l4ygUc=",
        "amount": "1",
        "address": "545e81d7e52bc7ca9673e0318a799d7fdd41be3b",
        "createdAt": "1517599352360",
        "date": "1517599352360",
        "operation": "mint",
        "destCounter": "XHHVXpYEqfDT8OZwb/M/IWhVx7SEvGR5omzDsS255+M="
      }
    ],
    "workflowName": "siemensv4"
  }
]
