.PHONY: test
.SUFFIXES: .js .jsb

jsb: SummaryTest.jsb Summary.jsb fetchCsv.jsb

%.jsb : %.js
	js-beautify -f $< -o $@ -s 3; cp $< $<.bak; mv $@ $<

test:
	node SummaryTest.js

