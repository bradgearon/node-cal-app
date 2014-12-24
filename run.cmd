set root=%cd%
cd %root%\node-cal
call npm install
cd %root%\ui
call bower install
cd %root%\build
call npm install
call grunt download-atom-shell
cd %root%
.\build\atom-shell\atom.exe %* --debug=true ".\node-cal"
