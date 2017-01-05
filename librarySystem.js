  function librarySystem(libraryName, dependency, callback) {
  	if (arguments.length > 1) {
  		// register
  		if (dependency.length > 0) {
  			libraryStorage[libraryName] = {
  				callback: callback,
  				dependency: dependency
  			};
  		} else {
  			libraryStorage[libraryName] = callback();
  		}
  	} else {
  		// return
  		return loadLibraries(libraryName);
  	}
  }

  function loadLibraries(libraryName) {
  	var dependencies = [];
  	if (libraryStorage[libraryName].dependency) {
  		var libraryDependency = libraryStorage[libraryName].dependency
  		for (var i = 0; i < libraryDependency.length; i++) {
  			if (libraryStorage.hasOwnProperty(libraryDependency[i])) {
  				dependencies.push(libraryStorage[libraryDependency[i]]);
  			};
  		}
  		libraryStorage[libraryName] = libraryStorage[libraryName].callback.apply(null, dependencies);
  	}
  	return libraryStorage[libraryName];
  }

  function libReset() {
  	libraryStorage = {};
  	libraryToProcessLater = [];
  }
