sap.ui.define([
    "sap/ui/core/mvc/Controller"
], function(Controller) {
    "use strict";
    var oView;
    var stop = false;

    return Controller.extend("GPS.GPS.controller.GPS", {

        oView: null,

        onInit: function() {
            oView = this.getView();
        },

        startCamera: function() {
            var width = 300;
            var height = 300;
            var x = (this.getView().$().width() - width)/2;
            var y = (this.getView().$().height() - height)/2 + 13,0;

            CameraPreview.startCamera({x: x, y: y, width: width, height: height, toBack: false, previewDrag: false, tapPhoto: true, tapFocus: true, camera: CameraPreview.CAMERA_DIRECTION.BACK});

            /*
            var self = this;
            stop = false;

            var i = setInterval(function(){
                // do your thing
                console.log(stop);

                if(stop == true) {
                    console.log('STOP');
                    clearInterval(i);
                } else {
                    self.takePicture();
                }

            }, 500);
            */
        },

        stopCamera: function() {
             stop = true;
             CameraPreview.stopCamera();
        },

        takePicture: function(){
            CameraPreview.takePicture({quality: 100}, function(imgData){
                //var myImage = oView.byId("myImage");
                //myImage.setSrc("data:image/jpeg;base64," + imgData);
                console.log('tp');

                /*
                mltext.getText(onSuccessText, onFailText, {
                    imgType: 4,
                    imgSrc: imgData
                });

                // for imgType Use 0,1,2,3 or 4
                function onSuccessText(recognizedText) {
                    //var element = document.getElementById('pp');
                    //element.innerHTML=recognizedText.blocks.blocktext;
                    //Use above two lines to show recognizedText in html
                    console.log(recognizedText.blocks.blocktext);
                    //alert("Text: " + recognizedText.blocks.blocktext);

                    var myText = oView.byId("Text");
                    myText.setValue(recognizedText.blocks.blocktext);
                }

                function onFailText(message) {
                    console.log('Failed because: ' + message);
                    //alert('Failed because: ' + message);
                }
                */


                mltext.getBarcode(onSuccessBarcode, onFailBarcode, {
                    imgType: 4,
                    imgSrc: imgData
                });

                function onSuccessBarcode(recognizedText) {
                    console.log(recognizedText.blocktext);

                    var myBarcode1 = oView.byId("Barcode1");
                    var myBarcode2 = oView.byId("Barcode2");
                    var myBarcode3 = oView.byId("Barcode3");
                    var myBarcode4 = oView.byId("Barcode4");

                    myBarcode1.setValue(recognizedText.blocktext[0]);
                    myBarcode2.setValue(recognizedText.blocktext[1]);
                    myBarcode3.setValue(recognizedText.blocktext[2]);
                    myBarcode4.setValue(recognizedText.blocktext[3]);

                    //alert("Barcode: " + recognizedText.blocktext);
                }

                function onFailBarcode(message) {
                    console.log('Failed because: ' + message);
                    //alert('Failed because: ' + message);
                }

            });
        },


    });
});