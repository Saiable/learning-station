@echo off
echo "DOCS PUSH BAT"


echo "1. Start submitting code to the local repository"
git add .
 
echo "2. Commit the changes to the local repository"
set now=%date% %time%
echo "Time:" %now%
git commit -m "%now%"
 
echo "3. Push the changes to the remote git server"
git push
 
echo "Batch execution complete!"
pause