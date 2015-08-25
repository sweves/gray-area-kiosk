//----------------------------------------------------------------------------
//
//  $Id: PreviewAndPrintLabel.js 10794 2010-01-15 20:31:49Z vbuzuev $ 
//
// Project -------------------------------------------------------------------
//
//  DYMO Label Framework
//
// Content -------------------------------------------------------------------
//
//  DYMO Label Framework JavaScript Library Samples: Printers Information
//
//----------------------------------------------------------------------------
//
//  Copyright (c), 2010, Sanford, L.P. All Rights Reserved.
//
//----------------------------------------------------------------------------


(function()
{

    // creates <table> element and populate it with printers information
    // returns <table> element
    function createPrintersTable()
    {
        var printers = dymo.label.framework.getPrinters();

        // Create the <table> element
        var table = document.createElement("table");

        // Create the header row of <th> elements in a <tr> in a <thead>
        var thead = document.createElement("thead");
        var header = document.createElement("tr");

        var createTableHeader = function(name)
        {
            var cell = document.createElement("th");
            cell.appendChild(document.createTextNode(name));
            header.appendChild(cell);
        };
        createTableHeader("printerType");
        createTableHeader("name");
        createTableHeader("modelName");
        createTableHeader("isLocal");
        createTableHeader("isConnected");
        createTableHeader("isTwinTurbo");
        createTableHeader("isAutoCutSupported");

        // Put the header into the table
        thead.appendChild(header);
        table.appendChild(thead);

        // The remaining rows of the table go in a <tbody>
        var tbody = document.createElement("tbody");
        table.appendChild(tbody);

        // Loop through all printers. Each one contains a row of the table
        var createPrinterRow = function(printer, row, propertyName)
        {
            var cell = document.createElement("td");

            // Put the text data into the HTML cell
            if (typeof printer[propertyName] != "undefined")
                cell.appendChild(document.createTextNode(printer[propertyName]));
            else
                cell.appendChild(document.createTextNode("n/a"));

            // Add the cell to the row
            row.appendChild(cell);
        };

        for (var r = 0; r < printers.length; r++)
        {
            // This is the XML element that holds the data for the row
            var printer = printers[r];
            // Create an HTML element to display the data in the row
            var row = document.createElement("tr");

            createPrinterRow(printer, row, "printerType");
            createPrinterRow(printer, row, "name");
            createPrinterRow(printer, row, "modelName");
            createPrinterRow(printer, row, "isLocal");
            createPrinterRow(printer, row, "isConnected");
            createPrinterRow(printer, row, "isTwinTurbo");
            createPrinterRow(printer, row, "isAutoCutSupported");

            // And add the row to the tbody of the table
            tbody.appendChild(row);
        }

        return table;
    }

    // updates printers information and insert it into the document 
    function updatePrintersTable()
    {
        var container = document.getElementById("printersInfoContainer");

        // remove previous table
        while (container.firstChild)
            container.removeChild(container.firstChild);

        container.appendChild(createPrintersTable());
    }


    // loads all supported printers into a combo box 
    function loadPrinters()
    {
        var printersSelect = document.getElementById('printersSelect');
        
        var printers = dymo.label.framework.getPrinters();
        if (printers.length == 0)
        {
            alert("No DYMO printers are installed. Install DYMO printers.");
            return;
        }

        for (var i = 0; i < printers.length; i++)
        {
            var printerName = printers[i].name;

            var option = document.createElement('option');
            option.value = printerName;
            option.appendChild(document.createTextNode(printerName));
            printersSelect.appendChild(option);
        }
    }

    var quoteslabel = '<?xml version="1.0" encoding="utf-8"?>\
<DieCutLabel Version="8.0" Units="twips">\
  <PaperOrientation>Landscape</PaperOrientation>\
  <Id>Storage</Id>\
  <PaperName>30258 Diskette</PaperName>\
  <DrawCommands>\
    <RoundRectangle X="0" Y="0" Width="3060" Height="3960" Rx="270" Ry="270"/>\
  </DrawCommands>\
  <ObjectInfo>\
    <ImageObject>\
      <Name>GRAPHIC_1</Name>\
      <ForeColor Alpha="255" Red="0" Green="0" Blue="0"/>\
      <BackColor Alpha="0" Red="255" Green="255" Blue="255"/>\
      <LinkedObjectName></LinkedObjectName>\
      <Rotation>Rotation180</Rotation>\
      <IsMirrored>False</IsMirrored>\
      <IsVariable>False</IsVariable>\
      <Image>iVBORw0KGgoAAAANSUhEUgAAANgAAADYCAYAAACJIC3tAAAAAXNSR0IArs4c6QAAFBFJREFUeAHtXduV20YSHe3x//Jz/WUoguVGYCiCpSMwFYGpCGYUgWYiEBWBqQgGikB0BAN/ef/MjWD33jGo4QNv9KOqUX0OTBDo7qq6t291ARzbNzfWDAFDwBAwBAwBQ8AQMAQMAUPAEDAEDAFDwBAwBAwBQ8AQMAQMAUPAEDAEDAFDwBAwBAwBQ8AQMAQMAUPAEDAEDAFDwBAYj8Cr8UN1jvzjj/+s4fnPOLLqwMdzK6pPfnzBccCx5/H99//guTVDYDACsxIYxLUCQr8ORunmpsQYio3CKyA4nluLjAD4XMKFRYsbJbgqW+57vzUbgVVkPALRNkL6An5AxwLHZxw72+GAQuBW8fm1p9kS/XgwQe55hBLeLAQGMiiqJxwuxIVprtoOV0xsV7D4uQA+M8xMcU3hs8T4AgdF5y1JJi+wSlzcuZY4QrQtjHxChixCGJubDY987skbDoqtdIXrHAT2EWCtXQE2YJ4Cfd+b0AYg1qMrBMZn6FWPrlO6FBjMJLmdMgnHJi0wkLFBjB+mgjRxfIHx70AWM6S1CQiAzzsMv50wxdChBwx4wHEP/ng+uCUrMJCxAhrMdlLaPRzhjjaKKClBxPIjMp/kbJTQkhQYyFgCED53LWItiAa7P0Fgu4Z7drkBAUF8UmisRrYNrl5dTk5gIIOioriWV9HGvcAy411cF/RZF8onfwt90wfNv/XppKwPX2pIE9cePr1XhqMUd6Xy2QufpASGbLdB1KtekYft9BYZ7xDWpH5rQvksgWzvZJlMiQgycgTO0lBa44uNO2lOSfdHMJ9vwGfRF78kBAYyFgj4CQc/JbU9yPiXJIc0+CKYz8HP0amUiHwdL01cXMtvNSxogT5K5LMETr1LwyOm6gWGbHeHYPJjQII+WRruBfmjwhXBfPL1/GEoiKpLRJCRI2CJz11WGg5diegvmM8dxPXTiJBu1O5gIIMloaS/1DjF337vOkWjx7lgPrlrjS711QoMQUus07mU+CBc8MTaIASk8slSf3BpeIxcpcCQ7TYIID8GIeiTRAx+EBbkfxRXBPPJUv9+CijqBAYylgj4w5SgPY4d9SDs0R/xU0vncyqAqgQGMhYImH86I7Hx79O2Eh2T6lPFp9Tn6K2LUl+VwLBQbnFwB5PY7MXGcFbIZzZ8mPcRB1hwwqcagSHb5Qh64x3acQaY7fbjhs5zFPhcIXKpfE56sXHKqIrfwapS4iscz06dF3J+gB+vITB+WuuBQMXnE7ouenQP3aUEl69dGdWyg/GlRuYqaMfzPJi4BiPK52iJ4mIgbwdH0zLgVcs9EbeqUkLqg7DTbCcCcM9OgM8NTDBhSmwFkuUbl46J3sGqUoLZTmp7L9UxiX6Bzwx+8cWG1ObkxcZpcKIFBkeZ6aSWEvwRcnsKpp13IiC5NPTyokqswJDtctC17qQsXgfn2S5eKP4tV6Vh7t/SKAsHjPJSjYgUmILSkLV6MYrKGQ5SUBryRVXpgxqRAkOgrNMzHwE7mtNLtnPkm8RpJJeG3L3ufYEmTmDIdksEu/EVsIN5bfcaACL4XKF7PmBI6K5ef2YRJzCgy2wnudnu1ZMdBaX+AaHc9wxnVDdRAgMh3LmWoyIJM8h2r2E4Sy4NGYnX3YsGXvEfEhrElcGPrzgWEvxp8OGNvdxoQObiMvjMcenx4rKkryW4fO3bIUk7mOTfvMiD7V49V6OC0pCRBCn1RQisynarnvzF6haEkFjBObbLUj9zPKfL6bh7bV1O2DSXCIHBOekvNkhI0QSiXX9BoCr1b1+uiDwLliyjCwyE3IGCTCQNL04FI+TFpNoz6cnyEGr3IoNRBVbV6r8IX0rBygnhOHS6Bz5Z5uedHeN2eAhpPqrAEKj0Fxvk4lNIQrTaqpIl+ZTcDnDuPqSD0QQGQpYIdB0y2BG2ghMywkcpQzZwJJPiTIMf3n/3urQbTWBwRHq2I1Y71OsUmbUWBJAsM9yW/mIjSrKMIjAltTqXlL3cIArdzZJlA0ZRBAZfNBDCH5bLBtzscoUAkmWO05UCQKIky+ACAyFrkJEpICTo2yYFeDS5qCFZbmMly6ACg7gWYEkDIXw1v2taUXb9LwSqZLlUgMenWD4GFRiC3OCgyKS3aIRIB+bon6JkyVK/OPod+jOYwCpCfgkd4Eh725Hj5jTMkmUPtoMJDL5oIYSv5sse2M22i6JkyVJ/G5OoIAIDIRmClP47yZEHKw+PSDR/8jnaSv1mfL7dCSIwWNMiLv4h6O4bOnZyhUCVLNdXN2ReuI/tlneBKSNkG5sQBfa1JEu+mj/ExtO7wBCgFkLIhZWHLStSWbIUweWrFjwn36oIeZo8UZgJ+ED8OowpnVbA5yM8zxV4L4ZL3zuYpt3Lnr1alANxUVg8NDQRuxeB8iYwZeUEsRBDCp0R2DQly60U/LwJDAGupQTZww+WFPse/WbZRdnutQeXpRSivAgMhCwQoJa/2iAXVh62r0hNu5eoSsSLwMDVBgdFpqWJIkUSaMp2L0InKlk6F5jC3cvKw3ZFa9q9RJWHhNW5wDDnCoem3auAv9ZqEECyXOJyXnNL6iVxlYgPgWnKeFwon6WuFgF+aXqOJlyiykM65FRgyHhrzJnh0NQKTc6G8hVcZrC1DmXPgR1x5SFjciowzPezA6BCTkFSDiENKrKlrRIpJGLrTGAK63XyYeVhzapUuHuJ5dKZwBChtnqdpBT8h7UrBNZXV4RfQCVSSHTRicCQ8fjWcC0xwA6f9h33Z3e74lJbsiykEuVEYAhuIzXAFr/s+asenBUuM2Fqal+kOutKYNpebpAP273qV6W2lxuMoqgPJf7VyQJDScGMl8UPZbAHvw0ekfgAcJkjxExhmGKT5WSBgQyNuxfXkFhSIi5wjVzyT90OETFrNT1JYMh4GWbnDqauSX3rFAvIist1LPsT7IpOlJMEBlA0EkIuS/7D2hkC67Nver6ILvWnCkxjScGlU+pZP8E81cplmjuY4gdirljRpASTVGUIXLLMz0LbdWTv4GgeL9NM2cG0ZjwC+V8vaOqd9N9aXZf+LD1FYMx6WpvtYBVz2L0WOF1rJVK636MEBlJICInR2g5aHffg98rDnKGm3IcyNNbOKIHBmNqSYixQCY/TXOqLT5SDBVaVFJqzHrUiPvOFEDS4zGAnD2FrrjYGCwxAaRfXjeRf/gMvRPVcBsZrsLkxArPycDDMYgdoLg8JqvhKZJDAEikPxa72kI5V5eEypE0PtsT/3DJIYADISgoPqyTSlMZlAOCHCuzHAD6ZiTAIpFDqi1+PQwVmWS/M4vdqpSr1c69GbPJnBHoLDKRQXIsUcEMsyxTimBCDJcoJ4A0Z2ltgmFT8djwg8CQSxYB4L7umxOVlbKK+DxGYZT1R1E1yJhUu80koBBjcS2DVK90sgD+hTCxDGZJmpyqP576DB6Oll8DgTR7MozCG5rzAUtm9nleK9OfpvgJL4ZXuqXT/efplZuepPX9lkvnrK7BcchAjfMtGjEllSJ5KIFUcosv9ToElWrOLJsWXAMBlauIiVKJ35E6BIYAUSblJdLFxwbW1vO2m0nuik2UfgYnOEBMWhWhiJsTVNjRFLheSX3T0EVjexpjieykuti46UuVSbFytAkNmyMDYAkeKLU8xqKaYEi+Jf26KO/b1VoHBuTy2gx7ts7RYeZxf2tQpl8TLajOQhvlNl8BS/70otd/32hZY6lyKTJZdAsvbGEvgnkhSPOGa8g5GyH7xhNukabsEljopLBPXkxDUMzh1LjOJz5mNApPorKe1LPYB2VW8M+Ly1hVmruZpFBgMZK6MCJ8nn8ECTH33Oi4xcVy2CSz1h+IjKfxMfRf74TTYxM9F7WJtAptL1uN6Wye+i82JS+5iaylJxAT2woSozPfilpOzOQmMgH2AyBZOkJs4Sa3AKudEODgxviHDmflWQwZo6DtTLrl2P0rgp1ZgcGwpwbkIPnyUkvkcxj5XLlfgcu0Qx1FTmcDOYROT+c7dmvQtmzRa92CWilETTJPAuNDm2pj57hIKPksolqGhcB0/xqxKmgT249BIEut/K6G8cITpD47m0TrNUWRZjACaBDbnHezIA5/HNscvij8zxb67cn2Jib6CT34GbU0CC+5I0Kj7G2MNr/3Fx6J/uEn3JA4U2SZklE0CC+mDdFtrOMg6PpfuaIN/lizPgWHSJJ/Z+WU/315dTlstpMfL6/b9GYEt/vlO0/+CFnz+z7irReCAqw847n3yaTtYLfaNF9e484RFexcqAzZ60uMGfLTdqxmnBW7d4jjyye/OW53AjJR2mE+J+YhFvGrvHvWul0UTNSL3xo98/gkunfNZVyLeIQYq21p/BA7ousPxGUfhs+To79LNDRZMjv5W7g8B7a++zvj8brhtG1GDALPgujq4sPc4L3D8hqOE4Hgeoy1jGE3AZh2f5PQLjkF81gnsxwQAih0CF/a3xQ3B0Z/y5PidF9C8PmBjfi4Ua9MROPK55lQtfO6QTPen5uoEdnrfzt0hkGEqHqetxJft6QU7V4NABk95XLYzgdW95LgcYN/9IZD5m9pmloBAncCsrJDAjBsffnAzjc3SE4G/X/arExjrTWtpIJClEYaaKK60UycwNdGYo4aAdARMYNIZMv9UI2ACU02fOS8dAROYdIbMP9UImMBU02fOS0fABCadIfNPNQImMNX0mfPSETgTGP7GKpPusPlnCGhC4ExgcPygyXnz1RAQhgD/2v6snQlMyr/HdOahfTEEFCNwJjDFcZjrhoBIBExgcWkpPJu3kt8zwF3Tm8C6ENJ9n/9GtbVwCFwlNBNYOPDNUvoI7C9DNIFdImLfDQGHCJjAHII5dKoA/zGcq5JlqI/WfxACV3jXCawYNKV1lozAVcki2Vntvl3+B28YT53AtMepxf+rbKfFcfOzPwImsP5Yue4ZYncpXTtt8zUiUMtnncCu/tyjcUq7IRoBlCylaAfTcq62IqkTWFphy42mDORaLfGBbM/JTC2fdQKr7TgnpALF+nsgO7WlSyDbczJTy6cJLN4SCLWzlPFCnJXlWpxNYPHWQKidpTazxgs7Wcv9BGYPxsEWQKgdLJSQgwEn0VDTHw3U7WD030jxzGLdj5KeTJae5rVpXxBoTJZNAjNSXsDzcRYM34BC9oGTljkbN6Qmgdm/5uCX2mACq8Io/IYz+9kbfztuElijImcPpRsAGglxM/3VLMbnFSROL5RNs5nAmpDxe72REE9mQwvaUxhipy2aPKsVWPUmsWwaZNcnIxB6RwltbzJAiiY4VHqpdblWYFXPonaEXZyMQOgXD5YwJ1PWNkHRdrNNYPaiow258fdaCRk/befIXWcP6zAGgdbyu01gRsgYuLvHxCrXWhdCt9vWowGBouH68+VGgVlZ0QbbpHtRFjr4tIQ5ibbawWVXud8osGo6I6UW10kXi0mjpw02Pqfhdzm6uLxw+b1LYFGy7aWTCX3fI+MdIsbzOaLtFE134tkqsKqsiLkgUiOliBkQ+NzCvvHphgS+nu+sCFoFVvlBUqy5QeCTm2kmzdK5KCbNPp/BvXDsIzAJiyIF2jofiAMF+RDITupmeuHYKTBsg3sgxcPaNAR6ZbxpJrpHV3wW3T2tRwsCvZNlp8AqI73U2uKQ3bq5kVQJGJ/TVuT7vsNf9e2I/73sn+i76Nvf+p0hwLeH/zq7EvkL+HyCC1lkNzSYP1Zwv8FZ8lgMcfq7AZ2Z9W4H9LeuLwhI3DGYhT++uGhnFQIFPr/g4Ofkn1WG7GDcvZj1bBcDCB2txH1mvuesh88Cme+AT1ENu9gjHMpFORXWGXJS4HgWVPV86tSD3gKjVRByhw/bxQjGSytxehRTwXOJYoJfVw185rhIkc2pFQj2Mw4mPfLmtQ0SGD2x2v1ZTAWgYNajmEp8qm3g81c4v1IbQLfjJbrscHwBV/wM2oY8gx0de4cTkjKXViLQAscx6x1wnlIjnzmORUJB7RHLJxy72Alw8A5GEpD1Uq/dmem4Q0UniHj7buBzAxsffNvxPD85YxIkZwfPtnpPP1ZgGSw89bYivyMJORIk8oWEbwiVJs0jZ6JEdcrVKIFxAhByh49bnitt30QVozaXhhn4zODTVxwLab5d+CNeVKf+jhYYJwEpJGR5OqGC82eCIKqtAl+Dugg+VzAo8fm6hF8PONSV7FMFRnFRZNJbCQdVEhQaWIjsA2xuQtttsLfF9U9IhkXDffGXJwmM0YEQkkFSJLYtnFJNUAxQI1cmJTnDcS/pZcVYHiYLjIZBCMsKlhcSWgknkiEoBqDgcwG7fFO8DGh/D1sPqZXurgQWg5BL7pMk6DLIUN8hMoqLIiO3PluByd9rLgPbwHEiMBoISMhlPAUuJEvQZbAhv3vmdBa8ORMYia8ICfXSYxYEEdeYzYPISsTzNtUd65IrpwLj5CBkjY+PPPfUCsxrO5YncOumdSSyA+Z+l9ozVh1ep9ecC4yTexJZgalNWAQ4QqtExsTJZ7Oh7T0GJPFWcGjgXgRGJxyKbI/pmPkKzmstHgLglC88+MY47+lFgX4sB8ue/ZPr5k1gRGqiyGZZUmhYYeCVv3tuWnwld6w27lv6zOKWV4ERQZCxwgdLiwW/92yzLSl64hO9WwuvBZz7CeKiyGbfvAuMCIOMJT4ecXSJrECfWZcUiF9NA6/kk8lzheOAw3YtgHDaggiMBisymup3kkNh7U6ds3MdCFS7We//VqCOqNx4GUxgR3dBxh3Ob4/f8XmPg5mPIrNmCBgCUxGAyHIcj/ycOpeNNwQMAUPAEDAEDAFDwBAwBAwBQ8AQMAQMAUPAEDAEDAFDwBAwBAwBQ8AQMAQMAUPAEDAEDAFDwBAwBAwBQ6Abgf8DKCP7h/7y2qcAAAAASUVORK5CYII=</Image>\
      <ScaleMode>Uniform</ScaleMode>\
      <BorderWidth>0</BorderWidth>\
      <BorderColor Alpha="255" Red="0" Green="0" Blue="0"/>\
      <HorizontalAlignment>Center</HorizontalAlignment>\
      <VerticalAlignment>Center</VerticalAlignment>\
    </ImageObject>\
    <Bounds X="2089.459" Y="1444.006" Width="1013.594" Height="983.5156"/>\
  </ObjectInfo>\
  <ObjectInfo>\
    <ImageObject>\
      <Name>GRAPHIC</Name>\
      <ForeColor Alpha="255" Red="0" Green="0" Blue="0"/>\
      <BackColor Alpha="0" Red="255" Green="255" Blue="255"/>\
      <LinkedObjectName></LinkedObjectName>\
      <Rotation>Rotation0</Rotation>\
      <IsMirrored>False</IsMirrored>\
      <IsVariable>False</IsVariable>\
      <Image>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</Image>\
      <ScaleMode>Uniform</ScaleMode>\
      <BorderWidth>0</BorderWidth>\
      <BorderColor Alpha="255" Red="0" Green="0" Blue="0"/>\
      <HorizontalAlignment>Center</HorizontalAlignment>\
      <VerticalAlignment>Center</VerticalAlignment>\
    </ImageObject>\
    <Bounds X="316.7999" Y="272.3654" Width="978.0469" Height="1105.234"/>\
  </ObjectInfo>\
  <ObjectInfo>\
    <TextObject>\
      <Name>TEXT</Name>\
      <ForeColor Alpha="255" Red="0" Green="0" Blue="0"/>\
      <BackColor Alpha="0" Red="255" Green="255" Blue="255"/>\
      <LinkedObjectName></LinkedObjectName>\
      <Rotation>Rotation0</Rotation>\
      <IsMirrored>False</IsMirrored>\
      <IsVariable>True</IsVariable>\
      <HorizontalAlignment>Left</HorizontalAlignment>\
      <VerticalAlignment>Top</VerticalAlignment>\
      <TextFitMode>AlwaysFit</TextFitMode>\
      <UseFullFontHeight>True</UseFullFontHeight>\
      <Verticalized>False</Verticalized>\
      <StyledText>\
        <Element>\
          <String>I know not\n\
what I said,\n\
but my anger\n\
gave me words.</String>\
          <Attributes>\
            <Font Family="Helvetica" Size="72" Bold="False" Italic="False" Underline="False" Strikeout="False"/>\
            <ForeColor Alpha="255" Red="0" Green="0" Blue="0"/>\
          </Attributes>\
        </Element>\
      </StyledText>\
    </TextObject>\
    <Bounds X="316.7999" Y="248.7717" Width="3488.128" Height="2063.122"/>\
  </ObjectInfo>\
  <ObjectInfo>\
    <TextObject>\
      <Name>TEXT_1</Name>\
      <ForeColor Alpha="255" Red="0" Green="0" Blue="0"/>\
      <BackColor Alpha="0" Red="255" Green="255" Blue="255"/>\
      <LinkedObjectName></LinkedObjectName>\
      <Rotation>Rotation0</Rotation>\
      <IsMirrored>False</IsMirrored>\
      <IsVariable>False</IsVariable>\
      <HorizontalAlignment>Left</HorizontalAlignment>\
      <VerticalAlignment>Middle</VerticalAlignment>\
      <TextFitMode>ShrinkToFit</TextFitMode>\
      <UseFullFontHeight>True</UseFullFontHeight>\
      <Verticalized>False</Verticalized>\
      <StyledText>\
        <Element>\
          <String>Tennessee Sketches\n</String>\
          <Attributes>\
            <Font Family="Helvetica" Size="13" Bold="True" Italic="False" Underline="False" Strikeout="False"/>\
            <ForeColor Alpha="255" Red="0" Green="0" Blue="0"/>\
          </Attributes>\
        </Element>\
        <Element>\
          <String>\
by Louisa Preston Looney\n\
Forgotten since November 1903</String>\
          <Attributes>\
            <Font Family="Helvetica" Size="13" Bold="False" Italic="False" Underline="False" Strikeout="False"/>\
            <ForeColor Alpha="255" Red="0" Green="0" Blue="0"/>\
          </Attributes>\
        </Element>\
      </StyledText>\
    </TextObject>\
    <Bounds X="316.7999" Y="2297.362" Width="3366.331" Height="600"/>\
  </ObjectInfo>\
</DieCutLabel>';

    // any label layout is a simple layout with one Text object
    var dieCutLabelLayout = '<?xml version="1.0" encoding="utf-8"?>\
    <DieCutLabel Version="8.0" Units="twips">\
        <PaperOrientation>Landscape</PaperOrientation>\
        <Id>Address</Id>\
        <PaperName>30252 Address</PaperName>\
        <DrawCommands/>\
        <ObjectInfo>\
            <TextObject>\
                <Name>Text</Name>\
                <ForeColor Alpha="255" Red="0" Green="0" Blue="0" />\
                <BackColor Alpha="0" Red="255" Green="255" Blue="255" />\
                <LinkedObjectName></LinkedObjectName>\
                <Rotation>Rotation0</Rotation>\
                <IsMirrored>False</IsMirrored>\
                <IsVariable>True</IsVariable>\
                <HorizontalAlignment>Left</HorizontalAlignment>\
                <VerticalAlignment>Middle</VerticalAlignment>\
                <TextFitMode>AlwaysFit</TextFitMode>\
                <UseFullFontHeight>True</UseFullFontHeight>\
                <Verticalized>False</Verticalized>\
                <StyledText/>\
            </TextObject>\
            <Bounds X="332" Y="150" Width="4455" Height="1260" />\
        </ObjectInfo>\
    </DieCutLabel>';

    var continuousLabelLayout = '<?xml version="1.0" encoding="utf-8"?>\
<ContinuousLabel Version="8.0" Units="twips">\
    <PaperOrientation>Landscape</PaperOrientation>\
    <Id>Tape19mm</Id>\
    <PaperName>19mm</PaperName>\
    <LengthMode>Auto</LengthMode>\
    <LabelLength>0</LabelLength>\
    <RootCell>\
            <TextObject>\
                <Name>Text</Name>\
                <ForeColor Alpha="255" Red="0" Green="0" Blue="0" />\
                <BackColor Alpha="0" Red="255" Green="255" Blue="255" />\
                <LinkedObjectName></LinkedObjectName>\
                <Rotation>Rotation0</Rotation>\
                <IsMirrored>False</IsMirrored>\
                <IsVariable>True</IsVariable>\
                <HorizontalAlignment>Left</HorizontalAlignment>\
                <VerticalAlignment>Middle</VerticalAlignment>\
                <TextFitMode>AlwaysFit</TextFitMode>\
                <UseFullFontHeight>False</UseFullFontHeight>\
                <Verticalized>False</Verticalized>\
                <StyledText/>\
            </TextObject>\
            <ObjectMargin Left="0" Top="0" Right="0" Bottom="0" />\
        <Length>0</Length>\
        <LengthMode>Auto</LengthMode>\
        <BorderWidth>0</BorderWidth>\
        <BorderStyle>Solid</BorderStyle>\
        <BorderColor Alpha="255" Red="0" Green="0" Blue="0" />\
    </RootCell>\
</ContinuousLabel>';

    // prints printers information
    function print(printerName)
    {
        var printers = dymo.label.framework.getPrinters();
        var printer = printers[printerName];
        if (!printer)
        {
            alert("Printer '" + printerName + "' not found");
            return;
        }

        // select label layout/template based on printer type
        var labelXml;
        if (printer.printerType == "LabelWriterPrinter")
            labelXml = quoteslabel;
        else if (printer.printerType == "TapePrinter")
            labelXml = continuousLabelLayout;
        else
        {
            alert("Unsupported printer type");
            throw "Unsupported printer type";
        }

        // create label set to print printers' data
        var labelSetBuilder = new dymo.label.framework.LabelSetBuilder();
        for (var i = 0; i < printers.length; i++)
        {
            var printer = printers[i];

            // process each printer info as a separate label
            var record = labelSetBuilder.addRecord();

            // compose text data
            // use framework's text markup feature to set text formatting
            // because text markup is xml you can use any xml tools to compose it
            // here we will use simple text manipulations t oavoid cross-browser compatibility.
            var info = "<font family='Courier New' size='14'>"; // default font
            info = info + "Printer: <b>" + printer.name + "\n</b>"; 
            info = info + "PrinterType: " + printer.printerType;
            info = info + "\n<font size='10'>is local: " + printer.isLocal;
            info = info + "\nis online: " + printer.isConnected + "</font>";

            if (typeof printer.isTwinTurbo != "undefined")
            {
                if (printer.isTwinTurbo)
                    info = info + "<i><u><br/>The printer is TwinTurbo!!!</u></i>";
                else
                    info = info + "<font size='6'><br/>Oops, the printer is NOT TwinTurbo</font>";
            }

            if (typeof printer.isAutoCutSupported != "undefined")
            {
                if (printer.isAutoCutSupported)
                    info = info + "<i><u><br/>The printer supports auto-cut!!!</u></i>";
                else
                    info = info + "<font size='6'><br/>The printer does not supports auto-cut</font>";
            }

            info = info + "</font>";

            // when printing put info into object with name "Text"
            record.setTextMarkup("Text", info);
        }

        // finally print label with default printing parameters
        dymo.label.framework.printLabel(printerName, "", labelXml, labelSetBuilder);
    }

    // called when the document completly loaded
    function onload()
    {
                var socket = io.connect('//localhost:3000');

        socket.on('status', function(data) {
                console.log(status);
                $('#buttonstatus').text(data.val);

                if (data.val === 1){
                    $( ".book" ).fadeIn().delay(500).fadeOut();
                    console.log("print!");
                    //console.log(quoteslabel);
                    //print(printersSelect.value);
                    var rando = Math.abs(Math.floor((Math.random() * 2) - 1));;
                    generate(rando);
                }

            });
        socket.on('error', function() { console.error(arguments) });
        socket.on('message', function() { console.log(arguments) });


        var printButton = document.getElementById('printButton');
        var updateTableButton = document.getElementById('updateTableButton');
        var printersSelect = document.getElementById('printersSelect');
        
        // setup event handlers
        printButton.onclick = function()
        {
            print(printersSelect.value);
        }
        
        updateTableButton.onclick = updatePrintersTable;

        updatePrintersTable();
        // load printers list on startup
        loadPrinters();
    };

    // register onload event
    if (window.addEventListener)
        window.addEventListener("load", onload, false);
    else if (window.attachEvent)
        window.attachEvent("onload", onload);
    else
        window.onload = onload;

} ());