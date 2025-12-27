/*
   Licensed to the Apache Software Foundation (ASF) under one or more
   contributor license agreements.  See the NOTICE file distributed with
   this work for additional information regarding copyright ownership.
   The ASF licenses this file to You under the Apache License, Version 2.0
   (the "License"); you may not use this file except in compliance with
   the License.  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
var showControllersOnly = false;
var seriesFilter = "";
var filtersOnlySampleSeries = true;

/*
 * Add header in statistics table to group metrics by category
 * format
 *
 */
function summaryTableHeader(header) {
    var newRow = header.insertRow(-1);
    newRow.className = "tablesorter-no-sort";
    var cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Requests";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 3;
    cell.innerHTML = "Executions";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 7;
    cell.innerHTML = "Response Times (ms)";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Throughput";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 2;
    cell.innerHTML = "Network (KB/sec)";
    newRow.appendChild(cell);
}

/*
 * Populates the table identified by id parameter with the specified data and
 * format
 *
 */
function createTable(table, info, formatter, defaultSorts, seriesIndex, headerCreator) {
    var tableRef = table[0];

    // Create header and populate it with data.titles array
    var header = tableRef.createTHead();

    // Call callback is available
    if(headerCreator) {
        headerCreator(header);
    }

    var newRow = header.insertRow(-1);
    for (var index = 0; index < info.titles.length; index++) {
        var cell = document.createElement('th');
        cell.innerHTML = info.titles[index];
        newRow.appendChild(cell);
    }

    var tBody;

    // Create overall body if defined
    if(info.overall){
        tBody = document.createElement('tbody');
        tBody.className = "tablesorter-no-sort";
        tableRef.appendChild(tBody);
        var newRow = tBody.insertRow(-1);
        var data = info.overall.data;
        for(var index=0;index < data.length; index++){
            var cell = newRow.insertCell(-1);
            cell.innerHTML = formatter ? formatter(index, data[index]): data[index];
        }
    }

    // Create regular body
    tBody = document.createElement('tbody');
    tableRef.appendChild(tBody);

    var regexp;
    if(seriesFilter) {
        regexp = new RegExp(seriesFilter, 'i');
    }
    // Populate body with data.items array
    for(var index=0; index < info.items.length; index++){
        var item = info.items[index];
        if((!regexp || filtersOnlySampleSeries && !info.supportsControllersDiscrimination || regexp.test(item.data[seriesIndex]))
                &&
                (!showControllersOnly || !info.supportsControllersDiscrimination || item.isController)){
            if(item.data.length > 0) {
                var newRow = tBody.insertRow(-1);
                for(var col=0; col < item.data.length; col++){
                    var cell = newRow.insertCell(-1);
                    cell.innerHTML = formatter ? formatter(col, item.data[col]) : item.data[col];
                }
            }
        }
    }

    // Add support of columns sort
    table.tablesorter({sortList : defaultSorts});
}

$(document).ready(function() {

    // Customize table sorter default options
    $.extend( $.tablesorter.defaults, {
        theme: 'blue',
        cssInfoBlock: "tablesorter-no-sort",
        widthFixed: true,
        widgets: ['zebra']
    });

    var data = {"OkPercent": 99.77386785154623, "KoPercent": 0.22613214845377183};
    var dataset = [
        {
            "label" : "FAIL",
            "data" : data.KoPercent,
            "color" : "#FF6347"
        },
        {
            "label" : "PASS",
            "data" : data.OkPercent,
            "color" : "#9ACD32"
        }];
    $.plot($("#flot-requests-summary"), dataset, {
        series : {
            pie : {
                show : true,
                radius : 1,
                label : {
                    show : true,
                    radius : 3 / 4,
                    formatter : function(label, series) {
                        return '<div style="font-size:8pt;text-align:center;padding:2px;color:white;">'
                            + label
                            + '<br/>'
                            + Math.round10(series.percent, -2)
                            + '%</div>';
                    },
                    background : {
                        opacity : 0.5,
                        color : '#000'
                    }
                }
            }
        },
        legend : {
            show : true
        }
    });

    // Creates APDEX table
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.9723682383512189, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [0.9995250158328056, 500, 1500, "Create Booking (POST)"], "isController": false}, {"data": [0.9947552447552448, 500, 1500, "Partial Update of Booking (PATCH)"], "isController": false}, {"data": [0.9985736925515055, 500, 1500, "Getting booking IDs"], "isController": false}, {"data": [0.854649317676928, 500, 1500, "Get All Booking"], "isController": false}, {"data": [1.0, 500, 1500, "Debug Sampler"], "isController": false}, {"data": [0.9950778024769769, 500, 1500, "UpdateBooking (PUT)"], "isController": false}, {"data": [0.9429609732975194, 500, 1500, "Create Auth (POST)"], "isController": false}, {"data": [0.9936376650230635, 500, 1500, "Delete Booking (DELETE)"], "isController": false}]}, function(index, item){
        switch(index){
            case 0:
                item = item.toFixed(3);
                break;
            case 1:
            case 2:
                item = formatDuration(item);
                break;
        }
        return item;
    }, [[0, 0]], 3);

    // Create statistics table
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 50413, 114, 0.22613214845377183, 273.31497827941104, 0, 6475, 241.0, 478.0, 486.0, 493.0, 167.86316020804338, 695.1779276441204, 44.08726625609346], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["Create Booking (POST)", 6316, 0, 0.0, 244.26725775807458, 226, 6235, 240.0, 256.0, 263.0, 271.0, 21.07848699448008, 19.40034508888941, 10.20987258336615], "isController": false}, {"data": ["Partial Update of Booking (PATCH)", 6292, 33, 0.5244755244755245, 244.86760966306446, 227, 6241, 241.0, 259.0, 266.0, 274.0, 21.131112305212252, 18.95743753883161, 6.662808868719774], "isController": false}, {"data": ["Getting booking IDs", 6310, 9, 0.14263074484944532, 249.71759112519894, 226, 6243, 240.0, 257.0, 265.0, 272.0, 21.100432709349064, 18.8206014657862, 3.4592491100867426], "isController": false}, {"data": ["Get All Booking", 6302, 0, 0.0, 453.00618851158265, 226, 6242, 469.0, 768.0, 791.0, 813.0, 21.086373157200885, 580.9792068707213, 2.841718257513401], "isController": false}, {"data": ["Debug Sampler", 6279, 0, 0.0, 0.022933588150979473, 0, 2, 0.0, 0.0, 0.0, 1.0, 21.147893799110165, 10.196759834242142, 0.0], "isController": false}, {"data": ["UpdateBooking (PUT)", 6298, 31, 0.4922197523023182, 253.5025404890439, 227, 6237, 241.0, 259.0, 267.0, 274.0, 21.132738968059297, 19.0012203680697, 10.336788609275857], "isController": false}, {"data": ["Create Auth (POST)", 6329, 1, 0.015800284405119294, 490.6264812766645, 452, 6475, 480.0, 512.0, 526.0, 541.0, 21.074047189350097, 15.881609338268591, 5.145031052087426], "isController": false}, {"data": ["Delete Booking (DELETE)", 6287, 40, 0.6362334976936536, 248.55861301097488, 226, 6244, 241.0, 258.0, 266.0, 274.0, 21.1297190658157, 15.447429158348541, 5.671911943189723], "isController": false}]}, function(index, item){
        switch(index){
            // Errors pct
            case 3:
                item = item.toFixed(2) + '%';
                break;
            // Mean
            case 4:
            // Mean
            case 7:
            // Median
            case 8:
            // Percentile 1
            case 9:
            // Percentile 2
            case 10:
            // Percentile 3
            case 11:
            // Throughput
            case 12:
            // Kbytes/s
            case 13:
            // Sent Kbytes/s
                item = item.toFixed(2);
                break;
        }
        return item;
    }, [[0, 0]], 0, summaryTableHeader);

    // Create error table
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": [{"data": ["503/Service Unavailable", 1, 0.8771929824561403, 0.0019836153373137882], "isController": false}, {"data": ["403/Forbidden", 104, 91.2280701754386, 0.20629599508063395], "isController": false}, {"data": ["404/Not Found", 9, 7.894736842105263, 0.01785253803582409], "isController": false}]}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 50413, 114, "403/Forbidden", 104, "404/Not Found", 9, "503/Service Unavailable", 1, "", "", "", ""], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": ["Partial Update of Booking (PATCH)", 6292, 33, "403/Forbidden", 33, "", "", "", "", "", "", "", ""], "isController": false}, {"data": ["Getting booking IDs", 6310, 9, "404/Not Found", 9, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["UpdateBooking (PUT)", 6298, 31, "403/Forbidden", 31, "", "", "", "", "", "", "", ""], "isController": false}, {"data": ["Create Auth (POST)", 6329, 1, "503/Service Unavailable", 1, "", "", "", "", "", "", "", ""], "isController": false}, {"data": ["Delete Booking (DELETE)", 6287, 40, "403/Forbidden", 40, "", "", "", "", "", "", "", ""], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
