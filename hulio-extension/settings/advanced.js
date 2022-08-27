// Saves options to chrome.storage
function save_options() {
    var debugCBox = document.getElementById('debugCBox').checked;
    chrome.storage.local.set({
      debugCBox: debugCBox,
    }, function() {
      // Update status to let user know options were saved.
      var status = document.getElementById('status');
      status.textContent = 'Options saved.';
      setTimeout(function() {
        status.textContent = '';
      }, 750);
    });
  }
  
  // Restores select box and checkbox state using the preferences
  // stored in chrome.storage.
  function restore_options() {
    // Use default value color = 'red' and likesColor = true.
    chrome.storage.local.get({
      debugCBox: false,
    }, function(items) {
      document.getElementById('debugCBox').checked = items.debugCBox;
    });
  }

function updateIgnoreSitesList () {
  //Pull list from somewhere and update the list
  //Needs to be coded
  //Then generate the new regex filter
  //Needs to be coded
  //Update updateStatus text, then clear it
  var ignoreSitesListUrl = "https://idealistworld.github.io/hulio/ignoreSitesList.txt";
  var ignoreSitesList;
  $.get(ignoreSitesListUrl, function( data ) {
    ignoreSitesList = data.split("\n");
      chrome.storage.local.set({
        ignoreSitesList: ignoreSitesList,
      }, function() {
        // Update status to let user know sites were updated.
        var updateStatus = document.getElementById('updateIgnoreSitesStatus');
        updateStatus.textContent = 'Ignore Sites List updated.';
        setTimeout(function() {
          updateStatus.textContent = '';
        }, 750);
      });
  });
}

function showIgnoreWarnRetype() {
  chrome.storage.local.get({
    ignoreWarnRetypeList: [],
  }, function(items) {
    alert('Ignore Warn Retype list: ' + items.ignoreWarnRetypeList + 'Type:' + typeof(items.ignoreWarnRetypeList));
  });
}

function showIgnoreWarn() {
  chrome.storage.local.get({
    ignoreWarnList: [],
  }, function(items) {
    alert('Ignore Warn list: ' + items.ignoreWarnList);
  });
}

function showTutorialCompleteList() {
  chrome.storage.local.get({
    tutorialCompleteList: [],
  }, function(items) {
    alert('Tutorial Complete List: ' + items.tutorialCompleteList)
});
}

//This function shwos all the lists and strings that are currently in storage. 
function showAll () {
  chrome.storage.local.get({
    ignoreSitesList: [],
    ignoreWarnList: [],
    ignoreWarnRetypeList: [],
  }, function(items) {
    alert('Ignore Sites List: ' + items.ignoreSitesList + 
    '\n Ignore Warn List: ' + items.ignoreWarnList + 
    '\n Ignore Warn Retype List: ' + items.ignoreWarnRetypeList);
  });
}

function pullSafeDB () {
  $.getJSON('https://hulio-backend.herokuapp.com/api/website/get_websites', function(json_data){
    if (json_data.status === "success") {
      chrome.storage.local.set({
        SafeDB: json_data.result,
      }, function() {
        // Update status to let user know options were saved.
        var status = document.getElementById('pullSafeDBstatus');
        status.textContent = 'DB pulled.';
        setTimeout(function() {
          status.textContent = '';
        }, 750);
      });
    } else {
      alert("Couldn't Acess backend")
    }
  });
}

function printSafeDB () {
  setTimeout(function() {
    chrome.storage.local.get({
      SafeDB: '',
    }, function(items) {
      alert(JSON.stringify(items.SafeDB));
    });
  }, 500);
}

function clearSafeDB () {
  chrome.storage.local.set({
    SafeDB: [],
  }, function() {
    // Update status to let user know what happaned. 
    var status = document.getElementById('clearSafeDBstatus');
    status.textContent = 'DB Cleared.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}


window.onload=function(){
    //Using the vars el1, el2 here to avoid a bug where it said document.getElementById('save') was null
    var el1 = document.getElementById('save')
    if (el1) {
        el1.addEventListener('click', save_options);
    }
    var el2 = document.getElementById('pullSafeDB')
    if (el2) {
      el2.addEventListener('click', pullSafeDB)
    }
    var elClearSafeDB = document.getElementById('clearSafeDB')
    if (elClearSafeDB) {
      elClearSafeDB.addEventListener('click', clearSafeDB)
    }
    var el3 = document.getElementById('updateIgnoreSitesButton')
    if (el3) {
      el3.addEventListener('click', updateIgnoreSitesList)
    }
    var el4 = document.getElementById('showIgnoreWarnRetypeSites')
    if (el4) { 
      el4.addEventListener('click', showIgnoreWarnRetype)
    }
    var el5 = document.getElementById('showIgnoreWarnSites')
    if (el5) {
      el5.addEventListener('click', showIgnoreWarn)
    }
    var el6 = document.getElementById('showAllLists')
    if (el6) {
      el6.addEventListener('click', showAll)
    }
    var el8 = document.getElementById('printSafeDB')
    if (el8) {
      el8.addEventListener('click', printSafeDB)
    }
    var el9 = document.getElementById('showTutorialCompleteList')
    if (el9) {
      el9.addEventListener('click', showTutorialCompleteList)
    }
}
document.addEventListener('DOMContentLoaded', restore_options);