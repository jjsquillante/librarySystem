var TinyTest = {

    run: function(tests) {
    
        var failures = 0;
        var index = 0;
        // prop in obj
        for (var testName in tests) {
            var testAction = tests[testName];
            index++;
            try {
                //testAction();
                testAction.apply(this);
                console.log('%c Test ' + index + ': ' + testName, 'color: green;');
            } catch (e) {
                failures++;
                console.groupCollapsed('%c Test ' + index + ': ' + testName, 'color: red;');
                console.error(e.stack);
                console.groupEnd();
            }
        }
        setTimeout(function() { // Give document a chance to complete
            if (window.document && document.body) {
                document.body.style.backgroundColor = (failures == 0 ? '#99ff99' : '#ff9999');
            }
        }, 0);

        var totalTests = Object.keys(tests).length;
        var successfulTests = totalTests - failures;

        var createContent = document.createElement('h2');
        createContent.textContent = totalTests +' Total Tests.' + ' ' + successfulTests + ' Passed, ' + failures + ' Failed.';
        
        document.body.appendChild(createContent);

    },

    fail: function(msg) {
        throw new Error('fail(): ' + msg);
    },

    assert: function(value, msg) {
        if (!value) {
            throw new Error('assert(): ' + msg);
        }
    },

    assertEquals: function(expected, actual) {
        if (expected != actual) {
            throw new Error('assertEquals() "' + expected + '" != "' + actual + '"');
        }
    },

    assertStrictEquals: function(expected, actual) {
        if (expected !== actual) {
            throw new Error('assertStrictEquals() "' + expected + '" !== "' + actual + '"');
        }
    },

};

var fail               = TinyTest.fail.bind(TinyTest),
    assert             = TinyTest.assert.bind(TinyTest),
    assertEquals       = TinyTest.assertEquals.bind(TinyTest),
    eq                 = TinyTest.assertEquals.bind(TinyTest), // alias for assertEquals
    assertStrictEquals = TinyTest.assertStrictEquals.bind(TinyTest),
    tests              = TinyTest.run.bind(TinyTest);


