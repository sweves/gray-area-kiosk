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
    <TextObject>\
      <Name>quoteslot</Name>\
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
          <String>Tennessee Sketches</String>\
          <Attributes>\
            <Font Family="Helvetica" Size="13" Bold="True" Italic="False" Underline="False" Strikeout="False"/>\
            <ForeColor Alpha="255" Red="0" Green="0" Blue="0"/>\
          </Attributes>\
        </Element>\
        <Element>\
          <String>\
by Louisa Preston Looney\
Forgotten since November 1903</String>\
          <Attributes>\
            <Font Family="Helvetica" Size="13" Bold="False" Italic="False" Underline="False" Strikeout="False"/>\
            <ForeColor Alpha="255" Red="0" Green="0" Blue="0"/>\
          </Attributes>\
        </Element>\
      </StyledText>\
    </TextObject>\
    <Bounds X="316.7999" Y="2181.034" Width="3152.737" Height="600"/>\
  </ObjectInfo>\
  <ObjectInfo>\
    <TextObject>\
      <Name>Puthere</Name>\
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
          <String>I know not\
what I said,\
but my anger\
gave me words.</String>\
          <Attributes>\
            <Font Family="Helvetica" Size="72" Bold="False" Italic="False" Underline="False" Strikeout="False"/>\
            <ForeColor Alpha="255" Red="0" Green="0" Blue="0"/>\
          </Attributes>\
        </Element>\
      </StyledText>\
    </TextObject>\
    <Bounds X="316.7999" Y="447.3654" Width="2456.409" Height="1777.575"/>\
  </ObjectInfo>\
</DieCutLabel>\
';

    // any label layout is a simple layout with one Text object
    var dieCutLabelLayout = '<?xml version="1.0" encoding="utf-8"?>\
    <DieCutLabel Version="8.0" Units="twips">\
        <PaperOrientation>Landscape</PaperOrientation>\
        <Id>Address</Id>\
        <PaperName>30252 Address</PaperName>\
        <DrawCommands/>\
        <ObjectInfo>\
            <TextObject>\
                <Name>Puthere</Name>\
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
                <Name>Puthere</Name>\
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
            //labelXml = dieCutLabelLayout;
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

            var quote = "<font>"; // default font
            quote = quote + quotetext;
            quote = quote + "</font>";  


            record.setTextMarkup("Puthere", quote);

            // compose text data
            // use framework's text markup feature to set text formatting
            // because text markup is xml you can use any xml tools to compose it
            // here we will use simple text manipulations t oavoid cross-browser compatibility.
            var info = "<font family='Courier New' size='12'>"; // default font
            info = info + "<b>" + title + "\n</b>"; 
            info = info + author;
            info = info + "\nForgotten Since: " + sincedate;
            info = info + "</font>";            

            // when printing put info into object with name "Text"
            record.setTextMarkup("quoteslot", info);
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
                    $( ".book" ).fadeIn().delay(5000).fadeOut();
                    console.log("print!");
                    //console.log(quoteslabel);

                    generate();
                    print(printersSelect.value);
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
            //print(printersSelect.value);
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